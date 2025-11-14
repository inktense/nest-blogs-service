import { Resolver, Query, Args } from '@nestjs/graphql';
import { Blog } from 'src/graphql.schema';

@Resolver('Blog')
export class BlogsResolver {

  @Query()
   getBlog(@Args('slug') slug: string) {
    console.log(slug);
    return [];
  }
}