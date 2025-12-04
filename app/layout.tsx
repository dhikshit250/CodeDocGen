import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../components/theme-provider';
import { Toaster } from '../components/ui/sonner';
import { AuthProvider } from '../components/providers/auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Code & Doc Generator',
  description: 'Generate code and documentation with AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
