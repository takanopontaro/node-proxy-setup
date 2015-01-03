var ps;

ps = require('../lib/main');

describe('All tests', function() {
  var curInfo;
  curInfo = null;
  it('Setup for all', function() {});
  describe('web-proxy', function() {
    it('Get information of proxy.', function() {
      var enabled, server, _ref;
      _ref = curInfo = ps.web.getInfo(), enabled = _ref.enabled, server = _ref.server;
      expect(enabled.constructor === Boolean).toBe(true);
      return expect(server.constructor === String).toBe(true);
    });
    it('Configre state of proxy.', function() {
      ps.web.enabled = false;
      expect(ps.web.enabled).toBe(false);
      ps.web.enabled = true;
      return expect(ps.web.enabled).toBe(true);
    });
    describe('Configre server address and port number of proxy.', function() {
      it('with port', function() {
        ps.web.server = '127.0.0.1:8080';
        return expect(ps.web.server).toBe('127.0.0.1:8080');
      });
      it('without port', function() {
        ps.web.server = '127.0.0.1';
        return expect(ps.web.server).toBe('127.0.0.1');
      });
      it('empty string', function() {
        ps.web.server = '';
        return expect(ps.web.server).toBe('');
      });
      return it('irregular address', function() {
        expect(function() {
          return ps.web.server = ':8080';
        }).toThrow();
        expect(function() {
          return ps.web.server = 'localhost:';
        }).toThrow();
        expect(function() {
          return ps.web.server = 'localhost:test';
        }).toThrow();
        return expect(function() {
          return ps.web.server = '127.0.0.1:8080:9000';
        }).toThrow();
      });
    });
    return it('Save current setting of proxy and restore it.', function() {
      var addr, _i, _len, _ref, _results;
      _ref = ['hoge:8888', '', 'hoge'];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        addr = _ref[_i];
        ps.web.enabled = false;
        ps.web.server = addr;
        ps.web.save();
        ps.web.enabled = true;
        ps.web.server = 'fuga:1234';
        ps.web.restore();
        expect(ps.web.enabled).toBe(false);
        _results.push(expect(ps.web.server).toBe(addr));
      }
      return _results;
    });
  });
  return it('Tear down for all', function() {
    var enabled, server;
    enabled = curInfo.enabled, server = curInfo.server;
    ps.web.server = server;
    return ps.web.enabled = enabled;
  });
});

//# sourceMappingURL=allSpec.js.map
