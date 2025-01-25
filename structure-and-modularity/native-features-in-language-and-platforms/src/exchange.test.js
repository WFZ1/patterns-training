'use strict';

const test = require('node:test');
const assert = require('node:assert');

const Exchange = require('./exchange.js');

const RATES_API_URL = 'https://api.example.com/rates';
const RATES = {
  USD: 1.0,
  EUR: 0.85,
  UAH: 37.5,
  GBP: 0.73,
};

const originalFetch = global.fetch;

test.beforeEach(() => {
  global.fetch = async () => ({
    json: async () => ({ rates: RATES }),
  });
});

test.after(() => {
  global.fetch = originalFetch;
});

test('getRate returns correct rate for currency', async () => {
  const exchange = await new Exchange(RATES_API_URL);
  assert.strictEqual(exchange.getRate('EUR'), 0.85);
});

test('convert calculates correct value', async () => {
  const exchange = await new Exchange(RATES_API_URL);
  assert.strictEqual(exchange.convert(100, 'EUR'), 85);
});

test('throws error for invalid currency', async () => {
  const exchange = await new Exchange(RATES_API_URL);
  assert.throws(() => {
    exchange.getRate('INVALID');
  }, /Currency INVALID not found/);
});

test('throws error when API returns error', async () => {
  global.fetch = async () => ({
    json: async () => ({ error: true, description: 'API Error' }),
  });

  await assert.rejects(async () => {
    await new Exchange(RATES_API_URL);
  }, /API Error/);
});
