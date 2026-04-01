// @ts-nocheck
var SenkoLib = (function () {
  var _layouts  = [];
  var _variants = {};

  return {
    register: function (arr) {
      _layouts.push.apply(_layouts, arr);
    },
    getAll: function () {
      return _layouts;
    },
    registerVariant: function (layoutName, arr) {
      var key = layoutName.toLowerCase();
      if (!_variants[key]) _variants[key] = [];
      _variants[key].push.apply(_variants[key], arr);
    },
    getVariants: function (layoutName) {
      return _variants[layoutName.toLowerCase()] || [];
    },
  };
})();
