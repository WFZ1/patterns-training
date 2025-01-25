'use strict';

class Cart {
  static #MAX_PURCHASE = 2000;
  #basket;
  #exchange;

  constructor(basket, exchange) {
    this.#basket = basket;
    this.#exchange = exchange;
  }

  processPurchases() {
    const groups = Object.entries(this.#basket);
    const groupsWithPrice = groups.map(([name, items]) => ({
      name,
      items,
      price: Cart.getTotal(items),
    }));
    groupsWithPrice.forEach((group) => Cart.validate(group));

    return Cart.getTotal(groupsWithPrice);
  }

  static validate(group) {
    if (group.price > Cart.#MAX_PURCHASE) {
      throw new Error(`${group.name} total is above the limit`);
    }
  }

  static getTotal(items) {
    return items.reduce((sum, item) => sum + item.price, 0);
  }

  checkout(currency) {
    const total = this.processPurchases();
    const money = this.#exchange.convert(total, currency);
    return money;
  }
}

module.exports = Cart;
