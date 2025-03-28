import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Sistema de Convocatorias')
    .setDescription('API del backend de la Escuela Judicial')
    .setVersion('1.0')
    .addBearerAuth() // 👈 Para pasar el token JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // URL: http://localhost:3000/api

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // elimina campos no definidos en DTO
      forbidNonWhitelisted: true, // lanza error si envían campos no válidos
      transform: true,       // convierte los tipos automáticamente (por ej. string a number)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
