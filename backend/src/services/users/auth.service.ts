import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../../dto/users/register.dto';
import { UpdateThemePreferenceDto } from '../../dto/users/theme-preference.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    try {
      console.log('Starting registration process for email:', registerDto.email);
      
      const existingUser = await this.usersService.findByEmail(registerDto.email);
      console.log('Existing user check result:', existingUser ? 'User exists' : 'No user found');
      
      if (existingUser) {
        console.log('User already exists with details:', {
          id: existingUser.id,
          email: existingUser.email,
          isActive: existingUser.isActive,
          createdAt: existingUser.createdAt
        });
        throw new ConflictException('Email already exists');
      }

      const { password, ...rest } = registerDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const userData = {
        ...rest,
        password: hashedPassword,
        isActive: true,
        emailVerified: false,
        timezone: rest.timezone || 'UTC',
        notificationPreferences: rest.notificationPreferences || {},
        dashboardPreferences: rest.dashboardPreferences || {},
        themePreference: rest.themePreference || 'light',
      };

      console.log('Creating new user with data:', {
        ...userData,
        password: '***' // Hide password in logs
      });

      const user = await this.usersService.create(userData);
      console.log('User created successfully:', {
        id: user.id,
        email: user.email
      });
      
      return this.login(user);
    } catch (error) {
      console.error('AuthService registration error:', {
        error: error.message,
        stack: error.stack,
        name: error.name
      });
      
      if (error instanceof ConflictException) {
        throw error;
      }
      
      throw error;
    }
  }

  async updateThemePreference(userId: string, updateThemePreferenceDto: UpdateThemePreferenceDto) {
    return this.usersService.updateThemePreference(userId, updateThemePreferenceDto);
  }
} 