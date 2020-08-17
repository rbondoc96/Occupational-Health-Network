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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_add_location_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _scss_add_location_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_add_location_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scss_modals_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _scss_modals_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scss_modals_scss__WEBPACK_IMPORTED_MODULE_1__);
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var lookup = function lookup(endpoint, callback, options) {
  var apiUrl = "http://127.0.0.1:8000/api/" + endpoint + "/";
  fetch(apiUrl, options).then(function (response) {
    return response.json();
  }).then(function (json) {
    return callback(json);
  });
};

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

  clinicTypeSelect.querySelector("option:last-child").setAttribute("selected", true);
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
      var markup = "\n            <div class='checkbox-field'>\n                <input type='checkbox' value='".concat(obj.id, "' name='").concat(obj.name, "' id='auth-method-").concat(obj.name, "'>\n                <label for='auth-method-").concat(obj.name, "'>").concat(obj.name, "</label>\n            </div>\n        ");
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
      var markup = "\n            <div class='checkbox-field'>\n                <input type='checkbox' value='".concat(obj.id, "' name='").concat(obj.name, "' id='coc-accepted-").concat(obj.name, "'>\n                <label for='coc-accepted-").concat(obj.name, "'>").concat(obj.name, "</label>\n            </div>\n        ");
      wrapper.innerHTML += markup;
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
};

var initInputMasks = function initInputMasks() {
  Inputmask({
    "mask": "99999"
  }).mask(document.querySelector("[name='zipcode']"));
  Inputmask({
    "mask": "(999) 999-9999[ ext. 99[9[9[9[9]]]]]"
  }).mask(document.querySelector("[name='phone']"));
  Inputmask({
    "mask": "(999) 999-9999"
  }).mask(document.querySelector("[name='fax']"));
  Inputmask({
    "mask": "(999) 999-9999"
  }).mask(document.querySelector("[name='contact-phone']"));
  var times = document.querySelectorAll(".time");

  var _iterator5 = _createForOfIteratorHelper(times),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var elem = _step5.value;
      Inputmask({
        alias: "datetime",
        placeholder: "__:__ AM",
        inputFormat: "hh:MM TT",
        hourFormat: 12
      }).mask(elem);
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
};

var validateServiceHoursForm = function validateServiceHoursForm(form) {
  var service = form.querySelector("[name='simple-services']");
  var startTime = form.querySelector("[name='service-start-time']");
  var endTime = form.querySelector("[name='service-end-time']");

  if (startTime.value == "") {
    startTime.classList.add("invalid--blank");
  } else {
    startTime.classList.remove("invalid--blank");
  }

  if (endTime.value == "") {
    endTime.classList.add("invalid--blank");
  } else {
    endTime.classList.remove("invalid--blank");
  }

  var blanks = form.querySelectorAll(".invalid--blank");
  return blanks.length <= 0;
};

var validateBusinessHoursForm = function validateBusinessHoursForm(form) {
  var startTime = form.querySelector("[name='business-start-time']");
  var endTime = form.querySelector("[name='business-end-time']");

  if (startTime.value == "") {
    startTime.classList.add("invalid--blank");
  } else {
    startTime.classList.remove("invalid--blank");
  }

  if (endTime.value == "") {
    endTime.classList.add("invalid--blank");
  } else {
    endTime.classList.remove("invalid--blank");
  }

  var blanks = form.querySelectorAll(".invalid--blank");
  return blanks.length <= 0;
};

var validateContactsForm = function validateContactsForm(form) {
  var name = form.querySelector("[name='contact-name']");

  if (name.value == "") {
    name.classList.add("invalid--blank");
  } else {
    name.classList.remove("invalid--blank");
  }

  var blanks = form.querySelectorAll(".invalid--blank");
  return blanks.length <= 0;
};

var renderServiceHoursList = function renderServiceHoursList(form) {
  var wrapper = form.nextElementSibling;
  var list = wrapper.querySelector("ul");
  var serviceSelect = form.querySelector("[name='simple-services']");
  var startTime = form.querySelector("[name='service-start-time']");
  var endTime = form.querySelector("[name='service-end-time']");
  var daysSelect = form.querySelector("[name='service-days-offered']");
  var dayIDs = [];
  var days = [];

  var _iterator6 = _createForOfIteratorHelper(daysSelect.options),
      _step6;

  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var opt = _step6.value;

      if (opt.selected) {
        dayIDs.push(opt.value);
        days.push(opt.textContent);
      }
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }

  var service = serviceSelect.options[0];

  var _iterator7 = _createForOfIteratorHelper(serviceSelect.options),
      _step7;

  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var _opt = _step7.value;

      if (_opt.selected) {
        service = _opt;
      }
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }

  var markup;
  if (days.length > 0)
    /* Dictionary is unformatted to avoid \r and \n characters */
    markup = "\n            <li class='sublist-entry'>\n                <input\n                type=\"hidden\"\n                name=\"service-hours-input\"\n                value='{\"service\": \"".concat(serviceSelect.value, "\",\"start_time\": \"").concat(startTime.value, "\",\"end_time\": \"").concat(endTime.value, "\",\"days\": [").concat(dayIDs.join(", "), "]}'\n                >\n                <div class='sublist-entry-line1'>\n                    <span>").concat(service.textContent, ": </span>\n                    <span>").concat(startTime.value, " - ").concat(endTime.value, "</span>\n                </div>\n                <div class='sublist-entry-line2'>\n                    <span>- Days Offered: </span>\n                    <span>").concat(days.join(", "), "</span>\n                </div>\n            </li>\n        ");else markup = "\n        <li class='sublist-entry'>\n            <input\n            type=\"hidden\"\n            name=\"service-hours-input\"\n            value='{\"service\": \"".concat(serviceSelect.value, "\",\"start_time\": \"").concat(startTime.value, "\",\"end_time\": \"").concat(endTime.value, "\"}'\n            >\n            <div class='sublist-entry-line1'>\n                <span>").concat(service.textContent, ": </span>\n                <span>").concat(startTime.value, " to ").concat(endTime.value, "</span>\n            </div>\n        </li>\n        ");
  list.innerHTML += markup;

  if (list.querySelectorAll("li").length > 0) {
    wrapper.style.display = "block";
  } else {
    wrapper.style.display = "none";
  }
};

var renderBusinessHoursList = function renderBusinessHoursList(form) {
  var wrapper = form.nextElementSibling;
  var list = wrapper.querySelector("ul");
  var daySelect = form.querySelector("[name='business-day']");
  var startTime = form.querySelector("[name='business-start-time']");
  var endTime = form.querySelector("[name='business-end-time']");
  var day;

  var _iterator8 = _createForOfIteratorHelper(daySelect.options),
      _step8;

  try {
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      var opt = _step8.value;

      if (opt.selected) {
        day = {
          id: opt.value,
          name: opt.textContent
        };
        break;
      }
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }

  var markup = "\n            <li class='sublist-entry'>\n                <input\n                type=\"hidden\"\n                name=\"business-hours-input\"\n                value='{\"day\": \"".concat(daySelect.value, "\",\"start_time\": \"").concat(startTime.value, "\", \"end_time\": \"").concat(endTime.value, "\"}'\n                >\n                <div class='sublist-entry-line1'>\n                    <span>").concat(day.name, ": </span>\n                    <span>").concat(startTime.value, " - ").concat(endTime.value, "</span>\n                </div>\n            </li>\n        ");
  list.innerHTML += markup;

  if (list.querySelectorAll("li").length > 0) {
    wrapper.style.display = "block";
  } else {
    wrapper.style.display = "none";
  }
};

var renderContactsList = function renderContactsList(form) {
  var wrapper = form.nextElementSibling;
  var list = wrapper.querySelector("ul");
  var name = form.querySelector("[name='contact-name']");
  var title = form.querySelector("[name='contact-title']");
  var email = form.querySelector("[name='contact-email']");
  var phone = form.querySelector("[name='contact-phone']");
  var markup;

  if (email.value != "" && phone.value != "") {
    markup = "\n        <li class='sublist-entry'>\n            <input\n            type=\"hidden\"\n            name=\"contacts-input\"\n            value='{\"name\": \"".concat(name.value, "\", \"title\": \"").concat(title.value, "\", \"email\": \"").concat(email.value, "\", \"phone\": \"").concat(phone.value, "\"}'\n            >\n            <div class='sublist-entry-line1'>\n                <span>").concat(name.value).concat(title.value != "" ? "- ".concat(title.value) : '', " </span>\n            </div>\n            <div class='sublist-entry-line2'>\n                <span>Email: </span>\n                <span>").concat(email.value, "</span>\n            </div>\n            <div class='sublist-entry-line3'>\n                <span>Phone: </span>\n                <span>").concat(phone.value, "</span>\n            </div>\n        </li>\n    ");
  } else if (email.value != "" && phone.value == "") {
    markup = "\n        <li class='sublist-entry'>\n            <input\n            type=\"hidden\"\n            name=\"contacts-input\"\n            value='{\"name\": \"".concat(name.value, "\", \"title\": \"").concat(title.value, "\", \"email\": \"").concat(email.value, "\"}'\n            >\n            >\n            <div class='sublist-entry-line1'>\n                <span>").concat(name.value).concat(title.value != "" ? "- ".concat(title.value) : '', " </span>\n            </div>\n            <div class='sublist-entry-line2'>\n                <span>Email: </span>\n                <span>").concat(email.value, "</span>\n            </div>\n        </li>\n    ");
  } else if (email.value == "" && phone.value != "") {
    markup = "\n        <li class='sublist-entry'>\n            <input\n            type=\"hidden\"\n            name=\"contacts-input\"\n            value='{\"name\": \"".concat(name.value, "\", \"title\": \"").concat(title.value, "\", \"phone\": \"").concat(phone.value, "\"}'\n            >\n            >\n            <div class='sublist-entry-line1'>\n                <span>").concat(name.value).concat(title.value != "" ? "- ".concat(title.value) : '', " </span>\n            </div>\n            <div class='sublist-entry-line2'>\n                <span>Phone: </span>\n                <span>").concat(phone.value, "</span>\n            </div>\n        </li>\n    ");
  } else {
    markup = "\n        <li class='sublist-entry'>\n            <input\n            type=\"hidden\"\n            name=\"contacts-input\"\n            value='{\"name\": \"".concat(name.value, "\", \"title\": \"").concat(title.value, "\"}'\n            >\n            >\n            <div class='sublist-entry-line1'>\n                <span>").concat(name.value).concat(title.value != "" ? "- ".concat(title.value) : '', " </span>\n            </div>\n        </li>\n    ");
  }

  markup = "\n            <li \n            class='sublist-entry'\n            data-name='".concat(name.value, "'\n            data-title='").concat(title.value, "'\n            data-email='").concat(email.value, "'\n            data-phone='").concat(phone.value, "'\n            >\n                <input\n                type=\"hidden\"\n                name=\"contacts-input\"\n                data-name='").concat(name.value, "'\n                data-title='").concat(title.value, "'\n                data-email='").concat(email.value, "'\n                data-phone='").concat(phone.value, "'\n                >\n                <div class='sublist-entry-line1'>\n                    <span>").concat(name.value).concat(title.value != "" ? "- ".concat(title.value) : '', " </span>\n                </div>\n                <div class='sublist-entry-line2'>\n                    <span>Email: </span>\n                    <span>").concat(email.value, "</span>\n                </div>\n                <div class='sublist-entry-line3'>\n                    <span>Phone: </span>\n                    <span>").concat(phone.value, "</span>\n                </div>\n            </li>\n        ");
  list.innerHTML += markup;

  if (list.querySelectorAll("li").length > 0) {
    wrapper.style.display = "block";
  } else {
    wrapper.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", function () {
  lookup("location_categories", loadClinicTypes, {
    method: "GET"
  });
  lookup("services", loadServices, {
    method: "GET"
  });
  lookup("auth_methods", loadAuthMethods, {
    method: "GET"
  });
  lookup("ccf_categories", loadCocsAccepted, {
    method: "GET"
  });
  initInputMasks();
  var form = document.getElementById("location-form");
  var formSubmit = document.getElementById("submit-button");
  var serviceHoursToggle = document.getElementById("service-hours-toggle");
  var businessHoursToggle = document.getElementById("business-hours-toggle");
  var contactsToggle = document.getElementById("contacts-toggle");
  var serviceHoursButton = document.getElementById("service-hours-submit");
  var businessHoursButton = document.getElementById("business-hours-submit");
  var contactsButton = document.getElementById("contacts-submit");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var pseudoInputs = event.target.getElementsByClassName("no-send");
    console.log(pseudoInputs);

    var _iterator9 = _createForOfIteratorHelper(pseudoInputs),
        _step9;

    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var input = _step9.value;
        input.setAttribute("disabled", true);
        console.log(input);
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }

    event.target.submit();
  });
  serviceHoursButton.addEventListener("click", function (event) {
    var form = document.getElementById("service-hours-form");

    if (validateServiceHoursForm(form) == true) {
      renderServiceHoursList(form);
    } else {
      alert("Please fix the Service Hour errors!");
    }
  });
  businessHoursButton.addEventListener("click", function (event) {
    var form = document.getElementById("business-hours-form");

    if (validateBusinessHoursForm(form) == true) {
      renderBusinessHoursList(form);
    } else {
      alert("Please fix the Business Hour errors!");
    }
  });
  contactsButton.addEventListener("click", function (event) {
    var form = document.getElementById("contacts-form");

    if (validateContactsForm(form) == true) {
      renderContactsList(form);
    } else {
      alert("Please fix the Contacts errors!");
    }
  });
  serviceHoursToggle.addEventListener("click", function (event) {
    var form = document.getElementById("service-hours-form");

    if (form.style.display == "none" || form.style.display == "") {
      form.style.display = "block";
    } else {
      form.style.display = "none";
    }
  });
  businessHoursToggle.addEventListener("click", function (event) {
    var form = document.getElementById("business-hours-form");

    if (form.style.display == "none" || form.style.display == "") {
      form.style.display = "block";
    } else {
      form.style.display = "none";
    }
  });
  contactsToggle.addEventListener("click", function (event) {
    var form = document.getElementById("contacts-form");

    if (form.style.display == "none" || form.style.display == "") {
      form.style.display = "block";
    } else {
      form.style.display = "none";
    }
  });
});

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });