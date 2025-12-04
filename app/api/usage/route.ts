import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { usage, generations, projects } from '../../../lib/schema';
import { eq, and, gte, lte, count, sum, sql } from 'drizzle-orm';
import { auth } from '../../../lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'month'; // 'day', 'week', 'month', 'year'
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Calculate date range based on period
    const now = new Date();
    let start: Date;
    let end: Date = now;

    if (startDate && endDate) {
      start = new Date(startDate);
      end = new Date(endDate);
    } else {
      switch (period) {
        case 'day':
          start = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case 'week':
          start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          start = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'year':
          start = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      }
    }

    // Get usage statistics
    const usageStats = await db
      .select({
        totalGenerations: count(generations.id),
        totalTokensUsed: sum(generations.tokensUsed),
        totalCost: sum(generations.cost),
        completedGenerations: sql<number>`COUNT(CASE WHEN ${generations.status} = 'completed' THEN 1 END)`,
        failedGenerations: sql<number>`COUNT(CASE WHEN ${generations.status} = 'failed' THEN 1 END)`,
      })
      .from(generations)
      .where(and(
        eq(generations.userId, session.user.id),
        gte(generations.createdAt, start),
        lte(generations.createdAt, end)
      ));

    // Get project statistics
    const projectStats = await db
      .select({
        totalProjects: count(projects.id),
        codeProjects: sql<number>`COUNT(CASE WHEN ${projects.type} = 'code' THEN 1 END)`,
        docsProjects: sql<number>`COUNT(CASE WHEN ${projects.type} = 'docs' THEN 1 END)`,
        bothProjects: sql<number>`COUNT(CASE WHEN ${projects.type} = 'both' THEN 1 END)`,
      })
      .from(projects)
      .where(and(
        eq(projects.userId, session.user.id),
        gte(projects.createdAt, start),
        lte(projects.createdAt, end)
      ));

    // Get daily usage for charts
    const dailyUsage = await db
      .select({
        date: usage.date,
        generations: sum(usage.generations),
        tokensUsed: sum(usage.tokensUsed),
        cost: sum(usage.cost),
      })
      .from(usage)
      .where(and(
        eq(usage.userId, session.user.id),
        gte(usage.date, start),
        lte(usage.date, end)
      ))
      .orderBy(usage.date);

    // Get language/framework distribution
    const languageStats = await db
      .select({
        language: projects.language,
        count: count(projects.id),
      })
      .from(projects)
      .where(and(
        eq(projects.userId, session.user.id),
        gte(projects.createdAt, start),
        lte(projects.createdAt, end)
      ))
      .groupBy(projects.language)
      .orderBy(count(projects.id));

    const stats = usageStats[0] || {
      totalGenerations: 0,
      totalTokensUsed: 0,
      totalCost: 0,
      completedGenerations: 0,
      failedGenerations: 0,
    };

    const projectData = projectStats[0] || {
      totalProjects: 0,
      codeProjects: 0,
      docsProjects: 0,
      bothProjects: 0,
    };

    return NextResponse.json({
      period: {
        start: start.toISOString(),
        end: end.toISOString(),
        type: period,
      },
      usage: {
        totalGenerations: Number(stats.totalGenerations) || 0,
        totalTokensUsed: Number(stats.totalTokensUsed) || 0,
        totalCost: Number(stats.totalCost) || 0,
        completedGenerations: Number(stats.completedGenerations) || 0,
        failedGenerations: Number(stats.failedGenerations) || 0,
        successRate: stats.totalGenerations > 0 
          ? ((Number(stats.completedGenerations) / Number(stats.totalGenerations)) * 100).toFixed(1)
          : '0',
      },
      projects: {
        totalProjects: Number(projectData.totalProjects) || 0,
        codeProjects: Number(projectData.codeProjects) || 0,
        docsProjects: Number(projectData.docsProjects) || 0,
        bothProjects: Number(projectData.bothProjects) || 0,
      },
      dailyUsage: dailyUsage.map((day: any) => ({
        date: day.date,
        generations: Number(day.generations) || 0,
        tokensUsed: Number(day.tokensUsed) || 0,
        cost: Number(day.cost) || 0,
      })),
      languageDistribution: languageStats.map((lang: any) => ({
        language: lang.language || 'Unknown',
        count: Number(lang.count) || 0,
      })),
    });

  } catch (error) {
    console.error('Get usage API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
