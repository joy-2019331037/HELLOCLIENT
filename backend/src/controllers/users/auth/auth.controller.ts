import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus, InternalServerErrorException, ConflictException, Get, UseGuards, Patch } from '@nestjs/common';
import { AuthService } from '../../../services/users/auth.service';
import { LoginDto } from '../../../dto/users/login.dto';
import { RegisterDto } from '../../../dto/users/register.dto';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { GetUser } from '../../../decorators/get-user.decorator';
import { UpdateThemePreferenceDto } from '../../../dto/users/theme-preference.dto';

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
      console.log('Registration request received:', {
        email: registerDto.email,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName
      });

      const result = await this.authService.register(registerDto);
      console.log('Registration successful:', {
        email: registerDto.email,
        timestamp: new Date().toISOString()
      });
      return result;
    } catch (error) {
      console.error('Registration error in controller:', {
        error: error.message,
        stack: error.stack,
        email: registerDto.email,
        timestamp: new Date().toISOString()
      });
      
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      
      throw new InternalServerErrorException('Registration failed. Please try again later.');
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@GetUser() user: any) {
    return user;
  }

  @Patch('theme-preference')
  @UseGuards(JwtAuthGuard)
  async updateThemePreference(@GetUser() user: any, @Body() updateThemePreferenceDto: UpdateThemePreferenceDto) {
    return this.authService.updateThemePreference(user.id, updateThemePreferenceDto);
  }
} 