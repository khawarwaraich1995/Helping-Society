"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SESSION_INFO_KEY = "@Session:Info";
var SESSION_TOKEN_KEY = "@Session:Token";

var PrefHandler =
/*#__PURE__*/
function () {
  function PrefHandler() {
    _classCallCheck(this, PrefHandler);
  }

  _createClass(PrefHandler, [{
    key: "createSession",
    value: function createSession(sData, token, onCompleted) {
      return regeneratorRuntime.async(function createSession$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(_asyncStorage["default"].setItem(SESSION_INFO_KEY, JSON.stringify(sData)));

            case 3:
              _context.next = 5;
              return regeneratorRuntime.awrap(_asyncStorage["default"].setItem(SESSION_TOKEN_KEY, token));

            case 5:
              // console.log('Never Quit ==> ', SESSION_INFO_KEY)
              onCompleted(true);
              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0.message);
              onCompleted(false);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 8]]);
    }
  }, {
    key: "getSession",
    value: function getSession(onResult) {
      var result, info, token;
      return regeneratorRuntime.async(function getSession$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              result = {
                userInfo: null,
                token: null
              };
              _context2.prev = 1;
              _context2.next = 4;
              return regeneratorRuntime.awrap(_asyncStorage["default"].getItem(SESSION_INFO_KEY));

            case 4:
              info = _context2.sent;
              _context2.next = 7;
              return regeneratorRuntime.awrap(_asyncStorage["default"].getItem(SESSION_TOKEN_KEY));

            case 7:
              token = _context2.sent;

              if (info && token) {
                result.userInfo = JSON.parse(info);
                result.token = token;
              }

              onResult(result);
              _context2.next = 16;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](1);
              console.log(_context2.t0.message);
              onResult(result);

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[1, 12]]);
    }
  }, {
    key: "deleteSession",
    value: function deleteSession(onResult) {
      return regeneratorRuntime.async(function deleteSession$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(_asyncStorage["default"].multiRemove([SESSION_INFO_KEY, SESSION_TOKEN_KEY]));

            case 2:
              onResult();

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }]);

  return PrefHandler;
}();

exports["default"] = PrefHandler;