import pkg from '../package.json'

const libs = new Map();

Object.keys(pkg.browser).reduce((libs, key) => {

  libs.set(key, require.resolve(pkg.browser[key]));
  return libs;
}, libs);

export default function (opts) {

  opts = opts || {};

  return {
    resolveId(importee) {
      if (importee && importee.slice(-1) === '/') {
        importee === importee.slice(0, -1);
      }
      if (libs.has(importee)) {
        return libs.get(importee);
      }
      if (importee === 'crypto') {
        return cryptoPath;
      }
      if (importee === 'fs') {
        return fsPath;
      }
    },
    transform(code) {
      return {
        code: code
          .replace(/primordials/g, 'window')
          .replace(/internalBinding\('config'\)/g, '({})')
          .replace(/internalBinding\('buffer'\)/g, '({ kMaxLength: 0 })'),
      };
    },
  };
}
