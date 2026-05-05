// apps/frontend/components/results/ResultsHeader.tsx

'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Download, FileVideo, Share2 } from 'lucide-react'

interface ResultsHeaderProps {
  videoFileName?: string
  timestamp?: Date
}

export const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  videoFileName = 'video.mp4',
  timestamp = new Date(),
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="border-b border-pink-200 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/upload">
            <button className="text-sm text-gray-600 hover:text-pink-600 transition">
              ← Back to Upload
            </button>
          </Link>

          <div className="flex gap-3">
            <Button size="sm" variant="outline">
              <Download size={20} className="text-pink-500" /> Download Report
            </Button>
            <Button size="sm" variant="secondary">
              <Share2 size={20} className="text-pink-500" /> Share Results
            </Button>
          </div>
        </div>

        <div className="flex items-start gap-6">
          {/* Video Thumbnail */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center shadow-md">
              <span className="text-4xl"><FileVideo size={48} className="text-pink-500" /></span>
            </div>
          </div>

          {/* Video Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Video Analysis
            </h1>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">File:</span> {videoFileName}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Analyzed:</span> {formatDate(timestamp)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}