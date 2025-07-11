'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SignUpForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            })

            if (error) {
                setMessage(error.message)
            } else {
                setMessage('Check your email for the confirmation link!')
                setEmail('')
                setPassword('')
            }
        } catch (error) {
            setMessage('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSignUp} className="space-y-4">
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
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-phantom-purple-500 focus:border-phantom-purple-500"
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
                        minLength={6}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-phantom-purple-500 focus:border-phantom-purple-500"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-phantom-purple-600 hover:bg-phantom-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-phantom-purple-500 disabled:opacity-50"
                >
                    {loading ? 'Creating account...' : 'Sign Up'}
                </button>

                {message && (
                    <p className={`text-sm ${message.includes('error') ? 'text-red-600' : 'text-green-600'}`}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    )
} 