import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Plugins } from "@plugins/core/plugin.interface";
import { RegisterServiceConstant } from "@shared/registerService.constant";
import { UserRepository } from "./repositories/user.repository";
import { UserRequestModel, UserResponseModel } from "./models/core";
import { UserEntity } from "./entities/user.entity";
import { LoggerService } from "@core/logger/logger.service";

@Injectable()
export class UserService implements Plugins {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly logger: LoggerService,
    ) { }

    name = RegisterServiceConstant.UserService

    // Simulating some resources like a database connection or event listener
    private databaseConnection: any
    private eventListener: any

    // Initialize the plugin, e.g., setting up resources like DB connections
    initialize(): Promise<void> | void {
        console.log('UserService: Initializing...')
        this.databaseConnection = this.connectToDatabase()
        this.eventListener = this.setupEventListener()
    }
    // Cleanup and shutdown, e.g., disconnecting from DB, removing listeners
    shutdown(): Promise<void> | void {
        console.log('UserService: Shutting down...')
        this.databaseConnection.disconnect()
        this.eventListener.remove()
    }

    // Since we are using the pluginRegistry architecture,
    // it's recommended to let pluginRegistry manage the entire plugin lifecycle.
    // ✅ Remove onModuleInit() and rely solely on pluginRegistry to call initialize() / shutdown()
    // This makes the logic clearer, keeps plugins more modular,
    // and allows easier support for hot loading or lazy loading in the future.

    // NestJS Lifecycle hooks (optional)
    // onModuleInit() {
    //     console.log('UserService: Module initialized')
    //     this.initialize()

    // }
    // onModuleDestroy() {
    //     console.log('UserService: Module destroyed')
    //     this.shutdown()
    // }

    private connectToDatabase() {
        return {
            disconnect: () => {
                console.log('Disconnected from database')
            }
        }
    }

    private setupEventListener() {
        return {
            remove: () => {
                console.log('Event listener removed')
            }
        }
    }

    async CreateUser(requestModel: UserRequestModel): Promise<UserResponseModel<UserEntity>> {

        try {
            let entity: UserEntity = new UserEntity()

            Object.assign(entity, requestModel)
            const result: UserEntity = await this.userRepo.createUser(entity)
            return new UserResponseModel<UserEntity>({
                data: result
            })
        } catch (error) {
            return new UserResponseModel<UserEntity>({
                code: '400',
                error: error.message,
                data: null
            })
        }
    }

    async UpdatedUser(id: number, requestModel: UserRequestModel): Promise<UserResponseModel<UserEntity>> {

        try {
            let newEntity: UserEntity = new UserEntity()
            Object.assign(newEntity, requestModel)

            const result: UserEntity | null = await this.userRepo.updateUser(id, newEntity)
            return new UserResponseModel<UserEntity>({
                data: result
            })
        } catch (error) {
            return new UserResponseModel<UserEntity>({
                code: '400',
                error: error.message,
                data: null
            })
        }
    }
    async GetUsers(): Promise<UserResponseModel<UserEntity[]>> {
        try {
            this.logger.log('User service method called - GetUsers')
            const result: UserEntity[] = await this.userRepo.getAll()
            return new UserResponseModel<UserEntity[]>({
                data: result
            })
        } catch (error) {
            return new UserResponseModel<UserEntity[]>({
                code: '400',
                error: error.message,
                data: null
            })
        }

    }
    async FindUsers(id: number): Promise<UserResponseModel<UserEntity>> {
        try {
            const result: UserEntity | null = await this.userRepo.findById(id)
            return new UserResponseModel<UserEntity>({
                data: result
            })
        } catch (error) {
            return new UserResponseModel<UserEntity>({
                code: '400',
                error: error.message,
                data: null
            })
        }
    }
    async DeleteUser(id: number): Promise<UserResponseModel<null>> {
        try {
            const result: boolean = await this.userRepo.deleteUser(id)

            return new UserResponseModel<null>({
                data: null
            })
        } catch (error) {
            return new UserResponseModel<null>({
                code: '400',
                error: error.message,
                data: null
            })
        }
    }
}