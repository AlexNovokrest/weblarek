import { IProduct } from "../../types"
import { IEvents } from "../base/Events";

export class Catalog {
    private items: IProduct[] = [];
    private selectedItem: IProduct | null = null;

    constructor(protected events: IEvents) {}

    // сохранение массива товаров полученного в параметрах метода
    setItems(items: IProduct[]): void {
        this.items = items;
        this.events.emit('catalog:changed');
    }

    // получение массива товаров из модели
    getItems(): IProduct[] {
        return this.items;
    }

    // сохранение товара для подробного отображения
    setSelectedItem(item : IProduct): void {
        this.selectedItem = item;
        if (item) {
            this.events.emit('preview:changed', item)
        }
    }

    // получение товара для подробного отображения
    getSelectedItems(): IProduct | null {
        return this.selectedItem;
    }

    // получение одного товара по его id
    getItemById(id: string): IProduct {
        const item = this.items.find(item => item.id === id);
        if (!item) {
            throw new Error(`Товар по id ${id} не найден`);
        }
        return item;
    }
}