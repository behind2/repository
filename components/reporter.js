/**
 * Reporter.js
 *
 * Released 0.0.1
 *
 * @author <a href="mailto:behindli@tencent.com">Behind Li</a>
 * @description 统计上报
 * Copyright (C) 1998-2015 Tencent. All Rights Reserved
 *
 */
;(function (global, factory) {

    if ( typeof module === 'object' && typeof module.exports === 'object' ) {
        module.exports = global.document ? factory(global, true) :
        function (w) {
            if ( !w.document ) {
                throw new Error( 'Reporter requires a window with a document' );
            }
            return factory(w);
        };
    } else {
        factory(global);
    }

}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {

    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;

    var defConf = {
            sys: {
                beehive: {
                    src: 'http://btrace.qq.com/kvcollect'
                }
            },
            click: {
                prefix: 'VH_',//点击码前缀
                fields: {
                    BossId: 3177,
                    Pwd: 763290108,
                    iQQ: '468113607',//QQ
                    sOp: 'data-sOp',//布码
                    sUrl: 'http://....link',//点击链接
                    sLocUrl: '',//当前页面链接url
                    vertical: '',//垂直底层
                    pageType: ''//页面类型
                }
            },
            exposure: {
                prefix: 'TP_',//曝光码前缀
                fields: {
                    BossId: 3175,
                    Pwd: 1745364445,
                    iQQ: '468113607',//QQ
                    sOp: 'data-sOp',//布码
                    sUrl: 'http://....link',//当前页面URL
                    vertical: '',//垂直底层
                    pageType: ''//页面类型
                }
            }
        };

    var
        version = '0.0.1',
        Reporter = function (options) {
            var exports = {};
            var util = {
                getQQNo: function () {
                    if ( Reporter.cookie.hasItem('o_cookie') ) {
                        return Reporter.cookie.getItem('o_cookie');
                    } else {
                        return '';
                    }
                }
            };
            // 初始化
            var init = function (options) {
                var conf = {};
                    conf = Reporter.extend(true, conf, defConf, options);
                    console.log('***conf***');
                    console.dir(conf);
            };
            var click = function () {

            };
            var expose = function () {};


            init(options);

            // exports.click
            // exports.expose

            return exports;
        };


    var isArraylike = function ( obj ) {
        var length = obj.length,
            type = Reporter.type( obj );

        if ( type === "function" || Reporter.isWindow( obj ) ) {
            return false;
        }

        if ( obj.nodeType === 1 && length ) {
            return true;
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && ( length - 1 ) in obj;
    };

    Reporter.extend = function () {
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if ( typeof target === 'boolean' ) {
            deep = target;
            target = arguments[ i ] || {};
            i++;
        }
        if ( typeof target !== 'object' && Reporter.type !== 'function' ) {
            target = {};
        }
        if ( i === length ) {
            target = this;
            i--;
        }
        for ( ; i < length; i++ ) {
            if ( (options = arguments[ i ]) != null ) {
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];
                    if ( target === copy ) {
                        continue;
                    }
                    if ( deep && copy && ( Reporter.isPlainObject(copy) || (copyIsArray = Reporter.isArray(copy)) ) ) {
                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && Reporter.isArray(src) ? src : [];

                        } else {
                            clone = src && Reporter.isPlainObject(src) ? src : {};
                        }
                        target[ name ] = Reporter.extend( deep, clone, copy );
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }
        return target;
    };

    Reporter.extend({

        type: function ( obj ) {
            if ( obj === null ) {
                return obj + "";
            }
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[ toString.call(obj) ] || "object" :
                typeof obj;
        },

        isArray: Array.isArray || function ( obj ) {
            return Reporter.type(obj) === "array";
        },

        noop: function () {},

        isEmptyObject: function ( obj ) {
            for ( var prop in obj ) {
                return false;
            }
            return true;
        },

        isWindow: function ( obj ) {
            return obj != null && obj == obj.window;
        },

        isPlainObject: function( obj ) {
            var key;
            if ( !obj || Reporter.type(obj) !== "object" || obj.nodeType || Reporter.isWindow( obj ) ) {
                return false;
            }
            try {
                if ( obj.constructor &&
                    !hasOwn.call(obj, "constructor") &&
                    !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
                    return false;
                }
            } catch ( e ) {
                return false;
            }
            var i;
            for ( i in [{}] ) {
                break;
            }
            if ( i !== "0" ) {
                for ( key in obj ) {
                    return hasOwn.call( obj, key );
                }
            }
            for ( key in obj ) {}

            return key === undefined || hasOwn.call( obj, key );
        },

        cookie: {
            hasItem: function (sKey) {
                return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
            },
            getItem: function (sKey) {
                return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
            }
        },

        domReady: (function () {

            var isTop, testDiv, scrollIntervalId,
                isBrowser = typeof window !== "undefined" && window.document,
                isPageLoaded = !isBrowser,
                doc = isBrowser ? document : null,
                readyCalls = [];

            function runCallbacks(callbacks) {
                var i;
                for (i = 0; i < callbacks.length; i += 1) {
                    callbacks[i](doc);
                }
            }

            function callReady() {
                var callbacks = readyCalls;

                if (isPageLoaded) {
                    //Call the DOM ready callbacks
                    if (callbacks.length) {
                        readyCalls = [];
                        runCallbacks(callbacks);
                    }
                }
            }

            /**
             * Sets the page as loaded.
             */
            function pageLoaded() {
                if (!isPageLoaded) {
                    isPageLoaded = true;
                    if (scrollIntervalId) {
                        clearInterval(scrollIntervalId);
                    }

                    callReady();
                }
            }

            if (isBrowser) {
                if (document.addEventListener) {
                    document.addEventListener("DOMContentLoaded", pageLoaded, false);
                    window.addEventListener("load", pageLoaded, false);
                } else if (window.attachEvent) {
                    window.attachEvent("onload", pageLoaded);

                    testDiv = document.createElement('div');
                    try {
                        isTop = window.frameElement === null;
                    } catch (e) {}

                    if (testDiv.doScroll && isTop && window.external) {
                        scrollIntervalId = setInterval(function () {
                            try {
                                testDiv.doScroll();
                                pageLoaded();
                            } catch (e) {}
                        }, 30);
                    }
                }

                if (document.readyState === "complete") {
                    pageLoaded();
                }
            }


            /**
             * Registers a callback for DOM ready. If DOM is already ready, the
             * callback is called immediately.
             * @param {Function} callback
             */
            function domReady(callback) {

                if (isPageLoaded) {
                    callback(doc);
                } else {
                    readyCalls.push(callback);
                }
                return domReady;
            }

            domReady.version = '2.0.1';

            /**
             * Loader Plugin API method 静态方法
             */
            domReady.load = function (name, req, onLoad, config) {
                if (config.isBuild) {
                    onLoad(null);
                } else {
                    domReady(onLoad);
                }
            };

            return domReady;

        })(),

        addEvent: function (ele, event, fn) {
            if ( ele.addEventListener ) {
                ele.addEventListener(event, fn, false);//DOM 2.0
            } else if ( ele.attachEvent ) {
                ele.attachEvent('on' + event, fn);//IE5+
            } else {
                ele['on' + event] = fn;//DOM 0
            }
        },

        removeEvent: function (ele, event, fn) {
            if ( ele.removeEventListener ) {
                ele.removeEventListener(event, fn, false);
            } else if ( ele.detachEvent ) {
                ele.detachEvent('on' + event, fn);
            } else {
                ele['on' + event] = null;
            }
        },

        each: function( obj, callback, args ) {
            var value,
                i = 0,
                length = obj.length,
                isArray = isArraylike( obj );
            if ( args ) {
                if ( isArray ) {
                    for ( ; i < length; i++ ) {
                        value = callback.apply( obj[ i ], args );
                        if ( value === false ) {
                            break;
                        }
                    }
                } else {
                    for ( i in obj ) {
                        value = callback.apply( obj[ i ], args );
                        if ( value === false ) {
                            break;
                        }
                    }
                }
            } else {
                if ( isArray ) {
                    for ( ; i < length; i++ ) {
                        value = callback.call( obj[ i ], i, obj[ i ] );
                        if ( value === false ) {
                            break;
                        }
                    }
                } else {
                    for ( i in obj ) {
                        value = callback.call( obj[ i ], i, obj[ i ] );
                        if ( value === false ) {
                            break;
                        }
                    }
                }
            }
            return obj;
        },
        /**
         * {
         *     path: '',
         *     data: {
         *         field1: name1,
         *         .
         *         .
         *         .
         *         fieldn1: namen1
         *     }
         * }
         *
         * return path?field1=name1&fieldn1=namen1
         */
        serialize: function ( obj ) {
            var path, kvCollect, arr = [];
                path = obj.path && obj.path || null;
                kvCollect = obj.data && obj.data || null;
                if ( !path ) return;
            for ( var prop in kvCollect ) {
                if ( kvCollect.hasOwnProperty(prop) ) {
                    arr.push(prop + '=' + kvCollect[prop]);
                }
            }
            return arr.length > 0 ? path + '?' + arr.join('&') : '';
        }

    });

    Reporter.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
    });









    if ( typeof define === 'function' && define.amd ) {
        define('reporter', [], function () {
            return Reporter;
        });
    }

    if ( typeof noGlobal === 'undefined' ) {
        window.Reporter = Reporter;
    }

    return Reporter;

}));