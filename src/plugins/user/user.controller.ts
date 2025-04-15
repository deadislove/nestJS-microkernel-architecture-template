import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRequestModel } from "./models/core";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async GetUsers() {
        return await this.userService.GetUsers()
    }

    @Get(':id')
    async FindUser(
        @Param('id', ParseIntPipe) id: number
    ) {
        return await this.userService.FindUsers(id)
    }

    @Post()
    async CreateUser(@Body() requestModel: UserRequestModel) {
        return await this.userService.CreateUser(requestModel)
    }

    @Put(':id')
    async UpdateUser(
        @Param('id', ParseIntPipe) id:number,
        @Body() requestModel: UserRequestModel
    ) {
        return await this.userService.UpdatedUser(id, requestModel)
    }

    @Delete(':id')
    async DeleteUser(
        @Param('id', ParseIntPipe) id:number
    ) {
        return await this.userService.DeleteUser(id)
    }
}