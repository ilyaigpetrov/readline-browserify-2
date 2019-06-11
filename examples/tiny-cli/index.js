const readline = require('readline');

(async () => {

  const window = globalThis.window;
  const process = globalThis.process;
  const rlOpts = process
    ? (() => {

        // process.stdin.setRawMode(true);
        return {
          input: process.stdin,
          output: process.stdout,
        }
      })()
    : await new Promise((resolve) => {

        const term = new Terminal({
          // rendererType: 'dom',
        });

        term.resume = () => {};

        const _on = term.on.bind(term);
        const _off = term.off.bind(term);
        const eventToCount = {};
        term.on = (event, ...args) => {
          if (event === 'keypress') {
            event = 'key'
          }
          console.log('ON', event);
          eventToCount[event] = (eventToCount[event] || 0) + 1;
          _on(event, ...args);
        }
        term.off = (event, ...args) => {
          if (event === 'keypress') {
            event = 'key'
          }
          console.log('OFF', event);
          eventToCount[event] = (eventToCount[event] || 1) - 1;
          _off(event, ...args);
        }
        term.listenerCount = (event) => {
          if (event === 'keypress') {
            event = 'key'
          }

          console.log('COUNT', event);
          return eventToCount[event];
        }

        term.open(document.getElementById('terminal'));
        resolve({
          input: term,
          output: term,
          terminal: true,
        });
      });

  const rl = readline.createInterface({
    ...rlOpts,
    prompt: 'OHAI> '
  });
  const term = rlOpts.output;

  rl.prompt();

  rl.on('line', (line) => {
    switch (line.trim()) {
      case 'hello':
        term.write('world!\r\n');
        break;
      default:
        term.write(`Say what? I might have heard '${line.trim()}'\r\n`);
        break;
    }
    rl.prompt();
  }).on('close', () => {
    term.write('Have a great day!\r\n');
    if (process) {
      process.exit(0);
    }
  });

})();
