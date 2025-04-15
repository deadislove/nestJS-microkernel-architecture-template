import { Injectable } from "@nestjs/common";
import { DeleteResult, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repo: Repository<UserEntity>,
    ) { }

    async createUser(data: Partial<UserEntity>): Promise<UserEntity> {
        const user: UserEntity = this.repo.create(data)
        return this.repo.save(user)
    }

    async getAll(): Promise<UserEntity[]> {
        return this.repo.find()
    }

    async findById(id: number): Promise<UserEntity | null> {
        return this.repo.findOne({
            where: {
                id
            }
        })
    }

    async updateUser(id: number, data: Partial<UserEntity>): Promise<UserEntity | null> {
        const user: UserEntity | null = await this.repo.findOne({
            where: {
                id
            }
        })

        if (!user) return null

        Object.assign(user, data)
        return this.repo.save(user)
    }

    async deleteUser(id: number): Promise<boolean> {
        const result: DeleteResult = await this.repo.delete(id)
        return result.affected !== 0
    }
}