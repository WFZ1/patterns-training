'use strict';

const TIMERS = {
  INTERVAL: {
    set: setInterval,
    clear: clearInterval,
    getTime: (time) => Date.now() + time,
  },
  TIMEOUT: {
    set: setTimeout,
    clear: clearTimeout,
    getTime: (time) => new Date(time).getTime(),
  },
};

module.exports = TIMERS;
