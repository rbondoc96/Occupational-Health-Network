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
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return timestrConvert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return timeRangeToString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return lookup; });
var timestrConvert = function timestrConvert(timeStr) {
  var tokens = timeStr.split(":");
  console.log("converting" + timeStr);
  var hour = parseInt(tokens[0]);
  var meridian = "AM";

  if (hour >= 12) {
    meridian = "PM";
    if (hour > 12) hour -= 12;
  } else if (hour == 0) {
    hour = 12;
  }

  return "".concat(hour, ":").concat(tokens[1], " ").concat(meridian);
};

var getCookie = function getCookie(name) {
  var cookieValue;

  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();

      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }

  return cookieValue;
};

var timeRangeToString = function timeRangeToString(time1, time2) {
  if (time1 == "11:59 PM" && time2 == "11:59 PM") return "Closed";else if (time1 == "12:00 AM" && time2 == "12:00 AM") return "Open 24 Hours";else return "".concat(time1, " to ").concat(time2);
};

var lookup = function lookup(endpoint, callback, options) {
  var apiUrl = "http://127.0.0.1:8000/api/" + endpoint + "/";
  fetch(apiUrl, options).then(function (response) {
    return response.json();
  }).then(function (json) {
    return callback(json);
  });
};



/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var template = document.createElement("template");
template.innerHTML = "\n    <style>\n        :host {\n            display: block;\n        }\n        p {\n            margin: 0;\n            font-size: 0.8rem;\n        }\n        ::slotted(label) {\n            font-weight: 700;\n            font-size: 14px;\n        }\n        ::slotted(textarea) {\n            padding: 0.4em 0.6em;\n            min-height: 150px;\n            resize: vertical;\n        \n            font-family: \"Varta\", sans-serif;\n        }        \n        ::slotted(input), ::slotted(textarea) {\n            padding: 0.4em 0.6em !important;\n            border-width: 1px;\n            border-radius: 0.3em;\n        }\n        ::slotted(input:focus), ::slotted(textarea:focus) {\n            outline: none;\n            border: 1px solid #1B8FFA !important;\n        }\n        ::slotted(.required):after {\n            content: \" *\";\n            color: #ff0000;\n        }\n\n        .wrapper {\n            margin: 15px 0;\n        }\n\n        .content {\n            display: flex;\n            flex-direction: column;\n        }\n\n        .header {\n            display: flex;\n            flex-direction: column;\n        }\n        .description, .err-message {\n            margin-top: 2px;\n        }\n        .err-message {\n            display: none;\n            color: red;\n        }\n    </style>\n    <div class=\"wrapper\">\n        <div class=\"content\">\n            <div class=\"header\">\n                <slot name=\"label\">\n                    <label>Field Label</label>\n                </slot>\n            </div>\n            <slot name=\"input\">\n                <input type=\"text\">\n            </slot>\n        </div>\n        <p class=\"description\">\n            <slot name=\"info\"></slot>\n        </p>\n        <p class=\"err-message\"></p>\n    </div>\n";

var TextField = /*#__PURE__*/function (_HTMLElement) {
  _inherits(TextField, _HTMLElement);

  var _super = _createSuper(TextField);

  _createClass(TextField, null, [{
    key: "observedAttributes",
    get: function get() {
      return ["state"];
    }
  }]);

  function TextField() {
    var _this;

    _classCallCheck(this, TextField);

    _this = _super.call(this);

    _this.attachShadow({
      mode: "open"
    });

    _this.shadowRoot.appendChild(template.content.cloneNode(true));

    _this.input = _this.querySelector("input") || _this.querySelector("textarea");
    _this.isRequired = _this.input.hasAttribute("required");
    _this.validator = _this.getAttribute("validator");
    _this.limit = _this.getAttribute("char-limit");
    _this.label = _this.querySelector("label");
    _this.description = _this.shadowRoot.querySelector(".description");
    _this.errorMessage = _this.shadowRoot.querySelector(".err-message");
    if (_this.isRequired) _this.label.setAttribute("class", "required");
    _this.validateInput = _this.validateInput.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TextField, [{
    key: "hideDescription",
    value: function hideDescription() {
      this.description.style.display = "none";
      this.errorMessage.style.display = "block";
    }
  }, {
    key: "hideError",
    value: function hideError() {
      this.description.style.display = "block";
      this.errorMessage.style.display = "none";
    }
  }, {
    key: "setErrorMessage",
    value: function setErrorMessage(message) {
      this.errorMessage.textContent = message;
    }
  }, {
    key: "validateInput",
    value: function validateInput(event) {
      var value = event.target.value;
      var valueLength = value.length;
      var isNotEmpty = true,
          isWithinLimits = true,
          isDataValid = true;

      if (this.limit != "" && this.limit != null) {
        if (valueLength >= this.limit) {
          this.errorMessage.textContent = "-".concat(valueLength - this.limit, " characters remaining");
        }

        isWithinLimits = !(valueLength > this.limit);
      }

      if (this.validator != "" && this.validator != null) {
        if (this.validator == "phone") {
          // (123) 456-6780 or 123-234-2343 
          var regex = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/;
          isDataValid = regex.test(value) || value == "";
          if (!isDataValid) this.errorMessage.textContent = "Invalid phone";
        } else if (this.validator == "zipcode") {
          // Regex allows for 5 digit or 9 digit mailing zip codes
          var _regex = /^((\d{5})(-\d{4})?)$/;
          isDataValid = _regex.test(value) || value == "";
          if (!isDataValid) this.errorMessage.textContent = "Invalid zipcode";
        } else if (this.validator == "phone-ext") {
          // Regex for US phone numbers w/ optional 1-6 digit extension
          // (123) 456-6780 x123456 or 123-234-2343 x123456
          var _regex2 = /^((((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4})( x\d{1,6})?)$/;
          isDataValid = _regex2.test(value) || value == "";
          if (!isDataValid) this.errorMessage.textContent = "Invalid phone";
        } else if (this.validator == "url") {
          var _regex3 = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
          isDataValid = _regex3.test(value) || value == "";
          if (!isDataValid) this.errorMessage.textContent = "Invalid URL";
        } else if (this.validator == "time") {
          var _regex4 = /\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))$/;
          isDataValid = _regex4.test(value) || value == "";
          if (!isDataValid) this.errorMessage.textContent = "Invalid time format";
        } else if (this.validator == "email") {
          var _regex5 = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
          isDataValid = _regex5.test(value) || value == "";
          if (!isDataValid) this.errorMessage.textContent = "Invalid email address";
        }
      }

      if (this.isRequired) {
        if (valueLength == 0) {
          this.errorMessage.textContent = "Required";
        }

        isNotEmpty = valueLength > 0;
      }

      if (isNotEmpty && isWithinLimits && isDataValid) {
        this.hideError();
        this.input.setAttribute("data-status", "valid");
        this.input.style.borderColor = "#000";
      } else {
        this.hideDescription();
        this.input.setAttribute("data-status", "invalid");
        this.input.style.borderColor = "#FF0000";
      }

      this.setAttribute("state", value);
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      if (this.input.isConnected) {
        this.input.addEventListener("keyup", this.validateInput);
      }
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this.input.removeEventListener("keyup", this.validateInput);
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attributeName, oldValue, newValue) {}
  }]);

  return TextField;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

window.customElements.define("text-field", TextField);

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var template = document.createElement("template");
template.innerHTML = "\n    <style>\n    .wrapper {\n        margin: 10px 0;\n    }\n    .content {\n        display: flex;\n        align-items: center;\n        justify-content: flex-start;\n    }\n    ::slotted(label) {\n        position: relative;\n        bottom: -1px;\n        margin-left: 10px !important;\n    }\n    </style>\n    <div class=\"wrapper\">\n        <div class=\"content\">\n            <slot name=\"input\"><input type=\"checkbox\"></slot>\n            <slot name=\"label\"><label>Checkbox Label</label></slot>\n        </div>\n    </div>\n";

var CheckboxField = /*#__PURE__*/function (_HTMLElement) {
  _inherits(CheckboxField, _HTMLElement);

  var _super = _createSuper(CheckboxField);

  function CheckboxField() {
    var _this;

    _classCallCheck(this, CheckboxField);

    _this = _super.call(this);

    _this.attachShadow({
      mode: "open"
    });

    _this.shadowRoot.appendChild(template.content.cloneNode(true));

    _this.input = _this.querySelector("input");
    _this.label = _this.shadowRoot.querySelector("label");
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CheckboxField, [{
    key: "handleChange",
    value: function handleChange(event) {
      console.log(event.target.checked);
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      if (this.input.isConnected) {
        this.input.addEventListener("change", this.handleChange);
      }
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this.input.removeEventListener("change", this.handleChange);
    }
  }]);

  return CheckboxField;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

window.customElements.define("checkbox-field", CheckboxField);

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/js/components/text-field.js
var text_field = __webpack_require__(2);

// EXTERNAL MODULE: ./src/js/components/checkbox-field.js
var checkbox_field = __webpack_require__(3);

// EXTERNAL MODULE: ./src/js/components/select-field.js
var select_field = __webpack_require__(4);

// EXTERNAL MODULE: ./src/assets/phone-icon.svg
var phone_icon = __webpack_require__(6);

// CONCATENATED MODULE: ./src/assets/fax-icon.svg
/* harmony default export */ var fax_icon = (__webpack_require__.p + "assets/fax-icon.svg");
// CONCATENATED MODULE: ./src/js/components/location-card.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var template = document.createElement("template");
template.innerHTML = "\n    <style>\n    ::slotted(a) {\n        text-decoration: none;\n    }\n    .wrapper {\n        width: 90%;\n        max-height: 220px;\n        padding: 1.5rem 2.0rem;\n        border: 1px solid #000;\n    }\n\n    .clinic-name {\n        font-size: 1.3rem;\n        font-weight: 700;\n    }\n    .branch-name {\n        font-size: 1rem;\n    }\n\n    .info {\n        width: 100%;\n        display: flex;\n        flex-direction: row;\n        justify-content: space-between;\n\n        margin: 10px 0;\n    }\n    .info__left {\n        display: flex;\n        flex-direction: column;\n    }\n    .phone img, .fax img {\n        margin-right: 5px;\n    }\n\n    .detail-link {\n        margin-right: 10px;\n        text-decoration: none;\n    }\n    \n    @media only screen and (max-width: 500px) {\n        .info {\n            flex-direction: column;\n        }\n    }\n    </style>\n    <div class=\"wrapper\">\n        <div class=\"header\">\n            <span class=\"clinic-name\">\n                <slot name=\"clinic-name\"></slot>\n            </span>\n            <span class=\"branch-name\">\n                <slot name=\"branch-name\"></slot>\n            </span>\n        </div>\n        <div class=\"info\">\n            <div class=\"info__left\">\n                <slot name=\"street1\"></slot>\n                <slot name=\"street2\"></slot>\n                <slot name=\"street3\"></slot>\n            </div>\n            <div class=\"info__right\">\n                <div class=\"status\">\n                    <slot name=\"is-open\"></slot>\n                </div>\n                <div class=\"phone\">\n                    <img src=\"".concat(phone_icon["a" /* default */], "\">\n                    <slot name=\"phone\"></slot>\n                </div>\n                <div class=\"fax\">\n                    <img src=\"").concat(fax_icon, "\">\n                    <slot name=\"fax\"></slot>\n                </div>\n            </div>\n        </div>\n        <div class=\"footer\">\n            <slot name=\"detail-link\"></slot>\n            <slot name=\"review-link\"></slot>\n            <div class=\"reviews\">\n\n            </div>\n        </div>\n    </div>\n");

var LocationCard = /*#__PURE__*/function (_HTMLElement) {
  _inherits(LocationCard, _HTMLElement);

  var _super = _createSuper(LocationCard);

  function LocationCard() {
    var _this;

    _classCallCheck(this, LocationCard);

    _this = _super.call(this);

    _this.attachShadow({
      mode: "open"
    });

    _this.shadowRoot.appendChild(template.content.cloneNode(true));

    _this.reviewPopup = _this.reviewPopup.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(LocationCard, [{
    key: "reviewPopup",
    value: function reviewPopup(event) {
      window.open("/locations/".concat(this.slug, "/review"), "_blank", "\n            location=yes,\n            height=800,\n            width=700, \n            top=".concat((screen.height - 800) / 4, "\n            left=").concat((screen.width - 700) / 2, "\n        "));
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      this.status = this.querySelector("[slot='is-open']");
      this.reviewLink = this.querySelector("[slot='review-link']");
      this.slug = this.reviewLink.getAttribute("data-slug");
      this.status.style.fontWeight = "700";
      this.status.style.textAlign = "right";

      if (this.status.textContent.toLowerCase().includes("open")) {
        this.status.style.color = "#44CF6C";
      } else if (this.status.textContent.toLowerCase().includes("closing")) {
        this.status.style.color = "#cece74";
      } else if (this.status.textContent.toLowerCase().includes("closed")) {
        this.status.style.color = "#C21C1C";
      }

      this.reviewLink.addEventListener("click", this.reviewPopup);
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this.reviewLink.removeEventListener("click", this.reviewPopup);
    }
  }]);

  return LocationCard;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

window.customElements.define("location-card", LocationCard);
// EXTERNAL MODULE: ./src/scss/explore.scss
var explore = __webpack_require__(17);

// EXTERNAL MODULE: ./src/scss/forms.scss
var scss_forms = __webpack_require__(8);

// EXTERNAL MODULE: ./src/js/utils.js
var utils = __webpack_require__(0);

// CONCATENATED MODULE: ./src/js/explore.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }









var getOpenStatus = function getOpenStatus(start, end) {
  var now = new Date();
  var mins = now.getMinutes();
  var hours = now.getHours();
  var startTokens = start.split(":");
  var startHour = startTokens[0];
  var startMins = startTokens[1];
  var endTokens = end.split(":");
  var endHour = endTokens[0];
  var endMins = endTokens[1];
  console.log(startTokens);
  console.log(endTokens);
  if (hours > endHour || hours < startHour || start == "23:59:00" && end == "23:59:00") return "Closed";else if (endHour - hours == 1) {
    if (endMins - mins > 0) return "Closing Soon";
  } else if (hours == endHour) {
    if (endMins - min > 0) return "Closing Soon";else return "Currently Closed";
  } else if (hours == startHour) {
    if (min > startMins) return "Currently Open";else return "Currently Closed";
  } else return "Currently Open";
};

var renderResults = function renderResults(root, results) {
  root.innerHTML = "";

  var _iterator = _createForOfIteratorHelper(results),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var res = _step.value;
      console.log(res);
      var markup = "\n            <location-card>\n                <span slot=\"clinic-name\">".concat(res.name, "</span>\n                ").concat(res.branch_name != "" && res.branch_name != null ? "<span slot=\"branch-name\"> - ".concat(res.branch_name, "</span>") : "", "\n                <span slot=\"street1\">").concat(res.street_line_1, "</span>\n                ").concat(res.street_line_2 != "" && res.street_line_2 != null ? "<span slot=\"street2\">".concat(res.street_line_2, "</span>") : "", "\n                <span slot=\"street3\">").concat(res.city, ", ").concat(res.state, " ").concat(res.zipcode, "</span>\n                <span slot=\"phone\">").concat(res.phone, "</span>\n                <span slot=\"fax\">").concat(res.fax, "</span>\n                <span slot=\"is-open\"></span>\n                <a href=\"/locations/").concat(res.slug, "\" slot=\"detail-link\" target=\"_blank\">\n                    <button type=\"button\" class=\"button button-primary--blue\">\n                        Clinic Details\n                    </button>\n                </a>\n                <a href=\"#\" slot=\"review-link\" data-slug=\"").concat(res.slug, "\">\n                    <button type=\"button\" class=\"button button-secondary--blue\">\n                        Submit a Review\n                    </button>\n                </a>\n            </location-card>\n        ");
      root.innerHTML += markup;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};

document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector("#search-form");
  var results = document.querySelector(".results");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var csrftoken = Object(utils["a" /* getCookie */])("csrftoken");
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "csrfmiddlewaretoken");
    input.setAttribute("value", csrftoken);
    event.target.appendChild(input);
    var address = document.getElementById("address");
    var radius = document.getElementById("radius");
    var params = address.value.length == 5 ? new URLSearchParams({
      zipcode: address.value,
      radius: radius.value
    }) : new URLSearchParams({
      address: address.value,
      radius: radius.value
    });
    var response = fetch("http://127.0.0.1:8000/api/search/?" + params).then(function (response) {
      return response.json();
    }).then(function (json) {
      renderResults(results, json);
    });
  });
});

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var template = document.createElement("template");
template.innerHTML = "\n    <style>\n    :host {\n        display: block;\n    }\n    ::slotted(label) {\n        font-weight: 700;\n        font-size: 14px;\n    }\n    ::slotted(select) {\n        padding: 0.4em 0.6em !important;\n        border-width: 1px;\n        border-radius: 0.3em;\n    }    \n    ::slotted(select[multiple]) {\n        padding: 0 !important;\n    }\n    ::slotted(select:focus) {\n        outline: none;\n        border: 1px solid #1B8FFA !important;\n    }\n    ::slotted(.required):after {\n        content: \" *\";\n        color: #ff0000;\n    }\n\n    .wrapper {\n        margin: 15px 0;\n    }\n\n    .content {\n        display: flex;\n        flex-direction: column;\n    }\n    .header {\n        display: flex;\n        justify-content: space-between;\n    }\n    .err-message {\n        display: none;\n        color: red;\n    }\n    .description, .err-message {\n        margin-top: 2px;\n        font-size: 0.8rem;\n    }\n    </style>\n    <div class=\"wrapper\">\n        <div class=\"content\">\n            <div class=\"header\">\n                <slot name=\"label\">\n                    <label>Field Label</label>\n                </slot>\n            </div>\n            <slot name=\"select\">\n                <select>\n                    <option value=\"\">None</option>\n                </select>\n            </slot>\n        </div>\n        <p class=\"description\">\n            <slot name=\"info\"></slot>\n        </p>\n        <p class=\"err-message\"></p>\n    </div>    \n";

var SelectField = /*#__PURE__*/function (_HTMLElement) {
  _inherits(SelectField, _HTMLElement);

  var _super = _createSuper(SelectField);

  function SelectField() {
    var _this;

    _classCallCheck(this, SelectField);

    _this = _super.call(this);

    _this.attachShadow({
      mode: "open"
    });

    _this.shadowRoot.appendChild(template.content.cloneNode(true));

    _this.select = _this.querySelector("select");
    _this.label = _this.querySelector("label");
    _this.description = _this.shadowRoot.querySelector(".description");
    _this.errorMessage = _this.shadowRoot.querySelector(".err-message");
    _this.isMultipleMode = _this.select.hasAttribute("multiple");
    _this.isRequired = _this.select.hasAttribute("required");

    if (_this.isRequired) {
      _this.label.setAttribute("class", "required");
    }

    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SelectField, [{
    key: "hideDescription",
    value: function hideDescription() {
      this.description.style.display = "none";
      this.errorMessage.style.display = "block";
    }
  }, {
    key: "hideError",
    value: function hideError() {
      this.description.style.display = "block";
      this.errorMessage.style.display = "none";
    }
  }, {
    key: "setErrorMessage",
    value: function setErrorMessage(message) {
      this.errorMessage.textContent = message;
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      var isNotBlank = true;

      if (this.isRequired) {
        if (event.target.value == "") {
          this.errorMessage.textContent = "Required";
          isNotBlank = false;
        }
      }

      if (isNotBlank) {
        this.hideError();
        this.select.setAttribute("data-status", "valid");
        this.select.style.borderColor = "#000";
      } else {
        this.hideDescription();
        this.select.setAttribute("data-status", "invalid");
        this.select.style.borderColor = "#FF0000";
      }
    }
  }, {
    key: "addOption",
    value: function addOption(text, value) {
      var option = document.createElement("option");
      option.setAttribute("value", value);
      option.textContent = text;
      this.select.appendChild(option);
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      if (this.select.isConnected) this.select.addEventListener("change", this.handleChange);
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this.select.removeEventListener("change", this.handleChange);
    }
  }]);

  return SelectField;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

window.customElements.define("select-field", SelectField);

/***/ }),

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.p + "assets/phone-icon.svg");

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });