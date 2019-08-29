webpackHotUpdate("eventList",{

/***/ "./src/eventList/Event.js":
/*!********************************!*\
  !*** ./src/eventList/Event.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Event; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ \"./node_modules/antd/es/index.js\");\n/* harmony import */ var react_moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-moment */ \"./node_modules/react-moment/dist/index.js\");\n/* harmony import */ var react_moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_moment__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var _event_Event__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../event/Event */ \"./src/event/Event.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nvar Meta = antd__WEBPACK_IMPORTED_MODULE_1__[\"Card\"].Meta;\n\n\n\n\nvar Event =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(Event, _Component);\n\n  function Event(props) {\n    var _this;\n\n    _classCallCheck(this, Event);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Event).call(this, props));\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleClick\", function () {\n      window.location.replace('/event?eventID=' + _this.state.eid);\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"viewEvent\", function () {\n      window.location.replace('/event?eventID=' + _this.state.eid);\n    });\n\n    _this.state = {\n      eid: 0\n    };\n    return _this;\n  }\n\n  _createClass(Event, [{\n    key: \"render\",\n    value: function render() {\n      var data = this.props.data;\n\n      if (data) {\n        this.state.eid = data.eid; // https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png\"\n\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"HashRouter\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Card\"], {\n          onClick: this.viewEvent,\n          style: {\n            height: 450\n          },\n          hoverable: true,\n          cover: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n            alt: \"example\",\n            src: data.poster\n          })\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Meta, {\n          title: data.title,\n          description: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n            style: {\n              maxHeight: '4.5em',\n              lineHeight: '1.5em'\n            }\n          }, data.description)\n        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"Date: \", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_moment__WEBPACK_IMPORTED_MODULE_2___default.a, {\n          format: \"YYYY/MM/DD\"\n        }, data.start_time)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"Start Time: \", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_moment__WEBPACK_IMPORTED_MODULE_2___default.a, {\n          format: \"HH:mm\"\n        }, data.start_time)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"End Time: \", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_moment__WEBPACK_IMPORTED_MODULE_2___default.a, {\n          format: \"HH:mm\"\n        }, data.end_time)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"Location: \", data.location), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"Public: \", data.is_public ? 'YES' : 'NO'), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"Price: \", data.price), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"Max Attendees: \", data.maxAttending)));\n      } else {\n        return null;\n      }\n    }\n  }]);\n\n  return Event;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n\n\n//# sourceURL=webpack:///./src/eventList/Event.js?");

/***/ })

})