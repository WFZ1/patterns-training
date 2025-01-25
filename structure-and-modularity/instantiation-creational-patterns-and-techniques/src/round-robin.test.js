'use strict';

const test = require('node:test');
const assert = require('node:assert');

const RoundRobin = require('./round-robin.js');

class Connection {
  constructor(name) {
    this.name = name;
  }
}

const createFactory = () => {
  let index = 0;
  return () => new Connection(`http://10.0.0.1/${index++}`);
};

test('getInstance returns instances in round-robin order (await)', async () => {
  const factory = createFactory();
  const size = 3;
  const roundRobin = new RoundRobin(factory, { size, timeout: 10 });

  const instances = [];

  for (let i = 0; i < 10; i++) {
    instances[i] = await roundRobin.getInstance();
  }

  assert.notStrictEqual(instances[0], instances[1]);
  assert.notStrictEqual(instances[1], instances[2]);

  // Should return to first/second/third instance after cycles
  for (let i = 0; i < 7; i++) {
    assert.strictEqual(instances[i], instances[i + size]);
  }
});

// eslint-disable-next-line max-len
test('getInstance returns instances in round-robin order (Promise.all)', async () => {
  const factory = createFactory();
  const size = 3;
  const roundRobin = new RoundRobin(factory, { size, timeout: 10 });

  const promises = Array.from({ length: 10 }, () => roundRobin.getInstance());
  const instances = await Promise.all(promises);

  assert.notStrictEqual(instances[0], instances[1]);
  assert.notStrictEqual(instances[1], instances[2]);

  // Should return to first/second/third instance after cycles
  for (let i = 0; i < 7; i++) {
    assert.strictEqual(instances[i], instances[i + size]);
  }
});

// eslint-disable-next-line max-len
test('getInstance returns instances in round-robin order (await & Promise.all)', async () => {
  const factory = createFactory();
  const size = 3;
  const roundRobin = new RoundRobin(factory, { size, timeout: 10 });

  const promises = Array.from({ length: 5 }, () => roundRobin.getInstance());
  const instances = await Promise.all(promises);

  assert.strictEqual(instances[2], await roundRobin.getInstance());
  assert.strictEqual(instances[3], await roundRobin.getInstance());
  assert.strictEqual(instances[4], await roundRobin.getInstance());
});

test('getInstance blocks when all instances are in use', async () => {
  const factory = createFactory();
  const timeout = 10;
  const roundRobin = new RoundRobin(factory, { size: 1, timeout: timeout * 2 });

  await roundRobin.getInstance();

  const instancePromise = roundRobin.getInstance();
  const timeoutPromise = new Promise((resolve) => setTimeout(resolve, timeout));

  const result = await Promise.race([instancePromise, timeoutPromise]);

  assert.strictEqual(result, undefined, 'Second getInstance should be blocked');
});
