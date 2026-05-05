'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { UploadZone } from '@/components/UploadZone'
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { validateVideoUrl } from '@/lib/utils'
import type { VideoInput } from '@/types'
import { Video, Link2, CheckCircle, XCircle, Lightbulb, Sparkles } from 'lucide-react'

export default function UploadPage() {
  const [videoData, setVideoData] = useState<VideoInput>({})
  const [activeTab, setActiveTab] = useState<'upload' | 'link'>('upload')
  const [url, setUrl] = useState('')
  const [urlError, setUrlError] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleFileSelect = (file: File) => {
    setVideoData({ ...videoData, file })
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    setUrlError(null)
  }

  const handleUrlSubmit = () => {
    const validation = validateVideoUrl(url)
    if (!validation.valid) {
      setUrlError(validation.error)
      return
    }
    setVideoData({ ...videoData, url })
  }

  const handleAnalyze = async () => {
    if (!videoData.file && !videoData.url) {
      alert('Please upload a video or paste a link')
      return
    }

    setIsAnalyzing(true)
    // TODO: Call backend API
    console.log('Analyzing video:', videoData)
    // Redirect to results page (we'll implement this in Phase 2)
    setTimeout(() => {
      // Navigate to results page
        window.location.href = '/results'
        setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="text-sm text-gray-600 hover:text-pink-600 mb-4 inline-block">
            ← Back to home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Analyze Your Video
          </h1>
          <p className="text-gray-600">
            Upload a video or paste a link to get started
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Upload Area */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                  activeTab === 'upload'
                    ? 'bg-pink-500 text-white'
                    : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                }`}
              >
                <Video size={48} className="text-pink-500" /> Upload Video
              </button>
              <button
                onClick={() => setActiveTab('link')}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                  activeTab === 'link'
                    ? 'bg-pink-500 text-white'
                    : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                }`}
              >
                <Link2 size={20} className="text-pink-500" /> Paste Link
              </button>
            </div>

            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <div>
                <UploadZone onFileSelect={handleFileSelect} isLoading={isAnalyzing} />
                {videoData.file && (
                  <Card className="mt-6 bg-green-50 border-green-200">
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl"><CheckCircle size={20} className="text-green-500" /></span>
                        <div>
                          <p className="font-semibold text-green-900">{videoData.file.name}</p>
                          <p className="text-sm text-green-700">
                            {(videoData.file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Link Tab */}
            {activeTab === 'link' && (
              <div>
                <Card>
                  <CardContent>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Paste Video Link
                    </label>
                    <input
                      type="text"
                      placeholder="https://www.tiktok.com/v/..."
                      value={url}
                      onChange={handleUrlChange}
                      className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 transition"
                    />
                    <Button
                      className="mt-4 w-full"
                      onClick={handleUrlSubmit}
                      variant="primary"
                    >
                      Paste Link
                    </Button>

                    {urlError && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 text-sm"><XCircle size={20} className="text-red-500" /> {urlError}</p>
                      </div>
                    )}

                    {videoData.url && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-700 text-sm"><CheckCircle size={20} className="text-green-500" /> Link accepted</p>
                        <p className="text-xs text-green-600 mt-1 truncate">{videoData.url}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Right: Details Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Optional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Content Niche
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Beauty, Fitness, Tech"
                    value={videoData.niche || ''}
                    onChange={(e) => setVideoData({ ...videoData, niche: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Follower Count
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 50000"
                    value={videoData.followerCount || ''}
                    onChange={(e) => setVideoData({ ...videoData, followerCount: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Engagement Rate (%)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 3.5"
                    step="0.1"
                    value={videoData.engagementRate || ''}
                    onChange={(e) => setVideoData({ ...videoData, engagementRate: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 transition"
                  />
                </div>

                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <Lightbulb size={20} className="text-pink-500" /> <span className="font-semibold">Tip:</span> More details = more accurate analysis
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Analyze Button */}
        <div className="mt-12 flex justify-center">
          <Button
            size="lg"
            onClick={handleAnalyze}
            isLoading={isAnalyzing}
            disabled={!videoData.file && !videoData.url}
            className="w-full sm:w-auto"
          >
            {isAnalyzing ? '🔄 Analyzing...' : <> <Sparkles size={20} className="text-white-500" /> Analyze Video</>}
          </Button>
        </div>
      </div>
    </div>
  )
}