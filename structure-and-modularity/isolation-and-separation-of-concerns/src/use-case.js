'use strict';

const Scheduler = require('./scheduler.js');

const scheduler = new Scheduler();

scheduler.addEventListener('error', ({ detail }) => {
  console.log(`Error in ${detail.task.name}:\n ${detail.err.stack}`);
});

scheduler.task('name1', '2024-11-01T14:00Z', (done) => {
  done(null, 'Task successed');
});

scheduler.task('name2', '2024-11-01T14:30Z', (done) => {
  done(new Error('Task failed'));
});

scheduler.task('name3', 500, (done) => {
  done(null, 'Task successed');
});

scheduler.task('name4', 800, (done) => {
  done(new Error('Task failed'));
});
