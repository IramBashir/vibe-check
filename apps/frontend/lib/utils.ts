// apps/frontend/lib/utils.ts

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Tailwind CSS class merger (helps with conditional classes)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format numbers: 1000 → "1K"
export function formatNumber(num: number): string {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'
  return num.toString()
}

// Validate video file
export function validateVideoFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 100 * 1024 * 1024 // 100MB
  const validTypes = ['video/mp4', 'video/quicktime', 'video/webm']

  if (file.size > maxSize) {
    return { valid: false, error: 'Video must be smaller than 100MB' }
  }

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Only MP4, MOV, WebM formats supported' }
  }

  return { valid: true }
}

// Validate URL (YouTube, TikTok, Instagram)
export function validateVideoUrl(url: string): { valid: boolean; platform?: string; error?: string } {
  try {
    const urlObj = new URL(url)
    const domain = urlObj.hostname

    if (domain.includes('tiktok') || domain.includes('douyin')) {
      return { valid: true, platform: 'tiktok' }
    }
    if (domain.includes('instagram') || domain.includes('insta')) {
      return { valid: true, platform: 'instagram' }
    }
    if (domain.includes('youtube') || domain.includes('youtu.be')) {
      return { valid: true, platform: 'youtube' }
    }

    return { valid: false, error: 'Only TikTok, Instagram, or YouTube links supported' }
  } catch {
    return { valid: false, error: 'Invalid URL format' }
  }
}

// Format performance score color
export function getScoreColor(score: number): string {
  if (score >= 70) return '#90EE90' // Green
  if (score >= 50) return '#FFD700' // Gold
  return '#FF69B4' // Pink
}

// Get virality label with color
export function getViraityLabel(prediction: 'low' | 'medium' | 'high'): { label: string; color: string } {
  switch (prediction) {
    case 'high':
      return { label: 'High Potential', color: '#90EE90' }
    case 'medium':
      return { label: 'Competitive', color: '#FFD700' }
    case 'low':
      return { label: 'Needs Work', color: '#FF69B4' }
  }
}