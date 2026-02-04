import { IApi, IOrder, IOrderQuery, IProduct } from "../../types";

export class ApiServise {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }
    // получение списка товаров с сервера
    getProductList(): Promise<IProduct[]> {
        return this.api
        .get<IOrderQuery>('/product/')
        .then((query) => query.items);
    }
    // отправка заказа на сервер
    createOrder(data: IOrder): Promise<IOrder> {
        return this.api.post('/order/', data)
    }
}