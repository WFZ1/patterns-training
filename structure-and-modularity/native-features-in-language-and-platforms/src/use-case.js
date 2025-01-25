'use strict';

const Exchange = require('./exchange.js');
const Cart = require('./cart.js');

const OPEN_EXCHANGE_API_URL =
  'https://openexchangerates.org/api/latest.json?app_id=f4698f1a286b4f2fa474906674fdfef0';
const CURRENCY = 'UAH';

const basket = {
  Electronics: [
    { name: 'Laptop', price: 1500 },
    { name: 'Mouse', price: 25 },
    { name: 'Keyboard', price: 100 },
    { name: 'HDMI cable', price: 10 },
  ],
  Textile: [
    { name: 'Bag', price: 50 },
    { name: 'Mouse pad', price: 5 },
  ],
};

const main = async () => {
  try {
    const exchange = await new Exchange(OPEN_EXCHANGE_API_URL);
    const cart = new Cart(basket, exchange);
    const amount = cart.checkout(CURRENCY);

    console.log(`Total: ${amount} ${CURRENCY}`);
  } catch (error) {
    console.error(error);
  }
};

main();
