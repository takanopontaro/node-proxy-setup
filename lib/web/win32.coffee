'use strict'

module.exports = class Self extends require '../base'

  @CMD = '"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings"'
  @KEY_SERVER = 'ProxyServer'
  @KEY_ENABLE = 'ProxyEnable'

  constructor: ->
    super()

  _isKeyExist: (key) ->
    res = @exec "reg query #{Self.CMD} /v #{key}"
    res.code is 0

  getInfo: ->
    obj = enabled: false, server: ''
    res = @exec "reg query #{Self.CMD} /v #{Self.KEY_SERVER}"
    if res.code is 0
      re = ///#{Self.KEY_SERVER}\s+REG_SZ\s+(\S+)///m
      md = re.exec res.output
      obj.server = md[1]
    res = @exec "reg query #{Self.CMD} /v #{Self.KEY_ENABLE}"
    if res.code is 0
      re = ///#{Self.KEY_ENABLE}\s+REG_DWORD\s+0x(\d)///m
      md = re.exec res.output
      obj.enabled = !!+md[1]
    obj

  @property 'enabled',
    get: ->
      @getInfo().enabled

    set: (state) ->
      cmd = "reg add #{Self.CMD} /f /v #{Self.KEY_ENABLE} /t REG_DWORD /d #{+state}"
      res = @exec cmd
      if res.code isnt 0
        throw new Error "an error occured when executed `#{cmd}`"

  @property 'server',
    get: ->
      @getInfo().server

    set: (server) ->
      unless (server is '') or (md = /^([^:]+)(?::(\d+))?$/.exec server)
        throw new Error 'seems like an irregular address'
      {enabled} = @getInfo()
      if md?
        addr = md[1] + if md[2]? then ":#{md[2]}" else ''
        cmd = "reg add #{Self.CMD} /f /v #{Self.KEY_SERVER} /t REG_SZ /d #{addr}"
        res = @exec cmd
      else if @_isKeyExist Self.KEY_SERVER
        cmd = "reg delete #{Self.CMD} /f /v #{Self.KEY_SERVER}"
        res = @exec cmd
      @enabled = enabled
      if res? and res.code isnt 0
        throw new Error "an error occured when executed `#{cmd}`"
