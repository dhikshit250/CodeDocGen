'use client';

import Link from 'next/link';

export function SignupForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Create your account</h2>
          <p className="mt-2 text-gray-600">
            Or{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              sign in to your existing account
            </Link>
          </p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Create account with email
              </span>
            </div>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Enter your full name"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Create a password"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Confirm your password"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                required
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            <button 
              type="submit" 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create account
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
