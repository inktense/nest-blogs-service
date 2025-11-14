import { Blog } from 'src/graphql.schema';
import { CreateBlogDto } from 'src/common/dto/create-blog.dto';

export interface IBlogsRepository {
  createBlogwithPosts(blogData: CreateBlogDto): Promise<Blog>;
  getBlogBySlug(slug: string): Promise<Blog | null>;
}
