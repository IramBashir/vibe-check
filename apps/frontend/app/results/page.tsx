// apps/frontend/app/results/page.tsx

'use client'

import React from 'react'
import Link from 'next/link'
import { AlertCircle, ArrowLeft, Download, Share2 } from 'lucide-react'
import { useVideoAnalysis } from '@/hooks/useVideoAnalysis'
import { ResultsHeader } from '@/components/results/ResultsHeader'
import { PerformanceScoreCard } from '@/components/results/PerformanceScoreCard'
import { ViraityPredictionCard } from '@/components/results/ViraityPredictionCard'
import { QualityBreakdownBars } from '@/components/results/QualityBreakdownBars'
import { ImprovementCard } from '@/components/results/ImprovementCard'
import { MonetizationCard } from '@/components/results/MonetizationCard'
import { Button } from '@/components/ui/Button'

export default function ResultsPage() {
  const { data, loading, error } = useVideoAnalysis()

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertCircle size={48} className="mx-auto mb-4 text-red-600" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Analysis Failed</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/upload">
            <Button className="w-full">← Back to Upload</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-6">
            <div className="w-12 h-12 border-3 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Analyzing your video</h2>
          <p className="text-sm text-gray-600">This usually takes a few seconds...</p>
        </div>
      </div>
    )
  }

  if (!data || !data.qualityBreakdown) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto mb-4 text-yellow-600" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No Data</h1>
          <p className="text-gray-600 mb-6">Please upload and analyze a video first</p>
          <Link href="/upload">
            <Button>← Back to Upload</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/upload">
            <button className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium mb-6">
              <ArrowLeft size={18} />
              Analyze another video
            </button>
          </Link>
          <ResultsHeader score={data.performanceScore} />
        </div>

        {/* Main Results Grid */}
        <div className="space-y-6">
          {/* Row 1: Score & Virality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PerformanceScoreCard score={data.performanceScore} reasoning={data.reasoning} />
            <ViraityPredictionCard prediction={data.viralyPrediction} confidence={data.confidence} />
          </div>

          {/* Row 2: Quality Breakdown */}
          <QualityBreakdownBars breakdown={data.qualityBreakdown} />

          {/* Row 3: Improvements */}
          <ImprovementCard
            hookAnalysis={data.hookAnalysis}
            pacingFeedback={data.pacingFeedback}
            improvements={data.improvements}
          />

          {/* Row 4: Monetization */}
          <MonetizationCard strategies={data.monetizationStrategies} />
        </div>

        {/* Footer Actions */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition">
            <Download size={18} />
            Download Report
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition">
            <Share2 size={18} />
            Share Results
          </button>
        </div>
      </div>
    </div>
  )
}
