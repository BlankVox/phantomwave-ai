import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PhantomWave.ai - Notion for Audio Creators',
  description: 'Upload, trim, transcribe, summarize, and share your audio content in one unified workspace.',
  keywords: 'audio, transcription, podcast, editing, workspace, AI',
  authors: [{ name: 'PhantomWave.ai Team' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'PhantomWave.ai - Notion for Audio Creators',
    description: 'Upload, trim, transcribe, summarize, and share your audio content in one unified workspace.',
    type: 'website',
  },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="min-h-screen bg-gradient-to-br from-phantom-purple-50 to-wave-teal-50">
                    {children}
                </div>
            </body>
        </html>
    )
} 