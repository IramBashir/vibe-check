// src/modules/analysis/analysis.module.ts

import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';
import { GroqService } from './groq.service';
import { VideoModule } from '../video/video.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [VideoModule, DatabaseModule],
  providers: [AnalysisService, GroqService],
  controllers: [AnalysisController],
  exports: [AnalysisService],
})
export class AnalysisModule {}
