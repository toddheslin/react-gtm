"use strict";

var _Snippets = _interopRequireDefault(require("./Snippets"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TagManager = {
  dataScript: function dataScript(dataLayer) {
    var script = document.createElement('script');
    script.innerHTML = dataLayer;
    return script;
  },
  gtm: function gtm(args) {
    var snippets = _Snippets["default"].tags(args);

    var noScript = function noScript() {
      var noscript = document.createElement('noscript');
      noscript.innerHTML = snippets.iframe;
      return noscript;
    };

    var script = function script(nonce) {
      var script = document.createElement('script');

      if (nonce) {
        script.setAttribute('nonce', nonce);
      }

      script.innerHTML = snippets.script;
      return script;
    };

    var dataScript = this.dataScript(snippets.dataLayerVar);
    return {
      noScript: noScript,
      script: script,
      dataScript: dataScript
    };
  },
  initialize: function initialize(_ref) {
    var gtmId = _ref.gtmId,
        _ref$gtmSrc = _ref.gtmSrc,
        gtmSrc = _ref$gtmSrc === void 0 ? 'https://www.googletagmanager.com' : _ref$gtmSrc,
        _ref$events = _ref.events,
        events = _ref$events === void 0 ? {} : _ref$events,
        dataLayer = _ref.dataLayer,
        _ref$dataLayerName = _ref.dataLayerName,
        dataLayerName = _ref$dataLayerName === void 0 ? 'dataLayer' : _ref$dataLayerName,
        _ref$auth = _ref.auth,
        auth = _ref$auth === void 0 ? '' : _ref$auth,
        _ref$preview = _ref.preview,
        preview = _ref$preview === void 0 ? '' : _ref$preview,
        _ref$nonce = _ref.nonce,
        nonce = _ref$nonce === void 0 ? undefined : _ref$nonce;
    var gtm = this.gtm({
      id: gtmId,
      src: gtmSrc,
      events: events,
      dataLayer: dataLayer || undefined,
      dataLayerName: dataLayerName,
      auth: auth,
      preview: preview,
      nonce: nonce
    });
    if (dataLayer) document.head.appendChild(gtm.dataScript);
    document.head.insertBefore(gtm.script(nonce), document.head.childNodes[0]);
    document.body.insertBefore(gtm.noScript(), document.body.childNodes[0]);
  },
  dataLayer: function dataLayer(_ref2) {
    var _dataLayer = _ref2.dataLayer,
        _ref2$dataLayerName = _ref2.dataLayerName,
        dataLayerName = _ref2$dataLayerName === void 0 ? 'dataLayer' : _ref2$dataLayerName;
    if (window[dataLayerName]) return window[dataLayerName].push(_dataLayer);

    var snippets = _Snippets["default"].dataLayer(_dataLayer, dataLayerName);

    var dataScript = this.dataScript(snippets);
    document.head.insertBefore(dataScript, document.head.childNodes[0]);
  }
};
module.exports = TagManager;