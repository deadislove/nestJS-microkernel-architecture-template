export class CoreResponseModel<T> {
    code:string
    error: string | string[] | null
    data: T | null

    constructor(params: Partial<CoreResponseModel<T>>) {
        this.code = params.code ?? '200';
        this.error = params.error ?? null;
        this.data = params.data ?? null;
    }
}