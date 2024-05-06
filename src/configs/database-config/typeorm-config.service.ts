import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('app.databaseType'),
      host: this.configService.get('app.databaseHost'),
      port: this.configService.get('app.databasePort'),
      username: this.configService.get('app.databaseUserName'),
      password: this.configService.get('app.databasePassword'),
      database: this.configService.get('app.databaseName'),
      synchronize: true,
      dropSchema: false,
      autoLoadEntities: true,
      keepConnectionAlive: true,
      // logging: this.configService.get('app.nodeEnv') !== 'production',
      logging: false,
      entities: [__dirname + '../../*/.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*/{.ts,.js}'],
      cli: {
        entitiesDir: 'src',
        migrationsDir: 'src/database-config/migrations',
        subscribersDir: 'subscriber',
      },
    } as TypeOrmModuleOptions;
  }
}