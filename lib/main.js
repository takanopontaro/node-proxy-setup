'use strict';
module.exports = new ((function() {
  function _Class() {
    var pf;
    pf = require('os').platform();
    this.web = new (require("./web/" + pf));
  }

  return _Class;

})());

//# sourceMappingURL=main.js.map
