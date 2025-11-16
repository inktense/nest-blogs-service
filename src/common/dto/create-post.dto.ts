import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  blog: string;
}
