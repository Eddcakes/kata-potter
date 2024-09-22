export interface Basket {
  [sku: string]: BasketItem;
}

export interface BasketItem {
  quantity: number;
  name: string;
  price: number;
  sku: string;
}

export interface ProductItem {
  name: string;
  sku: string;
  price: number;
}

export type BasketContext = {
  basket: Basket;
  handleAddToBasket: (product: ProductItem, quantity: number) => void;
};
