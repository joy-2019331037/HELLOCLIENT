import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController as UserAuthController } from './controllers/users/auth/auth.controller';
import { AuthService } from './services/users/auth.service';
import { UsersService } from './services/users/users.service';
import { JwtStrategy } from './services/users/strategies/jwt.strategy';
import { ClientController } from './controllers/client/client.controller';
import { ClientService } from './services/client/client.service';
import { ProjectController } from './controllers/project/project.controller';
import { ProjectService } from './services/project.service';
import { InteractionController } from './controllers/interaction.controller';
import { InteractionService } from './services/interaction.service';
import { ReminderController } from './controllers/reminder.controller';
import { ReminderService } from './services/reminder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [
    AppController,
    UserAuthController,
    ClientController,
    ProjectController,
    InteractionController,
    ReminderController,
  ],
  providers: [
    AuthService,
    UsersService,
    JwtStrategy,
    ClientService,
    ProjectService,
    InteractionService,
    ReminderService,
  ],
})
export class AppModule {} 