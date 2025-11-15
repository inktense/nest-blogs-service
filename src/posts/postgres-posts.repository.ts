import { Injectable, Inject } from '@nestjs/common';
import type { Knex } from 'knex';
import { randomUUID } from 'node:crypto';
import type { IPostsRepository } from './posts.repository';
import type { Post } from 'src/graphql/graphql.schema';
import type { CreatePostDto } from '../common/dto/create-post.dto';

@Injectable()
export class PostgresPostsRepository implements IPostsRepository {
  constructor(
    @Inject('PG_CONNECTION')
    private readonly pgConnection: Knex,
  ) {}

  async createPost(postData: CreatePostDto): Promise<Post> {
    console.log('postData =>', postData);
    const now = new Date().toISOString();
    const post = {
      id: randomUUID(),
      title: postData.title,
      content: postData.content,
      blog: postData.blog,
      createdAt: now,
      updatedAt: now,
    };

    try {
      await this.pgConnection('posts').insert(post);
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }

    return post;
  }
}
