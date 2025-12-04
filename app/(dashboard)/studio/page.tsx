import { Metadata } from 'next';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { 
  Code2, 
  FileText, 
  Download,
  Copy,
  RefreshCw,
  Settings,
  Play,
  Save,
  Folder,
  Search
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Generator Studio - Code & Doc Generator',
  description: 'Generate code and documentation with templates',
};

export default function StudioPage() {
  return (
    <div className="flex h-screen bg-background">
      {/* Left Panel - Inputs & Settings */}
      <div className="w-80 border-r bg-muted/30 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-4">Generator Studio</h2>
          
          {/* Prompt Input */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">What do you want to build?</label>
              <textarea
                className="w-full h-24 p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Describe your project... e.g., 'Create a React dashboard with charts and user authentication'"
              />
            </div>
            
            {/* Language Selector */}
            <div>
              <label className="text-sm font-medium mb-2 block">Language/Framework</label>
              <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <option>React/TypeScript</option>
                <option>Vue.js</option>
                <option>Angular</option>
                <option>Next.js</option>
                <option>Node.js</option>
                <option>Python/Flask</option>
                <option>Python/Django</option>
                <option>Go</option>
                <option>Rust</option>
              </select>
            </div>
            
            {/* Generation Type */}
            <div>
              <label className="text-sm font-medium mb-2 block">Generate</label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" className="flex flex-col h-12">
                  <Code2 className="h-4 w-4 mb-1" />
                  <span className="text-xs">Code</span>
                </Button>
                <Button variant="outline" size="sm" className="flex flex-col h-12">
                  <FileText className="h-4 w-4 mb-1" />
                  <span className="text-xs">Docs</span>
                </Button>
                <Button variant="default" size="sm" className="flex flex-col h-12">
                  <div className="flex gap-1">
                    <Code2 className="h-3 w-3" />
                    <FileText className="h-3 w-3" />
                  </div>
                  <span className="text-xs">Both</span>
                </Button>
              </div>
            </div>
            
            {/* Options */}
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Include Tests</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Include Diagrams</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Add Comments</span>
              </label>
            </div>
            
            {/* Generate Button */}
            <Button className="w-full">
              <Play className="h-4 w-4 mr-2" />
              Generate
            </Button>
          </div>
        </div>
        
        {/* Templates */}
        <div className="flex-1 p-4 overflow-y-auto">
          <h3 className="text-sm font-semibold mb-3">Quick Templates</h3>
          <div className="space-y-2">
            {[
              'React Dashboard',
              'REST API Server',
              'CLI Tool',
              'Python Script',
              'Static Website',
              'Mobile App'
            ].map((template) => (
              <Button key={template} variant="ghost" size="sm" className="w-full justify-start text-left">
                {template}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Center Panel - Code Output */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4" />
            <h3 className="font-medium">Code Output</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 p-4 font-mono text-sm bg-gray-900 text-gray-100 overflow-auto">
          <div className="space-y-4">
            <div className="text-green-400">// Generated React Component</div>
            <pre>{`import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface DashboardProps {
  title?: string;
  data?: any[];
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  title = "Dashboard", 
  data = [] 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const metrics = {
    totalUsers: 1250,
    revenue: 45678,
    growth: 23
  };

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // API call would go here
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        console.log('Dashboard data:', data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalUsers.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">\${metrics.revenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+{metrics.growth}%</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};`}</pre>
          </div>
        </div>
      </div>
      
      {/* Right Panel - Docs Output */}
      <div className="w-96 border-l bg-muted/30 flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <h3 className="font-medium">Documentation</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 p-4 overflow-auto">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Dashboard Component</h2>
              <p className="text-sm text-muted-foreground mb-4">
                A responsive dashboard component that displays key metrics and data visualizations.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Responsive grid layout</li>
                <li>Loading states</li>
                <li>Error handling</li>
                <li>TypeScript support</li>
                <li>Customizable metrics</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Props</h3>
              <div className="space-y-2 text-sm">
                <div className="border rounded p-2">
                  <code className="text-xs">title?: string</code>
                  <p className="text-muted-foreground text-xs mt-1">Optional title for the dashboard</p>
                </div>
                <div className="border rounded p-2">
                  <code className="text-xs">data?: any[]</code>
                  <p className="text-muted-foreground text-xs mt-1">Optional data array for the dashboard</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Usage</h3>
              <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <Dashboard 
      title="My Dashboard"
      data={dashboardData}
    />
  );
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Dependencies</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>React 18+</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
