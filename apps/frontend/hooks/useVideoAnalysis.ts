// apps/frontend/hooks/useVideoAnalysis.ts

import { useCallback, useState, useEffect } from 'react'
import type { AnalysisResponse } from '@/types'

interface UseVideoAnalysisReturn {
  data: AnalysisResponse | null
  loading: boolean
  error: string | null
  analyzeVideo: (file: File, context?: { niche?: string; followerCount?: number; engagementRate?: number }) => Promise<void>
  analyzeFromUrl: (url: string, context?: { niche?: string; followerCount?: number; engagementRate?: number }) => Promise<void>
}

const STORAGE_KEY = 'vibe_check_analysis'

/**
 * Hook to fetch video analysis from backend API
 */
export function useVideoAnalysis(): UseVideoAnalysisReturn {
  const [data, setData] = useState<AnalysisResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

  // Load analysis from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        console.log('📂 Loaded analysis from storage:', JSON.parse(stored))
        setData(JSON.parse(stored))
      }
    } catch (err) {
      console.error('Failed to load analysis from storage:', err)
    }
  }, [])

  /**
   * Save analysis to localStorage
   */
  const saveToStorage = (analysis: AnalysisResponse) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(analysis))
      setData(analysis)
    } catch (err) {
      console.error('Failed to save analysis to storage:', err)
    }
  }

  /**
   * Analyze video from file upload
   */
  const analyzeVideo = useCallback(
    async (file: File, context?: { niche?: string; followerCount?: number; engagementRate?: number }) => {
      setLoading(true)
      setError(null)
      setData(null) // Clear old data before new analysis

      try {
        const formData = new FormData()
        formData.append('video', file)
        if (context?.niche) formData.append('niche', context.niche)
        if (context?.followerCount) formData.append('followerCount', context.followerCount.toString())
        if (context?.engagementRate) formData.append('engagementRate', context.engagementRate.toString())

        console.log('📤 Sending video to:', `${API_BASE}/api/v1/analysis/upload`)
        const response = await fetch(`${API_BASE}/api/v1/analysis/upload`, {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to analyze video')
        }

        const result = await response.json()
        console.log('✅ Backend analysis response:', result)
        saveToStorage(result)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to analyze video'
        console.error('❌ Error:', errorMessage)
        setError(errorMessage)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [API_BASE],
  )

  /**
   * Analyze video from URL (TikTok, Instagram, YouTube)
   */
  const analyzeFromUrl = useCallback(
    async (url: string, context?: { niche?: string; followerCount?: number; engagementRate?: number }) => {
      setLoading(true)
      setError(null)
      setData(null) // Clear old data before new analysis

      try {
        console.log('📤 Sending URL to:', `${API_BASE}/api/v1/analysis/link`)
        const response = await fetch(`${API_BASE}/api/v1/analysis/link`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url,
            niche: context?.niche,
            followerCount: context?.followerCount,
            engagementRate: context?.engagementRate,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to analyze video')
        }

        const result = await response.json()
        console.log('✅ Backend analysis response:', result)
        saveToStorage(result)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to analyze video'
        setError(errorMessage)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [API_BASE],
  )

  return { data, loading, error, analyzeVideo, analyzeFromUrl }
}