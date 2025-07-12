'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AudioUpload from '@/components/upload/AudioUpload'
import Link from 'next/link'

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
        <div className="min-h-screen bg-gradient-to-br from-phantom-purple-50 to-wave-teal-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-phantom-purple-600 mb-2">
                        Upload Audio
                    </h1>
                    <p className="text-gray-600">
                        Upload your audio files to start creating amazing content
                    </p>
                </div>

                {/* Success Message */}
                {uploadSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-green-800 font-medium">
                                Upload successful! Redirecting to dashboard...
                            </span>
                        </div>
                    </div>
                )}

                {/* Upload Component */}
                <AudioUpload onUploadComplete={handleUploadComplete} />

                {/* Back to Dashboard */}
                <div className="text-center mt-8">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center text-phantom-purple-600 hover:text-phantom-purple-700 font-medium"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    )
} 