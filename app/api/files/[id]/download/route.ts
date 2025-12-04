import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { files, projects } from '../../../../lib/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '../../../../lib/auth';
import JSZip from 'jszip';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const fileId = params.id;

    // Get file details and verify ownership
    const fileDetails = await db
      .select({
        file: files,
        project: projects
      })
      .from(files)
      .innerJoin(projects, eq(files.projectId, projects.id))
      .where(and(
        eq(files.id, fileId),
        eq(projects.userId, session.user.id)
      ))
      .limit(1);

    if (!fileDetails[0]) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const { file } = fileDetails[0];

    // Return file content
    return new NextResponse(file.content, {
      headers: {
        'Content-Type': getContentType(file.language),
        'Content-Disposition': `attachment; filename="${file.name}"`,
      },
    });

  } catch (error) {
    console.error('Download file API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const fileId = params.id;
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'single';

    // Get file details and verify ownership
    const fileDetails = await db
      .select({
        file: files,
        project: projects
      })
      .from(files)
      .innerJoin(projects, eq(files.projectId, projects.id))
      .where(and(
        eq(files.id, fileId),
        eq(projects.userId, session.user.id)
      ))
      .limit(1);

    if (!fileDetails[0]) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const { file, project } = fileDetails[0];

    if (format === 'single') {
      // Return single file
      return new NextResponse(file.content, {
        headers: {
          'Content-Type': getContentType(file.language),
          'Content-Disposition': `attachment; filename="${file.name}"`,
        },
      });
    } else if (format === 'zip') {
      // Return entire project as ZIP
      const projectFiles = await db
        .select()
        .from(files)
        .where(eq(files.projectId, project.id));

      const zip = new JSZip();

      // Add all files to ZIP
      for (const projectFile of projectFiles) {
        zip.file(projectFile.path, projectFile.content);
      }

      // Generate ZIP buffer
      const zipBuffer = await zip.generateAsync({ type: 'uint8array' });

      return new NextResponse(zipBuffer, {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': `attachment; filename="${project.name}.zip"`,
        },
      });
    } else {
      return NextResponse.json({ error: 'Invalid format' }, { status: 400 });
    }

  } catch (error) {
    console.error('Download project API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

function getContentType(language: string): string {
  const contentTypes: Record<string, string> = {
    'typescript': 'text/typescript',
    'javascript': 'text/javascript',
    'python': 'text/x-python',
    'json': 'application/json',
    'markdown': 'text/markdown',
    'html': 'text/html',
    'css': 'text/css',
    'scss': 'text/x-scss',
    'less': 'text/x-less',
    'xml': 'application/xml',
    'yaml': 'application/x-yaml',
    'yml': 'application/x-yaml',
    'sql': 'application/sql',
    'go': 'text/x-go',
    'rust': 'text/x-rust',
    'java': 'text/x-java-source',
    'c': 'text/x-c',
    'cpp': 'text/x-c++',
    'csharp': 'text/x-csharp',
    'php': 'text/x-php',
    'ruby': 'text/x-ruby',
    'swift': 'text/x-swift',
    'kotlin': 'text/x-kotlin',
    'dart': 'text/x-dart',
    'r': 'text/x-r',
    'shell': 'text/x-shellscript',
    'bash': 'text/x-shellscript',
    'powershell': 'text/x-powershell',
    'dockerfile': 'text/x-dockerfile',
    'toml': 'application/x-toml',
    'ini': 'text/x-ini',
    'properties': 'text/x-java-properties',
  };

  return contentTypes[language.toLowerCase()] || 'text/plain';
}
