import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import knex from 'knex';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'PG_CONNECTION',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');

        if (typeof databaseUrl !== 'string' || databaseUrl.length === 0) {
          throw new Error('DATABASE_URL must be defined');
        }

        return knex({
          client: 'pg',
          connection: databaseUrl,
        });
      },
    },
  ],
  exports: ['PG_CONNECTION'],
})
export class DatabaseModule {}
