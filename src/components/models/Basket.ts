import { IProduct } from "../../types"

export class Basket {
    
    private items: IProduct[];

    constructor() {
        this.items = [];
    }

    // получение массива товаров, которые находятся в корзине
    getItems(): IProduct[] {
        return this.items;
    }

    // добавление товара, который был получен в параметре, в массив корзины
    addItem(product: IProduct): void {
        this.items.push(product);
    }

    // удаление товара, полученного в параметре из массива корзины
    deleteItem(product: IProduct): void {
        this.items = this.items.filter(item => item.id !== product.id);
    }

    // очистка корзины
    clear(): void {
        this.items = [];
    }

    // получение стоимости всех товаров в корзине
    getTotalPrice(): number {
        return this.items.reduce((sum, item) => {
            return sum + (item.price ?? 0);
        }, 0)
    }

    // получение количества товаров в корзине
    getCount(): number {
        return this.items.length;
    }

    // проверка наличия товара в корзине по его id, полученного в параметр метода
    hasItem(id: string): boolean {
        return this.items.some(item => item.id === id)
    }
}