/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"game": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/index.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar has = Object.prototype.hasOwnProperty,\n    prefix = '~';\n/**\n * Constructor to create a storage for our `EE` objects.\n * An `Events` instance is a plain object whose properties are event names.\n *\n * @constructor\n * @private\n */\n\nfunction Events() {} //\n// We try to not inherit from `Object.prototype`. In some engines creating an\n// instance in this way is faster than calling `Object.create(null)` directly.\n// If `Object.create(null)` is not supported we prefix the event names with a\n// character to make sure that the built-in object properties are not\n// overridden or used as an attack vector.\n//\n\n\nif (Object.create) {\n  Events.prototype = Object.create(null); //\n  // This hack is needed because the `__proto__` property is still inherited in\n  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.\n  //\n\n  if (!new Events().__proto__) prefix = false;\n}\n/**\n * Representation of a single event listener.\n *\n * @param {Function} fn The listener function.\n * @param {*} context The context to invoke the listener with.\n * @param {Boolean} [once=false] Specify if the listener is a one-time listener.\n * @constructor\n * @private\n */\n\n\nfunction EE(fn, context, once) {\n  this.fn = fn;\n  this.context = context;\n  this.once = once || false;\n}\n/**\n * Add a listener for a given event.\n *\n * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} context The context to invoke the listener with.\n * @param {Boolean} once Specify if the listener is a one-time listener.\n * @returns {EventEmitter}\n * @private\n */\n\n\nfunction addListener(emitter, event, fn, context, once) {\n  if (typeof fn !== 'function') {\n    throw new TypeError('The listener must be a function');\n  }\n\n  var listener = new EE(fn, context || emitter, once),\n      evt = prefix ? prefix + event : event;\n  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);else emitter._events[evt] = [emitter._events[evt], listener];\n  return emitter;\n}\n/**\n * Clear event by name.\n *\n * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.\n * @param {(String|Symbol)} evt The Event name.\n * @private\n */\n\n\nfunction clearEvent(emitter, evt) {\n  if (--emitter._eventsCount === 0) emitter._events = new Events();else delete emitter._events[evt];\n}\n/**\n * Minimal `EventEmitter` interface that is molded against the Node.js\n * `EventEmitter` interface.\n *\n * @constructor\n * @public\n */\n\n\nfunction EventEmitter() {\n  this._events = new Events();\n  this._eventsCount = 0;\n}\n/**\n * Return an array listing the events for which the emitter has registered\n * listeners.\n *\n * @returns {Array}\n * @public\n */\n\n\nEventEmitter.prototype.eventNames = function eventNames() {\n  var names = [],\n      events,\n      name;\n  if (this._eventsCount === 0) return names;\n\n  for (name in events = this._events) {\n    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);\n  }\n\n  if (Object.getOwnPropertySymbols) {\n    return names.concat(Object.getOwnPropertySymbols(events));\n  }\n\n  return names;\n};\n/**\n * Return the listeners registered for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Array} The registered listeners.\n * @public\n */\n\n\nEventEmitter.prototype.listeners = function listeners(event) {\n  var evt = prefix ? prefix + event : event,\n      handlers = this._events[evt];\n  if (!handlers) return [];\n  if (handlers.fn) return [handlers.fn];\n\n  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {\n    ee[i] = handlers[i].fn;\n  }\n\n  return ee;\n};\n/**\n * Return the number of listeners listening to a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Number} The number of listeners.\n * @public\n */\n\n\nEventEmitter.prototype.listenerCount = function listenerCount(event) {\n  var evt = prefix ? prefix + event : event,\n      listeners = this._events[evt];\n  if (!listeners) return 0;\n  if (listeners.fn) return 1;\n  return listeners.length;\n};\n/**\n * Calls each of the listeners registered for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Boolean} `true` if the event had listeners, else `false`.\n * @public\n */\n\n\nEventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {\n  var evt = prefix ? prefix + event : event;\n  if (!this._events[evt]) return false;\n  var listeners = this._events[evt],\n      len = arguments.length,\n      args,\n      i;\n\n  if (listeners.fn) {\n    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);\n\n    switch (len) {\n      case 1:\n        return listeners.fn.call(listeners.context), true;\n\n      case 2:\n        return listeners.fn.call(listeners.context, a1), true;\n\n      case 3:\n        return listeners.fn.call(listeners.context, a1, a2), true;\n\n      case 4:\n        return listeners.fn.call(listeners.context, a1, a2, a3), true;\n\n      case 5:\n        return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;\n\n      case 6:\n        return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;\n    }\n\n    for (i = 1, args = new Array(len - 1); i < len; i++) {\n      args[i - 1] = arguments[i];\n    }\n\n    listeners.fn.apply(listeners.context, args);\n  } else {\n    var length = listeners.length,\n        j;\n\n    for (i = 0; i < length; i++) {\n      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);\n\n      switch (len) {\n        case 1:\n          listeners[i].fn.call(listeners[i].context);\n          break;\n\n        case 2:\n          listeners[i].fn.call(listeners[i].context, a1);\n          break;\n\n        case 3:\n          listeners[i].fn.call(listeners[i].context, a1, a2);\n          break;\n\n        case 4:\n          listeners[i].fn.call(listeners[i].context, a1, a2, a3);\n          break;\n\n        default:\n          if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {\n            args[j - 1] = arguments[j];\n          }\n          listeners[i].fn.apply(listeners[i].context, args);\n      }\n    }\n  }\n\n  return true;\n};\n/**\n * Add a listener for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} [context=this] The context to invoke the listener with.\n * @returns {EventEmitter} `this`.\n * @public\n */\n\n\nEventEmitter.prototype.on = function on(event, fn, context) {\n  return addListener(this, event, fn, context, false);\n};\n/**\n * Add a one-time listener for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} [context=this] The context to invoke the listener with.\n * @returns {EventEmitter} `this`.\n * @public\n */\n\n\nEventEmitter.prototype.once = function once(event, fn, context) {\n  return addListener(this, event, fn, context, true);\n};\n/**\n * Remove the listeners of a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn Only remove the listeners that match this function.\n * @param {*} context Only remove the listeners that have this context.\n * @param {Boolean} once Only remove one-time listeners.\n * @returns {EventEmitter} `this`.\n * @public\n */\n\n\nEventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {\n  var evt = prefix ? prefix + event : event;\n  if (!this._events[evt]) return this;\n\n  if (!fn) {\n    clearEvent(this, evt);\n    return this;\n  }\n\n  var listeners = this._events[evt];\n\n  if (listeners.fn) {\n    if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {\n      clearEvent(this, evt);\n    }\n  } else {\n    for (var i = 0, events = [], length = listeners.length; i < length; i++) {\n      if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {\n        events.push(listeners[i]);\n      }\n    } //\n    // Reset the array, or remove it completely if we have no more listeners.\n    //\n\n\n    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;else clearEvent(this, evt);\n  }\n\n  return this;\n};\n/**\n * Remove all listeners, or those of the specified event.\n *\n * @param {(String|Symbol)} [event] The event name.\n * @returns {EventEmitter} `this`.\n * @public\n */\n\n\nEventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {\n  var evt;\n\n  if (event) {\n    evt = prefix ? prefix + event : event;\n    if (this._events[evt]) clearEvent(this, evt);\n  } else {\n    this._events = new Events();\n    this._eventsCount = 0;\n  }\n\n  return this;\n}; //\n// Alias methods names because people roll like that.\n//\n\n\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\nEventEmitter.prototype.addListener = EventEmitter.prototype.on; //\n// Expose the prefix.\n//\n\nEventEmitter.prefixed = prefix; //\n// Allow `EventEmitter` to be imported as module namespace.\n//\n\nEventEmitter.EventEmitter = EventEmitter; //\n// Expose the module.\n//\n\nif (true) {\n  module.exports = EventEmitter;\n}\n\n//# sourceURL=webpack:///./node_modules/eventemitter3/index.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {}; // cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n  throw new Error('setTimeout has not been defined');\n}\n\nfunction defaultClearTimeout() {\n  throw new Error('clearTimeout has not been defined');\n}\n\n(function () {\n  try {\n    if (typeof setTimeout === 'function') {\n      cachedSetTimeout = setTimeout;\n    } else {\n      cachedSetTimeout = defaultSetTimout;\n    }\n  } catch (e) {\n    cachedSetTimeout = defaultSetTimout;\n  }\n\n  try {\n    if (typeof clearTimeout === 'function') {\n      cachedClearTimeout = clearTimeout;\n    } else {\n      cachedClearTimeout = defaultClearTimeout;\n    }\n  } catch (e) {\n    cachedClearTimeout = defaultClearTimeout;\n  }\n})();\n\nfunction runTimeout(fun) {\n  if (cachedSetTimeout === setTimeout) {\n    //normal enviroments in sane situations\n    return setTimeout(fun, 0);\n  } // if setTimeout wasn't available but was latter defined\n\n\n  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n    cachedSetTimeout = setTimeout;\n    return setTimeout(fun, 0);\n  }\n\n  try {\n    // when when somebody has screwed with setTimeout but no I.E. maddness\n    return cachedSetTimeout(fun, 0);\n  } catch (e) {\n    try {\n      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n      return cachedSetTimeout.call(null, fun, 0);\n    } catch (e) {\n      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n      return cachedSetTimeout.call(this, fun, 0);\n    }\n  }\n}\n\nfunction runClearTimeout(marker) {\n  if (cachedClearTimeout === clearTimeout) {\n    //normal enviroments in sane situations\n    return clearTimeout(marker);\n  } // if clearTimeout wasn't available but was latter defined\n\n\n  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n    cachedClearTimeout = clearTimeout;\n    return clearTimeout(marker);\n  }\n\n  try {\n    // when when somebody has screwed with setTimeout but no I.E. maddness\n    return cachedClearTimeout(marker);\n  } catch (e) {\n    try {\n      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n      return cachedClearTimeout.call(null, marker);\n    } catch (e) {\n      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n      // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n      return cachedClearTimeout.call(this, marker);\n    }\n  }\n}\n\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n  if (!draining || !currentQueue) {\n    return;\n  }\n\n  draining = false;\n\n  if (currentQueue.length) {\n    queue = currentQueue.concat(queue);\n  } else {\n    queueIndex = -1;\n  }\n\n  if (queue.length) {\n    drainQueue();\n  }\n}\n\nfunction drainQueue() {\n  if (draining) {\n    return;\n  }\n\n  var timeout = runTimeout(cleanUpNextTick);\n  draining = true;\n  var len = queue.length;\n\n  while (len) {\n    currentQueue = queue;\n    queue = [];\n\n    while (++queueIndex < len) {\n      if (currentQueue) {\n        currentQueue[queueIndex].run();\n      }\n    }\n\n    queueIndex = -1;\n    len = queue.length;\n  }\n\n  currentQueue = null;\n  draining = false;\n  runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n  var args = new Array(arguments.length - 1);\n\n  if (arguments.length > 1) {\n    for (var i = 1; i < arguments.length; i++) {\n      args[i - 1] = arguments[i];\n    }\n  }\n\n  queue.push(new Item(fun, args));\n\n  if (queue.length === 1 && !draining) {\n    runTimeout(drainQueue);\n  }\n}; // v8 likes predictible objects\n\n\nfunction Item(fun, array) {\n  this.fun = fun;\n  this.array = array;\n}\n\nItem.prototype.run = function () {\n  this.fun.apply(null, this.array);\n};\n\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\n\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) {\n  return [];\n};\n\nprocess.binding = function (name) {\n  throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () {\n  return '/';\n};\n\nprocess.chdir = function (dir) {\n  throw new Error('process.chdir is not supported');\n};\n\nprocess.umask = function () {\n  return 0;\n};\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g; // This works in non-strict mode\n\ng = function () {\n  return this;\n}();\n\ntry {\n  // This works if eval is allowed (see CSP)\n  g = g || new Function(\"return this\")();\n} catch (e) {\n  // This works if the window reference is available\n  if (typeof window === \"object\") g = window;\n} // g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\n\nmodule.exports = g;\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/assets/audio/ambient.mp3":
/*!**************************************!*\
  !*** ./src/assets/audio/ambient.mp3 ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/5c529a8ba62e3f2c3991ba25c5c8e967.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/ambient.mp3?");

/***/ }),

/***/ "./src/assets/audio/besttime1.mp3":
/*!****************************************!*\
  !*** ./src/assets/audio/besttime1.mp3 ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/a5e79bfe2ed795659ed88bc8325c6178.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/besttime1.mp3?");

/***/ }),

/***/ "./src/assets/audio/besttime2.mp3":
/*!****************************************!*\
  !*** ./src/assets/audio/besttime2.mp3 ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/173c9bab0d86e1d3c4fdb967d5bf3ac3.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/besttime2.mp3?");

/***/ }),

/***/ "./src/assets/audio/besttime3.mp3":
/*!****************************************!*\
  !*** ./src/assets/audio/besttime3.mp3 ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/3fbe624e944886c72156dc85464d5b6b.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/besttime3.mp3?");

/***/ }),

/***/ "./src/assets/audio/besttime4.mp3":
/*!****************************************!*\
  !*** ./src/assets/audio/besttime4.mp3 ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/6aa4d51c8de6d16d350eccc5949b2e36.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/besttime4.mp3?");

/***/ }),

/***/ "./src/assets/audio/besttime5.mp3":
/*!****************************************!*\
  !*** ./src/assets/audio/besttime5.mp3 ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/33f89bb7ec2d425a05853fe23f47b3aa.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/besttime5.mp3?");

/***/ }),

/***/ "./src/assets/audio/besttime6.mp3":
/*!****************************************!*\
  !*** ./src/assets/audio/besttime6.mp3 ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/79d2198d9f9e2357b867310a356d7099.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/besttime6.mp3?");

/***/ }),

/***/ "./src/assets/audio/door.mp3":
/*!***********************************!*\
  !*** ./src/assets/audio/door.mp3 ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/5c529a8ba62e3f2c3991ba25c5c8e967.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/door.mp3?");

/***/ }),

/***/ "./src/assets/audio/happy1.mp3":
/*!*************************************!*\
  !*** ./src/assets/audio/happy1.mp3 ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/901ef3e1529eb6345835a2f41661f51b.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/happy1.mp3?");

/***/ }),

/***/ "./src/assets/audio/happy2.mp3":
/*!*************************************!*\
  !*** ./src/assets/audio/happy2.mp3 ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/103ac7c2e237bff4654b9df5ffc8444d.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/happy2.mp3?");

/***/ }),

/***/ "./src/assets/audio/leave1.mp3":
/*!*************************************!*\
  !*** ./src/assets/audio/leave1.mp3 ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/5db83038378d4fb22f7a2b6e517347dd.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/leave1.mp3?");

/***/ }),

/***/ "./src/assets/audio/leave2.mp3":
/*!*************************************!*\
  !*** ./src/assets/audio/leave2.mp3 ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/3c99fa5d7d331315c5c19f84ef0501ac.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/leave2.mp3?");

/***/ }),

/***/ "./src/assets/audio/leave3.mp3":
/*!*************************************!*\
  !*** ./src/assets/audio/leave3.mp3 ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/567bfb86dbfae2adfc5dec19913d65c8.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/leave3.mp3?");

/***/ }),

/***/ "./src/assets/audio/leave4.mp3":
/*!*************************************!*\
  !*** ./src/assets/audio/leave4.mp3 ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/7294a1bf3353fa0d8181881ab29ef683.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/leave4.mp3?");

/***/ }),

/***/ "./src/assets/audio/leave5.mp3":
/*!*************************************!*\
  !*** ./src/assets/audio/leave5.mp3 ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/b01707ffb532ce2ab115608b60bef5d2.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/leave5.mp3?");

/***/ }),

/***/ "./src/assets/audio/leave6.mp3":
/*!*************************************!*\
  !*** ./src/assets/audio/leave6.mp3 ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/ed6aeafabb65f7e1d3898fa87b102648.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/leave6.mp3?");

/***/ }),

/***/ "./src/assets/audio/pop.mp3":
/*!**********************************!*\
  !*** ./src/assets/audio/pop.mp3 ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/8407a7e43ae33c1da63be8c463985c28.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/pop.mp3?");

/***/ }),

/***/ "./src/assets/audio/pop.opus":
/*!***********************************!*\
  !*** ./src/assets/audio/pop.opus ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/f858f19eaf41646674d0516a62facda7.opus\";\n\n//# sourceURL=webpack:///./src/assets/audio/pop.opus?");

/***/ }),

/***/ "./src/assets/audio/rock.mp3":
/*!***********************************!*\
  !*** ./src/assets/audio/rock.mp3 ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/9caadd6e138a75bf4d61c81e7aaa98b8.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/rock.mp3?");

/***/ }),

/***/ "./src/assets/audio/rock.opus":
/*!************************************!*\
  !*** ./src/assets/audio/rock.opus ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/cb713c7f1080620f2ffbcb5d606116f0.opus\";\n\n//# sourceURL=webpack:///./src/assets/audio/rock.opus?");

/***/ }),

/***/ "./src/assets/audio/synthwave.mp3":
/*!****************************************!*\
  !*** ./src/assets/audio/synthwave.mp3 ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/a1f55d815419bb14a966753c468affb1.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/synthwave.mp3?");

/***/ }),

/***/ "./src/assets/audio/synthwave.opus":
/*!*****************************************!*\
  !*** ./src/assets/audio/synthwave.opus ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/4ad4d79ee07eb6b5cdf45cb91ba1ae09.opus\";\n\n//# sourceURL=webpack:///./src/assets/audio/synthwave.opus?");

/***/ }),

/***/ "./src/assets/audio/unhappy1.mp3":
/*!***************************************!*\
  !*** ./src/assets/audio/unhappy1.mp3 ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/e382c4ade5a05a596fe1b4ebcf4124fb.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/unhappy1.mp3?");

/***/ }),

/***/ "./src/assets/audio/unhappy2.mp3":
/*!***************************************!*\
  !*** ./src/assets/audio/unhappy2.mp3 ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/ac9601f8b0258503f8a851b18d5f11c8.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/unhappy2.mp3?");

/***/ }),

/***/ "./src/assets/audio/walkin.mp3":
/*!*************************************!*\
  !*** ./src/assets/audio/walkin.mp3 ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/c286b85c2d3c8511fda91dc41ab12fa4.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/walkin.mp3?");

/***/ }),

/***/ "./src/assets/audio/welcome1.mp3":
/*!***************************************!*\
  !*** ./src/assets/audio/welcome1.mp3 ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/1ddce13f10b6fe08c784eff9187a75bf.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/welcome1.mp3?");

/***/ }),

/***/ "./src/assets/audio/welcome2.mp3":
/*!***************************************!*\
  !*** ./src/assets/audio/welcome2.mp3 ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/d3ed6412ec88556368b49c9a1d060d4f.mp3\";\n\n//# sourceURL=webpack:///./src/assets/audio/welcome2.mp3?");

/***/ }),

/***/ "./src/assets/dance-ss-small-2.png":
/*!*****************************************!*\
  !*** ./src/assets/dance-ss-small-2.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/c0f56e0098cf4329fc73349a57c938e2.png\";\n\n//# sourceURL=webpack:///./src/assets/dance-ss-small-2.png?");

/***/ }),

/***/ "./src/assets/dummy-stage.png":
/*!************************************!*\
  !*** ./src/assets/dummy-stage.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/f538975984e4e2b5803e55d42c98f48b.png\";\n\n//# sourceURL=webpack:///./src/assets/dummy-stage.png?");

/***/ }),

/***/ "./src/assets/host.png":
/*!*****************************!*\
  !*** ./src/assets/host.png ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/6f3ed5af52aa07c306a259bc7a652af3.png\";\n\n//# sourceURL=webpack:///./src/assets/host.png?");

/***/ }),

/***/ "./src/assets/title-logo.png":
/*!***********************************!*\
  !*** ./src/assets/title-logo.png ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/35b063c2dce7cc9d70adad1bf6f903f8.png\";\n\n//# sourceURL=webpack:///./src/assets/title-logo.png?");

/***/ }),

/***/ "./src/js/actors/Person.js":
/*!*********************************!*\
  !*** ./src/js/actors/Person.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config */ \"./src/js/config/config.js\");\n\n\nclass Person extends Phaser.GameObjects.Sprite {\n  constructor(scene, standingPos, partyPrefs) {\n    super(scene, _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].personEnterExitPoint.x, _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].personEnterExitPoint.y, null);\n\n    this.update = () => {\n      // TODO: depth sort\n      super.update();\n      if (!this.isAlive) return false;\n      this.depth = this.y;\n    };\n\n    this.doPartyTic = partyState => {\n      if (!this.isDancing) return false; // compare partyState to prefs, adjust happiness\n\n      let happinessDiff = 0;\n\n      for (const pref in this.partyPrefs) {\n        const prefVal = this.partyPrefs[pref];\n        const partyVal = partyState[pref]; // Reduce happiness for each unmet pref\n\n        if (partyVal !== prefVal) {\n          happinessDiff += _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].happinessDecline;\n        }\n      } // Only grow happiness if all prefs are met\n\n\n      this.happiness += happinessDiff < 0 ? happinessDiff : _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].happinessGrowth;\n      this.happiness = Phaser.Math.Clamp(this.happiness, 0, 100);\n      partyState.cumulativeScore += this.happiness;\n      this.displayHappiness();\n      this.updateDanceSpeed();\n      this.prevHappiness = this.happiness;\n\n      if (this.happiness === 0 && this.prevHappiness === 0) {\n        partyState.peopleLost++;\n        this.leaveParty();\n      }\n    };\n\n    this.updateDanceSpeed = () => {\n      this.anims.msPerFrame = _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].maxPersonDanceFrameTime - (_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].maxPersonDanceFrameTime - _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].minPersonDanceFrameTime) * this.happiness / 100;\n      if (Math.random() < 0.2) this.flipX = !this.flipX;\n    };\n\n    this.displayHappiness = () => {\n      let adjTxt = ' ';\n      let color = 'white';\n\n      if (this.prevHappiness < this.happiness) {\n        adjTxt = '+';\n        color = 'lightgreen';\n      }\n\n      if (this.prevHappiness > this.happiness) {\n        adjTxt = '-';\n        color = 'pink';\n      }\n\n      this.meterText.style.color = color;\n      this.meterText.setText(`${this.happiness} ${adjTxt}`);\n    };\n\n    this.enterParty = () => {\n      // spawn at party entrance and move to standingPos\n      this.findMySpot = this.scene.tweens.timeline({\n        targets: this,\n        totalDuration: 3000,\n        tweens: [{\n          x: this.standingPos.x\n        }, {\n          y: this.standingPos.y\n        }],\n        onComplete: () => {\n          this.startPartying();\n        }\n      });\n    };\n\n    this.anims.play('dance', true);\n    const tintColor = Math.random() * 0xffffff;\n    this.tintTopLeft = tintColor;\n    this.tintTopRight = tintColor;\n    this.setScale(1 - Math.random() * 0.1);\n    this.standingPos = standingPos;\n    this.isDancing = false;\n    this.partyPrefs = partyPrefs;\n    this.prevHappiness = this.happiness = 50; // Add meter\n\n    this.setOrigin(0.5, 1);\n    this.meterText = new Phaser.GameObjects.Text(scene, standingPos.x, standingPos.y - this.height, '', _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].textStyles.meter);\n    this.meterText.setOrigin(0.5, 1);\n    this.meterText.setShadow(2, 2, 'black');\n    this.meterText.visible = false;\n    this.displayHappiness();\n    scene.add.existing(this.meterText);\n  }\n\n  startPartying() {\n    // TODO: play dance\n    this.meterText.setVisible(true);\n    this.isDancing = true;\n  }\n\n  leaveParty() {\n    // leave via party entrance\n    this.isDancing = false;\n    this.meterText.setVisible(false);\n    this.letsGo = this.scene.tweens.timeline({\n      targets: this,\n      totalDuration: 2000,\n      tweens: [{\n        y: _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].personEnterExitPoint.y\n      }, {\n        x: _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].personEnterExitPoint.x\n      }],\n      onComplete: () => {\n        this.destroy();\n      }\n    });\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Person);\n\n//# sourceURL=webpack:///./src/js/actors/Person.js?");

/***/ }),

/***/ "./src/js/config/config.js":
/*!*********************************!*\
  !*** ./src/js/config/config.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n\nconst config = {\n  canvas: {\n    height: 600,\n    width: 800\n  },\n  textStyles: {\n    default: {\n      fontFamily: 'Bangers',\n      fontSize: 16,\n      color: '#bb0000',\n      padding: {\n        x: 5,\n        y: 1\n      }\n    },\n    meter: {\n      fontFamily: 'Arial',\n      fontSize: 24,\n      color: 'white'\n    },\n    control: {\n      fontFamily: 'Arial',\n      fontSize: 28,\n      color: 'cyan'\n    },\n    score: {\n      fontFamily: 'Montserrat',\n      fontSize: 28,\n      color: '#bb0000',\n      padding: {\n        x: 5,\n        y: 1\n      }\n    }\n  },\n  partyTickTime: 1000,\n  newPersonSpawnTime: 6000,\n  happinessDecline: -2,\n  happinessGrowth: 1,\n  minPersonDanceFrameTime: 120,\n  maxPersonDanceFrameTime: 960,\n  partyPrefs: {\n    heat: ['cold', 'warm', 'hot'],\n    light: ['ambience', 'high'],\n    volume: ['low', 'medium', 'loud'],\n    music: ['pop', 'synthwave', 'rock']\n  },\n  partyDuration: 5,\n  partySpeedFactor: 0.05,\n  personEnterExitPoint: {\n    x: 0,\n    y: 550\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (config);\n\n//# sourceURL=webpack:///./src/js/config/config.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/config */ \"./src/js/config/config.js\");\n/* harmony import */ var _scenes_title__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/title */ \"./src/js/scenes/title.js\");\n/* harmony import */ var _scenes_play__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/play */ \"./src/js/scenes/play.js\");\n\n\n\n\nconst gameConfig = {\n  type: Phaser.AUTO,\n  width: _config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].canvas.width,\n  height: _config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].canvas.height,\n  physics: {\n    default: 'arcade',\n    arcade: {\n      gravity: {\n        y: 200\n      }\n    }\n  },\n  scene: [_scenes_title__WEBPACK_IMPORTED_MODULE_2__[\"default\"], _scenes_play__WEBPACK_IMPORTED_MODULE_3__[\"default\"]]\n};\nconst game = new Phaser.Game(gameConfig);\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/scenes/play.js":
/*!*******************************!*\
  !*** ./src/js/scenes/play.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Play; });\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config */ \"./src/js/config/config.js\");\n/* harmony import */ var _actors_Person__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actors/Person */ \"./src/js/actors/Person.js\");\n/* harmony import */ var _ui_control__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/control */ \"./src/js/ui/control.js\");\n/* harmony import */ var assets_dummy_stage_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! assets/dummy-stage.png */ \"./src/assets/dummy-stage.png\");\n/* harmony import */ var assets_dummy_stage_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(assets_dummy_stage_png__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var assets_dance_ss_small_2_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! assets/dance-ss-small-2.png */ \"./src/assets/dance-ss-small-2.png\");\n/* harmony import */ var assets_dance_ss_small_2_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(assets_dance_ss_small_2_png__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var assets_host_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! assets/host.png */ \"./src/assets/host.png\");\n/* harmony import */ var assets_host_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(assets_host_png__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var assets_audio_pop_mp3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! assets/audio/pop.mp3 */ \"./src/assets/audio/pop.mp3\");\n/* harmony import */ var assets_audio_pop_mp3__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(assets_audio_pop_mp3__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var assets_audio_pop_opus__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! assets/audio/pop.opus */ \"./src/assets/audio/pop.opus\");\n/* harmony import */ var assets_audio_pop_opus__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(assets_audio_pop_opus__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var assets_audio_rock_mp3__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! assets/audio/rock.mp3 */ \"./src/assets/audio/rock.mp3\");\n/* harmony import */ var assets_audio_rock_mp3__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(assets_audio_rock_mp3__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var assets_audio_rock_opus__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! assets/audio/rock.opus */ \"./src/assets/audio/rock.opus\");\n/* harmony import */ var assets_audio_rock_opus__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(assets_audio_rock_opus__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var assets_audio_synthwave_mp3__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! assets/audio/synthwave.mp3 */ \"./src/assets/audio/synthwave.mp3\");\n/* harmony import */ var assets_audio_synthwave_mp3__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(assets_audio_synthwave_mp3__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var assets_audio_synthwave_opus__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! assets/audio/synthwave.opus */ \"./src/assets/audio/synthwave.opus\");\n/* harmony import */ var assets_audio_synthwave_opus__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(assets_audio_synthwave_opus__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var assets_audio_ambient_mp3__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! assets/audio/ambient.mp3 */ \"./src/assets/audio/ambient.mp3\");\n/* harmony import */ var assets_audio_ambient_mp3__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(assets_audio_ambient_mp3__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var assets_audio_besttime1_mp3__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! assets/audio/besttime1.mp3 */ \"./src/assets/audio/besttime1.mp3\");\n/* harmony import */ var assets_audio_besttime1_mp3__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(assets_audio_besttime1_mp3__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var assets_audio_besttime2_mp3__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! assets/audio/besttime2.mp3 */ \"./src/assets/audio/besttime2.mp3\");\n/* harmony import */ var assets_audio_besttime2_mp3__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(assets_audio_besttime2_mp3__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var assets_audio_besttime3_mp3__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! assets/audio/besttime3.mp3 */ \"./src/assets/audio/besttime3.mp3\");\n/* harmony import */ var assets_audio_besttime3_mp3__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(assets_audio_besttime3_mp3__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var assets_audio_besttime4_mp3__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! assets/audio/besttime4.mp3 */ \"./src/assets/audio/besttime4.mp3\");\n/* harmony import */ var assets_audio_besttime4_mp3__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(assets_audio_besttime4_mp3__WEBPACK_IMPORTED_MODULE_16__);\n/* harmony import */ var assets_audio_besttime5_mp3__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! assets/audio/besttime5.mp3 */ \"./src/assets/audio/besttime5.mp3\");\n/* harmony import */ var assets_audio_besttime5_mp3__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(assets_audio_besttime5_mp3__WEBPACK_IMPORTED_MODULE_17__);\n/* harmony import */ var assets_audio_besttime6_mp3__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! assets/audio/besttime6.mp3 */ \"./src/assets/audio/besttime6.mp3\");\n/* harmony import */ var assets_audio_besttime6_mp3__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(assets_audio_besttime6_mp3__WEBPACK_IMPORTED_MODULE_18__);\n/* harmony import */ var assets_audio_door_mp3__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! assets/audio/door.mp3 */ \"./src/assets/audio/door.mp3\");\n/* harmony import */ var assets_audio_door_mp3__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(assets_audio_door_mp3__WEBPACK_IMPORTED_MODULE_19__);\n/* harmony import */ var assets_audio_happy1_mp3__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! assets/audio/happy1.mp3 */ \"./src/assets/audio/happy1.mp3\");\n/* harmony import */ var assets_audio_happy1_mp3__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(assets_audio_happy1_mp3__WEBPACK_IMPORTED_MODULE_20__);\n/* harmony import */ var assets_audio_happy2_mp3__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! assets/audio/happy2.mp3 */ \"./src/assets/audio/happy2.mp3\");\n/* harmony import */ var assets_audio_happy2_mp3__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(assets_audio_happy2_mp3__WEBPACK_IMPORTED_MODULE_21__);\n/* harmony import */ var assets_audio_leave1_mp3__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! assets/audio/leave1.mp3 */ \"./src/assets/audio/leave1.mp3\");\n/* harmony import */ var assets_audio_leave1_mp3__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(assets_audio_leave1_mp3__WEBPACK_IMPORTED_MODULE_22__);\n/* harmony import */ var assets_audio_leave2_mp3__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! assets/audio/leave2.mp3 */ \"./src/assets/audio/leave2.mp3\");\n/* harmony import */ var assets_audio_leave2_mp3__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(assets_audio_leave2_mp3__WEBPACK_IMPORTED_MODULE_23__);\n/* harmony import */ var assets_audio_leave3_mp3__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! assets/audio/leave3.mp3 */ \"./src/assets/audio/leave3.mp3\");\n/* harmony import */ var assets_audio_leave3_mp3__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(assets_audio_leave3_mp3__WEBPACK_IMPORTED_MODULE_24__);\n/* harmony import */ var assets_audio_leave4_mp3__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! assets/audio/leave4.mp3 */ \"./src/assets/audio/leave4.mp3\");\n/* harmony import */ var assets_audio_leave4_mp3__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(assets_audio_leave4_mp3__WEBPACK_IMPORTED_MODULE_25__);\n/* harmony import */ var assets_audio_leave5_mp3__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! assets/audio/leave5.mp3 */ \"./src/assets/audio/leave5.mp3\");\n/* harmony import */ var assets_audio_leave5_mp3__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(assets_audio_leave5_mp3__WEBPACK_IMPORTED_MODULE_26__);\n/* harmony import */ var assets_audio_leave6_mp3__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! assets/audio/leave6.mp3 */ \"./src/assets/audio/leave6.mp3\");\n/* harmony import */ var assets_audio_leave6_mp3__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(assets_audio_leave6_mp3__WEBPACK_IMPORTED_MODULE_27__);\n/* harmony import */ var assets_audio_unhappy1_mp3__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! assets/audio/unhappy1.mp3 */ \"./src/assets/audio/unhappy1.mp3\");\n/* harmony import */ var assets_audio_unhappy1_mp3__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(assets_audio_unhappy1_mp3__WEBPACK_IMPORTED_MODULE_28__);\n/* harmony import */ var assets_audio_unhappy2_mp3__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! assets/audio/unhappy2.mp3 */ \"./src/assets/audio/unhappy2.mp3\");\n/* harmony import */ var assets_audio_unhappy2_mp3__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(assets_audio_unhappy2_mp3__WEBPACK_IMPORTED_MODULE_29__);\n/* harmony import */ var assets_audio_walkin_mp3__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! assets/audio/walkin.mp3 */ \"./src/assets/audio/walkin.mp3\");\n/* harmony import */ var assets_audio_walkin_mp3__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(assets_audio_walkin_mp3__WEBPACK_IMPORTED_MODULE_30__);\n/* harmony import */ var assets_audio_welcome1_mp3__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! assets/audio/welcome1.mp3 */ \"./src/assets/audio/welcome1.mp3\");\n/* harmony import */ var assets_audio_welcome1_mp3__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(assets_audio_welcome1_mp3__WEBPACK_IMPORTED_MODULE_31__);\n/* harmony import */ var assets_audio_welcome2_mp3__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! assets/audio/welcome2.mp3 */ \"./src/assets/audio/welcome2.mp3\");\n/* harmony import */ var assets_audio_welcome2_mp3__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(assets_audio_welcome2_mp3__WEBPACK_IMPORTED_MODULE_32__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst STAGE_TINT_DARK = Phaser.Display.Color.HexStringToColor('0x666666');\nconst STAGE_TINT_RED = Phaser.Display.Color.HexStringToColor('0xffaaaa');\nconst STAGE_TINT_BLUE = Phaser.Display.Color.HexStringToColor('0xaaaaff');\nconst STAGE_TINT_PURPLE = Phaser.Display.Color.HexStringToColor('0xff99ff');\n\nconst mergeColors = (color1, color2) => {\n  let r = Math.floor(Math.abs(color1.red - color2.red) / 2) + Math.min(color1.red, color2.red);\n  let g = Math.floor(Math.abs(color1.green - color2.green) / 2) + Math.min(color1.green, color2.green);\n  let b = Math.floor(Math.abs(color1.blue - color2.blue) / 2) + Math.min(color1.blue, color2.blue);\n  return new Phaser.Display.Color(r, g, b);\n};\n\nclass Play extends Phaser.Scene {\n  constructor() {\n    super({\n      key: 'play'\n    });\n\n    this.setupClock = () => {\n      this.clockTimer = this.time.addEvent({\n        delay: _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].partyTickTime,\n        repeat: _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].partyDuration - 1,\n        timeScale: _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].partySpeedFactor,\n        callback: this.stopTheParty\n      });\n      this.graphics = this.add.graphics({\n        x: 0,\n        y: 0\n      });\n      this.clockSize = 75;\n    };\n\n    this.setupStage = () => {\n      this.stageBg = this.add.image(this.sys.canvas.width * 0.5, this.sys.canvas.height * 0.5, 'dummy-stage');\n      this.scoreText = this.add.text(0, 0, `Score: 0`, _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].textStyles.score);\n      this.scoreText.setOrigin(0);\n      let location = this.getSpawnLocation();\n      this.hostSprite = this.add.sprite(location.x, location.y, 'host');\n    };\n\n    this.getSpawnLocation = () => {\n      var loc = {\n        x: Phaser.Math.RND.integerInRange(100, 760),\n        y: Phaser.Math.RND.integerInRange(400, 500)\n      };\n      return loc;\n    };\n\n    this.setupParty = () => {\n      this.partyState = {};\n\n      for (let pref in _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].partyPrefs) {\n        this.partyState[pref] = _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].partyPrefs[pref][0];\n      }\n\n      this.partyState.cumulativeScore = 0;\n      this.partyState.peopleGained = 0;\n      this.partyState.peopleLost = 0;\n      this.partyPrefNames = Object.keys(_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].partyPrefs);\n      this.partyPeople = [];\n    };\n\n    this.setupAudio = () => {\n      /* Sets up the audio tracks that can be played in the background.\n       * Trigger changes in the audio playing with changeMusic().\n       */\n      const soundCfgMusic = {\n        mute: false,\n        volume: 1,\n        rate: 1,\n        detune: 0,\n        seek: 0,\n        loop: true,\n        delay: 0\n      };\n      const soundCfgAmbient = {\n        mute: false,\n        volume: 0.85,\n        rate: 1,\n        detune: 0,\n        seek: 0,\n        loop: true,\n        delay: 0\n      };\n      const soundCfgSfx = {\n        mute: false,\n        volume: 1,\n        rate: 1,\n        detune: 0,\n        seek: 0,\n        loop: false,\n        delay: 0\n      };\n      this.gAudio = {}; // Welcome\n\n      this.gAudio.welcome = [this.sound.add('welcome1', soundCfgSfx), this.sound.add('welcome2', soundCfgSfx)]; // Music\n\n      this.gAudio.music = new Map();\n      this.gAudio.music.set('pop', this.sound.add('pop', soundCfgMusic));\n      this.gAudio.music.set('rock', this.sound.add('rock', soundCfgMusic));\n      this.gAudio.music.set('synthwave', this.sound.add('synthwave', soundCfgMusic)); // Ambient (looped)\n\n      this.gAudio.ambient = this.sound.add('ambient', soundCfgAmbient); // Walkin/Door SFX\n\n      this.gAudio.walkin = this.sound.add('walkin', soundCfgSfx);\n      this.gAudio.door = this.sound.add('door', soundCfgSfx); // Happy/unhappy SFX\n\n      this.gAudio.happy = [this.sound.add('happy1', soundCfgSfx), this.sound.add('happy2', soundCfgSfx)];\n      this.gAudio.unhappy = [this.sound.add('unhappy1', soundCfgSfx), this.sound.add('unhappy2', soundCfgSfx)]; // Besttime/leave SFX\n\n      this.gAudio.besttime = [this.sound.add('besttime1', soundCfgSfx), this.sound.add('besttime2', soundCfgSfx), this.sound.add('besttime3', soundCfgSfx), this.sound.add('besttime4', soundCfgSfx), this.sound.add('besttime5', soundCfgSfx), this.sound.add('besttime6', soundCfgSfx)];\n      this.gAudio.leave = [this.sound.add('leave1', soundCfgSfx), this.sound.add('leave2', soundCfgSfx), this.sound.add('leave3', soundCfgSfx), this.sound.add('leave4', soundCfgSfx), this.sound.add('leave5', soundCfgSfx), this.sound.add('leave6', soundCfgSfx)];\n    };\n\n    this.changeMusic = newTrack => {\n      /* Stops all tracks and plays one defined by newTrack. */\n      for (var track of this.gAudio.music.values()) {\n        track.stop();\n      }\n\n      this.gAudio.music.get(newTrack).play();\n    };\n\n    this.setupControls = () => {\n      this.controls = {};\n      this.partyPrefNames.forEach((prefName, idx) => {\n        const ctrl = new _ui_control__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this, 25 + idx * 200, 550, prefName, this.partyState[prefName], () => {\n          let prefIndex = _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].partyPrefs[prefName].indexOf(this.partyState[prefName]);\n          prefIndex = (prefIndex + 1) % _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].partyPrefs[prefName].length;\n          this.partyState[prefName] = _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].partyPrefs[prefName][prefIndex];\n          this.onStateChange(prefName, this.partyState[prefName]);\n          return this.partyState[prefName];\n        });\n        this.controls[prefName] = ctrl;\n        this.add.existing(ctrl);\n      });\n    };\n\n    this.startTheParty = () => {\n      this.doStageTint();\n      this.partyTickTimer = this.time.addEvent({\n        delay: _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].partyTickTime,\n        callback: this.doPartyTic,\n        loop: true\n      });\n      this.personSpawnTimer = this.time.addEvent({\n        delay: _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].newPersonSpawnTime,\n        callback: this.addNewRandomPerson,\n        loop: true\n      });\n      this.addNewRandomPerson();\n      this.changeMusic('pop');\n      this.gAudio.ambient.play();\n    };\n\n    this.stopTheParty = () => {\n      if (this.clockTimer.getOverallProgress() >= 1) {\n        // Party's over, punks!\n        console.log('Party\\'s Over!', this.partyState);\n        this.partyTickTimer.destroy();\n        this.personSpawnTimer.destroy();\n      }\n    };\n\n    this.addNewRandomPerson = () => {\n      var prefs = {};\n      this.partyPrefNames.forEach(function (pref) {\n        const prefValue = _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].partyPrefs[pref][Phaser.Math.RND.integerInRange(0, _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].partyPrefs[pref].length)];\n        prefs[pref] = prefValue;\n      }); // TODO retry until we get a position at least <X>px away from other patrons\n\n      var spawnLocation = this.getSpawnLocation();\n      this.addPartyPerson(spawnLocation, prefs);\n    };\n\n    this.addPartyPerson = (startingPos, prefs) => {\n      const newPerson = new _actors_Person__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this, startingPos, prefs);\n      this.add.existing(newPerson);\n      this.partyPeople.push(newPerson);\n      newPerson.enterParty();\n      this.partyState.peopleGained++;\n    };\n\n    this.doPartyTic = () => {\n      this.partyPeople.forEach(person => person.doPartyTic(this.partyState));\n      this.scoreText.setText(`Score: ${this.partyState.cumulativeScore}`);\n    };\n\n    this.doStageTint = () => {\n      let tints = [];\n      tints.push(STAGE_TINT_PURPLE); // Tint the stage based on heat and light settings\n\n      if (this.partyState['light'] == 'ambience') {\n        tints.push(STAGE_TINT_DARK);\n      }\n\n      if (this.partyState['heat'] == 'hot') {\n        tints.push(STAGE_TINT_RED);\n      } else if (this.partyState['heat'] == 'cold') {\n        tints.push(STAGE_TINT_BLUE);\n      } // Combine all the tints before applying them to the stage\n\n\n      let resultingTint = tints.shift();\n      let newTint;\n\n      while (newTint = tints.shift()) {\n        resultingTint = mergeColors(resultingTint, newTint);\n      }\n\n      this.stageBg.setTint(resultingTint.color);\n    };\n\n    this.drawClock = (x, y, timer) => {\n      // Clock code was originally provided as a Phaser example at http://labs.phaser.io/edit.html?src=src\\time\\clock.js\n      //  Progress is between 0 and 1, where 0 = the hand pointing up and then rotating clockwise a full 360\n      //  The frame\n      this.graphics.clear();\n      this.graphics.lineStyle(6, 0xffffff, 1);\n      this.graphics.strokeCircle(x, y, this.clockSize);\n      let angle, dest, p1, p2, size; //  The \"hour\" hand (overall progress) (only if repeat > 0)\n\n      if (timer.repeat > 0) {\n        size = this.clockSize * 0.6; // Give the player x hours, starting at 7pm\n\n        let durationAngle = _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].partyDuration * 30;\n        angle = durationAngle * timer.getOverallProgress() + 120;\n        dest = Phaser.Math.RotateAroundDistance({\n          x: x,\n          y: y\n        }, x, y, Phaser.Math.DegToRad(angle), size);\n        this.graphics.lineStyle(2, 0xff0000, 1);\n        this.graphics.beginPath();\n        this.graphics.moveTo(x, y);\n        p1 = Phaser.Math.RotateAroundDistance({\n          x: x,\n          y: y\n        }, x, y, Phaser.Math.DegToRad(angle - 5), size * 0.7);\n        this.graphics.lineTo(p1.x, p1.y);\n        this.graphics.lineTo(dest.x, dest.y);\n        this.graphics.moveTo(x, y);\n        p2 = Phaser.Math.RotateAroundDistance({\n          x: x,\n          y: y\n        }, x, y, Phaser.Math.DegToRad(angle + 5), size * 0.7);\n        this.graphics.lineTo(p2.x, p2.y);\n        this.graphics.lineTo(dest.x, dest.y);\n        this.graphics.strokePath();\n        this.graphics.closePath();\n      } //  The current iteration hand\n\n\n      size = this.clockSize * 0.95;\n      angle = 360 * timer.getProgress() - 90;\n      dest = Phaser.Math.RotateAroundDistance({\n        x: x,\n        y: y\n      }, x, y, Phaser.Math.DegToRad(angle), size);\n      this.graphics.lineStyle(2, 0xffff00, 1);\n      this.graphics.beginPath();\n      this.graphics.moveTo(x, y);\n      p1 = Phaser.Math.RotateAroundDistance({\n        x: x,\n        y: y\n      }, x, y, Phaser.Math.DegToRad(angle - 5), size * 0.7);\n      this.graphics.lineTo(p1.x, p1.y);\n      this.graphics.lineTo(dest.x, dest.y);\n      this.graphics.moveTo(x, y);\n      p2 = Phaser.Math.RotateAroundDistance({\n        x: x,\n        y: y\n      }, x, y, Phaser.Math.DegToRad(angle + 5), size * 0.7);\n      this.graphics.lineTo(p2.x, p2.y);\n      this.graphics.lineTo(dest.x, dest.y);\n      this.graphics.strokePath();\n      this.graphics.closePath();\n    };\n\n    this.update = () => {\n      super.update();\n      this.partyPeople.forEach(person => person.update());\n      this.drawClock(100, 200, this.clockTimer);\n    };\n  }\n\n  preload() {\n    this.load.image('dummy-stage', assets_dummy_stage_png__WEBPACK_IMPORTED_MODULE_3___default.a);\n    this.load.image('host', assets_host_png__WEBPACK_IMPORTED_MODULE_5___default.a);\n    this.load.audio('pop', [assets_audio_pop_mp3__WEBPACK_IMPORTED_MODULE_6___default.a, assets_audio_pop_opus__WEBPACK_IMPORTED_MODULE_7___default.a]);\n    this.load.audio('rock', [assets_audio_rock_mp3__WEBPACK_IMPORTED_MODULE_8___default.a, assets_audio_rock_opus__WEBPACK_IMPORTED_MODULE_9___default.a]);\n    this.load.audio('synthwave', [assets_audio_synthwave_mp3__WEBPACK_IMPORTED_MODULE_10___default.a, assets_audio_synthwave_opus__WEBPACK_IMPORTED_MODULE_11___default.a]);\n    this.load.spritesheet('dance-ss-small', assets_dance_ss_small_2_png__WEBPACK_IMPORTED_MODULE_4___default.a, {\n      frameWidth: 104,\n      frameHeight: 160\n    });\n    this.load.audio('ambient', assets_audio_ambient_mp3__WEBPACK_IMPORTED_MODULE_12___default.a);\n    this.load.audio('besttime1', assets_audio_besttime1_mp3__WEBPACK_IMPORTED_MODULE_13___default.a);\n    this.load.audio('besttime2', assets_audio_besttime2_mp3__WEBPACK_IMPORTED_MODULE_14___default.a);\n    this.load.audio('besttime3', assets_audio_besttime3_mp3__WEBPACK_IMPORTED_MODULE_15___default.a);\n    this.load.audio('besttime4', assets_audio_besttime4_mp3__WEBPACK_IMPORTED_MODULE_16___default.a);\n    this.load.audio('besttime5', assets_audio_besttime5_mp3__WEBPACK_IMPORTED_MODULE_17___default.a);\n    this.load.audio('besttime6', assets_audio_besttime6_mp3__WEBPACK_IMPORTED_MODULE_18___default.a);\n    this.load.audio('door', assets_audio_door_mp3__WEBPACK_IMPORTED_MODULE_19___default.a);\n    this.load.audio('happy1', assets_audio_happy1_mp3__WEBPACK_IMPORTED_MODULE_20___default.a);\n    this.load.audio('happy2', assets_audio_happy2_mp3__WEBPACK_IMPORTED_MODULE_21___default.a);\n    this.load.audio('leave1', assets_audio_leave1_mp3__WEBPACK_IMPORTED_MODULE_22___default.a);\n    this.load.audio('leave2', assets_audio_leave2_mp3__WEBPACK_IMPORTED_MODULE_23___default.a);\n    this.load.audio('leave3', assets_audio_leave3_mp3__WEBPACK_IMPORTED_MODULE_24___default.a);\n    this.load.audio('leave4', assets_audio_leave4_mp3__WEBPACK_IMPORTED_MODULE_25___default.a);\n    this.load.audio('leave5', assets_audio_leave5_mp3__WEBPACK_IMPORTED_MODULE_26___default.a);\n    this.load.audio('leave6', assets_audio_leave6_mp3__WEBPACK_IMPORTED_MODULE_27___default.a);\n    this.load.audio('unhappy1', assets_audio_unhappy1_mp3__WEBPACK_IMPORTED_MODULE_28___default.a);\n    this.load.audio('unhappy2', assets_audio_unhappy2_mp3__WEBPACK_IMPORTED_MODULE_29___default.a);\n    this.load.audio('walkin', assets_audio_walkin_mp3__WEBPACK_IMPORTED_MODULE_30___default.a);\n    this.load.audio('welcome1', assets_audio_welcome1_mp3__WEBPACK_IMPORTED_MODULE_31___default.a);\n    this.load.audio('welcome2', assets_audio_welcome2_mp3__WEBPACK_IMPORTED_MODULE_32___default.a);\n    console.log('PLAY', this);\n  }\n\n  create() {\n    const frames = this.anims.generateFrameNumbers('dance-ss-small');\n    console.log('frames', frames);\n    this.anims.create({\n      key: 'dance',\n      frames: 'dance-ss-small',\n      frameRate: 1,\n      repeat: -1\n    });\n    this.setupStage();\n    this.setupAudio();\n    this.setupParty();\n    this.setupClock();\n    this.setupControls();\n    this.startTheParty();\n  }\n\n  onStateChange(prefName, newState) {\n    this.doStageTint();\n\n    if (prefName == 'music') {\n      this.changeMusic(newState);\n    }\n  }\n\n}\n\n//# sourceURL=webpack:///./src/js/scenes/play.js?");

/***/ }),

/***/ "./src/js/scenes/title.js":
/*!********************************!*\
  !*** ./src/js/scenes/title.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Title; });\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config */ \"./src/js/config/config.js\");\n/* harmony import */ var assets_title_logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! assets/title-logo.png */ \"./src/assets/title-logo.png\");\n/* harmony import */ var assets_title_logo_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(assets_title_logo_png__WEBPACK_IMPORTED_MODULE_1__);\n\n\nclass Title extends Phaser.Scene {\n  constructor() {\n    super({\n      key: 'title'\n    });\n  }\n\n  preload() {\n    this.load.image('logo', assets_title_logo_png__WEBPACK_IMPORTED_MODULE_1___default.a); // Load fonts for the game\n\n    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');\n  }\n\n  create() {\n    console.log('PHASER', Phaser);\n    console.log('Title create');\n    WebFont.load({\n      google: {\n        families: [_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].textStyles.default.fontFamily, _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].textStyles.score.fontFamily]\n      },\n      active: () => {\n        this.add.image(_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].canvas.width / 2, _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].canvas.height / 2, 'logo');\n        const prompt = this.add.text(400, 400, 'Press any key to continue', _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].textStyles.default);\n        prompt.setOrigin(0.5);\n      }\n    });\n    this.input.manager.enabled = true;\n    this.input.once('pointerdown', () => {\n      this.scene.start('play');\n    }, this);\n  }\n\n}\n;\n\n//# sourceURL=webpack:///./src/js/scenes/title.js?");

/***/ }),

/***/ "./src/js/ui/control.js":
/*!******************************!*\
  !*** ./src/js/ui/control.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config */ \"./src/js/config/config.js\");\n\n\nclass Control extends Phaser.GameObjects.Text {\n  constructor(scene, x, y, label, initialValue, onClickFn) {\n    super(scene, x, y, '', _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].textStyles.control);\n    this.label = label;\n    this.updateLabel(initialValue);\n    this.setInteractive({\n      useHandCursor: true\n    }).on('pointerup', () => {\n      const res = onClickFn();\n      if (res === false) return;\n      this.updateLabel(res);\n    });\n  }\n\n  updateLabel(newValue) {\n    this.setText(`${this.label}: ${newValue}`);\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Control);\n\n//# sourceURL=webpack:///./src/js/ui/control.js?");

/***/ })

/******/ });