// apps/frontend/components/results/QualityBreakdownBars.tsx

'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/Card'
import { Video, Zap, Sparkles, Volume2, Smartphone, Lightbulb } from 'lucide-react'

interface QualityMetrics {
  hookStrength: number
  pacing: number
  visualAppeal: number
  audioQuality: number
  callToAction: number
}

interface QualityBreakdownBarsProps {
  metrics: QualityMetrics
}

  interface MetricBarProps {
    label: string
    value: number
    icon: React.ReactNode
  }

const MetricBar: React.FC<MetricBarProps> = ({
  label,
  value,
  icon,
}) => {
  const [displayValue, setDisplayValue] = useState(0)

  // Animate bar fill
  useEffect(() => {
    let start = 0
    const increment = value / 30
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(start))
      }
    }, 20)

    return () => clearInterval(timer)
  }, [value])

  const getColor = () => {
    if (value >= 8) return 'bg-green-400'
    if (value >= 6) return 'bg-yellow-400'
    return 'bg-pink-400'
  }

  return (
    <div className="space-y-2 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-semibold text-gray-900">{label}</span>
        </div>
        <span className="text-sm font-bold text-gray-700">
          {displayValue}/10
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${getColor()}`}
          style={{ width: `${(displayValue / 10) * 100}%` }}
        />
      </div>

      {/* Feedback text */}
      <p className="text-xs text-gray-600 leading-relaxed">
        {label === 'Hook Strength' &&
          'Your first 3 seconds grab attention well. Consider adding text overlay for more impact.'}
        {label === 'Pacing' &&
          'Scene cuts are well-timed. Viewers stay engaged throughout.'}
        {label === 'Visual Appeal' &&
          'Colors, lighting, and composition are strong. Aesthetically pleasing.'}
        {label === 'Audio Quality' &&
          'Audio is clear but could benefit from trending background music.'}
        {label === 'Call to Action' &&
          'Good CTA placement. Make it more prominent in the final 3 seconds.'}
      </p>
    </div>
  )
}

export const QualityBreakdownBars: React.FC<QualityBreakdownBarsProps> = ({
  metrics,
}) => {
  // Handle undefined metrics
  if (!metrics) {
    return null
  }

  const average = Math.round(
    (metrics.hookStrength +
      metrics.pacing +
      metrics.visualAppeal +
      metrics.audioQuality +
      metrics.callToAction) /
      5
  )



  return (
    <Card>
      <CardHeader>
        <CardTitle>Quality Breakdown</CardTitle>
        <p className="text-sm text-gray-600 mt-2">
          Overall average: <span className="font-bold text-pink-600">{average}/10</span>
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <MetricBar
            label="Hook Strength"
            value={metrics.hookStrength}
            icon={<Video size={20} className="text-pink-500" />}
          />
          <MetricBar label="Pacing" value={metrics.pacing} icon={<Zap size={20} className="text-pink-500" />} />
          <MetricBar
            label="Visual Appeal"
            value={metrics.visualAppeal}
            icon={<Sparkles size={20} className="text-pink-500" />}
          />
          <MetricBar
            label="Audio Quality"
            value={metrics.audioQuality}
            icon={<Volume2 size={20} className="text-pink-500" />}
          />
          <MetricBar
            label="Call to Action"
            value={metrics.callToAction}
            icon={<Smartphone size={20} className="text-pink-500" />}
          />
        </div>

        {/* Summary */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
          <Lightbulb size={18} className="text-blue-900 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Pro Tip:</span> Focus on improving your lowest scores first. Even small changes in audio quality or hook strength can increase virality by 15-25%.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}