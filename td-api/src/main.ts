import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './core/transform.interceptor';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  app.enableCors({
    origin: true, // cho phép nơi nào có thể kết nối tới
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe(
      { whitelist: true }, // truyền thừa data sẽ auto loại bỏ Object[key] thừa
    ),
  );
  // config versioning api  ( cho phép quản lý, thêm đuôi v1, v2 ... cho đối tượng khác nhau)
  app.setGlobalPrefix('api'); // config tiền tố trước link api
  app.enableVersioning({
    type: VersioningType.URI,
    // prefix:'api/v', // config tiền tố trước link api
    defaultVersion: ['1', '2'],
  });
  //config swagger
  const config = new DocumentBuilder() // tài liệu api
    .setTitle('NestJs API Document')
    .setDescription('All API Module')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'token',
    )
    .addSecurityRequirements('token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
