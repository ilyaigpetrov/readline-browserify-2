'use strict'

const through = require('through2');

module.exports = function (file) {

  return through(function (buf, enc, next) {

    this.push(
      buf.toString('utf8')
        .replace(/primordials/g, 'window')
        .replace(/internalBinding\('config'\)/g, '({})')
        .replace(/internalBinding\('buffer'\)/g, '({ kMaxLength: 1 })'),
        //.replace(/timeout\.close/g, 'timeout && timeout.close'), // Fix bug in timers shim.
    );
    next();
  });
};
