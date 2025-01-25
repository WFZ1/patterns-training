'use strict';

class RoundRobin {
  #size = 0;
  #instances = [];
  #free = [];
  #current = 0;
  #timeout = 0;
  #queue = [];

  constructor(factory = () => null, options = {}) {
    const size = options.size || 0;

    this.#size = size;
    this.#timeout = options.timeout || 0;
    this.#instances = Array.from({ length: size }, factory);
    this.#free = new Array(size).fill(true);
  }

  #handleCurrent(instance) {
    this.#free[this.#current] = false;
    this.#current = (this.#current + 1) % this.#size;

    setTimeout(() => this.#release(instance), this.#timeout);
  }

  async getInstance() {
    const instance = this.#instances[this.#current];
    const isFree = this.#free[this.#current];

    if (isFree) {
      this.#handleCurrent(instance);
      return instance;
    }

    return new Promise((resolve) => this.#queue.push(resolve));
  }

  #release(instance) {
    const index = this.#instances.indexOf(instance);
    const isNext = this.#current === index;

    this.#free[index] = true;

    if (this.#queue.length && isNext) {
      this.#handleCurrent(instance);
      const resolve = this.#queue.shift();

      setTimeout(resolve, 0, instance);
    }
  }
}

module.exports = RoundRobin;
