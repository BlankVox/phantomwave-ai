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
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-phantom-teal"></div>
                )
            case 'creating-project':
                return (
                    <svg className="w-6 h-6 text-phantom-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            case 'complete':
                return (
                    <svg className="w-6 h-6 text-phantom-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="mb-8">
                <label htmlFor="project-title" className="block text-sm font-manrope font-medium text-text-body mb-3">
                    Project Title (Optional)
                </label>
                <input
                    id="project-title"
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="Enter a title for your audio project"
                    className="w-full px-4 py-3 glass border border-white/20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-phantom-teal/50 focus:border-phantom-teal/50 text-text-body placeholder-text-meta font-manrope transition-all duration-200"
                    disabled={uploading}
                />
            </div>

            {/* Upload Zone */}
            <div
                {...getRootProps()}
                className={`
                    glass border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 group
                    ${isDragActive
                        ? 'border-phantom-teal/60 bg-phantom-teal/10 scale-105'
                        : 'border-white/30 hover:border-phantom-teal/50 hover:bg-white/5 hover:scale-[1.02]'
                    }
                    ${uploading ? 'opacity-50 cursor-not-allowed scale-100' : ''}
                `}
            >
                <input {...getInputProps()} />

                <div className="space-y-6">
                    <div className="text-phantom-teal group-hover:scale-110 transition-transform duration-200">
                        <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>

                    <div>
                        <p className="text-xl font-space font-semibold text-text-body mb-2">
                            {uploading ? 'Processing...' : isDragActive ? 'Drop your audio file here' : 'Upload Audio File'}
                        </p>
                        <p className="text-text-muted font-manrope mb-2">
                            Drag and drop an MP3 or WAV file, or click to browse
                        </p>
                        <p className="text-xs text-text-meta font-manrope">
                            Maximum file size: 100MB
                        </p>
                    </div>
                </div>
            </div>

            {/* Progress Steps */}
            {uploading && (
                <div className="mt-8">
                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-phantom-teal/20 rounded-full flex items-center justify-center">
                            {getStepIcon(uploadStep)}
                        </div>
                        <span className="text-sm font-manrope font-medium text-text-body">
                            {uploadStep === 'uploading' && 'Uploading file...'}
                            {uploadStep === 'creating-project' && 'Creating project...'}
                            {uploadStep === 'complete' && 'Upload complete!'}
                        </span>
                    </div>
                </div>
            )}

            {/* Message */}
            {message && (
                <div className={`mt-6 p-4 rounded-lg text-sm font-manrope animate-slide-up ${messageType === 'success'
                        ? 'glass border border-phantom-teal/30 text-phantom-teal'
                        : messageType === 'error'
                            ? 'glass border border-phantom-danger/30 text-phantom-danger'
                            : 'glass border border-phantom-violet/30 text-phantom-violet'
                    }`}>
                    <div className="flex items-center">
                        {messageType === 'success' && (
                            <div className="w-5 h-5 bg-phantom-teal/20 rounded-full flex items-center justify-center mr-3">
                                <svg className="w-3 h-3 text-phantom-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        )}
                        {messageType === 'error' && (
                            <div className="w-5 h-5 bg-phantom-danger/20 rounded-full flex items-center justify-center mr-3">
                                <svg className="w-3 h-3 text-phantom-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        )}
                        {messageType === 'info' && (
                            <div className="w-5 h-5 bg-phantom-violet/20 rounded-full flex items-center justify-center mr-3">
                                <svg className="w-3 h-3 text-phantom-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        )}
                        {message}
                    </div>
                </div>
            )}
        </div>
    )
} 