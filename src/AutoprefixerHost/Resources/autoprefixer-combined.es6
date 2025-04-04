/*!
 * Autoprefixer v10.4.21.0
 * https://github.com/postcss/autoprefixer
 * https://github.com/ai/autoprefixer-rails
 *
 * Copyright (C) 2013 Andrey Sitnik <andrey@sitnik.ru>
 * Released under the terms of MIT license
 */
var autoprefixer = (function (countryStatisticsService, undefined /*AH+*/) {
  'use strict';

  var global$1 = (typeof global !== "undefined" ? global :
    typeof self !== "undefined" ? self :
    typeof window !== "undefined" ? window : {});

  // shim for using process in browser
  // based off https://github.com/defunctzombie/node-process/blob/master/browser.js

  function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
  }
  function defaultClearTimeout () {
      throw new Error('clearTimeout has not been defined');
  }
  var cachedSetTimeout = defaultSetTimout;
  var cachedClearTimeout = defaultClearTimeout;
  if (typeof global$1.setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
  }
  if (typeof global$1.clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
  }

  function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
      }
      // if setTimeout wasn't available but was latter defined
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
      } catch(e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
              return cachedSetTimeout.call(null, fun, 0);
          } catch(e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
              return cachedSetTimeout.call(this, fun, 0);
          }
      }


  }
  function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
      }
      // if clearTimeout wasn't available but was latter defined
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
      } catch (e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
              return cachedClearTimeout.call(null, marker);
          } catch (e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
              // Some versions of I.E. have different rules for clearTimeout vs setTimeout
              return cachedClearTimeout.call(this, marker);
          }
      }



  }
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;

  function cleanUpNextTick() {
      if (!draining || !currentQueue) {
          return;
      }
      draining = false;
      if (currentQueue.length) {
          queue = currentQueue.concat(queue);
      } else {
          queueIndex = -1;
      }
      if (queue.length) {
          drainQueue();
      }
  }

  function drainQueue() {
      if (draining) {
          return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;

      var len = queue.length;
      while(len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
              if (currentQueue) {
                  currentQueue[queueIndex].run();
              }
          }
          queueIndex = -1;
          len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
  }
  function nextTick(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
          }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
      }
  }
  // v8 likes predictible objects
  function Item(fun, array) {
      this.fun = fun;
      this.array = array;
  }
  Item.prototype.run = function () {
      this.fun.apply(null, this.array);
  };
  var title = 'browser';
  var platform = 'browser';
  var browser$1 = true;
  var env$1 = {};
  var argv = [];
  var version = ''; // empty string to avoid regexp issues
  var versions$3 = {};
  var release = {};
  var config = {};

  function noop$1() {}

  var on = noop$1;
  var addListener = noop$1;
  var once = noop$1;
  var off = noop$1;
  var removeListener = noop$1;
  var removeAllListeners = noop$1;
  var emit = noop$1;

  function binding(name) {
      throw new Error('process.binding is not supported');
  }

  function cwd () { return '/' }
  function chdir (dir) {
      throw new Error('process.chdir is not supported');
  }function umask() { return 0; }

  // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
  var performance = global$1.performance || {};
  var performanceNow =
    performance.now        ||
    performance.mozNow     ||
    performance.msNow      ||
    performance.oNow       ||
    performance.webkitNow  ||
    function(){ return (new Date()).getTime() };

  // generate timestamp or delta
  // see http://nodejs.org/api/process.html#process_process_hrtime
  function hrtime(previousTimestamp){
    var clocktime = performanceNow.call(performance)*1e-3;
    var seconds = Math.floor(clocktime);
    var nanoseconds = Math.floor((clocktime%1)*1e9);
    if (previousTimestamp) {
      seconds = seconds - previousTimestamp[0];
      nanoseconds = nanoseconds - previousTimestamp[1];
      if (nanoseconds<0) {
        seconds--;
        nanoseconds += 1e9;
      }
    }
    return [seconds,nanoseconds]
  }

  var startTime = new Date();
  function uptime() {
    var currentTime = new Date();
    var dif = currentTime - startTime;
    return dif / 1000;
  }

  var browser$1$1 = {
    nextTick: nextTick,
    title: title,
    browser: browser$1,
    env: env$1,
    argv: argv,
    version: version,
    versions: versions$3,
    on: on,
    addListener: addListener,
    once: once,
    off: off,
    removeListener: removeListener,
    removeAllListeners: removeAllListeners,
    emit: emit,
    binding: binding,
    cwd: cwd,
    chdir: chdir,
    umask: umask,
    hrtime: hrtime,
    platform: platform,
    release: release,
    config: config,
    uptime: uptime
  };

  var process = browser$1$1;

  function getAugmentedNamespace(n) {
    var f = n.default;
  	if (typeof f == "function") {
  		var a = function a () {
  			if (this instanceof a) {
  				var args = [null];
  				args.push.apply(args, arguments);
  				var Ctor = Function.bind.apply(f, args);
  				return new Ctor();
  			}
  			return f.apply(this, arguments);
  		};
  		a.prototype = f.prototype;
    } else a = {};
    Object.defineProperty(a, '__esModule', {value: true});
  	Object.keys(n).forEach(function (k) {
  		var d = Object.getOwnPropertyDescriptor(n, k);
  		Object.defineProperty(a, k, d.get ? d : {
  			enumerable: true,
  			get: function () {
  				return n[k];
  			}
  		});
  	});
  	return a;
  }

  var picocolors_browser = {exports: {}};

  var x=String;
  var create=function() {return {isColorSupported:false,reset:x,bold:x,dim:x,italic:x,underline:x,inverse:x,hidden:x,strikethrough:x,black:x,red:x,green:x,yellow:x,blue:x,magenta:x,cyan:x,white:x,gray:x,bgBlack:x,bgRed:x,bgGreen:x,bgYellow:x,bgBlue:x,bgMagenta:x,bgCyan:x,bgWhite:x,blackBright:x,redBright:x,greenBright:x,yellowBright:x,blueBright:x,magentaBright:x,cyanBright:x,whiteBright:x,bgBlackBright:x,bgRedBright:x,bgGreenBright:x,bgYellowBright:x,bgBlueBright:x,bgMagentaBright:x,bgCyanBright:x,bgWhiteBright:x}};
  picocolors_browser.exports=create();
  picocolors_browser.exports.createColors = create;

  var _nodeResolve_empty = {};

  var _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: _nodeResolve_empty
  });

  var require$$6 = /*@__PURE__*/getAugmentedNamespace(_nodeResolve_empty$1);

  let pico$1 = picocolors_browser.exports;

  let terminalHighlight$1 = require$$6;

  let CssSyntaxError$3 = class CssSyntaxError extends Error {
    constructor(message, line, column, source, file, plugin) {
      super(message);
      this.name = 'CssSyntaxError';
      this.reason = message;

      if (file) {
        this.file = file;
      }
      if (source) {
        this.source = source;
      }
      if (plugin) {
        this.plugin = plugin;
      }
      if (typeof line !== 'undefined' && typeof column !== 'undefined') {
        if (typeof line === 'number') {
          this.line = line;
          this.column = column;
        } else {
          this.line = line.line;
          this.column = line.column;
          this.endLine = column.line;
          this.endColumn = column.column;
        }
      }

      this.setMessage();

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CssSyntaxError);
      }
    }

    setMessage() {
      this.message = this.plugin ? this.plugin + ': ' : '';
      this.message += this.file ? this.file : '<css input>';
      if (typeof this.line !== 'undefined') {
        this.message += ':' + this.line + ':' + this.column;
      }
      this.message += ': ' + this.reason;
    }

    showSourceCode(color) {
      if (!this.source) return ''

      let css = this.source;
      if (color == null) color = pico$1.isColorSupported;

      let aside = text => text;
      let mark = text => text;
      let highlight = text => text;
      if (color) {
        let { bold, gray, red } = pico$1.createColors(true);
        mark = text => bold(red(text));
        aside = text => gray(text);
        if (terminalHighlight$1) {
          highlight = text => terminalHighlight$1(text);
        }
      }

      let lines = css.split(/\r?\n/);
      let start = Math.max(this.line - 3, 0);
      let end = Math.min(this.line + 2, lines.length);
      let maxWidth = String(end).length;

      return lines
        .slice(start, end)
        .map((line, index) => {
          let number = start + 1 + index;
          let gutter = ' ' + (' ' + number).slice(-maxWidth) + ' | ';
          if (number === this.line) {
            if (line.length > 160) {
              let padding = 20;
              let subLineStart = Math.max(0, this.column - padding);
              let subLineEnd = Math.max(
                this.column + padding,
                this.endColumn + padding
              );
              let subLine = line.slice(subLineStart, subLineEnd);

              let spacing =
                aside(gutter.replace(/\d/g, ' ')) +
                line
                  .slice(0, Math.min(this.column - 1, padding - 1))
                  .replace(/[^\t]/g, ' ');

              return (
                mark('>') +
                aside(gutter) +
                highlight(subLine) +
                '\n ' +
                spacing +
                mark('^')
              )
            }

            let spacing =
              aside(gutter.replace(/\d/g, ' ')) +
              line.slice(0, this.column - 1).replace(/[^\t]/g, ' ');

            return (
              mark('>') +
              aside(gutter) +
              highlight(line) +
              '\n ' +
              spacing +
              mark('^')
            )
          }

          return ' ' + aside(gutter) + highlight(line)
        })
        .join('\n')
    }

    toString() {
      let code = this.showSourceCode();
      if (code) {
        code = '\n\n' + code + '\n';
      }
      return this.name + ': ' + this.message + code
    }
  };

  var cssSyntaxError = CssSyntaxError$3;
  CssSyntaxError$3.default = CssSyntaxError$3;

  const DEFAULT_RAW = {
    after: '\n',
    beforeClose: '\n',
    beforeComment: '\n',
    beforeDecl: '\n',
    beforeOpen: ' ',
    beforeRule: '\n',
    colon: ': ',
    commentLeft: ' ',
    commentRight: ' ',
    emptyBody: '',
    indent: '    ',
    semicolon: false
  };

  function capitalize$1(str) {
    return str[0].toUpperCase() + str.slice(1)
  }

  let Stringifier$2 = class Stringifier {
    constructor(builder) {
      this.builder = builder;
    }

    atrule(node, semicolon) {
      let name = '@' + node.name;
      let params = node.params ? this.rawValue(node, 'params') : '';

      if (typeof node.raws.afterName !== 'undefined') {
        name += node.raws.afterName;
      } else if (params) {
        name += ' ';
      }

      if (node.nodes) {
        this.block(node, name + params);
      } else {
        let end = (node.raws.between || '') + (semicolon ? ';' : '');
        this.builder(name + params + end, node);
      }
    }

    beforeAfter(node, detect) {
      let value;
      if (node.type === 'decl') {
        value = this.raw(node, null, 'beforeDecl');
      } else if (node.type === 'comment') {
        value = this.raw(node, null, 'beforeComment');
      } else if (detect === 'before') {
        value = this.raw(node, null, 'beforeRule');
      } else {
        value = this.raw(node, null, 'beforeClose');
      }

      let buf = node.parent;
      let depth = 0;
      while (buf && buf.type !== 'root') {
        depth += 1;
        buf = buf.parent;
      }

      if (value.includes('\n')) {
        let indent = this.raw(node, null, 'indent');
        if (indent.length) {
          for (let step = 0; step < depth; step++) value += indent;
        }
      }

      return value
    }

    block(node, start) {
      let between = this.raw(node, 'between', 'beforeOpen');
      this.builder(start + between + '{', node, 'start');

      let after;
      if (node.nodes && node.nodes.length) {
        this.body(node);
        after = this.raw(node, 'after');
      } else {
        after = this.raw(node, 'after', 'emptyBody');
      }

      if (after) this.builder(after);
      this.builder('}', node, 'end');
    }

    body(node) {
      let last = node.nodes.length - 1;
      while (last > 0) {
        if (node.nodes[last].type !== 'comment') break
        last -= 1;
      }

      let semicolon = this.raw(node, 'semicolon');
      for (let i = 0; i < node.nodes.length; i++) {
        let child = node.nodes[i];
        let before = this.raw(child, 'before');
        if (before) this.builder(before);
        this.stringify(child, last !== i || semicolon);
      }
    }

    comment(node) {
      let left = this.raw(node, 'left', 'commentLeft');
      let right = this.raw(node, 'right', 'commentRight');
      this.builder('/*' + left + node.text + right + '*/', node);
    }

    decl(node, semicolon) {
      let between = this.raw(node, 'between', 'colon');
      let string = node.prop + between + this.rawValue(node, 'value');

      if (node.important) {
        string += node.raws.important || ' !important';
      }

      if (semicolon) string += ';';
      this.builder(string, node);
    }

    document(node) {
      this.body(node);
    }

    raw(node, own, detect) {
      let value;
      if (!detect) detect = own;

      // Already had
      if (own) {
        value = node.raws[own];
        if (typeof value !== 'undefined') return value
      }

      let parent = node.parent;

      if (detect === 'before') {
        // Hack for first rule in CSS
        if (!parent || (parent.type === 'root' && parent.first === node)) {
          return ''
        }

        // `root` nodes in `document` should use only their own raws
        if (parent && parent.type === 'document') {
          return ''
        }
      }

      // Floating child without parent
      if (!parent) return DEFAULT_RAW[detect]

      // Detect style by other nodes
      let root = node.root();
      if (!root.rawCache) root.rawCache = {};
      if (typeof root.rawCache[detect] !== 'undefined') {
        return root.rawCache[detect]
      }

      if (detect === 'before' || detect === 'after') {
        return this.beforeAfter(node, detect)
      } else {
        let method = 'raw' + capitalize$1(detect);
        if (this[method]) {
          value = this[method](root, node);
        } else {
          root.walk(i => {
            value = i.raws[own];
            if (typeof value !== 'undefined') return false
          });
        }
      }

      if (typeof value === 'undefined') value = DEFAULT_RAW[detect];

      root.rawCache[detect] = value;
      return value
    }

    rawBeforeClose(root) {
      let value;
      root.walk(i => {
        if (i.nodes && i.nodes.length > 0) {
          if (typeof i.raws.after !== 'undefined') {
            value = i.raws.after;
            if (value.includes('\n')) {
              value = value.replace(/[^\n]+$/, '');
            }
            return false
          }
        }
      });
      if (value) value = value.replace(/\S/g, '');
      return value
    }

    rawBeforeComment(root, node) {
      let value;
      root.walkComments(i => {
        if (typeof i.raws.before !== 'undefined') {
          value = i.raws.before;
          if (value.includes('\n')) {
            value = value.replace(/[^\n]+$/, '');
          }
          return false
        }
      });
      if (typeof value === 'undefined') {
        value = this.raw(node, null, 'beforeDecl');
      } else if (value) {
        value = value.replace(/\S/g, '');
      }
      return value
    }

    rawBeforeDecl(root, node) {
      let value;
      root.walkDecls(i => {
        if (typeof i.raws.before !== 'undefined') {
          value = i.raws.before;
          if (value.includes('\n')) {
            value = value.replace(/[^\n]+$/, '');
          }
          return false
        }
      });
      if (typeof value === 'undefined') {
        value = this.raw(node, null, 'beforeRule');
      } else if (value) {
        value = value.replace(/\S/g, '');
      }
      return value
    }

    rawBeforeOpen(root) {
      let value;
      root.walk(i => {
        if (i.type !== 'decl') {
          value = i.raws.between;
          if (typeof value !== 'undefined') return false
        }
      });
      return value
    }

    rawBeforeRule(root) {
      let value;
      root.walk(i => {
        if (i.nodes && (i.parent !== root || root.first !== i)) {
          if (typeof i.raws.before !== 'undefined') {
            value = i.raws.before;
            if (value.includes('\n')) {
              value = value.replace(/[^\n]+$/, '');
            }
            return false
          }
        }
      });
      if (value) value = value.replace(/\S/g, '');
      return value
    }

    rawColon(root) {
      let value;
      root.walkDecls(i => {
        if (typeof i.raws.between !== 'undefined') {
          value = i.raws.between.replace(/[^\s:]/g, '');
          return false
        }
      });
      return value
    }

    rawEmptyBody(root) {
      let value;
      root.walk(i => {
        if (i.nodes && i.nodes.length === 0) {
          value = i.raws.after;
          if (typeof value !== 'undefined') return false
        }
      });
      return value
    }

    rawIndent(root) {
      if (root.raws.indent) return root.raws.indent
      let value;
      root.walk(i => {
        let p = i.parent;
        if (p && p !== root && p.parent && p.parent === root) {
          if (typeof i.raws.before !== 'undefined') {
            let parts = i.raws.before.split('\n');
            value = parts[parts.length - 1];
            value = value.replace(/\S/g, '');
            return false
          }
        }
      });
      return value
    }

    rawSemicolon(root) {
      let value;
      root.walk(i => {
        if (i.nodes && i.nodes.length && i.last.type === 'decl') {
          value = i.raws.semicolon;
          if (typeof value !== 'undefined') return false
        }
      });
      return value
    }

    rawValue(node, prop) {
      let value = node[prop];
      let raw = node.raws[prop];
      if (raw && raw.value === value) {
        return raw.raw
      }

      return value
    }

    root(node) {
      this.body(node);
      if (node.raws.after) this.builder(node.raws.after);
    }

    rule(node) {
      this.block(node, this.rawValue(node, 'selector'));
      if (node.raws.ownSemicolon) {
        this.builder(node.raws.ownSemicolon, node, 'end');
      }
    }

    stringify(node, semicolon) {
      /* c8 ignore start */
      if (!this[node.type]) {
        throw new Error(
          'Unknown AST node type ' +
            node.type +
            '. ' +
            'Maybe you need to change PostCSS stringifier.'
        )
      }
      /* c8 ignore stop */
      this[node.type](node, semicolon);
    }
  };

  var stringifier = Stringifier$2;
  Stringifier$2.default = Stringifier$2;

  let Stringifier$1 = stringifier;

  function stringify$7(node, builder) {
    let str = new Stringifier$1(builder);
    str.stringify(node);
  }

  var stringify_1$1 = stringify$7;
  stringify$7.default = stringify$7;

  var symbols = {};

  symbols.isClean = Symbol('isClean');

  symbols.my = Symbol('my');

  let CssSyntaxError$2 = cssSyntaxError;
  let Stringifier = stringifier;
  let stringify$6 = stringify_1$1;
  let { isClean: isClean$2, my: my$2 } = symbols;

  function cloneNode(obj, parent) {
    let cloned = new obj.constructor();

    for (let i in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, i)) {
        /* c8 ignore next 2 */
        continue
      }
      if (i === 'proxyCache') continue
      let value = obj[i];
      let type = typeof value;

      if (i === 'parent' && type === 'object') {
        if (parent) cloned[i] = parent;
      } else if (i === 'source') {
        cloned[i] = value;
      } else if (Array.isArray(value)) {
        cloned[i] = value.map(j => cloneNode(j, cloned));
      } else {
        if (type === 'object' && value !== null) value = cloneNode(value);
        cloned[i] = value;
      }
    }

    return cloned
  }

  function sourceOffset(inputCSS, position) {
    // Not all custom syntaxes support `offset` in `source.start` and `source.end`
    if (
      position &&
      typeof position.offset !== 'undefined'
    ) {
      return position.offset;
    }

    let column = 1;
    let line = 1;
    let offset = 0;

    for (let i = 0; i < inputCSS.length; i++) {
      if (line === position.line && column === position.column) {
        offset = i;
        break
      }

      if (inputCSS[i] === '\n') {
        column = 1;
        line += 1;
      } else {
        column += 1;
      }
    }

    return offset
  }

  let Node$4 = class Node {
    get proxyOf() {
      return this
    }

    constructor(defaults = {}) {
      this.raws = {};
      this[isClean$2] = false;
      this[my$2] = true;

      for (let name in defaults) {
        if (name === 'nodes') {
          this.nodes = [];
          for (let node of defaults[name]) {
            if (typeof node.clone === 'function') {
              this.append(node.clone());
            } else {
              this.append(node);
            }
          }
        } else {
          this[name] = defaults[name];
        }
      }
    }

    addToError(error) {
      error.postcssNode = this;
      if (error.stack && this.source && /\n\s{4}at /.test(error.stack)) {
        let s = this.source;
        error.stack = error.stack.replace(
          /\n\s{4}at /,
          `$&${s.input.from}:${s.start.line}:${s.start.column}$&`
        );
      }
      return error
    }

    after(add) {
      this.parent.insertAfter(this, add);
      return this
    }

    assign(overrides = {}) {
      for (let name in overrides) {
        this[name] = overrides[name];
      }
      return this
    }

    before(add) {
      this.parent.insertBefore(this, add);
      return this
    }

    cleanRaws(keepBetween) {
      delete this.raws.before;
      delete this.raws.after;
      if (!keepBetween) delete this.raws.between;
    }

    clone(overrides = {}) {
      let cloned = cloneNode(this);
      for (let name in overrides) {
        cloned[name] = overrides[name];
      }
      return cloned
    }

    cloneAfter(overrides = {}) {
      let cloned = this.clone(overrides);
      this.parent.insertAfter(this, cloned);
      return cloned
    }

    cloneBefore(overrides = {}) {
      let cloned = this.clone(overrides);
      this.parent.insertBefore(this, cloned);
      return cloned
    }

    error(message, opts = {}) {
      if (this.source) {
        let { end, start } = this.rangeBy(opts);
        return this.source.input.error(
          message,
          { column: start.column, line: start.line },
          { column: end.column, line: end.line },
          opts
        )
      }
      return new CssSyntaxError$2(message)
    }

    getProxyProcessor() {
      return {
        get(node, prop) {
          if (prop === 'proxyOf') {
            return node
          } else if (prop === 'root') {
            return () => node.root().toProxy()
          } else {
            return node[prop]
          }
        },

        set(node, prop, value) {
          if (node[prop] === value) return true
          node[prop] = value;
          if (
            prop === 'prop' ||
            prop === 'value' ||
            prop === 'name' ||
            prop === 'params' ||
            prop === 'important' ||
            /* c8 ignore next */
            prop === 'text'
          ) {
            node.markDirty();
          }
          return true
        }
      }
    }

    /* c8 ignore next 3 */
    markClean() {
      this[isClean$2] = true;
    }

    markDirty() {
      if (this[isClean$2]) {
        this[isClean$2] = false;
        let next = this;
        while ((next = next.parent)) {
          next[isClean$2] = false;
        }
      }
    }

    next() {
      if (!this.parent) return undefined
      let index = this.parent.index(this);
      return this.parent.nodes[index + 1]
    }

    positionBy(opts) {
      let pos = this.source.start;
      if (opts.index) {
        pos = this.positionInside(opts.index);
      } else if (opts.word) {
        let inputString = ('document' in this.source.input)
          ? this.source.input.document
          : this.source.input.css;
        let stringRepresentation = inputString.slice(
          sourceOffset(inputString, this.source.start),
          sourceOffset(inputString, this.source.end)
        );
        let index = stringRepresentation.indexOf(opts.word);
        if (index !== -1) pos = this.positionInside(index);
      }
      return pos
    }

    positionInside(index) {
      let column = this.source.start.column;
      let line = this.source.start.line;
      let inputString = ('document' in this.source.input)
        ? this.source.input.document
        : this.source.input.css;
      let offset = sourceOffset(inputString, this.source.start);
      let end = offset + index;

      for (let i = offset; i < end; i++) {
        if (inputString[i] === '\n') {
          column = 1;
          line += 1;
        } else {
          column += 1;
        }
      }

      return { column, line }
    }

    prev() {
      if (!this.parent) return undefined
      let index = this.parent.index(this);
      return this.parent.nodes[index - 1]
    }

    rangeBy(opts) {
      let start = {
        column: this.source.start.column,
        line: this.source.start.line
      };
      let end = this.source.end
        ? {
            column: this.source.end.column + 1,
            line: this.source.end.line
          }
        : {
            column: start.column + 1,
            line: start.line
          };

      if (opts.word) {
        let inputString = ('document' in this.source.input)
          ? this.source.input.document
          : this.source.input.css;
        let stringRepresentation = inputString.slice(
          sourceOffset(inputString, this.source.start),
          sourceOffset(inputString, this.source.end)
        );
        let index = stringRepresentation.indexOf(opts.word);
        if (index !== -1) {
          start = this.positionInside(index);
          end = this.positionInside(
            index + opts.word.length,
          );
        }
      } else {
        if (opts.start) {
          start = {
            column: opts.start.column,
            line: opts.start.line
          };
        } else if (opts.index) {
          start = this.positionInside(opts.index);
        }

        if (opts.end) {
          end = {
            column: opts.end.column,
            line: opts.end.line
          };
        } else if (typeof opts.endIndex === 'number') {
          end = this.positionInside(opts.endIndex);
        } else if (opts.index) {
          end = this.positionInside(opts.index + 1);
        }
      }

      if (
        end.line < start.line ||
        (end.line === start.line && end.column <= start.column)
      ) {
        end = { column: start.column + 1, line: start.line };
      }

      return { end, start }
    }

    raw(prop, defaultType) {
      let str = new Stringifier();
      return str.raw(this, prop, defaultType)
    }

    remove() {
      if (this.parent) {
        this.parent.removeChild(this);
      }
      this.parent = undefined;
      return this
    }

    replaceWith(...nodes) {
      if (this.parent) {
        let bookmark = this;
        let foundSelf = false;
        for (let node of nodes) {
          if (node === this) {
            foundSelf = true;
          } else if (foundSelf) {
            this.parent.insertAfter(bookmark, node);
            bookmark = node;
          } else {
            this.parent.insertBefore(bookmark, node);
          }
        }

        if (!foundSelf) {
          this.remove();
        }
      }

      return this
    }

    root() {
      let result = this;
      while (result.parent && result.parent.type !== 'document') {
        result = result.parent;
      }
      return result
    }

    toJSON(_, inputs) {
      let fixed = {};
      let emitInputs = inputs == null;
      inputs = inputs || new Map();
      let inputsNextIndex = 0;

      for (let name in this) {
        if (!Object.prototype.hasOwnProperty.call(this, name)) {
          /* c8 ignore next 2 */
          continue
        }
        if (name === 'parent' || name === 'proxyCache') continue
        let value = this[name];

        if (Array.isArray(value)) {
          fixed[name] = value.map(i => {
            if (typeof i === 'object' && i.toJSON) {
              return i.toJSON(null, inputs)
            } else {
              return i
            }
          });
        } else if (typeof value === 'object' && value.toJSON) {
          fixed[name] = value.toJSON(null, inputs);
        } else if (name === 'source') {
          let inputId = inputs.get(value.input);
          if (inputId == null) {
            inputId = inputsNextIndex;
            inputs.set(value.input, inputsNextIndex);
            inputsNextIndex++;
          }
          fixed[name] = {
            end: value.end,
            inputId,
            start: value.start
          };
        } else {
          fixed[name] = value;
        }
      }

      if (emitInputs) {
        fixed.inputs = [...inputs.keys()].map(input => input.toJSON());
      }

      return fixed
    }

    toProxy() {
      if (!this.proxyCache) {
        this.proxyCache = new Proxy(this, this.getProxyProcessor());
      }
      return this.proxyCache
    }

    toString(stringifier = stringify$6) {
      if (stringifier.stringify) stringifier = stringifier.stringify;
      let result = '';
      stringifier(this, i => {
        result += i;
      });
      return result
    }

    warn(result, text, opts) {
      let data = { node: this };
      for (let i in opts) data[i] = opts[i];
      return result.warn(text, data)
    }
  };

  var node = Node$4;
  Node$4.default = Node$4;

  let Node$3 = node;

  let Comment$4 = class Comment extends Node$3 {
    constructor(defaults) {
      super(defaults);
      this.type = 'comment';
    }
  };

  var comment = Comment$4;
  Comment$4.default = Comment$4;

  let Node$2 = node;

  let Declaration$O = class Declaration extends Node$2 {
    get variable() {
      return this.prop.startsWith('--') || this.prop[0] === '$'
    }

    constructor(defaults) {
      if (
        defaults &&
        typeof defaults.value !== 'undefined' &&
        typeof defaults.value !== 'string'
      ) {
        defaults = { ...defaults, value: String(defaults.value) };
      }
      super(defaults);
      this.type = 'decl';
    }
  };

  var declaration$1 = Declaration$O;
  Declaration$O.default = Declaration$O;

  let Comment$3 = comment;
  let Declaration$N = declaration$1;
  let Node$1 = node;
  let { isClean: isClean$1, my: my$1 } = symbols;

  let AtRule$6, parse$b, Root$6, Rule$4;

  function cleanSource(nodes) {
    return nodes.map(i => {
      if (i.nodes) i.nodes = cleanSource(i.nodes);
      delete i.source;
      return i
    })
  }

  function markTreeDirty(node) {
    node[isClean$1] = false;
    if (node.proxyOf.nodes) {
      for (let i of node.proxyOf.nodes) {
        markTreeDirty(i);
      }
    }
  }

  let Container$7 = class Container extends Node$1 {
    get first() {
      if (!this.proxyOf.nodes) return undefined
      return this.proxyOf.nodes[0]
    }

    get last() {
      if (!this.proxyOf.nodes) return undefined
      return this.proxyOf.nodes[this.proxyOf.nodes.length - 1]
    }

    append(...children) {
      for (let child of children) {
        let nodes = this.normalize(child, this.last);
        for (let node of nodes) this.proxyOf.nodes.push(node);
      }

      this.markDirty();

      return this
    }

    cleanRaws(keepBetween) {
      super.cleanRaws(keepBetween);
      if (this.nodes) {
        for (let node of this.nodes) node.cleanRaws(keepBetween);
      }
    }

    each(callback) {
      if (!this.proxyOf.nodes) return undefined
      let iterator = this.getIterator();

      let index, result;
      while (this.indexes[iterator] < this.proxyOf.nodes.length) {
        index = this.indexes[iterator];
        result = callback(this.proxyOf.nodes[index], index);
        if (result === false) break

        this.indexes[iterator] += 1;
      }

      delete this.indexes[iterator];
      return result
    }

    every(condition) {
      return this.nodes.every(condition)
    }

    getIterator() {
      if (!this.lastEach) this.lastEach = 0;
      if (!this.indexes) this.indexes = {};

      this.lastEach += 1;
      let iterator = this.lastEach;
      this.indexes[iterator] = 0;

      return iterator
    }

    getProxyProcessor() {
      return {
        get(node, prop) {
          if (prop === 'proxyOf') {
            return node
          } else if (!node[prop]) {
            return node[prop]
          } else if (
            prop === 'each' ||
            (typeof prop === 'string' && prop.startsWith('walk'))
          ) {
            return (...args) => {
              return node[prop](
                ...args.map(i => {
                  if (typeof i === 'function') {
                    return (child, index) => i(child.toProxy(), index)
                  } else {
                    return i
                  }
                })
              )
            }
          } else if (prop === 'every' || prop === 'some') {
            return cb => {
              return node[prop]((child, ...other) =>
                cb(child.toProxy(), ...other)
              )
            }
          } else if (prop === 'root') {
            return () => node.root().toProxy()
          } else if (prop === 'nodes') {
            return node.nodes.map(i => i.toProxy())
          } else if (prop === 'first' || prop === 'last') {
            return node[prop].toProxy()
          } else {
            return node[prop]
          }
        },

        set(node, prop, value) {
          if (node[prop] === value) return true
          node[prop] = value;
          if (prop === 'name' || prop === 'params' || prop === 'selector') {
            node.markDirty();
          }
          return true
        }
      }
    }

    index(child) {
      if (typeof child === 'number') return child
      if (child.proxyOf) child = child.proxyOf;
      return this.proxyOf.nodes.indexOf(child)
    }

    insertAfter(exist, add) {
      let existIndex = this.index(exist);
      let nodes = this.normalize(add, this.proxyOf.nodes[existIndex]).reverse();
      existIndex = this.index(exist);
      for (let node of nodes) this.proxyOf.nodes.splice(existIndex + 1, 0, node);

      let index;
      for (let id in this.indexes) {
        index = this.indexes[id];
        if (existIndex < index) {
          this.indexes[id] = index + nodes.length;
        }
      }

      this.markDirty();

      return this
    }

    insertBefore(exist, add) {
      let existIndex = this.index(exist);
      let type = existIndex === 0 ? 'prepend' : false;
      let nodes = this.normalize(
        add,
        this.proxyOf.nodes[existIndex],
        type
      ).reverse();
      existIndex = this.index(exist);
      for (let node of nodes) this.proxyOf.nodes.splice(existIndex, 0, node);

      let index;
      for (let id in this.indexes) {
        index = this.indexes[id];
        if (existIndex <= index) {
          this.indexes[id] = index + nodes.length;
        }
      }

      this.markDirty();

      return this
    }

    normalize(nodes, sample) {
      if (typeof nodes === 'string') {
        nodes = cleanSource(parse$b(nodes).nodes);
      } else if (typeof nodes === 'undefined') {
        nodes = [];
      } else if (Array.isArray(nodes)) {
        nodes = nodes.slice(0);
        for (let i of nodes) {
          if (i.parent) i.parent.removeChild(i, 'ignore');
        }
      } else if (nodes.type === 'root' && this.type !== 'document') {
        nodes = nodes.nodes.slice(0);
        for (let i of nodes) {
          if (i.parent) i.parent.removeChild(i, 'ignore');
        }
      } else if (nodes.type) {
        nodes = [nodes];
      } else if (nodes.prop) {
        if (typeof nodes.value === 'undefined') {
          throw new Error('Value field is missed in node creation')
        } else if (typeof nodes.value !== 'string') {
          nodes.value = String(nodes.value);
        }
        nodes = [new Declaration$N(nodes)];
      } else if (nodes.selector || nodes.selectors) {
        nodes = [new Rule$4(nodes)];
      } else if (nodes.name) {
        nodes = [new AtRule$6(nodes)];
      } else if (nodes.text) {
        nodes = [new Comment$3(nodes)];
      } else {
        throw new Error('Unknown node type in node creation')
      }

      let processed = nodes.map(i => {
        /* c8 ignore next */
        if (!i[my$1]) Container.rebuild(i);
        i = i.proxyOf;
        if (i.parent) i.parent.removeChild(i);
        if (i[isClean$1]) markTreeDirty(i);

        if (!i.raws) i.raws = {};
        if (typeof i.raws.before === 'undefined') {
          if (sample && typeof sample.raws.before !== 'undefined') {
            i.raws.before = sample.raws.before.replace(/\S/g, '');
          }
        }
        i.parent = this.proxyOf;
        return i
      });

      return processed
    }

    prepend(...children) {
      children = children.reverse();
      for (let child of children) {
        let nodes = this.normalize(child, this.first, 'prepend').reverse();
        for (let node of nodes) this.proxyOf.nodes.unshift(node);
        for (let id in this.indexes) {
          this.indexes[id] = this.indexes[id] + nodes.length;
        }
      }

      this.markDirty();

      return this
    }

    push(child) {
      child.parent = this;
      this.proxyOf.nodes.push(child);
      return this
    }

    removeAll() {
      for (let node of this.proxyOf.nodes) node.parent = undefined;
      this.proxyOf.nodes = [];

      this.markDirty();

      return this
    }

    removeChild(child) {
      child = this.index(child);
      this.proxyOf.nodes[child].parent = undefined;
      this.proxyOf.nodes.splice(child, 1);

      let index;
      for (let id in this.indexes) {
        index = this.indexes[id];
        if (index >= child) {
          this.indexes[id] = index - 1;
        }
      }

      this.markDirty();

      return this
    }

    replaceValues(pattern, opts, callback) {
      if (!callback) {
        callback = opts;
        opts = {};
      }

      this.walkDecls(decl => {
        if (opts.props && !opts.props.includes(decl.prop)) return
        if (opts.fast && !decl.value.includes(opts.fast)) return

        decl.value = decl.value.replace(pattern, callback);
      });

      this.markDirty();

      return this
    }

    some(condition) {
      return this.nodes.some(condition)
    }

    walk(callback) {
      return this.each((child, i) => {
        let result;
        try {
          result = callback(child, i);
        } catch (e) {
          throw child.addToError(e)
        }
        if (result !== false && child.walk) {
          result = child.walk(callback);
        }

        return result
      })
    }

    walkAtRules(name, callback) {
      if (!callback) {
        callback = name;
        return this.walk((child, i) => {
          if (child.type === 'atrule') {
            return callback(child, i)
          }
        })
      }
      if (name instanceof RegExp) {
        return this.walk((child, i) => {
          if (child.type === 'atrule' && name.test(child.name)) {
            return callback(child, i)
          }
        })
      }
      return this.walk((child, i) => {
        if (child.type === 'atrule' && child.name === name) {
          return callback(child, i)
        }
      })
    }

    walkComments(callback) {
      return this.walk((child, i) => {
        if (child.type === 'comment') {
          return callback(child, i)
        }
      })
    }

    walkDecls(prop, callback) {
      if (!callback) {
        callback = prop;
        return this.walk((child, i) => {
          if (child.type === 'decl') {
            return callback(child, i)
          }
        })
      }
      if (prop instanceof RegExp) {
        return this.walk((child, i) => {
          if (child.type === 'decl' && prop.test(child.prop)) {
            return callback(child, i)
          }
        })
      }
      return this.walk((child, i) => {
        if (child.type === 'decl' && child.prop === prop) {
          return callback(child, i)
        }
      })
    }

    walkRules(selector, callback) {
      if (!callback) {
        callback = selector;

        return this.walk((child, i) => {
          if (child.type === 'rule') {
            return callback(child, i)
          }
        })
      }
      if (selector instanceof RegExp) {
        return this.walk((child, i) => {
          if (child.type === 'rule' && selector.test(child.selector)) {
            return callback(child, i)
          }
        })
      }
      return this.walk((child, i) => {
        if (child.type === 'rule' && child.selector === selector) {
          return callback(child, i)
        }
      })
    }
  };

  Container$7.registerParse = dependant => {
    parse$b = dependant;
  };

  Container$7.registerRule = dependant => {
    Rule$4 = dependant;
  };

  Container$7.registerAtRule = dependant => {
    AtRule$6 = dependant;
  };

  Container$7.registerRoot = dependant => {
    Root$6 = dependant;
  };

  var container = Container$7;
  Container$7.default = Container$7;

  /* c8 ignore start */
  Container$7.rebuild = node => {
    if (node.type === 'atrule') {
      Object.setPrototypeOf(node, AtRule$6.prototype);
    } else if (node.type === 'rule') {
      Object.setPrototypeOf(node, Rule$4.prototype);
    } else if (node.type === 'decl') {
      Object.setPrototypeOf(node, Declaration$N.prototype);
    } else if (node.type === 'comment') {
      Object.setPrototypeOf(node, Comment$3.prototype);
    } else if (node.type === 'root') {
      Object.setPrototypeOf(node, Root$6.prototype);
    }

    node[my$1] = true;

    if (node.nodes) {
      node.nodes.forEach(child => {
        Container$7.rebuild(child);
      });
    }
  };

  let Container$6 = container;

  let AtRule$5 = class AtRule extends Container$6 {
    constructor(defaults) {
      super(defaults);
      this.type = 'atrule';
    }

    append(...children) {
      if (!this.proxyOf.nodes) this.nodes = [];
      return super.append(...children)
    }

    prepend(...children) {
      if (!this.proxyOf.nodes) this.nodes = [];
      return super.prepend(...children)
    }
  };

  var atRule$1 = AtRule$5;
  AtRule$5.default = AtRule$5;

  Container$6.registerAtRule(AtRule$5);

  let Container$5 = container;

  let LazyResult$4, Processor$6;

  let Document$3 = class Document extends Container$5 {
    constructor(defaults) {
      // type needs to be passed to super, otherwise child roots won't be normalized correctly
      super({ type: 'document', ...defaults });

      if (!this.nodes) {
        this.nodes = [];
      }
    }

    toResult(opts = {}) {
      let lazy = new LazyResult$4(new Processor$6(), this, opts);

      return lazy.stringify()
    }
  };

  Document$3.registerLazyResult = dependant => {
    LazyResult$4 = dependant;
  };

  Document$3.registerProcessor = dependant => {
    Processor$6 = dependant;
  };

  var document = Document$3;
  Document$3.default = Document$3;

  // This alphabet uses `A-Za-z0-9_-` symbols.
  // The order of characters is optimized for better gzip and brotli compression.
  // References to the same file (works both for gzip and brotli):
  // `'use`, `andom`, and `rict'`
  // References to the brotli default dictionary:
  // `-26T`, `1983`, `40px`, `75px`, `bush`, `jack`, `mind`, `very`, and `wolf`
  let urlAlphabet =
    'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

  let customAlphabet = (alphabet, defaultSize = 21) => {
    return (size = defaultSize) => {
      let id = '';
      // A compact alternative for `for (var i = 0; i < step; i++)`.
      let i = size | 0;
      while (i--) {
        // `| 0` is more compact and faster than `Math.floor()`.
        id += alphabet[(Math.random() * alphabet.length) | 0];
      }
      return id
    }
  };

  let nanoid$1 = (size = 21) => {
    let id = '';
    // A compact alternative for `for (var i = 0; i < step; i++)`.
    let i = size | 0;
    while (i--) {
      // `| 0` is more compact and faster than `Math.floor()`.
      id += urlAlphabet[(Math.random() * 64) | 0];
    }
    return id
  };

  var nonSecure = { nanoid: nanoid$1, customAlphabet };

  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.

  // resolves . and .. elements in a path array with directory names there
  // must be no slashes, empty elements, or device names (c:\) in the array
  // (so also no leading and trailing slashes - it does not distinguish
  // relative and absolute paths)
  function normalizeArray(parts, allowAboveRoot) {
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i];
      if (last === '.') {
        parts.splice(i, 1);
      } else if (last === '..') {
        parts.splice(i, 1);
        up++;
      } else if (up) {
        parts.splice(i, 1);
        up--;
      }
    }

    // if the path is allowed to go above the root, restore leading ..s
    if (allowAboveRoot) {
      for (; up--; up) {
        parts.unshift('..');
      }
    }

    return parts;
  }

  // Split a filename into [root, dir, basename, ext], unix version
  // 'root' is just a slash, or nothing.
  var splitPathRe =
      /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  var splitPath = function(filename) {
    return splitPathRe.exec(filename).slice(1);
  };

  // path.resolve([from ...], to)
  // posix version
  function resolve$3() {
    var resolvedPath = '',
        resolvedAbsolute = false;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = (i >= 0) ? arguments[i] : '/';

      // Skip empty and invalid entries
      if (typeof path !== 'string') {
        throw new TypeError('Arguments to path.resolve must be strings');
      } else if (!path) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charAt(0) === '/';
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeArray(filter$1(resolvedPath.split('/'), function(p) {
      return !!p;
    }), !resolvedAbsolute).join('/');

    return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
  }
  // path.normalize(path)
  // posix version
  function normalize$1(path) {
    var isPathAbsolute = isAbsolute$1(path),
        trailingSlash = substr(path, -1) === '/';

    // Normalize the path
    path = normalizeArray(filter$1(path.split('/'), function(p) {
      return !!p;
    }), !isPathAbsolute).join('/');

    if (!path && !isPathAbsolute) {
      path = '.';
    }
    if (path && trailingSlash) {
      path += '/';
    }

    return (isPathAbsolute ? '/' : '') + path;
  }
  // posix version
  function isAbsolute$1(path) {
    return path.charAt(0) === '/';
  }

  // posix version
  function join$1() {
    var paths = Array.prototype.slice.call(arguments, 0);
    return normalize$1(filter$1(paths, function(p, index) {
      if (typeof p !== 'string') {
        throw new TypeError('Arguments to path.join must be strings');
      }
      return p;
    }).join('/'));
  }


  // path.relative(from, to)
  // posix version
  function relative$1(from, to) {
    from = resolve$3(from).substr(1);
    to = resolve$3(to).substr(1);

    function trim(arr) {
      var start = 0;
      for (; start < arr.length; start++) {
        if (arr[start] !== '') break;
      }

      var end = arr.length - 1;
      for (; end >= 0; end--) {
        if (arr[end] !== '') break;
      }

      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }

    var fromParts = trim(from.split('/'));
    var toParts = trim(to.split('/'));

    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }

    var outputParts = [];
    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push('..');
    }

    outputParts = outputParts.concat(toParts.slice(samePartsLength));

    return outputParts.join('/');
  }

  var sep$1 = '/';
  var delimiter$1 = ':';

  function dirname$2(path) {
    var result = splitPath(path),
        root = result[0],
        dir = result[1];

    if (!root && !dir) {
      // No dirname whatsoever
      return '.';
    }

    if (dir) {
      // It has a dirname, strip trailing slash
      dir = dir.substr(0, dir.length - 1);
    }

    return root + dir;
  }

  function basename(path, ext) {
    var f = splitPath(path)[2];
    // TODO: make this comparison case-insensitive on windows?
    if (ext && f.substr(-1 * ext.length) === ext) {
      f = f.substr(0, f.length - ext.length);
    }
    return f;
  }


  function extname(path) {
    return splitPath(path)[3];
  }
  var path$1 = {
    extname: extname,
    basename: basename,
    dirname: dirname$2,
    sep: sep$1,
    delimiter: delimiter$1,
    relative: relative$1,
    join: join$1,
    isAbsolute: isAbsolute$1,
    normalize: normalize$1,
    resolve: resolve$3
  };
  function filter$1 (xs, f) {
      if (xs.filter) return xs.filter(f);
      var res = [];
      for (var i = 0; i < xs.length; i++) {
          if (f(xs[i], i, xs)) res.push(xs[i]);
      }
      return res;
  }

  // String.prototype.substr - negative index don't work in IE8
  var substr = 'ab'.substr(-1) === 'b' ?
      function (str, start, len) { return str.substr(start, len) } :
      function (str, start, len) {
          if (start < 0) start = str.length + start;
          return str.substr(start, len);
      }
  ;

  var path$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    basename: basename,
    default: path$1,
    delimiter: delimiter$1,
    dirname: dirname$2,
    extname: extname,
    isAbsolute: isAbsolute$1,
    join: join$1,
    normalize: normalize$1,
    relative: relative$1,
    resolve: resolve$3,
    sep: sep$1
  });

  var require$$4 = /*@__PURE__*/getAugmentedNamespace(path$2);

  var sourceMap = {};

  var sourceMapGenerator = {};

  var base64Vlq = {};

  var base64$1 = {};

  /* -*- Mode: js; js-indent-level: 2; -*- */

  /*
   * Copyright 2011 Mozilla Foundation and contributors
   * Licensed under the New BSD license. See LICENSE or:
   * http://opensource.org/licenses/BSD-3-Clause
   */

  var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

  /**
   * Encode an integer in the range of 0 to 63 to a single base 64 digit.
   */
  base64$1.encode = function (number) {
    if (0 <= number && number < intToCharMap.length) {
      return intToCharMap[number];
    }
    throw new TypeError("Must be between 0 and 63: " + number);
  };

  /**
   * Decode a single base 64 character code digit to an integer. Returns -1 on
   * failure.
   */
  base64$1.decode = function (charCode) {
    var bigA = 65;     // 'A'
    var bigZ = 90;     // 'Z'

    var littleA = 97;  // 'a'
    var littleZ = 122; // 'z'

    var zero = 48;     // '0'
    var nine = 57;     // '9'

    var plus = 43;     // '+'
    var slash = 47;    // '/'

    var littleOffset = 26;
    var numberOffset = 52;

    // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
    if (bigA <= charCode && charCode <= bigZ) {
      return (charCode - bigA);
    }

    // 26 - 51: abcdefghijklmnopqrstuvwxyz
    if (littleA <= charCode && charCode <= littleZ) {
      return (charCode - littleA + littleOffset);
    }

    // 52 - 61: 0123456789
    if (zero <= charCode && charCode <= nine) {
      return (charCode - zero + numberOffset);
    }

    // 62: +
    if (charCode == plus) {
      return 62;
    }

    // 63: /
    if (charCode == slash) {
      return 63;
    }

    // Invalid base64 digit.
    return -1;
  };

  /* -*- Mode: js; js-indent-level: 2; -*- */

  /*
   * Copyright 2011 Mozilla Foundation and contributors
   * Licensed under the New BSD license. See LICENSE or:
   * http://opensource.org/licenses/BSD-3-Clause
   *
   * Based on the Base 64 VLQ implementation in Closure Compiler:
   * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
   *
   * Copyright 2011 The Closure Compiler Authors. All rights reserved.
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions are
   * met:
   *
   *  * Redistributions of source code must retain the above copyright
   *    notice, this list of conditions and the following disclaimer.
   *  * Redistributions in binary form must reproduce the above
   *    copyright notice, this list of conditions and the following
   *    disclaimer in the documentation and/or other materials provided
   *    with the distribution.
   *  * Neither the name of Google Inc. nor the names of its
   *    contributors may be used to endorse or promote products derived
   *    from this software without specific prior written permission.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
   * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
   * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
   * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
   * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
   * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
   * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
   * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   */

  var base64 = base64$1;

  // A single base 64 digit can contain 6 bits of data. For the base 64 variable
  // length quantities we use in the source map spec, the first bit is the sign,
  // the next four bits are the actual value, and the 6th bit is the
  // continuation bit. The continuation bit tells us whether there are more
  // digits in this value following this digit.
  //
  //   Continuation
  //   |    Sign
  //   |    |
  //   V    V
  //   101011

  var VLQ_BASE_SHIFT = 5;

  // binary: 100000
  var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

  // binary: 011111
  var VLQ_BASE_MASK = VLQ_BASE - 1;

  // binary: 100000
  var VLQ_CONTINUATION_BIT = VLQ_BASE;

  /**
   * Converts from a two-complement value to a value where the sign bit is
   * placed in the least significant bit.  For example, as decimals:
   *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
   *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
   */
  function toVLQSigned(aValue) {
    return aValue < 0
      ? ((-aValue) << 1) + 1
      : (aValue << 1) + 0;
  }

  /**
   * Converts to a two-complement value from a value where the sign bit is
   * placed in the least significant bit.  For example, as decimals:
   *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
   *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
   */
  function fromVLQSigned(aValue) {
    var isNegative = (aValue & 1) === 1;
    var shifted = aValue >> 1;
    return isNegative
      ? -shifted
      : shifted;
  }

  /**
   * Returns the base 64 VLQ encoded value.
   */
  base64Vlq.encode = function base64VLQ_encode(aValue) {
    var encoded = "";
    var digit;

    var vlq = toVLQSigned(aValue);

    do {
      digit = vlq & VLQ_BASE_MASK;
      vlq >>>= VLQ_BASE_SHIFT;
      if (vlq > 0) {
        // There are still more digits in this value, so we must make sure the
        // continuation bit is marked.
        digit |= VLQ_CONTINUATION_BIT;
      }
      encoded += base64.encode(digit);
    } while (vlq > 0);

    return encoded;
  };

  /**
   * Decodes the next base 64 VLQ value from the given string and returns the
   * value and the rest of the string via the out parameter.
   */
  base64Vlq.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
    var strLen = aStr.length;
    var result = 0;
    var shift = 0;
    var continuation, digit;

    do {
      if (aIndex >= strLen) {
        throw new Error("Expected more digits in base 64 VLQ value.");
      }

      digit = base64.decode(aStr.charCodeAt(aIndex++));
      if (digit === -1) {
        throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
      }

      continuation = !!(digit & VLQ_CONTINUATION_BIT);
      digit &= VLQ_BASE_MASK;
      result = result + (digit << shift);
      shift += VLQ_BASE_SHIFT;
    } while (continuation);

    aOutParam.value = fromVLQSigned(result);
    aOutParam.rest = aIndex;
  };

  var util$5 = {};

  /* -*- Mode: js; js-indent-level: 2; -*- */

  (function (exports) {
  	/*
  	 * Copyright 2011 Mozilla Foundation and contributors
  	 * Licensed under the New BSD license. See LICENSE or:
  	 * http://opensource.org/licenses/BSD-3-Clause
  	 */

  	/**
  	 * This is a helper function for getting values from parameter/options
  	 * objects.
  	 *
  	 * @param args The object we are extracting values from
  	 * @param name The name of the property we are getting.
  	 * @param defaultValue An optional value to return if the property is missing
  	 * from the object. If this is not specified and the property is missing, an
  	 * error will be thrown.
  	 */
  	function getArg(aArgs, aName, aDefaultValue) {
  	  if (aName in aArgs) {
  	    return aArgs[aName];
  	  } else if (arguments.length === 3) {
  	    return aDefaultValue;
  	  } else {
  	    throw new Error('"' + aName + '" is a required argument.');
  	  }
  	}
  	exports.getArg = getArg;

  	var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
  	var dataUrlRegexp = /^data:.+\,.+$/;

  	function urlParse(aUrl) {
  	  var match = aUrl.match(urlRegexp);
  	  if (!match) {
  	    return null;
  	  }
  	  return {
  	    scheme: match[1],
  	    auth: match[2],
  	    host: match[3],
  	    port: match[4],
  	    path: match[5]
  	  };
  	}
  	exports.urlParse = urlParse;

  	function urlGenerate(aParsedUrl) {
  	  var url = '';
  	  if (aParsedUrl.scheme) {
  	    url += aParsedUrl.scheme + ':';
  	  }
  	  url += '//';
  	  if (aParsedUrl.auth) {
  	    url += aParsedUrl.auth + '@';
  	  }
  	  if (aParsedUrl.host) {
  	    url += aParsedUrl.host;
  	  }
  	  if (aParsedUrl.port) {
  	    url += ":" + aParsedUrl.port;
  	  }
  	  if (aParsedUrl.path) {
  	    url += aParsedUrl.path;
  	  }
  	  return url;
  	}
  	exports.urlGenerate = urlGenerate;

  	var MAX_CACHED_INPUTS = 32;

  	/**
  	 * Takes some function `f(input) -> result` and returns a memoized version of
  	 * `f`.
  	 *
  	 * We keep at most `MAX_CACHED_INPUTS` memoized results of `f` alive. The
  	 * memoization is a dumb-simple, linear least-recently-used cache.
  	 */
  	function lruMemoize(f) {
  	  var cache = [];

  	  return function(input) {
  	    for (var i = 0; i < cache.length; i++) {
  	      if (cache[i].input === input) {
  	        var temp = cache[0];
  	        cache[0] = cache[i];
  	        cache[i] = temp;
  	        return cache[0].result;
  	      }
  	    }

  	    var result = f(input);

  	    cache.unshift({
  	      input,
  	      result,
  	    });

  	    if (cache.length > MAX_CACHED_INPUTS) {
  	      cache.pop();
  	    }

  	    return result;
  	  };
  	}

  	/**
  	 * Normalizes a path, or the path portion of a URL:
  	 *
  	 * - Replaces consecutive slashes with one slash.
  	 * - Removes unnecessary '.' parts.
  	 * - Removes unnecessary '<dir>/..' parts.
  	 *
  	 * Based on code in the Node.js 'path' core module.
  	 *
  	 * @param aPath The path or url to normalize.
  	 */
  	var normalize = lruMemoize(function normalize(aPath) {
  	  var path = aPath;
  	  var url = urlParse(aPath);
  	  if (url) {
  	    if (!url.path) {
  	      return aPath;
  	    }
  	    path = url.path;
  	  }
  	  var isAbsolute = exports.isAbsolute(path);
  	  // Split the path into parts between `/` characters. This is much faster than
  	  // using `.split(/\/+/g)`.
  	  var parts = [];
  	  var start = 0;
  	  var i = 0;
  	  while (true) {
  	    start = i;
  	    i = path.indexOf("/", start);
  	    if (i === -1) {
  	      parts.push(path.slice(start));
  	      break;
  	    } else {
  	      parts.push(path.slice(start, i));
  	      while (i < path.length && path[i] === "/") {
  	        i++;
  	      }
  	    }
  	  }

  	  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
  	    part = parts[i];
  	    if (part === '.') {
  	      parts.splice(i, 1);
  	    } else if (part === '..') {
  	      up++;
  	    } else if (up > 0) {
  	      if (part === '') {
  	        // The first part is blank if the path is absolute. Trying to go
  	        // above the root is a no-op. Therefore we can remove all '..' parts
  	        // directly after the root.
  	        parts.splice(i + 1, up);
  	        up = 0;
  	      } else {
  	        parts.splice(i, 2);
  	        up--;
  	      }
  	    }
  	  }
  	  path = parts.join('/');

  	  if (path === '') {
  	    path = isAbsolute ? '/' : '.';
  	  }

  	  if (url) {
  	    url.path = path;
  	    return urlGenerate(url);
  	  }
  	  return path;
  	});
  	exports.normalize = normalize;

  	/**
  	 * Joins two paths/URLs.
  	 *
  	 * @param aRoot The root path or URL.
  	 * @param aPath The path or URL to be joined with the root.
  	 *
  	 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
  	 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
  	 *   first.
  	 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
  	 *   is updated with the result and aRoot is returned. Otherwise the result
  	 *   is returned.
  	 *   - If aPath is absolute, the result is aPath.
  	 *   - Otherwise the two paths are joined with a slash.
  	 * - Joining for example 'http://' and 'www.example.com' is also supported.
  	 */
  	function join(aRoot, aPath) {
  	  if (aRoot === "") {
  	    aRoot = ".";
  	  }
  	  if (aPath === "") {
  	    aPath = ".";
  	  }
  	  var aPathUrl = urlParse(aPath);
  	  var aRootUrl = urlParse(aRoot);
  	  if (aRootUrl) {
  	    aRoot = aRootUrl.path || '/';
  	  }

  	  // `join(foo, '//www.example.org')`
  	  if (aPathUrl && !aPathUrl.scheme) {
  	    if (aRootUrl) {
  	      aPathUrl.scheme = aRootUrl.scheme;
  	    }
  	    return urlGenerate(aPathUrl);
  	  }

  	  if (aPathUrl || aPath.match(dataUrlRegexp)) {
  	    return aPath;
  	  }

  	  // `join('http://', 'www.example.com')`
  	  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
  	    aRootUrl.host = aPath;
  	    return urlGenerate(aRootUrl);
  	  }

  	  var joined = aPath.charAt(0) === '/'
  	    ? aPath
  	    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  	  if (aRootUrl) {
  	    aRootUrl.path = joined;
  	    return urlGenerate(aRootUrl);
  	  }
  	  return joined;
  	}
  	exports.join = join;

  	exports.isAbsolute = function (aPath) {
  	  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
  	};

  	/**
  	 * Make a path relative to a URL or another path.
  	 *
  	 * @param aRoot The root path or URL.
  	 * @param aPath The path or URL to be made relative to aRoot.
  	 */
  	function relative(aRoot, aPath) {
  	  if (aRoot === "") {
  	    aRoot = ".";
  	  }

  	  aRoot = aRoot.replace(/\/$/, '');

  	  // It is possible for the path to be above the root. In this case, simply
  	  // checking whether the root is a prefix of the path won't work. Instead, we
  	  // need to remove components from the root one by one, until either we find
  	  // a prefix that fits, or we run out of components to remove.
  	  var level = 0;
  	  while (aPath.indexOf(aRoot + '/') !== 0) {
  	    var index = aRoot.lastIndexOf("/");
  	    if (index < 0) {
  	      return aPath;
  	    }

  	    // If the only part of the root that is left is the scheme (i.e. http://,
  	    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
  	    // have exhausted all components, so the path is not relative to the root.
  	    aRoot = aRoot.slice(0, index);
  	    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
  	      return aPath;
  	    }

  	    ++level;
  	  }

  	  // Make sure we add a "../" for each component we removed from the root.
  	  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
  	}
  	exports.relative = relative;

  	var supportsNullProto = (function () {
  	  var obj = Object.create(null);
  	  return !('__proto__' in obj);
  	}());

  	function identity (s) {
  	  return s;
  	}

  	/**
  	 * Because behavior goes wacky when you set `__proto__` on objects, we
  	 * have to prefix all the strings in our set with an arbitrary character.
  	 *
  	 * See https://github.com/mozilla/source-map/pull/31 and
  	 * https://github.com/mozilla/source-map/issues/30
  	 *
  	 * @param String aStr
  	 */
  	function toSetString(aStr) {
  	  if (isProtoString(aStr)) {
  	    return '$' + aStr;
  	  }

  	  return aStr;
  	}
  	exports.toSetString = supportsNullProto ? identity : toSetString;

  	function fromSetString(aStr) {
  	  if (isProtoString(aStr)) {
  	    return aStr.slice(1);
  	  }

  	  return aStr;
  	}
  	exports.fromSetString = supportsNullProto ? identity : fromSetString;

  	function isProtoString(s) {
  	  if (!s) {
  	    return false;
  	  }

  	  var length = s.length;

  	  if (length < 9 /* "__proto__".length */) {
  	    return false;
  	  }

  	  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
  	      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
  	      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
  	      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
  	      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
  	      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
  	      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
  	      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
  	      s.charCodeAt(length - 9) !== 95  /* '_' */) {
  	    return false;
  	  }

  	  for (var i = length - 10; i >= 0; i--) {
  	    if (s.charCodeAt(i) !== 36 /* '$' */) {
  	      return false;
  	    }
  	  }

  	  return true;
  	}

  	/**
  	 * Comparator between two mappings where the original positions are compared.
  	 *
  	 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
  	 * mappings with the same original source/line/column, but different generated
  	 * line and column the same. Useful when searching for a mapping with a
  	 * stubbed out mapping.
  	 */
  	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  	  var cmp = strcmp(mappingA.source, mappingB.source);
  	  if (cmp !== 0) {
  	    return cmp;
  	  }

  	  cmp = mappingA.originalLine - mappingB.originalLine;
  	  if (cmp !== 0) {
  	    return cmp;
  	  }

  	  cmp = mappingA.originalColumn - mappingB.originalColumn;
  	  if (cmp !== 0 || onlyCompareOriginal) {
  	    return cmp;
  	  }

  	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  	  if (cmp !== 0) {
  	    return cmp;
  	  }

  	  cmp = mappingA.generatedLine - mappingB.generatedLine;
  	  if (cmp !== 0) {
  	    return cmp;
  	  }

  	  return strcmp(mappingA.name, mappingB.name);
  	}
  	exports.compareByOriginalPositions = compareByOriginalPositions;

  	function compareByOriginalPositionsNoSource(mappingA, mappingB, onlyCompareOriginal) {
  	  var cmp;

  	  cmp = mappingA.originalLine - mappingB.originalLine;
  	  if (cmp !== 0) {
  	    return cmp;
  	  }

  	  cmp = mappingA.originalColumn - mappingB.originalColumn;
  	  if (cmp !== 0 || onlyCompareOriginal) {
  	    return cmp;
  	  }

  	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  	  if (cmp !== 0) {
  	    return cmp;
  	  }

  	  cmp = mappingA.generatedLine - mappingB.generatedLine;
  	  if (cmp !== 0) {
  	    return cmp;
  	  }

  	  return strcmp(mappingA.name, mappingB.name);
  	}
  	exports.compareByOriginalPositionsNoSource = compareByOriginalPositionsNoSource;

  	/**
  	 * Comparator between two mappings with deflated source and name indices where
  	 * the generated positions are compared.
  	 *
  	 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
  	 * mappings with the same generated line and column, but different
  	 * source/name/original line and column the same. Useful when searching for a
  	 * mapping with a stubbed out mapping.
  	 */
  	function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  	  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  	  if (cmp !== 0) {
  	    return cmp;
  	  }

  	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  	  if (cmp !== 0 || onlyCompareGenerated) {
  	    return cmp;
  	  }

  	  cmp = strcmp(mappingA.source, mappingB.source);
  	  if (cmp !== 0) {
  	    return cmp;
  	  }

  	  cmp = mappingA.originalLine - mappingB.originalLine;
  	  if (cmp !== 0) {
  	    return cmp;
  	  }

  	  cmp = mappingA.originalColumn - mappingB.originalColumn;
  	  if (cmp !== 0) {
  	    return cmp;
  	  }

  	  return strcmp(mappingA.name, mappingB.name);
  	}
  	exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

  	function compareByGeneratedPositionsDeflatedNoLine(mappingA, mappingB, onlyCompareGenerated) {
  	  var cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  	  if (cmp !== 0 || onlyCompareGenerated) {
  	    return cmp;
  	  }

  	  cmp = strcmp(mappingA.source, mappingB.source);
  	  if (cmp !== 0) {
  	    return cmp;
  	  }

  	  cmp = mappingA.originalLine - mappingB.originalLine;
  	  if (cmp !== 0) {
  	    return cmp;
  	  }

  	  cmp = mappingA.originalColumn - mappingB.originalColumn;
  	  if (cmp !== 0) {
  	    return cmp;
  	  }

  	  return strcmp(mappingA.name, mappingB.name);
  	}
  	exports.compareByGeneratedPositionsDeflatedNoLine = compareByGeneratedPositionsDeflatedNoLine;

  	function strcmp(aStr1, aStr2) {
  	  if (aStr1 === aStr2) {
  	    return 0;
  	  }

  	  if (aStr1 === null) {
  	    return 1; // aStr2 !== null
  	  }

  	  if (aStr2 === null) {
  	    return -1; // aStr1 !== null
  	  }

  	  if (aStr1 > aStr2) {
  	    return 1;
  	  }

  	  return -1;
  	}

  	/**
  	 * Comparator between two mappings with inflated source and name strings where
  	 * the generated positions are compared.
  	 */
  	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  	  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  	  if (cmp !== 0) {
  	    return cmp;
  	  }

  	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  	  if (cmp !== 0) {
  	    return cmp;
  	  }

  	  cmp = strcmp(mappingA.source, mappingB.source);
  	  if (cmp !== 0) {
  	    return cmp;
  	  }

  	  cmp = mappingA.originalLine - mappingB.originalLine;
  	  if (cmp !== 0) {
  	    return cmp;
  	  }

  	  cmp = mappingA.originalColumn - mappingB.originalColumn;
  	  if (cmp !== 0) {
  	    return cmp;
  	  }

  	  return strcmp(mappingA.name, mappingB.name);
  	}
  	exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

  	/**
  	 * Strip any JSON XSSI avoidance prefix from the string (as documented
  	 * in the source maps specification), and then parse the string as
  	 * JSON.
  	 */
  	function parseSourceMapInput(str) {
  	  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
  	}
  	exports.parseSourceMapInput = parseSourceMapInput;

  	/**
  	 * Compute the URL of a source given the the source root, the source's
  	 * URL, and the source map's URL.
  	 */
  	function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
  	  sourceURL = sourceURL || '';

  	  if (sourceRoot) {
  	    // This follows what Chrome does.
  	    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
  	      sourceRoot += '/';
  	    }
  	    // The spec says:
  	    //   Line 4: An optional source root, useful for relocating source
  	    //   files on a server or removing repeated values in the
  	    //   “sources” entry.  This value is prepended to the individual
  	    //   entries in the “source” field.
  	    sourceURL = sourceRoot + sourceURL;
  	  }

  	  // Historically, SourceMapConsumer did not take the sourceMapURL as
  	  // a parameter.  This mode is still somewhat supported, which is why
  	  // this code block is conditional.  However, it's preferable to pass
  	  // the source map URL to SourceMapConsumer, so that this function
  	  // can implement the source URL resolution algorithm as outlined in
  	  // the spec.  This block is basically the equivalent of:
  	  //    new URL(sourceURL, sourceMapURL).toString()
  	  // ... except it avoids using URL, which wasn't available in the
  	  // older releases of node still supported by this library.
  	  //
  	  // The spec says:
  	  //   If the sources are not absolute URLs after prepending of the
  	  //   “sourceRoot”, the sources are resolved relative to the
  	  //   SourceMap (like resolving script src in a html document).
  	  if (sourceMapURL) {
  	    var parsed = urlParse(sourceMapURL);
  	    if (!parsed) {
  	      throw new Error("sourceMapURL could not be parsed");
  	    }
  	    if (parsed.path) {
  	      // Strip the last path component, but keep the "/".
  	      var index = parsed.path.lastIndexOf('/');
  	      if (index >= 0) {
  	        parsed.path = parsed.path.substring(0, index + 1);
  	      }
  	    }
  	    sourceURL = join(urlGenerate(parsed), sourceURL);
  	  }

  	  return normalize(sourceURL);
  	}
  	exports.computeSourceURL = computeSourceURL;
  } (util$5));

  var arraySet = {};

  /* -*- Mode: js; js-indent-level: 2; -*- */

  /*
   * Copyright 2011 Mozilla Foundation and contributors
   * Licensed under the New BSD license. See LICENSE or:
   * http://opensource.org/licenses/BSD-3-Clause
   */

  var util$4 = util$5;
  var has = Object.prototype.hasOwnProperty;
  var hasNativeMap = typeof Map !== "undefined";

  /**
   * A data structure which is a combination of an array and a set. Adding a new
   * member is O(1), testing for membership is O(1), and finding the index of an
   * element is O(1). Removing elements from the set is not supported. Only
   * strings are supported for membership.
   */
  function ArraySet$2() {
    this._array = [];
    this._set = hasNativeMap ? new Map() : Object.create(null);
  }

  /**
   * Static method for creating ArraySet instances from an existing array.
   */
  ArraySet$2.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
    var set = new ArraySet$2();
    for (var i = 0, len = aArray.length; i < len; i++) {
      set.add(aArray[i], aAllowDuplicates);
    }
    return set;
  };

  /**
   * Return how many unique items are in this ArraySet. If duplicates have been
   * added, than those do not count towards the size.
   *
   * @returns Number
   */
  ArraySet$2.prototype.size = function ArraySet_size() {
    return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
  };

  /**
   * Add the given string to this set.
   *
   * @param String aStr
   */
  ArraySet$2.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
    var sStr = hasNativeMap ? aStr : util$4.toSetString(aStr);
    var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
    var idx = this._array.length;
    if (!isDuplicate || aAllowDuplicates) {
      this._array.push(aStr);
    }
    if (!isDuplicate) {
      if (hasNativeMap) {
        this._set.set(aStr, idx);
      } else {
        this._set[sStr] = idx;
      }
    }
  };

  /**
   * Is the given string a member of this set?
   *
   * @param String aStr
   */
  ArraySet$2.prototype.has = function ArraySet_has(aStr) {
    if (hasNativeMap) {
      return this._set.has(aStr);
    } else {
      var sStr = util$4.toSetString(aStr);
      return has.call(this._set, sStr);
    }
  };

  /**
   * What is the index of the given string in the array?
   *
   * @param String aStr
   */
  ArraySet$2.prototype.indexOf = function ArraySet_indexOf(aStr) {
    if (hasNativeMap) {
      var idx = this._set.get(aStr);
      if (idx >= 0) {
          return idx;
      }
    } else {
      var sStr = util$4.toSetString(aStr);
      if (has.call(this._set, sStr)) {
        return this._set[sStr];
      }
    }

    throw new Error('"' + aStr + '" is not in the set.');
  };

  /**
   * What is the element at the given index?
   *
   * @param Number aIdx
   */
  ArraySet$2.prototype.at = function ArraySet_at(aIdx) {
    if (aIdx >= 0 && aIdx < this._array.length) {
      return this._array[aIdx];
    }
    throw new Error('No element indexed by ' + aIdx);
  };

  /**
   * Returns the array representation of this set (which has the proper indices
   * indicated by indexOf). Note that this is a copy of the internal array used
   * for storing the members so that no one can mess with internal state.
   */
  ArraySet$2.prototype.toArray = function ArraySet_toArray() {
    return this._array.slice();
  };

  arraySet.ArraySet = ArraySet$2;

  var mappingList = {};

  /* -*- Mode: js; js-indent-level: 2; -*- */

  /*
   * Copyright 2014 Mozilla Foundation and contributors
   * Licensed under the New BSD license. See LICENSE or:
   * http://opensource.org/licenses/BSD-3-Clause
   */

  var util$3 = util$5;

  /**
   * Determine whether mappingB is after mappingA with respect to generated
   * position.
   */
  function generatedPositionAfter(mappingA, mappingB) {
    // Optimized for most common case
    var lineA = mappingA.generatedLine;
    var lineB = mappingB.generatedLine;
    var columnA = mappingA.generatedColumn;
    var columnB = mappingB.generatedColumn;
    return lineB > lineA || lineB == lineA && columnB >= columnA ||
           util$3.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
  }

  /**
   * A data structure to provide a sorted view of accumulated mappings in a
   * performance conscious manner. It trades a neglibable overhead in general
   * case for a large speedup in case of mappings being added in order.
   */
  function MappingList$1() {
    this._array = [];
    this._sorted = true;
    // Serves as infimum
    this._last = {generatedLine: -1, generatedColumn: 0};
  }

  /**
   * Iterate through internal items. This method takes the same arguments that
   * `Array.prototype.forEach` takes.
   *
   * NOTE: The order of the mappings is NOT guaranteed.
   */
  MappingList$1.prototype.unsortedForEach =
    function MappingList_forEach(aCallback, aThisArg) {
      this._array.forEach(aCallback, aThisArg);
    };

  /**
   * Add the given source mapping.
   *
   * @param Object aMapping
   */
  MappingList$1.prototype.add = function MappingList_add(aMapping) {
    if (generatedPositionAfter(this._last, aMapping)) {
      this._last = aMapping;
      this._array.push(aMapping);
    } else {
      this._sorted = false;
      this._array.push(aMapping);
    }
  };

  /**
   * Returns the flat, sorted array of mappings. The mappings are sorted by
   * generated position.
   *
   * WARNING: This method returns internal data without copying, for
   * performance. The return value must NOT be mutated, and should be treated as
   * an immutable borrow. If you want to take ownership, you must make your own
   * copy.
   */
  MappingList$1.prototype.toArray = function MappingList_toArray() {
    if (!this._sorted) {
      this._array.sort(util$3.compareByGeneratedPositionsInflated);
      this._sorted = true;
    }
    return this._array;
  };

  mappingList.MappingList = MappingList$1;

  /* -*- Mode: js; js-indent-level: 2; -*- */

  /*
   * Copyright 2011 Mozilla Foundation and contributors
   * Licensed under the New BSD license. See LICENSE or:
   * http://opensource.org/licenses/BSD-3-Clause
   */

  var base64VLQ$1 = base64Vlq;
  var util$2 = util$5;
  var ArraySet$1 = arraySet.ArraySet;
  var MappingList = mappingList.MappingList;

  /**
   * An instance of the SourceMapGenerator represents a source map which is
   * being built incrementally. You may pass an object with the following
   * properties:
   *
   *   - file: The filename of the generated source.
   *   - sourceRoot: A root for all relative URLs in this source map.
   */
  function SourceMapGenerator$4(aArgs) {
    if (!aArgs) {
      aArgs = {};
    }
    this._file = util$2.getArg(aArgs, 'file', null);
    this._sourceRoot = util$2.getArg(aArgs, 'sourceRoot', null);
    this._skipValidation = util$2.getArg(aArgs, 'skipValidation', false);
    this._ignoreInvalidMapping = util$2.getArg(aArgs, 'ignoreInvalidMapping', false);
    this._sources = new ArraySet$1();
    this._names = new ArraySet$1();
    this._mappings = new MappingList();
    this._sourcesContents = null;
  }

  SourceMapGenerator$4.prototype._version = 3;

  /**
   * Creates a new SourceMapGenerator based on a SourceMapConsumer
   *
   * @param aSourceMapConsumer The SourceMap.
   */
  SourceMapGenerator$4.fromSourceMap =
    function SourceMapGenerator_fromSourceMap(aSourceMapConsumer, generatorOps) {
      var sourceRoot = aSourceMapConsumer.sourceRoot;
      var generator = new SourceMapGenerator$4(Object.assign(generatorOps || {}, {
        file: aSourceMapConsumer.file,
        sourceRoot: sourceRoot
      }));
      aSourceMapConsumer.eachMapping(function (mapping) {
        var newMapping = {
          generated: {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
          }
        };

        if (mapping.source != null) {
          newMapping.source = mapping.source;
          if (sourceRoot != null) {
            newMapping.source = util$2.relative(sourceRoot, newMapping.source);
          }

          newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          };

          if (mapping.name != null) {
            newMapping.name = mapping.name;
          }
        }

        generator.addMapping(newMapping);
      });
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var sourceRelative = sourceFile;
        if (sourceRoot !== null) {
          sourceRelative = util$2.relative(sourceRoot, sourceFile);
        }

        if (!generator._sources.has(sourceRelative)) {
          generator._sources.add(sourceRelative);
        }

        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          generator.setSourceContent(sourceFile, content);
        }
      });
      return generator;
    };

  /**
   * Add a single mapping from original source line and column to the generated
   * source's line and column for this source map being created. The mapping
   * object should have the following properties:
   *
   *   - generated: An object with the generated line and column positions.
   *   - original: An object with the original line and column positions.
   *   - source: The original source file (relative to the sourceRoot).
   *   - name: An optional original token name for this mapping.
   */
  SourceMapGenerator$4.prototype.addMapping =
    function SourceMapGenerator_addMapping(aArgs) {
      var generated = util$2.getArg(aArgs, 'generated');
      var original = util$2.getArg(aArgs, 'original', null);
      var source = util$2.getArg(aArgs, 'source', null);
      var name = util$2.getArg(aArgs, 'name', null);

      if (!this._skipValidation) {
        if (this._validateMapping(generated, original, source, name) === false) {
          return;
        }
      }

      if (source != null) {
        source = String(source);
        if (!this._sources.has(source)) {
          this._sources.add(source);
        }
      }

      if (name != null) {
        name = String(name);
        if (!this._names.has(name)) {
          this._names.add(name);
        }
      }

      this._mappings.add({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source: source,
        name: name
      });
    };

  /**
   * Set the source content for a source file.
   */
  SourceMapGenerator$4.prototype.setSourceContent =
    function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
      var source = aSourceFile;
      if (this._sourceRoot != null) {
        source = util$2.relative(this._sourceRoot, source);
      }

      if (aSourceContent != null) {
        // Add the source content to the _sourcesContents map.
        // Create a new _sourcesContents map if the property is null.
        if (!this._sourcesContents) {
          this._sourcesContents = Object.create(null);
        }
        this._sourcesContents[util$2.toSetString(source)] = aSourceContent;
      } else if (this._sourcesContents) {
        // Remove the source file from the _sourcesContents map.
        // If the _sourcesContents map is empty, set the property to null.
        delete this._sourcesContents[util$2.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null;
        }
      }
    };

  /**
   * Applies the mappings of a sub-source-map for a specific source file to the
   * source map being generated. Each mapping to the supplied source file is
   * rewritten using the supplied source map. Note: The resolution for the
   * resulting mappings is the minimium of this map and the supplied map.
   *
   * @param aSourceMapConsumer The source map to be applied.
   * @param aSourceFile Optional. The filename of the source file.
   *        If omitted, SourceMapConsumer's file property will be used.
   * @param aSourceMapPath Optional. The dirname of the path to the source map
   *        to be applied. If relative, it is relative to the SourceMapConsumer.
   *        This parameter is needed when the two source maps aren't in the same
   *        directory, and the source map to be applied contains relative source
   *        paths. If so, those relative source paths need to be rewritten
   *        relative to the SourceMapGenerator.
   */
  SourceMapGenerator$4.prototype.applySourceMap =
    function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
      var sourceFile = aSourceFile;
      // If aSourceFile is omitted, we will use the file property of the SourceMap
      if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) {
          throw new Error(
            'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
            'or the source map\'s "file" property. Both were omitted.'
          );
        }
        sourceFile = aSourceMapConsumer.file;
      }
      var sourceRoot = this._sourceRoot;
      // Make "sourceFile" relative if an absolute Url is passed.
      if (sourceRoot != null) {
        sourceFile = util$2.relative(sourceRoot, sourceFile);
      }
      // Applying the SourceMap can add and remove items from the sources and
      // the names array.
      var newSources = new ArraySet$1();
      var newNames = new ArraySet$1();

      // Find mappings for the "sourceFile"
      this._mappings.unsortedForEach(function (mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
          // Check if it can be mapped by the source map, then update the mapping.
          var original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          });
          if (original.source != null) {
            // Copy mapping
            mapping.source = original.source;
            if (aSourceMapPath != null) {
              mapping.source = util$2.join(aSourceMapPath, mapping.source);
            }
            if (sourceRoot != null) {
              mapping.source = util$2.relative(sourceRoot, mapping.source);
            }
            mapping.originalLine = original.line;
            mapping.originalColumn = original.column;
            if (original.name != null) {
              mapping.name = original.name;
            }
          }
        }

        var source = mapping.source;
        if (source != null && !newSources.has(source)) {
          newSources.add(source);
        }

        var name = mapping.name;
        if (name != null && !newNames.has(name)) {
          newNames.add(name);
        }

      }, this);
      this._sources = newSources;
      this._names = newNames;

      // Copy sourcesContents of applied map.
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aSourceMapPath != null) {
            sourceFile = util$2.join(aSourceMapPath, sourceFile);
          }
          if (sourceRoot != null) {
            sourceFile = util$2.relative(sourceRoot, sourceFile);
          }
          this.setSourceContent(sourceFile, content);
        }
      }, this);
    };

  /**
   * A mapping can have one of the three levels of data:
   *
   *   1. Just the generated position.
   *   2. The Generated position, original position, and original source.
   *   3. Generated and original position, original source, as well as a name
   *      token.
   *
   * To maintain consistency, we validate that any new mapping being added falls
   * in to one of these categories.
   */
  SourceMapGenerator$4.prototype._validateMapping =
    function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                                aName) {
      // When aOriginal is truthy but has empty values for .line and .column,
      // it is most likely a programmer error. In this case we throw a very
      // specific error message to try to guide them the right way.
      // For example: https://github.com/Polymer/polymer-bundler/pull/519
      if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
        var message = 'original.line and original.column are not numbers -- you probably meant to omit ' +
        'the original mapping entirely and only map the generated position. If so, pass ' +
        'null for the original mapping instead of an object with empty or null values.';

        if (this._ignoreInvalidMapping) {
          if (typeof console !== 'undefined' && console.warn) {
            console.warn(message);
          }
          return false;
        } else {
          throw new Error(message);
        }
      }

      if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
          && aGenerated.line > 0 && aGenerated.column >= 0
          && !aOriginal && !aSource && !aName) {
        // Case 1.
        return;
      }
      else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
               && aOriginal && 'line' in aOriginal && 'column' in aOriginal
               && aGenerated.line > 0 && aGenerated.column >= 0
               && aOriginal.line > 0 && aOriginal.column >= 0
               && aSource) {
        // Cases 2 and 3.
        return;
      }
      else {
        var message = 'Invalid mapping: ' + JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        });

        if (this._ignoreInvalidMapping) {
          if (typeof console !== 'undefined' && console.warn) {
            console.warn(message);
          }
          return false;
        } else {
          throw new Error(message)
        }
      }
    };

  /**
   * Serialize the accumulated mappings in to the stream of base 64 VLQs
   * specified by the source map format.
   */
  SourceMapGenerator$4.prototype._serializeMappings =
    function SourceMapGenerator_serializeMappings() {
      var previousGeneratedColumn = 0;
      var previousGeneratedLine = 1;
      var previousOriginalColumn = 0;
      var previousOriginalLine = 0;
      var previousName = 0;
      var previousSource = 0;
      var result = '';
      var next;
      var mapping;
      var nameIdx;
      var sourceIdx;

      var mappings = this._mappings.toArray();
      for (var i = 0, len = mappings.length; i < len; i++) {
        mapping = mappings[i];
        next = '';

        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generatedLine !== previousGeneratedLine) {
            next += ';';
            previousGeneratedLine++;
          }
        }
        else {
          if (i > 0) {
            if (!util$2.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
              continue;
            }
            next += ',';
          }
        }

        next += base64VLQ$1.encode(mapping.generatedColumn
                                   - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;

        if (mapping.source != null) {
          sourceIdx = this._sources.indexOf(mapping.source);
          next += base64VLQ$1.encode(sourceIdx - previousSource);
          previousSource = sourceIdx;

          // lines are stored 0-based in SourceMap spec version 3
          next += base64VLQ$1.encode(mapping.originalLine - 1
                                     - previousOriginalLine);
          previousOriginalLine = mapping.originalLine - 1;

          next += base64VLQ$1.encode(mapping.originalColumn
                                     - previousOriginalColumn);
          previousOriginalColumn = mapping.originalColumn;

          if (mapping.name != null) {
            nameIdx = this._names.indexOf(mapping.name);
            next += base64VLQ$1.encode(nameIdx - previousName);
            previousName = nameIdx;
          }
        }

        result += next;
      }

      return result;
    };

  SourceMapGenerator$4.prototype._generateSourcesContent =
    function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
      return aSources.map(function (source) {
        if (!this._sourcesContents) {
          return null;
        }
        if (aSourceRoot != null) {
          source = util$2.relative(aSourceRoot, source);
        }
        var key = util$2.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
          ? this._sourcesContents[key]
          : null;
      }, this);
    };

  /**
   * Externalize the source map.
   */
  SourceMapGenerator$4.prototype.toJSON =
    function SourceMapGenerator_toJSON() {
      var map = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      if (this._file != null) {
        map.file = this._file;
      }
      if (this._sourceRoot != null) {
        map.sourceRoot = this._sourceRoot;
      }
      if (this._sourcesContents) {
        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
      }

      return map;
    };

  /**
   * Render the source map being generated to a string.
   */
  SourceMapGenerator$4.prototype.toString =
    function SourceMapGenerator_toString() {
      return JSON.stringify(this.toJSON());
    };

  sourceMapGenerator.SourceMapGenerator = SourceMapGenerator$4;

  var sourceMapConsumer = {};

  var binarySearch$1 = {};

  /* -*- Mode: js; js-indent-level: 2; -*- */

  (function (exports) {
  	/*
  	 * Copyright 2011 Mozilla Foundation and contributors
  	 * Licensed under the New BSD license. See LICENSE or:
  	 * http://opensource.org/licenses/BSD-3-Clause
  	 */

  	exports.GREATEST_LOWER_BOUND = 1;
  	exports.LEAST_UPPER_BOUND = 2;

  	/**
  	 * Recursive implementation of binary search.
  	 *
  	 * @param aLow Indices here and lower do not contain the needle.
  	 * @param aHigh Indices here and higher do not contain the needle.
  	 * @param aNeedle The element being searched for.
  	 * @param aHaystack The non-empty array being searched.
  	 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
  	 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
  	 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
  	 *     closest element that is smaller than or greater than the one we are
  	 *     searching for, respectively, if the exact element cannot be found.
  	 */
  	function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
  	  // This function terminates when one of the following is true:
  	  //
  	  //   1. We find the exact element we are looking for.
  	  //
  	  //   2. We did not find the exact element, but we can return the index of
  	  //      the next-closest element.
  	  //
  	  //   3. We did not find the exact element, and there is no next-closest
  	  //      element than the one we are searching for, so we return -1.
  	  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
  	  var cmp = aCompare(aNeedle, aHaystack[mid], true);
  	  if (cmp === 0) {
  	    // Found the element we are looking for.
  	    return mid;
  	  }
  	  else if (cmp > 0) {
  	    // Our needle is greater than aHaystack[mid].
  	    if (aHigh - mid > 1) {
  	      // The element is in the upper half.
  	      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
  	    }

  	    // The exact needle element was not found in this haystack. Determine if
  	    // we are in termination case (3) or (2) and return the appropriate thing.
  	    if (aBias == exports.LEAST_UPPER_BOUND) {
  	      return aHigh < aHaystack.length ? aHigh : -1;
  	    } else {
  	      return mid;
  	    }
  	  }
  	  else {
  	    // Our needle is less than aHaystack[mid].
  	    if (mid - aLow > 1) {
  	      // The element is in the lower half.
  	      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
  	    }

  	    // we are in termination case (3) or (2) and return the appropriate thing.
  	    if (aBias == exports.LEAST_UPPER_BOUND) {
  	      return mid;
  	    } else {
  	      return aLow < 0 ? -1 : aLow;
  	    }
  	  }
  	}

  	/**
  	 * This is an implementation of binary search which will always try and return
  	 * the index of the closest element if there is no exact hit. This is because
  	 * mappings between original and generated line/col pairs are single points,
  	 * and there is an implicit region between each of them, so a miss just means
  	 * that you aren't on the very start of a region.
  	 *
  	 * @param aNeedle The element you are looking for.
  	 * @param aHaystack The array that is being searched.
  	 * @param aCompare A function which takes the needle and an element in the
  	 *     array and returns -1, 0, or 1 depending on whether the needle is less
  	 *     than, equal to, or greater than the element, respectively.
  	 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
  	 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
  	 *     closest element that is smaller than or greater than the one we are
  	 *     searching for, respectively, if the exact element cannot be found.
  	 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
  	 */
  	exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
  	  if (aHaystack.length === 0) {
  	    return -1;
  	  }

  	  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
  	                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
  	  if (index < 0) {
  	    return -1;
  	  }

  	  // We have found either the exact element, or the next-closest element than
  	  // the one we are searching for. However, there may be more than one such
  	  // element. Make sure we always return the smallest of these.
  	  while (index - 1 >= 0) {
  	    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
  	      break;
  	    }
  	    --index;
  	  }

  	  return index;
  	};
  } (binarySearch$1));

  var quickSort$1 = {};

  /* -*- Mode: js; js-indent-level: 2; -*- */

  /*
   * Copyright 2011 Mozilla Foundation and contributors
   * Licensed under the New BSD license. See LICENSE or:
   * http://opensource.org/licenses/BSD-3-Clause
   */

  // It turns out that some (most?) JavaScript engines don't self-host
  // `Array.prototype.sort`. This makes sense because C++ will likely remain
  // faster than JS when doing raw CPU-intensive sorting. However, when using a
  // custom comparator function, calling back and forth between the VM's C++ and
  // JIT'd JS is rather slow *and* loses JIT type information, resulting in
  // worse generated code for the comparator function than would be optimal. In
  // fact, when sorting with a comparator, these costs outweigh the benefits of
  // sorting in C++. By using our own JS-implemented Quick Sort (below), we get
  // a ~3500ms mean speed-up in `bench/bench.html`.

  function SortTemplate(comparator) {

  /**
   * Swap the elements indexed by `x` and `y` in the array `ary`.
   *
   * @param {Array} ary
   *        The array.
   * @param {Number} x
   *        The index of the first item.
   * @param {Number} y
   *        The index of the second item.
   */
  function swap(ary, x, y) {
    var temp = ary[x];
    ary[x] = ary[y];
    ary[y] = temp;
  }

  /**
   * Returns a random integer within the range `low .. high` inclusive.
   *
   * @param {Number} low
   *        The lower bound on the range.
   * @param {Number} high
   *        The upper bound on the range.
   */
  function randomIntInRange(low, high) {
    return Math.round(low + (Math.random() * (high - low)));
  }

  /**
   * The Quick Sort algorithm.
   *
   * @param {Array} ary
   *        An array to sort.
   * @param {function} comparator
   *        Function to use to compare two items.
   * @param {Number} p
   *        Start index of the array
   * @param {Number} r
   *        End index of the array
   */
  function doQuickSort(ary, comparator, p, r) {
    // If our lower bound is less than our upper bound, we (1) partition the
    // array into two pieces and (2) recurse on each half. If it is not, this is
    // the empty array and our base case.

    if (p < r) {
      // (1) Partitioning.
      //
      // The partitioning chooses a pivot between `p` and `r` and moves all
      // elements that are less than or equal to the pivot to the before it, and
      // all the elements that are greater than it after it. The effect is that
      // once partition is done, the pivot is in the exact place it will be when
      // the array is put in sorted order, and it will not need to be moved
      // again. This runs in O(n) time.

      // Always choose a random pivot so that an input array which is reverse
      // sorted does not cause O(n^2) running time.
      var pivotIndex = randomIntInRange(p, r);
      var i = p - 1;

      swap(ary, pivotIndex, r);
      var pivot = ary[r];

      // Immediately after `j` is incremented in this loop, the following hold
      // true:
      //
      //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
      //
      //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
      for (var j = p; j < r; j++) {
        if (comparator(ary[j], pivot, false) <= 0) {
          i += 1;
          swap(ary, i, j);
        }
      }

      swap(ary, i + 1, j);
      var q = i + 1;

      // (2) Recurse on each half.

      doQuickSort(ary, comparator, p, q - 1);
      doQuickSort(ary, comparator, q + 1, r);
    }
  }

    return doQuickSort;
  }

  function cloneSort(comparator) {
    let template = SortTemplate.toString();
    let templateFn = new Function(`return ${template}`)();
    return templateFn(comparator);
  }

  /**
   * Sort the given array in-place with the given comparator function.
   *
   * @param {Array} ary
   *        An array to sort.
   * @param {function} comparator
   *        Function to use to compare two items.
   */

  let sortCache = new WeakMap();
  quickSort$1.quickSort = function (ary, comparator, start = 0) {
    let doQuickSort = sortCache.get(comparator);
    if (doQuickSort === void 0) {
      doQuickSort = cloneSort(comparator);
      sortCache.set(comparator, doQuickSort);
    }
    doQuickSort(ary, comparator, start, ary.length - 1);
  };

  /* -*- Mode: js; js-indent-level: 2; -*- */

  /*
   * Copyright 2011 Mozilla Foundation and contributors
   * Licensed under the New BSD license. See LICENSE or:
   * http://opensource.org/licenses/BSD-3-Clause
   */

  var util$1 = util$5;
  var binarySearch = binarySearch$1;
  var ArraySet = arraySet.ArraySet;
  var base64VLQ = base64Vlq;
  var quickSort = quickSort$1.quickSort;

  function SourceMapConsumer$3(aSourceMap, aSourceMapURL) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') {
      sourceMap = util$1.parseSourceMapInput(aSourceMap);
    }

    return sourceMap.sections != null
      ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
      : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
  }

  SourceMapConsumer$3.fromSourceMap = function(aSourceMap, aSourceMapURL) {
    return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
  };

  /**
   * The version of the source mapping spec that we are consuming.
   */
  SourceMapConsumer$3.prototype._version = 3;

  // `__generatedMappings` and `__originalMappings` are arrays that hold the
  // parsed mapping coordinates from the source map's "mappings" attribute. They
  // are lazily instantiated, accessed via the `_generatedMappings` and
  // `_originalMappings` getters respectively, and we only parse the mappings
  // and create these arrays once queried for a source location. We jump through
  // these hoops because there can be many thousands of mappings, and parsing
  // them is expensive, so we only want to do it if we must.
  //
  // Each object in the arrays is of the form:
  //
  //     {
  //       generatedLine: The line number in the generated code,
  //       generatedColumn: The column number in the generated code,
  //       source: The path to the original source file that generated this
  //               chunk of code,
  //       originalLine: The line number in the original source that
  //                     corresponds to this chunk of generated code,
  //       originalColumn: The column number in the original source that
  //                       corresponds to this chunk of generated code,
  //       name: The name of the original symbol which generated this chunk of
  //             code.
  //     }
  //
  // All properties except for `generatedLine` and `generatedColumn` can be
  // `null`.
  //
  // `_generatedMappings` is ordered by the generated positions.
  //
  // `_originalMappings` is ordered by the original positions.

  SourceMapConsumer$3.prototype.__generatedMappings = null;
  Object.defineProperty(SourceMapConsumer$3.prototype, '_generatedMappings', {
    configurable: true,
    enumerable: true,
    get: function () {
      if (!this.__generatedMappings) {
        this._parseMappings(this._mappings, this.sourceRoot);
      }

      return this.__generatedMappings;
    }
  });

  SourceMapConsumer$3.prototype.__originalMappings = null;
  Object.defineProperty(SourceMapConsumer$3.prototype, '_originalMappings', {
    configurable: true,
    enumerable: true,
    get: function () {
      if (!this.__originalMappings) {
        this._parseMappings(this._mappings, this.sourceRoot);
      }

      return this.__originalMappings;
    }
  });

  SourceMapConsumer$3.prototype._charIsMappingSeparator =
    function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
      var c = aStr.charAt(index);
      return c === ";" || c === ",";
    };

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
  SourceMapConsumer$3.prototype._parseMappings =
    function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      throw new Error("Subclasses must implement _parseMappings");
    };

  SourceMapConsumer$3.GENERATED_ORDER = 1;
  SourceMapConsumer$3.ORIGINAL_ORDER = 2;

  SourceMapConsumer$3.GREATEST_LOWER_BOUND = 1;
  SourceMapConsumer$3.LEAST_UPPER_BOUND = 2;

  /**
   * Iterate over each mapping between an original source/line/column and a
   * generated line/column in this source map.
   *
   * @param Function aCallback
   *        The function that is called with each mapping.
   * @param Object aContext
   *        Optional. If specified, this object will be the value of `this` every
   *        time that `aCallback` is called.
   * @param aOrder
   *        Either `SourceMapConsumer.GENERATED_ORDER` or
   *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
   *        iterate over the mappings sorted by the generated file's line/column
   *        order or the original's source/line/column order, respectively. Defaults to
   *        `SourceMapConsumer.GENERATED_ORDER`.
   */
  SourceMapConsumer$3.prototype.eachMapping =
    function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
      var context = aContext || null;
      var order = aOrder || SourceMapConsumer$3.GENERATED_ORDER;

      var mappings;
      switch (order) {
      case SourceMapConsumer$3.GENERATED_ORDER:
        mappings = this._generatedMappings;
        break;
      case SourceMapConsumer$3.ORIGINAL_ORDER:
        mappings = this._originalMappings;
        break;
      default:
        throw new Error("Unknown order of iteration.");
      }

      var sourceRoot = this.sourceRoot;
      var boundCallback = aCallback.bind(context);
      var names = this._names;
      var sources = this._sources;
      var sourceMapURL = this._sourceMapURL;

      for (var i = 0, n = mappings.length; i < n; i++) {
        var mapping = mappings[i];
        var source = mapping.source === null ? null : sources.at(mapping.source);
        if(source !== null) {
          source = util$1.computeSourceURL(sourceRoot, source, sourceMapURL);
        }
        boundCallback({
          source: source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name === null ? null : names.at(mapping.name)
        });
      }
    };

  /**
   * Returns all generated line and column information for the original source,
   * line, and column provided. If no column is provided, returns all mappings
   * corresponding to a either the line we are searching for or the next
   * closest line that has any mappings. Otherwise, returns all mappings
   * corresponding to the given line and either the column we are searching for
   * or the next closest column that has any offsets.
   *
   * The only argument is an object with the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.  The line number is 1-based.
   *   - column: Optional. the column number in the original source.
   *    The column number is 0-based.
   *
   * and an array of objects is returned, each with the following properties:
   *
   *   - line: The line number in the generated source, or null.  The
   *    line number is 1-based.
   *   - column: The column number in the generated source, or null.
   *    The column number is 0-based.
   */
  SourceMapConsumer$3.prototype.allGeneratedPositionsFor =
    function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
      var line = util$1.getArg(aArgs, 'line');

      // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
      // returns the index of the closest mapping less than the needle. By
      // setting needle.originalColumn to 0, we thus find the last mapping for
      // the given line, provided such a mapping exists.
      var needle = {
        source: util$1.getArg(aArgs, 'source'),
        originalLine: line,
        originalColumn: util$1.getArg(aArgs, 'column', 0)
      };

      needle.source = this._findSourceIndex(needle.source);
      if (needle.source < 0) {
        return [];
      }

      var mappings = [];

      var index = this._findMapping(needle,
                                    this._originalMappings,
                                    "originalLine",
                                    "originalColumn",
                                    util$1.compareByOriginalPositions,
                                    binarySearch.LEAST_UPPER_BOUND);
      if (index >= 0) {
        var mapping = this._originalMappings[index];

        if (aArgs.column === undefined) {
          var originalLine = mapping.originalLine;

          // Iterate until either we run out of mappings, or we run into
          // a mapping for a different line than the one we found. Since
          // mappings are sorted, this is guaranteed to find all mappings for
          // the line we found.
          while (mapping && mapping.originalLine === originalLine) {
            mappings.push({
              line: util$1.getArg(mapping, 'generatedLine', null),
              column: util$1.getArg(mapping, 'generatedColumn', null),
              lastColumn: util$1.getArg(mapping, 'lastGeneratedColumn', null)
            });

            mapping = this._originalMappings[++index];
          }
        } else {
          var originalColumn = mapping.originalColumn;

          // Iterate until either we run out of mappings, or we run into
          // a mapping for a different line than the one we were searching for.
          // Since mappings are sorted, this is guaranteed to find all mappings for
          // the line we are searching for.
          while (mapping &&
                 mapping.originalLine === line &&
                 mapping.originalColumn == originalColumn) {
            mappings.push({
              line: util$1.getArg(mapping, 'generatedLine', null),
              column: util$1.getArg(mapping, 'generatedColumn', null),
              lastColumn: util$1.getArg(mapping, 'lastGeneratedColumn', null)
            });

            mapping = this._originalMappings[++index];
          }
        }
      }

      return mappings;
    };

  sourceMapConsumer.SourceMapConsumer = SourceMapConsumer$3;

  /**
   * A BasicSourceMapConsumer instance represents a parsed source map which we can
   * query for information about the original file positions by giving it a file
   * position in the generated source.
   *
   * The first parameter is the raw source map (either as a JSON string, or
   * already parsed to an object). According to the spec, source maps have the
   * following attributes:
   *
   *   - version: Which version of the source map spec this map is following.
   *   - sources: An array of URLs to the original source files.
   *   - names: An array of identifiers which can be referrenced by individual mappings.
   *   - sourceRoot: Optional. The URL root from which all sources are relative.
   *   - sourcesContent: Optional. An array of contents of the original source files.
   *   - mappings: A string of base64 VLQs which contain the actual mappings.
   *   - file: Optional. The generated file this source map is associated with.
   *
   * Here is an example source map, taken from the source map spec[0]:
   *
   *     {
   *       version : 3,
   *       file: "out.js",
   *       sourceRoot : "",
   *       sources: ["foo.js", "bar.js"],
   *       names: ["src", "maps", "are", "fun"],
   *       mappings: "AA,AB;;ABCDE;"
   *     }
   *
   * The second parameter, if given, is a string whose value is the URL
   * at which the source map was found.  This URL is used to compute the
   * sources array.
   *
   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
   */
  function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') {
      sourceMap = util$1.parseSourceMapInput(aSourceMap);
    }

    var version = util$1.getArg(sourceMap, 'version');
    var sources = util$1.getArg(sourceMap, 'sources');
    // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
    // requires the array) to play nice here.
    var names = util$1.getArg(sourceMap, 'names', []);
    var sourceRoot = util$1.getArg(sourceMap, 'sourceRoot', null);
    var sourcesContent = util$1.getArg(sourceMap, 'sourcesContent', null);
    var mappings = util$1.getArg(sourceMap, 'mappings');
    var file = util$1.getArg(sourceMap, 'file', null);

    // Once again, Sass deviates from the spec and supplies the version as a
    // string rather than a number, so we use loose equality checking here.
    if (version != this._version) {
      throw new Error('Unsupported version: ' + version);
    }

    if (sourceRoot) {
      sourceRoot = util$1.normalize(sourceRoot);
    }

    sources = sources
      .map(String)
      // Some source maps produce relative source paths like "./foo.js" instead of
      // "foo.js".  Normalize these first so that future comparisons will succeed.
      // See bugzil.la/1090768.
      .map(util$1.normalize)
      // Always ensure that absolute sources are internally stored relative to
      // the source root, if the source root is absolute. Not doing this would
      // be particularly problematic when the source root is a prefix of the
      // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
      .map(function (source) {
        return sourceRoot && util$1.isAbsolute(sourceRoot) && util$1.isAbsolute(source)
          ? util$1.relative(sourceRoot, source)
          : source;
      });

    // Pass `true` below to allow duplicate names and sources. While source maps
    // are intended to be compressed and deduplicated, the TypeScript compiler
    // sometimes generates source maps with duplicates in them. See Github issue
    // #72 and bugzil.la/889492.
    this._names = ArraySet.fromArray(names.map(String), true);
    this._sources = ArraySet.fromArray(sources, true);

    this._absoluteSources = this._sources.toArray().map(function (s) {
      return util$1.computeSourceURL(sourceRoot, s, aSourceMapURL);
    });

    this.sourceRoot = sourceRoot;
    this.sourcesContent = sourcesContent;
    this._mappings = mappings;
    this._sourceMapURL = aSourceMapURL;
    this.file = file;
  }

  BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer$3.prototype);
  BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer$3;

  /**
   * Utility function to find the index of a source.  Returns -1 if not
   * found.
   */
  BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util$1.relative(this.sourceRoot, relativeSource);
    }

    if (this._sources.has(relativeSource)) {
      return this._sources.indexOf(relativeSource);
    }

    // Maybe aSource is an absolute URL as returned by |sources|.  In
    // this case we can't simply undo the transform.
    var i;
    for (i = 0; i < this._absoluteSources.length; ++i) {
      if (this._absoluteSources[i] == aSource) {
        return i;
      }
    }

    return -1;
  };

  /**
   * Create a BasicSourceMapConsumer from a SourceMapGenerator.
   *
   * @param SourceMapGenerator aSourceMap
   *        The source map that will be consumed.
   * @param String aSourceMapURL
   *        The URL at which the source map can be found (optional)
   * @returns BasicSourceMapConsumer
   */
  BasicSourceMapConsumer.fromSourceMap =
    function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
      var smc = Object.create(BasicSourceMapConsumer.prototype);

      var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
      var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
      smc.sourceRoot = aSourceMap._sourceRoot;
      smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                              smc.sourceRoot);
      smc.file = aSourceMap._file;
      smc._sourceMapURL = aSourceMapURL;
      smc._absoluteSources = smc._sources.toArray().map(function (s) {
        return util$1.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
      });

      // Because we are modifying the entries (by converting string sources and
      // names to indices into the sources and names ArraySets), we have to make
      // a copy of the entry or else bad things happen. Shared mutable state
      // strikes again! See github issue #191.

      var generatedMappings = aSourceMap._mappings.toArray().slice();
      var destGeneratedMappings = smc.__generatedMappings = [];
      var destOriginalMappings = smc.__originalMappings = [];

      for (var i = 0, length = generatedMappings.length; i < length; i++) {
        var srcMapping = generatedMappings[i];
        var destMapping = new Mapping;
        destMapping.generatedLine = srcMapping.generatedLine;
        destMapping.generatedColumn = srcMapping.generatedColumn;

        if (srcMapping.source) {
          destMapping.source = sources.indexOf(srcMapping.source);
          destMapping.originalLine = srcMapping.originalLine;
          destMapping.originalColumn = srcMapping.originalColumn;

          if (srcMapping.name) {
            destMapping.name = names.indexOf(srcMapping.name);
          }

          destOriginalMappings.push(destMapping);
        }

        destGeneratedMappings.push(destMapping);
      }

      quickSort(smc.__originalMappings, util$1.compareByOriginalPositions);

      return smc;
    };

  /**
   * The version of the source mapping spec that we are consuming.
   */
  BasicSourceMapConsumer.prototype._version = 3;

  /**
   * The list of original sources.
   */
  Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
    get: function () {
      return this._absoluteSources.slice();
    }
  });

  /**
   * Provide the JIT with a nice shape / hidden class.
   */
  function Mapping() {
    this.generatedLine = 0;
    this.generatedColumn = 0;
    this.source = null;
    this.originalLine = null;
    this.originalColumn = null;
    this.name = null;
  }

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */

  const compareGenerated = util$1.compareByGeneratedPositionsDeflatedNoLine;
  function sortGenerated(array, start) {
    let l = array.length;
    let n = array.length - start;
    if (n <= 1) {
      return;
    } else if (n == 2) {
      let a = array[start];
      let b = array[start + 1];
      if (compareGenerated(a, b) > 0) {
        array[start] = b;
        array[start + 1] = a;
      }
    } else if (n < 20) {
      for (let i = start; i < l; i++) {
        for (let j = i; j > start; j--) {
          let a = array[j - 1];
          let b = array[j];
          if (compareGenerated(a, b) <= 0) {
            break;
          }
          array[j - 1] = b;
          array[j] = a;
        }
      }
    } else {
      quickSort(array, compareGenerated, start);
    }
  }
  BasicSourceMapConsumer.prototype._parseMappings =
    function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      var generatedLine = 1;
      var previousGeneratedColumn = 0;
      var previousOriginalLine = 0;
      var previousOriginalColumn = 0;
      var previousSource = 0;
      var previousName = 0;
      var length = aStr.length;
      var index = 0;
      var temp = {};
      var originalMappings = [];
      var generatedMappings = [];
      var mapping, segment, end, value;

      let subarrayStart = 0;
      while (index < length) {
        if (aStr.charAt(index) === ';') {
          generatedLine++;
          index++;
          previousGeneratedColumn = 0;

          sortGenerated(generatedMappings, subarrayStart);
          subarrayStart = generatedMappings.length;
        }
        else if (aStr.charAt(index) === ',') {
          index++;
        }
        else {
          mapping = new Mapping();
          mapping.generatedLine = generatedLine;

          for (end = index; end < length; end++) {
            if (this._charIsMappingSeparator(aStr, end)) {
              break;
            }
          }
          aStr.slice(index, end);

          segment = [];
          while (index < end) {
            base64VLQ.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }

          if (segment.length === 2) {
            throw new Error('Found a source, but no line and column');
          }

          if (segment.length === 3) {
            throw new Error('Found a source and line, but no column');
          }

          // Generated column.
          mapping.generatedColumn = previousGeneratedColumn + segment[0];
          previousGeneratedColumn = mapping.generatedColumn;

          if (segment.length > 1) {
            // Original source.
            mapping.source = previousSource + segment[1];
            previousSource += segment[1];

            // Original line.
            mapping.originalLine = previousOriginalLine + segment[2];
            previousOriginalLine = mapping.originalLine;
            // Lines are stored 0-based
            mapping.originalLine += 1;

            // Original column.
            mapping.originalColumn = previousOriginalColumn + segment[3];
            previousOriginalColumn = mapping.originalColumn;

            if (segment.length > 4) {
              // Original name.
              mapping.name = previousName + segment[4];
              previousName += segment[4];
            }
          }

          generatedMappings.push(mapping);
          if (typeof mapping.originalLine === 'number') {
            let currentSource = mapping.source;
            while (originalMappings.length <= currentSource) {
              originalMappings.push(null);
            }
            if (originalMappings[currentSource] === null) {
              originalMappings[currentSource] = [];
            }
            originalMappings[currentSource].push(mapping);
          }
        }
      }

      sortGenerated(generatedMappings, subarrayStart);
      this.__generatedMappings = generatedMappings;

      for (var i = 0; i < originalMappings.length; i++) {
        if (originalMappings[i] != null) {
          quickSort(originalMappings[i], util$1.compareByOriginalPositionsNoSource);
        }
      }
      this.__originalMappings = [].concat(...originalMappings);
    };

  /**
   * Find the mapping that best matches the hypothetical "needle" mapping that
   * we are searching for in the given "haystack" of mappings.
   */
  BasicSourceMapConsumer.prototype._findMapping =
    function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                           aColumnName, aComparator, aBias) {
      // To return the position we are searching for, we must first find the
      // mapping for the given position and then return the opposite position it
      // points to. Because the mappings are sorted, we can use binary search to
      // find the best mapping.

      if (aNeedle[aLineName] <= 0) {
        throw new TypeError('Line must be greater than or equal to 1, got '
                            + aNeedle[aLineName]);
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError('Column must be greater than or equal to 0, got '
                            + aNeedle[aColumnName]);
      }

      return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
    };

  /**
   * Compute the last column for each generated mapping. The last column is
   * inclusive.
   */
  BasicSourceMapConsumer.prototype.computeColumnSpans =
    function SourceMapConsumer_computeColumnSpans() {
      for (var index = 0; index < this._generatedMappings.length; ++index) {
        var mapping = this._generatedMappings[index];

        // Mappings do not contain a field for the last generated columnt. We
        // can come up with an optimistic estimate, however, by assuming that
        // mappings are contiguous (i.e. given two consecutive mappings, the
        // first mapping ends where the second one starts).
        if (index + 1 < this._generatedMappings.length) {
          var nextMapping = this._generatedMappings[index + 1];

          if (mapping.generatedLine === nextMapping.generatedLine) {
            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
            continue;
          }
        }

        // The last mapping for each line spans the entire line.
        mapping.lastGeneratedColumn = Infinity;
      }
    };

  /**
   * Returns the original source, line, and column information for the generated
   * source's line and column positions provided. The only argument is an object
   * with the following properties:
   *
   *   - line: The line number in the generated source.  The line number
   *     is 1-based.
   *   - column: The column number in the generated source.  The column
   *     number is 0-based.
   *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
   *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
   *     closest element that is smaller than or greater than the one we are
   *     searching for, respectively, if the exact element cannot be found.
   *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
   *
   * and an object is returned with the following properties:
   *
   *   - source: The original source file, or null.
   *   - line: The line number in the original source, or null.  The
   *     line number is 1-based.
   *   - column: The column number in the original source, or null.  The
   *     column number is 0-based.
   *   - name: The original identifier, or null.
   */
  BasicSourceMapConsumer.prototype.originalPositionFor =
    function SourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util$1.getArg(aArgs, 'line'),
        generatedColumn: util$1.getArg(aArgs, 'column')
      };

      var index = this._findMapping(
        needle,
        this._generatedMappings,
        "generatedLine",
        "generatedColumn",
        util$1.compareByGeneratedPositionsDeflated,
        util$1.getArg(aArgs, 'bias', SourceMapConsumer$3.GREATEST_LOWER_BOUND)
      );

      if (index >= 0) {
        var mapping = this._generatedMappings[index];

        if (mapping.generatedLine === needle.generatedLine) {
          var source = util$1.getArg(mapping, 'source', null);
          if (source !== null) {
            source = this._sources.at(source);
            source = util$1.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
          }
          var name = util$1.getArg(mapping, 'name', null);
          if (name !== null) {
            name = this._names.at(name);
          }
          return {
            source: source,
            line: util$1.getArg(mapping, 'originalLine', null),
            column: util$1.getArg(mapping, 'originalColumn', null),
            name: name
          };
        }
      }

      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    };

  /**
   * Return true if we have the source content for every source in the source
   * map, false otherwise.
   */
  BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
    function BasicSourceMapConsumer_hasContentsOfAllSources() {
      if (!this.sourcesContent) {
        return false;
      }
      return this.sourcesContent.length >= this._sources.size() &&
        !this.sourcesContent.some(function (sc) { return sc == null; });
    };

  /**
   * Returns the original source content. The only argument is the url of the
   * original source file. Returns null if no original source content is
   * available.
   */
  BasicSourceMapConsumer.prototype.sourceContentFor =
    function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      if (!this.sourcesContent) {
        return null;
      }

      var index = this._findSourceIndex(aSource);
      if (index >= 0) {
        return this.sourcesContent[index];
      }

      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util$1.relative(this.sourceRoot, relativeSource);
      }

      var url;
      if (this.sourceRoot != null
          && (url = util$1.urlParse(this.sourceRoot))) {
        // XXX: file:// URIs and absolute paths lead to unexpected behavior for
        // many users. We can help them out when they expect file:// URIs to
        // behave like it would if they were running a local HTTP server. See
        // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
        var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
        if (url.scheme == "file"
            && this._sources.has(fileUriAbsPath)) {
          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
        }

        if ((!url.path || url.path == "/")
            && this._sources.has("/" + relativeSource)) {
          return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
        }
      }

      // This function is used recursively from
      // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
      // don't want to throw if we can't find the source - we just want to
      // return null, so we provide a flag to exit gracefully.
      if (nullOnMissing) {
        return null;
      }
      else {
        throw new Error('"' + relativeSource + '" is not in the SourceMap.');
      }
    };

  /**
   * Returns the generated line and column information for the original source,
   * line, and column positions provided. The only argument is an object with
   * the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.  The line number
   *     is 1-based.
   *   - column: The column number in the original source.  The column
   *     number is 0-based.
   *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
   *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
   *     closest element that is smaller than or greater than the one we are
   *     searching for, respectively, if the exact element cannot be found.
   *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
   *
   * and an object is returned with the following properties:
   *
   *   - line: The line number in the generated source, or null.  The
   *     line number is 1-based.
   *   - column: The column number in the generated source, or null.
   *     The column number is 0-based.
   */
  BasicSourceMapConsumer.prototype.generatedPositionFor =
    function SourceMapConsumer_generatedPositionFor(aArgs) {
      var source = util$1.getArg(aArgs, 'source');
      source = this._findSourceIndex(source);
      if (source < 0) {
        return {
          line: null,
          column: null,
          lastColumn: null
        };
      }

      var needle = {
        source: source,
        originalLine: util$1.getArg(aArgs, 'line'),
        originalColumn: util$1.getArg(aArgs, 'column')
      };

      var index = this._findMapping(
        needle,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        util$1.compareByOriginalPositions,
        util$1.getArg(aArgs, 'bias', SourceMapConsumer$3.GREATEST_LOWER_BOUND)
      );

      if (index >= 0) {
        var mapping = this._originalMappings[index];

        if (mapping.source === needle.source) {
          return {
            line: util$1.getArg(mapping, 'generatedLine', null),
            column: util$1.getArg(mapping, 'generatedColumn', null),
            lastColumn: util$1.getArg(mapping, 'lastGeneratedColumn', null)
          };
        }
      }

      return {
        line: null,
        column: null,
        lastColumn: null
      };
    };

  sourceMapConsumer.BasicSourceMapConsumer = BasicSourceMapConsumer;

  /**
   * An IndexedSourceMapConsumer instance represents a parsed source map which
   * we can query for information. It differs from BasicSourceMapConsumer in
   * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
   * input.
   *
   * The first parameter is a raw source map (either as a JSON string, or already
   * parsed to an object). According to the spec for indexed source maps, they
   * have the following attributes:
   *
   *   - version: Which version of the source map spec this map is following.
   *   - file: Optional. The generated file this source map is associated with.
   *   - sections: A list of section definitions.
   *
   * Each value under the "sections" field has two fields:
   *   - offset: The offset into the original specified at which this section
   *       begins to apply, defined as an object with a "line" and "column"
   *       field.
   *   - map: A source map definition. This source map could also be indexed,
   *       but doesn't have to be.
   *
   * Instead of the "map" field, it's also possible to have a "url" field
   * specifying a URL to retrieve a source map from, but that's currently
   * unsupported.
   *
   * Here's an example source map, taken from the source map spec[0], but
   * modified to omit a section which uses the "url" field.
   *
   *  {
   *    version : 3,
   *    file: "app.js",
   *    sections: [{
   *      offset: {line:100, column:10},
   *      map: {
   *        version : 3,
   *        file: "section.js",
   *        sources: ["foo.js", "bar.js"],
   *        names: ["src", "maps", "are", "fun"],
   *        mappings: "AAAA,E;;ABCDE;"
   *      }
   *    }],
   *  }
   *
   * The second parameter, if given, is a string whose value is the URL
   * at which the source map was found.  This URL is used to compute the
   * sources array.
   *
   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
   */
  function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') {
      sourceMap = util$1.parseSourceMapInput(aSourceMap);
    }

    var version = util$1.getArg(sourceMap, 'version');
    var sections = util$1.getArg(sourceMap, 'sections');

    if (version != this._version) {
      throw new Error('Unsupported version: ' + version);
    }

    this._sources = new ArraySet();
    this._names = new ArraySet();

    var lastOffset = {
      line: -1,
      column: 0
    };
    this._sections = sections.map(function (s) {
      if (s.url) {
        // The url field will require support for asynchronicity.
        // See https://github.com/mozilla/source-map/issues/16
        throw new Error('Support for url field in sections not implemented.');
      }
      var offset = util$1.getArg(s, 'offset');
      var offsetLine = util$1.getArg(offset, 'line');
      var offsetColumn = util$1.getArg(offset, 'column');

      if (offsetLine < lastOffset.line ||
          (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
        throw new Error('Section offsets must be ordered and non-overlapping.');
      }
      lastOffset = offset;

      return {
        generatedOffset: {
          // The offset fields are 0-based, but we use 1-based indices when
          // encoding/decoding from VLQ.
          generatedLine: offsetLine + 1,
          generatedColumn: offsetColumn + 1
        },
        consumer: new SourceMapConsumer$3(util$1.getArg(s, 'map'), aSourceMapURL)
      }
    });
  }

  IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer$3.prototype);
  IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer$3;

  /**
   * The version of the source mapping spec that we are consuming.
   */
  IndexedSourceMapConsumer.prototype._version = 3;

  /**
   * The list of original sources.
   */
  Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
    get: function () {
      var sources = [];
      for (var i = 0; i < this._sections.length; i++) {
        for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
          sources.push(this._sections[i].consumer.sources[j]);
        }
      }
      return sources;
    }
  });

  /**
   * Returns the original source, line, and column information for the generated
   * source's line and column positions provided. The only argument is an object
   * with the following properties:
   *
   *   - line: The line number in the generated source.  The line number
   *     is 1-based.
   *   - column: The column number in the generated source.  The column
   *     number is 0-based.
   *
   * and an object is returned with the following properties:
   *
   *   - source: The original source file, or null.
   *   - line: The line number in the original source, or null.  The
   *     line number is 1-based.
   *   - column: The column number in the original source, or null.  The
   *     column number is 0-based.
   *   - name: The original identifier, or null.
   */
  IndexedSourceMapConsumer.prototype.originalPositionFor =
    function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util$1.getArg(aArgs, 'line'),
        generatedColumn: util$1.getArg(aArgs, 'column')
      };

      // Find the section containing the generated position we're trying to map
      // to an original position.
      var sectionIndex = binarySearch.search(needle, this._sections,
        function(needle, section) {
          var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
          if (cmp) {
            return cmp;
          }

          return (needle.generatedColumn -
                  section.generatedOffset.generatedColumn);
        });
      var section = this._sections[sectionIndex];

      if (!section) {
        return {
          source: null,
          line: null,
          column: null,
          name: null
        };
      }

      return section.consumer.originalPositionFor({
        line: needle.generatedLine -
          (section.generatedOffset.generatedLine - 1),
        column: needle.generatedColumn -
          (section.generatedOffset.generatedLine === needle.generatedLine
           ? section.generatedOffset.generatedColumn - 1
           : 0),
        bias: aArgs.bias
      });
    };

  /**
   * Return true if we have the source content for every source in the source
   * map, false otherwise.
   */
  IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
    function IndexedSourceMapConsumer_hasContentsOfAllSources() {
      return this._sections.every(function (s) {
        return s.consumer.hasContentsOfAllSources();
      });
    };

  /**
   * Returns the original source content. The only argument is the url of the
   * original source file. Returns null if no original source content is
   * available.
   */
  IndexedSourceMapConsumer.prototype.sourceContentFor =
    function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];

        var content = section.consumer.sourceContentFor(aSource, true);
        if (content || content === '') {
          return content;
        }
      }
      if (nullOnMissing) {
        return null;
      }
      else {
        throw new Error('"' + aSource + '" is not in the SourceMap.');
      }
    };

  /**
   * Returns the generated line and column information for the original source,
   * line, and column positions provided. The only argument is an object with
   * the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.  The line number
   *     is 1-based.
   *   - column: The column number in the original source.  The column
   *     number is 0-based.
   *
   * and an object is returned with the following properties:
   *
   *   - line: The line number in the generated source, or null.  The
   *     line number is 1-based. 
   *   - column: The column number in the generated source, or null.
   *     The column number is 0-based.
   */
  IndexedSourceMapConsumer.prototype.generatedPositionFor =
    function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];

        // Only consider this section if the requested source is in the list of
        // sources of the consumer.
        if (section.consumer._findSourceIndex(util$1.getArg(aArgs, 'source')) === -1) {
          continue;
        }
        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
        if (generatedPosition) {
          var ret = {
            line: generatedPosition.line +
              (section.generatedOffset.generatedLine - 1),
            column: generatedPosition.column +
              (section.generatedOffset.generatedLine === generatedPosition.line
               ? section.generatedOffset.generatedColumn - 1
               : 0)
          };
          return ret;
        }
      }

      return {
        line: null,
        column: null
      };
    };

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
  IndexedSourceMapConsumer.prototype._parseMappings =
    function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      this.__generatedMappings = [];
      this.__originalMappings = [];
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var sectionMappings = section.consumer._generatedMappings;
        for (var j = 0; j < sectionMappings.length; j++) {
          var mapping = sectionMappings[j];

          var source = section.consumer._sources.at(mapping.source);
          if(source !== null) {
            source = util$1.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
          }
          this._sources.add(source);
          source = this._sources.indexOf(source);

          var name = null;
          if (mapping.name) {
            name = section.consumer._names.at(mapping.name);
            this._names.add(name);
            name = this._names.indexOf(name);
          }

          // The mappings coming from the consumer for the section have
          // generated positions relative to the start of the section, so we
          // need to offset them to be relative to the start of the concatenated
          // generated file.
          var adjustedMapping = {
            source: source,
            generatedLine: mapping.generatedLine +
              (section.generatedOffset.generatedLine - 1),
            generatedColumn: mapping.generatedColumn +
              (section.generatedOffset.generatedLine === mapping.generatedLine
              ? section.generatedOffset.generatedColumn - 1
              : 0),
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name: name
          };

          this.__generatedMappings.push(adjustedMapping);
          if (typeof adjustedMapping.originalLine === 'number') {
            this.__originalMappings.push(adjustedMapping);
          }
        }
      }

      quickSort(this.__generatedMappings, util$1.compareByGeneratedPositionsDeflated);
      quickSort(this.__originalMappings, util$1.compareByOriginalPositions);
    };

  sourceMapConsumer.IndexedSourceMapConsumer = IndexedSourceMapConsumer;

  var sourceNode = {};

  /* -*- Mode: js; js-indent-level: 2; -*- */

  /*
   * Copyright 2011 Mozilla Foundation and contributors
   * Licensed under the New BSD license. See LICENSE or:
   * http://opensource.org/licenses/BSD-3-Clause
   */

  var SourceMapGenerator$3 = sourceMapGenerator.SourceMapGenerator;
  var util = util$5;

  // Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
  // operating systems these days (capturing the result).
  var REGEX_NEWLINE = /(\r?\n)/;

  // Newline character code for charCodeAt() comparisons
  var NEWLINE_CODE = 10;

  // Private symbol for identifying `SourceNode`s when multiple versions of
  // the source-map library are loaded. This MUST NOT CHANGE across
  // versions!
  var isSourceNode = "$$$isSourceNode$$$";

  /**
   * SourceNodes provide a way to abstract over interpolating/concatenating
   * snippets of generated JavaScript source code while maintaining the line and
   * column information associated with the original source code.
   *
   * @param aLine The original line number.
   * @param aColumn The original column number.
   * @param aSource The original source's filename.
   * @param aChunks Optional. An array of strings which are snippets of
   *        generated JS, or other SourceNodes.
   * @param aName The original identifier.
   */
  function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
    this.children = [];
    this.sourceContents = {};
    this.line = aLine == null ? null : aLine;
    this.column = aColumn == null ? null : aColumn;
    this.source = aSource == null ? null : aSource;
    this.name = aName == null ? null : aName;
    this[isSourceNode] = true;
    if (aChunks != null) this.add(aChunks);
  }

  /**
   * Creates a SourceNode from generated code and a SourceMapConsumer.
   *
   * @param aGeneratedCode The generated code
   * @param aSourceMapConsumer The SourceMap for the generated code
   * @param aRelativePath Optional. The path that relative sources in the
   *        SourceMapConsumer should be relative to.
   */
  SourceNode.fromStringWithSourceMap =
    function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
      // The SourceNode we want to fill with the generated code
      // and the SourceMap
      var node = new SourceNode();

      // All even indices of this array are one line of the generated code,
      // while all odd indices are the newlines between two adjacent lines
      // (since `REGEX_NEWLINE` captures its match).
      // Processed fragments are accessed by calling `shiftNextLine`.
      var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
      var remainingLinesIndex = 0;
      var shiftNextLine = function() {
        var lineContents = getNextLine();
        // The last line of a file might not have a newline.
        var newLine = getNextLine() || "";
        return lineContents + newLine;

        function getNextLine() {
          return remainingLinesIndex < remainingLines.length ?
              remainingLines[remainingLinesIndex++] : undefined;
        }
      };

      // We need to remember the position of "remainingLines"
      var lastGeneratedLine = 1, lastGeneratedColumn = 0;

      // The generate SourceNodes we need a code range.
      // To extract it current and last mapping is used.
      // Here we store the last mapping.
      var lastMapping = null;

      aSourceMapConsumer.eachMapping(function (mapping) {
        if (lastMapping !== null) {
          // We add the code from "lastMapping" to "mapping":
          // First check if there is a new line in between.
          if (lastGeneratedLine < mapping.generatedLine) {
            // Associate first line with "lastMapping"
            addMappingWithCode(lastMapping, shiftNextLine());
            lastGeneratedLine++;
            lastGeneratedColumn = 0;
            // The remaining code is added without mapping
          } else {
            // There is no new line in between.
            // Associate the code between "lastGeneratedColumn" and
            // "mapping.generatedColumn" with "lastMapping"
            var nextLine = remainingLines[remainingLinesIndex] || '';
            var code = nextLine.substr(0, mapping.generatedColumn -
                                          lastGeneratedColumn);
            remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
                                                lastGeneratedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
            addMappingWithCode(lastMapping, code);
            // No more remaining code, continue
            lastMapping = mapping;
            return;
          }
        }
        // We add the generated code until the first mapping
        // to the SourceNode without any mapping.
        // Each line is added as separate string.
        while (lastGeneratedLine < mapping.generatedLine) {
          node.add(shiftNextLine());
          lastGeneratedLine++;
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
          var nextLine = remainingLines[remainingLinesIndex] || '';
          node.add(nextLine.substr(0, mapping.generatedColumn));
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
        }
        lastMapping = mapping;
      }, this);
      // We have processed all mappings.
      if (remainingLinesIndex < remainingLines.length) {
        if (lastMapping) {
          // Associate the remaining code in the current line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine());
        }
        // and add the remaining lines without any mapping
        node.add(remainingLines.splice(remainingLinesIndex).join(""));
      }

      // Copy sourcesContent into SourceNode
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aRelativePath != null) {
            sourceFile = util.join(aRelativePath, sourceFile);
          }
          node.setSourceContent(sourceFile, content);
        }
      });

      return node;

      function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === undefined) {
          node.add(code);
        } else {
          var source = aRelativePath
            ? util.join(aRelativePath, mapping.source)
            : mapping.source;
          node.add(new SourceNode(mapping.originalLine,
                                  mapping.originalColumn,
                                  source,
                                  code,
                                  mapping.name));
        }
      }
    };

  /**
   * Add a chunk of generated JS to this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
  SourceNode.prototype.add = function SourceNode_add(aChunk) {
    if (Array.isArray(aChunk)) {
      aChunk.forEach(function (chunk) {
        this.add(chunk);
      }, this);
    }
    else if (aChunk[isSourceNode] || typeof aChunk === "string") {
      if (aChunk) {
        this.children.push(aChunk);
      }
    }
    else {
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
      );
    }
    return this;
  };

  /**
   * Add a chunk of generated JS to the beginning of this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
  SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
    if (Array.isArray(aChunk)) {
      for (var i = aChunk.length-1; i >= 0; i--) {
        this.prepend(aChunk[i]);
      }
    }
    else if (aChunk[isSourceNode] || typeof aChunk === "string") {
      this.children.unshift(aChunk);
    }
    else {
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
      );
    }
    return this;
  };

  /**
   * Walk over the tree of JS snippets in this node and its children. The
   * walking function is called once for each snippet of JS and is passed that
   * snippet and the its original associated source's line/column location.
   *
   * @param aFn The traversal function.
   */
  SourceNode.prototype.walk = function SourceNode_walk(aFn) {
    var chunk;
    for (var i = 0, len = this.children.length; i < len; i++) {
      chunk = this.children[i];
      if (chunk[isSourceNode]) {
        chunk.walk(aFn);
      }
      else {
        if (chunk !== '') {
          aFn(chunk, { source: this.source,
                       line: this.line,
                       column: this.column,
                       name: this.name });
        }
      }
    }
  };

  /**
   * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
   * each of `this.children`.
   *
   * @param aSep The separator.
   */
  SourceNode.prototype.join = function SourceNode_join(aSep) {
    var newChildren;
    var i;
    var len = this.children.length;
    if (len > 0) {
      newChildren = [];
      for (i = 0; i < len-1; i++) {
        newChildren.push(this.children[i]);
        newChildren.push(aSep);
      }
      newChildren.push(this.children[i]);
      this.children = newChildren;
    }
    return this;
  };

  /**
   * Call String.prototype.replace on the very right-most source snippet. Useful
   * for trimming whitespace from the end of a source node, etc.
   *
   * @param aPattern The pattern to replace.
   * @param aReplacement The thing to replace the pattern with.
   */
  SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
    var lastChild = this.children[this.children.length - 1];
    if (lastChild[isSourceNode]) {
      lastChild.replaceRight(aPattern, aReplacement);
    }
    else if (typeof lastChild === 'string') {
      this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
    }
    else {
      this.children.push(''.replace(aPattern, aReplacement));
    }
    return this;
  };

  /**
   * Set the source content for a source file. This will be added to the SourceMapGenerator
   * in the sourcesContent field.
   *
   * @param aSourceFile The filename of the source file
   * @param aSourceContent The content of the source file
   */
  SourceNode.prototype.setSourceContent =
    function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
    };

  /**
   * Walk over the tree of SourceNodes. The walking function is called for each
   * source file content and is passed the filename and source content.
   *
   * @param aFn The traversal function.
   */
  SourceNode.prototype.walkSourceContents =
    function SourceNode_walkSourceContents(aFn) {
      for (var i = 0, len = this.children.length; i < len; i++) {
        if (this.children[i][isSourceNode]) {
          this.children[i].walkSourceContents(aFn);
        }
      }

      var sources = Object.keys(this.sourceContents);
      for (var i = 0, len = sources.length; i < len; i++) {
        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
      }
    };

  /**
   * Return the string representation of this source node. Walks over the tree
   * and concatenates all the various snippets together to one string.
   */
  SourceNode.prototype.toString = function SourceNode_toString() {
    var str = "";
    this.walk(function (chunk) {
      str += chunk;
    });
    return str;
  };

  /**
   * Returns the string representation of this source node along with a source
   * map.
   */
  SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
    var generated = {
      code: "",
      line: 1,
      column: 0
    };
    var map = new SourceMapGenerator$3(aArgs);
    var sourceMappingActive = false;
    var lastOriginalSource = null;
    var lastOriginalLine = null;
    var lastOriginalColumn = null;
    var lastOriginalName = null;
    this.walk(function (chunk, original) {
      generated.code += chunk;
      if (original.source !== null
          && original.line !== null
          && original.column !== null) {
        if(lastOriginalSource !== original.source
           || lastOriginalLine !== original.line
           || lastOriginalColumn !== original.column
           || lastOriginalName !== original.name) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
        lastOriginalSource = original.source;
        lastOriginalLine = original.line;
        lastOriginalColumn = original.column;
        lastOriginalName = original.name;
        sourceMappingActive = true;
      } else if (sourceMappingActive) {
        map.addMapping({
          generated: {
            line: generated.line,
            column: generated.column
          }
        });
        lastOriginalSource = null;
        sourceMappingActive = false;
      }
      for (var idx = 0, length = chunk.length; idx < length; idx++) {
        if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
          generated.line++;
          generated.column = 0;
          // Mappings end at eol
          if (idx + 1 === length) {
            lastOriginalSource = null;
            sourceMappingActive = false;
          } else if (sourceMappingActive) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            });
          }
        } else {
          generated.column++;
        }
      }
    });
    this.walkSourceContents(function (sourceFile, sourceContent) {
      map.setSourceContent(sourceFile, sourceContent);
    });

    return { code: generated.code, map: map };
  };

  sourceNode.SourceNode = SourceNode;

  /*
   * Copyright 2009-2011 Mozilla Foundation and contributors
   * Licensed under the New BSD license. See LICENSE.txt or:
   * http://opensource.org/licenses/BSD-3-Clause
   */

  sourceMap.SourceMapGenerator = sourceMapGenerator.SourceMapGenerator;
  sourceMap.SourceMapConsumer = sourceMapConsumer.SourceMapConsumer;
  sourceMap.SourceNode = sourceNode.SourceNode;

  /*! https://mths.be/punycode v1.4.1 by @mathias */


  /** Highest positive signed 32-bit float value */
  var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

  /** Bootstring parameters */
  var base = 36;
  var tMin = 1;
  var tMax = 26;
  var skew = 38;
  var damp = 700;
  var initialBias = 72;
  var initialN = 128; // 0x80
  var delimiter = '-'; // '\x2D'
  var regexNonASCII = /[^\x20-\x7E]/; // unprintable ASCII chars + non-ASCII chars
  var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

  /** Error messages */
  var errors = {
    'overflow': 'Overflow: input needs wider integers to process',
    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
    'invalid-input': 'Invalid input'
  };

  /** Convenience shortcuts */
  var baseMinusTMin = base - tMin;
  var floor = Math.floor;
  var stringFromCharCode = String.fromCharCode;

  /*--------------------------------------------------------------------------*/

  /**
   * A generic error utility function.
   * @private
   * @param {String} type The error type.
   * @returns {Error} Throws a `RangeError` with the applicable error message.
   */
  function error$1(type) {
    throw new RangeError(errors[type]);
  }

  /**
   * A generic `Array#map` utility function.
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function that gets called for every array
   * item.
   * @returns {Array} A new array of values returned by the callback function.
   */
  function map$1(array, fn) {
    var length = array.length;
    var result = [];
    while (length--) {
      result[length] = fn(array[length]);
    }
    return result;
  }

  /**
   * A simple `Array#map`-like wrapper to work with domain name strings or email
   * addresses.
   * @private
   * @param {String} domain The domain name or email address.
   * @param {Function} callback The function that gets called for every
   * character.
   * @returns {Array} A new string of characters returned by the callback
   * function.
   */
  function mapDomain(string, fn) {
    var parts = string.split('@');
    var result = '';
    if (parts.length > 1) {
      // In email addresses, only the domain name should be punycoded. Leave
      // the local part (i.e. everything up to `@`) intact.
      result = parts[0] + '@';
      string = parts[1];
    }
    // Avoid `split(regex)` for IE8 compatibility. See #17.
    string = string.replace(regexSeparators, '\x2E');
    var labels = string.split('.');
    var encoded = map$1(labels, fn).join('.');
    return result + encoded;
  }

  /**
   * Creates an array containing the numeric code points of each Unicode
   * character in the string. While JavaScript uses UCS-2 internally,
   * this function will convert a pair of surrogate halves (each of which
   * UCS-2 exposes as separate characters) into a single code point,
   * matching UTF-16.
   * @see `punycode.ucs2.encode`
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode.ucs2
   * @name decode
   * @param {String} string The Unicode input string (UCS-2).
   * @returns {Array} The new array of code points.
   */
  function ucs2decode(string) {
    var output = [],
      counter = 0,
      length = string.length,
      value,
      extra;
    while (counter < length) {
      value = string.charCodeAt(counter++);
      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        // high surrogate, and there is a next character
        extra = string.charCodeAt(counter++);
        if ((extra & 0xFC00) == 0xDC00) { // low surrogate
          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          // unmatched surrogate; only append this code unit, in case the next
          // code unit is the high surrogate of a surrogate pair
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }
    return output;
  }

  /**
   * Converts a digit/integer into a basic code point.
   * @see `basicToDigit()`
   * @private
   * @param {Number} digit The numeric value of a basic code point.
   * @returns {Number} The basic code point whose value (when used for
   * representing integers) is `digit`, which needs to be in the range
   * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
   * used; else, the lowercase form is used. The behavior is undefined
   * if `flag` is non-zero and `digit` has no uppercase form.
   */
  function digitToBasic(digit, flag) {
    //  0..25 map to ASCII a..z or A..Z
    // 26..35 map to ASCII 0..9
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  }

  /**
   * Bias adaptation function as per section 3.4 of RFC 3492.
   * https://tools.ietf.org/html/rfc3492#section-3.4
   * @private
   */
  function adapt(delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? floor(delta / damp) : delta >> 1;
    delta += floor(delta / numPoints);
    for ( /* no initialization */ ; delta > baseMinusTMin * tMax >> 1; k += base) {
      delta = floor(delta / baseMinusTMin);
    }
    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  }

  /**
   * Converts a string of Unicode symbols (e.g. a domain name label) to a
   * Punycode string of ASCII-only symbols.
   * @memberOf punycode
   * @param {String} input The string of Unicode symbols.
   * @returns {String} The resulting Punycode string of ASCII-only symbols.
   */
  function encode(input) {
    var n,
      delta,
      handledCPCount,
      basicLength,
      bias,
      j,
      m,
      q,
      k,
      t,
      currentValue,
      output = [],
      /** `inputLength` will hold the number of code points in `input`. */
      inputLength,
      /** Cached calculation results */
      handledCPCountPlusOne,
      baseMinusT,
      qMinusT;

    // Convert the input in UCS-2 to Unicode
    input = ucs2decode(input);

    // Cache the length
    inputLength = input.length;

    // Initialize the state
    n = initialN;
    delta = 0;
    bias = initialBias;

    // Handle the basic code points
    for (j = 0; j < inputLength; ++j) {
      currentValue = input[j];
      if (currentValue < 0x80) {
        output.push(stringFromCharCode(currentValue));
      }
    }

    handledCPCount = basicLength = output.length;

    // `handledCPCount` is the number of code points that have been handled;
    // `basicLength` is the number of basic code points.

    // Finish the basic string - if it is not empty - with a delimiter
    if (basicLength) {
      output.push(delimiter);
    }

    // Main encoding loop:
    while (handledCPCount < inputLength) {

      // All non-basic code points < n have been handled already. Find the next
      // larger one:
      for (m = maxInt, j = 0; j < inputLength; ++j) {
        currentValue = input[j];
        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      }

      // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
      // but guard against overflow
      handledCPCountPlusOne = handledCPCount + 1;
      if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
        error$1('overflow');
      }

      delta += (m - n) * handledCPCountPlusOne;
      n = m;

      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j];

        if (currentValue < n && ++delta > maxInt) {
          error$1('overflow');
        }

        if (currentValue == n) {
          // Represent delta as a generalized variable-length integer
          for (q = delta, k = base; /* no condition */ ; k += base) {
            t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
            if (q < t) {
              break;
            }
            qMinusT = q - t;
            baseMinusT = base - t;
            output.push(
              stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
            );
            q = floor(qMinusT / baseMinusT);
          }

          output.push(stringFromCharCode(digitToBasic(q, 0)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
          delta = 0;
          ++handledCPCount;
        }
      }

      ++delta;
      ++n;

    }
    return output.join('');
  }

  /**
   * Converts a Unicode string representing a domain name or an email address to
   * Punycode. Only the non-ASCII parts of the domain name will be converted,
   * i.e. it doesn't matter if you call it with a domain that's already in
   * ASCII.
   * @memberOf punycode
   * @param {String} input The domain name or email address to convert, as a
   * Unicode string.
   * @returns {String} The Punycode representation of the given domain name or
   * email address.
   */
  function toASCII(input) {
    return mapDomain(input, function(string) {
      return regexNonASCII.test(string) ?
        'xn--' + encode(string) :
        string;
    });
  }

  var lookup = [];
  var revLookup = [];
  var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
  var inited = false;
  function init () {
    inited = true;
    var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }

    revLookup['-'.charCodeAt(0)] = 62;
    revLookup['_'.charCodeAt(0)] = 63;
  }

  function toByteArray (b64) {
    if (!inited) {
      init();
    }
    var i, j, l, tmp, placeHolders, arr;
    var len = b64.length;

    if (len % 4 > 0) {
      throw new Error('Invalid string. Length must be a multiple of 4')
    }

    // the number of equal signs (place holders)
    // if there are two placeholders, than the two characters before it
    // represent one byte
    // if there is only one, then the three characters before it represent 2 bytes
    // this is just a cheap hack to not do indexOf twice
    placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

    // base64 is 4/3 + up to two characters of the original data
    arr = new Arr(len * 3 / 4 - placeHolders);

    // if there are placeholders, only get up to the last complete 4 chars
    l = placeHolders > 0 ? len - 4 : len;

    var L = 0;

    for (i = 0, j = 0; i < l; i += 4, j += 3) {
      tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
      arr[L++] = (tmp >> 16) & 0xFF;
      arr[L++] = (tmp >> 8) & 0xFF;
      arr[L++] = tmp & 0xFF;
    }

    if (placeHolders === 2) {
      tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
      arr[L++] = tmp & 0xFF;
    } else if (placeHolders === 1) {
      tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
      arr[L++] = (tmp >> 8) & 0xFF;
      arr[L++] = tmp & 0xFF;
    }

    return arr
  }

  function tripletToBase64 (num) {
    return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
  }

  function encodeChunk (uint8, start, end) {
    var tmp;
    var output = [];
    for (var i = start; i < end; i += 3) {
      tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
      output.push(tripletToBase64(tmp));
    }
    return output.join('')
  }

  function fromByteArray (uint8) {
    if (!inited) {
      init();
    }
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
    var output = '';
    var parts = [];
    var maxChunkLength = 16383; // must be multiple of 3

    // go through the array every three bytes, we'll deal with trailing stuff later
    for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
      parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
    }

    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
      tmp = uint8[len - 1];
      output += lookup[tmp >> 2];
      output += lookup[(tmp << 4) & 0x3F];
      output += '==';
    } else if (extraBytes === 2) {
      tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
      output += lookup[tmp >> 10];
      output += lookup[(tmp >> 4) & 0x3F];
      output += lookup[(tmp << 2) & 0x3F];
      output += '=';
    }

    parts.push(output);

    return parts.join('')
  }

  function read (buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? (nBytes - 1) : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];

    i += d;

    e = s & ((1 << (-nBits)) - 1);
    s >>= (-nBits);
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

    m = e & ((1 << (-nBits)) - 1);
    e >>= (-nBits);
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : ((s ? -1 : 1) * Infinity)
    } else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
  }

  function write (buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
    var i = isLE ? 0 : (nBytes - 1);
    var d = isLE ? 1 : -1;
    var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

    value = Math.abs(value);

    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }

      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }

    for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

    e = (e << mLen) | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

    buffer[offset + i - d] |= s * 128;
  }

  var toString = {}.toString;

  var isArray$1 = Array.isArray || function (arr) {
    return toString.call(arr) == '[object Array]';
  };

  /*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   */

  var INSPECT_MAX_BYTES = 50;

  /**
   * If `Buffer.TYPED_ARRAY_SUPPORT`:
   *   === true    Use Uint8Array implementation (fastest)
   *   === false   Use Object implementation (most compatible, even IE6)
   *
   * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
   * Opera 11.6+, iOS 4.2+.
   *
   * Due to various browser bugs, sometimes the Object implementation will be used even
   * when the browser supports typed arrays.
   *
   * Note:
   *
   *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
   *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
   *
   *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
   *
   *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
   *     incorrect length in some situations.

   * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
   * get the Object implementation, which is slower but behaves correctly.
   */
  Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
    ? global$1.TYPED_ARRAY_SUPPORT
    : true;

  /*
   * Export kMaxLength after typed array support is determined.
   */
  kMaxLength();

  function kMaxLength () {
    return Buffer.TYPED_ARRAY_SUPPORT
      ? 0x7fffffff
      : 0x3fffffff
  }

  function createBuffer (that, length) {
    if (kMaxLength() < length) {
      throw new RangeError('Invalid typed array length')
    }
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      // Return an augmented `Uint8Array` instance, for best performance
      that = new Uint8Array(length);
      that.__proto__ = Buffer.prototype;
    } else {
      // Fallback: Return an object instance of the Buffer class
      if (that === null) {
        that = new Buffer(length);
      }
      that.length = length;
    }

    return that
  }

  /**
   * The Buffer constructor returns instances of `Uint8Array` that have their
   * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
   * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
   * and the `Uint8Array` methods. Square bracket notation works as expected -- it
   * returns a single octet.
   *
   * The `Uint8Array` prototype remains unmodified.
   */

  function Buffer (arg, encodingOrOffset, length) {
    if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
      return new Buffer(arg, encodingOrOffset, length)
    }

    // Common case.
    if (typeof arg === 'number') {
      if (typeof encodingOrOffset === 'string') {
        throw new Error(
          'If encoding is specified then the first argument must be a string'
        )
      }
      return allocUnsafe(this, arg)
    }
    return from(this, arg, encodingOrOffset, length)
  }

  Buffer.poolSize = 8192; // not used by this implementation

  // TODO: Legacy, not needed anymore. Remove in next major version.
  Buffer._augment = function (arr) {
    arr.__proto__ = Buffer.prototype;
    return arr
  };

  function from (that, value, encodingOrOffset, length) {
    if (typeof value === 'number') {
      throw new TypeError('"value" argument must not be a number')
    }

    if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
      return fromArrayBuffer(that, value, encodingOrOffset, length)
    }

    if (typeof value === 'string') {
      return fromString(that, value, encodingOrOffset)
    }

    return fromObject(that, value)
  }

  /**
   * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
   * if value is a number.
   * Buffer.from(str[, encoding])
   * Buffer.from(array)
   * Buffer.from(buffer)
   * Buffer.from(arrayBuffer[, byteOffset[, length]])
   **/
  Buffer.from = function (value, encodingOrOffset, length) {
    return from(null, value, encodingOrOffset, length)
  };

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    Buffer.prototype.__proto__ = Uint8Array.prototype;
    Buffer.__proto__ = Uint8Array;
  }

  function assertSize (size) {
    if (typeof size !== 'number') {
      throw new TypeError('"size" argument must be a number')
    } else if (size < 0) {
      throw new RangeError('"size" argument must not be negative')
    }
  }

  function alloc (that, size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(that, size)
    }
    if (fill !== undefined) {
      // Only pay attention to encoding if it's a string. This
      // prevents accidentally sending in a number that would
      // be interpretted as a start offset.
      return typeof encoding === 'string'
        ? createBuffer(that, size).fill(fill, encoding)
        : createBuffer(that, size).fill(fill)
    }
    return createBuffer(that, size)
  }

  /**
   * Creates a new filled Buffer instance.
   * alloc(size[, fill[, encoding]])
   **/
  Buffer.alloc = function (size, fill, encoding) {
    return alloc(null, size, fill, encoding)
  };

  function allocUnsafe (that, size) {
    assertSize(size);
    that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT) {
      for (var i = 0; i < size; ++i) {
        that[i] = 0;
      }
    }
    return that
  }

  /**
   * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
   * */
  Buffer.allocUnsafe = function (size) {
    return allocUnsafe(null, size)
  };
  /**
   * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
   */
  Buffer.allocUnsafeSlow = function (size) {
    return allocUnsafe(null, size)
  };

  function fromString (that, string, encoding) {
    if (typeof encoding !== 'string' || encoding === '') {
      encoding = 'utf8';
    }

    if (!Buffer.isEncoding(encoding)) {
      throw new TypeError('"encoding" must be a valid string encoding')
    }

    var length = byteLength(string, encoding) | 0;
    that = createBuffer(that, length);

    var actual = that.write(string, encoding);

    if (actual !== length) {
      // Writing a hex string, for example, that contains invalid characters will
      // cause everything after the first invalid character to be ignored. (e.g.
      // 'abxxcd' will be treated as 'ab')
      that = that.slice(0, actual);
    }

    return that
  }

  function fromArrayLike (that, array) {
    var length = array.length < 0 ? 0 : checked(array.length) | 0;
    that = createBuffer(that, length);
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that
  }

  function fromArrayBuffer (that, array, byteOffset, length) {
    array.byteLength; // this throws if `array` is not a valid ArrayBuffer

    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError('\'offset\' is out of bounds')
    }

    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError('\'length\' is out of bounds')
    }

    if (byteOffset === undefined && length === undefined) {
      array = new Uint8Array(array);
    } else if (length === undefined) {
      array = new Uint8Array(array, byteOffset);
    } else {
      array = new Uint8Array(array, byteOffset, length);
    }

    if (Buffer.TYPED_ARRAY_SUPPORT) {
      // Return an augmented `Uint8Array` instance, for best performance
      that = array;
      that.__proto__ = Buffer.prototype;
    } else {
      // Fallback: Return an object instance of the Buffer class
      that = fromArrayLike(that, array);
    }
    return that
  }

  function fromObject (that, obj) {
    if (internalIsBuffer(obj)) {
      var len = checked(obj.length) | 0;
      that = createBuffer(that, len);

      if (that.length === 0) {
        return that
      }

      obj.copy(that, 0, 0, len);
      return that
    }

    if (obj) {
      if ((typeof ArrayBuffer !== 'undefined' &&
          obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
        if (typeof obj.length !== 'number' || isnan(obj.length)) {
          return createBuffer(that, 0)
        }
        return fromArrayLike(that, obj)
      }

      if (obj.type === 'Buffer' && isArray$1(obj.data)) {
        return fromArrayLike(that, obj.data)
      }
    }

    throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
  }

  function checked (length) {
    // Note: cannot use `length < kMaxLength()` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= kMaxLength()) {
      throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                           'size: 0x' + kMaxLength().toString(16) + ' bytes')
    }
    return length | 0
  }
  Buffer.isBuffer = isBuffer;
  function internalIsBuffer (b) {
    return !!(b != null && b._isBuffer)
  }

  Buffer.compare = function compare (a, b) {
    if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
      throw new TypeError('Arguments must be Buffers')
    }

    if (a === b) return 0

    var x = a.length;
    var y = b.length;

    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break
      }
    }

    if (x < y) return -1
    if (y < x) return 1
    return 0
  };

  Buffer.isEncoding = function isEncoding (encoding) {
    switch (String(encoding).toLowerCase()) {
      case 'hex':
      case 'utf8':
      case 'utf-8':
      case 'ascii':
      case 'latin1':
      case 'binary':
      case 'base64':
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return true
      default:
        return false
    }
  };

  Buffer.concat = function concat (list, length) {
    if (!isArray$1(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }

    if (list.length === 0) {
      return Buffer.alloc(0)
    }

    var i;
    if (length === undefined) {
      length = 0;
      for (i = 0; i < list.length; ++i) {
        length += list[i].length;
      }
    }

    var buffer = Buffer.allocUnsafe(length);
    var pos = 0;
    for (i = 0; i < list.length; ++i) {
      var buf = list[i];
      if (!internalIsBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers')
      }
      buf.copy(buffer, pos);
      pos += buf.length;
    }
    return buffer
  };

  function byteLength (string, encoding) {
    if (internalIsBuffer(string)) {
      return string.length
    }
    if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
        (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
      return string.byteLength
    }
    if (typeof string !== 'string') {
      string = '' + string;
    }

    var len = string.length;
    if (len === 0) return 0

    // Use a for loop to avoid recursion
    var loweredCase = false;
    for (;;) {
      switch (encoding) {
        case 'ascii':
        case 'latin1':
        case 'binary':
          return len
        case 'utf8':
        case 'utf-8':
        case undefined:
          return utf8ToBytes(string).length
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return len * 2
        case 'hex':
          return len >>> 1
        case 'base64':
          return base64ToBytes(string).length
        default:
          if (loweredCase) return utf8ToBytes(string).length // assume utf8
          encoding = ('' + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer.byteLength = byteLength;

  function slowToString (encoding, start, end) {
    var loweredCase = false;

    // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
    // property of a typed array.

    // This behaves neither like String nor Uint8Array in that we set start/end
    // to their upper/lower bounds if the value passed is out of range.
    // undefined is handled specially as per ECMA-262 6th Edition,
    // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
    if (start === undefined || start < 0) {
      start = 0;
    }
    // Return early if start > this.length. Done here to prevent potential uint32
    // coercion fail below.
    if (start > this.length) {
      return ''
    }

    if (end === undefined || end > this.length) {
      end = this.length;
    }

    if (end <= 0) {
      return ''
    }

    // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
    end >>>= 0;
    start >>>= 0;

    if (end <= start) {
      return ''
    }

    if (!encoding) encoding = 'utf8';

    while (true) {
      switch (encoding) {
        case 'hex':
          return hexSlice(this, start, end)

        case 'utf8':
        case 'utf-8':
          return utf8Slice(this, start, end)

        case 'ascii':
          return asciiSlice(this, start, end)

        case 'latin1':
        case 'binary':
          return latin1Slice(this, start, end)

        case 'base64':
          return base64Slice(this, start, end)

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return utf16leSlice(this, start, end)

        default:
          if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
          encoding = (encoding + '').toLowerCase();
          loweredCase = true;
      }
    }
  }

  // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
  // Buffer instances.
  Buffer.prototype._isBuffer = true;

  function swap (b, n, m) {
    var i = b[n];
    b[n] = b[m];
    b[m] = i;
  }

  Buffer.prototype.swap16 = function swap16 () {
    var len = this.length;
    if (len % 2 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 16-bits')
    }
    for (var i = 0; i < len; i += 2) {
      swap(this, i, i + 1);
    }
    return this
  };

  Buffer.prototype.swap32 = function swap32 () {
    var len = this.length;
    if (len % 4 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 32-bits')
    }
    for (var i = 0; i < len; i += 4) {
      swap(this, i, i + 3);
      swap(this, i + 1, i + 2);
    }
    return this
  };

  Buffer.prototype.swap64 = function swap64 () {
    var len = this.length;
    if (len % 8 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 64-bits')
    }
    for (var i = 0; i < len; i += 8) {
      swap(this, i, i + 7);
      swap(this, i + 1, i + 6);
      swap(this, i + 2, i + 5);
      swap(this, i + 3, i + 4);
    }
    return this
  };

  Buffer.prototype.toString = function toString () {
    var length = this.length | 0;
    if (length === 0) return ''
    if (arguments.length === 0) return utf8Slice(this, 0, length)
    return slowToString.apply(this, arguments)
  };

  Buffer.prototype.equals = function equals (b) {
    if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
    if (this === b) return true
    return Buffer.compare(this, b) === 0
  };

  Buffer.prototype.inspect = function inspect () {
    var str = '';
    var max = INSPECT_MAX_BYTES;
    if (this.length > 0) {
      str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
      if (this.length > max) str += ' ... ';
    }
    return '<Buffer ' + str + '>'
  };

  Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
    if (!internalIsBuffer(target)) {
      throw new TypeError('Argument must be a Buffer')
    }

    if (start === undefined) {
      start = 0;
    }
    if (end === undefined) {
      end = target ? target.length : 0;
    }
    if (thisStart === undefined) {
      thisStart = 0;
    }
    if (thisEnd === undefined) {
      thisEnd = this.length;
    }

    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError('out of range index')
    }

    if (thisStart >= thisEnd && start >= end) {
      return 0
    }
    if (thisStart >= thisEnd) {
      return -1
    }
    if (start >= end) {
      return 1
    }

    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;

    if (this === target) return 0

    var x = thisEnd - thisStart;
    var y = end - start;
    var len = Math.min(x, y);

    var thisCopy = this.slice(thisStart, thisEnd);
    var targetCopy = target.slice(start, end);

    for (var i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break
      }
    }

    if (x < y) return -1
    if (y < x) return 1
    return 0
  };

  // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
  // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
  //
  // Arguments:
  // - buffer - a Buffer to search
  // - val - a string, Buffer, or number
  // - byteOffset - an index into `buffer`; will be clamped to an int32
  // - encoding - an optional encoding, relevant is val is a string
  // - dir - true for indexOf, false for lastIndexOf
  function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
    // Empty buffer means no match
    if (buffer.length === 0) return -1

    // Normalize byteOffset
    if (typeof byteOffset === 'string') {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 0x7fffffff) {
      byteOffset = 0x7fffffff;
    } else if (byteOffset < -0x80000000) {
      byteOffset = -0x80000000;
    }
    byteOffset = +byteOffset;  // Coerce to Number.
    if (isNaN(byteOffset)) {
      // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
      byteOffset = dir ? 0 : (buffer.length - 1);
    }

    // Normalize byteOffset: negative offsets start from the end of the buffer
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
      if (dir) return -1
      else byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
      if (dir) byteOffset = 0;
      else return -1
    }

    // Normalize val
    if (typeof val === 'string') {
      val = Buffer.from(val, encoding);
    }

    // Finally, search either indexOf (if dir is true) or lastIndexOf
    if (internalIsBuffer(val)) {
      // Special case: looking for empty string/buffer always fails
      if (val.length === 0) {
        return -1
      }
      return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
    } else if (typeof val === 'number') {
      val = val & 0xFF; // Search for a byte value [0-255]
      if (Buffer.TYPED_ARRAY_SUPPORT &&
          typeof Uint8Array.prototype.indexOf === 'function') {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
        }
      }
      return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
    }

    throw new TypeError('val must be string, number or Buffer')
  }

  function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
    var indexSize = 1;
    var arrLength = arr.length;
    var valLength = val.length;

    if (encoding !== undefined) {
      encoding = String(encoding).toLowerCase();
      if (encoding === 'ucs2' || encoding === 'ucs-2' ||
          encoding === 'utf16le' || encoding === 'utf-16le') {
        if (arr.length < 2 || val.length < 2) {
          return -1
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }

    function read (buf, i) {
      if (indexSize === 1) {
        return buf[i]
      } else {
        return buf.readUInt16BE(i * indexSize)
      }
    }

    var i;
    if (dir) {
      var foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1) foundIndex = i;
          if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
        } else {
          if (foundIndex !== -1) i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        var found = true;
        for (var j = 0; j < valLength; j++) {
          if (read(arr, i + j) !== read(val, j)) {
            found = false;
            break
          }
        }
        if (found) return i
      }
    }

    return -1
  }

  Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1
  };

  Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
  };

  Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
  };

  function hexWrite (buf, string, offset, length) {
    offset = Number(offset) || 0;
    var remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }

    // must be an even number of digits
    var strLen = string.length;
    if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

    if (length > strLen / 2) {
      length = strLen / 2;
    }
    for (var i = 0; i < length; ++i) {
      var parsed = parseInt(string.substr(i * 2, 2), 16);
      if (isNaN(parsed)) return i
      buf[offset + i] = parsed;
    }
    return i
  }

  function utf8Write (buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
  }

  function asciiWrite (buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length)
  }

  function latin1Write (buf, string, offset, length) {
    return asciiWrite(buf, string, offset, length)
  }

  function base64Write (buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length)
  }

  function ucs2Write (buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
  }

  Buffer.prototype.write = function write (string, offset, length, encoding) {
    // Buffer#write(string)
    if (offset === undefined) {
      encoding = 'utf8';
      length = this.length;
      offset = 0;
    // Buffer#write(string, encoding)
    } else if (length === undefined && typeof offset === 'string') {
      encoding = offset;
      length = this.length;
      offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
    } else if (isFinite(offset)) {
      offset = offset | 0;
      if (isFinite(length)) {
        length = length | 0;
        if (encoding === undefined) encoding = 'utf8';
      } else {
        encoding = length;
        length = undefined;
      }
    // legacy write(string, encoding, offset, length) - remove in v0.13
    } else {
      throw new Error(
        'Buffer.write(string, encoding, offset[, length]) is no longer supported'
      )
    }

    var remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;

    if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
      throw new RangeError('Attempt to write outside buffer bounds')
    }

    if (!encoding) encoding = 'utf8';

    var loweredCase = false;
    for (;;) {
      switch (encoding) {
        case 'hex':
          return hexWrite(this, string, offset, length)

        case 'utf8':
        case 'utf-8':
          return utf8Write(this, string, offset, length)

        case 'ascii':
          return asciiWrite(this, string, offset, length)

        case 'latin1':
        case 'binary':
          return latin1Write(this, string, offset, length)

        case 'base64':
          // Warning: maxLength not taken into account in base64Write
          return base64Write(this, string, offset, length)

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return ucs2Write(this, string, offset, length)

        default:
          if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
          encoding = ('' + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };

  Buffer.prototype.toJSON = function toJSON () {
    return {
      type: 'Buffer',
      data: Array.prototype.slice.call(this._arr || this, 0)
    }
  };

  function base64Slice (buf, start, end) {
    if (start === 0 && end === buf.length) {
      return fromByteArray(buf)
    } else {
      return fromByteArray(buf.slice(start, end))
    }
  }

  function utf8Slice (buf, start, end) {
    end = Math.min(buf.length, end);
    var res = [];

    var i = start;
    while (i < end) {
      var firstByte = buf[i];
      var codePoint = null;
      var bytesPerSequence = (firstByte > 0xEF) ? 4
        : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
        : 1;

      if (i + bytesPerSequence <= end) {
        var secondByte, thirdByte, fourthByte, tempCodePoint;

        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 0x80) {
              codePoint = firstByte;
            }
            break
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
              if (tempCodePoint > 0x7F) {
                codePoint = tempCodePoint;
              }
            }
            break
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
              if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                codePoint = tempCodePoint;
              }
            }
            break
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
              if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                codePoint = tempCodePoint;
              }
            }
        }
      }

      if (codePoint === null) {
        // we did not generate a valid codePoint so insert a
        // replacement char (U+FFFD) and advance only 1 byte
        codePoint = 0xFFFD;
        bytesPerSequence = 1;
      } else if (codePoint > 0xFFFF) {
        // encode to utf16 (surrogate pair dance)
        codePoint -= 0x10000;
        res.push(codePoint >>> 10 & 0x3FF | 0xD800);
        codePoint = 0xDC00 | codePoint & 0x3FF;
      }

      res.push(codePoint);
      i += bytesPerSequence;
    }

    return decodeCodePointsArray(res)
  }

  // Based on http://stackoverflow.com/a/22747272/680742, the browser with
  // the lowest limit is Chrome, with 0x10000 args.
  // We go 1 magnitude less, for safety
  var MAX_ARGUMENTS_LENGTH = 0x1000;

  function decodeCodePointsArray (codePoints) {
    var len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
    }

    // Decode in chunks to avoid "call stack size exceeded".
    var res = '';
    var i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(
        String,
        codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
      );
    }
    return res
  }

  function asciiSlice (buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);

    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 0x7F);
    }
    return ret
  }

  function latin1Slice (buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);

    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret
  }

  function hexSlice (buf, start, end) {
    var len = buf.length;

    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;

    var out = '';
    for (var i = start; i < end; ++i) {
      out += toHex(buf[i]);
    }
    return out
  }

  function utf16leSlice (buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = '';
    for (var i = 0; i < bytes.length; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res
  }

  Buffer.prototype.slice = function slice (start, end) {
    var len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;

    if (start < 0) {
      start += len;
      if (start < 0) start = 0;
    } else if (start > len) {
      start = len;
    }

    if (end < 0) {
      end += len;
      if (end < 0) end = 0;
    } else if (end > len) {
      end = len;
    }

    if (end < start) end = start;

    var newBuf;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      newBuf = this.subarray(start, end);
      newBuf.__proto__ = Buffer.prototype;
    } else {
      var sliceLen = end - start;
      newBuf = new Buffer(sliceLen, undefined);
      for (var i = 0; i < sliceLen; ++i) {
        newBuf[i] = this[i + start];
      }
    }

    return newBuf
  };

  /*
   * Need to make sure that buffer isn't trying to write out of bounds.
   */
  function checkOffset (offset, ext, length) {
    if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
    if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
  }

  Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }

    return val
  };

  Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) {
      checkOffset(offset, byteLength, this.length);
    }

    var val = this[offset + --byteLength];
    var mul = 1;
    while (byteLength > 0 && (mul *= 0x100)) {
      val += this[offset + --byteLength] * mul;
    }

    return val
  };

  Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset]
  };

  Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | (this[offset + 1] << 8)
  };

  Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    return (this[offset] << 8) | this[offset + 1]
  };

  Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return ((this[offset]) |
        (this[offset + 1] << 8) |
        (this[offset + 2] << 16)) +
        (this[offset + 3] * 0x1000000)
  };

  Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (this[offset] * 0x1000000) +
      ((this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      this[offset + 3])
  };

  Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }
    mul *= 0x80;

    if (val >= mul) val -= Math.pow(2, 8 * byteLength);

    return val
  };

  Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    var i = byteLength;
    var mul = 1;
    var val = this[offset + --i];
    while (i > 0 && (mul *= 0x100)) {
      val += this[offset + --i] * mul;
    }
    mul *= 0x80;

    if (val >= mul) val -= Math.pow(2, 8 * byteLength);

    return val
  };

  Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80)) return (this[offset])
    return ((0xff - this[offset] + 1) * -1)
  };

  Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset] | (this[offset + 1] << 8);
    return (val & 0x8000) ? val | 0xFFFF0000 : val
  };

  Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset + 1] | (this[offset] << 8);
    return (val & 0x8000) ? val | 0xFFFF0000 : val
  };

  Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16) |
      (this[offset + 3] << 24)
  };

  Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (this[offset] << 24) |
      (this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      (this[offset + 3])
  };

  Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return read(this, offset, true, 23, 4)
  };

  Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return read(this, offset, false, 23, 4)
  };

  Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length);
    return read(this, offset, true, 52, 8)
  };

  Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length);
    return read(this, offset, false, 52, 8)
  };

  function checkInt (buf, value, offset, ext, max, min) {
    if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
    if (offset + ext > buf.length) throw new RangeError('Index out of range')
  }

  Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1;
      checkInt(this, value, offset, byteLength, maxBytes, 0);
    }

    var mul = 1;
    var i = 0;
    this[offset] = value & 0xFF;
    while (++i < byteLength && (mul *= 0x100)) {
      this[offset + i] = (value / mul) & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1;
      checkInt(this, value, offset, byteLength, maxBytes, 0);
    }

    var i = byteLength - 1;
    var mul = 1;
    this[offset + i] = value & 0xFF;
    while (--i >= 0 && (mul *= 0x100)) {
      this[offset + i] = (value / mul) & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
    this[offset] = (value & 0xff);
    return offset + 1
  };

  function objectWriteUInt16 (buf, value, offset, littleEndian) {
    if (value < 0) value = 0xffff + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
      buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
        (littleEndian ? i : 1 - i) * 8;
    }
  }

  Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value & 0xff);
      this[offset + 1] = (value >>> 8);
    } else {
      objectWriteUInt16(this, value, offset, true);
    }
    return offset + 2
  };

  Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 8);
      this[offset + 1] = (value & 0xff);
    } else {
      objectWriteUInt16(this, value, offset, false);
    }
    return offset + 2
  };

  function objectWriteUInt32 (buf, value, offset, littleEndian) {
    if (value < 0) value = 0xffffffff + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
      buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
    }
  }

  Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset + 3] = (value >>> 24);
      this[offset + 2] = (value >>> 16);
      this[offset + 1] = (value >>> 8);
      this[offset] = (value & 0xff);
    } else {
      objectWriteUInt32(this, value, offset, true);
    }
    return offset + 4
  };

  Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 24);
      this[offset + 1] = (value >>> 16);
      this[offset + 2] = (value >>> 8);
      this[offset + 3] = (value & 0xff);
    } else {
      objectWriteUInt32(this, value, offset, false);
    }
    return offset + 4
  };

  Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);

      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }

    var i = 0;
    var mul = 1;
    var sub = 0;
    this[offset] = value & 0xFF;
    while (++i < byteLength && (mul *= 0x100)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);

      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }

    var i = byteLength - 1;
    var mul = 1;
    var sub = 0;
    this[offset + i] = value & 0xFF;
    while (--i >= 0 && (mul *= 0x100)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
    if (value < 0) value = 0xff + value + 1;
    this[offset] = (value & 0xff);
    return offset + 1
  };

  Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value & 0xff);
      this[offset + 1] = (value >>> 8);
    } else {
      objectWriteUInt16(this, value, offset, true);
    }
    return offset + 2
  };

  Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 8);
      this[offset + 1] = (value & 0xff);
    } else {
      objectWriteUInt16(this, value, offset, false);
    }
    return offset + 2
  };

  Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value & 0xff);
      this[offset + 1] = (value >>> 8);
      this[offset + 2] = (value >>> 16);
      this[offset + 3] = (value >>> 24);
    } else {
      objectWriteUInt32(this, value, offset, true);
    }
    return offset + 4
  };

  Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (value < 0) value = 0xffffffff + value + 1;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 24);
      this[offset + 1] = (value >>> 16);
      this[offset + 2] = (value >>> 8);
      this[offset + 3] = (value & 0xff);
    } else {
      objectWriteUInt32(this, value, offset, false);
    }
    return offset + 4
  };

  function checkIEEE754 (buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError('Index out of range')
    if (offset < 0) throw new RangeError('Index out of range')
  }

  function writeFloat (buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4);
    }
    write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4
  }

  Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert)
  };

  Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert)
  };

  function writeDouble (buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8);
    }
    write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8
  }

  Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert)
  };

  Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert)
  };

  // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
  Buffer.prototype.copy = function copy (target, targetStart, start, end) {
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;

    // Copy 0 bytes; we're done
    if (end === start) return 0
    if (target.length === 0 || this.length === 0) return 0

    // Fatal error conditions
    if (targetStart < 0) {
      throw new RangeError('targetStart out of bounds')
    }
    if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
    if (end < 0) throw new RangeError('sourceEnd out of bounds')

    // Are we oob?
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }

    var len = end - start;
    var i;

    if (this === target && start < targetStart && targetStart < end) {
      // descending copy from end
      for (i = len - 1; i >= 0; --i) {
        target[i + targetStart] = this[i + start];
      }
    } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
      // ascending copy from start
      for (i = 0; i < len; ++i) {
        target[i + targetStart] = this[i + start];
      }
    } else {
      Uint8Array.prototype.set.call(
        target,
        this.subarray(start, start + len),
        targetStart
      );
    }

    return len
  };

  // Usage:
  //    buffer.fill(number[, offset[, end]])
  //    buffer.fill(buffer[, offset[, end]])
  //    buffer.fill(string[, offset[, end]][, encoding])
  Buffer.prototype.fill = function fill (val, start, end, encoding) {
    // Handle string cases:
    if (typeof val === 'string') {
      if (typeof start === 'string') {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === 'string') {
        encoding = end;
        end = this.length;
      }
      if (val.length === 1) {
        var code = val.charCodeAt(0);
        if (code < 256) {
          val = code;
        }
      }
      if (encoding !== undefined && typeof encoding !== 'string') {
        throw new TypeError('encoding must be a string')
      }
      if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
        throw new TypeError('Unknown encoding: ' + encoding)
      }
    } else if (typeof val === 'number') {
      val = val & 255;
    }

    // Invalid ranges are not set to a default, so can range check early.
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError('Out of range index')
    }

    if (end <= start) {
      return this
    }

    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;

    if (!val) val = 0;

    var i;
    if (typeof val === 'number') {
      for (i = start; i < end; ++i) {
        this[i] = val;
      }
    } else {
      var bytes = internalIsBuffer(val)
        ? val
        : utf8ToBytes(new Buffer(val, encoding).toString());
      var len = bytes.length;
      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len];
      }
    }

    return this
  };

  // HELPER FUNCTIONS
  // ================

  var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

  function base64clean (str) {
    // Node strips out invalid characters like \n and \t from the string, base64-js does not
    str = stringtrim(str).replace(INVALID_BASE64_RE, '');
    // Node converts strings with length < 2 to ''
    if (str.length < 2) return ''
    // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
    while (str.length % 4 !== 0) {
      str = str + '=';
    }
    return str
  }

  function stringtrim (str) {
    if (str.trim) return str.trim()
    return str.replace(/^\s+|\s+$/g, '')
  }

  function toHex (n) {
    if (n < 16) return '0' + n.toString(16)
    return n.toString(16)
  }

  function utf8ToBytes (string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];

    for (var i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);

      // is surrogate component
      if (codePoint > 0xD7FF && codePoint < 0xE000) {
        // last char was a lead
        if (!leadSurrogate) {
          // no lead yet
          if (codePoint > 0xDBFF) {
            // unexpected trail
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            continue
          } else if (i + 1 === length) {
            // unpaired lead
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            continue
          }

          // valid lead
          leadSurrogate = codePoint;

          continue
        }

        // 2 leads in a row
        if (codePoint < 0xDC00) {
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          leadSurrogate = codePoint;
          continue
        }

        // valid surrogate pair
        codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
      } else if (leadSurrogate) {
        // valid bmp char, but last char was a lead
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
      }

      leadSurrogate = null;

      // encode utf8
      if (codePoint < 0x80) {
        if ((units -= 1) < 0) break
        bytes.push(codePoint);
      } else if (codePoint < 0x800) {
        if ((units -= 2) < 0) break
        bytes.push(
          codePoint >> 0x6 | 0xC0,
          codePoint & 0x3F | 0x80
        );
      } else if (codePoint < 0x10000) {
        if ((units -= 3) < 0) break
        bytes.push(
          codePoint >> 0xC | 0xE0,
          codePoint >> 0x6 & 0x3F | 0x80,
          codePoint & 0x3F | 0x80
        );
      } else if (codePoint < 0x110000) {
        if ((units -= 4) < 0) break
        bytes.push(
          codePoint >> 0x12 | 0xF0,
          codePoint >> 0xC & 0x3F | 0x80,
          codePoint >> 0x6 & 0x3F | 0x80,
          codePoint & 0x3F | 0x80
        );
      } else {
        throw new Error('Invalid code point')
      }
    }

    return bytes
  }

  function asciiToBytes (str) {
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      // Node's code seems to be doing this and not & 0x7F..
      byteArray.push(str.charCodeAt(i) & 0xFF);
    }
    return byteArray
  }

  function utf16leToBytes (str, units) {
    var c, hi, lo;
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0) break

      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }

    return byteArray
  }


  function base64ToBytes (str) {
    return toByteArray(base64clean(str))
  }

  function blitBuffer (src, dst, offset, length) {
    for (var i = 0; i < length; ++i) {
      if ((i + offset >= dst.length) || (i >= src.length)) break
      dst[i + offset] = src[i];
    }
    return i
  }

  function isnan (val) {
    return val !== val // eslint-disable-line no-self-compare
  }


  // the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
  // The _isBuffer check is for Safari 5-7 support, because it's missing
  // Object.prototype.constructor. Remove this eventually
  function isBuffer(obj) {
    return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
  }

  function isFastBuffer (obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
  }

  // For Node v0.10 support. Remove this eventually.
  function isSlowBuffer (obj) {
    return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
  }

  function isNull(arg) {
    return arg === null;
  }

  function isNullOrUndefined(arg) {
    return arg == null;
  }

  function isString(arg) {
    return typeof arg === 'string';
  }

  function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
  }

  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.


  // If obj.hasOwnProperty has been overridden, then calling
  // obj.hasOwnProperty(prop) will break.
  // See: https://github.com/joyent/node/issues/1707
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
  };
  function stringifyPrimitive(v) {
    switch (typeof v) {
      case 'string':
        return v;

      case 'boolean':
        return v ? 'true' : 'false';

      case 'number':
        return isFinite(v) ? v : '';

      default:
        return '';
    }
  }

  function stringify$5 (obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';
    if (obj === null) {
      obj = undefined;
    }

    if (typeof obj === 'object') {
      return map(objectKeys(obj), function(k) {
        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
        if (isArray(obj[k])) {
          return map(obj[k], function(v) {
            return ks + encodeURIComponent(stringifyPrimitive(v));
          }).join(sep);
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
        }
      }).join(sep);

    }

    if (!name) return '';
    return encodeURIComponent(stringifyPrimitive(name)) + eq +
           encodeURIComponent(stringifyPrimitive(obj));
  }
  function map (xs, f) {
    if (xs.map) return xs.map(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
      res.push(f(xs[i], i));
    }
    return res;
  }

  var objectKeys = Object.keys || function (obj) {
    var res = [];
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
    }
    return res;
  };

  function parse$a(qs, sep, eq, options) {
    sep = sep || '&';
    eq = eq || '=';
    var obj = {};

    if (typeof qs !== 'string' || qs.length === 0) {
      return obj;
    }

    var regexp = /\+/g;
    qs = qs.split(sep);

    var maxKeys = 1000;
    if (options && typeof options.maxKeys === 'number') {
      maxKeys = options.maxKeys;
    }

    var len = qs.length;
    // maxKeys <= 0 means that we should not limit keys count
    if (maxKeys > 0 && len > maxKeys) {
      len = maxKeys;
    }

    for (var i = 0; i < len; ++i) {
      var x = qs[i].replace(regexp, '%20'),
          idx = x.indexOf(eq),
          kstr, vstr, k, v;

      if (idx >= 0) {
        kstr = x.substr(0, idx);
        vstr = x.substr(idx + 1);
      } else {
        kstr = x;
        vstr = '';
      }

      k = decodeURIComponent(kstr);
      v = decodeURIComponent(vstr);

      if (!hasOwnProperty(obj, k)) {
        obj[k] = v;
      } else if (isArray(obj[k])) {
        obj[k].push(v);
      } else {
        obj[k] = [obj[k], v];
      }
    }

    return obj;
  }

  var url$1 = {
    parse: urlParse,
    resolve: urlResolve,
    resolveObject: urlResolveObject,
    format: urlFormat,
    Url: Url
  };
  function Url() {
    this.protocol = null;
    this.slashes = null;
    this.auth = null;
    this.host = null;
    this.port = null;
    this.hostname = null;
    this.hash = null;
    this.search = null;
    this.query = null;
    this.pathname = null;
    this.path = null;
    this.href = null;
  }

  // Reference: RFC 3986, RFC 1808, RFC 2396

  // define these here so at least they only have to be
  // compiled once on the first module load.
  var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    };

  function urlParse(url, parseQueryString, slashesDenoteHost) {
    if (url && isObject(url) && url instanceof Url) return url;

    var u = new Url;
    u.parse(url, parseQueryString, slashesDenoteHost);
    return u;
  }
  Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
    return parse$9(this, url, parseQueryString, slashesDenoteHost);
  };

  function parse$9(self, url, parseQueryString, slashesDenoteHost) {
    if (!isString(url)) {
      throw new TypeError('Parameter \'url\' must be a string, not ' + typeof url);
    }

    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    var queryIndex = url.indexOf('?'),
      splitter =
      (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
    uSplit[0] = uSplit[0].replace(slashRegex, '/');
    url = uSplit.join(splitter);

    var rest = url;

    // trim before proceeding.
    // This is to support parse stuff like "  http://foo.com  \n"
    rest = rest.trim();

    if (!slashesDenoteHost && url.split('#').length === 1) {
      // Try fast path regexp
      var simplePath = simplePathPattern.exec(rest);
      if (simplePath) {
        self.path = rest;
        self.href = rest;
        self.pathname = simplePath[1];
        if (simplePath[2]) {
          self.search = simplePath[2];
          if (parseQueryString) {
            self.query = parse$a(self.search.substr(1));
          } else {
            self.query = self.search.substr(1);
          }
        } else if (parseQueryString) {
          self.search = '';
          self.query = {};
        }
        return self;
      }
    }

    var proto = protocolPattern.exec(rest);
    if (proto) {
      proto = proto[0];
      var lowerProto = proto.toLowerCase();
      self.protocol = lowerProto;
      rest = rest.substr(proto.length);
    }

    // figure out if it's got a host
    // user@server is *always* interpreted as a hostname, and url
    // resolution will treat //foo/bar as host=foo,path=bar because that's
    // how the browser resolves relative URLs.
    if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var slashes = rest.substr(0, 2) === '//';
      if (slashes && !(proto && hostlessProtocol[proto])) {
        rest = rest.substr(2);
        self.slashes = true;
      }
    }
    var i, hec, l, p;
    if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

      // there's a hostname.
      // the first instance of /, ?, ;, or # ends the host.
      //
      // If there is an @ in the hostname, then non-host chars *are* allowed
      // to the left of the last @ sign, unless some host-ending character
      // comes *before* the @-sign.
      // URLs are obnoxious.
      //
      // ex:
      // http://a@b@c/ => user:a@b host:c
      // http://a@b?@c => user:a host:c path:/?@c

      // v0.12 TODO(isaacs): This is not quite how Chrome does things.
      // Review our test case against browsers more comprehensively.

      // find the first instance of any hostEndingChars
      var hostEnd = -1;
      for (i = 0; i < hostEndingChars.length; i++) {
        hec = rest.indexOf(hostEndingChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
          hostEnd = hec;
      }

      // at this point, either we have an explicit point where the
      // auth portion cannot go past, or the last @ char is the decider.
      var auth, atSign;
      if (hostEnd === -1) {
        // atSign can be anywhere.
        atSign = rest.lastIndexOf('@');
      } else {
        // atSign must be in auth portion.
        // http://a@b/c@d => host:b auth:a path:/c@d
        atSign = rest.lastIndexOf('@', hostEnd);
      }

      // Now we have a portion which is definitely the auth.
      // Pull that off.
      if (atSign !== -1) {
        auth = rest.slice(0, atSign);
        rest = rest.slice(atSign + 1);
        self.auth = decodeURIComponent(auth);
      }

      // the host is the remaining to the left of the first non-host char
      hostEnd = -1;
      for (i = 0; i < nonHostChars.length; i++) {
        hec = rest.indexOf(nonHostChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
          hostEnd = hec;
      }
      // if we still have not hit it, then the entire thing is a host.
      if (hostEnd === -1)
        hostEnd = rest.length;

      self.host = rest.slice(0, hostEnd);
      rest = rest.slice(hostEnd);

      // pull out port.
      parseHost(self);

      // we've indicated that there is a hostname,
      // so even if it's empty, it has to be present.
      self.hostname = self.hostname || '';

      // if hostname begins with [ and ends with ]
      // assume that it's an IPv6 address.
      var ipv6Hostname = self.hostname[0] === '[' &&
        self.hostname[self.hostname.length - 1] === ']';

      // validate a little.
      if (!ipv6Hostname) {
        var hostparts = self.hostname.split(/\./);
        for (i = 0, l = hostparts.length; i < l; i++) {
          var part = hostparts[i];
          if (!part) continue;
          if (!part.match(hostnamePartPattern)) {
            var newpart = '';
            for (var j = 0, k = part.length; j < k; j++) {
              if (part.charCodeAt(j) > 127) {
                // we replace non-ASCII char with a temporary placeholder
                // we need this to make sure size of hostname is not
                // broken by replacing non-ASCII by nothing
                newpart += 'x';
              } else {
                newpart += part[j];
              }
            }
            // we test again with ASCII char only
            if (!newpart.match(hostnamePartPattern)) {
              var validParts = hostparts.slice(0, i);
              var notHost = hostparts.slice(i + 1);
              var bit = part.match(hostnamePartStart);
              if (bit) {
                validParts.push(bit[1]);
                notHost.unshift(bit[2]);
              }
              if (notHost.length) {
                rest = '/' + notHost.join('.') + rest;
              }
              self.hostname = validParts.join('.');
              break;
            }
          }
        }
      }

      if (self.hostname.length > hostnameMaxLen) {
        self.hostname = '';
      } else {
        // hostnames are always lower case.
        self.hostname = self.hostname.toLowerCase();
      }

      if (!ipv6Hostname) {
        // IDNA Support: Returns a punycoded representation of "domain".
        // It only converts parts of the domain name that
        // have non-ASCII characters, i.e. it doesn't matter if
        // you call it with a domain that already is ASCII-only.
        self.hostname = toASCII(self.hostname);
      }

      p = self.port ? ':' + self.port : '';
      var h = self.hostname || '';
      self.host = h + p;
      self.href += self.host;

      // strip [ and ] from the hostname
      // the host field still retains them, though
      if (ipv6Hostname) {
        self.hostname = self.hostname.substr(1, self.hostname.length - 2);
        if (rest[0] !== '/') {
          rest = '/' + rest;
        }
      }
    }

    // now rest is set to the post-host stuff.
    // chop off any delim chars.
    if (!unsafeProtocol[lowerProto]) {

      // First, make 100% sure that any "autoEscape" chars get
      // escaped, even if encodeURIComponent doesn't think they
      // need to be.
      for (i = 0, l = autoEscape.length; i < l; i++) {
        var ae = autoEscape[i];
        if (rest.indexOf(ae) === -1)
          continue;
        var esc = encodeURIComponent(ae);
        if (esc === ae) {
          esc = escape(ae);
        }
        rest = rest.split(ae).join(esc);
      }
    }


    // chop off from the tail first.
    var hash = rest.indexOf('#');
    if (hash !== -1) {
      // got a fragment string.
      self.hash = rest.substr(hash);
      rest = rest.slice(0, hash);
    }
    var qm = rest.indexOf('?');
    if (qm !== -1) {
      self.search = rest.substr(qm);
      self.query = rest.substr(qm + 1);
      if (parseQueryString) {
        self.query = parse$a(self.query);
      }
      rest = rest.slice(0, qm);
    } else if (parseQueryString) {
      // no query string, but parseQueryString still requested
      self.search = '';
      self.query = {};
    }
    if (rest) self.pathname = rest;
    if (slashedProtocol[lowerProto] &&
      self.hostname && !self.pathname) {
      self.pathname = '/';
    }

    //to support http.request
    if (self.pathname || self.search) {
      p = self.pathname || '';
      var s = self.search || '';
      self.path = p + s;
    }

    // finally, reconstruct the href based on what has been validated.
    self.href = format(self);
    return self;
  }

  // format a parsed object into a url string
  function urlFormat(obj) {
    // ensure it's an object, and not a string url.
    // If it's an obj, this is a no-op.
    // this way, you can call url_format() on strings
    // to clean up potentially wonky urls.
    if (isString(obj)) obj = parse$9({}, obj);
    return format(obj);
  }

  function format(self) {
    var auth = self.auth || '';
    if (auth) {
      auth = encodeURIComponent(auth);
      auth = auth.replace(/%3A/i, ':');
      auth += '@';
    }

    var protocol = self.protocol || '',
      pathname = self.pathname || '',
      hash = self.hash || '',
      host = false,
      query = '';

    if (self.host) {
      host = auth + self.host;
    } else if (self.hostname) {
      host = auth + (self.hostname.indexOf(':') === -1 ?
        self.hostname :
        '[' + this.hostname + ']');
      if (self.port) {
        host += ':' + self.port;
      }
    }

    if (self.query &&
      isObject(self.query) &&
      Object.keys(self.query).length) {
      query = stringify$5(self.query);
    }

    var search = self.search || (query && ('?' + query)) || '';

    if (protocol && protocol.substr(-1) !== ':') protocol += ':';

    // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
    // unless they had them to begin with.
    if (self.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
      host = '//' + (host || '');
      if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
    } else if (!host) {
      host = '';
    }

    if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
    if (search && search.charAt(0) !== '?') search = '?' + search;

    pathname = pathname.replace(/[?#]/g, function(match) {
      return encodeURIComponent(match);
    });
    search = search.replace('#', '%23');

    return protocol + host + pathname + search + hash;
  }

  Url.prototype.format = function() {
    return format(this);
  };

  function urlResolve(source, relative) {
    return urlParse(source, false, true).resolve(relative);
  }

  Url.prototype.resolve = function(relative) {
    return this.resolveObject(urlParse(relative, false, true)).format();
  };

  function urlResolveObject(source, relative) {
    if (!source) return relative;
    return urlParse(source, false, true).resolveObject(relative);
  }

  Url.prototype.resolveObject = function(relative) {
    if (isString(relative)) {
      var rel = new Url();
      rel.parse(relative, false, true);
      relative = rel;
    }

    var result = new Url();
    var tkeys = Object.keys(this);
    for (var tk = 0; tk < tkeys.length; tk++) {
      var tkey = tkeys[tk];
      result[tkey] = this[tkey];
    }

    // hash is always overridden, no matter what.
    // even href="" will remove it.
    result.hash = relative.hash;

    // if the relative url is empty, then there's nothing left to do here.
    if (relative.href === '') {
      result.href = result.format();
      return result;
    }

    // hrefs like //foo/bar always cut to the protocol.
    if (relative.slashes && !relative.protocol) {
      // take everything except the protocol from relative
      var rkeys = Object.keys(relative);
      for (var rk = 0; rk < rkeys.length; rk++) {
        var rkey = rkeys[rk];
        if (rkey !== 'protocol')
          result[rkey] = relative[rkey];
      }

      //urlParse appends trailing / to urls like http://www.example.com
      if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
        result.path = result.pathname = '/';
      }

      result.href = result.format();
      return result;
    }
    var relPath;
    if (relative.protocol && relative.protocol !== result.protocol) {
      // if it's a known url protocol, then changing
      // the protocol does weird things
      // first, if it's not file:, then we MUST have a host,
      // and if there was a path
      // to begin with, then we MUST have a path.
      // if it is file:, then the host is dropped,
      // because that's known to be hostless.
      // anything else is assumed to be absolute.
      if (!slashedProtocol[relative.protocol]) {
        var keys = Object.keys(relative);
        for (var v = 0; v < keys.length; v++) {
          var k = keys[v];
          result[k] = relative[k];
        }
        result.href = result.format();
        return result;
      }

      result.protocol = relative.protocol;
      if (!relative.host && !hostlessProtocol[relative.protocol]) {
        relPath = (relative.pathname || '').split('/');
        while (relPath.length && !(relative.host = relPath.shift()));
        if (!relative.host) relative.host = '';
        if (!relative.hostname) relative.hostname = '';
        if (relPath[0] !== '') relPath.unshift('');
        if (relPath.length < 2) relPath.unshift('');
        result.pathname = relPath.join('/');
      } else {
        result.pathname = relative.pathname;
      }
      result.search = relative.search;
      result.query = relative.query;
      result.host = relative.host || '';
      result.auth = relative.auth;
      result.hostname = relative.hostname || relative.host;
      result.port = relative.port;
      // to support http.request
      if (result.pathname || result.search) {
        var p = result.pathname || '';
        var s = result.search || '';
        result.path = p + s;
      }
      result.slashes = result.slashes || relative.slashes;
      result.href = result.format();
      return result;
    }

    var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
        relative.host ||
        relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
        (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];
    relPath = relative.pathname && relative.pathname.split('/') || [];
    // if the url is a non-slashed url, then relative
    // links like ../.. should be able
    // to crawl up to the hostname, as well.  This is strange.
    // result.protocol has already been set by now.
    // Later on, put the first path part into the host field.
    if (psychotic) {
      result.hostname = '';
      result.port = null;
      if (result.host) {
        if (srcPath[0] === '') srcPath[0] = result.host;
        else srcPath.unshift(result.host);
      }
      result.host = '';
      if (relative.protocol) {
        relative.hostname = null;
        relative.port = null;
        if (relative.host) {
          if (relPath[0] === '') relPath[0] = relative.host;
          else relPath.unshift(relative.host);
        }
        relative.host = null;
      }
      mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
    }
    var authInHost;
    if (isRelAbs) {
      // it's absolute.
      result.host = (relative.host || relative.host === '') ?
        relative.host : result.host;
      result.hostname = (relative.hostname || relative.hostname === '') ?
        relative.hostname : result.hostname;
      result.search = relative.search;
      result.query = relative.query;
      srcPath = relPath;
      // fall through to the dot-handling below.
    } else if (relPath.length) {
      // it's relative
      // throw away the existing file, and take the new path instead.
      if (!srcPath) srcPath = [];
      srcPath.pop();
      srcPath = srcPath.concat(relPath);
      result.search = relative.search;
      result.query = relative.query;
    } else if (!isNullOrUndefined(relative.search)) {
      // just pull out the search.
      // like href='?foo'.
      // Put this after the other two cases because it simplifies the booleans
      if (psychotic) {
        result.hostname = result.host = srcPath.shift();
        //occationaly the auth can get stuck only in host
        //this especially happens in cases like
        //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
        authInHost = result.host && result.host.indexOf('@') > 0 ?
          result.host.split('@') : false;
        if (authInHost) {
          result.auth = authInHost.shift();
          result.host = result.hostname = authInHost.shift();
        }
      }
      result.search = relative.search;
      result.query = relative.query;
      //to support http.request
      if (!isNull(result.pathname) || !isNull(result.search)) {
        result.path = (result.pathname ? result.pathname : '') +
          (result.search ? result.search : '');
      }
      result.href = result.format();
      return result;
    }

    if (!srcPath.length) {
      // no path at all.  easy.
      // we've already handled the other stuff above.
      result.pathname = null;
      //to support http.request
      if (result.search) {
        result.path = '/' + result.search;
      } else {
        result.path = null;
      }
      result.href = result.format();
      return result;
    }

    // if a url ENDs in . or .., then it must get a trailing slash.
    // however, if it ends in anything else non-slashy,
    // then it must NOT get a trailing slash.
    var last = srcPath.slice(-1)[0];
    var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

    // strip single dots, resolve double dots to parent dir
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = srcPath.length; i >= 0; i--) {
      last = srcPath[i];
      if (last === '.') {
        srcPath.splice(i, 1);
      } else if (last === '..') {
        srcPath.splice(i, 1);
        up++;
      } else if (up) {
        srcPath.splice(i, 1);
        up--;
      }
    }

    // if the path is allowed to go above the root, restore leading ..s
    if (!mustEndAbs && !removeAllDots) {
      for (; up--; up) {
        srcPath.unshift('..');
      }
    }

    if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
      srcPath.unshift('');
    }

    if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
      srcPath.push('');
    }

    var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

    // put the host back
    if (psychotic) {
      result.hostname = result.host = isAbsolute ? '' :
        srcPath.length ? srcPath.shift() : '';
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      authInHost = result.host && result.host.indexOf('@') > 0 ?
        result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }

    mustEndAbs = mustEndAbs || (result.host && srcPath.length);

    if (mustEndAbs && !isAbsolute) {
      srcPath.unshift('');
    }

    if (!srcPath.length) {
      result.pathname = null;
      result.path = null;
    } else {
      result.pathname = srcPath.join('/');
    }

    //to support request.http
    if (!isNull(result.pathname) || !isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
        (result.search ? result.search : '');
    }
    result.auth = relative.auth || result.auth;
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  };

  Url.prototype.parseHost = function() {
    return parseHost(this);
  };

  function parseHost(self) {
    var host = self.host;
    var port = portPattern.exec(host);
    if (port) {
      port = port[0];
      if (port !== ':') {
        self.port = port.substr(1);
      }
      host = host.substr(0, host.length - port.length);
    }
    if (host) self.hostname = host;
  }

  var url$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Url: Url,
    default: url$1,
    format: urlFormat,
    parse: urlParse,
    resolve: urlResolve,
    resolveObject: urlResolveObject
  });

  var require$$0$2 = /*@__PURE__*/getAugmentedNamespace(url$2);

  var url = Object.assign(
    {},
    require$$0$2,
    {
      pathToFileURL: (path)=> { return `file:///${encodeURIComponent(path)}` },
      fileURLToPath: (fileURL)=> { return decodeURIComponent(fileURL.toString().replace(/^file:\/\/\//, '')) }
    }
  );

  var empty = {};

  var empty$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: empty
  });

  var require$$0$1 = /*@__PURE__*/getAugmentedNamespace(empty$1);

  let { existsSync, readFileSync } = require$$0$1;
  let { dirname: dirname$1, join } = require$$4;
  let { SourceMapConsumer: SourceMapConsumer$2, SourceMapGenerator: SourceMapGenerator$2 } = sourceMap;

  function fromBase64(str) {
    if (Buffer) {
      return Buffer.from(str, 'base64').toString()
    } else {
      /* c8 ignore next 2 */
      return window.atob(str)
    }
  }

  let PreviousMap$2 = class PreviousMap {
    constructor(css, opts) {
      if (opts.map === false) return
      this.loadAnnotation(css);
      this.inline = this.startWith(this.annotation, 'data:');

      let prev = opts.map ? opts.map.prev : undefined;
      let text = this.loadMap(opts.from, prev);
      if (!this.mapFile && opts.from) {
        this.mapFile = opts.from;
      }
      if (this.mapFile) this.root = dirname$1(this.mapFile);
      if (text) this.text = text;
    }

    consumer() {
      if (!this.consumerCache) {
        this.consumerCache = new SourceMapConsumer$2(this.text);
      }
      return this.consumerCache
    }

    decodeInline(text) {
      let baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/;
      let baseUri = /^data:application\/json;base64,/;
      let charsetUri = /^data:application\/json;charset=utf-?8,/;
      let uri = /^data:application\/json,/;

      let uriMatch = text.match(charsetUri) || text.match(uri);
      if (uriMatch) {
        return decodeURIComponent(text.substr(uriMatch[0].length))
      }

      let baseUriMatch = text.match(baseCharsetUri) || text.match(baseUri);
      if (baseUriMatch) {
        return fromBase64(text.substr(baseUriMatch[0].length))
      }

      let encoding = text.match(/data:application\/json;([^,]+),/)[1];
      throw new Error('Unsupported source map encoding ' + encoding)
    }

    getAnnotationURL(sourceMapString) {
      return sourceMapString.replace(/^\/\*\s*# sourceMappingURL=/, '').trim()
    }

    isMap(map) {
      if (typeof map !== 'object') return false
      return (
        typeof map.mappings === 'string' ||
        typeof map._mappings === 'string' ||
        Array.isArray(map.sections)
      )
    }

    loadAnnotation(css) {
      let comments = css.match(/\/\*\s*# sourceMappingURL=/g);
      if (!comments) return

      // sourceMappingURLs from comments, strings, etc.
      let start = css.lastIndexOf(comments.pop());
      let end = css.indexOf('*/', start);

      if (start > -1 && end > -1) {
        // Locate the last sourceMappingURL to avoid pickin
        this.annotation = this.getAnnotationURL(css.substring(start, end));
      }
    }

    loadFile(path) {
      this.root = dirname$1(path);
      if (void(path)) {
        this.mapFile = path;
        return readFileSync(path, 'utf-8').toString().trim()
      }
    }

    loadMap(file, prev) {
      if (prev === false) return false

      if (prev) {
        if (typeof prev === 'string') {
          return prev
        } else if (typeof prev === 'function') {
          let prevPath = prev(file);
          if (prevPath) {
            let map = this.loadFile(prevPath);
            if (!map) {
              throw new Error(
                'Unable to load previous source map: ' + prevPath.toString()
              )
            }
            return map
          }
        } else if (prev instanceof SourceMapConsumer$2) {
          return SourceMapGenerator$2.fromSourceMap(prev).toString()
        } else if (prev instanceof SourceMapGenerator$2) {
          return prev.toString()
        } else if (this.isMap(prev)) {
          return JSON.stringify(prev)
        } else {
          throw new Error(
            'Unsupported previous source map format: ' + prev.toString()
          )
        }
      } else if (this.inline) {
        return this.decodeInline(this.annotation)
      } else if (this.annotation) {
        let map = this.annotation;
        if (file) map = join(dirname$1(file), map);
        return this.loadFile(map)
      }
    }

    startWith(string, start) {
      if (!string) return false
      return string.substr(0, start.length) === start
    }

    withContent() {
      return !!(
        this.consumer().sourcesContent &&
        this.consumer().sourcesContent.length > 0
      )
    }
  };

  var previousMap = PreviousMap$2;
  PreviousMap$2.default = PreviousMap$2;

  let { nanoid } = nonSecure;
  let { isAbsolute, resolve: resolve$2 } = require$$4;
  let { SourceMapConsumer: SourceMapConsumer$1, SourceMapGenerator: SourceMapGenerator$1 } = sourceMap;
  let { fileURLToPath, pathToFileURL: pathToFileURL$1 } = url;

  let CssSyntaxError$1 = cssSyntaxError;
  let PreviousMap$1 = previousMap;
  let terminalHighlight = require$$6;

  let fromOffsetCache = Symbol('fromOffsetCache');

  let sourceMapAvailable$1 = Boolean(SourceMapConsumer$1 && SourceMapGenerator$1);
  let pathAvailable$1 = Boolean(resolve$2 && isAbsolute);

  let Input$4 = class Input {
    get from() {
      return this.file || this.id
    }

    constructor(css, opts = {}) {
      if (
        css === null ||
        typeof css === 'undefined' ||
        (typeof css === 'object' && !css.toString)
      ) {
        throw new Error(`PostCSS received ${css} instead of CSS string`)
      }

      this.css = css.toString();

      if (this.css[0] === '\uFEFF' || this.css[0] === '\uFFFE') {
        this.hasBOM = true;
        this.css = this.css.slice(1);
      } else {
        this.hasBOM = false;
      }

      this.document = this.css;
      if (opts.document) this.document = opts.document.toString();

      if (opts.from) {
        if (
          !pathAvailable$1 ||
          /^\w+:\/\//.test(opts.from) ||
          isAbsolute(opts.from)
        ) {
          this.file = opts.from;
        } else {
          this.file = resolve$2(opts.from);
        }
      }

      if (pathAvailable$1 && sourceMapAvailable$1) {
        let map = new PreviousMap$1(this.css, opts);
        if (map.text) {
          this.map = map;
          let file = map.consumer().file;
          if (!this.file && file) this.file = this.mapResolve(file);
        }
      }

      if (!this.file) {
        this.id = '<input css ' + nanoid(6) + '>';
      }
      if (this.map) this.map.file = this.from;
    }

    error(message, line, column, opts = {}) {
      let endColumn, endLine, result;

      if (line && typeof line === 'object') {
        let start = line;
        let end = column;
        if (typeof start.offset === 'number') {
          let pos = this.fromOffset(start.offset);
          line = pos.line;
          column = pos.col;
        } else {
          line = start.line;
          column = start.column;
        }
        if (typeof end.offset === 'number') {
          let pos = this.fromOffset(end.offset);
          endLine = pos.line;
          endColumn = pos.col;
        } else {
          endLine = end.line;
          endColumn = end.column;
        }
      } else if (!column) {
        let pos = this.fromOffset(line);
        line = pos.line;
        column = pos.col;
      }

      let origin = this.origin(line, column, endLine, endColumn);
      if (origin) {
        result = new CssSyntaxError$1(
          message,
          origin.endLine === undefined
            ? origin.line
            : { column: origin.column, line: origin.line },
          origin.endLine === undefined
            ? origin.column
            : { column: origin.endColumn, line: origin.endLine },
          origin.source,
          origin.file,
          opts.plugin
        );
      } else {
        result = new CssSyntaxError$1(
          message,
          endLine === undefined ? line : { column, line },
          endLine === undefined ? column : { column: endColumn, line: endLine },
          this.css,
          this.file,
          opts.plugin
        );
      }

      result.input = { column, endColumn, endLine, line, source: this.css };
      if (this.file) {
        if (pathToFileURL$1) {
          result.input.url = pathToFileURL$1(this.file).toString();
        }
        result.input.file = this.file;
      }

      return result
    }

    fromOffset(offset) {
      let lastLine, lineToIndex;
      if (!this[fromOffsetCache]) {
        let lines = this.css.split('\n');
        lineToIndex = new Array(lines.length);
        let prevIndex = 0;

        for (let i = 0, l = lines.length; i < l; i++) {
          lineToIndex[i] = prevIndex;
          prevIndex += lines[i].length + 1;
        }

        this[fromOffsetCache] = lineToIndex;
      } else {
        lineToIndex = this[fromOffsetCache];
      }
      lastLine = lineToIndex[lineToIndex.length - 1];

      let min = 0;
      if (offset >= lastLine) {
        min = lineToIndex.length - 1;
      } else {
        let max = lineToIndex.length - 2;
        let mid;
        while (min < max) {
          mid = min + ((max - min) >> 1);
          if (offset < lineToIndex[mid]) {
            max = mid - 1;
          } else if (offset >= lineToIndex[mid + 1]) {
            min = mid + 1;
          } else {
            min = mid;
            break
          }
        }
      }
      return {
        col: offset - lineToIndex[min] + 1,
        line: min + 1
      }
    }

    mapResolve(file) {
      if (/^\w+:\/\//.test(file)) {
        return file
      }
      return resolve$2(this.map.consumer().sourceRoot || this.map.root || '.', file)
    }

    origin(line, column, endLine, endColumn) {
      if (!this.map) return false
      let consumer = this.map.consumer();

      let from = consumer.originalPositionFor({ column, line });
      if (!from.source) return false

      let to;
      if (typeof endLine === 'number') {
        to = consumer.originalPositionFor({ column: endColumn, line: endLine });
      }

      let fromUrl;

      if (isAbsolute(from.source)) {
        fromUrl = pathToFileURL$1(from.source);
      } else {
        fromUrl = new URL(
          from.source,
          this.map.consumer().sourceRoot || pathToFileURL$1(this.map.mapFile)
        );
      }

      let result = {
        column: from.column,
        endColumn: to && to.column,
        endLine: to && to.line,
        line: from.line,
        url: fromUrl.toString()
      };

      if (fromUrl.protocol === 'file:') {
        if (fileURLToPath) {
          result.file = fileURLToPath(fromUrl);
        } else {
          /* c8 ignore next 2 */
          throw new Error(`file: protocol is not available in this PostCSS build`)
        }
      }

      let source = consumer.sourceContentFor(from.source);
      if (source) result.source = source;

      return result
    }

    toJSON() {
      let json = {};
      for (let name of ['hasBOM', 'css', 'file', 'id']) {
        if (this[name] != null) {
          json[name] = this[name];
        }
      }
      if (this.map) {
        json.map = { ...this.map };
        if (json.map.consumerCache) {
          json.map.consumerCache = undefined;
        }
      }
      return json
    }
  };

  var input = Input$4;
  Input$4.default = Input$4;

  if (terminalHighlight && terminalHighlight.registerInput) {
    terminalHighlight.registerInput(Input$4);
  }

  let Container$4 = container;

  let LazyResult$3, Processor$5;

  let Root$5 = class Root extends Container$4 {
    constructor(defaults) {
      super(defaults);
      this.type = 'root';
      if (!this.nodes) this.nodes = [];
    }

    normalize(child, sample, type) {
      let nodes = super.normalize(child);

      if (sample) {
        if (type === 'prepend') {
          if (this.nodes.length > 1) {
            sample.raws.before = this.nodes[1].raws.before;
          } else {
            delete sample.raws.before;
          }
        } else if (this.first !== sample) {
          for (let node of nodes) {
            node.raws.before = sample.raws.before;
          }
        }
      }

      return nodes
    }

    removeChild(child, ignore) {
      let index = this.index(child);

      if (!ignore && index === 0 && this.nodes.length > 1) {
        this.nodes[1].raws.before = this.nodes[index].raws.before;
      }

      return super.removeChild(child)
    }

    toResult(opts = {}) {
      let lazy = new LazyResult$3(new Processor$5(), this, opts);
      return lazy.stringify()
    }
  };

  Root$5.registerLazyResult = dependant => {
    LazyResult$3 = dependant;
  };

  Root$5.registerProcessor = dependant => {
    Processor$5 = dependant;
  };

  var root = Root$5;
  Root$5.default = Root$5;

  Container$4.registerRoot(Root$5);

  let list$8 = {
    comma(string) {
      return list$8.split(string, [','], true)
    },

    space(string) {
      let spaces = [' ', '\n', '\t'];
      return list$8.split(string, spaces)
    },

    split(string, separators, last) {
      let array = [];
      let current = '';
      let split = false;

      let func = 0;
      let inQuote = false;
      let prevQuote = '';
      let escape = false;

      for (let letter of string) {
        if (escape) {
          escape = false;
        } else if (letter === '\\') {
          escape = true;
        } else if (inQuote) {
          if (letter === prevQuote) {
            inQuote = false;
          }
        } else if (letter === '"' || letter === "'") {
          inQuote = true;
          prevQuote = letter;
        } else if (letter === '(') {
          func += 1;
        } else if (letter === ')') {
          if (func > 0) func -= 1;
        } else if (func === 0) {
          if (separators.includes(letter)) split = true;
        }

        if (split) {
          if (current !== '') array.push(current.trim());
          current = '';
          split = false;
        } else {
          current += letter;
        }
      }

      if (last || current !== '') array.push(current.trim());
      return array
    }
  };

  var list_1 = list$8;
  list$8.default = list$8;

  let Container$3 = container;
  let list$7 = list_1;

  let Rule$3 = class Rule extends Container$3 {
    get selectors() {
      return list$7.comma(this.selector)
    }

    set selectors(values) {
      let match = this.selector ? this.selector.match(/,\s*/) : null;
      let sep = match ? match[0] : ',' + this.raw('between', 'beforeOpen');
      this.selector = values.join(sep);
    }

    constructor(defaults) {
      super(defaults);
      this.type = 'rule';
      if (!this.nodes) this.nodes = [];
    }
  };

  var rule = Rule$3;
  Rule$3.default = Rule$3;

  Container$3.registerRule(Rule$3);

  let AtRule$4 = atRule$1;
  let Comment$2 = comment;
  let Declaration$M = declaration$1;
  let Input$3 = input;
  let PreviousMap = previousMap;
  let Root$4 = root;
  let Rule$2 = rule;

  function fromJSON$1(json, inputs) {
    if (Array.isArray(json)) return json.map(n => fromJSON$1(n))

    let { inputs: ownInputs, ...defaults } = json;
    if (ownInputs) {
      inputs = [];
      for (let input of ownInputs) {
        let inputHydrated = { ...input, __proto__: Input$3.prototype };
        if (inputHydrated.map) {
          inputHydrated.map = {
            ...inputHydrated.map,
            __proto__: PreviousMap.prototype
          };
        }
        inputs.push(inputHydrated);
      }
    }
    if (defaults.nodes) {
      defaults.nodes = json.nodes.map(n => fromJSON$1(n, inputs));
    }
    if (defaults.source) {
      let { inputId, ...source } = defaults.source;
      defaults.source = source;
      if (inputId != null) {
        defaults.source.input = inputs[inputId];
      }
    }
    if (defaults.type === 'root') {
      return new Root$4(defaults)
    } else if (defaults.type === 'decl') {
      return new Declaration$M(defaults)
    } else if (defaults.type === 'rule') {
      return new Rule$2(defaults)
    } else if (defaults.type === 'comment') {
      return new Comment$2(defaults)
    } else if (defaults.type === 'atrule') {
      return new AtRule$4(defaults)
    } else {
      throw new Error('Unknown node type: ' + json.type)
    }
  }

  var fromJSON_1 = fromJSON$1;
  fromJSON$1.default = fromJSON$1;

  let { dirname, relative, resolve: resolve$1, sep } = require$$4;
  let { SourceMapConsumer, SourceMapGenerator } = sourceMap;
  let { pathToFileURL } = url;

  let Input$2 = input;

  let sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
  let pathAvailable = Boolean(dirname && resolve$1 && relative && sep);

  let MapGenerator$2 = class MapGenerator {
    constructor(stringify, root, opts, cssString) {
      this.stringify = stringify;
      this.mapOpts = opts.map || {};
      this.root = root;
      this.opts = opts;
      this.css = cssString;
      this.originalCSS = cssString;
      this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute;

      this.memoizedFileURLs = new Map();
      this.memoizedPaths = new Map();
      this.memoizedURLs = new Map();
    }

    addAnnotation() {
      let content;

      if (this.isInline()) {
        content =
          'data:application/json;base64,' + this.toBase64(this.map.toString());
      } else if (typeof this.mapOpts.annotation === 'string') {
        content = this.mapOpts.annotation;
      } else if (typeof this.mapOpts.annotation === 'function') {
        content = this.mapOpts.annotation(this.opts.to, this.root);
      } else {
        content = this.outputFile() + '.map';
      }
      let eol = '\n';
      if (this.css.includes('\r\n')) eol = '\r\n';

      this.css += eol + '/*# sourceMappingURL=' + content + ' */';
    }

    applyPrevMaps() {
      for (let prev of this.previous()) {
        let from = this.toUrl(this.path(prev.file));
        let root = prev.root || dirname(prev.file);
        let map;

        if (this.mapOpts.sourcesContent === false) {
          map = new SourceMapConsumer(prev.text);
          if (map.sourcesContent) {
            map.sourcesContent = null;
          }
        } else {
          map = prev.consumer();
        }

        this.map.applySourceMap(map, from, this.toUrl(this.path(root)));
      }
    }

    clearAnnotation() {
      if (this.mapOpts.annotation === false) return

      if (this.root) {
        let node;
        for (let i = this.root.nodes.length - 1; i >= 0; i--) {
          node = this.root.nodes[i];
          if (node.type !== 'comment') continue
          if (node.text.startsWith('# sourceMappingURL=')) {
            this.root.removeChild(i);
          }
        }
      } else if (this.css) {
        this.css = this.css.replace(/\n*\/\*#[\S\s]*?\*\/$/gm, '');
      }
    }

    generate() {
      this.clearAnnotation();
      if (pathAvailable && sourceMapAvailable && this.isMap()) {
        return this.generateMap()
      } else {
        let result = '';
        this.stringify(this.root, i => {
          result += i;
        });
        return [result]
      }
    }

    generateMap() {
      if (this.root) {
        this.generateString();
      } else if (this.previous().length === 1) {
        let prev = this.previous()[0].consumer();
        prev.file = this.outputFile();
        this.map = SourceMapGenerator.fromSourceMap(prev, {
          ignoreInvalidMapping: true
        });
      } else {
        this.map = new SourceMapGenerator({
          file: this.outputFile(),
          ignoreInvalidMapping: true
        });
        this.map.addMapping({
          generated: { column: 0, line: 1 },
          original: { column: 0, line: 1 },
          source: this.opts.from
            ? this.toUrl(this.path(this.opts.from))
            : '<no source>'
        });
      }

      if (this.isSourcesContent()) this.setSourcesContent();
      if (this.root && this.previous().length > 0) this.applyPrevMaps();
      if (this.isAnnotation()) this.addAnnotation();

      if (this.isInline()) {
        return [this.css]
      } else {
        return [this.css, this.map]
      }
    }

    generateString() {
      this.css = '';
      this.map = new SourceMapGenerator({
        file: this.outputFile(),
        ignoreInvalidMapping: true
      });

      let line = 1;
      let column = 1;

      let noSource = '<no source>';
      let mapping = {
        generated: { column: 0, line: 0 },
        original: { column: 0, line: 0 },
        source: ''
      };

      let last, lines;
      this.stringify(this.root, (str, node, type) => {
        this.css += str;

        if (node && type !== 'end') {
          mapping.generated.line = line;
          mapping.generated.column = column - 1;
          if (node.source && node.source.start) {
            mapping.source = this.sourcePath(node);
            mapping.original.line = node.source.start.line;
            mapping.original.column = node.source.start.column - 1;
            this.map.addMapping(mapping);
          } else {
            mapping.source = noSource;
            mapping.original.line = 1;
            mapping.original.column = 0;
            this.map.addMapping(mapping);
          }
        }

        lines = str.match(/\n/g);
        if (lines) {
          line += lines.length;
          last = str.lastIndexOf('\n');
          column = str.length - last;
        } else {
          column += str.length;
        }

        if (node && type !== 'start') {
          let p = node.parent || { raws: {} };
          let childless =
            node.type === 'decl' || (node.type === 'atrule' && !node.nodes);
          if (!childless || node !== p.last || p.raws.semicolon) {
            if (node.source && node.source.end) {
              mapping.source = this.sourcePath(node);
              mapping.original.line = node.source.end.line;
              mapping.original.column = node.source.end.column - 1;
              mapping.generated.line = line;
              mapping.generated.column = column - 2;
              this.map.addMapping(mapping);
            } else {
              mapping.source = noSource;
              mapping.original.line = 1;
              mapping.original.column = 0;
              mapping.generated.line = line;
              mapping.generated.column = column - 1;
              this.map.addMapping(mapping);
            }
          }
        }
      });
    }

    isAnnotation() {
      if (this.isInline()) {
        return true
      }
      if (typeof this.mapOpts.annotation !== 'undefined') {
        return this.mapOpts.annotation
      }
      if (this.previous().length) {
        return this.previous().some(i => i.annotation)
      }
      return true
    }

    isInline() {
      if (typeof this.mapOpts.inline !== 'undefined') {
        return this.mapOpts.inline
      }

      let annotation = this.mapOpts.annotation;
      if (typeof annotation !== 'undefined' && annotation !== true) {
        return false
      }

      if (this.previous().length) {
        return this.previous().some(i => i.inline)
      }
      return true
    }

    isMap() {
      if (typeof this.opts.map !== 'undefined') {
        return !!this.opts.map
      }
      return this.previous().length > 0
    }

    isSourcesContent() {
      if (typeof this.mapOpts.sourcesContent !== 'undefined') {
        return this.mapOpts.sourcesContent
      }
      if (this.previous().length) {
        return this.previous().some(i => i.withContent())
      }
      return true
    }

    outputFile() {
      if (this.opts.to) {
        return this.path(this.opts.to)
      } else if (this.opts.from) {
        return this.path(this.opts.from)
      } else {
        return 'to.css'
      }
    }

    path(file) {
      if (this.mapOpts.absolute) return file
      if (file.charCodeAt(0) === 60 /* `<` */) return file
      if (/^\w+:\/\//.test(file)) return file
      let cached = this.memoizedPaths.get(file);
      if (cached) return cached

      let from = this.opts.to ? dirname(this.opts.to) : '.';

      if (typeof this.mapOpts.annotation === 'string') {
        from = dirname(resolve$1(from, this.mapOpts.annotation));
      }

      let path = relative(from, file);
      this.memoizedPaths.set(file, path);

      return path
    }

    previous() {
      if (!this.previousMaps) {
        this.previousMaps = [];
        if (this.root) {
          this.root.walk(node => {
            if (node.source && node.source.input.map) {
              let map = node.source.input.map;
              if (!this.previousMaps.includes(map)) {
                this.previousMaps.push(map);
              }
            }
          });
        } else {
          let input = new Input$2(this.originalCSS, this.opts);
          if (input.map) this.previousMaps.push(input.map);
        }
      }

      return this.previousMaps
    }

    setSourcesContent() {
      let already = {};
      if (this.root) {
        this.root.walk(node => {
          if (node.source) {
            let from = node.source.input.from;
            if (from && !already[from]) {
              already[from] = true;
              let fromUrl = this.usesFileUrls
                ? this.toFileUrl(from)
                : this.toUrl(this.path(from));
              this.map.setSourceContent(fromUrl, node.source.input.css);
            }
          }
        });
      } else if (this.css) {
        let from = this.opts.from
          ? this.toUrl(this.path(this.opts.from))
          : '<no source>';
        this.map.setSourceContent(from, this.css);
      }
    }

    sourcePath(node) {
      if (this.mapOpts.from) {
        return this.toUrl(this.mapOpts.from)
      } else if (this.usesFileUrls) {
        return this.toFileUrl(node.source.input.from)
      } else {
        return this.toUrl(this.path(node.source.input.from))
      }
    }

    toBase64(str) {
      if (Buffer) {
        return Buffer.from(str).toString('base64')
      } else {
        return window.btoa(unescape(encodeURIComponent(str)))
      }
    }

    toFileUrl(path) {
      let cached = this.memoizedFileURLs.get(path);
      if (cached) return cached

      if (pathToFileURL) {
        let fileURL = pathToFileURL(path).toString();
        this.memoizedFileURLs.set(path, fileURL);

        return fileURL
      } else {
        throw new Error(
          '`map.absolute` option is not available in this PostCSS build'
        )
      }
    }

    toUrl(path) {
      let cached = this.memoizedURLs.get(path);
      if (cached) return cached

      if (sep === '\\') {
        path = path.replace(/\\/g, '/');
      }

      let url = encodeURI(path).replace(/[#?]/g, encodeURIComponent);
      this.memoizedURLs.set(path, url);

      return url
    }
  };

  var mapGenerator = MapGenerator$2;

  const SINGLE_QUOTE = "'".charCodeAt(0);
  const DOUBLE_QUOTE = '"'.charCodeAt(0);
  const BACKSLASH = '\\'.charCodeAt(0);
  const SLASH = '/'.charCodeAt(0);
  const NEWLINE = '\n'.charCodeAt(0);
  const SPACE = ' '.charCodeAt(0);
  const FEED = '\f'.charCodeAt(0);
  const TAB = '\t'.charCodeAt(0);
  const CR = '\r'.charCodeAt(0);
  const OPEN_SQUARE = '['.charCodeAt(0);
  const CLOSE_SQUARE = ']'.charCodeAt(0);
  const OPEN_PARENTHESES = '('.charCodeAt(0);
  const CLOSE_PARENTHESES = ')'.charCodeAt(0);
  const OPEN_CURLY = '{'.charCodeAt(0);
  const CLOSE_CURLY = '}'.charCodeAt(0);
  const SEMICOLON = ';'.charCodeAt(0);
  const ASTERISK = '*'.charCodeAt(0);
  const COLON = ':'.charCodeAt(0);
  const AT = '@'.charCodeAt(0);

  const RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g;
  const RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g;
  const RE_BAD_BRACKET = /.[\r\n"'(/\\]/;
  const RE_HEX_ESCAPE = /[\da-f]/i;

  var tokenize = function tokenizer(input, options = {}) {
    let css = input.css.valueOf();
    let ignore = options.ignoreErrors;

    let code, content, escape, next, quote;
    let currentToken, escaped, escapePos, n, prev;

    let length = css.length;
    let pos = 0;
    let buffer = [];
    let returned = [];

    function position() {
      return pos
    }

    function unclosed(what) {
      throw input.error('Unclosed ' + what, pos)
    }

    function endOfFile() {
      return returned.length === 0 && pos >= length
    }

    function nextToken(opts) {
      if (returned.length) return returned.pop()
      if (pos >= length) return

      let ignoreUnclosed = opts ? opts.ignoreUnclosed : false;

      code = css.charCodeAt(pos);

      switch (code) {
        case NEWLINE:
        case SPACE:
        case TAB:
        case CR:
        case FEED: {
          next = pos;
          do {
            next += 1;
            code = css.charCodeAt(next);
          } while (
            code === SPACE ||
            code === NEWLINE ||
            code === TAB ||
            code === CR ||
            code === FEED
          )

          currentToken = ['space', css.slice(pos, next)];
          pos = next - 1;
          break
        }

        case OPEN_SQUARE:
        case CLOSE_SQUARE:
        case OPEN_CURLY:
        case CLOSE_CURLY:
        case COLON:
        case SEMICOLON:
        case CLOSE_PARENTHESES: {
          let controlChar = String.fromCharCode(code);
          currentToken = [controlChar, controlChar, pos];
          break
        }

        case OPEN_PARENTHESES: {
          prev = buffer.length ? buffer.pop()[1] : '';
          n = css.charCodeAt(pos + 1);
          if (
            prev === 'url' &&
            n !== SINGLE_QUOTE &&
            n !== DOUBLE_QUOTE &&
            n !== SPACE &&
            n !== NEWLINE &&
            n !== TAB &&
            n !== FEED &&
            n !== CR
          ) {
            next = pos;
            do {
              escaped = false;
              next = css.indexOf(')', next + 1);
              if (next === -1) {
                if (ignore || ignoreUnclosed) {
                  next = pos;
                  break
                } else {
                  unclosed('bracket');
                }
              }
              escapePos = next;
              while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                escapePos -= 1;
                escaped = !escaped;
              }
            } while (escaped)

            currentToken = ['brackets', css.slice(pos, next + 1), pos, next];

            pos = next;
          } else {
            next = css.indexOf(')', pos + 1);
            content = css.slice(pos, next + 1);

            if (next === -1 || RE_BAD_BRACKET.test(content)) {
              currentToken = ['(', '(', pos];
            } else {
              currentToken = ['brackets', content, pos, next];
              pos = next;
            }
          }

          break
        }

        case SINGLE_QUOTE:
        case DOUBLE_QUOTE: {
          quote = code === SINGLE_QUOTE ? "'" : '"';
          next = pos;
          do {
            escaped = false;
            next = css.indexOf(quote, next + 1);
            if (next === -1) {
              if (ignore || ignoreUnclosed) {
                next = pos + 1;
                break
              } else {
                unclosed('string');
              }
            }
            escapePos = next;
            while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
              escapePos -= 1;
              escaped = !escaped;
            }
          } while (escaped)

          currentToken = ['string', css.slice(pos, next + 1), pos, next];
          pos = next;
          break
        }

        case AT: {
          RE_AT_END.lastIndex = pos + 1;
          RE_AT_END.test(css);
          if (RE_AT_END.lastIndex === 0) {
            next = css.length - 1;
          } else {
            next = RE_AT_END.lastIndex - 2;
          }

          currentToken = ['at-word', css.slice(pos, next + 1), pos, next];

          pos = next;
          break
        }

        case BACKSLASH: {
          next = pos;
          escape = true;
          while (css.charCodeAt(next + 1) === BACKSLASH) {
            next += 1;
            escape = !escape;
          }
          code = css.charCodeAt(next + 1);
          if (
            escape &&
            code !== SLASH &&
            code !== SPACE &&
            code !== NEWLINE &&
            code !== TAB &&
            code !== CR &&
            code !== FEED
          ) {
            next += 1;
            if (RE_HEX_ESCAPE.test(css.charAt(next))) {
              while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
                next += 1;
              }
              if (css.charCodeAt(next + 1) === SPACE) {
                next += 1;
              }
            }
          }

          currentToken = ['word', css.slice(pos, next + 1), pos, next];

          pos = next;
          break
        }

        default: {
          if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
            next = css.indexOf('*/', pos + 2) + 1;
            if (next === 0) {
              if (ignore || ignoreUnclosed) {
                next = css.length;
              } else {
                unclosed('comment');
              }
            }

            currentToken = ['comment', css.slice(pos, next + 1), pos, next];
            pos = next;
          } else {
            RE_WORD_END.lastIndex = pos + 1;
            RE_WORD_END.test(css);
            if (RE_WORD_END.lastIndex === 0) {
              next = css.length - 1;
            } else {
              next = RE_WORD_END.lastIndex - 2;
            }

            currentToken = ['word', css.slice(pos, next + 1), pos, next];
            buffer.push(currentToken);
            pos = next;
          }

          break
        }
      }

      pos++;
      return currentToken
    }

    function back(token) {
      returned.push(token);
    }

    return {
      back,
      endOfFile,
      nextToken,
      position
    }
  };

  let AtRule$3 = atRule$1;
  let Comment$1 = comment;
  let Declaration$L = declaration$1;
  let Root$3 = root;
  let Rule$1 = rule;
  let tokenizer = tokenize;

  const SAFE_COMMENT_NEIGHBOR = {
    empty: true,
    space: true
  };

  function findLastWithPosition(tokens) {
    for (let i = tokens.length - 1; i >= 0; i--) {
      let token = tokens[i];
      let pos = token[3] || token[2];
      if (pos) return pos
    }
  }

  let Parser$1 = class Parser {
    constructor(input) {
      this.input = input;

      this.root = new Root$3();
      this.current = this.root;
      this.spaces = '';
      this.semicolon = false;

      this.createTokenizer();
      this.root.source = { input, start: { column: 1, line: 1, offset: 0 } };
    }

    atrule(token) {
      let node = new AtRule$3();
      node.name = token[1].slice(1);
      if (node.name === '') {
        this.unnamedAtrule(node, token);
      }
      this.init(node, token[2]);

      let type;
      let prev;
      let shift;
      let last = false;
      let open = false;
      let params = [];
      let brackets = [];

      while (!this.tokenizer.endOfFile()) {
        token = this.tokenizer.nextToken();
        type = token[0];

        if (type === '(' || type === '[') {
          brackets.push(type === '(' ? ')' : ']');
        } else if (type === '{' && brackets.length > 0) {
          brackets.push('}');
        } else if (type === brackets[brackets.length - 1]) {
          brackets.pop();
        }

        if (brackets.length === 0) {
          if (type === ';') {
            node.source.end = this.getPosition(token[2]);
            node.source.end.offset++;
            this.semicolon = true;
            break
          } else if (type === '{') {
            open = true;
            break
          } else if (type === '}') {
            if (params.length > 0) {
              shift = params.length - 1;
              prev = params[shift];
              while (prev && prev[0] === 'space') {
                prev = params[--shift];
              }
              if (prev) {
                node.source.end = this.getPosition(prev[3] || prev[2]);
                node.source.end.offset++;
              }
            }
            this.end(token);
            break
          } else {
            params.push(token);
          }
        } else {
          params.push(token);
        }

        if (this.tokenizer.endOfFile()) {
          last = true;
          break
        }
      }

      node.raws.between = this.spacesAndCommentsFromEnd(params);
      if (params.length) {
        node.raws.afterName = this.spacesAndCommentsFromStart(params);
        this.raw(node, 'params', params);
        if (last) {
          token = params[params.length - 1];
          node.source.end = this.getPosition(token[3] || token[2]);
          node.source.end.offset++;
          this.spaces = node.raws.between;
          node.raws.between = '';
        }
      } else {
        node.raws.afterName = '';
        node.params = '';
      }

      if (open) {
        node.nodes = [];
        this.current = node;
      }
    }

    checkMissedSemicolon(tokens) {
      let colon = this.colon(tokens);
      if (colon === false) return

      let founded = 0;
      let token;
      for (let j = colon - 1; j >= 0; j--) {
        token = tokens[j];
        if (token[0] !== 'space') {
          founded += 1;
          if (founded === 2) break
        }
      }
      // If the token is a word, e.g. `!important`, `red` or any other valid property's value.
      // Then we need to return the colon after that word token. [3] is the "end" colon of that word.
      // And because we need it after that one we do +1 to get the next one.
      throw this.input.error(
        'Missed semicolon',
        token[0] === 'word' ? token[3] + 1 : token[2]
      )
    }

    colon(tokens) {
      let brackets = 0;
      let prev, token, type;
      for (let [i, element] of tokens.entries()) {
        token = element;
        type = token[0];

        if (type === '(') {
          brackets += 1;
        }
        if (type === ')') {
          brackets -= 1;
        }
        if (brackets === 0 && type === ':') {
          if (!prev) {
            this.doubleColon(token);
          } else if (prev[0] === 'word' && prev[1] === 'progid') {
            continue
          } else {
            return i
          }
        }

        prev = token;
      }
      return false
    }

    comment(token) {
      let node = new Comment$1();
      this.init(node, token[2]);
      node.source.end = this.getPosition(token[3] || token[2]);
      node.source.end.offset++;

      let text = token[1].slice(2, -2);
      if (/^\s*$/.test(text)) {
        node.text = '';
        node.raws.left = text;
        node.raws.right = '';
      } else {
        let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
        node.text = match[2];
        node.raws.left = match[1];
        node.raws.right = match[3];
      }
    }

    createTokenizer() {
      this.tokenizer = tokenizer(this.input);
    }

    decl(tokens, customProperty) {
      let node = new Declaration$L();
      this.init(node, tokens[0][2]);

      let last = tokens[tokens.length - 1];
      if (last[0] === ';') {
        this.semicolon = true;
        tokens.pop();
      }

      node.source.end = this.getPosition(
        last[3] || last[2] || findLastWithPosition(tokens)
      );
      node.source.end.offset++;

      while (tokens[0][0] !== 'word') {
        if (tokens.length === 1) this.unknownWord(tokens);
        node.raws.before += tokens.shift()[1];
      }
      node.source.start = this.getPosition(tokens[0][2]);

      node.prop = '';
      while (tokens.length) {
        let type = tokens[0][0];
        if (type === ':' || type === 'space' || type === 'comment') {
          break
        }
        node.prop += tokens.shift()[1];
      }

      node.raws.between = '';

      let token;
      while (tokens.length) {
        token = tokens.shift();

        if (token[0] === ':') {
          node.raws.between += token[1];
          break
        } else {
          if (token[0] === 'word' && /\w/.test(token[1])) {
            this.unknownWord([token]);
          }
          node.raws.between += token[1];
        }
      }

      if (node.prop[0] === '_' || node.prop[0] === '*') {
        node.raws.before += node.prop[0];
        node.prop = node.prop.slice(1);
      }

      let firstSpaces = [];
      let next;
      while (tokens.length) {
        next = tokens[0][0];
        if (next !== 'space' && next !== 'comment') break
        firstSpaces.push(tokens.shift());
      }

      this.precheckMissedSemicolon(tokens);

      for (let i = tokens.length - 1; i >= 0; i--) {
        token = tokens[i];
        if (token[1].toLowerCase() === '!important') {
          node.important = true;
          let string = this.stringFrom(tokens, i);
          string = this.spacesFromEnd(tokens) + string;
          if (string !== ' !important') node.raws.important = string;
          break
        } else if (token[1].toLowerCase() === 'important') {
          let cache = tokens.slice(0);
          let str = '';
          for (let j = i; j > 0; j--) {
            let type = cache[j][0];
            if (str.trim().startsWith('!') && type !== 'space') {
              break
            }
            str = cache.pop()[1] + str;
          }
          if (str.trim().startsWith('!')) {
            node.important = true;
            node.raws.important = str;
            tokens = cache;
          }
        }

        if (token[0] !== 'space' && token[0] !== 'comment') {
          break
        }
      }

      let hasWord = tokens.some(i => i[0] !== 'space' && i[0] !== 'comment');

      if (hasWord) {
        node.raws.between += firstSpaces.map(i => i[1]).join('');
        firstSpaces = [];
      }
      this.raw(node, 'value', firstSpaces.concat(tokens), customProperty);

      if (node.value.includes(':') && !customProperty) {
        this.checkMissedSemicolon(tokens);
      }
    }

    doubleColon(token) {
      throw this.input.error(
        'Double colon',
        { offset: token[2] },
        { offset: token[2] + token[1].length }
      )
    }

    emptyRule(token) {
      let node = new Rule$1();
      this.init(node, token[2]);
      node.selector = '';
      node.raws.between = '';
      this.current = node;
    }

    end(token) {
      if (this.current.nodes && this.current.nodes.length) {
        this.current.raws.semicolon = this.semicolon;
      }
      this.semicolon = false;

      this.current.raws.after = (this.current.raws.after || '') + this.spaces;
      this.spaces = '';

      if (this.current.parent) {
        this.current.source.end = this.getPosition(token[2]);
        this.current.source.end.offset++;
        this.current = this.current.parent;
      } else {
        this.unexpectedClose(token);
      }
    }

    endFile() {
      if (this.current.parent) this.unclosedBlock();
      if (this.current.nodes && this.current.nodes.length) {
        this.current.raws.semicolon = this.semicolon;
      }
      this.current.raws.after = (this.current.raws.after || '') + this.spaces;
      this.root.source.end = this.getPosition(this.tokenizer.position());
    }

    freeSemicolon(token) {
      this.spaces += token[1];
      if (this.current.nodes) {
        let prev = this.current.nodes[this.current.nodes.length - 1];
        if (prev && prev.type === 'rule' && !prev.raws.ownSemicolon) {
          prev.raws.ownSemicolon = this.spaces;
          this.spaces = '';
          prev.source.end = this.getPosition(token[2]);
          prev.source.end.offset += prev.raws.ownSemicolon.length;
        }
      }
    }

    // Helpers

    getPosition(offset) {
      let pos = this.input.fromOffset(offset);
      return {
        column: pos.col,
        line: pos.line,
        offset
      }
    }

    init(node, offset) {
      this.current.push(node);
      node.source = {
        input: this.input,
        start: this.getPosition(offset)
      };
      node.raws.before = this.spaces;
      this.spaces = '';
      if (node.type !== 'comment') this.semicolon = false;
    }

    other(start) {
      let end = false;
      let type = null;
      let colon = false;
      let bracket = null;
      let brackets = [];
      let customProperty = start[1].startsWith('--');

      let tokens = [];
      let token = start;
      while (token) {
        type = token[0];
        tokens.push(token);

        if (type === '(' || type === '[') {
          if (!bracket) bracket = token;
          brackets.push(type === '(' ? ')' : ']');
        } else if (customProperty && colon && type === '{') {
          if (!bracket) bracket = token;
          brackets.push('}');
        } else if (brackets.length === 0) {
          if (type === ';') {
            if (colon) {
              this.decl(tokens, customProperty);
              return
            } else {
              break
            }
          } else if (type === '{') {
            this.rule(tokens);
            return
          } else if (type === '}') {
            this.tokenizer.back(tokens.pop());
            end = true;
            break
          } else if (type === ':') {
            colon = true;
          }
        } else if (type === brackets[brackets.length - 1]) {
          brackets.pop();
          if (brackets.length === 0) bracket = null;
        }

        token = this.tokenizer.nextToken();
      }

      if (this.tokenizer.endOfFile()) end = true;
      if (brackets.length > 0) this.unclosedBracket(bracket);

      if (end && colon) {
        if (!customProperty) {
          while (tokens.length) {
            token = tokens[tokens.length - 1][0];
            if (token !== 'space' && token !== 'comment') break
            this.tokenizer.back(tokens.pop());
          }
        }
        this.decl(tokens, customProperty);
      } else {
        this.unknownWord(tokens);
      }
    }

    parse() {
      let token;
      while (!this.tokenizer.endOfFile()) {
        token = this.tokenizer.nextToken();

        switch (token[0]) {
          case 'space':
            this.spaces += token[1];
            break

          case ';':
            this.freeSemicolon(token);
            break

          case '}':
            this.end(token);
            break

          case 'comment':
            this.comment(token);
            break

          case 'at-word':
            this.atrule(token);
            break

          case '{':
            this.emptyRule(token);
            break

          default:
            this.other(token);
            break
        }
      }
      this.endFile();
    }

    precheckMissedSemicolon(/* tokens */) {
      // Hook for Safe Parser
    }

    raw(node, prop, tokens, customProperty) {
      let token, type;
      let length = tokens.length;
      let value = '';
      let clean = true;
      let next, prev;

      for (let i = 0; i < length; i += 1) {
        token = tokens[i];
        type = token[0];
        if (type === 'space' && i === length - 1 && !customProperty) {
          clean = false;
        } else if (type === 'comment') {
          prev = tokens[i - 1] ? tokens[i - 1][0] : 'empty';
          next = tokens[i + 1] ? tokens[i + 1][0] : 'empty';
          if (!SAFE_COMMENT_NEIGHBOR[prev] && !SAFE_COMMENT_NEIGHBOR[next]) {
            if (value.slice(-1) === ',') {
              clean = false;
            } else {
              value += token[1];
            }
          } else {
            clean = false;
          }
        } else {
          value += token[1];
        }
      }
      if (!clean) {
        let raw = tokens.reduce((all, i) => all + i[1], '');
        node.raws[prop] = { raw, value };
      }
      node[prop] = value;
    }

    rule(tokens) {
      tokens.pop();

      let node = new Rule$1();
      this.init(node, tokens[0][2]);

      node.raws.between = this.spacesAndCommentsFromEnd(tokens);
      this.raw(node, 'selector', tokens);
      this.current = node;
    }

    spacesAndCommentsFromEnd(tokens) {
      let lastTokenType;
      let spaces = '';
      while (tokens.length) {
        lastTokenType = tokens[tokens.length - 1][0];
        if (lastTokenType !== 'space' && lastTokenType !== 'comment') break
        spaces = tokens.pop()[1] + spaces;
      }
      return spaces
    }

    // Errors

    spacesAndCommentsFromStart(tokens) {
      let next;
      let spaces = '';
      while (tokens.length) {
        next = tokens[0][0];
        if (next !== 'space' && next !== 'comment') break
        spaces += tokens.shift()[1];
      }
      return spaces
    }

    spacesFromEnd(tokens) {
      let lastTokenType;
      let spaces = '';
      while (tokens.length) {
        lastTokenType = tokens[tokens.length - 1][0];
        if (lastTokenType !== 'space') break
        spaces = tokens.pop()[1] + spaces;
      }
      return spaces
    }

    stringFrom(tokens, from) {
      let result = '';
      for (let i = from; i < tokens.length; i++) {
        result += tokens[i][1];
      }
      tokens.splice(from, tokens.length - from);
      return result
    }

    unclosedBlock() {
      let pos = this.current.source.start;
      throw this.input.error('Unclosed block', pos.line, pos.column)
    }

    unclosedBracket(bracket) {
      throw this.input.error(
        'Unclosed bracket',
        { offset: bracket[2] },
        { offset: bracket[2] + 1 }
      )
    }

    unexpectedClose(token) {
      throw this.input.error(
        'Unexpected }',
        { offset: token[2] },
        { offset: token[2] + 1 }
      )
    }

    unknownWord(tokens) {
      throw this.input.error(
        'Unknown word ' + tokens[0][1],
        { offset: tokens[0][2] },
        { offset: tokens[0][2] + tokens[0][1].length }
      )
    }

    unnamedAtrule(node, token) {
      throw this.input.error(
        'At-rule without name',
        { offset: token[2] },
        { offset: token[2] + token[1].length }
      )
    }
  };

  var parser$4 = Parser$1;

  let Container$2 = container;
  let Input$1 = input;
  let Parser = parser$4;

  function parse$8(css, opts) {
    let input = new Input$1(css, opts);
    let parser = new Parser(input);
    try {
      parser.parse();
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        if (e.name === 'CssSyntaxError' && opts && opts.from) {
          if (/\.scss$/i.test(opts.from)) {
            e.message +=
              '\nYou tried to parse SCSS with ' +
              'the standard CSS parser; ' +
              'try again with the postcss-scss parser';
          } else if (/\.sass/i.test(opts.from)) {
            e.message +=
              '\nYou tried to parse Sass with ' +
              'the standard CSS parser; ' +
              'try again with the postcss-sass parser';
          } else if (/\.less$/i.test(opts.from)) {
            e.message +=
              '\nYou tried to parse Less with ' +
              'the standard CSS parser; ' +
              'try again with the postcss-less parser';
          }
        }
      }
      throw e
    }

    return parser.root
  }

  var parse_1 = parse$8;
  parse$8.default = parse$8;

  Container$2.registerParse(parse$8);

  let Warning$2 = class Warning {
    constructor(text, opts = {}) {
      this.type = 'warning';
      this.text = text;

      if (opts.node && opts.node.source) {
        let range = opts.node.rangeBy(opts);
        this.line = range.start.line;
        this.column = range.start.column;
        this.endLine = range.end.line;
        this.endColumn = range.end.column;
      }

      for (let opt in opts) this[opt] = opts[opt];
    }

    toString() {
      if (this.node) {
        return this.node.error(this.text, {
          index: this.index,
          plugin: this.plugin,
          word: this.word
        }).message
      }

      if (this.plugin) {
        return this.plugin + ': ' + this.text
      }

      return this.text
    }
  };

  var warning = Warning$2;
  Warning$2.default = Warning$2;

  let Warning$1 = warning;

  let Result$3 = class Result {
    get content() {
      return this.css
    }

    constructor(processor, root, opts) {
      this.processor = processor;
      this.messages = [];
      this.root = root;
      this.opts = opts;
      this.css = undefined;
      this.map = undefined;
    }

    toString() {
      return this.css
    }

    warn(text, opts = {}) {
      if (!opts.plugin) {
        if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
          opts.plugin = this.lastPlugin.postcssPlugin;
        }
      }

      let warning = new Warning$1(text, opts);
      this.messages.push(warning);

      return warning
    }

    warnings() {
      return this.messages.filter(i => i.type === 'warning')
    }
  };

  var result$1 = Result$3;
  Result$3.default = Result$3;

  /* eslint-disable no-console */

  let printed = {};

  var warnOnce$2 = function warnOnce(message) {
    if (printed[message]) return
    printed[message] = true;

    if (typeof console !== 'undefined' && console.warn) {
      console.warn(message);
    }
  };

  let Container$1 = container;
  let Document$2 = document;
  let MapGenerator$1 = mapGenerator;
  let parse$7 = parse_1;
  let Result$2 = result$1;
  let Root$2 = root;
  let stringify$4 = stringify_1$1;
  let { isClean, my } = symbols;
  let warnOnce$1 = warnOnce$2;

  const TYPE_TO_CLASS_NAME = {
    atrule: 'AtRule',
    comment: 'Comment',
    decl: 'Declaration',
    document: 'Document',
    root: 'Root',
    rule: 'Rule'
  };

  const PLUGIN_PROPS = {
    AtRule: true,
    AtRuleExit: true,
    Comment: true,
    CommentExit: true,
    Declaration: true,
    DeclarationExit: true,
    Document: true,
    DocumentExit: true,
    Once: true,
    OnceExit: true,
    postcssPlugin: true,
    prepare: true,
    Root: true,
    RootExit: true,
    Rule: true,
    RuleExit: true
  };

  const NOT_VISITORS = {
    Once: true,
    postcssPlugin: true,
    prepare: true
  };

  const CHILDREN = 0;

  function isPromise(obj) {
    return typeof obj === 'object' && typeof obj.then === 'function'
  }

  function getEvents(node) {
    let key = false;
    let type = TYPE_TO_CLASS_NAME[node.type];
    if (node.type === 'decl') {
      key = node.prop.toLowerCase();
    } else if (node.type === 'atrule') {
      key = node.name.toLowerCase();
    }

    if (key && node.append) {
      return [
        type,
        type + '-' + key,
        CHILDREN,
        type + 'Exit',
        type + 'Exit-' + key
      ]
    } else if (key) {
      return [type, type + '-' + key, type + 'Exit', type + 'Exit-' + key]
    } else if (node.append) {
      return [type, CHILDREN, type + 'Exit']
    } else {
      return [type, type + 'Exit']
    }
  }

  function toStack(node) {
    let events;
    if (node.type === 'document') {
      events = ['Document', CHILDREN, 'DocumentExit'];
    } else if (node.type === 'root') {
      events = ['Root', CHILDREN, 'RootExit'];
    } else {
      events = getEvents(node);
    }

    return {
      eventIndex: 0,
      events,
      iterator: 0,
      node,
      visitorIndex: 0,
      visitors: []
    }
  }

  function cleanMarks(node) {
    node[isClean] = false;
    if (node.nodes) node.nodes.forEach(i => cleanMarks(i));
    return node
  }

  let postcss$1 = {};

  let LazyResult$2 = class LazyResult {
    get content() {
      return this.stringify().content
    }

    get css() {
      return this.stringify().css
    }

    get map() {
      return this.stringify().map
    }

    get messages() {
      return this.sync().messages
    }

    get opts() {
      return this.result.opts
    }

    get processor() {
      return this.result.processor
    }

    get root() {
      return this.sync().root
    }

    get [Symbol.toStringTag]() {
      return 'LazyResult'
    }

    constructor(processor, css, opts) {
      this.stringified = false;
      this.processed = false;

      let root;
      if (
        typeof css === 'object' &&
        css !== null &&
        (css.type === 'root' || css.type === 'document')
      ) {
        root = cleanMarks(css);
      } else if (css instanceof LazyResult || css instanceof Result$2) {
        root = cleanMarks(css.root);
        if (css.map) {
          if (typeof opts.map === 'undefined') opts.map = {};
          if (!opts.map.inline) opts.map.inline = false;
          opts.map.prev = css.map;
        }
      } else {
        let parser = parse$7;
        if (opts.syntax) parser = opts.syntax.parse;
        if (opts.parser) parser = opts.parser;
        if (parser.parse) parser = parser.parse;

        try {
          root = parser(css, opts);
        } catch (error) {
          this.processed = true;
          this.error = error;
        }

        if (root && !root[my]) {
          /* c8 ignore next 2 */
          Container$1.rebuild(root);
        }
      }

      this.result = new Result$2(processor, root, opts);
      this.helpers = { ...postcss$1, postcss: postcss$1, result: this.result };
      this.plugins = this.processor.plugins.map(plugin => {
        if (typeof plugin === 'object' && plugin.prepare) {
          return { ...plugin, ...plugin.prepare(this.result) }
        } else {
          return plugin
        }
      });
    }

    async() {
      if (this.error) return Promise.reject(this.error)
      if (this.processed) return Promise.resolve(this.result)
      if (!this.processing) {
        this.processing = this.runAsync();
      }
      return this.processing
    }

    catch(onRejected) {
      return this.async().catch(onRejected)
    }

    finally(onFinally) {
      return this.async().then(onFinally, onFinally)
    }

    getAsyncError() {
      throw new Error('Use process(css).then(cb) to work with async plugins')
    }

    handleError(error, node) {
      let plugin = this.result.lastPlugin;
      try {
        if (node) node.addToError(error);
        this.error = error;
        if (error.name === 'CssSyntaxError' && !error.plugin) {
          error.plugin = plugin.postcssPlugin;
          error.setMessage();
        } else if (plugin.postcssVersion) {
          if (process.env.NODE_ENV !== 'production') {
            let pluginName = plugin.postcssPlugin;
            let pluginVer = plugin.postcssVersion;
            let runtimeVer = this.result.processor.version;
            let a = pluginVer.split('.');
            let b = runtimeVer.split('.');

            if (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) {
              // eslint-disable-next-line no-console
              console.error(
                'Unknown error from PostCSS plugin. Your current PostCSS ' +
                  'version is ' +
                  runtimeVer +
                  ', but ' +
                  pluginName +
                  ' uses ' +
                  pluginVer +
                  '. Perhaps this is the source of the error below.'
              );
            }
          }
        }
      } catch (err) {
        /* c8 ignore next 3 */
        // eslint-disable-next-line no-console
        if (console && console.error) console.error(err);
      }
      return error
    }

    prepareVisitors() {
      this.listeners = {};
      let add = (plugin, type, cb) => {
        if (!this.listeners[type]) this.listeners[type] = [];
        this.listeners[type].push([plugin, cb]);
      };
      for (let plugin of this.plugins) {
        if (typeof plugin === 'object') {
          for (let event in plugin) {
            if (!PLUGIN_PROPS[event] && /^[A-Z]/.test(event)) {
              throw new Error(
                `Unknown event ${event} in ${plugin.postcssPlugin}. ` +
                  `Try to update PostCSS (${this.processor.version} now).`
              )
            }
            if (!NOT_VISITORS[event]) {
              if (typeof plugin[event] === 'object') {
                for (let filter in plugin[event]) {
                  if (filter === '*') {
                    add(plugin, event, plugin[event][filter]);
                  } else {
                    add(
                      plugin,
                      event + '-' + filter.toLowerCase(),
                      plugin[event][filter]
                    );
                  }
                }
              } else if (typeof plugin[event] === 'function') {
                add(plugin, event, plugin[event]);
              }
            }
          }
        }
      }
      this.hasListener = Object.keys(this.listeners).length > 0;
    }

    async runAsync() {
      this.plugin = 0;
      for (let i = 0; i < this.plugins.length; i++) {
        let plugin = this.plugins[i];
        let promise = this.runOnRoot(plugin);
        if (isPromise(promise)) {
          try {
            await promise;
          } catch (error) {
            throw this.handleError(error)
          }
        }
      }

      this.prepareVisitors();
      if (this.hasListener) {
        let root = this.result.root;
        while (!root[isClean]) {
          root[isClean] = true;
          let stack = [toStack(root)];
          while (stack.length > 0) {
            let promise = this.visitTick(stack);
            if (isPromise(promise)) {
              try {
                await promise;
              } catch (e) {
                let node = stack[stack.length - 1].node;
                throw this.handleError(e, node)
              }
            }
          }
        }

        if (this.listeners.OnceExit) {
          for (let [plugin, visitor] of this.listeners.OnceExit) {
            this.result.lastPlugin = plugin;
            try {
              if (root.type === 'document') {
                let roots = root.nodes.map(subRoot =>
                  visitor(subRoot, this.helpers)
                );

                await Promise.all(roots);
              } else {
                await visitor(root, this.helpers);
              }
            } catch (e) {
              throw this.handleError(e)
            }
          }
        }
      }

      this.processed = true;
      return this.stringify()
    }

    runOnRoot(plugin) {
      this.result.lastPlugin = plugin;
      try {
        if (typeof plugin === 'object' && plugin.Once) {
          if (this.result.root.type === 'document') {
            let roots = this.result.root.nodes.map(root =>
              plugin.Once(root, this.helpers)
            );

            if (isPromise(roots[0])) {
              return Promise.all(roots)
            }

            return roots
          }

          return plugin.Once(this.result.root, this.helpers)
        } else if (typeof plugin === 'function') {
          return plugin(this.result.root, this.result)
        }
      } catch (error) {
        throw this.handleError(error)
      }
    }

    stringify() {
      if (this.error) throw this.error
      if (this.stringified) return this.result
      this.stringified = true;

      this.sync();

      let opts = this.result.opts;
      let str = stringify$4;
      if (opts.syntax) str = opts.syntax.stringify;
      if (opts.stringifier) str = opts.stringifier;
      if (str.stringify) str = str.stringify;

      let map = new MapGenerator$1(str, this.result.root, this.result.opts);
      let data = map.generate();
      this.result.css = data[0];
      this.result.map = data[1];

      return this.result
    }

    sync() {
      if (this.error) throw this.error
      if (this.processed) return this.result
      this.processed = true;

      if (this.processing) {
        throw this.getAsyncError()
      }

      for (let plugin of this.plugins) {
        let promise = this.runOnRoot(plugin);
        if (isPromise(promise)) {
          throw this.getAsyncError()
        }
      }

      this.prepareVisitors();
      if (this.hasListener) {
        let root = this.result.root;
        while (!root[isClean]) {
          root[isClean] = true;
          this.walkSync(root);
        }
        if (this.listeners.OnceExit) {
          if (root.type === 'document') {
            for (let subRoot of root.nodes) {
              this.visitSync(this.listeners.OnceExit, subRoot);
            }
          } else {
            this.visitSync(this.listeners.OnceExit, root);
          }
        }
      }

      return this.result
    }

    then(onFulfilled, onRejected) {
      if (process.env.NODE_ENV !== 'production') {
        if (!('from' in this.opts)) {
          warnOnce$1(
            'Without `from` option PostCSS could generate wrong source map ' +
              'and will not find Browserslist config. Set it to CSS file path ' +
              'or to `undefined` to prevent this warning.'
          );
        }
      }
      return this.async().then(onFulfilled, onRejected)
    }

    toString() {
      return this.css
    }

    visitSync(visitors, node) {
      for (let [plugin, visitor] of visitors) {
        this.result.lastPlugin = plugin;
        let promise;
        try {
          promise = visitor(node, this.helpers);
        } catch (e) {
          throw this.handleError(e, node.proxyOf)
        }
        if (node.type !== 'root' && node.type !== 'document' && !node.parent) {
          return true
        }
        if (isPromise(promise)) {
          throw this.getAsyncError()
        }
      }
    }

    visitTick(stack) {
      let visit = stack[stack.length - 1];
      let { node, visitors } = visit;

      if (node.type !== 'root' && node.type !== 'document' && !node.parent) {
        stack.pop();
        return
      }

      if (visitors.length > 0 && visit.visitorIndex < visitors.length) {
        let [plugin, visitor] = visitors[visit.visitorIndex];
        visit.visitorIndex += 1;
        if (visit.visitorIndex === visitors.length) {
          visit.visitors = [];
          visit.visitorIndex = 0;
        }
        this.result.lastPlugin = plugin;
        try {
          return visitor(node.toProxy(), this.helpers)
        } catch (e) {
          throw this.handleError(e, node)
        }
      }

      if (visit.iterator !== 0) {
        let iterator = visit.iterator;
        let child;
        while ((child = node.nodes[node.indexes[iterator]])) {
          node.indexes[iterator] += 1;
          if (!child[isClean]) {
            child[isClean] = true;
            stack.push(toStack(child));
            return
          }
        }
        visit.iterator = 0;
        delete node.indexes[iterator];
      }

      let events = visit.events;
      while (visit.eventIndex < events.length) {
        let event = events[visit.eventIndex];
        visit.eventIndex += 1;
        if (event === CHILDREN) {
          if (node.nodes && node.nodes.length) {
            node[isClean] = true;
            visit.iterator = node.getIterator();
          }
          return
        } else if (this.listeners[event]) {
          visit.visitors = this.listeners[event];
          return
        }
      }
      stack.pop();
    }

    walkSync(node) {
      node[isClean] = true;
      let events = getEvents(node);
      for (let event of events) {
        if (event === CHILDREN) {
          if (node.nodes) {
            node.each(child => {
              if (!child[isClean]) this.walkSync(child);
            });
          }
        } else {
          let visitors = this.listeners[event];
          if (visitors) {
            if (this.visitSync(visitors, node.toProxy())) return
          }
        }
      }
    }

    warnings() {
      return this.sync().warnings()
    }
  };

  LazyResult$2.registerPostcss = dependant => {
    postcss$1 = dependant;
  };

  var lazyResult = LazyResult$2;
  LazyResult$2.default = LazyResult$2;

  Root$2.registerLazyResult(LazyResult$2);
  Document$2.registerLazyResult(LazyResult$2);

  let MapGenerator = mapGenerator;
  let parse$6 = parse_1;
  const Result$1 = result$1;
  let stringify$3 = stringify_1$1;
  let warnOnce = warnOnce$2;

  let NoWorkResult$1 = class NoWorkResult {
    get content() {
      return this.result.css
    }

    get css() {
      return this.result.css
    }

    get map() {
      return this.result.map
    }

    get messages() {
      return []
    }

    get opts() {
      return this.result.opts
    }

    get processor() {
      return this.result.processor
    }

    get root() {
      if (this._root) {
        return this._root
      }

      let root;
      let parser = parse$6;

      try {
        root = parser(this._css, this._opts);
      } catch (error) {
        this.error = error;
      }

      if (this.error) {
        throw this.error
      } else {
        this._root = root;
        return root
      }
    }

    get [Symbol.toStringTag]() {
      return 'NoWorkResult'
    }

    constructor(processor, css, opts) {
      css = css.toString();
      this.stringified = false;

      this._processor = processor;
      this._css = css;
      this._opts = opts;
      this._map = undefined;
      let root;

      let str = stringify$3;
      this.result = new Result$1(this._processor, root, this._opts);
      this.result.css = css;

      let self = this;
      Object.defineProperty(this.result, 'root', {
        get() {
          return self.root
        }
      });

      let map = new MapGenerator(str, root, this._opts, css);
      if (map.isMap()) {
        let [generatedCSS, generatedMap] = map.generate();
        if (generatedCSS) {
          this.result.css = generatedCSS;
        }
        if (generatedMap) {
          this.result.map = generatedMap;
        }
      } else {
        map.clearAnnotation();
        this.result.css = map.css;
      }
    }

    async() {
      if (this.error) return Promise.reject(this.error)
      return Promise.resolve(this.result)
    }

    catch(onRejected) {
      return this.async().catch(onRejected)
    }

    finally(onFinally) {
      return this.async().then(onFinally, onFinally)
    }

    sync() {
      if (this.error) throw this.error
      return this.result
    }

    then(onFulfilled, onRejected) {
      if (process.env.NODE_ENV !== 'production') {
        if (!('from' in this._opts)) {
          warnOnce(
            'Without `from` option PostCSS could generate wrong source map ' +
              'and will not find Browserslist config. Set it to CSS file path ' +
              'or to `undefined` to prevent this warning.'
          );
        }
      }

      return this.async().then(onFulfilled, onRejected)
    }

    toString() {
      return this._css
    }

    warnings() {
      return []
    }
  };

  var noWorkResult = NoWorkResult$1;
  NoWorkResult$1.default = NoWorkResult$1;

  let Document$1 = document;
  let LazyResult$1 = lazyResult;
  let NoWorkResult = noWorkResult;
  let Root$1 = root;

  let Processor$4 = class Processor {
    constructor(plugins = []) {
      this.version = '8.5.3';
      this.plugins = this.normalize(plugins);
    }

    normalize(plugins) {
      let normalized = [];
      for (let i of plugins) {
        if (i.postcss === true) {
          i = i();
        } else if (i.postcss) {
          i = i.postcss;
        }

        if (typeof i === 'object' && Array.isArray(i.plugins)) {
          normalized = normalized.concat(i.plugins);
        } else if (typeof i === 'object' && i.postcssPlugin) {
          normalized.push(i);
        } else if (typeof i === 'function') {
          normalized.push(i);
        } else if (typeof i === 'object' && (i.parse || i.stringify)) {
          if (process.env.NODE_ENV !== 'production') {
            throw new Error(
              'PostCSS syntaxes cannot be used as plugins. Instead, please use ' +
                'one of the syntax/parser/stringifier options as outlined ' +
                'in your PostCSS runner documentation.'
            )
          }
        } else {
          throw new Error(i + ' is not a PostCSS plugin')
        }
      }
      return normalized
    }

    process(css, opts = {}) {
      if (
        !this.plugins.length &&
        !opts.parser &&
        !opts.stringifier &&
        !opts.syntax
      ) {
        return new NoWorkResult(this, css, opts)
      } else {
        return new LazyResult$1(this, css, opts)
      }
    }

    use(plugin) {
      this.plugins = this.plugins.concat(this.normalize([plugin]));
      return this
    }
  };

  var processor$1 = Processor$4;
  Processor$4.default = Processor$4;

  Root$1.registerProcessor(Processor$4);
  Document$1.registerProcessor(Processor$4);

  let AtRule$2 = atRule$1;
  let Comment = comment;
  let Container = container;
  let CssSyntaxError = cssSyntaxError;
  let Declaration$K = declaration$1;
  let Document = document;
  let fromJSON = fromJSON_1;
  let Input = input;
  let LazyResult = lazyResult;
  let list$6 = list_1;
  let Node = node;
  let parse$5 = parse_1;
  let Processor$3 = processor$1;
  let Result = result$1;
  let Root = root;
  let Rule = rule;
  let stringify$2 = stringify_1$1;
  let Warning = warning;

  function postcss(...plugins) {
    if (plugins.length === 1 && Array.isArray(plugins[0])) {
      plugins = plugins[0];
    }
    return new Processor$3(plugins)
  }

  postcss.plugin = function plugin(name, initializer) {
    let warningPrinted = false;
    function creator(...args) {
      // eslint-disable-next-line no-console
      if (console && console.warn && !warningPrinted) {
        warningPrinted = true;
        // eslint-disable-next-line no-console
        console.warn(
          name +
            ': postcss.plugin was deprecated. Migration guide:\n' +
            'https://evilmartians.com/chronicles/postcss-8-plugin-migration'
        );
        if (process.env.LANG && process.env.LANG.startsWith('cn')) {
          /* c8 ignore next 7 */
          // eslint-disable-next-line no-console
          console.warn(
            name +
              ': 里面 postcss.plugin 被弃用. 迁移指南:\n' +
              'https://www.w3ctech.com/topic/2226'
          );
        }
      }
      let transformer = initializer(...args);
      transformer.postcssPlugin = name;
      transformer.postcssVersion = new Processor$3().version;
      return transformer
    }

    let cache;
    Object.defineProperty(creator, 'postcss', {
      get() {
        if (!cache) cache = creator();
        return cache
      }
    });

    creator.process = function (css, processOpts, pluginOpts) {
      return postcss([creator(pluginOpts)]).process(css, processOpts)
    };

    return creator
  };

  postcss.stringify = stringify$2;
  postcss.parse = parse$5;
  postcss.fromJSON = fromJSON;
  postcss.list = list$6;

  postcss.comment = defaults => new Comment(defaults);
  postcss.atRule = defaults => new AtRule$2(defaults);
  postcss.decl = defaults => new Declaration$K(defaults);
  postcss.rule = defaults => new Rule(defaults);
  postcss.root = defaults => new Root(defaults);
  postcss.document = defaults => new Document(defaults);

  postcss.CssSyntaxError = CssSyntaxError;
  postcss.Declaration = Declaration$K;
  postcss.Container = Container;
  postcss.Processor = Processor$3;
  postcss.Document = Document;
  postcss.Comment = Comment;
  postcss.Warning = Warning;
  postcss.AtRule = AtRule$2;
  postcss.Result = Result;
  postcss.Input = Input;
  postcss.Rule = Rule;
  postcss.Root = Root;
  postcss.Node = Node;

  LazyResult.registerPostcss(postcss);

  var postcss_1 = postcss;
  postcss.default = postcss;

  postcss_1.stringify;
  postcss_1.fromJSON;
  postcss_1.plugin;
  postcss_1.parse;
  postcss_1.list;

  postcss_1.document;
  postcss_1.comment;
  postcss_1.atRule;
  postcss_1.rule;
  postcss_1.decl;
  postcss_1.root;

  postcss_1.CssSyntaxError;
  postcss_1.Declaration;
  postcss_1.Container;
  postcss_1.Processor;
  postcss_1.Document;
  postcss_1.Comment;
  postcss_1.Warning;
  postcss_1.AtRule;
  postcss_1.Result;
  postcss_1.Input;
  postcss_1.Rule;
  postcss_1.Root;
  postcss_1.Node;

  var require$$0 = [
  	{
  		name: "nodejs",
  		version: "0.2.0",
  		date: "2011-08-26",
  		lts: false,
  		security: false,
  		v8: "2.3.8.0"
  	},
  	{
  		name: "nodejs",
  		version: "0.3.0",
  		date: "2011-08-26",
  		lts: false,
  		security: false,
  		v8: "2.5.1.0"
  	},
  	{
  		name: "nodejs",
  		version: "0.4.0",
  		date: "2011-08-26",
  		lts: false,
  		security: false,
  		v8: "3.1.2.0"
  	},
  	{
  		name: "nodejs",
  		version: "0.5.0",
  		date: "2011-08-26",
  		lts: false,
  		security: false,
  		v8: "3.1.8.25"
  	},
  	{
  		name: "nodejs",
  		version: "0.6.0",
  		date: "2011-11-04",
  		lts: false,
  		security: false,
  		v8: "3.6.6.6"
  	},
  	{
  		name: "nodejs",
  		version: "0.7.0",
  		date: "2012-01-17",
  		lts: false,
  		security: false,
  		v8: "3.8.6.0"
  	},
  	{
  		name: "nodejs",
  		version: "0.8.0",
  		date: "2012-06-22",
  		lts: false,
  		security: false,
  		v8: "3.11.10.10"
  	},
  	{
  		name: "nodejs",
  		version: "0.9.0",
  		date: "2012-07-20",
  		lts: false,
  		security: false,
  		v8: "3.11.10.15"
  	},
  	{
  		name: "nodejs",
  		version: "0.10.0",
  		date: "2013-03-11",
  		lts: false,
  		security: false,
  		v8: "3.14.5.8"
  	},
  	{
  		name: "nodejs",
  		version: "0.11.0",
  		date: "2013-03-28",
  		lts: false,
  		security: false,
  		v8: "3.17.13.0"
  	},
  	{
  		name: "nodejs",
  		version: "0.12.0",
  		date: "2015-02-06",
  		lts: false,
  		security: false,
  		v8: "3.28.73.0"
  	},
  	{
  		name: "nodejs",
  		version: "4.0.0",
  		date: "2015-09-08",
  		lts: false,
  		security: false,
  		v8: "4.5.103.30"
  	},
  	{
  		name: "nodejs",
  		version: "4.1.0",
  		date: "2015-09-17",
  		lts: false,
  		security: false,
  		v8: "4.5.103.33"
  	},
  	{
  		name: "nodejs",
  		version: "4.2.0",
  		date: "2015-10-12",
  		lts: "Argon",
  		security: false,
  		v8: "4.5.103.35"
  	},
  	{
  		name: "nodejs",
  		version: "4.3.0",
  		date: "2016-02-09",
  		lts: "Argon",
  		security: false,
  		v8: "4.5.103.35"
  	},
  	{
  		name: "nodejs",
  		version: "4.4.0",
  		date: "2016-03-08",
  		lts: "Argon",
  		security: false,
  		v8: "4.5.103.35"
  	},
  	{
  		name: "nodejs",
  		version: "4.5.0",
  		date: "2016-08-16",
  		lts: "Argon",
  		security: false,
  		v8: "4.5.103.37"
  	},
  	{
  		name: "nodejs",
  		version: "4.6.0",
  		date: "2016-09-27",
  		lts: "Argon",
  		security: true,
  		v8: "4.5.103.37"
  	},
  	{
  		name: "nodejs",
  		version: "4.7.0",
  		date: "2016-12-06",
  		lts: "Argon",
  		security: false,
  		v8: "4.5.103.43"
  	},
  	{
  		name: "nodejs",
  		version: "4.8.0",
  		date: "2017-02-21",
  		lts: "Argon",
  		security: false,
  		v8: "4.5.103.45"
  	},
  	{
  		name: "nodejs",
  		version: "4.9.0",
  		date: "2018-03-28",
  		lts: "Argon",
  		security: true,
  		v8: "4.5.103.53"
  	},
  	{
  		name: "nodejs",
  		version: "5.0.0",
  		date: "2015-10-29",
  		lts: false,
  		security: false,
  		v8: "4.6.85.28"
  	},
  	{
  		name: "nodejs",
  		version: "5.1.0",
  		date: "2015-11-17",
  		lts: false,
  		security: false,
  		v8: "4.6.85.31"
  	},
  	{
  		name: "nodejs",
  		version: "5.2.0",
  		date: "2015-12-09",
  		lts: false,
  		security: false,
  		v8: "4.6.85.31"
  	},
  	{
  		name: "nodejs",
  		version: "5.3.0",
  		date: "2015-12-15",
  		lts: false,
  		security: false,
  		v8: "4.6.85.31"
  	},
  	{
  		name: "nodejs",
  		version: "5.4.0",
  		date: "2016-01-06",
  		lts: false,
  		security: false,
  		v8: "4.6.85.31"
  	},
  	{
  		name: "nodejs",
  		version: "5.5.0",
  		date: "2016-01-21",
  		lts: false,
  		security: false,
  		v8: "4.6.85.31"
  	},
  	{
  		name: "nodejs",
  		version: "5.6.0",
  		date: "2016-02-09",
  		lts: false,
  		security: false,
  		v8: "4.6.85.31"
  	},
  	{
  		name: "nodejs",
  		version: "5.7.0",
  		date: "2016-02-23",
  		lts: false,
  		security: false,
  		v8: "4.6.85.31"
  	},
  	{
  		name: "nodejs",
  		version: "5.8.0",
  		date: "2016-03-09",
  		lts: false,
  		security: false,
  		v8: "4.6.85.31"
  	},
  	{
  		name: "nodejs",
  		version: "5.9.0",
  		date: "2016-03-16",
  		lts: false,
  		security: false,
  		v8: "4.6.85.31"
  	},
  	{
  		name: "nodejs",
  		version: "5.10.0",
  		date: "2016-04-01",
  		lts: false,
  		security: false,
  		v8: "4.6.85.31"
  	},
  	{
  		name: "nodejs",
  		version: "5.11.0",
  		date: "2016-04-21",
  		lts: false,
  		security: false,
  		v8: "4.6.85.31"
  	},
  	{
  		name: "nodejs",
  		version: "5.12.0",
  		date: "2016-06-23",
  		lts: false,
  		security: false,
  		v8: "4.6.85.32"
  	},
  	{
  		name: "nodejs",
  		version: "6.0.0",
  		date: "2016-04-26",
  		lts: false,
  		security: false,
  		v8: "5.0.71.35"
  	},
  	{
  		name: "nodejs",
  		version: "6.1.0",
  		date: "2016-05-05",
  		lts: false,
  		security: false,
  		v8: "5.0.71.35"
  	},
  	{
  		name: "nodejs",
  		version: "6.2.0",
  		date: "2016-05-17",
  		lts: false,
  		security: false,
  		v8: "5.0.71.47"
  	},
  	{
  		name: "nodejs",
  		version: "6.3.0",
  		date: "2016-07-06",
  		lts: false,
  		security: false,
  		v8: "5.0.71.52"
  	},
  	{
  		name: "nodejs",
  		version: "6.4.0",
  		date: "2016-08-12",
  		lts: false,
  		security: false,
  		v8: "5.0.71.60"
  	},
  	{
  		name: "nodejs",
  		version: "6.5.0",
  		date: "2016-08-26",
  		lts: false,
  		security: false,
  		v8: "5.1.281.81"
  	},
  	{
  		name: "nodejs",
  		version: "6.6.0",
  		date: "2016-09-14",
  		lts: false,
  		security: false,
  		v8: "5.1.281.83"
  	},
  	{
  		name: "nodejs",
  		version: "6.7.0",
  		date: "2016-09-27",
  		lts: false,
  		security: true,
  		v8: "5.1.281.83"
  	},
  	{
  		name: "nodejs",
  		version: "6.8.0",
  		date: "2016-10-12",
  		lts: false,
  		security: false,
  		v8: "5.1.281.84"
  	},
  	{
  		name: "nodejs",
  		version: "6.9.0",
  		date: "2016-10-18",
  		lts: "Boron",
  		security: false,
  		v8: "5.1.281.84"
  	},
  	{
  		name: "nodejs",
  		version: "6.10.0",
  		date: "2017-02-21",
  		lts: "Boron",
  		security: false,
  		v8: "5.1.281.93"
  	},
  	{
  		name: "nodejs",
  		version: "6.11.0",
  		date: "2017-06-06",
  		lts: "Boron",
  		security: false,
  		v8: "5.1.281.102"
  	},
  	{
  		name: "nodejs",
  		version: "6.12.0",
  		date: "2017-11-06",
  		lts: "Boron",
  		security: false,
  		v8: "5.1.281.108"
  	},
  	{
  		name: "nodejs",
  		version: "6.13.0",
  		date: "2018-02-10",
  		lts: "Boron",
  		security: false,
  		v8: "5.1.281.111"
  	},
  	{
  		name: "nodejs",
  		version: "6.14.0",
  		date: "2018-03-28",
  		lts: "Boron",
  		security: true,
  		v8: "5.1.281.111"
  	},
  	{
  		name: "nodejs",
  		version: "6.15.0",
  		date: "2018-11-27",
  		lts: "Boron",
  		security: true,
  		v8: "5.1.281.111"
  	},
  	{
  		name: "nodejs",
  		version: "6.16.0",
  		date: "2018-12-26",
  		lts: "Boron",
  		security: false,
  		v8: "5.1.281.111"
  	},
  	{
  		name: "nodejs",
  		version: "6.17.0",
  		date: "2019-02-28",
  		lts: "Boron",
  		security: true,
  		v8: "5.1.281.111"
  	},
  	{
  		name: "nodejs",
  		version: "7.0.0",
  		date: "2016-10-25",
  		lts: false,
  		security: false,
  		v8: "5.4.500.36"
  	},
  	{
  		name: "nodejs",
  		version: "7.1.0",
  		date: "2016-11-08",
  		lts: false,
  		security: false,
  		v8: "5.4.500.36"
  	},
  	{
  		name: "nodejs",
  		version: "7.2.0",
  		date: "2016-11-22",
  		lts: false,
  		security: false,
  		v8: "5.4.500.43"
  	},
  	{
  		name: "nodejs",
  		version: "7.3.0",
  		date: "2016-12-20",
  		lts: false,
  		security: false,
  		v8: "5.4.500.45"
  	},
  	{
  		name: "nodejs",
  		version: "7.4.0",
  		date: "2017-01-04",
  		lts: false,
  		security: false,
  		v8: "5.4.500.45"
  	},
  	{
  		name: "nodejs",
  		version: "7.5.0",
  		date: "2017-01-31",
  		lts: false,
  		security: false,
  		v8: "5.4.500.48"
  	},
  	{
  		name: "nodejs",
  		version: "7.6.0",
  		date: "2017-02-21",
  		lts: false,
  		security: false,
  		v8: "5.5.372.40"
  	},
  	{
  		name: "nodejs",
  		version: "7.7.0",
  		date: "2017-02-28",
  		lts: false,
  		security: false,
  		v8: "5.5.372.41"
  	},
  	{
  		name: "nodejs",
  		version: "7.8.0",
  		date: "2017-03-29",
  		lts: false,
  		security: false,
  		v8: "5.5.372.43"
  	},
  	{
  		name: "nodejs",
  		version: "7.9.0",
  		date: "2017-04-11",
  		lts: false,
  		security: false,
  		v8: "5.5.372.43"
  	},
  	{
  		name: "nodejs",
  		version: "7.10.0",
  		date: "2017-05-02",
  		lts: false,
  		security: false,
  		v8: "5.5.372.43"
  	},
  	{
  		name: "nodejs",
  		version: "8.0.0",
  		date: "2017-05-30",
  		lts: false,
  		security: false,
  		v8: "5.8.283.41"
  	},
  	{
  		name: "nodejs",
  		version: "8.1.0",
  		date: "2017-06-08",
  		lts: false,
  		security: false,
  		v8: "5.8.283.41"
  	},
  	{
  		name: "nodejs",
  		version: "8.2.0",
  		date: "2017-07-19",
  		lts: false,
  		security: false,
  		v8: "5.8.283.41"
  	},
  	{
  		name: "nodejs",
  		version: "8.3.0",
  		date: "2017-08-08",
  		lts: false,
  		security: false,
  		v8: "6.0.286.52"
  	},
  	{
  		name: "nodejs",
  		version: "8.4.0",
  		date: "2017-08-15",
  		lts: false,
  		security: false,
  		v8: "6.0.286.52"
  	},
  	{
  		name: "nodejs",
  		version: "8.5.0",
  		date: "2017-09-12",
  		lts: false,
  		security: false,
  		v8: "6.0.287.53"
  	},
  	{
  		name: "nodejs",
  		version: "8.6.0",
  		date: "2017-09-26",
  		lts: false,
  		security: false,
  		v8: "6.0.287.53"
  	},
  	{
  		name: "nodejs",
  		version: "8.7.0",
  		date: "2017-10-11",
  		lts: false,
  		security: false,
  		v8: "6.1.534.42"
  	},
  	{
  		name: "nodejs",
  		version: "8.8.0",
  		date: "2017-10-24",
  		lts: false,
  		security: false,
  		v8: "6.1.534.42"
  	},
  	{
  		name: "nodejs",
  		version: "8.9.0",
  		date: "2017-10-31",
  		lts: "Carbon",
  		security: false,
  		v8: "6.1.534.46"
  	},
  	{
  		name: "nodejs",
  		version: "8.10.0",
  		date: "2018-03-06",
  		lts: "Carbon",
  		security: false,
  		v8: "6.2.414.50"
  	},
  	{
  		name: "nodejs",
  		version: "8.11.0",
  		date: "2018-03-28",
  		lts: "Carbon",
  		security: true,
  		v8: "6.2.414.50"
  	},
  	{
  		name: "nodejs",
  		version: "8.12.0",
  		date: "2018-09-10",
  		lts: "Carbon",
  		security: false,
  		v8: "6.2.414.66"
  	},
  	{
  		name: "nodejs",
  		version: "8.13.0",
  		date: "2018-11-20",
  		lts: "Carbon",
  		security: false,
  		v8: "6.2.414.72"
  	},
  	{
  		name: "nodejs",
  		version: "8.14.0",
  		date: "2018-11-27",
  		lts: "Carbon",
  		security: true,
  		v8: "6.2.414.72"
  	},
  	{
  		name: "nodejs",
  		version: "8.15.0",
  		date: "2018-12-26",
  		lts: "Carbon",
  		security: false,
  		v8: "6.2.414.75"
  	},
  	{
  		name: "nodejs",
  		version: "8.16.0",
  		date: "2019-04-16",
  		lts: "Carbon",
  		security: false,
  		v8: "6.2.414.77"
  	},
  	{
  		name: "nodejs",
  		version: "8.17.0",
  		date: "2019-12-17",
  		lts: "Carbon",
  		security: true,
  		v8: "6.2.414.78"
  	},
  	{
  		name: "nodejs",
  		version: "9.0.0",
  		date: "2017-10-31",
  		lts: false,
  		security: false,
  		v8: "6.2.414.32"
  	},
  	{
  		name: "nodejs",
  		version: "9.1.0",
  		date: "2017-11-07",
  		lts: false,
  		security: false,
  		v8: "6.2.414.32"
  	},
  	{
  		name: "nodejs",
  		version: "9.2.0",
  		date: "2017-11-14",
  		lts: false,
  		security: false,
  		v8: "6.2.414.44"
  	},
  	{
  		name: "nodejs",
  		version: "9.3.0",
  		date: "2017-12-12",
  		lts: false,
  		security: false,
  		v8: "6.2.414.46"
  	},
  	{
  		name: "nodejs",
  		version: "9.4.0",
  		date: "2018-01-10",
  		lts: false,
  		security: false,
  		v8: "6.2.414.46"
  	},
  	{
  		name: "nodejs",
  		version: "9.5.0",
  		date: "2018-01-31",
  		lts: false,
  		security: false,
  		v8: "6.2.414.46"
  	},
  	{
  		name: "nodejs",
  		version: "9.6.0",
  		date: "2018-02-21",
  		lts: false,
  		security: false,
  		v8: "6.2.414.46"
  	},
  	{
  		name: "nodejs",
  		version: "9.7.0",
  		date: "2018-03-01",
  		lts: false,
  		security: false,
  		v8: "6.2.414.46"
  	},
  	{
  		name: "nodejs",
  		version: "9.8.0",
  		date: "2018-03-07",
  		lts: false,
  		security: false,
  		v8: "6.2.414.46"
  	},
  	{
  		name: "nodejs",
  		version: "9.9.0",
  		date: "2018-03-21",
  		lts: false,
  		security: false,
  		v8: "6.2.414.46"
  	},
  	{
  		name: "nodejs",
  		version: "9.10.0",
  		date: "2018-03-28",
  		lts: false,
  		security: true,
  		v8: "6.2.414.46"
  	},
  	{
  		name: "nodejs",
  		version: "9.11.0",
  		date: "2018-04-04",
  		lts: false,
  		security: false,
  		v8: "6.2.414.46"
  	},
  	{
  		name: "nodejs",
  		version: "10.0.0",
  		date: "2018-04-24",
  		lts: false,
  		security: false,
  		v8: "6.6.346.24"
  	},
  	{
  		name: "nodejs",
  		version: "10.1.0",
  		date: "2018-05-08",
  		lts: false,
  		security: false,
  		v8: "6.6.346.27"
  	},
  	{
  		name: "nodejs",
  		version: "10.2.0",
  		date: "2018-05-23",
  		lts: false,
  		security: false,
  		v8: "6.6.346.32"
  	},
  	{
  		name: "nodejs",
  		version: "10.3.0",
  		date: "2018-05-29",
  		lts: false,
  		security: false,
  		v8: "6.6.346.32"
  	},
  	{
  		name: "nodejs",
  		version: "10.4.0",
  		date: "2018-06-06",
  		lts: false,
  		security: false,
  		v8: "6.7.288.43"
  	},
  	{
  		name: "nodejs",
  		version: "10.5.0",
  		date: "2018-06-20",
  		lts: false,
  		security: false,
  		v8: "6.7.288.46"
  	},
  	{
  		name: "nodejs",
  		version: "10.6.0",
  		date: "2018-07-04",
  		lts: false,
  		security: false,
  		v8: "6.7.288.46"
  	},
  	{
  		name: "nodejs",
  		version: "10.7.0",
  		date: "2018-07-18",
  		lts: false,
  		security: false,
  		v8: "6.7.288.49"
  	},
  	{
  		name: "nodejs",
  		version: "10.8.0",
  		date: "2018-08-01",
  		lts: false,
  		security: false,
  		v8: "6.7.288.49"
  	},
  	{
  		name: "nodejs",
  		version: "10.9.0",
  		date: "2018-08-15",
  		lts: false,
  		security: false,
  		v8: "6.8.275.24"
  	},
  	{
  		name: "nodejs",
  		version: "10.10.0",
  		date: "2018-09-06",
  		lts: false,
  		security: false,
  		v8: "6.8.275.30"
  	},
  	{
  		name: "nodejs",
  		version: "10.11.0",
  		date: "2018-09-19",
  		lts: false,
  		security: false,
  		v8: "6.8.275.32"
  	},
  	{
  		name: "nodejs",
  		version: "10.12.0",
  		date: "2018-10-10",
  		lts: false,
  		security: false,
  		v8: "6.8.275.32"
  	},
  	{
  		name: "nodejs",
  		version: "10.13.0",
  		date: "2018-10-30",
  		lts: "Dubnium",
  		security: false,
  		v8: "6.8.275.32"
  	},
  	{
  		name: "nodejs",
  		version: "10.14.0",
  		date: "2018-11-27",
  		lts: "Dubnium",
  		security: true,
  		v8: "6.8.275.32"
  	},
  	{
  		name: "nodejs",
  		version: "10.15.0",
  		date: "2018-12-26",
  		lts: "Dubnium",
  		security: false,
  		v8: "6.8.275.32"
  	},
  	{
  		name: "nodejs",
  		version: "10.16.0",
  		date: "2019-05-28",
  		lts: "Dubnium",
  		security: false,
  		v8: "6.8.275.32"
  	},
  	{
  		name: "nodejs",
  		version: "10.17.0",
  		date: "2019-10-22",
  		lts: "Dubnium",
  		security: false,
  		v8: "6.8.275.32"
  	},
  	{
  		name: "nodejs",
  		version: "10.18.0",
  		date: "2019-12-17",
  		lts: "Dubnium",
  		security: true,
  		v8: "6.8.275.32"
  	},
  	{
  		name: "nodejs",
  		version: "10.19.0",
  		date: "2020-02-05",
  		lts: "Dubnium",
  		security: true,
  		v8: "6.8.275.32"
  	},
  	{
  		name: "nodejs",
  		version: "10.20.0",
  		date: "2020-03-26",
  		lts: "Dubnium",
  		security: false,
  		v8: "6.8.275.32"
  	},
  	{
  		name: "nodejs",
  		version: "10.21.0",
  		date: "2020-06-02",
  		lts: "Dubnium",
  		security: true,
  		v8: "6.8.275.32"
  	},
  	{
  		name: "nodejs",
  		version: "10.22.0",
  		date: "2020-07-21",
  		lts: "Dubnium",
  		security: false,
  		v8: "6.8.275.32"
  	},
  	{
  		name: "nodejs",
  		version: "10.23.0",
  		date: "2020-10-27",
  		lts: "Dubnium",
  		security: false,
  		v8: "6.8.275.32"
  	},
  	{
  		name: "nodejs",
  		version: "10.24.0",
  		date: "2021-02-23",
  		lts: "Dubnium",
  		security: true,
  		v8: "6.8.275.32"
  	},
  	{
  		name: "nodejs",
  		version: "11.0.0",
  		date: "2018-10-23",
  		lts: false,
  		security: false,
  		v8: "7.0.276.28"
  	},
  	{
  		name: "nodejs",
  		version: "11.1.0",
  		date: "2018-10-30",
  		lts: false,
  		security: false,
  		v8: "7.0.276.32"
  	},
  	{
  		name: "nodejs",
  		version: "11.2.0",
  		date: "2018-11-15",
  		lts: false,
  		security: false,
  		v8: "7.0.276.38"
  	},
  	{
  		name: "nodejs",
  		version: "11.3.0",
  		date: "2018-11-27",
  		lts: false,
  		security: true,
  		v8: "7.0.276.38"
  	},
  	{
  		name: "nodejs",
  		version: "11.4.0",
  		date: "2018-12-07",
  		lts: false,
  		security: false,
  		v8: "7.0.276.38"
  	},
  	{
  		name: "nodejs",
  		version: "11.5.0",
  		date: "2018-12-18",
  		lts: false,
  		security: false,
  		v8: "7.0.276.38"
  	},
  	{
  		name: "nodejs",
  		version: "11.6.0",
  		date: "2018-12-26",
  		lts: false,
  		security: false,
  		v8: "7.0.276.38"
  	},
  	{
  		name: "nodejs",
  		version: "11.7.0",
  		date: "2019-01-17",
  		lts: false,
  		security: false,
  		v8: "7.0.276.38"
  	},
  	{
  		name: "nodejs",
  		version: "11.8.0",
  		date: "2019-01-24",
  		lts: false,
  		security: false,
  		v8: "7.0.276.38"
  	},
  	{
  		name: "nodejs",
  		version: "11.9.0",
  		date: "2019-01-30",
  		lts: false,
  		security: false,
  		v8: "7.0.276.38"
  	},
  	{
  		name: "nodejs",
  		version: "11.10.0",
  		date: "2019-02-14",
  		lts: false,
  		security: false,
  		v8: "7.0.276.38"
  	},
  	{
  		name: "nodejs",
  		version: "11.11.0",
  		date: "2019-03-05",
  		lts: false,
  		security: false,
  		v8: "7.0.276.38"
  	},
  	{
  		name: "nodejs",
  		version: "11.12.0",
  		date: "2019-03-14",
  		lts: false,
  		security: false,
  		v8: "7.0.276.38"
  	},
  	{
  		name: "nodejs",
  		version: "11.13.0",
  		date: "2019-03-28",
  		lts: false,
  		security: false,
  		v8: "7.0.276.38"
  	},
  	{
  		name: "nodejs",
  		version: "11.14.0",
  		date: "2019-04-10",
  		lts: false,
  		security: false,
  		v8: "7.0.276.38"
  	},
  	{
  		name: "nodejs",
  		version: "11.15.0",
  		date: "2019-04-30",
  		lts: false,
  		security: false,
  		v8: "7.0.276.38"
  	},
  	{
  		name: "nodejs",
  		version: "12.0.0",
  		date: "2019-04-23",
  		lts: false,
  		security: false,
  		v8: "7.4.288.21"
  	},
  	{
  		name: "nodejs",
  		version: "12.1.0",
  		date: "2019-04-29",
  		lts: false,
  		security: false,
  		v8: "7.4.288.21"
  	},
  	{
  		name: "nodejs",
  		version: "12.2.0",
  		date: "2019-05-07",
  		lts: false,
  		security: false,
  		v8: "7.4.288.21"
  	},
  	{
  		name: "nodejs",
  		version: "12.3.0",
  		date: "2019-05-21",
  		lts: false,
  		security: false,
  		v8: "7.4.288.27"
  	},
  	{
  		name: "nodejs",
  		version: "12.4.0",
  		date: "2019-06-04",
  		lts: false,
  		security: false,
  		v8: "7.4.288.27"
  	},
  	{
  		name: "nodejs",
  		version: "12.5.0",
  		date: "2019-06-26",
  		lts: false,
  		security: false,
  		v8: "7.5.288.22"
  	},
  	{
  		name: "nodejs",
  		version: "12.6.0",
  		date: "2019-07-03",
  		lts: false,
  		security: false,
  		v8: "7.5.288.22"
  	},
  	{
  		name: "nodejs",
  		version: "12.7.0",
  		date: "2019-07-23",
  		lts: false,
  		security: false,
  		v8: "7.5.288.22"
  	},
  	{
  		name: "nodejs",
  		version: "12.8.0",
  		date: "2019-08-06",
  		lts: false,
  		security: false,
  		v8: "7.5.288.22"
  	},
  	{
  		name: "nodejs",
  		version: "12.9.0",
  		date: "2019-08-20",
  		lts: false,
  		security: false,
  		v8: "7.6.303.29"
  	},
  	{
  		name: "nodejs",
  		version: "12.10.0",
  		date: "2019-09-04",
  		lts: false,
  		security: false,
  		v8: "7.6.303.29"
  	},
  	{
  		name: "nodejs",
  		version: "12.11.0",
  		date: "2019-09-25",
  		lts: false,
  		security: false,
  		v8: "7.7.299.11"
  	},
  	{
  		name: "nodejs",
  		version: "12.12.0",
  		date: "2019-10-11",
  		lts: false,
  		security: false,
  		v8: "7.7.299.13"
  	},
  	{
  		name: "nodejs",
  		version: "12.13.0",
  		date: "2019-10-21",
  		lts: "Erbium",
  		security: false,
  		v8: "7.7.299.13"
  	},
  	{
  		name: "nodejs",
  		version: "12.14.0",
  		date: "2019-12-17",
  		lts: "Erbium",
  		security: true,
  		v8: "7.7.299.13"
  	},
  	{
  		name: "nodejs",
  		version: "12.15.0",
  		date: "2020-02-05",
  		lts: "Erbium",
  		security: true,
  		v8: "7.7.299.13"
  	},
  	{
  		name: "nodejs",
  		version: "12.16.0",
  		date: "2020-02-11",
  		lts: "Erbium",
  		security: false,
  		v8: "7.8.279.23"
  	},
  	{
  		name: "nodejs",
  		version: "12.17.0",
  		date: "2020-05-26",
  		lts: "Erbium",
  		security: false,
  		v8: "7.8.279.23"
  	},
  	{
  		name: "nodejs",
  		version: "12.18.0",
  		date: "2020-06-02",
  		lts: "Erbium",
  		security: true,
  		v8: "7.8.279.23"
  	},
  	{
  		name: "nodejs",
  		version: "12.19.0",
  		date: "2020-10-06",
  		lts: "Erbium",
  		security: false,
  		v8: "7.8.279.23"
  	},
  	{
  		name: "nodejs",
  		version: "12.20.0",
  		date: "2020-11-24",
  		lts: "Erbium",
  		security: false,
  		v8: "7.8.279.23"
  	},
  	{
  		name: "nodejs",
  		version: "12.21.0",
  		date: "2021-02-23",
  		lts: "Erbium",
  		security: true,
  		v8: "7.8.279.23"
  	},
  	{
  		name: "nodejs",
  		version: "12.22.0",
  		date: "2021-03-30",
  		lts: "Erbium",
  		security: false,
  		v8: "7.8.279.23"
  	},
  	{
  		name: "nodejs",
  		version: "13.0.0",
  		date: "2019-10-22",
  		lts: false,
  		security: false,
  		v8: "7.8.279.17"
  	},
  	{
  		name: "nodejs",
  		version: "13.1.0",
  		date: "2019-11-05",
  		lts: false,
  		security: false,
  		v8: "7.8.279.17"
  	},
  	{
  		name: "nodejs",
  		version: "13.2.0",
  		date: "2019-11-21",
  		lts: false,
  		security: false,
  		v8: "7.9.317.23"
  	},
  	{
  		name: "nodejs",
  		version: "13.3.0",
  		date: "2019-12-03",
  		lts: false,
  		security: false,
  		v8: "7.9.317.25"
  	},
  	{
  		name: "nodejs",
  		version: "13.4.0",
  		date: "2019-12-17",
  		lts: false,
  		security: true,
  		v8: "7.9.317.25"
  	},
  	{
  		name: "nodejs",
  		version: "13.5.0",
  		date: "2019-12-18",
  		lts: false,
  		security: false,
  		v8: "7.9.317.25"
  	},
  	{
  		name: "nodejs",
  		version: "13.6.0",
  		date: "2020-01-07",
  		lts: false,
  		security: false,
  		v8: "7.9.317.25"
  	},
  	{
  		name: "nodejs",
  		version: "13.7.0",
  		date: "2020-01-21",
  		lts: false,
  		security: false,
  		v8: "7.9.317.25"
  	},
  	{
  		name: "nodejs",
  		version: "13.8.0",
  		date: "2020-02-05",
  		lts: false,
  		security: true,
  		v8: "7.9.317.25"
  	},
  	{
  		name: "nodejs",
  		version: "13.9.0",
  		date: "2020-02-18",
  		lts: false,
  		security: false,
  		v8: "7.9.317.25"
  	},
  	{
  		name: "nodejs",
  		version: "13.10.0",
  		date: "2020-03-04",
  		lts: false,
  		security: false,
  		v8: "7.9.317.25"
  	},
  	{
  		name: "nodejs",
  		version: "13.11.0",
  		date: "2020-03-12",
  		lts: false,
  		security: false,
  		v8: "7.9.317.25"
  	},
  	{
  		name: "nodejs",
  		version: "13.12.0",
  		date: "2020-03-26",
  		lts: false,
  		security: false,
  		v8: "7.9.317.25"
  	},
  	{
  		name: "nodejs",
  		version: "13.13.0",
  		date: "2020-04-14",
  		lts: false,
  		security: false,
  		v8: "7.9.317.25"
  	},
  	{
  		name: "nodejs",
  		version: "13.14.0",
  		date: "2020-04-29",
  		lts: false,
  		security: false,
  		v8: "7.9.317.25"
  	},
  	{
  		name: "nodejs",
  		version: "14.0.0",
  		date: "2020-04-21",
  		lts: false,
  		security: false,
  		v8: "8.1.307.30"
  	},
  	{
  		name: "nodejs",
  		version: "14.1.0",
  		date: "2020-04-29",
  		lts: false,
  		security: false,
  		v8: "8.1.307.31"
  	},
  	{
  		name: "nodejs",
  		version: "14.2.0",
  		date: "2020-05-05",
  		lts: false,
  		security: false,
  		v8: "8.1.307.31"
  	},
  	{
  		name: "nodejs",
  		version: "14.3.0",
  		date: "2020-05-19",
  		lts: false,
  		security: false,
  		v8: "8.1.307.31"
  	},
  	{
  		name: "nodejs",
  		version: "14.4.0",
  		date: "2020-06-02",
  		lts: false,
  		security: true,
  		v8: "8.1.307.31"
  	},
  	{
  		name: "nodejs",
  		version: "14.5.0",
  		date: "2020-06-30",
  		lts: false,
  		security: false,
  		v8: "8.3.110.9"
  	},
  	{
  		name: "nodejs",
  		version: "14.6.0",
  		date: "2020-07-20",
  		lts: false,
  		security: false,
  		v8: "8.4.371.19"
  	},
  	{
  		name: "nodejs",
  		version: "14.7.0",
  		date: "2020-07-29",
  		lts: false,
  		security: false,
  		v8: "8.4.371.19"
  	},
  	{
  		name: "nodejs",
  		version: "14.8.0",
  		date: "2020-08-11",
  		lts: false,
  		security: false,
  		v8: "8.4.371.19"
  	},
  	{
  		name: "nodejs",
  		version: "14.9.0",
  		date: "2020-08-27",
  		lts: false,
  		security: false,
  		v8: "8.4.371.19"
  	},
  	{
  		name: "nodejs",
  		version: "14.10.0",
  		date: "2020-09-08",
  		lts: false,
  		security: false,
  		v8: "8.4.371.19"
  	},
  	{
  		name: "nodejs",
  		version: "14.11.0",
  		date: "2020-09-15",
  		lts: false,
  		security: true,
  		v8: "8.4.371.19"
  	},
  	{
  		name: "nodejs",
  		version: "14.12.0",
  		date: "2020-09-22",
  		lts: false,
  		security: false,
  		v8: "8.4.371.19"
  	},
  	{
  		name: "nodejs",
  		version: "14.13.0",
  		date: "2020-09-29",
  		lts: false,
  		security: false,
  		v8: "8.4.371.19"
  	},
  	{
  		name: "nodejs",
  		version: "14.14.0",
  		date: "2020-10-15",
  		lts: false,
  		security: false,
  		v8: "8.4.371.19"
  	},
  	{
  		name: "nodejs",
  		version: "14.15.0",
  		date: "2020-10-27",
  		lts: "Fermium",
  		security: false,
  		v8: "8.4.371.19"
  	},
  	{
  		name: "nodejs",
  		version: "14.16.0",
  		date: "2021-02-23",
  		lts: "Fermium",
  		security: true,
  		v8: "8.4.371.19"
  	},
  	{
  		name: "nodejs",
  		version: "14.17.0",
  		date: "2021-05-11",
  		lts: "Fermium",
  		security: false,
  		v8: "8.4.371.23"
  	},
  	{
  		name: "nodejs",
  		version: "14.18.0",
  		date: "2021-09-28",
  		lts: "Fermium",
  		security: false,
  		v8: "8.4.371.23"
  	},
  	{
  		name: "nodejs",
  		version: "14.19.0",
  		date: "2022-02-01",
  		lts: "Fermium",
  		security: false,
  		v8: "8.4.371.23"
  	},
  	{
  		name: "nodejs",
  		version: "14.20.0",
  		date: "2022-07-07",
  		lts: "Fermium",
  		security: true,
  		v8: "8.4.371.23"
  	},
  	{
  		name: "nodejs",
  		version: "14.21.0",
  		date: "2022-11-01",
  		lts: "Fermium",
  		security: false,
  		v8: "8.4.371.23"
  	},
  	{
  		name: "nodejs",
  		version: "15.0.0",
  		date: "2020-10-20",
  		lts: false,
  		security: false,
  		v8: "8.6.395.16"
  	},
  	{
  		name: "nodejs",
  		version: "15.1.0",
  		date: "2020-11-04",
  		lts: false,
  		security: false,
  		v8: "8.6.395.17"
  	},
  	{
  		name: "nodejs",
  		version: "15.2.0",
  		date: "2020-11-10",
  		lts: false,
  		security: false,
  		v8: "8.6.395.17"
  	},
  	{
  		name: "nodejs",
  		version: "15.3.0",
  		date: "2020-11-24",
  		lts: false,
  		security: false,
  		v8: "8.6.395.17"
  	},
  	{
  		name: "nodejs",
  		version: "15.4.0",
  		date: "2020-12-09",
  		lts: false,
  		security: false,
  		v8: "8.6.395.17"
  	},
  	{
  		name: "nodejs",
  		version: "15.5.0",
  		date: "2020-12-22",
  		lts: false,
  		security: false,
  		v8: "8.6.395.17"
  	},
  	{
  		name: "nodejs",
  		version: "15.6.0",
  		date: "2021-01-14",
  		lts: false,
  		security: false,
  		v8: "8.6.395.17"
  	},
  	{
  		name: "nodejs",
  		version: "15.7.0",
  		date: "2021-01-25",
  		lts: false,
  		security: false,
  		v8: "8.6.395.17"
  	},
  	{
  		name: "nodejs",
  		version: "15.8.0",
  		date: "2021-02-02",
  		lts: false,
  		security: false,
  		v8: "8.6.395.17"
  	},
  	{
  		name: "nodejs",
  		version: "15.9.0",
  		date: "2021-02-18",
  		lts: false,
  		security: false,
  		v8: "8.6.395.17"
  	},
  	{
  		name: "nodejs",
  		version: "15.10.0",
  		date: "2021-02-23",
  		lts: false,
  		security: true,
  		v8: "8.6.395.17"
  	},
  	{
  		name: "nodejs",
  		version: "15.11.0",
  		date: "2021-03-03",
  		lts: false,
  		security: false,
  		v8: "8.6.395.17"
  	},
  	{
  		name: "nodejs",
  		version: "15.12.0",
  		date: "2021-03-17",
  		lts: false,
  		security: false,
  		v8: "8.6.395.17"
  	},
  	{
  		name: "nodejs",
  		version: "15.13.0",
  		date: "2021-03-31",
  		lts: false,
  		security: false,
  		v8: "8.6.395.17"
  	},
  	{
  		name: "nodejs",
  		version: "15.14.0",
  		date: "2021-04-06",
  		lts: false,
  		security: false,
  		v8: "8.6.395.17"
  	},
  	{
  		name: "nodejs",
  		version: "16.0.0",
  		date: "2021-04-20",
  		lts: false,
  		security: false,
  		v8: "9.0.257.17"
  	},
  	{
  		name: "nodejs",
  		version: "16.1.0",
  		date: "2021-05-04",
  		lts: false,
  		security: false,
  		v8: "9.0.257.24"
  	},
  	{
  		name: "nodejs",
  		version: "16.2.0",
  		date: "2021-05-19",
  		lts: false,
  		security: false,
  		v8: "9.0.257.25"
  	},
  	{
  		name: "nodejs",
  		version: "16.3.0",
  		date: "2021-06-03",
  		lts: false,
  		security: false,
  		v8: "9.0.257.25"
  	},
  	{
  		name: "nodejs",
  		version: "16.4.0",
  		date: "2021-06-23",
  		lts: false,
  		security: false,
  		v8: "9.1.269.36"
  	},
  	{
  		name: "nodejs",
  		version: "16.5.0",
  		date: "2021-07-14",
  		lts: false,
  		security: false,
  		v8: "9.1.269.38"
  	},
  	{
  		name: "nodejs",
  		version: "16.6.0",
  		date: "2021-07-29",
  		lts: false,
  		security: true,
  		v8: "9.2.230.21"
  	},
  	{
  		name: "nodejs",
  		version: "16.7.0",
  		date: "2021-08-18",
  		lts: false,
  		security: false,
  		v8: "9.2.230.21"
  	},
  	{
  		name: "nodejs",
  		version: "16.8.0",
  		date: "2021-08-25",
  		lts: false,
  		security: false,
  		v8: "9.2.230.21"
  	},
  	{
  		name: "nodejs",
  		version: "16.9.0",
  		date: "2021-09-07",
  		lts: false,
  		security: false,
  		v8: "9.3.345.16"
  	},
  	{
  		name: "nodejs",
  		version: "16.10.0",
  		date: "2021-09-22",
  		lts: false,
  		security: false,
  		v8: "9.3.345.19"
  	},
  	{
  		name: "nodejs",
  		version: "16.11.0",
  		date: "2021-10-08",
  		lts: false,
  		security: false,
  		v8: "9.4.146.19"
  	},
  	{
  		name: "nodejs",
  		version: "16.12.0",
  		date: "2021-10-20",
  		lts: false,
  		security: false,
  		v8: "9.4.146.19"
  	},
  	{
  		name: "nodejs",
  		version: "16.13.0",
  		date: "2021-10-26",
  		lts: "Gallium",
  		security: false,
  		v8: "9.4.146.19"
  	},
  	{
  		name: "nodejs",
  		version: "16.14.0",
  		date: "2022-02-08",
  		lts: "Gallium",
  		security: false,
  		v8: "9.4.146.24"
  	},
  	{
  		name: "nodejs",
  		version: "16.15.0",
  		date: "2022-04-26",
  		lts: "Gallium",
  		security: false,
  		v8: "9.4.146.24"
  	},
  	{
  		name: "nodejs",
  		version: "16.16.0",
  		date: "2022-07-07",
  		lts: "Gallium",
  		security: true,
  		v8: "9.4.146.24"
  	},
  	{
  		name: "nodejs",
  		version: "16.17.0",
  		date: "2022-08-16",
  		lts: "Gallium",
  		security: false,
  		v8: "9.4.146.26"
  	},
  	{
  		name: "nodejs",
  		version: "16.18.0",
  		date: "2022-10-12",
  		lts: "Gallium",
  		security: false,
  		v8: "9.4.146.26"
  	},
  	{
  		name: "nodejs",
  		version: "16.19.0",
  		date: "2022-12-13",
  		lts: "Gallium",
  		security: false,
  		v8: "9.4.146.26"
  	},
  	{
  		name: "nodejs",
  		version: "16.20.0",
  		date: "2023-03-28",
  		lts: "Gallium",
  		security: false,
  		v8: "9.4.146.26"
  	},
  	{
  		name: "nodejs",
  		version: "17.0.0",
  		date: "2021-10-19",
  		lts: false,
  		security: false,
  		v8: "9.5.172.21"
  	},
  	{
  		name: "nodejs",
  		version: "17.1.0",
  		date: "2021-11-09",
  		lts: false,
  		security: false,
  		v8: "9.5.172.25"
  	},
  	{
  		name: "nodejs",
  		version: "17.2.0",
  		date: "2021-11-30",
  		lts: false,
  		security: false,
  		v8: "9.6.180.14"
  	},
  	{
  		name: "nodejs",
  		version: "17.3.0",
  		date: "2021-12-17",
  		lts: false,
  		security: false,
  		v8: "9.6.180.15"
  	},
  	{
  		name: "nodejs",
  		version: "17.4.0",
  		date: "2022-01-18",
  		lts: false,
  		security: false,
  		v8: "9.6.180.15"
  	},
  	{
  		name: "nodejs",
  		version: "17.5.0",
  		date: "2022-02-10",
  		lts: false,
  		security: false,
  		v8: "9.6.180.15"
  	},
  	{
  		name: "nodejs",
  		version: "17.6.0",
  		date: "2022-02-22",
  		lts: false,
  		security: false,
  		v8: "9.6.180.15"
  	},
  	{
  		name: "nodejs",
  		version: "17.7.0",
  		date: "2022-03-09",
  		lts: false,
  		security: false,
  		v8: "9.6.180.15"
  	},
  	{
  		name: "nodejs",
  		version: "17.8.0",
  		date: "2022-03-22",
  		lts: false,
  		security: false,
  		v8: "9.6.180.15"
  	},
  	{
  		name: "nodejs",
  		version: "17.9.0",
  		date: "2022-04-07",
  		lts: false,
  		security: false,
  		v8: "9.6.180.15"
  	},
  	{
  		name: "nodejs",
  		version: "18.0.0",
  		date: "2022-04-18",
  		lts: false,
  		security: false,
  		v8: "10.1.124.8"
  	},
  	{
  		name: "nodejs",
  		version: "18.1.0",
  		date: "2022-05-03",
  		lts: false,
  		security: false,
  		v8: "10.1.124.8"
  	},
  	{
  		name: "nodejs",
  		version: "18.2.0",
  		date: "2022-05-17",
  		lts: false,
  		security: false,
  		v8: "10.1.124.8"
  	},
  	{
  		name: "nodejs",
  		version: "18.3.0",
  		date: "2022-06-02",
  		lts: false,
  		security: false,
  		v8: "10.2.154.4"
  	},
  	{
  		name: "nodejs",
  		version: "18.4.0",
  		date: "2022-06-16",
  		lts: false,
  		security: false,
  		v8: "10.2.154.4"
  	},
  	{
  		name: "nodejs",
  		version: "18.5.0",
  		date: "2022-07-06",
  		lts: false,
  		security: true,
  		v8: "10.2.154.4"
  	},
  	{
  		name: "nodejs",
  		version: "18.6.0",
  		date: "2022-07-13",
  		lts: false,
  		security: false,
  		v8: "10.2.154.13"
  	},
  	{
  		name: "nodejs",
  		version: "18.7.0",
  		date: "2022-07-26",
  		lts: false,
  		security: false,
  		v8: "10.2.154.13"
  	},
  	{
  		name: "nodejs",
  		version: "18.8.0",
  		date: "2022-08-24",
  		lts: false,
  		security: false,
  		v8: "10.2.154.13"
  	},
  	{
  		name: "nodejs",
  		version: "18.9.0",
  		date: "2022-09-07",
  		lts: false,
  		security: false,
  		v8: "10.2.154.15"
  	},
  	{
  		name: "nodejs",
  		version: "18.10.0",
  		date: "2022-09-28",
  		lts: false,
  		security: false,
  		v8: "10.2.154.15"
  	},
  	{
  		name: "nodejs",
  		version: "18.11.0",
  		date: "2022-10-13",
  		lts: false,
  		security: false,
  		v8: "10.2.154.15"
  	},
  	{
  		name: "nodejs",
  		version: "18.12.0",
  		date: "2022-10-25",
  		lts: "Hydrogen",
  		security: false,
  		v8: "10.2.154.15"
  	},
  	{
  		name: "nodejs",
  		version: "18.13.0",
  		date: "2023-01-05",
  		lts: "Hydrogen",
  		security: false,
  		v8: "10.2.154.23"
  	},
  	{
  		name: "nodejs",
  		version: "18.14.0",
  		date: "2023-02-01",
  		lts: "Hydrogen",
  		security: false,
  		v8: "10.2.154.23"
  	},
  	{
  		name: "nodejs",
  		version: "18.15.0",
  		date: "2023-03-05",
  		lts: "Hydrogen",
  		security: false,
  		v8: "10.2.154.26"
  	},
  	{
  		name: "nodejs",
  		version: "18.16.0",
  		date: "2023-04-12",
  		lts: "Hydrogen",
  		security: false,
  		v8: "10.2.154.26"
  	},
  	{
  		name: "nodejs",
  		version: "18.17.0",
  		date: "2023-07-18",
  		lts: "Hydrogen",
  		security: false,
  		v8: "10.2.154.26"
  	},
  	{
  		name: "nodejs",
  		version: "18.18.0",
  		date: "2023-09-18",
  		lts: "Hydrogen",
  		security: false,
  		v8: "10.2.154.26"
  	},
  	{
  		name: "nodejs",
  		version: "18.19.0",
  		date: "2023-11-29",
  		lts: "Hydrogen",
  		security: false,
  		v8: "10.2.154.26"
  	},
  	{
  		name: "nodejs",
  		version: "18.20.0",
  		date: "2024-03-26",
  		lts: "Hydrogen",
  		security: false,
  		v8: "10.2.154.26"
  	},
  	{
  		name: "nodejs",
  		version: "19.0.0",
  		date: "2022-10-17",
  		lts: false,
  		security: false,
  		v8: "10.7.193.13"
  	},
  	{
  		name: "nodejs",
  		version: "19.1.0",
  		date: "2022-11-14",
  		lts: false,
  		security: false,
  		v8: "10.7.193.20"
  	},
  	{
  		name: "nodejs",
  		version: "19.2.0",
  		date: "2022-11-29",
  		lts: false,
  		security: false,
  		v8: "10.8.168.20"
  	},
  	{
  		name: "nodejs",
  		version: "19.3.0",
  		date: "2022-12-14",
  		lts: false,
  		security: false,
  		v8: "10.8.168.21"
  	},
  	{
  		name: "nodejs",
  		version: "19.4.0",
  		date: "2023-01-05",
  		lts: false,
  		security: false,
  		v8: "10.8.168.25"
  	},
  	{
  		name: "nodejs",
  		version: "19.5.0",
  		date: "2023-01-24",
  		lts: false,
  		security: false,
  		v8: "10.8.168.25"
  	},
  	{
  		name: "nodejs",
  		version: "19.6.0",
  		date: "2023-02-01",
  		lts: false,
  		security: false,
  		v8: "10.8.168.25"
  	},
  	{
  		name: "nodejs",
  		version: "19.7.0",
  		date: "2023-02-21",
  		lts: false,
  		security: false,
  		v8: "10.8.168.25"
  	},
  	{
  		name: "nodejs",
  		version: "19.8.0",
  		date: "2023-03-14",
  		lts: false,
  		security: false,
  		v8: "10.8.168.25"
  	},
  	{
  		name: "nodejs",
  		version: "19.9.0",
  		date: "2023-04-10",
  		lts: false,
  		security: false,
  		v8: "10.8.168.25"
  	},
  	{
  		name: "nodejs",
  		version: "20.0.0",
  		date: "2023-04-17",
  		lts: false,
  		security: false,
  		v8: "11.3.244.4"
  	},
  	{
  		name: "nodejs",
  		version: "20.1.0",
  		date: "2023-05-03",
  		lts: false,
  		security: false,
  		v8: "11.3.244.8"
  	},
  	{
  		name: "nodejs",
  		version: "20.2.0",
  		date: "2023-05-16",
  		lts: false,
  		security: false,
  		v8: "11.3.244.8"
  	},
  	{
  		name: "nodejs",
  		version: "20.3.0",
  		date: "2023-06-08",
  		lts: false,
  		security: false,
  		v8: "11.3.244.8"
  	},
  	{
  		name: "nodejs",
  		version: "20.4.0",
  		date: "2023-07-04",
  		lts: false,
  		security: false,
  		v8: "11.3.244.8"
  	},
  	{
  		name: "nodejs",
  		version: "20.5.0",
  		date: "2023-07-19",
  		lts: false,
  		security: false,
  		v8: "11.3.244.8"
  	},
  	{
  		name: "nodejs",
  		version: "20.6.0",
  		date: "2023-08-23",
  		lts: false,
  		security: false,
  		v8: "11.3.244.8"
  	},
  	{
  		name: "nodejs",
  		version: "20.7.0",
  		date: "2023-09-18",
  		lts: false,
  		security: false,
  		v8: "11.3.244.8"
  	},
  	{
  		name: "nodejs",
  		version: "20.8.0",
  		date: "2023-09-28",
  		lts: false,
  		security: false,
  		v8: "11.3.244.8"
  	},
  	{
  		name: "nodejs",
  		version: "20.9.0",
  		date: "2023-10-24",
  		lts: "Iron",
  		security: false,
  		v8: "11.3.244.8"
  	},
  	{
  		name: "nodejs",
  		version: "20.10.0",
  		date: "2023-11-22",
  		lts: "Iron",
  		security: false,
  		v8: "11.3.244.8"
  	},
  	{
  		name: "nodejs",
  		version: "20.11.0",
  		date: "2024-01-09",
  		lts: "Iron",
  		security: false,
  		v8: "11.3.244.8"
  	},
  	{
  		name: "nodejs",
  		version: "20.12.0",
  		date: "2024-03-26",
  		lts: "Iron",
  		security: false,
  		v8: "11.3.244.8"
  	},
  	{
  		name: "nodejs",
  		version: "20.13.0",
  		date: "2024-05-07",
  		lts: "Iron",
  		security: false,
  		v8: "11.3.244.8"
  	},
  	{
  		name: "nodejs",
  		version: "20.14.0",
  		date: "2024-05-28",
  		lts: "Iron",
  		security: false,
  		v8: "11.3.244.8"
  	},
  	{
  		name: "nodejs",
  		version: "20.15.0",
  		date: "2024-06-20",
  		lts: "Iron",
  		security: false,
  		v8: "11.3.244.8"
  	},
  	{
  		name: "nodejs",
  		version: "20.16.0",
  		date: "2024-07-24",
  		lts: "Iron",
  		security: false,
  		v8: "11.3.244.8"
  	},
  	{
  		name: "nodejs",
  		version: "20.17.0",
  		date: "2024-08-21",
  		lts: "Iron",
  		security: false,
  		v8: "11.3.244.8"
  	},
  	{
  		name: "nodejs",
  		version: "20.18.0",
  		date: "2024-10-03",
  		lts: "Iron",
  		security: false,
  		v8: "11.3.244.8"
  	},
  	{
  		name: "nodejs",
  		version: "21.0.0",
  		date: "2023-10-17",
  		lts: false,
  		security: false,
  		v8: "11.8.172.13"
  	},
  	{
  		name: "nodejs",
  		version: "21.1.0",
  		date: "2023-10-24",
  		lts: false,
  		security: false,
  		v8: "11.8.172.15"
  	},
  	{
  		name: "nodejs",
  		version: "21.2.0",
  		date: "2023-11-14",
  		lts: false,
  		security: false,
  		v8: "11.8.172.17"
  	},
  	{
  		name: "nodejs",
  		version: "21.3.0",
  		date: "2023-11-30",
  		lts: false,
  		security: false,
  		v8: "11.8.172.17"
  	},
  	{
  		name: "nodejs",
  		version: "21.4.0",
  		date: "2023-12-05",
  		lts: false,
  		security: false,
  		v8: "11.8.172.17"
  	},
  	{
  		name: "nodejs",
  		version: "21.5.0",
  		date: "2023-12-19",
  		lts: false,
  		security: false,
  		v8: "11.8.172.17"
  	},
  	{
  		name: "nodejs",
  		version: "21.6.0",
  		date: "2024-01-14",
  		lts: false,
  		security: false,
  		v8: "11.8.172.17"
  	},
  	{
  		name: "nodejs",
  		version: "21.7.0",
  		date: "2024-03-06",
  		lts: false,
  		security: false,
  		v8: "11.8.172.17"
  	},
  	{
  		name: "nodejs",
  		version: "22.0.0",
  		date: "2024-04-24",
  		lts: false,
  		security: false,
  		v8: "12.4.254.14"
  	},
  	{
  		name: "nodejs",
  		version: "22.1.0",
  		date: "2024-05-02",
  		lts: false,
  		security: false,
  		v8: "12.4.254.14"
  	},
  	{
  		name: "nodejs",
  		version: "22.2.0",
  		date: "2024-05-15",
  		lts: false,
  		security: false,
  		v8: "12.4.254.14"
  	},
  	{
  		name: "nodejs",
  		version: "22.3.0",
  		date: "2024-06-11",
  		lts: false,
  		security: false,
  		v8: "12.4.254.20"
  	},
  	{
  		name: "nodejs",
  		version: "22.4.0",
  		date: "2024-07-02",
  		lts: false,
  		security: false,
  		v8: "12.4.254.21"
  	},
  	{
  		name: "nodejs",
  		version: "22.5.0",
  		date: "2024-07-17",
  		lts: false,
  		security: false,
  		v8: "12.4.254.21"
  	},
  	{
  		name: "nodejs",
  		version: "22.6.0",
  		date: "2024-08-06",
  		lts: false,
  		security: false,
  		v8: "12.4.254.21"
  	},
  	{
  		name: "nodejs",
  		version: "22.7.0",
  		date: "2024-08-21",
  		lts: false,
  		security: false,
  		v8: "12.4.254.21"
  	},
  	{
  		name: "nodejs",
  		version: "22.8.0",
  		date: "2024-09-03",
  		lts: false,
  		security: false,
  		v8: "12.4.254.21"
  	},
  	{
  		name: "nodejs",
  		version: "22.9.0",
  		date: "2024-09-17",
  		lts: false,
  		security: false,
  		v8: "12.4.254.21"
  	},
  	{
  		name: "nodejs",
  		version: "22.10.0",
  		date: "2024-10-16",
  		lts: false,
  		security: false,
  		v8: "12.4.254.21"
  	},
  	{
  		name: "nodejs",
  		version: "22.11.0",
  		date: "2024-10-29",
  		lts: "Jod",
  		security: false,
  		v8: "12.4.254.21"
  	},
  	{
  		name: "nodejs",
  		version: "22.12.0",
  		date: "2024-12-02",
  		lts: "Jod",
  		security: false,
  		v8: "12.4.254.21"
  	},
  	{
  		name: "nodejs",
  		version: "23.0.0",
  		date: "2024-10-16",
  		lts: false,
  		security: false,
  		v8: "12.9.202.26"
  	},
  	{
  		name: "nodejs",
  		version: "23.1.0",
  		date: "2024-10-24",
  		lts: false,
  		security: false,
  		v8: "12.9.202.28"
  	},
  	{
  		name: "nodejs",
  		version: "23.2.0",
  		date: "2024-11-11",
  		lts: false,
  		security: false,
  		v8: "12.9.202.28"
  	},
  	{
  		name: "nodejs",
  		version: "23.3.0",
  		date: "2024-11-20",
  		lts: false,
  		security: false,
  		v8: "12.9.202.28"
  	}
  ];

  var agents$4 = {};

  var browsers$5 = {};

  var browsers$4={A:"ie",B:"edge",C:"firefox",D:"chrome",E:"safari",F:"opera",G:"ios_saf",H:"op_mini",I:"android",J:"bb",K:"op_mob",L:"and_chr",M:"and_ff",N:"ie_mob",O:"and_uc",P:"samsung",Q:"and_qq",R:"baidu",S:"kaios"};

  browsers$5.browsers = browsers$4;

  var browserVersions$1 = {};

  var browserVersions={"0":"22","1":"23","2":"24","3":"25","4":"26","5":"27","6":"115","7":"116","8":"117","9":"118",A:"10",B:"11",C:"12",D:"7",E:"8",F:"9",G:"15",H:"80",I:"133",J:"4",K:"6",L:"13",M:"14",N:"16",O:"17",P:"18",Q:"79",R:"81",S:"83",T:"84",U:"85",V:"86",W:"87",X:"88",Y:"89",Z:"90",a:"91",b:"92",c:"93",d:"94",e:"95",f:"96",g:"97",h:"98",i:"99",j:"100",k:"101",l:"102",m:"103",n:"104",o:"105",p:"106",q:"107",r:"108",s:"109",t:"110",u:"111",v:"112",w:"113",x:"114",y:"20",z:"21",AB:"119",BB:"120",CB:"121",DB:"122",EB:"123",FB:"124",GB:"125",HB:"126",IB:"127",JB:"128",KB:"129",LB:"130",MB:"131",NB:"132",OB:"5",PB:"19",QB:"28",RB:"29",SB:"30",TB:"31",UB:"32",VB:"33",WB:"34",XB:"35",YB:"36",ZB:"37",aB:"38",bB:"39",cB:"40",dB:"41",eB:"42",fB:"43",gB:"44",hB:"45",iB:"46",jB:"47",kB:"48",lB:"49",mB:"50",nB:"51",oB:"52",pB:"53",qB:"54",rB:"55",sB:"56",tB:"57",uB:"58",vB:"60",wB:"62",xB:"63",yB:"64",zB:"65","0B":"66","1B":"67","2B":"68","3B":"69","4B":"70","5B":"71","6B":"72","7B":"73","8B":"74","9B":"75",AC:"76",BC:"77",CC:"78",DC:"135",EC:"11.1",FC:"12.1",GC:"15.5",HC:"16.0",IC:"17.0",JC:"18.0",KC:"3",LC:"59",MC:"61",NC:"82",OC:"134",PC:"136",QC:"3.2",RC:"10.1",SC:"15.2-15.3",TC:"15.4",UC:"16.1",VC:"16.2",WC:"16.3",XC:"16.4",YC:"16.5",ZC:"17.1",aC:"17.2",bC:"17.3",cC:"17.4",dC:"17.5",eC:"18.1",fC:"18.2",gC:"18.3",hC:"18.4",iC:"11.5",jC:"4.2-4.3",kC:"5.5",lC:"2",mC:"137",nC:"138",oC:"3.5",pC:"3.6",qC:"3.1",rC:"5.1",sC:"6.1",tC:"7.1",uC:"9.1",vC:"13.1",wC:"14.1",xC:"15.1",yC:"15.6",zC:"16.6","0C":"17.6","1C":"TP","2C":"9.5-9.6","3C":"10.0-10.1","4C":"10.5","5C":"10.6","6C":"11.6","7C":"4.0-4.1","8C":"5.0-5.1","9C":"6.0-6.1",AD:"7.0-7.1",BD:"8.1-8.4",CD:"9.0-9.2",DD:"9.3",ED:"10.0-10.2",FD:"10.3",GD:"11.0-11.2",HD:"11.3-11.4",ID:"12.0-12.1",JD:"12.2-12.5",KD:"13.0-13.1",LD:"13.2",MD:"13.3",ND:"13.4-13.7",OD:"14.0-14.4",PD:"14.5-14.8",QD:"15.0-15.1",RD:"15.6-15.8",SD:"16.6-16.7",TD:"17.6-17.7",UD:"all",VD:"2.1",WD:"2.2",XD:"2.3",YD:"4.1",ZD:"4.4",aD:"4.4.3-4.4.4",bD:"5.0-5.4",cD:"6.2-6.4",dD:"7.2-7.4",eD:"8.2",fD:"9.2",gD:"11.1-11.2",hD:"12.0",iD:"13.0",jD:"14.0",kD:"15.0",lD:"19.0",mD:"14.9",nD:"13.52",oD:"2.5",pD:"3.0-3.1"};

  browserVersions$1.browserVersions = browserVersions;

  var agents$3={A:{A:{K:0,D:0,E:0,F:0.0321964,A:0,B:0.418554,kC:0},B:"ms",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","kC","K","D","E","F","A","B","","",""],E:"IE",F:{kC:962323200,K:998870400,D:1161129600,E:1237420800,F:1300060800,A:1346716800,B:1381968000}},B:{A:{"6":0.007212,"7":0.003606,"8":0.003606,"9":0.003606,C:0,L:0,M:0,G:0,N:0,O:0,P:0.093756,Q:0,H:0,R:0,S:0,T:0,U:0,V:0,W:0,X:0,Y:0,Z:0,a:0,b:0.010818,c:0,d:0,e:0,f:0,g:0,h:0,i:0,j:0,k:0,l:0,m:0,n:0,o:0,p:0,q:0,r:0.003606,s:0.050484,t:0,u:0,v:0,w:0.007212,x:0.010818,AB:0.003606,BB:0.025242,CB:0.007212,DB:0.014424,EB:0.007212,FB:0.007212,GB:0.007212,HB:0.021636,IB:0.01803,JB:0.014424,KB:0.01803,LB:0.043272,MB:0.151452,NB:1.92921,I:2.56747},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","C","L","M","G","N","O","P","Q","H","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","6","7","8","9","AB","BB","CB","DB","EB","FB","GB","HB","IB","JB","KB","LB","MB","NB","I","","",""],E:"Edge",F:{"6":1689897600,"7":1692576000,"8":1694649600,"9":1697155200,C:1438128000,L:1447286400,M:1470096000,G:1491868800,N:1508198400,O:1525046400,P:1542067200,Q:1579046400,H:1581033600,R:1586736000,S:1590019200,T:1594857600,U:1598486400,V:1602201600,W:1605830400,X:1611360000,Y:1614816000,Z:1618358400,a:1622073600,b:1626912000,c:1630627200,d:1632441600,e:1634774400,f:1637539200,g:1641427200,h:1643932800,i:1646265600,j:1649635200,k:1651190400,l:1653955200,m:1655942400,n:1659657600,o:1661990400,p:1664755200,q:1666915200,r:1670198400,s:1673481600,t:1675900800,u:1678665600,v:1680825600,w:1683158400,x:1685664000,AB:1698969600,BB:1701993600,CB:1706227200,DB:1708732800,EB:1711152000,FB:1713398400,GB:1715990400,HB:1718841600,IB:1721865600,JB:1724371200,KB:1726704000,LB:1729123200,MB:1731542400,NB:1737417600,I:1740614400},D:{C:"ms",L:"ms",M:"ms",G:"ms",N:"ms",O:"ms",P:"ms"}},C:{A:{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0.241602,"7":0,"8":0,"9":0.104574,lC:0,KC:0,J:0,OB:0,K:0,D:0,E:0,F:0,A:0,B:0.021636,C:0,L:0,M:0,G:0,N:0,O:0,P:0,PB:0,y:0,z:0,QB:0,RB:0,SB:0,TB:0,UB:0,VB:0,WB:0,XB:0,YB:0,ZB:0,aB:0,bB:0,cB:0,dB:0,eB:0,fB:0.003606,gB:0.003606,hB:0,iB:0,jB:0,kB:0,lB:0,mB:0,nB:0,oB:0.028848,pB:0.007212,qB:0,rB:0.003606,sB:0.010818,tB:0,uB:0,LC:0.003606,vB:0,MC:0,wB:0,xB:0,yB:0,zB:0,"0B":0,"1B":0,"2B":0,"3B":0,"4B":0,"5B":0,"6B":0,"7B":0,"8B":0,"9B":0,AC:0,BC:0,CC:0.010818,Q:0,H:0,R:0,NC:0,S:0,T:0,U:0,V:0,W:0,X:0.003606,Y:0,Z:0,a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0,i:0,j:0,k:0,l:0,m:0,n:0,o:0,p:0,q:0,r:0,s:0.003606,t:0,u:0,v:0,w:0.003606,x:0,AB:0,BB:0.003606,CB:0,DB:0,EB:0,FB:0,GB:0.021636,HB:0,IB:0.007212,JB:0.079332,KB:0.003606,LB:0.003606,MB:0.007212,NB:0.014424,I:0.028848,OC:0.385842,DC:1.17556,PC:0.007212,mC:0,nC:0,oC:0,pC:0},B:"moz",C:["lC","KC","oC","pC","J","OB","K","D","E","F","A","B","C","L","M","G","N","O","P","PB","y","z","0","1","2","3","4","5","QB","RB","SB","TB","UB","VB","WB","XB","YB","ZB","aB","bB","cB","dB","eB","fB","gB","hB","iB","jB","kB","lB","mB","nB","oB","pB","qB","rB","sB","tB","uB","LC","vB","MC","wB","xB","yB","zB","0B","1B","2B","3B","4B","5B","6B","7B","8B","9B","AC","BC","CC","Q","H","R","NC","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","6","7","8","9","AB","BB","CB","DB","EB","FB","GB","HB","IB","JB","KB","LB","MB","NB","I","OC","DC","PC","mC","nC"],E:"Firefox",F:{"0":1368489600,"1":1372118400,"2":1375747200,"3":1379376000,"4":1386633600,"5":1391472000,"6":1688428800,"7":1690848000,"8":1693267200,"9":1695686400,lC:1161648000,KC:1213660800,oC:1246320000,pC:1264032000,J:1300752000,OB:1308614400,K:1313452800,D:1317081600,E:1317081600,F:1320710400,A:1324339200,B:1327968000,C:1331596800,L:1335225600,M:1338854400,G:1342483200,N:1346112000,O:1349740800,P:1353628800,PB:1357603200,y:1361232000,z:1364860800,QB:1395100800,RB:1398729600,SB:1402358400,TB:1405987200,UB:1409616000,VB:1413244800,WB:1417392000,XB:1421107200,YB:1424736000,ZB:1428278400,aB:1431475200,bB:1435881600,cB:1439251200,dB:1442880000,eB:1446508800,fB:1450137600,gB:1453852800,hB:1457395200,iB:1461628800,jB:1465257600,kB:1470096000,lB:1474329600,mB:1479168000,nB:1485216000,oB:1488844800,pB:1492560000,qB:1497312000,rB:1502150400,sB:1506556800,tB:1510617600,uB:1516665600,LC:1520985600,vB:1525824000,MC:1529971200,wB:1536105600,xB:1540252800,yB:1544486400,zB:1548720000,"0B":1552953600,"1B":1558396800,"2B":1562630400,"3B":1567468800,"4B":1571788800,"5B":1575331200,"6B":1578355200,"7B":1581379200,"8B":1583798400,"9B":1586304000,AC:1588636800,BC:1591056000,CC:1593475200,Q:1595894400,H:1598313600,R:1600732800,NC:1603152000,S:1605571200,T:1607990400,U:1611619200,V:1614038400,W:1616457600,X:1618790400,Y:1622505600,Z:1626134400,a:1628553600,b:1630972800,c:1633392000,d:1635811200,e:1638835200,f:1641859200,g:1644364800,h:1646697600,i:1649116800,j:1651536000,k:1653955200,l:1656374400,m:1658793600,n:1661212800,o:1663632000,p:1666051200,q:1668470400,r:1670889600,s:1673913600,t:1676332800,u:1678752000,v:1681171200,w:1683590400,x:1686009600,AB:1698105600,BB:1700524800,CB:1702944000,DB:1705968000,EB:1708387200,FB:1710806400,GB:1713225600,HB:1715644800,IB:1718064000,JB:1720483200,KB:1722902400,LB:1725321600,MB:1727740800,NB:1730160000,I:1732579200,OC:1736208000,DC:1738627200,PC:null,mC:null,nC:null}},D:{A:{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0.028848,"7":0.111786,"8":0.068514,"9":0.05409,J:0,OB:0,K:0,D:0,E:0,F:0,A:0,B:0,C:0,L:0,M:0,G:0,N:0,O:0,P:0,PB:0,y:0,z:0,QB:0,RB:0,SB:0,TB:0,UB:0,VB:0,WB:0,XB:0,YB:0,ZB:0,aB:0.007212,bB:0,cB:0,dB:0.003606,eB:0,fB:0,gB:0,hB:0.003606,iB:0,jB:0.003606,kB:0.014424,lB:0.014424,mB:0.01803,nB:0,oB:0.007212,pB:0.007212,qB:0,rB:0,sB:0.014424,tB:0.003606,uB:0.007212,LC:0,vB:0,MC:0,wB:0,xB:0,yB:0,zB:0,"0B":0.01803,"1B":0,"2B":0,"3B":0.007212,"4B":0.010818,"5B":0,"6B":0,"7B":0.007212,"8B":0.003606,"9B":0.003606,AC:0.003606,BC:0.014424,CC:0.010818,Q:0.079332,H:0.010818,R:0.025242,S:0.032454,T:0.003606,U:0.007212,V:0.01803,W:0.068514,X:0.014424,Y:0.003606,Z:0.007212,a:0.039666,b:0.007212,c:0.014424,d:0.028848,e:0.007212,f:0.007212,g:0.01803,h:0.03606,i:0.014424,j:0.007212,k:0.014424,l:0.010818,m:0.082938,n:0.082938,o:0.010818,p:0.021636,q:0.025242,r:0.039666,s:1.02771,t:0.01803,u:0.032454,v:0.046878,w:0.12621,x:0.082938,AB:0.039666,BB:0.061302,CB:0.10818,DB:0.075726,EB:0.086544,FB:0.133422,GB:0.494022,HB:0.436326,IB:0.155058,JB:0.140634,KB:0.115392,LB:0.16227,MB:1.38831,NB:7.9909,I:7.16873,OC:0.014424,DC:0.014424,PC:0},B:"webkit",C:["","","","","","","","J","OB","K","D","E","F","A","B","C","L","M","G","N","O","P","PB","y","z","0","1","2","3","4","5","QB","RB","SB","TB","UB","VB","WB","XB","YB","ZB","aB","bB","cB","dB","eB","fB","gB","hB","iB","jB","kB","lB","mB","nB","oB","pB","qB","rB","sB","tB","uB","LC","vB","MC","wB","xB","yB","zB","0B","1B","2B","3B","4B","5B","6B","7B","8B","9B","AC","BC","CC","Q","H","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","6","7","8","9","AB","BB","CB","DB","EB","FB","GB","HB","IB","JB","KB","LB","MB","NB","I","OC","DC","PC"],E:"Chrome",F:{"0":1343692800,"1":1348531200,"2":1352246400,"3":1357862400,"4":1361404800,"5":1364428800,"6":1689724800,"7":1692057600,"8":1694476800,"9":1696896000,J:1264377600,OB:1274745600,K:1283385600,D:1287619200,E:1291248000,F:1296777600,A:1299542400,B:1303862400,C:1307404800,L:1312243200,M:1316131200,G:1316131200,N:1319500800,O:1323734400,P:1328659200,PB:1332892800,y:1337040000,z:1340668800,QB:1369094400,RB:1374105600,SB:1376956800,TB:1384214400,UB:1389657600,VB:1392940800,WB:1397001600,XB:1400544000,YB:1405468800,ZB:1409011200,aB:1412640000,bB:1416268800,cB:1421798400,dB:1425513600,eB:1429401600,fB:1432080000,gB:1437523200,hB:1441152000,iB:1444780800,jB:1449014400,kB:1453248000,lB:1456963200,mB:1460592000,nB:1464134400,oB:1469059200,pB:1472601600,qB:1476230400,rB:1480550400,sB:1485302400,tB:1489017600,uB:1492560000,LC:1496707200,vB:1500940800,MC:1504569600,wB:1508198400,xB:1512518400,yB:1516752000,zB:1520294400,"0B":1523923200,"1B":1527552000,"2B":1532390400,"3B":1536019200,"4B":1539648000,"5B":1543968000,"6B":1548720000,"7B":1552348800,"8B":1555977600,"9B":1559606400,AC:1564444800,BC:1568073600,CC:1571702400,Q:1575936000,H:1580860800,R:1586304000,S:1589846400,T:1594684800,U:1598313600,V:1601942400,W:1605571200,X:1611014400,Y:1614556800,Z:1618272000,a:1621987200,b:1626739200,c:1630368000,d:1632268800,e:1634601600,f:1637020800,g:1641340800,h:1643673600,i:1646092800,j:1648512000,k:1650931200,l:1653350400,m:1655769600,n:1659398400,o:1661817600,p:1664236800,q:1666656000,r:1669680000,s:1673308800,t:1675728000,u:1678147200,v:1680566400,w:1682985600,x:1685404800,AB:1698710400,BB:1701993600,CB:1705968000,DB:1708387200,EB:1710806400,FB:1713225600,GB:1715644800,HB:1718064000,IB:1721174400,JB:1724112000,KB:1726531200,LB:1728950400,MB:1731369600,NB:1736812800,I:1738627200,OC:null,DC:null,PC:null}},E:{A:{J:0,OB:0,K:0,D:0,E:0.003606,F:0,A:0,B:0,C:0,L:0,M:0.01803,G:0.003606,qC:0,QC:0,rC:0,sC:0,tC:0,uC:0,RC:0,EC:0.003606,FC:0.007212,vC:0.03606,wC:0.050484,xC:0.010818,SC:0.007212,TC:0.014424,GC:0.01803,yC:0.16227,HC:0.028848,UC:0.025242,VC:0.01803,WC:0.046878,XC:0.01803,YC:0.028848,zC:0.219966,IC:0.010818,ZC:0.093756,aC:0.021636,bC:0.025242,cC:0.061302,dC:0.115392,"0C":0.338964,JC:0.05409,eC:0.454356,fC:0.176694,gC:0.858228,hC:0,"1C":0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","qC","QC","J","OB","rC","K","sC","D","tC","E","F","uC","A","RC","B","EC","C","FC","L","vC","M","wC","G","xC","SC","TC","GC","yC","HC","UC","VC","WC","XC","YC","zC","IC","ZC","aC","bC","cC","dC","0C","JC","eC","fC","gC","hC","1C",""],E:"Safari",F:{qC:1205798400,QC:1226534400,J:1244419200,OB:1275868800,rC:1311120000,K:1343174400,sC:1382400000,D:1382400000,tC:1410998400,E:1413417600,F:1443657600,uC:1458518400,A:1474329600,RC:1490572800,B:1505779200,EC:1522281600,C:1537142400,FC:1553472000,L:1568851200,vC:1585008000,M:1600214400,wC:1619395200,G:1632096000,xC:1635292800,SC:1639353600,TC:1647216000,GC:1652745600,yC:1658275200,HC:1662940800,UC:1666569600,VC:1670889600,WC:1674432000,XC:1679875200,YC:1684368000,zC:1690156800,IC:1695686400,ZC:1698192000,aC:1702252800,bC:1705881600,cC:1709596800,dC:1715558400,"0C":1722211200,JC:1726444800,eC:1730073600,fC:1733875200,gC:1737936000,hC:null,"1C":null}},F:{A:{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,F:0,B:0,C:0,G:0,N:0,O:0,P:0,PB:0,y:0,z:0,QB:0,RB:0,SB:0,TB:0,UB:0,VB:0,WB:0,XB:0,YB:0,ZB:0,aB:0,bB:0,cB:0.003606,dB:0,eB:0,fB:0,gB:0,hB:0,iB:0.010818,jB:0,kB:0,lB:0,mB:0,nB:0,oB:0,pB:0,qB:0,rB:0,sB:0,tB:0,uB:0,vB:0,wB:0,xB:0,yB:0,zB:0,"0B":0,"1B":0,"2B":0,"3B":0,"4B":0,"5B":0,"6B":0,"7B":0,"8B":0,"9B":0,AC:0,BC:0,CC:0,Q:0,H:0,R:0,NC:0,S:0,T:0,U:0,V:0.003606,W:0.039666,X:0,Y:0,Z:0,a:0,b:0,c:0,d:0,e:0.03606,f:0,g:0,h:0,i:0,j:0,k:0,l:0.010818,m:0,n:0,o:0,p:0,q:0,r:0,s:0,t:0,u:0,v:0,w:0,x:0.068514,"2C":0,"3C":0,"4C":0,"5C":0,EC:0,iC:0,"6C":0,FC:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","F","2C","3C","4C","5C","B","EC","iC","6C","C","FC","G","N","O","P","PB","y","z","0","1","2","3","4","5","QB","RB","SB","TB","UB","VB","WB","XB","YB","ZB","aB","bB","cB","dB","eB","fB","gB","hB","iB","jB","kB","lB","mB","nB","oB","pB","qB","rB","sB","tB","uB","vB","wB","xB","yB","zB","0B","1B","2B","3B","4B","5B","6B","7B","8B","9B","AC","BC","CC","Q","H","R","NC","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","","",""],E:"Opera",F:{"0":1401753600,"1":1405987200,"2":1409616000,"3":1413331200,"4":1417132800,"5":1422316800,F:1150761600,"2C":1223424000,"3C":1251763200,"4C":1267488000,"5C":1277942400,B:1292457600,EC:1302566400,iC:1309219200,"6C":1323129600,C:1323129600,FC:1352073600,G:1372723200,N:1377561600,O:1381104000,P:1386288000,PB:1390867200,y:1393891200,z:1399334400,QB:1425945600,RB:1430179200,SB:1433808000,TB:1438646400,UB:1442448000,VB:1445904000,WB:1449100800,XB:1454371200,YB:1457308800,ZB:1462320000,aB:1465344000,bB:1470096000,cB:1474329600,dB:1477267200,eB:1481587200,fB:1486425600,gB:1490054400,hB:1494374400,iB:1498003200,jB:1502236800,kB:1506470400,lB:1510099200,mB:1515024000,nB:1517961600,oB:1521676800,pB:1525910400,qB:1530144000,rB:1534982400,sB:1537833600,tB:1543363200,uB:1548201600,vB:1554768000,wB:1561593600,xB:1566259200,yB:1570406400,zB:1573689600,"0B":1578441600,"1B":1583971200,"2B":1587513600,"3B":1592956800,"4B":1595894400,"5B":1600128000,"6B":1603238400,"7B":1613520000,"8B":1612224000,"9B":1616544000,AC:1619568000,BC:1623715200,CC:1627948800,Q:1631577600,H:1633392000,R:1635984000,NC:1638403200,S:1642550400,T:1644969600,U:1647993600,V:1650412800,W:1652745600,X:1654646400,Y:1657152000,Z:1660780800,a:1663113600,b:1668816000,c:1668643200,d:1671062400,e:1675209600,f:1677024000,g:1679529600,h:1681948800,i:1684195200,j:1687219200,k:1690329600,l:1692748800,m:1696204800,n:1699920000,o:1699920000,p:1702944000,q:1707264000,r:1710115200,s:1711497600,t:1716336000,u:1719273600,v:1721088000,w:1724284800,x:1727222400},D:{F:"o",B:"o",C:"o","2C":"o","3C":"o","4C":"o","5C":"o",EC:"o",iC:"o","6C":"o",FC:"o"}},G:{A:{E:0,QC:0,"7C":0,jC:0.00294636,"8C":0.00147318,"9C":0.00883907,AD:0.00736589,BD:0,CD:0.00294636,DD:0.0220977,ED:0.00294636,FD:0.0324099,GD:0.117854,HD:0.0103122,ID:0.00589271,JD:0.156157,KD:0.00294636,LD:0.00589271,MD:0.00589271,ND:0.0220977,OD:0.122274,PD:0.066293,QD:0.0353563,SC:0.0353563,TC:0.0427222,GC:0.0486149,RD:0.599583,HC:0.0869175,UC:0.181201,VC:0.091337,WC:0.163523,XC:0.0353563,YC:0.0677662,SD:0.713018,IC:0.0441953,ZC:0.0780784,aC:0.0604003,bC:0.0869175,cC:0.179728,dC:0.425748,TD:1.39805,JC:0.411017,eC:3.78017,fC:1.21537,gC:4.33409,hC:0.00883907},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","QC","7C","jC","8C","9C","AD","E","BD","CD","DD","ED","FD","GD","HD","ID","JD","KD","LD","MD","ND","OD","PD","QD","SC","TC","GC","RD","HC","UC","VC","WC","XC","YC","SD","IC","ZC","aC","bC","cC","dC","TD","JC","eC","fC","gC","hC","",""],E:"Safari on iOS",F:{QC:1270252800,"7C":1283904000,jC:1299628800,"8C":1331078400,"9C":1359331200,AD:1394409600,E:1410912000,BD:1413763200,CD:1442361600,DD:1458518400,ED:1473724800,FD:1490572800,GD:1505779200,HD:1522281600,ID:1537142400,JD:1553472000,KD:1568851200,LD:1572220800,MD:1580169600,ND:1585008000,OD:1600214400,PD:1619395200,QD:1632096000,SC:1639353600,TC:1647216000,GC:1652659200,RD:1658275200,HC:1662940800,UC:1666569600,VC:1670889600,WC:1674432000,XC:1679875200,YC:1684368000,SD:1690156800,IC:1694995200,ZC:1698192000,aC:1702252800,bC:1705881600,cC:1709596800,dC:1715558400,TD:1722211200,JC:1726444800,eC:1730073600,fC:1733875200,gC:1737936000,hC:null}},H:{A:{UD:0.04},B:"o",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","UD","","",""],E:"Opera Mini",F:{UD:1426464000}},I:{A:{KC:0,J:0,I:0.682721,VD:0,WD:0,XD:0,YD:0,jC:0.000136832,ZD:0,aD:0.00082099},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","VD","WD","XD","KC","J","YD","jC","ZD","aD","I","","",""],E:"Android Browser",F:{VD:1256515200,WD:1274313600,XD:1291593600,KC:1298332800,J:1318896000,YD:1341792000,jC:1374624000,ZD:1386547200,aD:1401667200,I:1740441600}},J:{A:{D:0,A:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","D","A","","",""],E:"Blackberry Browser",F:{D:1325376000,A:1359504000}},K:{A:{A:0,B:0,C:0,H:1.00862,EC:0,iC:0,FC:0},B:"o",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","A","B","EC","iC","C","FC","H","","",""],E:"Opera Mobile",F:{A:1287100800,B:1300752000,EC:1314835200,iC:1318291200,C:1330300800,FC:1349740800,H:1709769600},D:{H:"webkit"}},L:{A:{I:45.4281},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","I","","",""],E:"Chrome for Android",F:{I:1740441600}},M:{A:{DC:0.345276},B:"moz",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","DC","","",""],E:"Firefox for Android",F:{DC:1738627200}},N:{A:{A:0,B:0},B:"ms",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","A","B","","",""],E:"IE Mobile",F:{A:1340150400,B:1353456000}},O:{A:{GC:0.844008},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","GC","","",""],E:"UC Browser for Android",F:{GC:1710115200},D:{GC:"webkit"}},P:{A:{"0":0.0329859,"1":0.0329859,"2":0.0439812,"3":0.0439812,"4":0.0989576,"5":1.97915,J:0.0659717,y:0,z:0.0219906,bD:0,cD:0,dD:0.0219906,eD:0,fD:0,RC:0,gD:0,hD:0,iD:0,jD:0,kD:0,HC:0,IC:0.0109953,JC:0,lD:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","J","bD","cD","dD","eD","fD","RC","gD","hD","iD","jD","kD","HC","IC","JC","lD","y","z","0","1","2","3","4","5","","",""],E:"Samsung Internet",F:{"0":1689292800,"1":1697587200,"2":1711497600,"3":1715126400,"4":1717718400,"5":1725667200,J:1461024000,bD:1481846400,cD:1509408000,dD:1528329600,eD:1546128000,fD:1554163200,RC:1567900800,gD:1582588800,hD:1593475200,iD:1605657600,jD:1618531200,kD:1629072000,HC:1640736000,IC:1651708800,JC:1659657600,lD:1667260800,y:1677369600,z:1684454400}},Q:{A:{mD:0.204608},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","mD","","",""],E:"QQ Browser",F:{mD:1710288000}},R:{A:{nD:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","nD","","",""],E:"Baidu Browser",F:{nD:1710201600}},S:{A:{oD:0.019182,pD:0},B:"moz",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","oD","pD","","",""],E:"KaiOS Browser",F:{oD:1527811200,pD:1631664000}}};

  const browsers$3 = browsers$5.browsers;
  const versions$2 = browserVersions$1.browserVersions;
  const agentsData = agents$3;

  function unpackBrowserVersions(versionsData) {
    return Object.keys(versionsData).reduce((usage, version) => {
      usage[versions$2[version]] = versionsData[version];
      return usage
    }, {})
  }

  agents$4.agents = Object.keys(agentsData).reduce((map, key) => {
    let versionsData = agentsData[key];
    map[browsers$3[key]] = Object.keys(versionsData).reduce((data, entry) => {
      if (entry === 'A') {
        data.usage_global = unpackBrowserVersions(versionsData[entry]);
      } else if (entry === 'C') {
        data.versions = versionsData[entry].reduce((list, version) => {
          if (version === '') {
            list.push(null);
          } else {
            list.push(versions$2[version]);
          }
          return list
        }, []);
      } else if (entry === 'D') {
        data.prefix_exceptions = unpackBrowserVersions(versionsData[entry]);
      } else if (entry === 'E') {
        data.browser = versionsData[entry];
      } else if (entry === 'F') {
        data.release_date = Object.keys(versionsData[entry]).reduce(
          (map2, key2) => {
            map2[versions$2[key2]] = versionsData[entry][key2];
            return map2
          },
          {}
        );
      } else {
        // entry is B
        data.prefix = versionsData[entry];
      }
      return data
    }, {});
    return map
  }, {});

  var versions$1 = {
  	"0.20": "39",
  	"0.21": "41",
  	"0.22": "41",
  	"0.23": "41",
  	"0.24": "41",
  	"0.25": "42",
  	"0.26": "42",
  	"0.27": "43",
  	"0.28": "43",
  	"0.29": "43",
  	"0.30": "44",
  	"0.31": "45",
  	"0.32": "45",
  	"0.33": "45",
  	"0.34": "45",
  	"0.35": "45",
  	"0.36": "47",
  	"0.37": "49",
  	"1.0": "49",
  	"1.1": "50",
  	"1.2": "51",
  	"1.3": "52",
  	"1.4": "53",
  	"1.5": "54",
  	"1.6": "56",
  	"1.7": "58",
  	"1.8": "59",
  	"2.0": "61",
  	"2.1": "61",
  	"3.0": "66",
  	"3.1": "66",
  	"4.0": "69",
  	"4.1": "69",
  	"4.2": "69",
  	"5.0": "73",
  	"6.0": "76",
  	"6.1": "76",
  	"7.0": "78",
  	"7.1": "78",
  	"7.2": "78",
  	"7.3": "78",
  	"8.0": "80",
  	"8.1": "80",
  	"8.2": "80",
  	"8.3": "80",
  	"8.4": "80",
  	"8.5": "80",
  	"9.0": "83",
  	"9.1": "83",
  	"9.2": "83",
  	"9.3": "83",
  	"9.4": "83",
  	"10.0": "85",
  	"10.1": "85",
  	"10.2": "85",
  	"10.3": "85",
  	"10.4": "85",
  	"11.0": "87",
  	"11.1": "87",
  	"11.2": "87",
  	"11.3": "87",
  	"11.4": "87",
  	"11.5": "87",
  	"12.0": "89",
  	"12.1": "89",
  	"12.2": "89",
  	"13.0": "91",
  	"13.1": "91",
  	"13.2": "91",
  	"13.3": "91",
  	"13.4": "91",
  	"13.5": "91",
  	"13.6": "91",
  	"14.0": "93",
  	"14.1": "93",
  	"14.2": "93",
  	"15.0": "94",
  	"15.1": "94",
  	"15.2": "94",
  	"15.3": "94",
  	"15.4": "94",
  	"15.5": "94",
  	"16.0": "96",
  	"16.1": "96",
  	"16.2": "96",
  	"17.0": "98",
  	"17.1": "98",
  	"17.2": "98",
  	"17.3": "98",
  	"17.4": "98",
  	"18.0": "100",
  	"18.1": "100",
  	"18.2": "100",
  	"18.3": "100",
  	"19.0": "102",
  	"19.1": "102",
  	"20.0": "104",
  	"20.1": "104",
  	"20.2": "104",
  	"20.3": "104",
  	"21.0": "106",
  	"21.1": "106",
  	"21.2": "106",
  	"21.3": "106",
  	"21.4": "106",
  	"22.0": "108",
  	"22.1": "108",
  	"22.2": "108",
  	"22.3": "108",
  	"23.0": "110",
  	"23.1": "110",
  	"23.2": "110",
  	"23.3": "110",
  	"24.0": "112",
  	"24.1": "112",
  	"24.2": "112",
  	"24.3": "112",
  	"24.4": "112",
  	"24.5": "112",
  	"24.6": "112",
  	"24.7": "112",
  	"24.8": "112",
  	"25.0": "114",
  	"25.1": "114",
  	"25.2": "114",
  	"25.3": "114",
  	"25.4": "114",
  	"25.5": "114",
  	"25.6": "114",
  	"25.7": "114",
  	"25.8": "114",
  	"25.9": "114",
  	"26.0": "116",
  	"26.1": "116",
  	"26.2": "116",
  	"26.3": "116",
  	"26.4": "116",
  	"26.5": "116",
  	"26.6": "116",
  	"27.0": "118",
  	"27.1": "118",
  	"27.2": "118",
  	"27.3": "118",
  	"28.0": "120",
  	"28.1": "120",
  	"28.2": "120",
  	"28.3": "120",
  	"29.0": "122",
  	"29.1": "122",
  	"29.2": "122",
  	"29.3": "122",
  	"29.4": "122",
  	"30.0": "124",
  	"30.1": "124",
  	"30.2": "124",
  	"30.3": "124",
  	"30.4": "124",
  	"30.5": "124",
  	"31.0": "126",
  	"31.1": "126",
  	"31.2": "126",
  	"31.3": "126",
  	"31.4": "126",
  	"31.5": "126",
  	"31.6": "126",
  	"31.7": "126",
  	"32.0": "128",
  	"32.1": "128",
  	"32.2": "128",
  	"32.3": "128",
  	"33.0": "130",
  	"33.1": "130",
  	"33.2": "130",
  	"33.3": "130",
  	"33.4": "130",
  	"34.0": "132",
  	"34.1": "132",
  	"34.2": "132",
  	"34.3": "132",
  	"35.0": "134",
  	"36.0": "136"
  };

  var v4 = {
  	start: "2015-09-08",
  	lts: "2015-10-12",
  	maintenance: "2017-04-01",
  	end: "2018-04-30",
  	codename: "Argon"
  };
  var v5 = {
  	start: "2015-10-29",
  	maintenance: "2016-04-30",
  	end: "2016-06-30"
  };
  var v6 = {
  	start: "2016-04-26",
  	lts: "2016-10-18",
  	maintenance: "2018-04-30",
  	end: "2019-04-30",
  	codename: "Boron"
  };
  var v7 = {
  	start: "2016-10-25",
  	maintenance: "2017-04-30",
  	end: "2017-06-30"
  };
  var v8 = {
  	start: "2017-05-30",
  	lts: "2017-10-31",
  	maintenance: "2019-01-01",
  	end: "2019-12-31",
  	codename: "Carbon"
  };
  var v9 = {
  	start: "2017-10-01",
  	maintenance: "2018-04-01",
  	end: "2018-06-30"
  };
  var v10 = {
  	start: "2018-04-24",
  	lts: "2018-10-30",
  	maintenance: "2020-05-19",
  	end: "2021-04-30",
  	codename: "Dubnium"
  };
  var v11 = {
  	start: "2018-10-23",
  	maintenance: "2019-04-22",
  	end: "2019-06-01"
  };
  var v12 = {
  	start: "2019-04-23",
  	lts: "2019-10-21",
  	maintenance: "2020-11-30",
  	end: "2022-04-30",
  	codename: "Erbium"
  };
  var v13 = {
  	start: "2019-10-22",
  	maintenance: "2020-04-01",
  	end: "2020-06-01"
  };
  var v14 = {
  	start: "2020-04-21",
  	lts: "2020-10-27",
  	maintenance: "2021-10-19",
  	end: "2023-04-30",
  	codename: "Fermium"
  };
  var v15 = {
  	start: "2020-10-20",
  	maintenance: "2021-04-01",
  	end: "2021-06-01"
  };
  var v16 = {
  	start: "2021-04-20",
  	lts: "2021-10-26",
  	maintenance: "2022-10-18",
  	end: "2023-09-11",
  	codename: "Gallium"
  };
  var v17 = {
  	start: "2021-10-19",
  	maintenance: "2022-04-01",
  	end: "2022-06-01"
  };
  var v18 = {
  	start: "2022-04-19",
  	lts: "2022-10-25",
  	maintenance: "2023-10-18",
  	end: "2025-04-30",
  	codename: "Hydrogen"
  };
  var v19 = {
  	start: "2022-10-18",
  	maintenance: "2023-04-01",
  	end: "2023-06-01"
  };
  var v20 = {
  	start: "2023-04-18",
  	lts: "2023-10-24",
  	maintenance: "2024-10-22",
  	end: "2026-04-30",
  	codename: "Iron"
  };
  var v21 = {
  	start: "2023-10-17",
  	maintenance: "2024-04-01",
  	end: "2024-06-01"
  };
  var v22 = {
  	start: "2024-04-24",
  	lts: "2024-10-29",
  	maintenance: "2025-10-21",
  	end: "2027-04-30",
  	codename: "Jod"
  };
  var v23 = {
  	start: "2024-10-16",
  	maintenance: "2025-04-01",
  	end: "2025-06-01"
  };
  var v24 = {
  	start: "2025-04-22",
  	lts: "2025-10-28",
  	maintenance: "2026-10-20",
  	end: "2028-04-30",
  	codename: ""
  };
  var require$$3 = {
  	"v0.8": {
  	start: "2012-06-25",
  	end: "2014-07-31"
  },
  	"v0.10": {
  	start: "2013-03-11",
  	end: "2016-10-31"
  },
  	"v0.12": {
  	start: "2015-02-06",
  	end: "2016-12-31"
  },
  	v4: v4,
  	v5: v5,
  	v6: v6,
  	v7: v7,
  	v8: v8,
  	v9: v9,
  	v10: v10,
  	v11: v11,
  	v12: v12,
  	v13: v13,
  	v14: v14,
  	v15: v15,
  	v16: v16,
  	v17: v17,
  	v18: v18,
  	v19: v19,
  	v20: v20,
  	v21: v21,
  	v22: v22,
  	v23: v23,
  	v24: v24
  };

  function BrowserslistError$2(message) {
    this.name = 'BrowserslistError';
    this.message = message;
    this.browserslist = true;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BrowserslistError$2);
    }
  }

  BrowserslistError$2.prototype = Error.prototype;

  var error = BrowserslistError$2;

  var BrowserslistError$1 = error;

  function noop() {}

  var browser = {
    loadQueries: function loadQueries() {
      throw new BrowserslistError$1(
        'Sharable configs are not supported in client-side build of Browserslist'
      )
    },

    getStat: function getStat(opts) {
      return opts.stats
    },

    loadConfig: function loadConfig(opts) {
      if (opts.config) {
        throw new BrowserslistError$1(
          'Browserslist config are not supported in client-side build'
        )
      }
    },

    loadCountry: function loadCountry(browserslistUsage, country /*AH+*/) {
      /*AH-
      throw new BrowserslistError$1(
        'Country statistics are not supported ' +
          'in client-side build of Browserslist'
      )
      */
      country = country.replace(/[^\w-]/g, ''); //AH+
      if (!browserslistUsage[country]) { //AH+
        var usage = {}; //AH+
        if (!countryStatisticsService.ContainsCountry(country)) { //AH+
            throw new BrowserslistError$1("Could not find the statistics for country code '" + country + "'."); //AH+
        } //AH+

        var rawData = countryStatisticsService.GetStatisticsForCountry(country); //AH+
        var packedData = new Function('var module = {};\n' + rawData + ';\nreturn module.exports;')(); //AH+
        var data = region(packedData); //AH+
        for (var i in data) { //AH+
          fillUsage(usage, i, data[i]); //AH+
        } //AH+
        browserslistUsage[country] = usage; //AH+
      } //AH+
    },

    loadFeature: function loadFeature() {
      throw new BrowserslistError$1(
        'Supports queries are not available in client-side build of Browserslist'
      )
    },

    currentNode: function currentNode(resolve, context) {
      return resolve(['maintained node versions'], context)[0]
    },

    parseConfig: noop,

    readConfig: noop,

    findConfig: noop,

    findConfigFile: noop,

    clearCaches: noop,

    oldDataWarning: noop,

    env: {}
  };

  var AND_REGEXP = /^\s+and\s+(.*)/i;
  var OR_REGEXP = /^(?:,\s*|\s+or\s+)(.*)/i;

  function flatten(array) {
    if (!Array.isArray(array)) return [array]
    return array.reduce(function (a, b) {
      return a.concat(flatten(b))
    }, [])
  }

  function find(string, predicate) {
    for (var max = string.length, n = 1; n <= max; n++) {
      var parsed = string.substr(-n, n);
      if (predicate(parsed, n, max)) {
        return string.slice(0, -n)
      }
    }
    return ''
  }

  function matchQuery(all, query) {
    var node = { query: query };
    if (query.indexOf('not ') === 0) {
      node.not = true;
      query = query.slice(4);
    }

    for (var name in all) {
      var type = all[name];
      var match = query.match(type.regexp);
      if (match) {
        node.type = name;
        for (var i = 0; i < type.matches.length; i++) {
          node[type.matches[i]] = match[i + 1];
        }
        return node
      }
    }

    node.type = 'unknown';
    return node
  }

  function matchBlock(all, string, qs) {
    var node;
    return find(string, function (parsed, n, max) {
      if (AND_REGEXP.test(parsed)) {
        node = matchQuery(all, parsed.match(AND_REGEXP)[1]);
        node.compose = 'and';
        qs.unshift(node);
        return true
      } else if (OR_REGEXP.test(parsed)) {
        node = matchQuery(all, parsed.match(OR_REGEXP)[1]);
        node.compose = 'or';
        qs.unshift(node);
        return true
      } else if (n === max) {
        node = matchQuery(all, parsed.trim());
        node.compose = 'or';
        qs.unshift(node);
        return true
      }
      return false
    })
  }

  var parse$4 = function parse(all, queries) {
    if (!Array.isArray(queries)) queries = [queries];
    return flatten(
      queries.map(function (block) {
        var qs = [];
        do {
          block = matchBlock(all, block, qs);
        } while (block)
        return qs
      })
    )
  };

  var jsReleases = require$$0;
  var agents$2 = agents$4.agents;
  var e2c = versions$1;
  var jsEOL = require$$3;
  var path = require$$4;

  var BrowserslistError = error;
  var env = browser;
  var parseWithoutCache = parse$4; // Will load browser.js in webpack

  var YEAR = 365.259641 * 24 * 60 * 60 * 1000;
  var ANDROID_EVERGREEN_FIRST = '37';
  var OP_MOB_BLINK_FIRST = 14;

  // Helpers

  function isVersionsMatch(versionA, versionB) {
    return (versionA + '.').indexOf(versionB + '.') === 0
  }

  function isEolReleased(name) {
    var version = name.slice(1);
    return browserslist$3.nodeVersions.some(function (i) {
      return isVersionsMatch(i, version)
    })
  }

  function normalize(versions) {
    return versions.filter(function (version) {
      return typeof version === 'string'
    })
  }

  function normalizeElectron(version) {
    var versionToUse = version;
    if (version.split('.').length === 3) {
      versionToUse = version.split('.').slice(0, -1).join('.');
    }
    return versionToUse
  }

  function nameMapper(name) {
    return function mapName(version) {
      return name + ' ' + version
    }
  }

  function getMajor(version) {
    return parseInt(version.split('.')[0])
  }

  function getMajorVersions(released, number) {
    if (released.length === 0) return []
    var majorVersions = uniq$1(released.map(getMajor));
    var minimum = majorVersions[majorVersions.length - number];
    if (!minimum) {
      return released
    }
    var selected = [];
    for (var i = released.length - 1; i >= 0; i--) {
      if (minimum > getMajor(released[i])) break
      selected.unshift(released[i]);
    }
    return selected
  }

  function uniq$1(array) {
    var filtered = [];
    for (var i = 0; i < array.length; i++) {
      if (filtered.indexOf(array[i]) === -1) filtered.push(array[i]);
    }
    return filtered
  }

  function fillUsage(result, name, data) {
    for (var i in data) {
      result[name + ' ' + i] = data[i];
    }
  }

  function generateFilter(sign, version) {
    version = parseFloat(version);
    if (sign === '>') {
      return function (v) {
        return parseLatestFloat(v) > version
      }
    } else if (sign === '>=') {
      return function (v) {
        return parseLatestFloat(v) >= version
      }
    } else if (sign === '<') {
      return function (v) {
        return parseFloat(v) < version
      }
    } else {
      return function (v) {
        return parseFloat(v) <= version
      }
    }

    function parseLatestFloat(v) {
      return parseFloat(v.split('-')[1] || v)
    }
  }

  function generateSemverFilter(sign, version) {
    version = version.split('.').map(parseSimpleInt);
    version[1] = version[1] || 0;
    version[2] = version[2] || 0;
    if (sign === '>') {
      return function (v) {
        v = v.split('.').map(parseSimpleInt);
        return compareSemver(v, version) > 0
      }
    } else if (sign === '>=') {
      return function (v) {
        v = v.split('.').map(parseSimpleInt);
        return compareSemver(v, version) >= 0
      }
    } else if (sign === '<') {
      return function (v) {
        v = v.split('.').map(parseSimpleInt);
        return compareSemver(version, v) > 0
      }
    } else {
      return function (v) {
        v = v.split('.').map(parseSimpleInt);
        return compareSemver(version, v) >= 0
      }
    }
  }

  function parseSimpleInt(x) {
    return parseInt(x)
  }

  function compare(a, b) {
    if (a < b) return -1
    if (a > b) return +1
    return 0
  }

  function compareSemver(a, b) {
    return (
      compare(parseInt(a[0]), parseInt(b[0])) ||
      compare(parseInt(a[1] || '0'), parseInt(b[1] || '0')) ||
      compare(parseInt(a[2] || '0'), parseInt(b[2] || '0'))
    )
  }

  // this follows the npm-like semver behavior
  function semverFilterLoose(operator, range) {
    range = range.split('.').map(parseSimpleInt);
    if (typeof range[1] === 'undefined') {
      range[1] = 'x';
    }
    // ignore any patch version because we only return minor versions
    // range[2] = 'x'
    switch (operator) {
      case '<=':
        return function (version) {
          version = version.split('.').map(parseSimpleInt);
          return compareSemverLoose(version, range) <= 0
        }
      case '>=':
      default:
        return function (version) {
          version = version.split('.').map(parseSimpleInt);
          return compareSemverLoose(version, range) >= 0
        }
    }
  }

  // this follows the npm-like semver behavior
  function compareSemverLoose(version, range) {
    if (version[0] !== range[0]) {
      return version[0] < range[0] ? -1 : +1
    }
    if (range[1] === 'x') {
      return 0
    }
    if (version[1] !== range[1]) {
      return version[1] < range[1] ? -1 : +1
    }
    return 0
  }

  function resolveVersion(data, version) {
    if (data.versions.indexOf(version) !== -1) {
      return version
    } else if (browserslist$3.versionAliases[data.name][version]) {
      return browserslist$3.versionAliases[data.name][version]
    } else {
      return false
    }
  }

  function normalizeVersion(data, version) {
    var resolved = resolveVersion(data, version);
    if (resolved) {
      return resolved
    } else if (data.versions.length === 1) {
      return data.versions[0]
    } else {
      return false
    }
  }

  function filterByYear(since, context) {
    since = since / 1000;
    return Object.keys(agents$2).reduce(function (selected, name) {
      var data = byName(name, context);
      if (!data) return selected
      var versions = Object.keys(data.releaseDate).filter(function (v) {
        var date = data.releaseDate[v];
        return date !== null && date >= since
      });
      return selected.concat(versions.map(nameMapper(data.name)))
    }, [])
  }

  function cloneData(data) {
    return {
      name: data.name,
      versions: data.versions,
      released: data.released,
      releaseDate: data.releaseDate
    }
  }

  function byName(name, context) {
    name = name.toLowerCase();
    name = browserslist$3.aliases[name] || name;
    if (context.mobileToDesktop && browserslist$3.desktopNames[name]) {
      var desktop = browserslist$3.data[browserslist$3.desktopNames[name]];
      if (name === 'android') {
        return normalizeAndroidData(cloneData(browserslist$3.data[name]), desktop)
      } else {
        var cloned = cloneData(desktop);
        cloned.name = name;
        return cloned
      }
    }
    return browserslist$3.data[name]
  }

  function normalizeAndroidVersions(androidVersions, chromeVersions) {
    var iFirstEvergreen = chromeVersions.indexOf(ANDROID_EVERGREEN_FIRST);
    return androidVersions
      .filter(function (version) {
        return /^(?:[2-4]\.|[34]$)/.test(version)
      })
      .concat(chromeVersions.slice(iFirstEvergreen))
  }

  function copyObject(obj) {
    var copy = {};
    for (var key in obj) {
      copy[key] = obj[key];
    }
    return copy
  }

  function normalizeAndroidData(android, chrome) {
    android.released = normalizeAndroidVersions(android.released, chrome.released);
    android.versions = normalizeAndroidVersions(android.versions, chrome.versions);
    android.releaseDate = copyObject(android.releaseDate);
    android.released.forEach(function (v) {
      if (android.releaseDate[v] === undefined) {
        android.releaseDate[v] = chrome.releaseDate[v];
      }
    });
    return android
  }

  function checkName(name, context) {
    var data = byName(name, context);
    if (!data) throw new BrowserslistError('Unknown browser ' + name)
    return data
  }

  function unknownQuery(query) {
    return new BrowserslistError(
      'Unknown browser query `' +
        query +
        '`. ' +
        'Maybe you are using old Browserslist or made typo in query.'
    )
  }

  // Adjusts last X versions queries for some mobile browsers,
  // where caniuse data jumps from a legacy version to the latest
  function filterJumps(list, name, nVersions, context) {
    var jump = 1;
    switch (name) {
      case 'android':
        if (context.mobileToDesktop) return list
        var released = browserslist$3.data.chrome.released;
        jump = released.length - released.indexOf(ANDROID_EVERGREEN_FIRST);
        break
      case 'op_mob':
        var latest = browserslist$3.data.op_mob.released.slice(-1)[0];
        jump = getMajor(latest) - OP_MOB_BLINK_FIRST + 1;
        break
      default:
        return list
    }
    if (nVersions <= jump) {
      return list.slice(-1)
    }
    return list.slice(jump - 1 - nVersions)
  }

  function isSupported(flags, withPartial) {
    return (
      typeof flags === 'string' &&
      (flags.indexOf('y') >= 0 || (withPartial && flags.indexOf('a') >= 0))
    )
  }

  function resolve(queries, context) {
    return parseQueries(queries).reduce(function (result, node, index) {
      if (node.not && index === 0) {
        throw new BrowserslistError(
          'Write any browsers query (for instance, `defaults`) ' +
            'before `' +
            node.query +
            '`'
        )
      }
      var type = QUERIES[node.type];
      var array = type.select.call(browserslist$3, context, node).map(function (j) {
        var parts = j.split(' ');
        if (parts[1] === '0') {
          return parts[0] + ' ' + byName(parts[0], context).versions[0]
        } else {
          return j
        }
      });

      if (node.compose === 'and') {
        if (node.not) {
          return result.filter(function (j) {
            return array.indexOf(j) === -1
          })
        } else {
          return result.filter(function (j) {
            return array.indexOf(j) !== -1
          })
        }
      } else {
        if (node.not) {
          var filter = {};
          array.forEach(function (j) {
            filter[j] = true;
          });
          return result.filter(function (j) {
            return !filter[j]
          })
        }
        return result.concat(array)
      }
    }, [])
  }

  function prepareOpts(opts) {
    if (typeof opts === 'undefined') opts = {};

    if (typeof opts.path === 'undefined') {
      opts.path = path.resolve ? path.resolve('.') : '.';
    }

    return opts
  }

  function prepareQueries(queries, opts) {
    if (typeof queries === 'undefined' || queries === null) {
      var config = browserslist$3.loadConfig(opts);
      if (config) {
        queries = config;
      } else {
        queries = browserslist$3.defaults;
      }
    }

    return queries
  }

  function checkQueries(queries) {
    if (!(typeof queries === 'string' || Array.isArray(queries))) {
      throw new BrowserslistError(
        'Browser queries must be an array or string. Got ' + typeof queries + '.'
      )
    }
  }

  var cache$1 = {};
  var parseCache = {};

  function browserslist$3(queries, opts) {
    opts = prepareOpts(opts);
    queries = prepareQueries(queries, opts);
    checkQueries(queries);

    var needsPath = parseQueries(queries).some(function (node) {
      return QUERIES[node.type].needsPath
    });
    var context = {
      ignoreUnknownVersions: opts.ignoreUnknownVersions,
      dangerousExtend: opts.dangerousExtend,
      mobileToDesktop: opts.mobileToDesktop,
      env: opts.env
    };
    // Removing to avoid using context.path without marking query as needsPath
    if (needsPath) {
      context.path = opts.path;
    }

    env.oldDataWarning(browserslist$3.data);
    var stats = env.getStat(opts, browserslist$3.data);
    if (stats) {
      context.customUsage = {};
      for (var browser in stats) {
        fillUsage(context.customUsage, browser, stats[browser]);
      }
    }

    var cacheKey = JSON.stringify([queries, context]);
    if (cache$1[cacheKey]) return cache$1[cacheKey]

    var result = uniq$1(resolve(queries, context)).sort(function (name1, name2) {
      name1 = name1.split(' ');
      name2 = name2.split(' ');
      if (name1[0] === name2[0]) {
        // assumptions on caniuse data
        // 1) version ranges never overlaps
        // 2) if version is not a range, it never contains `-`
        var version1 = name1[1].split('-')[0];
        var version2 = name2[1].split('-')[0];
        return compareSemver(version2.split('.'), version1.split('.'))
      } else {
        return compare(name1[0], name2[0])
      }
    });
    if (!env.env.BROWSERSLIST_DISABLE_CACHE) {
      cache$1[cacheKey] = result;
    }
    return result
  }

  function parseQueries(queries) {
    var cacheKey = JSON.stringify(queries);
    if (cacheKey in parseCache) return parseCache[cacheKey]
    var result = parseWithoutCache(QUERIES, queries);
    if (!env.env.BROWSERSLIST_DISABLE_CACHE) {
      parseCache[cacheKey] = result;
    }
    return result
  }

  browserslist$3.parse = function (queries, opts) {
    opts = prepareOpts(opts);
    queries = prepareQueries(queries, opts);
    checkQueries(queries);
    return parseQueries(queries)
  };

  // Will be filled by Can I Use data below
  browserslist$3.cache = {};
  browserslist$3.data = {};
  browserslist$3.usage = {
    global: {},
    custom: null
  };

  // Default browsers query
  browserslist$3.defaults = ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'not dead'];

  // Browser names aliases
  browserslist$3.aliases = {
    fx: 'firefox',
    ff: 'firefox',
    ios: 'ios_saf',
    explorer: 'ie',
    blackberry: 'bb',
    explorermobile: 'ie_mob',
    operamini: 'op_mini',
    operamobile: 'op_mob',
    chromeandroid: 'and_chr',
    firefoxandroid: 'and_ff',
    ucandroid: 'and_uc',
    qqandroid: 'and_qq'
  };

  // Can I Use only provides a few versions for some browsers (e.g. and_chr).
  // Fallback to a similar browser for unknown versions
  // Note op_mob is not included as its chromium versions are not in sync with Opera desktop
  browserslist$3.desktopNames = {
    and_chr: 'chrome',
    and_ff: 'firefox',
    ie_mob: 'ie',
    android: 'chrome' // has extra processing logic
  };

  // Aliases to work with joined versions like `ios_saf 7.0-7.1`
  browserslist$3.versionAliases = {};

  browserslist$3.clearCaches = env.clearCaches;
  browserslist$3.parseConfig = env.parseConfig;
  browserslist$3.readConfig = env.readConfig;
  browserslist$3.findConfigFile = env.findConfigFile;
  browserslist$3.findConfig = env.findConfig;
  browserslist$3.loadConfig = env.loadConfig;

  browserslist$3.coverage = function (browsers, stats) {
    var data;
    if (typeof stats === 'undefined') {
      data = browserslist$3.usage.global;
    } else if (stats === 'my stats') {
      var opts = {};
      opts.path = path.resolve ? path.resolve('.') : '.';
      var customStats = env.getStat(opts);
      if (!customStats) {
        throw new BrowserslistError('Custom usage statistics was not provided')
      }
      data = {};
      for (var browser in customStats) {
        fillUsage(data, browser, customStats[browser]);
      }
    } else if (typeof stats === 'string') {
      if (stats.length > 2) {
        stats = stats.toLowerCase();
      } else {
        stats = stats.toUpperCase();
      }
      env.loadCountry(browserslist$3.usage, stats, browserslist$3.data);
      data = browserslist$3.usage[stats];
    } else {
      if ('dataByBrowser' in stats) {
        stats = stats.dataByBrowser;
      }
      data = {};
      for (var name in stats) {
        for (var version in stats[name]) {
          data[name + ' ' + version] = stats[name][version];
        }
      }
    }

    return browsers.reduce(function (all, i) {
      var usage = data[i];
      if (usage === undefined) {
        usage = data[i.replace(/ \S+$/, ' 0')];
      }
      return all + (usage || 0)
    }, 0)
  };

  function nodeQuery(context, node) {
    var matched = browserslist$3.nodeVersions.filter(function (i) {
      return isVersionsMatch(i, node.version)
    });
    if (matched.length === 0) {
      if (context.ignoreUnknownVersions) {
        return []
      } else {
        throw new BrowserslistError(
          'Unknown version ' + node.version + ' of Node.js'
        )
      }
    }
    return ['node ' + matched[matched.length - 1]]
  }

  function sinceQuery(context, node) {
    var year = parseInt(node.year);
    var month = parseInt(node.month || '01') - 1;
    var day = parseInt(node.day || '01');
    return filterByYear(Date.UTC(year, month, day, 0, 0, 0), context)
  }

  function coverQuery(context, node) {
    var coverage = parseFloat(node.coverage);
    var usage = browserslist$3.usage.global;
    if (node.place) {
      if (node.place.match(/^my\s+stats$/i)) {
        if (!context.customUsage) {
          throw new BrowserslistError('Custom usage statistics was not provided')
        }
        usage = context.customUsage;
      } else {
        var place;
        if (node.place.length === 2) {
          place = node.place.toUpperCase();
        } else {
          place = node.place.toLowerCase();
        }
        env.loadCountry(browserslist$3.usage, place, browserslist$3.data);
        usage = browserslist$3.usage[place];
      }
    }
    var versions = Object.keys(usage).sort(function (a, b) {
      return usage[b] - usage[a]
    });
    var coveraged = 0;
    var result = [];
    var version;
    for (var i = 0; i < versions.length; i++) {
      version = versions[i];
      if (usage[version] === 0) break
      coveraged += usage[version];
      result.push(version);
      if (coveraged >= coverage) break
    }
    return result
  }

  var QUERIES = {
    last_major_versions: {
      matches: ['versions'],
      regexp: /^last\s+(\d+)\s+major\s+versions?$/i,
      select: function (context, node) {
        return Object.keys(agents$2).reduce(function (selected, name) {
          var data = byName(name, context);
          if (!data) return selected
          var list = getMajorVersions(data.released, node.versions);
          list = list.map(nameMapper(data.name));
          list = filterJumps(list, data.name, node.versions, context);
          return selected.concat(list)
        }, [])
      }
    },
    last_versions: {
      matches: ['versions'],
      regexp: /^last\s+(\d+)\s+versions?$/i,
      select: function (context, node) {
        return Object.keys(agents$2).reduce(function (selected, name) {
          var data = byName(name, context);
          if (!data) return selected
          var list = data.released.slice(-node.versions);
          list = list.map(nameMapper(data.name));
          list = filterJumps(list, data.name, node.versions, context);
          return selected.concat(list)
        }, [])
      }
    },
    last_electron_major_versions: {
      matches: ['versions'],
      regexp: /^last\s+(\d+)\s+electron\s+major\s+versions?$/i,
      select: function (context, node) {
        var validVersions = getMajorVersions(Object.keys(e2c), node.versions);
        return validVersions.map(function (i) {
          return 'chrome ' + e2c[i]
        })
      }
    },
    last_node_major_versions: {
      matches: ['versions'],
      regexp: /^last\s+(\d+)\s+node\s+major\s+versions?$/i,
      select: function (context, node) {
        return getMajorVersions(browserslist$3.nodeVersions, node.versions).map(
          function (version) {
            return 'node ' + version
          }
        )
      }
    },
    last_browser_major_versions: {
      matches: ['versions', 'browser'],
      regexp: /^last\s+(\d+)\s+(\w+)\s+major\s+versions?$/i,
      select: function (context, node) {
        var data = checkName(node.browser, context);
        var validVersions = getMajorVersions(data.released, node.versions);
        var list = validVersions.map(nameMapper(data.name));
        list = filterJumps(list, data.name, node.versions, context);
        return list
      }
    },
    last_electron_versions: {
      matches: ['versions'],
      regexp: /^last\s+(\d+)\s+electron\s+versions?$/i,
      select: function (context, node) {
        return Object.keys(e2c)
          .slice(-node.versions)
          .map(function (i) {
            return 'chrome ' + e2c[i]
          })
      }
    },
    last_node_versions: {
      matches: ['versions'],
      regexp: /^last\s+(\d+)\s+node\s+versions?$/i,
      select: function (context, node) {
        return browserslist$3.nodeVersions
          .slice(-node.versions)
          .map(function (version) {
            return 'node ' + version
          })
      }
    },
    last_browser_versions: {
      matches: ['versions', 'browser'],
      regexp: /^last\s+(\d+)\s+(\w+)\s+versions?$/i,
      select: function (context, node) {
        var data = checkName(node.browser, context);
        var list = data.released.slice(-node.versions).map(nameMapper(data.name));
        list = filterJumps(list, data.name, node.versions, context);
        return list
      }
    },
    unreleased_versions: {
      matches: [],
      regexp: /^unreleased\s+versions$/i,
      select: function (context) {
        return Object.keys(agents$2).reduce(function (selected, name) {
          var data = byName(name, context);
          if (!data) return selected
          var list = data.versions.filter(function (v) {
            return data.released.indexOf(v) === -1
          });
          list = list.map(nameMapper(data.name));
          return selected.concat(list)
        }, [])
      }
    },
    unreleased_electron_versions: {
      matches: [],
      regexp: /^unreleased\s+electron\s+versions?$/i,
      select: function () {
        return []
      }
    },
    unreleased_browser_versions: {
      matches: ['browser'],
      regexp: /^unreleased\s+(\w+)\s+versions?$/i,
      select: function (context, node) {
        var data = checkName(node.browser, context);
        return data.versions
          .filter(function (v) {
            return data.released.indexOf(v) === -1
          })
          .map(nameMapper(data.name))
      }
    },
    last_years: {
      matches: ['years'],
      regexp: /^last\s+(\d*.?\d+)\s+years?$/i,
      select: function (context, node) {
        return filterByYear(Date.now() - YEAR * node.years, context)
      }
    },
    since_y: {
      matches: ['year'],
      regexp: /^since (\d+)$/i,
      select: sinceQuery
    },
    since_y_m: {
      matches: ['year', 'month'],
      regexp: /^since (\d+)-(\d+)$/i,
      select: sinceQuery
    },
    since_y_m_d: {
      matches: ['year', 'month', 'day'],
      regexp: /^since (\d+)-(\d+)-(\d+)$/i,
      select: sinceQuery
    },
    popularity: {
      matches: ['sign', 'popularity'],
      regexp: /^(>=?|<=?)\s*(\d+|\d+\.\d+|\.\d+)%$/,
      select: function (context, node) {
        var popularity = parseFloat(node.popularity);
        var usage = browserslist$3.usage.global;
        return Object.keys(usage).reduce(function (result, version) {
          if (node.sign === '>') {
            if (usage[version] > popularity) {
              result.push(version);
            }
          } else if (node.sign === '<') {
            if (usage[version] < popularity) {
              result.push(version);
            }
          } else if (node.sign === '<=') {
            if (usage[version] <= popularity) {
              result.push(version);
            }
          } else if (usage[version] >= popularity) {
            result.push(version);
          }
          return result
        }, [])
      }
    },
    popularity_in_my_stats: {
      matches: ['sign', 'popularity'],
      regexp: /^(>=?|<=?)\s*(\d+|\d+\.\d+|\.\d+)%\s+in\s+my\s+stats$/,
      select: function (context, node) {
        var popularity = parseFloat(node.popularity);
        if (!context.customUsage) {
          throw new BrowserslistError('Custom usage statistics was not provided')
        }
        var usage = context.customUsage;
        return Object.keys(usage).reduce(function (result, version) {
          var percentage = usage[version];
          if (percentage == null) {
            return result
          }

          if (node.sign === '>') {
            if (percentage > popularity) {
              result.push(version);
            }
          } else if (node.sign === '<') {
            if (percentage < popularity) {
              result.push(version);
            }
          } else if (node.sign === '<=') {
            if (percentage <= popularity) {
              result.push(version);
            }
          } else if (percentage >= popularity) {
            result.push(version);
          }
          return result
        }, [])
      }
    },
    popularity_in_config_stats: {
      matches: ['sign', 'popularity', 'config'],
      regexp: /^(>=?|<=?)\s*(\d+|\d+\.\d+|\.\d+)%\s+in\s+(\S+)\s+stats$/,
      select: function (context, node) {
        var popularity = parseFloat(node.popularity);
        var stats = env.loadStat(context, node.config, browserslist$3.data);
        if (stats) {
          context.customUsage = {};
          for (var browser in stats) {
            fillUsage(context.customUsage, browser, stats[browser]);
          }
        }
        if (!context.customUsage) {
          throw new BrowserslistError('Custom usage statistics was not provided')
        }
        var usage = context.customUsage;
        return Object.keys(usage).reduce(function (result, version) {
          var percentage = usage[version];
          if (percentage == null) {
            return result
          }

          if (node.sign === '>') {
            if (percentage > popularity) {
              result.push(version);
            }
          } else if (node.sign === '<') {
            if (percentage < popularity) {
              result.push(version);
            }
          } else if (node.sign === '<=') {
            if (percentage <= popularity) {
              result.push(version);
            }
          } else if (percentage >= popularity) {
            result.push(version);
          }
          return result
        }, [])
      }
    },
    popularity_in_place: {
      matches: ['sign', 'popularity', 'place'],
      regexp: /^(>=?|<=?)\s*(\d+|\d+\.\d+|\.\d+)%\s+in\s+((alt-)?\w\w)$/,
      select: function (context, node) {
        var popularity = parseFloat(node.popularity);
        var place = node.place;
        if (place.length === 2) {
          place = place.toUpperCase();
        } else {
          place = place.toLowerCase();
        }
        env.loadCountry(browserslist$3.usage, place, browserslist$3.data);
        var usage = browserslist$3.usage[place];
        return Object.keys(usage).reduce(function (result, version) {
          var percentage = usage[version];
          if (percentage == null) {
            return result
          }

          if (node.sign === '>') {
            if (percentage > popularity) {
              result.push(version);
            }
          } else if (node.sign === '<') {
            if (percentage < popularity) {
              result.push(version);
            }
          } else if (node.sign === '<=') {
            if (percentage <= popularity) {
              result.push(version);
            }
          } else if (percentage >= popularity) {
            result.push(version);
          }
          return result
        }, [])
      }
    },
    cover: {
      matches: ['coverage'],
      regexp: /^cover\s+(\d+|\d+\.\d+|\.\d+)%$/i,
      select: coverQuery
    },
    cover_in: {
      matches: ['coverage', 'place'],
      regexp: /^cover\s+(\d+|\d+\.\d+|\.\d+)%\s+in\s+(my\s+stats|(alt-)?\w\w)$/i,
      select: coverQuery
    },
    supports: {
      matches: ['supportType', 'feature'],
      regexp: /^(?:(fully|partially)\s+)?supports\s+([\w-]+)$/,
      select: function (context, node) {
        env.loadFeature(browserslist$3.cache, node.feature);
        var withPartial = node.supportType !== 'fully';
        var features = browserslist$3.cache[node.feature];
        var result = [];
        for (var name in features) {
          var data = byName(name, context);
          // Only check desktop when latest released mobile has support
          var iMax = data.released.length - 1;
          while (iMax >= 0) {
            if (data.released[iMax] in features[name]) break
            iMax--;
          }
          var checkDesktop =
            context.mobileToDesktop &&
            name in browserslist$3.desktopNames &&
            isSupported(features[name][data.released[iMax]], withPartial);
          data.versions.forEach(function (version) {
            var flags = features[name][version];
            if (flags === undefined && checkDesktop) {
              flags = features[browserslist$3.desktopNames[name]][version];
            }
            if (isSupported(flags, withPartial)) {
              result.push(name + ' ' + version);
            }
          });
        }
        return result
      }
    },
    electron_range: {
      matches: ['from', 'to'],
      regexp: /^electron\s+([\d.]+)\s*-\s*([\d.]+)$/i,
      select: function (context, node) {
        var fromToUse = normalizeElectron(node.from);
        var toToUse = normalizeElectron(node.to);
        var from = parseFloat(node.from);
        var to = parseFloat(node.to);
        if (!e2c[fromToUse]) {
          throw new BrowserslistError('Unknown version ' + from + ' of electron')
        }
        if (!e2c[toToUse]) {
          throw new BrowserslistError('Unknown version ' + to + ' of electron')
        }
        return Object.keys(e2c)
          .filter(function (i) {
            var parsed = parseFloat(i);
            return parsed >= from && parsed <= to
          })
          .map(function (i) {
            return 'chrome ' + e2c[i]
          })
      }
    },
    node_range: {
      matches: ['from', 'to'],
      regexp: /^node\s+([\d.]+)\s*-\s*([\d.]+)$/i,
      select: function (context, node) {
        return browserslist$3.nodeVersions
          .filter(semverFilterLoose('>=', node.from))
          .filter(semverFilterLoose('<=', node.to))
          .map(function (v) {
            return 'node ' + v
          })
      }
    },
    browser_range: {
      matches: ['browser', 'from', 'to'],
      regexp: /^(\w+)\s+([\d.]+)\s*-\s*([\d.]+)$/i,
      select: function (context, node) {
        var data = checkName(node.browser, context);
        var from = parseFloat(normalizeVersion(data, node.from) || node.from);
        var to = parseFloat(normalizeVersion(data, node.to) || node.to);
        function filter(v) {
          var parsed = parseFloat(v);
          return parsed >= from && parsed <= to
        }
        return data.released.filter(filter).map(nameMapper(data.name))
      }
    },
    electron_ray: {
      matches: ['sign', 'version'],
      regexp: /^electron\s*(>=?|<=?)\s*([\d.]+)$/i,
      select: function (context, node) {
        var versionToUse = normalizeElectron(node.version);
        return Object.keys(e2c)
          .filter(generateFilter(node.sign, versionToUse))
          .map(function (i) {
            return 'chrome ' + e2c[i]
          })
      }
    },
    node_ray: {
      matches: ['sign', 'version'],
      regexp: /^node\s*(>=?|<=?)\s*([\d.]+)$/i,
      select: function (context, node) {
        return browserslist$3.nodeVersions
          .filter(generateSemverFilter(node.sign, node.version))
          .map(function (v) {
            return 'node ' + v
          })
      }
    },
    browser_ray: {
      matches: ['browser', 'sign', 'version'],
      regexp: /^(\w+)\s*(>=?|<=?)\s*([\d.]+)$/,
      select: function (context, node) {
        var version = node.version;
        var data = checkName(node.browser, context);
        var alias = browserslist$3.versionAliases[data.name][version];
        if (alias) version = alias;
        return data.released
          .filter(generateFilter(node.sign, version))
          .map(function (v) {
            return data.name + ' ' + v
          })
      }
    },
    firefox_esr: {
      matches: [],
      regexp: /^(firefox|ff|fx)\s+esr$/i,
      select: function () {
        return ['firefox 128']
      }
    },
    opera_mini_all: {
      matches: [],
      regexp: /(operamini|op_mini)\s+all/i,
      select: function () {
        return ['op_mini all']
      }
    },
    electron_version: {
      matches: ['version'],
      regexp: /^electron\s+([\d.]+)$/i,
      select: function (context, node) {
        var versionToUse = normalizeElectron(node.version);
        var chrome = e2c[versionToUse];
        if (!chrome) {
          throw new BrowserslistError(
            'Unknown version ' + node.version + ' of electron'
          )
        }
        return ['chrome ' + chrome]
      }
    },
    node_major_version: {
      matches: ['version'],
      regexp: /^node\s+(\d+)$/i,
      select: nodeQuery
    },
    node_minor_version: {
      matches: ['version'],
      regexp: /^node\s+(\d+\.\d+)$/i,
      select: nodeQuery
    },
    node_patch_version: {
      matches: ['version'],
      regexp: /^node\s+(\d+\.\d+\.\d+)$/i,
      select: nodeQuery
    },
    current_node: {
      matches: [],
      regexp: /^current\s+node$/i,
      select: function (context) {
        return [env.currentNode(resolve, context)]
      }
    },
    maintained_node: {
      matches: [],
      regexp: /^maintained\s+node\s+versions$/i,
      select: function (context) {
        var now = Date.now();
        var queries = Object.keys(jsEOL)
          .filter(function (key) {
            return (
              now < Date.parse(jsEOL[key].end) &&
              now > Date.parse(jsEOL[key].start) &&
              isEolReleased(key)
            )
          })
          .map(function (key) {
            return 'node ' + key.slice(1)
          });
        return resolve(queries, context)
      }
    },
    phantomjs_1_9: {
      matches: [],
      regexp: /^phantomjs\s+1.9$/i,
      select: function () {
        return ['safari 5']
      }
    },
    phantomjs_2_1: {
      matches: [],
      regexp: /^phantomjs\s+2.1$/i,
      select: function () {
        return ['safari 6']
      }
    },
    browser_version: {
      matches: ['browser', 'version'],
      regexp: /^(\w+)\s+(tp|[\d.]+)$/i,
      select: function (context, node) {
        var version = node.version;
        if (/^tp$/i.test(version)) version = 'TP';
        var data = checkName(node.browser, context);
        var alias = normalizeVersion(data, version);
        if (alias) {
          version = alias;
        } else {
          if (version.indexOf('.') === -1) {
            alias = version + '.0';
          } else {
            alias = version.replace(/\.0$/, '');
          }
          alias = normalizeVersion(data, alias);
          if (alias) {
            version = alias;
          } else if (context.ignoreUnknownVersions) {
            return []
          } else {
            throw new BrowserslistError(
              'Unknown version ' + version + ' of ' + node.browser
            )
          }
        }
        return [data.name + ' ' + version]
      }
    },
    browserslist_config: {
      matches: [],
      regexp: /^browserslist config$/i,
      needsPath: true,
      select: function (context) {
        return browserslist$3(undefined, context)
      }
    },
    extends: {
      matches: ['config'],
      regexp: /^extends (.+)$/i,
      needsPath: true,
      select: function (context, node) {
        return resolve(env.loadQueries(context, node.config), context)
      }
    },
    defaults: {
      matches: [],
      regexp: /^defaults$/i,
      select: function (context) {
        return resolve(browserslist$3.defaults, context)
      }
    },
    dead: {
      matches: [],
      regexp: /^dead$/i,
      select: function (context) {
        var dead = [
          'Baidu >= 0',
          'ie <= 11',
          'ie_mob <= 11',
          'bb <= 10',
          'op_mob <= 12.1',
          'samsung 4'
        ];
        return resolve(dead, context)
      }
    },
    unknown: {
      matches: [],
      regexp: /^(\w+)$/i,
      select: function (context, node) {
        if (byName(node.query, context)) {
          throw new BrowserslistError(
            'Specify versions in Browserslist query for browser ' + node.query
          )
        } else {
          throw unknownQuery(node.query)
        }
      }
    }
  }

  // Get and convert Can I Use data

  ;(function () {
    for (var name in agents$2) {
      var browser = agents$2[name];
      browserslist$3.data[name] = {
        name: name,
        versions: normalize(agents$2[name].versions),
        released: normalize(agents$2[name].versions.slice(0, -3)),
        releaseDate: agents$2[name].release_date
      };
      fillUsage(browserslist$3.usage.global, name, browser.usage_global);

      browserslist$3.versionAliases[name] = {};
      for (var i = 0; i < browser.versions.length; i++) {
        var full = browser.versions[i];
        if (!full) continue

        if (full.indexOf('-') !== -1) {
          var interval = full.split('-');
          for (var j = 0; j < interval.length; j++) {
            browserslist$3.versionAliases[name][interval[j]] = full;
          }
        }
      }
    }

    browserslist$3.nodeVersions = jsReleases.map(function (release) {
      return release.version
    });
  })();

  var browserslist_1 = browserslist$3;

  var feature$1 = {exports: {}};

  var statuses$1 = {
    1: 'ls', // WHATWG Living Standard
    2: 'rec', // W3C Recommendation
    3: 'pr', // W3C Proposed Recommendation
    4: 'cr', // W3C Candidate Recommendation
    5: 'wd', // W3C Working Draft
    6: 'other', // Non-W3C, but reputable
    7: 'unoff' // Unofficial, Editor's Draft or W3C "Note"
  };

  var supported$2 = {
    y: 1 << 0,
    n: 1 << 1,
    a: 1 << 2,
    p: 1 << 3,
    u: 1 << 4,
    x: 1 << 5,
    d: 1 << 6
  };

  const statuses = statuses$1;
  const supported$1 = supported$2;
  const browsers$2 = browsers$5.browsers;
  const versions = browserVersions$1.browserVersions;

  const MATH2LOG = Math.log(2);

  function unpackSupport(cipher) {
    // bit flags
    let stats = Object.keys(supported$1).reduce((list, support) => {
      if (cipher & supported$1[support]) list.push(support);
      return list
    }, []);

    // notes
    let notes = cipher >> 7;
    let notesArray = [];
    while (notes) {
      let note = Math.floor(Math.log(notes) / MATH2LOG) + 1;
      notesArray.unshift(`#${note}`);
      notes -= Math.pow(2, note - 1);
    }

    return stats.concat(notesArray).join(' ')
  }

  function unpackFeature(packed) {
    let unpacked = {
      status: statuses[packed.B],
      title: packed.C,
      shown: packed.D
    };
    unpacked.stats = Object.keys(packed.A).reduce((browserStats, key) => {
      let browser = packed.A[key];
      browserStats[browsers$2[key]] = Object.keys(browser).reduce(
        (stats, support) => {
          let packedVersions = browser[support].split(' ');
          let unpacked2 = unpackSupport(support);
          packedVersions.forEach(v => (stats[versions[v]] = unpacked2));
          return stats
        },
        {}
      );
      return browserStats
    }, {});
    return unpacked
  }

  feature$1.exports = unpackFeature;
  feature$1.exports.default = unpackFeature;

  var borderRadius$1;
  var hasRequiredBorderRadius;

  function requireBorderRadius () {
  	if (hasRequiredBorderRadius) return borderRadius$1;
  	hasRequiredBorderRadius = 1;
  	borderRadius$1={A:{A:{"1":"F A B","2":"K D E kC"},B:{"1":"6 7 8 9 C L M G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"1":"6 7 8 9 mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","257":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB","289":"KC oC pC","292":"lC"},D:{"1":"0 1 2 3 4 5 6 7 8 9 OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","33":"J"},E:{"1":"OB D E F A B C L M G tC uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","33":"J qC QC","129":"K rC sC"},F:{"1":"0 1 2 3 4 5 B C G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x 4C 5C EC iC 6C FC","2":"F 2C 3C"},G:{"1":"E 7C jC 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","33":"QC"},H:{"2":"UD"},I:{"1":"KC J I WD XD YD jC ZD aD","33":"VD"},J:{"1":"D A"},K:{"1":"B C H EC iC FC","2":"A"},L:{"1":"I"},M:{"1":"DC"},N:{"1":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"pD","257":"oD"}},B:4,C:"CSS3 Border-radius (rounded corners)",D:true};
  	return borderRadius$1;
  }

  var cssBoxshadow;
  var hasRequiredCssBoxshadow;

  function requireCssBoxshadow () {
  	if (hasRequiredCssBoxshadow) return cssBoxshadow;
  	hasRequiredCssBoxshadow = 1;
  	cssBoxshadow={A:{A:{"1":"F A B","2":"K D E kC"},B:{"1":"6 7 8 9 C L M G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"1":"0 1 2 3 4 5 6 7 8 9 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC","33":"oC pC"},D:{"1":"0 1 2 3 4 5 6 7 8 9 A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","33":"J OB K D E F"},E:{"1":"K D E F A B C L M G rC sC tC uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","33":"OB","164":"J qC QC"},F:{"1":"0 1 2 3 4 5 B C G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x 4C 5C EC iC 6C FC","2":"F 2C 3C"},G:{"1":"E 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","33":"7C jC","164":"QC"},H:{"2":"UD"},I:{"1":"J I YD jC ZD aD","164":"KC VD WD XD"},J:{"1":"A","33":"D"},K:{"1":"B C H EC iC FC","2":"A"},L:{"1":"I"},M:{"1":"DC"},N:{"1":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:4,C:"CSS3 Box-shadow",D:true};
  	return cssBoxshadow;
  }

  var cssAnimation;
  var hasRequiredCssAnimation;

  function requireCssAnimation () {
  	if (hasRequiredCssAnimation) return cssAnimation;
  	hasRequiredCssAnimation = 1;
  	cssAnimation={A:{A:{"1":"A B","2":"K D E F kC"},B:{"1":"6 7 8 9 C L M G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"1":"0 1 2 3 4 5 6 7 8 9 N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC J oC pC","33":"OB K D E F A B C L M G"},D:{"1":"6 7 8 9 fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","33":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB"},E:{"1":"F A B C L M G uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"qC QC","33":"K D E rC sC tC","292":"J OB"},F:{"1":"SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x FC","2":"F B 2C 3C 4C 5C EC iC 6C","33":"0 1 2 3 4 5 C G N O P PB y z QB RB"},G:{"1":"CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","33":"E 9C AD BD","164":"QC 7C jC 8C"},H:{"2":"UD"},I:{"1":"I","33":"J YD jC ZD aD","164":"KC VD WD XD"},J:{"33":"D A"},K:{"1":"H FC","2":"A B C EC iC"},L:{"1":"I"},M:{"1":"DC"},N:{"1":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:5,C:"CSS Animation",D:true};
  	return cssAnimation;
  }

  var cssTransitions;
  var hasRequiredCssTransitions;

  function requireCssTransitions () {
  	if (hasRequiredCssTransitions) return cssTransitions;
  	hasRequiredCssTransitions = 1;
  	cssTransitions={A:{A:{"1":"A B","2":"K D E F kC"},B:{"1":"6 7 8 9 C L M G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"1":"0 1 2 3 4 5 6 7 8 9 N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC oC pC","33":"OB K D E F A B C L M G","164":"J"},D:{"1":"4 5 6 7 8 9 QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","33":"0 1 2 3 J OB K D E F A B C L M G N O P PB y z"},E:{"1":"D E F A B C L M G sC tC uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","33":"K rC","164":"J OB qC QC"},F:{"1":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x FC","2":"F 2C 3C","33":"C","164":"B 4C 5C EC iC 6C"},G:{"1":"E AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","33":"9C","164":"QC 7C jC 8C"},H:{"2":"UD"},I:{"1":"I ZD aD","33":"KC J VD WD XD YD jC"},J:{"1":"A","33":"D"},K:{"1":"H FC","33":"C","164":"A B EC iC"},L:{"1":"I"},M:{"1":"DC"},N:{"1":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:5,C:"CSS3 Transitions",D:true};
  	return cssTransitions;
  }

  var transforms2d;
  var hasRequiredTransforms2d;

  function requireTransforms2d () {
  	if (hasRequiredTransforms2d) return transforms2d;
  	hasRequiredTransforms2d = 1;
  	transforms2d={A:{A:{"2":"kC","8":"K D E","129":"A B","161":"F"},B:{"1":"6 7 8 9 O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","129":"C L M G N"},C:{"1":"0 1 2 3 4 5 6 7 8 9 N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC","33":"J OB K D E F A B C L M G oC pC"},D:{"1":"6 7 8 9 YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","33":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB"},E:{"1":"F A B C L M G uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","33":"J OB K D E qC QC rC sC tC"},F:{"1":"1 2 3 4 5 QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x FC","2":"F 2C 3C","33":"0 B C G N O P PB y z 4C 5C EC iC 6C"},G:{"1":"CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","33":"E QC 7C jC 8C 9C AD BD"},H:{"2":"UD"},I:{"1":"I","33":"KC J VD WD XD YD jC ZD aD"},J:{"33":"D A"},K:{"1":"B C H EC iC FC","2":"A"},L:{"1":"I"},M:{"1":"DC"},N:{"1":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:4,C:"CSS3 2D Transforms",D:true};
  	return transforms2d;
  }

  var transforms3d;
  var hasRequiredTransforms3d;

  function requireTransforms3d () {
  	if (hasRequiredTransforms3d) return transforms3d;
  	hasRequiredTransforms3d = 1;
  	transforms3d={A:{A:{"2":"K D E F kC","132":"A B"},B:{"1":"6 7 8 9 C L M G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"1":"0 1 2 3 4 5 6 7 8 9 N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC J OB K D E F oC pC","33":"A B C L M G"},D:{"1":"6 7 8 9 YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"J OB K D E F A B","33":"0 1 2 3 4 5 C L M G N O P PB y z QB RB SB TB UB VB WB XB"},E:{"1":"TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"qC QC","33":"J OB K D E rC sC tC","257":"F A B C L M G uC RC EC FC vC wC xC SC"},F:{"1":"1 2 3 4 5 QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"F B C 2C 3C 4C 5C EC iC 6C FC","33":"0 G N O P PB y z"},G:{"1":"TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","33":"E QC 7C jC 8C 9C AD BD","257":"CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC"},H:{"2":"UD"},I:{"1":"I","2":"VD WD XD","33":"KC J YD jC ZD aD"},J:{"33":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"132":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:5,C:"CSS3 3D Transforms",D:true};
  	return transforms3d;
  }

  var cssGradients;
  var hasRequiredCssGradients;

  function requireCssGradients () {
  	if (hasRequiredCssGradients) return cssGradients;
  	hasRequiredCssGradients = 1;
  	cssGradients={A:{A:{"1":"A B","2":"K D E F kC"},B:{"1":"6 7 8 9 C L M G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"1":"6 7 8 9 YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC oC","260":"0 1 2 3 4 5 N O P PB y z QB RB SB TB UB VB WB XB","292":"J OB K D E F A B C L M G pC"},D:{"1":"4 5 6 7 8 9 QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","33":"0 1 2 3 A B C L M G N O P PB y z","548":"J OB K D E F"},E:{"1":"TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"qC QC","260":"D E F A B C L M G sC tC uC RC EC FC vC wC xC SC","292":"K rC","804":"J OB"},F:{"1":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x FC","2":"F B 2C 3C 4C 5C","33":"C 6C","164":"EC iC"},G:{"1":"TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","260":"E AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC","292":"8C 9C","804":"QC 7C jC"},H:{"2":"UD"},I:{"1":"I ZD aD","33":"J YD jC","548":"KC VD WD XD"},J:{"1":"A","548":"D"},K:{"1":"H FC","2":"A B","33":"C","164":"EC iC"},L:{"1":"I"},M:{"1":"DC"},N:{"1":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:4,C:"CSS Gradients",D:true};
  	return cssGradients;
  }

  var css3Boxsizing;
  var hasRequiredCss3Boxsizing;

  function requireCss3Boxsizing () {
  	if (hasRequiredCss3Boxsizing) return css3Boxsizing;
  	hasRequiredCss3Boxsizing = 1;
  	css3Boxsizing={A:{A:{"1":"E F A B","8":"K D kC"},B:{"1":"6 7 8 9 C L M G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"1":"6 7 8 9 RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","33":"0 1 2 3 4 5 lC KC J OB K D E F A B C L M G N O P PB y z QB oC pC"},D:{"1":"0 1 2 3 4 5 6 7 8 9 A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","33":"J OB K D E F"},E:{"1":"K D E F A B C L M G rC sC tC uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","33":"J OB qC QC"},F:{"1":"0 1 2 3 4 5 B C G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x 2C 3C 4C 5C EC iC 6C FC","2":"F"},G:{"1":"E 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","33":"QC 7C jC"},H:{"1":"UD"},I:{"1":"J I YD jC ZD aD","33":"KC VD WD XD"},J:{"1":"A","33":"D"},K:{"1":"A B C H EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"1":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:5,C:"CSS3 Box-sizing",D:true};
  	return css3Boxsizing;
  }

  var cssFilters;
  var hasRequiredCssFilters;

  function requireCssFilters () {
  	if (hasRequiredCssFilters) return cssFilters;
  	hasRequiredCssFilters = 1;
  	cssFilters={A:{A:{"2":"K D E F A B kC"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","1028":"L M G N O P","1346":"C"},C:{"1":"6 7 8 9 XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC oC","196":"WB","516":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB pC"},D:{"1":"6 7 8 9 pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"J OB K D E F A B C L M G N O","33":"0 1 2 3 4 5 P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB"},E:{"1":"A B C L M G uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB qC QC rC","33":"K D E F sC tC"},F:{"1":"cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"F B C 2C 3C 4C 5C EC iC 6C FC","33":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB"},G:{"1":"DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C jC 8C","33":"E 9C AD BD CD"},H:{"2":"UD"},I:{"1":"I","2":"KC J VD WD XD YD jC","33":"ZD aD"},J:{"2":"D","33":"A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z dD eD fD RC gD hD iD jD kD HC IC JC lD","33":"J bD cD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:5,C:"CSS Filter Effects",D:true};
  	return cssFilters;
  }

  var cssFilterFunction;
  var hasRequiredCssFilterFunction;

  function requireCssFilterFunction () {
  	if (hasRequiredCssFilterFunction) return cssFilterFunction;
  	hasRequiredCssFilterFunction = 1;
  	cssFilterFunction={A:{A:{"2":"K D E F A B kC"},B:{"2":"6 7 8 9 C L M G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"2":"0 1 2 3 4 5 6 7 8 9 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC oC pC"},D:{"2":"0 1 2 3 4 5 6 7 8 9 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC"},E:{"1":"A B C L M G uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB K D E qC QC rC sC tC","33":"F"},F:{"2":"0 1 2 3 4 5 F B C G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x 2C 3C 4C 5C EC iC 6C FC"},G:{"1":"ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"E QC 7C jC 8C 9C AD BD","33":"CD DD"},H:{"2":"UD"},I:{"2":"KC J I VD WD XD YD jC ZD aD"},J:{"2":"D A"},K:{"2":"A B C H EC iC FC"},L:{"2":"I"},M:{"2":"DC"},N:{"2":"A B"},O:{"2":"GC"},P:{"2":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"2":"mD"},R:{"2":"nD"},S:{"2":"oD pD"}},B:5,C:"CSS filter() function",D:true};
  	return cssFilterFunction;
  }

  var cssBackdropFilter;
  var hasRequiredCssBackdropFilter;

  function requireCssBackdropFilter () {
  	if (hasRequiredCssBackdropFilter) return cssBackdropFilter;
  	hasRequiredCssBackdropFilter = 1;
  	cssBackdropFilter={A:{A:{"2":"K D E F A B kC"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M G N","257":"O P"},C:{"1":"6 7 8 9 m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"0 1 2 3 4 5 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B oC pC","578":"4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l"},D:{"1":"6 7 8 9 AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB","194":"jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B"},E:{"1":"JC eC fC gC hC 1C","2":"J OB K D E qC QC rC sC tC","33":"F A B C L M G uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C"},F:{"1":"yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"0 1 2 3 4 5 F B C G N O P PB y z QB RB SB TB UB VB 2C 3C 4C 5C EC iC 6C FC","194":"WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB"},G:{"1":"JC eC fC gC hC","2":"E QC 7C jC 8C 9C AD BD","33":"CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD"},H:{"2":"UD"},I:{"1":"I","2":"KC J VD WD XD YD jC ZD aD"},J:{"2":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z hD iD jD kD HC IC JC lD","2":"J","194":"bD cD dD eD fD RC gD"},Q:{"2":"mD"},R:{"1":"nD"},S:{"2":"oD pD"}},B:7,C:"CSS Backdrop Filter",D:true};
  	return cssBackdropFilter;
  }

  var cssElementFunction;
  var hasRequiredCssElementFunction;

  function requireCssElementFunction () {
  	if (hasRequiredCssElementFunction) return cssElementFunction;
  	hasRequiredCssElementFunction = 1;
  	cssElementFunction={A:{A:{"2":"K D E F A B kC"},B:{"2":"6 7 8 9 C L M G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"33":"0 1 2 3 4 5 6 7 8 9 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","164":"lC KC oC pC"},D:{"2":"0 1 2 3 4 5 6 7 8 9 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC"},E:{"2":"J OB K D E F A B C L M G qC QC rC sC tC uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C"},F:{"2":"0 1 2 3 4 5 F B C G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x 2C 3C 4C 5C EC iC 6C FC"},G:{"2":"E QC 7C jC 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC"},H:{"2":"UD"},I:{"2":"KC J I VD WD XD YD jC ZD aD"},J:{"2":"D A"},K:{"2":"A B C H EC iC FC"},L:{"2":"I"},M:{"33":"DC"},N:{"2":"A B"},O:{"2":"GC"},P:{"2":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"2":"mD"},R:{"2":"nD"},S:{"33":"oD pD"}},B:5,C:"CSS element() function",D:true};
  	return cssElementFunction;
  }

  var multicolumn;
  var hasRequiredMulticolumn;

  function requireMulticolumn () {
  	if (hasRequiredMulticolumn) return multicolumn;
  	hasRequiredMulticolumn = 1;
  	multicolumn={A:{A:{"1":"A B","2":"K D E F kC"},B:{"1":"C L M G N O P","516":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"132":"oB pB qB rB sB tB uB LC vB MC wB xB yB","164":"0 1 2 3 4 5 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oC pC","516":"zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a","1028":"6 7 8 9 b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC"},D:{"420":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB","516":"6 7 8 9 mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC"},E:{"1":"A B C L M G RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","132":"F uC","164":"D E tC","420":"J OB K qC QC rC sC"},F:{"1":"C EC iC 6C FC","2":"F B 2C 3C 4C 5C","420":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB","516":"ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x"},G:{"1":"ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","132":"CD DD","164":"E AD BD","420":"QC 7C jC 8C 9C"},H:{"1":"UD"},I:{"420":"KC J VD WD XD YD jC ZD aD","516":"I"},J:{"420":"D A"},K:{"1":"C EC iC FC","2":"A B","516":"H"},L:{"516":"I"},M:{"1028":"DC"},N:{"1":"A B"},O:{"516":"GC"},P:{"420":"J","516":"0 1 2 3 4 5 y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"516":"mD"},R:{"516":"nD"},S:{"164":"oD pD"}},B:4,C:"CSS3 Multiple column layout",D:true};
  	return multicolumn;
  }

  var userSelectNone;
  var hasRequiredUserSelectNone;

  function requireUserSelectNone () {
  	if (hasRequiredUserSelectNone) return userSelectNone;
  	hasRequiredUserSelectNone = 1;
  	userSelectNone={A:{A:{"2":"K D E F kC","33":"A B"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","33":"C L M G N O P"},C:{"1":"6 7 8 9 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","33":"0 1 2 3 4 5 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B oC pC"},D:{"1":"6 7 8 9 qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","33":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB"},E:{"33":"J OB K D E F A B C L M G qC QC rC sC tC uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C"},F:{"1":"dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"F B C 2C 3C 4C 5C EC iC 6C FC","33":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB"},G:{"33":"E QC 7C jC 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC"},H:{"2":"UD"},I:{"1":"I","33":"KC J VD WD XD YD jC ZD aD"},J:{"33":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"33":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z cD dD eD fD RC gD hD iD jD kD HC IC JC lD","33":"J bD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"pD","33":"oD"}},B:5,C:"CSS user-select: none",D:true};
  	return userSelectNone;
  }

  var flexbox;
  var hasRequiredFlexbox;

  function requireFlexbox () {
  	if (hasRequiredFlexbox) return flexbox;
  	hasRequiredFlexbox = 1;
  	flexbox={A:{A:{"2":"K D E F kC","1028":"B","1316":"A"},B:{"1":"6 7 8 9 C L M G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"1":"6 7 8 9 QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","164":"lC KC J OB K D E F A B C L M G N O P PB y z oC pC","516":"0 1 2 3 4 5"},D:{"1":"6 7 8 9 RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","33":"0 1 2 3 4 5 z QB","164":"J OB K D E F A B C L M G N O P PB y"},E:{"1":"F A B C L M G uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","33":"D E sC tC","164":"J OB K qC QC rC"},F:{"1":"0 1 2 3 4 5 O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x FC","2":"F B C 2C 3C 4C 5C EC iC 6C","33":"G N"},G:{"1":"CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","33":"E AD BD","164":"QC 7C jC 8C 9C"},H:{"1":"UD"},I:{"1":"I ZD aD","164":"KC J VD WD XD YD jC"},J:{"1":"A","164":"D"},K:{"1":"H FC","2":"A B C EC iC"},L:{"1":"I"},M:{"1":"DC"},N:{"1":"B","292":"A"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:4,C:"CSS Flexible Box Layout Module",D:true};
  	return flexbox;
  }

  var calc;
  var hasRequiredCalc;

  function requireCalc () {
  	if (hasRequiredCalc) return calc;
  	hasRequiredCalc = 1;
  	calc={A:{A:{"2":"K D E kC","260":"F","516":"A B"},B:{"1":"6 7 8 9 C L M G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"1":"0 1 2 3 4 5 6 7 8 9 N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC oC pC","33":"J OB K D E F A B C L M G"},D:{"1":"4 5 6 7 8 9 QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"J OB K D E F A B C L M G N O P","33":"0 1 2 3 PB y z"},E:{"1":"D E F A B C L M G sC tC uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB qC QC rC","33":"K"},F:{"1":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"F B C 2C 3C 4C 5C EC iC 6C FC"},G:{"1":"E AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C jC 8C","33":"9C"},H:{"2":"UD"},I:{"1":"I","2":"KC J VD WD XD YD jC","132":"ZD aD"},J:{"1":"A","2":"D"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"1":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:4,C:"calc() as CSS unit value",D:true};
  	return calc;
  }

  var backgroundImgOpts;
  var hasRequiredBackgroundImgOpts;

  function requireBackgroundImgOpts () {
  	if (hasRequiredBackgroundImgOpts) return backgroundImgOpts;
  	hasRequiredBackgroundImgOpts = 1;
  	backgroundImgOpts={A:{A:{"1":"F A B","2":"K D E kC"},B:{"1":"6 7 8 9 C L M G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"1":"0 1 2 3 4 5 6 7 8 9 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC oC","36":"pC"},D:{"1":"0 1 2 3 4 5 6 7 8 9 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","516":"J OB K D E F A B C L M"},E:{"1":"D E F A B C L M G tC uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","772":"J OB K qC QC rC sC"},F:{"1":"0 1 2 3 4 5 B C G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x 4C 5C EC iC 6C FC","2":"F 2C","36":"3C"},G:{"1":"E AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","4":"QC 7C jC 9C","516":"8C"},H:{"132":"UD"},I:{"1":"I ZD aD","36":"VD","516":"KC J YD jC","548":"WD XD"},J:{"1":"D A"},K:{"1":"A B C H EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"1":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:4,C:"CSS3 Background-image options",D:true};
  	return backgroundImgOpts;
  }

  var backgroundClipText;
  var hasRequiredBackgroundClipText;

  function requireBackgroundClipText () {
  	if (hasRequiredBackgroundClipText) return backgroundClipText;
  	hasRequiredBackgroundClipText = 1;
  	backgroundClipText={A:{A:{"2":"K D E F A B kC"},B:{"1":"G N O P","33":"C L M","129":"BB CB DB EB FB GB HB IB JB KB LB MB NB I","161":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB"},C:{"1":"6 7 8 9 lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"0 1 2 3 4 5 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB oC pC"},D:{"129":"BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","161":"0 1 2 3 4 5 6 7 8 9 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB"},E:{"2":"qC","129":"GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","388":"OB K D E F A B C L M G rC sC tC uC RC EC FC vC wC xC SC TC","420":"J QC"},F:{"2":"F B C 2C 3C 4C 5C EC iC 6C FC","129":"p q r s t u v w x","161":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o"},G:{"129":"GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","388":"E QC 7C jC 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC"},H:{"2":"UD"},I:{"16":"KC VD WD XD","129":"I","161":"J YD jC ZD aD"},J:{"161":"D A"},K:{"16":"A B C EC iC FC","129":"H"},L:{"129":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"161":"GC"},P:{"1":"3 4 5","161":"0 1 2 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"161":"mD"},R:{"161":"nD"},S:{"1":"oD pD"}},B:7,C:"Background-clip: text",D:true};
  	return backgroundClipText;
  }

  var fontFeature;
  var hasRequiredFontFeature;

  function requireFontFeature () {
  	if (hasRequiredFontFeature) return fontFeature;
  	hasRequiredFontFeature = 1;
  	fontFeature={A:{A:{"1":"A B","2":"K D E F kC"},B:{"1":"6 7 8 9 C L M G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"1":"6 7 8 9 WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC oC pC","33":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB","164":"J OB K D E F A B C L M"},D:{"1":"6 7 8 9 kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"J OB K D E F A B C L M G","33":"0 1 2 3 4 5 z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB","292":"N O P PB y"},E:{"1":"A B C L M G uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"D E F qC QC sC tC","4":"J OB K rC"},F:{"1":"XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"F B C 2C 3C 4C 5C EC iC 6C FC","33":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB"},G:{"1":"DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"E AD BD CD","4":"QC 7C jC 8C 9C"},H:{"2":"UD"},I:{"1":"I","2":"KC J VD WD XD YD jC","33":"ZD aD"},J:{"2":"D","33":"A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD","33":"J"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:2,C:"CSS font-feature-settings",D:true};
  	return fontFeature;
  }

  var fontKerning;
  var hasRequiredFontKerning;

  function requireFontKerning () {
  	if (hasRequiredFontKerning) return fontKerning;
  	hasRequiredFontKerning = 1;
  	fontKerning={A:{A:{"2":"K D E F A B kC"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M G N O P"},C:{"1":"6 7 8 9 WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"0 1 lC KC J OB K D E F A B C L M G N O P PB y z oC pC","194":"2 3 4 5 QB RB SB TB UB VB"},D:{"1":"6 7 8 9 VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB","33":"RB SB TB UB"},E:{"1":"A B C L M G uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB K qC QC rC sC","33":"D E F tC"},F:{"1":"0 1 2 3 4 5 y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"F B C G 2C 3C 4C 5C EC iC 6C FC","33":"N O P PB"},G:{"1":"ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C jC 8C 9C AD","33":"E BD CD DD ED FD GD HD"},H:{"2":"UD"},I:{"1":"I aD","2":"KC J VD WD XD YD jC","33":"ZD"},J:{"2":"D","33":"A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:4,C:"CSS3 font-kerning",D:true};
  	return fontKerning;
  }

  var borderImage$1;
  var hasRequiredBorderImage;

  function requireBorderImage () {
  	if (hasRequiredBorderImage) return borderImage$1;
  	hasRequiredBorderImage = 1;
  	borderImage$1={A:{A:{"1":"B","2":"K D E F A kC"},B:{"1":"6 7 8 9 M G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","129":"C L"},C:{"1":"6 7 8 9 mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC","260":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB","804":"J OB K D E F A B C L M oC pC"},D:{"1":"6 7 8 9 sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","260":"nB oB pB qB rB","388":"SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB","1412":"0 1 2 3 4 5 G N O P PB y z QB RB","1956":"J OB K D E F A B C L M"},E:{"1":"TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","129":"A B C L M G uC RC EC FC vC wC xC SC","1412":"K D E F sC tC","1956":"J OB qC QC rC"},F:{"1":"fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"F 2C 3C","260":"aB bB cB dB eB","388":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB","1796":"4C 5C","1828":"B C EC iC 6C FC"},G:{"1":"TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","129":"DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC","1412":"E 9C AD BD CD","1956":"QC 7C jC 8C"},H:{"1828":"UD"},I:{"1":"I","388":"ZD aD","1956":"KC J VD WD XD YD jC"},J:{"1412":"A","1924":"D"},K:{"1":"H","2":"A","1828":"B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"1":"B","2":"A"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z dD eD fD RC gD hD iD jD kD HC IC JC lD","260":"bD cD","388":"J"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"pD","260":"oD"}},B:4,C:"CSS3 Border images",D:true};
  	return borderImage$1;
  }

  var cssSelection;
  var hasRequiredCssSelection;

  function requireCssSelection () {
  	if (hasRequiredCssSelection) return cssSelection;
  	hasRequiredCssSelection = 1;
  	cssSelection={A:{A:{"1":"F A B","2":"K D E kC"},B:{"1":"6 7 8 9 C L M G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"1":"6 7 8 9 wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","33":"0 1 2 3 4 5 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC oC pC"},D:{"1":"0 1 2 3 4 5 6 7 8 9 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC"},E:{"1":"J OB K D E F A B C L M G qC QC rC sC tC uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C"},F:{"1":"0 1 2 3 4 5 B C G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x 2C 3C 4C 5C EC iC 6C FC","2":"F"},G:{"2":"E QC 7C jC 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC"},H:{"2":"UD"},I:{"1":"I ZD aD","2":"KC J VD WD XD YD jC"},J:{"1":"A","2":"D"},K:{"1":"C H iC FC","16":"A B EC"},L:{"1":"I"},M:{"1":"DC"},N:{"1":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"pD","33":"oD"}},B:5,C:"::selection CSS pseudo-element",D:true};
  	return cssSelection;
  }

  var cssPlaceholder;
  var hasRequiredCssPlaceholder;

  function requireCssPlaceholder () {
  	if (hasRequiredCssPlaceholder) return cssPlaceholder;
  	hasRequiredCssPlaceholder = 1;
  	cssPlaceholder={A:{A:{"2":"K D E F A B kC"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","36":"C L M G N O P"},C:{"1":"6 7 8 9 nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","33":"0 1 2 3 4 5 PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB","130":"lC KC J OB K D E F A B C L M G N O P oC pC"},D:{"1":"6 7 8 9 tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","36":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB"},E:{"1":"B C L M G RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J qC QC","36":"OB K D E F A rC sC tC uC"},F:{"1":"gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"F B C 2C 3C 4C 5C EC iC 6C FC","36":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB"},G:{"1":"FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C","36":"E jC 8C 9C AD BD CD DD ED"},H:{"2":"UD"},I:{"1":"I","36":"KC J VD WD XD YD jC ZD aD"},J:{"36":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"36":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z dD eD fD RC gD hD iD jD kD HC IC JC lD","36":"J bD cD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"pD","33":"oD"}},B:5,C:"::placeholder CSS pseudo-element",D:true};
  	return cssPlaceholder;
  }

  var cssPlaceholderShown;
  var hasRequiredCssPlaceholderShown;

  function requireCssPlaceholderShown () {
  	if (hasRequiredCssPlaceholderShown) return cssPlaceholderShown;
  	hasRequiredCssPlaceholderShown = 1;
  	cssPlaceholderShown={A:{A:{"2":"K D E F kC","292":"A B"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M G N O P"},C:{"1":"6 7 8 9 nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC oC pC","164":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB"},D:{"1":"6 7 8 9 jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB"},E:{"1":"F A B C L M G uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB K D E qC QC rC sC tC"},F:{"1":"WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"0 1 2 3 4 5 F B C G N O P PB y z QB RB SB TB UB VB 2C 3C 4C 5C EC iC 6C FC"},G:{"1":"CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"E QC 7C jC 8C 9C AD BD"},H:{"2":"UD"},I:{"1":"I","2":"KC J VD WD XD YD jC ZD aD"},J:{"2":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD","2":"J"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"pD","164":"oD"}},B:5,C:":placeholder-shown CSS pseudo-class",D:true};
  	return cssPlaceholderShown;
  }

  var cssHyphens;
  var hasRequiredCssHyphens;

  function requireCssHyphens () {
  	if (hasRequiredCssHyphens) return cssHyphens;
  	hasRequiredCssHyphens = 1;
  	cssHyphens={A:{A:{"2":"K D E F kC","33":"A B"},B:{"1":"6 7 8 9 o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","33":"C L M G N O P","132":"Q H R S T U V W","260":"X Y Z a b c d e f g h i j k l m n"},C:{"1":"6 7 8 9 fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC J OB oC pC","33":"0 1 2 3 4 5 K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB"},D:{"1":"6 7 8 9 X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB","132":"rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W"},E:{"1":"IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB qC QC","33":"K D E F A B C L M G rC sC tC uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC"},F:{"1":"a b c d e f g h i j k l m n o p q r s t u v w x","2":"0 1 2 3 4 5 F B C G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB 2C 3C 4C 5C EC iC 6C FC","132":"eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z"},G:{"1":"IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C","33":"E jC 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD"},H:{"2":"UD"},I:{"1":"I","2":"KC J VD WD XD YD jC ZD aD"},J:{"2":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z cD dD eD fD RC gD hD iD jD kD HC IC JC lD","2":"J","132":"bD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:4,C:"CSS Hyphenation",D:true};
  	return cssHyphens;
  }

  var fullscreen$1;
  var hasRequiredFullscreen;

  function requireFullscreen () {
  	if (hasRequiredFullscreen) return fullscreen$1;
  	hasRequiredFullscreen = 1;
  	fullscreen$1={A:{A:{"2":"K D E F A kC","548":"B"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","516":"C L M G N O P"},C:{"1":"6 7 8 9 yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC J OB K D E F oC pC","676":"0 1 2 3 4 5 A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB","1700":"jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB"},D:{"1":"6 7 8 9 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"J OB K D E F A B C L M","676":"G N O P PB","804":"0 1 2 3 4 5 y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B"},E:{"1":"XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB qC QC","548":"TC GC yC HC UC VC WC","676":"rC","804":"K D E F A B C L M G sC tC uC RC EC FC vC wC xC SC"},F:{"1":"yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x FC","2":"F B C 2C 3C 4C 5C EC iC 6C","804":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB"},G:{"2":"E QC 7C jC 8C 9C AD BD CD DD ED FD GD HD","2052":"ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC"},H:{"2":"UD"},I:{"2":"KC J I VD WD XD YD jC ZD aD"},J:{"2":"D","292":"A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A","548":"B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z RC gD hD iD jD kD HC IC JC lD","804":"J bD cD dD eD fD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:1,C:"Fullscreen API",D:true};
  	return fullscreen$1;
  }

  var mdnCssBackdropPseudoElement;
  var hasRequiredMdnCssBackdropPseudoElement;

  function requireMdnCssBackdropPseudoElement () {
  	if (hasRequiredMdnCssBackdropPseudoElement) return mdnCssBackdropPseudoElement;
  	hasRequiredMdnCssBackdropPseudoElement = 1;
  	mdnCssBackdropPseudoElement={A:{D:{"1":"6 7 8 9 ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB","33":"UB VB WB XB YB"},L:{"1":"I"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","33":"C L M G N O P"},C:{"1":"6 7 8 9 jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"0 1 2 3 4 5 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB oC pC"},M:{"1":"DC"},A:{"2":"K D E F A kC","33":"B"},F:{"1":"2 3 4 5 QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"F B C G N O P 2C 3C 4C 5C EC iC 6C FC","33":"0 1 PB y z"},K:{"1":"H","2":"A B C EC iC FC"},E:{"1":"TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC","2":"J OB K D E F A B C L M G qC QC rC sC tC uC RC EC FC vC wC xC SC 1C"},G:{"1":"TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"E QC 7C jC 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC"},P:{"1":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},I:{"1":"I","2":"KC J VD WD XD YD jC","33":"ZD aD"}},B:6,C:"CSS ::backdrop pseudo-element",D:undefined};
  	return mdnCssBackdropPseudoElement;
  }

  var cssFileSelectorButton;
  var hasRequiredCssFileSelectorButton;

  function requireCssFileSelectorButton () {
  	if (hasRequiredCssFileSelectorButton) return cssFileSelectorButton;
  	hasRequiredCssFileSelectorButton = 1;
  	cssFileSelectorButton={A:{D:{"1":"6 7 8 9 Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","33":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X"},L:{"1":"I"},B:{"1":"6 7 8 9 Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","33":"C L M G N O P Q H R S T U V W X"},C:{"1":"6 7 8 9 NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"0 1 2 3 4 5 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R oC pC"},M:{"1":"DC"},A:{"2":"K D E F kC","33":"A B"},F:{"1":"9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"F B C 2C 3C 4C 5C EC iC 6C FC","33":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B"},K:{"1":"H","2":"A B C EC iC FC"},E:{"1":"G wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC","2":"1C","33":"J OB K D E F A B C L M qC QC rC sC tC uC RC EC FC vC"},G:{"1":"PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","33":"E QC 7C jC 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD"},P:{"1":"0 1 2 3 4 5 y z kD HC IC JC lD","33":"J bD cD dD eD fD RC gD hD iD jD"},I:{"1":"I","2":"KC J VD WD XD YD jC","33":"ZD aD"}},B:6,C:"::file-selector-button CSS pseudo-element",D:undefined};
  	return cssFileSelectorButton;
  }

  var cssAutofill;
  var hasRequiredCssAutofill;

  function requireCssAutofill () {
  	if (hasRequiredCssAutofill) return cssAutofill;
  	hasRequiredCssAutofill = 1;
  	cssAutofill={A:{D:{"1":"6 7 8 9 t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","33":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s"},L:{"1":"I"},B:{"1":"6 7 8 9 t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M G N O P","33":"Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s"},C:{"1":"6 7 8 9 V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"0 1 2 3 4 5 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U oC pC"},M:{"1":"DC"},A:{"2":"K D E F A B kC"},F:{"1":"f g h i j k l m n o p q r s t u v w x","2":"F B C 2C 3C 4C 5C EC iC 6C FC","33":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e"},K:{"1":"H","2":"A B C EC iC FC"},E:{"1":"G xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC","2":"1C","33":"J OB K D E F A B C L M qC QC rC sC tC uC RC EC FC vC wC"},G:{"1":"QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","33":"E QC 7C jC 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD"},P:{"1":"0 1 2 3 4 5 z","33":"J y bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},I:{"1":"I","2":"KC J VD WD XD YD jC","33":"ZD aD"}},B:6,C:":autofill CSS pseudo-class",D:undefined};
  	return cssAutofill;
  }

  var css3Tabsize;
  var hasRequiredCss3Tabsize;

  function requireCss3Tabsize () {
  	if (hasRequiredCss3Tabsize) return css3Tabsize;
  	hasRequiredCss3Tabsize = 1;
  	css3Tabsize={A:{A:{"2":"K D E F A B kC"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M G N O P"},C:{"1":"6 7 8 9 a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC oC pC","33":"pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z","164":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB"},D:{"1":"6 7 8 9 eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"J OB K D E F A B C L M G N O P PB y","132":"0 1 2 3 4 5 z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB"},E:{"1":"M G vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB K qC QC rC","132":"D E F A B C L sC tC uC RC EC FC"},F:{"1":"RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"F 2C 3C 4C","132":"0 1 2 3 4 5 G N O P PB y z QB","164":"B C 5C EC iC 6C FC"},G:{"1":"ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C jC 8C 9C","132":"E AD BD CD DD ED FD GD HD ID JD KD LD MD"},H:{"164":"UD"},I:{"1":"I","2":"KC J VD WD XD YD jC","132":"ZD aD"},J:{"132":"D A"},K:{"1":"H","2":"A","164":"B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"164":"oD pD"}},B:4,C:"CSS3 tab-size",D:true};
  	return css3Tabsize;
  }

  var intrinsicWidth;
  var hasRequiredIntrinsicWidth;

  function requireIntrinsicWidth () {
  	if (hasRequiredIntrinsicWidth) return intrinsicWidth;
  	hasRequiredIntrinsicWidth = 1;
  	intrinsicWidth={A:{A:{"2":"K D E F A B kC"},B:{"2":"C L M G N O P","1025":"6 7 8 9 d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","1537":"Q H R S T U V W X Y Z a b c"},C:{"2":"lC","932":"0 1 2 3 4 5 KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB oC pC","2308":"6 7 8 9 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC"},D:{"2":"J OB K D E F A B C L M G N O P PB y z","545":"0 1 2 3 4 5 QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB","1025":"6 7 8 9 d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","1537":"iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c"},E:{"1":"HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB K qC QC rC","516":"B C L M G EC FC vC wC xC SC TC GC yC","548":"F A uC RC","676":"D E sC tC"},F:{"2":"F B C 2C 3C 4C 5C EC iC 6C FC","513":"WB","545":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB","1025":"e f g h i j k l m n o p q r s t u v w x","1537":"VB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d"},G:{"1":"HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C jC 8C 9C","516":"OD PD QD SC TC GC RD","548":"CD DD ED FD GD HD ID JD KD LD MD ND","676":"E AD BD"},H:{"2":"UD"},I:{"2":"KC J VD WD XD YD jC","545":"ZD aD","1025":"I"},J:{"2":"D","545":"A"},K:{"2":"A B C EC iC FC","1025":"H"},L:{"1025":"I"},M:{"2308":"DC"},N:{"2":"A B"},O:{"1537":"GC"},P:{"545":"J","1025":"0 1 2 3 4 5 y z IC JC lD","1537":"bD cD dD eD fD RC gD hD iD jD kD HC"},Q:{"1537":"mD"},R:{"1537":"nD"},S:{"932":"oD","2308":"pD"}},B:5,C:"Intrinsic & Extrinsic Sizing",D:true};
  	return intrinsicWidth;
  }

  var cssWidthStretch;
  var hasRequiredCssWidthStretch;

  function requireCssWidthStretch () {
  	if (hasRequiredCssWidthStretch) return cssWidthStretch;
  	hasRequiredCssWidthStretch = 1;
  	cssWidthStretch={A:{D:{"2":"J OB K D E F A B C L M G N O P PB y z","33":"0 1 2 3 4 5 6 7 8 9 QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC"},L:{"33":"I"},B:{"2":"C L M G N O P","33":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"2":"lC","33":"0 1 2 3 4 5 6 7 8 9 KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC oC pC"},M:{"33":"DC"},A:{"2":"K D E F A B kC"},F:{"2":"F B C 2C 3C 4C 5C EC iC 6C FC","33":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x"},K:{"2":"A B C EC iC FC","33":"H"},E:{"2":"J OB K qC QC rC sC 1C","33":"D E F A B C L M G tC uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC"},G:{"2":"QC 7C jC 8C 9C","33":"E AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC"},P:{"2":"J","33":"0 1 2 3 4 5 y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},I:{"2":"KC J VD WD XD YD jC","33":"I ZD aD"}},B:6,C:"width: stretch property",D:undefined};
  	return cssWidthStretch;
  }

  var css3CursorsNewer;
  var hasRequiredCss3CursorsNewer;

  function requireCss3CursorsNewer () {
  	if (hasRequiredCss3CursorsNewer) return css3CursorsNewer;
  	hasRequiredCss3CursorsNewer = 1;
  	css3CursorsNewer={A:{A:{"2":"K D E F A B kC"},B:{"1":"6 7 8 9 C L M G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"1":"2 3 4 5 6 7 8 9 QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","33":"0 1 lC KC J OB K D E F A B C L M G N O P PB y z oC pC"},D:{"1":"6 7 8 9 ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","33":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB"},E:{"1":"F A B C L M G uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","33":"J OB K D E qC QC rC sC tC"},F:{"1":"2 3 4 5 C QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x 6C FC","2":"F B 2C 3C 4C 5C EC iC","33":"0 1 G N O P PB y z"},G:{"2":"E QC 7C jC 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC"},H:{"2":"UD"},I:{"1":"I","2":"KC J VD WD XD YD jC ZD aD"},J:{"33":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"2":"DC"},N:{"2":"A B"},O:{"1":"GC"},P:{"2":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"2":"oD pD"}},B:2,C:"CSS3 Cursors: zoom-in & zoom-out",D:true};
  	return css3CursorsNewer;
  }

  var css3CursorsGrab;
  var hasRequiredCss3CursorsGrab;

  function requireCss3CursorsGrab () {
  	if (hasRequiredCss3CursorsGrab) return css3CursorsGrab;
  	hasRequiredCss3CursorsGrab = 1;
  	css3CursorsGrab={A:{A:{"2":"K D E F A B kC"},B:{"1":"6 7 8 9 G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M"},C:{"1":"5 6 7 8 9 QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","33":"0 1 2 3 4 lC KC J OB K D E F A B C L M G N O P PB y z oC pC"},D:{"1":"6 7 8 9 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","33":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B"},E:{"1":"B C L M G EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","33":"J OB K D E F A qC QC rC sC tC uC RC"},F:{"1":"C rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x 6C FC","2":"F B 2C 3C 4C 5C EC iC","33":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB"},G:{"2":"E QC 7C jC 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC"},H:{"2":"UD"},I:{"1":"I","2":"KC J VD WD XD YD jC ZD aD"},J:{"33":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"2":"DC"},N:{"2":"A B"},O:{"1":"GC"},P:{"2":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"2":"oD pD"}},B:2,C:"CSS grab & grabbing cursors",D:true};
  	return css3CursorsGrab;
  }

  var cssSticky;
  var hasRequiredCssSticky;

  function requireCssSticky () {
  	if (hasRequiredCssSticky) return cssSticky;
  	hasRequiredCssSticky = 1;
  	cssSticky={A:{A:{"2":"K D E F A B kC"},B:{"1":"6 7 8 9 a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M G","1028":"Q H R S T U V W X Y Z","4100":"N O P"},C:{"1":"6 7 8 9 LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"0 1 2 3 lC KC J OB K D E F A B C L M G N O P PB y z oC pC","194":"4 5 QB RB SB TB","516":"UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB"},D:{"1":"6 7 8 9 a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 J OB K D E F A B C L M G N O P PB y z ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB","322":"1 2 3 4 5 QB RB SB TB UB VB WB XB YB oB pB qB rB","1028":"sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z"},E:{"1":"L M G vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB K qC QC rC","33":"E F A B C tC uC RC EC FC","2084":"D sC"},F:{"1":"CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"0 1 2 3 4 5 F B C G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB 2C 3C 4C 5C EC iC 6C FC","322":"bB cB dB","1028":"eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC"},G:{"1":"KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C jC 8C","33":"E BD CD DD ED FD GD HD ID JD","2084":"9C AD"},H:{"2":"UD"},I:{"1":"I","2":"KC J VD WD XD YD jC ZD aD"},J:{"2":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z cD dD eD fD RC gD hD iD jD kD HC IC JC lD","2":"J bD"},Q:{"1028":"mD"},R:{"1":"nD"},S:{"1":"pD","516":"oD"}},B:5,C:"CSS position:sticky",D:true};
  	return cssSticky;
  }

  var pointer;
  var hasRequiredPointer;

  function requirePointer () {
  	if (hasRequiredPointer) return pointer;
  	hasRequiredPointer = 1;
  	pointer={A:{A:{"1":"B","2":"K D E F kC","164":"A"},B:{"1":"6 7 8 9 C L M G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"1":"6 7 8 9 LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC J OB oC pC","8":"0 1 2 3 4 5 K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB","328":"dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB"},D:{"1":"6 7 8 9 rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"J OB K D E F A B C L M G N O P PB y z","8":"0 1 2 3 4 5 QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB","584":"oB pB qB"},E:{"1":"L M G vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB K qC QC rC","8":"D E F A B C sC tC uC RC EC","1096":"FC"},F:{"1":"eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"F B C 2C 3C 4C 5C EC iC 6C FC","8":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB","584":"bB cB dB"},G:{"1":"LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","8":"E QC 7C jC 8C 9C AD BD CD DD ED FD GD HD ID JD","6148":"KD"},H:{"2":"UD"},I:{"1":"I","8":"KC J VD WD XD YD jC ZD aD"},J:{"8":"D A"},K:{"1":"H","2":"A","8":"B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"1":"B","36":"A"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z cD dD eD fD RC gD hD iD jD kD HC IC JC lD","2":"bD","8":"J"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"pD","328":"oD"}},B:2,C:"Pointer events",D:true};
  	return pointer;
  }

  var textDecoration$1;
  var hasRequiredTextDecoration;

  function requireTextDecoration () {
  	if (hasRequiredTextDecoration) return textDecoration$1;
  	hasRequiredTextDecoration = 1;
  	textDecoration$1={A:{A:{"2":"K D E F A B kC"},B:{"2":"C L M G N O P","2052":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"2":"lC KC J OB oC pC","1028":"6 7 8 9 YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","1060":"0 1 2 3 4 5 K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB"},D:{"2":"0 1 2 3 J OB K D E F A B C L M G N O P PB y z","226":"4 5 QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB","2052":"6 7 8 9 tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC"},E:{"2":"J OB K D qC QC rC sC","772":"L M G FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","804":"E F A B C uC RC EC","1316":"tC"},F:{"2":"0 1 2 3 4 5 F B C G N O P PB y z QB RB SB TB UB VB WB 2C 3C 4C 5C EC iC 6C FC","226":"XB YB ZB aB bB cB dB eB fB","2052":"gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x"},G:{"2":"QC 7C jC 8C 9C AD","292":"E BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC"},H:{"2":"UD"},I:{"1":"I","2":"KC J VD WD XD YD jC ZD aD"},J:{"2":"D A"},K:{"2":"A B C EC iC FC","2052":"H"},L:{"2052":"I"},M:{"1028":"DC"},N:{"2":"A B"},O:{"2052":"GC"},P:{"2":"J bD cD","2052":"0 1 2 3 4 5 y z dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"2052":"mD"},R:{"2052":"nD"},S:{"1028":"oD pD"}},B:4,C:"text-decoration styling",D:true};
  	return textDecoration$1;
  }

  var mdnTextDecorationShorthand;
  var hasRequiredMdnTextDecorationShorthand;

  function requireMdnTextDecorationShorthand () {
  	if (hasRequiredMdnTextDecorationShorthand) return mdnTextDecorationShorthand;
  	hasRequiredMdnTextDecorationShorthand = 1;
  	mdnTextDecorationShorthand={A:{D:{"1":"6 7 8 9 tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB"},L:{"1":"I"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M G N O P"},C:{"1":"0 1 2 3 4 5 6 7 8 9 K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC J OB oC pC"},M:{"1":"DC"},A:{"2":"K D E F A B kC"},F:{"1":"gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"0 1 2 3 4 5 F B C G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB 2C 3C 4C 5C EC iC 6C FC"},K:{"1":"H","2":"A B C EC iC FC"},E:{"2":"J OB K D qC QC rC sC tC 1C","33":"E F A B C L M G uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC"},G:{"2":"QC 7C jC 8C 9C AD","33":"E BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC"},P:{"1":"0 1 2 3 4 5 y z dD eD fD RC gD hD iD jD kD HC IC JC lD","2":"J bD cD"},I:{"1":"I","2":"KC J VD WD XD YD jC ZD aD"}},B:6,C:"text-decoration shorthand property",D:undefined};
  	return mdnTextDecorationShorthand;
  }

  var mdnTextDecorationColor;
  var hasRequiredMdnTextDecorationColor;

  function requireMdnTextDecorationColor () {
  	if (hasRequiredMdnTextDecorationColor) return mdnTextDecorationColor;
  	hasRequiredMdnTextDecorationColor = 1;
  	mdnTextDecorationColor={A:{D:{"1":"6 7 8 9 tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB"},L:{"1":"I"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M G N O P"},C:{"1":"6 7 8 9 YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC J OB oC pC","33":"0 1 2 3 4 5 K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB"},M:{"1":"DC"},A:{"2":"K D E F A B kC"},F:{"1":"gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"0 1 2 3 4 5 F B C G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB 2C 3C 4C 5C EC iC 6C FC"},K:{"1":"H","2":"A B C EC iC FC"},E:{"1":"L M G FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC","2":"J OB K D qC QC rC sC tC 1C","33":"E F A B C uC RC EC"},G:{"1":"JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C jC 8C 9C AD","33":"E BD CD DD ED FD GD HD ID"},P:{"1":"0 1 2 3 4 5 y z dD eD fD RC gD hD iD jD kD HC IC JC lD","2":"J bD cD"},I:{"1":"I","2":"KC J VD WD XD YD jC ZD aD"}},B:6,C:"text-decoration-color property",D:undefined};
  	return mdnTextDecorationColor;
  }

  var mdnTextDecorationLine;
  var hasRequiredMdnTextDecorationLine;

  function requireMdnTextDecorationLine () {
  	if (hasRequiredMdnTextDecorationLine) return mdnTextDecorationLine;
  	hasRequiredMdnTextDecorationLine = 1;
  	mdnTextDecorationLine={A:{D:{"1":"6 7 8 9 tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB"},L:{"1":"I"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M G N O P"},C:{"1":"6 7 8 9 YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC J OB oC pC","33":"0 1 2 3 4 5 K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB"},M:{"1":"DC"},A:{"2":"K D E F A B kC"},F:{"1":"gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"0 1 2 3 4 5 F B C G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB 2C 3C 4C 5C EC iC 6C FC"},K:{"1":"H","2":"A B C EC iC FC"},E:{"1":"L M G FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC","2":"J OB K D qC QC rC sC tC 1C","33":"E F A B C uC RC EC"},G:{"1":"JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C jC 8C 9C AD","33":"E BD CD DD ED FD GD HD ID"},P:{"1":"0 1 2 3 4 5 y z dD eD fD RC gD hD iD jD kD HC IC JC lD","2":"J bD cD"},I:{"1":"I","2":"KC J VD WD XD YD jC ZD aD"}},B:6,C:"text-decoration-line property",D:undefined};
  	return mdnTextDecorationLine;
  }

  var mdnTextDecorationStyle;
  var hasRequiredMdnTextDecorationStyle;

  function requireMdnTextDecorationStyle () {
  	if (hasRequiredMdnTextDecorationStyle) return mdnTextDecorationStyle;
  	hasRequiredMdnTextDecorationStyle = 1;
  	mdnTextDecorationStyle={A:{D:{"1":"6 7 8 9 tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB"},L:{"1":"I"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M G N O P"},C:{"1":"6 7 8 9 YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC J OB oC pC","33":"0 1 2 3 4 5 K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB"},M:{"1":"DC"},A:{"2":"K D E F A B kC"},F:{"1":"gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"0 1 2 3 4 5 F B C G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB 2C 3C 4C 5C EC iC 6C FC"},K:{"1":"H","2":"A B C EC iC FC"},E:{"1":"L M G FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC","2":"J OB K D qC QC rC sC tC 1C","33":"E F A B C uC RC EC"},G:{"1":"JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C jC 8C 9C AD","33":"E BD CD DD ED FD GD HD ID"},P:{"1":"0 1 2 3 4 5 y z dD eD fD RC gD hD iD jD kD HC IC JC lD","2":"J bD cD"},I:{"1":"I","2":"KC J VD WD XD YD jC ZD aD"}},B:6,C:"text-decoration-style property",D:undefined};
  	return mdnTextDecorationStyle;
  }

  var textSizeAdjust;
  var hasRequiredTextSizeAdjust;

  function requireTextSizeAdjust () {
  	if (hasRequiredTextSizeAdjust) return textSizeAdjust;
  	hasRequiredTextSizeAdjust = 1;
  	textSizeAdjust={A:{A:{"2":"K D E F A B kC"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","33":"C L M G N O P"},C:{"2":"0 1 2 3 4 5 6 7 8 9 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC oC pC"},D:{"1":"6 7 8 9 qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 1 2 3 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB","258":"4"},E:{"2":"J OB K D E F A B C L M G qC QC sC tC uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","258":"rC"},F:{"1":"fB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"0 1 2 3 4 5 F B C G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB gB 2C 3C 4C 5C EC iC 6C FC"},G:{"2":"QC 7C jC","33":"E 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC"},H:{"2":"UD"},I:{"1":"I","2":"KC J VD WD XD YD jC ZD aD"},J:{"2":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"33":"DC"},N:{"161":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD","2":"J"},Q:{"1":"mD"},R:{"1":"nD"},S:{"2":"oD pD"}},B:7,C:"CSS text-size-adjust",D:true};
  	return textSizeAdjust;
  }

  var cssMasks;
  var hasRequiredCssMasks;

  function requireCssMasks () {
  	if (hasRequiredCssMasks) return cssMasks;
  	hasRequiredCssMasks = 1;
  	cssMasks={A:{A:{"2":"K D E F A B kC"},B:{"1":"BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M G N","164":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB","3138":"O","12292":"P"},C:{"1":"6 7 8 9 pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC","260":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB oC pC"},D:{"1":"BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","164":"0 1 2 3 4 5 6 7 8 9 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB"},E:{"1":"TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"qC QC","164":"J OB K D E F A B C L M G rC sC tC uC RC EC FC vC wC xC SC"},F:{"1":"p q r s t u v w x","2":"F B C 2C 3C 4C 5C EC iC 6C FC","164":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o"},G:{"1":"TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","164":"E QC 7C jC 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC"},H:{"2":"UD"},I:{"1":"I","164":"ZD aD","676":"KC J VD WD XD YD jC"},J:{"164":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"164":"GC"},P:{"1":"3 4 5","164":"0 1 2 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"164":"mD"},R:{"164":"nD"},S:{"1":"pD","260":"oD"}},B:4,C:"CSS Masks",D:true};
  	return cssMasks;
  }

  var cssClipPath;
  var hasRequiredCssClipPath;

  function requireCssClipPath () {
  	if (hasRequiredCssClipPath) return cssClipPath;
  	hasRequiredCssClipPath = 1;
  	cssClipPath={A:{A:{"2":"K D E F A B kC"},B:{"2":"C L M G N O","260":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","3138":"P"},C:{"1":"6 7 8 9 qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC","132":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB oC pC","644":"jB kB lB mB nB oB pB"},D:{"2":"0 1 J OB K D E F A B C L M G N O P PB y z","260":"6 7 8 9 rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","292":"2 3 4 5 QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB"},E:{"2":"J OB K qC QC rC sC","260":"M G vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","292":"D E F A B C L tC uC RC EC FC"},F:{"2":"F B C 2C 3C 4C 5C EC iC 6C FC","260":"eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","292":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB"},G:{"2":"QC 7C jC 8C 9C","260":"KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","292":"E AD BD CD DD ED FD GD HD ID JD"},H:{"2":"UD"},I:{"2":"KC J VD WD XD YD jC","260":"I","292":"ZD aD"},J:{"2":"D A"},K:{"2":"A B C EC iC FC","260":"H"},L:{"260":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"260":"GC"},P:{"260":"0 1 2 3 4 5 y z cD dD eD fD RC gD hD iD jD kD HC IC JC lD","292":"J bD"},Q:{"260":"mD"},R:{"260":"nD"},S:{"1":"pD","644":"oD"}},B:4,C:"CSS clip-path property (for HTML)",D:true};
  	return cssClipPath;
  }

  var cssBoxdecorationbreak;
  var hasRequiredCssBoxdecorationbreak;

  function requireCssBoxdecorationbreak () {
  	if (hasRequiredCssBoxdecorationbreak) return cssBoxdecorationbreak;
  	hasRequiredCssBoxdecorationbreak = 1;
  	cssBoxdecorationbreak={A:{A:{"2":"K D E F A B kC"},B:{"1":"LB MB NB I","2":"C L M G N O P","164":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB"},C:{"1":"6 7 8 9 UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"0 1 2 3 4 5 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB oC pC"},D:{"1":"LB MB NB I OC DC PC","2":"J OB K D E F A B C L M G N O P PB y z","164":"0 1 2 3 4 5 6 7 8 9 QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB"},E:{"2":"J OB K qC QC rC","164":"D E F A B C L M G sC tC uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C"},F:{"2":"F 2C 3C 4C 5C","129":"B C EC iC 6C FC","164":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x"},G:{"2":"QC 7C jC 8C 9C","164":"E AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC"},H:{"132":"UD"},I:{"1":"I","2":"KC J VD WD XD YD jC","164":"ZD aD"},J:{"2":"D","164":"A"},K:{"2":"A","129":"B C EC iC FC","164":"H"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"164":"GC"},P:{"164":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"164":"mD"},R:{"164":"nD"},S:{"1":"oD pD"}},B:4,C:"CSS box-decoration-break",D:true};
  	return cssBoxdecorationbreak;
  }

  var objectFit;
  var hasRequiredObjectFit;

  function requireObjectFit () {
  	if (hasRequiredObjectFit) return objectFit;
  	hasRequiredObjectFit = 1;
  	objectFit={A:{A:{"2":"K D E F A B kC"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M G","260":"N O P"},C:{"1":"6 7 8 9 YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"0 1 2 3 4 5 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB oC pC"},D:{"1":"6 7 8 9 UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB"},E:{"1":"A B C L M G RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB K D qC QC rC sC","132":"E F tC uC"},F:{"1":"0 1 2 3 4 5 PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"F G N O P 2C 3C 4C","33":"B C 5C EC iC 6C FC"},G:{"1":"ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C jC 8C 9C AD","132":"E BD CD DD"},H:{"33":"UD"},I:{"1":"I aD","2":"KC J VD WD XD YD jC ZD"},J:{"2":"D A"},K:{"1":"H","2":"A","33":"B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:4,C:"CSS3 object-fit/object-position",D:true};
  	return objectFit;
  }

  var cssShapes;
  var hasRequiredCssShapes;

  function requireCssShapes () {
  	if (hasRequiredCssShapes) return cssShapes;
  	hasRequiredCssShapes = 1;
  	cssShapes={A:{A:{"2":"K D E F A B kC"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M G N O P"},C:{"1":"6 7 8 9 wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"0 1 2 3 4 5 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB oC pC","322":"nB oB pB qB rB sB tB uB LC vB MC"},D:{"1":"6 7 8 9 ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB","194":"WB XB YB"},E:{"1":"B C L M G RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB K D qC QC rC sC","33":"E F A tC uC"},F:{"1":"2 3 4 5 QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"0 1 F B C G N O P PB y z 2C 3C 4C 5C EC iC 6C FC"},G:{"1":"FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C jC 8C 9C AD","33":"E BD CD DD ED"},H:{"2":"UD"},I:{"1":"I","2":"KC J VD WD XD YD jC ZD aD"},J:{"2":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"pD","2":"oD"}},B:4,C:"CSS Shapes Level 1",D:true};
  	return cssShapes;
  }

  var textOverflow;
  var hasRequiredTextOverflow;

  function requireTextOverflow () {
  	if (hasRequiredTextOverflow) return textOverflow;
  	hasRequiredTextOverflow = 1;
  	textOverflow={A:{A:{"1":"K D E F A B","2":"kC"},B:{"1":"6 7 8 9 C L M G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"1":"0 1 2 3 4 5 6 7 8 9 D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","8":"lC KC J OB K oC pC"},D:{"1":"0 1 2 3 4 5 6 7 8 9 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC"},E:{"1":"J OB K D E F A B C L M G qC QC rC sC tC uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C"},F:{"1":"0 1 2 3 4 5 B C G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x EC iC 6C FC","33":"F 2C 3C 4C 5C"},G:{"1":"E QC 7C jC 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC"},H:{"1":"UD"},I:{"1":"KC J I VD WD XD YD jC ZD aD"},J:{"1":"D A"},K:{"1":"H FC","33":"A B C EC iC"},L:{"1":"I"},M:{"1":"DC"},N:{"1":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:2,C:"CSS3 Text-overflow",D:true};
  	return textOverflow;
  }

  var cssDeviceadaptation;
  var hasRequiredCssDeviceadaptation;

  function requireCssDeviceadaptation () {
  	if (hasRequiredCssDeviceadaptation) return cssDeviceadaptation;
  	hasRequiredCssDeviceadaptation = 1;
  	cssDeviceadaptation={A:{A:{"2":"K D E F kC","164":"A B"},B:{"66":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","164":"C L M G N O P"},C:{"2":"0 1 2 3 4 5 6 7 8 9 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC oC pC"},D:{"2":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB","66":"6 7 8 9 RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC"},E:{"2":"J OB K D E F A B C L M G qC QC rC sC tC uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C"},F:{"2":"0 1 2 3 4 5 F B C G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB 2C 3C 4C 5C EC iC 6C FC","66":"cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x"},G:{"2":"E QC 7C jC 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC"},H:{"292":"UD"},I:{"2":"KC J I VD WD XD YD jC ZD aD"},J:{"2":"D A"},K:{"2":"A H","292":"B C EC iC FC"},L:{"2":"I"},M:{"2":"DC"},N:{"164":"A B"},O:{"2":"GC"},P:{"2":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"66":"mD"},R:{"2":"nD"},S:{"2":"oD pD"}},B:5,C:"CSS Device Adaptation",D:true};
  	return cssDeviceadaptation;
  }

  var cssMediaResolution;
  var hasRequiredCssMediaResolution;

  function requireCssMediaResolution () {
  	if (hasRequiredCssMediaResolution) return cssMediaResolution;
  	hasRequiredCssMediaResolution = 1;
  	cssMediaResolution={A:{A:{"2":"K D E kC","132":"F A B"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","1028":"C L M G N O P"},C:{"1":"6 7 8 9 wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC","260":"J OB K D E F A B C L M G oC pC","1028":"0 1 2 3 4 5 N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC"},D:{"1":"6 7 8 9 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","548":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB","1028":"RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B"},E:{"1":"HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"qC QC","548":"J OB K D E F A B C L M G rC sC tC uC RC EC FC vC wC xC SC TC GC yC"},F:{"1":"rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x FC","2":"F","548":"B C 2C 3C 4C 5C EC iC 6C","1028":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB"},G:{"1":"HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","16":"QC","548":"E 7C jC 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD"},H:{"132":"UD"},I:{"1":"I","16":"VD WD","548":"KC J XD YD jC","1028":"ZD aD"},J:{"548":"D A"},K:{"1":"H FC","548":"A B C EC iC"},L:{"1":"I"},M:{"1":"DC"},N:{"132":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z RC gD hD iD jD kD HC IC JC lD","1028":"J bD cD dD eD fD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:4,C:"Media Queries: resolution feature",D:true};
  	return cssMediaResolution;
  }

  var cssTextAlignLast;
  var hasRequiredCssTextAlignLast;

  function requireCssTextAlignLast () {
  	if (hasRequiredCssTextAlignLast) return cssTextAlignLast;
  	hasRequiredCssTextAlignLast = 1;
  	cssTextAlignLast={A:{A:{"132":"K D E F A B kC"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","4":"C L M G N O P"},C:{"1":"6 7 8 9 lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC J OB K D E F A B oC pC","33":"0 1 2 3 4 5 C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB"},D:{"1":"6 7 8 9 jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB","322":"XB YB ZB aB bB cB dB eB fB gB hB iB"},E:{"1":"HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB K D E F A B C L M G qC QC rC sC tC uC RC EC FC vC wC xC SC TC GC yC"},F:{"1":"WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"F B C G N O P PB y z 2C 3C 4C 5C EC iC 6C FC","578":"0 1 2 3 4 5 QB RB SB TB UB VB"},G:{"1":"HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"E QC 7C jC 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD"},H:{"2":"UD"},I:{"1":"I","2":"KC J VD WD XD YD jC ZD aD"},J:{"2":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"132":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD","2":"J"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"pD","33":"oD"}},B:4,C:"CSS3 text-align-last",D:true};
  	return cssTextAlignLast;
  }

  var cssCrispEdges;
  var hasRequiredCssCrispEdges;

  function requireCssCrispEdges () {
  	if (hasRequiredCssCrispEdges) return cssCrispEdges;
  	hasRequiredCssCrispEdges = 1;
  	cssCrispEdges={A:{A:{"2":"K kC","2340":"D E F A B"},B:{"2":"C L M G N O P","1025":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"1":"6 7 8 9 c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC oC","513":"zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b","545":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB pC"},D:{"2":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB","1025":"6 7 8 9 dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC"},E:{"1":"A B C L M G RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB qC QC rC","164":"K","4644":"D E F sC tC uC"},F:{"2":"0 1 2 3 4 5 F B G N O P PB y z 2C 3C 4C 5C EC iC","545":"C 6C FC","1025":"QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x"},G:{"1":"ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C jC","4260":"8C 9C","4644":"E AD BD CD DD"},H:{"2":"UD"},I:{"2":"KC J VD WD XD YD jC ZD aD","1025":"I"},J:{"2":"D","4260":"A"},K:{"2":"A B EC iC","545":"C FC","1025":"H"},L:{"1025":"I"},M:{"1":"DC"},N:{"2340":"A B"},O:{"1025":"GC"},P:{"1025":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1025":"mD"},R:{"1025":"nD"},S:{"1":"pD","4097":"oD"}},B:4,C:"Crisp edges/pixelated images",D:true};
  	return cssCrispEdges;
  }

  var cssLogicalProps;
  var hasRequiredCssLogicalProps;

  function requireCssLogicalProps () {
  	if (hasRequiredCssLogicalProps) return cssLogicalProps;
  	hasRequiredCssLogicalProps = 1;
  	cssLogicalProps={A:{A:{"2":"K D E F A B kC"},B:{"1":"6 7 8 9 Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M G N O P","1028":"W X","1540":"Q H R S T U V"},C:{"1":"6 7 8 9 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC","164":"0 1 2 3 4 5 KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB oC pC","1540":"dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB"},D:{"1":"6 7 8 9 Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","292":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B","1028":"W X","1540":"3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V"},E:{"1":"G xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","292":"J OB K D E F A B C qC QC rC sC tC uC RC EC","1540":"L M FC vC","3076":"wC"},F:{"1":"AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"F B C 2C 3C 4C 5C EC iC 6C FC","292":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB","1028":"8B 9B","1540":"sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B"},G:{"1":"QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","292":"E QC 7C jC 8C 9C AD BD CD DD ED FD GD HD ID","1540":"JD KD LD MD ND OD","3076":"PD"},H:{"2":"UD"},I:{"1":"I","292":"KC J VD WD XD YD jC ZD aD"},J:{"292":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z kD HC IC JC lD","292":"J bD cD dD eD fD","1540":"RC gD hD iD jD"},Q:{"1540":"mD"},R:{"1":"nD"},S:{"1":"pD","1540":"oD"}},B:5,C:"CSS Logical Properties",D:true};
  	return cssLogicalProps;
  }

  var cssAppearance;
  var hasRequiredCssAppearance;

  function requireCssAppearance () {
  	if (hasRequiredCssAppearance) return cssAppearance;
  	hasRequiredCssAppearance = 1;
  	cssAppearance={A:{A:{"2":"K D E F A B kC"},B:{"1":"6 7 8 9 T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","33":"S","164":"Q H R","388":"C L M G N O P"},C:{"1":"6 7 8 9 H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","164":"XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q","676":"0 1 2 3 4 5 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB oC pC"},D:{"1":"6 7 8 9 T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","33":"S","164":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R"},E:{"1":"TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","164":"J OB K D E F A B C L M G qC QC rC sC tC uC RC EC FC vC wC xC SC"},F:{"1":"7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"F B C 2C 3C 4C 5C EC iC 6C FC","33":"4B 5B 6B","164":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B"},G:{"1":"TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","164":"E QC 7C jC 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC"},H:{"2":"UD"},I:{"1":"I","164":"KC J VD WD XD YD jC ZD aD"},J:{"164":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A","388":"B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z jD kD HC IC JC lD","164":"J bD cD dD eD fD RC gD hD iD"},Q:{"164":"mD"},R:{"1":"nD"},S:{"1":"pD","164":"oD"}},B:5,C:"CSS Appearance",D:true};
  	return cssAppearance;
  }

  var cssSnappoints;
  var hasRequiredCssSnappoints;

  function requireCssSnappoints () {
  	if (hasRequiredCssSnappoints) return cssSnappoints;
  	hasRequiredCssSnappoints = 1;
  	cssSnappoints={A:{A:{"2":"K D E F kC","6308":"A","6436":"B"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","6436":"C L M G N O P"},C:{"1":"6 7 8 9 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"0 1 2 3 4 5 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB oC pC","2052":"bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B"},D:{"1":"6 7 8 9 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB","8258":"0B 1B 2B"},E:{"1":"B C L M G EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB K D E qC QC rC sC tC","3108":"F A uC RC"},F:{"1":"yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"0 1 2 3 4 5 F B C G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB 2C 3C 4C 5C EC iC 6C FC","8258":"qB rB sB tB uB vB wB xB"},G:{"1":"GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"E QC 7C jC 8C 9C AD BD","3108":"CD DD ED FD"},H:{"2":"UD"},I:{"1":"I","2":"KC J VD WD XD YD jC ZD aD"},J:{"2":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z RC gD hD iD jD kD HC IC JC lD","2":"J bD cD dD eD fD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"pD","2052":"oD"}},B:4,C:"CSS Scroll Snap",D:true};
  	return cssSnappoints;
  }

  var cssRegions;
  var hasRequiredCssRegions;

  function requireCssRegions () {
  	if (hasRequiredCssRegions) return cssRegions;
  	hasRequiredCssRegions = 1;
  	cssRegions={A:{A:{"2":"K D E F kC","420":"A B"},B:{"2":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","420":"C L M G N O P"},C:{"2":"0 1 2 3 4 5 6 7 8 9 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC oC pC"},D:{"2":"6 7 8 9 J OB K D E F A B C L M XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","36":"G N O P","66":"0 1 2 3 4 5 PB y z QB RB SB TB UB VB WB"},E:{"2":"J OB K C L M G qC QC rC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","33":"D E F A B sC tC uC RC"},F:{"2":"0 1 2 3 4 5 F B C G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x 2C 3C 4C 5C EC iC 6C FC"},G:{"2":"QC 7C jC 8C 9C HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","33":"E AD BD CD DD ED FD GD"},H:{"2":"UD"},I:{"2":"KC J I VD WD XD YD jC ZD aD"},J:{"2":"D A"},K:{"2":"A B C H EC iC FC"},L:{"2":"I"},M:{"2":"DC"},N:{"420":"A B"},O:{"2":"GC"},P:{"2":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"2":"mD"},R:{"2":"nD"},S:{"2":"oD pD"}},B:5,C:"CSS Regions",D:true};
  	return cssRegions;
  }

  var cssImageSet;
  var hasRequiredCssImageSet;

  function requireCssImageSet () {
  	if (hasRequiredCssImageSet) return cssImageSet;
  	hasRequiredCssImageSet = 1;
  	cssImageSet={A:{A:{"2":"K D E F A B kC"},B:{"1":"6 7 8 9 x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M G N O P","164":"Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v","2049":"w"},C:{"1":"6 7 8 9 w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"0 1 2 3 4 5 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U oC pC","66":"V W","2305":"Y Z a b c d e f g h i j k l m n o p q r s t u v","2820":"X"},D:{"1":"6 7 8 9 x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"J OB K D E F A B C L M G N O P PB y","164":"0 1 2 3 4 5 z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v","2049":"w"},E:{"1":"IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB qC QC rC","132":"A B C L RC EC FC vC","164":"K D E F sC tC uC","1540":"M G wC xC SC TC GC yC HC UC VC WC XC YC zC"},F:{"1":"j k l m n o p q r s t u v w x","2":"F B C 2C 3C 4C 5C EC iC 6C FC","164":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h","2049":"i"},G:{"1":"IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C jC 8C","132":"ED FD GD HD ID JD KD LD MD ND","164":"E 9C AD BD CD DD","1540":"OD PD QD SC TC GC RD HC UC VC WC XC YC SD"},H:{"2":"UD"},I:{"1":"I","2":"KC J VD WD XD YD jC","164":"ZD aD"},J:{"2":"D","164":"A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"164":"GC"},P:{"1":"1 2 3 4 5","164":"0 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"164":"mD"},R:{"164":"nD"},S:{"2":"oD pD"}},B:5,C:"CSS image-set",D:true};
  	return cssImageSet;
  }

  var cssWritingMode;
  var hasRequiredCssWritingMode;

  function requireCssWritingMode () {
  	if (hasRequiredCssWritingMode) return cssWritingMode;
  	hasRequiredCssWritingMode = 1;
  	cssWritingMode={A:{A:{"132":"K D E F A B kC"},B:{"1":"6 7 8 9 C L M G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"1":"6 7 8 9 dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"0 1 2 3 4 5 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB oC pC","322":"YB ZB aB bB cB"},D:{"1":"6 7 8 9 kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"J OB K","16":"D","33":"0 1 2 3 4 5 E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB"},E:{"1":"B C L M G EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J qC QC","16":"OB","33":"K D E F A rC sC tC uC RC"},F:{"1":"XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"F B C 2C 3C 4C 5C EC iC 6C FC","33":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB"},G:{"1":"GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","16":"QC 7C jC","33":"E 8C 9C AD BD CD DD ED FD"},H:{"2":"UD"},I:{"1":"I","2":"VD WD XD","33":"KC J YD jC ZD aD"},J:{"33":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"36":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD","33":"J"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:2,C:"CSS writing-mode property",D:true};
  	return cssWritingMode;
  }

  var cssCrossFade;
  var hasRequiredCssCrossFade;

  function requireCssCrossFade () {
  	if (hasRequiredCssCrossFade) return cssCrossFade;
  	hasRequiredCssCrossFade = 1;
  	cssCrossFade={A:{A:{"2":"K D E F A B kC"},B:{"2":"C L M G N O P","33":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"2":"0 1 2 3 4 5 6 7 8 9 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC oC pC"},D:{"2":"J OB K D E F A B C L M G N","33":"0 1 2 3 4 5 6 7 8 9 O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC"},E:{"1":"A B C L M G RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB qC QC","33":"K D E F rC sC tC uC"},F:{"2":"F B C 2C 3C 4C 5C EC iC 6C FC","33":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x"},G:{"1":"ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C jC","33":"E 8C 9C AD BD CD DD"},H:{"2":"UD"},I:{"2":"KC J VD WD XD YD jC","33":"I ZD aD"},J:{"2":"D A"},K:{"2":"A B C EC iC FC","33":"H"},L:{"33":"I"},M:{"2":"DC"},N:{"2":"A B"},O:{"33":"GC"},P:{"33":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"33":"mD"},R:{"33":"nD"},S:{"2":"oD pD"}},B:4,C:"CSS Cross-Fade Function",D:true};
  	return cssCrossFade;
  }

  var cssReadOnlyWrite;
  var hasRequiredCssReadOnlyWrite;

  function requireCssReadOnlyWrite () {
  	if (hasRequiredCssReadOnlyWrite) return cssReadOnlyWrite;
  	hasRequiredCssReadOnlyWrite = 1;
  	cssReadOnlyWrite={A:{A:{"2":"K D E F A B kC"},B:{"1":"6 7 8 9 L M G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C"},C:{"1":"6 7 8 9 CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","16":"lC","33":"0 1 2 3 4 5 KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC oC pC"},D:{"1":"6 7 8 9 YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","16":"J OB K D E F A B C L M","132":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB"},E:{"1":"F A B C L M G uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","16":"qC QC","132":"J OB K D E rC sC tC"},F:{"1":"1 2 3 4 5 QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","16":"F B 2C 3C 4C 5C EC","132":"0 C G N O P PB y z iC 6C FC"},G:{"1":"CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","16":"QC 7C","132":"E jC 8C 9C AD BD"},H:{"2":"UD"},I:{"1":"I","16":"VD WD","132":"KC J XD YD jC ZD aD"},J:{"1":"A","132":"D"},K:{"1":"H","2":"A B EC","132":"C iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"pD","33":"oD"}},B:1,C:"CSS :read-only and :read-write selectors",D:true};
  	return cssReadOnlyWrite;
  }

  var textEmphasis;
  var hasRequiredTextEmphasis;

  function requireTextEmphasis () {
  	if (hasRequiredTextEmphasis) return textEmphasis;
  	hasRequiredTextEmphasis = 1;
  	textEmphasis={A:{A:{"2":"K D E F A B kC"},B:{"1":"6 7 8 9 i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M G N O P","164":"Q H R S T U V W X Y Z a b c d e f g h"},C:{"1":"6 7 8 9 iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"0 1 2 3 4 5 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB oC pC","322":"hB"},D:{"1":"6 7 8 9 i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 1 2 J OB K D E F A B C L M G N O P PB y z","164":"3 4 5 QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h"},E:{"1":"E F A B C L M G tC uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB K qC QC rC","164":"D sC"},F:{"1":"V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"F B C 2C 3C 4C 5C EC iC 6C FC","164":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U"},G:{"1":"E AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C jC 8C 9C"},H:{"2":"UD"},I:{"1":"I","2":"KC J VD WD XD YD jC","164":"ZD aD"},J:{"2":"D","164":"A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z JC lD","164":"J bD cD dD eD fD RC gD hD iD jD kD HC IC"},Q:{"164":"mD"},R:{"164":"nD"},S:{"1":"oD pD"}},B:4,C:"text-emphasis styling",D:true};
  	return textEmphasis;
  }

  var cssGrid;
  var hasRequiredCssGrid;

  function requireCssGrid () {
  	if (hasRequiredCssGrid) return cssGrid;
  	hasRequiredCssGrid = 1;
  	cssGrid={A:{A:{"2":"K D E kC","8":"F","292":"A B"},B:{"1":"6 7 8 9 N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","292":"C L M G"},C:{"1":"6 7 8 9 qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC J OB K D E F A B C L M G N O P oC pC","8":"0 1 2 3 4 5 PB y z QB RB SB TB UB VB WB XB YB ZB aB bB","584":"cB dB eB fB gB hB iB jB kB lB mB nB","1025":"oB pB"},D:{"1":"6 7 8 9 uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 1 2 J OB K D E F A B C L M G N O P PB y z","8":"3 4 5 QB","200":"RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB","1025":"tB"},E:{"1":"B C L M G RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB qC QC rC","8":"K D E F A sC tC uC"},F:{"1":"gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"0 1 2 3 4 5 F B C G N O P PB y z 2C 3C 4C 5C EC iC 6C FC","200":"QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB"},G:{"1":"FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C jC 8C","8":"E 9C AD BD CD DD ED"},H:{"2":"UD"},I:{"1":"I","2":"KC J VD WD XD YD","8":"jC ZD aD"},J:{"2":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"292":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z cD dD eD fD RC gD hD iD jD kD HC IC JC lD","2":"bD","8":"J"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:4,C:"CSS Grid Layout (level 1)",D:true};
  	return cssGrid;
  }

  var cssTextSpacing;
  var hasRequiredCssTextSpacing;

  function requireCssTextSpacing () {
  	if (hasRequiredCssTextSpacing) return cssTextSpacing;
  	hasRequiredCssTextSpacing = 1;
  	cssTextSpacing={A:{A:{"2":"K D kC","161":"E F A B"},B:{"2":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","161":"C L M G N O P"},C:{"2":"0 1 2 3 4 5 6 7 8 9 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC oC pC"},D:{"2":"0 1 2 3 4 5 6 7 8 9 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC"},E:{"2":"J OB K D E F A B C L M G qC QC rC sC tC uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C"},F:{"2":"0 1 2 3 4 5 F B C G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x 2C 3C 4C 5C EC iC 6C FC"},G:{"2":"E QC 7C jC 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC"},H:{"2":"UD"},I:{"2":"KC J I VD WD XD YD jC ZD aD"},J:{"2":"D A"},K:{"2":"A B C H EC iC FC"},L:{"2":"I"},M:{"2":"DC"},N:{"16":"A B"},O:{"2":"GC"},P:{"2":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"2":"mD"},R:{"2":"nD"},S:{"2":"oD pD"}},B:5,C:"CSS Text 4 text-spacing",D:false};
  	return cssTextSpacing;
  }

  var cssAnyLink;
  var hasRequiredCssAnyLink;

  function requireCssAnyLink () {
  	if (hasRequiredCssAnyLink) return cssAnyLink;
  	hasRequiredCssAnyLink = 1;
  	cssAnyLink={A:{A:{"2":"K D E F A B kC"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M G N O P"},C:{"1":"6 7 8 9 mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","16":"lC","33":"0 1 2 3 4 5 KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB oC pC"},D:{"1":"6 7 8 9 zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","16":"J OB K D E F A B C L M","33":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB"},E:{"1":"F A B C L M G uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","16":"J OB K qC QC rC","33":"D E sC tC"},F:{"1":"oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"F B C 2C 3C 4C 5C EC iC 6C FC","33":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB"},G:{"1":"CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","16":"QC 7C jC 8C","33":"E 9C AD BD"},H:{"2":"UD"},I:{"1":"I","16":"KC J VD WD XD YD jC","33":"ZD aD"},J:{"16":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z fD RC gD hD iD jD kD HC IC JC lD","16":"J","33":"bD cD dD eD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"pD","33":"oD"}},B:5,C:"CSS :any-link selector",D:true};
  	return cssAnyLink;
  }

  var mdnCssUnicodeBidiIsolate;
  var hasRequiredMdnCssUnicodeBidiIsolate;

  function requireMdnCssUnicodeBidiIsolate () {
  	if (hasRequiredMdnCssUnicodeBidiIsolate) return mdnCssUnicodeBidiIsolate;
  	hasRequiredMdnCssUnicodeBidiIsolate = 1;
  	mdnCssUnicodeBidiIsolate={A:{D:{"1":"6 7 8 9 kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"J OB K D E F A B C L M G","33":"0 1 2 3 4 5 N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB"},L:{"1":"I"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M G N O P"},C:{"1":"6 7 8 9 mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC J OB K D E F oC pC","33":"0 1 2 3 4 5 A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB"},M:{"1":"DC"},A:{"2":"K D E F A B kC"},F:{"1":"XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"F B C 2C 3C 4C 5C EC iC 6C FC","33":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB"},K:{"1":"H","2":"A B C EC iC FC"},E:{"1":"B C L M G EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC","2":"J OB qC QC rC 1C","33":"K D E F A sC tC uC RC"},G:{"1":"GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C jC 8C","33":"E 9C AD BD CD DD ED FD"},P:{"1":"0 1 2 3 4 5 y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD","2":"J"},I:{"1":"I","2":"KC J VD WD XD YD jC ZD aD"}},B:6,C:"isolate from unicode-bidi",D:undefined};
  	return mdnCssUnicodeBidiIsolate;
  }

  var mdnCssUnicodeBidiPlaintext;
  var hasRequiredMdnCssUnicodeBidiPlaintext;

  function requireMdnCssUnicodeBidiPlaintext () {
  	if (hasRequiredMdnCssUnicodeBidiPlaintext) return mdnCssUnicodeBidiPlaintext;
  	hasRequiredMdnCssUnicodeBidiPlaintext = 1;
  	mdnCssUnicodeBidiPlaintext={A:{D:{"1":"6 7 8 9 kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB"},L:{"1":"I"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M G N O P"},C:{"1":"6 7 8 9 mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC J OB K D E F oC pC","33":"0 1 2 3 4 5 A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB"},M:{"1":"DC"},A:{"2":"K D E F A B kC"},F:{"1":"XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"0 1 2 3 4 5 F B C G N O P PB y z QB RB SB TB UB VB WB 2C 3C 4C 5C EC iC 6C FC"},K:{"1":"H","2":"A B C EC iC FC"},E:{"1":"B C L M G EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC","2":"J OB qC QC rC 1C","33":"K D E F A sC tC uC RC"},G:{"1":"GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C jC 8C","33":"E 9C AD BD CD DD ED FD"},P:{"1":"0 1 2 3 4 5 y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD","2":"J"},I:{"1":"I","2":"KC J VD WD XD YD jC ZD aD"}},B:6,C:"plaintext from unicode-bidi",D:undefined};
  	return mdnCssUnicodeBidiPlaintext;
  }

  var mdnCssUnicodeBidiIsolateOverride;
  var hasRequiredMdnCssUnicodeBidiIsolateOverride;

  function requireMdnCssUnicodeBidiIsolateOverride () {
  	if (hasRequiredMdnCssUnicodeBidiIsolateOverride) return mdnCssUnicodeBidiIsolateOverride;
  	hasRequiredMdnCssUnicodeBidiIsolateOverride = 1;
  	mdnCssUnicodeBidiIsolateOverride={A:{D:{"1":"6 7 8 9 kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB"},L:{"1":"I"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M G N O P"},C:{"1":"6 7 8 9 mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC J OB K D E F A B C L M G N oC pC","33":"0 1 2 3 4 5 O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB"},M:{"1":"DC"},A:{"2":"K D E F A B kC"},F:{"1":"XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"0 1 2 3 4 5 F B C G N O P PB y z QB RB SB TB UB VB WB 2C 3C 4C 5C EC iC 6C FC"},K:{"1":"H","2":"A B C EC iC FC"},E:{"1":"B C L M G EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC","2":"J OB K qC QC rC sC 1C","33":"D E F A tC uC RC"},G:{"1":"GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C jC 8C 9C","33":"E AD BD CD DD ED FD"},P:{"1":"0 1 2 3 4 5 y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD","2":"J"},I:{"1":"I","2":"KC J VD WD XD YD jC ZD aD"}},B:6,C:"isolate-override from unicode-bidi",D:undefined};
  	return mdnCssUnicodeBidiIsolateOverride;
  }

  var cssOverscrollBehavior;
  var hasRequiredCssOverscrollBehavior;

  function requireCssOverscrollBehavior () {
  	if (hasRequiredCssOverscrollBehavior) return cssOverscrollBehavior;
  	hasRequiredCssOverscrollBehavior = 1;
  	cssOverscrollBehavior={A:{A:{"2":"K D E F kC","132":"A B"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","132":"C L M G N O","516":"P"},C:{"1":"6 7 8 9 LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"0 1 2 3 4 5 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB oC pC"},D:{"1":"6 7 8 9 zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB","260":"xB yB"},E:{"1":"HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB K D E F A B C L M qC QC rC sC tC uC RC EC FC vC","1090":"G wC xC SC TC GC yC"},F:{"1":"oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"0 1 2 3 4 5 F B C G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB 2C 3C 4C 5C EC iC 6C FC","260":"mB nB"},G:{"1":"HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"E QC 7C jC 8C 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD","1090":"PD QD SC TC GC RD"},H:{"2":"UD"},I:{"1":"I","2":"KC J VD WD XD YD jC ZD aD"},J:{"2":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"132":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z eD fD RC gD hD iD jD kD HC IC JC lD","2":"J bD cD dD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"pD","2":"oD"}},B:5,C:"CSS overscroll-behavior",D:true};
  	return cssOverscrollBehavior;
  }

  var cssTextOrientation;
  var hasRequiredCssTextOrientation;

  function requireCssTextOrientation () {
  	if (hasRequiredCssTextOrientation) return cssTextOrientation;
  	hasRequiredCssTextOrientation = 1;
  	cssTextOrientation={A:{A:{"2":"K D E F A B kC"},B:{"1":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I","2":"C L M G N O P"},C:{"1":"6 7 8 9 dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"0 1 2 3 4 5 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB oC pC","194":"aB bB cB"},D:{"1":"6 7 8 9 kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB"},E:{"1":"M G wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB K D E F qC QC rC sC tC uC","16":"A","33":"B C L RC EC FC vC"},F:{"1":"XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x","2":"0 1 2 3 4 5 F B C G N O P PB y z QB RB SB TB UB VB WB 2C 3C 4C 5C EC iC 6C FC"},G:{"1":"ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"E QC 7C jC 8C 9C AD BD CD DD"},H:{"2":"UD"},I:{"1":"I","2":"KC J VD WD XD YD jC ZD aD"},J:{"2":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD","2":"J"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:2,C:"CSS text-orientation",D:true};
  	return cssTextOrientation;
  }

  var cssPrintColorAdjust;
  var hasRequiredCssPrintColorAdjust;

  function requireCssPrintColorAdjust () {
  	if (hasRequiredCssPrintColorAdjust) return cssPrintColorAdjust;
  	hasRequiredCssPrintColorAdjust = 1;
  	cssPrintColorAdjust={A:{D:{"2":"J OB K D E F A B C L M G N","33":"0 1 2 3 4 5 6 7 8 9 O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC"},L:{"33":"I"},B:{"2":"C L M G N O P","33":"6 7 8 9 Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"1":"6 7 8 9 g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"0 1 2 3 4 5 lC KC J OB K D E F A B C L M G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB oC pC","33":"kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f"},M:{"1":"DC"},A:{"2":"K D E F A B kC"},F:{"2":"F B C 2C 3C 4C 5C EC iC 6C FC","33":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x"},K:{"2":"A B C EC iC FC","33":"H"},E:{"1":"TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC","2":"J OB qC QC rC 1C","33":"K D E F A B C L M G sC tC uC RC EC FC vC wC xC SC"},G:{"1":"TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"QC 7C jC 8C","33":"E 9C AD BD CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC"},P:{"33":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},I:{"2":"KC J VD WD XD YD jC","33":"I ZD aD"}},B:6,C:"print-color-adjust property",D:undefined};
  	return cssPrintColorAdjust;
  }

  let unpack = feature$1.exports;

  function browsersSort(a, b) {
    a = a.split(' ');
    b = b.split(' ');
    if (a[0] > b[0]) {
      return 1
    } else if (a[0] < b[0]) {
      return -1
    } else {
      return Math.sign(parseFloat(a[1]) - parseFloat(b[1]))
    }
  }

  // Convert Can I Use data
  function f(data, opts, callback) {
    data = unpack(data);

    if (!callback) {
  [callback, opts] = [opts, {}];
    }

    let match = opts.match || /\sx($|\s)/;
    let need = [];

    for (let browser in data.stats) {
      let versions = data.stats[browser];
      for (let version in versions) {
        let support = versions[version];
        if (support.match(match)) {
          need.push(browser + ' ' + version);
        }
      }
    }

    callback(need.sort(browsersSort));
  }

  // Add data for all properties
  let result = {};

  function prefix$1(names, data) {
    for (let name of names) {
      result[name] = Object.assign({}, data);
    }
  }

  function add(names, data) {
    for (let name of names) {
      result[name].browsers = result[name].browsers
        .concat(data.browsers)
        .sort(browsersSort);
    }
  }

  var prefixes$1 = result;

  // Border Radius
  let prefixBorderRadius = requireBorderRadius();

  f(prefixBorderRadius, browsers =>
    prefix$1(
      [
        'border-radius',
        'border-top-left-radius',
        'border-top-right-radius',
        'border-bottom-right-radius',
        'border-bottom-left-radius'
      ],
      {
        browsers,
        feature: 'border-radius',
        mistakes: ['-khtml-', '-ms-', '-o-']
      }
    )
  );

  // Box Shadow
  let prefixBoxshadow = requireCssBoxshadow();

  f(prefixBoxshadow, browsers =>
    prefix$1(['box-shadow'], {
      browsers,
      feature: 'css-boxshadow',
      mistakes: ['-khtml-']
    })
  );

  // Animation
  let prefixAnimation = requireCssAnimation();

  f(prefixAnimation, browsers =>
    prefix$1(
      [
        'animation',
        'animation-name',
        'animation-duration',
        'animation-delay',
        'animation-direction',
        'animation-fill-mode',
        'animation-iteration-count',
        'animation-play-state',
        'animation-timing-function',
        '@keyframes'
      ],
      {
        browsers,
        feature: 'css-animation',
        mistakes: ['-khtml-', '-ms-']
      }
    )
  );

  // Transition
  let prefixTransition = requireCssTransitions();

  f(prefixTransition, browsers =>
    prefix$1(
      [
        'transition',
        'transition-property',
        'transition-duration',
        'transition-delay',
        'transition-timing-function'
      ],
      {
        browsers,
        feature: 'css-transitions',
        mistakes: ['-khtml-', '-ms-']
      }
    )
  );

  // Transform 2D
  let prefixTransform2d = requireTransforms2d();

  f(prefixTransform2d, browsers =>
    prefix$1(['transform', 'transform-origin'], {
      browsers,
      feature: 'transforms2d'
    })
  );

  // Transform 3D
  let prefixTransforms3d = requireTransforms3d();

  f(prefixTransforms3d, browsers => {
    prefix$1(['perspective', 'perspective-origin'], {
      browsers,
      feature: 'transforms3d'
    });
    return prefix$1(['transform-style'], {
      browsers,
      feature: 'transforms3d',
      mistakes: ['-ms-', '-o-']
    })
  });

  f(prefixTransforms3d, { match: /y\sx|y\s#2/ }, browsers =>
    prefix$1(['backface-visibility'], {
      browsers,
      feature: 'transforms3d',
      mistakes: ['-ms-', '-o-']
    })
  );

  // Gradients
  let prefixGradients = requireCssGradients();

  f(prefixGradients, { match: /y\sx/ }, browsers =>
    prefix$1(
      [
        'linear-gradient',
        'repeating-linear-gradient',
        'radial-gradient',
        'repeating-radial-gradient'
      ],
      {
        browsers,
        feature: 'css-gradients',
        mistakes: ['-ms-'],
        props: [
          'background',
          'background-image',
          'border-image',
          'mask',
          'list-style',
          'list-style-image',
          'content',
          'mask-image'
        ]
      }
    )
  );

  f(prefixGradients, { match: /a\sx/ }, browsers => {
    browsers = browsers.map(i => {
      if (/firefox|op/.test(i)) {
        return i
      } else {
        return `${i} old`
      }
    });
    return add(
      [
        'linear-gradient',
        'repeating-linear-gradient',
        'radial-gradient',
        'repeating-radial-gradient'
      ],
      {
        browsers,
        feature: 'css-gradients'
      }
    )
  });

  // Box sizing
  let prefixBoxsizing = requireCss3Boxsizing();

  f(prefixBoxsizing, browsers =>
    prefix$1(['box-sizing'], {
      browsers,
      feature: 'css3-boxsizing'
    })
  );

  // Filter Effects
  let prefixFilters = requireCssFilters();

  f(prefixFilters, browsers =>
    prefix$1(['filter'], {
      browsers,
      feature: 'css-filters'
    })
  );

  // filter() function
  let prefixFilterFunction = requireCssFilterFunction();

  f(prefixFilterFunction, browsers =>
    prefix$1(['filter-function'], {
      browsers,
      feature: 'css-filter-function',
      props: [
        'background',
        'background-image',
        'border-image',
        'mask',
        'list-style',
        'list-style-image',
        'content',
        'mask-image'
      ]
    })
  );

  // Backdrop-filter
  let prefixBackdropFilter = requireCssBackdropFilter();

  f(prefixBackdropFilter, { match: /y\sx|y\s#2/ }, browsers =>
    prefix$1(['backdrop-filter'], {
      browsers,
      feature: 'css-backdrop-filter'
    })
  );

  // element() function
  let prefixElementFunction = requireCssElementFunction();

  f(prefixElementFunction, browsers =>
    prefix$1(['element'], {
      browsers,
      feature: 'css-element-function',
      props: [
        'background',
        'background-image',
        'border-image',
        'mask',
        'list-style',
        'list-style-image',
        'content',
        'mask-image'
      ]
    })
  );

  // Multicolumns
  let prefixMulticolumns = requireMulticolumn();

  f(prefixMulticolumns, browsers => {
    prefix$1(
      [
        'columns',
        'column-width',
        'column-gap',
        'column-rule',
        'column-rule-color',
        'column-rule-width',
        'column-count',
        'column-rule-style',
        'column-span',
        'column-fill'
      ],
      {
        browsers,
        feature: 'multicolumn'
      }
    );

    let noff = browsers.filter(i => !/firefox/.test(i));
    prefix$1(['break-before', 'break-after', 'break-inside'], {
      browsers: noff,
      feature: 'multicolumn'
    });
  });

  // User select
  let prefixUserSelect = requireUserSelectNone();

  f(prefixUserSelect, browsers =>
    prefix$1(['user-select'], {
      browsers,
      feature: 'user-select-none',
      mistakes: ['-khtml-']
    })
  );

  // Flexible Box Layout
  let prefixFlexbox = requireFlexbox();

  f(prefixFlexbox, { match: /a\sx/ }, browsers => {
    browsers = browsers.map(i => {
      if (/ie|firefox/.test(i)) {
        return i
      } else {
        return `${i} 2009`
      }
    });
    prefix$1(['display-flex', 'inline-flex'], {
      browsers,
      feature: 'flexbox',
      props: ['display']
    });
    prefix$1(['flex', 'flex-grow', 'flex-shrink', 'flex-basis'], {
      browsers,
      feature: 'flexbox'
    });
    prefix$1(
      [
        'flex-direction',
        'flex-wrap',
        'flex-flow',
        'justify-content',
        'order',
        'align-items',
        'align-self',
        'align-content'
      ],
      {
        browsers,
        feature: 'flexbox'
      }
    );
  });

  f(prefixFlexbox, { match: /y\sx/ }, browsers => {
    add(['display-flex', 'inline-flex'], {
      browsers,
      feature: 'flexbox'
    });
    add(['flex', 'flex-grow', 'flex-shrink', 'flex-basis'], {
      browsers,
      feature: 'flexbox'
    });
    add(
      [
        'flex-direction',
        'flex-wrap',
        'flex-flow',
        'justify-content',
        'order',
        'align-items',
        'align-self',
        'align-content'
      ],
      {
        browsers,
        feature: 'flexbox'
      }
    );
  });

  // calc() unit
  let prefixCalc = requireCalc();

  f(prefixCalc, browsers =>
    prefix$1(['calc'], {
      browsers,
      feature: 'calc',
      props: ['*']
    })
  );

  // Background options
  let prefixBackgroundOptions = requireBackgroundImgOpts();

  f(prefixBackgroundOptions, browsers =>
    prefix$1(['background-origin', 'background-size'], {
      browsers,
      feature: 'background-img-opts'
    })
  );

  // background-clip: text
  let prefixBackgroundClipText = requireBackgroundClipText();

  f(prefixBackgroundClipText, browsers =>
    prefix$1(['background-clip'], {
      browsers,
      feature: 'background-clip-text'
    })
  );

  // Font feature settings
  let prefixFontFeature = requireFontFeature();

  f(prefixFontFeature, browsers =>
    prefix$1(
      [
        'font-feature-settings',
        'font-variant-ligatures',
        'font-language-override'
      ],
      {
        browsers,
        feature: 'font-feature'
      }
    )
  );

  // CSS font-kerning property
  let prefixFontKerning = requireFontKerning();

  f(prefixFontKerning, browsers =>
    prefix$1(['font-kerning'], {
      browsers,
      feature: 'font-kerning'
    })
  );

  // Border image
  let prefixBorderImage = requireBorderImage();

  f(prefixBorderImage, browsers =>
    prefix$1(['border-image'], {
      browsers,
      feature: 'border-image'
    })
  );

  // Selection selector
  let prefixSelection = requireCssSelection();

  f(prefixSelection, browsers =>
    prefix$1(['::selection'], {
      browsers,
      feature: 'css-selection',
      selector: true
    })
  );

  // Placeholder selector
  let prefixPlaceholder = requireCssPlaceholder();

  f(prefixPlaceholder, browsers => {
    prefix$1(['::placeholder'], {
      browsers: browsers.concat(['ie 10 old', 'ie 11 old', 'firefox 18 old']),
      feature: 'css-placeholder',
      selector: true
    });
  });

  // Placeholder-shown selector
  let prefixPlaceholderShown = requireCssPlaceholderShown();

  f(prefixPlaceholderShown, browsers => {
    prefix$1([':placeholder-shown'], {
      browsers,
      feature: 'css-placeholder-shown',
      selector: true
    });
  });

  // Hyphenation
  let prefixHyphens = requireCssHyphens();

  f(prefixHyphens, browsers =>
    prefix$1(['hyphens'], {
      browsers,
      feature: 'css-hyphens'
    })
  );

  // Fullscreen selector
  let prefixFullscreen = requireFullscreen();

  f(prefixFullscreen, browsers =>
    prefix$1([':fullscreen'], {
      browsers,
      feature: 'fullscreen',
      selector: true
    })
  );

  // ::backdrop pseudo-element
  // https://caniuse.com/mdn-css_selectors_backdrop
  let prefixBackdrop = requireMdnCssBackdropPseudoElement();

  f(prefixBackdrop, browsers =>
    prefix$1(['::backdrop'], {
      browsers,
      feature: 'backdrop',
      selector: true
    })
  );

  // File selector button
  let prefixFileSelectorButton = requireCssFileSelectorButton();

  f(prefixFileSelectorButton, browsers =>
    prefix$1(['::file-selector-button'], {
      browsers,
      feature: 'file-selector-button',
      selector: true
    })
  );

  // :autofill
  let prefixAutofill = requireCssAutofill();

  f(prefixAutofill, browsers =>
    prefix$1([':autofill'], {
      browsers,
      feature: 'css-autofill',
      selector: true
    })
  );

  // Tab size
  let prefixTabsize = requireCss3Tabsize();

  f(prefixTabsize, browsers =>
    prefix$1(['tab-size'], {
      browsers,
      feature: 'css3-tabsize'
    })
  );

  // Intrinsic & extrinsic sizing
  let prefixIntrinsic = requireIntrinsicWidth();

  let sizeProps = [
    'width',
    'min-width',
    'max-width',
    'height',
    'min-height',
    'max-height',
    'inline-size',
    'min-inline-size',
    'max-inline-size',
    'block-size',
    'min-block-size',
    'max-block-size',
    'grid',
    'grid-template',
    'grid-template-rows',
    'grid-template-columns',
    'grid-auto-columns',
    'grid-auto-rows'
  ];

  f(prefixIntrinsic, browsers =>
    prefix$1(['max-content', 'min-content'], {
      browsers,
      feature: 'intrinsic-width',
      props: sizeProps
    })
  );

  f(prefixIntrinsic, { match: /x|\s#4/ }, browsers =>
    prefix$1(['fill', 'fill-available'], {
      browsers,
      feature: 'intrinsic-width',
      props: sizeProps
    })
  );

  f(prefixIntrinsic, { match: /x|\s#5/ }, browsers => {
    let ffFix = browsers.filter(i => {
      let [name, version] = i.split(' ');
      if (name === 'firefox' || name === 'and_ff') {
        return parseInt(version) < 94
      } else {
        return true
      }
    });
    return prefix$1(['fit-content'], {
      browsers: ffFix,
      feature: 'intrinsic-width',
      props: sizeProps
    })
  });

  // Stretch value

  let prefixStretch = requireCssWidthStretch();

  f(prefixStretch, browsers =>
    prefix$1(['stretch'], {
      browsers,
      feature: 'css-width-stretch',
      props: sizeProps
    })
  );

  // Zoom cursors
  let prefixCursorsNewer = requireCss3CursorsNewer();

  f(prefixCursorsNewer, browsers =>
    prefix$1(['zoom-in', 'zoom-out'], {
      browsers,
      feature: 'css3-cursors-newer',
      props: ['cursor']
    })
  );

  // Grab cursors
  let prefixCursorsGrab = requireCss3CursorsGrab();

  f(prefixCursorsGrab, browsers =>
    prefix$1(['grab', 'grabbing'], {
      browsers,
      feature: 'css3-cursors-grab',
      props: ['cursor']
    })
  );

  // Sticky position
  let prefixSticky = requireCssSticky();

  f(prefixSticky, browsers =>
    prefix$1(['sticky'], {
      browsers,
      feature: 'css-sticky',
      props: ['position']
    })
  );

  // Pointer Events
  let prefixPointer = requirePointer();

  f(prefixPointer, browsers =>
    prefix$1(['touch-action'], {
      browsers,
      feature: 'pointer'
    })
  );

  // Text decoration
  let prefixDecoration = requireTextDecoration();

  f(prefixDecoration, { match: /x.*#[235]/ }, browsers =>
    prefix$1(['text-decoration-skip', 'text-decoration-skip-ink'], {
      browsers,
      feature: 'text-decoration'
    })
  );

  let prefixDecorationShorthand = requireMdnTextDecorationShorthand();

  f(prefixDecorationShorthand, browsers =>
    prefix$1(['text-decoration'], {
      browsers,
      feature: 'text-decoration'
    })
  );

  let prefixDecorationColor = requireMdnTextDecorationColor();

  f(prefixDecorationColor, browsers =>
    prefix$1(['text-decoration-color'], {
      browsers,
      feature: 'text-decoration'
    })
  );

  let prefixDecorationLine = requireMdnTextDecorationLine();

  f(prefixDecorationLine, browsers =>
    prefix$1(['text-decoration-line'], {
      browsers,
      feature: 'text-decoration'
    })
  );

  let prefixDecorationStyle = requireMdnTextDecorationStyle();

  f(prefixDecorationStyle, browsers =>
    prefix$1(['text-decoration-style'], {
      browsers,
      feature: 'text-decoration'
    })
  );

  // Text Size Adjust
  let prefixTextSizeAdjust = requireTextSizeAdjust();

  f(prefixTextSizeAdjust, browsers =>
    prefix$1(['text-size-adjust'], {
      browsers,
      feature: 'text-size-adjust'
    })
  );

  // CSS Masks
  let prefixCssMasks = requireCssMasks();

  f(prefixCssMasks, browsers => {
    prefix$1(
      [
        'mask-clip',
        'mask-composite',
        'mask-image',
        'mask-origin',
        'mask-repeat',
        'mask-border-repeat',
        'mask-border-source'
      ],
      {
        browsers,
        feature: 'css-masks'
      }
    );
    prefix$1(
      [
        'mask',
        'mask-position',
        'mask-size',
        'mask-border',
        'mask-border-outset',
        'mask-border-width',
        'mask-border-slice'
      ],
      {
        browsers,
        feature: 'css-masks'
      }
    );
  });

  // CSS clip-path property
  let prefixClipPath = requireCssClipPath();

  f(prefixClipPath, browsers =>
    prefix$1(['clip-path'], {
      browsers,
      feature: 'css-clip-path'
    })
  );

  // Fragmented Borders and Backgrounds
  let prefixBoxdecoration = requireCssBoxdecorationbreak();

  f(prefixBoxdecoration, browsers =>
    prefix$1(['box-decoration-break'], {
      browsers,
      feature: 'css-boxdecorationbreak'
    })
  );

  // CSS3 object-fit/object-position
  let prefixObjectFit = requireObjectFit();

  f(prefixObjectFit, browsers =>
    prefix$1(['object-fit', 'object-position'], {
      browsers,
      feature: 'object-fit'
    })
  );

  // CSS Shapes
  let prefixShapes = requireCssShapes();

  f(prefixShapes, browsers =>
    prefix$1(['shape-margin', 'shape-outside', 'shape-image-threshold'], {
      browsers,
      feature: 'css-shapes'
    })
  );

  // CSS3 text-overflow
  let prefixTextOverflow = requireTextOverflow();

  f(prefixTextOverflow, browsers =>
    prefix$1(['text-overflow'], {
      browsers,
      feature: 'text-overflow'
    })
  );

  // Viewport at-rule
  let prefixDeviceadaptation = requireCssDeviceadaptation();

  f(prefixDeviceadaptation, browsers =>
    prefix$1(['@viewport'], {
      browsers,
      feature: 'css-deviceadaptation'
    })
  );

  // Resolution Media Queries
  let prefixResolut = requireCssMediaResolution();

  f(prefixResolut, { match: /( x($| )|a #2)/ }, browsers =>
    prefix$1(['@resolution'], {
      browsers,
      feature: 'css-media-resolution'
    })
  );

  // CSS text-align-last
  let prefixTextAlignLast = requireCssTextAlignLast();

  f(prefixTextAlignLast, browsers =>
    prefix$1(['text-align-last'], {
      browsers,
      feature: 'css-text-align-last'
    })
  );

  // Crisp Edges Image Rendering Algorithm
  let prefixCrispedges = requireCssCrispEdges();

  f(prefixCrispedges, { match: /y x|a x #1/ }, browsers =>
    prefix$1(['pixelated'], {
      browsers,
      feature: 'css-crisp-edges',
      props: ['image-rendering']
    })
  );

  f(prefixCrispedges, { match: /a x #2/ }, browsers =>
    prefix$1(['image-rendering'], {
      browsers,
      feature: 'css-crisp-edges'
    })
  );

  // Logical Properties
  let prefixLogicalProps = requireCssLogicalProps();

  f(prefixLogicalProps, browsers =>
    prefix$1(
      [
        'border-inline-start',
        'border-inline-end',
        'margin-inline-start',
        'margin-inline-end',
        'padding-inline-start',
        'padding-inline-end'
      ],
      {
        browsers,
        feature: 'css-logical-props'
      }
    )
  );

  f(prefixLogicalProps, { match: /x\s#2/ }, browsers =>
    prefix$1(
      [
        'border-block-start',
        'border-block-end',
        'margin-block-start',
        'margin-block-end',
        'padding-block-start',
        'padding-block-end'
      ],
      {
        browsers,
        feature: 'css-logical-props'
      }
    )
  );

  // CSS appearance
  let prefixAppearance = requireCssAppearance();

  f(prefixAppearance, { match: /#2|x/ }, browsers =>
    prefix$1(['appearance'], {
      browsers,
      feature: 'css-appearance'
    })
  );

  // CSS Scroll snap points
  let prefixSnappoints = requireCssSnappoints();

  f(prefixSnappoints, browsers =>
    prefix$1(
      [
        'scroll-snap-type',
        'scroll-snap-coordinate',
        'scroll-snap-destination',
        'scroll-snap-points-x',
        'scroll-snap-points-y'
      ],
      {
        browsers,
        feature: 'css-snappoints'
      }
    )
  );

  // CSS Regions
  let prefixRegions = requireCssRegions();

  f(prefixRegions, browsers =>
    prefix$1(['flow-into', 'flow-from', 'region-fragment'], {
      browsers,
      feature: 'css-regions'
    })
  );

  // CSS image-set
  let prefixImageSet = requireCssImageSet();

  f(prefixImageSet, browsers =>
    prefix$1(['image-set'], {
      browsers,
      feature: 'css-image-set',
      props: [
        'background',
        'background-image',
        'border-image',
        'cursor',
        'mask',
        'mask-image',
        'list-style',
        'list-style-image',
        'content'
      ]
    })
  );

  // Writing Mode
  let prefixWritingMode = requireCssWritingMode();

  f(prefixWritingMode, { match: /a|x/ }, browsers =>
    prefix$1(['writing-mode'], {
      browsers,
      feature: 'css-writing-mode'
    })
  );

  // Cross-Fade Function
  let prefixCrossFade = requireCssCrossFade();

  f(prefixCrossFade, browsers =>
    prefix$1(['cross-fade'], {
      browsers,
      feature: 'css-cross-fade',
      props: [
        'background',
        'background-image',
        'border-image',
        'mask',
        'list-style',
        'list-style-image',
        'content',
        'mask-image'
      ]
    })
  );

  // Read Only selector
  let prefixReadOnly = requireCssReadOnlyWrite();

  f(prefixReadOnly, browsers =>
    prefix$1([':read-only', ':read-write'], {
      browsers,
      feature: 'css-read-only-write',
      selector: true
    })
  );

  // Text Emphasize
  let prefixTextEmphasis = requireTextEmphasis();

  f(prefixTextEmphasis, browsers =>
    prefix$1(
      [
        'text-emphasis',
        'text-emphasis-position',
        'text-emphasis-style',
        'text-emphasis-color'
      ],
      {
        browsers,
        feature: 'text-emphasis'
      }
    )
  );

  // CSS Grid Layout
  let prefixGrid = requireCssGrid();

  f(prefixGrid, browsers => {
    prefix$1(['display-grid', 'inline-grid'], {
      browsers,
      feature: 'css-grid',
      props: ['display']
    });
    prefix$1(
      [
        'grid-template-columns',
        'grid-template-rows',
        'grid-row-start',
        'grid-column-start',
        'grid-row-end',
        'grid-column-end',
        'grid-row',
        'grid-column',
        'grid-area',
        'grid-template',
        'grid-template-areas',
        'place-self'
      ],
      {
        browsers,
        feature: 'css-grid'
      }
    );
  });

  f(prefixGrid, { match: /a x/ }, browsers =>
    prefix$1(['grid-column-align', 'grid-row-align'], {
      browsers,
      feature: 'css-grid'
    })
  );

  // CSS text-spacing
  let prefixTextSpacing = requireCssTextSpacing();

  f(prefixTextSpacing, browsers =>
    prefix$1(['text-spacing'], {
      browsers,
      feature: 'css-text-spacing'
    })
  );

  // :any-link selector
  let prefixAnyLink = requireCssAnyLink();

  f(prefixAnyLink, browsers =>
    prefix$1([':any-link'], {
      browsers,
      feature: 'css-any-link',
      selector: true
    })
  );

  // unicode-bidi

  let bidiIsolate = requireMdnCssUnicodeBidiIsolate();

  f(bidiIsolate, browsers =>
    prefix$1(['isolate'], {
      browsers,
      feature: 'css-unicode-bidi',
      props: ['unicode-bidi']
    })
  );

  let bidiPlaintext = requireMdnCssUnicodeBidiPlaintext();

  f(bidiPlaintext, browsers =>
    prefix$1(['plaintext'], {
      browsers,
      feature: 'css-unicode-bidi',
      props: ['unicode-bidi']
    })
  );

  let bidiOverride = requireMdnCssUnicodeBidiIsolateOverride();

  f(bidiOverride, { match: /y x/ }, browsers =>
    prefix$1(['isolate-override'], {
      browsers,
      feature: 'css-unicode-bidi',
      props: ['unicode-bidi']
    })
  );

  // overscroll-behavior selector
  let prefixOverscroll = requireCssOverscrollBehavior();

  f(prefixOverscroll, { match: /a #1/ }, browsers =>
    prefix$1(['overscroll-behavior'], {
      browsers,
      feature: 'css-overscroll-behavior'
    })
  );

  // text-orientation
  let prefixTextOrientation = requireCssTextOrientation();

  f(prefixTextOrientation, browsers =>
    prefix$1(['text-orientation'], {
      browsers,
      feature: 'css-text-orientation'
    })
  );

  // print-color-adjust
  let prefixPrintAdjust = requireCssPrintColorAdjust();

  f(prefixPrintAdjust, browsers =>
    prefix$1(['print-color-adjust', 'color-adjust'], {
      browsers,
      feature: 'css-print-color-adjust'
    })
  );

  var utils$i = {};

  let { list: list$5 } = postcss_1;

  /**
   * Throw special error, to tell beniary,
   * that this error is from Autoprefixer.
   */
  utils$i.error = function (text) {
    let err = new Error(text);
    err.autoprefixer = true;
    throw err
  };

  /**
   * Return array, that doesn’t contain duplicates.
   */
  utils$i.uniq = function (array) {
    return [...new Set(array)]
  };

  /**
   * Return "-webkit-" on "-webkit- old"
   */
  utils$i.removeNote = function (string) {
    if (!string.includes(' ')) {
      return string
    }

    return string.split(' ')[0]
  };

  /**
   * Escape RegExp symbols
   */
  utils$i.escapeRegexp = function (string) {
    return string.replace(/[$()*+-.?[\\\]^{|}]/g, '\\$&')
  };

  /**
   * Return regexp to check, that CSS string contain word
   */
  utils$i.regexp = function (word, escape = true) {
    if (escape) {
      word = this.escapeRegexp(word);
    }
    return new RegExp(`(^|[\\s,(])(${word}($|[\\s(,]))`, 'gi')
  };

  /**
   * Change comma list
   */
  utils$i.editList = function (value, callback) {
    let origin = list$5.comma(value);
    let changed = callback(origin, []);

    if (origin === changed) {
      return value
    }

    let join = value.match(/,\s*/);
    join = join ? join[0] : ', ';
    return changed.join(join)
  };

  /**
   * Split the selector into parts.
   * It returns 3 level deep array because selectors can be comma
   * separated (1), space separated (2), and combined (3)
   * @param {String} selector selector string
   * @return {Array<Array<Array>>} 3 level deep array of split selector
   * @see utils.test.js for examples
   */
  utils$i.splitSelector = function (selector) {
    return list$5.comma(selector).map(i => {
      return list$5.space(i).map(k => {
        return k.split(/(?=\.|#)/g)
      })
    })
  };

  /**
   * Return true if a given value only contains numbers.
   * @param {*} value
   * @returns {boolean}
   */
  utils$i.isPureNumber = function (value) {
    if (typeof value === 'number') {
      return true
    }
    if (typeof value === 'string') {
      return /^[0-9]+$/.test(value)
    }
    return false
  };

  let browserslist$2 = browserslist_1;
  let { agents: agents$1 } = agents$4;

  let utils$h = utils$i;

  let Browsers$7 = class Browsers {
    constructor(data, requirements, options, browserslistOpts) {
      this.data = data;
      this.options = options || {};
      this.browserslistOpts = browserslistOpts || {};
      this.selected = this.parse(requirements);
    }

    /**
     * Return all prefixes for default browser data
     */
    static prefixes() {
      if (this.prefixesCache) {
        return this.prefixesCache
      }

      this.prefixesCache = [];
      for (let name in agents$1) {
        this.prefixesCache.push(`-${agents$1[name].prefix}-`);
      }

      this.prefixesCache = utils$h
        .uniq(this.prefixesCache)
        .sort((a, b) => b.length - a.length);

      return this.prefixesCache
    }

    /**
     * Check is value contain any possible prefix
     */
    static withPrefix(value) {
      if (!this.prefixesRegexp) {
        this.prefixesRegexp = new RegExp(this.prefixes().join('|'));
      }

      return this.prefixesRegexp.test(value)
    }

    /**
     * Is browser is selected by requirements
     */
    isSelected(browser) {
      return this.selected.includes(browser)
    }

    /**
     * Return browsers selected by requirements
     */
    parse(requirements) {
      let opts = {};
      for (let i in this.browserslistOpts) {
        opts[i] = this.browserslistOpts[i];
      }
      opts.path = this.options.from;
      return browserslist$2(requirements, opts)
    }

    /**
     * Return prefix for selected browser
     */
    prefix(browser) {
      let [name, version] = browser.split(' ');
      let data = this.data[name];

      let prefix = data.prefix_exceptions && data.prefix_exceptions[version];
      if (!prefix) {
        prefix = data.prefix;
      }
      return `-${prefix}-`
    }
  };

  var browsers$1 = Browsers$7;

  let browserslist$1 = browserslist_1;

  function capitalize(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1)
  }

  const NAMES = {
    and_chr: 'Chrome for Android',
    and_ff: 'Firefox for Android',
    and_qq: 'QQ Browser',
    and_uc: 'UC for Android',
    baidu: 'Baidu Browser',
    ie: 'IE',
    ie_mob: 'IE Mobile',
    ios_saf: 'iOS Safari',
    kaios: 'KaiOS Browser',
    op_mini: 'Opera Mini',
    op_mob: 'Opera Mobile',
    samsung: 'Samsung Internet'
  };

  function prefix(name, prefixes, note) {
    let out = `  ${name}`;
    if (note) out += ' *';
    out += ': ';
    out += prefixes.map(i => i.replace(/^-(.*)-$/g, '$1')).join(', ');
    out += '\n';
    return out
  }

  var info = function (prefixes) {
    if (prefixes.browsers.selected.length === 0) {
      return 'No browsers selected'
    }

    let versions = {};
    for (let browser of prefixes.browsers.selected) {
      let parts = browser.split(' ');
      let name = parts[0];
      let version = parts[1];

      name = NAMES[name] || capitalize(name);
      if (versions[name]) {
        versions[name].push(version);
      } else {
        versions[name] = [version];
      }
    }

    let out = 'Browsers:\n';
    for (let browser in versions) {
      let list = versions[browser];
      list = list.sort((a, b) => parseFloat(b) - parseFloat(a));
      out += `  ${browser}: ${list.join(', ')}\n`;
    }

    let coverage = browserslist$1.coverage(prefixes.browsers.selected);
    let round = Math.round(coverage * 100) / 100.0;
    out += `\nThese browsers account for ${round}% of all users globally\n`;

    let atrules = [];
    for (let name in prefixes.add) {
      let data = prefixes.add[name];
      if (name[0] === '@' && data.prefixes) {
        atrules.push(prefix(name, data.prefixes));
      }
    }
    if (atrules.length > 0) {
      out += `\nAt-Rules:\n${atrules.sort().join('')}`;
    }

    let selectors = [];
    for (let selector of prefixes.add.selectors) {
      if (selector.prefixes) {
        selectors.push(prefix(selector.name, selector.prefixes));
      }
    }
    if (selectors.length > 0) {
      out += `\nSelectors:\n${selectors.sort().join('')}`;
    }

    let values = [];
    let props = [];
    let hadGrid = false;
    for (let name in prefixes.add) {
      let data = prefixes.add[name];
      if (name[0] !== '@' && data.prefixes) {
        let grid = name.indexOf('grid-') === 0;
        if (grid) hadGrid = true;
        props.push(prefix(name, data.prefixes, grid));
      }

      if (!Array.isArray(data.values)) {
        continue
      }
      for (let value of data.values) {
        let grid = value.name.includes('grid');
        if (grid) hadGrid = true;
        let string = prefix(value.name, value.prefixes, grid);
        if (!values.includes(string)) {
          values.push(string);
        }
      }
    }

    if (props.length > 0) {
      out += `\nProperties:\n${props.sort().join('')}`;
    }
    if (values.length > 0) {
      out += `\nValues:\n${values.sort().join('')}`;
    }
    if (hadGrid) {
      out += '\n* - Prefixes will be added only on grid: true option.\n';
    }

    if (!atrules.length && !selectors.length && !props.length && !values.length) {
      out +=
        "\nAwesome! Your browsers don't require any vendor prefixes." +
        '\nNow you can remove Autoprefixer from build steps.';
    }

    return out
  };

  var vendor$4 = {
    prefix(prop) {
      let match = prop.match(/^(-\w+-)/);
      if (match) {
        return match[0]
      }

      return ''
    },

    unprefixed(prop) {
      return prop.replace(/^-\w+-/, '')
    }
  };

  let Browsers$6 = browsers$1;
  let utils$g = utils$i;
  let vendor$3 = vendor$4;

  /**
   * Recursively clone objects
   */
  function clone(obj, parent) {
    let cloned = new obj.constructor();

    for (let i of Object.keys(obj || {})) {
      let value = obj[i];
      if (i === 'parent' && typeof value === 'object') {
        if (parent) {
          cloned[i] = parent;
        }
      } else if (i === 'source' || i === null) {
        cloned[i] = value;
      } else if (Array.isArray(value)) {
        cloned[i] = value.map(x => clone(x, cloned));
      } else if (
        i !== '_autoprefixerPrefix' &&
        i !== '_autoprefixerValues' &&
        i !== 'proxyCache'
      ) {
        if (typeof value === 'object' && value !== null) {
          value = clone(value, cloned);
        }
        cloned[i] = value;
      }
    }

    return cloned
  }

  let Prefixer$5 = class Prefixer {
    constructor(name, prefixes, all) {
      this.prefixes = prefixes;
      this.name = name;
      this.all = all;
    }

    /**
     * Clone node and clean autprefixer custom caches
     */
    static clone(node, overrides) {
      let cloned = clone(node);
      for (let name in overrides) {
        cloned[name] = overrides[name];
      }
      return cloned
    }

    /**
     * Add hack to selected names
     */
    static hack(klass) {
      if (!this.hacks) {
        this.hacks = {};
      }
      return klass.names.map(name => {
        this.hacks[name] = klass;
        return this.hacks[name]
      })
    }

    /**
     * Load hacks for some names
     */
    static load(name, prefixes, all) {
      let Klass = this.hacks && this.hacks[name];
      if (Klass) {
        return new Klass(name, prefixes, all)
      } else {
        return new this(name, prefixes, all)
      }
    }

    /**
     * Shortcut for Prefixer.clone
     */
    clone(node, overrides) {
      return Prefixer.clone(node, overrides)
    }

    /**
     * Find prefix in node parents
     */
    parentPrefix(node) {
      let prefix;

      if (typeof node._autoprefixerPrefix !== 'undefined') {
        prefix = node._autoprefixerPrefix;
      } else if (node.type === 'decl' && node.prop[0] === '-') {
        prefix = vendor$3.prefix(node.prop);
      } else if (node.type === 'root') {
        prefix = false;
      } else if (
        node.type === 'rule' &&
        node.selector.includes(':-') &&
        /:(-\w+-)/.test(node.selector)
      ) {
        prefix = node.selector.match(/:(-\w+-)/)[1];
      } else if (node.type === 'atrule' && node.name[0] === '-') {
        prefix = vendor$3.prefix(node.name);
      } else {
        prefix = this.parentPrefix(node.parent);
      }

      if (!Browsers$6.prefixes().includes(prefix)) {
        prefix = false;
      }

      node._autoprefixerPrefix = prefix;

      return node._autoprefixerPrefix
    }

    /**
     * Clone node with prefixes
     */
    process(node, result) {
      if (!this.check(node)) {
        return undefined
      }

      let parent = this.parentPrefix(node);

      let prefixes = this.prefixes.filter(
        prefix => !parent || parent === utils$g.removeNote(prefix)
      );

      let added = [];
      for (let prefix of prefixes) {
        if (this.add(node, prefix, added.concat([prefix]), result)) {
          added.push(prefix);
        }
      }

      return added
    }
  };

  var prefixer = Prefixer$5;

  let Prefixer$4 = prefixer;

  let AtRule$1 = class AtRule extends Prefixer$4 {
    /**
     * Clone and add prefixes for at-rule
     */
    add(rule, prefix) {
      let prefixed = prefix + rule.name;

      let already = rule.parent.some(
        i => i.name === prefixed && i.params === rule.params
      );
      if (already) {
        return undefined
      }

      let cloned = this.clone(rule, { name: prefixed });
      return rule.parent.insertBefore(rule, cloned)
    }

    /**
     * Clone node with prefixes
     */
    process(node) {
      let parent = this.parentPrefix(node);

      for (let prefix of this.prefixes) {
        if (!parent || parent === prefix) {
          this.add(node, prefix);
        }
      }
    }
  };

  var atRule = AtRule$1;

  let Browsers$5 = browsers$1;
  let Prefixer$3 = prefixer;
  let utils$f = utils$i;

  let Declaration$J = class Declaration extends Prefixer$3 {
    /**
     * Clone and add prefixes for declaration
     */
    add(decl, prefix, prefixes, result) {
      let prefixed = this.prefixed(decl.prop, prefix);
      if (
        this.isAlready(decl, prefixed) ||
        this.otherPrefixes(decl.value, prefix)
      ) {
        return undefined
      }
      return this.insert(decl, prefix, prefixes, result)
    }

    /**
     * Calculate indentation to create visual cascade
     */
    calcBefore(prefixes, decl, prefix = '') {
      let max = this.maxPrefixed(prefixes, decl);
      let diff = max - utils$f.removeNote(prefix).length;

      let before = decl.raw('before');
      if (diff > 0) {
        before += Array(diff).fill(' ').join('');
      }

      return before
    }

    /**
     * Always true, because we already get prefixer by property name
     */
    check(/* decl */) {
      return true
    }

    /**
     * Clone and insert new declaration
     */
    insert(decl, prefix, prefixes) {
      let cloned = this.set(this.clone(decl), prefix);
      if (!cloned) return undefined

      let already = decl.parent.some(
        i => i.prop === cloned.prop && i.value === cloned.value
      );
      if (already) {
        return undefined
      }

      if (this.needCascade(decl)) {
        cloned.raws.before = this.calcBefore(prefixes, decl, prefix);
      }
      return decl.parent.insertBefore(decl, cloned)
    }

    /**
     * Did this declaration has this prefix above
     */
    isAlready(decl, prefixed) {
      let already = this.all.group(decl).up(i => i.prop === prefixed);
      if (!already) {
        already = this.all.group(decl).down(i => i.prop === prefixed);
      }
      return already
    }

    /**
     * Return maximum length of possible prefixed property
     */
    maxPrefixed(prefixes, decl) {
      if (decl._autoprefixerMax) {
        return decl._autoprefixerMax
      }

      let max = 0;
      for (let prefix of prefixes) {
        prefix = utils$f.removeNote(prefix);
        if (prefix.length > max) {
          max = prefix.length;
        }
      }
      decl._autoprefixerMax = max;

      return decl._autoprefixerMax
    }

    /**
     * Should we use visual cascade for prefixes
     */
    needCascade(decl) {
      if (!decl._autoprefixerCascade) {
        decl._autoprefixerCascade =
          this.all.options.cascade !== false && decl.raw('before').includes('\n');
      }
      return decl._autoprefixerCascade
    }

    /**
     * Return unprefixed version of property
     */
    normalize(prop) {
      return prop
    }

    /**
     * Return list of prefixed properties to clean old prefixes
     */
    old(prop, prefix) {
      return [this.prefixed(prop, prefix)]
    }

    /**
     * Check `value`, that it contain other prefixes, rather than `prefix`
     */
    otherPrefixes(value, prefix) {
      for (let other of Browsers$5.prefixes()) {
        if (other === prefix) {
          continue
        }
        if (value.includes(other)) {
          return value.replace(/var\([^)]+\)/, '').includes(other)
        }
      }
      return false
    }

    /**
     * Return prefixed version of property
     */
    prefixed(prop, prefix) {
      return prefix + prop
    }

    /**
     * Add spaces for visual cascade
     */
    process(decl, result) {
      if (!this.needCascade(decl)) {
        super.process(decl, result);
        return
      }

      let prefixes = super.process(decl, result);

      if (!prefixes || !prefixes.length) {
        return
      }

      this.restoreBefore(decl);
      decl.raws.before = this.calcBefore(prefixes, decl);
    }

    /**
     * Remove visual cascade
     */
    restoreBefore(decl) {
      let lines = decl.raw('before').split('\n');
      let min = lines[lines.length - 1];

      this.all.group(decl).up(prefixed => {
        let array = prefixed.raw('before').split('\n');
        let last = array[array.length - 1];
        if (last.length < min.length) {
          min = last;
        }
      });

      lines[lines.length - 1] = min;
      decl.raws.before = lines.join('\n');
    }

    /**
     * Set prefix to declaration
     */
    set(decl, prefix) {
      decl.prop = this.prefixed(decl.prop, prefix);
      return decl
    }
  };

  var declaration = Declaration$J;

  /**
   * Return flexbox spec versions by prefix
   */

  var flexSpec$d = function (prefix) {
    let spec;
    if (prefix === '-webkit- 2009' || prefix === '-moz-') {
      spec = 2009;
    } else if (prefix === '-ms-') {
      spec = 2012;
    } else if (prefix === '-webkit-') {
      spec = 'final';
    }

    if (prefix === '-webkit- 2009') {
      prefix = '-webkit-';
    }

    return [spec, prefix]
  };

  let Declaration$I = declaration;
  let flexSpec$c = flexSpec$d;

  class AlignContent extends Declaration$I {
    /**
     * Return property name by final spec
     */
    normalize() {
      return 'align-content'
    }

    /**
     * Change property name for 2012 spec
     */
    prefixed(prop, prefix) {
      let spec
      ;[spec, prefix] = flexSpec$c(prefix);
      if (spec === 2012) {
        return prefix + 'flex-line-pack'
      }
      return super.prefixed(prop, prefix)
    }

    /**
     * Change value for 2012 spec and ignore prefix for 2009
     */
    set(decl, prefix) {
      let spec = flexSpec$c(prefix)[0];
      if (spec === 2012) {
        decl.value = AlignContent.oldValues[decl.value] || decl.value;
        return super.set(decl, prefix)
      }
      if (spec === 'final') {
        return super.set(decl, prefix)
      }
      return undefined
    }
  }

  AlignContent.names = ['align-content', 'flex-line-pack'];

  AlignContent.oldValues = {
    'flex-end': 'end',
    'flex-start': 'start',
    'space-around': 'distribute',
    'space-between': 'justify'
  };

  var alignContent = AlignContent;

  let Declaration$H = declaration;
  let flexSpec$b = flexSpec$d;

  class AlignItems extends Declaration$H {
    /**
     * Return property name by final spec
     */
    normalize() {
      return 'align-items'
    }

    /**
     * Change property name for 2009 and 2012 specs
     */
    prefixed(prop, prefix) {
      let spec
      ;[spec, prefix] = flexSpec$b(prefix);
      if (spec === 2009) {
        return prefix + 'box-align'
      }
      if (spec === 2012) {
        return prefix + 'flex-align'
      }
      return super.prefixed(prop, prefix)
    }

    /**
     * Change value for 2009 and 2012 specs
     */
    set(decl, prefix) {
      let spec = flexSpec$b(prefix)[0];
      if (spec === 2009 || spec === 2012) {
        decl.value = AlignItems.oldValues[decl.value] || decl.value;
      }
      return super.set(decl, prefix)
    }
  }

  AlignItems.names = ['align-items', 'flex-align', 'box-align'];

  AlignItems.oldValues = {
    'flex-end': 'end',
    'flex-start': 'start'
  };

  var alignItems = AlignItems;

  let Declaration$G = declaration;
  let flexSpec$a = flexSpec$d;

  class AlignSelf extends Declaration$G {
    check(decl) {
      return (
        decl.parent &&
        !decl.parent.some(i => {
          return i.prop && i.prop.startsWith('grid-')
        })
      )
    }

    /**
     * Return property name by final spec
     */
    normalize() {
      return 'align-self'
    }

    /**
     * Change property name for 2012 specs
     */
    prefixed(prop, prefix) {
      let spec
      ;[spec, prefix] = flexSpec$a(prefix);
      if (spec === 2012) {
        return prefix + 'flex-item-align'
      }
      return super.prefixed(prop, prefix)
    }

    /**
     * Change value for 2012 spec and ignore prefix for 2009
     */
    set(decl, prefix) {
      let spec = flexSpec$a(prefix)[0];
      if (spec === 2012) {
        decl.value = AlignSelf.oldValues[decl.value] || decl.value;
        return super.set(decl, prefix)
      }
      if (spec === 'final') {
        return super.set(decl, prefix)
      }
      return undefined
    }
  }

  AlignSelf.names = ['align-self', 'flex-item-align'];

  AlignSelf.oldValues = {
    'flex-end': 'end',
    'flex-start': 'start'
  };

  var alignSelf = AlignSelf;

  let Declaration$F = declaration;

  class Animation extends Declaration$F {
    /**
     * Don’t add prefixes for modern values.
     */
    check(decl) {
      return !decl.value.split(/\s+/).some(i => {
        let lower = i.toLowerCase();
        return lower === 'reverse' || lower === 'alternate-reverse'
      })
    }
  }

  Animation.names = ['animation', 'animation-direction'];

  var animation = Animation;

  let Declaration$E = declaration;
  let utils$e = utils$i;

  class Appearance extends Declaration$E {
    constructor(name, prefixes, all) {
      super(name, prefixes, all);

      if (this.prefixes) {
        this.prefixes = utils$e.uniq(
          this.prefixes.map(i => {
            if (i === '-ms-') {
              return '-webkit-'
            }
            return i
          })
        );
      }
    }
  }

  Appearance.names = ['appearance'];

  var appearance = Appearance;

  let OldSelector$1 = class OldSelector {
    constructor(selector, prefix) {
      this.prefix = prefix;
      this.prefixed = selector.prefixed(this.prefix);
      this.regexp = selector.regexp(this.prefix);

      this.prefixeds = selector
        .possible()
        .map(x => [selector.prefixed(x), selector.regexp(x)]);

      this.unprefixed = selector.name;
      this.nameRegexp = selector.regexp();
    }

    /**
     * Does rule contain an unnecessary prefixed selector
     */
    check(rule) {
      if (!rule.selector.includes(this.prefixed)) {
        return false
      }
      if (!rule.selector.match(this.regexp)) {
        return false
      }
      if (this.isHack(rule)) {
        return false
      }
      return true
    }

    /**
     * Is rule a hack without unprefixed version bottom
     */
    isHack(rule) {
      let index = rule.parent.index(rule) + 1;
      let rules = rule.parent.nodes;

      while (index < rules.length) {
        let before = rules[index].selector;
        if (!before) {
          return true
        }

        if (before.includes(this.unprefixed) && before.match(this.nameRegexp)) {
          return false
        }

        let some = false;
        for (let [string, regexp] of this.prefixeds) {
          if (before.includes(string) && before.match(regexp)) {
            some = true;
            break
          }
        }

        if (!some) {
          return true
        }

        index += 1;
      }

      return true
    }
  };

  var oldSelector = OldSelector$1;

  let { list: list$4 } = postcss_1;

  let Browsers$4 = browsers$1;
  let OldSelector = oldSelector;
  let Prefixer$2 = prefixer;
  let utils$d = utils$i;

  let Selector$6 = class Selector extends Prefixer$2 {
    constructor(name, prefixes, all) {
      super(name, prefixes, all);
      this.regexpCache = new Map();
    }

    /**
     * Clone and add prefixes for at-rule
     */
    add(rule, prefix) {
      let prefixeds = this.prefixeds(rule);

      if (this.already(rule, prefixeds, prefix)) {
        return
      }

      let cloned = this.clone(rule, { selector: prefixeds[this.name][prefix] });
      rule.parent.insertBefore(rule, cloned);
    }

    /**
     * Is rule already prefixed before
     */
    already(rule, prefixeds, prefix) {
      let index = rule.parent.index(rule) - 1;

      while (index >= 0) {
        let before = rule.parent.nodes[index];

        if (before.type !== 'rule') {
          return false
        }

        let some = false;
        for (let key in prefixeds[this.name]) {
          let prefixed = prefixeds[this.name][key];
          if (before.selector === prefixed) {
            if (prefix === key) {
              return true
            } else {
              some = true;
              break
            }
          }
        }
        if (!some) {
          return false
        }

        index -= 1;
      }

      return false
    }

    /**
     * Is rule selectors need to be prefixed
     */
    check(rule) {
      if (rule.selector.includes(this.name)) {
        return !!rule.selector.match(this.regexp())
      }

      return false
    }

    /**
     * Return function to fast find prefixed selector
     */
    old(prefix) {
      return new OldSelector(this, prefix)
    }

    /**
     * All possible prefixes
     */
    possible() {
      return Browsers$4.prefixes()
    }

    /**
     * Return prefixed version of selector
     */
    prefixed(prefix) {
      return this.name.replace(/^(\W*)/, `$1${prefix}`)
    }

    /**
     * Return all possible selector prefixes
     */
    prefixeds(rule) {
      if (rule._autoprefixerPrefixeds) {
        if (rule._autoprefixerPrefixeds[this.name]) {
          return rule._autoprefixerPrefixeds
        }
      } else {
        rule._autoprefixerPrefixeds = {};
      }

      let prefixeds = {};
      if (rule.selector.includes(',')) {
        let ruleParts = list$4.comma(rule.selector);
        let toProcess = ruleParts.filter(el => el.includes(this.name));

        for (let prefix of this.possible()) {
          prefixeds[prefix] = toProcess
            .map(el => this.replace(el, prefix))
            .join(', ');
        }
      } else {
        for (let prefix of this.possible()) {
          prefixeds[prefix] = this.replace(rule.selector, prefix);
        }
      }

      rule._autoprefixerPrefixeds[this.name] = prefixeds;
      return rule._autoprefixerPrefixeds
    }

    /**
     * Lazy loadRegExp for name
     */
    regexp(prefix) {
      if (!this.regexpCache.has(prefix)) {
        let name = prefix ? this.prefixed(prefix) : this.name;
        this.regexpCache.set(
          prefix,
          new RegExp(`(^|[^:"'=])${utils$d.escapeRegexp(name)}`, 'gi')
        );
      }

      return this.regexpCache.get(prefix)
    }

    /**
     * Replace selectors by prefixed one
     */
    replace(selector, prefix) {
      return selector.replace(this.regexp(), `$1${this.prefixed(prefix)}`)
    }
  };

  var selector = Selector$6;

  let Selector$5 = selector;
  let utils$c = utils$i;

  class Autofill extends Selector$5 {
    constructor(name, prefixes, all) {
      super(name, prefixes, all);

      if (this.prefixes) {
        this.prefixes = utils$c.uniq(this.prefixes.map(() => '-webkit-'));
      }
    }

    /**
     * Return different selectors depend on prefix
     */
    prefixed(prefix) {
      if (prefix === '-webkit-') {
        return ':-webkit-autofill'
      }
      return `:${prefix}autofill`
    }
  }

  Autofill.names = [':autofill'];

  var autofill = Autofill;

  let Declaration$D = declaration;
  let utils$b = utils$i;

  class BackdropFilter extends Declaration$D {
    constructor(name, prefixes, all) {
      super(name, prefixes, all);

      if (this.prefixes) {
        this.prefixes = utils$b.uniq(
          this.prefixes.map(i => {
            return i === '-ms-' ? '-webkit-' : i
          })
        );
      }
    }
  }

  BackdropFilter.names = ['backdrop-filter'];

  var backdropFilter = BackdropFilter;

  let Declaration$C = declaration;
  let utils$a = utils$i;

  class BackgroundClip extends Declaration$C {
    constructor(name, prefixes, all) {
      super(name, prefixes, all);

      if (this.prefixes) {
        this.prefixes = utils$a.uniq(
          this.prefixes.map(i => {
            return i === '-ms-' ? '-webkit-' : i
          })
        );
      }
    }

    check(decl) {
      return decl.value.toLowerCase() === 'text'
    }
  }

  BackgroundClip.names = ['background-clip'];

  var backgroundClip = BackgroundClip;

  let Declaration$B = declaration;

  class BackgroundSize extends Declaration$B {
    /**
     * Duplication parameter for -webkit- browsers
     */
    set(decl, prefix) {
      let value = decl.value.toLowerCase();
      if (
        prefix === '-webkit-' &&
        !value.includes(' ') &&
        value !== 'contain' &&
        value !== 'cover'
      ) {
        decl.value = decl.value + ' ' + decl.value;
      }
      return super.set(decl, prefix)
    }
  }

  BackgroundSize.names = ['background-size'];

  var backgroundSize = BackgroundSize;

  let Declaration$A = declaration;

  class BlockLogical extends Declaration$A {
    /**
     * Return property name by spec
     */
    normalize(prop) {
      if (prop.includes('-before')) {
        return prop.replace('-before', '-block-start')
      }
      return prop.replace('-after', '-block-end')
    }

    /**
     * Use old syntax for -moz- and -webkit-
     */
    prefixed(prop, prefix) {
      if (prop.includes('-start')) {
        return prefix + prop.replace('-block-start', '-before')
      }
      return prefix + prop.replace('-block-end', '-after')
    }
  }

  BlockLogical.names = [
    'border-block-start',
    'border-block-end',
    'margin-block-start',
    'margin-block-end',
    'padding-block-start',
    'padding-block-end',
    'border-before',
    'border-after',
    'margin-before',
    'margin-after',
    'padding-before',
    'padding-after'
  ];

  var blockLogical = BlockLogical;

  let Declaration$z = declaration;

  class BorderImage extends Declaration$z {
    /**
     * Remove fill parameter for prefixed declarations
     */
    set(decl, prefix) {
      decl.value = decl.value.replace(/\s+fill(\s)/, '$1');
      return super.set(decl, prefix)
    }
  }

  BorderImage.names = ['border-image'];

  var borderImage = BorderImage;

  let Declaration$y = declaration;

  class BorderRadius extends Declaration$y {
    /**
     * Return unprefixed version of property
     */
    normalize(prop) {
      return BorderRadius.toNormal[prop] || prop
    }

    /**
     * Change syntax, when add Mozilla prefix
     */
    prefixed(prop, prefix) {
      if (prefix === '-moz-') {
        return prefix + (BorderRadius.toMozilla[prop] || prop)
      }
      return super.prefixed(prop, prefix)
    }
  }

  BorderRadius.names = ['border-radius'];

  BorderRadius.toMozilla = {};
  BorderRadius.toNormal = {};

  for (let ver of ['top', 'bottom']) {
    for (let hor of ['left', 'right']) {
      let normal = `border-${ver}-${hor}-radius`;
      let mozilla = `border-radius-${ver}${hor}`;

      BorderRadius.names.push(normal);
      BorderRadius.names.push(mozilla);

      BorderRadius.toMozilla[normal] = mozilla;
      BorderRadius.toNormal[mozilla] = normal;
    }
  }

  var borderRadius = BorderRadius;

  let Declaration$x = declaration;

  class BreakProps extends Declaration$x {
    /**
     * Don’t prefix some values
     */
    insert(decl, prefix, prefixes) {
      if (decl.prop !== 'break-inside') {
        return super.insert(decl, prefix, prefixes)
      }
      if (/region/i.test(decl.value) || /page/i.test(decl.value)) {
        return undefined
      }
      return super.insert(decl, prefix, prefixes)
    }

    /**
     * Return property name by final spec
     */
    normalize(prop) {
      if (prop.includes('inside')) {
        return 'break-inside'
      }
      if (prop.includes('before')) {
        return 'break-before'
      }
      return 'break-after'
    }

    /**
     * Change name for -webkit- and -moz- prefix
     */
    prefixed(prop, prefix) {
      return `${prefix}column-${prop}`
    }

    /**
     * Change prefixed value for avoid-column and avoid-page
     */
    set(decl, prefix) {
      if (
        (decl.prop === 'break-inside' && decl.value === 'avoid-column') ||
        decl.value === 'avoid-page'
      ) {
        decl.value = 'avoid';
      }
      return super.set(decl, prefix)
    }
  }

  BreakProps.names = [
    'break-inside',
    'page-break-inside',
    'column-break-inside',
    'break-before',
    'page-break-before',
    'column-break-before',
    'break-after',
    'page-break-after',
    'column-break-after'
  ];

  var breakProps = BreakProps;

  let utils$9 = utils$i;

  let OldValue$5 = class OldValue {
    constructor(unprefixed, prefixed, string, regexp) {
      this.unprefixed = unprefixed;
      this.prefixed = prefixed;
      this.string = string || prefixed;
      this.regexp = regexp || utils$9.regexp(prefixed);
    }

    /**
     * Check, that value contain old value
     */
    check(value) {
      if (value.includes(this.string)) {
        return !!value.match(this.regexp)
      }
      return false
    }
  };

  var oldValue = OldValue$5;

  let OldValue$4 = oldValue;
  let Prefixer$1 = prefixer;
  let utils$8 = utils$i;
  let vendor$2 = vendor$4;

  let Value$b = class Value extends Prefixer$1 {
    /**
     * Clone decl for each prefixed values
     */
    static save(prefixes, decl) {
      let prop = decl.prop;
      let result = [];

      for (let prefix in decl._autoprefixerValues) {
        let value = decl._autoprefixerValues[prefix];

        if (value === decl.value) {
          continue
        }

        let item;
        let propPrefix = vendor$2.prefix(prop);

        if (propPrefix === '-pie-') {
          continue
        }

        if (propPrefix === prefix) {
          item = decl.value = value;
          result.push(item);
          continue
        }

        let prefixed = prefixes.prefixed(prop, prefix);
        let rule = decl.parent;

        if (!rule.every(i => i.prop !== prefixed)) {
          result.push(item);
          continue
        }

        let trimmed = value.replace(/\s+/, ' ');
        let already = rule.some(
          i => i.prop === decl.prop && i.value.replace(/\s+/, ' ') === trimmed
        );

        if (already) {
          result.push(item);
          continue
        }

        let cloned = this.clone(decl, { value });
        item = decl.parent.insertBefore(decl, cloned);

        result.push(item);
      }

      return result
    }

    /**
     * Save values with next prefixed token
     */
    add(decl, prefix) {
      if (!decl._autoprefixerValues) {
        decl._autoprefixerValues = {};
      }
      let value = decl._autoprefixerValues[prefix] || this.value(decl);

      let before;
      do {
        before = value;
        value = this.replace(value, prefix);
        if (value === false) return
      } while (value !== before)

      decl._autoprefixerValues[prefix] = value;
    }

    /**
     * Is declaration need to be prefixed
     */
    check(decl) {
      let value = decl.value;
      if (!value.includes(this.name)) {
        return false
      }

      return !!value.match(this.regexp())
    }

    /**
     * Return function to fast find prefixed value
     */
    old(prefix) {
      return new OldValue$4(this.name, prefix + this.name)
    }

    /**
     * Lazy regexp loading
     */
    regexp() {
      return this.regexpCache || (this.regexpCache = utils$8.regexp(this.name))
    }

    /**
     * Add prefix to values in string
     */
    replace(string, prefix) {
      return string.replace(this.regexp(), `$1${prefix}$2`)
    }

    /**
     * Get value with comments if it was not changed
     */
    value(decl) {
      if (decl.raws.value && decl.raws.value.value === decl.value) {
        return decl.raws.value.raw
      } else {
        return decl.value
      }
    }
  };

  var value = Value$b;

  let list$3 = postcss_1.list;

  let Value$a = value;

  class CrossFade extends Value$a {
    replace(string, prefix) {
      return list$3
        .space(string)
        .map(value => {
          if (value.slice(0, +this.name.length + 1) !== this.name + '(') {
            return value
          }

          let close = value.lastIndexOf(')');
          let after = value.slice(close + 1);
          let args = value.slice(this.name.length + 1, close);

          if (prefix === '-webkit-') {
            let match = args.match(/\d*.?\d+%?/);
            if (match) {
              args = args.slice(match[0].length).trim();
              args += `, ${match[0]}`;
            } else {
              args += ', 0.5';
            }
          }
          return prefix + this.name + '(' + args + ')' + after
        })
        .join(' ')
    }
  }

  CrossFade.names = ['cross-fade'];

  var crossFade = CrossFade;

  let OldValue$3 = oldValue;
  let Value$9 = value;
  let flexSpec$9 = flexSpec$d;

  class DisplayFlex extends Value$9 {
    constructor(name, prefixes) {
      super(name, prefixes);
      if (name === 'display-flex') {
        this.name = 'flex';
      }
    }

    /**
     * Faster check for flex value
     */
    check(decl) {
      return decl.prop === 'display' && decl.value === this.name
    }

    /**
     * Change value for old specs
     */
    old(prefix) {
      let prefixed = this.prefixed(prefix);
      if (!prefixed) return undefined
      return new OldValue$3(this.name, prefixed)
    }

    /**
     * Return value by spec
     */
    prefixed(prefix) {
      let spec, value
      ;[spec, prefix] = flexSpec$9(prefix);

      if (spec === 2009) {
        if (this.name === 'flex') {
          value = 'box';
        } else {
          value = 'inline-box';
        }
      } else if (spec === 2012) {
        if (this.name === 'flex') {
          value = 'flexbox';
        } else {
          value = 'inline-flexbox';
        }
      } else if (spec === 'final') {
        value = this.name;
      }

      return prefix + value
    }

    /**
     * Add prefix to value depend on flebox spec version
     */
    replace(string, prefix) {
      return this.prefixed(prefix)
    }
  }

  DisplayFlex.names = ['display-flex', 'inline-flex'];

  var displayFlex = DisplayFlex;

  let Value$8 = value;

  class DisplayGrid extends Value$8 {
    constructor(name, prefixes) {
      super(name, prefixes);
      if (name === 'display-grid') {
        this.name = 'grid';
      }
    }

    /**
     * Faster check for flex value
     */
    check(decl) {
      return decl.prop === 'display' && decl.value === this.name
    }
  }

  DisplayGrid.names = ['display-grid', 'inline-grid'];

  var displayGrid = DisplayGrid;

  let Selector$4 = selector;
  let utils$7 = utils$i;

  class FileSelectorButton extends Selector$4 {
    constructor(name, prefixes, all) {
      super(name, prefixes, all);

      if (this.prefixes) {
        this.prefixes = utils$7.uniq(this.prefixes.map(() => '-webkit-'));
      }
    }

    /**
     * Return different selectors depend on prefix
     */
    prefixed(prefix) {
      if (prefix === '-webkit-') {
        return '::-webkit-file-upload-button'
      }
      return `::${prefix}file-selector-button`
    }
  }

  FileSelectorButton.names = ['::file-selector-button'];

  var fileSelectorButton = FileSelectorButton;

  let Declaration$w = declaration;

  class Filter extends Declaration$w {
    /**
     * Check is it Internet Explorer filter
     */
    check(decl) {
      let v = decl.value;
      return (
        !v.toLowerCase().includes('alpha(') &&
        !v.includes('DXImageTransform.Microsoft') &&
        !v.includes('data:image/svg+xml')
      )
    }
  }

  Filter.names = ['filter'];

  var filter = Filter;

  let Value$7 = value;

  class FilterValue extends Value$7 {
    constructor(name, prefixes) {
      super(name, prefixes);
      if (name === 'filter-function') {
        this.name = 'filter';
      }
    }
  }

  FilterValue.names = ['filter', 'filter-function'];

  var filterValue = FilterValue;

  let list$2 = postcss_1.list;

  let Declaration$v = declaration;
  let flexSpec$8 = flexSpec$d;

  let Flex$1 = class Flex extends Declaration$v {
    /**
     * Return property name by final spec
     */
    normalize() {
      return 'flex'
    }

    /**
     * Change property name for 2009 spec
     */
    prefixed(prop, prefix) {
      let spec
      ;[spec, prefix] = flexSpec$8(prefix);
      if (spec === 2009) {
        return prefix + 'box-flex'
      }
      return super.prefixed(prop, prefix)
    }

    /**
     * Spec 2009 supports only first argument
     * Spec 2012 disallows unitless basis
     */
    set(decl, prefix) {
      let spec = flexSpec$8(prefix)[0];
      if (spec === 2009) {
        decl.value = list$2.space(decl.value)[0];
        decl.value = Flex.oldValues[decl.value] || decl.value;
        return super.set(decl, prefix)
      }
      if (spec === 2012) {
        let components = list$2.space(decl.value);
        if (components.length === 3 && components[2] === '0') {
          decl.value = components.slice(0, 2).concat('0px').join(' ');
        }
      }
      return super.set(decl, prefix)
    }
  };

  Flex$1.names = ['flex', 'box-flex'];

  Flex$1.oldValues = {
    auto: '1',
    none: '0'
  };

  var flex = Flex$1;

  let Declaration$u = declaration;
  let flexSpec$7 = flexSpec$d;

  class FlexBasis extends Declaration$u {
    /**
     * Return property name by final spec
     */
    normalize() {
      return 'flex-basis'
    }

    /**
     * Return flex property for 2012 spec
     */
    prefixed(prop, prefix) {
      let spec
      ;[spec, prefix] = flexSpec$7(prefix);
      if (spec === 2012) {
        return prefix + 'flex-preferred-size'
      }
      return super.prefixed(prop, prefix)
    }

    /**
     * Ignore 2009 spec and use flex property for 2012
     */
    set(decl, prefix) {
      let spec
      ;[spec, prefix] = flexSpec$7(prefix);
      if (spec === 2012 || spec === 'final') {
        return super.set(decl, prefix)
      }
      return undefined
    }
  }

  FlexBasis.names = ['flex-basis', 'flex-preferred-size'];

  var flexBasis = FlexBasis;

  let Declaration$t = declaration;
  let flexSpec$6 = flexSpec$d;

  class FlexDirection extends Declaration$t {
    /**
     * Use two properties for 2009 spec
     */
    insert(decl, prefix, prefixes) {
      let spec
      ;[spec, prefix] = flexSpec$6(prefix);
      if (spec !== 2009) {
        return super.insert(decl, prefix, prefixes)
      }
      let already = decl.parent.some(
        i =>
          i.prop === prefix + 'box-orient' || i.prop === prefix + 'box-direction'
      );
      if (already) {
        return undefined
      }

      let v = decl.value;
      let dir, orient;
      if (v === 'inherit' || v === 'initial' || v === 'unset') {
        orient = v;
        dir = v;
      } else {
        orient = v.includes('row') ? 'horizontal' : 'vertical';
        dir = v.includes('reverse') ? 'reverse' : 'normal';
      }

      let cloned = this.clone(decl);
      cloned.prop = prefix + 'box-orient';
      cloned.value = orient;
      if (this.needCascade(decl)) {
        cloned.raws.before = this.calcBefore(prefixes, decl, prefix);
      }
      decl.parent.insertBefore(decl, cloned);

      cloned = this.clone(decl);
      cloned.prop = prefix + 'box-direction';
      cloned.value = dir;
      if (this.needCascade(decl)) {
        cloned.raws.before = this.calcBefore(prefixes, decl, prefix);
      }
      return decl.parent.insertBefore(decl, cloned)
    }

    /**
     * Return property name by final spec
     */
    normalize() {
      return 'flex-direction'
    }

    /**
     * Clean two properties for 2009 spec
     */
    old(prop, prefix) {
      let spec
      ;[spec, prefix] = flexSpec$6(prefix);
      if (spec === 2009) {
        return [prefix + 'box-orient', prefix + 'box-direction']
      } else {
        return super.old(prop, prefix)
      }
    }
  }

  FlexDirection.names = ['flex-direction', 'box-direction', 'box-orient'];

  var flexDirection = FlexDirection;

  let Declaration$s = declaration;
  let flexSpec$5 = flexSpec$d;

  class FlexFlow extends Declaration$s {
    /**
     * Use two properties for 2009 spec
     */
    insert(decl, prefix, prefixes) {
      let spec
      ;[spec, prefix] = flexSpec$5(prefix);
      if (spec !== 2009) {
        return super.insert(decl, prefix, prefixes)
      }
      let values = decl.value
        .split(/\s+/)
        .filter(i => i !== 'wrap' && i !== 'nowrap' && 'wrap-reverse');
      if (values.length === 0) {
        return undefined
      }

      let already = decl.parent.some(
        i =>
          i.prop === prefix + 'box-orient' || i.prop === prefix + 'box-direction'
      );
      if (already) {
        return undefined
      }

      let value = values[0];
      let orient = value.includes('row') ? 'horizontal' : 'vertical';
      let dir = value.includes('reverse') ? 'reverse' : 'normal';

      let cloned = this.clone(decl);
      cloned.prop = prefix + 'box-orient';
      cloned.value = orient;
      if (this.needCascade(decl)) {
        cloned.raws.before = this.calcBefore(prefixes, decl, prefix);
      }
      decl.parent.insertBefore(decl, cloned);

      cloned = this.clone(decl);
      cloned.prop = prefix + 'box-direction';
      cloned.value = dir;
      if (this.needCascade(decl)) {
        cloned.raws.before = this.calcBefore(prefixes, decl, prefix);
      }
      return decl.parent.insertBefore(decl, cloned)
    }
  }

  FlexFlow.names = ['flex-flow', 'box-direction', 'box-orient'];

  var flexFlow = FlexFlow;

  let Declaration$r = declaration;
  let flexSpec$4 = flexSpec$d;

  class Flex extends Declaration$r {
    /**
     * Return property name by final spec
     */
    normalize() {
      return 'flex'
    }

    /**
     * Return flex property for 2009 and 2012 specs
     */
    prefixed(prop, prefix) {
      let spec
      ;[spec, prefix] = flexSpec$4(prefix);
      if (spec === 2009) {
        return prefix + 'box-flex'
      }
      if (spec === 2012) {
        return prefix + 'flex-positive'
      }
      return super.prefixed(prop, prefix)
    }
  }

  Flex.names = ['flex-grow', 'flex-positive'];

  var flexGrow = Flex;

  let Declaration$q = declaration;
  let flexSpec$3 = flexSpec$d;

  class FlexShrink extends Declaration$q {
    /**
     * Return property name by final spec
     */
    normalize() {
      return 'flex-shrink'
    }

    /**
     * Return flex property for 2012 spec
     */
    prefixed(prop, prefix) {
      let spec
      ;[spec, prefix] = flexSpec$3(prefix);
      if (spec === 2012) {
        return prefix + 'flex-negative'
      }
      return super.prefixed(prop, prefix)
    }

    /**
     * Ignore 2009 spec and use flex property for 2012
     */
    set(decl, prefix) {
      let spec
      ;[spec, prefix] = flexSpec$3(prefix);
      if (spec === 2012 || spec === 'final') {
        return super.set(decl, prefix)
      }
      return undefined
    }
  }

  FlexShrink.names = ['flex-shrink', 'flex-negative'];

  var flexShrink = FlexShrink;

  let Declaration$p = declaration;
  let flexSpec$2 = flexSpec$d;

  class FlexWrap extends Declaration$p {
    /**
     * Don't add prefix for 2009 spec
     */
    set(decl, prefix) {
      let spec = flexSpec$2(prefix)[0];
      if (spec !== 2009) {
        return super.set(decl, prefix)
      }
      return undefined
    }
  }

  FlexWrap.names = ['flex-wrap'];

  var flexWrap = FlexWrap;

  let Selector$3 = selector;

  class Fullscreen extends Selector$3 {
    /**
     * Return different selectors depend on prefix
     */
    prefixed(prefix) {
      if (prefix === '-webkit-') {
        return ':-webkit-full-screen'
      }
      if (prefix === '-moz-') {
        return ':-moz-full-screen'
      }
      return `:${prefix}fullscreen`
    }
  }

  Fullscreen.names = [':fullscreen'];

  var fullscreen = Fullscreen;

  var normalizeRange = {
    wrap: wrapRange,
    limit: limitRange,
    validate: validateRange,
    test: testRange,
    curry: curry,
    name: name
  };

  function wrapRange(min, max, value) {
    var maxLessMin = max - min;
    return ((value - min) % maxLessMin + maxLessMin) % maxLessMin + min;
  }

  function limitRange(min, max, value) {
    return Math.max(min, Math.min(max, value));
  }

  function validateRange(min, max, value, minExclusive, maxExclusive) {
    if (!testRange(min, max, value, minExclusive, maxExclusive)) {
      throw new Error(value + ' is outside of range [' + min + ',' + max + ')');
    }
    return value;
  }

  function testRange(min, max, value, minExclusive, maxExclusive) {
    return !(
         value < min ||
         value > max ||
         (maxExclusive && (value === max)) ||
         (minExclusive && (value === min))
    );
  }

  function name(min, max, minExcl, maxExcl) {
    return (minExcl ? '(' : '[') + min + ',' + max + (maxExcl ? ')' : ']');
  }

  function curry(min, max, minExclusive, maxExclusive) {
    var boundNameFn = name.bind(null, min, max, minExclusive, maxExclusive);
    return {
      wrap: wrapRange.bind(null, min, max),
      limit: limitRange.bind(null, min, max),
      validate: function(value) {
        return validateRange(min, max, value, minExclusive, maxExclusive);
      },
      test: function(value) {
        return testRange(min, max, value, minExclusive, maxExclusive);
      },
      toString: boundNameFn,
      name: boundNameFn
    };
  }

  var openParentheses = "(".charCodeAt(0);
  var closeParentheses = ")".charCodeAt(0);
  var singleQuote = "'".charCodeAt(0);
  var doubleQuote = '"'.charCodeAt(0);
  var backslash = "\\".charCodeAt(0);
  var slash = "/".charCodeAt(0);
  var comma = ",".charCodeAt(0);
  var colon = ":".charCodeAt(0);
  var star = "*".charCodeAt(0);
  var uLower = "u".charCodeAt(0);
  var uUpper = "U".charCodeAt(0);
  var plus = "+".charCodeAt(0);
  var isUnicodeRange = /^[a-f0-9?-]+$/i;

  var parse$3 = function(input) {
    var tokens = [];
    var value = input;

    var next,
      quote,
      prev,
      token,
      escape,
      escapePos,
      whitespacePos,
      parenthesesOpenPos;
    var pos = 0;
    var code = value.charCodeAt(pos);
    var max = value.length;
    var stack = [{ nodes: tokens }];
    var balanced = 0;
    var parent;

    var name = "";
    var before = "";
    var after = "";

    while (pos < max) {
      // Whitespaces
      if (code <= 32) {
        next = pos;
        do {
          next += 1;
          code = value.charCodeAt(next);
        } while (code <= 32);
        token = value.slice(pos, next);

        prev = tokens[tokens.length - 1];
        if (code === closeParentheses && balanced) {
          after = token;
        } else if (prev && prev.type === "div") {
          prev.after = token;
          prev.sourceEndIndex += token.length;
        } else if (
          code === comma ||
          code === colon ||
          (code === slash &&
            value.charCodeAt(next + 1) !== star &&
            (!parent ||
              (parent && parent.type === "function" && parent.value !== "calc")))
        ) {
          before = token;
        } else {
          tokens.push({
            type: "space",
            sourceIndex: pos,
            sourceEndIndex: next,
            value: token
          });
        }

        pos = next;

        // Quotes
      } else if (code === singleQuote || code === doubleQuote) {
        next = pos;
        quote = code === singleQuote ? "'" : '"';
        token = {
          type: "string",
          sourceIndex: pos,
          quote: quote
        };
        do {
          escape = false;
          next = value.indexOf(quote, next + 1);
          if (~next) {
            escapePos = next;
            while (value.charCodeAt(escapePos - 1) === backslash) {
              escapePos -= 1;
              escape = !escape;
            }
          } else {
            value += quote;
            next = value.length - 1;
            token.unclosed = true;
          }
        } while (escape);
        token.value = value.slice(pos + 1, next);
        token.sourceEndIndex = token.unclosed ? next : next + 1;
        tokens.push(token);
        pos = next + 1;
        code = value.charCodeAt(pos);

        // Comments
      } else if (code === slash && value.charCodeAt(pos + 1) === star) {
        next = value.indexOf("*/", pos);

        token = {
          type: "comment",
          sourceIndex: pos,
          sourceEndIndex: next + 2
        };

        if (next === -1) {
          token.unclosed = true;
          next = value.length;
          token.sourceEndIndex = next;
        }

        token.value = value.slice(pos + 2, next);
        tokens.push(token);

        pos = next + 2;
        code = value.charCodeAt(pos);

        // Operation within calc
      } else if (
        (code === slash || code === star) &&
        parent &&
        parent.type === "function" &&
        parent.value === "calc"
      ) {
        token = value[pos];
        tokens.push({
          type: "word",
          sourceIndex: pos - before.length,
          sourceEndIndex: pos + token.length,
          value: token
        });
        pos += 1;
        code = value.charCodeAt(pos);

        // Dividers
      } else if (code === slash || code === comma || code === colon) {
        token = value[pos];

        tokens.push({
          type: "div",
          sourceIndex: pos - before.length,
          sourceEndIndex: pos + token.length,
          value: token,
          before: before,
          after: ""
        });
        before = "";

        pos += 1;
        code = value.charCodeAt(pos);

        // Open parentheses
      } else if (openParentheses === code) {
        // Whitespaces after open parentheses
        next = pos;
        do {
          next += 1;
          code = value.charCodeAt(next);
        } while (code <= 32);
        parenthesesOpenPos = pos;
        token = {
          type: "function",
          sourceIndex: pos - name.length,
          value: name,
          before: value.slice(parenthesesOpenPos + 1, next)
        };
        pos = next;

        if (name === "url" && code !== singleQuote && code !== doubleQuote) {
          next -= 1;
          do {
            escape = false;
            next = value.indexOf(")", next + 1);
            if (~next) {
              escapePos = next;
              while (value.charCodeAt(escapePos - 1) === backslash) {
                escapePos -= 1;
                escape = !escape;
              }
            } else {
              value += ")";
              next = value.length - 1;
              token.unclosed = true;
            }
          } while (escape);
          // Whitespaces before closed
          whitespacePos = next;
          do {
            whitespacePos -= 1;
            code = value.charCodeAt(whitespacePos);
          } while (code <= 32);
          if (parenthesesOpenPos < whitespacePos) {
            if (pos !== whitespacePos + 1) {
              token.nodes = [
                {
                  type: "word",
                  sourceIndex: pos,
                  sourceEndIndex: whitespacePos + 1,
                  value: value.slice(pos, whitespacePos + 1)
                }
              ];
            } else {
              token.nodes = [];
            }
            if (token.unclosed && whitespacePos + 1 !== next) {
              token.after = "";
              token.nodes.push({
                type: "space",
                sourceIndex: whitespacePos + 1,
                sourceEndIndex: next,
                value: value.slice(whitespacePos + 1, next)
              });
            } else {
              token.after = value.slice(whitespacePos + 1, next);
              token.sourceEndIndex = next;
            }
          } else {
            token.after = "";
            token.nodes = [];
          }
          pos = next + 1;
          token.sourceEndIndex = token.unclosed ? next : pos;
          code = value.charCodeAt(pos);
          tokens.push(token);
        } else {
          balanced += 1;
          token.after = "";
          token.sourceEndIndex = pos + 1;
          tokens.push(token);
          stack.push(token);
          tokens = token.nodes = [];
          parent = token;
        }
        name = "";

        // Close parentheses
      } else if (closeParentheses === code && balanced) {
        pos += 1;
        code = value.charCodeAt(pos);

        parent.after = after;
        parent.sourceEndIndex += after.length;
        after = "";
        balanced -= 1;
        stack[stack.length - 1].sourceEndIndex = pos;
        stack.pop();
        parent = stack[balanced];
        tokens = parent.nodes;

        // Words
      } else {
        next = pos;
        do {
          if (code === backslash) {
            next += 1;
          }
          next += 1;
          code = value.charCodeAt(next);
        } while (
          next < max &&
          !(
            code <= 32 ||
            code === singleQuote ||
            code === doubleQuote ||
            code === comma ||
            code === colon ||
            code === slash ||
            code === openParentheses ||
            (code === star &&
              parent &&
              parent.type === "function" &&
              parent.value === "calc") ||
            (code === slash &&
              parent.type === "function" &&
              parent.value === "calc") ||
            (code === closeParentheses && balanced)
          )
        );
        token = value.slice(pos, next);

        if (openParentheses === code) {
          name = token;
        } else if (
          (uLower === token.charCodeAt(0) || uUpper === token.charCodeAt(0)) &&
          plus === token.charCodeAt(1) &&
          isUnicodeRange.test(token.slice(2))
        ) {
          tokens.push({
            type: "unicode-range",
            sourceIndex: pos,
            sourceEndIndex: next,
            value: token
          });
        } else {
          tokens.push({
            type: "word",
            sourceIndex: pos,
            sourceEndIndex: next,
            value: token
          });
        }

        pos = next;
      }
    }

    for (pos = stack.length - 1; pos; pos -= 1) {
      stack[pos].unclosed = true;
      stack[pos].sourceEndIndex = value.length;
    }

    return stack[0].nodes;
  };

  var walk$1 = function walk(nodes, cb, bubble) {
    var i, max, node, result;

    for (i = 0, max = nodes.length; i < max; i += 1) {
      node = nodes[i];
      if (!bubble) {
        result = cb(node, i, nodes);
      }

      if (
        result !== false &&
        node.type === "function" &&
        Array.isArray(node.nodes)
      ) {
        walk(node.nodes, cb, bubble);
      }

      if (bubble) {
        cb(node, i, nodes);
      }
    }
  };

  function stringifyNode(node, custom) {
    var type = node.type;
    var value = node.value;
    var buf;
    var customResult;

    if (custom && (customResult = custom(node)) !== undefined) {
      return customResult;
    } else if (type === "word" || type === "space") {
      return value;
    } else if (type === "string") {
      buf = node.quote || "";
      return buf + value + (node.unclosed ? "" : buf);
    } else if (type === "comment") {
      return "/*" + value + (node.unclosed ? "" : "*/");
    } else if (type === "div") {
      return (node.before || "") + value + (node.after || "");
    } else if (Array.isArray(node.nodes)) {
      buf = stringify$1(node.nodes, custom);
      if (type !== "function") {
        return buf;
      }
      return (
        value +
        "(" +
        (node.before || "") +
        buf +
        (node.after || "") +
        (node.unclosed ? "" : ")")
      );
    }
    return value;
  }

  function stringify$1(nodes, custom) {
    var result, i;

    if (Array.isArray(nodes)) {
      result = "";
      for (i = nodes.length - 1; ~i; i -= 1) {
        result = stringifyNode(nodes[i], custom) + result;
      }
      return result;
    }
    return stringifyNode(nodes, custom);
  }

  var stringify_1 = stringify$1;

  var unit;
  var hasRequiredUnit;

  function requireUnit () {
  	if (hasRequiredUnit) return unit;
  	hasRequiredUnit = 1;
  	var minus = "-".charCodeAt(0);
  	var plus = "+".charCodeAt(0);
  	var dot = ".".charCodeAt(0);
  	var exp = "e".charCodeAt(0);
  	var EXP = "E".charCodeAt(0);

  	// Check if three code points would start a number
  	// https://www.w3.org/TR/css-syntax-3/#starts-with-a-number
  	function likeNumber(value) {
  	  var code = value.charCodeAt(0);
  	  var nextCode;

  	  if (code === plus || code === minus) {
  	    nextCode = value.charCodeAt(1);

  	    if (nextCode >= 48 && nextCode <= 57) {
  	      return true;
  	    }

  	    var nextNextCode = value.charCodeAt(2);

  	    if (nextCode === dot && nextNextCode >= 48 && nextNextCode <= 57) {
  	      return true;
  	    }

  	    return false;
  	  }

  	  if (code === dot) {
  	    nextCode = value.charCodeAt(1);

  	    if (nextCode >= 48 && nextCode <= 57) {
  	      return true;
  	    }

  	    return false;
  	  }

  	  if (code >= 48 && code <= 57) {
  	    return true;
  	  }

  	  return false;
  	}

  	// Consume a number
  	// https://www.w3.org/TR/css-syntax-3/#consume-number
  	unit = function(value) {
  	  var pos = 0;
  	  var length = value.length;
  	  var code;
  	  var nextCode;
  	  var nextNextCode;

  	  if (length === 0 || !likeNumber(value)) {
  	    return false;
  	  }

  	  code = value.charCodeAt(pos);

  	  if (code === plus || code === minus) {
  	    pos++;
  	  }

  	  while (pos < length) {
  	    code = value.charCodeAt(pos);

  	    if (code < 48 || code > 57) {
  	      break;
  	    }

  	    pos += 1;
  	  }

  	  code = value.charCodeAt(pos);
  	  nextCode = value.charCodeAt(pos + 1);

  	  if (code === dot && nextCode >= 48 && nextCode <= 57) {
  	    pos += 2;

  	    while (pos < length) {
  	      code = value.charCodeAt(pos);

  	      if (code < 48 || code > 57) {
  	        break;
  	      }

  	      pos += 1;
  	    }
  	  }

  	  code = value.charCodeAt(pos);
  	  nextCode = value.charCodeAt(pos + 1);
  	  nextNextCode = value.charCodeAt(pos + 2);

  	  if (
  	    (code === exp || code === EXP) &&
  	    ((nextCode >= 48 && nextCode <= 57) ||
  	      ((nextCode === plus || nextCode === minus) &&
  	        nextNextCode >= 48 &&
  	        nextNextCode <= 57))
  	  ) {
  	    pos += nextCode === plus || nextCode === minus ? 3 : 2;

  	    while (pos < length) {
  	      code = value.charCodeAt(pos);

  	      if (code < 48 || code > 57) {
  	        break;
  	      }

  	      pos += 1;
  	    }
  	  }

  	  return {
  	    number: value.slice(0, pos),
  	    unit: value.slice(pos)
  	  };
  	};
  	return unit;
  }

  var parse$2 = parse$3;
  var walk = walk$1;
  var stringify = stringify_1;

  function ValueParser(value) {
    if (this instanceof ValueParser) {
      this.nodes = parse$2(value);
      return this;
    }
    return new ValueParser(value);
  }

  ValueParser.prototype.toString = function() {
    return Array.isArray(this.nodes) ? stringify(this.nodes) : "";
  };

  ValueParser.prototype.walk = function(cb, bubble) {
    walk(this.nodes, cb, bubble);
    return this;
  };

  ValueParser.unit = requireUnit();

  ValueParser.walk = walk;

  ValueParser.stringify = stringify;

  var lib = ValueParser;

  let range = normalizeRange;
  let parser$3 = lib;

  let OldValue$2 = oldValue;
  let utils$6 = utils$i;
  let Value$6 = value;

  let IS_DIRECTION = /top|left|right|bottom/gi;

  class Gradient extends Value$6 {
    /**
     * Do not add non-webkit prefixes for list-style and object
     */
    add(decl, prefix) {
      let p = decl.prop;
      if (p.includes('mask')) {
        if (prefix === '-webkit-' || prefix === '-webkit- old') {
          return super.add(decl, prefix)
        }
      } else if (
        p === 'list-style' ||
        p === 'list-style-image' ||
        p === 'content'
      ) {
        if (prefix === '-webkit-' || prefix === '-webkit- old') {
          return super.add(decl, prefix)
        }
      } else {
        return super.add(decl, prefix)
      }
      return undefined
    }

    /**
     * Get div token from exists parameters
     */
    cloneDiv(params) {
      for (let i of params) {
        if (i.type === 'div' && i.value === ',') {
          return i
        }
      }
      return { after: ' ', type: 'div', value: ',' }
    }

    /**
     * Change colors syntax to old webkit
     */
    colorStops(params) {
      let result = [];
      for (let i = 0; i < params.length; i++) {
        let pos;
        let param = params[i];
        let item;
        if (i === 0) {
          continue
        }

        let color = parser$3.stringify(param[0]);
        if (param[1] && param[1].type === 'word') {
          pos = param[1].value;
        } else if (param[2] && param[2].type === 'word') {
          pos = param[2].value;
        }

        let stop;
        if (i === 1 && (!pos || pos === '0%')) {
          stop = `from(${color})`;
        } else if (i === params.length - 1 && (!pos || pos === '100%')) {
          stop = `to(${color})`;
        } else if (pos) {
          stop = `color-stop(${pos}, ${color})`;
        } else {
          stop = `color-stop(${color})`;
        }

        let div = param[param.length - 1];
        params[i] = [{ type: 'word', value: stop }];
        if (div.type === 'div' && div.value === ',') {
          item = params[i].push(div);
        }
        result.push(item);
      }
      return result
    }

    /**
     * Change new direction to old
     */
    convertDirection(params) {
      if (params.length > 0) {
        if (params[0].value === 'to') {
          this.fixDirection(params);
        } else if (params[0].value.includes('deg')) {
          this.fixAngle(params);
        } else if (this.isRadial(params)) {
          this.fixRadial(params);
        }
      }
      return params
    }

    /**
     * Add 90 degrees
     */
    fixAngle(params) {
      let first = params[0].value;
      first = parseFloat(first);
      first = Math.abs(450 - first) % 360;
      first = this.roundFloat(first, 3);
      params[0].value = `${first}deg`;
    }

    /**
     * Replace `to top left` to `bottom right`
     */
    fixDirection(params) {
      params.splice(0, 2);

      for (let param of params) {
        if (param.type === 'div') {
          break
        }
        if (param.type === 'word') {
          param.value = this.revertDirection(param.value);
        }
      }
    }

    /**
     * Fix radial direction syntax
     */
    fixRadial(params) {
      let first = [];
      let second = [];
      let a, b, c, i, next;

      for (i = 0; i < params.length - 2; i++) {
        a = params[i];
        b = params[i + 1];
        c = params[i + 2];
        if (a.type === 'space' && b.value === 'at' && c.type === 'space') {
          next = i + 3;
          break
        } else {
          first.push(a);
        }
      }

      let div;
      for (i = next; i < params.length; i++) {
        if (params[i].type === 'div') {
          div = params[i];
          break
        } else {
          second.push(params[i]);
        }
      }

      params.splice(0, i, ...second, div, ...first);
    }

    /**
     * Look for at word
     */
    isRadial(params) {
      let state = 'before';
      for (let param of params) {
        if (state === 'before' && param.type === 'space') {
          state = 'at';
        } else if (state === 'at' && param.value === 'at') {
          state = 'after';
        } else if (state === 'after' && param.type === 'space') {
          return true
        } else if (param.type === 'div') {
          break
        } else {
          state = 'before';
        }
      }
      return false
    }

    /**
     * Replace old direction to new
     */
    newDirection(params) {
      if (params[0].value === 'to') {
        return params
      }
      IS_DIRECTION.lastIndex = 0; // reset search index of global regexp
      if (!IS_DIRECTION.test(params[0].value)) {
        return params
      }

      params.unshift(
        {
          type: 'word',
          value: 'to'
        },
        {
          type: 'space',
          value: ' '
        }
      );

      for (let i = 2; i < params.length; i++) {
        if (params[i].type === 'div') {
          break
        }
        if (params[i].type === 'word') {
          params[i].value = this.revertDirection(params[i].value);
        }
      }

      return params
    }

    /**
     * Normalize angle
     */
    normalize(nodes, gradientName) {
      if (!nodes[0]) return nodes

      if (/-?\d+(.\d+)?grad/.test(nodes[0].value)) {
        nodes[0].value = this.normalizeUnit(nodes[0].value, 400);
      } else if (/-?\d+(.\d+)?rad/.test(nodes[0].value)) {
        nodes[0].value = this.normalizeUnit(nodes[0].value, 2 * Math.PI);
      } else if (/-?\d+(.\d+)?turn/.test(nodes[0].value)) {
        nodes[0].value = this.normalizeUnit(nodes[0].value, 1);
      } else if (nodes[0].value.includes('deg')) {
        let num = parseFloat(nodes[0].value);
        num = range.wrap(0, 360, num);
        nodes[0].value = `${num}deg`;
      }

      if (
        gradientName === 'linear-gradient' ||
        gradientName === 'repeating-linear-gradient'
      ) {
        let direction = nodes[0].value;

        // Unitless zero for `<angle>` values are allowed in CSS gradients and transforms.
        // Spec: https://github.com/w3c/csswg-drafts/commit/602789171429b2231223ab1e5acf8f7f11652eb3
        if (direction === '0deg' || direction === '0') {
          nodes = this.replaceFirst(nodes, 'to', ' ', 'top');
        } else if (direction === '90deg') {
          nodes = this.replaceFirst(nodes, 'to', ' ', 'right');
        } else if (direction === '180deg') {
          nodes = this.replaceFirst(nodes, 'to', ' ', 'bottom'); // default value
        } else if (direction === '270deg') {
          nodes = this.replaceFirst(nodes, 'to', ' ', 'left');
        }
      }

      return nodes
    }

    /**
     * Convert angle unit to deg
     */
    normalizeUnit(str, full) {
      let num = parseFloat(str);
      let deg = (num / full) * 360;
      return `${deg}deg`
    }

    /**
     * Remove old WebKit gradient too
     */
    old(prefix) {
      if (prefix === '-webkit-') {
        let type;
        if (this.name === 'linear-gradient') {
          type = 'linear';
        } else if (this.name === 'repeating-linear-gradient') {
          type = 'repeating-linear';
        } else if (this.name === 'repeating-radial-gradient') {
          type = 'repeating-radial';
        } else {
          type = 'radial';
        }
        let string = '-gradient';
        let regexp = utils$6.regexp(
          `-webkit-(${type}-gradient|gradient\\(\\s*${type})`,
          false
        );

        return new OldValue$2(this.name, prefix + this.name, string, regexp)
      } else {
        return super.old(prefix)
      }
    }

    /**
     * Change direction syntax to old webkit
     */
    oldDirection(params) {
      let div = this.cloneDiv(params[0]);

      if (params[0][0].value !== 'to') {
        return params.unshift([
          { type: 'word', value: Gradient.oldDirections.bottom },
          div
        ])
      } else {
        let words = [];
        for (let node of params[0].slice(2)) {
          if (node.type === 'word') {
            words.push(node.value.toLowerCase());
          }
        }

        words = words.join(' ');
        let old = Gradient.oldDirections[words] || words;

        params[0] = [{ type: 'word', value: old }, div];
        return params[0]
      }
    }

    /**
     * Convert to old webkit syntax
     */
    oldWebkit(node) {
      let { nodes } = node;
      let string = parser$3.stringify(node.nodes);

      if (this.name !== 'linear-gradient') {
        return false
      }
      if (nodes[0] && nodes[0].value.includes('deg')) {
        return false
      }
      if (
        string.includes('px') ||
        string.includes('-corner') ||
        string.includes('-side')
      ) {
        return false
      }

      let params = [[]];
      for (let i of nodes) {
        params[params.length - 1].push(i);
        if (i.type === 'div' && i.value === ',') {
          params.push([]);
        }
      }

      this.oldDirection(params);
      this.colorStops(params);

      node.nodes = [];
      for (let param of params) {
        node.nodes = node.nodes.concat(param);
      }

      node.nodes.unshift(
        { type: 'word', value: 'linear' },
        this.cloneDiv(node.nodes)
      );
      node.value = '-webkit-gradient';

      return true
    }

    /**
     * Change degrees for webkit prefix
     */
    replace(string, prefix) {
      let ast = parser$3(string);
      for (let node of ast.nodes) {
        let gradientName = this.name; // gradient name
        if (node.type === 'function' && node.value === gradientName) {
          node.nodes = this.newDirection(node.nodes);
          node.nodes = this.normalize(node.nodes, gradientName);
          if (prefix === '-webkit- old') {
            let changes = this.oldWebkit(node);
            if (!changes) {
              return false
            }
          } else {
            node.nodes = this.convertDirection(node.nodes);
            node.value = prefix + node.value;
          }
        }
      }
      return ast.toString()
    }

    /**
     * Replace first token
     */
    replaceFirst(params, ...words) {
      let prefix = words.map(i => {
        if (i === ' ') {
          return { type: 'space', value: i }
        }
        return { type: 'word', value: i }
      });
      return prefix.concat(params.slice(1))
    }

    revertDirection(word) {
      return Gradient.directions[word.toLowerCase()] || word
    }

    /**
     * Round float and save digits under dot
     */
    roundFloat(float, digits) {
      return parseFloat(float.toFixed(digits))
    }
  }

  Gradient.names = [
    'linear-gradient',
    'repeating-linear-gradient',
    'radial-gradient',
    'repeating-radial-gradient'
  ];

  Gradient.directions = {
    bottom: 'top',
    left: 'right',
    right: 'left',
    top: 'bottom' // default value
  };

  // Direction to replace
  Gradient.oldDirections = {
    'bottom': 'left top, left bottom',
    'bottom left': 'right top, left bottom',
    'bottom right': 'left top, right bottom',
    'left': 'right top, left top',

    'left bottom': 'right top, left bottom',
    'left top': 'right bottom, left top',
    'right': 'left top, right top',
    'right bottom': 'left top, right bottom',
    'right top': 'left bottom, right top',
    'top': 'left bottom, left top',
    'top left': 'right bottom, left top',
    'top right': 'left bottom, right top'
  };

  var gradient = Gradient;

  var gridUtils = {};

  let parser$2 = lib;
  let list$1 = postcss_1.list;

  let uniq = utils$i.uniq;
  let escapeRegexp = utils$i.escapeRegexp;
  let splitSelector = utils$i.splitSelector;

  function convert(value) {
    if (
      value &&
      value.length === 2 &&
      value[0] === 'span' &&
      parseInt(value[1], 10) > 0
    ) {
      return [false, parseInt(value[1], 10)]
    }

    if (value && value.length === 1 && parseInt(value[0], 10) > 0) {
      return [parseInt(value[0], 10), false]
    }

    return [false, false]
  }

  gridUtils.translate = translate;

  function translate(values, startIndex, endIndex) {
    let startValue = values[startIndex];
    let endValue = values[endIndex];

    if (!startValue) {
      return [false, false]
    }

    let [start, spanStart] = convert(startValue);
    let [end, spanEnd] = convert(endValue);

    if (start && !endValue) {
      return [start, false]
    }

    if (spanStart && end) {
      return [end - spanStart, spanStart]
    }

    if (start && spanEnd) {
      return [start, spanEnd]
    }

    if (start && end) {
      return [start, end - start]
    }

    return [false, false]
  }

  gridUtils.parse = parse$1;

  function parse$1(decl) {
    let node = parser$2(decl.value);

    let values = [];
    let current = 0;
    values[current] = [];

    for (let i of node.nodes) {
      if (i.type === 'div') {
        current += 1;
        values[current] = [];
      } else if (i.type === 'word') {
        values[current].push(i.value);
      }
    }

    return values
  }

  gridUtils.insertDecl = insertDecl;

  function insertDecl(decl, prop, value) {
    if (value && !decl.parent.some(i => i.prop === `-ms-${prop}`)) {
      decl.cloneBefore({
        prop: `-ms-${prop}`,
        value: value.toString()
      });
    }
  }

  // Track transforms

  gridUtils.prefixTrackProp = prefixTrackProp$2;

  function prefixTrackProp$2({ prefix, prop }) {
    return prefix + prop.replace('template-', '')
  }

  function transformRepeat({ nodes }, { gap }) {
    let { count, size } = nodes.reduce(
      (result, node) => {
        if (node.type === 'div' && node.value === ',') {
          result.key = 'size';
        } else {
          result[result.key].push(parser$2.stringify(node));
        }
        return result
      },
      {
        count: [],
        key: 'count',
        size: []
      }
    );

    // insert gap values
    if (gap) {
      size = size.filter(i => i.trim());
      let val = [];
      for (let i = 1; i <= count; i++) {
        size.forEach((item, index) => {
          if (index > 0 || i > 1) {
            val.push(gap);
          }
          val.push(item);
        });
      }

      return val.join(' ')
    }

    return `(${size.join('')})[${count.join('')}]`
  }

  gridUtils.prefixTrackValue = prefixTrackValue$2;

  function prefixTrackValue$2({ gap, value }) {
    let result = parser$2(value).nodes.reduce((nodes, node) => {
      if (node.type === 'function' && node.value === 'repeat') {
        return nodes.concat({
          type: 'word',
          value: transformRepeat(node, { gap })
        })
      }
      if (gap && node.type === 'space') {
        return nodes.concat(
          {
            type: 'space',
            value: ' '
          },
          {
            type: 'word',
            value: gap
          },
          node
        )
      }
      return nodes.concat(node)
    }, []);

    return parser$2.stringify(result)
  }

  // Parse grid-template-areas

  let DOTS = /^\.+$/;

  function track(start, end) {
    return { end, span: end - start, start }
  }

  function getColumns(line) {
    return line.trim().split(/\s+/g)
  }

  gridUtils.parseGridAreas = parseGridAreas$1;

  function parseGridAreas$1({ gap, rows }) {
    return rows.reduce((areas, line, rowIndex) => {
      if (gap.row) rowIndex *= 2;

      if (line.trim() === '') return areas

      getColumns(line).forEach((area, columnIndex) => {
        if (DOTS.test(area)) return

        if (gap.column) columnIndex *= 2;

        if (typeof areas[area] === 'undefined') {
          areas[area] = {
            column: track(columnIndex + 1, columnIndex + 2),
            row: track(rowIndex + 1, rowIndex + 2)
          };
        } else {
          let { column, row } = areas[area];

          column.start = Math.min(column.start, columnIndex + 1);
          column.end = Math.max(column.end, columnIndex + 2);
          column.span = column.end - column.start;

          row.start = Math.min(row.start, rowIndex + 1);
          row.end = Math.max(row.end, rowIndex + 2);
          row.span = row.end - row.start;
        }
      });

      return areas
    }, {})
  }

  // Parse grid-template

  function testTrack(node) {
    return node.type === 'word' && /^\[.+]$/.test(node.value)
  }

  function verifyRowSize(result) {
    if (result.areas.length > result.rows.length) {
      result.rows.push('auto');
    }
    return result
  }

  gridUtils.parseTemplate = parseTemplate$1;

  function parseTemplate$1({ decl, gap }) {
    let gridTemplate = parser$2(decl.value).nodes.reduce(
      (result, node) => {
        let { type, value } = node;

        if (testTrack(node) || type === 'space') return result

        // area
        if (type === 'string') {
          result = verifyRowSize(result);
          result.areas.push(value);
        }

        // values and function
        if (type === 'word' || type === 'function') {
          result[result.key].push(parser$2.stringify(node));
        }

        // divider(/)
        if (type === 'div' && value === '/') {
          result.key = 'columns';
          result = verifyRowSize(result);
        }

        return result
      },
      {
        areas: [],
        columns: [],
        key: 'rows',
        rows: []
      }
    );

    return {
      areas: parseGridAreas$1({
        gap,
        rows: gridTemplate.areas
      }),
      columns: prefixTrackValue$2({
        gap: gap.column,
        value: gridTemplate.columns.join(' ')
      }),
      rows: prefixTrackValue$2({
        gap: gap.row,
        value: gridTemplate.rows.join(' ')
      })
    }
  }

  // Insert parsed grid areas

  /**
   * Get an array of -ms- prefixed props and values
   * @param  {Object} [area] area object with column and row data
   * @param  {Boolean} [addRowSpan] should we add grid-column-row value?
   * @param  {Boolean} [addColumnSpan] should we add grid-column-span value?
   * @return {Array<Object>}
   */
  function getMSDecls(area, addRowSpan = false, addColumnSpan = false) {
    let result = [
      {
        prop: '-ms-grid-row',
        value: String(area.row.start)
      }
    ];
    if (area.row.span > 1 || addRowSpan) {
      result.push({
        prop: '-ms-grid-row-span',
        value: String(area.row.span)
      });
    }
    result.push({
      prop: '-ms-grid-column',
      value: String(area.column.start)
    });
    if (area.column.span > 1 || addColumnSpan) {
      result.push({
        prop: '-ms-grid-column-span',
        value: String(area.column.span)
      });
    }
    return result
  }

  function getParentMedia(parent) {
    if (parent.type === 'atrule' && parent.name === 'media') {
      return parent
    }
    if (!parent.parent) {
      return false
    }
    return getParentMedia(parent.parent)
  }

  /**
   * change selectors for rules with duplicate grid-areas.
   * @param  {Array<Rule>} rules
   * @param  {Array<String>} templateSelectors
   * @return {Array<Rule>} rules with changed selectors
   */
  function changeDuplicateAreaSelectors(ruleSelectors, templateSelectors) {
    ruleSelectors = ruleSelectors.map(selector => {
      let selectorBySpace = list$1.space(selector);
      let selectorByComma = list$1.comma(selector);

      if (selectorBySpace.length > selectorByComma.length) {
        selector = selectorBySpace.slice(-1).join('');
      }
      return selector
    });

    return ruleSelectors.map(ruleSelector => {
      let newSelector = templateSelectors.map((tplSelector, index) => {
        let space = index === 0 ? '' : ' ';
        return `${space}${tplSelector} > ${ruleSelector}`
      });

      return newSelector
    })
  }

  /**
   * check if selector of rules are equal
   * @param  {Rule} ruleA
   * @param  {Rule} ruleB
   * @return {Boolean}
   */
  function selectorsEqual(ruleA, ruleB) {
    return ruleA.selectors.some(sel => {
      return ruleB.selectors.includes(sel)
    })
  }

  /**
   * Parse data from all grid-template(-areas) declarations
   * @param  {Root} css css root
   * @return {Object} parsed data
   */
  function parseGridTemplatesData(css) {
    let parsed = [];

    // we walk through every grid-template(-areas) declaration and store
    // data with the same area names inside the item
    css.walkDecls(/grid-template(-areas)?$/, d => {
      let rule = d.parent;
      let media = getParentMedia(rule);
      let gap = getGridGap$3(d);
      let inheritedGap = inheritGridGap$3(d, gap);
      let { areas } = parseTemplate$1({ decl: d, gap: inheritedGap || gap });
      let areaNames = Object.keys(areas);

      // skip node if it doesn't have areas
      if (areaNames.length === 0) {
        return true
      }

      // check parsed array for item that include the same area names
      // return index of that item
      let index = parsed.reduce((acc, { allAreas }, idx) => {
        let hasAreas = allAreas && areaNames.some(area => allAreas.includes(area));
        return hasAreas ? idx : acc
      }, null);

      if (index !== null) {
        // index is found, add the grid-template data to that item
        let { allAreas, rules } = parsed[index];

        // check if rule has no duplicate area names
        let hasNoDuplicates = rules.some(r => {
          return r.hasDuplicates === false && selectorsEqual(r, rule)
        });

        let duplicatesFound = false;

        // check need to gather all duplicate area names
        let duplicateAreaNames = rules.reduce((acc, r) => {
          if (!r.params && selectorsEqual(r, rule)) {
            duplicatesFound = true;
            return r.duplicateAreaNames
          }
          if (!duplicatesFound) {
            areaNames.forEach(name => {
              if (r.areas[name]) {
                acc.push(name);
              }
            });
          }
          return uniq(acc)
        }, []);

        // update grid-row/column-span values for areas with duplicate
        // area names. @see #1084 and #1146
        rules.forEach(r => {
          areaNames.forEach(name => {
            let area = r.areas[name];
            if (area && area.row.span !== areas[name].row.span) {
              areas[name].row.updateSpan = true;
            }

            if (area && area.column.span !== areas[name].column.span) {
              areas[name].column.updateSpan = true;
            }
          });
        });

        parsed[index].allAreas = uniq([...allAreas, ...areaNames]);
        parsed[index].rules.push({
          areas,
          duplicateAreaNames,
          hasDuplicates: !hasNoDuplicates,
          node: rule,
          params: media.params,
          selectors: rule.selectors
        });
      } else {
        // index is NOT found, push the new item to the parsed array
        parsed.push({
          allAreas: areaNames,
          areasCount: 0,
          rules: [
            {
              areas,
              duplicateAreaNames: [],
              duplicateRules: [],
              hasDuplicates: false,
              node: rule,
              params: media.params,
              selectors: rule.selectors
            }
          ]
        });
      }

      return undefined
    });

    return parsed
  }

  /**
   * insert prefixed grid-area declarations
   * @param  {Root}  css css root
   * @param  {Function} isDisabled check if the rule is disabled
   * @return {void}
   */
  gridUtils.insertAreas = insertAreas$1;

  function insertAreas$1(css, isDisabled) {
    // parse grid-template declarations
    let gridTemplatesData = parseGridTemplatesData(css);

    // return undefined if no declarations found
    if (gridTemplatesData.length === 0) {
      return undefined
    }

    // we need to store the rules that we will insert later
    let rulesToInsert = {};

    css.walkDecls('grid-area', gridArea => {
      let gridAreaRule = gridArea.parent;
      let hasPrefixedRow = gridAreaRule.first.prop === '-ms-grid-row';
      let gridAreaMedia = getParentMedia(gridAreaRule);

      if (isDisabled(gridArea)) {
        return undefined
      }

      let gridAreaRuleIndex = css.index(gridAreaMedia || gridAreaRule);

      let value = gridArea.value;
      // found the data that matches grid-area identifier
      let data = gridTemplatesData.filter(d => d.allAreas.includes(value))[0];

      if (!data) {
        return true
      }

      let lastArea = data.allAreas[data.allAreas.length - 1];
      let selectorBySpace = list$1.space(gridAreaRule.selector);
      let selectorByComma = list$1.comma(gridAreaRule.selector);
      let selectorIsComplex =
        selectorBySpace.length > 1 &&
        selectorBySpace.length > selectorByComma.length;

      // prevent doubling of prefixes
      if (hasPrefixedRow) {
        return false
      }

      // create the empty object with the key as the last area name
      // e.g if we have templates with "a b c" values, "c" will be the last area
      if (!rulesToInsert[lastArea]) {
        rulesToInsert[lastArea] = {};
      }

      let lastRuleIsSet = false;

      // walk through every grid-template rule data
      for (let rule of data.rules) {
        let area = rule.areas[value];
        let hasDuplicateName = rule.duplicateAreaNames.includes(value);

        // if we can't find the area name, update lastRule and continue
        if (!area) {
          let lastRule = rulesToInsert[lastArea].lastRule;
          let lastRuleIndex;
          if (lastRule) {
            lastRuleIndex = css.index(lastRule);
          } else {
            /* c8 ignore next 2 */
            lastRuleIndex = -1;
          }

          if (gridAreaRuleIndex > lastRuleIndex) {
            rulesToInsert[lastArea].lastRule = gridAreaMedia || gridAreaRule;
          }
          continue
        }

        // for grid-templates inside media rule we need to create empty
        // array to push prefixed grid-area rules later
        if (rule.params && !rulesToInsert[lastArea][rule.params]) {
          rulesToInsert[lastArea][rule.params] = [];
        }

        if ((!rule.hasDuplicates || !hasDuplicateName) && !rule.params) {
          // grid-template has no duplicates and not inside media rule

          getMSDecls(area, false, false)
            .reverse()
            .forEach(i =>
              gridAreaRule.prepend(
                Object.assign(i, {
                  raws: {
                    between: gridArea.raws.between
                  }
                })
              )
            );

          rulesToInsert[lastArea].lastRule = gridAreaRule;
          lastRuleIsSet = true;
        } else if (rule.hasDuplicates && !rule.params && !selectorIsComplex) {
          // grid-template has duplicates and not inside media rule
          let cloned = gridAreaRule.clone();
          cloned.removeAll();

          getMSDecls(area, area.row.updateSpan, area.column.updateSpan)
            .reverse()
            .forEach(i =>
              cloned.prepend(
                Object.assign(i, {
                  raws: {
                    between: gridArea.raws.between
                  }
                })
              )
            );

          cloned.selectors = changeDuplicateAreaSelectors(
            cloned.selectors,
            rule.selectors
          );

          if (rulesToInsert[lastArea].lastRule) {
            rulesToInsert[lastArea].lastRule.after(cloned);
          }
          rulesToInsert[lastArea].lastRule = cloned;
          lastRuleIsSet = true;
        } else if (
          rule.hasDuplicates &&
          !rule.params &&
          selectorIsComplex &&
          gridAreaRule.selector.includes(rule.selectors[0])
        ) {
          // grid-template has duplicates and not inside media rule
          // and the selector is complex
          gridAreaRule.walkDecls(/-ms-grid-(row|column)/, d => d.remove());
          getMSDecls(area, area.row.updateSpan, area.column.updateSpan)
            .reverse()
            .forEach(i =>
              gridAreaRule.prepend(
                Object.assign(i, {
                  raws: {
                    between: gridArea.raws.between
                  }
                })
              )
            );
        } else if (rule.params) {
          // grid-template is inside media rule
          // if we're inside media rule, we need to store prefixed rules
          // inside rulesToInsert object to be able to preserve the order of media
          // rules and merge them easily
          let cloned = gridAreaRule.clone();
          cloned.removeAll();

          getMSDecls(area, area.row.updateSpan, area.column.updateSpan)
            .reverse()
            .forEach(i =>
              cloned.prepend(
                Object.assign(i, {
                  raws: {
                    between: gridArea.raws.between
                  }
                })
              )
            );

          if (rule.hasDuplicates && hasDuplicateName) {
            cloned.selectors = changeDuplicateAreaSelectors(
              cloned.selectors,
              rule.selectors
            );
          }

          cloned.raws = rule.node.raws;

          if (css.index(rule.node.parent) > gridAreaRuleIndex) {
            // append the prefixed rules right inside media rule
            // with grid-template
            rule.node.parent.append(cloned);
          } else {
            // store the rule to insert later
            rulesToInsert[lastArea][rule.params].push(cloned);
          }

          // set new rule as last rule ONLY if we didn't set lastRule for
          // this grid-area before
          if (!lastRuleIsSet) {
            rulesToInsert[lastArea].lastRule = gridAreaMedia || gridAreaRule;
          }
        }
      }

      return undefined
    });

    // append stored rules inside the media rules
    Object.keys(rulesToInsert).forEach(area => {
      let data = rulesToInsert[area];
      let lastRule = data.lastRule;
      Object.keys(data)
        .reverse()
        .filter(p => p !== 'lastRule')
        .forEach(params => {
          if (data[params].length > 0 && lastRule) {
            lastRule.after({ name: 'media', params });
            lastRule.next().append(data[params]);
          }
        });
    });

    return undefined
  }

  /**
   * Warn user if grid area identifiers are not found
   * @param  {Object} areas
   * @param  {Declaration} decl
   * @param  {Result} result
   * @return {void}
   */
  gridUtils.warnMissedAreas = warnMissedAreas$2;

  function warnMissedAreas$2(areas, decl, result) {
    let missed = Object.keys(areas);

    decl.root().walkDecls('grid-area', gridArea => {
      missed = missed.filter(e => e !== gridArea.value);
    });

    if (missed.length > 0) {
      decl.warn(result, 'Can not find grid areas: ' + missed.join(', '));
    }

    return undefined
  }

  /**
   * compare selectors with grid-area rule and grid-template rule
   * show warning if grid-template selector is not found
   * (this function used for grid-area rule)
   * @param  {Declaration} decl
   * @param  {Result} result
   * @return {void}
   */
  gridUtils.warnTemplateSelectorNotFound = warnTemplateSelectorNotFound;

  function warnTemplateSelectorNotFound(decl, result) {
    let rule = decl.parent;
    let root = decl.root();
    let duplicatesFound = false;

    // slice selector array. Remove the last part (for comparison)
    let slicedSelectorArr = list$1
      .space(rule.selector)
      .filter(str => str !== '>')
      .slice(0, -1);

    // we need to compare only if selector is complex.
    // e.g '.grid-cell' is simple, but '.parent > .grid-cell' is complex
    if (slicedSelectorArr.length > 0) {
      let gridTemplateFound = false;
      let foundAreaSelector = null;

      root.walkDecls(/grid-template(-areas)?$/, d => {
        let parent = d.parent;
        let templateSelectors = parent.selectors;

        let { areas } = parseTemplate$1({ decl: d, gap: getGridGap$3(d) });
        let hasArea = areas[decl.value];

        // find the the matching selectors
        for (let tplSelector of templateSelectors) {
          if (gridTemplateFound) {
            break
          }
          let tplSelectorArr = list$1.space(tplSelector).filter(str => str !== '>');

          gridTemplateFound = tplSelectorArr.every(
            (item, idx) => item === slicedSelectorArr[idx]
          );
        }

        if (gridTemplateFound || !hasArea) {
          return true
        }

        if (!foundAreaSelector) {
          foundAreaSelector = parent.selector;
        }

        // if we found the duplicate area with different selector
        if (foundAreaSelector && foundAreaSelector !== parent.selector) {
          duplicatesFound = true;
        }

        return undefined
      });

      // warn user if we didn't find template
      if (!gridTemplateFound && duplicatesFound) {
        decl.warn(
          result,
          'Autoprefixer cannot find a grid-template ' +
            `containing the duplicate grid-area "${decl.value}" ` +
            `with full selector matching: ${slicedSelectorArr.join(' ')}`
        );
      }
    }
  }

  /**
   * warn user if both grid-area and grid-(row|column)
   * declarations are present in the same rule
   * @param  {Declaration} decl
   * @param  {Result} result
   * @return {void}
   */
  gridUtils.warnIfGridRowColumnExists = warnIfGridRowColumnExists;

  function warnIfGridRowColumnExists(decl, result) {
    let rule = decl.parent;
    let decls = [];
    rule.walkDecls(/^grid-(row|column)/, d => {
      if (
        !d.prop.endsWith('-end') &&
        !d.value.startsWith('span') &&
        !d.prop.endsWith('-gap')
      ) {
        decls.push(d);
      }
    });
    if (decls.length > 0) {
      decls.forEach(d => {
        d.warn(
          result,
          'You already have a grid-area declaration present in the rule. ' +
            `You should use either grid-area or ${d.prop}, not both`
        );
      });
    }

    return undefined
  }

  // Gap utils

  gridUtils.getGridGap = getGridGap$3;

  function getGridGap$3(decl) {
    let gap = {};

    // try to find gap
    let testGap = /^(grid-)?((row|column)-)?gap$/;
    decl.parent.walkDecls(testGap, ({ prop, value }) => {
      if (/^(grid-)?gap$/.test(prop)) {
        let [row, , column] = parser$2(value).nodes;

        gap.row = row && parser$2.stringify(row);
        gap.column = column ? parser$2.stringify(column) : gap.row;
      }
      if (/^(grid-)?row-gap$/.test(prop)) gap.row = value;
      if (/^(grid-)?column-gap$/.test(prop)) gap.column = value;
    });

    return gap
  }

  /**
   * parse media parameters (for example 'min-width: 500px')
   * @param  {String} params parameter to parse
   * @return {}
   */
  function parseMediaParams(params) {
    if (!params) {
      return []
    }
    let parsed = parser$2(params);
    let prop;
    let value;

    parsed.walk(node => {
      if (node.type === 'word' && /min|max/g.test(node.value)) {
        prop = node.value;
      } else if (node.value.includes('px')) {
        value = parseInt(node.value.replace(/\D/g, ''));
      }
    });

    return [prop, value]
  }

  /**
   * Compare the selectors and decide if we
   * need to inherit gap from compared selector or not.
   * @type {String} selA
   * @type {String} selB
   * @return {Boolean}
   */
  function shouldInheritGap(selA, selB) {
    let result;

    // get arrays of selector split in 3-deep array
    let splitSelectorArrA = splitSelector(selA);
    let splitSelectorArrB = splitSelector(selB);

    if (splitSelectorArrA[0].length < splitSelectorArrB[0].length) {
      // abort if selectorA has lower descendant specificity then selectorB
      // (e.g '.grid' and '.hello .world .grid')
      return false
    } else if (splitSelectorArrA[0].length > splitSelectorArrB[0].length) {
      // if selectorA has higher descendant specificity then selectorB
      // (e.g '.foo .bar .grid' and '.grid')

      let idx = splitSelectorArrA[0].reduce((res, [item], index) => {
        let firstSelectorPart = splitSelectorArrB[0][0][0];
        if (item === firstSelectorPart) {
          return index
        }
        return false
      }, false);

      if (idx) {
        result = splitSelectorArrB[0].every((arr, index) => {
          return arr.every(
            (part, innerIndex) =>
              // because selectorA has more space elements, we need to slice
              // selectorA array by 'idx' number to compare them
              splitSelectorArrA[0].slice(idx)[index][innerIndex] === part
          )
        });
      }
    } else {
      // if selectorA has the same descendant specificity as selectorB
      // this condition covers cases such as: '.grid.foo.bar' and '.grid'
      result = splitSelectorArrB.some(byCommaArr => {
        return byCommaArr.every((bySpaceArr, index) => {
          return bySpaceArr.every(
            (part, innerIndex) => splitSelectorArrA[0][index][innerIndex] === part
          )
        })
      });
    }

    return result
  }
  /**
   * inherit grid gap values from the closest rule above
   * with the same selector
   * @param  {Declaration} decl
   * @param  {Object} gap gap values
   * @return {Object | Boolean} return gap values or false (if not found)
   */
  gridUtils.inheritGridGap = inheritGridGap$3;

  function inheritGridGap$3(decl, gap) {
    let rule = decl.parent;
    let mediaRule = getParentMedia(rule);
    let root = rule.root();

    // get an array of selector split in 3-deep array
    let splitSelectorArr = splitSelector(rule.selector);

    // abort if the rule already has gaps
    if (Object.keys(gap).length > 0) {
      return false
    }

    // e.g ['min-width']
    let [prop] = parseMediaParams(mediaRule.params);

    let lastBySpace = splitSelectorArr[0];

    // get escaped value from the selector
    // if we have '.grid-2.foo.bar' selector, will be '\.grid\-2'
    let escaped = escapeRegexp(lastBySpace[lastBySpace.length - 1][0]);

    let regexp = new RegExp(`(${escaped}$)|(${escaped}[,.])`);

    // find the closest rule with the same selector
    let closestRuleGap;
    root.walkRules(regexp, r => {
      let gridGap;

      // abort if are checking the same rule
      if (rule.toString() === r.toString()) {
        return false
      }

      // find grid-gap values
      r.walkDecls('grid-gap', d => (gridGap = getGridGap$3(d)));

      // skip rule without gaps
      if (!gridGap || Object.keys(gridGap).length === 0) {
        return true
      }

      // skip rules that should not be inherited from
      if (!shouldInheritGap(rule.selector, r.selector)) {
        return true
      }

      let media = getParentMedia(r);
      if (media) {
        // if we are inside media, we need to check that media props match
        // e.g ('min-width' === 'min-width')
        let propToCompare = parseMediaParams(media.params)[0];
        if (propToCompare === prop) {
          closestRuleGap = gridGap;
          return true
        }
      } else {
        closestRuleGap = gridGap;
        return true
      }

      return undefined
    });

    // if we find the closest gap object
    if (closestRuleGap && Object.keys(closestRuleGap).length > 0) {
      return closestRuleGap
    }
    return false
  }

  gridUtils.warnGridGap = warnGridGap$2;

  function warnGridGap$2({ decl, gap, hasColumns, result }) {
    let hasBothGaps = gap.row && gap.column;
    if (!hasColumns && (hasBothGaps || (gap.column && !gap.row))) {
      delete gap.column;
      decl.warn(
        result,
        'Can not implement grid-gap without grid-template-columns'
      );
    }
  }

  /**
   * normalize the grid-template-rows/columns values
   * @param  {String} str grid-template-rows/columns value
   * @return {Array} normalized array with values
   * @example
   * let normalized = normalizeRowColumn('1fr repeat(2, 20px 50px) 1fr')
   * normalized // <= ['1fr', '20px', '50px', '20px', '50px', '1fr']
   */
  function normalizeRowColumn(str) {
    let normalized = parser$2(str).nodes.reduce((result, node) => {
      if (node.type === 'function' && node.value === 'repeat') {
        let key = 'count';

        let [count, value] = node.nodes.reduce(
          (acc, n) => {
            if (n.type === 'word' && key === 'count') {
              acc[0] = Math.abs(parseInt(n.value));
              return acc
            }
            if (n.type === 'div' && n.value === ',') {
              key = 'value';
              return acc
            }
            if (key === 'value') {
              acc[1] += parser$2.stringify(n);
            }
            return acc
          },
          [0, '']
        );

        if (count) {
          for (let i = 0; i < count; i++) {
            result.push(value);
          }
        }

        return result
      }
      if (node.type === 'space') {
        return result
      }
      return result.concat(parser$2.stringify(node))
    }, []);

    return normalized
  }

  gridUtils.autoplaceGridItems = autoplaceGridItems$1;

  /**
   * Autoplace grid items
   * @param {Declaration} decl
   * @param {Result} result
   * @param {Object} gap gap values
   * @param {String} autoflowValue grid-auto-flow value
   * @return {void}
   * @see https://github.com/postcss/autoprefixer/issues/1148
   */
  function autoplaceGridItems$1(decl, result, gap, autoflowValue = 'row') {
    let { parent } = decl;

    let rowDecl = parent.nodes.find(i => i.prop === 'grid-template-rows');
    let rows = normalizeRowColumn(rowDecl.value);
    let columns = normalizeRowColumn(decl.value);

    // Build array of area names with dummy values. If we have 3 columns and
    // 2 rows, filledRows will be equal to ['1 2 3', '4 5 6']
    let filledRows = rows.map((_, rowIndex) => {
      return Array.from(
        { length: columns.length },
        (v, k) => k + rowIndex * columns.length + 1
      ).join(' ')
    });

    let areas = parseGridAreas$1({ gap, rows: filledRows });
    let keys = Object.keys(areas);
    let items = keys.map(i => areas[i]);

    // Change the order of cells if grid-auto-flow value is 'column'
    if (autoflowValue.includes('column')) {
      items = items.sort((a, b) => a.column.start - b.column.start);
    }

    // Insert new rules
    items.reverse().forEach((item, index) => {
      let { column, row } = item;
      let nodeSelector = parent.selectors
        .map(sel => sel + ` > *:nth-child(${keys.length - index})`)
        .join(', ');

      // create new rule
      let node = parent.clone().removeAll();

      // change rule selector
      node.selector = nodeSelector;

      // insert prefixed row/column values
      node.append({ prop: '-ms-grid-row', value: row.start });
      node.append({ prop: '-ms-grid-column', value: column.start });

      // insert rule
      parent.after(node);
    });

    return undefined
  }

  let Declaration$o = declaration;
  let utils$5 = gridUtils;

  class GridArea extends Declaration$o {
    /**
     * Translate grid-area to separate -ms- prefixed properties
     */
    insert(decl, prefix, prefixes, result) {
      if (prefix !== '-ms-') return super.insert(decl, prefix, prefixes)

      let values = utils$5.parse(decl);

      let [rowStart, rowSpan] = utils$5.translate(values, 0, 2);
      let [columnStart, columnSpan] = utils$5.translate(values, 1, 3)

      ;[
        ['grid-row', rowStart],
        ['grid-row-span', rowSpan],
        ['grid-column', columnStart],
        ['grid-column-span', columnSpan]
      ].forEach(([prop, value]) => {
        utils$5.insertDecl(decl, prop, value);
      });

      utils$5.warnTemplateSelectorNotFound(decl, result);
      utils$5.warnIfGridRowColumnExists(decl, result);

      return undefined
    }
  }

  GridArea.names = ['grid-area'];

  var gridArea = GridArea;

  let Declaration$n = declaration;

  class GridColumnAlign extends Declaration$n {
    /**
     * Do not prefix flexbox values
     */
    check(decl) {
      return !decl.value.includes('flex-') && decl.value !== 'baseline'
    }

    /**
     * Change IE property back
     */
    normalize() {
      return 'justify-self'
    }

    /**
     * Change property name for IE
     */
    prefixed(prop, prefix) {
      return prefix + 'grid-column-align'
    }
  }

  GridColumnAlign.names = ['grid-column-align'];

  var gridColumnAlign = GridColumnAlign;

  let Declaration$m = declaration;
  let { isPureNumber } = utils$i;

  class GridEnd extends Declaration$m {
    /**
     * Change repeating syntax for IE
     */
    insert(decl, prefix, prefixes, result) {
      if (prefix !== '-ms-') return super.insert(decl, prefix, prefixes)

      let clonedDecl = this.clone(decl);

      let startProp = decl.prop.replace(/end$/, 'start');
      let spanProp = prefix + decl.prop.replace(/end$/, 'span');

      if (decl.parent.some(i => i.prop === spanProp)) {
        return undefined
      }

      clonedDecl.prop = spanProp;

      if (decl.value.includes('span')) {
        clonedDecl.value = decl.value.replace(/span\s/i, '');
      } else {
        let startDecl;
        decl.parent.walkDecls(startProp, d => {
          startDecl = d;
        });
        if (startDecl) {
          if (isPureNumber(startDecl.value)) {
            let value = Number(decl.value) - Number(startDecl.value) + '';
            clonedDecl.value = value;
          } else {
            return undefined
          }
        } else {
          decl.warn(
            result,
            `Can not prefix ${decl.prop} (${startProp} is not found)`
          );
        }
      }

      decl.cloneBefore(clonedDecl);

      return undefined
    }
  }

  GridEnd.names = ['grid-row-end', 'grid-column-end'];

  var gridEnd = GridEnd;

  let Declaration$l = declaration;

  class GridRowAlign extends Declaration$l {
    /**
     * Do not prefix flexbox values
     */
    check(decl) {
      return !decl.value.includes('flex-') && decl.value !== 'baseline'
    }

    /**
     * Change IE property back
     */
    normalize() {
      return 'align-self'
    }

    /**
     * Change property name for IE
     */
    prefixed(prop, prefix) {
      return prefix + 'grid-row-align'
    }
  }

  GridRowAlign.names = ['grid-row-align'];

  var gridRowAlign = GridRowAlign;

  let Declaration$k = declaration;
  let utils$4 = gridUtils;

  class GridRowColumn extends Declaration$k {
    /**
     * Translate grid-row / grid-column to separate -ms- prefixed properties
     */
    insert(decl, prefix, prefixes) {
      if (prefix !== '-ms-') return super.insert(decl, prefix, prefixes)

      let values = utils$4.parse(decl);
      let [start, span] = utils$4.translate(values, 0, 1);

      let hasStartValueSpan = values[0] && values[0].includes('span');

      if (hasStartValueSpan) {
        span = values[0].join('').replace(/\D/g, '');
      }
  [
        [decl.prop, start],
        [`${decl.prop}-span`, span]
      ].forEach(([prop, value]) => {
        utils$4.insertDecl(decl, prop, value);
      });

      return undefined
    }
  }

  GridRowColumn.names = ['grid-row', 'grid-column'];

  var gridRowColumn = GridRowColumn;

  let parser$1 = lib;

  let Value$5 = value;
  let insertAreas = gridUtils.insertAreas;

  const OLD_LINEAR = /(^|[^-])linear-gradient\(\s*(top|left|right|bottom)/i;
  const OLD_RADIAL = /(^|[^-])radial-gradient\(\s*\d+(\w*|%)\s+\d+(\w*|%)\s*,/i;
  const IGNORE_NEXT = /(!\s*)?autoprefixer:\s*ignore\s+next/i;
  const GRID_REGEX = /(!\s*)?autoprefixer\s*grid:\s*(on|off|(no-)?autoplace)/i;

  const SIZES = [
    'width',
    'height',
    'min-width',
    'max-width',
    'min-height',
    'max-height',
    'inline-size',
    'min-inline-size',
    'max-inline-size',
    'block-size',
    'min-block-size',
    'max-block-size'
  ];

  function hasGridTemplate(decl) {
    return decl.parent.some(
      i => i.prop === 'grid-template' || i.prop === 'grid-template-areas'
    )
  }

  function hasRowsAndColumns(decl) {
    let hasRows = decl.parent.some(i => i.prop === 'grid-template-rows');
    let hasColumns = decl.parent.some(i => i.prop === 'grid-template-columns');
    return hasRows && hasColumns
  }

  let Processor$2 = class Processor {
    constructor(prefixes) {
      this.prefixes = prefixes;
    }

    /**
     * Add necessary prefixes
     */
    add(css, result) {
      // At-rules
      let resolution = this.prefixes.add['@resolution'];
      let keyframes = this.prefixes.add['@keyframes'];
      let viewport = this.prefixes.add['@viewport'];
      let supports = this.prefixes.add['@supports'];

      css.walkAtRules(rule => {
        if (rule.name === 'keyframes') {
          if (!this.disabled(rule, result)) {
            return keyframes && keyframes.process(rule)
          }
        } else if (rule.name === 'viewport') {
          if (!this.disabled(rule, result)) {
            return viewport && viewport.process(rule)
          }
        } else if (rule.name === 'supports') {
          if (
            this.prefixes.options.supports !== false &&
            !this.disabled(rule, result)
          ) {
            return supports.process(rule)
          }
        } else if (rule.name === 'media' && rule.params.includes('-resolution')) {
          if (!this.disabled(rule, result)) {
            return resolution && resolution.process(rule)
          }
        }

        return undefined
      });

      // Selectors
      css.walkRules(rule => {
        if (this.disabled(rule, result)) return undefined

        return this.prefixes.add.selectors.map(selector => {
          return selector.process(rule, result)
        })
      });

      function insideGrid(decl) {
        return decl.parent.nodes.some(node => {
          if (node.type !== 'decl') return false
          let displayGrid =
            node.prop === 'display' && /(inline-)?grid/.test(node.value);
          let gridTemplate = node.prop.startsWith('grid-template');
          let gridGap = /^grid-([A-z]+-)?gap/.test(node.prop);
          return displayGrid || gridTemplate || gridGap
        })
      }

      let gridPrefixes =
        this.gridStatus(css, result) &&
        this.prefixes.add['grid-area'] &&
        this.prefixes.add['grid-area'].prefixes;

      css.walkDecls(decl => {
        if (this.disabledDecl(decl, result)) return undefined

        let parent = decl.parent;
        let prop = decl.prop;
        let value = decl.value;

        if (prop === 'color-adjust') {
          if (parent.every(i => i.prop !== 'print-color-adjust')) {
            result.warn(
              'Replace color-adjust to print-color-adjust. ' +
                'The color-adjust shorthand is currently deprecated.',
              { node: decl }
            );
          }
        } else if (prop === 'grid-row-span') {
          result.warn(
            'grid-row-span is not part of final Grid Layout. Use grid-row.',
            { node: decl }
          );
          return undefined
        } else if (prop === 'grid-column-span') {
          result.warn(
            'grid-column-span is not part of final Grid Layout. Use grid-column.',
            { node: decl }
          );
          return undefined
        } else if (prop === 'display' && value === 'box') {
          result.warn(
            'You should write display: flex by final spec ' +
              'instead of display: box',
            { node: decl }
          );
          return undefined
        } else if (prop === 'text-emphasis-position') {
          if (value === 'under' || value === 'over') {
            result.warn(
              'You should use 2 values for text-emphasis-position ' +
                'For example, `under left` instead of just `under`.',
              { node: decl }
            );
          }
        } else if (prop === 'text-decoration-skip' && value === 'ink') {
          result.warn(
            'Replace text-decoration-skip: ink to ' +
              'text-decoration-skip-ink: auto, because spec had been changed',
            { node: decl }
          );
        } else {
          if (gridPrefixes && this.gridStatus(decl, result)) {
            if (decl.value === 'subgrid') {
              result.warn('IE does not support subgrid', { node: decl });
            }
            if (/^(align|justify|place)-items$/.test(prop) && insideGrid(decl)) {
              let fixed = prop.replace('-items', '-self');
              result.warn(
                `IE does not support ${prop} on grid containers. ` +
                  `Try using ${fixed} on child elements instead: ` +
                  `${decl.parent.selector} > * { ${fixed}: ${decl.value} }`,
                { node: decl }
              );
            } else if (
              /^(align|justify|place)-content$/.test(prop) &&
              insideGrid(decl)
            ) {
              result.warn(`IE does not support ${decl.prop} on grid containers`, {
                node: decl
              });
            } else if (prop === 'display' && decl.value === 'contents') {
              result.warn(
                'Please do not use display: contents; ' +
                  'if you have grid setting enabled',
                { node: decl }
              );
              return undefined
            } else if (decl.prop === 'grid-gap') {
              let status = this.gridStatus(decl, result);
              if (
                status === 'autoplace' &&
                !hasRowsAndColumns(decl) &&
                !hasGridTemplate(decl)
              ) {
                result.warn(
                  'grid-gap only works if grid-template(-areas) is being ' +
                    'used or both rows and columns have been declared ' +
                    'and cells have not been manually ' +
                    'placed inside the explicit grid',
                  { node: decl }
                );
              } else if (
                (status === true || status === 'no-autoplace') &&
                !hasGridTemplate(decl)
              ) {
                result.warn(
                  'grid-gap only works if grid-template(-areas) is being used',
                  { node: decl }
                );
              }
            } else if (prop === 'grid-auto-columns') {
              result.warn('grid-auto-columns is not supported by IE', {
                node: decl
              });
              return undefined
            } else if (prop === 'grid-auto-rows') {
              result.warn('grid-auto-rows is not supported by IE', { node: decl });
              return undefined
            } else if (prop === 'grid-auto-flow') {
              let hasRows = parent.some(i => i.prop === 'grid-template-rows');
              let hasCols = parent.some(i => i.prop === 'grid-template-columns');

              if (hasGridTemplate(decl)) {
                result.warn('grid-auto-flow is not supported by IE', {
                  node: decl
                });
              } else if (value.includes('dense')) {
                result.warn('grid-auto-flow: dense is not supported by IE', {
                  node: decl
                });
              } else if (!hasRows && !hasCols) {
                result.warn(
                  'grid-auto-flow works only if grid-template-rows and ' +
                    'grid-template-columns are present in the same rule',
                  { node: decl }
                );
              }
              return undefined
            } else if (value.includes('auto-fit')) {
              result.warn('auto-fit value is not supported by IE', {
                node: decl,
                word: 'auto-fit'
              });
              return undefined
            } else if (value.includes('auto-fill')) {
              result.warn('auto-fill value is not supported by IE', {
                node: decl,
                word: 'auto-fill'
              });
              return undefined
            } else if (prop.startsWith('grid-template') && value.includes('[')) {
              result.warn(
                'Autoprefixer currently does not support line names. ' +
                  'Try using grid-template-areas instead.',
                { node: decl, word: '[' }
              );
            }
          }
          if (value.includes('radial-gradient')) {
            if (OLD_RADIAL.test(decl.value)) {
              result.warn(
                'Gradient has outdated direction syntax. ' +
                  'New syntax is like `closest-side at 0 0` ' +
                  'instead of `0 0, closest-side`.',
                { node: decl }
              );
            } else {
              let ast = parser$1(value);

              for (let i of ast.nodes) {
                if (i.type === 'function' && i.value === 'radial-gradient') {
                  for (let word of i.nodes) {
                    if (word.type === 'word') {
                      if (word.value === 'cover') {
                        result.warn(
                          'Gradient has outdated direction syntax. ' +
                            'Replace `cover` to `farthest-corner`.',
                          { node: decl }
                        );
                      } else if (word.value === 'contain') {
                        result.warn(
                          'Gradient has outdated direction syntax. ' +
                            'Replace `contain` to `closest-side`.',
                          { node: decl }
                        );
                      }
                    }
                  }
                }
              }
            }
          }
          if (value.includes('linear-gradient')) {
            if (OLD_LINEAR.test(value)) {
              result.warn(
                'Gradient has outdated direction syntax. ' +
                  'New syntax is like `to left` instead of `right`.',
                { node: decl }
              );
            }
          }
        }

        if (SIZES.includes(decl.prop)) {
          if (!decl.value.includes('-fill-available')) {
            if (decl.value.includes('fill-available')) {
              result.warn(
                'Replace fill-available to stretch, ' +
                  'because spec had been changed',
                { node: decl }
              );
            } else if (decl.value.includes('fill')) {
              let ast = parser$1(value);
              if (ast.nodes.some(i => i.type === 'word' && i.value === 'fill')) {
                result.warn(
                  'Replace fill to stretch, because spec had been changed',
                  { node: decl }
                );
              }
            }
          }
        }

        let prefixer;

        if (decl.prop === 'transition' || decl.prop === 'transition-property') {
          // Transition
          return this.prefixes.transition.add(decl, result)
        } else if (decl.prop === 'align-self') {
          // align-self flexbox or grid
          let display = this.displayType(decl);
          if (display !== 'grid' && this.prefixes.options.flexbox !== false) {
            prefixer = this.prefixes.add['align-self'];
            if (prefixer && prefixer.prefixes) {
              prefixer.process(decl);
            }
          }
          if (this.gridStatus(decl, result) !== false) {
            prefixer = this.prefixes.add['grid-row-align'];
            if (prefixer && prefixer.prefixes) {
              return prefixer.process(decl, result)
            }
          }
        } else if (decl.prop === 'justify-self') {
          // justify-self flexbox or grid
          if (this.gridStatus(decl, result) !== false) {
            prefixer = this.prefixes.add['grid-column-align'];
            if (prefixer && prefixer.prefixes) {
              return prefixer.process(decl, result)
            }
          }
        } else if (decl.prop === 'place-self') {
          prefixer = this.prefixes.add['place-self'];
          if (
            prefixer &&
            prefixer.prefixes &&
            this.gridStatus(decl, result) !== false
          ) {
            return prefixer.process(decl, result)
          }
        } else {
          // Properties
          prefixer = this.prefixes.add[decl.prop];
          if (prefixer && prefixer.prefixes) {
            return prefixer.process(decl, result)
          }
        }

        return undefined
      });

      // Insert grid-area prefixes. We need to be able to store the different
      // rules as a data and hack API is not enough for this
      if (this.gridStatus(css, result)) {
        insertAreas(css, this.disabled);
      }

      // Values
      return css.walkDecls(decl => {
        if (this.disabledValue(decl, result)) return

        let unprefixed = this.prefixes.unprefixed(decl.prop);
        let list = this.prefixes.values('add', unprefixed);
        if (Array.isArray(list)) {
          for (let value of list) {
            if (value.process) value.process(decl, result);
          }
        }
        Value$5.save(this.prefixes, decl);
      })
    }

    /**
     * Check for control comment and global options
     */
    disabled(node, result) {
      if (!node) return false

      if (node._autoprefixerDisabled !== undefined) {
        return node._autoprefixerDisabled
      }

      if (node.parent) {
        let p = node.prev();
        if (p && p.type === 'comment' && IGNORE_NEXT.test(p.text)) {
          node._autoprefixerDisabled = true;
          node._autoprefixerSelfDisabled = true;
          return true
        }
      }

      let value = null;
      if (node.nodes) {
        let status;
        node.each(i => {
          if (i.type !== 'comment') return
          if (/(!\s*)?autoprefixer:\s*(off|on)/i.test(i.text)) {
            if (typeof status !== 'undefined') {
              result.warn(
                'Second Autoprefixer control comment ' +
                  'was ignored. Autoprefixer applies control ' +
                  'comment to whole block, not to next rules.',
                { node: i }
              );
            } else {
              status = /on/i.test(i.text);
            }
          }
        });

        if (status !== undefined) {
          value = !status;
        }
      }
      if (!node.nodes || value === null) {
        if (node.parent) {
          let isParentDisabled = this.disabled(node.parent, result);
          if (node.parent._autoprefixerSelfDisabled === true) {
            value = false;
          } else {
            value = isParentDisabled;
          }
        } else {
          value = false;
        }
      }
      node._autoprefixerDisabled = value;
      return value
    }

    /**
     * Check for grid/flexbox options.
     */
    disabledDecl(node, result) {
      if (node.type === 'decl' && this.gridStatus(node, result) === false) {
        if (node.prop.includes('grid') || node.prop === 'justify-items') {
          return true
        }
      }
      if (node.type === 'decl' && this.prefixes.options.flexbox === false) {
        let other = ['order', 'justify-content', 'align-items', 'align-content'];
        if (node.prop.includes('flex') || other.includes(node.prop)) {
          return true
        }
      }

      return this.disabled(node, result)
    }

    /**
     * Check for grid/flexbox options.
     */
    disabledValue(node, result) {
      if (this.gridStatus(node, result) === false && node.type === 'decl') {
        if (node.prop === 'display' && node.value.includes('grid')) {
          return true
        }
      }
      if (this.prefixes.options.flexbox === false && node.type === 'decl') {
        if (node.prop === 'display' && node.value.includes('flex')) {
          return true
        }
      }
      if (node.type === 'decl' && node.prop === 'content') {
        return true
      }

      return this.disabled(node, result)
    }

    /**
     * Is it flebox or grid rule
     */
    displayType(decl) {
      for (let i of decl.parent.nodes) {
        if (i.prop !== 'display') {
          continue
        }

        if (i.value.includes('flex')) {
          return 'flex'
        }

        if (i.value.includes('grid')) {
          return 'grid'
        }
      }

      return false
    }

    /**
     * Set grid option via control comment
     */
    gridStatus(node, result) {
      if (!node) return false

      if (node._autoprefixerGridStatus !== undefined) {
        return node._autoprefixerGridStatus
      }

      let value = null;
      if (node.nodes) {
        let status;
        node.each(i => {
          if (i.type !== 'comment') return
          if (GRID_REGEX.test(i.text)) {
            let hasAutoplace = /:\s*autoplace/i.test(i.text);
            let noAutoplace = /no-autoplace/i.test(i.text);
            if (typeof status !== 'undefined') {
              result.warn(
                'Second Autoprefixer grid control comment was ' +
                  'ignored. Autoprefixer applies control comments to the whole ' +
                  'block, not to the next rules.',
                { node: i }
              );
            } else if (hasAutoplace) {
              status = 'autoplace';
            } else if (noAutoplace) {
              status = true;
            } else {
              status = /on/i.test(i.text);
            }
          }
        });

        if (status !== undefined) {
          value = status;
        }
      }

      if (node.type === 'atrule' && node.name === 'supports') {
        let params = node.params;
        if (params.includes('grid') && params.includes('auto')) {
          value = false;
        }
      }

      if (!node.nodes || value === null) {
        if (node.parent) {
          let isParentGrid = this.gridStatus(node.parent, result);
          if (node.parent._autoprefixerSelfDisabled === true) {
            value = false;
          } else {
            value = isParentGrid;
          }
        } else if (typeof this.prefixes.options.grid !== 'undefined') {
          value = this.prefixes.options.grid;
        } else if (typeof process.env.AUTOPREFIXER_GRID !== 'undefined') {
          if (process.env.AUTOPREFIXER_GRID === 'autoplace') {
            value = 'autoplace';
          } else {
            value = true;
          }
        } else {
          value = false;
        }
      }

      node._autoprefixerGridStatus = value;
      return value
    }

    /**
     * Normalize spaces in cascade declaration group
     */
    reduceSpaces(decl) {
      let stop = false;
      this.prefixes.group(decl).up(() => {
        stop = true;
        return true
      });
      if (stop) {
        return
      }

      let parts = decl.raw('before').split('\n');
      let prevMin = parts[parts.length - 1].length;
      let diff = false;

      this.prefixes.group(decl).down(other => {
        parts = other.raw('before').split('\n');
        let last = parts.length - 1;

        if (parts[last].length > prevMin) {
          if (diff === false) {
            diff = parts[last].length - prevMin;
          }

          parts[last] = parts[last].slice(0, -diff);
          other.raws.before = parts.join('\n');
        }
      });
    }

    /**
     * Remove unnecessary pefixes
     */
    remove(css, result) {
      // At-rules
      let resolution = this.prefixes.remove['@resolution'];

      css.walkAtRules((rule, i) => {
        if (this.prefixes.remove[`@${rule.name}`]) {
          if (!this.disabled(rule, result)) {
            rule.parent.removeChild(i);
          }
        } else if (
          rule.name === 'media' &&
          rule.params.includes('-resolution') &&
          resolution
        ) {
          resolution.clean(rule);
        }
      });

      // Selectors
      css.walkRules((rule, i) => {
        if (this.disabled(rule, result)) return

        for (let checker of this.prefixes.remove.selectors) {
          if (checker.check(rule)) {
            rule.parent.removeChild(i);
            return
          }
        }
      });

      return css.walkDecls((decl, i) => {
        if (this.disabled(decl, result)) return

        let rule = decl.parent;
        let unprefixed = this.prefixes.unprefixed(decl.prop);

        // Transition
        if (decl.prop === 'transition' || decl.prop === 'transition-property') {
          this.prefixes.transition.remove(decl);
        }

        // Properties
        if (
          this.prefixes.remove[decl.prop] &&
          this.prefixes.remove[decl.prop].remove
        ) {
          let notHack = this.prefixes.group(decl).down(other => {
            return this.prefixes.normalize(other.prop) === unprefixed
          });

          if (unprefixed === 'flex-flow') {
            notHack = true;
          }

          if (decl.prop === '-webkit-box-orient') {
            let hacks = { 'flex-direction': true, 'flex-flow': true };
            if (!decl.parent.some(j => hacks[j.prop])) return
          }

          if (notHack && !this.withHackValue(decl)) {
            if (decl.raw('before').includes('\n')) {
              this.reduceSpaces(decl);
            }
            rule.removeChild(i);
            return
          }
        }

        // Values
        for (let checker of this.prefixes.values('remove', unprefixed)) {
          if (!checker.check) continue
          if (!checker.check(decl.value)) continue

          unprefixed = checker.unprefixed;
          let notHack = this.prefixes.group(decl).down(other => {
            return other.value.includes(unprefixed)
          });

          if (notHack) {
            rule.removeChild(i);
            return
          }
        }
      })
    }

    /**
     * Some rare old values, which is not in standard
     */
    withHackValue(decl) {
      return (
        (decl.prop === '-webkit-background-clip' && decl.value === 'text') ||
        // Do not remove -webkit-box-orient when -webkit-line-clamp is present.
        // https://github.com/postcss/autoprefixer/issues/1510
        (decl.prop === '-webkit-box-orient' &&
          decl.parent.some(d => d.prop === '-webkit-line-clamp'))
      )
    }
  };

  var processor = Processor$2;

  let Declaration$j = declaration;
  let Processor$1 = processor;
  let {
    autoplaceGridItems,
    getGridGap: getGridGap$2,
    inheritGridGap: inheritGridGap$2,
    prefixTrackProp: prefixTrackProp$1,
    prefixTrackValue: prefixTrackValue$1
  } = gridUtils;

  class GridRowsColumns extends Declaration$j {
    insert(decl, prefix, prefixes, result) {
      if (prefix !== '-ms-') return super.insert(decl, prefix, prefixes)

      let { parent, prop, value } = decl;
      let isRowProp = prop.includes('rows');
      let isColumnProp = prop.includes('columns');

      let hasGridTemplate = parent.some(
        i => i.prop === 'grid-template' || i.prop === 'grid-template-areas'
      );

      /**
       * Not to prefix rows declaration if grid-template(-areas) is present
       */
      if (hasGridTemplate && isRowProp) {
        return false
      }

      let processor = new Processor$1({ options: {} });
      let status = processor.gridStatus(parent, result);
      let gap = getGridGap$2(decl);
      gap = inheritGridGap$2(decl, gap) || gap;

      let gapValue = isRowProp ? gap.row : gap.column;

      if ((status === 'no-autoplace' || status === true) && !hasGridTemplate) {
        gapValue = null;
      }

      let prefixValue = prefixTrackValue$1({
        gap: gapValue,
        value
      });

      /**
       * Insert prefixes
       */
      decl.cloneBefore({
        prop: prefixTrackProp$1({ prefix, prop }),
        value: prefixValue
      });

      let autoflow = parent.nodes.find(i => i.prop === 'grid-auto-flow');
      let autoflowValue = 'row';

      if (autoflow && !processor.disabled(autoflow, result)) {
        autoflowValue = autoflow.value.trim();
      }
      if (status === 'autoplace') {
        /**
         * Show warning if grid-template-rows decl is not found
         */
        let rowDecl = parent.nodes.find(i => i.prop === 'grid-template-rows');

        if (!rowDecl && hasGridTemplate) {
          return undefined
        } else if (!rowDecl && !hasGridTemplate) {
          decl.warn(
            result,
            'Autoplacement does not work without grid-template-rows property'
          );
          return undefined
        }

        /**
         * Show warning if grid-template-columns decl is not found
         */
        let columnDecl = parent.nodes.find(i => {
          return i.prop === 'grid-template-columns'
        });
        if (!columnDecl && !hasGridTemplate) {
          decl.warn(
            result,
            'Autoplacement does not work without grid-template-columns property'
          );
        }

        /**
         * Autoplace grid items
         */
        if (isColumnProp && !hasGridTemplate) {
          autoplaceGridItems(decl, result, gap, autoflowValue);
        }
      }

      return undefined
    }

    /**
     * Change IE property back
     */
    normalize(prop) {
      return prop.replace(/^grid-(rows|columns)/, 'grid-template-$1')
    }

    /**
     * Change property name for IE
     */
    prefixed(prop, prefix) {
      if (prefix === '-ms-') {
        return prefixTrackProp$1({ prefix, prop })
      }
      return super.prefixed(prop, prefix)
    }
  }

  GridRowsColumns.names = [
    'grid-template-rows',
    'grid-template-columns',
    'grid-rows',
    'grid-columns'
  ];

  var gridRowsColumns = GridRowsColumns;

  let Declaration$i = declaration;

  class GridStart extends Declaration$i {
    /**
     * Do not add prefix for unsupported value in IE
     */
    check(decl) {
      let value = decl.value;
      return !value.includes('/') && !value.includes('span')
    }

    /**
     * Return a final spec property
     */
    normalize(prop) {
      return prop.replace('-start', '')
    }

    /**
     * Change property name for IE
     */
    prefixed(prop, prefix) {
      let result = super.prefixed(prop, prefix);
      if (prefix === '-ms-') {
        result = result.replace('-start', '');
      }
      return result
    }
  }

  GridStart.names = ['grid-row-start', 'grid-column-start'];

  var gridStart = GridStart;

  let Declaration$h = declaration;
  let {
    getGridGap: getGridGap$1,
    inheritGridGap: inheritGridGap$1,
    parseTemplate,
    warnGridGap: warnGridGap$1,
    warnMissedAreas: warnMissedAreas$1
  } = gridUtils;

  class GridTemplate extends Declaration$h {
    /**
     * Translate grid-template to separate -ms- prefixed properties
     */
    insert(decl, prefix, prefixes, result) {
      if (prefix !== '-ms-') return super.insert(decl, prefix, prefixes)

      if (decl.parent.some(i => i.prop === '-ms-grid-rows')) {
        return undefined
      }

      let gap = getGridGap$1(decl);

      /**
       * we must insert inherited gap values in some cases:
       * if we are inside media query && if we have no grid-gap value
       */
      let inheritedGap = inheritGridGap$1(decl, gap);

      let { areas, columns, rows } = parseTemplate({
        decl,
        gap: inheritedGap || gap
      });

      let hasAreas = Object.keys(areas).length > 0;
      let hasRows = Boolean(rows);
      let hasColumns = Boolean(columns);

      warnGridGap$1({
        decl,
        gap,
        hasColumns,
        result
      });

      warnMissedAreas$1(areas, decl, result);

      if ((hasRows && hasColumns) || hasAreas) {
        decl.cloneBefore({
          prop: '-ms-grid-rows',
          raws: {},
          value: rows
        });
      }

      if (hasColumns) {
        decl.cloneBefore({
          prop: '-ms-grid-columns',
          raws: {},
          value: columns
        });
      }

      return decl
    }
  }

  GridTemplate.names = ['grid-template'];

  var gridTemplate = GridTemplate;

  let Declaration$g = declaration;
  let {
    getGridGap,
    inheritGridGap,
    parseGridAreas,
    prefixTrackProp,
    prefixTrackValue,
    warnGridGap,
    warnMissedAreas
  } = gridUtils;

  function getGridRows(tpl) {
    return tpl
      .trim()
      .slice(1, -1)
      .split(/["']\s*["']?/g)
  }

  class GridTemplateAreas extends Declaration$g {
    /**
     * Translate grid-template-areas to separate -ms- prefixed properties
     */
    insert(decl, prefix, prefixes, result) {
      if (prefix !== '-ms-') return super.insert(decl, prefix, prefixes)

      let hasColumns = false;
      let hasRows = false;
      let parent = decl.parent;
      let gap = getGridGap(decl);
      gap = inheritGridGap(decl, gap) || gap;

      // remove already prefixed rows
      // to prevent doubling prefixes
      parent.walkDecls(/-ms-grid-rows/, i => i.remove());

      // add empty tracks to rows
      parent.walkDecls(/grid-template-(rows|columns)/, trackDecl => {
        if (trackDecl.prop === 'grid-template-rows') {
          hasRows = true;
          let { prop, value } = trackDecl;
          trackDecl.cloneBefore({
            prop: prefixTrackProp({ prefix, prop }),
            value: prefixTrackValue({ gap: gap.row, value })
          });
        } else {
          hasColumns = true;
        }
      });

      let gridRows = getGridRows(decl.value);

      if (hasColumns && !hasRows && gap.row && gridRows.length > 1) {
        decl.cloneBefore({
          prop: '-ms-grid-rows',
          raws: {},
          value: prefixTrackValue({
            gap: gap.row,
            value: `repeat(${gridRows.length}, auto)`
          })
        });
      }

      // warnings
      warnGridGap({
        decl,
        gap,
        hasColumns,
        result
      });

      let areas = parseGridAreas({
        gap,
        rows: gridRows
      });

      warnMissedAreas(areas, decl, result);

      return decl
    }
  }

  GridTemplateAreas.names = ['grid-template-areas'];

  var gridTemplateAreas = GridTemplateAreas;

  let Declaration$f = declaration;

  class ImageRendering extends Declaration$f {
    /**
     * Add hack only for crisp-edges
     */
    check(decl) {
      return decl.value === 'pixelated'
    }

    /**
     * Return property name by spec
     */
    normalize() {
      return 'image-rendering'
    }

    /**
     * Change property name for IE
     */
    prefixed(prop, prefix) {
      if (prefix === '-ms-') {
        return '-ms-interpolation-mode'
      }
      return super.prefixed(prop, prefix)
    }

    /**
     * Warn on old value
     */
    process(node, result) {
      return super.process(node, result)
    }

    /**
     * Change property and value for IE
     */
    set(decl, prefix) {
      if (prefix !== '-ms-') return super.set(decl, prefix)
      decl.prop = '-ms-interpolation-mode';
      decl.value = 'nearest-neighbor';
      return decl
    }
  }

  ImageRendering.names = ['image-rendering', 'interpolation-mode'];

  var imageRendering = ImageRendering;

  let Value$4 = value;

  class ImageSet extends Value$4 {
    /**
     * Use non-standard name for WebKit and Firefox
     */
    replace(string, prefix) {
      let fixed = super.replace(string, prefix);
      if (prefix === '-webkit-') {
        fixed = fixed.replace(/("[^"]+"|'[^']+')(\s+\d+\w)/gi, 'url($1)$2');
      }
      return fixed
    }
  }

  ImageSet.names = ['image-set'];

  var imageSet = ImageSet;

  let Declaration$e = declaration;

  class InlineLogical extends Declaration$e {
    /**
     * Return property name by spec
     */
    normalize(prop) {
      return prop.replace(/(margin|padding|border)-(start|end)/, '$1-inline-$2')
    }

    /**
     * Use old syntax for -moz- and -webkit-
     */
    prefixed(prop, prefix) {
      return prefix + prop.replace('-inline', '')
    }
  }

  InlineLogical.names = [
    'border-inline-start',
    'border-inline-end',
    'margin-inline-start',
    'margin-inline-end',
    'padding-inline-start',
    'padding-inline-end',
    'border-start',
    'border-end',
    'margin-start',
    'margin-end',
    'padding-start',
    'padding-end'
  ];

  var inlineLogical = InlineLogical;

  let OldValue$1 = oldValue;
  let Value$3 = value;

  function regexp(name) {
    return new RegExp(`(^|[\\s,(])(${name}($|[\\s),]))`, 'gi')
  }

  class Intrinsic extends Value$3 {
    add(decl, prefix) {
      if (decl.prop.includes('grid') && prefix !== '-webkit-') {
        return undefined
      }
      return super.add(decl, prefix)
    }

    isStretch() {
      return (
        this.name === 'stretch' ||
        this.name === 'fill' ||
        this.name === 'fill-available'
      )
    }

    old(prefix) {
      let prefixed = prefix + this.name;
      if (this.isStretch()) {
        if (prefix === '-moz-') {
          prefixed = '-moz-available';
        } else if (prefix === '-webkit-') {
          prefixed = '-webkit-fill-available';
        }
      }
      return new OldValue$1(this.name, prefixed, prefixed, regexp(prefixed))
    }

    regexp() {
      if (!this.regexpCache) this.regexpCache = regexp(this.name);
      return this.regexpCache
    }

    replace(string, prefix) {
      if (prefix === '-moz-' && this.isStretch()) {
        return string.replace(this.regexp(), '$1-moz-available$3')
      }
      if (prefix === '-webkit-' && this.isStretch()) {
        return string.replace(this.regexp(), '$1-webkit-fill-available$3')
      }
      return super.replace(string, prefix)
    }
  }

  Intrinsic.names = [
    'max-content',
    'min-content',
    'fit-content',
    'fill',
    'fill-available',
    'stretch'
  ];

  var intrinsic = Intrinsic;

  let Declaration$d = declaration;
  let flexSpec$1 = flexSpec$d;

  class JustifyContent extends Declaration$d {
    /**
     * Return property name by final spec
     */
    normalize() {
      return 'justify-content'
    }

    /**
     * Change property name for 2009 and 2012 specs
     */
    prefixed(prop, prefix) {
      let spec
      ;[spec, prefix] = flexSpec$1(prefix);
      if (spec === 2009) {
        return prefix + 'box-pack'
      }
      if (spec === 2012) {
        return prefix + 'flex-pack'
      }
      return super.prefixed(prop, prefix)
    }

    /**
     * Change value for 2009 and 2012 specs
     */
    set(decl, prefix) {
      let spec = flexSpec$1(prefix)[0];
      if (spec === 2009 || spec === 2012) {
        let value = JustifyContent.oldValues[decl.value] || decl.value;
        decl.value = value;
        if (spec !== 2009 || value !== 'distribute') {
          return super.set(decl, prefix)
        }
      } else if (spec === 'final') {
        return super.set(decl, prefix)
      }
      return undefined
    }
  }

  JustifyContent.names = ['justify-content', 'flex-pack', 'box-pack'];

  JustifyContent.oldValues = {
    'flex-end': 'end',
    'flex-start': 'start',
    'space-around': 'distribute',
    'space-between': 'justify'
  };

  var justifyContent = JustifyContent;

  let Declaration$c = declaration;

  class MaskBorder extends Declaration$c {
    /**
     * Return property name by final spec
     */
    normalize() {
      return this.name.replace('box-image', 'border')
    }

    /**
     * Return flex property for 2012 spec
     */
    prefixed(prop, prefix) {
      let result = super.prefixed(prop, prefix);
      if (prefix === '-webkit-') {
        result = result.replace('border', 'box-image');
      }
      return result
    }
  }

  MaskBorder.names = [
    'mask-border',
    'mask-border-source',
    'mask-border-slice',
    'mask-border-width',
    'mask-border-outset',
    'mask-border-repeat',
    'mask-box-image',
    'mask-box-image-source',
    'mask-box-image-slice',
    'mask-box-image-width',
    'mask-box-image-outset',
    'mask-box-image-repeat'
  ];

  var maskBorder = MaskBorder;

  let Declaration$b = declaration;

  class MaskComposite extends Declaration$b {
    /**
     * Prefix mask-composite for webkit
     */
    insert(decl, prefix, prefixes) {
      let isCompositeProp = decl.prop === 'mask-composite';

      let compositeValues;

      if (isCompositeProp) {
        compositeValues = decl.value.split(',');
      } else {
        compositeValues = decl.value.match(MaskComposite.regexp) || [];
      }

      compositeValues = compositeValues.map(el => el.trim()).filter(el => el);
      let hasCompositeValues = compositeValues.length;

      let compositeDecl;

      if (hasCompositeValues) {
        compositeDecl = this.clone(decl);
        compositeDecl.value = compositeValues
          .map(value => MaskComposite.oldValues[value] || value)
          .join(', ');

        if (compositeValues.includes('intersect')) {
          compositeDecl.value += ', xor';
        }

        compositeDecl.prop = prefix + 'mask-composite';
      }

      if (isCompositeProp) {
        if (!hasCompositeValues) {
          return undefined
        }

        if (this.needCascade(decl)) {
          compositeDecl.raws.before = this.calcBefore(prefixes, decl, prefix);
        }

        return decl.parent.insertBefore(decl, compositeDecl)
      }

      let cloned = this.clone(decl);
      cloned.prop = prefix + cloned.prop;

      if (hasCompositeValues) {
        cloned.value = cloned.value.replace(MaskComposite.regexp, '');
      }

      if (this.needCascade(decl)) {
        cloned.raws.before = this.calcBefore(prefixes, decl, prefix);
      }

      decl.parent.insertBefore(decl, cloned);

      if (!hasCompositeValues) {
        return decl
      }

      if (this.needCascade(decl)) {
        compositeDecl.raws.before = this.calcBefore(prefixes, decl, prefix);
      }
      return decl.parent.insertBefore(decl, compositeDecl)
    }
  }

  MaskComposite.names = ['mask', 'mask-composite'];

  MaskComposite.oldValues = {
    add: 'source-over',
    exclude: 'xor',
    intersect: 'source-in',
    subtract: 'source-out'
  };

  MaskComposite.regexp = new RegExp(
    `\\s+(${Object.keys(MaskComposite.oldValues).join(
    '|'
  )})\\b(?!\\))\\s*(?=[,])`,
    'ig'
  );

  var maskComposite = MaskComposite;

  let Declaration$a = declaration;
  let flexSpec = flexSpec$d;

  class Order extends Declaration$a {
    /**
     * Return property name by final spec
     */
    normalize() {
      return 'order'
    }

    /**
     * Change property name for 2009 and 2012 specs
     */
    prefixed(prop, prefix) {
      let spec
      ;[spec, prefix] = flexSpec(prefix);
      if (spec === 2009) {
        return prefix + 'box-ordinal-group'
      }
      if (spec === 2012) {
        return prefix + 'flex-order'
      }
      return super.prefixed(prop, prefix)
    }

    /**
     * Fix value for 2009 spec
     */
    set(decl, prefix) {
      let spec = flexSpec(prefix)[0];
      if (spec === 2009 && /\d/.test(decl.value)) {
        decl.value = (parseInt(decl.value) + 1).toString();
        return super.set(decl, prefix)
      }
      return super.set(decl, prefix)
    }
  }

  Order.names = ['order', 'flex-order', 'box-ordinal-group'];

  var order = Order;

  let Declaration$9 = declaration;

  class OverscrollBehavior extends Declaration$9 {
    /**
     * Return property name by spec
     */
    normalize() {
      return 'overscroll-behavior'
    }

    /**
     * Change property name for IE
     */
    prefixed(prop, prefix) {
      return prefix + 'scroll-chaining'
    }

    /**
     * Change value for IE
     */
    set(decl, prefix) {
      if (decl.value === 'auto') {
        decl.value = 'chained';
      } else if (decl.value === 'none' || decl.value === 'contain') {
        decl.value = 'none';
      }
      return super.set(decl, prefix)
    }
  }

  OverscrollBehavior.names = ['overscroll-behavior', 'scroll-chaining'];

  var overscrollBehavior = OverscrollBehavior;

  let OldValue = oldValue;
  let Value$2 = value;

  class Pixelated extends Value$2 {
    /**
     * Different name for WebKit and Firefox
     */
    old(prefix) {
      if (prefix === '-webkit-') {
        return new OldValue(this.name, '-webkit-optimize-contrast')
      }
      if (prefix === '-moz-') {
        return new OldValue(this.name, '-moz-crisp-edges')
      }
      return super.old(prefix)
    }

    /**
     * Use non-standard name for WebKit and Firefox
     */
    replace(string, prefix) {
      if (prefix === '-webkit-') {
        return string.replace(this.regexp(), '$1-webkit-optimize-contrast')
      }
      if (prefix === '-moz-') {
        return string.replace(this.regexp(), '$1-moz-crisp-edges')
      }
      return super.replace(string, prefix)
    }
  }

  Pixelated.names = ['pixelated'];

  var pixelated = Pixelated;

  let Declaration$8 = declaration;
  let utils$3 = gridUtils;

  class PlaceSelf extends Declaration$8 {
    /**
     * Translate place-self to separate -ms- prefixed properties
     */
    insert(decl, prefix, prefixes) {
      if (prefix !== '-ms-') return super.insert(decl, prefix, prefixes)

      // prevent doubling of prefixes
      if (decl.parent.some(i => i.prop === '-ms-grid-row-align')) {
        return undefined
      }

      let [[first, second]] = utils$3.parse(decl);

      if (second) {
        utils$3.insertDecl(decl, 'grid-row-align', first);
        utils$3.insertDecl(decl, 'grid-column-align', second);
      } else {
        utils$3.insertDecl(decl, 'grid-row-align', first);
        utils$3.insertDecl(decl, 'grid-column-align', first);
      }

      return undefined
    }
  }

  PlaceSelf.names = ['place-self'];

  var placeSelf = PlaceSelf;

  let Selector$2 = selector;

  class Placeholder extends Selector$2 {
    /**
     * Add old mozilla to possible prefixes
     */
    possible() {
      return super.possible().concat(['-moz- old', '-ms- old'])
    }

    /**
     * Return different selectors depend on prefix
     */
    prefixed(prefix) {
      if (prefix === '-webkit-') {
        return '::-webkit-input-placeholder'
      }
      if (prefix === '-ms-') {
        return '::-ms-input-placeholder'
      }
      if (prefix === '-ms- old') {
        return ':-ms-input-placeholder'
      }
      if (prefix === '-moz- old') {
        return ':-moz-placeholder'
      }
      return `::${prefix}placeholder`
    }
  }

  Placeholder.names = ['::placeholder'];

  var placeholder = Placeholder;

  let Selector$1 = selector;

  class PlaceholderShown extends Selector$1 {
    /**
     * Return different selectors depend on prefix
     */
    prefixed(prefix) {
      if (prefix === '-moz-') {
        return ':-moz-placeholder'
      } else if (prefix === '-ms-') {
        return ':-ms-input-placeholder'
      }
      return `:${prefix}placeholder-shown`
    }
  }

  PlaceholderShown.names = [':placeholder-shown'];

  var placeholderShown = PlaceholderShown;

  let Declaration$7 = declaration;

  class PrintColorAdjust extends Declaration$7 {
    /**
     * Return property name by spec
     */
    normalize() {
      return 'print-color-adjust'
    }

    /**
     * Change property name for WebKit-based browsers
     */
    prefixed(prop, prefix) {
      if (prefix === '-moz-') {
        return 'color-adjust'
      } else {
        return prefix + 'print-color-adjust'
      }
    }
  }

  PrintColorAdjust.names = ['print-color-adjust', 'color-adjust'];

  var printColorAdjust = PrintColorAdjust;

  let Declaration$6 = declaration;

  const BASIC = [
    'none',
    'underline',
    'overline',
    'line-through',
    'blink',
    'inherit',
    'initial',
    'unset'
  ];

  class TextDecoration extends Declaration$6 {
    /**
     * Do not add prefixes for basic values.
     */
    check(decl) {
      return decl.value.split(/\s+/).some(i => !BASIC.includes(i))
    }
  }

  TextDecoration.names = ['text-decoration'];

  var textDecoration = TextDecoration;

  let Declaration$5 = declaration;

  class TextDecorationSkipInk extends Declaration$5 {
    /**
     * Change prefix for ink value
     */
    set(decl, prefix) {
      if (decl.prop === 'text-decoration-skip-ink' && decl.value === 'auto') {
        decl.prop = prefix + 'text-decoration-skip';
        decl.value = 'ink';
        return decl
      } else {
        return super.set(decl, prefix)
      }
    }
  }

  TextDecorationSkipInk.names = [
    'text-decoration-skip-ink',
    'text-decoration-skip'
  ];

  var textDecorationSkipInk = TextDecorationSkipInk;

  let Declaration$4 = declaration;

  class TextEmphasisPosition extends Declaration$4 {
    set(decl, prefix) {
      if (prefix === '-webkit-') {
        decl.value = decl.value.replace(/\s*(right|left)\s*/i, '');
      }
      return super.set(decl, prefix)
    }
  }

  TextEmphasisPosition.names = ['text-emphasis-position'];

  var textEmphasisPosition = TextEmphasisPosition;

  let Declaration$3 = declaration;

  class TransformDecl extends Declaration$3 {
    /**
     * Is transform contain 3D commands
     */
    contain3d(decl) {
      if (decl.prop === 'transform-origin') {
        return false
      }

      for (let func of TransformDecl.functions3d) {
        if (decl.value.includes(`${func}(`)) {
          return true
        }
      }

      return false
    }

    /**
     * Don't add prefix for IE in keyframes
     */
    insert(decl, prefix, prefixes) {
      if (prefix === '-ms-') {
        if (!this.contain3d(decl) && !this.keyframeParents(decl)) {
          return super.insert(decl, prefix, prefixes)
        }
      } else if (prefix === '-o-') {
        if (!this.contain3d(decl)) {
          return super.insert(decl, prefix, prefixes)
        }
      } else {
        return super.insert(decl, prefix, prefixes)
      }
      return undefined
    }

    /**
     * Recursively check all parents for @keyframes
     */
    keyframeParents(decl) {
      let { parent } = decl;
      while (parent) {
        if (parent.type === 'atrule' && parent.name === 'keyframes') {
          return true
        }
  ({ parent } = parent);
      }
      return false
    }

    /**
     * Replace rotateZ to rotate for IE 9
     */
    set(decl, prefix) {
      decl = super.set(decl, prefix);
      if (prefix === '-ms-') {
        decl.value = decl.value.replace(/rotatez/gi, 'rotate');
      }
      return decl
    }
  }

  TransformDecl.names = ['transform', 'transform-origin'];

  TransformDecl.functions3d = [
    'matrix3d',
    'translate3d',
    'translateZ',
    'scale3d',
    'scaleZ',
    'rotate3d',
    'rotateX',
    'rotateY',
    'perspective'
  ];

  var transformDecl = TransformDecl;

  let Declaration$2 = declaration;

  class UserSelect extends Declaration$2 {
    /**
     * Avoid prefixing all in IE
     */
    insert(decl, prefix, prefixes) {
      if (decl.value === 'all' && prefix === '-ms-') {
        return undefined
      } else if (
        decl.value === 'contain' &&
        (prefix === '-moz-' || prefix === '-webkit-')
      ) {
        return undefined
      } else {
        return super.insert(decl, prefix, prefixes)
      }
    }

    /**
     * Change prefixed value for IE
     */
    set(decl, prefix) {
      if (prefix === '-ms-' && decl.value === 'contain') {
        decl.value = 'element';
      }
      return super.set(decl, prefix)
    }
  }

  UserSelect.names = ['user-select'];

  var userSelect = UserSelect;

  let Declaration$1 = declaration;

  class WritingMode extends Declaration$1 {
    insert(decl, prefix, prefixes) {
      if (prefix === '-ms-') {
        let cloned = this.set(this.clone(decl), prefix);

        if (this.needCascade(decl)) {
          cloned.raws.before = this.calcBefore(prefixes, decl, prefix);
        }
        let direction = 'ltr';

        decl.parent.nodes.forEach(i => {
          if (i.prop === 'direction') {
            if (i.value === 'rtl' || i.value === 'ltr') direction = i.value;
          }
        });

        cloned.value = WritingMode.msValues[direction][decl.value] || decl.value;
        return decl.parent.insertBefore(decl, cloned)
      }

      return super.insert(decl, prefix, prefixes)
    }
  }

  WritingMode.names = ['writing-mode'];

  WritingMode.msValues = {
    ltr: {
      'horizontal-tb': 'lr-tb',
      'vertical-lr': 'tb-lr',
      'vertical-rl': 'tb-rl'
    },
    rtl: {
      'horizontal-tb': 'rl-tb',
      'vertical-lr': 'bt-lr',
      'vertical-rl': 'bt-rl'
    }
  };

  var writingMode = WritingMode;

  var fraction = {exports: {}};

  /**
   * @license Fraction.js v4.3.7 31/08/2023
   * https://www.xarg.org/2014/03/rational-numbers-in-javascript/
   *
   * Copyright (c) 2023, Robert Eisele (robert@raw.org)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   **/

  (function (module, exports) {
  	/**
  	 *
  	 * This class offers the possibility to calculate fractions.
  	 * You can pass a fraction in different formats. Either as array, as double, as string or as an integer.
  	 *
  	 * Array/Object form
  	 * [ 0 => <numerator>, 1 => <denominator> ]
  	 * [ n => <numerator>, d => <denominator> ]
  	 *
  	 * Integer form
  	 * - Single integer value
  	 *
  	 * Double form
  	 * - Single double value
  	 *
  	 * String form
  	 * 123.456 - a simple double
  	 * 123/456 - a string fraction
  	 * 123.'456' - a double with repeating decimal places
  	 * 123.(456) - synonym
  	 * 123.45'6' - a double with repeating last place
  	 * 123.45(6) - synonym
  	 *
  	 * Example:
  	 *
  	 * var f = new Fraction("9.4'31'");
  	 * f.mul([-4, 3]).div(4.9);
  	 *
  	 */

  	(function(root) {

  	  // Maximum search depth for cyclic rational numbers. 2000 should be more than enough.
  	  // Example: 1/7 = 0.(142857) has 6 repeating decimal places.
  	  // If MAX_CYCLE_LEN gets reduced, long cycles will not be detected and toString() only gets the first 10 digits
  	  var MAX_CYCLE_LEN = 2000;

  	  // Parsed data to avoid calling "new" all the time
  	  var P = {
  	    "s": 1,
  	    "n": 0,
  	    "d": 1
  	  };

  	  function assign(n, s) {

  	    if (isNaN(n = parseInt(n, 10))) {
  	      throw InvalidParameter();
  	    }
  	    return n * s;
  	  }

  	  // Creates a new Fraction internally without the need of the bulky constructor
  	  function newFraction(n, d) {

  	    if (d === 0) {
  	      throw DivisionByZero();
  	    }

  	    var f = Object.create(Fraction.prototype);
  	    f["s"] = n < 0 ? -1 : 1;

  	    n = n < 0 ? -n : n;

  	    var a = gcd(n, d);

  	    f["n"] = n / a;
  	    f["d"] = d / a;
  	    return f;
  	  }

  	  function factorize(num) {

  	    var factors = {};

  	    var n = num;
  	    var i = 2;
  	    var s = 4;

  	    while (s <= n) {

  	      while (n % i === 0) {
  	        n/= i;
  	        factors[i] = (factors[i] || 0) + 1;
  	      }
  	      s+= 1 + 2 * i++;
  	    }

  	    if (n !== num) {
  	      if (n > 1)
  	        factors[n] = (factors[n] || 0) + 1;
  	    } else {
  	      factors[num] = (factors[num] || 0) + 1;
  	    }
  	    return factors;
  	  }

  	  var parse = function(p1, p2) {

  	    var n = 0, d = 1, s = 1;
  	    var v = 0, w = 0, x = 0, y = 1, z = 1;

  	    var A = 0, B = 1;
  	    var C = 1, D = 1;

  	    var N = 10000000;
  	    var M;

  	    if (p1 === undefined || p1 === null) ; else if (p2 !== undefined) {
  	      n = p1;
  	      d = p2;
  	      s = n * d;

  	      if (n % 1 !== 0 || d % 1 !== 0) {
  	        throw NonIntegerParameter();
  	      }

  	    } else
  	      switch (typeof p1) {

  	        case "object":
  	          {
  	            if ("d" in p1 && "n" in p1) {
  	              n = p1["n"];
  	              d = p1["d"];
  	              if ("s" in p1)
  	                n*= p1["s"];
  	            } else if (0 in p1) {
  	              n = p1[0];
  	              if (1 in p1)
  	                d = p1[1];
  	            } else {
  	              throw InvalidParameter();
  	            }
  	            s = n * d;
  	            break;
  	          }
  	        case "number":
  	          {
  	            if (p1 < 0) {
  	              s = p1;
  	              p1 = -p1;
  	            }

  	            if (p1 % 1 === 0) {
  	              n = p1;
  	            } else if (p1 > 0) { // check for != 0, scale would become NaN (log(0)), which converges really slow

  	              if (p1 >= 1) {
  	                z = Math.pow(10, Math.floor(1 + Math.log(p1) / Math.LN10));
  	                p1/= z;
  	              }

  	              // Using Farey Sequences
  	              // http://www.johndcook.com/blog/2010/10/20/best-rational-approximation/

  	              while (B <= N && D <= N) {
  	                M = (A + C) / (B + D);

  	                if (p1 === M) {
  	                  if (B + D <= N) {
  	                    n = A + C;
  	                    d = B + D;
  	                  } else if (D > B) {
  	                    n = C;
  	                    d = D;
  	                  } else {
  	                    n = A;
  	                    d = B;
  	                  }
  	                  break;

  	                } else {

  	                  if (p1 > M) {
  	                    A+= C;
  	                    B+= D;
  	                  } else {
  	                    C+= A;
  	                    D+= B;
  	                  }

  	                  if (B > N) {
  	                    n = C;
  	                    d = D;
  	                  } else {
  	                    n = A;
  	                    d = B;
  	                  }
  	                }
  	              }
  	              n*= z;
  	            } else if (isNaN(p1) || isNaN(p2)) {
  	              d = n = NaN;
  	            }
  	            break;
  	          }
  	        case "string":
  	          {
  	            B = p1.match(/\d+|./g);

  	            if (B === null)
  	              throw InvalidParameter();

  	            if (B[A] === '-') {// Check for minus sign at the beginning
  	              s = -1;
  	              A++;
  	            } else if (B[A] === '+') {// Check for plus sign at the beginning
  	              A++;
  	            }

  	            if (B.length === A + 1) { // Check if it's just a simple number "1234"
  	              w = assign(B[A++], s);
  	            } else if (B[A + 1] === '.' || B[A] === '.') { // Check if it's a decimal number

  	              if (B[A] !== '.') { // Handle 0.5 and .5
  	                v = assign(B[A++], s);
  	              }
  	              A++;

  	              // Check for decimal places
  	              if (A + 1 === B.length || B[A + 1] === '(' && B[A + 3] === ')' || B[A + 1] === "'" && B[A + 3] === "'") {
  	                w = assign(B[A], s);
  	                y = Math.pow(10, B[A].length);
  	                A++;
  	              }

  	              // Check for repeating places
  	              if (B[A] === '(' && B[A + 2] === ')' || B[A] === "'" && B[A + 2] === "'") {
  	                x = assign(B[A + 1], s);
  	                z = Math.pow(10, B[A + 1].length) - 1;
  	                A+= 3;
  	              }

  	            } else if (B[A + 1] === '/' || B[A + 1] === ':') { // Check for a simple fraction "123/456" or "123:456"
  	              w = assign(B[A], s);
  	              y = assign(B[A + 2], 1);
  	              A+= 3;
  	            } else if (B[A + 3] === '/' && B[A + 1] === ' ') { // Check for a complex fraction "123 1/2"
  	              v = assign(B[A], s);
  	              w = assign(B[A + 2], s);
  	              y = assign(B[A + 4], 1);
  	              A+= 5;
  	            }

  	            if (B.length <= A) { // Check for more tokens on the stack
  	              d = y * z;
  	              s = /* void */
  	              n = x + d * v + z * w;
  	              break;
  	            }

  	            /* Fall through on error */
  	          }
  	        default:
  	          throw InvalidParameter();
  	      }

  	    if (d === 0) {
  	      throw DivisionByZero();
  	    }

  	    P["s"] = s < 0 ? -1 : 1;
  	    P["n"] = Math.abs(n);
  	    P["d"] = Math.abs(d);
  	  };

  	  function modpow(b, e, m) {

  	    var r = 1;
  	    for (; e > 0; b = (b * b) % m, e >>= 1) {

  	      if (e & 1) {
  	        r = (r * b) % m;
  	      }
  	    }
  	    return r;
  	  }


  	  function cycleLen(n, d) {

  	    for (; d % 2 === 0;
  	      d/= 2) {
  	    }

  	    for (; d % 5 === 0;
  	      d/= 5) {
  	    }

  	    if (d === 1) // Catch non-cyclic numbers
  	      return 0;

  	    // If we would like to compute really large numbers quicker, we could make use of Fermat's little theorem:
  	    // 10^(d-1) % d == 1
  	    // However, we don't need such large numbers and MAX_CYCLE_LEN should be the capstone,
  	    // as we want to translate the numbers to strings.

  	    var rem = 10 % d;
  	    var t = 1;

  	    for (; rem !== 1; t++) {
  	      rem = rem * 10 % d;

  	      if (t > MAX_CYCLE_LEN)
  	        return 0; // Returning 0 here means that we don't print it as a cyclic number. It's likely that the answer is `d-1`
  	    }
  	    return t;
  	  }


  	  function cycleStart(n, d, len) {

  	    var rem1 = 1;
  	    var rem2 = modpow(10, len, d);

  	    for (var t = 0; t < 300; t++) { // s < ~log10(Number.MAX_VALUE)
  	      // Solve 10^s == 10^(s+t) (mod d)

  	      if (rem1 === rem2)
  	        return t;

  	      rem1 = rem1 * 10 % d;
  	      rem2 = rem2 * 10 % d;
  	    }
  	    return 0;
  	  }

  	  function gcd(a, b) {

  	    if (!a)
  	      return b;
  	    if (!b)
  	      return a;

  	    while (1) {
  	      a%= b;
  	      if (!a)
  	        return b;
  	      b%= a;
  	      if (!b)
  	        return a;
  	    }
  	  }
  	  /**
  	   * Module constructor
  	   *
  	   * @constructor
  	   * @param {number|Fraction=} a
  	   * @param {number=} b
  	   */
  	  function Fraction(a, b) {

  	    parse(a, b);

  	    if (this instanceof Fraction) {
  	      a = gcd(P["d"], P["n"]); // Abuse variable a
  	      this["s"] = P["s"];
  	      this["n"] = P["n"] / a;
  	      this["d"] = P["d"] / a;
  	    } else {
  	      return newFraction(P['s'] * P['n'], P['d']);
  	    }
  	  }

  	  var DivisionByZero = function() { return new Error("Division by Zero"); };
  	  var InvalidParameter = function() { return new Error("Invalid argument"); };
  	  var NonIntegerParameter = function() { return new Error("Parameters must be integer"); };

  	  Fraction.prototype = {

  	    "s": 1,
  	    "n": 0,
  	    "d": 1,

  	    /**
  	     * Calculates the absolute value
  	     *
  	     * Ex: new Fraction(-4).abs() => 4
  	     **/
  	    "abs": function() {

  	      return newFraction(this["n"], this["d"]);
  	    },

  	    /**
  	     * Inverts the sign of the current fraction
  	     *
  	     * Ex: new Fraction(-4).neg() => 4
  	     **/
  	    "neg": function() {

  	      return newFraction(-this["s"] * this["n"], this["d"]);
  	    },

  	    /**
  	     * Adds two rational numbers
  	     *
  	     * Ex: new Fraction({n: 2, d: 3}).add("14.9") => 467 / 30
  	     **/
  	    "add": function(a, b) {

  	      parse(a, b);
  	      return newFraction(
  	        this["s"] * this["n"] * P["d"] + P["s"] * this["d"] * P["n"],
  	        this["d"] * P["d"]
  	      );
  	    },

  	    /**
  	     * Subtracts two rational numbers
  	     *
  	     * Ex: new Fraction({n: 2, d: 3}).add("14.9") => -427 / 30
  	     **/
  	    "sub": function(a, b) {

  	      parse(a, b);
  	      return newFraction(
  	        this["s"] * this["n"] * P["d"] - P["s"] * this["d"] * P["n"],
  	        this["d"] * P["d"]
  	      );
  	    },

  	    /**
  	     * Multiplies two rational numbers
  	     *
  	     * Ex: new Fraction("-17.(345)").mul(3) => 5776 / 111
  	     **/
  	    "mul": function(a, b) {

  	      parse(a, b);
  	      return newFraction(
  	        this["s"] * P["s"] * this["n"] * P["n"],
  	        this["d"] * P["d"]
  	      );
  	    },

  	    /**
  	     * Divides two rational numbers
  	     *
  	     * Ex: new Fraction("-17.(345)").inverse().div(3)
  	     **/
  	    "div": function(a, b) {

  	      parse(a, b);
  	      return newFraction(
  	        this["s"] * P["s"] * this["n"] * P["d"],
  	        this["d"] * P["n"]
  	      );
  	    },

  	    /**
  	     * Clones the actual object
  	     *
  	     * Ex: new Fraction("-17.(345)").clone()
  	     **/
  	    "clone": function() {
  	      return newFraction(this['s'] * this['n'], this['d']);
  	    },

  	    /**
  	     * Calculates the modulo of two rational numbers - a more precise fmod
  	     *
  	     * Ex: new Fraction('4.(3)').mod([7, 8]) => (13/3) % (7/8) = (5/6)
  	     **/
  	    "mod": function(a, b) {

  	      if (isNaN(this['n']) || isNaN(this['d'])) {
  	        return new Fraction(NaN);
  	      }

  	      if (a === undefined) {
  	        return newFraction(this["s"] * this["n"] % this["d"], 1);
  	      }

  	      parse(a, b);
  	      if (0 === P["n"] && 0 === this["d"]) {
  	        throw DivisionByZero();
  	      }

  	      /*
  	       * First silly attempt, kinda slow
  	       *
  	       return that["sub"]({
  	       "n": num["n"] * Math.floor((this.n / this.d) / (num.n / num.d)),
  	       "d": num["d"],
  	       "s": this["s"]
  	       });*/

  	      /*
  	       * New attempt: a1 / b1 = a2 / b2 * q + r
  	       * => b2 * a1 = a2 * b1 * q + b1 * b2 * r
  	       * => (b2 * a1 % a2 * b1) / (b1 * b2)
  	       */
  	      return newFraction(
  	        this["s"] * (P["d"] * this["n"]) % (P["n"] * this["d"]),
  	        P["d"] * this["d"]
  	      );
  	    },

  	    /**
  	     * Calculates the fractional gcd of two rational numbers
  	     *
  	     * Ex: new Fraction(5,8).gcd(3,7) => 1/56
  	     */
  	    "gcd": function(a, b) {

  	      parse(a, b);

  	      // gcd(a / b, c / d) = gcd(a, c) / lcm(b, d)

  	      return newFraction(gcd(P["n"], this["n"]) * gcd(P["d"], this["d"]), P["d"] * this["d"]);
  	    },

  	    /**
  	     * Calculates the fractional lcm of two rational numbers
  	     *
  	     * Ex: new Fraction(5,8).lcm(3,7) => 15
  	     */
  	    "lcm": function(a, b) {

  	      parse(a, b);

  	      // lcm(a / b, c / d) = lcm(a, c) / gcd(b, d)

  	      if (P["n"] === 0 && this["n"] === 0) {
  	        return newFraction(0, 1);
  	      }
  	      return newFraction(P["n"] * this["n"], gcd(P["n"], this["n"]) * gcd(P["d"], this["d"]));
  	    },

  	    /**
  	     * Calculates the ceil of a rational number
  	     *
  	     * Ex: new Fraction('4.(3)').ceil() => (5 / 1)
  	     **/
  	    "ceil": function(places) {

  	      places = Math.pow(10, places || 0);

  	      if (isNaN(this["n"]) || isNaN(this["d"])) {
  	        return new Fraction(NaN);
  	      }
  	      return newFraction(Math.ceil(places * this["s"] * this["n"] / this["d"]), places);
  	    },

  	    /**
  	     * Calculates the floor of a rational number
  	     *
  	     * Ex: new Fraction('4.(3)').floor() => (4 / 1)
  	     **/
  	    "floor": function(places) {

  	      places = Math.pow(10, places || 0);

  	      if (isNaN(this["n"]) || isNaN(this["d"])) {
  	        return new Fraction(NaN);
  	      }
  	      return newFraction(Math.floor(places * this["s"] * this["n"] / this["d"]), places);
  	    },

  	    /**
  	     * Rounds a rational numbers
  	     *
  	     * Ex: new Fraction('4.(3)').round() => (4 / 1)
  	     **/
  	    "round": function(places) {

  	      places = Math.pow(10, places || 0);

  	      if (isNaN(this["n"]) || isNaN(this["d"])) {
  	        return new Fraction(NaN);
  	      }
  	      return newFraction(Math.round(places * this["s"] * this["n"] / this["d"]), places);
  	    },

  	    /**
  	     * Rounds a rational number to a multiple of another rational number
  	     *
  	     * Ex: new Fraction('0.9').roundTo("1/8") => 7 / 8
  	     **/
  	    "roundTo": function(a, b) {

  	      /*
  	      k * x/y ≤ a/b < (k+1) * x/y
  	      ⇔ k ≤ a/b / (x/y) < (k+1)
  	      ⇔ k = floor(a/b * y/x)
  	      */

  	      parse(a, b);

  	      return newFraction(this['s'] * Math.round(this['n'] * P['d'] / (this['d'] * P['n'])) * P['n'], P['d']);
  	    },

  	    /**
  	     * Gets the inverse of the fraction, means numerator and denominator are exchanged
  	     *
  	     * Ex: new Fraction([-3, 4]).inverse() => -4 / 3
  	     **/
  	    "inverse": function() {

  	      return newFraction(this["s"] * this["d"], this["n"]);
  	    },

  	    /**
  	     * Calculates the fraction to some rational exponent, if possible
  	     *
  	     * Ex: new Fraction(-1,2).pow(-3) => -8
  	     */
  	    "pow": function(a, b) {

  	      parse(a, b);

  	      // Trivial case when exp is an integer

  	      if (P['d'] === 1) {

  	        if (P['s'] < 0) {
  	          return newFraction(Math.pow(this['s'] * this["d"], P['n']), Math.pow(this["n"], P['n']));
  	        } else {
  	          return newFraction(Math.pow(this['s'] * this["n"], P['n']), Math.pow(this["d"], P['n']));
  	        }
  	      }

  	      // Negative roots become complex
  	      //     (-a/b)^(c/d) = x
  	      // <=> (-1)^(c/d) * (a/b)^(c/d) = x
  	      // <=> (cos(pi) + i*sin(pi))^(c/d) * (a/b)^(c/d) = x         # rotate 1 by 180°
  	      // <=> (cos(c*pi/d) + i*sin(c*pi/d)) * (a/b)^(c/d) = x       # DeMoivre's formula in Q ( https://proofwiki.org/wiki/De_Moivre%27s_Formula/Rational_Index )
  	      // From which follows that only for c=0 the root is non-complex. c/d is a reduced fraction, so that sin(c/dpi)=0 occurs for d=1, which is handled by our trivial case.
  	      if (this['s'] < 0) return null;

  	      // Now prime factor n and d
  	      var N = factorize(this['n']);
  	      var D = factorize(this['d']);

  	      // Exponentiate and take root for n and d individually
  	      var n = 1;
  	      var d = 1;
  	      for (var k in N) {
  	        if (k === '1') continue;
  	        if (k === '0') {
  	          n = 0;
  	          break;
  	        }
  	        N[k]*= P['n'];

  	        if (N[k] % P['d'] === 0) {
  	          N[k]/= P['d'];
  	        } else return null;
  	        n*= Math.pow(k, N[k]);
  	      }

  	      for (var k in D) {
  	        if (k === '1') continue;
  	        D[k]*= P['n'];

  	        if (D[k] % P['d'] === 0) {
  	          D[k]/= P['d'];
  	        } else return null;
  	        d*= Math.pow(k, D[k]);
  	      }

  	      if (P['s'] < 0) {
  	        return newFraction(d, n);
  	      }
  	      return newFraction(n, d);
  	    },

  	    /**
  	     * Check if two rational numbers are the same
  	     *
  	     * Ex: new Fraction(19.6).equals([98, 5]);
  	     **/
  	    "equals": function(a, b) {

  	      parse(a, b);
  	      return this["s"] * this["n"] * P["d"] === P["s"] * P["n"] * this["d"]; // Same as compare() === 0
  	    },

  	    /**
  	     * Check if two rational numbers are the same
  	     *
  	     * Ex: new Fraction(19.6).equals([98, 5]);
  	     **/
  	    "compare": function(a, b) {

  	      parse(a, b);
  	      var t = (this["s"] * this["n"] * P["d"] - P["s"] * P["n"] * this["d"]);
  	      return (0 < t) - (t < 0);
  	    },

  	    "simplify": function(eps) {

  	      if (isNaN(this['n']) || isNaN(this['d'])) {
  	        return this;
  	      }

  	      eps = eps || 0.001;

  	      var thisABS = this['abs']();
  	      var cont = thisABS['toContinued']();

  	      for (var i = 1; i < cont.length; i++) {

  	        var s = newFraction(cont[i - 1], 1);
  	        for (var k = i - 2; k >= 0; k--) {
  	          s = s['inverse']()['add'](cont[k]);
  	        }

  	        if (Math.abs(s['sub'](thisABS).valueOf()) < eps) {
  	          return s['mul'](this['s']);
  	        }
  	      }
  	      return this;
  	    },

  	    /**
  	     * Check if two rational numbers are divisible
  	     *
  	     * Ex: new Fraction(19.6).divisible(1.5);
  	     */
  	    "divisible": function(a, b) {

  	      parse(a, b);
  	      return !(!(P["n"] * this["d"]) || ((this["n"] * P["d"]) % (P["n"] * this["d"])));
  	    },

  	    /**
  	     * Returns a decimal representation of the fraction
  	     *
  	     * Ex: new Fraction("100.'91823'").valueOf() => 100.91823918239183
  	     **/
  	    'valueOf': function() {

  	      return this["s"] * this["n"] / this["d"];
  	    },

  	    /**
  	     * Returns a string-fraction representation of a Fraction object
  	     *
  	     * Ex: new Fraction("1.'3'").toFraction(true) => "4 1/3"
  	     **/
  	    'toFraction': function(excludeWhole) {

  	      var whole, str = "";
  	      var n = this["n"];
  	      var d = this["d"];
  	      if (this["s"] < 0) {
  	        str+= '-';
  	      }

  	      if (d === 1) {
  	        str+= n;
  	      } else {

  	        if (excludeWhole && (whole = Math.floor(n / d)) > 0) {
  	          str+= whole;
  	          str+= " ";
  	          n%= d;
  	        }

  	        str+= n;
  	        str+= '/';
  	        str+= d;
  	      }
  	      return str;
  	    },

  	    /**
  	     * Returns a latex representation of a Fraction object
  	     *
  	     * Ex: new Fraction("1.'3'").toLatex() => "\frac{4}{3}"
  	     **/
  	    'toLatex': function(excludeWhole) {

  	      var whole, str = "";
  	      var n = this["n"];
  	      var d = this["d"];
  	      if (this["s"] < 0) {
  	        str+= '-';
  	      }

  	      if (d === 1) {
  	        str+= n;
  	      } else {

  	        if (excludeWhole && (whole = Math.floor(n / d)) > 0) {
  	          str+= whole;
  	          n%= d;
  	        }

  	        str+= "\\frac{";
  	        str+= n;
  	        str+= '}{';
  	        str+= d;
  	        str+= '}';
  	      }
  	      return str;
  	    },

  	    /**
  	     * Returns an array of continued fraction elements
  	     *
  	     * Ex: new Fraction("7/8").toContinued() => [0,1,7]
  	     */
  	    'toContinued': function() {

  	      var t;
  	      var a = this['n'];
  	      var b = this['d'];
  	      var res = [];

  	      if (isNaN(a) || isNaN(b)) {
  	        return res;
  	      }

  	      do {
  	        res.push(Math.floor(a / b));
  	        t = a % b;
  	        a = b;
  	        b = t;
  	      } while (a !== 1);

  	      return res;
  	    },

  	    /**
  	     * Creates a string representation of a fraction with all digits
  	     *
  	     * Ex: new Fraction("100.'91823'").toString() => "100.(91823)"
  	     **/
  	    'toString': function(dec) {

  	      var N = this["n"];
  	      var D = this["d"];

  	      if (isNaN(N) || isNaN(D)) {
  	        return "NaN";
  	      }

  	      dec = dec || 15; // 15 = decimal places when no repetation

  	      var cycLen = cycleLen(N, D); // Cycle length
  	      var cycOff = cycleStart(N, D, cycLen); // Cycle start

  	      var str = this['s'] < 0 ? "-" : "";

  	      str+= N / D | 0;

  	      N%= D;
  	      N*= 10;

  	      if (N)
  	        str+= ".";

  	      if (cycLen) {

  	        for (var i = cycOff; i--;) {
  	          str+= N / D | 0;
  	          N%= D;
  	          N*= 10;
  	        }
  	        str+= "(";
  	        for (var i = cycLen; i--;) {
  	          str+= N / D | 0;
  	          N%= D;
  	          N*= 10;
  	        }
  	        str+= ")";
  	      } else {
  	        for (var i = dec; N && i--;) {
  	          str+= N / D | 0;
  	          N%= D;
  	          N*= 10;
  	        }
  	      }
  	      return str;
  	    }
  	  };

  	  {
  	    Object.defineProperty(exports, "__esModule", { 'value': true });
  	    exports['default'] = Fraction;
  	    module['exports'] = Fraction;
  	  }

  	})();
  } (fraction, fraction.exports));

  let FractionJs = fraction.exports;

  let Prefixer = prefixer;
  let utils$2 = utils$i;

  const REGEXP = /(min|max)-resolution\s*:\s*\d*\.?\d+(dppx|dpcm|dpi|x)/gi;
  const SPLIT = /(min|max)-resolution(\s*:\s*)(\d*\.?\d+)(dppx|dpcm|dpi|x)/i;

  let Resolution$1 = class Resolution extends Prefixer {
    /**
     * Remove prefixed queries
     */
    clean(rule) {
      if (!this.bad) {
        this.bad = [];
        for (let prefix of this.prefixes) {
          this.bad.push(this.prefixName(prefix, 'min'));
          this.bad.push(this.prefixName(prefix, 'max'));
        }
      }

      rule.params = utils$2.editList(rule.params, queries => {
        return queries.filter(query => this.bad.every(i => !query.includes(i)))
      });
    }

    /**
     * Return prefixed query name
     */
    prefixName(prefix, name) {
      if (prefix === '-moz-') {
        return name + '--moz-device-pixel-ratio'
      } else {
        return prefix + name + '-device-pixel-ratio'
      }
    }

    /**
     * Return prefixed query
     */
    prefixQuery(prefix, name, colon, value, units) {
      value = new FractionJs(value);

      // 1dpcm = 2.54dpi
      // 1dppx = 96dpi
      if (units === 'dpi') {
        value = value.div(96);
      } else if (units === 'dpcm') {
        value = value.mul(2.54).div(96);
      }
      value = value.simplify();

      if (prefix === '-o-') {
        value = value.n + '/' + value.d;
      }
      return this.prefixName(prefix, name) + colon + value
    }

    /**
     * Add prefixed queries
     */
    process(rule) {
      let parent = this.parentPrefix(rule);
      let prefixes = parent ? [parent] : this.prefixes;

      rule.params = utils$2.editList(rule.params, (origin, prefixed) => {
        for (let query of origin) {
          if (
            !query.includes('min-resolution') &&
            !query.includes('max-resolution')
          ) {
            prefixed.push(query);
            continue
          }

          for (let prefix of prefixes) {
            let processed = query.replace(REGEXP, str => {
              let parts = str.match(SPLIT);
              return this.prefixQuery(
                prefix,
                parts[1],
                parts[2],
                parts[3],
                parts[4]
              )
            });
            prefixed.push(processed);
          }
          prefixed.push(query);
        }

        return utils$2.uniq(prefixed)
      });
    }
  };

  var resolution = Resolution$1;

  var cssFeaturequeries={A:{A:{"2":"K D E F A B kC"},B:{"1":"6 7 8 9 C L M G N O P Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I"},C:{"1":"0 1 2 3 4 5 6 7 8 9 QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC mC nC","2":"lC KC J OB K D E F A B C L M G N O P PB y z oC pC"},D:{"1":"6 7 8 9 QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB LC vB MC wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x AB BB CB DB EB FB GB HB IB JB KB LB MB NB I OC DC PC","2":"0 1 2 3 4 5 J OB K D E F A B C L M G N O P PB y z"},E:{"1":"F A B C L M G uC RC EC FC vC wC xC SC TC GC yC HC UC VC WC XC YC zC IC ZC aC bC cC dC 0C JC eC fC gC hC 1C","2":"J OB K D E qC QC rC sC tC"},F:{"1":"0 1 2 3 4 5 G N O P PB y z QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB pB qB rB sB tB uB vB wB xB yB zB 0B 1B 2B 3B 4B 5B 6B 7B 8B 9B AC BC CC Q H R NC S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x FC","2":"F B C 2C 3C 4C 5C EC iC 6C"},G:{"1":"CD DD ED FD GD HD ID JD KD LD MD ND OD PD QD SC TC GC RD HC UC VC WC XC YC SD IC ZC aC bC cC dC TD JC eC fC gC hC","2":"E QC 7C jC 8C 9C AD BD"},H:{"1":"UD"},I:{"1":"I ZD aD","2":"KC J VD WD XD YD jC"},J:{"2":"D A"},K:{"1":"H","2":"A B C EC iC FC"},L:{"1":"I"},M:{"1":"DC"},N:{"2":"A B"},O:{"1":"GC"},P:{"1":"0 1 2 3 4 5 J y z bD cD dD eD fD RC gD hD iD jD kD HC IC JC lD"},Q:{"1":"mD"},R:{"1":"nD"},S:{"1":"oD pD"}},B:4,C:"CSS Feature Queries",D:true};

  function last(array) {
    return array[array.length - 1]
  }

  let brackets$1 = {
    /**
     * Parse string to nodes tree
     */
    parse(str) {
      let current = [''];
      let stack = [current];

      for (let sym of str) {
        if (sym === '(') {
          current = [''];
          last(stack).push(current);
          stack.push(current);
          continue
        }

        if (sym === ')') {
          stack.pop();
          current = last(stack);
          current.push('');
          continue
        }

        current[current.length - 1] += sym;
      }

      return stack[0]
    },

    /**
     * Generate output string by nodes tree
     */
    stringify(ast) {
      let result = '';
      for (let i of ast) {
        if (typeof i === 'object') {
          result += `(${brackets$1.stringify(i)})`;
          continue
        }

        result += i;
      }
      return result
    }
  };

  var brackets_1 = brackets$1;

  let featureQueries = cssFeaturequeries;
  let feature = feature$1.exports;
  let { parse } = postcss_1;

  let brackets = brackets_1;
  let Browsers$3 = browsers$1;
  let utils$1 = utils$i;
  let Value$1 = value;

  let data = feature(featureQueries);

  let supported = [];
  for (let browser in data.stats) {
    let versions = data.stats[browser];
    for (let version in versions) {
      let support = versions[version];
      if (/y/.test(support)) {
        supported.push(browser + ' ' + version);
      }
    }
  }

  let Supports$1 = class Supports {
    constructor(Prefixes, all) {
      this.Prefixes = Prefixes;
      this.all = all;
    }

    /**
     * Add prefixes
     */
    add(nodes, all) {
      return nodes.map(i => {
        if (this.isProp(i)) {
          let prefixed = this.prefixed(i[0]);
          if (prefixed.length > 1) {
            return this.convert(prefixed)
          }

          return i
        }

        if (typeof i === 'object') {
          return this.add(i, all)
        }

        return i
      })
    }

    /**
     * Clean brackets with one child
     */
    cleanBrackets(nodes) {
      return nodes.map(i => {
        if (typeof i !== 'object') {
          return i
        }

        if (i.length === 1 && typeof i[0] === 'object') {
          return this.cleanBrackets(i[0])
        }

        return this.cleanBrackets(i)
      })
    }

    /**
     * Add " or " between properties and convert it to brackets format
     */
    convert(progress) {
      let result = [''];
      for (let i of progress) {
        result.push([`${i.prop}: ${i.value}`]);
        result.push(' or ');
      }
      result[result.length - 1] = '';
      return result
    }

    /**
     * Check global options
     */
    disabled(node) {
      if (!this.all.options.grid) {
        if (node.prop === 'display' && node.value.includes('grid')) {
          return true
        }
        if (node.prop.includes('grid') || node.prop === 'justify-items') {
          return true
        }
      }

      if (this.all.options.flexbox === false) {
        if (node.prop === 'display' && node.value.includes('flex')) {
          return true
        }
        let other = ['order', 'justify-content', 'align-items', 'align-content'];
        if (node.prop.includes('flex') || other.includes(node.prop)) {
          return true
        }
      }

      return false
    }

    /**
     * Return true if prefixed property has no unprefixed
     */
    isHack(all, unprefixed) {
      let check = new RegExp(`(\\(|\\s)${utils$1.escapeRegexp(unprefixed)}:`);
      return !check.test(all)
    }

    /**
     * Return true if brackets node is "not" word
     */
    isNot(node) {
      return typeof node === 'string' && /not\s*/i.test(node)
    }

    /**
     * Return true if brackets node is "or" word
     */
    isOr(node) {
      return typeof node === 'string' && /\s*or\s*/i.test(node)
    }

    /**
     * Return true if brackets node is (prop: value)
     */
    isProp(node) {
      return (
        typeof node === 'object' &&
        node.length === 1 &&
        typeof node[0] === 'string'
      )
    }

    /**
     * Compress value functions into a string nodes
     */
    normalize(nodes) {
      if (typeof nodes !== 'object') {
        return nodes
      }

      nodes = nodes.filter(i => i !== '');

      if (typeof nodes[0] === 'string') {
        let firstNode = nodes[0].trim();

        if (
          firstNode.includes(':') ||
          firstNode === 'selector' ||
          firstNode === 'not selector'
        ) {
          return [brackets.stringify(nodes)]
        }
      }
      return nodes.map(i => this.normalize(i))
    }

    /**
     * Parse string into declaration property and value
     */
    parse(str) {
      let parts = str.split(':');
      let prop = parts[0];
      let value = parts[1];
      if (!value) value = '';
      return [prop.trim(), value.trim()]
    }

    /**
     * Return array of Declaration with all necessary prefixes
     */
    prefixed(str) {
      let rule = this.virtual(str);
      if (this.disabled(rule.first)) {
        return rule.nodes
      }

      let result = { warn: () => null };

      let prefixer = this.prefixer().add[rule.first.prop];
      prefixer && prefixer.process && prefixer.process(rule.first, result);

      for (let decl of rule.nodes) {
        for (let value of this.prefixer().values('add', rule.first.prop)) {
          value.process(decl);
        }
        Value$1.save(this.all, decl);
      }

      return rule.nodes
    }

    /**
     * Return prefixer only with @supports supported browsers
     */
    prefixer() {
      if (this.prefixerCache) {
        return this.prefixerCache
      }

      let filtered = this.all.browsers.selected.filter(i => {
        return supported.includes(i)
      });

      let browsers = new Browsers$3(
        this.all.browsers.data,
        filtered,
        this.all.options
      );
      this.prefixerCache = new this.Prefixes(
        this.all.data,
        browsers,
        this.all.options
      );
      return this.prefixerCache
    }

    /**
     * Add prefixed declaration
     */
    process(rule) {
      let ast = brackets.parse(rule.params);
      ast = this.normalize(ast);
      ast = this.remove(ast, rule.params);
      ast = this.add(ast, rule.params);
      ast = this.cleanBrackets(ast);
      rule.params = brackets.stringify(ast);
    }

    /**
     * Remove all unnecessary prefixes
     */
    remove(nodes, all) {
      let i = 0;
      while (i < nodes.length) {
        if (
          !this.isNot(nodes[i - 1]) &&
          this.isProp(nodes[i]) &&
          this.isOr(nodes[i + 1])
        ) {
          if (this.toRemove(nodes[i][0], all)) {
            nodes.splice(i, 2);
            continue
          }

          i += 2;
          continue
        }

        if (typeof nodes[i] === 'object') {
          nodes[i] = this.remove(nodes[i], all);
        }

        i += 1;
      }
      return nodes
    }

    /**
     * Return true if we need to remove node
     */
    toRemove(str, all) {
      let [prop, value] = this.parse(str);
      let unprefixed = this.all.unprefixed(prop);

      let cleaner = this.all.cleaner();

      if (
        cleaner.remove[prop] &&
        cleaner.remove[prop].remove &&
        !this.isHack(all, unprefixed)
      ) {
        return true
      }

      for (let checker of cleaner.values('remove', unprefixed)) {
        if (checker.check(value)) {
          return true
        }
      }

      return false
    }

    /**
     * Create virtual rule to process it by prefixer
     */
    virtual(str) {
      let [prop, value] = this.parse(str);
      let rule = parse('a{}').first;
      rule.append({ prop, raws: { before: '' }, value });
      return rule
    }
  };

  var supports = Supports$1;

  let { list } = postcss_1;
  let parser = lib;

  let Browsers$2 = browsers$1;
  let vendor$1 = vendor$4;

  let Transition$1 = class Transition {
    constructor(prefixes) {
      this.props = ['transition', 'transition-property'];
      this.prefixes = prefixes;
    }

    /**
     * Process transition and add prefixes for all necessary properties
     */
    add(decl, result) {
      let prefix, prop;
      let add = this.prefixes.add[decl.prop];
      let vendorPrefixes = this.ruleVendorPrefixes(decl);
      let declPrefixes = vendorPrefixes || (add && add.prefixes) || [];

      let params = this.parse(decl.value);
      let names = params.map(i => this.findProp(i));
      let added = [];

      if (names.some(i => i[0] === '-')) {
        return
      }

      for (let param of params) {
        prop = this.findProp(param);
        if (prop[0] === '-') continue

        let prefixer = this.prefixes.add[prop];
        if (!prefixer || !prefixer.prefixes) continue

        for (prefix of prefixer.prefixes) {
          if (vendorPrefixes && !vendorPrefixes.some(p => prefix.includes(p))) {
            continue
          }

          let prefixed = this.prefixes.prefixed(prop, prefix);
          if (prefixed !== '-ms-transform' && !names.includes(prefixed)) {
            if (!this.disabled(prop, prefix)) {
              added.push(this.clone(prop, prefixed, param));
            }
          }
        }
      }

      params = params.concat(added);
      let value = this.stringify(params);

      let webkitClean = this.stringify(
        this.cleanFromUnprefixed(params, '-webkit-')
      );
      if (declPrefixes.includes('-webkit-')) {
        this.cloneBefore(decl, `-webkit-${decl.prop}`, webkitClean);
      }
      this.cloneBefore(decl, decl.prop, webkitClean);
      if (declPrefixes.includes('-o-')) {
        let operaClean = this.stringify(this.cleanFromUnprefixed(params, '-o-'));
        this.cloneBefore(decl, `-o-${decl.prop}`, operaClean);
      }

      for (prefix of declPrefixes) {
        if (prefix !== '-webkit-' && prefix !== '-o-') {
          let prefixValue = this.stringify(
            this.cleanOtherPrefixes(params, prefix)
          );
          this.cloneBefore(decl, prefix + decl.prop, prefixValue);
        }
      }

      if (value !== decl.value && !this.already(decl, decl.prop, value)) {
        this.checkForWarning(result, decl);
        decl.cloneBefore();
        decl.value = value;
      }
    }

    /**
     * Does we already have this declaration
     */
    already(decl, prop, value) {
      return decl.parent.some(i => i.prop === prop && i.value === value)
    }

    /**
     * Show transition-property warning
     */
    checkForWarning(result, decl) {
      if (decl.prop !== 'transition-property') {
        return
      }

      let isPrefixed = false;
      let hasAssociatedProp = false;

      decl.parent.each(i => {
        if (i.type !== 'decl') {
          return undefined
        }
        if (i.prop.indexOf('transition-') !== 0) {
          return undefined
        }
        let values = list.comma(i.value);
        // check if current Rule's transition-property comma separated value list needs prefixes
        if (i.prop === 'transition-property') {
          values.forEach(value => {
            let lookup = this.prefixes.add[value];
            if (lookup && lookup.prefixes && lookup.prefixes.length > 0) {
              isPrefixed = true;
            }
          });
          return undefined
        }
        // check if another transition-* prop in current Rule has comma separated value list
        hasAssociatedProp = hasAssociatedProp || values.length > 1;
        return false
      });

      if (isPrefixed && hasAssociatedProp) {
        decl.warn(
          result,
          'Replace transition-property to transition, ' +
            'because Autoprefixer could not support ' +
            'any cases of transition-property ' +
            'and other transition-*'
        );
      }
    }

    /**
     * Remove all non-webkit prefixes and unprefixed params if we have prefixed
     */
    cleanFromUnprefixed(params, prefix) {
      let remove = params
        .map(i => this.findProp(i))
        .filter(i => i.slice(0, prefix.length) === prefix)
        .map(i => this.prefixes.unprefixed(i));

      let result = [];
      for (let param of params) {
        let prop = this.findProp(param);
        let p = vendor$1.prefix(prop);
        if (!remove.includes(prop) && (p === prefix || p === '')) {
          result.push(param);
        }
      }
      return result
    }

    cleanOtherPrefixes(params, prefix) {
      return params.filter(param => {
        let current = vendor$1.prefix(this.findProp(param));
        return current === '' || current === prefix
      })
    }

    /**
     * Return new param array with different name
     */
    clone(origin, name, param) {
      let result = [];
      let changed = false;
      for (let i of param) {
        if (!changed && i.type === 'word' && i.value === origin) {
          result.push({ type: 'word', value: name });
          changed = true;
        } else {
          result.push(i);
        }
      }
      return result
    }

    /**
     * Add declaration if it is not exist
     */
    cloneBefore(decl, prop, value) {
      if (!this.already(decl, prop, value)) {
        decl.cloneBefore({ prop, value });
      }
    }

    /**
     * Check property for disabled by option
     */
    disabled(prop, prefix) {
      let other = ['order', 'justify-content', 'align-self', 'align-content'];
      if (prop.includes('flex') || other.includes(prop)) {
        if (this.prefixes.options.flexbox === false) {
          return true
        }

        if (this.prefixes.options.flexbox === 'no-2009') {
          return prefix.includes('2009')
        }
      }
      return undefined
    }

    /**
     * Find or create separator
     */
    div(params) {
      for (let param of params) {
        for (let node of param) {
          if (node.type === 'div' && node.value === ',') {
            return node
          }
        }
      }
      return { after: ' ', type: 'div', value: ',' }
    }

    /**
     * Find property name
     */
    findProp(param) {
      let prop = param[0].value;
      if (/^\d/.test(prop)) {
        for (let [i, token] of param.entries()) {
          if (i !== 0 && token.type === 'word') {
            return token.value
          }
        }
      }
      return prop
    }

    /**
     * Parse properties list to array
     */
    parse(value) {
      let ast = parser(value);
      let result = [];
      let param = [];
      for (let node of ast.nodes) {
        param.push(node);
        if (node.type === 'div' && node.value === ',') {
          result.push(param);
          param = [];
        }
      }
      result.push(param);
      return result.filter(i => i.length > 0)
    }

    /**
     * Process transition and remove all unnecessary properties
     */
    remove(decl) {
      let params = this.parse(decl.value);
      params = params.filter(i => {
        let prop = this.prefixes.remove[this.findProp(i)];
        return !prop || !prop.remove
      });
      let value = this.stringify(params);

      if (decl.value === value) {
        return
      }

      if (params.length === 0) {
        decl.remove();
        return
      }

      let double = decl.parent.some(i => {
        return i.prop === decl.prop && i.value === value
      });
      let smaller = decl.parent.some(i => {
        return i !== decl && i.prop === decl.prop && i.value.length > value.length
      });

      if (double || smaller) {
        decl.remove();
        return
      }

      decl.value = value;
    }

    /**
     * Check if transition prop is inside vendor specific rule
     */
    ruleVendorPrefixes(decl) {
      let { parent } = decl;

      if (parent.type !== 'rule') {
        return false
      } else if (!parent.selector.includes(':-')) {
        return false
      }

      let selectors = Browsers$2.prefixes().filter(s =>
        parent.selector.includes(':' + s)
      );

      return selectors.length > 0 ? selectors : false
    }

    /**
     * Return properties string from array
     */
    stringify(params) {
      if (params.length === 0) {
        return ''
      }
      let nodes = [];
      for (let param of params) {
        if (param[param.length - 1].type !== 'div') {
          param.push(this.div(params));
        }
        nodes = nodes.concat(param);
      }
      if (nodes[0].type === 'div') {
        nodes = nodes.slice(1);
      }
      if (nodes[nodes.length - 1].type === 'div') {
        nodes = nodes.slice(0, +-2 + 1 );
      }
      return parser.stringify({ nodes })
    }
  };

  var transition = Transition$1;

  let AtRule = atRule;
  let Browsers$1 = browsers$1;
  let Declaration = declaration;
  let hackAlignContent = alignContent;
  let hackAlignItems = alignItems;
  let hackAlignSelf = alignSelf;
  let hackAnimation = animation;
  let hackAppearance = appearance;
  let hackAutofill = autofill;
  let hackBackdropFilter = backdropFilter;
  let hackBackgroundClip = backgroundClip;
  let hackBackgroundSize = backgroundSize;
  let hackBlockLogical = blockLogical;
  let hackBorderImage = borderImage;
  let hackBorderRadius = borderRadius;
  let hackBreakProps = breakProps;
  let hackCrossFade = crossFade;
  let hackDisplayFlex = displayFlex;
  let hackDisplayGrid = displayGrid;
  let hackFileSelectorButton = fileSelectorButton;
  let hackFilter = filter;
  let hackFilterValue = filterValue;
  let hackFlex = flex;
  let hackFlexBasis = flexBasis;
  let hackFlexDirection = flexDirection;
  let hackFlexFlow = flexFlow;
  let hackFlexGrow = flexGrow;
  let hackFlexShrink = flexShrink;
  let hackFlexWrap = flexWrap;
  let hackFullscreen = fullscreen;
  let hackGradient = gradient;
  let hackGridArea = gridArea;
  let hackGridColumnAlign = gridColumnAlign;
  let hackGridEnd = gridEnd;
  let hackGridRowAlign = gridRowAlign;
  let hackGridRowColumn = gridRowColumn;
  let hackGridRowsColumns = gridRowsColumns;
  let hackGridStart = gridStart;
  let hackGridTemplate = gridTemplate;
  let hackGridTemplateAreas = gridTemplateAreas;
  let hackImageRendering = imageRendering;
  let hackImageSet = imageSet;
  let hackInlineLogical = inlineLogical;
  let hackIntrinsic = intrinsic;
  let hackJustifyContent = justifyContent;
  let hackMaskBorder = maskBorder;
  let hackMaskComposite = maskComposite;
  let hackOrder = order;
  let hackOverscrollBehavior = overscrollBehavior;
  let hackPixelated = pixelated;
  let hackPlaceSelf = placeSelf;
  let hackPlaceholder = placeholder;
  let hackPlaceholderShown = placeholderShown;
  let hackPrintColorAdjust = printColorAdjust;
  let hackTextDecoration = textDecoration;
  let hackTextDecorationSkipInk = textDecorationSkipInk;
  let hackTextEmphasisPosition = textEmphasisPosition;
  let hackTransformDecl = transformDecl;
  let hackUserSelect = userSelect;
  let hackWritingMode = writingMode;
  let Processor = processor;
  let Resolution = resolution;
  let Selector = selector;
  let Supports = supports;
  let Transition = transition;
  let utils = utils$i;
  let Value = value;
  let vendor = vendor$4;

  Selector.hack(hackAutofill);
  Selector.hack(hackFullscreen);
  Selector.hack(hackPlaceholder);
  Selector.hack(hackPlaceholderShown);
  Selector.hack(hackFileSelectorButton);
  Declaration.hack(hackFlex);
  Declaration.hack(hackOrder);
  Declaration.hack(hackFilter);
  Declaration.hack(hackGridEnd);
  Declaration.hack(hackAnimation);
  Declaration.hack(hackFlexFlow);
  Declaration.hack(hackFlexGrow);
  Declaration.hack(hackFlexWrap);
  Declaration.hack(hackGridArea);
  Declaration.hack(hackPlaceSelf);
  Declaration.hack(hackGridStart);
  Declaration.hack(hackAlignSelf);
  Declaration.hack(hackAppearance);
  Declaration.hack(hackFlexBasis);
  Declaration.hack(hackMaskBorder);
  Declaration.hack(hackMaskComposite);
  Declaration.hack(hackAlignItems);
  Declaration.hack(hackUserSelect);
  Declaration.hack(hackFlexShrink);
  Declaration.hack(hackBreakProps);
  Declaration.hack(hackWritingMode);
  Declaration.hack(hackBorderImage);
  Declaration.hack(hackAlignContent);
  Declaration.hack(hackBorderRadius);
  Declaration.hack(hackBlockLogical);
  Declaration.hack(hackGridTemplate);
  Declaration.hack(hackInlineLogical);
  Declaration.hack(hackGridRowAlign);
  Declaration.hack(hackTransformDecl);
  Declaration.hack(hackFlexDirection);
  Declaration.hack(hackImageRendering);
  Declaration.hack(hackBackdropFilter);
  Declaration.hack(hackBackgroundClip);
  Declaration.hack(hackTextDecoration);
  Declaration.hack(hackJustifyContent);
  Declaration.hack(hackBackgroundSize);
  Declaration.hack(hackGridRowColumn);
  Declaration.hack(hackGridRowsColumns);
  Declaration.hack(hackGridColumnAlign);
  Declaration.hack(hackOverscrollBehavior);
  Declaration.hack(hackGridTemplateAreas);
  Declaration.hack(hackPrintColorAdjust);
  Declaration.hack(hackTextEmphasisPosition);
  Declaration.hack(hackTextDecorationSkipInk);
  Value.hack(hackGradient);
  Value.hack(hackIntrinsic);
  Value.hack(hackPixelated);
  Value.hack(hackImageSet);
  Value.hack(hackCrossFade);
  Value.hack(hackDisplayFlex);
  Value.hack(hackDisplayGrid);
  Value.hack(hackFilterValue);

  let declsCache = new Map();

  let Prefixes$1 = class Prefixes {
    constructor(data, browsers, options = {}) {
      this.data = data;
      this.browsers = browsers;
      this.options = options
      ;[this.add, this.remove] = this.preprocess(this.select(this.data));
      this.transition = new Transition(this);
      this.processor = new Processor(this);
    }

    /**
     * Return clone instance to remove all prefixes
     */
    cleaner() {
      if (this.cleanerCache) {
        return this.cleanerCache
      }

      if (this.browsers.selected.length) {
        let empty = new Browsers$1(this.browsers.data, []);
        this.cleanerCache = new Prefixes(this.data, empty, this.options);
      } else {
        return this
      }

      return this.cleanerCache
    }

    /**
     * Declaration loader with caching
     */
    decl(prop) {
      if (!declsCache.has(prop)) {
        declsCache.set(prop, Declaration.load(prop));
      }

      return declsCache.get(prop)
    }

    /**
     * Group declaration by unprefixed property to check them
     */
    group(decl) {
      let rule = decl.parent;
      let index = rule.index(decl);
      let { length } = rule.nodes;
      let unprefixed = this.unprefixed(decl.prop);

      let checker = (step, callback) => {
        index += step;
        while (index >= 0 && index < length) {
          let other = rule.nodes[index];
          if (other.type === 'decl') {
            if (step === -1 && other.prop === unprefixed) {
              if (!Browsers$1.withPrefix(other.value)) {
                break
              }
            }

            if (this.unprefixed(other.prop) !== unprefixed) {
              break
            } else if (callback(other) === true) {
              return true
            }

            if (step === +1 && other.prop === unprefixed) {
              if (!Browsers$1.withPrefix(other.value)) {
                break
              }
            }
          }

          index += step;
        }
        return false
      };

      return {
        down(callback) {
          return checker(+1, callback)
        },
        up(callback) {
          return checker(-1, callback)
        }
      }
    }

    /**
     * Normalize prefix for remover
     */
    normalize(prop) {
      return this.decl(prop).normalize(prop)
    }

    /**
     * Return prefixed version of property
     */
    prefixed(prop, prefix) {
      prop = vendor.unprefixed(prop);
      return this.decl(prop).prefixed(prop, prefix)
    }

    /**
     * Cache prefixes data to fast CSS processing
     */
    preprocess(selected) {
      let add = {
        '@supports': new Supports(Prefixes, this),
        'selectors': []
      };
      for (let name in selected.add) {
        let prefixes = selected.add[name];
        if (name === '@keyframes' || name === '@viewport') {
          add[name] = new AtRule(name, prefixes, this);
        } else if (name === '@resolution') {
          add[name] = new Resolution(name, prefixes, this);
        } else if (this.data[name].selector) {
          add.selectors.push(Selector.load(name, prefixes, this));
        } else {
          let props = this.data[name].props;

          if (props) {
            let value = Value.load(name, prefixes, this);
            for (let prop of props) {
              if (!add[prop]) {
                add[prop] = { values: [] };
              }
              add[prop].values.push(value);
            }
          } else {
            let values = (add[name] && add[name].values) || [];
            add[name] = Declaration.load(name, prefixes, this);
            add[name].values = values;
          }
        }
      }

      let remove = { selectors: [] };
      for (let name in selected.remove) {
        let prefixes = selected.remove[name];
        if (this.data[name].selector) {
          let selector = Selector.load(name, prefixes);
          for (let prefix of prefixes) {
            remove.selectors.push(selector.old(prefix));
          }
        } else if (name === '@keyframes' || name === '@viewport') {
          for (let prefix of prefixes) {
            let prefixed = `@${prefix}${name.slice(1)}`;
            remove[prefixed] = { remove: true };
          }
        } else if (name === '@resolution') {
          remove[name] = new Resolution(name, prefixes, this);
        } else {
          let props = this.data[name].props;
          if (props) {
            let value = Value.load(name, [], this);
            for (let prefix of prefixes) {
              let old = value.old(prefix);
              if (old) {
                for (let prop of props) {
                  if (!remove[prop]) {
                    remove[prop] = {};
                  }
                  if (!remove[prop].values) {
                    remove[prop].values = [];
                  }
                  remove[prop].values.push(old);
                }
              }
            }
          } else {
            for (let p of prefixes) {
              let olds = this.decl(name).old(name, p);
              if (name === 'align-self') {
                let a = add[name] && add[name].prefixes;
                if (a) {
                  if (p === '-webkit- 2009' && a.includes('-webkit-')) {
                    continue
                  } else if (p === '-webkit-' && a.includes('-webkit- 2009')) {
                    continue
                  }
                }
              }
              for (let prefixed of olds) {
                if (!remove[prefixed]) {
                  remove[prefixed] = {};
                }
                remove[prefixed].remove = true;
              }
            }
          }
        }
      }

      return [add, remove]
    }

    /**
     * Select prefixes from data, which is necessary for selected browsers
     */
    select(list) {
      let selected = { add: {}, remove: {} };

      for (let name in list) {
        let data = list[name];
        let add = data.browsers.map(i => {
          let params = i.split(' ');
          return {
            browser: `${params[0]} ${params[1]}`,
            note: params[2]
          }
        });

        let notes = add
          .filter(i => i.note)
          .map(i => `${this.browsers.prefix(i.browser)} ${i.note}`);
        notes = utils.uniq(notes);

        add = add
          .filter(i => this.browsers.isSelected(i.browser))
          .map(i => {
            let prefix = this.browsers.prefix(i.browser);
            if (i.note) {
              return `${prefix} ${i.note}`
            } else {
              return prefix
            }
          });
        add = this.sort(utils.uniq(add));

        if (this.options.flexbox === 'no-2009') {
          add = add.filter(i => !i.includes('2009'));
        }

        let all = data.browsers.map(i => this.browsers.prefix(i));
        if (data.mistakes) {
          all = all.concat(data.mistakes);
        }
        all = all.concat(notes);
        all = utils.uniq(all);

        if (add.length) {
          selected.add[name] = add;
          if (add.length < all.length) {
            selected.remove[name] = all.filter(i => !add.includes(i));
          }
        } else {
          selected.remove[name] = all;
        }
      }

      return selected
    }

    /**
     * Sort vendor prefixes
     */
    sort(prefixes) {
      return prefixes.sort((a, b) => {
        let aLength = utils.removeNote(a).length;
        let bLength = utils.removeNote(b).length;

        if (aLength === bLength) {
          return b.length - a.length
        } else {
          return bLength - aLength
        }
      })
    }

    /**
     * Return unprefixed version of property
     */
    unprefixed(prop) {
      let value = this.normalize(vendor.unprefixed(prop));
      if (value === 'flex-direction') {
        value = 'flex-flow';
      }
      return value
    }

    /**
     * Return values, which must be prefixed in selected property
     */
    values(type, prop) {
      let data = this[type];

      let global = data['*'] && data['*'].values;
      let values = data[prop] && data[prop].values;

      if (global && values) {
        return utils.uniq(global.concat(values))
      } else {
        return global || values || []
      }
    }
  };

  var prefixes = Prefixes$1;

  let browserslist = browserslist_1;
  let { agents } = agents$4;
  let pico = picocolors_browser.exports;

  let dataPrefixes = prefixes$1;
  let Browsers = browsers$1;
  let getInfo = info;
  let Prefixes = prefixes;

  let autoprefixerData = { browsers: agents, prefixes: dataPrefixes };

  const WARNING =
    '\n' +
    '  Replace Autoprefixer `browsers` option to Browserslist config.\n' +
    '  Use `browserslist` key in `package.json` or `.browserslistrc` file.\n' +
    '\n' +
    '  Using `browsers` option can cause errors. Browserslist config can\n' +
    '  be used for Babel, Autoprefixer, postcss-normalize and other tools.\n' +
    '\n' +
    '  If you really need to use option, rename it to `overrideBrowserslist`.\n' +
    '\n' +
    '  Learn more at:\n' +
    '  https://github.com/browserslist/browserslist#readme\n' +
    '  https://twitter.com/browserslist\n' +
    '\n';

  function isPlainObject(obj) {
    return Object.prototype.toString.apply(obj) === '[object Object]'
  }

  let cache = new Map();

  function timeCapsule(result, prefixes) {
    if (prefixes.browsers.selected.length === 0) {
      return
    }
    if (prefixes.add.selectors.length > 0) {
      return
    }
    if (Object.keys(prefixes.add).length > 2) {
      return
    }
    /* c8 ignore next 11 */
    result.warn(
      'Autoprefixer target browsers do not need any prefixes.' +
        'You do not need Autoprefixer anymore.\n' +
        'Check your Browserslist config to be sure that your targets ' +
        'are set up correctly.\n' +
        '\n' +
        '  Learn more at:\n' +
        '  https://github.com/postcss/autoprefixer#readme\n' +
        '  https://github.com/browserslist/browserslist#readme\n' +
        '\n'
    );
  }

  var autoprefixer$1 = plugin;

  function plugin(...reqs) {
    let options;
    if (reqs.length === 1 && isPlainObject(reqs[0])) {
      options = reqs[0];
      reqs = undefined;
    } else if (reqs.length === 0 || (reqs.length === 1 && !reqs[0])) {
      reqs = undefined;
    } else if (reqs.length <= 2 && (Array.isArray(reqs[0]) || !reqs[0])) {
      options = reqs[1];
      reqs = reqs[0];
    } else if (typeof reqs[reqs.length - 1] === 'object') {
      options = reqs.pop();
    }

    if (!options) {
      options = {};
    }

    if (options.browser) {
      throw new Error(
        'Change `browser` option to `overrideBrowserslist` in Autoprefixer'
      )
    } else if (options.browserslist) {
      throw new Error(
        'Change `browserslist` option to `overrideBrowserslist` in Autoprefixer'
      )
    }

    if (options.overrideBrowserslist) {
      reqs = options.overrideBrowserslist;
    } else if (options.browsers) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn(
          pico.red(WARNING.replace(/`[^`]+`/g, i => pico.yellow(i.slice(1, -1))))
        );
      }
      reqs = options.browsers;
    }

    let brwlstOpts = {
      env: options.env,
      ignoreUnknownVersions: options.ignoreUnknownVersions,
      stats: options.stats
    };

    function loadPrefixes(opts) {
      let d = autoprefixerData;
      let browsers = new Browsers(d.browsers, reqs, opts, brwlstOpts);
      let key = browsers.selected.join(', ') + JSON.stringify(options);

      if (!cache.has(key)) {
        cache.set(key, new Prefixes(d.prefixes, browsers, options));
      }

      return cache.get(key)
    }

    return {
      browsers: reqs,

      info(opts) {
        opts = opts || {};
        opts.from = opts.from || process.cwd();
        return getInfo(loadPrefixes(opts))
      },

      options,

      postcssPlugin: 'autoprefixer',
      prepare(result) {
        let prefixes = loadPrefixes({
          env: options.env,
          from: result.opts.from
        });

        return {
          OnceExit(root) {
            timeCapsule(result, prefixes);
            if (options.remove !== false) {
              prefixes.processor.remove(root, result);
            }
            if (options.add !== false) {
              prefixes.processor.add(root, result);
            }
          }
        }
      }
    }
  }

  plugin.postcss = true;

  /**
   * Autoprefixer data
   */
  plugin.data = autoprefixerData;

  /**
   * Autoprefixer default browsers
   */
  plugin.defaults = browserslist.defaults;

  /**
   * Inspect with default Autoprefixer
   */
  plugin.info = () => plugin().info();

  var region = (function (browsers) {
    function unpackRegion(packed) {
      return Object.keys(packed).reduce((list, browser) => {
        let data = packed[browser];
        list[browsers[browser]] = Object.keys(data).reduce((memo, key) => {
          let stats = data[key];
          if (key === '_') {
            stats.split(' ').forEach(version => (memo[version] = null));
          } else {
            memo[key] = stats;
          }
          return memo
        }, {});
        return list
      }, {})
    }

    return unpackRegion;
  })(browsers$5.browsers);

  var autoprefixer = {
    process: (css, processOptions, pluginOptions) => {
      // execjs does not support passing callback from ruby,
      // which makes waiting for the promise to settle from async function impossible
      var result = postcss_1([autoprefixer$1(pluginOptions)]).process(css, processOptions);

      var warns  = result.warnings().map(function (i) {
        delete i.plugin;
        return i/*AH-.toString()*/
      });

      var map = result.map ? result.map.toString() : null;
      return  { css: result.css, map: map, warnings: warns }
    },

    info: (options) => {
      return autoprefixer$1(options).info()
    }
  };

  return autoprefixer;

})(CountryStatisticsService /*AH+*/);