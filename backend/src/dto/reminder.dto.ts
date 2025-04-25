import { IsString, IsDate, IsOptional, IsUUID } from 'class-validator';

export class CreateReminderDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  dueDate: Date;

  @IsOptional()
  @IsUUID()
  clientId?: string;

  @IsOptional()
  @IsUUID()
  projectId?: string;
}

export class UpdateReminderDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  dueDate?: Date;
} 