import { Metadata } from 'next';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { 
  Code2, 
  FileText, 
  Star,
  Download,
  Eye,
  Search,
  Filter,
  Zap,
  Globe,
  Database,
  Smartphone
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Templates - Code & Doc Generator',
  description: 'Browse and use code and documentation templates',
};

export default function TemplatesPage() {
  const templates = [
    {
      id: 1,
      name: 'MERN Stack',
      description: 'Full-stack application with MongoDB, Express, React, and Node.js',
      category: 'Full Stack',
      language: 'JavaScript',
      difficulty: 'Intermediate',
      rating: 4.8,
      downloads: 1250,
      icon: <Globe className="h-5 w-5" />,
      hasCode: true,
      hasDocs: true
    },
    {
      id: 2,
      name: 'Flask REST API',
      description: 'RESTful API server with Flask, SQLAlchemy, and JWT authentication',
      category: 'Backend',
      language: 'Python',
      difficulty: 'Intermediate',
      rating: 4.6,
      downloads: 890,
      icon: <Database className="h-5 w-5" />,
      hasCode: true,
      hasDocs: true
    },
    {
      id: 3,
      name: 'React Native App',
      description: 'Cross-platform mobile app with navigation and state management',
      category: 'Mobile',
      language: 'TypeScript',
      difficulty: 'Advanced',
      rating: 4.7,
      downloads: 650,
      icon: <Smartphone className="h-5 w-5" />,
      hasCode: true,
      hasDocs: false
    },
    {
      id: 4,
      name: 'CLI Tool Template',
      description: 'Command-line interface tool with argument parsing and help system',
      category: 'CLI',
      language: 'Go',
      difficulty: 'Beginner',
      rating: 4.5,
      downloads: 420,
      icon: <Zap className="h-5 w-5" />,
      hasCode: true,
      hasDocs: true
    },
    {
      id: 5,
      name: 'Research Report',
      description: 'Academic research paper template with proper formatting and citations',
      category: 'Documentation',
      language: 'Markdown',
      difficulty: 'Beginner',
      rating: 4.3,
      downloads: 310,
      icon: <FileText className="h-5 w-5" />,
      hasCode: false,
      hasDocs: true
    },
    {
      id: 6,
      name: 'README Template',
      description: 'Professional README file template for GitHub repositories',
      category: 'Documentation',
      language: 'Markdown',
      difficulty: 'Beginner',
      rating: 4.9,
      downloads: 2100,
      icon: <FileText className="h-5 w-5" />,
      hasCode: false,
      hasDocs: true
    }
  ];

  const categories = ['All', 'Full Stack', 'Backend', 'Frontend', 'Mobile', 'CLI', 'Documentation'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Templates Library</h1>
        <p className="text-muted-foreground">Browse and use pre-built templates to jumpstart your projects</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {template.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {template.name}
                    </CardTitle>
                    <CardDescription>{template.category}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{template.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {template.description}
                </p>
                
                {/* Template Info */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Language:</span>
                  <span className="font-medium">{template.language}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Difficulty:</span>
                  <span className="font-medium">{template.difficulty}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Downloads:</span>
                  <span className="font-medium">{template.downloads.toLocaleString()}</span>
                </div>

                {/* Content Indicators */}
                <div className="flex items-center gap-2">
                  {template.hasCode && (
                    <div className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      <Code2 className="h-3 w-3" />
                      <span>Code</span>
                    </div>
                  )}
                  {template.hasDocs && (
                    <div className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      <FileText className="h-3 w-3" />
                      <span>Docs</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    Preview
                  </Button>
                  <Button size="sm" className="flex-1">
                    <Download className="h-3 w-3 mr-1" />
                    Use Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline">
          Load More Templates
        </Button>
      </div>
    </div>
  );
}
