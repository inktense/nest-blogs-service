import { Post } from 'src/graphql/graphql.schema';
import { CreatePostDto } from 'src/common/dto/create-post.dto';

export interface IPostsRepository {
  createPost(postData: CreatePostDto): Promise<Post>;
}
