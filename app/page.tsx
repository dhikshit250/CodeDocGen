import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Code2, 
  FileText, 
  Zap, 
  ArrowRight,
  Check,
  Star,
  Users,
  Download,
  Sparkles
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="h-6 w-6" />
          <span className="text-xl font-bold">CodeDocGen</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text">
              Template-Powered Code & Documentation
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground text-transparent bg-clip-text">
            Generate Code & Docs
            <br />
            <span className="text-3xl md:text-5xl bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              in Seconds, Not Hours
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your ideas into production-ready code and comprehensive documentation with our powerful template engine. 
            Build faster, ship better.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8">
                Start Generating (Free)
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              View Demo
            </Button>
          </div>
          
          {/* Interactive Demo Preview */}
          <div className="bg-muted/50 rounded-lg p-6 max-w-3xl mx-auto">
            <Input
              placeholder="Try: 'Create a React dashboard with charts'..."
              className="text-center mb-4"
            />
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Code2 className="h-4 w-4" />
                <span>Code</span>
              </div>
              <span>+</span>
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Documentation</span>
              </div>
              <span>=</span>
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4" />
                <span>Ready in 30s</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            Generate Code & Docs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create professional code and documentation using our powerful template engine. 
            Generate projects in multiple languages and frameworks instantly.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Code2 className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <CardTitle>Smart Code Generation</CardTitle>
              <CardDescription>
                Generate clean, production-ready code in any language with best practices built-in
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <CardTitle>Auto-Documentation</CardTitle>
              <CardDescription>
                Create comprehensive README files, API docs, and inline comments automatically
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-600 dark:text-purple-300" />
              </div>
              <CardTitle>Project Bundles</CardTitle>
              <CardDescription>
                Generate complete projects with code, tests, documentation, and deployment configs
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Pricing/Plans */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-muted-foreground text-lg">Start free, scale as you grow</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <CardTitle>Free</CardTitle>
              <div className="text-3xl font-bold">$0</div>
              <CardDescription>Perfect for getting started</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>10 generations/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Basic templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Community support</span>
                </li>
              </ul>
              <Button className="w-full mt-6" variant="outline">
                Get Started
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow border-2 border-primary">
            <CardHeader className="text-center">
              <div className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full inline-block mb-2">
                Most Popular
              </div>
              <CardTitle>Pro</CardTitle>
              <div className="text-3xl font-bold">$29</div>
              <CardDescription>For serious developers</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Unlimited generations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Premium templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Custom models</span>
                </li>
              </ul>
              <Button className="w-full mt-6">
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <CardTitle>Team</CardTitle>
              <div className="text-3xl font-bold">$99</div>
              <CardDescription>For teams and agencies</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Team collaboration</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Custom templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Dedicated support</span>
                </li>
              </ul>
              <Button className="w-full mt-6" variant="outline">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Loved by Developers</h2>
          <p className="text-muted-foreground text-lg">See what our users are saying</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "This tool has revolutionized my workflow. I can generate complete projects in minutes instead of days."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full"></div>
                  <div>
                    <div className="font-medium">Developer {i}</div>
                    <div className="text-sm text-muted-foreground">Software Engineer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">
            Ready to Build 10x Faster?
          </h2>
          <p className="text-primary-foreground/90 mb-8 text-lg">
            Join thousands of developers who are already using our template engine to build better software, faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="h-6 w-6" />
                <span className="text-xl font-bold">CodeDocGen</span>
              </div>
              <p className="text-muted-foreground">
                Template-powered code and documentation generation for modern developers.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Features</Link></li>
                <li><Link href="#" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground">Templates</Link></li>
                <li><Link href="#" className="hover:text-foreground">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">About</Link></li>
                <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
                <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Privacy</Link></li>
                <li><Link href="#" className="hover:text-foreground">Terms</Link></li>
                <li><Link href="#" className="hover:text-foreground">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 CodeDocGen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
