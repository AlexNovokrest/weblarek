import { IBuyer, TPayment } from '../../types';

export class Buyer {
    
    private payment: TPayment | null;
    private address: string;
    private phone: string;
    private email: string;

    constructor() {
        this.payment = null;
        this.address = "";
        this.phone = "";
        this.email = "";
    }

    // сохранение данных в модели
    setData(data: Partial<IBuyer>): void {
        if (data.payment !== undefined) this.payment = data.payment;
        if (data.address !== undefined) this.address = data.address;
        if (data.phone !== undefined) this.phone = data.phone;
        if (data.email !== undefined) this.email = data.email;
    }

    // получение всех данных покупателя
    getData(): IBuyer {
        return {
            payment: this.payment,
            address: this.address,
            phone: this.phone,
            email: this.email
        }
    }

    // очистка данных покупателя
    clear(): void {
        this.payment = null; 
        this.address = "";
        this.phone = "";
        this.email = "";
    }

    // валидация данных
    validate(): { [key: string]: string } {
        const error: { [key: string]: string} = {};
        if (!this.payment) {error.payment = 'Необходимо указать способ оплаты';}
        if (!this.address.trim()) {error.address = 'Необходимо указать адрес';}
        if (!this.phone.trim()) {error.phone = 'Необходимо указать телефон';}
        if (!this.email.trim()) {error.email = 'Необходимо указать email';}
        return error;
    }

}

