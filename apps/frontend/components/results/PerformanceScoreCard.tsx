// apps/frontend/components/results/PerformanceScoreCard.tsx

'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { getScoreColor } from '@/lib/utils'
import { Lightbulb, Target, TrendingUp, Zap } from 'lucide-react'

interface PerformanceScoreCardProps {
  score: number // 0-100
  confidence?: number // 0-100
  reasoning?: string
}

export const PerformanceScoreCard: React.FC<PerformanceScoreCardProps> = ({
  score,
  confidence = 0,
  reasoning = '',
}) => {
  const [displayScore, setDisplayScore] = useState(0)

  // Animate the score counter
  useEffect(() => {
    let start = 0
    const increment = score / 50 // Animate over 50 frames
    const timer = setInterval(() => {
      start += increment
      if (start >= score) {
        setDisplayScore(score)
        clearInterval(timer)
      } else {
        setDisplayScore(Math.floor(start))
      }
    }, 20)

    return () => clearInterval(timer)
  }, [score])

  const circumference = 2 * Math.PI * 45
  const offset = circumference - (displayScore / 100) * circumference
  const scoreColor = getScoreColor(score)

  // Color scheme based on score
  const getLabel = () => {
    if (score >= 70) return { text: 'Strong Performance', emoji: <Target size={20} className="text-pink-500" /> }
    if (score >= 50) return { text: 'Competitive', emoji: <Zap size={20} className="text-pink-500" />}
    return { text: 'Needs Improvement', emoji: <TrendingUp size={20} className="text-pink-500" />}
  }

  const label = getLabel()

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="flex flex-col items-center py-8">
        {/* Animated circular progress */}
        <div className="relative w-32 h-32 mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#f0f0f0"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={scoreColor}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 1s ease-in-out',
              }}
            />
          </svg>

          {/* Score text in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-5xl font-black"
              style={{ color: scoreColor }}
            >
              {displayScore}
            </span>
            <span className="text-xs text-gray-500 mt-1">/100</span>
          </div>
        </div>

        {/* Label */}
        <div className="text-center mb-4">
          <p className="text-2xl">{label.emoji}</p>
          <p className="text-lg font-bold text-gray-900">{label.text}</p>
        </div>

        {/* Confidence and reasoning */}
        {confidence > 0 && (
          <div className="w-full mb-4 pb-4 border-t border-pink-100">
            <p className="text-xs text-gray-600 mt-4 mb-2">
              <span className="font-semibold">Confidence:</span> {confidence}%
            </p>
            <div className="w-full bg-pink-100 rounded-full h-1.5">
              <div
                className="bg-pink-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>
        )}

        {reasoning && (
          <p className="text-xs text-gray-600 text-center leading-relaxed">
            {reasoning}
          </p>
        )}

        {/* Info text */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          <Lightbulb size={20} className="text-pink-500" /> This is an estimate based on patterns and analysis. Not guaranteed.
        </p>
      </CardContent>
    </Card>
  )
}