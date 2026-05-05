// apps/frontend/components/results/ImprovementCard.tsx

'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { ChevronDown, ChevronRight, Clock, Lightbulb } from 'lucide-react'

interface ImprovementCardProps {
  improvement: string
  index: number
}

export const ImprovementCard: React.FC<ImprovementCardProps> = ({
  improvement,
  index,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // Extract emoji from improvement text
  const emojiMatch = improvement.match(/^[\p{Emoji}]+/u)
  const emoji = emojiMatch ? emojiMatch[0] : <Lightbulb size={20} className="text-pink-500" />
  const text = improvement.replace(/^[\p{Emoji}]+\s*/u, '')

  // Split text into title and description
  const parts = text.split(':')
  const title = parts[0].trim()
  const description = parts.slice(1).join(':').trim()

  // Detailed expansion content
  const getDetailedHelp = () => {
    switch (index) {
      case 0:
        return [
          '1. Open your video editor',
          '2. In the first 1-2 seconds, add text layer with: "#DayInMyLife" or "5 AM routine"',
          '3. Use trending font (bold, sans-serif)',
          '4. Keep it visible for 2-3 seconds',
          '5. Position in top-right corner',
          '',
          'Why it works: Creates curiosity gap. Viewers want to know what happens next.',
        ]
      case 1:
        return [
          '1. Re-export your video at frame rate 30fps or 60fps',
          '2. Make sure transitions happen at natural moments',
          '3. Avoid long pauses (>2 seconds without visual change)',
          '4. Test watch time in YouTube analytics',
          '',
          'Expected impact: +15-20% increase in average watch time.',
        ]
      case 2:
        return [
          '1. Find trending sounds on TikTok Discover Sounds',
          '2. Download audio file',
          '3. Replace your background music layer',
          '4. Keep voiceover if applicable',
          '5. Re-export and test',
          '',
          'This week trending: "Butterfly" by Crazy Town remix',
        ]
      case 3:
        return [
          '1. At the 15-second mark, add text: "Shop in bio" or "Learn more"',
          '2. Use contrasting color (white on dark, or vice versa)',
          '3. Make text large (readable on mobile)',
          '4. Hold for 3-5 seconds',
          '5. Follow with action (click = redirect)',
        ]
      default:
        return [description]
    }
  }

  const detailedSteps = getDetailedHelp()

  return (
    <Card hoverable className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="text-3xl flex-shrink-0">{emoji}</div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">{description}</p>

            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-pink-100">
                <p className="text-xs font-semibold text-gray-700 mb-2 uppercase">
                  How to implement:
                </p>
                <ul className="space-y-1">
                  {detailedSteps.map((step, idx) => (
                    <li key={idx} className="text-xs text-gray-600 leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-pink-600 mt-3 font-medium">
                  <Clock size={18} className="text-gray-600" /> Estimated time: 5-15 minutes
                </p>
              </div>
            )}

            {!isExpanded && (
              <p className="text-xs text-gray-500 mt-2">
                👆 Click to see detailed steps
              </p>
            )}
          </div>

          <div className="text-lg text-pink-400 flex-shrink-0">
            {isExpanded ? <ChevronDown size={20} className="text-pink-500" /> : <ChevronRight size={20} className="text-pink-500" />}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}