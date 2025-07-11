import AudioUpload from '@/components/upload/AudioUpload'
import Link from 'next/link'

export default function UploadPage() {
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

                {/* Upload Component */}
                <AudioUpload />

                {/* Back to Dashboard */}
                <div className="text-center mt-8">
                    <Link
                        href="/dashboard"
                        className="text-phantom-purple-600 hover:text-phantom-purple-700 font-medium"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    )
} 