import { Injectable, Inject } from '@nestjs/common';
import type { Knex } from 'knex';
import type { IBlogsRepository } from './blogs.repository';
import { Blog } from 'src/graphql.schema';
import type { CreateBlogDto } from '../common/dto/create-blog.dto';

@Injectable()
export class PostgresBlogsRepository implements IBlogsRepository {
  constructor(
    @Inject('PG_CONNECTION')
    private readonly pgConnection: Knex,
  ) {}

  async createBlogwithPosts(blogData: CreateBlogDto): Promise<Blog> {
    const blog : Blog = await this.pgConnection.insert(blogData).into('blogs');
    return blog;
  }

  async getBlogBySlug(slug: string): Promise<Blog | null> {
    const blog = await this.pgConnection.select().from('blogs').where('slug', slug).first();
    return blog ?? null;
  }
}