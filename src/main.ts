import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply Middlewares
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
        },
      },
    }),
  );

  // CORS Policy
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  // Swagger
  const swagger = new DocumentBuilder()
    .setTitle('Ecommerce-NestJs - App API')
    .setDescription('Ecommerce APP Using NestJs')
    .addServer(process.env.API_BASE_URL || 'https://ecommerce-nest-js.vercel.app')
    .setTermsOfService(`${process.env.API_BASE_URL || 'https://ecommerce-nest-js.vercel.app'}/terms-of-service`)
    .setLicense('MIT License', 'https://google.com')
    .setVersion('1.0')
    .addSecurity('bearer', { type: 'http', scheme: 'bearer' })
    .addBearerAuth()
    .build();
  const documentation = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('swagger', app, documentation);

  // Running The App
  await app.listen(process.env.PORT || 5000);
}
bootstrap();