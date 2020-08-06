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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"sidebarWidthSm":"72px","sidebarWidthReg":"300px"};

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"sidebarWidthSm":"72px","sidebarWidthReg":"300px"};

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/main.scss
var main = __webpack_require__(3);

// EXTERNAL MODULE: ./src/scss/sidebar.scss
var scss_sidebar = __webpack_require__(0);
var sidebar_default = /*#__PURE__*/__webpack_require__.n(scss_sidebar);

// CONCATENATED MODULE: ./src/js/sidebar.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var sidebar_Sidebar = /*#__PURE__*/function () {
  function Sidebar(wrapper) {
    var isExpanded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, Sidebar);

    this.breakpoint = window.matchMedia("(min-width: 1330px)");
    this.wrapper = wrapper;
    this.logo = wrapper.querySelector(".logo__wrapper");
    this.logoMini = wrapper.querySelector(".logo__wrapper--mini");
    this.toggleButton = wrapper.querySelector(".sidebar--toggle");
    this.navButtons = wrapper.getElementsByClassName("nav-button");
    this.navItems = wrapper.getElementsByClassName("sidebar__nav-item");
    this.header = wrapper.querySelector(".sidebar__header");
    this.footer = wrapper.querySelector(".footer");
    this.nav1 = wrapper.querySelector(".sidebar__nav1");
    this.nav2 = wrapper.querySelector(".sidebar__nav2");
    this.isExpanded = isExpanded;
    this.wrapper.addEventListener("mouseenter", this.toggleButtonSlideOut.bind(this, this.toggleButton), false);
    this.wrapper.addEventListener("mouseleave", this.toggleButtonSlideIn.bind(this, this.toggleButton), false);
  }

  _createClass(Sidebar, [{
    key: "toggleButtonSlideIn",
    value: function toggleButtonSlideIn(toggleButton, event) {
      toggleButton.style.left = "-270px";
      toggleButton.style.transition = "0.3s";
    }
  }, {
    key: "toggleButtonSlideOut",
    value: function toggleButtonSlideOut(toggleButton, event) {
      toggleButton.style.left = "0px";
      toggleButton.style.transition = "0.3s";
    }
  }, {
    key: "setExpandedState",
    value: function setExpandedState(bool) {
      this.isExpanded = bool;
    }
  }, {
    key: "getExpandedState",
    value: function getExpandedState() {
      return this.isExpanded;
    }
  }, {
    key: "toggle",
    value: function toggle() {
      var content = document.getElementById("content");

      if (this.getExpandedState() == true) {
        /* Collapse sidebar */
        this.logo.style.display = "none";
        this.logoMini.style.display = "flex";

        var _iterator = _createForOfIteratorHelper(this.navButtons),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var btn = _step.value;
            btn.classList.add("nav-button--collapsed");
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var _iterator2 = _createForOfIteratorHelper(this.navItems),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var item = _step2.value;
            item.style.paddingLeft = "0";
            item.querySelector("svg").style.marginRight = "0";
            item.querySelector("p").style.marginTop = "5px";
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        this.wrapper.style.width = sidebar_default.a.sidebarWidthSm;
        this.nav2.style.margin = "calc(20px + 11vh) 0";
        this.footer.style.flexDirection = "column";
        this.footer.style.justifyContent = "center";
        this.footer.querySelector("a").style.marginRight = "0";
        this.footer.querySelector(".footer__copyright").style.fontSize = "10px";
        content.style.marginLeft = sidebar_default.a.sidebarWidthSm;
        this.toggleButton.style.left = "-40px";
        this.toggleButton.style.marginLeft = sidebar_default.a.sidebarWidthSm;
        this.setExpandedState(false);
      } else {
        /* Expand Sidebar */
        this.logo.style.display = "block";
        this.logoMini.style.display = "none";

        var _iterator3 = _createForOfIteratorHelper(this.navButtons),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _item = _step3.value;

            _item.classList.remove("nav-button--collapsed");
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        var _iterator4 = _createForOfIteratorHelper(this.navItems),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _item2 = _step4.value;
            _item2.style.paddingLeft = "25px";
            _item2.querySelector("svg").style.marginRight = "40px";
            _item2.querySelector("p").style.marginTop = "0";
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        this.wrapper.style.width = sidebar_default.a.sidebarWidthReg;
        this.nav2.style.margin = "calc(50px + 11vh) 0";
        this.footer.style.flexDirection = "row";
        this.footer.style.justifyContent = "flex-start";
        this.footer.querySelector("a").style.marginRight = "16px";
        this.footer.querySelector(".footer__copyright").style.fontSize = "1rem";
        content.style.marginLeft = sidebar_default.a.sidebarWidthReg;
        this.toggleButton.style.top = "0px";
        this.toggleButton.style.left = "0px";
        this.toggleButton.style.marginLeft = sidebar_default.a.sidebarWidthReg;
        this.setExpandedState(true);
      }
    }
  }]);

  return Sidebar;
}();

/* harmony default export */ var js_sidebar = (sidebar_Sidebar);
// CONCATENATED MODULE: ./src/main.js
var _this = undefined;




var toggleSidebar = function toggleSidebar(sidebarObject, event) {
  sidebarObject.toggle();
};

var mediaQueryHandler = function mediaQueryHandler(sidebar, event) {
  if (event.matches && sidebar.getExpandedState() == true) {
    /* Viewport is 1330px or less */
    sidebar.toggle();
  } else if (!(event.matches || sidebar.getExpandedState() == true)) {
    sidebar.toggle();
  }
};

document.addEventListener("DOMContentLoaded", function () {
  var sidebarToggle = document.querySelector(".sidebar--toggle");
  var sidebar = new js_sidebar(document.querySelector(".sidebar__wrapper"));
  /* Initial media query for page load */

  var mediaQuery = window.matchMedia("(max-width: 1330px)");
  if (mediaQuery.matches) sidebar.setExpandedState(true);else sidebar.setExpandedState(false);
  sidebar.toggle();
  mediaQuery.addListener(mediaQueryHandler.bind(_this, sidebar));
  sidebarToggle.addEventListener("click", toggleSidebar.bind(_this, sidebar), false);
});

/***/ })
/******/ ]);