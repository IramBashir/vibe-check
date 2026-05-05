// apps/frontend/components/results/ViraityPredictionCard.tsx

'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { getViraityLabel } from '@/lib/utils'
import { AlertCircle, CheckCircle, Pin, Rocket } from 'lucide-react'

interface ViraityPredictionCardProps {
  prediction: 'low' | 'medium' | 'high'
  explanation?: string
}

export const ViraityPredictionCard: React.FC<ViraityPredictionCardProps> = ({
  prediction,
  explanation = '',
}) => {
  const label = getViraityLabel(prediction)

  const bgColors = {
    high: 'bg-green-50 border-green-200',
    medium: 'bg-yellow-50 border-yellow-200',
    low: 'bg-pink-50 border-pink-200',
  }

  const tips = {
    high: [
        <><CheckCircle size={20} className="text-green-500" /> Strong hook (first 3 seconds)</>,
      <><CheckCircle size={20} className="text-green-500" /> Good pacing (cuts every 1-2s)</>,
      <><CheckCircle size={20} className="text-green-500" /> Trending audio/music</>,
      <><CheckCircle size={20} className="text-green-500" /> Clear call-to-action</>,
    ],
    medium: [
      <><AlertCircle size={20} className="text-yellow-500" /> Hook could be stronger</>,
      <><AlertCircle size={20} className="text-yellow-500" /> Consider faster pacing</>,
      <><AlertCircle size={20} className="text-yellow-500" /> Add trending elements</>,
      <><AlertCircle size={20} className="text-yellow-500" /> Clearer CTA needed</>,
    ],
    low: [
      <><Pin size={20} className="text-pink-500" /> Significant hook improvement needed</>,
      <><Pin size={20} className="text-pink-500" /> Pacing feels slow</>,
      <><Pin size={20} className="text-pink-500" /> Missing emotional trigger</>,
      <><Pin size={20} className="text-pink-500" /> No clear call-to-action</>,
    ],
  }

  return (
    <Card className={`${bgColors[prediction]} border-2`}>
      <CardContent className="py-8">
        <div className="text-center mb-6">
          {/* <p className="text-5xl mb-3">{label}</p> */}
          <Badge variant={prediction === 'high' ? 'success' : prediction === 'medium' ? 'warning' : 'error'}>
            {label.label}
          </Badge>
        </div>

        <p className="text-lg font-bold text-center text-gray-900 mb-6">
          {prediction === 'high' &&
            'This video has strong viral potential' }<Rocket size={20} className="text-green-500" />
          {prediction === 'medium' &&
            'Competitive performance with optimizations'}
          {prediction === 'low' &&
            'Significant improvements recommended'}
        </p>

        {explanation && (
          <p className="text-sm text-gray-700 mb-6 leading-relaxed">
            {explanation}
          </p>
        )}

        {/* Why section */}
        <div className="bg-white/50 rounded-lg p-4">
          <p className="text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            Key Factors:
          </p>
          <ul className="space-y-2">
            {tips[prediction].map((tip, idx) => (
              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="mt-0.5">{tip}</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-gray-600 mt-4 text-center">
          Based on video analysis + audience patterns in your niche
        </p>
      </CardContent>
    </Card>
  )
}