import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { generations, projects, files, usage } from '../../../lib/schema';
import { eq, and, desc } from 'drizzle-orm';
import { auth } from '../../../lib/auth';
import { z } from 'zod';

const generateRequestSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
  type: z.enum(['code', 'docs', 'both']),
  language: z.string().optional(),
  framework: z.string().optional(),
  settings: z.object({
    includeTests: z.boolean().default(false),
    includeDiagrams: z.boolean().default(false),
    addComments: z.boolean().default(true),
  }).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = generateRequestSchema.parse(body);

    // Check user's usage limits (simplified - in production you'd check plan limits)
    const today = new Date().toISOString().split('T')[0];
    const todayUsage = await db
      .select()
      .from(usage)
      .where(and(
        eq(usage.userId, session.user.id),
        eq(usage.date, new Date(today))
      ))
      .limit(1);

    const currentUsage = todayUsage[0] || { generations: 0, tokensUsed: 0, cost: 0 };
    
    // Simplified limit check - adjust based on your pricing plans
    const dailyLimit = 10; // Free tier limit
    if (currentUsage.generations >= dailyLimit) {
      return NextResponse.json({ 
        error: 'Daily generation limit exceeded. Please upgrade your plan.' 
      }, { status: 429 });
    }

    // Create generation record
    const generation = await db.insert(generations).values({
      userId: session.user.id,
      prompt: validatedData.prompt,
      type: validatedData.type,
      settings: validatedData.settings,
      status: 'running',
    }).returning();

    const generationId = generation[0].id;

    // Start generation process
    try {
      // Simulate code generation using templates and patterns
      const generatedContent = await generateContent(
        validatedData.prompt,
        validatedData.type,
        validatedData.language,
        validatedData.framework,
        validatedData.settings
      );

      // Create project
      const project = await db.insert(projects).values({
        userId: session.user.id,
        name: generateProjectName(validatedData.prompt),
        description: `Generated ${validatedData.type} for: ${validatedData.prompt}`,
        type: validatedData.type,
        language: validatedData.language,
        framework: validatedData.framework,
        prompt: validatedData.prompt,
        settings: validatedData.settings,
      }).returning();

      const projectId = project[0].id;

      // Create files based on generated content
      const createdFiles = [];
      for (const file of generatedContent.files) {
        const createdFile = await db.insert(files).values({
          projectId,
          name: file.name,
          path: file.path,
          type: file.type,
          language: file.language,
          content: file.content,
          size: file.content.length,
        }).returning();
        createdFiles.push(createdFile[0]);
      }

      // Update generation record
      await db.update(generations)
        .set({
          status: 'completed',
          projectId,
          tokensUsed: generatedContent.tokensUsed,
          cost: generatedContent.cost,
          completedAt: new Date(),
        })
        .where(eq(generations.id, generationId));

      // Update usage tracking
      const tokensUsed = generatedContent.tokensUsed;
      const cost = generatedContent.cost;
      
      if (todayUsage[0]) {
        await db.update(usage)
          .set({
            generations: currentUsage.generations + 1,
            tokensUsed: currentUsage.tokensUsed + tokensUsed,
            cost: currentUsage.cost + cost,
          })
          .where(eq(usage.id, todayUsage[0].id));
      } else {
        await db.insert(usage).values({
          userId: session.user.id,
          date: new Date(today),
          generations: 1,
          tokensUsed,
          cost,
        });
      }

      return NextResponse.json({
        success: true,
        generationId,
        projectId,
        files: createdFiles,
        tokensUsed,
        cost,
      });

    } catch (error) {
      // Update generation record with error
      await db.update(generations)
        .set({
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        .where(eq(generations.id, generationId));

      return NextResponse.json({ 
        error: 'Generation failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Generation API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

// Helper function to generate project name from prompt
function generateProjectName(prompt: string): string {
  const words = prompt.split(' ').slice(0, 3);
  return words.map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
}

// Mock generation function - generates code based on templates and patterns
async function generateContent(
  prompt: string,
  type: string,
  language?: string,
  framework?: string,
  settings?: any
) {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));

  const files = [];

  if (type === 'code' || type === 'both') {
    // Generate code files based on language/framework
    if (language?.includes('React') || framework?.includes('React')) {
      files.push({
        name: 'App.tsx',
        path: 'src/App.tsx',
        type: 'code',
        language: 'typescript',
        content: generateReactComponent(prompt, settings)
      });
    } else if (language?.includes('Python')) {
      files.push({
        name: 'main.py',
        path: 'main.py',
        type: 'code',
        language: 'python',
        content: generatePythonCode(prompt, settings)
      });
    }

    // Add package.json for Node.js projects
    if (language?.includes('Node') || framework?.includes('React')) {
      files.push({
        name: 'package.json',
        path: 'package.json',
        type: 'config',
        language: 'json',
        content: JSON.stringify({
          name: 'generated-project',
          version: '1.0.0',
          dependencies: framework?.includes('React') ? {
            'react': '^18.0.0',
            'react-dom': '^18.0.0',
            'typescript': '^4.0.0'
          } : {}
        }, null, 2)
      });
    }
  }

  if (type === 'docs' || type === 'both') {
    // Generate documentation
    files.push({
      name: 'README.md',
      path: 'README.md',
      type: 'docs',
      language: 'markdown',
      content: generateDocumentation(prompt, type, language, framework)
    });
  }

  return {
    files,
    tokensUsed: Math.floor(Math.random() * 1000) + 500,
    cost: Math.floor(Math.random() * 50) + 10, // in cents
  };
}

function generateReactComponent(prompt: string, settings?: any): string {
  return `import React, { useState, useEffect } from 'react';

interface Props {
  // Add your props here
}

export const GeneratedComponent: React.FC<Props> = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Component initialization
    console.log('Generated for: ${prompt}');
  }, []);

  return (
    <div className="generated-component">
      <h1>Generated Component</h1>
      <p>This component was generated based on: ${prompt}</p>
      ${settings?.addComments ? '<!-- Comments added as requested -->' : ''}
    </div>
  );
};`;
}

function generatePythonCode(prompt: string, settings?: any): string {
  return `#!/usr/bin/env python3
"""
Generated Python application for: ${prompt}
"""

import sys
import os
from typing import Optional

def main():
    """Main function for the generated application."""
    print("Generated Python application")
    print(f"Prompt: {prompt}")
    
    # Add your implementation here
    pass

if __name__ == "__main__":
    main()`;
}

function generateDocumentation(prompt: string, type: string, language?: string, framework?: string): string {
  return `# Generated Project

This project was generated based on the prompt: "${prompt}"

## Description

${type === 'both' ? 'This project includes both code and documentation.' : 
  type === 'code' ? 'This project includes generated code.' : 
  'This project includes documentation.'}

## Technology Stack

${language ? `- Language: ${language}` : ''}
${framework ? `- Framework: ${framework}` : ''}

## Getting Started

### Installation

\`\`\`bash
# Add installation instructions here
\`\`\`

### Usage

\`\`\`bash
# Add usage instructions here
\`\`\`

## Features

- Generated based on your requirements
- ${language || 'Custom'} implementation
- Ready to use

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.`;
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's generation history
    const userGenerations = await db
      .select()
      .from(generations)
      .where(eq(generations.userId, session.user.id))
      .orderBy(desc(generations.createdAt))
      .limit(50);

    return NextResponse.json({ generations: userGenerations });

  } catch (error) {
    console.error('Get generations API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
