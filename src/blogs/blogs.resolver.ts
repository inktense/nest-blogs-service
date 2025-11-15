import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Blog } from 'src/graphql/graphql.schema';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from 'src/common/dto/create-blog.dto';

@Resolver('Blog')
export class BlogsResolver {
  constructor(private readonly blogsService: BlogsService) {}

  @Query()
  async getBlogbySlug(@Args('slug') slug: string): Promise<Blog | null> {
    console.log(slug);
    return await this.blogsService.getBlogBySlug(slug);
  }

  @Mutation()
  async createBlogwithPosts(@Args('blog') blog: CreateBlogDto): Promise<Blog> {
    return await this.blogsService.createBlogwithPosts(blog);
  }
}
