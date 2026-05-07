// src/modules/database/database.service.ts

import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { Pool, QueryResult } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger('DatabaseService');
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'vibe_check',
    });

    this.pool.on('error', (err) => {
      this.logger.error('Unexpected error on idle client', err);
    });
  }

  async onModuleInit() {
    try {
      const client = await this.pool.connect();
      await client.query('SELECT NOW()');
      client.release();
      this.logger.log('✓ Database connected successfully');
    } catch (error) {
      this.logger.error('✗ Failed to connect to database:', error.message);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
    this.logger.log('✓ Database pool closed');
  }

  /**
   * Execute query and return results
   */
  async query(text: string, params?: any[]): Promise<QueryResult> {
    try {
      return await this.pool.query(text, params);
    } catch (error) {
      this.logger.error(`Query error: ${text}`, error.message);
      throw error;
    }
  }

  /**
   * Get single row
   */
  async queryOne(text: string, params?: any[]): Promise<any> {
    const result = await this.query(text, params);
    return result.rows[0] || null;
  }

  /**
   * Get all rows
   */
  async queryAll(text: string, params?: any[]): Promise<any[]> {
    const result = await this.query(text, params);
    return result.rows;
  }
}
