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

        if (!configService.get<string>('DATABASE_URL')) {
          throw new Error('DATABASE_URL must be defined');
        }

        const databaseUrl = configService.get<string>('DATABASE_URL');

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
