/**
 * browser IDB
 * @return {Object} IDB
 */
;(function(win) {

    var IDB = {};

    // @return {Boolean} true 支持 | false 不支持
    var isSupported = function () {
        return window.indexedDB ? true : false;
    };

    var domReady = (function() {

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
                    scrollIntervalId = setInterval(function() {
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
        domReady.load = function(name, req, onLoad, config) {
            if (config.isBuild) {
                onLoad(null);
            } else {
                domReady(onLoad);
            }
        };

        return domReady;

    })();

    /**
     * createIDBOpenReq 创建indexedDB链接请求
     * @param  {String} name    db名称
     * @param  {Int}    version 版本号
     * @return {IDBOpenDBRequest}
     */
    var createIDBOpenReq = function (name, version) {
        if (version) {
            return indexedDB.open(name, version);
        } else {
            return indexedDB.open(name);
        }
    };

    // 删除数据库
    var deleteIDB = function (name) {
        indexedDB.deleteDatabase(name);
    };

    /**
     * bindIDBOpenReq 为indexedDB链接请求绑定事件
     * @param  {IDBOpenDBRequest} request IDBOpenDBRequest对象
     * @param  {function} success         成功回调
     * @param  {function} error           异常回调
     * @param  {function} upgrade         升级回调
     * @param  {function} block           阻塞回调
     */
    var bindIDBOpenReq = function (request, success, error, upgrade, block) {
        if (request) {
            if (success) request.onsuccess = success;
            if (error) request.onerror = error;
            if (upgrade) request.onupgradeneeded = upgrade;
            if (block) request.onblocked = block;
        } else {
            throw new Error('createIDBOpenReq function failed!');
        }
    };

    /**
     * createObjectStore 获取对象存储空间
     * @param  {IDBDatabase} db      数据库
     * @param  {String}      name    名称
     * @param  {Map}         options 配置项
     * @return {ObjectStore}         存储空间
     */
    var createObjectStore = function (db, name, options) {
        return db.createObjectStore(name, options);
    };

    /**
     * isContainsObjectStore 是否包含存储空间的名称
     * @param  {IDBDatabase} db      数据库
     * @param  {String}      name    名称
     * @return {Boolean}     true-包含/false-不包含
     */
    var isContainsObjectStore = function (db, name) {
        return db.objectStoreNames.contains(name);
    };

    /**
     * objectStoreCount 存储空间的数量
     * @param  {IDBDatabase} db 数据库
     * @return {Number}      数量
     */
    var objectStoreCount = function (db) {
        return db.objectStoreNames.length;
    };

    /**
     * getTransaction 创建数据库事务
     * @param  {IDBDatabase} db
     * @param  {Array}       objectstores 涉及到的对象仓库
     * @param  {String}      type         readonly-只读/readwrite-读写
     * @return {IDBTransaction}
     */
    var getTransaction = function (db, objectstores, type) {
        return db.transaction(objectstores, type);
    };

    /**
     * bindTransaction 绑定事务的回调
     * @param  {IDBTransaction} trans
     * @param  {Function}       complete 完成回调
     * @param  {Function}       error    错误回调
     * @param  {Function}       abort    中止回调
     */
    var bindTransaction = function (trans, complete, error, abort) {
        if (trans) {
            if (complete) trans.oncomplete = complete;
            if (error) trans.onerror = error;
            if (abort) trans.onabort = abort;
        } else {
            throw new Error('getTransaction function failed!');
        }
    };

    /**
     * getStoreViaTrans 通过事务获取ObjectStore对象
     * @param  {IDBTransaction} trans 事务
     * @param  {String}         name  名称
     * @return {IDBObjectStore }
     */
    var getStoreViaTrans = function (trans, name) {
        return trans.objectStore(name);
    };

    // CRUD操作
    var add = function (store, data, success, error) {
        var req = store.add(data);
            if (success) req.onsuccess = success;
            if (error) req.onerror = error;
    };
    var del = function (store, key) {
        store.delete(key);
    };
    var update = function (store, data, success, error) {
        var req = store.put(data);
            if (success) req.onsuccess = success;
            if (error) req.onerror = error;
    };
    var fetch = function (store, key, success, error) {
        var req = store.get(key);
            if (success) req.onsuccess = success;
            if (error) req.onerror = error;
    };
    // 遍历
    var each = function (store, success) {
        var req = store.openCursor();
            if (success) req.onsuccess = success;
    };


    // exposed API
    IDB.isSupported                     = isSupported;
    IDB.domReady                        = domReady;
    IDB.createIDBOpenReq                = createIDBOpenReq;
    IDB.bindIDBOpenReq                  = bindIDBOpenReq;
    IDB.createObjectStore               = createObjectStore;
    IDB.isContainsObjectStore           = isContainsObjectStore;
    IDB.objectStoreCount                = objectStoreCount;
    IDB.getTransaction                  = getTransaction;
    IDB.bindTransaction                 = bindTransaction;
    IDB.getStoreViaTrans                = getStoreViaTrans;

    IDB.add                             = add;
    IDB.del                             = del;
    IDB.update                          = update;
    IDB.fetch                           = fetch;
    IDB.each                            = each;

    win.IDB = IDB;

    return IDB;

})(window);
