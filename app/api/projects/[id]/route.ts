import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { projects, files } from '../../../../lib/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '../../../../lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projectId = params.id;

    // Get project details
    const project = await db
      .select()
      .from(projects)
      .where(and(
        eq(projects.id, projectId),
        eq(projects.userId, session.user.id)
      ))
      .limit(1);

    if (!project[0]) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Get project files
    const projectFiles = await db
      .select()
      .from(files)
      .where(eq(files.projectId, projectId))
      .orderBy(files.path);

    return NextResponse.json({ 
      project: project[0],
      files: projectFiles
    });

  } catch (error) {
    console.error('Get project API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projectId = params.id;
    const body = await request.json();

    // Update project
    const updatedProject = await db
      .update(projects)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(and(
        eq(projects.id, projectId),
        eq(projects.userId, session.user.id)
      ))
      .returning();

    if (!updatedProject[0]) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      project: updatedProject[0]
    });

  } catch (error) {
    console.error('Update project API error:', error);
    return NextResponse.json({ 
      error: 'Failed to update project',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projectId = params.id;

    // Delete project (files will be deleted due to cascade)
    const deletedProject = await db
      .delete(projects)
      .where(and(
        eq(projects.id, projectId),
        eq(projects.userId, session.user.id)
      ))
      .returning();

    if (!deletedProject[0]) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Project deleted successfully'
    });

  } catch (error) {
    console.error('Delete project API error:', error);
    return NextResponse.json({ 
      error: 'Failed to delete project',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
