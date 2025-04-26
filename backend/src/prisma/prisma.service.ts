import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Database connected successfully');

      // Try to check migrations, but don't fail if the table doesn't exist yet
      try {
        const migrations = await this.$queryRaw`
          SELECT * FROM "prisma_migrations"
        `;
        console.log('Database migrations:', migrations);
      } catch (error) {
        if (error.code === '42P01') { // Table doesn't exist
          console.log('Migrations table does not exist yet. This is normal for a new database.');
        } else {
          console.error('Error checking migrations:', error);
        }
      }
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
} 