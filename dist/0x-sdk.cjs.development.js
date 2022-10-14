'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var constants = require('@ethersproject/constants');
var bytes = require('@ethersproject/bytes');
var fetch$1 = _interopDefault(require('isomorphic-unfetch'));
var qs = _interopDefault(require('qs'));
var ethers = require('ethers');

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

var ETH_FAKE_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
var ROOT_URLS_BY_CHAIN_ID = {
  '1': 'https://api.0x.org',
  '3': 'https://ropsten.api.0x.org',
  '137': 'https://polygon.api.0x.org',
  '56': 'https://bsc.api.0x.org',
  '10': 'https://optimism.api.0x.org',
  '250': 'https://fantom.api.0x.org',
  '42220': 'https://celo.api.0x.org',
  '43114': 'https://avalanche.api.0x.org'
};
var EXCHANGE_PROXY_ADDRESSES = {
  1: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
  5: '0xf91bb752490473b8342a3e964e855b9f9a2a668e',
  10: '0xdef1abe32c034e558cdd535791643c58a13acc10',
  56: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
  137: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
  250: '0xdef189deaef76e379df891899eb5a00a94cbc250',
  42220: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
  43114: '0xdef1c0ded9bec7f1a1670819833240f027b25eff'
};

/* Autogenerated file. Do not edit manually. */
var _abi = [{
  constant: true,
  inputs: [],
  name: "name",
  outputs: [{
    name: "",
    type: "string"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  constant: false,
  inputs: [{
    name: "_spender",
    type: "address"
  }, {
    name: "_value",
    type: "uint256"
  }],
  name: "approve",
  outputs: [{
    name: "",
    type: "bool"
  }],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}, {
  constant: true,
  inputs: [],
  name: "totalSupply",
  outputs: [{
    name: "",
    type: "uint256"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  constant: false,
  inputs: [{
    name: "_from",
    type: "address"
  }, {
    name: "_to",
    type: "address"
  }, {
    name: "_value",
    type: "uint256"
  }],
  name: "transferFrom",
  outputs: [{
    name: "",
    type: "bool"
  }],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}, {
  constant: true,
  inputs: [],
  name: "decimals",
  outputs: [{
    name: "",
    type: "uint8"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  constant: true,
  inputs: [{
    name: "_owner",
    type: "address"
  }],
  name: "balanceOf",
  outputs: [{
    name: "balance",
    type: "uint256"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  constant: true,
  inputs: [],
  name: "symbol",
  outputs: [{
    name: "",
    type: "string"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  constant: false,
  inputs: [{
    name: "_to",
    type: "address"
  }, {
    name: "_value",
    type: "uint256"
  }],
  name: "transfer",
  outputs: [{
    name: "",
    type: "bool"
  }],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}, {
  constant: true,
  inputs: [{
    name: "_owner",
    type: "address"
  }, {
    name: "_spender",
    type: "address"
  }],
  name: "allowance",
  outputs: [{
    name: "",
    type: "uint256"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  payable: true,
  stateMutability: "payable",
  type: "fallback"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: "owner",
    type: "address"
  }, {
    indexed: true,
    name: "spender",
    type: "address"
  }, {
    indexed: false,
    name: "value",
    type: "uint256"
  }],
  name: "Approval",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: "from",
    type: "address"
  }, {
    indexed: true,
    name: "to",
    type: "address"
  }, {
    indexed: false,
    name: "value",
    type: "uint256"
  }],
  name: "Transfer",
  type: "event"
}];
var Erc20__factory = /*#__PURE__*/function () {
  function Erc20__factory() {}

  Erc20__factory.createInterface = function createInterface() {
    return new ethers.utils.Interface(_abi);
  };

  Erc20__factory.connect = function connect(address, signerOrProvider) {
    return new ethers.Contract(address, _abi, signerOrProvider);
  };

  return Erc20__factory;
}();
Erc20__factory.abi = _abi;

var RfqmTypes;

(function (RfqmTypes) {
  RfqmTypes["MetaTransaction"] = "metatransaction";
  RfqmTypes["OtcOrder"] = "otc";
})(RfqmTypes || (RfqmTypes = {}));

var RfqmTransactionStates;

(function (RfqmTransactionStates) {
  RfqmTransactionStates["Pending"] = "pending";
  RfqmTransactionStates["Submitted"] = "submitted";
  RfqmTransactionStates["Failed"] = "failed";
  RfqmTransactionStates["Succeeded"] = "succeeded";
  RfqmTransactionStates["Confirmed"] = "confirmed";
})(RfqmTransactionStates || (RfqmTransactionStates = {}));

var getRootApiEndpoint = function getRootApiEndpoint(chainId) {

  var apiUrl = ROOT_URLS_BY_CHAIN_ID[parseInt(chainId.toString(10))];

  if (!apiUrl) {
    throw new Error("No API Url for " + chainId + ".");
  }

  return apiUrl;
};
var validateAmounts = function validateAmounts(params) {
  if (params.buyAmount && params.sellAmount) {
    throw Error('The swap request params requires either a sellAmount or buyAmount. Do not provide both fields.');
  }

  if (!params.buyAmount && !params.sellAmount) {
    throw Error('The swap request params requires either a sellAmount or buyAmount.');
  }

  return undefined;
};
var validateResponse = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(response) {
    var causes, data, message;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(response.status > 400)) {
              _context.next = 2;
              break;
            }

            throw new Error(response.status + " " + response.statusText);

          case 2:
            if (!(response.status === 400)) {
              _context.next = 12;
              break;
            }

            causes = [];
            _context.next = 6;
            return response.json();

          case 6:
            data = _context.sent;

            if (!data.validationErrors) {
              _context.next = 11;
              break;
            }

            data.validationErrors.map(function (error) {
              var field = error.field,
                  reason = error.reason;
              causes.push(field + ": " + reason + ".");
              return undefined;
            });
            message = "[" + data.reason + "] " + causes.join(' ');
            throw new Error(message);

          case 11:
            throw new Error(data.reason);

          case 12:
            return _context.abrupt("return", undefined);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validateResponse(_x) {
    return _ref.apply(this, arguments);
  };
}();
var verifyRfqmIsLiveOrThrow = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(endpoint, fetchFn) {
    var healthUrl, healthResponse, parsedHealthResponse;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (fetchFn === void 0) {
              fetchFn = fetch;
            }

            console.log(endpoint, '<---endpoint');
            healthUrl = endpoint + "/rfqm/v1/healthz";
            _context2.next = 5;
            return fetchFn(healthUrl);

          case 5:
            healthResponse = _context2.sent;
            _context2.next = 8;
            return healthResponse.json();

          case 8:
            parsedHealthResponse = _context2.sent;

            if (parsedHealthResponse != null && parsedHealthResponse.isOperational) {
              _context2.next = 11;
              break;
            }

            throw new Error("RFQm service is down.");

          case 11:
            return _context2.abrupt("return", undefined);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function verifyRfqmIsLiveOrThrow(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var ERROR_CHAIN_ID_URL_REQUIRED = 'A chainId is required if the ZeroExSdk class is constructed without an apiUrl.';
var ERROR_CHAIN_ID_REQUIRED = 'No chainId provided!';
var ERROR_QUOTE_REQUIRED = 'No quote data provided!';
var ERROR_SIGNER_REQUIRED = 'No signer provided!';
var ERROR_TX_HASH_REQUIRED = 'Transaction hash not provided!';

var ZeroExSdk = /*#__PURE__*/function () {
  function ZeroExSdk(ZeroExSdkOptions) {
    this.ZeroExSdkOptions = ZeroExSdkOptions;
  }
  /**
   * Returns the liquidity sources enabled for a specific chain id.
   * - {@link https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-sources}
   *
   * @param chainId - Chain ID of sources. Optional if ZeroExSdkOptions.apiUrl is defined
   * @param fetchFn: An optional fetch function. Defaults to fetch.
   * @returns An object with the list of sources
   */


  var _proto = ZeroExSdk.prototype;

  _proto.getSources =
  /*#__PURE__*/
  function () {
    var _getSources = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_temp) {
      var _this$ZeroExSdkOption;

      var _ref, chainId, _ref$fetchFn, fetchFn, endpoint, url, response, data;

      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref = _temp === void 0 ? {} : _temp, chainId = _ref.chainId, _ref$fetchFn = _ref.fetchFn, fetchFn = _ref$fetchFn === void 0 ? fetch$1 : _ref$fetchFn;
              endpoint = chainId ? getRootApiEndpoint(chainId) : (_this$ZeroExSdkOption = this.ZeroExSdkOptions) == null ? void 0 : _this$ZeroExSdkOption.apiUrl;

              if (endpoint) {
                _context.next = 4;
                break;
              }

              throw new Error(ERROR_CHAIN_ID_URL_REQUIRED);

            case 4:
              url = endpoint + "/swap/v1/sources";
              _context.next = 7;
              return fetchFn(url);

            case 7:
              response = _context.sent;
              _context.next = 10;
              return validateResponse(response);

            case 10:
              _context.next = 12;
              return response.json();

            case 12:
              data = _context.sent;
              return _context.abrupt("return", data);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getSources(_x) {
      return _getSources.apply(this, arguments);
    }

    return getSources;
  }()
  /**
   * Fetches an indicative price for buying or selling an ERC20 token.
   * - {@link https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-price}
   * - {@link https://docs.0x.org/market-makers/docs/introduction#indicative-pricing}
   *
   * @param params: The request params for the 0x API `/price` endpoint.
   * @param resource: Optional 'swap' or 'rfqm' resource type. Defaults to 'swap'.
   * @param chainId - Chain ID number for this transaction. Optional if ZeroExSdkOptions.apiUrl is defined
   * @param fetchFn: An optional fetch function. Defaults to fetch.
   * @returns The indicative price
   */
  ;

  _proto.getIndicativePrice =
  /*#__PURE__*/
  function () {
    var _getIndicativePrice = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref2) {
      var _this$ZeroExSdkOption2;

      var params, _ref2$resource, resource, chainId, _ref2$fetchFn, fetchFn, endpoint, _this$ZeroExSdkOption3, _this$ZeroExSdkOption4, _url, _response, _data, url, response, data;

      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              params = _ref2.params, _ref2$resource = _ref2.resource, resource = _ref2$resource === void 0 ? 'swap' : _ref2$resource, chainId = _ref2.chainId, _ref2$fetchFn = _ref2.fetchFn, fetchFn = _ref2$fetchFn === void 0 ? fetch$1 : _ref2$fetchFn;
              validateAmounts(params);
              endpoint = chainId ? getRootApiEndpoint(chainId) : (_this$ZeroExSdkOption2 = this.ZeroExSdkOptions) == null ? void 0 : _this$ZeroExSdkOption2.apiUrl;

              if (endpoint) {
                _context2.next = 5;
                break;
              }

              throw new Error(ERROR_CHAIN_ID_URL_REQUIRED);

            case 5:
              if (!(resource === 'rfqm')) {
                _context2.next = 17;
                break;
              }

              verifyRfqmIsLiveOrThrow(endpoint);
              _url = endpoint + "/rfqm/v1/price?" + qs.stringify(params);
              _context2.next = 10;
              return fetchFn(_url, {
                headers: _extends({}, ((_this$ZeroExSdkOption3 = this.ZeroExSdkOptions) == null ? void 0 : _this$ZeroExSdkOption3.apiKey) && {
                  '0x-api-key': (_this$ZeroExSdkOption4 = this.ZeroExSdkOptions) == null ? void 0 : _this$ZeroExSdkOption4.apiKey
                })
              });

            case 10:
              _response = _context2.sent;
              _context2.next = 13;
              return validateResponse(_response);

            case 13:
              _context2.next = 15;
              return _response.json();

            case 15:
              _data = _context2.sent;
              return _context2.abrupt("return", _data);

            case 17:
              url = endpoint + "/swap/v1/price?" + qs.stringify(params);
              _context2.next = 20;
              return fetchFn(url);

            case 20:
              response = _context2.sent;
              _context2.next = 23;
              return validateResponse(response);

            case 23:
              _context2.next = 25;
              return response.json();

            case 25:
              data = _context2.sent;
              return _context2.abrupt("return", data);

            case 27:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getIndicativePrice(_x2) {
      return _getIndicativePrice.apply(this, arguments);
    }

    return getIndicativePrice;
  }()
  /**
   * Fetches a firm quote for buying or selling an ERC20 token.
   * - {@link https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-quote}
   * - {@link https://docs.0x.org/market-makers/docs/introduction#firm-quotes}
   *
   * @param params: The request params for the 0x API `/quote` endpoint.
   * @param resource: Optional 'swap' or 'rfqm' resource type. Defaults to 'swap'.
   * @param chainId - Chain ID number for this transaction. Optional if ZeroExSdkOptions.apiUrl is defined
   * @param fetchFn: An optional fetch function.
   * @returns The firm quote
   */
  ;

  _proto.getFirmQuote =
  /*#__PURE__*/
  function () {
    var _getFirmQuote = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_ref3) {
      var _this$ZeroExSdkOption5;

      var params, _ref3$resource, resource, chainId, _ref3$fetchFn, fetchFn, endpoint, _this$ZeroExSdkOption6, _this$ZeroExSdkOption7, _url2, _response2, _data2, url, response, data;

      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              params = _ref3.params, _ref3$resource = _ref3.resource, resource = _ref3$resource === void 0 ? 'swap' : _ref3$resource, chainId = _ref3.chainId, _ref3$fetchFn = _ref3.fetchFn, fetchFn = _ref3$fetchFn === void 0 ? fetch$1 : _ref3$fetchFn;
              validateAmounts(params);
              endpoint = chainId ? getRootApiEndpoint(chainId) : (_this$ZeroExSdkOption5 = this.ZeroExSdkOptions) == null ? void 0 : _this$ZeroExSdkOption5.apiUrl;

              if (endpoint) {
                _context3.next = 5;
                break;
              }

              throw new Error(ERROR_CHAIN_ID_URL_REQUIRED);

            case 5:
              if (!(resource === 'rfqm')) {
                _context3.next = 17;
                break;
              }

              verifyRfqmIsLiveOrThrow(endpoint);
              _url2 = endpoint + "/rfqm/v1/quote?" + qs.stringify(params);
              _context3.next = 10;
              return fetchFn(_url2, {
                headers: _extends({}, ((_this$ZeroExSdkOption6 = this.ZeroExSdkOptions) == null ? void 0 : _this$ZeroExSdkOption6.apiKey) && {
                  '0x-api-key': (_this$ZeroExSdkOption7 = this.ZeroExSdkOptions) == null ? void 0 : _this$ZeroExSdkOption7.apiKey
                })
              });

            case 10:
              _response2 = _context3.sent;
              _context3.next = 13;
              return validateResponse(_response2);

            case 13:
              _context3.next = 15;
              return _response2.json();

            case 15:
              _data2 = _context3.sent;
              return _context3.abrupt("return", _data2);

            case 17:
              url = endpoint + "/swap/v1/quote?" + qs.stringify(params);
              _context3.next = 20;
              return fetchFn(url);

            case 20:
              response = _context3.sent;
              _context3.next = 23;
              return validateResponse(response);

            case 23:
              _context3.next = 25;
              return response.json();

            case 25:
              data = _context3.sent;
              return _context3.abrupt("return", data);

            case 27:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getFirmQuote(_x3) {
      return _getFirmQuote.apply(this, arguments);
    }

    return getFirmQuote;
  }()
  /**
   * Approves 0x's smart contracts to facilitate transactions on signer's behalf for the token contract address specified.
   * - {@link https://docs.0x.org/0x-api-swap/advanced-topics/how-to-set-your-token-allowances}
   * - {@link https://tokenallowance.io/}
   *
   * @param tokenContractAddress: Token Address for appproval.
   * @param contractAddressToApprove: ZeroEx Exchange Proxy Address - Varies per network and can be obtained via utils function `getExchangeProxyAddress(chainId)`.
   * @param signer: Transaction signer.
   * @param amount: Amount to approve. Defaults to MaxInt256 if not specified
   * @returns The contract transaction Promise.
   */
  ;

  _proto.approveToken =
  /*#__PURE__*/
  function () {
    var _approveToken = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(_ref4) {
      var tokenContractAddress, contractAddressToApprove, signer, amount, txOptions, erc20, tx;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              tokenContractAddress = _ref4.tokenContractAddress, contractAddressToApprove = _ref4.contractAddressToApprove, signer = _ref4.signer, amount = _ref4.amount, txOptions = _ref4.txOptions;
              erc20 = Erc20__factory.connect(tokenContractAddress, signer);
              tx = erc20.approve(contractAddressToApprove, amount != null ? amount : constants.MaxInt256, _extends({}, txOptions));
              return _context4.abrupt("return", tx);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function approveToken(_x4) {
      return _approveToken.apply(this, arguments);
    }

    return approveToken;
  }()
  /**
   * Gets allowance amount for a specified token per wallet address.
   * @param tokenContractAddress: Token Address for approval.
   * @param contractAddressToApprove: ZeroEx Exchange Proxy Address - Varies per network and can be obtained via utils function `getExchangeProxyAddress(chainId)`.
   * @param walletAddress: Wallet address to get allowance for.
   * @param signerOrProvider: Optional - signer or provider.
   * @returns Allowance
   */
  ;

  _proto.getAllowance =
  /*#__PURE__*/
  function () {
    var _getAllowance = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(_ref5) {
      var tokenContractAddress, contractAddressToApprove, walletAddress, signerOrProvider, erc20, approvalAmount;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              tokenContractAddress = _ref5.tokenContractAddress, contractAddressToApprove = _ref5.contractAddressToApprove, walletAddress = _ref5.walletAddress, signerOrProvider = _ref5.signerOrProvider;
              erc20 = Erc20__factory.connect(tokenContractAddress, signerOrProvider);

              if (!(tokenContractAddress.toLowerCase() === ETH_FAKE_ADDRESS)) {
                _context5.next = 4;
                break;
              }

              return _context5.abrupt("return", constants.MaxUint256);

            case 4:
              _context5.next = 6;
              return erc20.allowance(walletAddress, contractAddressToApprove);

            case 6:
              approvalAmount = _context5.sent;
              return _context5.abrupt("return", approvalAmount);

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function getAllowance(_x5) {
      return _getAllowance.apply(this, arguments);
    }

    return getAllowance;
  }()
  /**
   * Submits the ERC-20 token swap on chain
   * @param quote - The data returned from getFirmQuote()
   * @param signer - Signer who will send the transaction
   * @param chainId - Chain ID number for this transaction.
   * @returns The transaction response
   */
  ;

  _proto.fillOrder =
  /*#__PURE__*/
  function () {
    var _fillOrder = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(_ref6) {
      var quote, signer, chainId, txOptions, txResponse;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              quote = _ref6.quote, signer = _ref6.signer, chainId = _ref6.chainId, txOptions = _ref6.txOptions;

              if (quote) {
                _context6.next = 3;
                break;
              }

              throw new Error(ERROR_QUOTE_REQUIRED);

            case 3:
              if (signer) {
                _context6.next = 5;
                break;
              }

              throw new Error(ERROR_SIGNER_REQUIRED);

            case 5:
              if (chainId) {
                _context6.next = 7;
                break;
              }

              throw new Error(ERROR_CHAIN_ID_REQUIRED);

            case 7:
              _context6.next = 9;
              return signer.sendTransaction(_extends({
                gasLimit: quote.gas,
                gasPrice: quote.gasPrice
              }, txOptions || {}, {
                // don't override with options
                to: quote.to,
                data: quote.data,
                value: quote.value,
                chainId: chainId
              }));

            case 9:
              txResponse = _context6.sent;
              return _context6.abrupt("return", txResponse);

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function fillOrder(_x6) {
      return _fillOrder.apply(this, arguments);
    }

    return fillOrder;
  }()
  /**
   * Signs the RFQm order and submits it to authorize 0x to perform the swap on behalf of signers
   * - {@link https://docs.0x.org/market-makers/guides/signing-0x-orders}
   * - {@link https://docs.0x.org/market-makers/docs/introduction#rfq-m-1}
   * @param quote - The data returned from getFirmQuote()
   * @param chainId: Chain ID number for this transaction.
   * @param fetchFn: An optional fetch function.
   * @returns The transaction response after RFQm fill submission
   */
  ;

  _proto.fillRfqmOrder =
  /*#__PURE__*/
  function () {
    var _fillRfqmOrder = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(_ref7) {
      var _this$ZeroExSdkOption8, _this$ZeroExSdkOption9, _this$ZeroExSdkOption10;

      var quote, chainId, signer, _ref7$fetchFn, fetchFn, rawSignature, _splitSignature, v, r, s, unpackedSignedSignature, endpoint, url, body, response, data;

      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              quote = _ref7.quote, chainId = _ref7.chainId, signer = _ref7.signer, _ref7$fetchFn = _ref7.fetchFn, fetchFn = _ref7$fetchFn === void 0 ? fetch$1 : _ref7$fetchFn;

              if (quote) {
                _context7.next = 3;
                break;
              }

              throw new Error(ERROR_QUOTE_REQUIRED);

            case 3:
              _context7.next = 5;
              return signer.signMessage(bytes.arrayify(quote.orderHash));

            case 5:
              rawSignature = _context7.sent;
              _splitSignature = bytes.splitSignature(rawSignature), v = _splitSignature.v, r = _splitSignature.r, s = _splitSignature.s;
              unpackedSignedSignature = {
                v: v,
                r: r,
                s: s,
                signatureType: 3
              };
              endpoint = chainId ? getRootApiEndpoint(chainId) : (_this$ZeroExSdkOption8 = this.ZeroExSdkOptions) == null ? void 0 : _this$ZeroExSdkOption8.apiUrl;

              if (endpoint) {
                _context7.next = 11;
                break;
              }

              throw new Error(ERROR_CHAIN_ID_URL_REQUIRED);

            case 11:
              url = endpoint + "/rfqm/v1/submit";
              body = {
                signature: unpackedSignedSignature,
                order: quote.order,
                type: RfqmTypes.OtcOrder
              };
              _context7.next = 15;
              return fetchFn(url, {
                method: 'POST',
                headers: _extends({}, ((_this$ZeroExSdkOption9 = this.ZeroExSdkOptions) == null ? void 0 : _this$ZeroExSdkOption9.apiKey) && {
                  '0x-api-key': (_this$ZeroExSdkOption10 = this.ZeroExSdkOptions) == null ? void 0 : _this$ZeroExSdkOption10.apiKey,
                  'Content-Type': 'application/json'
                }),
                body: JSON.stringify(body)
              });

            case 15:
              response = _context7.sent;
              _context7.next = 18;
              return validateResponse(response);

            case 18:
              _context7.next = 20;
              return response.json();

            case 20:
              data = _context7.sent;
              return _context7.abrupt("return", data);

            case 22:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function fillRfqmOrder(_x7) {
      return _fillRfqmOrder.apply(this, arguments);
    }

    return fillRfqmOrder;
  }()
  /**
   * Fetches the RFQm order transaction status
   * @param txHash: The order transaction hash from RFQm fill submission
   * @param chainId: Chain ID number for this transaction.
   * @param fetchFn: An optional fetch function.
   * @returns The transaction status and all transactions executed for the RFQm order
   */
  ;

  _proto.getRfqmTxStatus =
  /*#__PURE__*/
  function () {
    var _getRfqmTxStatus = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(_ref8) {
      var _this$ZeroExSdkOption11, _this$ZeroExSdkOption12, _this$ZeroExSdkOption13;

      var txHash, chainId, _ref8$fetchFn, fetchFn, endpoint, statusUrl, response, data;

      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              txHash = _ref8.txHash, chainId = _ref8.chainId, _ref8$fetchFn = _ref8.fetchFn, fetchFn = _ref8$fetchFn === void 0 ? fetch$1 : _ref8$fetchFn;

              if (txHash) {
                _context8.next = 3;
                break;
              }

              throw new Error(ERROR_TX_HASH_REQUIRED);

            case 3:
              endpoint = chainId ? getRootApiEndpoint(chainId) : (_this$ZeroExSdkOption11 = this.ZeroExSdkOptions) == null ? void 0 : _this$ZeroExSdkOption11.apiUrl;

              if (endpoint) {
                _context8.next = 6;
                break;
              }

              throw new Error(ERROR_CHAIN_ID_URL_REQUIRED);

            case 6:
              statusUrl = endpoint + "/rfqm/v1/status/" + txHash;
              _context8.next = 9;
              return fetchFn(statusUrl, {
                headers: _extends({}, ((_this$ZeroExSdkOption12 = this.ZeroExSdkOptions) == null ? void 0 : _this$ZeroExSdkOption12.apiKey) && {
                  '0x-api-key': (_this$ZeroExSdkOption13 = this.ZeroExSdkOptions) == null ? void 0 : _this$ZeroExSdkOption13.apiKey
                })
              });

            case 9:
              response = _context8.sent;
              _context8.next = 12;
              return response.json();

            case 12:
              data = _context8.sent;
              return _context8.abrupt("return", data);

            case 14:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function getRfqmTxStatus(_x8) {
      return _getRfqmTxStatus.apply(this, arguments);
    }

    return getRfqmTxStatus;
  }();

  return ZeroExSdk;
}();

exports.EXCHANGE_PROXY_ADDRESSES = EXCHANGE_PROXY_ADDRESSES;
exports.ZeroExSdk = ZeroExSdk;
//# sourceMappingURL=0x-sdk.cjs.development.js.map
