import { IsString, IsNumber, IsDate, IsUUID, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsNumber()
  budget: number;

  @IsDate()
  @Transform(({ value }: { value: string }) => new Date(value))
  deadline: Date;

  @IsString()
  status: string;

  @IsUUID()
  clientId: string;
}

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsNumber()
  @IsOptional()
  budget?: number;

  @IsDate()
  @IsOptional()
  @Transform(({ value }: { value: string }) => value ? new Date(value) : undefined)
  deadline?: Date;

  @IsString()
  @IsOptional()
  status?: string;

  @IsUUID()
  @IsOptional()
  clientId?: string;
} 