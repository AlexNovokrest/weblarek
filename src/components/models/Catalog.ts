import { IProduct } from "../../types"

export class Catalog {
    private items: IProduct[];
    private selectedItem: IProduct | null = null;

    constructor() {
        this.items = [];
        this.selectedItem = null;
    }

    // сохранение массива товаров полученного в параметрах метода
    setItems(items: IProduct[]): void {
        this.items = items
    }

    // получение массива товаров из модели
    getItems(): IProduct[] {
        return this.items 
    }

    // сохранение товара для подробного отображения
    setSelectedItem(item : IProduct): void {
        this.selectedItem = item;
    }

    // получение товара для подробного отображения
    getSelectedItems(): IProduct | null {
        return this.selectedItem;
    }

    // получение одного товара по его id
    getItemById(id: string): IProduct | undefined {
        return this.items.find(item => item.id === id);
    }
}