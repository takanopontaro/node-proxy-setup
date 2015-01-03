'use strict'

module.exports = class Self extends require '../base'

  @CMD = 'networksetup'

  constructor: ->
    super()

  _getDevice: ->
    cmd = 'ifconfig'
    res = @exec cmd
    if res.code is 0
      re = /^([^\t:]+):(?:[^\n]|\n\t)*status: active/m
      return md[1] if md = re.exec res.output
      throw new Error 'active network device not found'
    throw new Error "an error occured when executed `#{cmd}`"

  _getService: ->
    dev = @_getDevice()
    cmd = "#{Self.CMD} -listallhardwareports"
    res = @exec cmd
    if res.code is 0
      re = new RegExp "Hardware Port: (.+?)\\nDevice: #{dev}", 'm'
      return md[1] if md = re.exec res.output
      throw new Error 'active network service not found'
    throw new Error "an error occured when executed `#{cmd}`"

  getInfo: ->
    srv = @_getService()
    cmd = "#{Self.CMD} -getwebproxy #{srv}"
    res = @exec cmd
    if res.code is 0
      re = /Enabled: (.+?)\nServer: (.*?)\nPort: (.*?)\n/m
      md = re.exec res.output
      return (
        enabled: md[1] is 'Yes'
        server: md[2] + if md[3] isnt '0' then ":#{md[3]}" else ''
      )
    throw new Error "an error occured when executed `#{cmd}`"

  @property 'enabled',
    get: ->
      @getInfo().enabled

    set: (state) ->
      srv = @_getService()
      s = if state then 'on' else 'off'
      cmd = "sudo #{Self.CMD} -setwebproxystate #{srv} #{s}"
      res = @exec cmd
      if res.code isnt 0
        throw new Error "an error occured when executed `#{cmd}`"

  @property 'server',
    get: ->
      @getInfo().server

    set: (server) ->
      unless (server is '') or (md = /^([^:]+)(?::(\d+))?$/.exec server)
        throw new Error 'seems like an irregular address'
      srv = @_getService()
      {enabled} = @getInfo()
      host = port = ''
      (host = md[1]; port = md[2] ? '') if md?
      cmd = "sudo #{Self.CMD} -setwebproxy #{srv} \"#{host}\" #{port}"
      res = @exec cmd
      @enabled = enabled
      if res.code isnt 0
        throw new Error "an error occured when executed `#{cmd}`"
