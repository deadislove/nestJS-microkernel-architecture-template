export class ProductRequestModel {
    name: string
    description: string | null  // nullable field
    price: number
    stock: number
    category: string | null  // nullable field
    isActive: boolean
    createdAt?: Date  // optional field
    updatedAt?: Date  // optional field

    cconstructor(
        name: string = '',
        description: string | null = null,
        price: number = 0.00,
        stock: number = 0,
        category: string | null = null,
        isActive: boolean = false,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.isActive = isActive;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
}