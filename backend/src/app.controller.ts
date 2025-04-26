import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Welcome to Mini-CRM API!';
  }
} 