'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadService } from '@/lib/upload'

interface AudioUploadProps {
    onUploadComplete?: () => void
}

export default function AudioUpload({ onUploadComplete }: AudioUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [uploadStep, setUploadStep] = useState<'idle' | 'uploading' | 'creating-project' | 'complete'>('idle')
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info')
    const [projectTitle, setProjectTitle] = useState('')

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return

        const file = acceptedFiles[0]
        setUploading(true)
        setMessage('')
        setUploadStep('uploading')

        try {
            // Upload file
            setMessage('Uploading audio file...')
            setMessageType('info')

            const uploadResult = await UploadService.uploadAudioFile(file)

            if (!uploadResult.success) {
                setMessage(`Upload failed: ${uploadResult.error}`)
                setMessageType('error')
                setUploadStep('idle')
                return
            }

            // Create project record
            setUploadStep('creating-project')
            setMessage('Creating project...')

            const projectResult = await UploadService.createProject(
                projectTitle || file.name,
                uploadResult.file_url!,
                file.name,
                file.size
            )

            if (!projectResult.success) {
                setMessage(`Failed to create project: ${projectResult.error}`)
                setMessageType('error')
                setUploadStep('idle')
                return
            }

            setUploadStep('complete')
            setMessage('Upload successful! Your audio project has been created.')
            setMessageType('success')
            setProjectTitle('')

            if (onUploadComplete) {
                onUploadComplete()
            }

        } catch (error) {
            setMessage('An unexpected error occurred. Please try again.')
            setMessageType('error')
            setUploadStep('idle')
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

    const getStepIcon = (step: string) => {
        switch (step) {
            case 'uploading':
                return (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-phantom-purple-600"></div>
                )
            case 'creating-project':
                return (
                    <svg className="w-6 h-6 text-phantom-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            case 'complete':
                return (
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                )
            default:
                return null
        }
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
                            {uploading ? 'Processing...' : isDragActive ? 'Drop your audio file here' : 'Upload Audio File'}
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

            {/* Progress Steps */}
            {uploading && (
                <div className="mt-6">
                    <div className="flex items-center space-x-3">
                        {getStepIcon(uploadStep)}
                        <span className="text-sm font-medium text-gray-700">
                            {uploadStep === 'uploading' && 'Uploading file...'}
                            {uploadStep === 'creating-project' && 'Creating project...'}
                            {uploadStep === 'complete' && 'Upload complete!'}
                        </span>
                    </div>
                </div>
            )}

            {/* Message */}
            {message && (
                <div className={`mt-4 p-3 rounded-md text-sm ${messageType === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : messageType === 'error'
                            ? 'bg-red-50 text-red-800 border border-red-200'
                            : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}>
                    <div className="flex items-center">
                        {messageType === 'success' && (
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                        {messageType === 'error' && (
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                        {messageType === 'info' && (
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                        {message}
                    </div>
                </div>
            )}
        </div>
    )
} 