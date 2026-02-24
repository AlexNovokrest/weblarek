import { IEvents } from "../../base/Events";
import { ensureElement } from "../../../utils/utils";
import { Form } from "./Form";
import { IFormOrder } from "../../../types";

export class FormOrder extends Form<IFormOrder> {
    protected onlineButton: HTMLButtonElement;
    protected cashButton: HTMLButtonElement;
    protected adressInput: HTMLInputElement;

    constructor(events: IEvents, container: HTMLFormElement) {
        super(events, container);

        this.onlineButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
        this.cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
        this.adressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

        this.onlineButton.addEventListener('click', () => {
            this.events.emit('order:payment', {payment: 'card'});
        });
        this.cashButton.addEventListener('click', () => {
            this.events.emit('order:payment', {payment: 'cash'});
        });
    }
    
    set payment(value: string) {
        this.onlineButton.classList.toggle('button_alt-active', value === 'card');
        this.cashButton.classList.toggle('button_alt-active', value === 'cash');
    }

    set address(value: string) {
        this.adressInput.value = value;
    }
}