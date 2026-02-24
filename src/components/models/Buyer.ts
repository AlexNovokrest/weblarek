import { IBuyer, TPayment } from '../../types';
import { IEvents } from '../base/Events';

export class Buyer {
    private payment: TPayment = '';
    private address: string = '';
    private phone: string = '';
    private email: string = '';

    constructor(protected events: IEvents) {}

    setField(field: keyof IBuyer, value: string): void {
    (this as Record<string, unknown>)[field] = value;
    this.events.emit('order:update');
    }

    getData(): IBuyer {
        return {
            payment: this.payment,
            address: this.address,
            phone: this.phone,
            email: this.email
        }
    }

    clear(): void {
        this.payment = ""; 
        this.address = "";
        this.phone = "";
        this.email = "";
        this.events.emit('order:update');
    }

    validate(): { [key: string]: string } {
        const error: { [key: string]: string} = {};
        if (!this.payment) {error.payment = 'Необходимо указать способ оплаты';}
        if (!this.address.trim()) {error.address = 'Необходимо указать адрес';}
        if (!this.phone.trim()) {error.phone = 'Необходимо указать телефон';}
        if (!this.email.trim()) {error.email = 'Необходимо указать email';}
        return error;
    }
    
    isValid(): boolean {
        return Object.keys(this.validate()).length === 0;
    }
}

