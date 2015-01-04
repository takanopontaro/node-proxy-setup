#!/usr/bin/env node
;
var argv, ps;

ps = require('../lib/main');

argv = require('minimist')(process.argv.slice(2), {
  string: ['h'],
  boolean: ['e', 'd']
});

if (argv.h != null) {
  ps.web.server = argv.h;
}

if (argv.e) {
  ps.web.enabled = true;
}

if (argv.d) {
  ps.web.enabled = false;
}

console.dir(ps.web.getInfo());

//# sourceMappingURL=main.js.map
