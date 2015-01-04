`#!/usr/bin/env node
`

ps = require '../lib/main'

argv = require('minimist')(
  process.argv.slice(2),
  string: ['h'],
  boolean: ['e', 'd']
)

ps.web.server = argv.h if argv.h?
ps.web.enabled = true if argv.e
ps.web.enabled = false if argv.d

console.dir ps.web.getInfo()
