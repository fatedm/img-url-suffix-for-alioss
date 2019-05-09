/* eslint-disable */
/**
 * Desc: 根据配置获取优化后的阿里oss图片地址
 * Author: gecidm@163.com
 * Usage: 
 *  width: {number} 图片宽度
 *  height: {number} 图片高度
 *  l: {number} 图片最大边
 *  quality: {number} 压缩质量
 *  mPad: {boolean} 是否补白
 *  color: {string} 16位颜色
 *  format: {jpg/png} 图片格式
 */
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.varructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
	(typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.LazyLoad = factory();
})(this, function () {
  function merge(o1, o2, o3) {
    for(var i in o2) {
      o1[i] = o2[i];
    }
    for(var j in o3) {
      o1[j] = o3[j];
    }
    return o1;
  }
  /**
   * get img suffix by config
   * @param {*} config 
   */
  function getSuffix(config) {
    var defaultCfg = {
      quality: 80,
      dpr: 1,
    };

    var cfg = merge({}, defaultCfg, config);

    var detectWebp = function detectWebp() {
      var webpString = "image/webp";
      var canvas = document.createElement("canvas");

      if (canvas.getContext && canvas.getContext("2d")) {
        return canvas.toDataURL(webpString).indexOf('data:' + webpString) === 0;
      }

      return false;
    };
    
    var runningOnBrowser = typeof window !== "undefined";
    var supportsWebp = typeof window.supportWebp === 'undefined' ? runningOnBrowser && detectWebp() : window.supportWebp;
    if (typeof window.supportWebp === 'undefined') {
      window.supportsWebp = supportsWebp;
    }

    var imgFivarype = supportsWebp ? 'webp' : 'jpg';

    var format = cfg.format;
    var l = cfg.l;
    var width = cfg.width;
    var height = cfg.height;
    var quality = cfg.quality;
    var mPad = cfg.mPad;
    var color = cfg.color;

    var mPadStr = mPad ? ',m_pad' : '';
    var optPrefix = '?x-oss-process=image/';
    var q = quality >= 60 && quality <= 100 ? quality : 75;

    // 颜色
    var colorReg = /^[a-zA-Z0-9]{6}$/;

    if (mPadStr && color && colorReg.test(color)) {
      mPadStr = mPadStr + ',color_' + color;
    }

    // 格式后缀
    var formatSuffix = "/format," + imgFivarype;

    // 如果是写明格式，转换为格式
    if (format) {
      if (/^(jpg|png)$/.test(format)) {
        formatSuffix = '/format,' + format;
      } else {
        formatSuffix = supportsWebp ? '/format,webp' : '';
      }
    }

    // 最长边
    if (l) {
      var lLenth = parseInt(l);
      if (!isNaN(lLenth)) {
          return optPrefix + "resize,l_" + lLenth + mPadStr + "/quality,Q_" + q + formatSuffix;
      }
    }

    if (!isNaN(width)) {
        if (!isNaN(height)) {
            return optPrefix + "resize,m_fixed,h_" + height + ",w_" + width + mPadStr  + "/quality,Q_" + q + formatSuffix;
        } else {
            return optPrefix + "resize,w_" + width  + mPadStr + "/quality,Q_" + q + formatSuffix;
        }
    } else if (!isNaN(height)) {
        return optPrefix + "resize,h_" + height + mPadStr + "/quality,Q_" + q + formatSuffix;
    } else {
      return optPrefix + "quality,Q_" + q + formatSuffix;
    }
  }

  var addSuffix = function addSuffix(url, suffix) {
    if(!url) {
      return url;
    }
    var urlApp = url.split('?');
    if (urlApp.length > 1) {
        return urlApp[0] + suffix + '&' + urlApp[1];
    } else {
        return url + suffix;
    }
  };

  var imgUrlSuffix4Alioss = function imgUrlSuffix4Alioss(url, config) {
    config = config || {};
    var suffix = getSuffix(config);

    return addSuffix(url, suffix);
  };

  return imgUrlSuffix4Alioss;
});