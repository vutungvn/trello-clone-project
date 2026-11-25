import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '../generated/prisma/client.js';
import { ConfigService } from '@nestjs/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const DEFAULT_OMIT = {
  user: { passwordHash: true },
} satisfies Prisma.GlobalOmitConfig;

interface PrismaServiceOptions {
  adapter: PrismaMariaDb;
  omit: typeof DEFAULT_OMIT;
}

@Injectable()
export class PrismaService
  extends PrismaClient<PrismaServiceOptions>
  implements OnModuleInit, OnModuleDestroy
{
  constructor(config: ConfigService) {
    super({
      adapter: new PrismaMariaDb(config.getOrThrow<string>('DATABASE_URL')),
      omit: DEFAULT_OMIT,
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
