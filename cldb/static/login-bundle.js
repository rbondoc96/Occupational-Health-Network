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
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
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

/***/ 25:
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
/* harmony import */ var _scss_login_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(26);
/* harmony import */ var _scss_login_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_scss_login_scss__WEBPACK_IMPORTED_MODULE_4__);
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }







var validatePassword = function validatePassword(password) {
  var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
  return regex.test(password);
};

var validateRegisterForm = function validateRegisterForm(form) {
  var requiredFields = form.querySelectorAll(".required + input");
  var isFormValid = true;

  var _iterator = _createForOfIteratorHelper(requiredFields),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var input = _step.value;
      var error = input.nextElementSibling;

      if (input.value == "") {
        isFormValid = false;
        input.classList.add("invalid--blank");
        error.style.display = "block";
      } else if (input.classList.contains("invalid--blank")) {
        isFormValid = true;
        input.classList.remove("invalid--blank");
        error.style.display = "none";
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var password = form.querySelector("[name='reg-password']");
  var container = password.parentNode;
  var confirmPassword = form.querySelector("[name='reg-confirm-password']");
  var confirmContainer = confirmPassword.parentNode;

  if (!validatePassword(password.value)) {
    isFormValid = false;
    container.setErrorMessage("Invalid password format. Must contain at least 1 special character, 1 uppercase character, 1 lowercase character, 1 digit, and at least 8 characters.");
    container.hideDescription();
  } else {
    isFormValid = true;
    container.hideError();

    if (password.value !== confirmPassword.value) {
      isFormValid = false;
      confirmContainer.setErrorMessage("The passwords must match.");
      confirmContainer.hideDescription();
    } else {
      isFormValid = true;
      confirmContainer.hideError();
    }
  }

  return isFormValid;
};

document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.getElementById("login-form");
  var regForm = document.getElementById("register-form");
  var regUser = document.getElementById("reg-username");
  var loginPWToggle = document.getElementById("login-password-toggle");
  var regPWToggle = document.getElementById("reg-password-toggle");
  var disclaimerLink = document.getElementById("disclaimer-link");
  var timeout = null;
  var apiUrl = "http://127.0.0.1:8000/api/user_types/";
  fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    var userTypeSelect = document.getElementById("user-type");

    var _iterator2 = _createForOfIteratorHelper(json),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var obj = _step2.value;
        var markup = "<option value=\"".concat(obj.id, "\">").concat(obj.name, "</option>");
        userTypeSelect.innerHTML += markup;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  });
  regUser.addEventListener("keyup", function (event) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      var message = fetch("/api/exists/?username=".concat(event.target.value)).then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
        var doesUserExist = Boolean(json["message"]);
        var wrapper = event.target.parentNode;

        if (doesUserExist) {
          wrapper.setErrorMessage("User already exists!");
          wrapper.hideDescription();
        } else {
          wrapper.hideError();
        }
      });
    }, 500);
  });
  loginPWToggle.addEventListener("click", function (event) {
    var password = document.getElementById("login-password");

    if (event.target.checked) {
      password.setAttribute("type", "text");
    } else {
      password.setAttribute("type", "password");
    }
  });
  regPWToggle.addEventListener("click", function (event) {
    var password = document.getElementById("reg-password");
    var confirmPassword = document.getElementById("reg-confirm-password");

    if (event.target.checked) {
      password.setAttribute("type", "text");
      confirmPassword.setAttribute("type", "text");
    } else {
      password.setAttribute("type", "password");
      confirmPassword.setAttribute("type", "password");
    }
  });
  loginForm.addEventListener("submit", function (event) {
    var csrftoken = Object(_utils__WEBPACK_IMPORTED_MODULE_3__[/* getCookie */ "a"])("csrftoken");
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "csrfmiddlewaretoken");
    input.setAttribute("value", csrftoken);
    event.target.appendChild(input);
    event.target.submit();
  });
  regForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var regDisclaimer = event.target.querySelector("#disclaimer-ack");

    if (!regDisclaimer.checked) {
      alert("Please acknowledge that you've read the disclaimer");
    } else if (validateRegisterForm(event.target) == true) {
      var csrftoken = Object(_utils__WEBPACK_IMPORTED_MODULE_3__[/* getCookie */ "a"])("csrftoken");
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", "csrfmiddlewaretoken");
      input.setAttribute("value", csrftoken);
      event.target.appendChild(input);
      event.target.submit();
    }
  });
  disclaimerLink.addEventListener("click", function (event) {
    window.open("/popups/disclaimer", "_blank", "\n            location=yes,\n            height=800,\n            width=700, \n            top=".concat((screen.height - 800) / 4, "\n            left=").concat((screen.width - 700) / 2, "\n        "));
  });
});

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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

/***/ })

/******/ });