import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { FieldErrors } from '../validation/validation-exception.js';
import { Response } from 'express';

interface ErrorResponse {
  statusCode: number;
  message: string;
  /** Chỉ có khi lỗi gắn với trường cụ thể */
  errors?: FieldErrors;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const body: ErrorResponse = {
      statusCode: exception.getStatus(),
      message: exception.message,
      errors: getFieldErrors(exception),
    };

    response.status(body.statusCode).json(body);
  }
}

function getFieldErrors(exception: HttpException): FieldErrors | undefined {
  const response = exception.getResponse();
  return typeof response === 'object' &&
    'errors' in response &&
    response !== null
    ? (response.errors as FieldErrors)
    : undefined;
}
