// src/modules/video/video.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

interface VideoMetadata {
  duration: number;
  width: number;
  height: number;
  fps: number;
  fileSize: number;
}

interface VideoSummary {
  metadata: VideoMetadata;
  fileName: string;
  sceneChanges: number;
  estimatedHooks: string[];
  textOverlays: string[];
}

@Injectable()
export class VideoService {
  private readonly uploadDir = path.join(process.cwd(), 'uploads');

  constructor() {
    // Ensure upload directory exists
    this.ensureUploadDir();
  }

  private async ensureUploadDir() {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create upload directory:', error);
    }
  }

  /**
   * Handle file upload
   */
  async handleFileUpload(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validate file
    const validation = this.validateVideoFile(file);
    if (!validation.valid) {
      throw new BadRequestException(validation.error);
    }

    // Save file
    const fileName = `${Date.now()}_${file.originalname}`;
    const filePath = path.join(this.uploadDir, fileName);

    try {
      await fs.writeFile(filePath, file.buffer);
      return filePath;
    } catch (error) {
      throw new BadRequestException(`Failed to save file: ${error.message}`);
    }
  }

  /**
   * Download video from URL (TikTok, Instagram, YouTube)
   * NOTE: In production, use yt-dlp CLI or python-shell
   * For now, we'll return a mock implementation
   */
  async downloadFromUrl(url: string): Promise<string> {
    // TODO: Implement actual download using yt-dlp
    // This is a placeholder - real implementation would use:
    // const { spawn } = require('child_process')
    // const ytdlp = spawn('yt-dlp', ['-f', 'best[ext=mp4]', '-o', filePath, url])

    console.log(`Downloading video from: ${url}`);

    // For now, validate URL format
    const isValidUrl = this.validateVideoUrl(url);
    if (!isValidUrl.valid) {
      throw new BadRequestException(isValidUrl.error);
    }

    // Mock file path (in Phase 4, replace with actual yt-dlp download)
    const fileName = `${Date.now()}_downloaded.mp4`;
    const filePath = path.join(this.uploadDir, fileName);

    return filePath;
  }

  /**
   * Validate video file
   */
  private validateVideoFile(file: Express.Multer.File): {
    valid: boolean;
    error?: string;
  } {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const validTypes = ['video/mp4', 'video/quicktime', 'video/webm'];

    if (file.size > maxSize) {
      return { valid: false, error: 'Video must be smaller than 100MB' };
    }

    if (!validTypes.includes(file.mimetype)) {
      return { valid: false, error: 'Only MP4, MOV, WebM formats supported' };
    }

    return { valid: true };
  }

  /**
   * Validate URL (TikTok, Instagram, YouTube)
   */
  private validateVideoUrl(url: string): {
    valid: boolean;
    platform?: string;
    error?: string;
  } {
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname;

      if (domain.includes('tiktok') || domain.includes('douyin')) {
        return { valid: true, platform: 'tiktok' };
      }
      if (domain.includes('instagram') || domain.includes('insta')) {
        return { valid: true, platform: 'instagram' };
      }
      if (domain.includes('youtube') || domain.includes('youtu.be')) {
        return { valid: true, platform: 'youtube' };
      }

      return {
        valid: false,
        error: 'Only TikTok, Instagram, or YouTube links supported',
      };
    } catch {
      return { valid: false, error: 'Invalid URL format' };
    }
  }

  /**
   * Extract video metadata
   * NOTE: In production, use ffprobe
   * For now, return mock data
   */
  async extractMetadata(filePath: string): Promise<VideoMetadata> {
    // TODO: Implement ffprobe integration
    // const { execFile } = require('child_process')
    // const ffprobe = promisify(execFile)
    // const result = await ffprobe('ffprobe', ['-v', 'quiet', '-print_format', 'json', filePath])

    // Mock metadata for Phase 3
    // In Phase 4, replace with actual ffprobe extraction
    return {
      duration: 15, // seconds
      width: 1080,
      height: 1920,
      fps: 30,
      fileSize: 5242880, // 5MB
    };
  }

  /**
   * Extract video summary for AI analysis
   */
  async generateVideoSummary(
    filePath: string,
    fileName: string,
  ): Promise<VideoSummary> {
    try {
      // Get metadata
      const metadata = await this.extractMetadata(filePath);

      // Mock video analysis (would extract frames, detect scene changes, OCR text)
      const videoSummary: VideoSummary = {
        metadata,
        fileName,
        sceneChanges: 8, // Mock: number of cuts detected
        estimatedHooks: [
          'Fast-paced opening with music',
          'Text overlay appears at 2 seconds',
          'Quick zoom transition at 4 seconds',
        ],
        textOverlays: ['Shop now', 'Link in bio', 'Follow for more'],
      };

      return videoSummary;
    } catch (error) {
      throw new BadRequestException(
        `Failed to extract video summary: ${error.message}`,
      );
    }
  }

  /**
   * Clean up uploaded file
   */
  async deleteFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error(`Failed to delete file ${filePath}:`, error);
    }
  }
}
