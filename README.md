# Node's Core Readline Browserified

Node's core readline library bundled by browserify.'

```sh-session
// As usual:
npm install
npm run build
// See result in ./dist/readline.js.
// See ./examples.
```

## Known Bugs

Rollup outputs _stream_readable assignment after it is actually being used.
So to generate a working bundle you will need to move definition manually.
