'use strict';

const RoundRobin = require('./round-robin.js');

class Connection {
  constructor(name) {
    this.name = name;
  }
}

const factory = (() => {
  let index = 0;
  return () => new Connection(`http://10.0.0.1/${index++}`);
})();

const main = async () => {
  const roundRobin = new RoundRobin(factory, { size: 10, timeout: 3000 });

  for (let i = 0; i < 40; i++) {
    try {
      const instance = await roundRobin.getInstance();
      console.log(instance);
    } catch (error) {
      console.log(error.message);
    }
  }

  // Promise.all use case

  // try {
  // eslint-disable-next-line max-len
  //   const promises = Array.from({ length: 40 }, () => roundRobin.getInstance());
  //   const instances = await Promise.all(promises);
  //   console.log(instances);
  // } catch (error) {
  //   console.log(error.message);
  // }
};

main();
