import { Test, TestingModule } from "@nestjs/testing"
import { UserController, UserService } from "@plugins/user"

describe('User controller Unit test', () => {
    let controller: UserController
    let service: UserService

    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                UserController
            ],
            providers: [
                UserService
            ]
        }).compile()

        controller = module.get<UserController>(UserController)
        service = module.get<UserService>(UserService)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
        expect(service).toBeDefined()
    })
})