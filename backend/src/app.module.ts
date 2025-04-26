import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
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
import { ProjectService } from './services/project/project.service';
import { InteractionController } from './controllers/interaction/interaction.controller';
import { InteractionService } from './services/interaction/interaction.service';
import { ReminderController } from './controllers/reminder/reminder.controller';
import { ReminderService } from './services/reminder/reminder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('SMTP_HOST'),
          port: configService.get('SMTP_PORT'),
          secure: configService.get('SMTP_SECURE') === 'true',
          auth: {
            user: configService.get('SMTP_USER'),
            pass: configService.get('SMTP_PASS'),
          },
        },
        defaults: {
          from: `"HELLOCLIENT" <${configService.get('SMTP_FROM')}>`,
        },
        template: {
          dir: join(process.cwd(), 'dist/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
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