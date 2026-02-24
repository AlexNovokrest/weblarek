export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export type TPayment = "cash" | "card" | '';

export interface IProductResponse {
  items: IProduct[];
  total: number;
}

export interface IOrder extends IBuyer{
  items: string[];
  total: number;
}

export interface IOrderResult {
  id: string;
  total: number;
}

export interface IHeader {
  counter: number;
}

export interface ICardActions {
  onClick?: () => void;
}

export interface ICard {
  id: string;
  title: string;
  price: number | null;
}

export interface IBasket {
  items: HTMLElement[];
  total: number;
}

export interface IGallery {
  catalog: HTMLElement[];
}

export interface IFormStatus {
  valid: boolean;
  errors: string;
}

export interface IFormContacts {
  email: string;
  phone: string;
}

export interface IFormOrder {
  payment: string;
  address: string;
}

export interface IModal {
  content: HTMLElement;
}

export interface ISuccess {
  total: number;
}

export interface ISuccessAction {
  onClick: () => void;
}
