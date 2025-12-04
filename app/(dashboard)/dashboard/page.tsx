import { Metadata } from 'next';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { 
  Code2, 
  FileText, 
  Folder, 
  Clock, 
  Zap, 
  Download,
  Plus,
  Search
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard - Code & Doc Generator',
  description: 'Generate code and documentation with AI',
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">What would you like to build today?</p>
      </div>

      {/* Magic Input */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="What do you want to build? (e.g., 'React dashboard', 'Python API', 'README for my project')"
            className="pl-10 h-12 text-lg"
          />
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Generate Code
            </CardTitle>
            <CardDescription>
              Create clean, production-ready code in any language
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              New Code
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generate Docs
            </CardTitle>
            <CardDescription>
              Create comprehensive documentation and README files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Docs
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Full Project
            </CardTitle>
            <CardDescription>
              Generate both code and documentation together
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="secondary">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Generations */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Generations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">React Dashboard</CardTitle>
                  <div className="flex items-center gap-1">
                    <Code2 className="h-3 w-3" />
                    <FileText className="h-3 w-3" />
                  </div>
                </div>
                <CardDescription className="text-xs">
                  TypeScript, Tailwind CSS
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    2 hours ago
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Templates */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Templates</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'MERN Stack',
            'Flask API',
            'React Native',
            'Node.js CLI',
            'Python Script',
            'Vue.js App',
            'Django Project',
            'Express API'
          ].map((template) => (
            <Button key={template} variant="outline" className="h-12">
              {template}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
