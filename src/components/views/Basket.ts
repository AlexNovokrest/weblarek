import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IBasket } from "../../types";
import { IEvents } from "../base/Events";

export class BasketView extends Component<IBasket> {
    protected listElement: HTMLElement;
    protected totalElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.listElement = ensureElement<HTMLElement>('.basket__list', this.container);
        this.totalElement = ensureElement<HTMLElement>('.basket__price', this.container);
        this.buttonElement = ensureElement<HTMLButtonElement>('.basket__button', this.container);

        this.buttonElement.addEventListener('click', () => {
            this.events.emit('basket:order');
        });
        this.items = [];
    }

    set items(items: HTMLElement[]) {
        this.listElement.replaceChildren(...items);
        this.buttonElement.disabled = items.length === 0;
    }

    set total(value: number) {
        this.totalElement.textContent = `${value} синапсов`;
    }
}