'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getCurrentUser, supabase } from '@/lib/supabase'

export default function Navbar() {
    const [user, setUser] = useState<any>(null)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const checkUser = async () => {
            const currentUser = await getCurrentUser()
            setUser(currentUser)
        }
        checkUser()

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut()
            router.push('/')
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'glass backdrop-blur-md border-b border-white/10'
                : 'bg-transparent'
            }`}>
            <div className="container-max px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                </svg>
                            </div>
                            <div className="absolute inset-0 bg-gradient-hero rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-200"></div>
                        </div>
                        <span className="text-2xl font-orbitron font-bold text-gradient-hero">
                            PhantomWave
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="nav-link"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/upload"
                                    className="nav-link"
                                >
                                    Upload
                                </Link>
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-text-muted font-manrope">
                                        {user.email}
                                    </span>
                                    <button
                                        onClick={handleSignOut}
                                        className="btn-danger text-sm"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/signin"
                                    className="nav-link"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="btn-primary"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="glass-button p-2"
                        >
                            <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden glass-card mt-2 mb-4 animate-slide-down">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {user ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="block px-3 py-2 nav-link rounded-lg hover:bg-bg-hover"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/upload"
                                        className="block px-3 py-2 nav-link rounded-lg hover:bg-bg-hover"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Upload
                                    </Link>
                                    <div className="border-t border-border-card mt-2 pt-2">
                                        <div className="px-3 py-2 text-sm text-text-muted">
                                            {user.email}
                                        </div>
                                        <button
                                            onClick={() => {
                                                handleSignOut()
                                                setIsMenuOpen(false)
                                            }}
                                            className="block w-full text-left px-3 py-2 btn-danger rounded-lg"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/signin"
                                        className="block px-3 py-2 nav-link rounded-lg hover:bg-bg-hover"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="block px-3 py-2 nav-link rounded-lg hover:bg-bg-hover"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
} 