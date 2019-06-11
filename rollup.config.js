import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from './plugins/rollup-builtins';

import pkg from './package.json';

export default {
  input: './src/index.mjs',
  output: [
    {
      file: './dist/readline.mjs',
      format: 'esm',
      paths: pkg.browser,
    },
    {
      file: './dist/readline.cjs',
      format: 'cjs',
      paths: pkg.browser,
    },
  ],
  plugins: [
    builtins(),
    resolve({
      mainFields: ['module', 'main', 'browser'],
      preferBuiltins: false,
    }),
    commonjs(),
  ],
};
