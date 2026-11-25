import {
  Body,
  ConflictException,
  Controller,
  Get,
  type INestApplication,
  Post,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IsEmail, IsString, MinLength } from 'class-validator';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { setupApp } from './app.setup.js';

class SampleDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @MinLength(8, { message: 'Mật khẩu tối thiểu 8 ký tự' })
  @IsString({ message: 'Vui lòng nhập mật khẩu' })
  password: string;
}

@Controller('sample')
class SampleController {
  @Post()
  create(@Body() dto: SampleDto) {
    return dto;
  }

  @Get('conflict')
  conflict() {
    throw new ConflictException({
      message: 'Email đã được sử dụng',
      errors: { email: 'Email đã được sử dụng' },
    });
  }

  @Get('crash')
  crash() {
    throw new Error('chi tiết nội bộ');
  }
}

describe('setupApp', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [SampleController],
    }).compile();
    app = module.createNestApplication({ logger: false });
    setupApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('serves routes under /api', async () => {
    await request(app.getHttpServer()).get('/sample/conflict').expect(404);
    await request(app.getHttpServer()).get('/api/sample/conflict').expect(409);
  });

  it('strips unknown fields', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/sample')
      .send({ email: 'an@example.com', password: '12345678', role: 'ADMIN' })
      .expect(201);

    expect(response.body).toEqual({
      email: 'an@example.com',
      password: '12345678',
    });
  });

  it('returns one error per invalid field', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/sample')
      .send({ email: 'abc' })
      .expect(400);

    expect(response.body).toEqual({
      statusCode: 400,
      message: 'Dữ liệu không hợp lệ',
      errors: {
        email: 'Email không hợp lệ',
        password: 'Vui lòng nhập mật khẩu',
      },
    });
  });

  it('keeps field errors of other exceptions', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/sample/conflict')
      .expect(409);

    expect(response.body).toEqual({
      statusCode: 409,
      message: 'Email đã được sử dụng',
      errors: { email: 'Email đã được sử dụng' },
    });
  });

  it('hides details of unexpected errors', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/sample/crash')
      .expect(500);

    expect(response.body).toEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });
});
