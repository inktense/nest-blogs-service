import { Module } from '@nestjs/common';
import { BlogsResolver } from './blogs.resolver';

@Module({
  imports: [],
  providers: [BlogsResolver],
})
export class BlogsModule {}
