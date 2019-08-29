webpackHotUpdate("admin",{

/***/ "./src/admin/ReportedUser.js":
/*!***********************************!*\
  !*** ./src/admin/ReportedUser.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ReportedUser; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ \"./node_modules/antd/es/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\nvar ReportedUser =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(ReportedUser, _Component);\n\n  function ReportedUser(props) {\n    var _this;\n\n    _classCallCheck(this, ReportedUser);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReportedUser).call(this, props));\n    _this.state = {\n      users: []\n    };\n    return _this;\n  }\n\n  _createClass(ReportedUser, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      var _this2 = this;\n\n      axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/api/reported/user').then(function (_ref) {\n        var data = _ref.data;\n        console.log(data);\n\n        _this2.setState({\n          users: data\n        });\n      }).catch(function (err) {\n        console.log(err);\n      });\n    }\n  }, {\n    key: \"blockUser\",\n    value: function blockUser(uid) {\n      var _this3 = this;\n\n      axios__WEBPACK_IMPORTED_MODULE_2___default.a.put(\"/api/block/user/\".concat(uid)).then(function () {\n        var users = _this3.state.users;\n        users = users.filter(function (item) {\n          return item.user_id !== uid;\n        });\n\n        _this3.setState({\n          users: users\n        });\n      }).catch(function (err) {\n        console.log(err);\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this4 = this;\n\n      var columns = [{\n        title: 'User ID',\n        dataIndex: 'user_id',\n        align: 'center'\n      }, {\n        title: 'Username',\n        dataIndex: 'username',\n        align: 'center'\n      }, {\n        title: 'Reason',\n        dataIndex: 'reason'\n      }, {\n        title: 'Reported By',\n        dataIndex: 'reportedBy',\n        align: 'center'\n      }, {\n        title: 'Action',\n        dataIndex: 'action',\n        align: 'center',\n        render: function render(value, record) {\n          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n            style: {\n              display: 'flex',\n              flexDirection: 'row',\n              justifyContent: 'space-around'\n            }\n          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n            href: \"javascript:void(0)\",\n            onClick: _this4.blockUser.bind(_this4, record.user_id)\n          }, \"Block\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n            href: \"javascript:void(0)\"\n          }, \"Cancel\"));\n        }\n      }];\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Table\"], {\n        columns: columns,\n        rowKey: 'user_id',\n        dataSource: this.state.users\n      });\n    }\n  }]);\n\n  return ReportedUser;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n\n\n//# sourceURL=webpack:///./src/admin/ReportedUser.js?");

/***/ })

})