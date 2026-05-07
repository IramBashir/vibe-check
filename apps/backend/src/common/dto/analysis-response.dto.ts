// src/common/dto/analysis-response.dto.ts

export class QualityBreakdownDto {
  hookStrength: number;
  pacing: number;
  visualAppeal: number;
  audioQuality: number;
  callToAction: number;
}

export class MonetizationStrategyDto {
  method: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedRevenue: string;
  timeToRevenue: string;
  steps: string[];
  nicheFit: string;
}

export class AnalysisResponseDto {
  id: string;
  performanceScore: number;
  viralyPrediction: 'low' | 'medium' | 'high';
  qualityBreakdown: QualityBreakdownDto;
  hookAnalysis: string;
  pacingFeedback: string;
  improvements: string[];
  monetizationStrategies: MonetizationStrategyDto[];
  confidence: number;
  reasoning: string;
  createdAt: Date;
}
