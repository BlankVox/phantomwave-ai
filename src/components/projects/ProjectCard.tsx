import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AudioWaveform } from '@/components/audio/AudioWaveform';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';

interface Project {
    id: string;
    title: string;
    description: string;
    duration: number;
    fileSize: string;
    uploadDate: string;
    status: 'processing' | 'completed' | 'failed';
    audioUrl?: string;
    transcription?: string;
    tags?: string[];
}

interface ProjectCardProps {
    project: Project;
    onDelete?: (id: string) => void;
    onEdit?: (id: string) => void;
    onPlay?: (id: string) => void;
    className?: string;
}

const statusConfig = {
    processing: {
        label: 'Processing',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/30',
    },
    completed: {
        label: 'Completed',
        color: 'text-green-400',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/30',
    },
    failed: {
        label: 'Failed',
        color: 'text-red-400',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/30',
    },
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    onDelete,
    onEdit,
    onPlay,
    className,
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const { toast } = useToast();

    const status = statusConfig[project.status];

    const handlePlay = () => {
        setIsPlaying(!isPlaying);
        onPlay?.(project.id);
        toast.success(isPlaying ? 'Audio paused' : 'Audio playing');
    };

    const handleDelete = () => {
        onDelete?.(project.id);
        setShowDeleteModal(false);
        toast.success('Project deleted successfully');
    };

    const handleEdit = () => {
        onEdit?.(project.id);
        toast.info('Edit mode activated');
    };

    const formatDuration = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <Card className={`group hover:shadow-cyan-500/20 transition-all duration-300 ${className}`}>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <CardTitle className="text-lg text-white group-hover:text-cyan-400 transition-colors">
                                {project.title}
                            </CardTitle>
                            <CardDescription className="mt-1 text-gray-300">
                                {project.description}
                            </CardDescription>
                        </div>
                        <div className={`ml-4 rounded-full px-3 py-1 text-xs font-medium ${status.bgColor} ${status.borderColor} border ${status.color}`}>
                            {status.label}
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    {/* Audio Waveform */}
                    <div className="mb-4">
                        <AudioWaveform
                            duration={project.duration}
                            currentTime={currentTime}
                            onSeek={setCurrentTime}
                            height={60}
                            showProgress={project.status === 'completed'}
                        />
                    </div>

                    {/* Project Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-400">Duration:</span>
                            <span className="ml-2 text-white">{formatDuration(project.duration)}</span>
                        </div>
                        <div>
                            <span className="text-gray-400">Size:</span>
                            <span className="ml-2 text-white">{project.fileSize}</span>
                        </div>
                        <div>
                            <span className="text-gray-400">Uploaded:</span>
                            <span className="ml-2 text-white">{project.uploadDate}</span>
                        </div>
                        <div>
                            <span className="text-gray-400">Status:</span>
                            <span className={`ml-2 ${status.color}`}>{status.label}</span>
                        </div>
                    </div>

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {project.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="rounded-full bg-cyan-500/10 px-2 py-1 text-xs text-cyan-400 border border-cyan-500/30"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </CardContent>

                <CardFooter>
                    <div className="flex w-full justify-between">
                        <div className="flex space-x-2">
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={handlePlay}
                                leftIcon={
                                    isPlaying ? (
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                        </svg>
                                    ) : (
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    )
                                }
                                disabled={project.status !== 'completed'}
                            >
                                {isPlaying ? 'Pause' : 'Play'}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowDetailsModal(true)}
                            >
                                Details
                            </Button>
                        </div>
                        <div className="flex space-x-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleEdit}
                                leftIcon={
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                }
                            >
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => setShowDeleteModal(true)}
                                leftIcon={
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                }
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Delete Project"
                description="Are you sure you want to delete this project? This action cannot be undone."
                size="sm"
            >
                <div className="flex justify-end space-x-3">
                    <Button
                        variant="outline"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </div>
            </Modal>

            {/* Project Details Modal */}
            <Modal
                isOpen={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
                title={project.title}
                description="Project details and transcription"
                size="lg"
            >
                <div className="space-y-6">
                    {/* Project Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-medium text-white mb-2">Project Information</h4>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="text-gray-400">Duration:</span>
                                    <span className="ml-2 text-white">{formatDuration(project.duration)}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">File Size:</span>
                                    <span className="ml-2 text-white">{project.fileSize}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Upload Date:</span>
                                    <span className="ml-2 text-white">{project.uploadDate}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Status:</span>
                                    <span className={`ml-2 ${status.color}`}>{status.label}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium text-white mb-2">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tags?.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="rounded-full bg-cyan-500/10 px-2 py-1 text-xs text-cyan-400 border border-cyan-500/30"
                                    >
                                        {tag}
                                    </span>
                                )) || <span className="text-gray-400 text-sm">No tags</span>}
                            </div>
                        </div>
                    </div>

                    {/* Transcription */}
                    {project.transcription && (
                        <div>
                            <h4 className="font-medium text-white mb-2">Transcription</h4>
                            <div className="bg-white/5 rounded-lg p-4 max-h-64 overflow-y-auto">
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    {project.transcription}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Audio Player */}
                    <div>
                        <h4 className="font-medium text-white mb-2">Audio Preview</h4>
                        <AudioWaveform
                            duration={project.duration}
                            currentTime={currentTime}
                            onSeek={setCurrentTime}
                            height={80}
                            showProgress={true}
                            showTimeLabels={true}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}; 