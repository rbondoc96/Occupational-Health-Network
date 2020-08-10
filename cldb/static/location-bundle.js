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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 6:
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
// CONCATENATED MODULE: ./src/js/utils.js
var timestrConvert = function timestrConvert(timeStr) {
  var tokens = timeStr.split(":");
  var hour = parseInt(tokens[0]);
  var meridian = "AM";

  if (hour >= 12) {
    meridian = "PM";
    if (hour > 12) hour -= 12;
  }

  return "".concat(hour, ":").concat(tokens[1], " ").concat(meridian);
};


// CONCATENATED MODULE: ./src/js/location.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC8i4Dw9T0XlIaLrF7-RpIV7yYkXaJLAso&callback=initMap&libraries=places';
script.defer = true;
script.async = true;
var map;

window.initMap = function () {
  var options = {
    zoom: 12,
    center: {
      lat: 32.7785,
      lng: -117.1306
    }
  };
  map = new google.maps.Map(document.getElementById('map'), options);
};

document.head.appendChild(script);

var addMarker = function addMarker(pos) {
  var marker = new google.maps.Marker({
    position: pos,
    map: map
  });
};

var setText = function setText(elem, text) {
  var list = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var textNode = document.createTextNode(text);
  elem.appendChild(textNode);
};

var setObjectListText = function setObjectListText(elem, objList) {
  if (objList.length > 0) {
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

  if (length > 0) {
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
  var sortedDict = {};

  var _iterator3 = _createForOfIteratorHelper(objList),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var obj = _step3.value;
      var category = obj.service_category.name;
      if (sortedDict[category] == undefined) sortedDict[category] = [obj.name];else sortedDict[category].push(obj.name);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  return sortedDict;
};

var setServicesText = function setServicesText(elem, objList) {
  if (objList.length > 0) {
    var sectionHeader = document.createElement("h2");
    sectionHeader.setAttribute("class", "content__main__header");
    sectionHeader.appendChild(document.createTextNode("Services Provided"));
    elem.appendChild(sectionHeader);
    var sortedDict = sortServicesByCategory(objList);
    var subSection = document.createElement("div");
    subSection.setAttribute("class", "content__main__subsection row");

    for (var _i = 0, _Object$keys = Object.keys(sortedDict); _i < _Object$keys.length; _i++) {
      var item = _Object$keys[_i];
      var listBlock = document.createElement("div");
      listBlock.setAttribute("class", "col-md-4");
      var subHeader = document.createElement("h3");
      subHeader.setAttribute("class", "content__main__subheader");
      subHeader.appendChild(document.createTextNode(item));
      var catList = document.createElement("ul");
      catList.setAttribute("name", item);
      catList.setAttribute("class", "content__main__list");

      var _iterator4 = _createForOfIteratorHelper(sortedDict[item]),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var service = _step4.value;
          var listItem = document.createElement("li");
          listItem.setAttribute("class", "content__main__list-item");
          listItem.append(document.createTextNode(service));
          catList.append(listItem);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      listBlock.append(subHeader);
      listBlock.append(catList);
      subSection.appendChild(listBlock);
    }

    elem.appendChild(subSection);
  }
};

var location_setTimeRangeText = function setTimeRangeText(elem, range1, range2) {
  var rangeText;
  range1 = timestrConvert(range1);
  range2 = timestrConvert(range2);
  if (range1 == "00:00:00" && range2 == "00:00:00") rangeText = "CLOSED";else if (range1 == "12:00:00" && range2 == "12:00:00") rangeText = "Open 24 Hours";else {
    rangeText = "".concat(range1, " to ").concat(range2);
  }
  elem.appendChild(document.createTextNode(rangeText));
};

var setServiceHoursList = function setServiceHoursList(elem, objList) {
  if (objList.length > 0) {
    var sectionHeader = document.createElement("h2");
    sectionHeader.setAttribute("class", "content__main__header");
    sectionHeader.appendChild(document.createTextNode("Service Hours"));
    elem.appendChild(sectionHeader);
    var subSection = document.createElement("ul");
    subSection.setAttribute("class", "content__main__list row");

    var _iterator5 = _createForOfIteratorHelper(objList),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var item = _step5.value;
        var card = document.createElement("li");
        card.setAttribute("class", "content__main__list-card col-md-4 mb-4");
        var name = document.createElement("strong");
        name.setAttribute("class", "service-hour__service");
        name.appendChild(document.createTextNode(item.name + ": "));
        var timeRange = document.createElement("span");
        timeRange.setAttribute("class", "service-hour__time");
        location_setTimeRangeText(timeRange, item.start_time, item.end_time);
        card.appendChild(name);
        card.appendChild(timeRange);

        if (item.days[0] != null || item.days.length > 0) {
          var days = document.createElement("div");
          days.setAttribute("class", "service-hour__days");
          var daysLabel = document.createElement("span");
          daysLabel.appendChild(document.createTextNode("Days Offered:"));
          daysLabel.setAttribute("class", "service-hour__days-label");
          var abbrevList = [];

          var _iterator6 = _createForOfIteratorHelper(item.days),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var day = _step6.value;
              abbrevList.push(day.abbreviation);
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }

          var daysList = document.createElement("span");
          daysList.appendChild(document.createTextNode(abbrevList.join(", ")));
          days.append(daysLabel);
          days.append(daysList);
          card.append(days);
        }

        subSection.append(card);
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }

    elem.appendChild(subSection);
  }
};

var setContactsList = function setContactsList(elem, objList) {
  if (objList.length > 0) {
    var sectionHeader = document.createElement("h2");
    sectionHeader.setAttribute("class", "content__main__header");
    sectionHeader.appendChild(document.createTextNode("Contacts"));
    elem.appendChild(sectionHeader);
    var subSection = document.createElement("ul");
    subSection.setAttribute("class", "content__main__list row");

    var _iterator7 = _createForOfIteratorHelper(objList),
        _step7;

    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var item = _step7.value;
        var card = document.createElement("li");
        card.setAttribute("class", "content__main__list-card col-md-6 mb-4");
        var name = document.createElement("strong");
        name.setAttribute("class", "contact__name");
        name.appendChild(document.createTextNode(item.name));
        card.append(name);

        if (item.title != "" && item.title != null) {
          var title = document.createElement("span");
          title.setAttribute("class", "contact__title");
          title.appendChild(document.createTextNode("- " + item.title));
          card.append(title);
        }

        if (item.phone != "" && item.phone != null) {
          var block = document.createElement("div");
          block.setAttribute("class", "contact__phone__section");
          var label = document.createElement("span");
          label.appendChild(document.createTextNode("Phone: "));
          var phone = document.createElement("span");
          phone.setAttribute("class", "contact__phone");
          phone.appendChild(document.createTextNode(item.phone));
          block.append(label);
          block.append(phone);
          card.append(block);
        }

        if (item.email != "" && item.email != null) {
          var _block = document.createElement("div");

          _block.setAttribute("class", "contact__email__section");

          var _label = document.createElement("span");

          _label.appendChild(document.createTextNode("Email: "));

          var email = document.createElement("span");
          email.setAttribute("class", "contact__email");
          email.appendChild(document.createTextNode(item.email));

          _block.append(_label);

          _block.append(email);

          card.append(_block);
        }

        subSection.append(card);
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }

    elem.append(subSection);
  }
};

var setComments = function setComments(elem, value) {
  if (value != null && value != "") {
    var sectionHeader = document.createElement("h2");
    sectionHeader.setAttribute("class", "content__main__header");
    sectionHeader.appendChild(document.createTextNode("Comments"));
    elem.appendChild(sectionHeader);
    var comments = document.createElement("textarea");
    comments.setAttribute("class", "comments");
    comments.value = value;
    elem.appendChild(comments);
  }
};

var setAddress = function setAddress(elem, obj) {
  console.log(obj);

  if (obj != null) {
    var container = document.createElement("div");
    container.setAttribute("class", "address");
    var line1 = document.createElement("div");
    line1.appendChild(document.createTextNode(obj.street1));
    line1.setAttribute("class", "address__line1");
    container.appendChild(line1);

    if (obj.street2 != "" && obj.street2 != null) {
      var line2 = document.createElement("div");
      line2.setAttribute("class", "address__line2");
      line2.appendChild(document.createTextNode(obj.street2));
      container.appendChild(line2);
    }

    var line3 = document.createElement("div");
    var city = document.createElement("span");
    city.setAttribute("class", "address__city");
    city.appendChild(document.createTextNode(" ".concat(obj.city, " ")));
    var state = document.createElement("span");
    state.setAttribute("class", "address__state");
    state.appendChild(document.createTextNode("".concat(obj.state, ", ")));
    var zipcode = document.createElement("span");
    zipcode.setAttribute("class", "address__zipcode");
    zipcode.appendChild(document.createTextNode("".concat(obj.zipcode)));
    container.appendChild(city);
    container.appendChild(state);
    container.appendChild(zipcode);
    line3.setAttribute("class", "address__line3");
    elem.appendChild(container);
  }
};

var setBusinessHoursList = function setBusinessHoursList(elem, objList) {
  console.log(objList);

  if (objList.length > 0) {
    var businessHours = document.createElement("ul");
    businessHours.setAttribute("class", "business-hour__list");

    var _iterator8 = _createForOfIteratorHelper(objList),
        _step8;

    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var obj = _step8.value;
        var entry = document.createElement("li");
        entry.setAttribute("class", "business-hour__entry");
        var label = document.createElement("strong");
        label.setAttribute("class", "business-hour__day");
        label.appendChild(document.createTextNode(obj.day.name + ": "));
        var timeRange = document.createElement("span");
        timeRange.setAttribute("class", "business-hour__time");
        location_setTimeRangeText(timeRange, obj.start_time, obj.end_time);
        entry.appendChild(label);
        entry.appendChild(timeRange);
        businessHours.appendChild(entry);
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }

    elem.appendChild(businessHours);
  }
};

var getLocationContext = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var apiUrl, apiHandler, location, directionsLink, address, request, service;
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
              setServiceHoursList(document.querySelector(".service-hours-section"), location.service_hours);
              setContactsList(document.querySelector(".contacts-section"), location.contacts);
              setComments(document.querySelector(".comments-section"), location.comments);
              setAddress(document.querySelector(".address-section"), {
                street1: location.street_line_1,
                street2: location.street_line_2,
                city: location.city,
                state: location.state,
                zipcode: location.zipcode
              });
              directionsLink = document.querySelector(".content__directions-link");
              directionsLink.setAttribute("href", "https://www.google.com/maps/dir/Current+Location/".concat(location.street_line_1, "+").concat(location.street_line_2, "+").concat(location.city, "+").concat(location.state, "+").concat(location.zipcode));
              document.querySelector(".phone").textContent = location.phone;
              document.querySelector(".fax").textContent = location.fax;
              document.querySelector(".website a").setAttribute("href", location.website);
              setBusinessHoursList(document.querySelector(".business-hours-section"), location.op_hours);
              document.getElementById("date-created").textContent = location.date_created;
              document.getElementById("last-updated").textContent = location.last_updated;
              address = document.querySelector(".address").textContent;
              request = {
                query: address,
                fields: ['geometry']
              };
              service = new google.maps.places.PlacesService(map);
              service.findPlaceFromQuery(request, function (results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  for (var i = 0; i < results.length; i++) {
                    addMarker(results[i].geometry.location);
                  }

                  map.setCenter(results[0].geometry.location);
                }
              });
            } else {// Failure to 404 - redirect?
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
  var box = document.querySelector(".sliding-box");
  box.style.display = "none";
  var employerToggle = document.getElementById("employer-info--toggle");
  employerToggle.addEventListener("click", function (event) {
    var box = document.querySelector(".sliding-box");
    if (box.style.display == "none") box.style.display = "block";else box.style.display = "none";
  });
});

/***/ })

/******/ });