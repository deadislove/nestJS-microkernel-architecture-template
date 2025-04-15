import { CoreResponseModel } from "@plugins/core/models/core.response.model";

export class UserResponseModel<T> extends CoreResponseModel<T> {
    constructor(params: Partial<CoreResponseModel<T>>) {
        super(params)
    }
}