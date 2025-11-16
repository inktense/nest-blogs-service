import { IsString, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePostDto } from './create-post.dto';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostDto)
  posts!: CreatePostDto[];
}
