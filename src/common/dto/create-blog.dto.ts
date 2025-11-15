import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePostDto } from './create-post.dto';

export class CreateBlogDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostDto)
  posts!: CreatePostDto[];
}
