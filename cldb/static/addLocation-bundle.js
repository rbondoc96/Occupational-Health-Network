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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */,
/* 2 */
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
/* 3 */
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
/* 4 */
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
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_text_field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _components_text_field__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_text_field__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_select_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _components_select_field__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_select_field__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_checkbox_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _components_checkbox_field__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_checkbox_field__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var _scss_add_location_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19);
/* harmony import */ var _scss_add_location_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_scss_add_location_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _scss_modals_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);
/* harmony import */ var _scss_modals_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_scss_modals_scss__WEBPACK_IMPORTED_MODULE_5__);
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }







var daysOfTheWeek = ["__offset__", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

var loadClinicTypes = function loadClinicTypes(json) {
  var clinicTypeSelect = document.querySelector("[name='clinic-type']");

  var _iterator = _createForOfIteratorHelper(json),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var obj = _step.value;
      var markup = "<option value='".concat(obj.id, "'>").concat(obj.name, "</option>");
      clinicTypeSelect.innerHTML += markup;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};

var loadServices = function loadServices(json) {
  var serviceSelect = document.querySelector("[name='services']");
  var simpleServiceSelect = document.querySelector("[name='simple-services']");
  var names = new Set();

  var _iterator2 = _createForOfIteratorHelper(json),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var obj = _step2.value;
      var markup = "<option value='".concat(obj.id, "'>").concat(obj.service_category.name, " - ").concat(obj.name, "</option>");
      serviceSelect.innerHTML += markup;
      var simple_name = obj.simple_name;

      if (!names.has(simple_name) && simple_name != null) {
        names.add(simple_name);
        var simpleMarkup = "<option value='".concat(obj.id, "'>").concat(obj.simple_name, "</option>");
        simpleServiceSelect.innerHTML += simpleMarkup;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
};

var loadAuthMethods = function loadAuthMethods(json) {
  var wrapper = document.getElementById("auth-methods__wrapper");

  var _iterator3 = _createForOfIteratorHelper(json),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var obj = _step3.value;
      var markup = "\n            <checkbox-field>\n                <label slot=\"label\" for='auth-method-".concat(obj.name, "'>").concat(obj.name, "</label>\n                <input\n                slot=\"input\" \n                type='checkbox' \n                value='").concat(obj.id, "' \n                name='auth-method' \n                id='auth-method-").concat(obj.name, "'>\n            </checkbox-field>\n        ");
      wrapper.innerHTML += markup;
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
};

var loadCocsAccepted = function loadCocsAccepted(json) {
  var wrapper = document.getElementById("coc-forms__wrapper");

  var _iterator4 = _createForOfIteratorHelper(json),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var obj = _step4.value;
      var markup = "\n            <checkbox-field>\n                <label slot=\"label\" for='coc-accepted-".concat(obj.name, "'>").concat(obj.name, "</label>\n                <input \n                slot=\"input\"\n                type='checkbox' \n                value='").concat(obj.id, "' \n                name='coc-method' \n                id='coc-accepted-").concat(obj.name, "'>\n            </checkbox-field>\n        ");
      wrapper.innerHTML += markup;
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
};

var twelveHourTimeToMinutes = function twelveHourTimeToMinutes(time) {
  if (time === "12:00 AM" || time === "") return 0;else {
    var tokens = time.split(" ");
    var hrMin = tokens[0].split(":");
    var hours = parseInt(hrMin[0]);
    var mins = parseInt(hrMin[1]);
    var meridiem = tokens[1];

    if (meridiem === "PM" && hours != 12) {
      hours += 12;
    } else if (meridiem === "AM" && hours == 12) {
      hours -= 12;
    }

    console.log(60 * hours + mins);
    return 60 * hours + mins;
  }
};

var isValidTimeRange = function isValidTimeRange(time1, time2) {
  if (time1 === "12:00 AM" && time2 === "12:00 AM") return true;else if (time1 === "11:59 PM" && time2 === "11:59 PM") return true;else {
    var mins1 = twelveHourTimeToMinutes(time1);
    var mins2 = twelveHourTimeToMinutes(time2);
    return mins1 < mins2;
  }
};

var validateServiceHoursForm = function validateServiceHoursForm(form) {
  var service = form.querySelector("[name='simple-services']");
  var startTime = form.querySelector("[name='service-start-time']");
  var endTime = form.querySelector("[name='service-end-time']");
  var isServiceUnique = true;
  var message;

  if (startTime.value == "") {
    startTime.classList.add("invalid--blank");
    message = "Please specify a start time!";
  } else {
    startTime.classList.remove("invalid--blank");

    if (endTime.value == "") {
      endTime.classList.add("invalid--blank");
      message = "Please specify an end time!";
    } else {
      endTime.classList.remove("invalid--blank");

      if (!isValidTimeRange(startTime.value, endTime.value)) {
        message = "Please enter a valid time range!";
        startTime.classList.add("invalid--blank");
        endTime.classList.add("invalid--blank");
      } else {
        startTime.classList.remove("invalid--blank");
        endTime.classList.remove("invalid--blank");
        var entries = document.querySelectorAll("[name='service-hours-input']");

        if (entries.length > 0) {
          var services = new Set();

          var _iterator5 = _createForOfIteratorHelper(entries),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var item = _step5.value;
              services.add(item.getAttribute("data-service"));
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }

          isServiceUnique = !services.has(service.value);
          if (!isServiceUnique) message = "An entry for that service already exists!";
        }
      }
    }
  }

  var blanks = form.querySelectorAll(".invalid--blank");
  return {
    result: blanks.length <= 0 && isServiceUnique,
    message: message
  };
};

var validateBusinessHoursForm = function validateBusinessHoursForm(form) {
  var message;
  var day = form.querySelector("[name='business-day']");
  var startTime = form.querySelector("[name='business-start-time']");
  var endTime = form.querySelector("[name='business-end-time']");
  var isDayUnique = true;

  if (startTime.value == "") {
    startTime.classList.add("invalid--blank");
    message = "Please specify a start time.";
  } else {
    startTime.classList.remove("invalid--blank");
  }

  if (endTime.value == "") {
    endTime.classList.add("invalid--blank");
    message = "Please specify an end time";
  } else {
    endTime.classList.remove("invalid--blank");

    if (!isValidTimeRange(startTime.value, endTime.value)) {
      message = "Please enter a valid time range!";
      startTime.classList.add("invalid--blank");
      endTime.classList.add("invalid--blank");
    } else {
      startTime.classList.remove("invalid--blank");
      endTime.classList.remove("invalid--blank");
      var entries = document.querySelectorAll("[name='business-hours-input']");

      if (entries.length > 0) {
        var days = new Set();

        var _iterator6 = _createForOfIteratorHelper(entries),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var item = _step6.value;
            days.add(item.getAttribute("data-day"));
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }

        isDayUnique = !days.has(day.value);
        if (!isDayUnique) message = "An entry for ".concat(daysOfTheWeek[day.value], " already exists!");
      }
    }
  }

  var blanks = form.querySelectorAll(".invalid--blank");
  return {
    result: blanks.length <= 0 && isDayUnique,
    message: message
  };
};

var validateContactsForm = function validateContactsForm(form) {
  var name = form.querySelector("[name='contact-name']");
  var isContactUnique = true;
  var message;

  if (name.value == "") {
    name.classList.add("invalid--blank");
    message = "Please enter a name.";
  } else {
    name.classList.remove("invalid--blank");
    var entries = document.querySelectorAll("[name='contacts-input']");

    if (entries.length > 0) {
      var names = new Set();

      var _iterator7 = _createForOfIteratorHelper(entries),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var item = _step7.value;
          names.add(item.getAttribute("data-name"));
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      isContactUnique = !names.has(name.value);
      if (!isContactUnique) message = "An entry for ".concat(name.value, " already exists!");
    }
  }

  var blanks = form.querySelectorAll(".invalid--blank");
  return {
    result: blanks.length <= 0 && isContactUnique,
    message: message
  };
};

var renderServiceHoursList = function renderServiceHoursList(form) {
  var hiddenList = form.querySelector(".hidden-list");
  var list = hiddenList.querySelector("ul");
  var serviceSelect = form.querySelector("[name='simple-services']");
  var startTime = form.querySelector("[name='service-start-time']");
  var endTime = form.querySelector("[name='service-end-time']");
  var daysSelect = form.querySelector("[name='service-days-offered']");
  var dayIDs = [];
  var days = [];

  var _iterator8 = _createForOfIteratorHelper(daysSelect.options),
      _step8;

  try {
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      var opt = _step8.value;

      if (opt.selected) {
        dayIDs.push(opt.value);
        days.push(opt.textContent);
      }
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }

  var service = serviceSelect.options[0];

  var _iterator9 = _createForOfIteratorHelper(serviceSelect.options),
      _step9;

  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var _opt = _step9.value;

      if (_opt.selected) {
        service = _opt;
      }
    }
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }

  var serviceName = serviceSelect.querySelector("option[value='".concat(serviceSelect.value, "']"));
  var markup;
  if (days.length > 0)
    /* Dictionary is unformatted to avoid \r and \n characters */
    markup = "\n            <li class='sublist-entry col-md-12'>\n                <input\n                type=\"hidden\"\n                data-service=\"".concat(serviceSelect.value, "\"\n                name=\"service-hours-input\"\n                value='{\"name\": \"").concat(serviceName.textContent, "\",\"start_time\": \"").concat(startTime.value, "\",\"end_time\": \"").concat(endTime.value, "\",\"days\": [").concat(dayIDs.join(", "), "]}'\n                >\n                <div class='sublist-entry-line1'>\n                    <span>").concat(service.textContent, ": </span>\n                    <span>").concat(startTime.value, " - ").concat(endTime.value, "</span>\n                </div>\n                <div class='sublist-entry-line2'>\n                    <span>- Days Offered: </span>\n                    <span>").concat(days.join(", "), "</span>\n                </div>\n            </li>\n        ");else markup = "\n        <li class='sublist-entry'>\n            <input\n            type=\"hidden\"\n            data-service=\"".concat(serviceSelect.value, "\"\n            name=\"service-hours-input\"\n            value='{\"name\": \"").concat(serviceSelect.value, "\",\"start_time\": \"").concat(startTime.value, "\",\"end_time\": \"").concat(endTime.value, "\"}'\n            >\n            <div class='sublist-entry-line1'>\n                <span>").concat(service.textContent, ": </span>\n                <span>").concat(startTime.value, " to ").concat(endTime.value, "</span>\n            </div>\n        </li>\n        ");
  list.innerHTML += markup;
  var entries = list.querySelectorAll("[name='service-hours-input']");

  var _iterator10 = _createForOfIteratorHelper(entries),
      _step10;

  try {
    for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
      var entry = _step10.value;

      entry.parentNode.ondblclick = function () {
        var ul = this.parentNode;
        ul.removeChild(this);
        if (ul.querySelectorAll("li").length == 0) ul.parentNode.parentNode.parentNode.style.display = "none";
      };
    }
  } catch (err) {
    _iterator10.e(err);
  } finally {
    _iterator10.f();
  }

  if (list.querySelectorAll("li").length > 0) {
    hiddenList.style.display = "block";
  } else {
    hiddenList.style.display = "none";
  }
};

var renderBusinessHoursList = function renderBusinessHoursList(form) {
  var hiddenList = form.querySelector(".hidden-list");
  var list = hiddenList.querySelector("ul");
  var daySelect = form.querySelector("[name='business-day']");
  var startTime = form.querySelector("[name='business-start-time']");
  var endTime = form.querySelector("[name='business-end-time']");
  var day;

  var _iterator11 = _createForOfIteratorHelper(daySelect.options),
      _step11;

  try {
    for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
      var opt = _step11.value;

      if (opt.selected) {
        day = {
          id: opt.value,
          name: opt.textContent
        };
        break;
      }
    }
  } catch (err) {
    _iterator11.e(err);
  } finally {
    _iterator11.f();
  }

  var markup = "\n            <li class='sublist-entry'>\n                <input\n                type=\"hidden\"\n                data-day=\"".concat(daySelect.value, "\"\n                name=\"business-hours-input\"\n                value='{\"day\": \"").concat(daySelect.value, "\",\"start_time\": \"").concat(startTime.value, "\", \"end_time\": \"").concat(endTime.value, "\"}'\n                >\n                <div class='sublist-entry-line1'>\n                    <span>").concat(day.name, ": </span>\n                    <span>").concat(Object(_utils__WEBPACK_IMPORTED_MODULE_3__[/* timeRangeToString */ "c"])(startTime.value, endTime.value), "</span>\n                </div>\n            </li>\n        ");
  list.innerHTML += markup;
  var entries = list.querySelectorAll("[name='business-hours-input']");

  var _iterator12 = _createForOfIteratorHelper(entries),
      _step12;

  try {
    for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
      var entry = _step12.value;

      entry.parentNode.ondblclick = function () {
        var ul = this.parentNode;
        ul.removeChild(this);
        if (ul.querySelectorAll("li").length == 0) ul.parentNode.parentNode.parentNode.style.display = "none";
      };
    }
  } catch (err) {
    _iterator12.e(err);
  } finally {
    _iterator12.f();
  }

  if (list.querySelectorAll("li").length > 0) {
    hiddenList.style.display = "block";
  } else {
    hiddenList.style.display = "none";
  }
};

var renderContactsList = function renderContactsList(form) {
  var hiddenList = form.querySelector(".hidden-list");
  var list = hiddenList.querySelector("ul");
  var name = form.querySelector("[name='contact-name']");
  var title = form.querySelector("[name='contact-title']");
  var email = form.querySelector("[name='contact-email']");
  var phone = form.querySelector("[name='contact-phone']");
  var markup;

  if (email.value != "" && phone.value != "") {
    markup = "\n        <li class='sublist-entry'>\n            <input\n            type=\"hidden\"\n            data-name=\"".concat(name.value, "\"\n            name=\"contacts-input\"\n            value='{\"name\": \"").concat(name.value, "\", \"title\": \"").concat(title.value, "\", \"email\": \"").concat(email.value, "\", \"phone\": \"").concat(phone.value, "\"}'\n            >\n            <div class='sublist-entry-line1'>\n                <span>").concat(name.value).concat(title.value != "" ? " - ".concat(title.value) : '', " </span>\n            </div>\n            <div class='sublist-entry-line2'>\n                <span>Email: </span>\n                <span>").concat(email.value, "</span>\n            </div>\n            <div class='sublist-entry-line3'>\n                <span>Phone: </span>\n                <span>").concat(phone.value, "</span>\n            </div>\n        </li>\n    ");
  } else if (email.value != "" && phone.value == "") {
    markup = "\n        <li class='sublist-entry'>\n            <input\n            type=\"hidden\"\n            data-name=\"".concat(name.value, "\"\n            name=\"contacts-input\"\n            value='{\"name\": \"").concat(name.value, "\", \"title\": \"").concat(title.value, "\", \"email\": \"").concat(email.value, "\"}'\n            >\n            <div class='sublist-entry-line1'>\n                <span>").concat(name.value).concat(title.value != "" ? "- ".concat(title.value) : '', " </span>\n            </div>\n            <div class='sublist-entry-line2'>\n                <span>Email: </span>\n                <span>").concat(email.value, "</span>\n            </div>\n        </li>\n    ");
  } else if (email.value == "" && phone.value != "") {
    markup = "\n        <li class='sublist-entry'>\n            <input\n            type=\"hidden\"\n            data-name=\"".concat(name.value, "\"\n            name=\"contacts-input\"\n            value='{\"name\": \"").concat(name.value, "\", \"title\": \"").concat(title.value, "\", \"phone\": \"").concat(phone.value, "\"}'\n            >\n            <div class='sublist-entry-line1'>\n                <span>").concat(name.value).concat(title.value != "" ? "- ".concat(title.value) : '', " </span>\n            </div>\n            <div class='sublist-entry-line2'>\n                <span>Phone: </span>\n                <span>").concat(phone.value, "</span>\n            </div>\n        </li>\n    ");
  } else {
    markup = "\n        <li class='sublist-entry'>\n            <input\n            type=\"hidden\"\n            data-name=\"".concat(name.value, "\"\n            name=\"contacts-input\"\n            value='{\"name\": \"").concat(name.value, "\", \"title\": \"").concat(title.value, "\"}'\n            >\n            <div class='sublist-entry-line1'>\n                <span>").concat(name.value).concat(title.value != "" ? "- ".concat(title.value) : '', " </span>\n            </div>\n        </li>\n    ");
  }

  list.innerHTML += markup;
  var entries = list.querySelectorAll("[name='contacts-input']");

  var _iterator13 = _createForOfIteratorHelper(entries),
      _step13;

  try {
    for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
      var entry = _step13.value;

      entry.parentNode.ondblclick = function () {
        var ul = this.parentNode;
        ul.removeChild(this);
        if (ul.querySelectorAll("li").length == 0) ul.parentNode.parentNode.parentNode.style.display = "none";
      };
    }
  } catch (err) {
    _iterator13.e(err);
  } finally {
    _iterator13.f();
  }

  if (list.querySelectorAll("li").length > 0) {
    hiddenList.style.display = "block";
  } else {
    hiddenList.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", function () {
  Object(_utils__WEBPACK_IMPORTED_MODULE_3__[/* lookup */ "b"])("location_categories", loadClinicTypes, {
    method: "GET"
  });
  Object(_utils__WEBPACK_IMPORTED_MODULE_3__[/* lookup */ "b"])("services", loadServices, {
    method: "GET"
  });
  Object(_utils__WEBPACK_IMPORTED_MODULE_3__[/* lookup */ "b"])("auth_methods", loadAuthMethods, {
    method: "GET"
  });
  Object(_utils__WEBPACK_IMPORTED_MODULE_3__[/* lookup */ "b"])("ccf_categories", loadCocsAccepted, {
    method: "GET"
  });
  var form = document.getElementById("location-form");
  var formSubmit = document.getElementById("submit-button");
  var serviceHoursToggle = document.getElementById("service-hours-toggle");
  var businessHoursToggle = document.getElementById("business-hours-toggle");
  var contactsToggle = document.getElementById("contacts-toggle");
  var businessStartTime = document.querySelector("[name='business-start-time']");
  var businessEndTime = document.querySelector("[name='business-end-time']");
  var isClosedToggle = document.getElementById("is-closed");
  var is24HoursToggle = document.getElementById("is-24hours");
  var serviceHoursButton = document.getElementById("service-hours-submit");
  var businessHoursButton = document.getElementById("business-hours-submit");
  var contactsButton = document.getElementById("contacts-submit");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var pseudoInputs = event.target.getElementsByClassName("no-send");

    var _iterator14 = _createForOfIteratorHelper(pseudoInputs),
        _step14;

    try {
      for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
        var _input = _step14.value;
        _input.disabled = true;
      }
    } catch (err) {
      _iterator14.e(err);
    } finally {
      _iterator14.f();
    }

    var csrftoken = Object(_utils__WEBPACK_IMPORTED_MODULE_3__[/* getCookie */ "a"])("csrftoken");
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "csrfmiddlewaretoken");
    input.setAttribute("value", csrftoken);
    event.target.appendChild(input);
    event.target.submit();
  });
  serviceHoursButton.addEventListener("click", function (event) {
    var form = document.getElementById("service-hours-form");
    var selectField = form.querySelector("select-field");
    var response = validateServiceHoursForm(form);

    if (response.result == true) {
      selectField.hideError();
      renderServiceHoursList(form);
    } else {
      selectField.setErrorMessage(response.message);
      selectField.hideDescription();
    }
  });
  businessHoursButton.addEventListener("click", function (event) {
    var form = document.getElementById("business-hours-form");
    var selectField = form.querySelector("select-field");
    var response = validateBusinessHoursForm(form);

    if (response.result == true) {
      selectField.hideError();
      renderBusinessHoursList(form);
    } else {
      selectField.setErrorMessage(response.message);
      selectField.hideDescription();
    }
  });
  contactsButton.addEventListener("click", function (event) {
    var form = document.getElementById("contacts-form");
    var selectField = form.querySelector("text-field");
    var response = validateContactsForm(form);

    if (response.result == true) {
      selectField.hideError();
      renderContactsList(form);
    } else {
      selectField.setErrorMessage(response.message);
      selectField.hideDescription();
    }
  });
  isClosedToggle.addEventListener("change", function (event) {
    if (event.target.checked) {
      is24HoursToggle.disabled = true;
      businessStartTime.disabled = true;
      businessEndTime.disabled = true;
      businessStartTime.value = "11:59 PM";
      businessEndTime.value = "11:59 PM";
    } else {
      is24HoursToggle.disabled = false;
      businessStartTime.disabled = false;
      businessEndTime.disabled = false;
      businessStartTime.value = "";
      businessEndTime.value = "";
    }
  });
  is24HoursToggle.addEventListener("change", function (event) {
    if (event.target.checked) {
      isClosedToggle.disabled = true;
      businessStartTime.disabled = true;
      businessEndTime.disabled = true;
      businessStartTime.value = "12:00 AM";
      businessEndTime.value = "12:00 AM";
    } else {
      isClosedToggle.disabled = false;
      businessStartTime.disabled = false;
      businessEndTime.disabled = false;
      businessStartTime.value = "";
      businessEndTime.value = "";
    }
  });
  serviceHoursToggle.addEventListener("click", function (event) {
    var form = document.querySelector("#service-hours-form .subform-content");

    if (form.style.display == "none" || form.style.display == "") {
      form.style.display = "block";
      event.target.textContent = "Hide Form";
    } else {
      form.style.display = "none";
      event.target.textContent = "Add a Service";
    }
  });
  businessHoursToggle.addEventListener("click", function (event) {
    var form = document.querySelector("#business-hours-form .subform-content");

    if (form.style.display == "none" || form.style.display == "") {
      form.style.display = "block";
      event.target.textContent = "Hide Form";
    } else {
      form.style.display = "none";
      event.target.textContent = "Add a Day";
    }
  });
  contactsToggle.addEventListener("click", function (event) {
    var form = document.querySelector("#contacts-form .subform-content");

    if (form.style.display == "none" || form.style.display == "") {
      form.style.display = "block";
      event.target.textContent = "Hide Form";
    } else {
      form.style.display = "none";
      event.target.textContent = "Add a Contact";
    }
  });
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ]);