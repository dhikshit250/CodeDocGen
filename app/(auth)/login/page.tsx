import { Metadata } from 'next';
import { LoginForm } from './login-form';

export const metadata: Metadata = {
  title: 'Login - Code & Doc Generator',
  description: 'Login to your account',
};

export default function LoginPage() {
  return <LoginForm />;
}
