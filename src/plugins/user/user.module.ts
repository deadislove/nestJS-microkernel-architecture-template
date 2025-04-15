import { Module, OnModuleInit } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { pluginRegistry } from "@plugins/core/plugin.registry";
import { UserRepository } from ".";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { LoggerModule } from "@core/logger/logger.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity
        ]),
        LoggerModule,
    ],
    providers: [
        UserService,
        UserRepository
    ],
    exports: [
        UserRepository,
        UserService
    ],
    controllers: [
        UserController
    ]
})

export class UserModule implements OnModuleInit {

    constructor(private readonly userService: UserService) { }

    onModuleInit() {
        console.log('✅ UserService Registered from UserModule')
        pluginRegistry.Register(this.userService.name, this.userService)
    }
}