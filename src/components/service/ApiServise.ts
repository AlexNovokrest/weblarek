import { IApi, IOrder, IProductResponse, IProduct, IOrderResult } from "../../types";

export class ApiServise {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }
    // получение списка товаров с сервера
    getProductList(): Promise<IProduct[]> {
        return this.api
        .get<IProductResponse>('/product/')
        .then((query) => query.items);
    }
    // отправка заказа на сервер
    createOrder(data: IOrder): Promise<IOrderResult> {
        return this.api.post<IOrderResult>('/order/', data)
    }
}