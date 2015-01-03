ps = require '../lib/main'


describe 'All tests', ->
  curInfo = null

  it 'Setup for all', ->
    # setup()

  describe 'web-proxy', ->
    it 'Get information of proxy.', ->
      {enabled, server} = curInfo = ps.web.getInfo()
      expect(enabled.constructor is Boolean).toBe true
      expect(server.constructor is String).toBe true

    it 'Configre state of proxy.', ->
      ps.web.enabled = false
      expect(ps.web.enabled).toBe false
      ps.web.enabled = true
      expect(ps.web.enabled).toBe true

    describe 'Configre server address and port number of proxy.', ->
      it 'with port', ->
        ps.web.server = '127.0.0.1:8080'
        expect(ps.web.server).toBe '127.0.0.1:8080'
      it 'without port', ->
        ps.web.server = '127.0.0.1'
        expect(ps.web.server).toBe '127.0.0.1'
      it 'empty string', ->
        ps.web.server = ''
        expect(ps.web.server).toBe ''
      it 'irregular address', ->
        expect(-> ps.web.server = ':8080').toThrow()
        expect(-> ps.web.server = 'localhost:').toThrow()
        expect(-> ps.web.server = 'localhost:test').toThrow()
        expect(-> ps.web.server = '127.0.0.1:8080:9000').toThrow()

    it 'Save current setting of proxy and restore it.', ->
      for addr in ['hoge:8888', '', 'hoge']
        ps.web.enabled = false
        ps.web.server = addr
        ps.web.save()
        ps.web.enabled = true
        ps.web.server  = 'fuga:1234'
        ps.web.restore()
        expect(ps.web.enabled).toBe false
        expect(ps.web.server).toBe addr

  it 'Tear down for all', ->
    {enabled, server} = curInfo
    ps.web.server = server
    ps.web.enabled = enabled
