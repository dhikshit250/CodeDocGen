import { Metadata } from 'next';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Globe,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Settings - Code & Doc Generator',
  description: 'Manage your account settings',
};

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <CardTitle>Profile</CardTitle>
            </div>
            <CardDescription>
              Update your personal information and profile details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Name</label>
                <Input placeholder="John Doe" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input placeholder="john@example.com" type="email" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Bio</label>
              <textarea 
                className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
                placeholder="Tell us about yourself..."
              />
            </div>
            <Button>Save Profile</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive email updates about your projects</div>
                </div>
                <input type="checkbox" className="rounded" defaultChecked />
              </label>
              <label className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Generation Complete</div>
                  <div className="text-sm text-muted-foreground">Get notified when code generation finishes</div>
                </div>
                <input type="checkbox" className="rounded" defaultChecked />
              </label>
              <label className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Weekly Summary</div>
                  <div className="text-sm text-muted-foreground">Receive a weekly summary of your activity</div>
                </div>
                <input type="checkbox" className="rounded" />
              </label>
            </div>
            <Button>Save Preferences</Button>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>
              Customize the look and feel of the application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-3 block">Theme</label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" className="flex flex-col h-16">
                  <Sun className="h-4 w-4 mb-1" />
                  <span className="text-xs">Light</span>
                </Button>
                <Button variant="outline" className="flex flex-col h-16">
                  <Moon className="h-4 w-4 mb-1" />
                  <span className="text-xs">Dark</span>
                </Button>
                <Button variant="default" className="flex flex-col h-16">
                  <Monitor className="h-4 w-4 mb-1" />
                  <span className="text-xs">System</span>
                </Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Language</label>
              <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <Button>Save Appearance</Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>
              Manage your security settings and authentication methods
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <div className="font-medium">Two-Factor Authentication</div>
                  <div className="text-sm text-muted-foreground">Add an extra layer of security to your account</div>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <div className="font-medium">Change Password</div>
                  <div className="text-sm text-muted-foreground">Update your password regularly</div>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <div className="font-medium">Connected Accounts</div>
                  <div className="text-sm text-muted-foreground">Manage your connected OAuth accounts</div>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <CardTitle>Billing & Plans</CardTitle>
            </div>
            <CardDescription>
              Manage your subscription and payment methods
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-md bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-medium">Current Plan</div>
                  <div className="text-sm text-muted-foreground">Free Plan</div>
                </div>
                <Button variant="outline" size="sm">Upgrade</Button>
              </div>
              <div className="text-sm text-muted-foreground">
                10 generations per month • Basic templates • Community support
              </div>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">View Billing History</Button>
              <Button variant="outline" className="w-full">Manage Payment Methods</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
