import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "../entities/product.entity";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class ProductRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly repo: Repository<ProductEntity>,
    ) {}

    async createProduct(data: Partial<ProductEntity>) : Promise<ProductEntity> {
        const product: ProductEntity = this.repo.create(data)
        return this.repo.save(product)
    }

    async getAll(): Promise<ProductEntity[]> {
        return this.repo.find()
    }

    async findById(id: number): Promise<ProductEntity | null> {
        return this.repo.findOne({
            where: {
                id
            }
        })
    }

    async updateProduct(id: number, data: Partial<ProductEntity>): Promise<ProductEntity | null> {
        const product: ProductEntity | null = await this.repo.findOne({
            where: {
                id
            }
        })
        
        if(!product) return null

        Object.assign(product, data)
        return this.repo.save(product)
    }

    async deleteProduct(id: number): Promise<boolean> {
        const result: DeleteResult = await this.repo.delete(id)
        return result.affected !== 0
    }
}