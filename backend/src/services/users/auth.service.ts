import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../../dto/users/register.dto';

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
      const existingUser = await this.usersService.findByEmail(registerDto.email);
      if (existingUser) {
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
      };

      const user = await this.usersService.create(userData);
      return this.login(user);
    } catch (error) {
      console.error('AuthService registration error:', error);
      
      if (error instanceof ConflictException) {
        throw error;
      }
      
      throw new ConflictException('Registration failed. Please try again.');
    }
  }
} 