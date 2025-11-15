import { Injectable, Inject } from '@nestjs/common';
import type { Knex } from 'knex';
import { randomUUID } from 'node:crypto';
import type { IBlogsRepository } from './blogs.repository';
import type { Blog, Post } from 'src/graphql/graphql.schema';
import type { CreateBlogDto } from '../common/dto/create-blog.dto';

@Injectable()
export class PostgresBlogsRepository implements IBlogsRepository {
  constructor(
    @Inject('PG_CONNECTION')
    private readonly pgConnection: Knex,
  ) {}

  async createBlogwithPosts(blogData: CreateBlogDto): Promise<Blog> {
    console.log('blogData =>', blogData);
    const now = new Date().toISOString();
    let posts: Post[] = [];
    const blog = {
      id: randomUUID(),
      name: blogData.name,
      slug: blogData.slug,
      createdAt: now,
      updatedAt: now,
    };

    if (blogData.posts && blogData.posts.length > 0) {
      posts = blogData.posts.map((post) => ({
        id: randomUUID(),
        blog: blog.id,
        title: post.title,
        content: post.content,
        createdAt: now,
        updatedAt: now,
      }));
    }

    try {
      await this.pgConnection.transaction(async (trx) => {
        await trx('blogs').insert(blog);
        if (posts.length > 0) {
          await trx('posts').insert(posts);
        }
      });
    } catch (error) {
      console.error('Error creating blog with posts:', error);
      throw error;
    }

    console.log('blogData =>', blogData);
    const test = await this.pgConnection.select().from('blogs');
    console.log('test =>', test);
    return {
        id: blog.id,
        name: blog.name,
        slug: blog.slug,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        posts: posts.map((p) => ({
          id: p.id,
          title: p.title,
          content: p.content,
          blog: p.blog,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
        })),
      };
  }

  async getBlogBySlug(slug: string): Promise<Blog | null> {
    const blog = await this.pgConnection
      .select()
      .from('blogs')
      .where('slug', slug)
      .first();
    return blog ?? null;
  }
}
