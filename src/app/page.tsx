'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/ui'

export default function Home() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="min-h-screen animated-bg">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 pb-16 overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-phantom-violet/20 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-phantom-teal/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                    <div className="text-center">
                        {/* Main heading */}
                        <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6">
                            <span className="gradient-text text-shadow-lg">PhantomWave</span>
                            <span className="block text-text-body text-2xl md:text-3xl font-manrope font-normal mt-2">
                                .ai
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-text-muted font-manrope mb-8 max-w-3xl mx-auto leading-relaxed">
                            The ultimate workspace for audio creators. Upload, trim, transcribe, and share your content with AI-powered tools.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                            <Link
                                href="/signup"
                                className="btn-primary text-lg px-8 py-4 font-manrope font-semibold hover-lift"
                            >
                                Start Creating
                            </Link>
                            <Link
                                href="/signin"
                                className="glass-button text-lg px-8 py-4 font-manrope font-semibold hover-lift"
                            >
                                Sign In
                            </Link>
                        </div>

                        {/* Feature highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {[
                                {
                                    icon: (
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    ),
                                    title: "Upload & Organize",
                                    description: "Drag & drop audio files with intelligent organization"
                                },
                                {
                                    icon: (
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                        </svg>
                                    ),
                                    title: "Waveform Editing",
                                    description: "Visual waveform trimming with precision controls"
                                },
                                {
                                    icon: (
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    ),
                                    title: "AI-Powered",
                                    description: "Auto-transcription and smart content analysis"
                                }
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="glass-card p-6 text-center hover-lift group"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-phantom-violet/20 to-phantom-teal/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                                        <div className="text-phantom-teal">
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-space font-semibold text-text-body mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-text-muted font-manrope">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Waveform visualization */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="glass-card p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-orbitron font-bold gradient-text mb-4">
                                Visual Audio Editing
                            </h2>
                            <p className="text-phantom-text-secondary font-manrope">
                                See your audio come to life with real-time waveform visualization
                            </p>
                        </div>

                        {/* Waveform placeholder */}
                        <div className="waveform-placeholder h-32 mb-6">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex space-x-1">
                                    {[...Array(50)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-1 bg-gradient-to-t from-phantom-violet to-phantom-teal rounded-full animate-pulse"
                                            style={{
                                                height: `${Math.random() * 60 + 20}%`,
                                                animationDelay: `${i * 0.1}s`
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <Link
                                href="/signup"
                                className="btn-primary font-manrope"
                            >
                                Try It Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="w-6 h-6 bg-gradient-to-br from-phantom-violet to-phantom-teal rounded"></div>
                            <span className="text-lg font-orbitron font-bold gradient-text">
                                PhantomWave.ai
                            </span>
                        </div>
                        <p className="text-text-meta font-manrope">
                            © 2024 PhantomWave.ai. Built for audio creators.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
} 