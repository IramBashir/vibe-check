// apps/frontend/hooks/useVideoAnalysis.ts

import { useCallback, useState } from 'react'
import type { AnalysisResponse } from '@/types'

/**
 * Mock data for demonstration
 * In Phase 5, this will call the actual backend API
 */
const MOCK_ANALYSIS: AnalysisResponse = {
  id: 'analysis_1234567890',
  performanceScore: 78,
  viralyPrediction: 'high',
  qualityBreakdown: {
    hookStrength: 9,
    pacing: 8,
    visualAppeal: 9,
    audioQuality: 7,
    callToAction: 8,
  },
  hookAnalysis:
    'Strong opening! The first 2 seconds grab attention with trending audio + text overlay. This is excellent for TikTok algorithm.',
  pacingFeedback:
    'Scene cuts every 1.2 seconds keep viewers engaged. Perfect pacing for your content length. Consider adding one more transition to match trending video structure.',
  improvements: [
    'Add trending hashtag #DayInMyLife in the first 3 seconds (currently trending with 450B views)',
    'Include a "Shop Now" or "Link in Bio" text overlay at the 15-second mark to improve CTA',
    'Use trending sound from this week instead of generic background music (TikTok algorithm favors trending audio)',
    'Consider extending to 32-45 seconds (your niche performs better at this length)',
  ],
  monetizationStrategies: [
    {
      method: 'TikTok Shop Affiliate',
      difficulty: 'easy',
      estimatedRevenue: '$200-800/month',
      timeToRevenue: '1-2 weeks',
      steps: [
        'Apply to TikTok Shop Partner Program',
        'Link Amazon/AliExpress products in your bio',
        'Create videos featuring products (authentic reviews)',
        'Earn 5-20% commission per sale',
      ],
      nicheFit:
        'Perfect fit! Your content style (unboxing + review) converts well with affiliate links.',
    },
    {
      method: 'Brand Sponsorships',
      difficulty: 'medium',
      estimatedRevenue: '$500-2000/video',
      timeToRevenue: '2-3 months',
      steps: [
        'Reach 50K+ followers (current: working toward)',
        'Create media kit with audience demographics',
        'Use Billo, AspireIQ, or direct outreach to brands',
        'Negotiate sponsorship deals',
      ],
      nicheFit:
        'High potential. Beauty/lifestyle brands actively seek creators in your niche at your follower count.',
    },
    {
      method: 'Digital Products (E-Book/Guide)',
      difficulty: 'hard',
      estimatedRevenue: '$100-500/month',
      timeToRevenue: '6-12 weeks',
      steps: [
        'Create valuable guide (e.g., "Beauty Hacks for Beginners")',
        'Set up sales page using Gumroad or Leadpages',
        'Promote in videos with CTA',
        'Price at $7-17 for impulse purchase rate',
      ],
      nicheFit:
        'Viable option. Your audience trusts your recommendations. Consider after 10K+ followers.',
    },
  ],
  confidence: 82,
  reasoning:
    'Your video shows strong technical qualities (9/10 hook, 9/10 visuals) and aligns with trending content patterns. High virality potential due to quick pacing and emotional resonance. Confidence is high (82%) because we have clear data on your audience and niche preferences.',
}

interface UseVideoAnalysisReturn {
  data: AnalysisResponse | null
  loading: boolean
  error: string | null
  fetchAnalysis: (videoId: string) => Promise<void>
}

/**
 * Hook to fetch video analysis
 * Currently returns mock data
 * Will be updated in Phase 5 to call real API
 */
export function useVideoAnalysis(): UseVideoAnalysisReturn {
  const [data, setData] = useState<AnalysisResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalysis = useCallback(async (videoId: string) => {
    setLoading(true)
    setError(null)

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In Phase 5, replace with:
      // const response = await fetch(`/api/v1/analysis/${videoId}`)
      // const result = await response.json()
      // setData(result)

      // For now, use mock data
      setData(MOCK_ANALYSIS)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analysis')
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, fetchAnalysis }
}