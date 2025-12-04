'use client';

import { Button } from '../ui/button';
import { Icons } from '../icons';

export function OAuthButtons() {
  const handleGoogleSignIn = () => {
    window.location.href = '/api/auth/signin/google';
  };

  const handleDiscordSignIn = () => {
    window.location.href = '/api/auth/signin/discord';
  };

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button variant="outline" className="w-full" onClick={handleDiscordSignIn}>
        <Icons.discord className="mr-2 h-4 w-4" />
        Discord
      </Button>
    </div>
  );
}
