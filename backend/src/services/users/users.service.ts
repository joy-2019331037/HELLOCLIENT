import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateThemePreferenceDto } from '../../dto/users/theme-preference.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    try {
      console.log('Creating user in database with data:', {
        ...data,
        password: '***' // Hide password in logs
      });
      
      const user = await this.prisma.user.create({
        data,
      });
      
      console.log('User created in database:', {
        id: user.id,
        email: user.email
      });
      
      return user;
    } catch (error) {
      console.error('Error creating user in database:', {
        error: error.message,
        stack: error.stack,
        name: error.name
      });
      throw error;
    }
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByVerificationToken(token: string) {
    console.log('Searching for user with verification token:', token);
    try {
      const user = await this.prisma.user.findFirst({
        where: { 
          verificationToken: token,
          emailVerified: false // Only find unverified users
        },
      });
      console.log('User found with verification token:', user ? {
        id: user.id,
        email: user.email,
        verificationToken: user.verificationToken
      } : 'No user found');
      return user;
    } catch (error) {
      console.error('Error finding user by verification token:', {
        token,
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const user = await tx.user.update({
          where: { id },
          data,
        });
        return user;
      });
    } catch (error) {
      console.error('Error updating user:', {
        userId: id,
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id: id.toString() },
    });
  }

  async updateThemePreference(userId: string, updateThemePreferenceDto: UpdateThemePreferenceDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: updateThemePreferenceDto,
    });
  }
} 