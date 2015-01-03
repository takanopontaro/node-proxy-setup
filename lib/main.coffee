'use strict'

module.exports = new class
  constructor: ->
    pf = require('os').platform()
    @web = new (require "./web/#{pf}")
