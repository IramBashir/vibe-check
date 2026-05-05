// apps/frontend/components/sections/Hero.tsx

'use client'

import React from 'react'
import Link from 'next/link'
import { Zap, Target, DollarSign, Video, Sparkles, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const Hero: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-purple-50 -z-10" />

      <div className="max-w-4xl text-center">
        {/* Logo/Title */}
        <div className="mb-6">
          <div className="text-6xl sm:text-7xl font-bold mb-2">
            <span className="bg-gradient-to-r from-pink-500 via-pink-400 to-purple-500 bg-clip-text text-transparent">
              Vibe Check
            </span>
          </div>
          <p className="text-xl text-gray-600">
            Know your video's potential before posting
          </p>
        </div>

        {/* Subheadline */}
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          AI-powered analysis for TikTok, Instagram Reels, and YouTube Shorts.
          Get performance predictions, quality feedback, and monetization strategies—instantly.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/upload">
            <Button size="lg" variant="primary" className="flex items-center gap-2">
              Analyze Your Video
              <Rocket size={20} />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="flex items-center gap-2">
            <Sparkles size={20} />
            Learn More
          </Button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-600 mb-12">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-pink-500" />
            <span>Instant Results</span>
          </div>
          <div className="flex items-center gap-2">
            <Target size={18} className="text-pink-500" />
            <span>Specific Feedback</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={18} className="text-pink-500" />
            <span>Monetization Tips</span>
          </div>
        </div>

        {/* Video preview placeholder */}
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border-4 border-pink-200 bg-gradient-to-br from-pink-100 to-purple-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Video size={64} className="mx-auto mb-4 text-gray-600" />
                <p className="text-gray-600 font-medium">Your video preview here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}