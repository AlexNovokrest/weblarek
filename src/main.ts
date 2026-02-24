import './scss/styles.scss';
import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { Catalog } from './components/models/Catalog';
import { Api } from './components/base/Api';
import { ApiServise } from './components/service/ApiServise.ts';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/Events.ts';
import { BasketView } from './components/views/Basket.ts';
import { Gallery } from './components/views/Gallery.ts';
import { Header } from './components/views/Header.ts';
import { Modal } from './components/views/Modal.ts';
import { Success } from './components/views/Success.ts';
import { CardBasket } from './components/views/Card/CardBasket.ts';
import { CardCatalog } from './components/views/Card/CardCatalog.ts';
import { CardPreview } from './components/views/Card/CardPreview.ts';
import { FormContacts } from './components/views/Form/FormContacts.ts';
import { FormOrder } from './components/views/Form/FormOrder.ts';
import { cloneTemplate, ensureElement } from './utils/utils.ts';
import { IProduct, IOrder } from './types/index.ts';


const events = new EventEmitter();

const api = new Api(API_URL);
const larekApi = new ApiServise(api);

const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');

const basketModel = new Basket(events);
const buyerModel = new Buyer(events);
const catalogModel = new Catalog(events);

const headerElement = ensureElement<HTMLElement>('.header');
const galleryElement = ensureElement<HTMLElement>('.gallery');
const modalElement = ensureElement<HTMLElement>('#modal-container');

const header = new Header(events, headerElement);
const gallery = new Gallery(galleryElement);
const modal = new Modal(events, modalElement);

const basket = new BasketView(events, cloneTemplate(basketTemplate));
const orderForm = new FormOrder(events, cloneTemplate(orderTemplate) as HTMLFormElement);
const contactsForm = new FormContacts(events, cloneTemplate(contactsTemplate) as HTMLFormElement);

const success = new Success(cloneTemplate(successTemplate), {
    onClick: () => modal.close()
});

events.on('order:update', () => {
    const buyer = buyerModel.getData();
    const errors = buyerModel.validate();

    const orderErrors: Record<string, string> = {};
    if (errors.payment) orderErrors.payment = errors.payment;
    if (errors.address) orderErrors.address = errors.address;

    orderForm.payment = buyer.payment;
    orderForm.address = buyer.address;
    orderForm.valid = !orderErrors.payment && !orderErrors.address;
    orderForm.errors = Object.values(orderErrors).join('. ');

    const contactErrors: Record<string, string> = {};
    if (errors.email) contactErrors.email = errors.email;
    if (errors.phone) contactErrors.phone = errors.phone;

    contactsForm.email = buyer.email;
    contactsForm.phone = buyer.phone;
    contactsForm.valid = !contactErrors.email && !contactErrors.phone;
    contactsForm.errors = Object.values(contactErrors).join('. ');
});

const card = new CardPreview(cloneTemplate(cardPreviewTemplate), {
    onClick: () => {
        const item = catalogModel.getSelectedItems();
        if (item) {
            events.emit('card:toggle', item);
        }
    }
})

events.on('catalog:changed', () => {
    const itemCard = catalogModel.getItems().map((item) => {
        const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card:select', item)
        });
        return card.render({
            ...item,
            image: CDN_URL + item.image
        });
    });

    gallery.render({ catalog: itemCard});
})

events.on('basket:changed', () => {
    header.render({ counter: basketModel.getCount() });

    const items = basketModel.getItems().map((item, index) => {
        const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
            onClick: () => events.emit('basket:remove', item)
        });
        return card.render({
            ...item,
            index: index + 1
        });
    });

    basket.render({
        items,
        total: basketModel.getTotalPrice()
    })
});

events.on('preview:changed', (item: IProduct) => {
    if (!item) return;

    const inCart = basketModel.hasItem(item.id);

    modal.render({
        content: card.render({
            ...item,
            image: CDN_URL + item.image,
            buttonText: inCart ? 'Удалить из корзины' : 'В корзину',
            buttonDisabled: item.price === null
        })
    });
});

events.on('card:select', (item: IProduct) => {
    catalogModel.setSelectedItem(item);
});

events.on('card:toggle', (item: IProduct) => {
    if (basketModel.hasItem(item.id)) {
        basketModel.deleteItem(item.id);
    } else {
        basketModel.addItem(item);
    }
    modal.close();
});

events.on('basket:open', () => {
    modal.render({
        content: basket.render()
    });
});

events.on('basket:remove', (item: IProduct) => {
    basketModel.deleteItem(item.id);
});

events.on('basket:order', () => {
    modal.render({
        content: orderForm.render({})
    });
});

events.on('order:payment', ({ payment }: { payment: string }) => {
    buyerModel.setField('payment', payment);
});

events.on('order.address:change', ({ value }: { value: string }) => {
    buyerModel.setField('address', value);
});

events.on('contacts.email:change', ({ value }: { value: string }) => {
    buyerModel.setField('email', value);
});

events.on('order:submit', () => {
    modal.render({
        content: contactsForm.render({})
    });
});

events.on('contacts.phone:change', ({ value }: { value: string }) => {
    buyerModel.setField('phone', value);
});

events.on('contacts:submit', () => {
    const orderData: IOrder = {
        ...buyerModel.getData(),
        total: basketModel.getTotalPrice(),
        items: basketModel.getItemId()
    };

    larekApi.createOrder(orderData)
        .then((result) => {
            modal.render({
                content: success.render({ total: result.total })
            });

            basketModel.clear();
            buyerModel.clear();
        })
        .catch((err) => console.error(err));
});

larekApi
    .getProductList()
    .then((data) => {
        catalogModel.setItems(data);
    })
    .catch((err) => console.error(err));