import './scss/styles.scss';

import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { Catalog } from './components/models/Catalog';

import { Api } from './components/base/Api';
import { ApiServise } from './components/service/Api.ts';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

const newCatalog = new Catalog();
newCatalog.setItems(apiProducts.items);
console.log('Массив товаров из каталога: ', newCatalog.getItems())

const newBasket = new Basket();
newBasket.addItem(apiProducts.items[1]);
console.log('test basket items', newBasket.getItems());
console.log('test basket price', newBasket.getTotalPrice());
newBasket.clear();
console.log('test basket', newBasket.getItems());

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

