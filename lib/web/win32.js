'use strict';
var Self,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = Self = (function(_super) {
  __extends(Self, _super);

  Self.CMD = '"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings"';

  Self.KEY_SERVER = 'ProxyServer';

  Self.KEY_ENABLE = 'ProxyEnable';

  function Self() {
    Self.__super__.constructor.call(this);
  }

  Self.prototype._isKeyExist = function(key) {
    var res;
    res = this.exec("reg query " + Self.CMD + " /v " + key);
    return res.code === 0;
  };

  Self.prototype.getInfo = function() {
    var md, obj, re, res;
    obj = {
      enabled: false,
      server: ''
    };
    res = this.exec("reg query " + Self.CMD + " /v " + Self.KEY_SERVER);
    if (res.code === 0) {
      re = RegExp("" + Self.KEY_SERVER + "\\s+REG_SZ\\s+(\\S+)", "m");
      md = re.exec(res.output);
      obj.server = md[1];
    }
    res = this.exec("reg query " + Self.CMD + " /v " + Self.KEY_ENABLE);
    if (res.code === 0) {
      re = RegExp("" + Self.KEY_ENABLE + "\\s+REG_DWORD\\s+0x(\\d)", "m");
      md = re.exec(res.output);
      obj.enabled = !!+md[1];
    }
    return obj;
  };

  Self.property('enabled', {
    get: function() {
      return this.getInfo().enabled;
    },
    set: function(state) {
      var cmd, res;
      cmd = "reg add " + Self.CMD + " /f /v " + Self.KEY_ENABLE + " /t REG_DWORD /d " + (+state);
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
      var addr, cmd, enabled, md, res;
      if (!((server === '') || (md = /^([^:]+)(?::(\d+))?$/.exec(server)))) {
        throw new Error('seems like an irregular address');
      }
      enabled = this.getInfo().enabled;
      if (md != null) {
        addr = md[1] + (md[2] != null ? ":" + md[2] : '');
        cmd = "reg add " + Self.CMD + " /f /v " + Self.KEY_SERVER + " /t REG_SZ /d " + addr;
        res = this.exec(cmd);
      } else if (this._isKeyExist(Self.KEY_SERVER)) {
        cmd = "reg delete " + Self.CMD + " /f /v " + Self.KEY_SERVER;
        res = this.exec(cmd);
      }
      this.enabled = enabled;
      if ((res != null) && res.code !== 0) {
        throw new Error("an error occured when executed `" + cmd + "`");
      }
    }
  });

  return Self;

})(require('../base'));

//# sourceMappingURL=win32.js.map
