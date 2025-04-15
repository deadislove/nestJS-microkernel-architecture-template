import { ConfigService } from '@nestjs/config';
import { MySQLDatabase } from './mysql.database';
import { PostgresDatabase } from './postgresql.database';
import { SQLiteDatabase } from './sqlite.database';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DatabaseFactory {
  static createDatabaseConnection(dbType: string, configService: ConfigService): TypeOrmModuleOptions {
    switch (dbType) {
      case 'sqlite':
        return new SQLiteDatabase(configService).getConnection();
      case 'postgres':
        return new PostgresDatabase(configService).getConnection();
      case 'mysql':
        return new MySQLDatabase(configService).getConnection();
      default:
        throw new Error('Unsupported database type');
    }
  }
}
