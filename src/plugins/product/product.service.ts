import { Injectable } from "@nestjs/common";
import { Plugins } from "@plugins/core/plugin.interface";
import { pluginRegistry } from "@plugins/core/plugin.registry";
import { UserService } from "@plugins/user";
import { UserEntity } from "@plugins/user/entities/user.entity";
import { RegisterServiceConstant } from "@shared/registerService.constant";
import { ProductRepository } from "./repositories/product.repositories";
import { ProductRequestModel, ProductResponseModel } from "./models/core";
import { ProductEntity } from "./entities/product.entity";
import { LoggerService } from "@core/logger/logger.service";

@Injectable()
export class ProductService implements Plugins {

    constructor(
        private readonly productRepo: ProductRepository,
        private readonly logger: LoggerService
    ) { }

    name = RegisterServiceConstant.ProductService

    // Simulating some resources like a database connection or event listener
    private databaseConnection: any
    private eventListener: any

    // Initialize the plugin, e.g., setting up resources like DB connections
    initialize(): Promise<void> | void {
        console.log('ProductService: Initializing...')
        this.databaseConnection = this.connectToDatabase()
        this.eventListener = this.setupEventListener()
    }
    // Cleanup and shutdown, e.g., disconnecting from DB, removing listeners
    shutdown(): Promise<void> | void {
        console.log('ProductService: Shutting down...')
        this.databaseConnection.disconnect()
        this.eventListener.remove()
    }

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

    async getUserDataAndProductData() {
        const userService = pluginRegistry.Get<UserService>('UserService');
        if (!userService) {
            throw new Error('UserService not found in pluginRegistry!');
        }
        const usersResponseModel = await userService?.GetUsers()
        console.log('Product Service: Restrieved users: ', usersResponseModel.data)
        const users: UserEntity[] | null = usersResponseModel.data

        const productsResponModel = await this.GetProducts()
        const products: ProductEntity[] | null = productsResponModel.data

        return { users, products }
    }

    // ---
    async CreateProduct(requestModel: ProductRequestModel): Promise<ProductResponseModel<ProductEntity>> {

        try {
            let entity: ProductEntity = new ProductEntity()
            Object.assign(entity, requestModel)
            const result: ProductEntity = await this.productRepo.createProduct(entity)
            return new ProductResponseModel<ProductEntity>({
                data: result
            })
        } catch (error) {
            return new ProductResponseModel<ProductEntity>({
                code: '400',
                error: error.message,
                data: null
            })
        }
    }

    async UpdatedProduct(id: number, requestModel: ProductRequestModel): Promise<ProductResponseModel<ProductEntity>> {
        try {
            let newEntity: ProductEntity = new ProductEntity()
            Object.assign(newEntity, requestModel)

            const result: ProductEntity | null = await this.productRepo.updateProduct(id, newEntity)

            return new ProductResponseModel<ProductEntity>({
                data: result
            })
        }
        catch (error) {
            return new ProductResponseModel<ProductEntity>({
                code: '400',
                error: error.message,
                data: null
            })
        }
    }

    async GetProducts(): Promise<ProductResponseModel<ProductEntity[]>> {
        try {
            const result: ProductEntity[] = await this.productRepo.getAll()
            return new ProductResponseModel<ProductEntity[]>({
                data: result
            })
        } catch (error) {
            return new ProductResponseModel<ProductEntity[]>({
                code: '400',
                error: error.message,
                data: null
            })
        }
    }

    async FindProducts(id: number): Promise<ProductResponseModel<ProductEntity>> {
        try {
            const result: ProductEntity | null = await this.productRepo.findById(id)
            return new ProductResponseModel<ProductEntity>({
                data: result
            })
        }
        catch (error) {
            return new ProductResponseModel<ProductEntity>({
                code: '400',
                error: error.message,
                data: null
            })
        }
    }

    async DeleteProduct(id: number): Promise<ProductResponseModel<null>> {
        try {
            const result: boolean = await this.productRepo.deleteProduct(id)
            return new ProductResponseModel<null>({
                data: null
            })
        }
        catch (error) {
            return new ProductResponseModel<null>({
                code: '400',
                error: error.message,
                data: null
            })
        }
    }

}