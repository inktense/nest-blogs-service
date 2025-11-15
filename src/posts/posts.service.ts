import { Injectable, Inject } from '@nestjs/common';
import { CreatePostDto } from '../common/dto/create-post.dto';
import type { IPostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    @Inject('PostsRepositoryInterface')
    private readonly postsRepository: IPostsRepository,
  ) {}

  async createPost(CreatePostDto: CreatePostDto) {
    return await this.postsRepository.createPost(CreatePostDto);
  }
}
