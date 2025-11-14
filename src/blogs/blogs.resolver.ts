import { Resolver, Query, Args } from '@nestjs/graphql';
import { Blog } from 'src/graphql.schema';
import { BlogsService } from './blogs.service';

@Resolver('Blog')
export class BlogsResolver {
  constructor(private readonly blogsService: BlogsService) {}

  @Query()
  async getBlogbySlug(@Args('slug') slug: string): Promise<Blog | null> {
    console.log(slug);
    await this.blogsService.getBlogBySlug(slug);
    return null;
  }
}
