import { Module } from '@nestjs/common';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { DatabaseModule } from 'src/common/databases/databases.module';
import { PostgresPostsRepository } from './postgres-posts.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    PostsResolver,
    PostsService,
    {
      provide: 'PostsRepositoryInterface',
      useClass: PostgresPostsRepository,
    },
  ],
})
export class PostsModule {}
