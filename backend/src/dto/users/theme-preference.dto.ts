// backend/src/dto/users/theme-preference.dto.ts
import { IsString, IsIn } from 'class-validator';

export class UpdateThemePreferenceDto {
  @IsString()
  @IsIn(['light', 'dark'])
  themePreference: 'light' | 'dark';
}