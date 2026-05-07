// src/modules/analysis/groq.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import Groq from 'groq-sdk';
import {
  AnalysisResponseDto,
  MonetizationStrategyDto,
} from '../../common/dto/analysis-response.dto';

@Injectable()
export class GroqService {
  private groq: Groq;

  constructor() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('GROQ_API_KEY environment variable is not set');
    }
    this.groq = new Groq({ apiKey });
  }

  /**
   * Analyze video using Groq API
   */
  async analyzeVideo(
    videoSummary: any,
    userContext: any,
  ): Promise<AnalysisResponseDto> {
    try {
      // Build the prompt
      const prompt = this.buildAnalysisPrompt(videoSummary, userContext);

      // Call Groq API
      const message = await this.groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });
      // Parse the response
      const responseText = message.choices[0]?.message?.content || '';
      const analysis = this.parseAnalysisResponse(responseText, videoSummary);

      return analysis;
    } catch (error) {
      throw new BadRequestException(`Groq API error: ${error.message}`);
    }
  }

  /**
   * Build the analysis prompt
   */
  private buildAnalysisPrompt(videoSummary: any, userContext: any): string {
    return `You are an expert short-form video analyst. Analyze this video and provide structured feedback.

VIDEO METADATA:
- Duration: ${videoSummary.metadata.duration} seconds
- Resolution: ${videoSummary.metadata.width}x${videoSummary.metadata.height}
- FPS: ${videoSummary.metadata.fps}
- Scene changes detected: ${videoSummary.sceneChanges}

CONTENT OBSERVATIONS:
- Estimated hooks: ${videoSummary.estimatedHooks.join(', ')}
- Text overlays: ${videoSummary.textOverlays.join(', ')}

CREATOR CONTEXT:
- Content niche: ${userContext.niche || 'Not specified'}
- Current followers: ${userContext.followerCount || 'Unknown'}
- Engagement rate: ${userContext.engagementRate || 'Unknown'}%

PLEASE PROVIDE ANALYSIS IN THIS EXACT JSON FORMAT (no markdown, just raw JSON):
{
  "performanceScore": <0-100 number>,
  "viralyPrediction": "<low|medium|high>",
  "confidence": <0-100 number>,
  "reasoning": "<brief explanation of the score>",
  "qualityBreakdown": {
    "hookStrength": <0-10>,
    "pacing": <0-10>,
    "visualAppeal": <0-10>,
    "audioQuality": <0-10>,
    "callToAction": <0-10>
  },
  "hookAnalysis": "<detailed feedback on the hook>",
  "pacingFeedback": "<feedback on video pacing>",
  "improvements": [
    "<specific improvement 1>",
    "<specific improvement 2>",
    "<specific improvement 3>",
    "<specific improvement 4>"
  ],
  "monetizationStrategies": [
    {
      "method": "<strategy name>",
      "difficulty": "<easy|medium|hard>",
      "estimatedRevenue": "<revenue range>",
      "timeToRevenue": "<time estimate>",
      "steps": [
        "<step 1>",
        "<step 2>",
        "<step 3>"
      ],
      "nicheFit": "<how well it fits the creator's niche>"
    }
  ]
}

Be honest and constructive. No exaggerated claims about guaranteed virality. Focus on actionable insights.`;
  }

  /**
   * Parse Groq API response
   */
  private parseAnalysisResponse(
    responseText: string,
    videoSummary: any,
  ): AnalysisResponseDto {
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not find JSON in response');
      }

      const parsed = JSON.parse(jsonMatch[0]);

      return {
        id: `analysis_${Date.now()}`,
        performanceScore: parsed.performanceScore || 0,
        viralyPrediction: parsed.viralyPrediction || 'medium',
        qualityBreakdown: {
          hookStrength: parsed.qualityBreakdown?.hookStrength || 5,
          pacing: parsed.qualityBreakdown?.pacing || 5,
          visualAppeal: parsed.qualityBreakdown?.visualAppeal || 5,
          audioQuality: parsed.qualityBreakdown?.audioQuality || 5,
          callToAction: parsed.qualityBreakdown?.callToAction || 5,
        },
        hookAnalysis: parsed.hookAnalysis || 'Analysis not available',
        pacingFeedback: parsed.pacingFeedback || 'Feedback not available',
        improvements: parsed.improvements || [],
        monetizationStrategies: (parsed.monetizationStrategies || []).map(
          (strategy: any) => ({
            method: strategy.method || 'Unknown',
            difficulty: strategy.difficulty || 'medium',
            estimatedRevenue: strategy.estimatedRevenue || 'Varies',
            timeToRevenue: strategy.timeToRevenue || 'Unknown',
            steps: strategy.steps || [],
            nicheFit: strategy.nicheFit || 'Depends on your niche',
          }),
        ),
        confidence: parsed.confidence || 50,
        reasoning: parsed.reasoning || 'Analysis complete',
        createdAt: new Date(),
      };
    } catch (error) {
      console.error('Failed to parse Groq response:', error);
      // Return fallback analysis if parsing fails
      return this.getFallbackAnalysis();
    }
  }

  /**
   * Fallback analysis if Groq fails
   */
  private getFallbackAnalysis(): AnalysisResponseDto {
    return {
      id: `analysis_${Date.now()}`,
      performanceScore: 65,
      viralyPrediction: 'medium',
      qualityBreakdown: {
        hookStrength: 6,
        pacing: 6,
        visualAppeal: 6,
        audioQuality: 5,
        callToAction: 6,
      },
      hookAnalysis:
        'Video has decent engagement potential. Hook could be stronger.',
      pacingFeedback: 'Pacing is acceptable for short-form content.',
      improvements: [
        'Strengthen the opening hook in first 2 seconds',
        'Add more dynamic transitions',
        'Include clearer call-to-action',
        'Use trending audio and hashtags',
      ],
      monetizationStrategies: [
        {
          method: 'TikTok Creator Fund',
          difficulty: 'easy',
          estimatedRevenue: '$100-500/month',
          timeToRevenue: '1-2 months',
          steps: [
            'Meet eligibility requirements',
            'Enable creator fund',
            'Create consistent content',
          ],
          nicheFit: 'Available for most niches',
        },
      ],
      confidence: 40,
      reasoning:
        'Analysis generated with fallback method due to API limitation',
      createdAt: new Date(),
    };
  }
}
