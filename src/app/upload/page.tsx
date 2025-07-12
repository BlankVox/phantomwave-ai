'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AudioUpload from '@/components/upload/AudioUpload'
import Link from 'next/link'
import { Navbar } from '@/components/ui'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function UploadPage() {
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const router = useRouter()

    const handleUploadComplete = () => {
        setUploadSuccess(true)
        // Redirect to dashboard after a short delay
        setTimeout(() => {
            router.push('/dashboard')
        }, 2000)
    }

    return (
        <div className="min-h-screen bg-bg-page">
            <Navbar />

            <div className="pt-20 pb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-orbitron font-bold gradient-text mb-4">
                            Upload Audio
                        </h1>
                        <p className="text-text-muted font-manrope text-lg">
                            Upload your audio files to start creating amazing content
                        </p>
                    </div>

                    {/* Success Message */}
                    {uploadSuccess && (
                        <div className="glass-card p-4 mb-6 border border-phantom-teal/30 animate-slide-down">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-phantom-teal/20 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-phantom-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-text-body font-manrope font-medium">
                                    Upload successful! Redirecting to dashboard...
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Upload Component */}
                    <div className="glass-card p-8">
                        <AudioUpload onUploadComplete={handleUploadComplete} />
                    </div>

                    {/* Back to Dashboard */}
                    <div className="text-center mt-8">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center text-phantom-teal hover:text-phantom-teal-light font-manrope font-medium transition-colors duration-200"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
} 