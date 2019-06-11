'use strict'

const through = require('through2');

module.exports = function (file) {

  return through(function (buf, enc, next) {

    this.push(
      buf.toString('utf8')
        .replace(/primordials/g, 'window')
        .replace(/internalBinding\('config'\)/g, '({})')
        .replace(/internalBinding\('buffer'\)/g, '({ kMaxLength: 0 })'),
    );
    next();
  });
};
