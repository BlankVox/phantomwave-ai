'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadService } from '@/lib/upload'
import { UploadProgress } from '@/types/database'

interface AudioUploadProps {
    onUploadComplete?: () => void
}

export default function AudioUpload({ onUploadComplete }: AudioUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState<UploadProgress | null>(null)
    const [message, setMessage] = useState('')
    const [projectTitle, setProjectTitle] = useState('')

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return

        const file = acceptedFiles[0]
        setUploading(true)
        setMessage('')
        setProgress(null)

        try {
            // Upload file
            const uploadResult = await UploadService.uploadAudioFile(file, (progress) => {
                setProgress(progress)
            })

            if (!uploadResult.success) {
                setMessage(`Upload failed: ${uploadResult.error}`)
                return
            }

            // Create project record
            const projectResult = await UploadService.createProject(
                projectTitle || file.name,
                uploadResult.file_url!,
                file.name,
                file.size
            )

            if (!projectResult.success) {
                setMessage(`Failed to create project: ${projectResult.error}`)
                return
            }

            setMessage('Upload successful! Your audio project has been created.')
            setProjectTitle('')
            setProgress(null)

            if (onUploadComplete) {
                onUploadComplete()
            }

        } catch (error) {
            setMessage('An unexpected error occurred. Please try again.')
        } finally {
            setUploading(false)
        }
    }, [projectTitle, onUploadComplete])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'audio/*': ['.mp3', '.wav', '.m4a']
        },
        maxFiles: 1,
        disabled: uploading
    })

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Project Title Input */}
            <div className="mb-6">
                <label htmlFor="project-title" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title (Optional)
                </label>
                <input
                    id="project-title"
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="Enter a title for your audio project"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-phantom-purple-500 focus:border-phantom-purple-500"
                    disabled={uploading}
                />
            </div>

            {/* Upload Zone */}
            <div
                {...getRootProps()}
                className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive
                        ? 'border-phantom-purple-400 bg-phantom-purple-50'
                        : 'border-gray-300 hover:border-phantom-purple-400 hover:bg-gray-50'
                    }
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
            >
                <input {...getInputProps()} />

                <div className="space-y-4">
                    <div className="text-phantom-purple-600">
                        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>

                    <div>
                        <p className="text-lg font-medium text-gray-900">
                            {uploading ? 'Uploading...' : isDragActive ? 'Drop your audio file here' : 'Upload Audio File'}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            Drag and drop an MP3 or WAV file, or click to browse
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            Maximum file size: 100MB
                        </p>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            {progress && (
                <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Uploading...</span>
                        <span>{progress.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-phantom-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress.percentage}%` }}
                        ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        {formatFileSize(progress.loaded)} / {formatFileSize(progress.total)}
                    </p>
                </div>
            )}

            {/* Message */}
            {message && (
                <div className={`mt-4 p-3 rounded-md text-sm ${message.includes('successful')
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                    {message}
                </div>
            )}
        </div>
    )
} 