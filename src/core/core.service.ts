import { Injectable } from "@nestjs/common";

@Injectable()
export class CoreService {
    private config: any

    constructor(){
        this.config = {}
    }

    GetConfig() {
        return this.config
    }
}