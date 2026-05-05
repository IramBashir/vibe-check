import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Sparkles } from 'lucide-react'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Vibe Check --> AI Video Analyzer',
  description: 'Analyze your TikTok, Instagram, and YouTube videos. Get performance predictions, quality feedback, and monetization strategies.',
  icons: {
    icon: '/sparkles.ico', 
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-white text-gray-900 antialiased">
        <main>{children}</main>
      </body>
    </html>
  )
}