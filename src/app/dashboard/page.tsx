'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser, supabase } from '@/lib/supabase'
import { UploadService } from '@/lib/upload'
import { Project } from '@/types/database'
import { LoadingSpinner } from '@/components/ui'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function Dashboard() {
    const [user, setUser] = useState<any>(null)
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [projectsLoading, setProjectsLoading] = useState(true)
    const router = useRouter()

    const checkUser = useCallback(async () => {
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
    }, [router])

    const fetchProjects = useCallback(async () => {
        try {
            setProjectsLoading(true)
            const userProjects = await UploadService.getUserProjects()
            setProjects(userProjects)
        } catch (error) {
            console.error('Error fetching projects:', error)
        } finally {
            setProjectsLoading(false)
        }
    }, [])

    useEffect(() => {
        checkUser()
    }, [checkUser])

    useEffect(() => {
        if (user) {
            fetchProjects()
        }
    }, [user, fetchProjects])

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut()
            router.push('/')
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" text="Loading..." />
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
                    <div className="flex gap-3">
                        <Link
                            href="/upload"
                            className="px-4 py-2 bg-phantom-purple-600 text-white rounded-md hover:bg-phantom-purple-700 transition-colors"
                        >
                            Upload Audio
                        </Link>
                        <button
                            onClick={handleSignOut}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Your Audio Projects</h2>
                        <button
                            onClick={fetchProjects}
                            disabled={projectsLoading}
                            className="text-phantom-purple-600 hover:text-phantom-purple-700 disabled:opacity-50"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    </div>

                    {projectsLoading ? (
                        <div className="text-center py-12">
                            <LoadingSpinner text="Loading projects..." />
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-500 mb-4">
                                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No audio projects yet</h3>
                            <p className="text-gray-500 mb-4">Upload your first audio file to get started</p>
                            <Link
                                href="/upload"
                                className="px-4 py-2 bg-phantom-purple-600 text-white rounded-md hover:bg-phantom-purple-700 transition-colors"
                            >
                                Upload Audio
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <div key={project.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 truncate" title={project.title}>
                                                {project.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">{project.file_name}</p>
                                        </div>
                                        <div className="ml-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.status === 'ready'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {project.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>File size:</span>
                                            <span>{formatFileSize(project.file_size)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Created:</span>
                                            <span>{formatDate(project.created_at)}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="flex-1 px-3 py-2 bg-phantom-purple-600 text-white text-sm rounded-md hover:bg-phantom-purple-700 transition-colors">
                                            Play
                                        </button>
                                        <button className="px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300 transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 