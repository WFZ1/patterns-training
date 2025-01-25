type Rates = Record<string, number>;

declare class Exchange {
  #rates: Rates;

  constructor(apiUrl: string): Promise<void>;
  async #init(url: string): Promise<void>;
  getRate(currency: string): number;
  convert(value: number, currency: string): number;
}

module.exports = Exchange;
