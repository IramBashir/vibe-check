// src/common/dto/upload-video.dto.ts

export class UploadVideoDto {
  // File upload (optional - user can upload file OR paste link)
  file?: Express.Multer.File;

  // URL input (optional - user can paste TikTok/Instagram/YouTube link)
  url?: string;

  // Creator context (optional but helps with analysis)
  niche?: string;
  followerCount?: number;
  engagementRate?: number;
}
