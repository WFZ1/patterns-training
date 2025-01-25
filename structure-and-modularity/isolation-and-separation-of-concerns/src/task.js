'use strict';

const TIMERS = require('./timers.js');

class Task extends EventTarget {
  constructor(name, time, exec) {
    super();

    const timerConfig =
      typeof time === 'number' ? TIMERS.INTERVAL : TIMERS.TIMEOUT;
    this.time = timerConfig.getTime(time);
    this.set = timerConfig.set;
    this.clear = timerConfig.clear;

    this.name = name;
    this.exec = exec;
    this.running = false;
    this.count = 0;
    this.timer = null;
  }

  get active() {
    return !!this.timer;
  }

  start() {
    if (this.running) {
      return false;
    }

    this.stop();

    const time = this.time - Date.now();

    if (time < 0) {
      return false;
    }

    this.timer = this.set(() => {
      this.run();
    }, time);

    return true;
  }

  stop() {
    if (!this.active || this.running) {
      return false;
    }

    this.clear(this.timer);
    this.timer = null;

    return true;
  }

  run() {
    if (!this.active || this.running) {
      return false;
    }

    this.running = true;

    this.dispatchEvent(new CustomEvent('begin', { detail: this }));

    this.exec((err, res) => {
      if (err) {
        this.dispatchEvent(
          new CustomEvent('error', { detail: { err, task: this } }),
        );
      }

      this.dispatchEvent(
        new CustomEvent('end', { detail: { res, task: this } }),
      );

      this.count++;
      this.running = false;
    });

    return true;
  }
}

module.exports = Task;
