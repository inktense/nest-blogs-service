import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Post } from 'src/graphql/graphql.schema';
import { PostsService } from './posts.service';
import { CreatePostDto } from 'src/common/dto/create-post.dto';

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation()
  async createPost(@Args('post') post: CreatePostDto): Promise<Post> {
    return await this.postsService.createPost(post);
  }
}
