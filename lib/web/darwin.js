'use strict';
var Self,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = Self = (function(_super) {
  __extends(Self, _super);

  Self.CMD = 'networksetup';

  function Self() {
    Self.__super__.constructor.call(this);
  }

  Self.prototype._getDevice = function() {
    var cmd, md, re, res;
    cmd = 'ifconfig';
    res = this.exec(cmd);
    if (res.code === 0) {
      re = /^([^\t:]+):(?:[^\n]|\n\t)*status: active/m;
      if (md = re.exec(res.output)) {
        return md[1];
      }
      throw new Error('active network device not found');
    }
    throw new Error("an error occured when executed `" + cmd + "`");
  };

  Self.prototype._getService = function() {
    var cmd, dev, md, re, res;
    dev = this._getDevice();
    cmd = "" + Self.CMD + " -listallhardwareports";
    res = this.exec(cmd);
    if (res.code === 0) {
      re = new RegExp("Hardware Port: (.+?)\\nDevice: " + dev, 'm');
      if (md = re.exec(res.output)) {
        return md[1];
      }
      throw new Error('active network service not found');
    }
    throw new Error("an error occured when executed `" + cmd + "`");
  };

  Self.prototype.getInfo = function() {
    var cmd, md, re, res, srv;
    srv = this._getService();
    cmd = "" + Self.CMD + " -getwebproxy " + srv;
    res = this.exec(cmd);
    if (res.code === 0) {
      re = /Enabled: (.+?)\nServer: (.*?)\nPort: (.*?)\n/m;
      md = re.exec(res.output);
      return {
        enabled: md[1] === 'Yes',
        server: md[2] + (md[3] !== '0' ? ":" + md[3] : '')
      };
    }
    throw new Error("an error occured when executed `" + cmd + "`");
  };

  Self.property('enabled', {
    get: function() {
      return this.getInfo().enabled;
    },
    set: function(state) {
      var cmd, res, s, srv;
      srv = this._getService();
      s = state ? 'on' : 'off';
      cmd = "sudo " + Self.CMD + " -setwebproxystate " + srv + " " + s;
      res = this.exec(cmd);
      if (res.code !== 0) {
        throw new Error("an error occured when executed `" + cmd + "`");
      }
    }
  });

  Self.property('server', {
    get: function() {
      return this.getInfo().server;
    },
    set: function(server) {
      var cmd, enabled, host, md, port, res, srv, _ref;
      if (!((server === '') || (md = /^([^:]+)(?::(\d+))?$/.exec(server)))) {
        throw new Error('seems like an irregular address');
      }
      srv = this._getService();
      enabled = this.getInfo().enabled;
      host = port = '';
      if (md != null) {
        host = md[1];
        port = (_ref = md[2]) != null ? _ref : '';
      }
      cmd = "sudo " + Self.CMD + " -setwebproxy " + srv + " \"" + host + "\" " + port;
      res = this.exec(cmd);
      this.enabled = enabled;
      if (res.code !== 0) {
        throw new Error("an error occured when executed `" + cmd + "`");
      }
    }
  });

  return Self;

})(require('../base'));

//# sourceMappingURL=darwin.js.map
