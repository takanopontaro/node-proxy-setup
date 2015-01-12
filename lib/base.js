'use strict';
Function.prototype.property = function(prop, desc) {
  return Object.defineProperty(this.prototype, prop, desc);
};

module.exports = (function() {
  function _Class() {
    this.exec = require('fallback-exec-sync').exec;
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
