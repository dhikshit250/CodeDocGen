import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';

export const metadata: Metadata = {
  title: 'Reset Password - Code & Doc Generator',
  description: 'Create a new password',
};

export default function ResetPasswordPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Reset your password</h1>
          <p className="text-sm text-muted-foreground">
            Enter your new password below
          </p>
        </div>
        
        <div className="grid gap-6">
          <form>
            <div className="grid gap-4">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                  New Password
                </Label>
                <Input
                  id="password"
                  placeholder="New password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="new-password"
                  autoCorrect="off"
                />
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="confirm-password">
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  placeholder="Confirm new password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="new-password"
                  autoCorrect="off"
                />
              </div>
              <Button type="submit">Reset Password</Button>
            </div>
          </form>
          
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/login"
              className="hover:text-brand underline underline-offset-4"
            >
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
