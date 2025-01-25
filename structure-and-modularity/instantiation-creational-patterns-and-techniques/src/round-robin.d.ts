type Options = {
  size?: number;
  timeout?: number;
};

declare class RoundRobin<T> {
  #size: number;
  #instances = Array<T>;
  #free = Array<boolean>;
  #current: number;
  #timeout: number;
  #queue = Array<(value: T) => void>;

  constructor(factory: () => T, options?: Options): void;
  #handleCurrent(instance: T): void;
  async getInstance(): Promise<T>;
  #release(instance: T): void;
}

module.exports = RoundRobin;
