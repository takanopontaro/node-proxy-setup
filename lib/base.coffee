'use strict'

Function::property = (prop, desc) ->
  Object.defineProperty @prototype, prop, desc

module.exports = class
  constructor: ->
    # prevent echoing an error on console in Windows
    # when trying to require 'execSync'
    stderr = process.stderr
    [w, stderr.write] = [stderr.write, null]
    try
      sh = require 'execSync'
      @exec = (cmd) ->
        res = sh.exec cmd
        res.output = res.stdout
        delete res.stdout
        res
    catch err
      sh = require 'shelljs'
      @exec = (cmd) ->
        sh.exec cmd, silent: true
    stderr.write = w

  save: ->
    @_info = @getInfo()

  restore: ->
    {@enabled, @server} = @_info if @_info
