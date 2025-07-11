'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SignInForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                setMessage(error.message)
            } else {
                // Redirect to dashboard on successful sign in
                window.location.href = '/dashboard'
            }
        } catch (error) {
            setMessage('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-wave-teal-500 focus:border-wave-teal-500"
                        placeholder="your@email.com"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-wave-teal-500 focus:border-wave-teal-500"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-wave-teal-600 hover:bg-wave-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wave-teal-500 disabled:opacity-50"
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>

                {message && (
                    <p className="text-sm text-red-600">
                        {message}
                    </p>
                )}
            </form>
        </div>
    )
} 