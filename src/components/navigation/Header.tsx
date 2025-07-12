import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

interface HeaderProps {
    className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const { toast } = useToast();

    const handleSignOut = () => {
        // Add sign out logic here
        toast.success('Signed out successfully');
    };

    const handleThemeToggle = () => {
        // Add theme toggle logic here
        toast.info('Theme toggle coming soon!');
    };

    return (
        <header className={`flex h-16 items-center justify-between border-b border-white/10 bg-bg-card backdrop-blur-xl px-6 ${className}`}>
            {/* Left side */}
            <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold text-white">Dashboard</h1>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-64 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                    <svg
                        className="absolute right-3 top-2.5 h-4 w-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                {/* Theme Toggle */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleThemeToggle}
                    className="h-9 w-9 p-0"
                    aria-label="Toggle theme"
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                    </svg>
                </Button>

                {/* Notifications */}
                <div className="relative">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                        className="h-9 w-9 p-0 relative"
                        aria-label="Notifications"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 17h5l-5 5v-5zM4.19 4H20c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4.19c-.84 0-1.31-1.01-.77-1.65L6.5 14H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                            />
                        </svg>
                        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
                    </Button>

                    {/* Notifications Dropdown */}
                    {isNotificationsOpen && (
                        <div className="absolute right-0 top-12 w-80 rounded-lg border border-white/10 bg-bg-card backdrop-blur-xl shadow-2xl">
                            <div className="p-4">
                                <h3 className="text-sm font-medium text-white">Notifications</h3>
                                <div className="mt-2 space-y-2">
                                    <div className="rounded-lg bg-white/5 p-3">
                                        <p className="text-sm text-white">New audio file uploaded successfully</p>
                                        <p className="text-xs text-gray-400">2 minutes ago</p>
                                    </div>
                                    <div className="rounded-lg bg-white/5 p-3">
                                        <p className="text-sm text-white">AI analysis completed</p>
                                        <p className="text-xs text-gray-400">1 hour ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Menu */}
                <div className="relative">
                    <Button
                        variant="ghost"
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center space-x-2"
                        aria-label="User menu"
                    >
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600" />
                        <span className="text-sm font-medium text-white">User Name</span>
                        <svg
                            className={`h-4 w-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </Button>

                    {/* User Dropdown */}
                    {isUserMenuOpen && (
                        <div className="absolute right-0 top-12 w-48 rounded-lg border border-white/10 bg-bg-card backdrop-blur-xl shadow-2xl">
                            <div className="p-2">
                                <button className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-white hover:bg-white/5">
                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Profile
                                </button>
                                <button className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-white hover:bg-white/5">
                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Settings
                                </button>
                                <hr className="my-2 border-white/10" />
                                <button
                                    onClick={handleSignOut}
                                    className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                                >
                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Sign out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}; 