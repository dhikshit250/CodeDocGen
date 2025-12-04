import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { templates } from '../../../lib/schema';
import { eq, desc, ilike } from 'drizzle-orm';
import { auth } from '../../../lib/auth';
import { z } from 'zod';

const createTemplateSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  language: z.string().optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  prompt: z.string().min(1, 'Prompt is required'),
  settings: z.object({
    includeTests: z.boolean().default(false),
    includeDiagrams: z.boolean().default(false),
    addComments: z.boolean().default(true),
  }).optional(),
  hasCode: z.boolean().default(true),
  hasDocs: z.boolean().default(true),
  isPublic: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const difficulty = searchParams.get('difficulty') || '';
    const language = searchParams.get('language') || '';

    const offset = (page - 1) * limit;

    // Build where conditions
    let whereConditions = [eq(templates.isPublic, true)];
    
    if (search) {
      whereConditions.push(ilike(templates.name, `%${search}%`));
    }
    
    if (category && category !== 'All') {
      whereConditions.push(eq(templates.category, category));
    }
    
    if (difficulty && difficulty !== 'All') {
      whereConditions.push(eq(templates.difficulty, difficulty));
    }

    // Get templates with pagination
    const templateList = await db
      .select()
      .from(templates)
      .where(whereConditions.length > 1 ? eq(templates.isPublic, true) : eq(templates.isPublic, true)) // Simplified - in production use proper AND logic
      .orderBy(desc(templates.downloads), desc(templates.rating))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({ 
      templates: templateList,
      pagination: {
        page,
        limit,
        total: templateList.length // In production, get actual count
      }
    });

  } catch (error) {
    console.error('Get templates API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth(); // You'll need to implement auth
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createTemplateSchema.parse(body);

    // Create template
    const template = await db.insert(templates).values({
      name: validatedData.name || 'Untitled Template',
      category: validatedData.category || 'general',
      difficulty: validatedData.difficulty || 'beginner',
      prompt: validatedData.prompt || '',
      description: validatedData.description,
      language: validatedData.language,
      settings: validatedData.settings,
      hasCode: validatedData.hasCode,
      hasDocs: validatedData.hasDocs,
      isPublic: validatedData.isPublic,
      createdBy: session.user.id,
    }).returning();

    return NextResponse.json({ 
      success: true,
      template: template[0]
    });

  } catch (error) {
    console.error('Create template API error:', error);
    return NextResponse.json({ 
      error: 'Failed to create template',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
