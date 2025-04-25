import { IsEmail, IsString, MinLength, IsOptional, IsBoolean, IsDate, IsJSON } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  timezone?: string;

  @IsJSON()
  @IsOptional()
  notificationPreferences?: any;

  @IsJSON()
  @IsOptional()
  dashboardPreferences?: any;
} 