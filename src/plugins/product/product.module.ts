import { Module, OnModuleInit } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { pluginRegistry } from "@plugins/core/plugin.registry";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { ProductRepository } from "./repositories/product.repositories";
import { LoggerModule } from "@core/logger/logger.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([
            ProductEntity
        ]),
        LoggerModule,
    ],
    providers:[
        ProductService,
        ProductRepository,
    ],
    exports:[
        ProductRepository,
        ProductService,
    ],
    controllers: [
        ProductController
    ]
})

export class ProductModule implements OnModuleInit{
    
    constructor(private readonly productService: ProductService) {}

    onModuleInit() {
        console.log('✅ ProductService Registered from ProductModule')
        pluginRegistry.Register(this.productService.name, this.productService)
    }
}