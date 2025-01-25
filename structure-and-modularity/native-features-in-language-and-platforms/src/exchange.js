'use strict';

class Exchange {
  #rates = {};

  constructor(apiUrl) {
    return this.#init(apiUrl);
  }

  async #init(url) {
    const response = await fetch(url);
    const result = await response.json();

    if (result.error) {
      throw new Error(result.description);
    }

    this.#rates = result.rates;
    return this;
  }

  getRate(currency) {
    const rate = this.#rates[currency];

    if (!rate) {
      throw new Error(`Currency ${currency} not found`);
    }

    return rate;
  }

  convert(value, currency) {
    const rate = this.getRate(currency);
    return value * rate;
  }
}

module.exports = Exchange;
