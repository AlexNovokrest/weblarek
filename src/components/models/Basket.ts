import { IProduct } from "../../types"
import { EventEmitter } from "../base/Events";

export class Basket {
    
    private items: IProduct[] = [];
    private events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    // получение массива товаров, которые находятся в корзине
    getItems(): IProduct[] {
        return this.items;
    }

    // добавление товара, который был получен в параметре, в массив корзины
    addItem(product: IProduct): void {
        this.items.push(product);
        this.events.emit('basket:changed')
    }

    // удаление товара, полученного в параметре из массива корзины
    deleteItem(id: string): void {
        this.items = this.items.filter(item => item.id !== id);
        this.events.emit('basket:changed');
    }

    // очистка корзины
    clear(): void {
        this.items = [];
        this.events.emit('basket:changed')
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

    getItemId(): string[] {
        return this.items.map(item => item.id);
    }
}