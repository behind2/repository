/**
 * NBA tabBar.js
 *
 * @author <a href="mailto:behindli@tencent.com">behindli</a>
 * Copyright (C) 1998-2015 Tencent. All Rights Reserved
 *
 */
define(function (require, exports, module) {

    var
        $           = require('jquery'),
        viewLength  = 5,// 赛程表可视区
        done        = true,// 连续点击左右按钮
        tabC, tabTags, tabSize, pBtnC, nBtnC, initIdx, tmpIdx;

    // TODO 加上重构的结构
    var defOpts = {
        version: '0.0.1',
        tabId: '',
        tabTag: '',
        preBtnId: '',
        nextBtnId: '',
        currentStyle: 'current',
        defShowTabIdx: 0,
        switchBefore: $.noop,
        switchAfter: $.noop//加载相关数据吧
    };

    var util = {};

    var tabBar = function (options) {
        this.init(options);
    };

    tabBar.prototype.init = function (options) {
        this.conf       = $.extend(true, {}, defOpts, options);

        tabC            = $('#' + this.conf.tabId);
        tabTags         = tabC.find('>' + this.conf.tabTag);
        tabSize         = tabTags ? tabTags.size() : 0;
        if ( tabSize <= 0 ) throw new Error('init failed!');

        initIdx         = this.conf.defShowTabIdx; this.conf.defShowTabIdx = 0;
        // 自动设置容器宽度
        tabC.css('width', tabTags.eq(tabSize - 1).outerWidth(true) * tabSize);

        pBtnC           = $('#' + this.conf.preBtnId);
        nBtnC           = $('#' + this.conf.nextBtnId);

        if ( tabSize <= viewLength ) {
            pBtnC.hide();
            nBtnC.hide();
        }

        this.bindDOM();
    };

    tabBar.prototype.bindDOM = function () {
        var _this = this;

        // 获取索引显示范围&&动态处理效果
        var getIdxs = function (num) {
            var max = tabSize - viewLength, min = 0;

            if ( num >= max ) {
                num = max;
                pBtnC.hide();
            } else if ( num <= min ) {
                num = min;
                nBtnC.hide();
            } else {
                pBtnC.show();
                nBtnC.show();
            }

            return num;
        };
        // 切换样式  接受DOM元素与类数字 返回索引值
        var toggleClass = function (param1) {
            var _index;
            if ( $.type(param1) === 'object' && param1.nodeType === 1 ) {// DOM元素
                $.each(tabTags, function (idx, ele) {
                     $(ele).removeClass(_this.conf.currentStyle);
                     if ( ele === param1 ) {
                        _index = idx;
                     }
                });
                $(param1).addClass(_this.conf.currentStyle);
                return _index;
            } else if ( $.type(param1) === 'string' && !isNaN( parseInt(param1) ) ) {// 字符串数字
                $.each(tabTags, function (idx, ele) {
                     $(ele).removeClass(_this.conf.currentStyle);
                });
                tabTags.eq( param1 / 1 ).addClass(_this.conf.currentStyle);
                return param1;
            } else if ( $.type(param1) === 'number' ) {// 数字
                $.each(tabTags, function (idx, ele) {
                     $(ele).removeClass(_this.conf.currentStyle);
                });
                tabTags.eq(param1).addClass(_this.conf.currentStyle);
                return param1;
            }
        };
        // 移动函数
        var move = function (idx) {

            if ( tabSize <= viewLength ) {
                toggleClass(idx);
                return;
            }

            // 切换前
            $.proxy(_this.conf.switchBefore, _this)(_this.conf.defShowTabIdx, tabTags.get(_this.conf.defShowTabIdx));

            var unit = tabTags.eq(idx).outerWidth(true);
            var distance = unit * idx * -1;
            if ( idx / 1 === _this.conf.defShowTabIdx ) { done = true; return; }
            tabC.animate({ marginLeft: distance }, 600, 'swing', function () {
                _this.conf.defShowTabIdx = idx;
                tmpIdx = idx;
                done = true;

                toggleClass(idx);

                // 切换后   实际上应该放在这里
                $.proxy(_this.conf.switchAfter, _this)(_this.conf.defShowTabIdx, tabTags.get(_this.conf.defShowTabIdx));
            });
        };
        // 页签切换
        var tabToggle = function (elem) {
            tmpIdx = toggleClass(elem);
        };
        // 移动到制定索引的tab上
        var goIdx = function (idx) {
            move(idx);
        };
        // 前进
        var forward = function () {
            goIdx( getIdxs(_this.conf.defShowTabIdx + viewLength) );
        };
        // 后退
        var backward = function () {
            goIdx( getIdxs(_this.conf.defShowTabIdx - viewLength) );
        };


        // 获取事件对象
        var getEvent = function (e) {
            return e || window.event;
        };
        // 阻止默认事件
        var preventEvent = function (e) {
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
                return false;
            }
        };
        // 取消冒泡
        var cancelBubble = function (e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
                return false;
            }
        };

        // 向前按钮
        pBtnC.on('click', function (e) {
            if (done) {
                done = false;
                e = getEvent(e);
                    preventEvent(e);

                    forward();
            }
        });
        // 向后按钮
        nBtnC.on('click', function (e) {
            if (done) {
                done = false;
                e = getEvent(e);
                    preventEvent(e);

                    backward();
            }
        });
        // 页签
        tabC.on('click', '>' + _this.conf.tabTag, function (e) {
            e = getEvent(e);
                preventEvent(e);

                // 切换前
                $.proxy(_this.conf.switchBefore, _this)(tmpIdx, tabTags.get(tmpIdx));

                tabToggle(this);

                // 切换后
                $.proxy(_this.conf.switchAfter, _this)(tmpIdx, tabTags.get(tmpIdx));
        });

        // expose API
        this.ctrl = {
            forward: function () {
                forward.apply(_this, arguments);
            },
            backward: function () {
                backward.apply(_this, arguments);
            },
            goIdx: function () {
                goIdx.apply(_this, arguments);
            }
        };
        // 默认展示
        goIdx(initIdx);
    };

    return tabBar;
});
