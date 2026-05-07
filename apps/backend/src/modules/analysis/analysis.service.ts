import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { VideoService } from '../video/video.service';
import {
  AnalysisResponseDto,
  MonetizationStrategyDto,
} from '../../common/dto/analysis-response.dto';
import { GroqService } from './groq.service';

@Injectable()
export class AnalysisService {
  constructor(
    private db: DatabaseService,
    private videoService: VideoService,
    private groqService: GroqService,
  ) {}

  async analyzeVideo(
    filePath: string,
    fileName: string,
    userContext: {
      niche?: string;
      followerCount?: number;
      engagementRate?: number;
    },
  ): Promise<AnalysisResponseDto> {
    try {
      // Step 1: Extract video summary
      const videoSummary = await this.videoService.generateVideoSummary(
        filePath,
        fileName,
      );
      // Step 2: Send to Groq AI for analysis
      const analysis = await this.groqService.analyzeVideo(
        videoSummary,
        userContext,
      );
      return analysis;
    } catch (error: any) {
      throw new BadRequestException(`Analysis failed: ${error.message}`);
    }
  }

  private buildAIPrompt(videoSummary: any, userContext: any): string {
    return `Analyze this video: ${videoSummary.fileName}`;
  }

  private async getMockAnalysis(
    videoSummary: any,
    userContext: any,
  ): Promise<AnalysisResponseDto> {
    const monetizationStrategies: MonetizationStrategyDto[] = [
      {
        method: 'TikTok Shop Affiliate',
        difficulty: 'easy',
        estimatedRevenue: '$200-800/month',
        timeToRevenue: '1-2 weeks',
        steps: ['Apply to TikTok Shop', 'Link products', 'Create videos'],
        nicheFit: 'Perfect fit',
      },
    ];

    return {
      id: `analysis_${Date.now()}`,
      performanceScore: 72,
      viralyPrediction: 'medium',
      qualityBreakdown: {
        hookStrength: 8,
        pacing: 7,
        visualAppeal: 8,
        audioQuality: 6,
        callToAction: 7,
      },
      hookAnalysis: 'Strong opening.',
      pacingFeedback: 'Good pacing.',
      improvements: ['Add hashtag', 'Better CTA'],
      monetizationStrategies,
      confidence: 75,
      reasoning: 'Strong technical qualities.',
      createdAt: new Date(),
    };
  }

  async saveAnalysis(
    user_id: string,
    video_path: string,
    fileName: string,
    analysis: AnalysisResponseDto,
    userContext: any,
  ) {
    try {
      const query = `
        INSERT INTO analyses (
          user_id, video_path, file_name, performance_score,
          viraly_prediction, confidence, reasoning, quality_breakdown,
          hook_analysis, pacing_feedback, improvements,
          monetization_strategies, niche, follower_count,
          engagement_rate, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW(), NOW())
        RETURNING id, created_at
      `;

      const result = await this.db.query(query, [
        user_id,
        video_path,
        fileName,
        analysis.performanceScore,
        analysis.viralyPrediction,
        analysis.confidence,
        analysis.reasoning,
        JSON.stringify(analysis.qualityBreakdown),
        analysis.hookAnalysis,
        analysis.pacingFeedback,
        // JSON.stringify(analysis.improvements),
        analysis.improvements,
        JSON.stringify(analysis.monetizationStrategies),
        // analysis.monetizationStrategies,
        userContext.niche || null,
        userContext.followerCount || null,
        userContext.engagementRate || null,
      ]);

      return result.rows[0];
    } catch (error) {
      throw new BadRequestException(
        `Failed to save analysis: ${error.message}`,
      );
    }
  }
}
