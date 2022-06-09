"use strict";

var _warn = _interopRequireDefault(require("./utils/warn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// https://developers.google.com/tag-manager/quickstart
var Snippets = {
  tags: function tags(_ref) {
    var id = _ref.id,
        src = _ref.src,
        events = _ref.events,
        dataLayer = _ref.dataLayer,
        dataLayerName = _ref.dataLayerName,
        preview = _ref.preview,
        auth = _ref.auth;
    var gtm_auth = "&gtm_auth=".concat(auth);
    var gtm_preview = "&gtm_preview=".concat(preview);
    var gtm_src = src;
    if (!id) (0, _warn["default"])('GTM Id is required');
    var iframe = "\n      <iframe src=\"".concat(gtm_src, "/ns.html?id=").concat(id).concat(gtm_auth).concat(gtm_preview, "&gtm_cookies_win=x\"\n        height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\" id=\"tag-manager\"></iframe>");
    var script = "\n      (function(w,d,s,l,i){w[l]=w[l]||[];\n        w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js', ".concat(JSON.stringify(events).slice(1, -1), "});\n        var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';\n        j.async=true;j.src='").concat(gtm_src, "/gtm.js?id='+i+dl+'").concat(gtm_auth).concat(gtm_preview, "&gtm_cookies_win=x';\n        f.parentNode.insertBefore(j,f);\n      })(window,document,'script','").concat(dataLayerName, "','").concat(id, "');");
    var dataLayerVar = this.dataLayer(dataLayer, dataLayerName);
    return {
      iframe: iframe,
      script: script,
      dataLayerVar: dataLayerVar
    };
  },
  dataLayer: function dataLayer(_dataLayer, dataLayerName) {
    return "\n      window.".concat(dataLayerName, " = window.").concat(dataLayerName, " || [];\n      window.").concat(dataLayerName, ".push(").concat(JSON.stringify(_dataLayer), ")");
  }
};
module.exports = Snippets;