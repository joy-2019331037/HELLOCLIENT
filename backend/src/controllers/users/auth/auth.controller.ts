import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { AuthService } from '../../../services/users/auth.service';
import { LoginDto } from '../../../dto/users/login.dto';
import { RegisterDto } from '../../../dto/users/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    try {
      console.log('Registering user:', registerDto);
      const result = await this.authService.register(registerDto);
      console.log('Registration successful:', result);
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error instanceof ConflictException) {
        throw error;
      }
      
      throw new InternalServerErrorException('Registration failed. Please try again later.');
    }
  }
} 