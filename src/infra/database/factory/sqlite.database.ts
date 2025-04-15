import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ProductEntity } from "@plugins/product/entities/product.entity";
import { UserEntity } from "@plugins/user/entities/user.entity";

export class SQLiteDatabase {
    constructor(private readonly configService: ConfigService) {}
    
    getConnection(): TypeOrmModuleOptions {
        return {
            type: 'sqlite',
            database: `./database.sqlite`,
            //database: this.configService.get<string>('DB_NAME', `database.sqlite`),
            entities: [
                UserEntity,
                ProductEntity,
            ],
            synchronize: true
        }
    }
}