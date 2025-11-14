import { Module } from '@nestjs/common';
import { BlogsResolver } from './blogs.resolver';
import { BlogsService } from './blogs.service';
import { DatabaseModule } from 'src/common/databases/databases.module';
import { PostgresBlogsRepository } from './postgres-blogs.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    BlogsResolver,
    BlogsService,
    {
      provide: 'BlogsRepositoryInterface',
      useClass: PostgresBlogsRepository,
    },
  ],
})
export class BlogsModule {}
