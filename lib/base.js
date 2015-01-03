'use strict';
Function.prototype.property = function(prop, desc) {
  return Object.defineProperty(this.prototype, prop, desc);
};

module.exports = (function() {
  function _Class() {
    var err, sh, stderr, w, _ref;
    stderr = process.stderr;
    _ref = [stderr.write, null], w = _ref[0], stderr.write = _ref[1];
    try {
      sh = require('execSync');
      this.exec = function(cmd) {
        var res;
        res = sh.exec(cmd);
        res.output = res.stdout;
        delete res.stdout;
        return res;
      };
    } catch (_error) {
      err = _error;
      sh = require('shelljs');
      this.exec = function(cmd) {
        return sh.exec(cmd, {
          silent: true
        });
      };
    }
    stderr.write = w;
  }

  _Class.prototype.save = function() {
    return this._info = this.getInfo();
  };

  _Class.prototype.restore = function() {
    var _ref;
    if (this._info) {
      return _ref = this._info, this.enabled = _ref.enabled, this.server = _ref.server, _ref;
    }
  };

  return _Class;

})();

//# sourceMappingURL=base.js.map
