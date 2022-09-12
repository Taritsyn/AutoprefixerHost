(function () {
  'use strict';

  /*!
   * core-js v2.6.12
   * https://github.com/zloirock/core-js
   *
   * Copyright (c) 2014-2020 Denis Pushkarev
   * Released under the terms of MIT license
   */
  var _objectGopd = {};

  var _objectPie = {};

  var hasRequired_objectPie;

  function require_objectPie () {
  	if (hasRequired_objectPie) return _objectPie;
  	hasRequired_objectPie = 1;
  	_objectPie.f = {}.propertyIsEnumerable;
  	return _objectPie;
  }

  var _propertyDesc = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString$1 = {}.toString;

  var _cof = function (it) {
    return toString$1.call(it).slice(8, -1);
  };

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var cof$5 = _cof;
  // eslint-disable-next-line no-prototype-builtins
  var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return cof$5(it) == 'String' ? it.split('') : Object(it);
  };

  // 7.2.1 RequireObjectCoercible(argument)
  var _defined = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };

  // to indexed object, toObject with fallback for non-array-like ES3 strings
  var IObject$1 = _iobject;
  var defined$6 = _defined;
  var _toIobject = function (it) {
    return IObject$1(defined$6(it));
  };

  var _isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  // 7.1.1 ToPrimitive(input [, PreferredType])
  var isObject$f = _isObject;
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var _toPrimitive = function (it, S) {
    if (!isObject$f(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !isObject$f(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !isObject$f(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !isObject$f(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var hasOwnProperty = {}.hasOwnProperty;
  var _has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var _fails = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var _descriptors = !_fails(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });

  var _global = {exports: {}};

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$e = _global.exports = typeof window != 'undefined' && window.Math == Math
    ? window : typeof self != 'undefined' && self.Math == Math ? self
    // eslint-disable-next-line no-new-func
    : Function('return this')();
  if (typeof __g == 'number') __g = global$e; // eslint-disable-line no-undef

  var _domCreate;
  var hasRequired_domCreate;

  function require_domCreate () {
  	if (hasRequired_domCreate) return _domCreate;
  	hasRequired_domCreate = 1;
  	var isObject = _isObject;
  	var document = _global.exports.document;
  	// typeof document.createElement is 'object' in old IE
  	var is = isObject(document) && isObject(document.createElement);
  	_domCreate = function (it) {
  	  return is ? document.createElement(it) : {};
  	};
  	return _domCreate;
  }

  var _ie8DomDefine = !_descriptors && !_fails(function () {
    return Object.defineProperty(require_domCreate()('div'), 'a', { get: function () { return 7; } }).a != 7;
  });

  var pIE$1 = require_objectPie();
  var createDesc$3 = _propertyDesc;
  var toIObject$6 = _toIobject;
  var toPrimitive$4 = _toPrimitive;
  var has$9 = _has;
  var IE8_DOM_DEFINE$1 = _ie8DomDefine;
  var gOPD$5 = Object.getOwnPropertyDescriptor;

  _objectGopd.f = _descriptors ? gOPD$5 : function getOwnPropertyDescriptor(O, P) {
    O = toIObject$6(O);
    P = toPrimitive$4(P, true);
    if (IE8_DOM_DEFINE$1) try {
      return gOPD$5(O, P);
    } catch (e) { /* empty */ }
    if (has$9(O, P)) return createDesc$3(!pIE$1.f.call(O, P), O[P]);
  };

  // 7.1.13 ToObject(argument)
  var defined$5 = _defined;
  var _toObject = function (it) {
    return Object(defined$5(it));
  };

  var _shared = {exports: {}};

  var _core = {exports: {}};

  var hasRequired_core;

  function require_core () {
  	if (hasRequired_core) return _core.exports;
  	hasRequired_core = 1;
  	var core = _core.exports = { version: '2.6.12' };
  	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  	return _core.exports;
  }

  var _library = false;

  var core$3 = require_core();
  var global$d = _global.exports;
  var SHARED = '__core-js_shared__';
  var store$1 = global$d[SHARED] || (global$d[SHARED] = {});

  (_shared.exports = function (key, value) {
    return store$1[key] || (store$1[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: core$3.version,
    mode: 'global',
    copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
  });

  var id$1 = 0;
  var px = Math.random();
  var _uid = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$1 + px).toString(36));
  };

  var shared$1 = _shared.exports('keys');
  var uid$3 = _uid;
  var _sharedKey = function (key) {
    return shared$1[key] || (shared$1[key] = uid$3(key));
  };

  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
  var has$8 = _has;
  var toObject$7 = _toObject;
  var IE_PROTO$2 = _sharedKey('IE_PROTO');
  var ObjectProto$1 = Object.prototype;

  var _objectGpo = Object.getPrototypeOf || function (O) {
    O = toObject$7(O);
    if (has$8(O, IE_PROTO$2)) return O[IE_PROTO$2];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectProto$1 : null;
  };

  var _objectDp = {};

  var isObject$e = _isObject;
  var _anObject = function (it) {
    if (!isObject$e(it)) throw TypeError(it + ' is not an object!');
    return it;
  };

  var anObject$g = _anObject;
  var IE8_DOM_DEFINE = _ie8DomDefine;
  var toPrimitive$3 = _toPrimitive;
  var dP$8 = Object.defineProperty;

  _objectDp.f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    anObject$g(O);
    P = toPrimitive$3(P, true);
    anObject$g(Attributes);
    if (IE8_DOM_DEFINE) try {
      return dP$8(O, P, Attributes);
    } catch (e) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var dP$7 = _objectDp;
  var createDesc$2 = _propertyDesc;
  var _hide = _descriptors ? function (object, key, value) {
    return dP$7.f(object, key, createDesc$2(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var _redefine = {exports: {}};

  var _functionToString = _shared.exports('native-function-to-string', Function.toString);

  var global$c = _global.exports;
  var hide$5 = _hide;
  var has$7 = _has;
  var SRC = _uid('src');
  var $toString$2 = _functionToString;
  var TO_STRING$2 = 'toString';
  var TPL = ('' + $toString$2).split(TO_STRING$2);

  require_core().inspectSource = function (it) {
    return $toString$2.call(it);
  };

  (_redefine.exports = function (O, key, val, safe) {
    var isFunction = typeof val == 'function';
    if (isFunction) has$7(val, 'name') || hide$5(val, 'name', key);
    if (O[key] === val) return;
    if (isFunction) has$7(val, SRC) || hide$5(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    if (O === global$c) {
      O[key] = val;
    } else if (!safe) {
      delete O[key];
      hide$5(O, key, val);
    } else if (O[key]) {
      O[key] = val;
    } else {
      hide$5(O, key, val);
    }
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, TO_STRING$2, function toString() {
    return typeof this == 'function' && this[SRC] || $toString$2.call(this);
  });

  var _aFunction = function (it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };

  // optional / simple context binding
  var aFunction$6 = _aFunction;
  var _ctx = function (fn, that, length) {
    aFunction$6(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var global$b = _global.exports;
  var core$2 = require_core();
  var hide$4 = _hide;
  var redefine$5 = _redefine.exports;
  var ctx$7 = _ctx;
  var PROTOTYPE$3 = 'prototype';

  var $export$p = function (type, name, source) {
    var IS_FORCED = type & $export$p.F;
    var IS_GLOBAL = type & $export$p.G;
    var IS_STATIC = type & $export$p.S;
    var IS_PROTO = type & $export$p.P;
    var IS_BIND = type & $export$p.B;
    var target = IS_GLOBAL ? global$b : IS_STATIC ? global$b[name] || (global$b[name] = {}) : (global$b[name] || {})[PROTOTYPE$3];
    var exports = IS_GLOBAL ? core$2 : core$2[name] || (core$2[name] = {});
    var expProto = exports[PROTOTYPE$3] || (exports[PROTOTYPE$3] = {});
    var key, own, out, exp;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      // export native or passed
      out = (own ? target : source)[key];
      // bind timers to global for call from export context
      exp = IS_BIND && own ? ctx$7(out, global$b) : IS_PROTO && typeof out == 'function' ? ctx$7(Function.call, out) : out;
      // extend global
      if (target) redefine$5(target, key, out, type & $export$p.U);
      // export
      if (exports[key] != out) hide$4(exports, key, exp);
      if (IS_PROTO && expProto[key] != out) expProto[key] = out;
    }
  };
  global$b.core = core$2;
  // type bitmap
  $export$p.F = 1;   // forced
  $export$p.G = 2;   // global
  $export$p.S = 4;   // static
  $export$p.P = 8;   // proto
  $export$p.B = 16;  // bind
  $export$p.W = 32;  // wrap
  $export$p.U = 64;  // safe
  $export$p.R = 128; // real proto method for `library`
  var _export = $export$p;

  // 26.1.6 Reflect.get(target, propertyKey [, receiver])
  var gOPD$4 = _objectGopd;
  var getPrototypeOf$2 = _objectGpo;
  var has$6 = _has;
  var $export$o = _export;
  var isObject$d = _isObject;
  var anObject$f = _anObject;

  function get(target, propertyKey /* , receiver */) {
    var receiver = arguments.length < 3 ? target : arguments[2];
    var desc, proto;
    if (anObject$f(target) === receiver) return target[propertyKey];
    if (desc = gOPD$4.f(target, propertyKey)) return has$6(desc, 'value')
      ? desc.value
      : desc.get !== undefined
        ? desc.get.call(receiver)
        : undefined;
    if (isObject$d(proto = getPrototypeOf$2(target))) return get(proto, propertyKey, receiver);
  }

  $export$o($export$o.S, 'Reflect', { get: get });

  var _objectGopn = {};

  // 7.1.4 ToInteger
  var ceil = Math.ceil;
  var floor$1 = Math.floor;
  var _toInteger = function (it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor$1 : ceil)(it);
  };

  // 7.1.15 ToLength
  var toInteger$4 = _toInteger;
  var min$2 = Math.min;
  var _toLength = function (it) {
    return it > 0 ? min$2(toInteger$4(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  var toInteger$3 = _toInteger;
  var max$1 = Math.max;
  var min$1 = Math.min;
  var _toAbsoluteIndex = function (index, length) {
    index = toInteger$3(index);
    return index < 0 ? max$1(index + length, 0) : min$1(index, length);
  };

  // false -> Array#indexOf
  // true  -> Array#includes
  var toIObject$5 = _toIobject;
  var toLength$a = _toLength;
  var toAbsoluteIndex$2 = _toAbsoluteIndex;
  var _arrayIncludes = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIObject$5($this);
      var length = toLength$a(O.length);
      var index = toAbsoluteIndex$2(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var has$5 = _has;
  var toIObject$4 = _toIobject;
  var arrayIndexOf$1 = _arrayIncludes(false);
  var IE_PROTO$1 = _sharedKey('IE_PROTO');

  var _objectKeysInternal = function (object, names) {
    var O = toIObject$4(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) if (key != IE_PROTO$1) has$5(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has$5(O, key = names[i++])) {
      ~arrayIndexOf$1(result, key) || result.push(key);
    }
    return result;
  };

  // IE 8- don't enum bug keys
  var _enumBugKeys = (
    'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
  ).split(',');

  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
  var $keys$3 = _objectKeysInternal;
  var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

  _objectGopn.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return $keys$3(O, hiddenKeys);
  };

  var _objectGops = {};

  _objectGops.f = Object.getOwnPropertySymbols;

  // all object keys, includes non-enumerable and symbols
  var gOPN$5 = _objectGopn;
  var gOPS$1 = _objectGops;
  var anObject$e = _anObject;
  var Reflect = _global.exports.Reflect;
  var _ownKeys = Reflect && Reflect.ownKeys || function ownKeys(it) {
    var keys = gOPN$5.f(anObject$e(it));
    var getSymbols = gOPS$1.f;
    return getSymbols ? keys.concat(getSymbols(it)) : keys;
  };

  var $defineProperty$1 = _objectDp;
  var createDesc$1 = _propertyDesc;

  var _createProperty = function (object, index, value) {
    if (index in object) $defineProperty$1.f(object, index, createDesc$1(0, value));
    else object[index] = value;
  };

  // https://github.com/tc39/proposal-object-getownpropertydescriptors
  var $export$n = _export;
  var ownKeys = _ownKeys;
  var toIObject$3 = _toIobject;
  var gOPD$3 = _objectGopd;
  var createProperty$1 = _createProperty;

  $export$n($export$n.S, 'Object', {
    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
      var O = toIObject$3(object);
      var getDesc = gOPD$3.f;
      var keys = ownKeys(O);
      var result = {};
      var i = 0;
      var key, desc;
      while (keys.length > i) {
        desc = getDesc(O, key = keys[i++]);
        if (desc !== undefined) createProperty$1(result, key, desc);
      }
      return result;
    }
  });

  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
  var $keys$2 = _objectKeysInternal;
  var enumBugKeys$1 = _enumBugKeys;

  var _objectKeys = Object.keys || function keys(O) {
    return $keys$2(O, enumBugKeys$1);
  };

  var dP$6 = _objectDp;
  var anObject$d = _anObject;
  var getKeys$2 = _objectKeys;

  var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$d(O);
    var keys = getKeys$2(Properties);
    var length = keys.length;
    var i = 0;
    var P;
    while (length > i) dP$6.f(O, P = keys[i++], Properties[P]);
    return O;
  };

  var document$1 = _global.exports.document;
  var _html = document$1 && document$1.documentElement;

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
  var anObject$c = _anObject;
  var dPs = _objectDps;
  var enumBugKeys = _enumBugKeys;
  var IE_PROTO = _sharedKey('IE_PROTO');
  var Empty = function () { /* empty */ };
  var PROTOTYPE$2 = 'prototype';

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = require_domCreate()('iframe');
    var i = enumBugKeys.length;
    var lt = '<';
    var gt = '>';
    var iframeDocument;
    iframe.style.display = 'none';
    _html.appendChild(iframe);
    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (i--) delete createDict[PROTOTYPE$2][enumBugKeys[i]];
    return createDict();
  };

  var _objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      Empty[PROTOTYPE$2] = anObject$c(O);
      result = new Empty();
      Empty[PROTOTYPE$2] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO] = O;
    } else result = createDict();
    return Properties === undefined ? result : dPs(result, Properties);
  };

  // fast apply, http://jsperf.lnkit.com/fast-apply/5
  var _invoke = function (fn, args, that) {
    var un = that === undefined;
    switch (args.length) {
      case 0: return un ? fn()
                        : fn.call(that);
      case 1: return un ? fn(args[0])
                        : fn.call(that, args[0]);
      case 2: return un ? fn(args[0], args[1])
                        : fn.call(that, args[0], args[1]);
      case 3: return un ? fn(args[0], args[1], args[2])
                        : fn.call(that, args[0], args[1], args[2]);
      case 4: return un ? fn(args[0], args[1], args[2], args[3])
                        : fn.call(that, args[0], args[1], args[2], args[3]);
    } return fn.apply(that, args);
  };

  var aFunction$5 = _aFunction;
  var isObject$c = _isObject;
  var invoke$1 = _invoke;
  var arraySlice$2 = [].slice;
  var factories = {};

  var construct = function (F, len, args) {
    if (!(len in factories)) {
      for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
      // eslint-disable-next-line no-new-func
      factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
    } return factories[len](F, args);
  };

  var _bind = Function.bind || function bind(that /* , ...args */) {
    var fn = aFunction$5(this);
    var partArgs = arraySlice$2.call(arguments, 1);
    var bound = function (/* args... */) {
      var args = partArgs.concat(arraySlice$2.call(arguments));
      return this instanceof bound ? construct(fn, args.length, args) : invoke$1(fn, args, that);
    };
    if (isObject$c(fn.prototype)) bound.prototype = fn.prototype;
    return bound;
  };

  // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
  var $export$m = _export;
  var create$3 = _objectCreate;
  var aFunction$4 = _aFunction;
  var anObject$b = _anObject;
  var isObject$b = _isObject;
  var fails$9 = _fails;
  var bind = _bind;
  var rConstruct = (_global.exports.Reflect || {}).construct;

  // MS Edge supports only 2 arguments and argumentsList argument is optional
  // FF Nightly sets third argument as `new.target`, but does not create `this` from it
  var NEW_TARGET_BUG = fails$9(function () {
    function F() { /* empty */ }
    return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
  });
  var ARGS_BUG = !fails$9(function () {
    rConstruct(function () { /* empty */ });
  });

  $export$m($export$m.S + $export$m.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
    construct: function construct(Target, args /* , newTarget */) {
      aFunction$4(Target);
      anObject$b(args);
      var newTarget = arguments.length < 3 ? Target : aFunction$4(arguments[2]);
      if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
      if (Target == newTarget) {
        // w/o altered newTarget, optimization for 0-4 arguments
        switch (args.length) {
          case 0: return new Target();
          case 1: return new Target(args[0]);
          case 2: return new Target(args[0], args[1]);
          case 3: return new Target(args[0], args[1], args[2]);
          case 4: return new Target(args[0], args[1], args[2], args[3]);
        }
        // w/o altered newTarget, lot of arguments case
        var $args = [null];
        $args.push.apply($args, args);
        return new (bind.apply(Target, $args))();
      }
      // with altered newTarget, not support built-in constructors
      var proto = newTarget.prototype;
      var instance = create$3(isObject$b(proto) ? proto : Object.prototype);
      var result = Function.apply.call(Target, instance, args);
      return isObject$b(result) ? result : instance;
    }
  });

  var _mathSign;
  var hasRequired_mathSign;

  function require_mathSign () {
  	if (hasRequired_mathSign) return _mathSign;
  	hasRequired_mathSign = 1;
  	// 20.2.2.28 Math.sign(x)
  	_mathSign = Math.sign || function sign(x) {
  	  // eslint-disable-next-line no-self-compare
  	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
  	};
  	return _mathSign;
  }

  // 20.2.2.28 Math.sign(x)
  var $export$l = _export;

  $export$l($export$l.S, 'Math', { sign: require_mathSign() });

  // call something on iterator step with safe closing on error
  var anObject$a = _anObject;
  var _iterCall = function (iterator, fn, value, entries) {
    try {
      return entries ? fn(anObject$a(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
    } catch (e) {
      var ret = iterator['return'];
      if (ret !== undefined) anObject$a(ret.call(iterator));
      throw e;
    }
  };

  var _iterators = {};

  var _wks = {exports: {}};

  var store = _shared.exports('wks');
  var uid$2 = _uid;
  var Symbol$1 = _global.exports.Symbol;
  var USE_SYMBOL = typeof Symbol$1 == 'function';

  var $exports = _wks.exports = function (name) {
    return store[name] || (store[name] =
      USE_SYMBOL && Symbol$1[name] || (USE_SYMBOL ? Symbol$1 : uid$2)('Symbol.' + name));
  };

  $exports.store = store;

  // check on default Array iterator
  var Iterators$5 = _iterators;
  var ITERATOR$4 = _wks.exports('iterator');
  var ArrayProto$2 = Array.prototype;

  var _isArrayIter = function (it) {
    return it !== undefined && (Iterators$5.Array === it || ArrayProto$2[ITERATOR$4] === it);
  };

  // getting tag from 19.1.3.6 Object.prototype.toString()
  var cof$4 = _cof;
  var TAG$2 = _wks.exports('toStringTag');
  // ES3 wrong here
  var ARG = cof$4(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (e) { /* empty */ }
  };

  var _classof = function (it) {
    var O, T, B;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (T = tryGet(O = Object(it), TAG$2)) == 'string' ? T
      // builtinTag case
      : ARG ? cof$4(O)
      // ES3 arguments fallback
      : (B = cof$4(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };

  var classof$4 = _classof;
  var ITERATOR$3 = _wks.exports('iterator');
  var Iterators$4 = _iterators;
  var core_getIteratorMethod = require_core().getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$3]
      || it['@@iterator']
      || Iterators$4[classof$4(it)];
  };

  var _iterDetect;
  var hasRequired_iterDetect;

  function require_iterDetect () {
  	if (hasRequired_iterDetect) return _iterDetect;
  	hasRequired_iterDetect = 1;
  	var ITERATOR = _wks.exports('iterator');
  	var SAFE_CLOSING = false;

  	try {
  	  var riter = [7][ITERATOR]();
  	  riter['return'] = function () { SAFE_CLOSING = true; };
  	  // eslint-disable-next-line no-throw-literal
  	  Array.from(riter, function () { throw 2; });
  	} catch (e) { /* empty */ }

  	_iterDetect = function (exec, skipClosing) {
  	  if (!skipClosing && !SAFE_CLOSING) return false;
  	  var safe = false;
  	  try {
  	    var arr = [7];
  	    var iter = arr[ITERATOR]();
  	    iter.next = function () { return { done: safe = true }; };
  	    arr[ITERATOR] = function () { return iter; };
  	    exec(arr);
  	  } catch (e) { /* empty */ }
  	  return safe;
  	};
  	return _iterDetect;
  }

  var ctx$6 = _ctx;
  var $export$k = _export;
  var toObject$6 = _toObject;
  var call$1 = _iterCall;
  var isArrayIter$2 = _isArrayIter;
  var toLength$9 = _toLength;
  var createProperty = _createProperty;
  var getIterFn$2 = core_getIteratorMethod;

  $export$k($export$k.S + $export$k.F * !require_iterDetect()(function (iter) { Array.from(iter); }), 'Array', {
    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
    from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
      var O = toObject$6(arrayLike);
      var C = typeof this == 'function' ? this : Array;
      var aLen = arguments.length;
      var mapfn = aLen > 1 ? arguments[1] : undefined;
      var mapping = mapfn !== undefined;
      var index = 0;
      var iterFn = getIterFn$2(O);
      var length, result, step, iterator;
      if (mapping) mapfn = ctx$6(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
      // if object isn't iterable or it's array with default iterator - use simple case
      if (iterFn != undefined && !(C == Array && isArrayIter$2(iterFn))) {
        for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
          createProperty(result, index, mapping ? call$1(iterator, mapfn, [step.value, index], true) : step.value);
        }
      } else {
        length = toLength$9(O.length);
        for (result = new C(length); length > index; index++) {
          createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
        }
      }
      result.length = index;
      return result;
    }
  });

  // 7.2.2 IsArray(argument)
  var cof$3 = _cof;
  var _isArray = Array.isArray || function isArray(arg) {
    return cof$3(arg) == 'Array';
  };

  var isObject$a = _isObject;
  var isArray$1 = _isArray;
  var SPECIES$2 = _wks.exports('species');

  var _arraySpeciesConstructor = function (original) {
    var C;
    if (isArray$1(original)) {
      C = original.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray$1(C.prototype))) C = undefined;
      if (isObject$a(C)) {
        C = C[SPECIES$2];
        if (C === null) C = undefined;
      }
    } return C === undefined ? Array : C;
  };

  // 9.4.2.3 ArraySpeciesCreate(originalArray, length)
  var speciesConstructor$3 = _arraySpeciesConstructor;

  var _arraySpeciesCreate = function (original, length) {
    return new (speciesConstructor$3(original))(length);
  };

  // 0 -> Array#forEach
  // 1 -> Array#map
  // 2 -> Array#filter
  // 3 -> Array#some
  // 4 -> Array#every
  // 5 -> Array#find
  // 6 -> Array#findIndex
  var ctx$5 = _ctx;
  var IObject = _iobject;
  var toObject$5 = _toObject;
  var toLength$8 = _toLength;
  var asc = _arraySpeciesCreate;
  var _arrayMethods = function (TYPE, $create) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    var create = $create || asc;
    return function ($this, callbackfn, that) {
      var O = toObject$5($this);
      var self = IObject(O);
      var f = ctx$5(callbackfn, that, 3);
      var length = toLength$8(self.length);
      var index = 0;
      var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
      var val, res;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        val = self[index];
        res = f(val, index, O);
        if (TYPE) {
          if (IS_MAP) result[index] = res;   // map
          else if (res) switch (TYPE) {
            case 3: return true;             // some
            case 5: return val;              // find
            case 6: return index;            // findIndex
            case 2: result.push(val);        // filter
          } else if (IS_EVERY) return false; // every
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
    };
  };

  // 22.1.3.31 Array.prototype[@@unscopables]
  var UNSCOPABLES = _wks.exports('unscopables');
  var ArrayProto$1 = Array.prototype;
  if (ArrayProto$1[UNSCOPABLES] == undefined) _hide(ArrayProto$1, UNSCOPABLES, {});
  var _addToUnscopables = function (key) {
    ArrayProto$1[UNSCOPABLES][key] = true;
  };

  // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
  var $export$j = _export;
  var $find = _arrayMethods(5);
  var KEY = 'find';
  var forced = true;
  // Shouldn't skip holes
  if (KEY in []) Array(1)[KEY](function () { forced = false; });
  $export$j($export$j.P + $export$j.F * forced, 'Array', {
    find: function find(callbackfn /* , that = undefined */) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });
  _addToUnscopables(KEY);

  // 7.2.8 IsRegExp(argument)
  var isObject$9 = _isObject;
  var cof$2 = _cof;
  var MATCH = _wks.exports('match');
  var _isRegexp = function (it) {
    var isRegExp;
    return isObject$9(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof$2(it) == 'RegExp');
  };

  // helper for String#{startsWith, endsWith, includes}
  var isRegExp$2 = _isRegexp;
  var defined$4 = _defined;

  var _stringContext = function (that, searchString, NAME) {
    if (isRegExp$2(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
    return String(defined$4(that));
  };

  var _failsIsRegexp;
  var hasRequired_failsIsRegexp;

  function require_failsIsRegexp () {
  	if (hasRequired_failsIsRegexp) return _failsIsRegexp;
  	hasRequired_failsIsRegexp = 1;
  	var MATCH = _wks.exports('match');
  	_failsIsRegexp = function (KEY) {
  	  var re = /./;
  	  try {
  	    '/./'[KEY](re);
  	  } catch (e) {
  	    try {
  	      re[MATCH] = false;
  	      return !'/./'[KEY](re);
  	    } catch (f) { /* empty */ }
  	  } return true;
  	};
  	return _failsIsRegexp;
  }

  var $export$i = _export;
  var toLength$7 = _toLength;
  var context$2 = _stringContext;
  var ENDS_WITH = 'endsWith';
  var $endsWith = ''[ENDS_WITH];

  $export$i($export$i.P + $export$i.F * require_failsIsRegexp()(ENDS_WITH), 'String', {
    endsWith: function endsWith(searchString /* , endPosition = @length */) {
      var that = context$2(this, searchString, ENDS_WITH);
      var endPosition = arguments.length > 1 ? arguments[1] : undefined;
      var len = toLength$7(that.length);
      var end = endPosition === undefined ? len : Math.min(toLength$7(endPosition), len);
      var search = String(searchString);
      return $endsWith
        ? $endsWith.call(that, search, end)
        : that.slice(end - search.length, end) === search;
    }
  });

  var $export$h = _export;
  var fails$8 = _fails;
  var defined$3 = _defined;
  var quot = /"/g;
  // B.2.3.2.1 CreateHTML(string, tag, attribute, value)
  var createHTML = function (string, tag, attribute, value) {
    var S = String(defined$3(string));
    var p1 = '<' + tag;
    if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
    return p1 + '>' + S + '</' + tag + '>';
  };
  var _stringHtml = function (NAME, exec) {
    var O = {};
    O[NAME] = exec(createHTML);
    $export$h($export$h.P + $export$h.F * fails$8(function () {
      var test = ''[NAME]('"');
      return test !== test.toLowerCase() || test.split('"').length > 3;
    }), 'String', O);
  };

  // B.2.3.13 String.prototype.sub()
  _stringHtml('sub', function (createHTML) {
    return function sub() {
      return createHTML(this, 'sub', '', '');
    };
  });

  var _redefineAll;
  var hasRequired_redefineAll;

  function require_redefineAll () {
  	if (hasRequired_redefineAll) return _redefineAll;
  	hasRequired_redefineAll = 1;
  	var redefine = _redefine.exports;
  	_redefineAll = function (target, src, safe) {
  	  for (var key in src) redefine(target, key, src[key], safe);
  	  return target;
  	};
  	return _redefineAll;
  }

  var _anInstance = function (it, Constructor, name, forbiddenField) {
    if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
      throw TypeError(name + ': incorrect invocation!');
    } return it;
  };

  var _forOf = {exports: {}};

  var ctx$4 = _ctx;
  var call = _iterCall;
  var isArrayIter$1 = _isArrayIter;
  var anObject$9 = _anObject;
  var toLength$6 = _toLength;
  var getIterFn$1 = core_getIteratorMethod;
  var BREAK = {};
  var RETURN = {};
  var exports$1 = _forOf.exports = function (iterable, entries, fn, that, ITERATOR) {
    var iterFn = ITERATOR ? function () { return iterable; } : getIterFn$1(iterable);
    var f = ctx$4(fn, that, entries ? 2 : 1);
    var index = 0;
    var length, step, iterator, result;
    if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
    // fast case for arrays with default iterator
    if (isArrayIter$1(iterFn)) for (length = toLength$6(iterable.length); length > index; index++) {
      result = entries ? f(anObject$9(step = iterable[index])[0], step[1]) : f(iterable[index]);
      if (result === BREAK || result === RETURN) return result;
    } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
      result = call(iterator, f, step.value, entries);
      if (result === BREAK || result === RETURN) return result;
    }
  };
  exports$1.BREAK = BREAK;
  exports$1.RETURN = RETURN;

  var def = _objectDp.f;
  var has$4 = _has;
  var TAG$1 = _wks.exports('toStringTag');

  var _setToStringTag = function (it, tag, stat) {
    if (it && !has$4(it = stat ? it : it.prototype, TAG$1)) def(it, TAG$1, { configurable: true, value: tag });
  };

  var create$2 = _objectCreate;
  var descriptor = _propertyDesc;
  var setToStringTag$3 = _setToStringTag;
  var IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  _hide(IteratorPrototype, _wks.exports('iterator'), function () { return this; });

  var _iterCreate = function (Constructor, NAME, next) {
    Constructor.prototype = create$2(IteratorPrototype, { next: descriptor(1, next) });
    setToStringTag$3(Constructor, NAME + ' Iterator');
  };

  var $export$g = _export;
  var redefine$4 = _redefine.exports;
  var hide$3 = _hide;
  var Iterators$3 = _iterators;
  var $iterCreate = _iterCreate;
  var setToStringTag$2 = _setToStringTag;
  var getPrototypeOf$1 = _objectGpo;
  var ITERATOR$2 = _wks.exports('iterator');
  var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
  var FF_ITERATOR = '@@iterator';
  var KEYS = 'keys';
  var VALUES = 'values';

  var returnThis = function () { return this; };

  var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    $iterCreate(Constructor, NAME, next);
    var getMethod = function (kind) {
      if (!BUGGY && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS: return function keys() { return new Constructor(this, kind); };
        case VALUES: return function values() { return new Constructor(this, kind); };
      } return function entries() { return new Constructor(this, kind); };
    };
    var TAG = NAME + ' Iterator';
    var DEF_VALUES = DEFAULT == VALUES;
    var VALUES_BUG = false;
    var proto = Base.prototype;
    var $native = proto[ITERATOR$2] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
    var $default = $native || getMethod(DEFAULT);
    var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
    var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
    var methods, key, IteratorPrototype;
    // Fix native
    if ($anyNative) {
      IteratorPrototype = getPrototypeOf$1($anyNative.call(new Base()));
      if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        setToStringTag$2(IteratorPrototype, TAG, true);
        // fix for some old engines
        if (typeof IteratorPrototype[ITERATOR$2] != 'function') hide$3(IteratorPrototype, ITERATOR$2, returnThis);
      }
    }
    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEF_VALUES && $native && $native.name !== VALUES) {
      VALUES_BUG = true;
      $default = function values() { return $native.call(this); };
    }
    // Define iterator
    if ((BUGGY || VALUES_BUG || !proto[ITERATOR$2])) {
      hide$3(proto, ITERATOR$2, $default);
    }
    // Plug for library
    Iterators$3[NAME] = $default;
    Iterators$3[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: $entries
      };
      if (FORCED) for (key in methods) {
        if (!(key in proto)) redefine$4(proto, key, methods[key]);
      } else $export$g($export$g.P + $export$g.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };

  var _iterStep = function (done, value) {
    return { value: value, done: !!done };
  };

  var _setSpecies;
  var hasRequired_setSpecies;

  function require_setSpecies () {
  	if (hasRequired_setSpecies) return _setSpecies;
  	hasRequired_setSpecies = 1;
  	var global = _global.exports;
  	var dP = _objectDp;
  	var DESCRIPTORS = _descriptors;
  	var SPECIES = _wks.exports('species');

  	_setSpecies = function (KEY) {
  	  var C = global[KEY];
  	  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
  	    configurable: true,
  	    get: function () { return this; }
  	  });
  	};
  	return _setSpecies;
  }

  var _meta = {exports: {}};

  var META$1 = _uid('meta');
  var isObject$8 = _isObject;
  var has$3 = _has;
  var setDesc = _objectDp.f;
  var id = 0;
  var isExtensible = Object.isExtensible || function () {
    return true;
  };
  var FREEZE = !_fails(function () {
    return isExtensible(Object.preventExtensions({}));
  });
  var setMeta = function (it) {
    setDesc(it, META$1, { value: {
      i: 'O' + ++id, // object ID
      w: {}          // weak collections IDs
    } });
  };
  var fastKey$1 = function (it, create) {
    // return primitive with prefix
    if (!isObject$8(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!has$3(it, META$1)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMeta(it);
    // return object ID
    } return it[META$1].i;
  };
  var getWeak = function (it, create) {
    if (!has$3(it, META$1)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMeta(it);
    // return hash weak collections IDs
    } return it[META$1].w;
  };
  // add metadata on freeze-family methods calling
  var onFreeze = function (it) {
    if (FREEZE && meta$2.NEED && isExtensible(it) && !has$3(it, META$1)) setMeta(it);
    return it;
  };
  var meta$2 = _meta.exports = {
    KEY: META$1,
    NEED: false,
    fastKey: fastKey$1,
    getWeak: getWeak,
    onFreeze: onFreeze
  };

  var isObject$7 = _isObject;
  var _validateCollection = function (it, TYPE) {
    if (!isObject$7(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
    return it;
  };

  var dP$5 = _objectDp.f;
  var create$1 = _objectCreate;
  var redefineAll$2 = require_redefineAll();
  var ctx$3 = _ctx;
  var anInstance$3 = _anInstance;
  var forOf$2 = _forOf.exports;
  var $iterDefine = _iterDefine;
  var step$1 = _iterStep;
  var setSpecies$1 = require_setSpecies();
  var DESCRIPTORS$2 = _descriptors;
  var fastKey = _meta.exports.fastKey;
  var validate$3 = _validateCollection;
  var SIZE = DESCRIPTORS$2 ? '_s' : 'size';

  var getEntry = function (that, key) {
    // fast case
    var index = fastKey(key);
    var entry;
    if (index !== 'F') return that._i[index];
    // frozen object case
    for (entry = that._f; entry; entry = entry.n) {
      if (entry.k == key) return entry;
    }
  };

  var _collectionStrong = {
    getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance$3(that, C, NAME, '_i');
        that._t = NAME;         // collection type
        that._i = create$1(null); // index
        that._f = undefined;    // first entry
        that._l = undefined;    // last entry
        that[SIZE] = 0;         // size
        if (iterable != undefined) forOf$2(iterable, IS_MAP, that[ADDER], that);
      });
      redefineAll$2(C.prototype, {
        // 23.1.3.1 Map.prototype.clear()
        // 23.2.3.2 Set.prototype.clear()
        clear: function clear() {
          for (var that = validate$3(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
            entry.r = true;
            if (entry.p) entry.p = entry.p.n = undefined;
            delete data[entry.i];
          }
          that._f = that._l = undefined;
          that[SIZE] = 0;
        },
        // 23.1.3.3 Map.prototype.delete(key)
        // 23.2.3.4 Set.prototype.delete(value)
        'delete': function (key) {
          var that = validate$3(this, NAME);
          var entry = getEntry(that, key);
          if (entry) {
            var next = entry.n;
            var prev = entry.p;
            delete that._i[entry.i];
            entry.r = true;
            if (prev) prev.n = next;
            if (next) next.p = prev;
            if (that._f == entry) that._f = next;
            if (that._l == entry) that._l = prev;
            that[SIZE]--;
          } return !!entry;
        },
        // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
        // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
        forEach: function forEach(callbackfn /* , that = undefined */) {
          validate$3(this, NAME);
          var f = ctx$3(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
          var entry;
          while (entry = entry ? entry.n : this._f) {
            f(entry.v, entry.k, this);
            // revert to the last existing entry
            while (entry && entry.r) entry = entry.p;
          }
        },
        // 23.1.3.7 Map.prototype.has(key)
        // 23.2.3.7 Set.prototype.has(value)
        has: function has(key) {
          return !!getEntry(validate$3(this, NAME), key);
        }
      });
      if (DESCRIPTORS$2) dP$5(C.prototype, 'size', {
        get: function () {
          return validate$3(this, NAME)[SIZE];
        }
      });
      return C;
    },
    def: function (that, key, value) {
      var entry = getEntry(that, key);
      var prev, index;
      // change existing entry
      if (entry) {
        entry.v = value;
      // create new entry
      } else {
        that._l = entry = {
          i: index = fastKey(key, true), // <- index
          k: key,                        // <- key
          v: value,                      // <- value
          p: prev = that._l,             // <- previous entry
          n: undefined,                  // <- next entry
          r: false                       // <- removed
        };
        if (!that._f) that._f = entry;
        if (prev) prev.n = entry;
        that[SIZE]++;
        // add to index
        if (index !== 'F') that._i[index] = entry;
      } return that;
    },
    getEntry: getEntry,
    setStrong: function (C, NAME, IS_MAP) {
      // add .keys, .values, .entries, [@@iterator]
      // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
      $iterDefine(C, NAME, function (iterated, kind) {
        this._t = validate$3(iterated, NAME); // target
        this._k = kind;                     // kind
        this._l = undefined;                // previous
      }, function () {
        var that = this;
        var kind = that._k;
        var entry = that._l;
        // revert to the last existing entry
        while (entry && entry.r) entry = entry.p;
        // get next entry
        if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
          // or finish the iteration
          that._t = undefined;
          return step$1(1);
        }
        // return step by kind
        if (kind == 'keys') return step$1(0, entry.k);
        if (kind == 'values') return step$1(0, entry.v);
        return step$1(0, [entry.k, entry.v]);
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

      // add [@@species], 23.1.2.2, 23.2.2.2
      setSpecies$1(NAME);
    }
  };

  var _setProto;
  var hasRequired_setProto;

  function require_setProto () {
  	if (hasRequired_setProto) return _setProto;
  	hasRequired_setProto = 1;
  	// Works with __proto__ only. Old v8 can't work with null proto objects.
  	/* eslint-disable no-proto */
  	var isObject = _isObject;
  	var anObject = _anObject;
  	var check = function (O, proto) {
  	  anObject(O);
  	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
  	};
  	_setProto = {
  	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
  	    function (test, buggy, set) {
  	      try {
  	        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
  	        set(test, []);
  	        buggy = !(test instanceof Array);
  	      } catch (e) { buggy = true; }
  	      return function setPrototypeOf(O, proto) {
  	        check(O, proto);
  	        if (buggy) O.__proto__ = proto;
  	        else set(O, proto);
  	        return O;
  	      };
  	    }({}, false) : undefined),
  	  check: check
  	};
  	return _setProto;
  }

  var isObject$6 = _isObject;
  var setPrototypeOf = require_setProto().set;
  var _inheritIfRequired = function (that, target, C) {
    var S = target.constructor;
    var P;
    if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject$6(P) && setPrototypeOf) {
      setPrototypeOf(that, P);
    } return that;
  };

  var global$a = _global.exports;
  var $export$f = _export;
  var redefine$3 = _redefine.exports;
  var redefineAll$1 = require_redefineAll();
  var meta$1 = _meta.exports;
  var forOf$1 = _forOf.exports;
  var anInstance$2 = _anInstance;
  var isObject$5 = _isObject;
  var fails$7 = _fails;
  var $iterDetect$1 = require_iterDetect();
  var setToStringTag$1 = _setToStringTag;
  var inheritIfRequired$2 = _inheritIfRequired;

  var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
    var Base = global$a[NAME];
    var C = Base;
    var ADDER = IS_MAP ? 'set' : 'add';
    var proto = C && C.prototype;
    var O = {};
    var fixMethod = function (KEY) {
      var fn = proto[KEY];
      redefine$3(proto, KEY,
        KEY == 'delete' ? function (a) {
          return IS_WEAK && !isObject$5(a) ? false : fn.call(this, a === 0 ? 0 : a);
        } : KEY == 'has' ? function has(a) {
          return IS_WEAK && !isObject$5(a) ? false : fn.call(this, a === 0 ? 0 : a);
        } : KEY == 'get' ? function get(a) {
          return IS_WEAK && !isObject$5(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
        } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
          : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
      );
    };
    if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails$7(function () {
      new C().entries().next();
    }))) {
      // create collection constructor
      C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
      redefineAll$1(C.prototype, methods);
      meta$1.NEED = true;
    } else {
      var instance = new C();
      // early implementations not supports chaining
      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      var THROWS_ON_PRIMITIVES = fails$7(function () { instance.has(1); });
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      var ACCEPT_ITERABLES = $iterDetect$1(function (iter) { new C(iter); }); // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      var BUGGY_ZERO = !IS_WEAK && fails$7(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C();
        var index = 5;
        while (index--) $instance[ADDER](index, index);
        return !$instance.has(-0);
      });
      if (!ACCEPT_ITERABLES) {
        C = wrapper(function (target, iterable) {
          anInstance$2(target, C, NAME);
          var that = inheritIfRequired$2(new Base(), target, C);
          if (iterable != undefined) forOf$1(iterable, IS_MAP, that[ADDER], that);
          return that;
        });
        C.prototype = proto;
        proto.constructor = C;
      }
      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }
      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
      // weak collections should not contains .clear method
      if (IS_WEAK && proto.clear) delete proto.clear;
    }

    setToStringTag$1(C, NAME);

    O[NAME] = C;
    $export$f($export$f.G + $export$f.W + $export$f.F * (C != Base), O);

    if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

    return C;
  };

  var strong$1 = _collectionStrong;
  var validate$2 = _validateCollection;
  var SET = 'Set';

  // 23.2 Set Objects
  _collection(SET, function (get) {
    return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
  }, {
    // 23.2.3.1 Set.prototype.add(value)
    add: function add(value) {
      return strong$1.def(validate$2(this, SET), value = value === 0 ? 0 : value, value);
    }
  }, strong$1);

  var runtime = {exports: {}};

  /*!
   * regenerator-runtime v0.13.9
   * https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime
   *
   * Copyright (c) 2014-present, Facebook, Inc.
   * Released under the terms of MIT license
   */
  (function (module) {
  	var runtime = (function (exports) {

  	  var Op = Object.prototype;
  	  var hasOwn = Op.hasOwnProperty;
  	  var undefined$1; // More compressible than void 0.
  	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  	  function define(obj, key, value) {
  	    Object.defineProperty(obj, key, {
  	      value: value,
  	      enumerable: true,
  	      configurable: true,
  	      writable: true
  	    });
  	    return obj[key];
  	  }
  	  try {
  	    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
  	    define({}, "");
  	  } catch (err) {
  	    define = function(obj, key, value) {
  	      return obj[key] = value;
  	    };
  	  }

  	  function wrap(innerFn, outerFn, self, tryLocsList) {
  	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
  	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
  	    var generator = Object.create(protoGenerator.prototype);
  	    var context = new Context(tryLocsList || []);

  	    // The ._invoke method unifies the implementations of the .next,
  	    // .throw, and .return methods.
  	    generator._invoke = makeInvokeMethod(innerFn, self, context);

  	    return generator;
  	  }
  	  exports.wrap = wrap;

  	  // Try/catch helper to minimize deoptimizations. Returns a completion
  	  // record like context.tryEntries[i].completion. This interface could
  	  // have been (and was previously) designed to take a closure to be
  	  // invoked without arguments, but in all the cases we care about we
  	  // already have an existing method we want to call, so there's no need
  	  // to create a new function object. We can even get away with assuming
  	  // the method takes exactly one argument, since that happens to be true
  	  // in every case, so we don't have to touch the arguments object. The
  	  // only additional allocation required is the completion record, which
  	  // has a stable shape and so hopefully should be cheap to allocate.
  	  function tryCatch(fn, obj, arg) {
  	    try {
  	      return { type: "normal", arg: fn.call(obj, arg) };
  	    } catch (err) {
  	      return { type: "throw", arg: err };
  	    }
  	  }

  	  var GenStateSuspendedStart = "suspendedStart";
  	  var GenStateSuspendedYield = "suspendedYield";
  	  var GenStateExecuting = "executing";
  	  var GenStateCompleted = "completed";

  	  // Returning this object from the innerFn has the same effect as
  	  // breaking out of the dispatch switch statement.
  	  var ContinueSentinel = {};

  	  // Dummy constructor functions that we use as the .constructor and
  	  // .constructor.prototype properties for functions that return Generator
  	  // objects. For full spec compliance, you may wish to configure your
  	  // minifier not to mangle the names of these two functions.
  	  function Generator() {}
  	  function GeneratorFunction() {}
  	  function GeneratorFunctionPrototype() {}

  	  // This is a polyfill for %IteratorPrototype% for environments that
  	  // don't natively support it.
  	  var IteratorPrototype = {};
  	  define(IteratorPrototype, iteratorSymbol, function () {
  	    return this;
  	  });

  	  var getProto = Object.getPrototypeOf;
  	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  	  if (NativeIteratorPrototype &&
  	      NativeIteratorPrototype !== Op &&
  	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
  	    // This environment has a native %IteratorPrototype%; use it instead
  	    // of the polyfill.
  	    IteratorPrototype = NativeIteratorPrototype;
  	  }

  	  var Gp = GeneratorFunctionPrototype.prototype =
  	    Generator.prototype = Object.create(IteratorPrototype);
  	  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  	  define(Gp, "constructor", GeneratorFunctionPrototype);
  	  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  	  GeneratorFunction.displayName = define(
  	    GeneratorFunctionPrototype,
  	    toStringTagSymbol,
  	    "GeneratorFunction"
  	  );

  	  // Helper for defining the .next, .throw, and .return methods of the
  	  // Iterator interface in terms of a single ._invoke method.
  	  function defineIteratorMethods(prototype) {
  	    ["next", "throw", "return"].forEach(function(method) {
  	      define(prototype, method, function(arg) {
  	        return this._invoke(method, arg);
  	      });
  	    });
  	  }

  	  exports.isGeneratorFunction = function(genFun) {
  	    var ctor = typeof genFun === "function" && genFun.constructor;
  	    return ctor
  	      ? ctor === GeneratorFunction ||
  	        // For the native GeneratorFunction constructor, the best we can
  	        // do is to check its .name property.
  	        (ctor.displayName || ctor.name) === "GeneratorFunction"
  	      : false;
  	  };

  	  exports.mark = function(genFun) {
  	    if (Object.setPrototypeOf) {
  	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
  	    } else {
  	      genFun.__proto__ = GeneratorFunctionPrototype;
  	      define(genFun, toStringTagSymbol, "GeneratorFunction");
  	    }
  	    genFun.prototype = Object.create(Gp);
  	    return genFun;
  	  };

  	  // Within the body of any async function, `await x` is transformed to
  	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  	  // meant to be awaited.
  	  exports.awrap = function(arg) {
  	    return { __await: arg };
  	  };

  	  function AsyncIterator(generator, PromiseImpl) {
  	    function invoke(method, arg, resolve, reject) {
  	      var record = tryCatch(generator[method], generator, arg);
  	      if (record.type === "throw") {
  	        reject(record.arg);
  	      } else {
  	        var result = record.arg;
  	        var value = result.value;
  	        if (value &&
  	            typeof value === "object" &&
  	            hasOwn.call(value, "__await")) {
  	          return PromiseImpl.resolve(value.__await).then(function(value) {
  	            invoke("next", value, resolve, reject);
  	          }, function(err) {
  	            invoke("throw", err, resolve, reject);
  	          });
  	        }

  	        return PromiseImpl.resolve(value).then(function(unwrapped) {
  	          // When a yielded Promise is resolved, its final value becomes
  	          // the .value of the Promise<{value,done}> result for the
  	          // current iteration.
  	          result.value = unwrapped;
  	          resolve(result);
  	        }, function(error) {
  	          // If a rejected Promise was yielded, throw the rejection back
  	          // into the async generator function so it can be handled there.
  	          return invoke("throw", error, resolve, reject);
  	        });
  	      }
  	    }

  	    var previousPromise;

  	    function enqueue(method, arg) {
  	      function callInvokeWithMethodAndArg() {
  	        return new PromiseImpl(function(resolve, reject) {
  	          invoke(method, arg, resolve, reject);
  	        });
  	      }

  	      return previousPromise =
  	        // If enqueue has been called before, then we want to wait until
  	        // all previous Promises have been resolved before calling invoke,
  	        // so that results are always delivered in the correct order. If
  	        // enqueue has not been called before, then it is important to
  	        // call invoke immediately, without waiting on a callback to fire,
  	        // so that the async generator function has the opportunity to do
  	        // any necessary setup in a predictable way. This predictability
  	        // is why the Promise constructor synchronously invokes its
  	        // executor callback, and why async functions synchronously
  	        // execute code before the first await. Since we implement simple
  	        // async functions in terms of async generators, it is especially
  	        // important to get this right, even though it requires care.
  	        previousPromise ? previousPromise.then(
  	          callInvokeWithMethodAndArg,
  	          // Avoid propagating failures to Promises returned by later
  	          // invocations of the iterator.
  	          callInvokeWithMethodAndArg
  	        ) : callInvokeWithMethodAndArg();
  	    }

  	    // Define the unified helper method that is used to implement .next,
  	    // .throw, and .return (see defineIteratorMethods).
  	    this._invoke = enqueue;
  	  }

  	  defineIteratorMethods(AsyncIterator.prototype);
  	  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
  	    return this;
  	  });
  	  exports.AsyncIterator = AsyncIterator;

  	  // Note that simple async functions are implemented on top of
  	  // AsyncIterator objects; they just return a Promise for the value of
  	  // the final result produced by the iterator.
  	  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
  	    if (PromiseImpl === void 0) PromiseImpl = Promise;

  	    var iter = new AsyncIterator(
  	      wrap(innerFn, outerFn, self, tryLocsList),
  	      PromiseImpl
  	    );

  	    return exports.isGeneratorFunction(outerFn)
  	      ? iter // If outerFn is a generator, return the full iterator.
  	      : iter.next().then(function(result) {
  	          return result.done ? result.value : iter.next();
  	        });
  	  };

  	  function makeInvokeMethod(innerFn, self, context) {
  	    var state = GenStateSuspendedStart;

  	    return function invoke(method, arg) {
  	      if (state === GenStateExecuting) {
  	        throw new Error("Generator is already running");
  	      }

  	      if (state === GenStateCompleted) {
  	        if (method === "throw") {
  	          throw arg;
  	        }

  	        // Be forgiving, per 25.3.3.3.3 of the spec:
  	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
  	        return doneResult();
  	      }

  	      context.method = method;
  	      context.arg = arg;

  	      while (true) {
  	        var delegate = context.delegate;
  	        if (delegate) {
  	          var delegateResult = maybeInvokeDelegate(delegate, context);
  	          if (delegateResult) {
  	            if (delegateResult === ContinueSentinel) continue;
  	            return delegateResult;
  	          }
  	        }

  	        if (context.method === "next") {
  	          // Setting context._sent for legacy support of Babel's
  	          // function.sent implementation.
  	          context.sent = context._sent = context.arg;

  	        } else if (context.method === "throw") {
  	          if (state === GenStateSuspendedStart) {
  	            state = GenStateCompleted;
  	            throw context.arg;
  	          }

  	          context.dispatchException(context.arg);

  	        } else if (context.method === "return") {
  	          context.abrupt("return", context.arg);
  	        }

  	        state = GenStateExecuting;

  	        var record = tryCatch(innerFn, self, context);
  	        if (record.type === "normal") {
  	          // If an exception is thrown from innerFn, we leave state ===
  	          // GenStateExecuting and loop back for another invocation.
  	          state = context.done
  	            ? GenStateCompleted
  	            : GenStateSuspendedYield;

  	          if (record.arg === ContinueSentinel) {
  	            continue;
  	          }

  	          return {
  	            value: record.arg,
  	            done: context.done
  	          };

  	        } else if (record.type === "throw") {
  	          state = GenStateCompleted;
  	          // Dispatch the exception by looping back around to the
  	          // context.dispatchException(context.arg) call above.
  	          context.method = "throw";
  	          context.arg = record.arg;
  	        }
  	      }
  	    };
  	  }

  	  // Call delegate.iterator[context.method](context.arg) and handle the
  	  // result, either by returning a { value, done } result from the
  	  // delegate iterator, or by modifying context.method and context.arg,
  	  // setting context.delegate to null, and returning the ContinueSentinel.
  	  function maybeInvokeDelegate(delegate, context) {
  	    var method = delegate.iterator[context.method];
  	    if (method === undefined$1) {
  	      // A .throw or .return when the delegate iterator has no .throw
  	      // method always terminates the yield* loop.
  	      context.delegate = null;

  	      if (context.method === "throw") {
  	        // Note: ["return"] must be used for ES3 parsing compatibility.
  	        if (delegate.iterator["return"]) {
  	          // If the delegate iterator has a return method, give it a
  	          // chance to clean up.
  	          context.method = "return";
  	          context.arg = undefined$1;
  	          maybeInvokeDelegate(delegate, context);

  	          if (context.method === "throw") {
  	            // If maybeInvokeDelegate(context) changed context.method from
  	            // "return" to "throw", let that override the TypeError below.
  	            return ContinueSentinel;
  	          }
  	        }

  	        context.method = "throw";
  	        context.arg = new TypeError(
  	          "The iterator does not provide a 'throw' method");
  	      }

  	      return ContinueSentinel;
  	    }

  	    var record = tryCatch(method, delegate.iterator, context.arg);

  	    if (record.type === "throw") {
  	      context.method = "throw";
  	      context.arg = record.arg;
  	      context.delegate = null;
  	      return ContinueSentinel;
  	    }

  	    var info = record.arg;

  	    if (! info) {
  	      context.method = "throw";
  	      context.arg = new TypeError("iterator result is not an object");
  	      context.delegate = null;
  	      return ContinueSentinel;
  	    }

  	    if (info.done) {
  	      // Assign the result of the finished delegate to the temporary
  	      // variable specified by delegate.resultName (see delegateYield).
  	      context[delegate.resultName] = info.value;

  	      // Resume execution at the desired location (see delegateYield).
  	      context.next = delegate.nextLoc;

  	      // If context.method was "throw" but the delegate handled the
  	      // exception, let the outer generator proceed normally. If
  	      // context.method was "next", forget context.arg since it has been
  	      // "consumed" by the delegate iterator. If context.method was
  	      // "return", allow the original .return call to continue in the
  	      // outer generator.
  	      if (context.method !== "return") {
  	        context.method = "next";
  	        context.arg = undefined$1;
  	      }

  	    } else {
  	      // Re-yield the result returned by the delegate method.
  	      return info;
  	    }

  	    // The delegate iterator is finished, so forget it and continue with
  	    // the outer generator.
  	    context.delegate = null;
  	    return ContinueSentinel;
  	  }

  	  // Define Generator.prototype.{next,throw,return} in terms of the
  	  // unified ._invoke helper method.
  	  defineIteratorMethods(Gp);

  	  define(Gp, toStringTagSymbol, "Generator");

  	  // A Generator should always return itself as the iterator object when the
  	  // @@iterator function is called on it. Some browsers' implementations of the
  	  // iterator prototype chain incorrectly implement this, causing the Generator
  	  // object to not be returned from this call. This ensures that doesn't happen.
  	  // See https://github.com/facebook/regenerator/issues/274 for more details.
  	  define(Gp, iteratorSymbol, function() {
  	    return this;
  	  });

  	  define(Gp, "toString", function() {
  	    return "[object Generator]";
  	  });

  	  function pushTryEntry(locs) {
  	    var entry = { tryLoc: locs[0] };

  	    if (1 in locs) {
  	      entry.catchLoc = locs[1];
  	    }

  	    if (2 in locs) {
  	      entry.finallyLoc = locs[2];
  	      entry.afterLoc = locs[3];
  	    }

  	    this.tryEntries.push(entry);
  	  }

  	  function resetTryEntry(entry) {
  	    var record = entry.completion || {};
  	    record.type = "normal";
  	    delete record.arg;
  	    entry.completion = record;
  	  }

  	  function Context(tryLocsList) {
  	    // The root entry object (effectively a try statement without a catch
  	    // or a finally block) gives us a place to store values thrown from
  	    // locations where there is no enclosing try statement.
  	    this.tryEntries = [{ tryLoc: "root" }];
  	    tryLocsList.forEach(pushTryEntry, this);
  	    this.reset(true);
  	  }

  	  exports.keys = function(object) {
  	    var keys = [];
  	    for (var key in object) {
  	      keys.push(key);
  	    }
  	    keys.reverse();

  	    // Rather than returning an object with a next method, we keep
  	    // things simple and return the next function itself.
  	    return function next() {
  	      while (keys.length) {
  	        var key = keys.pop();
  	        if (key in object) {
  	          next.value = key;
  	          next.done = false;
  	          return next;
  	        }
  	      }

  	      // To avoid creating an additional object, we just hang the .value
  	      // and .done properties off the next function object itself. This
  	      // also ensures that the minifier will not anonymize the function.
  	      next.done = true;
  	      return next;
  	    };
  	  };

  	  function values(iterable) {
  	    if (iterable) {
  	      var iteratorMethod = iterable[iteratorSymbol];
  	      if (iteratorMethod) {
  	        return iteratorMethod.call(iterable);
  	      }

  	      if (typeof iterable.next === "function") {
  	        return iterable;
  	      }

  	      if (!isNaN(iterable.length)) {
  	        var i = -1, next = function next() {
  	          while (++i < iterable.length) {
  	            if (hasOwn.call(iterable, i)) {
  	              next.value = iterable[i];
  	              next.done = false;
  	              return next;
  	            }
  	          }

  	          next.value = undefined$1;
  	          next.done = true;

  	          return next;
  	        };

  	        return next.next = next;
  	      }
  	    }

  	    // Return an iterator with no values.
  	    return { next: doneResult };
  	  }
  	  exports.values = values;

  	  function doneResult() {
  	    return { value: undefined$1, done: true };
  	  }

  	  Context.prototype = {
  	    constructor: Context,

  	    reset: function(skipTempReset) {
  	      this.prev = 0;
  	      this.next = 0;
  	      // Resetting context._sent for legacy support of Babel's
  	      // function.sent implementation.
  	      this.sent = this._sent = undefined$1;
  	      this.done = false;
  	      this.delegate = null;

  	      this.method = "next";
  	      this.arg = undefined$1;

  	      this.tryEntries.forEach(resetTryEntry);

  	      if (!skipTempReset) {
  	        for (var name in this) {
  	          // Not sure about the optimal order of these conditions:
  	          if (name.charAt(0) === "t" &&
  	              hasOwn.call(this, name) &&
  	              !isNaN(+name.slice(1))) {
  	            this[name] = undefined$1;
  	          }
  	        }
  	      }
  	    },

  	    stop: function() {
  	      this.done = true;

  	      var rootEntry = this.tryEntries[0];
  	      var rootRecord = rootEntry.completion;
  	      if (rootRecord.type === "throw") {
  	        throw rootRecord.arg;
  	      }

  	      return this.rval;
  	    },

  	    dispatchException: function(exception) {
  	      if (this.done) {
  	        throw exception;
  	      }

  	      var context = this;
  	      function handle(loc, caught) {
  	        record.type = "throw";
  	        record.arg = exception;
  	        context.next = loc;

  	        if (caught) {
  	          // If the dispatched exception was caught by a catch block,
  	          // then let that catch block handle the exception normally.
  	          context.method = "next";
  	          context.arg = undefined$1;
  	        }

  	        return !! caught;
  	      }

  	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
  	        var entry = this.tryEntries[i];
  	        var record = entry.completion;

  	        if (entry.tryLoc === "root") {
  	          // Exception thrown outside of any try block that could handle
  	          // it, so set the completion value of the entire function to
  	          // throw the exception.
  	          return handle("end");
  	        }

  	        if (entry.tryLoc <= this.prev) {
  	          var hasCatch = hasOwn.call(entry, "catchLoc");
  	          var hasFinally = hasOwn.call(entry, "finallyLoc");

  	          if (hasCatch && hasFinally) {
  	            if (this.prev < entry.catchLoc) {
  	              return handle(entry.catchLoc, true);
  	            } else if (this.prev < entry.finallyLoc) {
  	              return handle(entry.finallyLoc);
  	            }

  	          } else if (hasCatch) {
  	            if (this.prev < entry.catchLoc) {
  	              return handle(entry.catchLoc, true);
  	            }

  	          } else if (hasFinally) {
  	            if (this.prev < entry.finallyLoc) {
  	              return handle(entry.finallyLoc);
  	            }

  	          } else {
  	            throw new Error("try statement without catch or finally");
  	          }
  	        }
  	      }
  	    },

  	    abrupt: function(type, arg) {
  	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
  	        var entry = this.tryEntries[i];
  	        if (entry.tryLoc <= this.prev &&
  	            hasOwn.call(entry, "finallyLoc") &&
  	            this.prev < entry.finallyLoc) {
  	          var finallyEntry = entry;
  	          break;
  	        }
  	      }

  	      if (finallyEntry &&
  	          (type === "break" ||
  	           type === "continue") &&
  	          finallyEntry.tryLoc <= arg &&
  	          arg <= finallyEntry.finallyLoc) {
  	        // Ignore the finally entry if control is not jumping to a
  	        // location outside the try/catch block.
  	        finallyEntry = null;
  	      }

  	      var record = finallyEntry ? finallyEntry.completion : {};
  	      record.type = type;
  	      record.arg = arg;

  	      if (finallyEntry) {
  	        this.method = "next";
  	        this.next = finallyEntry.finallyLoc;
  	        return ContinueSentinel;
  	      }

  	      return this.complete(record);
  	    },

  	    complete: function(record, afterLoc) {
  	      if (record.type === "throw") {
  	        throw record.arg;
  	      }

  	      if (record.type === "break" ||
  	          record.type === "continue") {
  	        this.next = record.arg;
  	      } else if (record.type === "return") {
  	        this.rval = this.arg = record.arg;
  	        this.method = "return";
  	        this.next = "end";
  	      } else if (record.type === "normal" && afterLoc) {
  	        this.next = afterLoc;
  	      }

  	      return ContinueSentinel;
  	    },

  	    finish: function(finallyLoc) {
  	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
  	        var entry = this.tryEntries[i];
  	        if (entry.finallyLoc === finallyLoc) {
  	          this.complete(entry.completion, entry.afterLoc);
  	          resetTryEntry(entry);
  	          return ContinueSentinel;
  	        }
  	      }
  	    },

  	    "catch": function(tryLoc) {
  	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
  	        var entry = this.tryEntries[i];
  	        if (entry.tryLoc === tryLoc) {
  	          var record = entry.completion;
  	          if (record.type === "throw") {
  	            var thrown = record.arg;
  	            resetTryEntry(entry);
  	          }
  	          return thrown;
  	        }
  	      }

  	      // The context.catch method must only be called with a location
  	      // argument that corresponds to a known catch block.
  	      throw new Error("illegal catch attempt");
  	    },

  	    delegateYield: function(iterable, resultName, nextLoc) {
  	      this.delegate = {
  	        iterator: values(iterable),
  	        resultName: resultName,
  	        nextLoc: nextLoc
  	      };

  	      if (this.method === "next") {
  	        // Deliberately forget the last sent value so that we don't
  	        // accidentally pass it on to the delegate.
  	        this.arg = undefined$1;
  	      }

  	      return ContinueSentinel;
  	    }
  	  };

  	  // Regardless of whether this script is executing as a CommonJS module
  	  // or not, return the runtime object so that we can declare the variable
  	  // regeneratorRuntime in the outer scope, which allows this module to be
  	  // injected easily by `bin/regenerator --include-runtime script.js`.
  	  return exports;

  	}(
  	  // If this script is executing as a CommonJS module, use module.exports
  	  // as the regeneratorRuntime namespace. Otherwise create a new empty
  	  // object. Either way, the resulting object will be used to initialize
  	  // the regeneratorRuntime variable at the top of this file.
  	  module.exports
  	));

  	try {
  	  regeneratorRuntime = runtime;
  	} catch (accidentalStrictMode) {
  	  // This module should not be running in strict mode, so the above
  	  // assignment should always work unless something is misconfigured. Just
  	  // in case runtime.js accidentally runs in strict mode, in modern engines
  	  // we can explicitly access globalThis. In older engines we can escape
  	  // strict mode using a global Function call. This could conceivably fail
  	  // if a Content Security Policy forbids using Function, but in that case
  	  // the proper solution is to fix the accidental strict mode problem. If
  	  // you've misconfigured your bundler to force strict mode and applied a
  	  // CSP to forbid Function, and you're not willing to fix either of those
  	  // problems, please detail your unique predicament in a GitHub issue.
  	  if (typeof globalThis === "object") {
  	    globalThis.regeneratorRuntime = runtime;
  	  } else {
  	    Function("r", "regeneratorRuntime = r")(runtime);
  	  }
  	}
  } (runtime));

  // 7.3.20 SpeciesConstructor(O, defaultConstructor)
  var anObject$8 = _anObject;
  var aFunction$3 = _aFunction;
  var SPECIES$1 = _wks.exports('species');
  var _speciesConstructor = function (O, D) {
    var C = anObject$8(O).constructor;
    var S;
    return C === undefined || (S = anObject$8(C)[SPECIES$1]) == undefined ? D : aFunction$3(S);
  };

  var ctx$2 = _ctx;
  var invoke = _invoke;
  var html$1 = _html;
  var cel = require_domCreate();
  var global$9 = _global.exports;
  var process$2 = global$9.process;
  var setTask = global$9.setImmediate;
  var clearTask = global$9.clearImmediate;
  var MessageChannel = global$9.MessageChannel;
  var Dispatch = global$9.Dispatch;
  var counter = 0;
  var queue = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var defer, channel, port;
  var run = function () {
    var id = +this;
    // eslint-disable-next-line no-prototype-builtins
    if (queue.hasOwnProperty(id)) {
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  };
  var listener = function (event) {
    run.call(event.data);
  };
  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!setTask || !clearTask) {
    setTask = function setImmediate(fn) {
      var args = [];
      var i = 1;
      while (arguments.length > i) args.push(arguments[i++]);
      queue[++counter] = function () {
        // eslint-disable-next-line no-new-func
        invoke(typeof fn == 'function' ? fn : Function(fn), args);
      };
      defer(counter);
      return counter;
    };
    clearTask = function clearImmediate(id) {
      delete queue[id];
    };
    // Node.js 0.8-
    if (_cof(process$2) == 'process') {
      defer = function (id) {
        process$2.nextTick(ctx$2(run, id, 1));
      };
    // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(ctx$2(run, id, 1));
      };
    // Browsers with MessageChannel, includes WebWorkers
    } else if (MessageChannel) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = ctx$2(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (global$9.addEventListener && typeof postMessage == 'function' && !global$9.importScripts) {
      defer = function (id) {
        global$9.postMessage(id + '', '*');
      };
      global$9.addEventListener('message', listener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in cel('script')) {
      defer = function (id) {
        html$1.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
          html$1.removeChild(this);
          run.call(id);
        };
      };
    // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(ctx$2(run, id, 1), 0);
      };
    }
  }
  var _task = {
    set: setTask,
    clear: clearTask
  };

  var global$8 = _global.exports;
  var macrotask = _task.set;
  var Observer = global$8.MutationObserver || global$8.WebKitMutationObserver;
  var process$1 = global$8.process;
  var Promise$1 = global$8.Promise;
  var isNode$1 = _cof(process$1) == 'process';

  var _microtask = function () {
    var head, last, notify;

    var flush = function () {
      var parent, fn;
      if (isNode$1 && (parent = process$1.domain)) parent.exit();
      while (head) {
        fn = head.fn;
        head = head.next;
        try {
          fn();
        } catch (e) {
          if (head) notify();
          else last = undefined;
          throw e;
        }
      } last = undefined;
      if (parent) parent.enter();
    };

    // Node.js
    if (isNode$1) {
      notify = function () {
        process$1.nextTick(flush);
      };
    // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
    } else if (Observer && !(global$8.navigator && global$8.navigator.standalone)) {
      var toggle = true;
      var node = document.createTextNode('');
      new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
      notify = function () {
        node.data = toggle = !toggle;
      };
    // environments with maybe non-completely correct, but existent Promise
    } else if (Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      var promise = Promise$1.resolve(undefined);
      notify = function () {
        promise.then(flush);
      };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
    } else {
      notify = function () {
        // strange IE + webpack dev server bug - use .call(global)
        macrotask.call(global$8, flush);
      };
    }

    return function (fn) {
      var task = { fn: fn, next: undefined };
      if (last) last.next = task;
      if (!head) {
        head = task;
        notify();
      } last = task;
    };
  };

  var _newPromiseCapability = {};

  // 25.4.1.5 NewPromiseCapability(C)
  var aFunction$2 = _aFunction;

  function PromiseCapability(C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aFunction$2(resolve);
    this.reject = aFunction$2(reject);
  }

  _newPromiseCapability.f = function (C) {
    return new PromiseCapability(C);
  };

  var _perform = function (exec) {
    try {
      return { e: false, v: exec() };
    } catch (e) {
      return { e: true, v: e };
    }
  };

  var global$7 = _global.exports;
  var navigator = global$7.navigator;

  var _userAgent = navigator && navigator.userAgent || '';

  var anObject$7 = _anObject;
  var isObject$4 = _isObject;
  var newPromiseCapability$1 = _newPromiseCapability;

  var _promiseResolve = function (C, x) {
    anObject$7(C);
    if (isObject$4(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability$1.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var global$6 = _global.exports;
  var ctx$1 = _ctx;
  var classof$3 = _classof;
  var $export$e = _export;
  var isObject$3 = _isObject;
  var aFunction$1 = _aFunction;
  var anInstance$1 = _anInstance;
  var forOf = _forOf.exports;
  var speciesConstructor$2 = _speciesConstructor;
  var task = _task.set;
  var microtask = _microtask();
  var newPromiseCapabilityModule = _newPromiseCapability;
  var perform = _perform;
  var userAgent = _userAgent;
  var promiseResolve = _promiseResolve;
  var PROMISE = 'Promise';
  var TypeError$2 = global$6.TypeError;
  var process = global$6.process;
  var versions = process && process.versions;
  var v8 = versions && versions.v8 || '';
  var $Promise = global$6[PROMISE];
  var isNode = classof$3(process) == 'process';
  var empty = function () { /* empty */ };
  var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
  var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

  var USE_NATIVE$1 = !!function () {
    try {
      // correct subclassing with @@species support
      var promise = $Promise.resolve(1);
      var FakePromise = (promise.constructor = {})[_wks.exports('species')] = function (exec) {
        exec(empty, empty);
      };
      // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
      return (isNode || typeof PromiseRejectionEvent == 'function')
        && promise.then(empty) instanceof FakePromise
        // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
        // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
        // we can't detect it synchronously, so just check versions
        && v8.indexOf('6.6') !== 0
        && userAgent.indexOf('Chrome/66') === -1;
    } catch (e) { /* empty */ }
  }();

  // helpers
  var isThenable = function (it) {
    var then;
    return isObject$3(it) && typeof (then = it.then) == 'function' ? then : false;
  };
  var notify = function (promise, isReject) {
    if (promise._n) return;
    promise._n = true;
    var chain = promise._c;
    microtask(function () {
      var value = promise._v;
      var ok = promise._s == 1;
      var i = 0;
      var run = function (reaction) {
        var handler = ok ? reaction.ok : reaction.fail;
        var resolve = reaction.resolve;
        var reject = reaction.reject;
        var domain = reaction.domain;
        var result, then, exited;
        try {
          if (handler) {
            if (!ok) {
              if (promise._h == 2) onHandleUnhandled(promise);
              promise._h = 1;
            }
            if (handler === true) result = value;
            else {
              if (domain) domain.enter();
              result = handler(value); // may throw
              if (domain) {
                domain.exit();
                exited = true;
              }
            }
            if (result === reaction.promise) {
              reject(TypeError$2('Promise-chain cycle'));
            } else if (then = isThenable(result)) {
              then.call(result, resolve, reject);
            } else resolve(result);
          } else reject(value);
        } catch (e) {
          if (domain && !exited) domain.exit();
          reject(e);
        }
      };
      while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
      promise._c = [];
      promise._n = false;
      if (isReject && !promise._h) onUnhandled(promise);
    });
  };
  var onUnhandled = function (promise) {
    task.call(global$6, function () {
      var value = promise._v;
      var unhandled = isUnhandled(promise);
      var result, handler, console;
      if (unhandled) {
        result = perform(function () {
          if (isNode) {
            process.emit('unhandledRejection', value, promise);
          } else if (handler = global$6.onunhandledrejection) {
            handler({ promise: promise, reason: value });
          } else if ((console = global$6.console) && console.error) {
            console.error('Unhandled promise rejection', value);
          }
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        promise._h = isNode || isUnhandled(promise) ? 2 : 1;
      } promise._a = undefined;
      if (unhandled && result.e) throw result.v;
    });
  };
  var isUnhandled = function (promise) {
    return promise._h !== 1 && (promise._a || promise._c).length === 0;
  };
  var onHandleUnhandled = function (promise) {
    task.call(global$6, function () {
      var handler;
      if (isNode) {
        process.emit('rejectionHandled', promise);
      } else if (handler = global$6.onrejectionhandled) {
        handler({ promise: promise, reason: promise._v });
      }
    });
  };
  var $reject = function (value) {
    var promise = this;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap
    promise._v = value;
    promise._s = 2;
    if (!promise._a) promise._a = promise._c.slice();
    notify(promise, true);
  };
  var $resolve = function (value) {
    var promise = this;
    var then;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap
    try {
      if (promise === value) throw TypeError$2("Promise can't be resolved itself");
      if (then = isThenable(value)) {
        microtask(function () {
          var wrapper = { _w: promise, _d: false }; // wrap
          try {
            then.call(value, ctx$1($resolve, wrapper, 1), ctx$1($reject, wrapper, 1));
          } catch (e) {
            $reject.call(wrapper, e);
          }
        });
      } else {
        promise._v = value;
        promise._s = 1;
        notify(promise, false);
      }
    } catch (e) {
      $reject.call({ _w: promise, _d: false }, e); // wrap
    }
  };

  // constructor polyfill
  if (!USE_NATIVE$1) {
    // 25.4.3.1 Promise(executor)
    $Promise = function Promise(executor) {
      anInstance$1(this, $Promise, PROMISE, '_h');
      aFunction$1(executor);
      Internal.call(this);
      try {
        executor(ctx$1($resolve, this, 1), ctx$1($reject, this, 1));
      } catch (err) {
        $reject.call(this, err);
      }
    };
    // eslint-disable-next-line no-unused-vars
    Internal = function Promise(executor) {
      this._c = [];             // <- awaiting reactions
      this._a = undefined;      // <- checked in isUnhandled reactions
      this._s = 0;              // <- state
      this._d = false;          // <- done
      this._v = undefined;      // <- value
      this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
      this._n = false;          // <- notify
    };
    Internal.prototype = require_redefineAll()($Promise.prototype, {
      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
      then: function then(onFulfilled, onRejected) {
        var reaction = newPromiseCapability(speciesConstructor$2(this, $Promise));
        reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
        reaction.fail = typeof onRejected == 'function' && onRejected;
        reaction.domain = isNode ? process.domain : undefined;
        this._c.push(reaction);
        if (this._a) this._a.push(reaction);
        if (this._s) notify(this, false);
        return reaction.promise;
      },
      // 25.4.5.1 Promise.prototype.catch(onRejected)
      'catch': function (onRejected) {
        return this.then(undefined, onRejected);
      }
    });
    OwnPromiseCapability = function () {
      var promise = new Internal();
      this.promise = promise;
      this.resolve = ctx$1($resolve, promise, 1);
      this.reject = ctx$1($reject, promise, 1);
    };
    newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
      return C === $Promise || C === Wrapper
        ? new OwnPromiseCapability(C)
        : newGenericPromiseCapability(C);
    };
  }

  $export$e($export$e.G + $export$e.W + $export$e.F * !USE_NATIVE$1, { Promise: $Promise });
  _setToStringTag($Promise, PROMISE);
  require_setSpecies()(PROMISE);
  Wrapper = require_core()[PROMISE];

  // statics
  $export$e($export$e.S + $export$e.F * !USE_NATIVE$1, PROMISE, {
    // 25.4.4.5 Promise.reject(r)
    reject: function reject(r) {
      var capability = newPromiseCapability(this);
      var $$reject = capability.reject;
      $$reject(r);
      return capability.promise;
    }
  });
  $export$e($export$e.S + $export$e.F * (!USE_NATIVE$1), PROMISE, {
    // 25.4.4.6 Promise.resolve(x)
    resolve: function resolve(x) {
      return promiseResolve(this, x);
    }
  });
  $export$e($export$e.S + $export$e.F * !(USE_NATIVE$1 && require_iterDetect()(function (iter) {
    $Promise.all(iter)['catch'](empty);
  })), PROMISE, {
    // 25.4.4.1 Promise.all(iterable)
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform(function () {
        var values = [];
        var index = 0;
        var remaining = 1;
        forOf(iterable, false, function (promise) {
          var $index = index++;
          var alreadyCalled = false;
          values.push(undefined);
          remaining++;
          C.resolve(promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[$index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.e) reject(result.v);
      return capability.promise;
    },
    // 25.4.4.4 Promise.race(iterable)
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var reject = capability.reject;
      var result = perform(function () {
        forOf(iterable, false, function (promise) {
          C.resolve(promise).then(capability.resolve, reject);
        });
      });
      if (result.e) reject(result.v);
      return capability.promise;
    }
  });

  // 21.2.5.3 get RegExp.prototype.flags
  var anObject$6 = _anObject;
  var _flags = function () {
    var that = anObject$6(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var global$5 = _global.exports;
  var inheritIfRequired$1 = _inheritIfRequired;
  var dP$4 = _objectDp.f;
  var gOPN$4 = _objectGopn.f;
  var isRegExp$1 = _isRegexp;
  var $flags$1 = _flags;
  var $RegExp = global$5.RegExp;
  var Base$1 = $RegExp;
  var proto$3 = $RegExp.prototype;
  var re1 = /a/g;
  var re2 = /a/g;
  // "new" creates a new object, old webkit buggy here
  var CORRECT_NEW = new $RegExp(re1) !== re1;

  if (_descriptors && (!CORRECT_NEW || _fails(function () {
    re2[_wks.exports('match')] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
  }))) {
    $RegExp = function RegExp(p, f) {
      var tiRE = this instanceof $RegExp;
      var piRE = isRegExp$1(p);
      var fiU = f === undefined;
      return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
        : inheritIfRequired$1(CORRECT_NEW
          ? new Base$1(piRE && !fiU ? p.source : p, f)
          : Base$1((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags$1.call(p) : f)
        , tiRE ? this : proto$3, $RegExp);
    };
    var proxy = function (key) {
      key in $RegExp || dP$4($RegExp, key, {
        configurable: true,
        get: function () { return Base$1[key]; },
        set: function (it) { Base$1[key] = it; }
      });
    };
    for (var keys$1 = gOPN$4(Base$1), i$1 = 0; keys$1.length > i$1;) proxy(keys$1[i$1++]);
    proto$3.constructor = $RegExp;
    $RegExp.prototype = proto$3;
    _redefine.exports(global$5, 'RegExp', $RegExp);
  }

  require_setSpecies()('RegExp');

  // 19.1.3.19 Object.setPrototypeOf(O, proto)
  var $export$d = _export;
  $export$d($export$d.S, 'Object', { setPrototypeOf: require_setProto().set });

  var _strictMethod;
  var hasRequired_strictMethod;

  function require_strictMethod () {
  	if (hasRequired_strictMethod) return _strictMethod;
  	hasRequired_strictMethod = 1;
  	var fails = _fails;

  	_strictMethod = function (method, arg) {
  	  return !!method && fails(function () {
  	    // eslint-disable-next-line no-useless-call
  	    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  	  });
  	};
  	return _strictMethod;
  }

  var $export$c = _export;
  var aFunction = _aFunction;
  var toObject$4 = _toObject;
  var fails$6 = _fails;
  var $sort = [].sort;
  var test$1 = [1, 2, 3];

  $export$c($export$c.P + $export$c.F * (fails$6(function () {
    // IE8-
    test$1.sort(undefined);
  }) || !fails$6(function () {
    // V8 bug
    test$1.sort(null);
    // Old WebKit
  }) || !require_strictMethod()($sort)), 'Array', {
    // 22.1.3.25 Array.prototype.sort(comparefn)
    sort: function sort(comparefn) {
      return comparefn === undefined
        ? $sort.call(toObject$4(this))
        : $sort.call(toObject$4(this), aFunction(comparefn));
    }
  });

  var _objectAssign;
  var hasRequired_objectAssign;

  function require_objectAssign () {
  	if (hasRequired_objectAssign) return _objectAssign;
  	hasRequired_objectAssign = 1;
  	// 19.1.2.1 Object.assign(target, source, ...)
  	var DESCRIPTORS = _descriptors;
  	var getKeys = _objectKeys;
  	var gOPS = _objectGops;
  	var pIE = require_objectPie();
  	var toObject = _toObject;
  	var IObject = _iobject;
  	var $assign = Object.assign;

  	// should work with symbols and should have deterministic property order (V8 bug)
  	_objectAssign = !$assign || _fails(function () {
  	  var A = {};
  	  var B = {};
  	  // eslint-disable-next-line no-undef
  	  var S = Symbol();
  	  var K = 'abcdefghijklmnopqrst';
  	  A[S] = 7;
  	  K.split('').forEach(function (k) { B[k] = k; });
  	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
  	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  	  var T = toObject(target);
  	  var aLen = arguments.length;
  	  var index = 1;
  	  var getSymbols = gOPS.f;
  	  var isEnum = pIE.f;
  	  while (aLen > index) {
  	    var S = IObject(arguments[index++]);
  	    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
  	    var length = keys.length;
  	    var j = 0;
  	    var key;
  	    while (length > j) {
  	      key = keys[j++];
  	      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
  	    }
  	  } return T;
  	} : $assign;
  	return _objectAssign;
  }

  // 19.1.3.1 Object.assign(target, source)
  var $export$b = _export;

  $export$b($export$b.S + $export$b.F, 'Object', { assign: require_objectAssign() });

  // 7.2.9 SameValue(x, y)
  var _sameValue = Object.is || function is(x, y) {
    // eslint-disable-next-line no-self-compare
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };

  var classof$2 = _classof;
  var builtinExec = RegExp.prototype.exec;

   // `RegExpExec` abstract operation
  // https://tc39.github.io/ecma262/#sec-regexpexec
  var _regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (typeof exec === 'function') {
      var result = exec.call(R, S);
      if (typeof result !== 'object') {
        throw new TypeError('RegExp exec method returned something other than an Object or null');
      }
      return result;
    }
    if (classof$2(R) !== 'RegExp') {
      throw new TypeError('RegExp#exec called on incompatible receiver');
    }
    return builtinExec.call(R, S);
  };

  var regexpFlags = _flags;

  var nativeExec = RegExp.prototype.exec;
  // This always refers to the native implementation, because the
  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
  // which loads this file before patching the method.
  var nativeReplace = String.prototype.replace;

  var patchedExec = nativeExec;

  var LAST_INDEX$1 = 'lastIndex';

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/,
        re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1[LAST_INDEX$1] !== 0 || re2[LAST_INDEX$1] !== 0;
  })();

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

  if (PATCH) {
    patchedExec = function exec(str) {
      var re = this;
      var lastIndex, reCopy, match, i;

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX$1];

      match = nativeExec.call(re, str);

      if (UPDATES_LAST_INDEX_WRONG && match) {
        re[LAST_INDEX$1] = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        // eslint-disable-next-line no-loop-func
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      return match;
    };
  }

  var _regexpExec = patchedExec;

  var regexpExec$2 = _regexpExec;
  _export({
    target: 'RegExp',
    proto: true,
    forced: regexpExec$2 !== /./.exec
  }, {
    exec: regexpExec$2
  });

  var redefine$2 = _redefine.exports;
  var hide$2 = _hide;
  var fails$5 = _fails;
  var defined$2 = _defined;
  var wks$3 = _wks.exports;
  var regexpExec$1 = _regexpExec;

  var SPECIES = wks$3('species');

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$5(function () {
    // #replace needs built-in support for named groups.
    // #match works fine because it just return the exec results, even if it has
    // a "grops" property.
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    return ''.replace(re, '$<a>') !== '7';
  });

  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
    // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () { return originalExec.apply(this, arguments); };
    var result = 'ab'.split(re);
    return result.length === 2 && result[0] === 'a' && result[1] === 'b';
  })();

  var _fixReWks = function (KEY, length, exec) {
    var SYMBOL = wks$3(KEY);

    var DELEGATES_TO_SYMBOL = !fails$5(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails$5(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;
      re.exec = function () { execCalled = true; return null; };
      if (KEY === 'split') {
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES] = function () { return re; };
      }
      re[SYMBOL]('');
      return !execCalled;
    }) : undefined;

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
      (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
    ) {
      var nativeRegExpMethod = /./[SYMBOL];
      var fns = exec(
        defined$2,
        SYMBOL,
        ''[KEY],
        function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
          if (regexp.exec === regexpExec$1) {
            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
              // The native String method already delegates to @@method (this
              // polyfilled function), leasing to infinite recursion.
              // We avoid it by directly calling the native @@method method.
              return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
            }
            return { done: true, value: nativeMethod.call(str, regexp, arg2) };
          }
          return { done: false };
        }
      );
      var strfn = fns[0];
      var rxfn = fns[1];

      redefine$2(String.prototype, KEY, strfn);
      hide$2(RegExp.prototype, SYMBOL, length == 2
        // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
        // 21.2.5.11 RegExp.prototype[@@split](string, limit)
        ? function (string, arg) { return rxfn.call(string, this, arg); }
        // 21.2.5.6 RegExp.prototype[@@match](string)
        // 21.2.5.9 RegExp.prototype[@@search](string)
        : function (string) { return rxfn.call(string, this); }
      );
    }
  };

  var anObject$5 = _anObject;
  var sameValue = _sameValue;
  var regExpExec$2 = _regexpExecAbstract;

  // @@search logic
  _fixReWks('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
    return [
      // `String.prototype.search` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.search
      function search(regexp) {
        var O = defined(this);
        var fn = regexp == undefined ? undefined : regexp[SEARCH];
        return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
      },
      // `RegExp.prototype[@@search]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
      function (regexp) {
        var res = maybeCallNative($search, regexp, this);
        if (res.done) return res.value;
        var rx = anObject$5(regexp);
        var S = String(this);
        var previousLastIndex = rx.lastIndex;
        if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
        var result = regExpExec$2(rx, S);
        if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
        return result === null ? -1 : result.index;
      }
    ];
  });

  var $export$a = _export;
  var $filter = _arrayMethods(2);

  $export$a($export$a.P + $export$a.F * !require_strictMethod()([].filter, true), 'Array', {
    // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
    filter: function filter(callbackfn /* , thisArg */) {
      return $filter(this, callbackfn, arguments[1]);
    }
  });

  var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
    '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var $export$9 = _export;
  var defined$1 = _defined;
  var fails$4 = _fails;
  var spaces = _stringWs;
  var space = '[' + spaces + ']';
  var non = '\u200b\u0085';
  var ltrim = RegExp('^' + space + space + '*');
  var rtrim = RegExp(space + space + '*$');

  var exporter = function (KEY, exec, ALIAS) {
    var exp = {};
    var FORCE = fails$4(function () {
      return !!spaces[KEY]() || non[KEY]() != non;
    });
    var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
    if (ALIAS) exp[ALIAS] = fn;
    $export$9($export$9.P + $export$9.F * FORCE, 'String', exp);
  };

  // 1 -> String#trimLeft
  // 2 -> String#trimRight
  // 3 -> String#trim
  var trim = exporter.trim = function (string, TYPE) {
    string = String(defined$1(string));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };

  var _stringTrim = exporter;

  var global$4 = _global.exports;
  var has$2 = _has;
  var cof$1 = _cof;
  var inheritIfRequired = _inheritIfRequired;
  var toPrimitive$2 = _toPrimitive;
  var fails$3 = _fails;
  var gOPN$3 = _objectGopn.f;
  var gOPD$2 = _objectGopd.f;
  var dP$3 = _objectDp.f;
  var $trim = _stringTrim.trim;
  var NUMBER = 'Number';
  var $Number = global$4[NUMBER];
  var Base = $Number;
  var proto$2 = $Number.prototype;
  // Opera ~12 has broken Object#toString
  var BROKEN_COF = cof$1(_objectCreate(proto$2)) == NUMBER;
  var TRIM = 'trim' in String.prototype;

  // 7.1.3 ToNumber(argument)
  var toNumber = function (argument) {
    var it = toPrimitive$2(argument, false);
    if (typeof it == 'string' && it.length > 2) {
      it = TRIM ? it.trim() : $trim(it, 3);
      var first = it.charCodeAt(0);
      var third, radix, maxCode;
      if (first === 43 || first === 45) {
        third = it.charCodeAt(2);
        if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
      } else if (first === 48) {
        switch (it.charCodeAt(1)) {
          case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
          case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
          default: return +it;
        }
        for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
          code = digits.charCodeAt(i);
          // parseInt parses a string to a first unavailable symbol
          // but ToNumber should return NaN if a string contains unavailable symbols
          if (code < 48 || code > maxCode) return NaN;
        } return parseInt(digits, radix);
      }
    } return +it;
  };

  if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
    $Number = function Number(value) {
      var it = arguments.length < 1 ? 0 : value;
      var that = this;
      return that instanceof $Number
        // check on 1..constructor(foo) case
        && (BROKEN_COF ? fails$3(function () { proto$2.valueOf.call(that); }) : cof$1(that) != NUMBER)
          ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
    };
    for (var keys = _descriptors ? gOPN$3(Base) : (
      // ES3:
      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
      // ES6 (in case, if modules with ES6 Number statics required before):
      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
      'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
    ).split(','), j$1 = 0, key$1; keys.length > j$1; j$1++) {
      if (has$2(Base, key$1 = keys[j$1]) && !has$2($Number, key$1)) {
        dP$3($Number, key$1, gOPD$2(Base, key$1));
      }
    }
    $Number.prototype = proto$2;
    proto$2.constructor = $Number;
    _redefine.exports(global$4, NUMBER, $Number);
  }

  var toInteger$2 = _toInteger;
  var defined = _defined;
  // true  -> String#at
  // false -> String#codePointAt
  var _stringAt = function (TO_STRING) {
    return function (that, pos) {
      var s = String(defined(that));
      var i = toInteger$2(pos);
      var l = s.length;
      var a, b;
      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };

  var at = _stringAt(true);

   // `AdvanceStringIndex` abstract operation
  // https://tc39.github.io/ecma262/#sec-advancestringindex
  var _advanceStringIndex = function (S, index, unicode) {
    return index + (unicode ? at(S, index).length : 1);
  };

  var anObject$4 = _anObject;
  var toLength$5 = _toLength;
  var advanceStringIndex$2 = _advanceStringIndex;
  var regExpExec$1 = _regexpExecAbstract;

  // @@match logic
  _fixReWks('match', 1, function (defined, MATCH, $match, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = defined(this);
        var fn = regexp == undefined ? undefined : regexp[MATCH];
        return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
      function (regexp) {
        var res = maybeCallNative($match, regexp, this);
        if (res.done) return res.value;
        var rx = anObject$4(regexp);
        var S = String(this);
        if (!rx.global) return regExpExec$1(rx, S);
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = regExpExec$1(rx, S)) !== null) {
          var matchStr = String(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = advanceStringIndex$2(S, toLength$5(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });

  var _arrayFill;
  var hasRequired_arrayFill;

  function require_arrayFill () {
  	if (hasRequired_arrayFill) return _arrayFill;
  	hasRequired_arrayFill = 1;
  	var toObject = _toObject;
  	var toAbsoluteIndex = _toAbsoluteIndex;
  	var toLength = _toLength;
  	_arrayFill = function fill(value /* , start = 0, end = @length */) {
  	  var O = toObject(this);
  	  var length = toLength(O.length);
  	  var aLen = arguments.length;
  	  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  	  var end = aLen > 2 ? arguments[2] : undefined;
  	  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  	  while (endPos > index) O[index++] = value;
  	  return O;
  	};
  	return _arrayFill;
  }

  // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
  var $export$8 = _export;

  $export$8($export$8.P, 'Array', { fill: require_arrayFill() });

  _addToUnscopables('fill');

  var _typedArray = {exports: {}};

  var _typed;
  var hasRequired_typed;

  function require_typed () {
  	if (hasRequired_typed) return _typed;
  	hasRequired_typed = 1;
  	var global = _global.exports;
  	var hide = _hide;
  	var uid = _uid;
  	var TYPED = uid('typed_array');
  	var VIEW = uid('view');
  	var ABV = !!(global.ArrayBuffer && global.DataView);
  	var CONSTR = ABV;
  	var i = 0;
  	var l = 9;
  	var Typed;

  	var TypedArrayConstructors = (
  	  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
  	).split(',');

  	while (i < l) {
  	  if (Typed = global[TypedArrayConstructors[i++]]) {
  	    hide(Typed.prototype, TYPED, true);
  	    hide(Typed.prototype, VIEW, true);
  	  } else CONSTR = false;
  	}

  	_typed = {
  	  ABV: ABV,
  	  CONSTR: CONSTR,
  	  TYPED: TYPED,
  	  VIEW: VIEW
  	};
  	return _typed;
  }

  var _typedBuffer = {};

  var _toIndex;
  var hasRequired_toIndex;

  function require_toIndex () {
  	if (hasRequired_toIndex) return _toIndex;
  	hasRequired_toIndex = 1;
  	// https://tc39.github.io/ecma262/#sec-toindex
  	var toInteger = _toInteger;
  	var toLength = _toLength;
  	_toIndex = function (it) {
  	  if (it === undefined) return 0;
  	  var number = toInteger(it);
  	  var length = toLength(number);
  	  if (number !== length) throw RangeError('Wrong length!');
  	  return length;
  	};
  	return _toIndex;
  }

  var hasRequired_typedBuffer;

  function require_typedBuffer () {
  	if (hasRequired_typedBuffer) return _typedBuffer;
  	hasRequired_typedBuffer = 1;
  	(function (exports) {
  		var global = _global.exports;
  		var DESCRIPTORS = _descriptors;
  		var $typed = require_typed();
  		var hide = _hide;
  		var redefineAll = require_redefineAll();
  		var fails = _fails;
  		var anInstance = _anInstance;
  		var toInteger = _toInteger;
  		var toLength = _toLength;
  		var toIndex = require_toIndex();
  		var gOPN = _objectGopn.f;
  		var dP = _objectDp.f;
  		var arrayFill = require_arrayFill();
  		var setToStringTag = _setToStringTag;
  		var ARRAY_BUFFER = 'ArrayBuffer';
  		var DATA_VIEW = 'DataView';
  		var PROTOTYPE = 'prototype';
  		var WRONG_LENGTH = 'Wrong length!';
  		var WRONG_INDEX = 'Wrong index!';
  		var $ArrayBuffer = global[ARRAY_BUFFER];
  		var $DataView = global[DATA_VIEW];
  		var Math = global.Math;
  		var RangeError = global.RangeError;
  		// eslint-disable-next-line no-shadow-restricted-names
  		var Infinity = global.Infinity;
  		var BaseBuffer = $ArrayBuffer;
  		var abs = Math.abs;
  		var pow = Math.pow;
  		var floor = Math.floor;
  		var log = Math.log;
  		var LN2 = Math.LN2;
  		var BUFFER = 'buffer';
  		var BYTE_LENGTH = 'byteLength';
  		var BYTE_OFFSET = 'byteOffset';
  		var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
  		var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
  		var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

  		// IEEE754 conversions based on https://github.com/feross/ieee754
  		function packIEEE754(value, mLen, nBytes) {
  		  var buffer = new Array(nBytes);
  		  var eLen = nBytes * 8 - mLen - 1;
  		  var eMax = (1 << eLen) - 1;
  		  var eBias = eMax >> 1;
  		  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  		  var i = 0;
  		  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  		  var e, m, c;
  		  value = abs(value);
  		  // eslint-disable-next-line no-self-compare
  		  if (value != value || value === Infinity) {
  		    // eslint-disable-next-line no-self-compare
  		    m = value != value ? 1 : 0;
  		    e = eMax;
  		  } else {
  		    e = floor(log(value) / LN2);
  		    if (value * (c = pow(2, -e)) < 1) {
  		      e--;
  		      c *= 2;
  		    }
  		    if (e + eBias >= 1) {
  		      value += rt / c;
  		    } else {
  		      value += rt * pow(2, 1 - eBias);
  		    }
  		    if (value * c >= 2) {
  		      e++;
  		      c /= 2;
  		    }
  		    if (e + eBias >= eMax) {
  		      m = 0;
  		      e = eMax;
  		    } else if (e + eBias >= 1) {
  		      m = (value * c - 1) * pow(2, mLen);
  		      e = e + eBias;
  		    } else {
  		      m = value * pow(2, eBias - 1) * pow(2, mLen);
  		      e = 0;
  		    }
  		  }
  		  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  		  e = e << mLen | m;
  		  eLen += mLen;
  		  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  		  buffer[--i] |= s * 128;
  		  return buffer;
  		}
  		function unpackIEEE754(buffer, mLen, nBytes) {
  		  var eLen = nBytes * 8 - mLen - 1;
  		  var eMax = (1 << eLen) - 1;
  		  var eBias = eMax >> 1;
  		  var nBits = eLen - 7;
  		  var i = nBytes - 1;
  		  var s = buffer[i--];
  		  var e = s & 127;
  		  var m;
  		  s >>= 7;
  		  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  		  m = e & (1 << -nBits) - 1;
  		  e >>= -nBits;
  		  nBits += mLen;
  		  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  		  if (e === 0) {
  		    e = 1 - eBias;
  		  } else if (e === eMax) {
  		    return m ? NaN : s ? -Infinity : Infinity;
  		  } else {
  		    m = m + pow(2, mLen);
  		    e = e - eBias;
  		  } return (s ? -1 : 1) * m * pow(2, e - mLen);
  		}

  		function unpackI32(bytes) {
  		  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
  		}
  		function packI8(it) {
  		  return [it & 0xff];
  		}
  		function packI16(it) {
  		  return [it & 0xff, it >> 8 & 0xff];
  		}
  		function packI32(it) {
  		  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
  		}
  		function packF64(it) {
  		  return packIEEE754(it, 52, 8);
  		}
  		function packF32(it) {
  		  return packIEEE754(it, 23, 4);
  		}

  		function addGetter(C, key, internal) {
  		  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
  		}

  		function get(view, bytes, index, isLittleEndian) {
  		  var numIndex = +index;
  		  var intIndex = toIndex(numIndex);
  		  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  		  var store = view[$BUFFER]._b;
  		  var start = intIndex + view[$OFFSET];
  		  var pack = store.slice(start, start + bytes);
  		  return isLittleEndian ? pack : pack.reverse();
  		}
  		function set(view, bytes, index, conversion, value, isLittleEndian) {
  		  var numIndex = +index;
  		  var intIndex = toIndex(numIndex);
  		  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  		  var store = view[$BUFFER]._b;
  		  var start = intIndex + view[$OFFSET];
  		  var pack = conversion(+value);
  		  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
  		}

  		if (!$typed.ABV) {
  		  $ArrayBuffer = function ArrayBuffer(length) {
  		    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
  		    var byteLength = toIndex(length);
  		    this._b = arrayFill.call(new Array(byteLength), 0);
  		    this[$LENGTH] = byteLength;
  		  };

  		  $DataView = function DataView(buffer, byteOffset, byteLength) {
  		    anInstance(this, $DataView, DATA_VIEW);
  		    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
  		    var bufferLength = buffer[$LENGTH];
  		    var offset = toInteger(byteOffset);
  		    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
  		    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
  		    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
  		    this[$BUFFER] = buffer;
  		    this[$OFFSET] = offset;
  		    this[$LENGTH] = byteLength;
  		  };

  		  if (DESCRIPTORS) {
  		    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
  		    addGetter($DataView, BUFFER, '_b');
  		    addGetter($DataView, BYTE_LENGTH, '_l');
  		    addGetter($DataView, BYTE_OFFSET, '_o');
  		  }

  		  redefineAll($DataView[PROTOTYPE], {
  		    getInt8: function getInt8(byteOffset) {
  		      return get(this, 1, byteOffset)[0] << 24 >> 24;
  		    },
  		    getUint8: function getUint8(byteOffset) {
  		      return get(this, 1, byteOffset)[0];
  		    },
  		    getInt16: function getInt16(byteOffset /* , littleEndian */) {
  		      var bytes = get(this, 2, byteOffset, arguments[1]);
  		      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
  		    },
  		    getUint16: function getUint16(byteOffset /* , littleEndian */) {
  		      var bytes = get(this, 2, byteOffset, arguments[1]);
  		      return bytes[1] << 8 | bytes[0];
  		    },
  		    getInt32: function getInt32(byteOffset /* , littleEndian */) {
  		      return unpackI32(get(this, 4, byteOffset, arguments[1]));
  		    },
  		    getUint32: function getUint32(byteOffset /* , littleEndian */) {
  		      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
  		    },
  		    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
  		      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
  		    },
  		    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
  		      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
  		    },
  		    setInt8: function setInt8(byteOffset, value) {
  		      set(this, 1, byteOffset, packI8, value);
  		    },
  		    setUint8: function setUint8(byteOffset, value) {
  		      set(this, 1, byteOffset, packI8, value);
  		    },
  		    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
  		      set(this, 2, byteOffset, packI16, value, arguments[2]);
  		    },
  		    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
  		      set(this, 2, byteOffset, packI16, value, arguments[2]);
  		    },
  		    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
  		      set(this, 4, byteOffset, packI32, value, arguments[2]);
  		    },
  		    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
  		      set(this, 4, byteOffset, packI32, value, arguments[2]);
  		    },
  		    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
  		      set(this, 4, byteOffset, packF32, value, arguments[2]);
  		    },
  		    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
  		      set(this, 8, byteOffset, packF64, value, arguments[2]);
  		    }
  		  });
  		} else {
  		  if (!fails(function () {
  		    $ArrayBuffer(1);
  		  }) || !fails(function () {
  		    new $ArrayBuffer(-1); // eslint-disable-line no-new
  		  }) || fails(function () {
  		    new $ArrayBuffer(); // eslint-disable-line no-new
  		    new $ArrayBuffer(1.5); // eslint-disable-line no-new
  		    new $ArrayBuffer(NaN); // eslint-disable-line no-new
  		    return $ArrayBuffer.name != ARRAY_BUFFER;
  		  })) {
  		    $ArrayBuffer = function ArrayBuffer(length) {
  		      anInstance(this, $ArrayBuffer);
  		      return new BaseBuffer(toIndex(length));
  		    };
  		    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
  		    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
  		      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
  		    }
  		    ArrayBufferProto.constructor = $ArrayBuffer;
  		  }
  		  // iOS Safari 7.x bug
  		  var view = new $DataView(new $ArrayBuffer(2));
  		  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  		  view.setInt8(0, 2147483648);
  		  view.setInt8(1, 2147483649);
  		  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
  		    setInt8: function setInt8(byteOffset, value) {
  		      $setInt8.call(this, byteOffset, value << 24 >> 24);
  		    },
  		    setUint8: function setUint8(byteOffset, value) {
  		      $setInt8.call(this, byteOffset, value << 24 >> 24);
  		    }
  		  }, true);
  		}
  		setToStringTag($ArrayBuffer, ARRAY_BUFFER);
  		setToStringTag($DataView, DATA_VIEW);
  		hide($DataView[PROTOTYPE], $typed.VIEW, true);
  		exports[ARRAY_BUFFER] = $ArrayBuffer;
  		exports[DATA_VIEW] = $DataView;
  } (_typedBuffer));
  	return _typedBuffer;
  }

  var addToUnscopables = _addToUnscopables;
  var step = _iterStep;
  var Iterators$2 = _iterators;
  var toIObject$2 = _toIobject;

  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
    this._t = toIObject$2(iterated); // target
    this._i = 0;                   // next index
    this._k = kind;                // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var kind = this._k;
    var index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return step(1);
    }
    if (kind == 'keys') return step(0, index);
    if (kind == 'values') return step(0, O[index]);
    return step(0, [index, O[index]]);
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  Iterators$2.Arguments = Iterators$2.Array;

  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');

  var _arrayCopyWithin;
  var hasRequired_arrayCopyWithin;

  function require_arrayCopyWithin () {
  	if (hasRequired_arrayCopyWithin) return _arrayCopyWithin;
  	hasRequired_arrayCopyWithin = 1;
  	var toObject = _toObject;
  	var toAbsoluteIndex = _toAbsoluteIndex;
  	var toLength = _toLength;

  	_arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  	  var O = toObject(this);
  	  var len = toLength(O.length);
  	  var to = toAbsoluteIndex(target, len);
  	  var from = toAbsoluteIndex(start, len);
  	  var end = arguments.length > 2 ? arguments[2] : undefined;
  	  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  	  var inc = 1;
  	  if (from < to && to < from + count) {
  	    inc = -1;
  	    from += count - 1;
  	    to += count - 1;
  	  }
  	  while (count-- > 0) {
  	    if (from in O) O[to] = O[from];
  	    else delete O[to];
  	    to += inc;
  	    from += inc;
  	  } return O;
  	};
  	return _arrayCopyWithin;
  }

  if (_descriptors) {
    var LIBRARY = _library;
    var global$3 = _global.exports;
    var fails$2 = _fails;
    var $export$7 = _export;
    var $typed = require_typed();
    var $buffer = require_typedBuffer();
    var ctx = _ctx;
    var anInstance = _anInstance;
    var propertyDesc = _propertyDesc;
    var hide$1 = _hide;
    var redefineAll = require_redefineAll();
    var toInteger$1 = _toInteger;
    var toLength$4 = _toLength;
    var toIndex = require_toIndex();
    var toAbsoluteIndex$1 = _toAbsoluteIndex;
    var toPrimitive$1 = _toPrimitive;
    var has$1 = _has;
    var classof$1 = _classof;
    var isObject$2 = _isObject;
    var toObject$3 = _toObject;
    var isArrayIter = _isArrayIter;
    var create = _objectCreate;
    var getPrototypeOf = _objectGpo;
    var gOPN$2 = _objectGopn.f;
    var getIterFn = core_getIteratorMethod;
    var uid$1 = _uid;
    var wks$2 = _wks.exports;
    var createArrayMethod = _arrayMethods;
    var createArrayIncludes = _arrayIncludes;
    var speciesConstructor$1 = _speciesConstructor;
    var ArrayIterators = es6_array_iterator;
    var Iterators$1 = _iterators;
    var $iterDetect = require_iterDetect();
    var setSpecies = require_setSpecies();
    var arrayFill = require_arrayFill();
    var arrayCopyWithin = require_arrayCopyWithin();
    var $DP$1 = _objectDp;
    var $GOPD$1 = _objectGopd;
    var dP$2 = $DP$1.f;
    var gOPD$1 = $GOPD$1.f;
    var RangeError$1 = global$3.RangeError;
    var TypeError$1 = global$3.TypeError;
    var Uint8Array = global$3.Uint8Array;
    var ARRAY_BUFFER = 'ArrayBuffer';
    var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
    var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
    var PROTOTYPE$1 = 'prototype';
    var ArrayProto = Array[PROTOTYPE$1];
    var $ArrayBuffer = $buffer.ArrayBuffer;
    var $DataView = $buffer.DataView;
    var arrayForEach = createArrayMethod(0);
    var arrayFilter = createArrayMethod(2);
    var arraySome = createArrayMethod(3);
    var arrayEvery = createArrayMethod(4);
    var arrayFind = createArrayMethod(5);
    var arrayFindIndex = createArrayMethod(6);
    var arrayIncludes = createArrayIncludes(true);
    var arrayIndexOf = createArrayIncludes(false);
    var arrayValues = ArrayIterators.values;
    var arrayKeys = ArrayIterators.keys;
    var arrayEntries = ArrayIterators.entries;
    var arrayLastIndexOf = ArrayProto.lastIndexOf;
    var arrayReduce = ArrayProto.reduce;
    var arrayReduceRight = ArrayProto.reduceRight;
    var arrayJoin = ArrayProto.join;
    var arraySort = ArrayProto.sort;
    var arraySlice$1 = ArrayProto.slice;
    var arrayToString = ArrayProto.toString;
    var arrayToLocaleString = ArrayProto.toLocaleString;
    var ITERATOR$1 = wks$2('iterator');
    var TAG = wks$2('toStringTag');
    var TYPED_CONSTRUCTOR = uid$1('typed_constructor');
    var DEF_CONSTRUCTOR = uid$1('def_constructor');
    var ALL_CONSTRUCTORS = $typed.CONSTR;
    var TYPED_ARRAY = $typed.TYPED;
    var VIEW = $typed.VIEW;
    var WRONG_LENGTH = 'Wrong length!';

    var $map$1 = createArrayMethod(1, function (O, length) {
      return allocate(speciesConstructor$1(O, O[DEF_CONSTRUCTOR]), length);
    });

    var LITTLE_ENDIAN = fails$2(function () {
      // eslint-disable-next-line no-undef
      return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
    });

    var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE$1].set && fails$2(function () {
      new Uint8Array(1).set({});
    });

    var toOffset = function (it, BYTES) {
      var offset = toInteger$1(it);
      if (offset < 0 || offset % BYTES) throw RangeError$1('Wrong offset!');
      return offset;
    };

    var validate$1 = function (it) {
      if (isObject$2(it) && TYPED_ARRAY in it) return it;
      throw TypeError$1(it + ' is not a typed array!');
    };

    var allocate = function (C, length) {
      if (!(isObject$2(C) && TYPED_CONSTRUCTOR in C)) {
        throw TypeError$1('It is not a typed array constructor!');
      } return new C(length);
    };

    var speciesFromList = function (O, list) {
      return fromList(speciesConstructor$1(O, O[DEF_CONSTRUCTOR]), list);
    };

    var fromList = function (C, list) {
      var index = 0;
      var length = list.length;
      var result = allocate(C, length);
      while (length > index) result[index] = list[index++];
      return result;
    };

    var addGetter = function (it, key, internal) {
      dP$2(it, key, { get: function () { return this._d[internal]; } });
    };

    var $from = function from(source /* , mapfn, thisArg */) {
      var O = toObject$3(source);
      var aLen = arguments.length;
      var mapfn = aLen > 1 ? arguments[1] : undefined;
      var mapping = mapfn !== undefined;
      var iterFn = getIterFn(O);
      var i, length, values, result, step, iterator;
      if (iterFn != undefined && !isArrayIter(iterFn)) {
        for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
          values.push(step.value);
        } O = values;
      }
      if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
      for (i = 0, length = toLength$4(O.length), result = allocate(this, length); length > i; i++) {
        result[i] = mapping ? mapfn(O[i], i) : O[i];
      }
      return result;
    };

    var $of = function of(/* ...items */) {
      var index = 0;
      var length = arguments.length;
      var result = allocate(this, length);
      while (length > index) result[index] = arguments[index++];
      return result;
    };

    // iOS Safari 6.x fails here
    var TO_LOCALE_BUG = !!Uint8Array && fails$2(function () { arrayToLocaleString.call(new Uint8Array(1)); });

    var $toLocaleString = function toLocaleString() {
      return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice$1.call(validate$1(this)) : validate$1(this), arguments);
    };

    var proto$1 = {
      copyWithin: function copyWithin(target, start /* , end */) {
        return arrayCopyWithin.call(validate$1(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
      },
      every: function every(callbackfn /* , thisArg */) {
        return arrayEvery(validate$1(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      },
      fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
        return arrayFill.apply(validate$1(this), arguments);
      },
      filter: function filter(callbackfn /* , thisArg */) {
        return speciesFromList(this, arrayFilter(validate$1(this), callbackfn,
          arguments.length > 1 ? arguments[1] : undefined));
      },
      find: function find(predicate /* , thisArg */) {
        return arrayFind(validate$1(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
      },
      findIndex: function findIndex(predicate /* , thisArg */) {
        return arrayFindIndex(validate$1(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
      },
      forEach: function forEach(callbackfn /* , thisArg */) {
        arrayForEach(validate$1(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      },
      indexOf: function indexOf(searchElement /* , fromIndex */) {
        return arrayIndexOf(validate$1(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
      },
      includes: function includes(searchElement /* , fromIndex */) {
        return arrayIncludes(validate$1(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
      },
      join: function join(separator) { // eslint-disable-line no-unused-vars
        return arrayJoin.apply(validate$1(this), arguments);
      },
      lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
        return arrayLastIndexOf.apply(validate$1(this), arguments);
      },
      map: function map(mapfn /* , thisArg */) {
        return $map$1(validate$1(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
      },
      reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
        return arrayReduce.apply(validate$1(this), arguments);
      },
      reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
        return arrayReduceRight.apply(validate$1(this), arguments);
      },
      reverse: function reverse() {
        var that = this;
        var length = validate$1(that).length;
        var middle = Math.floor(length / 2);
        var index = 0;
        var value;
        while (index < middle) {
          value = that[index];
          that[index++] = that[--length];
          that[length] = value;
        } return that;
      },
      some: function some(callbackfn /* , thisArg */) {
        return arraySome(validate$1(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      },
      sort: function sort(comparefn) {
        return arraySort.call(validate$1(this), comparefn);
      },
      subarray: function subarray(begin, end) {
        var O = validate$1(this);
        var length = O.length;
        var $begin = toAbsoluteIndex$1(begin, length);
        return new (speciesConstructor$1(O, O[DEF_CONSTRUCTOR]))(
          O.buffer,
          O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
          toLength$4((end === undefined ? length : toAbsoluteIndex$1(end, length)) - $begin)
        );
      }
    };

    var $slice = function slice(start, end) {
      return speciesFromList(this, arraySlice$1.call(validate$1(this), start, end));
    };

    var $set = function set(arrayLike /* , offset */) {
      validate$1(this);
      var offset = toOffset(arguments[1], 1);
      var length = this.length;
      var src = toObject$3(arrayLike);
      var len = toLength$4(src.length);
      var index = 0;
      if (len + offset > length) throw RangeError$1(WRONG_LENGTH);
      while (index < len) this[offset + index] = src[index++];
    };

    var $iterators$1 = {
      entries: function entries() {
        return arrayEntries.call(validate$1(this));
      },
      keys: function keys() {
        return arrayKeys.call(validate$1(this));
      },
      values: function values() {
        return arrayValues.call(validate$1(this));
      }
    };

    var isTAIndex = function (target, key) {
      return isObject$2(target)
        && target[TYPED_ARRAY]
        && typeof key != 'symbol'
        && key in target
        && String(+key) == String(key);
    };
    var $getDesc = function getOwnPropertyDescriptor(target, key) {
      return isTAIndex(target, key = toPrimitive$1(key, true))
        ? propertyDesc(2, target[key])
        : gOPD$1(target, key);
    };
    var $setDesc = function defineProperty(target, key, desc) {
      if (isTAIndex(target, key = toPrimitive$1(key, true))
        && isObject$2(desc)
        && has$1(desc, 'value')
        && !has$1(desc, 'get')
        && !has$1(desc, 'set')
        // TODO: add validation descriptor w/o calling accessors
        && !desc.configurable
        && (!has$1(desc, 'writable') || desc.writable)
        && (!has$1(desc, 'enumerable') || desc.enumerable)
      ) {
        target[key] = desc.value;
        return target;
      } return dP$2(target, key, desc);
    };

    if (!ALL_CONSTRUCTORS) {
      $GOPD$1.f = $getDesc;
      $DP$1.f = $setDesc;
    }

    $export$7($export$7.S + $export$7.F * !ALL_CONSTRUCTORS, 'Object', {
      getOwnPropertyDescriptor: $getDesc,
      defineProperty: $setDesc
    });

    if (fails$2(function () { arrayToString.call({}); })) {
      arrayToString = arrayToLocaleString = function toString() {
        return arrayJoin.call(this);
      };
    }

    var $TypedArrayPrototype$ = redefineAll({}, proto$1);
    redefineAll($TypedArrayPrototype$, $iterators$1);
    hide$1($TypedArrayPrototype$, ITERATOR$1, $iterators$1.values);
    redefineAll($TypedArrayPrototype$, {
      slice: $slice,
      set: $set,
      constructor: function () { /* noop */ },
      toString: arrayToString,
      toLocaleString: $toLocaleString
    });
    addGetter($TypedArrayPrototype$, 'buffer', 'b');
    addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
    addGetter($TypedArrayPrototype$, 'byteLength', 'l');
    addGetter($TypedArrayPrototype$, 'length', 'e');
    dP$2($TypedArrayPrototype$, TAG, {
      get: function () { return this[TYPED_ARRAY]; }
    });

    // eslint-disable-next-line max-statements
    _typedArray.exports = function (KEY, BYTES, wrapper, CLAMPED) {
      CLAMPED = !!CLAMPED;
      var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
      var GETTER = 'get' + KEY;
      var SETTER = 'set' + KEY;
      var TypedArray = global$3[NAME];
      var Base = TypedArray || {};
      var TAC = TypedArray && getPrototypeOf(TypedArray);
      var FORCED = !TypedArray || !$typed.ABV;
      var O = {};
      var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE$1];
      var getter = function (that, index) {
        var data = that._d;
        return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
      };
      var setter = function (that, index, value) {
        var data = that._d;
        if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
        data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
      };
      var addElement = function (that, index) {
        dP$2(that, index, {
          get: function () {
            return getter(this, index);
          },
          set: function (value) {
            return setter(this, index, value);
          },
          enumerable: true
        });
      };
      if (FORCED) {
        TypedArray = wrapper(function (that, data, $offset, $length) {
          anInstance(that, TypedArray, NAME, '_d');
          var index = 0;
          var offset = 0;
          var buffer, byteLength, length, klass;
          if (!isObject$2(data)) {
            length = toIndex(data);
            byteLength = length * BYTES;
            buffer = new $ArrayBuffer(byteLength);
          } else if (data instanceof $ArrayBuffer || (klass = classof$1(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
            buffer = data;
            offset = toOffset($offset, BYTES);
            var $len = data.byteLength;
            if ($length === undefined) {
              if ($len % BYTES) throw RangeError$1(WRONG_LENGTH);
              byteLength = $len - offset;
              if (byteLength < 0) throw RangeError$1(WRONG_LENGTH);
            } else {
              byteLength = toLength$4($length) * BYTES;
              if (byteLength + offset > $len) throw RangeError$1(WRONG_LENGTH);
            }
            length = byteLength / BYTES;
          } else if (TYPED_ARRAY in data) {
            return fromList(TypedArray, data);
          } else {
            return $from.call(TypedArray, data);
          }
          hide$1(that, '_d', {
            b: buffer,
            o: offset,
            l: byteLength,
            e: length,
            v: new $DataView(buffer)
          });
          while (index < length) addElement(that, index++);
        });
        TypedArrayPrototype = TypedArray[PROTOTYPE$1] = create($TypedArrayPrototype$);
        hide$1(TypedArrayPrototype, 'constructor', TypedArray);
      } else if (!fails$2(function () {
        TypedArray(1);
      }) || !fails$2(function () {
        new TypedArray(-1); // eslint-disable-line no-new
      }) || !$iterDetect(function (iter) {
        new TypedArray(); // eslint-disable-line no-new
        new TypedArray(null); // eslint-disable-line no-new
        new TypedArray(1.5); // eslint-disable-line no-new
        new TypedArray(iter); // eslint-disable-line no-new
      }, true)) {
        TypedArray = wrapper(function (that, data, $offset, $length) {
          anInstance(that, TypedArray, NAME);
          var klass;
          // `ws` module bug, temporarily remove validation length for Uint8Array
          // https://github.com/websockets/ws/pull/645
          if (!isObject$2(data)) return new Base(toIndex(data));
          if (data instanceof $ArrayBuffer || (klass = classof$1(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
            return $length !== undefined
              ? new Base(data, toOffset($offset, BYTES), $length)
              : $offset !== undefined
                ? new Base(data, toOffset($offset, BYTES))
                : new Base(data);
          }
          if (TYPED_ARRAY in data) return fromList(TypedArray, data);
          return $from.call(TypedArray, data);
        });
        arrayForEach(TAC !== Function.prototype ? gOPN$2(Base).concat(gOPN$2(TAC)) : gOPN$2(Base), function (key) {
          if (!(key in TypedArray)) hide$1(TypedArray, key, Base[key]);
        });
        TypedArray[PROTOTYPE$1] = TypedArrayPrototype;
        if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
      }
      var $nativeIterator = TypedArrayPrototype[ITERATOR$1];
      var CORRECT_ITER_NAME = !!$nativeIterator
        && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
      var $iterator = $iterators$1.values;
      hide$1(TypedArray, TYPED_CONSTRUCTOR, true);
      hide$1(TypedArrayPrototype, TYPED_ARRAY, NAME);
      hide$1(TypedArrayPrototype, VIEW, true);
      hide$1(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

      if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
        dP$2(TypedArrayPrototype, TAG, {
          get: function () { return NAME; }
        });
      }

      O[NAME] = TypedArray;

      $export$7($export$7.G + $export$7.W + $export$7.F * (TypedArray != Base), O);

      $export$7($export$7.S, NAME, {
        BYTES_PER_ELEMENT: BYTES
      });

      $export$7($export$7.S + $export$7.F * fails$2(function () { Base.of.call(TypedArray, 1); }), NAME, {
        from: $from,
        of: $of
      });

      if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide$1(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

      $export$7($export$7.P, NAME, proto$1);

      setSpecies(NAME);

      $export$7($export$7.P + $export$7.F * FORCED_SET, NAME, { set: $set });

      $export$7($export$7.P + $export$7.F * !CORRECT_ITER_NAME, NAME, $iterators$1);

      if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

      $export$7($export$7.P + $export$7.F * fails$2(function () {
        new TypedArray(1).slice();
      }), NAME, { slice: $slice });

      $export$7($export$7.P + $export$7.F * (fails$2(function () {
        return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
      }) || !fails$2(function () {
        TypedArrayPrototype.toLocaleString.call([1, 2]);
      })), NAME, { toLocaleString: $toLocaleString });

      Iterators$1[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
      if (!LIBRARY && !CORRECT_ITER_NAME) hide$1(TypedArrayPrototype, ITERATOR$1, $iterator);
    };
  } else _typedArray.exports = function () { /* empty */ };

  _typedArray.exports('Uint8', 1, function (init) {
    return function Uint8Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  var $export$6 = _export;
  var toLength$3 = _toLength;
  var context$1 = _stringContext;
  var STARTS_WITH = 'startsWith';
  var $startsWith = ''[STARTS_WITH];

  $export$6($export$6.P + $export$6.F * require_failsIsRegexp()(STARTS_WITH), 'String', {
    startsWith: function startsWith(searchString /* , position = 0 */) {
      var that = context$1(this, searchString, STARTS_WITH);
      var index = toLength$3(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
      var search = String(searchString);
      return $startsWith
        ? $startsWith.call(that, search, index)
        : that.slice(index, index + search.length) === search;
    }
  });

  // 21.2.5.3 get RegExp.prototype.flags()
  if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
    configurable: true,
    get: _flags
  });

  var anObject$3 = _anObject;
  var $flags = _flags;
  var DESCRIPTORS$1 = _descriptors;
  var TO_STRING$1 = 'toString';
  var $toString$1 = /./[TO_STRING$1];

  var define = function (fn) {
    _redefine.exports(RegExp.prototype, TO_STRING$1, fn, true);
  };

  // 21.2.5.14 RegExp.prototype.toString()
  if (_fails(function () { return $toString$1.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
    define(function toString() {
      var R = anObject$3(this);
      return '/'.concat(R.source, '/',
        'flags' in R ? R.flags : !DESCRIPTORS$1 && R instanceof RegExp ? $flags.call(R) : undefined);
    });
  // FF44- RegExp#toString has a wrong name
  } else if ($toString$1.name != TO_STRING$1) {
    define(function toString() {
      return $toString$1.call(this);
    });
  }

  var DateProto = Date.prototype;
  var INVALID_DATE = 'Invalid Date';
  var TO_STRING = 'toString';
  var $toString = DateProto[TO_STRING];
  var getTime = DateProto.getTime;
  if (new Date(NaN) + '' != INVALID_DATE) {
    _redefine.exports(DateProto, TO_STRING, function toString() {
      var value = getTime.call(this);
      // eslint-disable-next-line no-self-compare
      return value === value ? $toString.call(this) : INVALID_DATE;
    });
  }

  var $at = _stringAt(true);

  // 21.1.3.27 String.prototype[@@iterator]()
  _iterDefine(String, 'String', function (iterated) {
    this._t = String(iterated); // target
    this._i = 0;                // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var index = this._i;
    var point;
    if (index >= O.length) return { value: undefined, done: true };
    point = $at(O, index);
    this._i += point.length;
    return { value: point, done: false };
  });

  var strong = _collectionStrong;
  var validate = _validateCollection;
  var MAP = 'Map';

  // 23.1 Map Objects
  _collection(MAP, function (get) {
    return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
  }, {
    // 23.1.3.6 Map.prototype.get(key)
    get: function get(key) {
      var entry = strong.getEntry(validate(this, MAP), key);
      return entry && entry.v;
    },
    // 23.1.3.9 Map.prototype.set(key, value)
    set: function set(key, value) {
      return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
    }
  }, strong, true);

  var _wksExt = {};

  _wksExt.f = _wks.exports;

  var global$2 = _global.exports;
  var core$1 = require_core();
  var wksExt$1 = _wksExt;
  var defineProperty = _objectDp.f;
  var _wksDefine = function (name) {
    var $Symbol = core$1.Symbol || (core$1.Symbol = global$2.Symbol || {});
    if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt$1.f(name) });
  };

  _wksDefine('asyncIterator');

  // all enumerable object keys, includes symbols
  var getKeys$1 = _objectKeys;
  var gOPS = _objectGops;
  var pIE = require_objectPie();
  var _enumKeys = function (it) {
    var result = getKeys$1(it);
    var getSymbols = gOPS.f;
    if (getSymbols) {
      var symbols = getSymbols(it);
      var isEnum = pIE.f;
      var i = 0;
      var key;
      while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
    } return result;
  };

  var _objectGopnExt = {};

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  var toIObject$1 = _toIobject;
  var gOPN$1 = _objectGopn.f;
  var toString = {}.toString;

  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function (it) {
    try {
      return gOPN$1(it);
    } catch (e) {
      return windowNames.slice();
    }
  };

  _objectGopnExt.f = function getOwnPropertyNames(it) {
    return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$1(toIObject$1(it));
  };

  // ECMAScript 6 symbols shim
  var global$1 = _global.exports;
  var has = _has;
  var DESCRIPTORS = _descriptors;
  var $export$5 = _export;
  var redefine$1 = _redefine.exports;
  var META = _meta.exports.KEY;
  var $fails = _fails;
  var shared = _shared.exports;
  var setToStringTag = _setToStringTag;
  var uid = _uid;
  var wks$1 = _wks.exports;
  var wksExt = _wksExt;
  var wksDefine = _wksDefine;
  var enumKeys = _enumKeys;
  var isArray = _isArray;
  var anObject$2 = _anObject;
  var isObject$1 = _isObject;
  var toObject$2 = _toObject;
  var toIObject = _toIobject;
  var toPrimitive = _toPrimitive;
  var createDesc = _propertyDesc;
  var _create = _objectCreate;
  var gOPNExt = _objectGopnExt;
  var $GOPD = _objectGopd;
  var $GOPS = _objectGops;
  var $DP = _objectDp;
  var $keys$1 = _objectKeys;
  var gOPD = $GOPD.f;
  var dP$1 = $DP.f;
  var gOPN = gOPNExt.f;
  var $Symbol = global$1.Symbol;
  var $JSON = global$1.JSON;
  var _stringify = $JSON && $JSON.stringify;
  var PROTOTYPE = 'prototype';
  var HIDDEN = wks$1('_hidden');
  var TO_PRIMITIVE = wks$1('toPrimitive');
  var isEnum = {}.propertyIsEnumerable;
  var SymbolRegistry = shared('symbol-registry');
  var AllSymbols = shared('symbols');
  var OPSymbols = shared('op-symbols');
  var ObjectProto = Object[PROTOTYPE];
  var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
  var QObject = global$1.QObject;
  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDesc = DESCRIPTORS && $fails(function () {
    return _create(dP$1({}, 'a', {
      get: function () { return dP$1(this, 'a', { value: 7 }).a; }
    })).a != 7;
  }) ? function (it, key, D) {
    var protoDesc = gOPD(ObjectProto, key);
    if (protoDesc) delete ObjectProto[key];
    dP$1(it, key, D);
    if (protoDesc && it !== ObjectProto) dP$1(ObjectProto, key, protoDesc);
  } : dP$1;

  var wrap = function (tag) {
    var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
    sym._k = tag;
    return sym;
  };

  var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    return it instanceof $Symbol;
  };

  var $defineProperty = function defineProperty(it, key, D) {
    if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
    anObject$2(it);
    key = toPrimitive(key, true);
    anObject$2(D);
    if (has(AllSymbols, key)) {
      if (!D.enumerable) {
        if (!has(it, HIDDEN)) dP$1(it, HIDDEN, createDesc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
        D = _create(D, { enumerable: createDesc(0, false) });
      } return setSymbolDesc(it, key, D);
    } return dP$1(it, key, D);
  };
  var $defineProperties = function defineProperties(it, P) {
    anObject$2(it);
    var keys = enumKeys(P = toIObject(P));
    var i = 0;
    var l = keys.length;
    var key;
    while (l > i) $defineProperty(it, key = keys[i++], P[key]);
    return it;
  };
  var $create = function create(it, P) {
    return P === undefined ? _create(it) : $defineProperties(_create(it), P);
  };
  var $propertyIsEnumerable = function propertyIsEnumerable(key) {
    var E = isEnum.call(this, key = toPrimitive(key, true));
    if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
    return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
  };
  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
    it = toIObject(it);
    key = toPrimitive(key, true);
    if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
    var D = gOPD(it, key);
    if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
    return D;
  };
  var $getOwnPropertyNames = function getOwnPropertyNames(it) {
    var names = gOPN(toIObject(it));
    var result = [];
    var i = 0;
    var key;
    while (names.length > i) {
      if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
    } return result;
  };
  var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
    var IS_OP = it === ObjectProto;
    var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
    var result = [];
    var i = 0;
    var key;
    while (names.length > i) {
      if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
    } return result;
  };

  // 19.4.1.1 Symbol([description])
  if (!USE_NATIVE) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
      var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
      var $set = function (value) {
        if (this === ObjectProto) $set.call(OPSymbols, value);
        if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, createDesc(1, value));
      };
      if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
      return wrap(tag);
    };
    redefine$1($Symbol[PROTOTYPE], 'toString', function toString() {
      return this._k;
    });

    $GOPD.f = $getOwnPropertyDescriptor;
    $DP.f = $defineProperty;
    _objectGopn.f = gOPNExt.f = $getOwnPropertyNames;
    require_objectPie().f = $propertyIsEnumerable;
    $GOPS.f = $getOwnPropertySymbols;

    if (DESCRIPTORS && !_library) {
      redefine$1(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
    }

    wksExt.f = function (name) {
      return wrap(wks$1(name));
    };
  }

  $export$5($export$5.G + $export$5.W + $export$5.F * !USE_NATIVE, { Symbol: $Symbol });

  for (var es6Symbols = (
    // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
    'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
  ).split(','), j = 0; es6Symbols.length > j;)wks$1(es6Symbols[j++]);

  for (var wellKnownSymbols = $keys$1(wks$1.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

  $export$5($export$5.S + $export$5.F * !USE_NATIVE, 'Symbol', {
    // 19.4.2.1 Symbol.for(key)
    'for': function (key) {
      return has(SymbolRegistry, key += '')
        ? SymbolRegistry[key]
        : SymbolRegistry[key] = $Symbol(key);
    },
    // 19.4.2.5 Symbol.keyFor(sym)
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
      for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
    },
    useSetter: function () { setter = true; },
    useSimple: function () { setter = false; }
  });

  $export$5($export$5.S + $export$5.F * !USE_NATIVE, 'Object', {
    // 19.1.2.2 Object.create(O [, Properties])
    create: $create,
    // 19.1.2.4 Object.defineProperty(O, P, Attributes)
    defineProperty: $defineProperty,
    // 19.1.2.3 Object.defineProperties(O, Properties)
    defineProperties: $defineProperties,
    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    // 19.1.2.7 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: $getOwnPropertyNames,
    // 19.1.2.8 Object.getOwnPropertySymbols(O)
    getOwnPropertySymbols: $getOwnPropertySymbols
  });

  // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443
  var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

  $export$5($export$5.S + $export$5.F * FAILS_ON_PRIMITIVES, 'Object', {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return $GOPS.f(toObject$2(it));
    }
  });

  // 24.3.2 JSON.stringify(value [, replacer [, space]])
  $JSON && $export$5($export$5.S + $export$5.F * (!USE_NATIVE || $fails(function () {
    var S = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    // WebKit converts symbol values to JSON as null
    // V8 throws on boxed symbols
    return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
  })), 'JSON', {
    stringify: function stringify(it) {
      var args = [it];
      var i = 1;
      var replacer, $replacer;
      while (arguments.length > i) args.push(arguments[i++]);
      $replacer = replacer = args[1];
      if (!isObject$1(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return _stringify.apply($JSON, args);
    }
  });

  // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
  $Symbol[PROTOTYPE][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
  // 19.4.3.5 Symbol.prototype[@@toStringTag]
  setToStringTag($Symbol, 'Symbol');
  // 20.2.1.9 Math[@@toStringTag]
  setToStringTag(Math, 'Math', true);
  // 24.3.3 JSON[@@toStringTag]
  setToStringTag(global$1.JSON, 'JSON', true);

  // https://github.com/tc39/Array.prototype.includes
  var $export$4 = _export;
  var $includes = _arrayIncludes(true);

  $export$4($export$4.P, 'Array', {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  _addToUnscopables('includes');

  var $export$3 = _export;
  var context = _stringContext;
  var INCLUDES = 'includes';

  $export$3($export$3.P + $export$3.F * require_failsIsRegexp()(INCLUDES), 'String', {
    includes: function includes(searchString /* , position = 0 */) {
      return !!~context(this, searchString, INCLUDES)
        .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var anObject$1 = _anObject;
  var toObject$1 = _toObject;
  var toLength$2 = _toLength;
  var toInteger = _toInteger;
  var advanceStringIndex$1 = _advanceStringIndex;
  var regExpExec = _regexpExecAbstract;
  var max = Math.max;
  var min = Math.min;
  var floor = Math.floor;
  var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // @@replace logic
  _fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
    return [
      // `String.prototype.replace` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = defined(this);
        var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
        return fn !== undefined
          ? fn.call(searchValue, O, replaceValue)
          : $replace.call(String(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
      function (regexp, replaceValue) {
        var res = maybeCallNative($replace, regexp, this, replaceValue);
        if (res.done) return res.value;

        var rx = anObject$1(regexp);
        var S = String(this);
        var functionalReplace = typeof replaceValue === 'function';
        if (!functionalReplace) replaceValue = String(replaceValue);
        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regExpExec(rx, S);
          if (result === null) break;
          results.push(result);
          if (!global) break;
          var matchStr = String(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$2(rx.lastIndex), fullUnicode);
        }
        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];
          var matched = String(result[0]);
          var position = max(min(toInteger(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S);
            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
            var replacement = String(replaceValue.apply(undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + S.slice(nextSourcePosition);
      }
    ];

      // https://tc39.github.io/ecma262/#sec-getsubstitution
    function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
      var tailPos = position + matched.length;
      var m = captures.length;
      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
      if (namedCaptures !== undefined) {
        namedCaptures = toObject$1(namedCaptures);
        symbols = SUBSTITUTION_SYMBOLS;
      }
      return $replace.call(replacement, symbols, function (match, ch) {
        var capture;
        switch (ch.charAt(0)) {
          case '$': return '$';
          case '&': return matched;
          case '`': return str.slice(0, position);
          case "'": return str.slice(tailPos);
          case '<':
            capture = namedCaptures[ch.slice(1, -1)];
            break;
          default: // \d\d?
            var n = +ch;
            if (n === 0) return match;
            if (n > m) {
              var f = floor(n / 10);
              if (f === 0) return match;
              if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
              return match;
            }
            capture = captures[n - 1];
        }
        return capture === undefined ? '' : capture;
      });
    }
  });

  var $export$2 = _export;
  var html = _html;
  var cof = _cof;
  var toAbsoluteIndex = _toAbsoluteIndex;
  var toLength$1 = _toLength;
  var arraySlice = [].slice;

  // fallback for not array-like ES3 strings and DOM objects
  $export$2($export$2.P + $export$2.F * _fails(function () {
    if (html) arraySlice.call(html);
  }), 'Array', {
    slice: function slice(begin, end) {
      var len = toLength$1(this.length);
      var klass = cof(this);
      end = end === undefined ? len : end;
      if (klass == 'Array') return arraySlice.call(this, begin, end);
      var start = toAbsoluteIndex(begin, len);
      var upTo = toAbsoluteIndex(end, len);
      var size = toLength$1(upTo - start);
      var cloned = new Array(size);
      var i = 0;
      for (; i < size; i++) cloned[i] = klass == 'String'
        ? this.charAt(start + i)
        : this[start + i];
      return cloned;
    }
  });

  var $export$1 = _export;
  var $map = _arrayMethods(1);

  $export$1($export$1.P + $export$1.F * !require_strictMethod()([].map, true), 'Array', {
    // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments[1]);
    }
  });

  var isRegExp = _isRegexp;
  var anObject = _anObject;
  var speciesConstructor = _speciesConstructor;
  var advanceStringIndex = _advanceStringIndex;
  var toLength = _toLength;
  var callRegExpExec = _regexpExecAbstract;
  var regexpExec = _regexpExec;
  var fails$1 = _fails;
  var $min = Math.min;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  var MAX_UINT32 = 0xffffffff;

  // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
  var SUPPORTS_Y = !fails$1(function () { RegExp(MAX_UINT32, 'y'); });

  // @@split logic
  _fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
    var internalSplit;
    if (
      'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
      'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
      'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
      '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
      '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
      ''[$SPLIT](/.?/)[LENGTH]
    ) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = String(this);
        if (separator === undefined && limit === 0) return [];
        // If `separator` is not a regex, use native split
        if (!isRegExp(separator)) return $split.call(string, separator, limit);
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') +
                    (separator.multiline ? 'm' : '') +
                    (separator.unicode ? 'u' : '') +
                    (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var match, lastIndex, lastLength;
        while (match = regexpExec.call(separatorCopy, string)) {
          lastIndex = separatorCopy[LAST_INDEX];
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
            lastLength = match[0][LENGTH];
            lastLastIndex = lastIndex;
            if (output[LENGTH] >= splitLimit) break;
          }
          if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
        }
        if (lastLastIndex === string[LENGTH]) {
          if (lastLength || !separatorCopy.test('')) output.push('');
        } else output.push(string.slice(lastLastIndex));
        return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
      };
    // Chakra, V8
    } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
      };
    } else {
      internalSplit = $split;
    }

    return [
      // `String.prototype.split` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = defined(this);
        var splitter = separator == undefined ? undefined : separator[SPLIT];
        return splitter !== undefined
          ? splitter.call(separator, O, limit)
          : internalSplit.call(String(O), separator, limit);
      },
      // `RegExp.prototype[@@split]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function (regexp, limit) {
        var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);
        var C = speciesConstructor(rx, RegExp);

        var unicodeMatching = rx.unicode;
        var flags = (rx.ignoreCase ? 'i' : '') +
                    (rx.multiline ? 'm' : '') +
                    (rx.unicode ? 'u' : '') +
                    (SUPPORTS_Y ? 'y' : 'g');

        // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.
        var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
        var p = 0;
        var q = 0;
        var A = [];
        while (q < S.length) {
          splitter.lastIndex = SUPPORTS_Y ? q : 0;
          var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
          var e;
          if (
            z === null ||
            (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
          ) {
            q = advanceStringIndex(S, q, unicodeMatching);
          } else {
            A.push(S.slice(p, q));
            if (A.length === lim) return A;
            for (var i = 1; i <= z.length - 1; i++) {
              A.push(z[i]);
              if (A.length === lim) return A;
            }
            q = p = e;
          }
        }
        A.push(S.slice(p));
        return A;
      }
    ];
  });

  var dP = _objectDp.f;
  var FProto = Function.prototype;
  var nameRE = /^\s*function ([^ (]*)/;
  var NAME$1 = 'name';

  // 19.2.4.2 name
  NAME$1 in FProto || _descriptors && dP(FProto, NAME$1, {
    configurable: true,
    get: function () {
      try {
        return ('' + this).match(nameRE)[1];
      } catch (e) {
        return '';
      }
    }
  });

  // B.2.3.5 String.prototype.bold()
  _stringHtml('bold', function (createHTML) {
    return function bold() {
      return createHTML(this, 'b', '', '');
    };
  });

  var $iterators = es6_array_iterator;
  var getKeys = _objectKeys;
  var redefine = _redefine.exports;
  var global = _global.exports;
  var hide = _hide;
  var Iterators = _iterators;
  var wks = _wks.exports;
  var ITERATOR = wks('iterator');
  var TO_STRING_TAG = wks('toStringTag');
  var ArrayValues = Iterators.Array;

  var DOMIterables = {
    CSSRuleList: true, // TODO: Not spec compliant, should be false.
    CSSStyleDeclaration: false,
    CSSValueList: false,
    ClientRectList: false,
    DOMRectList: false,
    DOMStringList: false,
    DOMTokenList: true,
    DataTransferItemList: false,
    FileList: false,
    HTMLAllCollection: false,
    HTMLCollection: false,
    HTMLFormElement: false,
    HTMLSelectElement: false,
    MediaList: true, // TODO: Not spec compliant, should be false.
    MimeTypeArray: false,
    NamedNodeMap: false,
    NodeList: true,
    PaintRequestList: false,
    Plugin: false,
    PluginArray: false,
    SVGLengthList: false,
    SVGNumberList: false,
    SVGPathSegList: false,
    SVGPointList: false,
    SVGStringList: false,
    SVGTransformList: false,
    SourceBufferList: false,
    StyleSheetList: true, // TODO: Not spec compliant, should be false.
    TextTrackCueList: false,
    TextTrackList: false,
    TouchList: false
  };

  for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
    var NAME = collections[i];
    var explicit = DOMIterables[NAME];
    var Collection = global[NAME];
    var proto = Collection && Collection.prototype;
    var key;
    if (proto) {
      if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
      if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
      Iterators[NAME] = ArrayValues;
      if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
    }
  }

  // 19.1.3.6 Object.prototype.toString()
  var classof = _classof;
  var test = {};
  test[_wks.exports('toStringTag')] = 'z';
  if (test + '' != '[object z]') {
    _redefine.exports(Object.prototype, 'toString', function toString() {
      return '[object ' + classof(this) + ']';
    }, true);
  }

  // most Object methods by ES6 should accept primitives
  var $export = _export;
  var core = require_core();
  var fails = _fails;
  var _objectSap = function (KEY, exec) {
    var fn = (core.Object || {})[KEY] || Object[KEY];
    var exp = {};
    exp[KEY] = exec(fn);
    $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
  };

  // 19.1.2.14 Object.keys(O)
  var toObject = _toObject;
  var $keys = _objectKeys;

  _objectSap('keys', function () {
    return function keys(it) {
      return $keys(toObject(it));
    };
  });

  // 19.1.2.5 Object.freeze(O)
  var isObject = _isObject;
  var meta = _meta.exports.onFreeze;

  _objectSap('freeze', function ($freeze) {
    return function freeze(it) {
      return $freeze && isObject(it) ? $freeze(meta(it)) : it;
    };
  });

})();