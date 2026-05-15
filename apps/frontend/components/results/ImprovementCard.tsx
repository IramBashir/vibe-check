// apps/frontend/components/results/ImprovementCard.tsx

'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronRight, Lightbulb } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface ImprovementCardProps {
  hookAnalysis: string
  pacingFeedback: string
  improvements: string[]
}

export const ImprovementCard: React.FC<ImprovementCardProps> = ({
  hookAnalysis,
  pacingFeedback,
  improvements,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!improvements || improvements.length === 0) {
    return null
  }

  return (
    <Card className="border-pink-100 bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb size={24} className="text-pink-500" />
          Improvement Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Hook Analysis */}
        <div className="p-4 bg-pink-50 rounded-lg border border-pink-100">
          <h4 className="font-semibold text-gray-900 mb-2">Hook Analysis</h4>
          <p className="text-gray-700 text-sm">{hookAnalysis}</p>
        </div>

        {/* Pacing Feedback */}
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
          <h4 className="font-semibold text-gray-900 mb-2">Pacing Feedback</h4>
          <p className="text-gray-700 text-sm">{pacingFeedback}</p>
        </div>

        {/* Improvements List */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Action Items</h4>
          <div className="space-y-3">
            {improvements.map((improvement, idx) => (
              <div key={idx} className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-shrink-0 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {idx + 1}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{improvement}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
