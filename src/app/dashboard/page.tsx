'use client';
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SkeletonCard, SkeletonText, SkeletonButton } from '@/components/ui/Skeleton';
import { useToast } from '@/components/ui/Toast';
import Link from 'next/link';

// Mock data for demonstration
const mockProjects = [
    {
        id: '1',
        title: 'Interview with John Doe',
        description: 'Product manager interview discussing Q4 strategy',
        duration: 1800, // 30 minutes
        fileSize: '15.2 MB',
        uploadDate: '2024-01-15',
        status: 'completed' as const,
        transcription: 'This is a sample transcription of the interview with John Doe discussing the Q4 strategy and upcoming product launches. The conversation covers various aspects of the business including market analysis, competitor research, and team dynamics.',
        tags: ['interview', 'strategy', 'product'],
    },
    {
        id: '2',
        title: 'Team Meeting Recording',
        description: 'Weekly standup meeting with development team',
        duration: 1200, // 20 minutes
        fileSize: '12.8 MB',
        uploadDate: '2024-01-14',
        status: 'processing' as const,
        tags: ['meeting', 'standup', 'development'],
    },
    {
        id: '3',
        title: 'Customer Feedback Session',
        description: 'User research session with beta testers',
        duration: 2400, // 40 minutes
        fileSize: '18.5 MB',
        uploadDate: '2024-01-13',
        status: 'completed' as const,
        transcription: 'Customer feedback session with beta testers revealed several key insights about user experience and feature requests. Participants provided valuable input on interface design and functionality.',
        tags: ['feedback', 'research', 'beta'],
    },
    {
        id: '4',
        title: 'Board Presentation',
        description: 'Quarterly board meeting presentation',
        duration: 3600, // 60 minutes
        fileSize: '25.1 MB',
        uploadDate: '2024-01-12',
        status: 'failed' as const,
        tags: ['presentation', 'board', 'quarterly'],
    },
];

const DashboardPage = () => {
    const [projects, setProjects] = useState(mockProjects);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'processing' | 'failed'>('all');
    const { toast } = useToast();

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleDeleteProject = (id: string) => {
        setProjects(prev => prev.filter(project => project.id !== id));
    };

    const handleEditProject = (id: string) => {
        toast.info(`Editing project ${id}`);
    };

    const handlePlayProject = (id: string) => {
        toast.success(`Playing project ${id}`);
    };

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: projects.length,
        completed: projects.filter(p => p.status === 'completed').length,
        processing: projects.filter(p => p.status === 'processing').length,
        failed: projects.filter(p => p.status === 'failed').length,
    };

    const totalDuration = projects
        .filter(p => p.status === 'completed')
        .reduce((acc, p) => acc + p.duration, 0);

    const formatDuration = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <SkeletonText lines={1} className="w-48" />
                        <SkeletonButton />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                        <p className="text-gray-400 mt-1">Manage your audio projects and analytics</p>
                    </div>
                    <Link href="/upload">
                        <Button
                            variant="primary"
                            size="lg"
                            leftIcon={
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            }
                        >
                            Upload Audio
                        </Button>
                    </Link>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Total Projects</CardTitle>
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{stats.total}</div>
                            <p className="text-xs text-gray-400">All time projects</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Completed</CardTitle>
                            <svg className="h-4 w-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
                            <p className="text-xs text-gray-400">Successfully processed</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Processing</CardTitle>
                            <svg className="h-4 w-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-400">{stats.processing}</div>
                            <p className="text-xs text-gray-400">Currently processing</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Total Duration</CardTitle>
                            <svg className="h-4 w-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-cyan-400">{formatDuration(totalDuration)}</div>
                            <p className="text-xs text-gray-400">Processed audio</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        />
                        <svg
                            className="absolute right-3 top-2.5 h-4 w-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div className="flex gap-2">
                        {(['all', 'completed', 'processing', 'failed'] as const).map((status) => (
                            <Button
                                key={status}
                                variant={statusFilter === status ? 'primary' : 'outline'}
                                size="sm"
                                onClick={() => setStatusFilter(status)}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                {filteredProjects.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent>
                            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                            </svg>
                            <h3 className="text-lg font-medium text-white mb-2">No projects found</h3>
                            <p className="text-gray-400 mb-4">
                                {searchTerm || statusFilter !== 'all'
                                    ? 'Try adjusting your search or filters'
                                    : 'Get started by uploading your first audio file'
                                }
                            </p>
                            {!searchTerm && statusFilter === 'all' && (
                                <Link href="/upload">
                                    <Button variant="primary">
                                        Upload Audio
                                    </Button>
                                </Link>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onDelete={handleDeleteProject}
                                onEdit={handleEditProject}
                                onPlay={handlePlayProject}
                            />
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default DashboardPage; 