'use strict';

const COLORS = {
  YELLOW: '\x1b[1;33m',
  RED: '\x1b[0;31m',
  WHITE: '\x1b[1;37m',
  DEFAULT: '\x1b[0m',
};

const LOGGER = {
  log(color, message) {
    const date = new Date().toISOString();
    console.log(color + date + '\t' + message + COLORS.DEFAULT);
  },
  warn(message) {
    this.log(COLORS.YELLOW, message);
  },
  error(message) {
    this.log(COLORS.RED, message);
  },
  info(message) {
    this.log(COLORS.WHITE, message);
  },
};

module.exports = LOGGER;
