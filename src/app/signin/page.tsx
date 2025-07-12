'use client'

import SignInForm from '@/components/auth/SignInForm'
import Link from 'next/link'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function SignIn() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-phantom-purple-50 to-wave-teal-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Welcome back to PhantomWave.ai
                    </p>
                </div>

                <SignInForm />

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="font-medium text-wave-teal-600 hover:text-wave-teal-500">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
} 