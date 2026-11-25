import { INestApplication, ValidationPipe } from '@nestjs/common';
import { createValidationException } from './common/validation/validation-exception.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';

export function setupApp(app: INestApplication): void {
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // bỏ trường lạ client gửi lên
      transform: true, // áp dụng @Transform trong DTO
      stopAtFirstError: true, // mỗi trường chỉ báo một lỗi
      exceptionFactory: createValidationException,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
}
