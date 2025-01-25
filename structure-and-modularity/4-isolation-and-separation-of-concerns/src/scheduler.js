'use strict';

const LOGGER = require('./logger.js');
const Task = require('./task.js');

class Scheduler extends EventTarget {
  constructor() {
    super();

    this.tasks = new Map();
    this.logger = LOGGER;
  }

  task(name, time, exec) {
    this.stop(name);

    const task = new Task(name, time, exec);
    this.tasks.set(name, task);

    task.addEventListener('error', ({ detail }) => {
      this.logger.error(task.name + '\t' + detail.err.message);
      this.dispatchEvent(new CustomEvent('error', { detail }));
    });

    task.addEventListener('begin', () => {
      this.logger.info(task.name + '\tbegin');
    });

    task.addEventListener('end', ({ detail }) => {
      const res = detail.res ?? '';
      this.logger.warn(task.name + '\tend\t' + res);
    });

    task.start();

    return task;
  }

  stop(name) {
    const task = this.tasks.get(name);

    if (task) {
      task.stop();
      this.tasks.delete(name);
    }
  }

  stopAll() {
    for (const name of this.tasks.keys()) {
      this.stop(name);
    }
  }
}

module.exports = Scheduler;
