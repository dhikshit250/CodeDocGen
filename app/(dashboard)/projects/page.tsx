import { Metadata } from 'next';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { 
  Folder, 
  FileText, 
  Code2,
  Download,
  Share,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  Grid,
  List
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Projects - Code & Doc Generator',
  description: 'Manage your generated projects',
};

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: 'E-Commerce Dashboard',
      type: 'React App',
      language: 'TypeScript',
      lastModified: '2 hours ago',
      files: 12,
      hasCode: true,
      hasDocs: true
    },
    {
      id: 2,
      name: 'REST API Server',
      type: 'Backend API',
      language: 'Node.js',
      lastModified: '1 day ago',
      files: 8,
      hasCode: true,
      hasDocs: false
    },
    {
      id: 3,
      name: 'Python Data Pipeline',
      type: 'Data Processing',
      language: 'Python',
      lastModified: '3 days ago',
      files: 15,
      hasCode: true,
      hasDocs: true
    },
    {
      id: 4,
      name: 'Mobile App UI',
      type: 'React Native',
      language: 'TypeScript',
      lastModified: '1 week ago',
      files: 20,
      hasCode: true,
      hasDocs: true
    },
    {
      id: 5,
      name: 'CLI Tool',
      type: 'Command Line',
      language: 'Go',
      lastModified: '2 weeks ago',
      files: 6,
      hasCode: true,
      hasDocs: false
    },
    {
      id: 6,
      name: 'Static Website',
      type: 'Frontend',
      language: 'HTML/CSS',
      lastModified: '3 weeks ago',
      files: 10,
      hasCode: true,
      hasDocs: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground">Manage and organize your generated projects</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <div className="flex border rounded-md">
          <Button variant="ghost" size="sm" className="rounded-r-none">
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="rounded-l-none">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Folder className="h-5 w-5 text-blue-500" />
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription>{project.type}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Project Info */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Language:</span>
                  <span className="font-medium">{project.language}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Files:</span>
                  <span className="font-medium">{project.files}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Modified:</span>
                  <span className="font-medium">{project.lastModified}</span>
                </div>

                {/* Content Indicators */}
                <div className="flex items-center gap-2">
                  {project.hasCode && (
                    <div className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      <Code2 className="h-3 w-3" />
                      <span>Code</span>
                    </div>
                  )}
                  {project.hasDocs && (
                    <div className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      <FileText className="h-3 w-3" />
                      <span>Docs</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-3 w-3 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share className="h-3 w-3 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="text-center py-12">
          <Folder className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-4">
            Start by generating your first project in the studio
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create First Project
          </Button>
        </div>
      )}
    </div>
  );
}
