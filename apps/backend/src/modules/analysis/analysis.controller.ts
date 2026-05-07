// src/modules/analysis/analysis.controller.ts

import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { AnalysisService } from './analysis.service';
import { VideoService } from '../video/video.service';
import { AnalysisResponseDto } from '../../common/dto/analysis-response.dto';

@ApiTags('Video Analysis')
@Controller('api/v1/analysis')
export class AnalysisController {
  constructor(
    private analysisService: AnalysisService,
    private videoService: VideoService,
  ) {}

  /**
   * Analyze video from file upload
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('video'))
  @ApiOperation({
    summary: 'Analyze uploaded video',
    description:
      'Upload a video file and get AI-powered analysis with performance predictions',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        video: {
          type: 'string',
          format: 'binary',
          description: 'Video file (MP4, MOV, WebM, max 100MB)',
        },
        niche: {
          type: 'string',
          example: 'Beauty, Fitness, Tech',
          description: 'Content niche (optional)',
        },
        followerCount: {
          type: 'number',
          example: 50000,
          description: 'Current follower count (optional)',
        },
        engagementRate: {
          type: 'number',
          example: 3.5,
          description: 'Engagement rate in % (optional)',
        },
      },
      required: ['video'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Analysis completed successfully',
    type: AnalysisResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid video file or parameters',
  })
  async analyzeUploadedVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ): Promise<AnalysisResponseDto> {
    if (!file) {
      throw new BadRequestException('No video file provided');
    }

    // Step 1: Handle file upload
    const filePath = await this.videoService.handleFileUpload(file);

    // Step 2: Analyze video
    const analysis = await this.analysisService.analyzeVideo(
      filePath,
      file.originalname,
      {
        niche: body.niche,
        followerCount: body.followerCount
          ? parseInt(body.followerCount)
          : undefined,
        engagementRate: body.engagementRate
          ? parseFloat(body.engagementRate)
          : undefined,
      },
    );

    // Step 3: Save to database (TODO: get actual userId from auth)
    const user_id = 'demo_user_123'; // TODO: Replace with actual user from JWT token
    await this.analysisService.saveAnalysis(
      user_id,
      filePath,
      file.originalname,
      analysis,
      {
        niche: body.niche,
        followerCount: body.followerCount,
        engagementRate: body.engagementRate,
      },
    );

    return analysis;
  }

  /**
   * Analyze video from URL (TikTok, Instagram, YouTube)
   */
  @Post('link')
  @ApiOperation({
    summary: 'Analyze video from URL',
    description: 'Paste a TikTok, Instagram, or YouTube link to get analysis',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          example: 'https://www.tiktok.com/v/1234567890',
          description: 'TikTok, Instagram, or YouTube video URL',
        },
        niche: {
          type: 'string',
          example: 'Beauty, Fitness, Tech',
        },
        followerCount: {
          type: 'number',
          example: 50000,
        },
        engagementRate: {
          type: 'number',
          example: 3.5,
        },
      },
      required: ['url'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Analysis completed successfully',
    type: AnalysisResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid URL or analysis failed',
  })
  async analyzeLinkVideo(
    @Body()
    body: {
      url: string;
      niche?: string;
      followerCount?: number;
      engagementRate?: number;
    },
  ): Promise<AnalysisResponseDto> {
    if (!body.url) {
      throw new BadRequestException('URL is required');
    }

    // Step 1: Download video from URL
    const filePath = await this.videoService.downloadFromUrl(body.url);

    // Step 2: Analyze video
    const analysis = await this.analysisService.analyzeVideo(
      filePath,
      `video_from_${body.url}`,
      {
        niche: body.niche,
        followerCount: body.followerCount,
        engagementRate: body.engagementRate,
      },
    );

    // Step 3: Save to database
    const user_id = 'demo_user_123'; // TODO: Replace with actual user from JWT token
    await this.analysisService.saveAnalysis(
      user_id,
      filePath,
      body.url,
      analysis,
      {
        niche: body.niche,
        followerCount: body.followerCount,
        engagementRate: body.engagementRate,
      },
    );

    return analysis;
  }

  /**
   * Health check endpoint
   */
  @Post('health')
  @ApiOperation({
    summary: 'Health check',
    description: 'Test if the API is working',
  })
  @ApiResponse({
    status: 200,
    description: 'API is healthy',
  })
  async health() {
    return {
      status: 'ok',
      message: 'Vibe Check API is running',
      timestamp: new Date(),
    };
  }
}
