import './scss/styles.scss';

import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { Catalog } from './components/models/Catalog';

import { Api } from './components/base/Api';
import { ApiServise } from './components/service/ApiServise.ts';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

const newCatalog = new Catalog();
newCatalog.setItems(apiProducts.items);
console.log('Массив товаров из каталога: ', newCatalog.getItems());
newCatalog.setSelectedItem(apiProducts.items[0]);
console.log('Установка выбранного элемента: ', newCatalog.getSelectedItems());
console.log('Поиск элемента по id: ', newCatalog.getItemById('854cef69-976d-4c2a-a18c-2aa45046c390'))


const newBasket = new Basket();
newBasket.addItem(apiProducts.items[1]);
newBasket.addItem(apiProducts.items[0]);
console.log('Товары в корзине: ', newBasket.getItems());
console.log('Сумма товаров в корзине: ', newBasket.getTotalPrice());
console.log('Количество товаров в корзине: ', newBasket.getCount());
console.log('Наличие товара в корзине по его id: ', newBasket.hasItem('854cef69-976d-4c2a-a18c-2aa45046c390'))
newBasket.clear();
console.log('Товары в корзине восле очистки: ', newBasket.getItems());

const newBuyer = new Buyer();
newBuyer.setData({
    payment: 'card',
    address: 'address',
    phone: '12345678',
    email: 'email@mail.ru'
})
console.log('test buyer:', newBuyer.getData());
console.log('test buyer.validate:', newBuyer.validate());
newBuyer.clear();
console.log('test buyer.clear', newBuyer.getData());
console.log('test buyer.validate:', newBuyer.validate());

const api = new Api(API_URL);
const appApi = new ApiServise(api);


appApi.getProductList()
    .then(catalog => {
        newCatalog.setItems(catalog);
        console.log('test api', newCatalog.getItems());
    })
    .catch(error => console.error('Ошибка товаров: ', error));

