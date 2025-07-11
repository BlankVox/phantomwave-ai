import SignUpForm from '@/components/auth/SignUpForm'
import Link from 'next/link'

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-phantom-purple-50 to-wave-teal-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Join PhantomWave.ai and start managing your audio content
                    </p>
                </div>

                <SignUpForm />

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/signin" className="font-medium text-phantom-purple-600 hover:text-phantom-purple-500">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
} 