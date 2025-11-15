import { Injectable, Inject } from '@nestjs/common';
import { CreateBlogDto } from '../common/dto/create-blog.dto';
import type { IBlogsRepository } from './blogs.repository';

@Injectable()
export class BlogsService {
  constructor(
    @Inject('BlogsRepositoryInterface')
    private readonly blogsRepository: IBlogsRepository,
  ) {}

  async createBlogwithPosts(createBlogDto: CreateBlogDto) {
    const blog = await this.blogsRepository.createBlogwithPosts(createBlogDto);
    return blog;
  }

  async getBlogBySlug(slug: string) {
    const blog = await this.blogsRepository.getBlogBySlug(slug);
    return blog;
  }
}
