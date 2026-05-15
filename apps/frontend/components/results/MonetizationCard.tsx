// apps/frontend/components/results/MonetizationCard.tsx

'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { MonetizationStrategy } from '@/types'
import { ShoppingBag, Handshake, BookOpen, Heart, GraduationCap, ChevronDown, ChevronRight, Lightbulb, CheckCircle, AlertCircle, Flame } from 'lucide-react'

interface MonetizationCardProps {
  strategy: MonetizationStrategy
}

export const MonetizationCard: React.FC<MonetizationCardProps> = ({
  strategy,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!strategy) {
    return null
  }

  // Get difficulty info and color
  const getDifficultyInfo = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return { icon: 'check', color: 'success', text: 'Easy - Start ASAP' }
      case 'medium':
        return { icon: 'alert', color: 'warning', text: 'Medium - 2-3 month prep' }
      case 'hard':
        return { icon: 'fire', color: 'error', text: 'Hard - Long-term investment' }
      default:
        return { icon: 'help', color: 'default', text: 'Unknown' }
    }
  }

  const diffInfo = getDifficultyInfo(strategy.difficulty)

  // Get emoji for method
  const getMethodIcon = () => {
    if (strategy.method.includes('Affiliate')) return <ShoppingBag size={32} className="text-pink-500" />
    if (strategy.method.includes('Brand') || strategy.method.includes('Sponsorship'))
      return <Handshake size={32} className="text-blue-500" />
    if (strategy.method.includes('Digital') || strategy.method.includes('Product'))
      return <BookOpen size={32} className="text-purple-500" />
    if (strategy.method.includes('Patreon') || strategy.method.includes('Patron'))
      return <Heart size={32} className="text-pink-500" />
    if (strategy.method.includes('Course') || strategy.method.includes('Training'))
      return <GraduationCap size={32} className="text-purple-500" />
    return <ShoppingBag size={32} className="text-gray-500" />
  }

  return (
    <Card
      hoverable
      onClick={() => setIsExpanded(!isExpanded)}
      className="cursor-pointer"
    >
      <CardContent>
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0">
            {getMethodIcon()}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <CardTitle className="mb-2">{strategy.method}</CardTitle>

            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant={diffInfo.color as any}>
                {diffInfo.emoji} {diffInfo.text}
              </Badge>
              <span className="text-sm font-semibold text-green-600">
                {strategy.estimatedRevenue}
              </span>
            </div>

            {/* Summary row */}
            <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
              <div>
                <p className="text-xs text-gray-600">Time to Revenue</p>
                <p className="font-semibold text-gray-900">
                  {strategy.timeToRevenue}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Niche Fit</p>
                <p className="font-semibold text-gray-900">
                  {strategy.difficulty === 'easy'
                    ? '✅ Perfect'
                    : strategy.difficulty === 'medium'
                      ? '👍 Good'
                      : '📌 Consider'}
                </p>
              </div>
            </div>

            {/* Niche fit explanation */}
            <p className="text-sm text-gray-700 bg-blue-50 p-2 rounded mb-3">
              {strategy.nicheFit}
            </p>

            {/* Expandable steps */}
            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-pink-100">
                <p className="text-xs font-semibold text-gray-700 mb-2 uppercase">
                  Implementation Steps:
                </p>
                <ol className="space-y-2">
                  {strategy.steps.map((step, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-700 flex gap-2"
                    >
                      <span className="font-bold text-pink-500 flex-shrink-0">
                        {idx + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded flex items-start gap-2">
                  <Lightbulb size={16} className="text-green-900 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-green-900">
                    <span className="font-semibold">Action:</span> Set a reminder to revisit this in 2 weeks. Many creators miss opportunities by not taking immediate action.
                  </p>
                </div>
              </div>
            )}

            {!isExpanded && (
              <p className="text-xs text-gray-500">
                👆 Click to see step-by-step guide
              </p>
            )}
          </div>

          {/* Expand indicator */}
          <div className="text-lg text-pink-400 flex-shrink-0 mt-1">
            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}