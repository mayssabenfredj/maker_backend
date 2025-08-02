import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: [
      '*',
      'http://makerskills.tn',
      'https://makerskills.tn',
      'https://makerskills.tn/',
      'http://localhost:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Set up global pipes BEFORE listening
  app.useGlobalPipes(new ValidationPipe());

  // Set up Swagger BEFORE listening
  const config = new DocumentBuilder()
    .setTitle('Maker Skills API')
    .setDescription('Documentation for the Maker Skills API')
    .setVersion('0.1.0')
    .addBearerAuth() // if you use JWT authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customCssUrl: ['https://unpkg.com/swagger-ui-dist/swagger-ui.css'],
    customJs: [
      'https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js',
      'https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js',
    ],
  });

  // Listen LAST
  await app.listen(process.env.PORT ?? 3020);

  console.log(
    `Application is running on: http://localhost:${process.env.PORT ?? 3020}`,
  );
  console.log(
    `Swagger docs available at: http://localhost:${process.env.PORT ?? 3020}/api`,
  );
}
bootstrap();
