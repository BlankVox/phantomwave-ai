'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, supabase } from '@/lib/supabase'

export default function Dashboard() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        checkUser()
    }, [])

    const checkUser = async () => {
        try {
            const currentUser = await getCurrentUser()
            if (!currentUser) {
                router.push('/signin')
                return
            }
            setUser(currentUser)
        } catch (error) {
            console.error('Error checking user:', error)
            router.push('/signin')
        } finally {
            setLoading(false)
        }
    }

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut()
            router.push('/')
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-phantom-purple-600">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-phantom-purple-50 to-wave-teal-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-phantom-purple-600">Dashboard</h1>
                        <p className="text-gray-600 mt-2">Welcome back, {user?.email}</p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                        Sign Out
                    </button>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Audio Projects</h2>
                    <div className="text-center py-12">
                        <div className="text-gray-500 mb-4">
                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No audio projects yet</h3>
                        <p className="text-gray-500 mb-4">Upload your first audio file to get started</p>
                        <button className="px-4 py-2 bg-phantom-purple-600 text-white rounded-md hover:bg-phantom-purple-700 transition-colors">
                            Upload Audio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
} 