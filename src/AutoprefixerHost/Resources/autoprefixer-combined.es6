/*!
 * Autoprefixer v10.5.5
 * https://github.com/postcss/autoprefixer
 * https://github.com/ai/autoprefixer-rails
 *
 * Copyright (C) 2013 Andrey Sitnik <andrey@sitnik.es>
 * Released under the terms of MIT license
 */
var autoprefixer = (function (/*AH+*/countryStatisticsService, undefined) {
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

  var process$1 = browser$1$1;

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

  var picocolors_browser$1 = {exports: {}};

  var x$1=String;
  var create$1=function() {return {isColorSupported:false,reset:x$1,bold:x$1,dim:x$1,italic:x$1,underline:x$1,inverse:x$1,hidden:x$1,strikethrough:x$1,black:x$1,red:x$1,green:x$1,yellow:x$1,blue:x$1,magenta:x$1,cyan:x$1,white:x$1,gray:x$1,bgBlack:x$1,bgRed:x$1,bgGreen:x$1,bgYellow:x$1,bgBlue:x$1,bgMagenta:x$1,bgCyan:x$1,bgWhite:x$1,blackBright:x$1,redBright:x$1,greenBright:x$1,yellowBright:x$1,blueBright:x$1,magentaBright:x$1,cyanBright:x$1,whiteBright:x$1,bgBlackBright:x$1,bgRedBright:x$1,bgGreenBright:x$1,bgYellowBright:x$1,bgBlueBright:x$1,bgMagentaBright:x$1,bgCyanBright:x$1,bgWhiteBright:x$1}};
  picocolors_browser$1.exports=create$1();
  picocolors_browser$1.exports.createColors = create$1;

  var _nodeResolve_empty = {};

  var _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: _nodeResolve_empty
  });

  var require$$6 = /*@__PURE__*/getAugmentedNamespace(_nodeResolve_empty$1);

  let pico$1 = picocolors_browser$1.exports;

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

  // Escapes sequences that could break out of an HTML <style> context.
  // Uses CSS unicode escaping (\3c = '<') which is valid CSS and parsed
  // correctly by all compliant CSS consumers.
  const STYLE_TAG = /(<)(\/?style\b)/gi;
  const COMMENT_OPEN = /(<)(!--)/g;

  // Characters that end an at-rule name, mirroring RE_AT_END in the tokenizer.
  // Params starting with anything else need a space to stay separate tokens.
  const AT_NAME_END = /[\t\n\f\r "#'()/;[\\\]{}]/;

  function escapeHTMLInCSS(str) {
    if (typeof str !== 'string') return str
    if (!str.includes('<')) return str
    return str.replace(STYLE_TAG, '\\3c $2').replace(COMMENT_OPEN, '\\3c $2')
  }

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

  function atruleStart(str, node) {
    let name = '@' + node.name;
    let params = node.params ? str.rawValue(node, 'params') : '';
    let afterName = node.raws.afterName;

    if (typeof afterName === 'undefined') {
      afterName = params ? ' ' : '';
    } else if (afterName === '' && params && !AT_NAME_END.test(params[0])) {
      afterName = ' ';
    }

    return name + afterName + params
  }

  // `*--x` is not a custom property: the parser checks the first token, and the
  // `*`/`_` hack prefix moves from `prop` into `before` only after that.
  function isCustomProperty(node) {
    if (!node.prop.startsWith('--')) return false
    let before = node.raws.before;
    return typeof before === 'undefined' || !/\S$/.test(before)
  }

  function pushBody(str, stack, node) {
    let nodes = node.nodes;
    let last = nodes.length - 1;
    while (last > 0) {
      if (nodes[last].type !== 'comment') break
      last -= 1;
    }

    let semicolon = str.raw(node, 'semicolon');
    let isDocument = node.type === 'document';
    for (let i = nodes.length - 1; i >= 0; i--) {
      let child = nodes[i];
      let childSemicolon = last !== i || semicolon;
      // A childless at-rule or a custom property declaration that still has
      // following siblings must be terminated. Without the semicolon those
      // trailing comments are folded into the at-rule's prelude or the custom
      // property's value and disappear when the output is re-parsed.
      if (
        !childSemicolon &&
        i < nodes.length - 1 &&
        ((child.type === 'atrule' && !child.nodes) ||
          (child.type === 'decl' && isCustomProperty(child)))
      ) {
        childSemicolon = true;
      }
      stack.push({
        document: isDocument,
        node: child,
        semicolon: childSemicolon
      });
    }
  }

  function pushBlock(str, stack, node, start) {
    let between = str.raw(node, 'between', 'beforeOpen');
    str.builder(escapeHTMLInCSS(start + between) + '{', node, 'start');

    let hasNodes = node.nodes && node.nodes.length;
    let close = () => {
      let after = hasNodes
        ? str.raw(node, 'after')
        : str.raw(node, 'after', 'emptyBody');
      if (after) str.builder(escapeHTMLInCSS(after));
      str.builder('}', node, 'end');
      if (node.type === 'rule' && node.raws.ownSemicolon) {
        str.builder(escapeHTMLInCSS(node.raws.ownSemicolon), node, 'end');
      }
    };

    if (hasNodes) {
      stack.push(close);
      pushBody(str, stack, node);
    } else {
      close();
    }
  }

  let Stringifier$2 = class Stringifier {
    constructor(builder) {
      this.builder = builder;
    }

    atrule(node, semicolon) {
      let start = atruleStart(this, node);
      if (node.nodes) {
        this.block(node, start);
      } else {
        let end = (node.raws.between || '') + (semicolon ? ';' : '');
        this.builder(escapeHTMLInCSS(start + end), node);
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
      this.builder(escapeHTMLInCSS(start + between) + '{', node, 'start');

      let after;
      if (node.nodes && node.nodes.length) {
        this.body(node);
        after = this.raw(node, 'after');
      } else {
        after = this.raw(node, 'after', 'emptyBody');
      }

      if (after) this.builder(escapeHTMLInCSS(after));
      this.builder('}', node, 'end');
    }

    body(node) {
      // Rules and at-rules are expanded into an explicit stack instead of
      // recursive `stringify()` calls to survive deeply nested trees.
      // If a subclass changes the traversal methods, its children go
      // through `stringify()` to keep the override in charge.
      let proto = Stringifier.prototype;
      let expandable = ['atrule', 'block', 'body', 'rule', 'stringify'].every(
        method => this[method] === proto[method]
      );

      let stack = [];
      pushBody(this, stack, node);

      while (stack.length > 0) {
        let entry = stack.pop();
        if (typeof entry === 'function') {
          entry();
          continue
        }

        let child = entry.node;
        let before = this.raw(child, 'before');
        if (before) {
          this.builder(entry.document ? before : escapeHTMLInCSS(before));
        }

        if (expandable && child.type === 'rule') {
          pushBlock(this, stack, child, this.rawValue(child, 'selector'));
        } else if (expandable && child.type === 'atrule' && child.nodes) {
          pushBlock(this, stack, child, atruleStart(this, child));
        } else {
          this.stringify(child, entry.semicolon);
        }
      }
    }

    comment(node) {
      let left = this.raw(node, 'left', 'commentLeft');
      let right = this.raw(node, 'right', 'commentRight');
      this.builder(escapeHTMLInCSS('/*' + left + node.text + right + '*/'), node);
    }

    decl(node, semicolon) {
      let raws = node.raws;
      let between = this.raw(node, 'between', 'colon');

      let string = node.prop + between + this.rawValue(node, 'value');

      if (node.important) {
        string += raws.important || ' !important';
      }

      if (semicolon) string += ';';
      this.builder(escapeHTMLInCSS(string), node);
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
      let cache = root.rawCache || (root.rawCache = {});
      if (typeof cache[detect] !== 'undefined') {
        return cache[detect]
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

      cache[detect] = value;
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
      if (node.source && node.source.input.hasBOM) {
        this.builder('\uFEFF', node, 'start');
      }
      this.body(node);
      if (node.raws.after) {
        let after = node.raws.after;
        let isDocument = node.parent && node.parent.type === 'document';
        this.builder(isDocument ? after : escapeHTMLInCSS(after));
      }
    }

    rule(node) {
      this.block(node, this.rawValue(node, 'selector'));
      if (node.raws.ownSemicolon) {
        this.builder(escapeHTMLInCSS(node.raws.ownSemicolon), node, 'end');
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
  let { isClean: isClean$2, my: my$3 } = symbols;

  function cloneNode(obj, parent) {
    let cloned = new obj.constructor();
    // An explicit stack instead of recursive calls to survive deeply
    // nested trees. Each entry is [source, its clone, clone's parent].
    let stack = [[obj, cloned, parent]];

    while (stack.length > 0) {
      let [source, target, targetParent] = stack.pop();
      for (let i in source) {
        if (!Object.prototype.hasOwnProperty.call(source, i)) {
          /* c8 ignore next 2 */
          continue
        }
        if (i === 'proxyCache') continue
        let value = source[i];
        let type = typeof value;

        if (i === 'parent' && type === 'object') {
          if (targetParent) target[i] = targetParent;
        } else if (i === 'source') {
          target[i] = value;
        } else if (Array.isArray(value)) {
          let children = [];
          target[i] = children;
          for (let j of value) {
            let childClone = new j.constructor();
            children.push(childClone);
            stack.push([j, childClone, target]);
          }
        } else {
          if (type === 'object' && value !== null) {
            let valueClone = new value.constructor();
            stack.push([value, valueClone, undefined]);
            value = valueClone;
          }
          target[i] = value;
        }
      }
    }

    return cloned
  }

  function sourceOffset(inputCSS, position) {
    // Not all custom syntaxes support `offset` in `source.start` and `source.end`
    if (position && typeof position.offset !== 'undefined') {
      return position.offset
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
      this[my$3] = true;

      for (let name of Object.keys(defaults)) {
        if (name === '__proto__') continue
        if (name === 'nodes') {
          this.nodes = [];
          for (let node of defaults[name]) {
            // Clone only nodes that already belong to another tree, so passing a
            // freshly created (parent-less) node adopts that instance instead of
            // a copy and keeps the caller's reference usable. See #1987.
            if (typeof node.clone === 'function' && node.parent) {
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

    positionBy(opts = {}) {
      let inputString =
        'document' in this.source.input
          ? this.source.input.document
          : this.source.input.css;
      let pos = {
        column: this.source.start.column,
        line: this.source.start.line,
        offset: sourceOffset(inputString, this.source.start)
      };
      if (opts.index) {
        pos = this.positionInside(opts.index);
      } else if (opts.word) {
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
      let inputString =
        'document' in this.source.input
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

      return { column, line, offset: end }
    }

    prev() {
      if (!this.parent) return undefined
      let index = this.parent.index(this);
      return this.parent.nodes[index - 1]
    }

    rangeBy(opts = {}) {
      let inputString =
        'document' in this.source.input
          ? this.source.input.document
          : this.source.input.css;
      let start = {
        column: this.source.start.column,
        line: this.source.start.line,
        offset: sourceOffset(inputString, this.source.start)
      };
      let end = this.source.end
        ? {
            column: this.source.end.column + 1,
            line: this.source.end.line,
            offset:
              typeof this.source.end.offset === 'number'
                ? // `source.end.offset` is exclusive, so we don't need to add 1
                  this.source.end.offset
                : // Since line/column in this.source.end is inclusive,
                  // the `sourceOffset(... , this.source.end)` returns an inclusive offset.
                  // So, we add 1 to convert it to exclusive.
                  sourceOffset(inputString, this.source.end) + 1
          }
        : {
            column: start.column + 1,
            line: start.line,
            offset: start.offset + 1
          };

      if (opts.word) {
        let stringRepresentation = inputString.slice(
          sourceOffset(inputString, this.source.start),
          sourceOffset(inputString, this.source.end)
        );
        let index = stringRepresentation.indexOf(opts.word);
        if (index !== -1) {
          start = this.positionInside(index);
          end = this.positionInside(index + opts.word.length);
        }
      } else {
        if (opts.start) {
          start = {
            column: opts.start.column,
            line: opts.start.line,
            offset: sourceOffset(inputString, opts.start)
          };
        } else if (typeof opts.index === 'number') {
          start = this.positionInside(opts.index);
        }

        if (opts.end) {
          end = {
            column: opts.end.column,
            line: opts.end.line,
            offset: sourceOffset(inputString, opts.end)
          };
        } else if (typeof opts.endIndex === 'number') {
          end = this.positionInside(opts.endIndex);
        } else if (typeof opts.index === 'number') {
          end = this.positionInside(opts.index + 1);
        }
      }

      if (
        end.line < start.line ||
        (end.line === start.line && end.column <= start.column)
      ) {
        end = {
          column: start.column + 1,
          line: start.line,
          offset: start.offset + 1
        };
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
      let emitInputs = inputs == null;
      inputs = inputs || new Map();

      // A worklist instead of recursive `toJSON()` calls to survive deeply
      // nested trees. Each entry converts one node and writes the result
      // into the already converted parent by [holder, key].
      let holderOfRoot = [];
      let queue = [[this, holderOfRoot, 0]];

      for (let step = 0; step < queue.length; step++) {
        let [node, holder, key] = queue[step];
        let fixed = {};
        holder[key] = fixed;

        for (let name in node) {
          if (!Object.prototype.hasOwnProperty.call(node, name)) {
            /* c8 ignore next 2 */
            continue
          }
          if (name === 'parent' || name === 'proxyCache') continue
          let value = node[name];

          if (Array.isArray(value)) {
            let fixedArray = [];
            fixed[name] = fixedArray;
            for (let i = 0; i < value.length; i++) {
              let item = value[i];
              if (typeof item === 'object' && item.toJSON) {
                if (item.toJSON === Node.prototype.toJSON) {
                  queue.push([item, fixedArray, i]);
                } else {
                  fixedArray[i] = item.toJSON(null, inputs);
                }
              } else {
                fixedArray[i] = item;
              }
            }
          } else if (typeof value === 'object' && value.toJSON) {
            if (value.toJSON === Node.prototype.toJSON) {
              queue.push([value, fixed, name]);
            } else {
              fixed[name] = value.toJSON(null, inputs);
            }
          } else if (name === 'source') {
            if (value == null) continue
            let inputId = inputs.get(value.input);
            if (inputId == null) {
              inputId = inputs.size;
              inputs.set(value.input, inputId);
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
      }

      let fixed = holderOfRoot[0];
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

    warn(result, text, opts = {}) {
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
  let { isClean: isClean$1, my: my$2 } = symbols;

  let AtRule$6, parse$b, Root$6, Rule$4;

  function cleanSource(nodes) {
    let stack = nodes.slice();
    while (stack.length > 0) {
      let node = stack.pop();
      delete node.source;
      if (node.nodes) {
        node.nodes = node.nodes.slice();
        for (let i of node.nodes) stack.push(i);
      }
    }
    return nodes.slice()
  }

  function markTreeDirty(node) {
    let stack = [node];
    while (stack.length > 0) {
      let next = stack.pop();
      next[isClean$1] = false;
      if (next.proxyOf.nodes) {
        for (let i of next.proxyOf.nodes) stack.push(i);
      }
    }
  }

  let Container$8 = class Container extends Node$1 {
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
      let stack = [this];
      while (stack.length > 0) {
        let node = stack.pop();
        if (node !== this && node.cleanRaws !== Container.prototype.cleanRaws) {
          // Subclass with own logic; let it handle its subtree
          node.cleanRaws(keepBetween);
          continue
        }
        Node$1.prototype.cleanRaws.call(node, keepBetween);
        if (node.nodes) {
          for (let child of node.nodes) stack.push(child);
        }
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
        if (!i[my$2]) Container.rebuild(i);
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
      if (!this.proxyOf.nodes) return undefined

      // An explicit stack instead of recursive `each()` calls to survive
      // deeply nested trees. Each frame keeps a live `indexes` slot, so
      // insertion and removal during the walk behave like `each()`: the
      // slot stays at the current child until its subtree is finished.
      let stack = [{ iterator: this.getIterator(), node: this.proxyOf }];

      while (stack.length > 0) {
        let { iterator, node } = stack[stack.length - 1];
        let index = node.indexes[iterator];

        if (index >= node.proxyOf.nodes.length) {
          delete node.indexes[iterator];
          stack.pop();
          let parent = stack[stack.length - 1];
          // Finish the parent’s step for the child subtree we just left
          if (parent) parent.node.indexes[parent.iterator] += 1;
          continue
        }

        let child = node.proxyOf.nodes[index];
        let result;
        try {
          result = callback(child, index);
        } catch (e) {
          throw child.addToError(e)
        }
        if (result === false) {
          for (let opened of stack) {
            delete opened.node.indexes[opened.iterator];
          }
          return false
        }
        if (child.walk && child.proxyOf.nodes) {
          stack.push({ iterator: child.getIterator(), node: child });
        } else {
          node.indexes[iterator] += 1;
        }
      }

      return undefined
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

  Container$8.registerParse = dependant => {
    parse$b = dependant;
  };

  Container$8.registerRule = dependant => {
    Rule$4 = dependant;
  };

  Container$8.registerAtRule = dependant => {
    AtRule$6 = dependant;
  };

  Container$8.registerRoot = dependant => {
    Root$6 = dependant;
  };

  var container = Container$8;
  Container$8.default = Container$8;

  /* c8 ignore start */
  Container$8.rebuild = node => {
    let stack = [node];
    while (stack.length > 0) {
      let next = stack.pop();
      if (next.type === 'atrule') {
        Object.setPrototypeOf(next, AtRule$6.prototype);
      } else if (next.type === 'rule') {
        Object.setPrototypeOf(next, Rule$4.prototype);
      } else if (next.type === 'decl') {
        Object.setPrototypeOf(next, Declaration$N.prototype);
      } else if (next.type === 'comment') {
        Object.setPrototypeOf(next, Comment$3.prototype);
      } else if (next.type === 'root') {
        Object.setPrototypeOf(next, Root$6.prototype);
      }

      next[my$2] = true;

      if (next.nodes) {
        for (let child of next.nodes) stack.push(child);
      }
    }
  };

  let Container$7 = container;

  let AtRule$5 = class AtRule extends Container$7 {
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

  Container$7.registerAtRule(AtRule$5);

  let Container$6 = container;

  let LazyResult$4, Processor$6;

  let Document$3 = class Document extends Container$6 {
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

  let urlAlphabet =
    'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

  let customAlphabet = (alphabet, defaultSize = 21) => {
    return (size = defaultSize) => {
      let id = '';
      let i = size | 0;
      while (i-- > 0) {
        id += alphabet[(Math.random() * alphabet.length) | 0];
      }
      return id
    }
  };

  let nanoid$1 = (size = 21) => {
    let id = '';
    let i = size | 0;
    while (i-- > 0) {
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
    var isPathAbsolute = isAbsolute$2(path),
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
  function isAbsolute$2(path) {
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
  function relative$2(from, to) {
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

  var sep$2 = '/';
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
    sep: sep$2,
    delimiter: delimiter$1,
    relative: relative$2,
    join: join$1,
    isAbsolute: isAbsolute$2,
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
    isAbsolute: isAbsolute$2,
    join: join$1,
    normalize: normalize$1,
    relative: relative$2,
    resolve: resolve$3,
    sep: sep$2
  });

  var require$$5 = /*@__PURE__*/getAugmentedNamespace(path$2);

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

  var require$$0$1 = /*@__PURE__*/getAugmentedNamespace(url$2);

  var url = Object.assign(
    {},
    require$$0$1,
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

  var require$$0 = /*@__PURE__*/getAugmentedNamespace(empty$1);

  let { existsSync, readFileSync, realpathSync } = require$$0;
  let { dirname: dirname$1, isAbsolute: isAbsolute$1, join, relative: relative$1, sep: sep$1 } = require$$5;
  let { SourceMapConsumer: SourceMapConsumer$2, SourceMapGenerator: SourceMapGenerator$2 } = sourceMap;

  function realPath(path) {
    try {
      return realpathSync(path)
    } catch {
      // Missing or dangling: keep the literal path. The void() check below
      // still gates the read, and a path that does not exist cannot escape.
      return path
    }
  }

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
      if (opts.unsafeMap) this.unsafeMap = true;
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
        this.consumerCache = new SourceMapConsumer$2(this.json || this.text);
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

      let encoding = text.slice('data:application/json;'.length);
      encoding = encoding.slice(0, encoding.indexOf(','));
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

    loadFile(path, cssFile, trusted) {
      if (!trusted && !this.unsafeMap) {
        if (!/\.map$/i.test(path)) return undefined
        if (!cssFile) return undefined

        // Compare *resolved* paths: relative() is textual, so without this a
        // symlink at or below the CSS file's directory points the map outside it.
        let rel = relative$1(realPath(dirname$1(cssFile)), realPath(path));
        if (rel === '..' || rel.startsWith('..' + sep$1) || isAbsolute$1(rel)) {
          return undefined
        }
      }
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
            let map = this.loadFile(prevPath, file, true);
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
        let unknown = this.loadFile(map, file, false);
        if (unknown) {
          try {
            /* c8 ignore next 4 */
            this.json = JSON.parse(unknown.replace(/^\)]}'[^\n]*\n/, ''));
          } catch {
            return undefined
          }
        }
        return unknown
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
  let { isAbsolute, resolve: resolve$2 } = require$$5;
  let { SourceMapConsumer: SourceMapConsumer$1, SourceMapGenerator: SourceMapGenerator$1 } = sourceMap;
  let { fileURLToPath, pathToFileURL: pathToFileURL$1 } = url;

  let CssSyntaxError$1 = cssSyntaxError;
  let PreviousMap$1 = previousMap;
  let terminalHighlight = require$$6;

  let lineToIndexCache = Symbol('lineToIndexCache');

  let sourceMapAvailable$1 = Boolean(SourceMapConsumer$1 && SourceMapGenerator$1);
  let pathAvailable$1 = Boolean(resolve$2 && isAbsolute);

  function getLineToIndex(input) {
    if (input[lineToIndexCache]) return input[lineToIndexCache]
    let lines = input.css.split('\n');
    let lineToIndex = new Array(lines.length);
    let prevIndex = 0;

    for (let i = 0, l = lines.length; i < l; i++) {
      lineToIndex[i] = prevIndex;
      prevIndex += lines[i].length + 1;
    }

    input[lineToIndexCache] = lineToIndex;
    return lineToIndex
  }

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
      let endColumn, endLine, endOffset, offset, result;

      if (line && typeof line === 'object') {
        let start = line;
        let end = column;
        if (typeof start.offset === 'number') {
          offset = start.offset;
          let pos = this.fromOffset(offset);
          line = pos.line;
          column = pos.col;
        } else {
          line = start.line;
          column = start.column;
          offset = this.fromLineAndColumn(line, column);
        }
        if (typeof end.offset === 'number') {
          endOffset = end.offset;
          let pos = this.fromOffset(endOffset);
          endLine = pos.line;
          endColumn = pos.col;
        } else {
          endLine = end.line;
          endColumn = end.column;
          endOffset = this.fromLineAndColumn(end.line, end.column);
        }
      } else if (!column) {
        offset = line;
        let pos = this.fromOffset(offset);
        line = pos.line;
        column = pos.col;
      } else {
        offset = this.fromLineAndColumn(line, column);
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

      result.input = {
        column,
        endColumn,
        endLine,
        endOffset,
        line,
        offset,
        source: this.css
      };
      if (this.file) {
        if (pathToFileURL$1) {
          result.input.url = pathToFileURL$1(this.file).toString();
        }
        result.input.file = this.file;
      }

      return result
    }

    fromLineAndColumn(line, column) {
      let lineToIndex = getLineToIndex(this);
      let index = lineToIndex[line - 1];
      return index + column - 1
    }

    fromOffset(offset) {
      let lineToIndex = getLineToIndex(this);
      let lastLine = lineToIndex[lineToIndex.length - 1];

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

      let from = consumer.originalPositionFor({ column: column - 1, line });
      if (!from.source) return false

      let to;
      if (typeof endLine === 'number') {
        let toPosition = consumer.originalPositionFor({
          column: endColumn - 1,
          line: endLine
        });
        // The source map may not have a mapping that covers the end position
        // (`originalPositionFor()` then returns `null` for `line`/`column`
        // instead of omitting them). Treat that the same as not requesting
        // an end position at all, so `endLine`/`endColumn` stay a consistent
        // `undefined` pair instead of a mix of `null` and a bogus number.
        if (toPosition.source) to = toPosition;
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
        column: from.column + 1,
        endColumn: to && to.column + 1,
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

  let Container$5 = container;

  let LazyResult$3, Processor$5;

  let Root$5 = class Root extends Container$5 {
    constructor(defaults) {
      super(defaults);
      this.type = 'root';
      if (!this.nodes) this.nodes = [];
    }

    normalize(child, sample, type) {
      let keepBefore = new Set();
      for (let node of Array.isArray(child) ? child : [child]) {
        if (
          node &&
          typeof node === 'object' &&
          !node.parent &&
          node.raws &&
          typeof node.raws.before !== 'undefined'
        ) {
          keepBefore.add(node.raws);
        }
      }

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
            if (!keepBefore.has(node.raws)) {
              node.raws.before = sample.raws.before;
            }
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

  Container$5.registerRoot(Root$5);

  let list$8 = {
    comma(string) {
      return list$8.split(string, [','], true)
    },

    space(string) {
      let spaces = [' ', '\n', '\t'];
      return list$8.split(string, spaces)
    },

    split(string, separators, last) {
      if (typeof string !== 'string') return []
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
          let value = current.trim();
          if (last || value !== '') array.push(value);
          current = '';
          split = false;
        } else {
          current += letter;
        }
      }

      let value = current.trim();
      if (last || value !== '') array.push(value);
      return array
    }
  };

  var list_1 = list$8;
  list$8.default = list$8;

  let Container$4 = container;
  let list$7 = list_1;

  let Rule$3 = class Rule extends Container$4 {
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

  Container$4.registerRule(Rule$3);

  let AtRule$4 = atRule$1;
  let Comment$2 = comment;
  let Declaration$M = declaration$1;
  let Input$3 = input;
  let PreviousMap = previousMap;
  let Root$4 = root;
  let Rule$2 = rule;

  function hydrateInputs(json, inputs) {
    if (!json.inputs) return inputs
    return json.inputs.map(input => {
      let inputHydrated = { ...input, __proto__: Input$3.prototype };
      if (inputHydrated.map) {
        inputHydrated.map = {
          ...inputHydrated.map,
          __proto__: PreviousMap.prototype
        };
      }
      return inputHydrated
    })
  }

  function constructNode(json, inputs, children) {
    let defaults = { ...json };
    delete defaults.inputs;
    delete defaults.nodes;
    if (defaults.source) {
      let { inputId, ...source } = defaults.source;
      defaults.source = source;
      if (inputId != null) {
        defaults.source.input = inputs[inputId];
      }
    }

    let node;
    if (defaults.type === 'root') {
      node = new Root$4(defaults);
    } else if (defaults.type === 'decl') {
      node = new Declaration$M(defaults);
    } else if (defaults.type === 'rule') {
      node = new Rule$2(defaults);
    } else if (defaults.type === 'comment') {
      node = new Comment$2(defaults);
    } else if (defaults.type === 'atrule') {
      node = new AtRule$4(defaults);
    } else {
      throw new Error('Unknown node type: ' + json.type)
    }

    // Rehydrated children are attached after construction. Passing them
    // through the container constructor would re-run insertion spacing
    // normalization and overwrite each child's own `raws.before`.
    if (children) {
      node.nodes = children;
      for (let child of children) child.parent = node;
    }

    return node
  }

  function fromJSON$1(json, inputs) {
    if (Array.isArray(json)) return json.map(n => fromJSON$1(n))

    // An explicit stack instead of recursive calls to survive deeply
    // nested trees. Children are rehydrated before their parent node
    // is constructed.
    let result;
    let stack = [
      { childIndex: 0, children: [], inputs: hydrateInputs(json, inputs), json }
    ];

    while (stack.length > 0) {
      let frame = stack[stack.length - 1];
      let jsonNodes = frame.json.nodes;

      if (jsonNodes && frame.childIndex < jsonNodes.length) {
        let childJson = jsonNodes[frame.childIndex];
        frame.childIndex += 1;
        stack.push({
          childIndex: 0,
          children: [],
          inputs: hydrateInputs(childJson, frame.inputs),
          json: childJson
        });
        continue
      }

      stack.pop();
      let node = constructNode(
        frame.json,
        frame.inputs,
        jsonNodes ? frame.children : undefined
      );
      if (stack.length > 0) {
        stack[stack.length - 1].children.push(node);
      } else {
        result = node;
      }
    }

    return result
  }

  var fromJSON_1 = fromJSON$1;
  fromJSON$1.default = fromJSON$1;

  let { dirname, relative, resolve: resolve$1, sep } = require$$5;
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
        let annotation = '/*# sourceMappingURL=';
        let startIndex;
        while ((startIndex = this.css.lastIndexOf(annotation)) !== -1) {
          let endIndex = this.css.indexOf('*/', startIndex + annotation.length);
          if (endIndex === -1) break
          while (startIndex > 0 && this.css[startIndex - 1] === '\n') {
            startIndex--;
          }
          this.css = this.css.slice(0, startIndex) + this.css.slice(endIndex + 2);
        }
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
  const SPACE$1 = ' '.charCodeAt(0);
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
    let lastBadParen = -1;

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
        case SPACE$1:
        case TAB:
        case CR:
        case FEED: {
          next = pos;
          do {
            next += 1;
            code = css.charCodeAt(next);
          } while (
            code === SPACE$1 ||
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
            n !== SPACE$1 &&
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
          } else if (pos <= lastBadParen) {
            currentToken = ['(', '(', pos];
          } else {
            next = css.indexOf(')', pos + 1);
            content = css.slice(pos, next + 1);

            if (next === -1 || RE_BAD_BRACKET.test(content)) {
              lastBadParen = next === -1 ? length : next;
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
            code !== SPACE$1 &&
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
              if (css.charCodeAt(next + 1) === SPACE$1) {
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

  function tokensToString(tokens, from, to) {
    let result = '';
    for (let i = from; i < to; i++) result += tokens[i][1];
    return result
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
      // If the token is a word, e.g. `!important`, `red` or any other valid
      // property's value. Then we need to return the colon after that word
      // token. [3] is the "end" colon of that word. And because we need it
      // after that one we do +1 to get the next one.
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
      if (!text.trim()) {
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

      let start = 0;
      while (tokens[start][0] !== 'word') {
        if (start === tokens.length - 1) this.unknownWord([tokens[start]]);
        start++;
      }
      node.raws.before += tokensToString(tokens, 0, start);
      node.source.start = this.getPosition(tokens[start][2]);

      let propStart = start;
      while (start < tokens.length) {
        let type = tokens[start][0];
        if (type === ':' || type === 'space' || type === 'comment') {
          break
        }
        start++;
      }
      node.prop = tokensToString(tokens, propStart, start);

      let betweenStart = start;
      let token;
      while (start < tokens.length) {
        token = tokens[start];
        start++;
        if (token[0] === ':') break
        if (token[0] === 'word' && /\w/.test(token[1])) {
          this.unknownWord([token]);
        }
      }
      node.raws.between = tokensToString(tokens, betweenStart, start);

      if (node.prop[0] === '_' || node.prop[0] === '*') {
        node.raws.before += node.prop[0];
        node.prop = node.prop.slice(1);
      }

      let firstSpacesStart = start;
      while (start < tokens.length) {
        let next = tokens[start][0];
        if (next !== 'space' && next !== 'comment') break
        start++;
      }
      let firstSpaces = tokens.slice(firstSpacesStart, start);

      tokens = tokens.slice(start);

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
          // `ownSemicolon` also holds the spaces before the semicolon, but
          // the position above is the semicolon itself, so the node ends
          // right after it.
          prev.source.end = this.getPosition(token[2]);
          prev.source.end.offset++;
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

  let Container$3 = container;
  let Input$1 = input;
  let Parser = parser$4;

  function parse$8(css, opts) {
    let input = new Input$1(css, opts);
    let parser = new Parser(input);
    try {
      parser.parse();
    } catch (e) {
      if (process$1.env.NODE_ENV !== 'production') {
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

  Container$3.registerParse(parse$8);

  let Container$2 = container;
  let { my: my$1 } = symbols;

  let Warning$2 = class Warning {
    constructor(text, opts = {}) {
      this.type = 'warning';
      this.text = text;

      if (opts.node && opts.node.source) {
        if (!opts.node[my$1]) {
          // The node comes from another PostCSS copy in node_modules, so it does
          // not have this copy’s methods. Container#normalize() rebuilds such
          // nodes on insert, but a node passed straight to Result#warn() never
          // goes through it.
          Container$2.rebuild(opts.node);
        }
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
      this.css = '';
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
    let stack = [node];
    while (stack.length > 0) {
      let next = stack.pop();
      next[isClean] = false;
      if (next.nodes) {
        for (let i of next.nodes) stack.push(i);
      }
    }
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
          if (process$1.env.NODE_ENV !== 'production') {
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

      let rootSource = this.result.root.source;
      if (
        opts.map === undefined &&
        !(rootSource && rootSource.input && rootSource.input.map)
      ) {
        let result = '';
        str(this.result.root, i => {
          result += i;
        });
        this.result.css = result;
        return this.result
      }

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
      if (process$1.env.NODE_ENV !== 'production') {
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
        // Advance past the child we just finished visiting. Like
        // `Container#each`, the index is incremented only after a child has
        // been fully processed, so a node inserted right after the current
        // child is not skipped by the `existIndex < index` adjustment in
        // `Container#insertAfter()` (which would fire exit events too early).
        if (visit.descending) {
          visit.descending = false;
          node.indexes[iterator] += 1;
        }
        let child;
        while ((child = node.nodes[node.indexes[iterator]])) {
          if (!child[isClean]) {
            child[isClean] = true;
            visit.descending = true;
            stack.push(toStack(child));
            return
          }
          node.indexes[iterator] += 1;
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
      // An explicit stack like in async `visitTick()` to survive deeply
      // nested trees. Unlike `visitTick()`, nodes are marked clean only
      // on entering, so a node dirtied by its own visitors is revisited
      // on the next pass.
      node[isClean] = true;
      let stack = [{ eventIndex: 0, events: getEvents(node), iterator: 0, node }];

      while (stack.length > 0) {
        let visit = stack[stack.length - 1];
        let visitNode = visit.node;

        if (visit.iterator !== 0) {
          let iterator = visit.iterator;
          // Advance past the child we just finished visiting. Like
          // `Container#each`, the index is incremented only after a child has
          // been fully processed. Incrementing before (as this loop used to)
          // makes a node inserted right after the current child get skipped by
          // the `existIndex < index` adjustment in `Container#insertAfter()`,
          // which fires exit events before those new siblings are visited.
          if (visit.descending) {
            visit.descending = false;
            visitNode.indexes[iterator] += 1;
          }
          let child;
          let descended = false;
          while ((child = visitNode.nodes[visitNode.indexes[iterator]])) {
            if (!child[isClean]) {
              child[isClean] = true;
              visit.descending = true;
              stack.push({
                eventIndex: 0,
                events: getEvents(child),
                iterator: 0,
                node: child
              });
              descended = true;
              break
            }
            visitNode.indexes[iterator] += 1;
          }
          if (descended) continue
          visit.iterator = 0;
          delete visitNode.indexes[iterator];
        }

        if (visit.eventIndex < visit.events.length) {
          let event = visit.events[visit.eventIndex];
          visit.eventIndex += 1;
          if (event === CHILDREN) {
            if (visitNode.nodes && visitNode.nodes.length) {
              visit.iterator = visitNode.getIterator();
            }
          } else {
            let visitors = this.listeners[event];
            if (visitors) {
              if (this.visitSync(visitors, visitNode.toProxy())) stack.pop();
            }
          }
          continue
        }

        stack.pop();
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
  let Result$1 = result$1;
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

      let str = stringify$3;
      this.result = new Result$1(this._processor, undefined, this._opts);
      this.result.css = css;

      let self = this;
      Object.defineProperty(this.result, 'root', {
        get() {
          return self.root
        }
      });

      let map = new MapGenerator(str, undefined, this._opts, css);
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
      if (process$1.env.NODE_ENV !== 'production') {
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
      this.version = '8.5.28';
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
          if (process$1.env.NODE_ENV !== 'production') {
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
        if (process$1.env.LANG && process$1.env.LANG.startsWith('zh')) {
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

  var dist = {};

  "function"==typeof SuppressedError&&SuppressedError;const n=(n,a)=>{if(n===a)return 0;const[e=0,u=0]=n.split(".",2).map(Number),[s=0,o=0]=a.split(".",2).map(Number);if(isNaN(e)||isNaN(u))throw new Error(`Invalid version: ${n}`);if(isNaN(s)||isNaN(o))throw new Error(`Invalid version: ${a}`);return e!==s?e>s?1:-1:u!==o?u>o?1:-1:0},a={c:{longName:"chrome"},ca:{longName:"chrome_android"},e:{longName:"edge"},f:{longName:"firefox"},fa:{longName:"firefox_android"},s:{longName:"safari"},si:{longName:"safari_ios"},o:{longName:"opera",engine:"Blink"},oa:{longName:"opera_android",engine:"Blink"},sa:{longName:"samsunginternet_android",engine:"Blink"},wva:{longName:"webview_android",engine:"Blink"},y:{longName:"ya_android",engine:"Blink"},u:{longName:"uc_android",engine:"Blink"},q:{longName:"qq_android",engine:"Blink"},k:{longName:"kai_os",engine:"Gecko"},fb:{longName:"facebook_android",engine:"Blink"},ia:{longName:"instagram_android",engine:"Blink"}},e=n=>6===n.length&&/^\d{6}$/.test(n)?`20${n.slice(0,2)}-${n.slice(2,4)}-${n.slice(4,6)}`:8===n.length&&/^\d{8}$/.test(n)?`${n.slice(0,4)}-${n.slice(4,6)}-${n.slice(6,8)}`:n,u={},s={};let o="",f$1=!1;"pre_baseline\nc,1,081211\nc,2,090521\nc,3,090915\nc,4,100125\nc,5,100525\nc,6,100902\nc,7,101019\nc,8,101202\nc,9,110203\nc,10,110308\nc,11,110427\nc,12,110607\nc,13,110802\nc,14,110916\nc,15,111025\nc,16,111213\nc,17,120208\nc,18,120328\nc,19,120515\nc,20,120626\nc,21,120731\nc,22,120925\nc,23,121106\nc,24,130110\nc,25,130221\nc,26,130326\nc,27,130521\nc,28,130709\nc,29,130820\nc,30,131001\nc,31,131112\nc,32,140114\nc,33,140220\nc,34,140408\nc,35,140520\nc,36,140716\nc,37,140826\nc,38,141007\nc,39,141118\nc,40,150121\nc,41,150303\nc,42,150414\nc,43,150519\nc,44,150721\nca,18,120627\nca,25,130227\nca,26,130403\nca,27,130522\nca,28,130710\nca,29,130821\nca,30,131002\nca,31,131114\nca,32,140115\nca,33,140226\nca,34,140402\nca,35,140520\nca,36,140716\nca,37,140903\nca,38,141008\nca,39,141112\nca,40,150121\nca,41,150311\nca,42,150415\nca,43,150527\nf,1,041109\nf,1.5,051129\nf,2,061024\nf,3,080617\nf,3.5,090630\nf,3.6,100121\nf,4,110322\nf,5,110621\nf,6,110816\nf,7,110927\nf,8,111108\nf,9,111220\nf,10,120131\nf,11,120313\nf,12,120424\nf,13,120605\nf,14,120717\nf,15,120828\nf,16,121009\nf,17,121120\nf,18,130108\nf,19,130219\nf,20,130402\nf,21,130514\nf,22,130625\nf,23,130806\nf,24,130917\nf,25,131029\nf,26,131210\nf,27,140204\nf,28,140318\nf,29,140429\nf,30,140610\nf,31,140722\nf,32,140902\nf,33,141014\nf,34,141201\nf,35,150113\nf,36,150224\nf,37,150331\nf,38,150512\nf,39,150702\nfa,4,110329\nfa,5,110621\nfa,6,110816\nfa,7,110927\nfa,8,111108\nfa,9,111221\nfa,10,120131\nfa,14,120626\nfa,15,120828\nfa,16,121009\nfa,17,121120\nfa,18,130108\nfa,19,130219\nfa,20,130402\nfa,21,130514\nfa,22,130625\nfa,23,130806\nfa,24,130917\nfa,25,131029\nfa,26,131210\nfa,27,140204\nfa,28,140318\nfa,29,140429\nfa,30,140610\nfa,31,140722\nfa,32,140902\nfa,33,141014\nfa,34,141201\nfa,35,150113\nfa,36,150227\nfa,37,150331\nfa,38,150512\nfa,39,150702\ns,1,030623\ns,1.1,031024\ns,1.2,040202\ns,1.3,050415\ns,2,050429\ns,3,071026\ns,3.1,080318\ns,4,090608\ns,5,100607\ns,5.1,110720\ns,6,120725\ns,7,131022\ns,8,141016\nsi,1,070629\nsi,2,080711\nsi,3,090617\nsi,3.2,100403\nsi,4,100621\nsi,4.2,101122\nsi,5,111012\nsi,6,120910\nsi,7,130918\nsi,8,140917\n20150729\nc,38,141007\nca,38,141008\ne,12,150729\nf,38,150512\nfa,38,150512\ns,11,170919\nsi,11,170919\no,25,141015,38\noa,25,141016,38\nsa,3.0,150410,38\nwva,38,141008,38\ny,14.12,u,38\nu,11.1,u,40\nq,8.1,u,57\nk,2.0,170701,48\nfb,66,u,48\nia,23,u,62\n20150922\nf,41,150922\nfa,41,150922\n20150930\nc,44,150721\nca,44,150729\no,31,150804,44\noa,32,150923,45\nsa,4.0,160311,44\nwva,44,150729,44\ny,15.9,u,44\nu,11.6,u,57\n20151112\ne,13,151112\n20151231\nc,44,150721\nca,44,150729\ne,13,151112\nf,41,150922\nfa,41,150922\ns,11,170919\nsi,11,170919\no,31,150804,44\noa,32,150923,45\nsa,4.0,160311,44\nwva,44,150729,44\ny,15.9,u,44\nu,11.6,u,57\nq,8.1,u,57\nk,2.0,170701,48\nfb,66,u,48\nia,23,u,62\n20160308\nf,45,160308\nfa,45,160308\n20160607\nf,47,160607\nfa,47,160607\n20160802\ne,14,160802\n20160907\nc,53,160831\nca,53,160907\no,40,160920,53\noa,41,161025,54\nsa,6.0,170823,56\nwva,53,160907,53\ny,16.10,u,53\nfb,95,u,53\n20160920\nf,49,160920\nfa,49,160920\nk,3.0,210901,84\n20161231\nc,53,160831\nca,53,160907\ne,14,160802\nf,49,160920\nfa,49,160920\ns,11,170919\nsi,11,170919\no,40,160920,53\noa,41,161025,54\nsa,6.0,170823,56\nwva,53,160907,53\ny,16.10,u,53\nu,11.6,u,57\nq,8.1,u,57\nk,3.0,210901,84\nfb,95,u,53\nia,23,u,62\n20170201\nc,56,170125\nca,56,170201\nf,50,161115\nfa,50,161115\no,43,170207,56\noa,43,170927,59\nwva,56,170201,56\ny,17.3,u,56\nfb,112,u,56\n20170307\nf,52,170307\nfa,52,170307\n20170316\nca,57,170316\n20170405\nc,57,170309\ne,15,170405\no,44,170321,57\nsa,7.0,180316,59\nwva,57,170316,57\ny,17.4,u,57\nfb,117,u,57\n20170419\nf,53,170419\nfa,53,170419\n20170928\nfa,56,170928\n20171017\ne,16,171017\n20171024\nc,62,171017\nca,62,171024\no,49,171108,62\noa,46,180514,63\nsa,8.0,180718,63\nwva,62,171024,62\ny,17.11,u,62\nu,13.3,200909,78\nq,9.6,u,66\nfb,149,u,62\n20171128\nfa,57,171128\n20171231\nc,62,171017\nca,62,171024\ne,16,171017\nf,53,170419\nfa,57,171128\ns,11,170919\nsi,11,170919\no,49,171108,62\noa,46,180514,63\nsa,8.0,180718,63\nwva,62,171024,62\ny,17.11,u,62\nu,13.3,200909,78\nq,9.6,u,66\nk,3.0,210901,84\nfb,149,u,62\nia,23,u,62\n20180412\ns,11.1,180412\nsi,11.3,180329\n20180430\ne,17,180430\n20180509\nc,66,180417\nca,66,180417\nf,60,180509\nfa,60,180509\no,53,180510,66\noa,47,180723,66\nsa,9.0,180915,67\nwva,66,180417,66\ny,18.6,u,66\nfb,169,u,66\nia,42,u,66\n20180905\nf,62,180905\nfa,62,180905\n20181002\ne,18,181002\n20181023\nf,63,181023\nfa,63,181023\n20181211\nf,64,181211\nfa,64,181211\n20181231\nc,66,180417\nca,66,180417\ne,18,181002\nf,64,181211\nfa,64,181211\ns,11.1,180412\nsi,11.3,180329\no,53,180510,66\noa,47,180723,66\nsa,9.0,180915,67\nwva,66,180417,66\ny,18.6,u,66\nu,13.3,200909,78\nq,9.6,u,66\nk,3.0,210901,84\nfb,169,u,66\nia,42,u,66\n20190129\nf,65,190129\nfa,65,190129\n20190325\ns,12.1,190325\nsi,12.2,190325\n20190919\ns,13,190919\nsi,13,190919\n20191231\nc,66,180417\nca,66,180417\ne,18,181002\nf,65,190129\nfa,65,190129\ns,13,190919\nsi,13,190919\no,53,180510,66\noa,47,180723,66\nsa,9.0,180915,67\nwva,66,180417,66\ny,18.6,u,66\nu,13.3,200909,78\nq,9.6,u,66\nk,3.0,210901,84\nfb,169,u,66\nia,42,u,66\n20200115\nc,76,190730\nca,76,190730\ne,79,200115\nf,68,190709\nfa,68,190709\no,63,190820,76\noa,54,191018,76\nsa,12.0,200619,79\nwva,76,190730,76\ny,19.9,u,76\nq,10.9,201122,77\nfb,233,u,76\nia,96,u,80\n20200204\nc,80,200204\nca,80,200204\no,67,200303,80\noa,57,200330,80\nsa,13.0,201202,83\nwva,80,200204,80\ny,20.3,u,80\nu,15.3,230317,100\nq,11.7,211102,89\nfb,256,u,80\n20200207\ne,80,200207\n20200324\ns,13.1,200324\nsi,13.4,200324\n20200413\nc,81,200407\nca,81,200407\ne,81,200413\no,68,200422,81\noa,58,200513,81\nwva,81,200407,81\ny,20.4,u,81\nfb,266,u,81\nia,137,u,81\n20200727\nc,84,200727\nca,84,200727\ne,84,200716\no,70,200727,84\noa,60,200923,85\nsa,14.0,210417,87\nwva,84,200727,84\ny,20.8,200902,84\nfb,297,201202,86\nia,153,u,84\n20200728\nf,78,200630\nfa,79,200728\n20200827\nc,85,200825\nca,85,200825\ne,85,200827\no,71,200915,85\nwva,85,200825,85\ny,20.9,200927,85\nia,163,u,92\n20200916\nf,79,200728\ns,14,200916\nsi,14,200916\n20201020\nc,86,201020\nca,86,201020\ne,86,201009\no,72,201021,86\noa,61,201207,86\nwva,86,201020,86\ny,20.11,201111,86\n20201117\nf,83,201117\nfa,83,201117\n20201119\nc,87,201117\nca,87,201117\ne,87,201119\no,73,201209,87\noa,62,210216,87\nwva,87,201117,87\ny,20.12,201220,87\nfb,348,211219,96\n20201231\nc,87,201117\nca,87,201117\ne,87,201119\nf,83,201117\nfa,83,201117\ns,14,200916\nsi,14,200916\no,73,201209,87\noa,62,210216,87\nsa,14.0,210417,87\nwva,87,201117,87\ny,20.12,201220,87\nu,15.3,230317,100\nq,11.7,211102,89\nk,3.0,210901,84\nfb,348,211219,96\nia,163,u,92\n20210121\nc,88,210119\nca,88,210119\ne,88,210121\nf,84,201215\nfa,84,201215\no,74,210202,88\noa,63,210416,89\nsa,15.0,210813,90\nwva,88,210119,88\ny,21.1,211231,88\n20210126\nf,85,210126\nfa,85,210126\nk,4.0,250501,123\n20210426\nc,89,210302\nca,89,210302\ne,89,210304\nf,86,210223\nfa,86,210223\ns,14.1,210426\nsi,14.5,210426\no,75,210324,89\nwva,89,210302,89\ny,21.3,210404,89\n20210810\nf,91,210810\nfa,91,210810\n20210902\ne,93,210902\n20210907\nf,92,210907\nfa,92,210907\n20210920\nc,93,210831\nca,93,210831\ns,15,210920\nsi,15,210920\no,79,210914,93\noa,66,211215,94\nsa,17.0,220504,96\nwva,93,210831,93\ny,21.9,210929,93\nq,13.4,230426,98\nia,258,221104,106\n20211005\nf,93,211005\nfa,93,211005\n20211025\ns,15.1,211025\nsi,15.1,211025\n20211102\nf,94,211102\nfa,94,211102\n20211119\nc,96,211115\nca,96,211115\ne,96,211119\no,82,211202,96\noa,67,220131,96\nwva,96,211115,96\ny,22.1,211231,96\n20211207\nf,95,211207\n20211213\ns,15.2,211213\nsi,15.2,211213\n20211231\nc,96,211115\nca,96,211115\ne,96,211119\nf,95,211207\nfa,94,211102\ns,15.2,211213\nsi,15.2,211213\no,82,211202,96\noa,67,220131,96\nsa,17.0,220504,96\nwva,96,211115,96\ny,22.1,211231,96\nu,15.3,230317,100\nq,13.4,230426,98\nk,4.0,250501,123\nfb,348,211219,96\nia,258,221104,106\n20220106\nc,97,220104\nca,97,220104\ne,97,220106\no,83,220119,97\noa,68,220330,99\nsa,18.0,220808,99\nwva,97,220104,97\ny,22.3,220325,98\nfb,399,230204,109\n20220203\nc,98,220201\nca,98,220201\ne,98,220203\nf,96,220111\nfa,96,220111\no,84,220216,98\nwva,98,220201,98\n20220303\nc,99,220301\nca,99,220301\ne,99,220303\no,85,220323,99\nwva,99,220301,99\ny,22.5,220520,100\nq,14.2,231014,109\n20220314\nf,98,220308\nfa,98,220308\ns,15.4,220314\nsi,15.4,220314\n20220428\nc,101,220426\nca,101,220426\ne,101,220428\no,87,220517,101\noa,70,220629,102\nsa,19.0,221101,102\nwva,101,220426,101\ny,22.7,220707,102\nu,17.6,250515,123\n20220503\nf,100,220503\nfa,100,220503\n20220531\nf,101,220531\nfa,101,220531\n20220628\nf,102,220628\nfa,102,220628\n20220726\nf,103,220726\nfa,103,220726\n20220805\nc,104,220802\nca,104,220802\ne,104,220805\no,90,220818,104\noa,71,220916,104\nsa,20.0,230210,106\nwva,104,220802,104\ny,22.8,u,104\n20220823\nf,104,220823\nfa,104,220823\n20220902\nc,105,220902\nca,105,220902\ne,105,220901\ns,15.6,220720\nsi,15.6,220720\no,91,220914,105\noa,72,221021,106\nwva,105,220902,105\ny,22.11,221111,106\n20220912\ns,16,220912\nsi,16,220912\n20221003\nc,106,220927\nca,106,220927\ne,106,221003\no,92,221019,106\nwva,106,220927,106\n20221027\nc,107,221025\nca,107,221025\ne,107,221027\no,93,221117,107\noa,73,230117,108\nsa,21.0,230519,110\nwva,107,221025,107\ny,23.1,230110,108\nia,279,231231,109\n20221115\nf,107,221115\nfa,107,221115\n20221205\nc,108,221129\nca,108,221129\ne,108,221205\no,94,221215,108\nwva,108,221129,108\n20221213\nf,108,221213\nfa,108,221213\n20221231\nc,108,221129\nca,108,221129\ne,108,221205\nf,108,221213\nfa,108,221213\ns,16,220912\nsi,16,220912\no,94,221215,108\noa,73,230117,108\nsa,21.0,230519,110\nwva,108,221129,108\ny,23.1,230110,108\nu,17.6,250515,123\nq,14.2,231014,109\nk,4.0,250501,123\nfb,399,230204,109\nia,279,231231,109\n20230112\nc,109,230110\nca,109,230110\ne,109,230112\no,95,230201,109\noa,74,230313,110\nwva,109,230110,109\ny,23.3,230326,110\n20230214\nf,110,230214\nfa,110,230214\n20230313\nc,111,230307\nca,111,230307\ne,111,230313\no,97,230322,111\noa,75,230517,112\nsa,22.0,230714,111\nwva,111,230301,111\ny,23.5,230519,112\nq,19.1,250708,121\nfb,420,230628,114\nia,288,u,114\n20230314\nf,111,230314\nfa,111,230314\n20230327\ns,16.4,230327\nsi,16.4,230327\n20230411\nf,112,230411\nfa,112,230411\n20230509\nf,113,230509\nfa,113,230509\n20230606\nf,114,230606\nfa,114,230606\n20230704\nc,112,230404\nca,112,230404\ne,112,230406\nf,115,230704\nfa,115,230704\no,98,230420,112\nsa,23.0,231018,115\nwva,112,230404,112\n20230721\nc,115,230718\nca,115,230721\ne,115,230721\no,101,230726,115\noa,77,230831,115\nwva,115,230721,115\ny,23.9,230913,116\nfb,430,230903,116\nia,292,u,115\n20230801\nf,116,230801\nfa,116,230801\n20230915\nc,117,230912\nca,117,230912\ne,117,230915\no,103,231003,117\noa,78,231023,117\nsa,24.0,240125,117\nwva,117,230912,117\ny,23.11,231115,118\nfb,434,231005,117\nia,302,u,117\n20230918\ns,17,230918\nsi,17,230918\n20231013\nc,118,231010\nca,118,231010\ne,118,231013\nf,118,230926\nfa,118,230926\no,104,231023,118\noa,79,231206,119\nsa,25.0,240424,121\nwva,118,231010,118\nfb,437,u,118\nia,306,240117,118\n20231024\nf,119,231024\nfa,119,231024\n20231102\nc,119,231031\nca,119,231031\ne,119,231102\no,105,231114,119\nwva,119,231031,119\ny,24.1,240118,120\nfb,439,231111,119\nia,309,u,119\n20231121\nf,120,231121\nfa,120,231121\n20231205\nca,120,231205\n20231207\nc,120,231205\ne,120,231207\no,106,231219,120\noa,80,240125,120\nwva,120,231205,120\nfb,443,231207,120\nia,311,u,120\n20231211\ns,17.2,231211\nsi,17.2,231211\n20231219\nf,121,231219\nfa,121,231219\n20231231\nc,120,231205\nca,120,231205\ne,120,231207\nf,121,231219\nfa,121,231219\ns,17.2,231211\nsi,17.2,231211\no,106,231219,120\noa,80,240125,120\nsa,25.0,240424,121\nwva,120,231205,120\ny,24.1,240118,120\nu,17.6,250515,123\nq,19.1,250708,121\nk,4.0,250501,123\nfb,443,231207,120\nia,311,u,120\n20240123\nf,122,240123\nfa,122,240123\n20240125\nc,121,240123\nca,121,240123\ne,121,240125\no,107,240207,121\noa,81,240314,122\nwva,121,240123,121\ny,24.4,240327,122\nfb,448,240129,121\nia,317,240203,121\n20240220\nf,123,240220\nfa,123,240220\n20240305\ns,17.4,240305\nsi,17.4,240305\n20240319\nf,124,240319\nfa,124,240319\n20240322\nc,123,240319\nca,123,240319\ne,123,240322\no,109,240327,123\noa,82,240502,124\nsa,27.0,241106,125\nwva,123,240319,123\ny,24.6,240604,124\nfb,465,240707,126\nia,338,240706,126\n20240416\nf,125,240416\nfa,125,240416\n20240418\nc,124,240416\nca,124,240416\ne,124,240418\no,110,240514,124\nwva,124,240416,124\n20240513\ns,17.5,240513\nsi,17.5,240513\n20240514\nf,126,240514\nfa,126,240514\n20240517\nc,125,240514\nca,125,240514\ne,125,240517\no,111,240612,125\noa,83,240625,126\nwva,125,240514,125\ny,24.7,240718,126\n20240611\nf,127,240611\nfa,127,240611\n20240709\nf,128,240709\nfa,128,240709\n20240725\nc,127,240723\nca,127,240723\ne,127,240725\no,113,240822,127\noa,84,240826,127\nsa,28.0,250402,130\nwva,127,240723,127\ny,24.10,241011,128\nfb,474,240730,127\nia,346,240901,127\n20240806\nf,129,240806\nfa,129,240806\n20240903\nf,130,240903\nfa,130,240903\n20240916\ns,18,240916\nsi,18,240916\n20241001\nf,131,241001\nfa,131,241001\n20241017\nc,130,241015\nca,130,241015\ne,130,241017\no,115,241127,130\noa,86,241202,130\nwva,130,241015,130\ny,24.12,241130,130\nfb,486,241018,130\nia,355,241106,130\n20241029\nf,132,241029\nfa,132,241029\n20241211\ns,18.2,241211\nsi,18.2,241211\n20241231\nc,130,241015\nca,130,241015\ne,130,241017\nf,132,241029\nfa,132,241029\ns,18.2,241211\nsi,18.2,241211\no,115,241127,130\noa,86,241202,130\nsa,28.0,250402,130\nwva,130,241015,130\ny,24.12,241130,130\nfb,486,241018,130\nia,355,241106,130\n20250107\nf,134,250107\nfa,134,250107\n20250127\nsi,18.3,250127\n20250304\nf,136,250304\nfa,136,250304\n20250331\ns,18.4,250331\nsi,18.4,250331\n20250401\nc,133,250204\nca,133,250204\ne,133,250206\nf,137,250401\nfa,137,250401\no,118,250415,133\noa,88,250319,134\nsa,29.0,251025,136\nwva,133,250204,133\ny,25.4,250423,134\nfb,503,250312,134\nia,378,250503,135\n20250404\nc,135,250401\nca,135,250401\ne,135,250404\no,120,250702,135\noa,89,250429,135\nwva,135,250401,135\ny,25.6,250904,136\nfb,514,250528,136\n20250429\nf,138,250429\nfa,138,250429\n20250501\nc,136,250429\nca,136,250429\ne,136,250501\no,121,250827,137\noa,90,250618,137\nwva,136,250429,136\nia,381,250619,137\n20250512\nsi,18.5,250512\n20250527\nf,139,250527\nfa,139,250527\n20250529\nc,137,250527\nca,137,250527\ne,137,250529\nwva,137,250527,137\ny,25.8,250830,138\nfb,515,250531,137\n20250626\nc,138,250624\nca,138,250624\ne,138,250626\no,122,250911,138\noa,91,250819,139\nwva,138,250624,138\nia,390,250726,138\n20250819\nf,142,250819\nfa,142,250819\n20250905\nc,140,250902\nca,140,250902\ne,140,250905\no,124,251113,140\noa,92,251008,140\nwva,140,250902,140\ny,25.10,251009,140\nia,399,250928,140\n20250915\ns,26,250915\nsi,26,250915\n20250916\nf,143,250916\nfa,143,250916\n20251003\nc,141,250930\nca,141,250930\ne,141,251003\no,125,251204,141\noa,93,251125,142\nwva,141,250930,141\ny,25.12,251207,142\nia,400,251006,141\n20251014\nf,144,251014\nfa,144,251014\n20251111\nf,145,251111\nfa,145,251111\n20251212\ns,26.2,251212\nsi,26.2,251212\n20251231\nc,141,250930\nca,141,250930\ne,141,251003\nf,145,251111\nfa,145,251111\ns,26.2,251212\nsi,26.2,251212\no,125,251204,141\noa,93,251125,142\nwva,141,250930,141\ny,25.12,251207,142\nia,400,251006,141\n20260113\nf,147,260113\nfa,147,260113\n20260211\ns,26.3,260211\nsi,26.3,260211\n20260214\nc,145,260210\nca,145,260210\ne,145,260214\no,129,260318,145\noa,96,260310,145\nwva,145,260210,145\ny,26.4,260425,146\nia,423,260405,146\n20260224\nf,148,260224\nfa,148,260224\n20260313\nc,146,260310\nca,146,260310\ne,146,260313\no,130,260408,146\noa,97,260416,146\nwva,146,260310,146\n20260324\nf,149,260324\nfa,149,260324\ns,26.4,260324\nsi,26.4,260324\n20260410\nc,147,260407\nca,147,260407\ne,147,260410\no,131,260429,147\noa,98,260505,147\nwva,147,260407,147\ny,26.6,260608,148\nia,430,260530,148\n20260505\nca,148,260505\n20260507\nc,148,260505\ne,148,260507\no,132,260528,148\noa,99,260610,148\nwva,148,260505,148\n20260511\ns,26.5,260511\nsi,26.5,260511\n20260519\nf,151,260519\nfa,151,260519\n20260616\nf,152,260616\nfa,152,260616\n20260721\nf,153,260721\nfa,153,260721\n20260818\nf,154,260818\nfa,154,260818\n20260828\nc,152,260825\nca,152,260825\ne,152,260828\no,136,u,152\nwva,152,260825,152\n20260901\nf,155,260901\nfa,155,260901\nreleases\nc,45,150901\nc,46,151013\nc,47,151201\nc,48,160120\nc,49,160302\nc,50,160413\nc,51,160525\nc,52,160720\nc,54,161012\nc,55,161201\nc,58,170419\nc,59,170605\nc,60,170725\nc,61,170905\nc,63,171206\nc,64,180123\nc,65,180306\nc,67,180529\nc,68,180724\nc,69,180904\nc,70,181016\nc,71,181204\nc,72,190129\nc,73,190312\nc,74,190423\nc,75,190604\nc,77,190910\nc,78,191022\nc,79,191210\nc,83,200519\nc,90,210413\nc,91,210525\nc,92,210720\nc,94,210921\nc,95,211019\nc,100,220329\nc,102,220524\nc,103,220621\nc,110,230207\nc,113,230502\nc,114,230530\nc,116,230815\nc,122,240220\nc,126,240611\nc,128,240820\nc,129,240917\nc,131,241112\nc,132,250114\nc,134,250304\nc,139,250805\nc,142,251028\nc,143,251202\nc,144,260113\nc,149,260602\nc,150,260630\nc,151,260728\nc,153,260908\nc,154,260922\nca,45,150901\nca,46,151014\nca,47,151202\nca,48,160126\nca,49,160309\nca,50,160413\nca,51,160608\nca,52,160727\nca,54,161019\nca,55,161206\nca,58,170425\nca,59,170606\nca,60,170801\nca,61,170905\nca,63,171205\nca,64,180123\nca,65,180306\nca,67,180531\nca,68,180724\nca,69,180904\nca,70,181017\nca,71,181204\nca,72,190129\nca,73,190312\nca,74,190424\nca,75,190604\nca,77,190910\nca,78,191022\nca,79,191217\nca,83,200519\nca,90,210413\nca,91,210525\nca,92,210720\nca,94,210921\nca,95,211019\nca,100,220329\nca,102,220524\nca,103,220621\nca,110,230207\nca,113,230502\nca,114,230530\nca,116,230815\nca,122,240220\nca,126,240611\nca,128,240820\nca,129,240917\nca,131,241112\nca,132,250114\nca,134,250304\nca,139,250805\nca,142,251028\nca,143,251202\nca,144,260113\nca,149,260602\nca,150,260630\nca,151,260728\nca,153,260908\nca,154,260922\ne,83,200521\ne,90,210415\ne,91,210527\ne,92,210722\ne,94,210924\ne,95,211021\ne,100,220401\ne,102,220531\ne,103,220623\ne,110,230209\ne,113,230505\ne,114,230602\ne,116,230821\ne,122,240223\ne,126,240613\ne,128,240822\ne,129,240919\ne,131,241114\ne,132,250117\ne,134,250306\ne,139,250807\ne,142,251031\ne,143,251205\ne,144,260121\ne,149,260604\ne,150,260702\ne,151,260731\ne,153,260910\ne,154,260924\nf,40,150811\nf,42,151103\nf,43,151215\nf,44,160126\nf,46,160426\nf,48,160802\nf,51,170124\nf,54,170613\nf,55,170808\nf,56,170928\nf,57,171114\nf,58,180123\nf,59,180313\nf,61,180626\nf,66,190319\nf,67,190521\nf,69,190903\nf,70,191022\nf,71,191210\nf,72,200107\nf,73,200211\nf,74,200310\nf,75,200407\nf,76,200505\nf,77,200602\nf,80,200825\nf,81,200922\nf,82,201020\nf,87,210323\nf,88,210419\nf,89,210601\nf,90,210713\nf,97,220208\nf,99,220405\nf,105,220920\nf,106,221018\nf,109,230117\nf,117,230829\nf,133,241126\nf,135,250204\nf,140,250624\nf,141,250722\nf,146,251209\nf,150,260421\nf,156,260915\nf,157,260929\nfa,40,150811\nfa,42,151103\nfa,43,151215\nfa,44,160126\nfa,46,160426\nfa,48,160802\nfa,51,170124\nfa,54,170613\nfa,55,170808\nfa,58,180122\nfa,59,180313\nfa,61,180626\nfa,66,190319\nfa,67,190521\nfa,80,200831\nfa,81,200922\nfa,82,201020\nfa,87,210323\nfa,88,210419\nfa,89,210601\nfa,90,210713\nfa,95,211207\nfa,97,220208\nfa,99,220405\nfa,105,220920\nfa,106,221018\nfa,109,230117\nfa,117,230829\nfa,133,241126\nfa,135,250204\nfa,140,250624\nfa,141,250722\nfa,146,251209\nfa,150,260421\nfa,156,260915\nfa,157,260929\ns,9,150930\ns,9.1,160321\ns,10,160920\ns,10.1,170327\ns,12,180917\ns,15.3,220126\ns,15.5,220516\ns,16.1,221024\ns,16.2,221213\ns,16.3,230123\ns,16.5,230518\ns,16.6,230724\ns,17.1,231025\ns,17.3,240122\ns,17.6,240729\ns,18.1,241028\ns,18.3,250127\ns,18.5,250512\ns,18.6,250729\ns,26.1,251103\ns,26.6,260727\ns,27,u\nsi,9,150916\nsi,9.3,160321\nsi,10,160913\nsi,10.3,170327\nsi,12,180917\nsi,15.3,220126\nsi,15.5,220516\nsi,16.1,221024\nsi,16.2,221213\nsi,16.3,230123\nsi,16.5,230518\nsi,16.6,230724\nsi,17.1,231025\nsi,17.3,240122\nsi,17.6,240729\nsi,18.1,241028\nsi,18.6,250729\nsi,26.1,251103\nsi,26.6,260727\nsi,27,u\no,15,130702,28\no,16,130827,29\no,17,131008,30\no,18,131119,31\no,19,140128,32\no,20,140304,33\no,21,140506,34\no,22,140603,35\no,23,140722,36\no,24,140902,37\no,26,141203,39\no,27,150127,40\no,28,150310,41\no,29,150428,42\no,30,150609,43\no,32,150915,45\no,33,151027,46\no,34,151208,47\no,35,160202,48\no,36,160315,49\no,37,160504,50\no,38,160608,51\no,39,160802,52\no,41,161025,54\no,42,161213,55\no,45,170510,58\no,46,170622,59\no,47,170809,60\no,48,170927,61\no,50,180104,63\no,51,180207,64\no,52,180322,65\no,54,180628,67\no,55,180816,68\no,56,180925,69\no,57,181128,70\no,58,190123,71\no,60,190409,73\no,62,190627,75\no,64,191007,77\no,65,191113,78\no,66,200107,79\no,69,200624,83\no,76,210428,90\no,77,210609,91\no,78,210803,92\no,80,211005,94\no,81,211104,95\no,86,220420,100\no,88,220608,102\no,89,220707,103\no,96,230222,110\no,99,230516,113\no,100,230629,114\no,102,230823,116\no,108,240305,122\no,112,240711,126\no,114,240925,128\no,116,250108,131\no,117,250213,132\no,119,250513,134\no,123,251028,139\no,126,260108,142\no,127,260202,143\no,128,260226,144\no,133,260629,149\no,134,260806,150\no,135,260820,151\no,137,u,153\noa,15,130708,28\noa,16,130918,29\noa,18,131120,31\noa,19,140128,32\noa,20,140306,33\noa,21,140422,34\noa,22,140617,35\noa,24,140910,37\noa,26,141202,39\noa,27,150129,40\noa,28,150310,41\noa,29,150428,42\noa,30,150610,43\noa,33,151103,46\noa,34,151216,47\noa,35,160204,48\noa,36,160331,49\noa,37,160616,50\noa,42,170121,55\noa,44,171211,60\noa,45,180215,61\noa,48,181108,69\noa,49,181207,70\noa,50,190218,71\noa,51,190321,72\noa,52,190517,73\noa,53,190711,74\noa,55,191203,77\noa,56,200206,78\noa,59,200630,83\noa,64,210525,91\noa,65,211020,92\noa,69,220509,100\noa,76,230626,114\noa,85,241029,128\noa,87,250122,132\noa,94,260113,143\noa,95,260211,144\noa,100,260701,149\noa,101,260826,151\nsa,1.5,130925,28\nsa,1.6,140411,28\nsa,2.0,141017,34\nsa,2.1,150107,34\nsa,3.2,150824,38\nsa,4.2,160802,44\nsa,5.0,161215,51\nsa,5.2,170421,51\nsa,5.4,170517,51\nsa,6.2,171026,56\nsa,6.4,180219,56\nsa,7.2,180620,59\nsa,7.4,180912,59\nsa,8.2,181221,63\nsa,9.2,190402,67\nsa,9.4,190725,67\nsa,10.0,190822,71\nsa,10.2,191009,71\nsa,11.0,191205,75\nsa,11.2,200322,75\nsa,12.1,200707,79\nsa,13.2,210120,83\nsa,14.2,210625,87\nsa,16.0,211125,92\nsa,16.2,220306,92\nsa,18.1,220909,99\nsa,19.1,221108,102\nsa,26.0,240607,122\nwva,4.4,131209,30\nwva,4.4.3,140602,33\nwva,37,140903,37\nwva,39,141112,39\nwva,40,150121,40\nwva,41,150311,41\nwva,42,150415,42\nwva,43,150527,43\nwva,45,150901,45\nwva,46,151014,46\nwva,47,151202,47\nwva,48,160126,48\nwva,49,160309,49\nwva,50,160413,50\nwva,51,160608,51\nwva,52,160727,52\nwva,54,161019,54\nwva,55,161206,55\nwva,58,170425,58\nwva,59,170606,59\nwva,60,170801,60\nwva,61,170905,61\nwva,63,171205,63\nwva,64,180123,64\nwva,65,180306,65\nwva,67,180531,67\nwva,68,180724,68\nwva,69,180904,69\nwva,70,181017,70\nwva,71,181204,71\nwva,72,190129,72\nwva,73,190312,73\nwva,74,190424,74\nwva,75,190604,75\nwva,77,190910,77\nwva,78,191022,78\nwva,79,191217,79\nwva,83,200519,83\nwva,90,210413,90\nwva,91,210525,91\nwva,92,210720,92\nwva,94,210921,94\nwva,95,211019,95\nwva,100,220329,100\nwva,102,220524,102\nwva,103,220621,103\nwva,110,230207,110\nwva,113,230502,113\nwva,114,230530,114\nwva,116,230815,116\nwva,122,240220,122\nwva,126,240611,126\nwva,128,240820,128\nwva,129,240917,129\nwva,131,241112,131\nwva,132,250114,132\nwva,134,250304,134\nwva,139,250805,139\nwva,142,251028,142\nwva,143,251202,143\nwva,144,260113,144\nwva,149,260602,149\nwva,150,260630,150\nwva,151,260728,151\nwva,153,260908,153\nwva,154,260922,154\ny,1.0,u,25\ny,1.5,u,22\ny,1.6,u,25\ny,1.7,u,25\ny,1.20,u,25\ny,2.5,u,25\ny,3.2,u,25\ny,4.6,u,25\ny,5.3,u,25\ny,5.4,u,25\ny,7.4,u,25\ny,9.6,u,25\ny,10.5,u,25\ny,11.4,u,25\ny,11.5,u,25\ny,12.7,u,25\ny,13.9,u,28\ny,13.10,u,28\ny,13.11,u,28\ny,13.12,u,30\ny,14.2,u,32\ny,14.4,u,33\ny,14.5,u,34\ny,14.7,u,35\ny,14.8,u,36\ny,14.10,u,37\ny,15.2,u,40\ny,15.4,u,41\ny,15.6,u,42\ny,15.7,u,43\ny,15.10,u,45\ny,15.12,u,46\ny,16.2,u,47\ny,16.3,u,47\ny,16.4,u,49\ny,16.6,u,50\ny,16.7,u,51\ny,16.9,u,52\ny,16.11,u,54\ny,17.1,u,55\ny,17.6,u,58\ny,17.7,u,59\ny,17.9,u,60\ny,17.10,u,61\ny,18.1,u,63\ny,18.2,u,63\ny,18.3,u,64\ny,18.4,u,65\ny,18.7,u,67\ny,18.9,u,68\ny,18.10,u,69\ny,18.11,u,70\ny,19.1,u,71\ny,19.3,u,72\ny,19.4,u,73\ny,19.5,u,75\ny,19.6,u,75\ny,19.7,u,75\ny,19.10,u,77\ny,19.11,u,78\ny,19.12,u,78\ny,20.2,u,79\ny,20.6,u,81\ny,20.7,u,83\ny,21.2,u,88\ny,21.5,u,90\ny,21.6,210928,91\ny,21.8,210928,92\ny,21.11,211029,94\ny,22.4,u,92\ny,22.9,220827,104\ny,23.7,230706,114\ny,24.2,240325,120\ny,24.9,241001,126\ny,25.2,250424,132\ny,25.3,250423,132\ny,26.3,260304,144\ny,26.7,260723,149\ny,26.8,260801,150\nu,10.5,u,31\nu,10.7,u,31\nu,10.8,u,31\nu,10.10,u,31\nu,11.0,u,31\nu,11.2,u,40\nu,11.3,u,40\nu,11.4,u,40\nu,11.5,u,40\nu,11.8,u,57\nu,11.9,u,57\nu,12.0,u,57\nu,12.1,u,57\nu,12.2,u,57\nu,12.3,u,57\nu,12.4,u,57\nu,12.5,u,57\nu,12.6,u,57\nu,12.7,u,57\nu,12.8,u,57\nu,12.9,u,57\nu,12.10,u,57\nu,12.11,u,57\nu,12.12,u,57\nu,12.13,u,57\nu,12.14,u,57\nu,13.0,u,57\nu,13.1,u,57\nu,13.2,u,57\nu,13.4,210928,78\nu,13.5,230825,78\nu,13.6,231217,78\nu,13.7,230624,78\nu,13.8,220430,78\nu,13.9,220518,78\nu,15.0,220824,78\nu,15.1,221111,78\nu,15.2,230423,78\nu,15.4,231025,100\nu,15.5,230822,100\nu,16.0,230824,100\nu,16.1,231015,100\nu,16.2,231209,100\nu,16.3,240308,100\nu,16.4,241003,100\nu,16.5,240530,100\nu,16.6,240723,100\nu,17.0,240824,100\nu,17.1,240926,100\nu,17.2,241129,100\nu,17.3,250107,100\nu,17.4,250226,100\nu,17.5,250408,100\nu,17.7,250611,123\nu,17.8,250730,123\nu,18.0,250817,123\nu,18.1,251004,123\nu,18.2,251104,123\nu,18.3,251212,123\nu,18.4,260109,123\nu,18.5,260128,123\nu,18.6,260321,123\nu,18.8,260503,123\nu,18.9,260702,123\nu,18.10,260808,123\nu,19.0,260824,123\nq,6.0,u,37\nq,6.1,u,37\nq,6.2,u,37\nq,6.3,u,37\nq,6.4,u,37\nq,6.6,u,37\nq,6.7,u,37\nq,6.8,u,37\nq,6.9,u,37\nq,7.0,u,37\nq,7.1,u,37\nq,7.2,u,37\nq,7.3,u,37\nq,7.4,u,37\nq,7.5,u,37\nq,7.6,u,37\nq,7.7,u,37\nq,7.8,u,37\nq,7.9,u,37\nq,8.0,u,37\nq,8.2,u,57\nq,8.3,u,57\nq,8.4,u,57\nq,8.5,u,57\nq,8.6,u,57\nq,8.7,u,57\nq,8.8,u,57\nq,8.9,u,57\nq,9.1,u,57\nq,9.7,u,66\nq,9.8,u,66\nq,10.0,u,66\nq,10.1,u,66\nq,10.2,u,66\nq,10.3,u,66\nq,10.4,u,66\nq,10.5,u,66\nq,10.7,200909,66\nq,11.0,u,77\nq,11.2,210130,77\nq,11.3,210331,77\nq,11.9,u,89\nq,12.0,211104,89\nq,12.1,211105,89\nq,12.2,211207,89\nq,12.5,220407,89\nq,12.7,220521,89\nq,12.8,220630,89\nq,12.9,220726,89\nq,13.0,220815,89\nq,13.1,220910,89\nq,13.2,221026,89\nq,13.3,221109,89\nq,13.5,230206,98\nq,13.6,230209,98\nq,13.7,230421,98\nq,13.8,230421,98\nq,14.0,231212,98\nq,14.1,230716,98\nq,14.3,230913,109\nq,14.4,231031,109\nq,14.5,231112,109\nq,14.6,231224,109\nq,14.7,240118,109\nq,14.8,240304,109\nq,14.9,240409,109\nq,15.0,240417,109\nq,15.1,240518,109\nq,15.2,241024,109\nq,15.3,240728,109\nq,15.4,240907,109\nq,15.5,240924,109\nq,15.6,241024,109\nq,15.7,241203,109\nq,15.8,241211,109\nq,15.9,250201,109\nq,19.2,250715,121\nq,19.3,250831,121\nq,19.4,250920,121\nq,19.5,251023,121\nq,19.6,251117,121\nq,19.7,251218,121\nq,19.8,260120,121\nq,19.9,260309,121\nq,20.0,260406,121\nq,20.1,260430,121\nq,20.2,260610,121\nq,20.3,260617,121\nq,20.4,260728,121\nq,20.5,260817,121\nk,1.0,170301,37\nk,2.5,170701,48\nk,3.1,220301,84\nfb,68,u,48\nfb,74,u,50\nfb,75,u,50\nfb,76,u,50\nfb,77,u,50\nfb,78,u,50\nfb,79,u,50\nfb,80,u,51\nfb,81,u,51\nfb,82,u,51\nfb,83,u,51\nfb,84,u,51\nfb,86,u,51\nfb,87,u,52\nfb,88,u,52\nfb,89,u,52\nfb,90,u,52\nfb,91,u,52\nfb,92,u,52\nfb,93,u,52\nfb,94,u,52\nfb,96,u,53\nfb,97,u,53\nfb,98,u,53\nfb,99,u,53\nfb,100,u,54\nfb,101,u,54\nfb,103,u,54\nfb,104,u,54\nfb,105,u,54\nfb,106,u,55\nfb,107,u,55\nfb,108,u,55\nfb,109,u,55\nfb,110,u,55\nfb,111,u,55\nfb,113,u,56\nfb,114,u,56\nfb,115,u,56\nfb,116,u,56\nfb,118,u,57\nfb,119,u,57\nfb,120,u,57\nfb,121,u,57\nfb,122,u,58\nfb,123,u,58\nfb,124,u,58\nfb,125,u,58\nfb,126,u,58\nfb,127,u,58\nfb,128,u,58\nfb,129,u,58\nfb,130,u,59\nfb,131,u,59\nfb,132,u,59\nfb,133,u,59\nfb,134,u,59\nfb,135,u,59\nfb,136,u,59\nfb,137,u,59\nfb,138,u,60\nfb,140,u,60\nfb,142,u,61\nfb,143,u,61\nfb,144,u,61\nfb,145,u,61\nfb,146,u,61\nfb,147,u,61\nfb,148,u,61\nfb,150,u,62\nfb,151,u,62\nfb,152,u,62\nfb,153,u,63\nfb,154,u,63\nfb,155,u,63\nfb,156,u,63\nfb,157,u,64\nfb,158,u,64\nfb,159,u,64\nfb,160,u,64\nfb,161,u,64\nfb,162,u,64\nfb,163,u,65\nfb,164,u,65\nfb,165,u,65\nfb,166,u,65\nfb,167,u,65\nfb,168,u,65\nfb,170,u,66\nfb,171,u,66\nfb,172,u,66\nfb,173,u,66\nfb,174,u,66\nfb,175,u,67\nfb,176,u,67\nfb,177,u,67\nfb,178,u,67\nfb,180,u,67\nfb,181,u,67\nfb,182,u,67\nfb,183,u,68\nfb,184,u,68\nfb,185,u,68\nfb,186,u,68\nfb,187,u,68\nfb,188,u,68\nfb,202,u,71\nfb,227,u,75\nfb,228,u,75\nfb,229,u,75\nfb,230,u,75\nfb,231,u,75\nfb,235,u,76\nfb,236,u,76\nfb,237,u,76\nfb,238,u,76\nfb,240,u,77\nfb,241,u,77\nfb,242,u,77\nfb,243,u,77\nfb,244,u,78\nfb,245,u,78\nfb,246,u,78\nfb,247,u,78\nfb,248,u,78\nfb,249,u,78\nfb,250,u,78\nfb,251,u,79\nfb,252,u,79\nfb,253,u,79\nfb,254,u,79\nfb,255,u,79\nfb,257,u,80\nfb,258,u,80\nfb,259,u,80\nfb,260,u,80\nfb,261,u,80\nfb,262,u,80\nfb,263,u,80\nfb,264,u,80\nfb,265,u,80\nfb,267,u,81\nfb,268,u,81\nfb,269,u,81\nfb,270,u,81\nfb,271,u,81\nfb,272,u,83\nfb,273,u,83\nfb,274,u,83\nfb,275,u,83\nfb,400,230210,109\nfb,436,231013,117\nfb,438,231028,118\nfb,440,231112,119\nfb,441,231120,119\nfb,442,231129,119\nfb,444,231213,120\nfb,445,231221,120\nfb,446,240106,120\nfb,447,240112,120\nfb,449,240202,121\nfb,450,240205,121\nfb,451,240217,121\nfb,452,240225,122\nfb,453,240228,122\nfb,454,240304,122\nfb,466,u,126\nfb,469,u,126\nfb,471,240710,126\nfb,472,240711,126\nfb,475,240801,127\nfb,476,240809,127\nfb,477,240816,127\nfb,478,240821,128\nfb,479,240831,128\nfb,480,240907,128\nfb,481,240914,128\nfb,482,240920,129\nfb,483,240927,129\nfb,484,241004,129\nfb,485,241011,129\nfb,487,241026,130\nfb,488,241102,130\nfb,489,241109,130\nfb,494,241226,131\nfb,497,250126,132\nia,24,u,62\nia,25,u,62\nia,26,u,63\nia,27,u,63\nia,28,u,63\nia,29,u,63\nia,30,u,63\nia,31,u,64\nia,32,u,64\nia,33,u,64\nia,34,u,64\nia,35,u,65\nia,36,u,65\nia,37,u,65\nia,38,u,65\nia,39,u,65\nia,40,u,65\nia,41,u,65\nia,43,u,66\nia,44,u,66\nia,45,u,66\nia,46,u,66\nia,47,u,66\nia,48,u,67\nia,49,u,67\nia,50,u,67\nia,51,u,67\nia,52,u,67\nia,53,u,67\nia,54,u,67\nia,55,u,67\nia,56,u,68\nia,57,u,68\nia,58,u,68\nia,59,u,68\nia,60,u,68\nia,61,u,68\nia,65,u,69\nia,66,u,69\nia,68,u,69\nia,72,u,70\nia,74,u,71\nia,75,u,71\nia,79,u,71\nia,81,u,72\nia,82,u,72\nia,83,u,72\nia,84,u,73\nia,86,u,73\nia,95,u,74\nia,97,u,80\nia,98,u,80\nia,103,u,80\nia,104,u,80\nia,117,u,80\nia,118,u,80\nia,119,u,80\nia,120,u,80\nia,121,u,80\nia,127,u,80\nia,128,u,80\nia,129,u,80\nia,130,u,80\nia,131,u,80\nia,132,u,80\nia,133,u,80\nia,134,u,80\nia,135,u,80\nia,136,u,80\nia,138,u,81\nia,139,u,81\nia,140,u,81\nia,141,u,81\nia,142,u,81\nia,143,u,83\nia,144,u,83\nia,145,u,83\nia,146,u,83\nia,164,u,92\nia,230,u,92\nia,259,221104,106\nia,281,u,109\nia,289,231221,114\nia,290,231230,114\nia,295,u,115\nia,296,u,115\nia,297,u,115\nia,298,240111,115\nia,299,u,115\nia,300,u,116\nia,301,240112,116\nia,303,u,117\nia,304,u,117\nia,305,u,117\nia,307,u,118\nia,308,240119,118\nia,310,u,119\nia,312,u,120\nia,313,u,120\nia,314,u,120\nia,315,240119,120\nia,316,240125,120\nia,318,240216,121\nia,320,240304,121\nia,321,240307,122\nia,347,240911,127\nia,349,240920,128\nia,366,u,132\nia,367,250215,132\nia,382,250619,137\nia,383,250618,137\nia,384,250616,137\nia,385,250627,137\nia,387,250709,137\nia,392,250812,138\nia,394,250826,139\nia,395,250913,139\nia,396,250920,139\nia,397,250919,139\nia,401,251008,141\nia,404,251031,141\nia,406,251116,141\nia,407,251123,142\nia,408,251128,142\nia,409,251216,143\nia,410,251217,143\nia,411,260107,143\nia,438,260722,150\nia,443,260821,151\nia,444,260827,151\n".split("\n").forEach(n=>{if(n=n.trim())if("releases"!==n){if(f$1){const a=n.split(",");if(a.length>=3){const[n,u,o,f]=a,i=[n,u,e(o.trim())];f&&i.push(f.trim()),s[n]||(s[n]=[]),s[n].push(i);}return}if(n.startsWith("20")||n.startsWith("pre_baseline"))return o=e(n),void(u[o]=[]);{const a=n.split(",");if(a.length>=3){const[n,s,f,i]=a,r=[n,s,e(f.trim())];if(i&&r.push(i.trim()),!u[o])throw new Error(`Timeline entry for date ${o} is undefined. This should not happen.`);u[o].push(r);}}}else f$1=!0;});const i={};Object.keys(a).forEach(n=>{var a;i[n]=[...null!==(a=s[n])&&void 0!==a?a:[]];}),Object.keys(u).forEach(n=>{u[n].forEach(n=>{const a=n[0];i[a]&&(i[a].some(a=>a[1]===n[1])||i[a].push(n));});}),Object.keys(i).forEach(a=>{i[a].sort((a,e)=>n(a[1],e[1]));});let r=!1;const c=Object.keys(a).filter(n=>void 0===a[n].engine).map(n=>{const{longName:e}=a[n];return {shortName:n,longName:e}}),t=["webview_android","samsunginternet_android","opera_android","opera","ya_android","uc_android","qq_android","kai_os","facebook_android","instagram_android"],b=a=>{const e=[],u=[];return a.forEach(n=>{c.some(a=>a.longName===n.browser)?e.push(n):u.push(n);}),e.sort((a,e)=>a.browser<e.browser?-1:a.browser>e.browser?1:n(a.version,e.version)),u.sort((a,e)=>{const u=t.indexOf(a.browser),s=t.indexOf(e.browser);return u!==s?u-s:n(a.version,e.version)}),[...e,...u]};let l=!1;const w=n=>{if(!1===n.includeDownstreamBrowsers&&!0===n.includeKaiOS)throw new Error("KaiOS is a downstream browser and can only be included if you include other downstream browsers. Please ensure you use `includeDownstreamBrowsers: true`.")},v=(n,e,u,s,o)=>{var f;const i={browser:e,version:u,release_date:"u"===s?"unknown":s};return o&&(i.engine_version=o,i.engine=null===(f=a[n])||void 0===f?void 0:f.engine),i};function y(e){var s,o,f,t,y,p,d;let g=null!=e?e:{},q={listAllCompatibleVersions:null!==(s=g.listAllCompatibleVersions)&&void 0!==s&&s,includeDownstreamBrowsers:null!==(o=g.includeDownstreamBrowsers)&&void 0!==o&&o,widelyAvailableOnDate:null!==(f=g.widelyAvailableOnDate)&&void 0!==f?f:void 0,targetYear:null!==(t=g.targetYear)&&void 0!==t?t:void 0,includeKaiOS:null!==(y=g.includeKaiOS)&&void 0!==y&&y,overrideLastUpdated:null!==(p=g.overrideLastUpdated)&&void 0!==p?p:void 0,suppressWarnings:null!==(d=g.suppressWarnings)&&void 0!==d&&d},m=new Date;if(q.widelyAvailableOnDate||q.targetYear){if(q.targetYear&&q.widelyAvailableOnDate)throw new Error("You cannot use targetYear and widelyAvailableOnDate at the same time.  Please remove one of these options and try again.");q.widelyAvailableOnDate?m=new Date(q.widelyAvailableOnDate):q.targetYear&&(m=new Date(`${q.targetYear}-12-31`));}else m=new Date;if((q.widelyAvailableOnDate||void 0===q.targetYear)&&m.setMonth(m.getMonth()-30),!q.suppressWarnings){if(((n,a)=>{if(r||"undefined"!=typeof process&&process.env&&(process.env.BROWSERSLIST_IGNORE_OLD_DATA||process.env.BASELINE_BROWSER_MAPPING_IGNORE_OLD_DATA))return;const e=new Date;e.setMonth(e.getMonth()-2),n>e&&(null!=a?a:1788456871688)<e.getTime()&&(console.warn("[baseline-browser-mapping] The data in this module is over two months old and you are targetting a recent feature cut off date of "+n.toISOString().slice(0,10)+". To ensure accurate Baseline data, please update to the latest version of this module using the package manager of your choice.You can suppress these warnings using the environment variables `BROWSERSLIST_IGNORE_OLD_DATA=true` or `BASELINE_BROWSER_MAPPING_IGNORE_OLD_DATA=true` or by passing `suppressWarnings: true` when you call `getCompatibleVersions()` or `getAllVersions()`."),r=!0);})(m,q.overrideLastUpdated),w(q),m.getFullYear()<2015&&!l&&console.warn(new Error("There are no browser versions compatible with Baseline before 2015.  You may receive unexpected results.")),m.getFullYear()<2002)throw new Error("None of the browsers in the core set were released before 2002.  Please use a date after 2002.");if(m.getFullYear()>(new Date).getFullYear())throw new Error("There are no browser versions compatible with Baseline in the future")}const h=m<new Date("2015-07-29"),_={};Object.keys(a).forEach(n=>{_[n]=void 0;}),Object.keys(u).forEach(n=>{const a=u[n];let e=!1;e="pre_baseline"===n||new Date(n)<=m,e&&a.forEach(a=>{const e=a[0];"pre_baseline"!==n&&(_[e]=a);});});const O=[];return Object.keys(a).forEach(e=>{var u,s;const{longName:o}=a[e];if(!q.includeKaiOS&&"k"===e)return;const f=c.some(n=>n.shortName===e);if(q.includeDownstreamBrowsers||f)if(h)if(q.listAllCompatibleVersions){O.push({browser:o,version:"0",release_date:""});(null!==(u=i[e])&&void 0!==u?u:[]).forEach(n=>{O.push(v(e,o,n[1],n[2],n[3]));});}else O.push({browser:o,version:"0",release_date:""});else {const a=_[e];if(!a)return;const u=a[1];if(q.listAllCompatibleVersions){(null!==(s=i[e])&&void 0!==s?s:[]).forEach(a=>{const s=a[1];n(s,u)>=0&&O.push(v(e,o,s,a[2],a[3]));});}else O.push(v(e,o,u,a[2],a[3]));}}),b(O)}dist._resetHasWarned=function(){r=!1;},dist.getAllVersions=function(a){var e,u,s,o,f;l=!0;let i=null!=a?a:{},r={outputFormat:null!==(e=i.outputFormat)&&void 0!==e?e:"array",includeDownstreamBrowsers:null!==(u=i.includeDownstreamBrowsers)&&void 0!==u&&u,useSupports:null!==(s=i.useSupports)&&void 0!==s&&s,includeKaiOS:null!==(o=i.includeKaiOS)&&void 0!==o&&o,suppressWarnings:null!==(f=i.suppressWarnings)&&void 0!==f&&f};w(r);let t=(new Date).getFullYear()+1;const b=[...Array(t).keys()].slice(2015),v={};b.forEach(n=>{v[n]={},y({targetYear:n,suppressWarnings:r.suppressWarnings}).forEach(a=>{v[n]&&(v[n][a.browser]=a);});});const p=y({suppressWarnings:r.suppressWarnings}),d={};p.forEach(n=>{d[n.browser]=n;});const g=new Date;g.setMonth(g.getMonth()+30);const q=y({widelyAvailableOnDate:g.toISOString().slice(0,10),suppressWarnings:r.suppressWarnings}),m={};q.forEach(n=>{m[n.browser]=n;});const h=y({targetYear:2002,listAllCompatibleVersions:!0,suppressWarnings:r.suppressWarnings}),_=[];if(c.map(n=>n.longName).forEach(a=>{var e,u,s,o;let f=h.filter(n=>n.browser==a).sort((a,e)=>n(a.version,e.version)),i=null!==(u=null===(e=d[a])||void 0===e?void 0:e.version)&&void 0!==u?u:"0",c=null!==(o=null===(s=m[a])||void 0===s?void 0:s.version)&&void 0!==o?o:"0";b.forEach(e=>{var u;if(v[e]){let s=(null!==(u=v[e][a])&&void 0!==u?u:{version:"0"}).version,o=f.findIndex(a=>0===n(a.version,s));(e===t-1?f:f.slice(0,o)).forEach(a=>{let u=n(a.version,i)>=0,s=n(a.version,c)>=0,o=Object.assign(Object.assign({},a),{year:e<=2015?"pre_baseline":e-1});r.useSupports?(u&&(o.supports="widely"),s&&(o.supports="newly")):o=Object.assign(Object.assign({},o),{wa_compatible:u}),_.push(o);}),f=f.slice(o,f.length);}});}),r.includeDownstreamBrowsers){y({targetYear:2002,listAllCompatibleVersions:!0,includeDownstreamBrowsers:!0,includeKaiOS:r.includeKaiOS,suppressWarnings:r.suppressWarnings}).filter(n=>!c.map(n=>n.longName).includes(n.browser)).forEach(n=>{const a="Gecko"===n.engine?"firefox":"chrome";let e=_.find(e=>e.browser===a&&e.version===n.engine_version);e&&(r.useSupports?_.push(Object.assign(Object.assign({},n),{year:e.year,supports:e.supports})):_.push(Object.assign(Object.assign({},n),{year:e.year,wa_compatible:e.wa_compatible})));});}if(_.sort((a,e)=>{if("pre_baseline"===a.year&&"pre_baseline"!==e.year)return -1;if("pre_baseline"===e.year&&"pre_baseline"!==a.year)return 1;if("pre_baseline"!==a.year&&"pre_baseline"!==e.year){if(a.year<e.year)return -1;if(a.year>e.year)return 1}return a.browser<e.browser?-1:a.browser>e.browser?1:n(a.version,e.version)}),"object"===r.outputFormat){const n={};return _.forEach(a=>{n[a.browser]||(n[a.browser]={});let e={year:a.year,release_date:a.release_date,engine:a.engine,engine_version:a.engine_version};n[a.browser][a.version]=r.useSupports?a.supports?Object.assign(Object.assign({},e),{supports:a.supports}):e:Object.assign(Object.assign({},e),{wa_compatible:a.wa_compatible});}),null!=n?n:{}}if("csv"===r.outputFormat){let n=`"browser","version","year","${r.useSupports?"supports":"wa_compatible"}","release_date","engine","engine_version"`;return _.forEach(a=>{var e,u,s,o;let f={browser:a.browser,version:a.version,year:a.year,release_date:null!==(e=a.release_date)&&void 0!==e?e:"NULL",engine:null!==(u=a.engine)&&void 0!==u?u:"NULL",engine_version:null!==(s=a.engine_version)&&void 0!==s?s:"NULL"};f=r.useSupports?Object.assign(Object.assign({},f),{supports:null!==(o=a.supports)&&void 0!==o?o:""}):Object.assign(Object.assign({},f),{wa_compatible:a.wa_compatible}),n+=`\n"${f.browser}","${f.version}","${f.year}","${r.useSupports?f.supports:f.wa_compatible}","${f.release_date}","${f.engine}","${f.engine_version}"`;}),n}return _},dist.getCompatibleVersions=y,dist.getTimeline=function(n){var e,s,o,f;const i=null!=n?n:{},r=null!==(e=i.groupBy)&&void 0!==e?e:"date",t=null!==(s=i.listAllBrowsers)&&void 0!==s&&s,l=null!==(o=i.includeDownstreamBrowsers)&&void 0!==o&&o,w=null!==(f=i.includeKaiOS)&&void 0!==f&&f;if(!1===l&&!0===w)throw new Error("KaiOS is a downstream browser and can only be included if you include other downstream browsers. Please ensure you use `includeDownstreamBrowsers: true`.");const y={},p=[];if(Object.keys(u).forEach(n=>{const e=u[n];if("pre_baseline"===n)return;const s=new Set;e.forEach(n=>{const a=n[0],e=y[a],u=n[1];e&&e[1]===u||s.add(a),y[a]=n;});const o=[];if(Object.keys(a).forEach(n=>{const{longName:e}=a[n];if(!w&&"k"===n)return;const u=c.some(a=>a.shortName===n);if(!l&&!u)return;const f=s.has(n);if(t||f){const a=y[n];a&&o.push(v(n,e,a[1],a[2],a[3]));}}),o.length>0){const a=b(o);p.push({date:n,browsers:a});}}),"browser"===r){const n={};return Object.keys(a).forEach(e=>{const{longName:u}=a[e];if(!w&&"k"===e)return;const s=c.some(n=>n.shortName===e);(l||s)&&(n[u]=[]);}),p.forEach(a=>{a.browsers.forEach(e=>{const{browser:u}=e,s=function(n,a){var e={};for(var u in n)Object.prototype.hasOwnProperty.call(n,u)&&a.indexOf(u)<0&&(e[u]=n[u]);if(null!=n&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(u=Object.getOwnPropertySymbols(n);s<u.length;s++)a.indexOf(u[s])<0&&Object.prototype.propertyIsEnumerable.call(n,u[s])&&(e[u[s]]=n[u[s]]);}return e}(e,["browser"]);n[u]&&n[u].push(Object.assign({date:a.date},s));});}),n}return p};

  var require$$1 = [
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
  		version: "20.19.0",
  		date: "2025-03-13",
  		lts: "Iron",
  		security: false,
  		v8: "11.3.244.8"
  	},
  	{
  		name: "nodejs",
  		version: "20.20.0",
  		date: "2026-01-12",
  		lts: "Iron",
  		security: true,
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
  		version: "22.13.0",
  		date: "2025-01-06",
  		lts: "Jod",
  		security: false,
  		v8: "12.4.254.21"
  	},
  	{
  		name: "nodejs",
  		version: "22.14.0",
  		date: "2025-02-11",
  		lts: "Jod",
  		security: false,
  		v8: "12.4.254.21"
  	},
  	{
  		name: "nodejs",
  		version: "22.15.0",
  		date: "2025-04-22",
  		lts: "Jod",
  		security: false,
  		v8: "12.4.254.21"
  	},
  	{
  		name: "nodejs",
  		version: "22.16.0",
  		date: "2025-05-20",
  		lts: "Jod",
  		security: false,
  		v8: "12.4.254.21"
  	},
  	{
  		name: "nodejs",
  		version: "22.17.0",
  		date: "2025-06-24",
  		lts: "Jod",
  		security: false,
  		v8: "12.4.254.21"
  	},
  	{
  		name: "nodejs",
  		version: "22.18.0",
  		date: "2025-07-31",
  		lts: "Jod",
  		security: false,
  		v8: "12.4.254.21"
  	},
  	{
  		name: "nodejs",
  		version: "22.19.0",
  		date: "2025-08-28",
  		lts: "Jod",
  		security: false,
  		v8: "12.4.254.21"
  	},
  	{
  		name: "nodejs",
  		version: "22.20.0",
  		date: "2025-09-24",
  		lts: "Jod",
  		security: false,
  		v8: "12.4.254.21"
  	},
  	{
  		name: "nodejs",
  		version: "22.21.0",
  		date: "2025-10-20",
  		lts: "Jod",
  		security: false,
  		v8: "12.4.254.21"
  	},
  	{
  		name: "nodejs",
  		version: "22.22.0",
  		date: "2026-01-12",
  		lts: "Jod",
  		security: true,
  		v8: "12.4.254.21"
  	},
  	{
  		name: "nodejs",
  		version: "22.23.0",
  		date: "2026-06-17",
  		lts: "Jod",
  		security: true,
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
  	},
  	{
  		name: "nodejs",
  		version: "23.4.0",
  		date: "2024-12-10",
  		lts: false,
  		security: false,
  		v8: "12.9.202.28"
  	},
  	{
  		name: "nodejs",
  		version: "23.5.0",
  		date: "2024-12-19",
  		lts: false,
  		security: false,
  		v8: "12.9.202.28"
  	},
  	{
  		name: "nodejs",
  		version: "23.6.0",
  		date: "2025-01-07",
  		lts: false,
  		security: false,
  		v8: "12.9.202.28"
  	},
  	{
  		name: "nodejs",
  		version: "23.7.0",
  		date: "2025-01-30",
  		lts: false,
  		security: false,
  		v8: "12.9.202.28"
  	},
  	{
  		name: "nodejs",
  		version: "23.8.0",
  		date: "2025-02-13",
  		lts: false,
  		security: false,
  		v8: "12.9.202.28"
  	},
  	{
  		name: "nodejs",
  		version: "23.9.0",
  		date: "2025-02-26",
  		lts: false,
  		security: false,
  		v8: "12.9.202.28"
  	},
  	{
  		name: "nodejs",
  		version: "23.10.0",
  		date: "2025-03-13",
  		lts: false,
  		security: false,
  		v8: "12.9.202.28"
  	},
  	{
  		name: "nodejs",
  		version: "23.11.0",
  		date: "2025-04-01",
  		lts: false,
  		security: false,
  		v8: "12.9.202.28"
  	},
  	{
  		name: "nodejs",
  		version: "24.0.0",
  		date: "2025-05-06",
  		lts: false,
  		security: false,
  		v8: "13.6.233.8"
  	},
  	{
  		name: "nodejs",
  		version: "24.1.0",
  		date: "2025-05-20",
  		lts: false,
  		security: false,
  		v8: "13.6.233.10"
  	},
  	{
  		name: "nodejs",
  		version: "24.2.0",
  		date: "2025-06-09",
  		lts: false,
  		security: false,
  		v8: "13.6.233.10"
  	},
  	{
  		name: "nodejs",
  		version: "24.3.0",
  		date: "2025-06-24",
  		lts: false,
  		security: false,
  		v8: "13.6.233.10"
  	},
  	{
  		name: "nodejs",
  		version: "24.4.0",
  		date: "2025-07-09",
  		lts: false,
  		security: false,
  		v8: "13.6.233.10"
  	},
  	{
  		name: "nodejs",
  		version: "24.5.0",
  		date: "2025-07-31",
  		lts: false,
  		security: false,
  		v8: "13.6.233.10"
  	},
  	{
  		name: "nodejs",
  		version: "24.6.0",
  		date: "2025-08-14",
  		lts: false,
  		security: false,
  		v8: "13.6.233.10"
  	},
  	{
  		name: "nodejs",
  		version: "24.7.0",
  		date: "2025-08-27",
  		lts: false,
  		security: false,
  		v8: "13.6.233.10"
  	},
  	{
  		name: "nodejs",
  		version: "24.8.0",
  		date: "2025-09-10",
  		lts: false,
  		security: false,
  		v8: "13.6.233.10"
  	},
  	{
  		name: "nodejs",
  		version: "24.9.0",
  		date: "2025-09-25",
  		lts: false,
  		security: false,
  		v8: "13.6.233.10"
  	},
  	{
  		name: "nodejs",
  		version: "24.10.0",
  		date: "2025-10-08",
  		lts: false,
  		security: false,
  		v8: "13.6.233.10"
  	},
  	{
  		name: "nodejs",
  		version: "24.11.0",
  		date: "2025-10-28",
  		lts: "Krypton",
  		security: false,
  		v8: "13.6.233.10"
  	},
  	{
  		name: "nodejs",
  		version: "24.12.0",
  		date: "2025-12-10",
  		lts: "Krypton",
  		security: false,
  		v8: "13.6.233.17"
  	},
  	{
  		name: "nodejs",
  		version: "24.13.0",
  		date: "2026-01-12",
  		lts: "Krypton",
  		security: true,
  		v8: "13.6.233.17"
  	},
  	{
  		name: "nodejs",
  		version: "24.14.0",
  		date: "2026-02-24",
  		lts: "Krypton",
  		security: false,
  		v8: "13.6.233.17"
  	},
  	{
  		name: "nodejs",
  		version: "24.15.0",
  		date: "2026-04-15",
  		lts: "Krypton",
  		security: false,
  		v8: "13.6.233.17"
  	},
  	{
  		name: "nodejs",
  		version: "24.16.0",
  		date: "2026-05-21",
  		lts: "Krypton",
  		security: false,
  		v8: "13.6.233.17"
  	},
  	{
  		name: "nodejs",
  		version: "24.17.0",
  		date: "2026-06-17",
  		lts: "Krypton",
  		security: true,
  		v8: "13.6.233.17"
  	},
  	{
  		name: "nodejs",
  		version: "24.18.0",
  		date: "2026-06-23",
  		lts: "Krypton",
  		security: false,
  		v8: "13.6.233.17"
  	},
  	{
  		name: "nodejs",
  		version: "24.19.0",
  		date: "2026-08-03",
  		lts: "Krypton",
  		security: false,
  		v8: "13.6.233.17"
  	},
  	{
  		name: "nodejs",
  		version: "24.20.0",
  		date: "2026-08-26",
  		lts: "Krypton",
  		security: false,
  		v8: "13.6.233.17"
  	},
  	{
  		name: "nodejs",
  		version: "25.0.0",
  		date: "2025-10-15",
  		lts: false,
  		security: false,
  		v8: "14.1.146.11"
  	},
  	{
  		name: "nodejs",
  		version: "25.1.0",
  		date: "2025-10-28",
  		lts: false,
  		security: false,
  		v8: "14.1.146.11"
  	},
  	{
  		name: "nodejs",
  		version: "25.2.0",
  		date: "2025-11-11",
  		lts: false,
  		security: false,
  		v8: "14.1.146.11"
  	},
  	{
  		name: "nodejs",
  		version: "25.3.0",
  		date: "2026-01-12",
  		lts: false,
  		security: true,
  		v8: "14.1.146.11"
  	},
  	{
  		name: "nodejs",
  		version: "25.4.0",
  		date: "2026-01-19",
  		lts: false,
  		security: false,
  		v8: "14.1.146.11"
  	},
  	{
  		name: "nodejs",
  		version: "25.5.0",
  		date: "2026-01-26",
  		lts: false,
  		security: false,
  		v8: "14.1.146.11"
  	},
  	{
  		name: "nodejs",
  		version: "25.6.0",
  		date: "2026-02-02",
  		lts: false,
  		security: false,
  		v8: "14.1.146.11"
  	},
  	{
  		name: "nodejs",
  		version: "25.7.0",
  		date: "2026-02-24",
  		lts: false,
  		security: false,
  		v8: "14.1.146.11"
  	},
  	{
  		name: "nodejs",
  		version: "25.8.0",
  		date: "2026-03-03",
  		lts: false,
  		security: false,
  		v8: "14.1.146.11"
  	},
  	{
  		name: "nodejs",
  		version: "25.9.0",
  		date: "2026-03-31",
  		lts: false,
  		security: false,
  		v8: "14.1.146.11"
  	},
  	{
  		name: "nodejs",
  		version: "26.0.0",
  		date: "2026-05-05",
  		lts: false,
  		security: false,
  		v8: "14.6.202.33"
  	},
  	{
  		name: "nodejs",
  		version: "26.1.0",
  		date: "2026-05-06",
  		lts: false,
  		security: false,
  		v8: "14.6.202.34"
  	},
  	{
  		name: "nodejs",
  		version: "26.2.0",
  		date: "2026-05-20",
  		lts: false,
  		security: false,
  		v8: "14.6.202.34"
  	},
  	{
  		name: "nodejs",
  		version: "26.3.0",
  		date: "2026-06-01",
  		lts: false,
  		security: false,
  		v8: "14.6.202.34"
  	},
  	{
  		name: "nodejs",
  		version: "26.4.0",
  		date: "2026-06-24",
  		lts: false,
  		security: false,
  		v8: "14.6.202.34"
  	},
  	{
  		name: "nodejs",
  		version: "26.5.0",
  		date: "2026-07-08",
  		lts: false,
  		security: false,
  		v8: "14.6.202.34"
  	},
  	{
  		name: "nodejs",
  		version: "26.6.0",
  		date: "2026-08-03",
  		lts: false,
  		security: false,
  		v8: "14.6.202.34"
  	},
  	{
  		name: "nodejs",
  		version: "26.7.0",
  		date: "2026-08-05",
  		lts: false,
  		security: false,
  		v8: "14.6.202.34"
  	},
  	{
  		name: "nodejs",
  		version: "26.8.0",
  		date: "2026-08-25",
  		lts: false,
  		security: false,
  		v8: "14.6.202.34"
  	}
  ];

  var agents$4 = {};

  var browsers$7 = {};

  var browsers$6={A:"ie",B:"edge",C:"firefox",D:"chrome",E:"safari",F:"opera",G:"ios_saf",H:"op_mini",I:"android",J:"bb",K:"op_mob",L:"and_chr",M:"and_ff",N:"ie_mob",O:"and_uc",P:"samsung",Q:"and_qq",R:"baidu",S:"kaios"};

  browsers$7.browsers = browsers$6;

  var browserVersions$1 = {};

  var browserVersions={"0":"116","1":"117","2":"118","3":"119","4":"120","5":"121","6":"122","7":"123","8":"124","9":"125",A:"10",B:"11",C:"12",D:"7",E:"8",F:"9",G:"15",H:"80",I:"151",J:"4",K:"27",L:"6",M:"13",N:"14",O:"16",P:"17",Q:"18",R:"79",S:"81",T:"83",U:"84",V:"85",W:"86",X:"87",Y:"88",Z:"89",a:"90",b:"91",c:"92",d:"93",e:"94",f:"95",g:"96",h:"97",i:"98",j:"99",k:"100",l:"101",m:"102",n:"103",o:"104",p:"105",q:"106",r:"107",s:"108",t:"109",u:"110",v:"111",w:"112",x:"113",y:"114",z:"115",AB:"126",BB:"127",CB:"131",DB:"20",EB:"21",FB:"22",GB:"23",HB:"24",IB:"25",JB:"26",KB:"28",LB:"29",MB:"30",NB:"128",OB:"129",PB:"130",QB:"132",RB:"133",SB:"134",TB:"135",UB:"136",VB:"137",WB:"138",XB:"139",YB:"140",ZB:"141",aB:"142",bB:"143",cB:"144",dB:"145",eB:"146",fB:"147",gB:"148",hB:"149",iB:"150",jB:"5",kB:"19",lB:"31",mB:"32",nB:"33",oB:"34",pB:"35",qB:"36",rB:"37",sB:"38",tB:"39",uB:"40",vB:"41",wB:"42",xB:"43",yB:"44",zB:"45","0B":"46","1B":"47","2B":"48","3B":"49","4B":"50","5B":"51","6B":"52","7B":"53","8B":"54","9B":"55",AC:"56",BC:"57",CC:"58",DC:"60",EC:"62",FC:"63",GC:"64",HC:"65",IC:"66",JC:"67",KC:"68",LC:"69",MC:"70",NC:"71",OC:"72",PC:"73",QC:"74",RC:"75",SC:"76",TC:"77",UC:"78",VC:"153",WC:"11.1",XC:"12.1",YC:"15.5",ZC:"16.0",aC:"17.0",bC:"18.0",cC:"3",dC:"59",eC:"61",fC:"82",gC:"152",hC:"154",iC:"3.2",jC:"10.1",kC:"15.2-15.3",lC:"15.4",mC:"16.1",nC:"16.2",oC:"16.3",pC:"16.4",qC:"16.5",rC:"17.1",sC:"17.2",tC:"17.3",uC:"17.4",vC:"17.5",wC:"18.1",xC:"18.2",yC:"18.3",zC:"18.4","0C":"18.5-18.7","1C":"26.0","2C":"26.1","3C":"26.2","4C":"26.3","5C":"26.4","6C":"26.5","7C":"26.6","8C":"11.5","9C":"4.2-4.3",AD:"5.5",BD:"2",CD:"155",DD:"156",ED:"157",FD:"3.5",GD:"3.6",HD:"3.1",ID:"5.1",JD:"6.1",KD:"7.1",LD:"9.1",MD:"13.1",ND:"14.1",OD:"15.1",PD:"15.6",QD:"16.6",RD:"17.6",SD:"TP",TD:"9.5-9.6",UD:"10.0-10.1",VD:"10.5",WD:"10.6",XD:"11.6",YD:"4.0-4.1",ZD:"5.0-5.1",aD:"6.0-6.1",bD:"7.0-7.1",cD:"8.1-8.4",dD:"9.0-9.2",eD:"9.3",fD:"10.0-10.2",gD:"10.3",hD:"11.0-11.2",iD:"11.3-11.4",jD:"12.0-12.1",kD:"12.2-12.5",lD:"13.0-13.1",mD:"13.2",nD:"13.3",oD:"13.4-13.7",pD:"14.0-14.4",qD:"14.5-14.8",rD:"15.0-15.1",sD:"15.6-15.8",tD:"16.6-16.7",uD:"17.6-17.7",vD:"all",wD:"2.1",xD:"2.2",yD:"2.3",zD:"4.1","0D":"4.4","1D":"4.4.3-4.4.4","2D":"5.0-5.4","3D":"6.2-6.4","4D":"7.2-7.4","5D":"8.2","6D":"9.2","7D":"11.1-11.2","8D":"12.0","9D":"13.0",AE:"14.0",BE:"15.0",CE:"19.0",DE:"14.9",EE:"13.52",FE:"2.5",GE:"3.0-3.1"};

  browserVersions$1.browserVersions = browserVersions;

  var agents$3={A:{A:{L:0,D:0,E:0,F:0,A:0,B:0.266336,AD:0},B:"ms",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","AD","L","D","E","F","A","B","","",""],E:"IE",F:{AD:962323200,L:998870400,D:1161129600,E:1237420800,F:1300060800,A:1346716800,B:1381968000}},B:{A:{"0":0,"1":0,"2":0,"3":0.179088,"4":0.18368,"5":0,"6":0.009184,"7":0,"8":0,"9":0,C:0,M:0,N:0,G:0,O:0,P:0,Q:0,R:0,H:0,S:0,T:0,U:0,V:0,W:0,X:0,Y:0,Z:0,a:0,b:0,c:0.009184,d:0,e:0,f:0,g:0,h:0,i:0,j:0,k:0,l:0,m:0,n:0,o:0,p:0,q:0,r:0,s:0,t:0.027552,u:0,v:0,w:0,x:0,y:0.004592,z:0,AB:0,BB:0,NB:0,OB:0,PB:0,CB:0.013776,QB:0,RB:0.004592,SB:0.004592,TB:0.009184,UB:0.004592,VB:0.004592,WB:0.009184,XB:0.009184,YB:0.009184,ZB:0.009184,aB:0.009184,bB:0.013776,cB:0.013776,dB:0.013776,eB:0.018368,fB:0.059696,gB:0.055104,hB:0.821968,iB:3.58635,I:0.004592},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","C","M","N","G","O","P","Q","R","H","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","AB","BB","NB","OB","PB","CB","QB","RB","SB","TB","UB","VB","WB","XB","YB","ZB","aB","bB","cB","dB","eB","fB","gB","hB","iB","I","","",""],E:"Edge",F:{"0":1692576000,"1":1694649600,"2":1697155200,"3":1698969600,"4":1701993600,"5":1706227200,"6":1708732800,"7":1711152000,"8":1713398400,"9":1715990400,C:1438128000,M:1447286400,N:1470096000,G:1491868800,O:1508198400,P:1525046400,Q:1542067200,R:1579046400,H:1581033600,S:1586736000,T:1590019200,U:1594857600,V:1598486400,W:1602201600,X:1605830400,Y:1611360000,Z:1614816000,a:1618358400,b:1622073600,c:1626912000,d:1630627200,e:1632441600,f:1634774400,g:1637539200,h:1641427200,i:1643932800,j:1646265600,k:1649635200,l:1651190400,m:1653955200,n:1655942400,o:1659657600,p:1661990400,q:1664755200,r:1666915200,s:1670198400,t:1673481600,u:1675900800,v:1678665600,w:1680825600,x:1683158400,y:1685664000,z:1689897600,AB:1718841600,BB:1721865600,NB:1724371200,OB:1726704000,PB:1729123200,CB:1731542400,QB:1737417600,RB:1740614400,SB:1741219200,TB:1743984000,UB:1746316800,VB:1748476800,WB:1750896000,XB:1754611200,YB:1756944000,ZB:1759363200,aB:1761868800,bB:1764806400,cB:1768780800,dB:1770854400,eB:1773446400,fB:1775692800,gB:1778112000,hB:1780531200,iB:1782950400,I:1785369600},D:{C:"ms",M:"ms",N:"ms",G:"ms",O:"ms",P:"ms",Q:"ms"}},C:{A:{"0":0,"1":0,"2":0,"3":0,"4":0.174496,"5":0.348992,"6":0,"7":0,"8":0,"9":0.059696,BD:0,cC:0,J:0,jB:0.009184,L:0,D:0,E:0,F:0,A:0,B:0,C:0,M:0,N:0,G:0,O:0,P:0,Q:0,kB:0,DB:0,EB:0,FB:0,GB:0,HB:0,IB:0,JB:0,K:0,KB:0,LB:0,MB:0,lB:0,mB:0,nB:0,oB:0,pB:0,qB:0,rB:0,sB:0,tB:0,uB:0,vB:0,wB:0,xB:0,yB:0,zB:0,"0B":0,"1B":0,"2B":0,"3B":0,"4B":0,"5B":0,"6B":0.004592,"7B":0,"8B":0,"9B":0,AC:0,BC:0,CC:0,dC:0,DC:0,eC:0,EC:0,FC:0,GC:0,HC:0,IC:0,JC:0,KC:0,LC:0,MC:0,NC:0,OC:0,PC:0,QC:0,RC:0,SC:0,TC:0,UC:0.004592,R:0,H:0,S:0,fC:0,T:0,U:0,V:0,W:0,X:0,Y:0,Z:0,a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0,i:0,j:0,k:0,l:0,m:0,n:0,o:0,p:0,q:0,r:0,s:0,t:0,u:0,v:0,w:0,x:0.004592,y:0,z:0.119392,AB:0.059696,BB:0.064288,NB:0.050512,OB:0.036736,PB:0.059696,CB:0.064288,QB:0.059696,RB:0.06888,SB:0.041328,TB:0.13776,UB:0.078064,VB:0,WB:0,XB:0,YB:0.06888,ZB:0,aB:0,bB:0,cB:0,dB:0,eB:0.004592,fB:0.009184,gB:0.009184,hB:0.009184,iB:0.027552,I:0.036736,gC:0.982688,VC:0.29848,hC:0,CD:0,DD:0,ED:0,FD:0,GD:0},B:"moz",C:["BD","cC","FD","GD","J","jB","L","D","E","F","A","B","C","M","N","G","O","P","Q","kB","DB","EB","FB","GB","HB","IB","JB","K","KB","LB","MB","lB","mB","nB","oB","pB","qB","rB","sB","tB","uB","vB","wB","xB","yB","zB","0B","1B","2B","3B","4B","5B","6B","7B","8B","9B","AC","BC","CC","dC","DC","eC","EC","FC","GC","HC","IC","JC","KC","LC","MC","NC","OC","PC","QC","RC","SC","TC","UC","R","H","S","fC","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","AB","BB","NB","OB","PB","CB","QB","RB","SB","TB","UB","VB","WB","XB","YB","ZB","aB","bB","cB","dB","eB","fB","gB","hB","iB","I","gC","VC","hC","CD","DD","ED"],E:"Firefox",F:{"0":1690848000,"1":1693267200,"2":1695686400,"3":1698105600,"4":1700524800,"5":1702944000,"6":1705968000,"7":1708387200,"8":1710806400,"9":1713225600,BD:1161648000,cC:1213660800,FD:1246320000,GD:1264032000,J:1300752000,jB:1308614400,L:1313452800,D:1317081600,E:1317081600,F:1320710400,A:1324339200,B:1327968000,C:1331596800,M:1335225600,N:1338854400,G:1342483200,O:1346112000,P:1349740800,Q:1353628800,kB:1357603200,DB:1361232000,EB:1364860800,FB:1368489600,GB:1372118400,HB:1375747200,IB:1379376000,JB:1386633600,K:1391472000,KB:1395100800,LB:1398729600,MB:1402358400,lB:1405987200,mB:1409616000,nB:1413244800,oB:1417392000,pB:1421107200,qB:1424736000,rB:1428278400,sB:1431475200,tB:1435881600,uB:1439251200,vB:1442880000,wB:1446508800,xB:1450137600,yB:1453852800,zB:1457395200,"0B":1461628800,"1B":1465257600,"2B":1470096000,"3B":1474329600,"4B":1479168000,"5B":1485216000,"6B":1488844800,"7B":1492560000,"8B":1497312000,"9B":1502150400,AC:1506556800,BC:1510617600,CC:1516665600,dC:1520985600,DC:1525824000,eC:1529971200,EC:1536105600,FC:1540252800,GC:1544486400,HC:1548720000,IC:1552953600,JC:1558396800,KC:1562630400,LC:1567468800,MC:1571788800,NC:1575331200,OC:1578355200,PC:1581379200,QC:1583798400,RC:1586304000,SC:1588636800,TC:1591056000,UC:1593475200,R:1595894400,H:1598313600,S:1600732800,fC:1603152000,T:1605571200,U:1607990400,V:1611619200,W:1614038400,X:1616457600,Y:1618790400,Z:1622505600,a:1626134400,b:1628553600,c:1630972800,d:1633392000,e:1635811200,f:1638835200,g:1641859200,h:1644364800,i:1646697600,j:1649116800,k:1651536000,l:1653955200,m:1656374400,n:1658793600,o:1661212800,p:1663632000,q:1666051200,r:1668470400,s:1670889600,t:1673913600,u:1676332800,v:1678752000,w:1681171200,x:1683590400,y:1686009600,z:1688428800,AB:1715644800,BB:1718064000,NB:1720483200,OB:1722902400,PB:1725321600,CB:1727740800,QB:1730160000,RB:1732579200,SB:1736208000,TB:1738627200,UB:1741046400,VB:1743465600,WB:1745884800,XB:1748304000,YB:1750723200,ZB:1753142400,aB:1755561600,bB:1757980800,cB:1760400000,dB:1762819200,eB:1765238400,fB:1768262400,gB:1771891200,hB:1774310400,iB:1776729600,I:1779148800,gC:1781568000,VC:1784592000,hC:1787011200,CD:null,DD:null,ED:null}},D:{A:{"0":0.20664,"1":0.09184,"2":0.211232,"3":0.36736,"4":0.509712,"5":0.013776,"6":0.036736,"7":0.018368,"8":0.174496,"9":0.087248,J:0,jB:0,L:0,D:0,E:0,F:0,A:0,B:0,C:0,M:0,N:0,G:0,O:0,P:0,Q:0,kB:0,DB:0,EB:0,FB:0,GB:0,HB:0,IB:0,JB:0,K:0,KB:0,LB:0,MB:0,lB:0,mB:0,nB:0,oB:0,pB:0,qB:0,rB:0,sB:0,tB:0.02296,uB:0.02296,vB:0.02296,wB:0.02296,xB:0.02296,yB:0.02296,zB:0.02296,"0B":0.02296,"1B":0.02296,"2B":0.027552,"3B":0.027552,"4B":0.02296,"5B":0.02296,"6B":0.027552,"7B":0.02296,"8B":0.02296,"9B":0.02296,AC:0.02296,BC:0.02296,CC:0.02296,dC:0.02296,DC:0.02296,eC:0,EC:0,FC:0,GC:0,HC:0,IC:0,JC:0,KC:0,LC:0.009184,MC:0.06888,NC:0,OC:0,PC:0,QC:0,RC:0,SC:0,TC:0,UC:0,R:0.018368,H:0,S:0,T:0,U:0,V:0,W:0.004592,X:0.02296,Y:0,Z:0,a:0,b:0.009184,c:0,d:0.009184,e:0,f:0,g:0,h:0.004592,i:0.02296,j:0.004592,k:0,l:0.009184,m:0.009184,n:0.146944,o:0.087248,p:0.087248,q:0.09184,r:0.09184,s:0.096432,t:0.583184,u:0.09184,v:0.101024,w:0.09184,x:0,y:0.018368,z:0.009184,AB:0.036736,BB:0.013776,NB:0.064288,OB:0.013776,PB:0.027552,CB:0.270928,QB:0.073472,RB:0.211232,SB:0.04592,TB:0.036736,UB:0.247968,VB:0.073472,WB:0.123984,XB:0.188272,YB:0.036736,ZB:0.04592,aB:0.257152,bB:0.073472,cB:0.101024,dB:0.904624,eB:0.110208,fB:0.220416,gB:0.716352,hB:5.04202,iB:9.15645,I:0.142352,gC:0.009184,VC:0,hC:0},B:"webkit",C:["","","","","","","","","J","jB","L","D","E","F","A","B","C","M","N","G","O","P","Q","kB","DB","EB","FB","GB","HB","IB","JB","K","KB","LB","MB","lB","mB","nB","oB","pB","qB","rB","sB","tB","uB","vB","wB","xB","yB","zB","0B","1B","2B","3B","4B","5B","6B","7B","8B","9B","AC","BC","CC","dC","DC","eC","EC","FC","GC","HC","IC","JC","KC","LC","MC","NC","OC","PC","QC","RC","SC","TC","UC","R","H","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","AB","BB","NB","OB","PB","CB","QB","RB","SB","TB","UB","VB","WB","XB","YB","ZB","aB","bB","cB","dB","eB","fB","gB","hB","iB","I","gC","VC","hC"],E:"Chrome",F:{"0":1692057600,"1":1694476800,"2":1696896000,"3":1698710400,"4":1701993600,"5":1705968000,"6":1708387200,"7":1710806400,"8":1713225600,"9":1715644800,J:1264377600,jB:1274745600,L:1283385600,D:1287619200,E:1291248000,F:1296777600,A:1299542400,B:1303862400,C:1307404800,M:1312243200,N:1316131200,G:1316131200,O:1319500800,P:1323734400,Q:1328659200,kB:1332892800,DB:1337040000,EB:1340668800,FB:1343692800,GB:1348531200,HB:1352246400,IB:1357862400,JB:1361404800,K:1364428800,KB:1369094400,LB:1374105600,MB:1376956800,lB:1384214400,mB:1389657600,nB:1392940800,oB:1397001600,pB:1400544000,qB:1405468800,rB:1409011200,sB:1412640000,tB:1416268800,uB:1421798400,vB:1425513600,wB:1429401600,xB:1432080000,yB:1437523200,zB:1441152000,"0B":1444780800,"1B":1449014400,"2B":1453248000,"3B":1456963200,"4B":1460592000,"5B":1464134400,"6B":1469059200,"7B":1472601600,"8B":1476230400,"9B":1480550400,AC:1485302400,BC:1489017600,CC:1492560000,dC:1496707200,DC:1500940800,eC:1504569600,EC:1508198400,FC:1512518400,GC:1516752000,HC:1520294400,IC:1523923200,JC:1527552000,KC:1532390400,LC:1536019200,MC:1539648000,NC:1543968000,OC:1548720000,PC:1552348800,QC:1555977600,RC:1559606400,SC:1564444800,TC:1568073600,UC:1571702400,R:1575936000,H:1580860800,S:1586304000,T:1589846400,U:1594684800,V:1598313600,W:1601942400,X:1605571200,Y:1611014400,Z:1614556800,a:1618272000,b:1621987200,c:1626739200,d:1630368000,e:1632268800,f:1634601600,g:1637020800,h:1641340800,i:1643673600,j:1646092800,k:1648512000,l:1650931200,m:1653350400,n:1655769600,o:1659398400,p:1661817600,q:1664236800,r:1666656000,s:1669680000,t:1673308800,u:1675728000,v:1678147200,w:1680566400,x:1682985600,y:1685404800,z:1689724800,AB:1718064000,BB:1721174400,NB:1724112000,OB:1726531200,PB:1728950400,CB:1731369600,QB:1736812800,RB:1738627200,SB:1741046400,TB:1743465600,UB:1745884800,VB:1748304000,WB:1750723200,XB:1754352000,YB:1756771200,ZB:1759190400,aB:1761609600,bB:1764633600,cB:1768262400,dB:1770681600,eB:1773100800,fB:1775520000,gB:1777939200,hB:1780358400,iB:1782777600,I:1785196800,gC:null,VC:null,hC:null}},E:{A:{J:0,jB:0,L:0,D:0,E:0,F:0,A:0,B:0,C:0,M:0,N:0.004592,G:0,K:0.009184,HD:0,iC:0,ID:0,JD:0,KD:0,LD:0,jC:0,WC:0,XC:0,MD:0.013776,ND:0.018368,OD:0,kC:0,lC:0,YC:0,PD:0.064288,ZC:0,mC:0.004592,nC:0.004592,oC:0.009184,pC:0.004592,qC:0.009184,QD:0.105616,aC:0.009184,rC:0.087248,sC:0.009184,tC:0.009184,uC:0.018368,vC:0.036736,RD:0.133168,bC:0.004592,wC:0.013776,xC:0.009184,yC:0.027552,zC:0.009184,"0C":0.293888,"1C":0.013776,"2C":0.013776,"3C":0.055104,"4C":0.078064,"5C":0.050512,"6C":1.35005,"7C":0,SD:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","HD","iC","J","jB","ID","L","JD","D","KD","E","F","LD","A","jC","B","WC","C","XC","M","MD","N","ND","G","OD","kC","lC","YC","PD","ZC","mC","nC","oC","pC","qC","QD","aC","rC","sC","tC","uC","vC","RD","bC","wC","xC","yC","zC","0C","1C","2C","3C","4C","5C","6C","7C","K","SD",""],E:"Safari",F:{HD:1205798400,iC:1226534400,J:1244419200,jB:1275868800,ID:1311120000,L:1343174400,JD:1382400000,D:1382400000,KD:1410998400,E:1413417600,F:1443657600,LD:1458518400,A:1474329600,jC:1490572800,B:1505779200,WC:1522281600,C:1537142400,XC:1553472000,M:1568851200,MD:1585008000,N:1600214400,ND:1619395200,G:1632096000,OD:1635292800,kC:1639353600,lC:1647216000,YC:1652745600,PD:1658275200,ZC:1662940800,mC:1666569600,nC:1670889600,oC:1674432000,pC:1679875200,qC:1684368000,QD:1690156800,aC:1695686400,rC:1698192000,sC:1702252800,tC:1705881600,uC:1709596800,vC:1715558400,RD:1722211200,bC:1726444800,wC:1730073600,xC:1733875200,yC:1737936000,zC:1743379200,"0C":1747008000,"1C":1757894400,"2C":1762128000,"3C":1762041600,"4C":1770854400,"5C":1774310400,"6C":1778457600,"7C":1785110400,K:null,SD:null}},F:{A:{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,F:0,B:0,C:0,G:0,O:0,P:0,Q:0,kB:0,DB:0,EB:0,FB:0,GB:0,HB:0,IB:0,JB:0,K:0,KB:0,LB:0,MB:0,lB:0,mB:0,nB:0,oB:0,pB:0,qB:0,rB:0,sB:0,tB:0,uB:0,vB:0,wB:0,xB:0,yB:0,zB:0,"0B":0.004592,"1B":0,"2B":0,"3B":0,"4B":0,"5B":0,"6B":0,"7B":0,"8B":0,"9B":0,AC:0,BC:0,CC:0,DC:0,EC:0,FC:0,GC:0,HC:0,IC:0,JC:0,KC:0,LC:0,MC:0,NC:0,OC:0,PC:0,QC:0,RC:0,SC:0,TC:0,UC:0,R:0,H:0,S:0,fC:0,T:0,U:0,V:0,W:0,X:0,Y:0,Z:0,a:0,b:0,c:0,d:0,e:0,f:0.027552,g:0,h:0,i:0.004592,j:0.02296,k:0.128576,l:0,m:0,n:0,o:0,p:0,q:0,r:0,s:0,t:0,u:0,v:0,w:0,x:0,y:0,z:0,AB:0,BB:0,CB:0.059696,TD:0,UD:0,VD:0,WD:0,WC:0,"8C":0,XD:0,XC:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","F","TD","UD","VD","WD","B","WC","8C","XD","C","XC","G","O","P","Q","kB","DB","EB","FB","GB","HB","IB","JB","K","KB","LB","MB","lB","mB","nB","oB","pB","qB","rB","sB","tB","uB","vB","wB","xB","yB","zB","0B","1B","2B","3B","4B","5B","6B","7B","8B","9B","AC","BC","CC","DC","EC","FC","GC","HC","IC","JC","KC","LC","MC","NC","OC","PC","QC","RC","SC","TC","UC","R","H","S","fC","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","AB","BB","CB","","",""],E:"Opera",F:{"0":1736294400,"1":1739404800,"2":1744675200,"3":1747094400,"4":1751414400,"5":1756339200,"6":1757548800,"7":1761609600,"8":1762992000,"9":1764806400,F:1150761600,TD:1223424000,UD:1251763200,VD:1267488000,WD:1277942400,B:1292457600,WC:1302566400,"8C":1309219200,XD:1323129600,C:1323129600,XC:1352073600,G:1372723200,O:1377561600,P:1381104000,Q:1386288000,kB:1390867200,DB:1393891200,EB:1399334400,FB:1401753600,GB:1405987200,HB:1409616000,IB:1413331200,JB:1417132800,K:1422316800,KB:1425945600,LB:1430179200,MB:1433808000,lB:1438646400,mB:1442448000,nB:1445904000,oB:1449100800,pB:1454371200,qB:1457308800,rB:1462320000,sB:1465344000,tB:1470096000,uB:1474329600,vB:1477267200,wB:1481587200,xB:1486425600,yB:1490054400,zB:1494374400,"0B":1498003200,"1B":1502236800,"2B":1506470400,"3B":1510099200,"4B":1515024000,"5B":1517961600,"6B":1521676800,"7B":1525910400,"8B":1530144000,"9B":1534982400,AC:1537833600,BC:1543363200,CC:1548201600,DC:1554768000,EC:1561593600,FC:1566259200,GC:1570406400,HC:1573689600,IC:1578441600,JC:1583971200,KC:1587513600,LC:1592956800,MC:1595894400,NC:1600128000,OC:1603238400,PC:1613520000,QC:1612224000,RC:1616544000,SC:1619568000,TC:1623715200,UC:1627948800,R:1631577600,H:1633392000,S:1635984000,fC:1638403200,T:1642550400,U:1644969600,V:1647993600,W:1650412800,X:1652745600,Y:1654646400,Z:1657152000,a:1660780800,b:1663113600,c:1668816000,d:1668643200,e:1671062400,f:1675209600,g:1677024000,h:1679529600,i:1681948800,j:1684195200,k:1687219200,l:1690329600,m:1692748800,n:1696204800,o:1699920000,p:1699920000,q:1702944000,r:1707264000,s:1710115200,t:1711497600,u:1716336000,v:1719273600,w:1721088000,x:1724284800,y:1727222400,z:1732665600,AB:1769990400,BB:1772064000,CB:1776124800},D:{F:"o",B:"o",C:"o",TD:"o",UD:"o",VD:"o",WD:"o",WC:"o","8C":"o",XD:"o",XC:"o"}},G:{A:{E:0,iC:0,YD:0,"9C":0.00137471,ZD:0,aD:0,bD:0.00274943,cD:0,dD:0.00137471,eD:0,fD:0,gD:0.0137471,hD:0.14572,iD:0.00274943,jD:0,kD:0.0426161,lD:0,mD:0.00137471,nD:0,oD:0.00274943,pD:0.00824828,qD:0.00962299,rD:0.0123724,kC:0.00687357,lC:0.00962299,YC:0.0109977,sD:0.230952,ZC:0.019246,mC:0.0329931,nC:0.0178713,oC:0.0371173,pC:0.00824828,qC:0.0137471,tD:0.306561,aC:0.0137471,rC:0.0178713,sC:0.0164966,tC:0.0233701,uC:0.0357426,vC:0.0728598,uD:0.178713,bC:0.0412414,wC:0.0783587,xC:0.0426161,yC:0.123724,zC:0.0563633,"0C":1.96309,"1C":0.118225,"2C":0.123724,"3C":0.343678,"4C":0.400042,"5C":0.339554,"6C":8.79954,"7C":0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","iC","YD","9C","ZD","aD","bD","E","cD","dD","eD","fD","gD","hD","iD","jD","kD","lD","mD","nD","oD","pD","qD","rD","kC","lC","YC","sD","ZC","mC","nC","oC","pC","qC","tD","aC","rC","sC","tC","uC","vC","uD","bC","wC","xC","yC","zC","0C","1C","2C","3C","4C","5C","6C","7C","","",""],E:"Safari on iOS",F:{iC:1270252800,YD:1283904000,"9C":1299628800,ZD:1331078400,aD:1359331200,bD:1394409600,E:1410912000,cD:1413763200,dD:1442361600,eD:1458518400,fD:1473724800,gD:1490572800,hD:1505779200,iD:1522281600,jD:1537142400,kD:1553472000,lD:1568851200,mD:1572220800,nD:1580169600,oD:1585008000,pD:1600214400,qD:1619395200,rD:1632096000,kC:1639353600,lC:1647216000,YC:1652659200,sD:1658275200,ZC:1662940800,mC:1666569600,nC:1670889600,oC:1674432000,pC:1679875200,qC:1684368000,tD:1690156800,aC:1694995200,rC:1698192000,sC:1702252800,tC:1705881600,uC:1709596800,vC:1715558400,uD:1722211200,bC:1726444800,wC:1730073600,xC:1733875200,yC:1737936000,zC:1743379200,"0C":1747008000,"1C":1757894400,"2C":1762128000,"3C":1765497600,"4C":1770854400,"5C":1774310400,"6C":1778457600,"7C":1785110400}},H:{A:{vD:0},B:"o",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","vD","","",""],E:"Opera Mini",F:{vD:1426464000}},I:{A:{cC:0,J:0,I:0.0324156,wD:0,xD:0,yD:0,zD:0.0000032448,"9C":0,"0D":0,"1D":0.0000129792},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","wD","xD","yD","cC","J","zD","9C","0D","1D","I","","",""],E:"Android Browser",F:{wD:1256515200,xD:1274313600,yD:1291593600,cC:1298332800,J:1318896000,zD:1341792000,"9C":1374624000,"0D":1386547200,"1D":1401667200,I:1784073600}},J:{A:{D:0,A:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","D","A","","",""],E:"Blackberry Browser",F:{D:1325376000,A:1359504000}},K:{A:{A:0,B:0,C:0,H:0.978848,WC:0,"8C":0,XC:0},B:"o",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","A","B","WC","8C","C","XC","H","","",""],E:"Opera Mobile",F:{A:1287100800,B:1300752000,WC:1314835200,"8C":1318291200,C:1330300800,XC:1349740800,H:1709769600},D:{H:"webkit"}},L:{A:{I:46.3251},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","I","","",""],E:"Chrome for Android",F:{I:1784073600}},M:{A:{VC:0.362336},B:"moz",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","VC","","",""],E:"Firefox for Android",F:{VC:1784592000}},N:{A:{A:0,B:0},B:"ms",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","A","B","","",""],E:"IE Mobile",F:{A:1340150400,B:1353456000}},O:{A:{YC:0.681408},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","YC","","",""],E:"UC Browser for Android",F:{YC:1710115200},D:{YC:"webkit"}},P:{A:{J:0,DB:0,EB:0.00684278,FB:0.00684278,GB:0.00684278,HB:0.00684278,IB:0.0136856,JB:0.0273711,K:0.0205283,KB:0.0547422,LB:0.102642,MB:1.088,"2D":0,"3D":0,"4D":0.00684278,"5D":0,"6D":0,jC:0,"7D":0,"8D":0,"9D":0,AE:0,BE:0,ZC:0,aC:0,bC:0,CE:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","J","2D","3D","4D","5D","6D","jC","7D","8D","9D","AE","BE","ZC","aC","bC","CE","DB","EB","FB","GB","HB","IB","JB","K","KB","LB","MB","","",""],E:"Samsung Internet",F:{J:1461024000,"2D":1481846400,"3D":1509408000,"4D":1528329600,"5D":1546128000,"6D":1554163200,jC:1567900800,"7D":1582588800,"8D":1593475200,"9D":1605657600,AE:1618531200,BE:1629072000,ZC:1640736000,aC:1651708800,bC:1659657600,CE:1667260800,DB:1677369600,EB:1684454400,FB:1689292800,GB:1697587200,HB:1711497600,IB:1715126400,JB:1717718400,K:1725667200,KB:1746057600,LB:1761264000,MB:1779235200}},Q:{A:{DE:0.097344},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","DE","","",""],E:"QQ Browser",F:{DE:1710288000}},R:{A:{EE:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","EE","","",""],E:"Baidu Browser",F:{EE:1710201600}},S:{A:{FE:0.005408,GE:0},B:"moz",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","FE","GE","","",""],E:"KaiOS Browser",F:{FE:1527811200,GE:1631664000}}};

  const browsers$5 = browsers$7.browsers;
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
    map[browsers$5[key]] = Object.keys(versionsData).reduce((data, entry) => {
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
  	"34.4": "132",
  	"34.5": "132",
  	"35.0": "134",
  	"35.1": "134",
  	"35.2": "134",
  	"35.3": "134",
  	"35.4": "134",
  	"35.5": "134",
  	"35.6": "134",
  	"35.7": "134",
  	"36.0": "136",
  	"36.1": "136",
  	"36.2": "136",
  	"36.3": "136",
  	"36.4": "136",
  	"36.5": "136",
  	"36.6": "136",
  	"36.7": "136",
  	"36.8": "136",
  	"36.9": "136",
  	"37.0": "138",
  	"37.1": "138",
  	"37.2": "138",
  	"37.3": "138",
  	"37.4": "138",
  	"37.5": "138",
  	"37.6": "138",
  	"37.7": "138",
  	"37.8": "138",
  	"37.9": "138",
  	"37.10": "138",
  	"38.0": "140",
  	"38.1": "140",
  	"38.2": "140",
  	"38.3": "140",
  	"38.4": "140",
  	"38.5": "140",
  	"38.6": "140",
  	"38.7": "140",
  	"38.8": "140",
  	"39.0": "142",
  	"39.1": "142",
  	"39.2": "142",
  	"39.3": "142",
  	"39.4": "142",
  	"39.5": "142",
  	"39.6": "142",
  	"39.7": "142",
  	"39.8": "142",
  	"40.0": "144",
  	"40.1": "144",
  	"40.2": "144",
  	"40.3": "144",
  	"40.4": "144",
  	"40.5": "144",
  	"40.6": "144",
  	"40.7": "144",
  	"40.8": "144",
  	"40.9": "144",
  	"40.10": "144",
  	"41.0": "146",
  	"41.1": "146",
  	"41.2": "146",
  	"41.3": "146",
  	"41.4": "146",
  	"41.5": "146",
  	"41.6": "146",
  	"41.7": "146",
  	"41.8": "146",
  	"41.9": "146",
  	"41.10": "146",
  	"42.0": "148",
  	"42.1": "148",
  	"42.2": "148",
  	"42.3": "148",
  	"42.4": "148",
  	"42.5": "148",
  	"42.6": "148",
  	"42.7": "148",
  	"42.8": "148",
  	"42.9": "148",
  	"42.10": "148",
  	"42.11": "148",
  	"43.0": "150",
  	"43.1": "150",
  	"43.2": "150",
  	"43.3": "150",
  	"43.4": "150",
  	"43.5": "150",
  	"43.6": "150",
  	"44.0": "152",
  	"44.1": "152",
  	"44.2": "152",
  	"45.0": "155"
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
  	start: "2025-05-06",
  	lts: "2025-10-28",
  	maintenance: "2026-10-20",
  	end: "2028-04-30",
  	codename: "Krypton"
  };
  var v25 = {
  	start: "2025-10-15",
  	maintenance: "2026-04-01",
  	end: "2026-06-01"
  };
  var v26 = {
  	start: "2026-05-05",
  	lts: "2026-10-28",
  	maintenance: "2027-10-20",
  	end: "2029-04-30",
  	codename: ""
  };
  var v27 = {
  	alpha: "2026-10-28",
  	start: "2027-04-22",
  	maintenance: "2027-10-20",
  	end: "2030-04-30",
  	codename: ""
  };
  var require$$4 = {
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
  	v24: v24,
  	v25: v25,
  	v26: v26,
  	v27: v27
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

    loadCountry: function loadCountry(/*AH+*/browserslistUsage, country) {
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

  var SPACE = /\s/;

  function flatten(array) {
    if (!Array.isArray(array)) return [array]
    // Iterative flatten: `reduce`+`concat` copies the accumulator on every step,
    // which is O(n²) once a query resolves to many nodes.
    var result = [];
    var stack = [array];
    while (stack.length) {
      var item = stack.pop();
      if (Array.isArray(item)) {
        for (var i = item.length - 1; i >= 0; i--) {
          stack.push(item[i]);
        }
      } else {
        result.push(item);
      }
    }
    return result
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

  function pushClause(all, qs, text, compose) {
    var node = matchQuery(all, text.trim());
    node.compose = compose;
    qs.push(node);
  }

  // Splits a query block into clauses on the `\s+and\s+`, `\s+or\s+` and `,\s*`
  // delimiters in a single left-to-right pass. The previous implementation grew
  // a suffix one character at a time and re-tested anchored `\s+…` regexps at
  // every length, which backtracks across whitespace runs and is O(n²) — a
  // small padded query could freeze the event loop for tens of seconds.
  function parseBlock(all, block, qs) {
    if (block.length === 0) return

    var len = block.length;
    var clauseStart = 0;
    // Compose for the clause currently being read; the leftmost clause is `or`.
    var compose = 'or';
    var i = 0;

    while (i < len) {
      var ch = block[i];

      if (ch === ',') {
        // `,\s*` delimiter. A delimiter at the very start (i === 0) has no left
        // clause — the original never emits one there.
        if (i !== 0) pushClause(all, qs, block.slice(clauseStart, i), compose);
        i++;
        while (i < len && SPACE.test(block[i])) i++;
        compose = 'or';
        clauseStart = i;
        continue
      }

      if (SPACE.test(ch)) {
        // Possible `\s+and\s+` or `\s+or\s+`. Scan the whitespace run once
        // (linear, no backtracking), then check the following keyword.
        var q = i;
        while (q < len && SPACE.test(block[q])) q++;

        if (
          q + 3 < len &&
          (block[q] === 'a' || block[q] === 'A') &&
          (block[q + 1] === 'n' || block[q + 1] === 'N') &&
          (block[q + 2] === 'd' || block[q + 2] === 'D') &&
          SPACE.test(block[q + 3])
        ) {
          // The leading `\s+` of `\s+and\s+` absorbs whitespace at the block
          // start, so a delimiter at i === 0 has no left clause.
          if (i !== 0) pushClause(all, qs, block.slice(clauseStart, i), compose);
          var afterAnd = q + 3;
          while (afterAnd < len && SPACE.test(block[afterAnd])) afterAnd++;
          compose = 'and';
          i = afterAnd;
          clauseStart = afterAnd;
          continue
        } else if (
          q + 2 < len &&
          (block[q] === 'o' || block[q] === 'O') &&
          (block[q + 1] === 'r' || block[q + 1] === 'R') &&
          SPACE.test(block[q + 2])
        ) {
          if (i !== 0) pushClause(all, qs, block.slice(clauseStart, i), compose);
          var afterOr = q + 2;
          while (afterOr < len && SPACE.test(block[afterOr])) afterOr++;
          compose = 'or';
          i = afterOr;
          clauseStart = afterOr;
          continue
        } else {
          // Whitespace inside a clause; skip the run and keep reading.
          i = q;
          continue
        }
      }

      i++;
    }

    pushClause(all, qs, block.slice(clauseStart), compose);
  }

  var parse$4 = function parse(all, queries) {
    if (!Array.isArray(queries)) queries = [queries];
    return flatten(
      queries.map(function (block) {
        var qs = [];
        parseBlock(all, block, qs);
        return qs
      })
    )
  };

  var bbm = dist;
  var jsReleases = require$$1;
  var agents$2 = agents$4.agents;
  var e2c = versions$1;
  var jsEOL = require$$4;
  var path = require$$5;

  var BrowserslistError = error;
  var env = browser;
  var parseWithoutCache = parse$4; // Will load browser.js in webpack

  var YEAR = 365.259641 * 24 * 60 * 60 * 1000;
  var ANDROID_EVERGREEN_FIRST = '37';
  var OP_MOB_BLINK_FIRST = 14;
  var FIREFOX_ESR_VERSION = '140';

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
    if (sign === '>') {
      return function (v) {
        return parseLatestFloat(v) > parseLatestFloat(version)
      }
    } else if (sign === '>=') {
      return function (v) {
        return parseLatestFloat(v) >= parseLatestFloat(version)
      }
    } else if (sign === '<') {
      return function (v) {
        return parseFloat(v) < parseFloat(version)
      }
    } else {
      return function (v) {
        return parseFloat(v) <= parseFloat(version)
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

  var DANGEROUS_KEYS = ['__proto__', 'constructor', 'prototype'];

  function copyObject(obj) {
    var copy = {};
    for (var key in obj) {
      if (DANGEROUS_KEYS.indexOf(key) === -1) {
        copy[key] = obj[key];
      }
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
        for (var i = 0; i < array.length; i++) {
          result.push(array[i]);
        }
        return result
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

  var CACHE_MAX_ENTRIES = 500;

  function boundedCacheSet(map, key, value) {
    if (map.size >= CACHE_MAX_ENTRIES) {
      map.delete(map.keys().next().value);
    }
    map.set(key, value);
  }

  var cache$1 = new Map();
  var parseCache = new Map();

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
      throwOnMissing: opts.throwOnMissing,
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
    if (cache$1.has(cacheKey)) return cache$1.get(cacheKey)

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
      boundedCacheSet(cache$1, cacheKey, result);
    }
    return result
  }

  function parseQueries(queries) {
    var cacheKey = JSON.stringify(queries);
    if (parseCache.has(cacheKey)) return parseCache.get(cacheKey)
    var result = parseWithoutCache(QUERIES, queries);
    if (!env.env.BROWSERSLIST_DISABLE_CACHE) {
      boundedCacheSet(parseCache, cacheKey, result);
    }
    return result
  }

  function loadCustomUsage(context, config) {
    var stats = env.loadStat(context, config, browserslist$3.data);
    if (stats) {
      context.customUsage = {};
      for (var browser in stats) {
        fillUsage(context.customUsage, browser, stats[browser]);
      }
    }
    if (!context.customUsage) {
      throw new BrowserslistError('Custom usage statistics was not provided')
    }
    return context.customUsage
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

  function bbmTransform(bbmVersions) {
    var browsers = {
      chrome: 'chrome',
      chrome_android: 'and_chr',
      edge: 'edge',
      firefox: 'firefox',
      firefox_android: 'and_ff',
      safari: 'safari',
      safari_ios: 'ios_saf',
      webview_android: 'android',
      samsunginternet_android: 'samsung',
      opera_android: 'op_mob',
      opera: 'opera',
      qq_android: 'and_qq',
      uc_android: 'and_uc',
      kai_os: 'kaios'
    };

    return bbmVersions
      .filter(function (version) {
        return Object.keys(browsers).indexOf(version.browser) !== -1
      })
      .map(function (version) {
        return browsers[version.browser] + ' >= ' + version.version
      })
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
    } else if (node.config) {
      usage = loadCustomUsage(context, node.config);
    }
    var versions = Object.keys(usage).sort(function (a, b) {
      return usage[b] - usage[a]
    });
    var covered = 0;
    var result = [];
    var version;
    for (var i = 0; i < versions.length; i++) {
      version = versions[i];
      if (usage[version] === 0) break
      covered += usage[version];
      result.push(version);
      if (covered >= coverage) break
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
      regexp: /^last\s+((\d+\.)?\d+)\s+years?$/i,
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
    baseline: {
      matches: ['year', 'availability', 'date', 'downstream', 'kaios'],
      // Matches:
      //   baseline 2024
      //   baseline newly available
      //   baseline widely available
      //   baseline widely available on 2024-06-01
      //   ...with downstream
      //   ...including kaios
      regexp:
        /^baseline\s+(?!\s)(?:(\d+)|(newly|widely)\s+(?!\s)available(?:\s+(?!\s)on\s+(?!\s)(\d{4}-\d{2}-\d{2}))?)?(\s+(?!\s)with\s+(?!\s)downstream)?(\s+(?!\s)including\s+(?!\s)kaios)?$/i,
      select: function (context, node) {
        var availability = node.availability && node.availability.toLowerCase();
        if (availability === 'newly' && node.date) {
          throw new BrowserslistError(
            'Using newly available with a date is not supported, please use "widely available on YYYY-MM-DD" and add 30 months to the date you specified.'
          )
        }

        var options = {
          includeDownstreamBrowsers: !!node.downstream,
          includeKaiOS: !!node.kaios,
          suppressWarnings: true
        };
        if (node.year) {
          options.targetYear = node.year;
        } else if (node.date) {
          options.widelyAvailableOnDate = node.date;
        } else if (availability === 'newly') {
          options.widelyAvailableOnDate = new Date().setMonth(
            new Date().getMonth() + 30
          );
        }

        var baselineVersions;
        if (options.includeKaiOS && !options.includeDownstreamBrowsers) {
          // baseline-browser-mapping counts KaiOS as a downstream browser and
          // refuses to return it alone, so take KaiOS from the downstream list
          // and everything else from the core one
          options.includeDownstreamBrowsers = true;
          var downstream = bbm.getCompatibleVersions(options);
          options.includeDownstreamBrowsers = false;
          options.includeKaiOS = false;
          baselineVersions = bbm.getCompatibleVersions(options).concat(
            downstream.filter(function (version) {
              return version.browser === 'kai_os'
            })
          );
        } else {
          baselineVersions = bbm.getCompatibleVersions(options);
        }
        return resolve(bbmTransform(baselineVersions), context)
      }
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
        var usage = loadCustomUsage(context, node.config);
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
    cover_config: {
      matches: ['coverage', 'config'],
      regexp: /^cover\s+(\d+|\d+\.\d+|\.\d+)%\s+in\s+(\S+)\s+stats$/i,
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
          .filter(semverFilterLoose('>=', node.from))
          .filter(semverFilterLoose('<=', node.to))
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
      regexp: /^(\w+)\s*(>=?|<=?)\s*([\d.]+|esr)$/i,
      select: function (context, node) {
        var version = node.version;
        var data = checkName(node.browser, context);
        var alias = browserslist$3.versionAliases[data.name][version.toLowerCase()];
        if (alias) version = alias;
        if (!/[\d.]+/.test(version)) {
          throw new BrowserslistError(
            'Unknown version ' + version + ' of ' + node.browser
          )
        }
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
        return ['firefox ' + FIREFOX_ESR_VERSION]
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

  browserslist$3.versionAliases.firefox.esr = FIREFOX_ESR_VERSION;

  var browserslist_1 = browserslist$3;

  var picocolors_browser = {exports: {}};

  var x=String;
  var create=function() {return {isColorSupported:false,reset:x,bold:x,dim:x,italic:x,underline:x,inverse:x,hidden:x,strikethrough:x,black:x,red:x,green:x,yellow:x,blue:x,magenta:x,cyan:x,white:x,gray:x,bgBlack:x,bgRed:x,bgGreen:x,bgYellow:x,bgBlue:x,bgMagenta:x,bgCyan:x,bgWhite:x,blackBright:x,redBright:x,greenBright:x,yellowBright:x,blueBright:x,magentaBright:x,cyanBright:x,whiteBright:x,bgBlackBright:x,bgRedBright:x,bgGreenBright:x,bgYellowBright:x,bgBlueBright:x,bgMagentaBright:x,bgCyanBright:x,bgWhiteBright:x}};
  picocolors_browser.exports=create();
  picocolors_browser.exports.createColors = create;

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

  var versionGroups$2 = {};

  var versionGroups$1={"0":"_I _IB","1":"_d ZD","2":"_qS _uI","3":"_4 _e","4":"J jB","5":"B C","6":"_Y _RF","7":"_vS _qI","8":"_BE _AB","9":"gD _AB",A:"A B",B:"D A",C:"FE GE",D:"_DE _aP",E:"_PC AD",F:"J _U",G:"_FD _rS",H:"_NC _JP",I:"_v _UB",J:"_YH _tI",K:"_H _tI",L:"FD GD",M:"_2 _p",N:"_DE _sS",O:"_KG _rS",P:"_TH _tE",Q:"_wI _BC",R:"_3T _WH",S:"_tS _xE",T:"_h _P",U:"_EB _vE",V:"F _A",W:"_FD _pK",X:"I _w",Y:"_4 _dC",Z:"_OC AD",a:"_H _pM",b:"_SC _uS",c:"_FB AD",d:"iC _HG",e:"HD iC",f:"_g _L",g:"BD cC",h:"F _5",i:"J _e",j:"_eM _hE",k:"wD xD",l:"_k yD",m:"_g _6",n:"_g _Y",o:"_d _wC",p:"_HD _AB",q:"_j _pE",r:"E _wS",s:"_4 _VH",t:"_q _SF",u:"_6 _cC",v:"C _AC",w:"0D 1D",x:"_wI _tB",y:"_1E AD",z:"_TC _p",AB:"_qK _jB",BB:"_5 _sS",CB:"_qM _sM",DB:"_o bD",EB:"_HH _NB",FB:"_dD E",GB:"_dD AD",HB:"_zI _WH",IB:"R _3D",JB:"C M",KB:"cC _l",LB:"_rM _WH",MB:"_4D _LP",NB:"_CG _qB",OB:"_2 _eC",PB:"F _ND",QB:"_0I _XH",RB:"_KG _0S",SB:"_RC _XH",TB:"_QG _vM",UB:"_9B _8B",VB:"_cC fC",WB:"_2 _HD",XB:"_4T _sM",YB:"H XC",ZB:"_v _9B",aB:"_m _VB",bB:"_DE _sB",cB:"_4T _cP",dB:"_2S _wS",eB:"F _jK",fB:"_A _sB",gB:"_EB _mU",hB:"_OB fD",iB:"_6T _cP",jB:"_oK _gD",kB:"_wE _tB",lB:"F TD",mB:"jB _XB",nB:"_tM _uS",oB:"_zI _xS",pB:"_QB jC",qB:"LB MB",rB:"EC FC",sB:"WC 8C",tB:"_VB _oM",uB:"_7D _hD",vB:"_4 L",wB:"_EB _5T",xB:"_EB _BU",yB:"_sE LD",zB:"FB _CC","0B":"_aC _aK","1B":"J _SH","2B":"_vS DC","3B":"_v G","4B":"EB _zB","5B":"_VP _CU","6B":"_KG _xI","7B":"_jC _p","8B":"P Q","9B":"G O",AC:"M N",BC:"_cC _rE",CC:"_GH _NB",DC:"_Y G",EC:"_wE _BC",FC:"_RF _BC",GC:"_Y _iD",HC:"_4 _dD",IC:"_RF _tB",JC:"_vC _A",KC:"_iK _kC",LC:"_g FD",MC:"_rK _xS",NC:"_KF _CH",OC:"_dD _vC",PC:"_OC _A",QC:"_fK _jI",RC:"_4 _OC",SC:"_H _h",TC:"E _mM",UC:"_EE _gE",VC:"_JD _oM",WC:"_xC _qE",XC:"_vB _hP",YC:"vB wB",ZC:"xB yB",aC:"_UB kB",bC:"_NF _QF",cC:"_lE _PF",dC:"_PC _v",eC:"dD eD",fC:"_mE _ED",gC:"D _vC",hC:"kB _EB",iC:"_PF _rE",jC:"E cD",kC:"_bP _jB",lC:"6B _iE",mC:"_AD IC",nC:"_1B 4D",oC:"_tS _VB",pC:"F _TH",qC:"J 2D",rC:"iC YD",sC:"_PH _qI",tC:"_wI _xE",uC:"_AT _uE",vC:"E F",wC:"ZD aD",xC:"_WB _qK",yC:"_n _iD",zC:"_WB hD","0C":"K _uE","1C":"_g _EU","2C":"_MG _FU","3C":"_vB _VH","4C":"_HC _hP","5C":"_OD _sB","6C":"_6T _AU","7C":"_QD _p","8C":"_jP _tI","9C":"_1K _gD",AD:"_rB _tT",BD:"_LF _j",CD:"dC DC",DD:"_oE _fS",ED:"_CD eC",FD:"cC J",GD:"jC WC",HD:"_eC _BE",ID:"_NH _ED",JD:"_PF fC",KD:"_LG _NF",LD:"_WB _IG",MD:"J _rI",ND:"_rM _dP",OD:"_uM _TH",PD:"_NH _vI",QD:"E _7T",RD:"_mI _IE",SD:"ID _yB",TD:"_TF _eP",UD:"C _YB",VD:"I 1D",WD:"_H _FC",XD:"_Y _bH",YD:"_5 _aP",ZD:"_HE _qE",aD:"_gP _xK",bD:"_yK _3I",cD:"_nU _xE",dD:"L D",eD:"sB tB",fD:"_kE _iE",gD:"_DD _9D",hD:"_mE _vI",iD:"_8D _6D",jD:"_ID _BC",kD:"_OF _ED",lD:"_A _v",mD:"_JD _pI",nD:"_FE _cM",oD:"_4D V",pD:"_4D _KP",qD:"_rB GC",rD:"E _uI",sD:"_NC 4",tD:"_EB _pU",uD:"_ZC zB",vD:"_OD _kK",wD:"_4S _0E",xD:"_lP _zS",yD:"_fH R",zD:"_7M _zS","0D":"_GU _FC","1D":"_IU _L","2D":"_oU _mK","3D":"H S","4D":"T U","5D":"_LH _jE","6D":"_MH _QC","7D":"_5D _bC","8D":"_nE _7D","9D":"_vT _FG",AE:"XC MD",BE:"fD gD",CE:"_mS _oS",DE:"_A C",EE:"_MB _cK",FE:"_AD _TP",GE:"O _8B",HE:"_DC _lU",IE:"_lK _jB",JE:"_fC _BC",KE:"_hE _pE",LE:"_Y _8D",ME:"_sK CB",NE:"_7D _6D",OE:"_GD _AE",PE:"_nK _gD",QE:"J _KU",RE:"K _MT",SE:"_H _zS",TE:"_fD 9B",UE:"_hS _RD",VE:"_0T _gD",WE:"_h _EJ",XE:"_aH 9D",YE:"_VF _YG",ZE:"_4I _9T",aE:"_SG _tI",bE:"_4S _jD",cE:"_oP _9T",dE:"_IT _jB",eE:"_LU _uE",fE:"AB BB",gE:"_qT _aI",hE:"_YS _JH",iE:"7B 8B",jE:"oB pB",kE:"5B 6B",lE:"_AD _hK",mE:"_6D _NH",nE:"_aC _EB",oE:"bC wC",pE:"gC _eS",qE:"ZC _lI",rE:"_BD _pE",sE:"JD KD",tE:"_kK XC",uE:"_nK _mK",vE:"_rI _nM",wE:"_7D _fC",xE:"_tB _L",yE:"_aC _HH",zE:"_MB _ZK","0E":"_ID _tB","1E":"_OC A","2E":"_IB fC","3E":"_fD _KH","4E":"_TF M","5E":"_Y _LG","6E":"_Y _KD","7E":"_H _PG","8E":"_H _xM","9E":"_EB _nM",AF:"_eC fD",BF:"_FD _QH",CF:"_n _OU",DF:"_LD kD",EF:"_mC JC",FF:"_4I _fP",GF:"_7S _0E",HF:"_pP _PD",IF:"_5M _EC",JF:"W X",KF:"0 1",LF:"_MB _ZM",MF:"_bM _SP",NF:"qB rB",OF:"_KH _dM",PF:"_fM _IB",QF:"_kI _YC",RF:"_PH _ED",SF:"_kU ED",TF:"_MG C",UF:"_yE IB",VF:"_LD _oI",WF:"HB _NB",XF:"_JP _fE",YF:"_MB _VS",ZF:"_fC _tB",aF:"_h _iD",bF:"_uK oB",cF:"_hC _uB",dF:"_aC DB",eF:"_9B P",fF:"_MB _GP",gF:"_jM QD",hF:"_Y _1S",iF:"_EE _qT",jF:"_GC _3E",kF:"_aH _YP",lF:"KD LD",mF:"_MD jC",nF:"_xC _oK",oF:"J _QH",pF:"_H _0E",qF:"_H _DU",rF:"_EB _kS",sF:"_EB _QU",tF:"_Y _1M",uF:"_Y _dF",vF:"_UH _yS",wF:"_wI _cC",xF:"_a XC",yF:"_x GD",zF:"_gP _7K","0F":"_2B _P","1F":"_ZB P","2F":"_VF qD","3F":"_iP _uB","4F":"_nC 5D","5F":"_6S _jD","6F":"_WG _QS","7F":"_9S _kB","8F":"_GT _mD","9F":"_qU _ZP",AG:"v w",BG:"_RS _IP",CG:"IB _rT",DG:"QC RC",EG:"_gI _sT",FG:"_jU 7C",GG:"_gM _hM",HG:"YD 9C",IG:"hD _iK",JG:"_GD _sI",KG:"_FD I",LG:"_nE _5D",MG:"_4 _PC",NG:"_aS _QC",OG:"KB _qB",PG:"_bC _hD",QG:"_4 _FB",RG:"_dM _ED",SG:"_H _GE",TG:"_yI _BC",UG:"_lE _DG",VG:"_kE 7B",WG:"_wM _EH",XG:"_oT _fE",YG:"_lS kC",ZG:"_vK 3B",aG:"_H _zB",bG:"_MH _fK",cG:"_wK mB",dG:"_sK _t",eG:"_lE QC",fG:"_HE _nK",gG:"_KE _SF",hG:"B _sB",iG:"L ID",jG:"1 _CH",kG:"eD _8",lG:"_NC _DH",mG:"_IB _oD",nG:"_IB _pD",oG:"_H _WM",pG:"_NH DC",qG:"_Y _aC",rG:"_Y _yE",sG:"_Y _vK",tG:"_oE _uT",uG:"_n _L",vG:"_wE _cC",wG:"_qM _rU",xG:"_W 0D",yG:"_u _UC",zG:"_HE _gF","0G":"_gP _AN","1G":"_aB _WT","2G":"_eB VD","3G":"_XF _q","4G":"_iP _EC","5G":"_YF _HP","6G":"_4M _uB","7G":"_fF d","8G":"_lH _kI","9G":"_HU _P",AH:"_ST _BC",BH:"_sU _0K",CH:"2 3",DH:"4 _mT",EH:"p _SS",FH:"DB EB",GH:"GB HB",HH:"_aK _GH",IH:"eB fB",JH:"_IH _hI",KH:"9B AC",LH:"lB _bS",MH:"_ZC _aS",NH:"_fD _OF",OH:"pC qC",PH:"_8D _mE",QH:"zD 9C",RH:"kD _hS",SH:"2D 3D",TH:"_jK _nI",UH:"G K",VH:"_e ID",WH:"_JG _uE",XH:"_VH _yB",YH:"_H _I",ZH:"_8D _MH",aH:"_MD _lM",bH:"_KD _kI",cH:"_XM _bK",dH:"_aC _FH",eH:"_zE _RS",fH:"_lE _fM",gH:"_h _8D",hH:"_1I _q",iH:"_1I _j",jH:"K _OG",kH:"_vC _lD",lH:"_5D _NF",mH:"_jM tD",nH:"u _bK",oH:"tB _2I",pH:"0B _QC",qH:"_mT _XG",rH:"_HC _vM",sH:"N G",tH:"pD _IE",uH:"_fE _t",vH:"_IB _rE",wH:"_IB _UC",xH:"_ZK _BG",yH:"_H h",zH:"_H _jD","0H":"_H _IC","1H":"_H _5S","2H":"_H _TG","3H":"_H _hH","4H":"_H _iH","5H":"_H _nH","6H":"_vC A","7H":"_LH oB","8H":"_Y _CJ","9H":"_6 _lE",AI:"_2 dD",BI:"_rK _fP",CI:"_RC _vM",DI:"_1E _SD",EI:"_3E BC",FI:"_SG _EN",GI:"_XF _j",HI:"_6S _PD",II:"_eH k",JI:"_zC iD",KI:"_4E _vU",LI:"_8M _q",MI:"_hF ND",NI:"_jF BC",OI:"_5K _tI",PI:"_BN _PG",QI:"_CN _xM",RI:"_aG _kB",SI:"_rP _6I",TI:"_KJ _hD",UI:"_LT _JE",VI:"_ZT _AU",WI:"_SU _L",XI:"_TU _P",YI:"_tU _P",ZI:"_uU _L",aI:"y z",bI:"7 8",cI:"n o",dI:"Z a",eI:"_QS u",fI:"RB SB",gI:"NB OB",hI:"_MP I",iI:"_QP PC",jI:"3B 4B",kI:"_eD uB",lI:"mC _cS",mI:"oD pD",nI:"VD WD",oI:"_RH _mI",pI:"_LF CB",qI:"DC _VB",rI:"_SH _pS",sI:"_AE _CE",tI:"_IB _BD",uI:"_wC _mM",vI:"_qI _pI",wI:"_H _6",xI:"_QH _w",yI:"_bC _fC",zI:"B _rK","0I":"_RC A","1I":"_dI _ZM","2I":"uB _YC","3I":"XD XC","4I":"_AC _UH","5I":"_bS _jE","6I":"_OF _vI","7I":"_kD _tB","8I":"_tK LB","9I":"jB _dC",AJ:"rB _QF",BJ:"_OH _1T",CJ:"_ZH 1B",DJ:"_HD _IG",EJ:"_TH _kK",FJ:"CC _ED",GJ:"HC _hK",HJ:"_Y _PH",IJ:"_n _8D",JJ:"_pT _YK",KJ:"_H wB",LJ:"DC eC",MJ:"_H _3S",NJ:"_H _2I",OJ:"_7D _mE",PJ:"_PH DC",QJ:"D E",RJ:"kB _HH",SJ:"K _CT",TJ:"RC _eK",UJ:"ID _sE",VJ:"jD _kC",WJ:"_H _3D",XJ:"_H _7I",YJ:"_H _ME",ZJ:"_H _pH",aJ:"_H _PT",bJ:"_H _LN",cJ:"_EB _xU",dJ:"_sT _MF",eJ:"_5D qB",fJ:"_6D 5B",gJ:"_dC G",hJ:"_Y _0B",iJ:"_Y _tK",jJ:"_Y _UF",kJ:"_Y _8I",lJ:"_Y _9M",mJ:"_pE _SF",nJ:"_DD _vT",oJ:"_SH 4D",pJ:"_FD _xI",qJ:"_DE M",rJ:"_YH _IB",sJ:"_gC _A",tJ:"_LD _RH",uJ:"_u _4D",vJ:"_GC _VG",wJ:"_0 _4D",xJ:"_sK _j",yJ:"_jC _DJ",zJ:"_gP _tE","0J":"_nD NC","1J":"_yC _UU","2J":"_yC _wU","3J":"_jP _cF","4J":"_YF f","5J":"_UG SC","6J":"_LE _ZC","7J":"_mP _JE","8J":"_mP _ZF","9J":"_2M _JE",AK:"_TD XC",BK:"_BT _PG",CK:"_5E qB",DK:"_6K _EC",EK:"_DT _j",FK:"_DT _q",GK:"_GN _jD",HK:"_OT _iC",IK:"_AL _oK",JK:"_BL q",KK:"_DL _XS",LK:"_MN _mD",MK:"_uP _DU",NK:"_xP n",OK:"_aT _vE",PK:"_bT _FC",QK:"_cT CB",RK:"_VU _L",SK:"_yU _P",TK:"_zU _P",UK:"_0U _P",VK:"_1U _L",WK:"_2U _L",XK:"_3U _P",YK:"_HP h",ZK:"_VS _YK",aK:"_FH FB",bK:"_gE _fE",cK:"_ZK _YM",dK:"_OP _WS",eK:"_RP UC",fK:"1B 2B",gK:"_cM _iI",hK:"_TP _gK",iK:"iD jD",jK:"TD UD",kK:"_sB XD",lK:"_lS _nS",mK:"_gD SD",nK:"_jM _1T",oK:"_jM _2T",pK:"_l _QH",qK:"_IG _bP",rK:"_v _UH",sK:"_YM _bK",tK:"_yE _CG",uK:"_nE _LH",vK:"_ZH _fK",wK:"_nE lB",xK:"_nI _tE",yK:"_yM _pM",zK:"_rT _qB","0K":"_mS kC","1K":"_OH _2T","2K":"_kD _BC","3K":"_LF _EG","4K":"_2E _pI","5K":"_H Q","6K":"_H MB","7K":"WD _tE","8K":"KC _gK","9K":"_RH oD",AL:"_HD _qK",BL:"_wM p",CL:"_nD _QP",DL:"_3K _bM",EL:"_H _cH",FL:"F A",GL:"B _v",HL:"_UG _RP",IL:"_sP _YS",JL:"C XC",KL:"C _aP",LL:"C _3I",ML:"Q _hC",NL:"J _xI",OL:"J _WU",PL:"8C _3I",QL:"_nT _cI",RL:"_EH _QS",SL:"_H _YK",TL:"_H _tB",UL:"_H _n",VL:"_H _hD",WL:"_H _2K",XL:"_H _VT",YL:"_H _yP",ZL:"_H _4U",aL:"_H _5U",bL:"_vC _ND",cL:"_EB _ZP",dL:"_LF _gI",eL:"_OF DC",fL:"_PF _oD",gL:"_Y _UB",hL:"_Y _wK",iL:"_Y _dH",jL:"_Y _eF",kL:"_Y _ZG",lL:"_fS _9D",mL:"_FD _ON",nL:"_IG _oI",oL:"_wC bD",pL:"_GD XC",qL:"_JG _nK",rL:"_fC _cC",sL:"_n _PH",tL:"_n _dT",uL:"_n _YU",vL:"_n _ZU",wL:"_m _6U",xL:"_hC _EC",yL:"_FE LC",zL:"_0 _wM","0L":"_sK _q","1L":"_GE _hC","2L":"_yK XC","3L":"_6S _0E","4L":"_7S _jD","5L":"_lP _FC","6L":"_mP _hD","7L":"_oP _yS","8L":"_2M _ZF","9L":"_pP _0E",AM:"_4M _EC",BM:"_8M _j",CM:"_rP _7I",DM:"_DN _6I",EM:"_DN _2K",FM:"_ET _7I",GM:"_FT _uB",HM:"_FN _0E",IM:"_NT _IC",JM:"_NJ _hD",KM:"_OJ DC",LM:"_NU _P",MM:"_NU _XU",NM:"_UT _VC",OM:"_NN _vE",PM:"_PN _L",QM:"_zP _BC",RM:"_0P _iC",SM:"_7U _pI",TM:"_8U _P",UM:"_9U _P",VM:"_AV _L",WM:"_JF Y",XM:"_EH _eI",YM:"_BG _XM",ZM:"_cK _bK",aM:"TB UB",bM:"_fI _aM",cM:"LC MC",dM:"BC CC",eM:"_EG _MF",fM:"_DG _eK",gM:"aC rC",hM:"sC tC",iM:"3C 4C",jM:"_qE _OH",kM:"aC _yT",lM:"jC _zT",mM:"bD cD",nM:"_lM _ZP",oM:"_rE _SF",pM:"_PH _vI",qM:"_Y _UH",rM:"_A _rK",sM:"ID _cP",tM:"_H _5",uM:"F B",vM:"_VH _sE",wM:"_zE _BG",xM:"_yI _tB",yM:"_H C",zM:"_tT _hK","0M":"2B _jI","1M":"_0B GB","2M":"_H _YC","3M":"_ZS _gK","4M":"_H _WF","5M":"_H _zK","6M":"OD _oS","7M":"_H N","8M":"_H _8T","9M":"_UF _US",AN:"UD _xK",BN:"_H pB",CN:"_H _jE",DN:"_H 8B",EN:"_hC _kB",FN:"_H _QC",GN:"_H _NG",HN:"_H _hK",IN:"_H _8S",JN:"_UF JB",KN:"_2E _oM",LN:"PC _mD",MN:"_H _iI",NN:"J _HH",ON:"yD _QH",PN:"_n _KD",QN:"_H _JU",RN:"_MH 1B",SN:"_V _v",TN:"_xC _mH",UN:"WC _sI",VN:"_H _8K",WN:"_H _XT",XN:"_OE _0K",YN:"C _sS",ZN:"N _UB",aN:"J _vE",bN:"EB _eT",cN:"IB JB",dN:"K _mK",eN:"yB _aS",fN:"UD VD",gN:"9C _w",hN:"pD _lK",iN:"_8B _hC",jN:"_XM _gE",kN:"_H _IB",lN:"_H _iC",mN:"_H _4B",nN:"_H _cF",oN:"_H _SN",pN:"_H _1P",qN:"_H _BV",rN:"_PC C",sN:"_dM _vI",tN:"_NF _kI",uN:"_7D _RN",vN:"_mE DC",wN:"_Y _9B",xN:"_Y _ZH",yN:"_Y _uK",zN:"_dS _9D","0N":"_FD _l","1N":"_FD _0S","2N":"_6 EC","3N":"_n _GV","4N":"_3T _cU","5N":"_zE i","6N":"_EE v","7N":"_LD _9K","8N":"_u _MB","9N":"_GC 5B",AO:"_GC _kE",BO:"_GC _fD",CO:"_0 _UC",DO:"_0 _iF",EO:"_GE kB",FO:"_lD G",GO:"_pD Z",HO:"_iP _kB",IO:"_LE xB",JO:"_2M _hD",KO:"_NE 5B",LO:"_NE _fD",MO:"_8S _bC",NO:"_9S _uB",OO:"_BT _xM",PO:"_BT _TG",QO:"_6K _uB",RO:"_BN _xM",SO:"_CN _PG",TO:"_ET _6I",UO:"_FT _EC",VO:"_HJ dC",WO:"_HJ _CD",XO:"_HT _EV",YO:"_IJ _L",ZO:"_IJ _FV",aO:"_JJ _dG",bO:"_tP CB",cO:"_JT _kB",dO:"_JT _EC",eO:"_FN _jD",fO:"_KT _uB",gO:"_KT _EC",hO:"_LT _hD",iO:"_HU _DV",jO:"_mF 7D",kO:"_HN _iC",lO:"_HN _VC",mO:"_IN _xM",nO:"_IN _TG",oO:"_qH _t",pO:"_NT _FC",qO:"_QT _uI",rO:"_QT _wS",sO:"_TT _iC",tO:"_TT _VC",uO:"_YT _hH",vO:"_EL _j",wO:"_QN _t",xO:"_TN _GG",yO:"_2P _KN",zO:"_3P 3B","0O":"_4P aC","1O":"_gT _aU","2O":"_hT _gD","3O":"_iT iD","4O":"_bU _FC","5O":"_dU _P","6O":"_CV _vE","7O":"_HV _P","8O":"_IV _P","9O":"_JV _P",AP:"_KV _P",BP:"_LV _L",CP:"_MV _L",DP:"_NV _L",EP:"_OV _L",FP:"_PV _P",GP:"b c",HP:"f g",IP:"_TS _cI",JP:"_DH _oT",KP:"V _WM",LP:"_KP _dI",MP:"_iU iB",NP:"WB XB",OP:"YB ZB",PP:"CB QB",QP:"NC OC",RP:"SC TC",SP:"_XS _dK",TP:"IC _ZS",UP:"1C 2C",VP:"lC YC",WP:"uC vC",XP:"mD nD",YP:"9D AE",ZP:"_YP _kS",aP:"_sB XC",bP:"_oI _lK",cP:"_yB _WH",dP:"LD _WH",eP:"_XH _GD",fP:"_sI _uE",gP:"_tM _pM",hP:"_VH JD",iP:"_H _NB",jP:"_H _8B",kP:"yB _NG",lP:"_H _AC",mP:"_H _QF",nP:"_VP PD",oP:"N _UH",pP:"_H _kP",qP:"cC _6",rP:"_H _lC",sP:"_LF _eM",tP:"_H _ZM",uP:"_H AC",vP:"_H _jH",wP:"_H _PU",xP:"_eH _TS",yP:"TC UC",zP:"_H _FJ","0P":"_H _GJ","1P":"X Y","2P":"_H UC","3P":"_7D _bG","4P":"_kF _gS","5P":"B _3B","6P":"g h","7P":"OC PC","8P":"WC XC","9P":"_H _ED",AQ:"_H _oH",BQ:"_H _LJ",CQ:"L AD",DQ:"9 _fE",EQ:"C H",FQ:"C _tE",GQ:"R H",HQ:"m _cI",IQ:"J iC",JQ:"jB ID",KQ:"kB _aK",LQ:"IB _US",MQ:"K _kT",NQ:"K _hU",OQ:"lB mB",PQ:"pB _bC",QQ:"pB _yI",RQ:"6B 7B",SQ:"fC _oM",TQ:"8C XC",UQ:"xD yD",VQ:"_3D _rE",WQ:"_KF 2",XQ:"_IB _4D",YQ:"_H _v",ZQ:"_H _JE",aQ:"_H _ZF",bQ:"_H _KN",cQ:"_H _GL",dQ:"_H _6P",eQ:"_H _QV",fQ:"_H _RV",gQ:"_H _UV",hQ:"_AC _UB",iQ:"_vC _lF",jQ:"_EB _yT",kQ:"_EB _kM",lQ:"_dK _gG",mQ:"_SP _hE",nQ:"_SP _KE",oQ:"_NF sB",pQ:"_iE _OF",qQ:"_AD _L",rQ:"_4 ID",sQ:"_7D xB",tQ:"_dC _LG",uQ:"_Y _bF",vQ:"_WP _eU",wQ:"_DD _UP",xQ:"_5 _AN",yQ:"_5 _8P",zQ:"_lM _YP","0Q":"_nI _kK","1Q":"_6 _AD","2Q":"_6 _FE","3Q":"_6 _mC","4Q":"_6 _qD","5Q":"_6 _eG","6Q":"_yB jC","7Q":"_yB _XN","8Q":"_h _XV","9Q":"_KG _fU",AR:"_wE _VB",BR:"_iD 5B",CR:"_V AD",DR:"_EE _AG",ER:"_MG _eP",FR:"_u _WG",GR:"_u _iF",HR:"_HE ZC",IR:"_1I CB",JR:"_OD WC",KR:"_2B _ZV",LR:"_7 _WV",MR:"_7 _iV",NR:"_yC _L",OR:"_oD _JF",PR:"_2S _uI",QR:"_RG _tB",RR:"_yK _tE",SR:"_aF _TV",TR:"_aF _YV",UR:"_7S _PD",VR:"_4E _1S",WR:"_9S _EC",XR:"_3M _lT",YR:"_DJ _oI",ZR:"_DJ _9K",aR:"_gH _P",bR:"_oC _IL",cR:"_5M _kB",dR:"_lF jC",eR:"_5K _EN",fR:"_ET _2K",gR:"_FT _kB",hR:"_GT _VC",iR:"_sP cB",jR:"_HT _P",kR:"_JJ _YM",lR:"_tP _j",mR:"_tP _q",nR:"_JT _uB",oR:"_GN _PD",pR:"_KT _kB",qR:"_6E sB",rR:"_MJ _j",sR:"_MJ _q",tR:"_nF _DD",uR:"_OT _VC",vR:"_fG _DD",wR:"_UT _iC",xR:"_VT G",yR:"_rH SD",zR:"_YT _iH","0R":"_vP _uB","1R":"_vP _kB","2R":"_wP _j","3R":"_wP _q","4R":"_PJ _CL","5R":"_FL _jT","6R":"_HL _L","7R":"_VN _VC","8R":"_WN _ME","9R":"_5P _UN",AS:"_7P _JD",BS:"_9P _BC",CS:"_AQ _JE",DS:"_BQ _tB",ES:"_gU _iC",FS:"_SV _CT",GS:"_VV CB",HS:"_aV _L",IS:"_bV _P",JS:"_cV _P",KS:"_dV _P",LS:"_eV _L",MS:"_fV _L",NS:"_gV _L",OS:"_hV _L",PS:"_jV _P",QS:"s t",RS:"i j",SS:"q r",TS:"k _nT",US:"JB K",VS:"_GP _pT",WS:"aB bB",XS:"VB _NP",YS:"cB dB",ZS:"JC KC",aS:"zB 0B",bS:"mB nB",cS:"nC oC",dS:"zC 0C",eS:"VC hC",fS:"_uT _dS",gS:"BE ZC",hS:"lD _XP",iS:"_wT RD",jS:"5D 6D",kS:"_gS _kM",lS:"qD rD",mS:"ND OD",nS:"_xT sD",oS:"_xT PD",pS:"4D _jS",qS:"E _d",rS:"_pK _w",sS:"H _aP",tS:"_H _m",uS:"_pM _P",vS:"_h _PH",wS:"_uI _p",xS:"WC _fP",yS:"_CE _uE",zS:"_UB _tI","0S":"yD _xI","1S":"_eP _AE","2S":"E _HG","3S":"_aI _fE","4S":"_H _jI","5S":"_eI _bK","6S":"_H _0M","7S":"_H 4B","8S":"nB _jE","9S":"_H _qB",AT:"K _nP",BT:"_H _5I",CT:"_9D SD",DT:"_H _bK",ET:"_H _iE",FT:"_H _CC",GT:"_H _zM",HT:"_h _KD",IT:"rD _nS",JT:"_H _EB",KT:"_H _OG",LT:"_H _AJ",MT:"_BJ _mK",NT:"_H _dC",OT:"_H _3M",PT:"_eK _4K",QT:"E 9C",RT:"_SS _5S",ST:"_H eC",TT:"_H _gK",UT:"_H _MU",VT:"_gC _lD",WT:"_UC _L",XT:"e _YK",YT:"_H Y",ZT:"_vC _rM",aT:"J _aK",bT:"_H _kH",cT:"_H _RT",dT:"_ZH _L",eT:"FB _GH",fT:"MC _iI",gT:"_vC _DE",hT:"_WP uD",iT:"_HD hD",jT:"LD jC",kT:"_FG SD",lT:"_mD _P",mT:"5 6",nT:"l m",oT:"_bI 9",pT:"d e",qT:"_AG x",rT:"_US KB",sT:"PB _PP",tT:"GC HC",uT:"xC yC",vT:"_UP _iM",wT:"_GG _WP",xT:"kC _VP",yT:"bC CE",zT:"7D 8D","0T":"_wT uD","1T":"QD _iS","2T":"tD _0T","3T":"_qM _XH","4T":"_dC _UH","5T":"_pS _nM","6T":"_gC _rM","7T":"aD _mM","8T":"_LP _ZM","9T":"MD _yS",AU:"KD _dP",BU:"_jS _nM",CU:"sD _jB",DU:"_RG _BC",EU:"_4 _L",FU:"_XH jC",GU:"_H _9I",HU:"_h _LG",IU:"_n _tK",JU:"x _3S",KU:"I _xI",LU:"_UH _6M",MU:"FC _zM",NU:"_h _bH",OU:"_dH _L",PU:"U _8T",QU:"6D _nM",RU:"_IP _cH",SU:"_n _LG",TU:"_gH xB",UU:"_kE _L",VU:"_g _RC",WU:"DB _vE",XU:"vB _P",YU:"_UB _L",ZU:"_nE _L",aU:"LD _GD",bU:"_H _lD",cU:"_JG _PE",dU:"_HT _eD",eU:"RD _mK",fU:"xD _0S",gU:"_H _fT",hU:"_fS _CT",iU:"gB hB",jU:"5C 6C",kU:"CD DD",lU:"_XH _JG",mU:"3D _5T",nU:"_H _qP",oU:"K _iS",pU:"AE _kS",qU:"_EB _zT",rU:"iC _sM",sU:"_DC _1S",tU:"_h _yE",uU:"_n _cG",vU:"_eP XC",wU:"5B _L",xU:"8D _ZP",yU:"_h _1M",zU:"_h _bF","0U":"_h _9M","1U":"_n _yE","2U":"_n _CJ","3U":"_aF _VG","4U":"a _ZM","5U":"r _5S","6U":"EC _L","7U":"_H _VB","8U":"_h _wK","9U":"_h _8I",AV:"_n _vK",BV:"j _RU",CV:"J _FH",DV:"qB _P",EV:"sB _P",FV:"xB _L",GV:"_9B _L",HV:"_h _0B",IV:"_h _uK",JV:"_h _ZG",KV:"_h _JN",LV:"_n _UF",MV:"_n _uK",NV:"_n _wK",OV:"_n _8I",PV:"_2B _nD",QV:"o _cH",RV:"w _JU",SV:"K _dS",TV:"5B _P",UV:"RC _PT",VV:"_H _RU",WV:"_MB _P",XV:"_UB _P",YV:"_kE _P",ZV:"_AD _P",aV:"_g _HC",bV:"_h _ZH",cV:"_h _tK",dV:"_h _dH",eV:"_n _1M",fV:"_n _bF",gV:"_n _eF",hV:"_n _JN",iV:"_zE _P",jV:"_2B _CL"};

  versionGroups$2.versionGroups = versionGroups$1;

  const statuses = statuses$1;
  const supported$1 = supported$2;
  const browsers$4 = browsers$7.browsers;
  const versions = browserVersions$1.browserVersions;
  const versionGroups = versionGroups$2.versionGroups;

  const MATH2LOG = Math.log(2);

  const groupCache = {};

  function expandKey(key) {
    let cached = groupCache[key];
    if (cached === undefined) {
      cached = groupCache[key] = expandGroups(versionGroups[key], []);
    }
    return cached
  }

  function expandGroups(value, out) {
    let start = 0;
    for (let i = 0, len = value.length; i <= len; i++) {
      if (i === len || value.charCodeAt(i) === 32) {
        if (i > start) {
          if (value.charCodeAt(start) === 95) {
            let group = expandKey(value.slice(start + 1, i));
            for (let j = 0; j < group.length; j++) out.push(group[j]);
          } else {
            out.push(value.slice(start, i));
          }
        }
        start = i + 1;
      }
    }
    return out
  }

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
      browserStats[browsers$4[key]] = Object.keys(browser).reduce(
        (stats, support) => {
          let packedVersions = expandGroups(browser[support], []);
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
  	borderRadius$1={A:{A:{"1":"_V","2":"_c"},B:{"1":"_J"},C:{"1":"_GF","257":"_kL","289":"cC _L","292":"BD"},D:{"1":"_0D","33":"J"},E:{"1":"jB _6C","33":"_i","129":"_iG JD"},F:{"1":"_aD","2":"_eB"},G:{"1":"_dB","33":"iC"},H:{"2":"vD"},I:{"1":"_9Q","33":"wD"},J:{"1":"_B"},K:{"1":"_BB","2":"A"},L:{"1":"I"},M:{"1":"VC"},N:{"1":"_A"},O:{"1":"YC"},P:{"1":"_F"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"GE","257":"FE"}},B:4,C:"CSS3 Border-radius (rounded corners)",D:true};
  	return borderRadius$1;
  }

  var cssBoxshadow;
  var hasRequiredCssBoxshadow;

  function requireCssBoxshadow () {
  	if (hasRequiredCssBoxshadow) return cssBoxshadow;
  	hasRequiredCssBoxshadow = 1;
  	cssBoxshadow={A:{A:{"1":"_V","2":"_c"},B:{"1":"_J"},C:{"1":"_x","2":"_g","33":"_L"},D:{"1":"_4O","33":"_RC"},E:{"1":"_XB","33":"jB","164":"_i"},F:{"1":"_aD","2":"_eB"},G:{"1":"_r","33":"_HG","164":"iC"},H:{"2":"vD"},I:{"1":"_QE","164":"_KB"},J:{"1":"A","33":"D"},K:{"1":"_BB","2":"A"},L:{"1":"I"},M:{"1":"VC"},N:{"1":"_A"},O:{"1":"YC"},P:{"1":"_F"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:4,C:"CSS3 Box-shadow",D:true};
  	return cssBoxshadow;
  }

  var cssAnimation;
  var hasRequiredCssAnimation;

  function requireCssAnimation () {
  	if (hasRequiredCssAnimation) return cssAnimation;
  	hasRequiredCssAnimation = 1;
  	cssAnimation={A:{A:{"1":"_A","2":"_Z"},B:{"1":"_J"},C:{"1":"_FI","2":"_g J _L","33":"_9I G"},D:{"1":"_ZQ","33":"_LE"},E:{"1":"_PB","2":"_e","33":"_FB _UJ","292":"_4"},F:{"1":"_QO XC","2":"_vD","33":"C _8I"},G:{"1":"_p","33":"_QD","164":"_1"},H:{"2":"vD"},I:{"1":"I","33":"_NL","164":"_KB"},J:{"33":"_B"},K:{"1":"_YB","2":"_bB"},L:{"1":"I"},M:{"1":"VC"},N:{"1":"_A"},O:{"1":"YC"},P:{"1":"_F"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:5,C:"CSS Animation",D:true};
  	return cssAnimation;
  }

  var cssTransitions;
  var hasRequiredCssTransitions;

  function requireCssTransitions () {
  	if (hasRequiredCssTransitions) return cssTransitions;
  	hasRequiredCssTransitions = 1;
  	cssTransitions={A:{A:{"1":"_A","2":"_Z"},B:{"1":"_J"},C:{"1":"_FI","2":"_f","33":"_9I G","164":"J"},D:{"1":"_IF","33":"_jJ"},E:{"1":"_iB","33":"_iG","164":"_3"},F:{"1":"_xF","2":"_eB","33":"C","164":"B _0Q"},G:{"1":"_z","33":"aD","164":"_1"},H:{"2":"vD"},I:{"1":"_X","33":"_W"},J:{"1":"A","33":"D"},K:{"1":"_YB","33":"C","164":"_fB"},L:{"1":"I"},M:{"1":"VC"},N:{"1":"_A"},O:{"1":"YC"},P:{"1":"_F"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:5,C:"CSS3 Transitions",D:true};
  	return cssTransitions;
  }

  var transforms2d;
  var hasRequiredTransforms2d;

  function requireTransforms2d () {
  	if (hasRequiredTransforms2d) return transforms2d;
  	hasRequiredTransforms2d = 1;
  	transforms2d={A:{A:{"2":"AD","8":"_FB","129":"_A","161":"F"},B:{"1":"_8C","129":"_ZB"},C:{"1":"_FI","2":"_g","33":"_DC _L"},D:{"1":"_2H","33":"_5E"},E:{"1":"_PB","33":"_TB"},F:{"1":"_GM XC","2":"_eB","33":"_5 _0B _0Q"},G:{"1":"_p","33":"_2"},H:{"2":"vD"},I:{"1":"I","33":"_G"},J:{"33":"_B"},K:{"1":"_BB","2":"A"},L:{"1":"I"},M:{"1":"VC"},N:{"1":"_A"},O:{"1":"YC"},P:{"1":"_F"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:4,C:"CSS3 2D Transforms",D:true};
  	return transforms2d;
  }

  var transforms3d;
  var hasRequiredTransforms3d;

  function requireTransforms3d () {
  	if (hasRequiredTransforms3d) return transforms3d;
  	hasRequiredTransforms3d = 1;
  	transforms3d={A:{A:{"2":"_Z","132":"_A"},B:{"1":"_J"},C:{"1":"_FI","2":"_RK","33":"_FO"},D:{"1":"_2H","2":"_MG","33":"_v _LG"},E:{"1":"_uC","2":"_e","33":"_QG _UJ","257":"_V _3B LD _XN"},F:{"1":"_GM","2":"_T","33":"_0B"},G:{"1":"_5B","33":"_2","257":"_YR _YG"},H:{"2":"vD"},I:{"1":"I","2":"_l","33":"_pJ"},J:{"33":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"132":"_A"},O:{"1":"YC"},P:{"1":"_F"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:5,C:"CSS3 3D Transforms",D:true};
  	return transforms3d;
  }

  var cssGradients;
  var hasRequiredCssGradients;

  function requireCssGradients () {
  	if (hasRequiredCssGradients) return cssGradients;
  	hasRequiredCssGradients = 1;
  	cssGradients={A:{A:{"1":"_A","2":"_Z"},B:{"1":"_J"},C:{"1":"_8E","2":"_LC","260":"_1L _5D","292":"_DC GD"},D:{"1":"_IF","33":"_lD _UF","548":"_RC"},E:{"1":"_uC","2":"_e","260":"_xR _7Q","292":"_iG","804":"_4"},F:{"1":"_xF","2":"_OD","33":"C XD","164":"_sB"},G:{"1":"_5B","260":"_TC _YR _YG","292":"_wC","804":"_d"},H:{"2":"vD"},I:{"1":"_X","33":"_oF","548":"_KB"},J:{"1":"A","548":"D"},K:{"1":"_YB","2":"_A","33":"C","164":"_sB"},L:{"1":"I"},M:{"1":"VC"},N:{"1":"_A"},O:{"1":"YC"},P:{"1":"_F"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:4,C:"CSS Gradients",D:true};
  	return cssGradients;
  }

  var css3Boxsizing;
  var hasRequiredCss3Boxsizing;

  function requireCss3Boxsizing () {
  	if (hasRequiredCss3Boxsizing) return css3Boxsizing;
  	hasRequiredCss3Boxsizing = 1;
  	css3Boxsizing={A:{A:{"1":"_JC","8":"_GB"},B:{"1":"_J"},C:{"1":"_7F","33":"_1D"},D:{"1":"_4O","33":"_RC"},E:{"1":"_XB","33":"_3"},F:{"1":"_nB","2":"F"},G:{"1":"_r","33":"_d"},H:{"1":"vD"},I:{"1":"_QE","33":"_KB"},J:{"1":"A","33":"D"},K:{"1":"_N"},L:{"1":"I"},M:{"1":"VC"},N:{"1":"_A"},O:{"1":"YC"},P:{"1":"_F"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:5,C:"CSS3 Box-sizing",D:true};
  	return css3Boxsizing;
  }

  var cssFilters;
  var hasRequiredCssFilters;

  function requireCssFilters () {
  	if (hasRequiredCssFilters) return cssFilters;
  	hasRequiredCssFilters = 1;
  	cssFilters={A:{A:{"2":"_E"},B:{"1":"_K","1028":"_hQ","1346":"C"},C:{"1":"_RO","2":"_LC","196":"oB","516":"_yN GD"},D:{"1":"_fR","2":"_jL","33":"_ML _NE _kE"},E:{"1":"_ND","2":"_s","33":"_OC _sE"},F:{"1":"_JM","2":"_T","33":"_KD _eD"},G:{"1":"_kG","2":"_1","33":"_QD dD"},H:{"2":"vD"},I:{"1":"I","2":"_W","33":"_w"},J:{"2":"D","33":"A"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"1":"YC"},P:{"1":"_wB","33":"_1B"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:5,C:"CSS Filter Effects",D:true};
  	return cssFilters;
  }

  var cssFilterFunction;
  var hasRequiredCssFilterFunction;

  function requireCssFilterFunction () {
  	if (hasRequiredCssFilterFunction) return cssFilterFunction;
  	hasRequiredCssFilterFunction = 1;
  	cssFilterFunction={A:{A:{"2":"_E"},B:{"2":"_J"},C:{"2":"_S"},D:{"2":"_Q"},E:{"1":"_ND","2":"_TB","33":"F"},F:{"2":"_b"},G:{"1":"_8","2":"_2","33":"_eC"},H:{"2":"vD"},I:{"2":"_O"},J:{"2":"_B"},K:{"2":"_N"},L:{"2":"I"},M:{"2":"VC"},N:{"2":"_A"},O:{"2":"YC"},P:{"2":"_F"},Q:{"2":"DE"},R:{"2":"EE"},S:{"2":"_C"}},B:5,C:"CSS filter() function",D:true};
  	return cssFilterFunction;
  }

  var cssBackdropFilter;
  var hasRequiredCssBackdropFilter;

  function requireCssBackdropFilter () {
  	if (hasRequiredCssBackdropFilter) return cssBackdropFilter;
  	hasRequiredCssBackdropFilter = 1;
  	cssBackdropFilter={A:{A:{"2":"_E"},B:{"1":"_K","2":"_ZB","257":"_8B"},C:{"1":"_H _cI _cH _t","2":"_m _yL _L","578":"_fT _JD _xP"},D:{"1":"_H _eK _vH","2":"_xN","194":"_QC _ID _UG"},E:{"1":"_dN","2":"_TB","33":"_V _3B LD _qL"},F:{"1":"_8F","2":"_8O","194":"_jE _bC _vN _rB"},G:{"1":"_gD","2":"_2","33":"_IK"},H:{"2":"vD"},I:{"1":"I","2":"_G"},J:{"2":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"1":"YC"},P:{"1":"_cJ","2":"J","194":"_rI jC 7D"},Q:{"2":"DE"},R:{"1":"EE"},S:{"2":"_C"}},B:7,C:"CSS Backdrop Filter",D:true};
  	return cssBackdropFilter;
  }

  var cssElementFunction;
  var hasRequiredCssElementFunction;

  function requireCssElementFunction () {
  	if (hasRequiredCssElementFunction) return cssElementFunction;
  	hasRequiredCssElementFunction = 1;
  	cssElementFunction={A:{A:{"2":"_E"},B:{"2":"_J"},C:{"33":"_x","164":"_f"},D:{"2":"_Q"},E:{"2":"_R"},F:{"2":"_b"},G:{"2":"_M"},H:{"2":"vD"},I:{"2":"_O"},J:{"2":"_B"},K:{"2":"_N"},L:{"2":"I"},M:{"33":"VC"},N:{"2":"_A"},O:{"2":"YC"},P:{"2":"_F"},Q:{"2":"DE"},R:{"2":"EE"},S:{"33":"_C"}},B:5,C:"CSS element() function",D:true};
  	return cssElementFunction;
  }

  var multicolumn;
  var hasRequiredMulticolumn;

  function requireMulticolumn () {
  	if (hasRequiredMulticolumn) return multicolumn;
  	hasRequiredMulticolumn = 1;
  	multicolumn={A:{A:{"1":"_A","2":"_Z"},B:{"1":"_I","516":"_K"},C:{"132":"_lC _kD _qD","164":"_2J","516":"_GJ _JD _MB b","1028":"_H c _aO"},D:{"420":"_kL","516":"_4L"},E:{"1":"_LB","132":"F LD","164":"_QJ KD","420":"_XC"},F:{"1":"_FQ","2":"_OD","420":"_LG qB","516":"_hO"},G:{"1":"_8","132":"_eC","164":"_TC","420":"_o"},H:{"1":"vD"},I:{"420":"_G","516":"I"},J:{"420":"_B"},K:{"1":"_KL","2":"_A","516":"H"},L:{"516":"I"},M:{"1028":"VC"},N:{"1":"_A"},O:{"516":"YC"},P:{"420":"J","516":"_U"},Q:{"516":"DE"},R:{"516":"EE"},S:{"164":"_C"}},B:4,C:"CSS3 Multiple column layout",D:true};
  	return multicolumn;
  }

  var userSelectNone;
  var hasRequiredUserSelectNone;

  function requireUserSelectNone () {
  	if (hasRequiredUserSelectNone) return userSelectNone;
  	hasRequiredUserSelectNone = 1;
  	userSelectNone={A:{A:{"2":"_Z","33":"_A"},B:{"1":"_K","33":"_I"},C:{"1":"_tO","33":"_m _FE _L"},D:{"1":"_EM","33":"_vJ"},E:{"33":"_R"},F:{"1":"_JO","2":"_T","33":"_bH"},G:{"33":"_M"},H:{"2":"vD"},I:{"1":"I","33":"_G"},J:{"33":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"33":"_A"},O:{"1":"YC"},P:{"1":"_gB","33":"_qC"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"GE","33":"FE"}},B:5,C:"CSS user-select: none",D:true};
  	return userSelectNone;
  }

  var flexbox;
  var hasRequiredFlexbox;

  function requireFlexbox () {
  	if (hasRequiredFlexbox) return flexbox;
  	hasRequiredFlexbox = 1;
  	flexbox={A:{A:{"2":"_Z","1028":"B","1316":"A"},B:{"1":"_J"},C:{"1":"_pR","164":"_CF","516":"_eT _LQ"},D:{"1":"_WR","33":"_bN _CG","164":"_uF"},E:{"1":"_PB","33":"_QJ _sE","164":"_3C"},F:{"1":"_3J XC","2":"_WE","33":"_9B"},G:{"1":"_p","33":"_TC","164":"_o"},H:{"1":"vD"},I:{"1":"_X","164":"_W"},J:{"1":"A","164":"D"},K:{"1":"_YB","2":"_bB"},L:{"1":"I"},M:{"1":"VC"},N:{"1":"B","292":"A"},O:{"1":"YC"},P:{"1":"_F"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:4,C:"CSS Flexible Box Layout Module",D:true};
  	return flexbox;
  }

  var calc;
  var hasRequiredCalc;

  function requireCalc () {
  	if (hasRequiredCalc) return calc;
  	hasRequiredCalc = 1;
  	calc={A:{A:{"2":"_c","260":"F","516":"_A"},B:{"1":"_J"},C:{"1":"_FI","2":"_f","33":"_DC"},D:{"1":"_IF","2":"_gL","33":"_RJ IB"},E:{"1":"_iB","2":"_s","33":"L"},F:{"1":"_a","2":"_T"},G:{"1":"_z","2":"_1","33":"aD"},H:{"2":"vD"},I:{"1":"I","2":"_W","132":"_w"},J:{"1":"A","2":"D"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"1":"_A"},O:{"1":"YC"},P:{"1":"_F"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:4,C:"calc() as CSS unit value",D:true};
  	return calc;
  }

  var backgroundImgOpts;
  var hasRequiredBackgroundImgOpts;

  function requireBackgroundImgOpts () {
  	if (hasRequiredBackgroundImgOpts) return backgroundImgOpts;
  	hasRequiredBackgroundImgOpts = 1;
  	backgroundImgOpts={A:{A:{"1":"_V","2":"_c"},B:{"1":"_J"},C:{"1":"_x","2":"_LC","36":"GD"},D:{"1":"_WD","516":"_Y"},E:{"1":"_6C","772":"_XC"},F:{"1":"_aD","2":"_lB","36":"UD"},G:{"1":"_z","4":"_d aD","516":"ZD"},H:{"132":"vD"},I:{"1":"_X","36":"wD","516":"_BF","548":"_UQ"},J:{"1":"_B"},K:{"1":"_N"},L:{"1":"I"},M:{"1":"VC"},N:{"1":"_A"},O:{"1":"YC"},P:{"1":"_F"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:4,C:"CSS3 Background-image options",D:true};
  	return backgroundImgOpts;
  }

  var backgroundClipText;
  var hasRequiredBackgroundClipText;

  function requireBackgroundClipText () {
  	if (hasRequiredBackgroundClipText) return backgroundClipText;
  	hasRequiredBackgroundClipText = 1;
  	backgroundClipText={A:{A:{"2":"_E"},B:{"1":"_UB","33":"_v","129":"_GI","161":"_NC _wH"},C:{"1":"_wD","2":"_VM"},D:{"129":"_3G","161":"_NC _yG"},E:{"2":"HD","129":"K YC PD _uE","388":"_9I G _SD _XN lC","420":"_IQ"},F:{"2":"_T","129":"_QK","161":"_sC _BL"},G:{"129":"YC _CU","388":"_YE lC"},H:{"2":"vD"},I:{"16":"_KB","129":"I","161":"_NL"},J:{"161":"_B"},K:{"16":"_D","129":"H"},L:{"129":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"161":"YC"},P:{"1":"_NB","161":"_OM"},Q:{"161":"DE"},R:{"161":"EE"},S:{"1":"_C"}},B:7,C:"Background-clip: text",D:true};
  	return backgroundClipText;
  }

  var fontFeature;
  var hasRequiredFontFeature;

  function requireFontFeature () {
  	if (hasRequiredFontFeature) return fontFeature;
  	hasRequiredFontFeature = 1;
  	fontFeature={A:{A:{"1":"_A","2":"_Z"},B:{"1":"_J"},C:{"1":"_QI","2":"_f","33":"_uK","164":"_Y"},D:{"1":"_5F","2":"_DC","33":"_4B _uN","292":"_EO DB"},E:{"1":"_ND","2":"_gC _e _sE","4":"_vB ID"},F:{"1":"_PI","2":"_T","33":"_bF"},G:{"1":"_kG","2":"_TC dD","4":"_o"},H:{"2":"vD"},I:{"1":"I","2":"_W","33":"_w"},J:{"2":"D","33":"A"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"1":"YC"},P:{"1":"_U","33":"J"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:2,C:"CSS font-feature-settings",D:true};
  	return fontFeature;
  }

  var fontKerning;
  var hasRequiredFontKerning;

  function requireFontKerning () {
  	if (hasRequiredFontKerning) return fontKerning;
  	hasRequiredFontKerning = 1;
  	fontKerning={A:{A:{"2":"_E"},B:{"1":"_K","2":"_I"},C:{"1":"_QI","2":"_LS","194":"_WF _LH"},D:{"1":"_nO","2":"_iJ","33":"_qB _OQ"},E:{"1":"_ND","2":"_XC","33":"_gC KD"},F:{"1":"_nR","2":"_h G _P","33":"_EO"},G:{"1":"_VJ","2":"_DB","33":"_jC _3O"},H:{"2":"vD"},I:{"1":"_VD","2":"_W","33":"0D"},J:{"2":"D","33":"A"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"1":"YC"},P:{"1":"_F"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:4,C:"CSS3 font-kerning",D:true};
  	return fontKerning;
  }

  var borderImage$1;
  var hasRequiredBorderImage;

  function requireBorderImage () {
  	if (hasRequiredBorderImage) return borderImage$1;
  	hasRequiredBorderImage = 1;
  	borderImage$1={A:{A:{"1":"B","2":"_y"},B:{"1":"_zD","129":"_JB"},C:{"1":"_GF","2":"_g","260":"_ZG","804":"_Y _L"},D:{"1":"_MK","260":"_TE","388":"MB _NE","1412":"_8I","1956":"_Y"},E:{"1":"_uC","129":"_FO LD _XN","1412":"_OC _sE","1956":"_s"},F:{"1":"_VL","2":"_eB","260":"_QF","388":"_KD","1796":"_nI","1828":"_5 _tE"},G:{"1":"_5B","129":"eD _BE _nL _YG","1412":"_QD dD","1956":"_1"},H:{"1828":"vD"},I:{"1":"I","388":"_w","1956":"_W"},J:{"1412":"A","1924":"D"},K:{"1":"H","2":"A","1828":"_YD"},L:{"1":"I"},M:{"1":"VC"},N:{"1":"B","2":"A"},O:{"1":"YC"},P:{"1":"_wB","260":"_SH","388":"J"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"GE","260":"FE"}},B:4,C:"CSS3 Border images",D:true};
  	return borderImage$1;
  }

  var cssSelection;
  var hasRequiredCssSelection;

  function requireCssSelection () {
  	if (hasRequiredCssSelection) return cssSelection;
  	hasRequiredCssSelection = 1;
  	cssSelection={A:{A:{"1":"_V","2":"_c"},B:{"1":"_J"},C:{"1":"_TL","33":"_m _L"},D:{"1":"_Q"},E:{"1":"_R"},F:{"1":"_nB","2":"F"},G:{"2":"_M"},H:{"2":"vD"},I:{"1":"_X","2":"_W"},J:{"1":"A","2":"D"},K:{"1":"_EQ _TQ","16":"_A WC"},L:{"1":"I"},M:{"1":"VC"},N:{"1":"_A"},O:{"1":"YC"},P:{"1":"_F"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"GE","33":"FE"}},B:5,C:"::selection CSS pseudo-element",D:true};
  	return cssSelection;
  }

  var cssPlaceholder;
  var hasRequiredCssPlaceholder;

  function requireCssPlaceholder () {
  	if (hasRequiredCssPlaceholder) return cssPlaceholder;
  	hasRequiredCssPlaceholder = 1;
  	cssPlaceholder={A:{A:{"2":"_E"},B:{"1":"_K","36":"_I"},C:{"1":"_pF","33":"_hC _NE","130":"_uL"},D:{"1":"_qF","36":"_jF"},E:{"1":"_HB","2":"_i","36":"jB _DI"},F:{"1":"_HF","2":"_T","36":"_8D xB"},G:{"1":"_9","2":"_rC","36":"_qO _AF"},H:{"2":"vD"},I:{"1":"I","36":"_G"},J:{"36":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"36":"_A"},O:{"1":"YC"},P:{"1":"_wB","36":"_1B"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"GE","33":"FE"}},B:5,C:"::placeholder CSS pseudo-element",D:true};
  	return cssPlaceholder;
  }

  var cssPlaceholderShown;
  var hasRequiredCssPlaceholderShown;

  function requireCssPlaceholderShown () {
  	if (hasRequiredCssPlaceholderShown) return cssPlaceholderShown;
  	hasRequiredCssPlaceholderShown = 1;
  	cssPlaceholderShown={A:{A:{"2":"_Z","292":"_A"},B:{"1":"_K","2":"_I"},C:{"1":"_pF","2":"_f","164":"_GC"},D:{"1":"_eO","2":"_xN"},E:{"1":"_PB","2":"_TB"},F:{"1":"_SO","2":"_8O"},G:{"1":"_p","2":"_2"},H:{"2":"vD"},I:{"1":"I","2":"_G"},J:{"2":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"1":"YC"},P:{"1":"_U","2":"J"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"GE","164":"FE"}},B:5,C:":placeholder-shown CSS pseudo-class",D:true};
  	return cssPlaceholderShown;
  }

  var cssHyphens;
  var hasRequiredCssHyphens;

  function requireCssHyphens () {
  	if (hasRequiredCssHyphens) return cssHyphens;
  	hasRequiredCssHyphens = 1;
  	cssHyphens={A:{A:{"2":"_Z","33":"_A"},B:{"1":"_vO","33":"_I","132":"_mG _JF","260":"Y _dI _xH"},C:{"1":"_aQ","2":"_1C","33":"_dC _8D"},D:{"1":"_uO","2":"_BO","132":"_kD _cC _OR"},E:{"1":"_2D","2":"_3","33":"_gJ _SD _JG _gF"},F:{"1":"_bO","2":"_MM","132":"wB _mE _qI _MB"},G:{"1":"_VE","2":"_rC","33":"_qO _AL _mH"},H:{"2":"vD"},I:{"1":"I","2":"_G"},J:{"2":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"1":"YC"},P:{"1":"_gB","2":"J","132":"2D"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:4,C:"CSS Hyphenation",D:true};
  	return cssHyphens;
  }

  var fullscreen$1;
  var hasRequiredFullscreen;

  function requireFullscreen () {
  	if (hasRequiredFullscreen) return fullscreen$1;
  	hasRequiredFullscreen = 1;
  	fullscreen$1={A:{A:{"2":"_y","548":"B"},B:{"1":"_K","516":"_I"},C:{"1":"_hR","2":"_RK","676":"_lD _ZH","1700":"_QC _ID _rB"},D:{"1":"_MN _iC","2":"_Y","676":"_aC","804":"_EB _wE _nD"},E:{"1":"_RE","2":"_3","548":"_nP _qE","676":"ID","804":"_gJ _7Q"},F:{"1":"_8F XC","2":"_WE","804":"_PJ _rB"},G:{"2":"_JI","2052":"_VJ"},H:{"2":"vD"},I:{"2":"_O"},J:{"2":"D","292":"A"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"A","548":"B"},O:{"1":"YC"},P:{"1":"_9E","804":"_MD"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:1,C:"Fullscreen API",D:true};
  	return fullscreen$1;
  }

  var mdnCssBackdropPseudoElement;
  var hasRequiredMdnCssBackdropPseudoElement;

  function requireMdnCssBackdropPseudoElement () {
  	if (hasRequiredMdnCssBackdropPseudoElement) return mdnCssBackdropPseudoElement;
  	hasRequiredMdnCssBackdropPseudoElement = 1;
  	mdnCssBackdropPseudoElement={A:{D:{"1":"_UI","2":"_hL","33":"_5I qB"},L:{"1":"I"},B:{"1":"_K","33":"_I"},C:{"1":"_HM","2":"_tL"},M:{"1":"VC"},A:{"2":"_y","33":"B"},F:{"1":"_6G","2":"_8Q","33":"_KQ GB"},K:{"1":"H","2":"_D"},E:{"1":"_AT _PE","2":"_BH SD"},G:{"1":"_5B","2":"_YE"},P:{"1":"_F"},I:{"1":"I","2":"_W","33":"_w"}},B:6,C:"CSS ::backdrop pseudo-element",D:undefined};
  	return mdnCssBackdropPseudoElement;
  }

  var cssFileSelectorButton;
  var hasRequiredCssFileSelectorButton;

  function requireCssFileSelectorButton () {
  	if (hasRequiredCssFileSelectorButton) return cssFileSelectorButton;
  	hasRequiredCssFileSelectorButton = 1;
  	cssFileSelectorButton={A:{D:{"1":"_3H","33":"_u _pD"},L:{"1":"I"},B:{"1":"_4H","33":"_0 _pD"},C:{"1":"_H _SQ","2":"_m _cC _L"},M:{"1":"VC"},A:{"2":"_Z","33":"_A"},F:{"1":"_gQ","2":"_T","33":"_PJ _eG"},K:{"1":"H","2":"_D"},E:{"1":"_UH _CE _PE","2":"SD","33":"_hF"},G:{"1":"_IE","33":"_VF"},P:{"1":"_rF","33":"_kF"},I:{"1":"I","2":"_W","33":"_w"}},B:6,C:"::file-selector-button CSS pseudo-element",D:undefined};
  	return cssFileSelectorButton;
  }

  var cssAutofill;
  var hasRequiredCssAutofill;

  function requireCssAutofill () {
  	if (hasRequiredCssAutofill) return cssAutofill;
  	hasRequiredCssAutofill = 1;
  	cssAutofill={A:{D:{"1":"_5H _q","33":"_u _6F"},L:{"1":"I"},B:{"1":"_5H _j","2":"_I","33":"_IB _6F"},C:{"2":"_S"},M:{"2":"VC"},A:{"2":"_E"},F:{"1":"_dQ _ME","2":"_T","33":"_sC _4J"},K:{"1":"H","2":"_D"},E:{"1":"_LU _PE","2":"SD","33":"_MI"},G:{"1":"_dE","33":"_2F"},P:{"1":"_4B","33":"_OL"},I:{"1":"I","2":"_W","33":"_w"}},B:6,C:":autofill CSS pseudo-class",D:undefined};
  	return cssAutofill;
  }

  var css3Tabsize;
  var hasRequiredCss3Tabsize;

  function requireCss3Tabsize () {
  	if (hasRequiredCss3Tabsize) return css3Tabsize;
  	hasRequiredCss3Tabsize = 1;
  	css3Tabsize={A:{A:{"2":"_E"},B:{"1":"_K","2":"_I"},C:{"1":"_tP _t","2":"_f","33":"_iE _kD _VB _MB","164":"_AO"},D:{"1":"_KJ _JE","2":"_uF","132":"_4B _8G vB"},E:{"1":"_cE","2":"_3C","132":"_gC _qJ _yB _pL"},F:{"1":"_NO","2":"_2G","132":"_tK","164":"_5 _7K"},G:{"1":"_RD","2":"_o","132":"_TC _DJ _RH"},H:{"164":"vD"},I:{"1":"I","2":"_W","132":"_w"},J:{"132":"_B"},K:{"1":"H","2":"A","164":"_YD"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"1":"YC"},P:{"1":"_F"},Q:{"1":"DE"},R:{"1":"EE"},S:{"164":"_C"}},B:4,C:"CSS3 tab-size",D:true};
  	return css3Tabsize;
  }

  var intrinsicWidth;
  var hasRequiredIntrinsicWidth;

  function requireIntrinsicWidth () {
  	if (hasRequiredIntrinsicWidth) return intrinsicWidth;
  	hasRequiredIntrinsicWidth = 1;
  	intrinsicWidth={A:{A:{"2":"_E"},B:{"2":"_I","1025":"_WN _xJ","1537":"_IB _7G"},C:{"2":"BD","932":"_qP _qQ","2308":"_lO"},D:{"2":"_iL","545":"_zB _7D _uD","1025":"_WN _0L","1537":"_pH _ID _cC _7G"},E:{"1":"_0C","2":"_3C","516":"_9R","548":"_5R","676":"_QJ _sE"},F:{"2":"_T","513":"oB","545":"_cG","1025":"_SL _ME","1537":"nB _PQ _mE _qI _YF"},G:{"1":"_jB","2":"_o","516":"_hN","548":"_ZR","676":"_TC"},H:{"2":"vD"},I:{"2":"_W","545":"_w","1025":"I"},J:{"2":"D","545":"A"},K:{"2":"_D","1025":"H"},L:{"1025":"I"},M:{"2308":"VC"},N:{"2":"_A"},O:{"1537":"YC"},P:{"545":"J","1025":"_kQ","1537":"_rI _zQ _gS"},Q:{"1537":"DE"},R:{"1537":"EE"},S:{"932":"FE","2308":"GE"}},B:5,C:"Intrinsic & Extrinsic Sizing",D:true};
  	return intrinsicWidth;
  }

  var cssWidthStretch;
  var hasRequiredCssWidthStretch;

  function requireCssWidthStretch () {
  	if (hasRequiredCssWidthStretch) return cssWidthStretch;
  	hasRequiredCssWidthStretch = 1;
  	cssWidthStretch={A:{D:{"1":"_NP _dK _KE","2":"_iL","33":"_aG _vG _DL VB"},L:{"1":"I"},B:{"1":"_NP _dK _hE","2":"_I","33":"_kN _DL VB"},C:{"2":"_bR _L","33":"_JH _mJ"},M:{"33":"VC"},A:{"2":"_E"},F:{"1":"6 _XG CB","2":"_T","33":"_sD 5 _sC _UC"},K:{"2":"_D","33":"H"},E:{"1":"K","2":"_XC SD","33":"_xR _lF _cU"},G:{"2":"_o","33":"_z"},P:{"2":"J","33":"_U"},I:{"1":"I","2":"_W","33":"_w"}},B:6,C:"width: stretch property",D:undefined};
  	return cssWidthStretch;
  }

  var css3CursorsNewer;
  var hasRequiredCss3CursorsNewer;

  function requireCss3CursorsNewer () {
  	if (hasRequiredCss3CursorsNewer) return css3CursorsNewer;
  	hasRequiredCss3CursorsNewer = 1;
  	css3CursorsNewer={A:{A:{"2":"_E"},B:{"1":"_J"},C:{"1":"_4M _kB","33":"_LS"},D:{"1":"_UI","33":"_CK"},E:{"1":"_PB","33":"_TB"},F:{"1":"_yM _WF _uB _3I","2":"_5C","33":"_1M"},G:{"2":"_M"},H:{"2":"vD"},I:{"1":"I","2":"_G"},J:{"33":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"2":"VC"},N:{"2":"_A"},O:{"1":"YC"},P:{"2":"_F"},Q:{"1":"DE"},R:{"1":"EE"},S:{"2":"_C"}},B:2,C:"CSS3 Cursors: zoom-in & zoom-out",D:true};
  	return css3CursorsNewer;
  }

  var css3CursorsGrab;
  var hasRequiredCss3CursorsGrab;

  function requireCss3CursorsGrab () {
  	if (hasRequiredCss3CursorsGrab) return css3CursorsGrab;
  	hasRequiredCss3CursorsGrab = 1;
  	css3CursorsGrab={A:{A:{"2":"_E"},B:{"1":"_SE","2":"_v"},C:{"1":"_1R","33":"_OS"},D:{"1":"_VN _iC","33":"_6 _EF"},E:{"1":"_oB","33":"_pB"},F:{"1":"_yM _6I _3I","2":"_5C","33":"_iD _fD"},G:{"2":"_M"},H:{"2":"vD"},I:{"1":"I","2":"_G"},J:{"33":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"2":"VC"},N:{"2":"_A"},O:{"1":"YC"},P:{"2":"_F"},Q:{"1":"DE"},R:{"1":"EE"},S:{"2":"_C"}},B:2,C:"CSS grab & grabbing cursors",D:true};
  	return css3CursorsGrab;
  }

  var cssSticky;
  var hasRequiredCssSticky;

  function requireCssSticky () {
  	if (hasRequiredCssSticky) return cssSticky;
  	hasRequiredCssSticky = 1;
  	cssSticky={A:{A:{"2":"_E"},B:{"1":"_lR","2":"_3B","1028":"_IB _MB","4100":"_GE"},C:{"1":"_9P _tB","2":"_BP","194":"_zK lB","516":"_5I _bC _mE"},D:{"1":"_mR","2":"_hJ _AJ _fJ","322":"_CC _eJ _lC 9B","1028":"AC _RG _cC _MB"},E:{"1":"_ZE","2":"_3C","33":"_gT _lF _pL","2084":"D JD"},F:{"1":"_2P _4K","2":"_XO","322":"tB uB vB","1028":"wB _vN _HL"},G:{"1":"_UE","2":"_1","33":"_yJ kD","2084":"aD bD"},H:{"2":"vD"},I:{"1":"I","2":"_G"},J:{"2":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"1":"YC"},P:{"1":"_gB","2":"_qC"},Q:{"1028":"DE"},R:{"1":"EE"},S:{"1":"GE","516":"FE"}},B:5,C:"CSS position:sticky",D:true};
  	return cssSticky;
  }

  var pointer;
  var hasRequiredPointer;

  function requirePointer () {
  	if (hasRequiredPointer) return pointer;
  	hasRequiredPointer = 1;
  	pointer={A:{A:{"1":"B","2":"_Z","164":"A"},B:{"1":"_J"},C:{"1":"_9P _tB","2":"_1C","8":"_dC _bH","328":"_YC _mE"},D:{"1":"_WL","2":"_iL","8":"_zB _KO","584":"_lC"},E:{"1":"_ZE","2":"_3C","8":"_gC _DE _yB _GD","1096":"XC"},F:{"1":"_TI","2":"_T","8":"_KD sB","584":"tB uB vB"},G:{"1":"_XP _RD","8":"_DF","6148":"lD"},H:{"2":"vD"},I:{"1":"I","8":"_G"},J:{"8":"_B"},K:{"1":"H","2":"A","8":"_YD"},L:{"1":"I"},M:{"1":"VC"},N:{"1":"B","36":"A"},O:{"1":"YC"},P:{"1":"_gB","2":"2D","8":"J"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"GE","328":"FE"}},B:2,C:"Pointer events",D:true};
  	return pointer;
  }

  var textDecoration$1;
  var hasRequiredTextDecoration;

  function requireTextDecoration () {
  	if (hasRequiredTextDecoration) return textDecoration$1;
  	hasRequiredTextDecoration = 1;
  	textDecoration$1={A:{A:{"2":"_E"},B:{"2":"_I","2052":"_K"},C:{"2":"_1C","1028":"_8E","1060":"_tQ"},D:{"2":"_jJ","226":"_zK _NE _3E","2052":"_qF"},E:{"2":"_4C","772":"_FF","804":"_1O","1316":"KD"},F:{"2":"_TK","226":"_PQ xB","2052":"_HF"},G:{"2":"_DB","292":"_7B"},H:{"2":"vD"},I:{"1":"I","2":"_G"},J:{"2":"_B"},K:{"2":"_D","2052":"H"},L:{"2052":"I"},M:{"1028":"VC"},N:{"2":"_A"},O:{"2052":"YC"},P:{"2":"_1B","2052":"_wB"},Q:{"2052":"DE"},R:{"2052":"EE"},S:{"1028":"_C"}},B:4,C:"text-decoration styling",D:true};
  	return textDecoration$1;
  }

  var mdnTextDecorationShorthand;
  var hasRequiredMdnTextDecorationShorthand;

  function requireMdnTextDecorationShorthand () {
  	if (hasRequiredMdnTextDecorationShorthand) return mdnTextDecorationShorthand;
  	hasRequiredMdnTextDecorationShorthand = 1;
  	mdnTextDecorationShorthand={A:{D:{"1":"_qF","2":"_jF"},L:{"1":"I"},B:{"1":"_K","2":"_I"},C:{"1":"_IM","2":"_1C"},M:{"1":"VC"},A:{"2":"_E"},F:{"1":"_HF","2":"_XI"},K:{"1":"H","2":"_D"},E:{"1":"K _iM _FG","2":"_yR","33":"_kH G LD _qL _wQ"},G:{"1":"_iM _FG","2":"_DB","33":"_jC _IK _wQ"},P:{"1":"_wB","2":"_1B"},I:{"1":"I","2":"_G"}},B:6,C:"text-decoration shorthand property",D:undefined};
  	return mdnTextDecorationShorthand;
  }

  var mdnTextDecorationColor;
  var hasRequiredMdnTextDecorationColor;

  function requireMdnTextDecorationColor () {
  	if (hasRequiredMdnTextDecorationColor) return mdnTextDecorationColor;
  	hasRequiredMdnTextDecorationColor = 1;
  	mdnTextDecorationColor={A:{D:{"1":"_qF","2":"_jF"},L:{"1":"I"},B:{"1":"_K","2":"_I"},C:{"1":"_8E","2":"_1C","33":"_tQ"},M:{"1":"VC"},A:{"2":"_E"},F:{"1":"_HF","2":"_XI"},K:{"1":"H","2":"_D"},E:{"1":"_4I _sI _PE","2":"_yR","33":"_1O"},G:{"1":"_kC","2":"_DB","33":"_yJ"},P:{"1":"_wB","2":"_1B"},I:{"1":"I","2":"_G"}},B:6,C:"text-decoration-color property",D:undefined};
  	return mdnTextDecorationColor;
  }

  var mdnTextDecorationLine;
  var hasRequiredMdnTextDecorationLine;

  function requireMdnTextDecorationLine () {
  	if (hasRequiredMdnTextDecorationLine) return mdnTextDecorationLine;
  	hasRequiredMdnTextDecorationLine = 1;
  	mdnTextDecorationLine={A:{D:{"1":"_qF","2":"_jF"},L:{"1":"I"},B:{"1":"_K","2":"_I"},C:{"1":"_8E","2":"_1C","33":"_tQ"},M:{"1":"VC"},A:{"2":"_E"},F:{"1":"_HF","2":"_XI"},K:{"1":"H","2":"_D"},E:{"1":"_4I _sI _PE","2":"_yR","33":"_1O"},G:{"1":"_kC","2":"_DB","33":"_yJ"},P:{"1":"_wB","2":"_1B"},I:{"1":"I","2":"_G"}},B:6,C:"text-decoration-line property",D:undefined};
  	return mdnTextDecorationLine;
  }

  var mdnTextDecorationStyle;
  var hasRequiredMdnTextDecorationStyle;

  function requireMdnTextDecorationStyle () {
  	if (hasRequiredMdnTextDecorationStyle) return mdnTextDecorationStyle;
  	hasRequiredMdnTextDecorationStyle = 1;
  	mdnTextDecorationStyle={A:{D:{"1":"_qF","2":"_jF"},L:{"1":"I"},B:{"1":"_K","2":"_I"},C:{"1":"_8E","2":"_1C","33":"_tQ"},M:{"1":"VC"},A:{"2":"_E"},F:{"1":"_HF","2":"_XI"},K:{"1":"H","2":"_D"},E:{"1":"_4I _sI _PE","2":"_yR","33":"_1O"},G:{"1":"_kC","2":"_DB","33":"_yJ"},P:{"1":"_wB","2":"_1B"},I:{"1":"I","2":"_G"}},B:6,C:"text-decoration-style property",D:undefined};
  	return mdnTextDecorationStyle;
  }

  var textSizeAdjust;
  var hasRequiredTextSizeAdjust;

  function requireTextSizeAdjust () {
  	if (hasRequiredTextSizeAdjust) return textSizeAdjust;
  	hasRequiredTextSizeAdjust = 1;
  	textSizeAdjust={A:{A:{"2":"_E"},B:{"1":"_K","33":"_I"},C:{"2":"_S"},D:{"1":"_EM","2":"_jJ _jH _NE _VG","258":"JB"},E:{"2":"_qM _e _cP","258":"ID"},F:{"1":"_H xB _NG _PD","2":"_gH yB _P"},G:{"2":"_d","33":"_r"},H:{"2":"vD"},I:{"1":"I","2":"_G"},J:{"2":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"33":"VC"},N:{"161":"_A"},O:{"1":"YC"},P:{"1":"_U","2":"J"},Q:{"1":"DE"},R:{"1":"EE"},S:{"2":"_C"}},B:7,C:"CSS text-size-adjust",D:true};
  	return textSizeAdjust;
  }

  var cssMasks;
  var hasRequiredCssMasks;

  function requireCssMasks () {
  	if (hasRequiredCssMasks) return cssMasks;
  	hasRequiredCssMasks = 1;
  	cssMasks={A:{A:{"2":"_E"},B:{"1":"_GI","2":"_ZB","164":"_NC _wH","3138":"P","12292":"Q"},C:{"1":"_FM","2":"_g","260":"_GC _UU"},D:{"1":"_3G","164":"_NC _yG"},E:{"1":"_uC","2":"_e","164":"_DC _SD _XN"},F:{"1":"_QK","2":"_T","164":"_sC _BL"},G:{"1":"_5B","164":"_YE"},H:{"2":"vD"},I:{"1":"I","164":"_w","676":"_W"},J:{"164":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"164":"YC"},P:{"1":"_NB","164":"_OM"},Q:{"164":"DE"},R:{"164":"EE"},S:{"1":"GE","260":"FE"}},B:4,C:"CSS Masks",D:true};
  	return cssMasks;
  }

  var cssClipPath;
  var hasRequiredCssClipPath;

  function requireCssClipPath () {
  	if (hasRequiredCssClipPath) return cssClipPath;
  	hasRequiredCssClipPath = 1;
  	cssClipPath={A:{A:{"2":"_E"},B:{"2":"_1F","260":"_K","3138":"Q"},C:{"1":"_DN _7I","2":"_g","132":"_Y _dT","644":"_QC _VG"},D:{"2":"_tF","260":"_WL","292":"_WF _LO"},E:{"2":"_XC","260":"_cE","292":"_gC _qJ _lF _pL"},F:{"2":"_T","260":"_TI","292":"_bH vB"},G:{"2":"_o","260":"_UE","292":"_TC _DJ kD"},H:{"2":"vD"},I:{"2":"_W","260":"I","292":"_w"},J:{"2":"_B"},K:{"2":"_D","260":"H"},L:{"260":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"260":"YC"},P:{"260":"_gB","292":"_qC"},Q:{"260":"DE"},R:{"260":"EE"},S:{"1":"GE","644":"FE"}},B:4,C:"CSS clip-path property (for HTML)",D:true};
  	return cssClipPath;
  }

  var cssBoxdecorationbreak;
  var hasRequiredCssBoxdecorationbreak;

  function requireCssBoxdecorationbreak () {
  	if (hasRequiredCssBoxdecorationbreak) return cssBoxdecorationbreak;
  	hasRequiredCssBoxdecorationbreak = 1;
  	cssBoxdecorationbreak={A:{A:{"2":"_E"},B:{"1":"_dJ _hE","2":"_I","164":"_kN _dL"},C:{"1":"_OO","2":"_DP"},D:{"1":"_dJ _KE","2":"_iL","164":"_aG _vG _dL"},E:{"2":"_3C","164":"_iB"},F:{"1":"_H _fE CB","2":"_pC","129":"_5 _tE","164":"_sC _UC"},G:{"2":"_o","164":"_z"},H:{"132":"vD"},I:{"1":"I","2":"_W","164":"_w"},J:{"2":"D","164":"A"},K:{"2":"A","129":"_YD","164":"H"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"164":"YC"},P:{"164":"_F"},Q:{"164":"DE"},R:{"164":"EE"},S:{"1":"_C"}},B:4,C:"CSS box-decoration-break",D:true};
  	return cssBoxdecorationbreak;
  }

  var objectFit;
  var hasRequiredObjectFit;

  function requireObjectFit () {
  	if (hasRequiredObjectFit) return objectFit;
  	hasRequiredObjectFit = 1;
  	objectFit={A:{A:{"2":"_E"},B:{"1":"_K","2":"_3B","260":"_GE"},C:{"1":"_8E","2":"_WI"},D:{"1":"_PO","2":"_hL"},E:{"1":"_LB","2":"_4C","132":"_iQ"},F:{"1":"_nN","2":"F _UB _jK VD","33":"_5 _7K"},G:{"1":"_8","2":"_DB","132":"_jC _eC"},H:{"33":"vD"},I:{"1":"_VD","2":"_xG"},J:{"2":"_B"},K:{"1":"H","2":"A","33":"_YD"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"1":"YC"},P:{"1":"_F"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:4,C:"CSS3 object-fit/object-position",D:true};
  	return objectFit;
  }

  var cssShapes;
  var hasRequiredCssShapes;

  function requireCssShapes () {
  	if (hasRequiredCssShapes) return cssShapes;
  	hasRequiredCssShapes = 1;
  	cssShapes={A:{A:{"2":"_E"},B:{"1":"_K","2":"_I"},C:{"1":"_TL","2":"_NR","322":"_ID"},D:{"1":"_UI","2":"_yN","194":"_jE qB"},E:{"1":"_HB","2":"_4C","33":"_6H _lF"},F:{"1":"_6G","2":"_SK"},G:{"1":"_9","2":"_DB","33":"_jC _AF"},H:{"2":"vD"},I:{"1":"I","2":"_G"},J:{"2":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"1":"YC"},P:{"1":"_F"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"GE","2":"FE"}},B:4,C:"CSS Shapes Level 1",D:true};
  	return cssShapes;
  }

  var textOverflow;
  var hasRequiredTextOverflow;

  function requireTextOverflow () {
  	if (hasRequiredTextOverflow) return textOverflow;
  	hasRequiredTextOverflow = 1;
  	textOverflow={A:{A:{"1":"_PC","2":"AD"},B:{"1":"_J"},C:{"1":"_XL _IC","8":"_g _vB _L"},D:{"1":"_Q"},E:{"1":"_R"},F:{"1":"_zJ","33":"_pC"},G:{"1":"_M"},H:{"1":"vD"},I:{"1":"_O"},J:{"1":"_B"},K:{"1":"_YB","33":"_bB"},L:{"1":"I"},M:{"1":"VC"},N:{"1":"_A"},O:{"1":"YC"},P:{"1":"_F"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:2,C:"CSS3 Text-overflow",D:true};
  	return textOverflow;
  }

  var cssDeviceadaptation;
  var hasRequiredCssDeviceadaptation;

  function requireCssDeviceadaptation () {
  	if (hasRequiredCssDeviceadaptation) return cssDeviceadaptation;
  	hasRequiredCssDeviceadaptation = 1;
  	cssDeviceadaptation={A:{A:{"2":"_Z","164":"_A"},B:{"66":"_K","164":"_I"},C:{"2":"_S"},D:{"2":"_iJ","66":"_WR"},E:{"2":"_R"},F:{"2":"_5O","66":"_JM"},G:{"2":"_M"},H:{"292":"vD"},I:{"2":"_O"},J:{"2":"_B"},K:{"2":"A H","292":"_YD"},L:{"2":"I"},M:{"2":"VC"},N:{"164":"_A"},O:{"2":"YC"},P:{"2":"_F"},Q:{"66":"DE"},R:{"2":"EE"},S:{"2":"_C"}},B:5,C:"CSS Device Adaptation",D:true};
  	return cssDeviceadaptation;
  }

  var cssMediaResolution;
  var hasRequiredCssMediaResolution;

  function requireCssMediaResolution () {
  	if (hasRequiredCssMediaResolution) return cssMediaResolution;
  	hasRequiredCssMediaResolution = 1;
  	cssMediaResolution={A:{A:{"2":"_c","132":"_V"},B:{"1":"_K","1028":"_I"},C:{"1":"_TL","2":"_g","260":"_DC _L","1028":"_1L _wE"},D:{"1":"_VN _iC","548":"_iJ","1028":"_qB _wE _EF"},E:{"1":"_0C","2":"_e","548":"_DC _SD _JG"},F:{"1":"_H _6I XC","2":"F","548":"_5 _EJ","1028":"_iD _fD"},G:{"1":"_jB","16":"iC","548":"_PR _AL"},H:{"132":"vD"},I:{"1":"I","16":"_k","548":"_mL","1028":"_w"},J:{"548":"_B"},K:{"1":"_YB","548":"_bB"},L:{"1":"I"},M:{"1":"VC"},N:{"132":"_A"},O:{"1":"YC"},P:{"1":"_9E","1028":"_MD"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:4,C:"Media Queries: resolution feature",D:true};
  	return cssMediaResolution;
  }

  var cssTextAlignLast;
  var hasRequiredCssTextAlignLast;

  function requireCssTextAlignLast () {
  	if (hasRequiredCssTextAlignLast) return cssTextAlignLast;
  	hasRequiredCssTextAlignLast = 1;
  	cssTextAlignLast={A:{A:{"132":"_E"},B:{"1":"_K","4":"_I"},C:{"1":"_wD","2":"_g _MG _L","33":"_v _vK"},D:{"1":"_eO","2":"_uQ","322":"_PQ _MH"},E:{"1":"_0C","2":"_HE"},F:{"1":"_SO","2":"_KS","578":"_zB _LH"},G:{"1":"_jB","2":"_xC"},H:{"2":"vD"},I:{"1":"I","2":"_G"},J:{"2":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"132":"_A"},O:{"1":"YC"},P:{"1":"_U","2":"J"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"GE","33":"FE"}},B:4,C:"CSS3 text-align-last",D:true};
  	return cssTextAlignLast;
  }

  var cssCrispEdges;
  var hasRequiredCssCrispEdges;

  function requireCssCrispEdges () {
  	if (hasRequiredCssCrispEdges) return cssCrispEdges;
  	hasRequiredCssCrispEdges = 1;
  	cssCrispEdges={A:{A:{"2":"_CQ","2340":"_sJ"},B:{"2":"_I","1025":"_K"},C:{"1":"_H _aO","2":"_LC","513":"_GJ _JD _fF","545":"_4Q GD"},D:{"1":"_hI _pE","2":"_XD","1025":"_2M _rL _IL _IH"},E:{"1":"_LB","2":"_s","164":"L","4644":"_gC _yB"},F:{"2":"_uM _9M _TH _sB","545":"_LL","1025":"_fO"},G:{"1":"_8","2":"_d","4260":"_wC","4644":"_TC _eC"},H:{"2":"vD"},I:{"2":"_G","1025":"I"},J:{"2":"D","4260":"A"},K:{"2":"_fB","545":"_JL","1025":"H"},L:{"1025":"I"},M:{"1":"VC"},N:{"2340":"_A"},O:{"1025":"YC"},P:{"1025":"_F"},Q:{"1025":"DE"},R:{"1025":"EE"},S:{"1":"GE","4097":"FE"}},B:4,C:"Crisp edges/pixelated images",D:true};
  	return cssCrispEdges;
  }

  var cssLogicalProps;
  var hasRequiredCssLogicalProps;

  function requireCssLogicalProps () {
  	if (hasRequiredCssLogicalProps) return cssLogicalProps;
  	hasRequiredCssLogicalProps = 1;
  	cssLogicalProps={A:{A:{"2":"_E"},B:{"1":"_4H","2":"_I","1028":"_1P","1540":"_mG W"},C:{"1":"_lO","2":"BD","164":"cC _XD _L","1540":"_YC _fC _AD"},D:{"1":"_3H","292":"_2Q","1028":"_1P","1540":"_gK _fL W"},E:{"1":"_eE","292":"_TD","1540":"_AC _AE","3076":"ND"},F:{"1":"_aJ","2":"_T","292":"_iD _TE","1028":"_DG","1540":"AC _dM DC _lE"},G:{"1":"_dE","292":"_LD","1540":"_oI","3076":"qD"},H:{"2":"vD"},I:{"1":"I","292":"_G"},J:{"292":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"1":"YC"},P:{"1":"_rF","292":"_MD","1540":"_zQ"},Q:{"1540":"DE"},R:{"1":"EE"},S:{"1":"GE","1540":"FE"}},B:5,C:"CSS Logical Properties",D:true};
  	return cssLogicalProps;
  }

  var cssAppearance;
  var hasRequiredCssAppearance;

  function requireCssAppearance () {
  	if (hasRequiredCssAppearance) return cssAppearance;
  	hasRequiredCssAppearance = 1;
  	cssAppearance={A:{A:{"2":"_E"},B:{"1":"_2R","33":"T","164":"_IB","388":"_I"},C:{"1":"_WJ _SQ","164":"_QQ _yD","676":"_MS"},D:{"1":"_3R","33":"T","164":"_u"},E:{"1":"_uC","164":"_BH"},F:{"1":"_bJ","2":"_T","33":"MC _QP","164":"_PJ _yL"},G:{"1":"_5B","164":"_YE"},H:{"2":"vD"},I:{"1":"I","164":"_G"},J:{"164":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"A","388":"B"},O:{"1":"YC"},P:{"1":"_tD","164":"_XE"},Q:{"164":"DE"},R:{"1":"EE"},S:{"1":"GE","164":"FE"}},B:5,C:"CSS Appearance",D:true};
  	return cssAppearance;
  }

  var cssSnappoints;
  var hasRequiredCssSnappoints;

  function requireCssSnappoints () {
  	if (hasRequiredCssSnappoints) return cssSnappoints;
  	hasRequiredCssSnappoints = 1;
  	cssSnappoints={A:{A:{"2":"_Z","6308":"A","6436":"B"},B:{"1":"_K","6436":"_I"},C:{"1":"_7R","2":"_PN sB _L","2052":"_oH _fC _EF"},D:{"1":"_sO","2":"_1Q","8258":"_TP"},E:{"1":"_oB","2":"_TB","3108":"_5R"},F:{"1":"_8F","2":"_XK","8258":"8B _eL _rB"},G:{"1":"_AB","2":"_2","3108":"_HD"},H:{"2":"vD"},I:{"1":"I","2":"_G"},J:{"2":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"1":"YC"},P:{"1":"_9E","2":"_MD"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"GE","2052":"FE"}},B:4,C:"CSS Scroll Snap",D:true};
  	return cssSnappoints;
  }

  var cssRegions;
  var hasRequiredCssRegions;

  function requireCssRegions () {
  	if (hasRequiredCssRegions) return cssRegions;
  	hasRequiredCssRegions = 1;
  	cssRegions={A:{A:{"2":"_Z","420":"_A"},B:{"2":"_K","420":"_I"},C:{"2":"_S"},D:{"2":"_H _Y pB _TG","36":"_UB","66":"_hC _7H"},E:{"2":"_vB _rK _VH _xS","33":"_sJ _6Q"},F:{"2":"_b"},G:{"2":"_o _KC","33":"_TC _iT"},H:{"2":"vD"},I:{"2":"_O"},J:{"2":"_B"},K:{"2":"_N"},L:{"2":"I"},M:{"2":"VC"},N:{"420":"_A"},O:{"2":"YC"},P:{"2":"_F"},Q:{"2":"DE"},R:{"2":"EE"},S:{"2":"_C"}},B:5,C:"CSS Regions",D:true};
  	return cssRegions;
  }

  var cssImageSet;
  var hasRequiredCssImageSet;

  function requireCssImageSet () {
  	if (hasRequiredCssImageSet) return cssImageSet;
  	hasRequiredCssImageSet = 1;
  	cssImageSet={A:{A:{"2":"_E"},B:{"1":"_rR","2":"_I","164":"_IB _DR","2049":"x"},C:{"1":"_wO","2":"_aB _oD _L","66":"_JF","2305":"_dI _cK _AG","2820":"Y"},D:{"1":"_sR","2":"_uF","164":"_4B _vG _DR","2049":"x"},E:{"1":"_2D","2":"_s","132":"_qJ _OE","164":"_OC _yB","1540":"_sH _CE _gF"},F:{"1":"_GS","2":"_T","164":"_sC _5N","2049":"j"},G:{"1":"_VE","2":"_1","132":"_BE _IG _9K","164":"_QD _eC","1540":"_hN _mH"},H:{"2":"vD"},I:{"1":"I","2":"_W","164":"_w"},J:{"2":"D","164":"A"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"164":"YC"},P:{"1":"_CC","164":"_OK"},Q:{"164":"DE"},R:{"164":"EE"},S:{"2":"_C"}},B:5,C:"CSS image-set",D:true};
  	return cssImageSet;
  }

  var cssWritingMode;
  var hasRequiredCssWritingMode;

  function requireCssWritingMode () {
  	if (hasRequiredCssWritingMode) return cssWritingMode;
  	hasRequiredCssWritingMode = 1;
  	cssWritingMode={A:{A:{"132":"_E"},B:{"1":"_J"},C:{"1":"_8L","2":"_WI","322":"_tN"},D:{"1":"_5F","2":"_vB","16":"D","33":"_kH _CJ"},E:{"1":"_oB","2":"_i","16":"jB","33":"_DI jC"},F:{"1":"_PI","2":"_T","33":"_bF"},G:{"1":"_AB","16":"_d","33":"_rD _HD"},H:{"2":"vD"},I:{"1":"I","2":"_l","33":"_pJ"},J:{"33":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"36":"_A"},O:{"1":"YC"},P:{"1":"_U","33":"J"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:2,C:"CSS writing-mode property",D:true};
  	return cssWritingMode;
  }

  var cssCrossFade;
  var hasRequiredCssCrossFade;

  function requireCssCrossFade () {
  	if (hasRequiredCssCrossFade) return cssCrossFade;
  	hasRequiredCssCrossFade = 1;
  	cssCrossFade={A:{A:{"2":"_E"},B:{"2":"_I","33":"_K"},C:{"2":"_S"},D:{"2":"_wN","33":"_jP _xL"},E:{"1":"_LB","2":"_3","33":"_OC _SD"},F:{"2":"_T","33":"_a"},G:{"1":"_8","2":"_d","33":"_rD _eC"},H:{"2":"vD"},I:{"2":"_W","33":"_X"},J:{"2":"_B"},K:{"2":"_D","33":"H"},L:{"33":"I"},M:{"2":"VC"},N:{"2":"_A"},O:{"33":"YC"},P:{"33":"_F"},Q:{"33":"DE"},R:{"33":"EE"},S:{"2":"_C"}},B:4,C:"CSS Cross-Fade Function",D:true};
  	return cssCrossFade;
  }

  var cssReadOnlyWrite;
  var hasRequiredCssReadOnlyWrite;

  function requireCssReadOnlyWrite () {
  	if (hasRequiredCssReadOnlyWrite) return cssReadOnlyWrite;
  	hasRequiredCssReadOnlyWrite = 1;
  	cssReadOnlyWrite={A:{A:{"2":"_E"},B:{"1":"_xD","2":"C"},C:{"1":"_yO","16":"BD","33":"_qP _6R"},D:{"1":"_2H","16":"_Y","132":"_LG"},E:{"1":"_PB","16":"_e","132":"_QG _UJ"},F:{"1":"_GM","16":"_JR","132":"C _0B _PL"},G:{"1":"_p","16":"_rC","132":"_qO"},H:{"2":"vD"},I:{"1":"I","16":"_k","132":"_1N"},J:{"1":"A","132":"D"},K:{"1":"H","2":"_A WC","132":"C _TQ"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"1":"YC"},P:{"1":"_F"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"GE","33":"FE"}},B:1,C:"CSS :read-only and :read-write selectors",D:true};
  	return cssReadOnlyWrite;
  }

  var textEmphasis;
  var hasRequiredTextEmphasis;

  function requireTextEmphasis () {
  	if (hasRequiredTextEmphasis) return textEmphasis;
  	hasRequiredTextEmphasis = 1;
  	textEmphasis={A:{A:{"2":"_E"},B:{"1":"_qN _j","2":"_I","164":"_IB _5N"},C:{"1":"_ZJ _0E","2":"_IJ _ZC _L","322":"zB"},D:{"1":"_qN _q","2":"_rG","164":"_NB _vG _5N"},E:{"1":"_VI","2":"_3C","164":"D JD"},F:{"1":"_oG _IR","2":"_T","164":"_sC _oD"},G:{"1":"_z","2":"_o"},H:{"2":"vD"},I:{"1":"I","2":"_W","164":"_w"},J:{"2":"D","164":"A"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"1":"YC"},P:{"1":"_jQ","164":"_0O"},Q:{"164":"DE"},R:{"164":"EE"},S:{"1":"_C"}},B:4,C:"text-emphasis styling",D:true};
  	return textEmphasis;
  }

  var cssGrid;
  var hasRequiredCssGrid;

  function requireCssGrid () {
  	if (hasRequiredCssGrid) return cssGrid;
  	hasRequiredCssGrid = 1;
  	cssGrid={A:{A:{"2":"_c","8":"F","292":"_A"},B:{"1":"_aE","292":"_3B"},C:{"1":"_DN _7I","2":"_uL","8":"_hC _lH _eD","584":"_2I _fJ","1025":"_RQ"},D:{"1":"_QM","2":"_rG","8":"_CG","200":"_qB _NE _3E","1025":"BC"},E:{"1":"_HB","2":"_s","8":"_1E _yB"},F:{"1":"_HF","2":"_UK","200":"_OG _sQ"},G:{"1":"_9","2":"_1","8":"_QD _AF"},H:{"2":"vD"},I:{"1":"I","2":"_0N zD","8":"_gN"},J:{"2":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"292":"_A"},O:{"1":"YC"},P:{"1":"_gB","2":"2D","8":"J"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:4,C:"CSS Grid Layout (level 1)",D:true};
  	return cssGrid;
  }

  var cssTextSpacing;
  var hasRequiredCssTextSpacing;

  function requireCssTextSpacing () {
  	if (hasRequiredCssTextSpacing) return cssTextSpacing;
  	hasRequiredCssTextSpacing = 1;
  	cssTextSpacing={A:{A:{"2":"_GB","161":"_JC"},B:{"2":"_K","161":"_I"},C:{"2":"_S"},D:{"2":"_Q"},E:{"2":"_R"},F:{"2":"_b"},G:{"2":"_M"},H:{"2":"vD"},I:{"2":"_O"},J:{"2":"_B"},K:{"2":"_N"},L:{"2":"I"},M:{"2":"VC"},N:{"16":"_A"},O:{"2":"YC"},P:{"2":"_F"},Q:{"2":"DE"},R:{"2":"EE"},S:{"2":"_C"}},B:5,C:"CSS Text 4 text-spacing",D:false};
  	return cssTextSpacing;
  }

  var cssAnyLink;
  var hasRequiredCssAnyLink;

  function requireCssAnyLink () {
  	if (hasRequiredCssAnyLink) return cssAnyLink;
  	hasRequiredCssAnyLink = 1;
  	cssAnyLink={A:{A:{"2":"_E"},B:{"1":"_K","2":"_I"},C:{"1":"_GF","16":"BD","33":"cC _kL _L"},D:{"1":"_RM","16":"_Y","33":"_RF _qD"},E:{"1":"_PB","16":"_3C","33":"_QJ _sE"},F:{"1":"_SI","2":"_T","33":"_BR"},G:{"1":"_p","16":"_1","33":"_QD"},H:{"2":"vD"},I:{"1":"I","16":"_W","33":"_w"},J:{"16":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"1":"YC"},P:{"1":"_sF","16":"J","33":"_oJ 5D"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"GE","33":"FE"}},B:5,C:"CSS :any-link selector",D:true};
  	return cssAnyLink;
  }

  var mdnCssUnicodeBidiIsolate;
  var hasRequiredMdnCssUnicodeBidiIsolate;

  function requireMdnCssUnicodeBidiIsolate () {
  	if (hasRequiredMdnCssUnicodeBidiIsolate) return mdnCssUnicodeBidiIsolate;
  	hasRequiredMdnCssUnicodeBidiIsolate = 1;
  	mdnCssUnicodeBidiIsolate={A:{D:{"1":"_5F","2":"_DC","33":"_1L _uN"},L:{"1":"I"},B:{"1":"_K","2":"_I"},C:{"1":"_GF","2":"_RK","33":"_lD _ZG"},M:{"1":"VC"},A:{"2":"_E"},F:{"1":"_PI","2":"_T","33":"_bF"},K:{"1":"H","2":"_D"},E:{"1":"_zI _UN _PE","2":"_s SD","33":"_1E _6Q"},G:{"1":"_AB","2":"_1","33":"_QD _HD"},P:{"1":"_U","2":"J"},I:{"1":"I","2":"_G"}},B:6,C:"isolate from unicode-bidi",D:undefined};
  	return mdnCssUnicodeBidiIsolate;
  }

  var mdnCssUnicodeBidiPlaintext;
  var hasRequiredMdnCssUnicodeBidiPlaintext;

  function requireMdnCssUnicodeBidiPlaintext () {
  	if (hasRequiredMdnCssUnicodeBidiPlaintext) return mdnCssUnicodeBidiPlaintext;
  	hasRequiredMdnCssUnicodeBidiPlaintext = 1;
  	mdnCssUnicodeBidiPlaintext={A:{D:{"1":"_5F","2":"_8H"},L:{"1":"I"},B:{"1":"_K","2":"_I"},C:{"1":"_GF","2":"_RK","33":"_lD _ZG"},M:{"1":"VC"},A:{"2":"_E"},F:{"1":"_PI","2":"_TK"},K:{"1":"H","2":"_D"},E:{"1":"_zI _UN _PE","2":"_s SD","33":"_1E _6Q"},G:{"1":"_AB","2":"_1","33":"_QD _HD"},P:{"1":"_U","2":"J"},I:{"1":"I","2":"_G"}},B:6,C:"plaintext from unicode-bidi",D:undefined};
  	return mdnCssUnicodeBidiPlaintext;
  }

  var mdnCssUnicodeBidiIsolateOverride;
  var hasRequiredMdnCssUnicodeBidiIsolateOverride;

  function requireMdnCssUnicodeBidiIsolateOverride () {
  	if (hasRequiredMdnCssUnicodeBidiIsolateOverride) return mdnCssUnicodeBidiIsolateOverride;
  	hasRequiredMdnCssUnicodeBidiIsolateOverride = 1;
  	mdnCssUnicodeBidiIsolateOverride={A:{D:{"1":"_5F","2":"_8H"},L:{"1":"I"},B:{"1":"_K","2":"_I"},C:{"1":"_GF","2":"_3N","33":"_iN _zO"},M:{"1":"VC"},A:{"2":"_E"},F:{"1":"_PI","2":"_TK"},K:{"1":"H","2":"_D"},E:{"1":"_zI _UN _PE","2":"_XC SD","33":"_gC A _dR"},G:{"1":"_AB","2":"_o","33":"_TC _HD"},P:{"1":"_U","2":"J"},I:{"1":"I","2":"_G"}},B:6,C:"isolate-override from unicode-bidi",D:undefined};
  	return mdnCssUnicodeBidiIsolateOverride;
  }

  var cssOverscrollBehavior;
  var hasRequiredCssOverscrollBehavior;

  function requireCssOverscrollBehavior () {
  	if (hasRequiredCssOverscrollBehavior) return cssOverscrollBehavior;
  	hasRequiredCssOverscrollBehavior = 1;
  	cssOverscrollBehavior={A:{A:{"2":"_Z","132":"_A"},B:{"1":"_K","132":"_1F","516":"Q"},C:{"1":"_9P _tB","2":"_sL _L"},D:{"1":"_RM","2":"_2N","260":"FC GC"},E:{"1":"_0C","2":"_hF","1090":"G _CE"},F:{"1":"_SI","2":"_9O","260":"4B 5B"},G:{"1":"_jB","2":"_VF","1090":"_lK"},H:{"2":"vD"},I:{"1":"I","2":"_G"},J:{"2":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"132":"_A"},O:{"1":"YC"},P:{"1":"_xB","2":"_nC"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"GE","2":"FE"}},B:5,C:"CSS overscroll-behavior",D:true};
  	return cssOverscrollBehavior;
  }

  var cssTextOrientation;
  var hasRequiredCssTextOrientation;

  function requireCssTextOrientation () {
  	if (hasRequiredCssTextOrientation) return cssTextOrientation;
  	hasRequiredCssTextOrientation = 1;
  	cssTextOrientation={A:{A:{"2":"_E"},B:{"1":"_K","2":"_I"},C:{"1":"_8L","2":"_PM","194":"_kI"},D:{"1":"_5F","2":"_8H"},E:{"1":"_7L","2":"_SB","16":"A","33":"_5 M _OE"},F:{"1":"_PI","2":"_TK"},G:{"1":"_8","2":"_OB"},H:{"2":"vD"},I:{"1":"I","2":"_G"},J:{"2":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"1":"YC"},P:{"1":"_U","2":"J"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:2,C:"CSS text-orientation",D:true};
  	return cssTextOrientation;
  }

  var cssPrintColorAdjust;
  var hasRequiredCssPrintColorAdjust;

  function requireCssPrintColorAdjust () {
  	if (hasRequiredCssPrintColorAdjust) return cssPrintColorAdjust;
  	hasRequiredCssPrintColorAdjust = 1;
  	cssPrintColorAdjust={A:{D:{"1":"UB _nQ","2":"_wN","33":"_jP _hC _vG _3K _fI TB"},L:{"1":"I"},B:{"1":"UB _mQ","2":"_I","33":"_kN _3K _fI TB"},C:{"1":"_yH _dG","2":"_WK","33":"_0M _ID _VB _5G"},M:{"1":"VC"},A:{"2":"_E"},F:{"1":"_qH CB","2":"_T","33":"_sD _sC _UC"},K:{"2":"_D","33":"H"},E:{"1":"_AT _PE","2":"_s SD","33":"_gJ _7Q"},G:{"1":"_5B","2":"_1","33":"_QD _YR _YG"},P:{"1":"_qB","33":"_NN _CG _vE"},I:{"1":"I","2":"_W","33":"_w"}},B:6,C:"print-color-adjust property",D:undefined};
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

  f(prefixStretch, browsers => {
    f(prefixIntrinsic, { match: /x|\s#2/ }, firefox => {
      browsers = browsers.concat(firefox);
    });
    return prefix$1(['stretch'], {
      browsers,
      feature: 'css-width-stretch',
      props: sizeProps
    })
  });

  // Zoom cursors
  let prefixCursorsNew = requireCss3CursorsNewer();

  f(prefixCursorsNew, browsers =>
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
        'mask-position-x',
        'mask-position-y',
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

  var browsers$3 = Browsers$7;

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

  let Browsers$6 = browsers$3;
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

  let Browsers$5 = browsers$3;
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

  let Browsers$4 = browsers$3;
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

        let beforeSelector = list$4.comma(before.selector).join(', ');

        let some = false;
        for (let key in prefixeds[this.name]) {
          let prefixed = prefixeds[this.name][key];
          if (beforeSelector === prefixed) {
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

  let parser$3 = lib;

  let OldValue$2 = oldValue;
  let utils$6 = utils$i;
  let Value$6 = value;

  const IS_DIRECTION = /top|left|right|bottom/gi;

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

        if (param.length === 0) {
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
        if (div && div.type === 'div' && div.value === ',') {
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
      if (!params[0]) {
        return params
      }
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
        num = ((num % 360) + 360) % 360;
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

      if (!params[0][0] || params[0][0].value !== 'to') {
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
      if (nodes.length === 0) {
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
      if (string.includes('var(')) {
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
        node.nodes.push(...param);
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
        nodes.push({
          type: 'word',
          value: transformRepeat(node, { gap })
        });
        return nodes
      }
      if (gap && node.type === 'space') {
        nodes.push(
          {
            type: 'space',
            value: ' '
          },
          {
            type: 'word',
            value: gap
          },
          node
        );
        return nodes
      }
      nodes.push(node);
      return nodes
    }, []);

    return parser$2.stringify(result)
  }

  // Parse grid-template-areas

  const DOTS = /^\.+$/;

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

  function selectorStartsWith(base, selector) {
    if (!selector.startsWith(base)) {
      return false
    }

    let next = selector[base.length];
    return !next || /[\s.#[:>+~]/.test(next)
  }

  function selectorMayOverlap(previous, current) {
    let base = previous.replace(/\s*\*\s*/g, ' ').replace(/\s+/g, ' ').trim();
    let selector = current.replace(/\s+/g, ' ').trim();

    return !base || selectorStartsWith(base, selector)
  }

  function selectorsMayOverlap(previous, current) {
    return previous.some(previousSelector => {
      return current.some(currentSelector => {
        return selectorMayOverlap(previousSelector, currentSelector)
      })
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
    let previousGridAreas = [];

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

      function shouldResetSpan(rule, area, dimension) {
        return previousGridAreas.some(previous => {
          if (previous.data !== data) {
            return false
          }
          if (!selectorsMayOverlap(previous.selectors, gridAreaRule.selectors)) {
            return false
          }

          let previousArea = rule.areas[previous.value];
          return previousArea && previousArea[dimension].span > area[dimension].span
        })
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
          let addRowSpan = shouldResetSpan(rule, area, 'row');
          let addColumnSpan = shouldResetSpan(rule, area, 'column');

          getMSDecls(area, addRowSpan, addColumnSpan)
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
          let addRowSpan = area.row.updateSpan || shouldResetSpan(rule, area, 'row');
          let addColumnSpan =
            area.column.updateSpan || shouldResetSpan(rule, area, 'column');

          getMSDecls(area, addRowSpan, addColumnSpan)
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
          let addRowSpan = area.row.updateSpan || shouldResetSpan(rule, area, 'row');
          let addColumnSpan =
            area.column.updateSpan || shouldResetSpan(rule, area, 'column');

          getMSDecls(area, addRowSpan, addColumnSpan)
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
          let addRowSpan = area.row.updateSpan || shouldResetSpan(rule, area, 'row');
          let addColumnSpan =
            area.column.updateSpan || shouldResetSpan(rule, area, 'column');

          getMSDecls(area, addRowSpan, addColumnSpan)
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

      previousGridAreas.push({
        data,
        selectors: gridAreaRule.selectors,
        value
      });

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
      result.push(parser$2.stringify(node));
      return result
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
        } else if (typeof process$1.env.AUTOPREFIXER_GRID !== 'undefined') {
          if (process$1.env.AUTOPREFIXER_GRID === 'autoplace') {
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
      /** @type {number|false} */
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
    constructor(name, prefixes, all) {
      super(name, prefixes, all);
      if (this.isStretch() && prefixes.includes('-moz-')) {
        // Generate -moz-available before -webkit-fill-available
        // since -webkit-fill-available is closer to spec and FF supports both
        this.prefixes = ['-moz-'].concat(prefixes.filter(i => i !== '-moz-'));
      }
    }

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

  const REGEXP =
    /(min|max)-resolution\s*:\s*(?:\d+(?:\.\d+)?|\.\d+)(dppx|dpcm|dpi|x)/gi;
  const SPLIT =
    /(min|max)-resolution(\s*:\s*)(\d+(?:\.\d+)?|\.\d+)(dppx|dpcm|dpi|x)/i;

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

  var cssFeaturequeries={A:{A:{"2":"_E"},B:{"1":"_J"},C:{"1":"_RI","2":"_CF"},D:{"1":"_gO","2":"_lJ"},E:{"1":"_PB","2":"_TB"},F:{"1":"_xF","2":"_WE"},G:{"1":"_p","2":"_2"},H:{"1":"vD"},I:{"1":"_X","2":"_W"},J:{"2":"_B"},K:{"1":"H","2":"_D"},L:{"1":"I"},M:{"1":"VC"},N:{"2":"_A"},O:{"1":"YC"},P:{"1":"_F"},Q:{"1":"DE"},R:{"1":"EE"},S:{"1":"_C"}},B:4,C:"CSS Feature Queries",D:true};

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
          if (stack.length > 1) {
            stack.pop();
            current = last(stack);
            current.push('');
          } else {
            current[current.length - 1] += sym;
          }
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
  let Browsers$3 = browsers$3;
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
        this.all.options,
        this.all.browsers.browserslistOpts
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

  let Browsers$2 = browsers$3;
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
        nodes.push(...param);
      }
      if (nodes[0].type === 'div') {
        nodes = nodes.slice(1);
      }
      if (nodes[nodes.length - 1].type === 'div') {
        nodes = nodes.slice(0, -1);
      }
      return parser.stringify({ nodes })
    }
  };

  var transition = Transition$1;

  let AtRule = atRule;
  let Browsers$1 = browsers$3;
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

            if (step === 1 && other.prop === unprefixed) {
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
          return checker(1, callback)
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
  let Browsers = browsers$3;
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
        opts.from = opts.from || process$1.cwd();
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
  })(browsers$6);

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

})(/*AH+*/CountryStatisticsService);