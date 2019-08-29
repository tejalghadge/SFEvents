webpackHotUpdate("management",{

/***/ "./src/management/CreateEvent.js":
/*!***************************************!*\
  !*** ./src/management/CreateEvent.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ \"./node_modules/antd/es/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ \"./node_modules/moment/moment.js\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nvar RangePicker = antd__WEBPACK_IMPORTED_MODULE_1__[\"DatePicker\"].RangePicker;\n\nvar posterpath = null;\nvar props = {\n  name: 'file',\n  action: '/api/poster',\n  headers: {\n    authorization: 'authorization-text'\n  },\n  multiple: false,\n  onChange: function onChange(info) {\n    if (info.file.status !== 'uploading') {\n      console.log(info.file, info.fileList);\n    }\n\n    if (info.file.status === 'done') {\n      posterpath = info.file.name;\n      antd__WEBPACK_IMPORTED_MODULE_1__[\"message\"].success('Poster uploaded successfully');\n    } else if (info.status === 'error') {\n      antd__WEBPACK_IMPORTED_MODULE_1__[\"message\"].error(\"\".concat(info.name, \" file upload failed.\"));\n    }\n  }\n};\n\nvar CreateEvent =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(CreateEvent, _Component);\n\n  function CreateEvent(props) {\n    var _this;\n\n    _classCallCheck(this, CreateEvent);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(CreateEvent).call(this, props));\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleSubmit\", function (e) {\n      e.preventDefault();\n\n      _this.props.form.validateFields(function (err, values) {\n        if (!err) {\n          values.poster = posterpath;\n\n          if (_this.state.eventAction == \"Create\") {\n            axios__WEBPACK_IMPORTED_MODULE_2___default.a.post('/api/insertEvent', values).then(function (data) {\n              //  this.props.form.resetFields();\n              var list = document.getElementsByClassName(\"ant-upload-list-item\");\n              if (list[0]) list[0].parentNode.remove(list[0]);\n              antd__WEBPACK_IMPORTED_MODULE_1__[\"message\"].success('Event created successfully.');\n\n              _this.props.populateEvents();\n            }).catch(function (err) {\n              console.log(err);\n            });\n          } else {\n            values.eid = _this.state.dataToUpdate.eid;\n            axios__WEBPACK_IMPORTED_MODULE_2___default.a.post('/api/updateEvent', values).then(function (data) {\n              _this.props.form.resetFields();\n\n              var list = document.getElementsByClassName(\"ant-upload-list-item\");\n              if (list[0]) list[0].parentNode.remove(list[0]);\n              antd__WEBPACK_IMPORTED_MODULE_1__[\"message\"].success('Event updated successfully.');\n            }).catch(function (err) {\n              console.log(err);\n            });\n          }\n        }\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"handleEdit\", function (updateData) {});\n\n    _this.state = {\n      eventAction: \"Create\",\n      data: {},\n      isPublic: false,\n      dataToUpdate: null\n    };\n    return _this;\n  }\n\n  _createClass(CreateEvent, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      var updateData = this.props.data;\n      console.log(updateData);\n\n      if (updateData && Object.keys(updateData).length > 0) {\n        this.handleEdit(updateData);\n        this.props.form.setFieldsValue(updateData);\n        this.setState({\n          isPublic: updateData.is_public.data[0] == 1 ? true : false\n        });\n        this.setState({\n          eventAction: \"Update\"\n        });\n        this.setState({\n          dataToUpdate: updateData\n        });\n        this.props.form.setFieldsValue({\n          date_time: [moment__WEBPACK_IMPORTED_MODULE_3___default()(updateData.start_time), moment__WEBPACK_IMPORTED_MODULE_3___default()(updateData.end_time)]\n        });\n      }\n    }\n  }, {\n    key: \"deleteEvent\",\n    value: function deleteEvent() {\n      axios__WEBPACK_IMPORTED_MODULE_2___default.a.delete(\"/api/event/\".concat(this.props.data.eid)).then(function () {\n        antd__WEBPACK_IMPORTED_MODULE_1__[\"message\"].error('Event has been deleted.');\n      }).catch(function (err) {\n        console.log(err);\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      var getFieldDecorator = this.props.form.getFieldDecorator;\n      var TextArea = antd__WEBPACK_IMPORTED_MODULE_1__[\"Input\"].TextArea;\n      var formItemLayout = {\n        labelCol: {\n          xs: {\n            span: 24\n          },\n          sm: {\n            span: 6\n          }\n        },\n        wrapperCol: {\n          xs: {\n            span: 24\n          },\n          sm: {\n            span: 18\n          }\n        }\n      };\n      var pickerStyle = {\n        width: '100%'\n      };\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Form\"], _extends({}, formItemLayout, {\n        layout: \"block\",\n        style: {\n          margin: 20,\n          'margin-left': '15%',\n          'margin-right': '-5%',\n          float: 'center'\n        },\n        onSubmit: this.handleSubmit\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Form\"].Item, null, getFieldDecorator('title', {\n        rules: [{\n          required: true,\n          message: 'Enter an event title.'\n        }]\n      })(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Input\"], {\n        name: \"title\",\n        prefix: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Icon\"], {\n          type: \"read\",\n          style: {\n            color: 'rgba(0,0,0,.25)'\n          }\n        }),\n        placeholder: \"Title\"\n      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Form\"].Item, null, getFieldDecorator('description', {\n        rules: [{\n          required: true,\n          message: 'Enter a description of an event.'\n        }]\n      })(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TextArea, {\n        name: \"description\",\n        rows: \"8\",\n        placeholder: \"Description\",\n        style: pickerStyle\n      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Form\"].Item, null, getFieldDecorator('location', {\n        rules: [{\n          required: true,\n          message: 'Enter location.'\n        }]\n      })(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Input\"], {\n        name: \"location\",\n        placeholder: \"Location\",\n        style: pickerStyle\n      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Form\"].Item, null, getFieldDecorator('date_time', {\n        rules: [{\n          required: true,\n          message: 'Enter event date time.'\n        }]\n      })(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RangePicker, {\n        format: 'MM/DD/YYYY hh:mm a',\n        showTime: {\n          format: 'hh:mm'\n        },\n        style: pickerStyle,\n        required: true\n      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Form\"].Item, null, getFieldDecorator('invitations', {\n        rules: [{\n          required: true,\n          message: 'Enter email address(s) of attendees.'\n        }]\n      })(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Input\"], {\n        prefix: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Icon\"], {\n          type: \"mail\",\n          style: {\n            color: \"rgba(0,0,0,.25)\"\n          }\n        }),\n        placeholder: \"Invitation\"\n      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Row\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Col\"], {\n        sm: 4\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Form\"].Item, {\n        label: 'Is public'\n      }, getFieldDecorator('is_public', {})(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Checkbox\"], {\n        style: {\n          \"margin-left\": 10\n        },\n        checked: this.state.isPublic,\n        onChange: function onChange(e) {\n          _this2.setState({\n            isPublic: e.target.value\n          });\n        }\n      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Col\"], {\n        sm: 10\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Form\"].Item, {\n        label: 'Maximum Attending: '\n      }, getFieldDecorator('max_attending', {\n        initialValue: [50]\n      })(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"InputNumber\"], {\n        defaultValue: 50,\n        min: 1,\n        max: 1000,\n        style: {\n          margin: 10,\n          width: '230px'\n        },\n        placeholder: \"Attendees\"\n      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Col\"], {\n        sm: 10\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Form\"].Item, {\n        label: 'Price: ',\n        style: {\n          float: \"left\",\n          \"margin-left\": '-100px'\n        }\n      }, getFieldDecorator('price', {\n        initialValue: [50]\n      })(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"InputNumber\"], {\n        min: 1,\n        max: 1000,\n        style: {\n          margin: 10,\n          width: '230px'\n        },\n        placeholder: \"Price\"\n      }))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Form\"].Item, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Upload\"], props, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Button\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Icon\"], {\n        type: \"upload\"\n      }), \" Click to Upload Event Poster\"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Form\"].Item, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Button\"], {\n        style: {\n          float: 'right',\n          width: '200px'\n        },\n        type: \"primary\",\n        htmlType: \"submit\"\n      }, this.state.eventAction), this.state.eventAction === 'Update' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Button\"], {\n        onClick: this.deleteEvent.bind(this),\n        type: \"danger\"\n      }, \"Delete Event\") : null));\n    }\n  }]);\n\n  return CreateEvent;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (antd__WEBPACK_IMPORTED_MODULE_1__[\"Form\"].create({\n  name: 'createEvent'\n})(CreateEvent));\n\n//# sourceURL=webpack:///./src/management/CreateEvent.js?");

/***/ })

})