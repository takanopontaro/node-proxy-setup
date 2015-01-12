'use strict'

Function::property = (prop, desc) ->
  Object.defineProperty @prototype, prop, desc

module.exports = class
  constructor: ->
    @exec = require('fallback-exec-sync').exec

  save: ->
    @_info = @getInfo()

  restore: ->
    {@enabled, @server} = @_info if @_info
