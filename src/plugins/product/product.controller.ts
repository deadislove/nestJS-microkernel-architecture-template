import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductRequestModel } from "./models/core";

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('/userwithproduct')
    async GetUserAndProduct() {
        return await this.productService.getUserDataAndProductData()
    }

    @Get()
    async GetProducts() {
        return await this.productService.GetProducts()
    }

    @Get(':id')
    async FindProudct(
        @Param('id', ParseIntPipe) id: number
    ) {
        return await this.productService.FindProducts(id)
    }

    @Post()
    async CreateProduct(
        @Body() requestModel: ProductRequestModel
    ) {
        return await this.productService.CreateProduct(requestModel)
    }

    @Put(':id')
    async UpdateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() requestModel: ProductRequestModel
    ) {
        return await this.productService.UpdatedProduct(id, requestModel)
    }

    @Delete(':id')
    async DeleteProduct(
        @Param('id', ParseIntPipe) id: number
    ) {
        return await this.productService.DeleteProduct(id)
    }

}