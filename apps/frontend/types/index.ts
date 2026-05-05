// apps/frontend/types/index.ts

// Video upload data
export interface VideoInput {
  file?: File;
  url?: string;
  niche?: string;
  followerCount?: number;
  engagementRate?: number;
}

// API response from backend
export interface AnalysisResponse {
  id: string;
  performanceScore: number; // 0-100
  viralyPrediction: 'low' | 'medium' | 'high';
  qualityBreakdown: {
    hookStrength: number; // 0-10
    pacing: number;
    visualAppeal: number;
    audioQuality: number;
    callToAction: number;
  };
  hookAnalysis: string;
  pacingFeedback: string;
  improvements: string[];
  monetizationStrategies: MonetizationStrategy[];
  confidence: number;
  reasoning: string;
}

export interface MonetizationStrategy {
  method: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedRevenue: string;
  timeToRevenue: string;
  steps: string[];
  nicheFit: string;
}

// State for video analysis process
export interface AnalysisState {
  status: 'idle' | 'uploading' | 'processing' | 'analyzing' | 'complete' | 'error';
  progress: number; // 0-100
  data?: AnalysisResponse;
  error?: string;
}