import { plainToInstance, Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

export class EnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  DATABASE_URL: string;

  @Max(65535)
  @Min(1)
  @IsInt()
  @Type(() => Number) // .env luôn là chuỗi nên phải đổi sang số
  PORT: number;
}

export function validateEnv(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const env = plainToInstance(EnvironmentVariables, config, {
    exposeDefaultValues: true,
  });

  const errors = validateSync(env, {
    whitelist: true, // chỉ giữ các biến khai báo ở trên
    stopAtFirstError: true,
  });

  if (errors.length > 0) {
    const details = errors
      .flatMap((error) => Object.values(error.constraints ?? {}))
      .map((message) => `- ${message}`)
      .join('\n');
    throw new Error(`Biến môi trường không hợp lệ:\n${details}`);
  }

  return env;
}
