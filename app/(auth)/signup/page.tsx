import { Metadata } from 'next';
import { SignupForm } from './signup-form';

export const metadata: Metadata = {
  title: 'Sign Up - Code & Doc Generator',
  description: 'Create your account',
};

export default function SignupPage() {
  return <SignupForm />;
}
