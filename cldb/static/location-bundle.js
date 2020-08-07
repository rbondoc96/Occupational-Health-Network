/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/scss/location.scss
var scss_location = __webpack_require__(5);

// CONCATENATED MODULE: ./src/js/ajax-api-handler.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AjaxApiHandler = /*#__PURE__*/function () {
  function AjaxApiHandler(url) {
    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "GET";

    _classCallCheck(this, AjaxApiHandler);

    this.url = url;
    this.method = method;
    this.xhr = new XMLHttpRequest();
    this.xhr.responseType = "json";
    this.xhr.open(method, this.url, true);
  }

  _createClass(AjaxApiHandler, [{
    key: "execute",
    value: function execute() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        // Set up any headers and body
        if (_this.method == "POST" || _this.method == "PATCH") {} else {}

        _this.xhr.onload = function (event) {
          resolve(this.xhr);
        }.bind(_this);

        _this.xhr.onerror = function (event) {
          reject(this.xhr);
        }.bind(_this);

        _this.xhr.send();
      });
    }
  }, {
    key: "config",
    value: function config(url, method) {
      this.url = url;
      this.method = method;
      this.xhr.open(method, this.url, true);
    }
  }]);

  return AjaxApiHandler;
}();

/* harmony default export */ var ajax_api_handler = (AjaxApiHandler);
// CONCATENATED MODULE: ./src/js/location.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



/* START Google Maps API */

var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC8i4Dw9T0XlIaLrF7-RpIV7yYkXaJLAso&callback=initMap&libraries=places';
script.defer = true;
script.async = true;

window.initMap = function () {
  var options = {
    zoom: 12,
    center: {
      lat: 32.7785,
      lng: -117.1306
    }
  };
  var map = new google.maps.Map(document.getElementById('map'), options);

  var addMarker = function addMarker(pos) {
    var marker = new google.maps.Marker({
      position: pos,
      map: map
    });
  };
};

document.head.appendChild(script);
/* END Google Maps API */

var setText = function setText(elem, text) {
  var list = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var textNode = document.createTextNode(text);
  elem.appendChild(textNode);
};

var setObjectListText = function setObjectListText(elem, objList) {
  if (objList.length != 0) {
    var list = [];

    var _iterator = _createForOfIteratorHelper(objList),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var obj = _step.value;
        list.push(obj.name);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var text = document.createTextNode(list.join(", "));
    elem.appendChild(text);
  }
};

var getReviewStats = function getReviewStats(reviews) {
  var likes = 0;
  var dislikes = 0;
  var length = Object.keys(reviews).length;

  if (length != 0) {
    var _iterator2 = _createForOfIteratorHelper(reviews),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var rev = _step2.value;
        if (rev.like == true) likes++;else dislikes++;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  return {
    likes: likes,
    dislikes: dislikes,
    total: Object.keys(reviews).length
  };
};

var setReviewsText = function setReviewsText(elem, reviews) {
  var reviewStats = getReviewStats(reviews);
  var percentPosReviews = (reviewStats.likes * 100 / reviewStats.total).toFixed(2);
  var formattedText = document.createElement("span");
  var label = " had positive reviews out of ".concat(reviewStats.total);
  var link = document.createElement("a");
  var slug = window.location.pathname.split("/")[2];
  link.setAttribute("href", "/locations/reviews/".concat(slug));
  link.appendChild(document.createTextNode("".concat(percentPosReviews, "%")));
  formattedText.appendChild(link);

  if (percentPosReviews >= 75) {
    formattedText.setAttribute("class", "good-reviews");
  } else if (percentPosReviews >= 40) {
    formattedText.setAttribute("class", "okay-reviews");
  } else {
    formattedText.setAttribute("class", "bad-reviews");
  }

  elem.appendChild(formattedText);
  elem.appendChild(document.createTextNode(label));
};

var sortServicesByCategory = function sortServicesByCategory(objList) {
  var sortedList = {};

  var _iterator3 = _createForOfIteratorHelper(objList),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var obj = _step3.value;
      var category = obj.service_category.name;
      if (sortedList[category] == undefined) sortedList[category] = [obj.name];else sortedList[category].push(obj.name);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  return sortedList;
};

var setServicesText = function setServicesText(elem, objList) {
  var sortedList = sortServicesByCategory(objList);

  for (var _i = 0, _Object$keys = Object.keys(sortedList); _i < _Object$keys.length; _i++) {
    var item = _Object$keys[_i];
    var itemHeader = document.createElement("h2"); // itemHeader.setAttribute("class", "")

    console.log(item);
    console.log(sortedList[item]);
  }
};

var getLocationContext = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var apiUrl, apiHandler, location;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            apiUrl = "/api" + window.location.pathname;
            apiHandler = new ajax_api_handler(apiUrl, "GET");
            _context.next = 4;
            return apiHandler.execute().then(function (xhr) {
              return xhr.response;
            })["catch"](function (xhr) {
              console.log(xhr.error);
              return null;
            });

          case 4:
            location = _context.sent;

            if (location != null) {
              console.log(location);
              document.title = location.branch_name != "" ? "".concat(location.name, " - ").concat(location.branch_name) : location.name;
              setText(document.getElementById("center-name"), location.name);
              setText(document.getElementById("branch-name"), location.branch_name);
              setText(document.getElementById("location-category"), location.location_category.name);
              setObjectListText(document.getElementById("auth-method-list"), location.auth_method_list);
              setObjectListText(document.getElementById("ccf-category-list"), location.ccf_category_list);
              setReviewsText(document.querySelector(".clinic-reviews"), location.reviews);
              setServicesText(document.querySelector(".services-section"), location.service_list);
            } else {// redirect?
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getLocationContext() {
    return _ref.apply(this, arguments);
  };
}();

document.addEventListener("DOMContentLoaded", function () {
  getLocationContext();
  var employerToggle = document.getElementById("employer-info--toggle");
  employerToggle.addEventListener("click", function (event) {
    var box = document.querySelector(".sliding-box");
    if (box.style.display == "none") box.style.display = "block";else box.style.display = "none";
  });
});

/***/ })

/******/ });