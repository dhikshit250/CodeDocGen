import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { projects, files } from '../../../lib/schema';
import { eq, and, desc } from 'drizzle-orm';
import { auth } from '../../../lib/auth';
import { z } from 'zod';

const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  type: z.enum(['code', 'docs', 'both']),
  language: z.string().optional(),
  framework: z.string().optional(),
  prompt: z.string().min(1, 'Prompt is required'),
  settings: z.object({
    includeTests: z.boolean().default(false),
    includeDiagrams: z.boolean().default(false),
    addComments: z.boolean().default(true),
  }).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    // Get user's projects with pagination
    const offset = (page - 1) * limit;

    let whereClause = eq(projects.userId, session.user.id);
    if (search) {
      // In a real implementation, you'd use a proper search function
      // This is a simplified version
      whereClause = and(
        eq(projects.userId, session.user.id),
        // Add search condition here
      );
    }

    const userProjects = await db
      .select({
        id: projects.id,
        name: projects.name,
        description: projects.description,
        type: projects.type,
        language: projects.language,
        framework: projects.framework,
        createdAt: projects.createdAt,
        updatedAt: projects.updatedAt,
        _count: {
          files: db.select().from(files).where(eq(files.projectId, projects.id)).then((files: any) => files.length)
        }
      })
      .from(projects)
      .where(whereClause)
      .orderBy(desc(projects.updatedAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({ 
      projects: userProjects,
      pagination: {
        page,
        limit,
        total: userProjects.length // In production, you'd get the actual count
      }
    });

  } catch (error) {
    console.error('Get projects API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createProjectSchema.parse(body);

    // Create project
    const project = await db.insert(projects).values({
      userId: session.user.id,
      ...validatedData,
    }).returning();

    return NextResponse.json({ 
      success: true,
      project: project[0]
    });

  } catch (error) {
    console.error('Create project API error:', error);
    return NextResponse.json({ 
      error: 'Failed to create project',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
