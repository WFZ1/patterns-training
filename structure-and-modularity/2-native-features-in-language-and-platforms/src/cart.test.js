'use strict';

const test = require('node:test');
const assert = require('node:assert');

const Cart = require('./cart.js');

const mockExchange = {
  convert: (value) => value * 2,
};

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

test('processPurchases calculates total correctly', () => {
  const cart = new Cart(basket, mockExchange);
  const total = cart.processPurchases();
  assert.strictEqual(total, 1690);
});

test('validate throws error when group total is above limit', () => {
  const group = { name: 'Expensive Items', price: 2500 };
  assert.throws(() => {
    Cart.validate(group);
  }, /Expensive Items total is above the limit/);
});

test('getTotal calculates sum correctly', () => {
  const total = Cart.getTotal(basket.Electronics);
  assert.strictEqual(total, 1635);
});

test('checkout return total in specified currency', async () => {
  const cart = new Cart(basket, mockExchange);
  const total = cart.checkout('UAH');
  assert.strictEqual(total, 3380);
});
