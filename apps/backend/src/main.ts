// src/main.ts

import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable CORS for frontend
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  })

  // Swagger Documentation Setup
  const config = new DocumentBuilder()
    .setTitle('Vibe Check API')
    .setDescription(
      'AI-powered video analyzer for TikTok, Instagram, and YouTube. Get performance predictions, quality feedback, and monetization strategies.',
    )
    .setVersion('1.0.0')
    .addTag('Video Analysis', 'Upload and analyze videos')
    .addServer('http://localhost:3001', 'Local development')
    .addServer('https://api.vibecheck.app', 'Production')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })

  const PORT = process.env.PORT || 3001
  await app.listen(PORT)
  console.log(`✓ Vibe Check API running on http://localhost:${PORT}`)
  console.log(`✓ Swagger docs available at http://localhost:${PORT}/api/docs`)
}

bootstrap()