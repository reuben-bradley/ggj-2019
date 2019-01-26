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

/***/ "./src/assets/dummy-stage.png":
/*!************************************!*\
  !*** ./src/assets/dummy-stage.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/b2bd6c17597f094421b142a210abe2ef.png\";\n\n//# sourceURL=webpack:///./src/assets/dummy-stage.png?");

/***/ }),

/***/ "./src/assets/person.png":
/*!*******************************!*\
  !*** ./src/assets/person.png ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"assets/fe10ce534ee40c9bfd20bd0411c0a677.png\";\n\n//# sourceURL=webpack:///./src/assets/person.png?");

/***/ }),

/***/ "./src/js/actors/Person.js":
/*!*********************************!*\
  !*** ./src/js/actors/Person.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config */ \"./src/js/config/config.js\");\n\n\nclass Person extends Phaser.GameObjects.Sprite {\n  constructor(scene, standingPos, partyPrefs) {\n    super(scene, standingPos.x, standingPos.y, 'person');\n\n    this.doPartyTic = partyState => {\n      // compare partyState to prefs, adjust happiness\n      let happinessDiff = 0;\n\n      for (const pref in this.partyPrefs) {\n        const prefVal = this.partyPrefs[pref];\n        const partyVal = partyState[pref]; // Reduce happiness for each unmet pref\n\n        if (partyVal !== prefVal) {\n          happinessDiff += _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].happinessDecline;\n        }\n      } // Only grow happiness if all prefs are met\n\n\n      this.happiness += happinessDiff < 0 ? happinessDiff : _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].happinessGrowth;\n      this.happiness = Phaser.Math.Clamp(this.happiness, 0, 100);\n      this.displayHappiness();\n      this.prevHappiness = this.happiness;\n    };\n\n    this.displayHappiness = () => {\n      let adjTxt = '';\n      let color = 'white';\n\n      if (this.prevHappiness < this.happiness) {\n        adjTxt = '+';\n        color = 'lightgreen';\n      }\n\n      if (this.prevHappiness > this.happiness) {\n        adjTxt = '-';\n        color = 'pink';\n      }\n\n      this.meterText.style.color = color;\n      this.meterText.setText(`${this.happiness} ${adjTxt}`);\n    };\n\n    this.standingPos = standingPos;\n    this.depth = standingPos.y;\n    this.partyPrefs = partyPrefs;\n    this.prevHappiness = this.happiness = 50; // Add meter\n\n    this.setOrigin(0.5, 1);\n    this.meterText = new Phaser.GameObjects.Text(scene, standingPos.x, standingPos.y - this.height, '', _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].textStyles.meter);\n    this.meterText.setOrigin(0.5, 1);\n    this.meterText.depth = standingPos.y + 100;\n    this.meterText.setShadow(2, 2, 'black');\n    this.displayHappiness();\n    scene.add.existing(this.meterText);\n  }\n\n  update() {// animate etc\n  }\n\n  enterParty() {// spawn at party entrance and move to standingPos\n  }\n\n  leaveParty() {// leave via party entrance\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Person);\n\n//# sourceURL=webpack:///./src/js/actors/Person.js?");

/***/ }),

/***/ "./src/js/config/config.js":
/*!*********************************!*\
  !*** ./src/js/config/config.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n\nconst config = {\n  canvas: {\n    height: 600,\n    width: 800\n  },\n  textStyles: {\n    default: {\n      fontFamily: 'Bangers',\n      fontSize: 16,\n      color: '#bb0000',\n      padding: {\n        x: 5,\n        y: 1\n      }\n    },\n    title: {\n      fontFamily: 'Cinzel Decorative',\n      fontSize: 42,\n      fontWeight: 900,\n      color: '#00bb00',\n      padding: {\n        x: 5,\n        y: 1\n      }\n    },\n    meter: {\n      fontFamily: 'Arial',\n      fontSize: 24,\n      color: 'white'\n    },\n    control: {\n      fontFamily: 'Arial',\n      fontSize: 28,\n      color: 'cyan'\n    }\n  },\n  partyTickTime: 1000,\n  newPersonSpawnTime: 6000,\n  maxPersons: 10,\n  happinessDecline: -2,\n  happinessGrowth: 1\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (config);\n\n//# sourceURL=webpack:///./src/js/config/config.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/config */ \"./src/js/config/config.js\");\n/* harmony import */ var _scenes_title__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/title */ \"./src/js/scenes/title.js\");\n/* harmony import */ var _scenes_main__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/main */ \"./src/js/scenes/main.js\");\n/* harmony import */ var _scenes_play__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scenes/play */ \"./src/js/scenes/play.js\");\n\n\n\n\n\nconst gameConfig = {\n  type: Phaser.AUTO,\n  width: _config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].canvas.width,\n  height: _config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].canvas.height,\n  physics: {\n    default: 'arcade',\n    arcade: {\n      gravity: {\n        y: 200\n      }\n    }\n  },\n  scene: [_scenes_play__WEBPACK_IMPORTED_MODULE_4__[\"default\"]]\n};\nconst game = new Phaser.Game(gameConfig);\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/scenes/main.js":
/*!*******************************!*\
  !*** ./src/js/scenes/main.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Main; });\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config */ \"./src/js/config/config.js\");\n\nclass Main extends Phaser.Scene {\n  constructor() {\n    super({\n      key: 'main'\n    });\n  }\n\n  preload() {// Load necessary tiles and sprites\n  }\n\n  create() {}\n\n  update() {}\n\n}\n;\n\n//# sourceURL=webpack:///./src/js/scenes/main.js?");

/***/ }),

/***/ "./src/js/scenes/play.js":
/*!*******************************!*\
  !*** ./src/js/scenes/play.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Play; });\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config */ \"./src/js/config/config.js\");\n/* harmony import */ var _actors_Person__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actors/Person */ \"./src/js/actors/Person.js\");\n/* harmony import */ var _ui_Control__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/Control */ \"./src/js/ui/Control.js\");\n/* harmony import */ var assets_dummy_stage_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! assets/dummy-stage.png */ \"./src/assets/dummy-stage.png\");\n/* harmony import */ var assets_dummy_stage_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(assets_dummy_stage_png__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var assets_person_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! assets/person.png */ \"./src/assets/person.png\");\n/* harmony import */ var assets_person_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(assets_person_png__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nclass Play extends Phaser.Scene {\n  constructor() {\n    super({\n      key: 'play'\n    });\n\n    this.setupStage = () => {\n      this.stageBg = this.add.image(this.sys.canvas.width * 0.5, this.sys.canvas.height * 0.5, 'dummy-stage');\n      this.stageBg.setScale(0.45);\n    };\n\n    this.setupSpawnLocations = () => {\n      this.personLocations = [];\n      const xmin = 100;\n      const xmax = 700;\n      const xspace = (xmax - xmin) / _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].maxPersons >> 0;\n\n      for (let i = 0; i < _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].maxPersons; i++) {\n        const pos = {\n          x: xmin + xspace * i,\n          y: Phaser.Math.RND.integerInRange(400, 500)\n        };\n        this.personLocations.push(pos);\n      }\n\n      this.personLocations = Phaser.Utils.Array.Shuffle(this.personLocations);\n    };\n\n    this.setupParty = () => {\n      this.partyState = {\n        heat: 0,\n        light: 0,\n        volume: 0\n      };\n      this.partyPrefNames = Object.keys(this.partyState);\n      this.partyPeople = [];\n    };\n\n    this.setupControls = () => {\n      this.controls = {};\n      this.partyPrefNames.forEach((prefName, idx) => {\n        const ctrl = new _ui_Control__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this, 100 + idx * 100, 550, prefName, this.partyState[prefName], () => {\n          this.partyState[prefName] = this.partyState[prefName] === 0 ? 1 : 0;\n          return this.partyState[prefName];\n        });\n        this.controls[prefName] = ctrl;\n        this.add.existing(ctrl);\n      });\n    };\n\n    this.startTheParty = () => {\n      this.partyTickTimer = this.time.addEvent({\n        delay: _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].partyTickTime,\n        callback: this.doPartyTic,\n        loop: true\n      });\n      this.personSpawnTimer = this.time.addEvent({\n        delay: _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].newPersonSpawnTime,\n        callback: this.addNewRandomPerson,\n        loop: true\n      });\n      this.addNewRandomPerson();\n    };\n\n    this.addNewRandomPerson = () => {\n      if (this.partyPeople.length === _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].maxPersons) return false;\n      const specificPref = Phaser.Utils.Array.GetRandom(this.partyPrefNames);\n      const prefValue = Phaser.Math.RND.integerInRange(0, 1);\n      this.addPartyPerson(this.personLocations.pop(), {\n        [specificPref]: prefValue\n      });\n    };\n\n    this.addPartyPerson = (startingPos, prefs) => {\n      const newPerson = new _actors_Person__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this, startingPos, prefs);\n      this.add.existing(newPerson);\n      this.partyPeople.push(newPerson);\n    };\n\n    this.doPartyTic = () => {\n      this.partyPeople.forEach(person => person.doPartyTic(this.partyState));\n    };\n  }\n\n  preload() {\n    this.load.image('dummy-stage', assets_dummy_stage_png__WEBPACK_IMPORTED_MODULE_3___default.a);\n    this.load.image('person', assets_person_png__WEBPACK_IMPORTED_MODULE_4___default.a);\n  }\n\n  create() {\n    this.setupStage();\n    this.setupSpawnLocations();\n    this.setupParty();\n    this.setupControls();\n    this.startTheParty();\n  }\n\n}\n\n//# sourceURL=webpack:///./src/js/scenes/play.js?");

/***/ }),

/***/ "./src/js/scenes/title.js":
/*!********************************!*\
  !*** ./src/js/scenes/title.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Title; });\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config */ \"./src/js/config/config.js\");\n\nclass Title extends Phaser.Scene {\n  constructor() {\n    super({\n      key: 'title'\n    });\n  }\n\n  preload() {\n    // Load fonts for the title screen\n    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');\n  }\n\n  create() {\n    console.log('PHASER', Phaser);\n    console.log('Title create');\n    WebFont.load({\n      google: {\n        families: [_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].textStyles.title.fontFamily, _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].textStyles.default.fontFamily]\n      },\n      active: () => {\n        const title = this.add.text(400, 200, 'This is the Title Screen', _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].textStyles.title);\n        title.setOrigin(0.5);\n        const prompt = this.add.text(400, 400, 'Press any key to continue', _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].textStyles.default);\n        prompt.setOrigin(0.5);\n      }\n    });\n    this.input.manager.enabled = true;\n    this.input.once('pointerdown', () => {\n      this.scene.start('play');\n    }, this);\n  }\n\n}\n;\n\n//# sourceURL=webpack:///./src/js/scenes/title.js?");

/***/ }),

/***/ "./src/js/ui/Control.js":
/*!******************************!*\
  !*** ./src/js/ui/Control.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config */ \"./src/js/config/config.js\");\n\n\nclass Control extends Phaser.GameObjects.Text {\n  constructor(scene, x, y, label, initialValue, onClickFn) {\n    super(scene, x, y, '', _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].textStyles.control);\n    this.label = label;\n    this.updateLabel(initialValue);\n    this.setInteractive({\n      useHandCursor: true\n    }).on('pointerup', () => {\n      const res = onClickFn();\n      if (res === false) return;\n      this.updateLabel(res);\n    });\n  }\n\n  updateLabel(newValue) {\n    this.setText(`${this.label}: ${newValue}`);\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Control);\n\n//# sourceURL=webpack:///./src/js/ui/Control.js?");

/***/ })

/******/ });