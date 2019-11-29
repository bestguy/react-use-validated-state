"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("./index"));

var _validate = _interopRequireDefault(require("validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(defaultValue) {
  var constraints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var validateImmediately = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isInvalid = function isInvalid(value) {
    return _validate["default"].single(value, constraints);
  };

  return (0, _index["default"])(defaultValue, isInvalid, validateImmediately);
};

exports["default"] = _default;