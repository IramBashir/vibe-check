// apps/frontend/components/sections/Features.tsx

'use client'

import React from 'react'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'

import { BarChart3, Sparkles, Lightbulb, DollarSign, Zap, Link2 } from 'lucide-react'

const features = [
  {
    icon: BarChart3,
    title: 'Performance Score',
    description: 'Get a 0-100 score based on hook strength, pacing, visuals, and more.',
  },
  {
    icon: Sparkles,
    title: 'Virality Prediction',
    description: 'Realistic likelihood of going viral—no false hype, just honest analysis.',
  },
  {
    icon: Lightbulb,
    title: 'Actionable Feedback',
    description: 'Specific improvements, not generic tips. Know exactly what to change.',
  },
  {
    icon: DollarSign,
    title: 'Monetization Ideas',
    description: 'Real ways to make money: affiliate, sponsorships, digital products, and more.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Analysis in under 30 seconds. No waiting, no complexity.',
  },
  {
    icon: Link2,
    title: 'Multi-Platform',
    description: 'Paste TikTok, Instagram, or YouTube links. Or upload your own file.',
  },
]

export const Features: React.FC = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What You Get
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to make smarter content decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Card key={idx} hoverable>
              <CardContent>
                <feature.icon size={32} className="mb-4 text-pink-500" />
                <CardTitle className="mb-2">{feature.title}</CardTitle>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}