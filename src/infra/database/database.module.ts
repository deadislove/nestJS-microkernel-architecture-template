import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseFactory } from "./factory/database.factory";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [
                ConfigModule
            ],
            inject: [
                ConfigService
            ],
            useFactory: (configService: ConfigService) => {
                const dbType: string = configService.get<string>('DB_TYPE') || ''
                return DatabaseFactory.createDatabaseConnection(dbType, configService)
            }
        })
    ],
})
export class DatabaseModule {}