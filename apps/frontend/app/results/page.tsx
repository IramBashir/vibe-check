// apps/frontend/app/results/page.tsx

'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useVideoAnalysis } from '@/hooks/useVideoAnalysis'
import { ResultsHeader } from '@/components/results/ResultsHeader'
import { PerformanceScoreCard } from '@/components/results/PerformanceScoreCard'
import { ViraityPredictionCard } from '@/components/results/ViraityPredictionCard'
import { QualityBreakdownBars } from '@/components/results/QualityBreakdownBars'
import { ImprovementCard } from '@/components/results/ImprovementCard'
import { MonetizationCard } from '@/components/results/MonetizationCard'
import { Button } from '@/components/ui/Button'
import { CheckCircle, DollarSign, FileVideo, Lightbulb, Rocket, Share2, XCircle, Zap } from 'lucide-react'

export default function ResultsPage() {
  const { data, loading, error, fetchAnalysis } = useVideoAnalysis()

  // Simulate fetching data when page loads
  useEffect(() => {
    fetchAnalysis('demo_video_123')
  }, [fetchAnalysis])

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600 mb-4"><XCircle size={20} className="text-red-500" /> Error</p>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/upload">
            <Button>← Back to Upload</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mb-4" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Analyzing your video...
          </h2>
          <p className="text-gray-600">
            Our AI is reviewing your content in detail. This usually takes 10-30 seconds.
          </p>

          {/* Fake progress messages */}
          <div className="mt-6 text-sm text-gray-600 space-y-2">
            <p><CheckCircle size={20} className="text-green-500" /> Extracted frames from video</p>
            <p><CheckCircle size={20} className="text-green-500" /> Analyzed hook quality</p>
            <p>⏳ Evaluating pacing and engagement...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <ResultsHeader
        videoFileName="your_video.mp4"
        timestamp={new Date()}
      />

      {/* Main content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Top row: Score + Virality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <PerformanceScoreCard
              score={data.performanceScore}
              confidence={data.confidence}
              reasoning={data.reasoning}
            />
            <ViraityPredictionCard
              prediction={data.viralyPrediction}
              explanation={
                data.viralyPrediction === 'high'
                  ? 'Your video shows all the hallmarks of trending content: strong hook, good pacing, and emotional resonance.'
                  : 'With a few optimizations, this could perform much better. Focus on the improvement suggestions below.'
              }
            />
          </div>

          {/* Quality Breakdown */}
          <div className="mb-12">
            <QualityBreakdownBars metrics={data.qualityBreakdown} />
          </div>

          {/* Hook & Pacing Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                <FileVideo size={48} className="text-pink-500" /> Hook Analysis
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {data.hookAnalysis}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                <Zap size={20} className="text-pink-500" /> Pacing Feedback
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {data.pacingFeedback}
              </p>
            </div>
          </div>

          {/* Improvements section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              <Lightbulb size={20} className="text-pink-500" /> How to Improve
            </h2>
            <div className="space-y-4">
              {data.improvements.map((improvement, idx) => (
                <ImprovementCard
                  key={idx}
                  improvement={improvement}
                  index={idx}
                />
              ))}
            </div>
          </div>

          {/* Monetization section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              <DollarSign size={20} className="text-pink-500" /> Monetization Strategies
            </h2>
            <p className="text-gray-600 mb-6">
              Here are realistic ways to make money with your content,
              prioritized by difficulty:
            </p>
            <div className="space-y-4">
              {data.monetizationStrategies.map((strategy, idx) => (
                <MonetizationCard key={idx} strategy={strategy} />
              ))}
            </div>
          </div>

          {/* CTA section */}
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-8 rounded-2xl border-2 border-pink-200 text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to improve your video?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Apply the suggestions above to your next video. Then upload it
              here to track your progress and watch your metrics improve!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload">
                <Button size="lg" variant="primary">
                  Analyze Another Video <Rocket size={20} className="text-green-500" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Share Results <Share2 size={20} className="text-pink-500" />
              </Button>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="text-center py-12 border-t border-pink-200">
            <p className="text-gray-600 mb-4">
              💎 Want deeper insights and monthly trend reports?
            </p>
            <Button size="lg" variant="primary">
              Coming Soon: Premium Features
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}