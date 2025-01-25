type Item = { name: string; price: number };
type Basket = Record<string, Array<Item>>;

declare class Cart {
  static #MAX_PURCHASE: number;
  #basket: Basket;
  #exchange: Exchange;

  constructor(basket: Basket, exchange: Exchange);
  processPurchases(): number;
  static validate(groups: Item[]): void;
  static getTotal(items: Item[]): number;
  checkout(currency: string): number;
}

module.exports = Cart;
