/**
 * NBA Focus.js
 *
 * Released 1.0.0
 *
 * @author <a href="mailto:behindli@tencent.com">Behind Li</a>
 * @description NBA Focus Toggle Focus.js
 * Copyright (C) 1998-2015 Tencent. All Rights Reserved
 *
 */
define(['jquery'], function ($) {

    var Focus = function (options) {
        this.initParams(options);
        this.bindDOM();
    };

    /**
     * initParams 初始化参数与校验
     */
    Focus.prototype.initParams = function (options) {
       var _this = this;
        /*---------------------------------------普通变量初始化----------------------------------------*/
        /**
         * type 焦点图类型
         * @type {String}
         */
        this.type = options.type || 'tab';// tab 页卡切换  slide 页卡滚动
        /**
         * version 版本号
         * @type {String}
         */
        this.version = '1.0.2';
        /**
         * tabId 页卡容器ID
         * @type {String}
         */
        this.tabId = options.tabId || null;
        /**
         * tabTag 页卡元素标签
         * @type {String}
         */
        this.tabTag = options.tabTag || null;
        /**
         * tabContentId 页卡内容容器ID
         * @type {String}
         */
        this.tabContentId = options.tabContentId || null;
        /**
         * tabContentTag 页卡内容元素标签
         * @type {String}
         */
        this.tabContentTag = options.tabContentTag || null;
        /**
         * currentStyle 默认选中样式
         * @type {String}
         */
        this.currentStyle = options.currentStyle || 'current';
        /**
         * eventType 默认事件类型
         * @type {String}
         */
        this.eventType = options.eventType || 'mouseenter';
        /**
         * defShowTabIdx 默认展示第几个Tab, 注意这里是索引值
         * @type {Number}
         */
        this.defShowTabIdx = options.defShowTabIdx || 0;
        /**
         * isLoop 是否循环
         * @type {Boolean}
         */
        this.isLoop = options.isLoop || false;
        /**
         * isAuto 是否自动切换
         * @type {Boolean}
         */
        this.isAuto = options.isAuto || false;
        /**
         * direction 轮播方向
         * @type {String}
         */
        this.direction = options.direction || 'next';//pre 向前  next 向后
        /**
         * timing 时长设置(单位/毫秒 ms)
         * @type {Number}
         */
        this.timing = options.timing || null;
        /**
         * timeId 定时器Id
         * @type {Number}
         */
        // this.timeId = null;// 暂时无用
        /**
         * preBtnId 向前按钮容器ID
         * @type {String}
         */
        this.preBtnId = options.preBtnId || null;
        /**
         * nextBtnId 向后按钮容器ID
         * @type {String}
         */
        this.nextBtnId = options.nextBtnId || null;
        /**
         * switchBefore 切换前
         * @type {Function}
         */
        this.switchBefore = options.switchBefore || $.noop;
        /**
         * switchAfter 切换后
         * @type {Function}
         */
        this.switchAfter = options.switchAfter || $.noop;
        /**
         * isCheck 是否校验相关参数
         * @type {Boolean}
         */
        this.isCheck = options.isCheck || false;
        /**
         * step 滚动步长
         * @type {Number} units/px
         */
        this.step = options.step || null;

        // API分层
        this.view = {};//业务暂不需要
        this.model = {};//保护隐藏, 不暴露
        this.ctrl = {};

        /*---------------------------------------end---------------------------------------*/
        /**
         * checkTabsNum 校验页签与页卡数量是否一致
         * @param  {String} tabTag        页卡标签
         * @param  {String} tabContentTag 页卡容器标签
         * @return {Boolean}              True一致/False不一致
         */
        var checkTabsNum = function (tabTag, tabContentTag) {
            return _this.tabContainer.find(tabTag).size() === _this.tabContentContainer.find(tabContentTag).size() ? true : false;
        };
        /**
         * checkOptions 检验初始化参数
         */
        var checkOptions = function () {
            /**
             * tabContainer 页卡标签容器
             * @type {Object}
             */
            _this.tabContainer = $('#' + _this.tabId);
            if ( _this.isCheck && _this.tabContainer.size() === 0 ) {//页面页签容器不存在
                throw new Error('页签容器ID不存在, 请检查.');
            }

            /**
             * tabContentContainer 页卡内容容器
             * @type {Object}
             */
            _this.tabContentContainer = $('#' + _this.tabContentId);
            if ( _this.isCheck && _this.tabContentContainer.size() === 0 ) {//页卡内容容器不存在
                throw new Error('页签内容容器ID不存在, 请检查.');
            }

            if ( _this.isCheck && !checkTabsNum(_this.tabTag, _this.tabContentTag) ) {
                throw new Error('页签与内容数量不一致, 请校验.');
            }
            // 补充声明
            /**
             * tabTags 页签List
             * @type {Array}
             */
            _this.tabTags = _this.tabContainer.find('>' + _this.tabTag);
            /**
             * tabContentTags 页卡内容标签List
             * @type {Array}
             */
            _this.tabContentTags = _this.tabContentContainer.find('>' + _this.tabContentTag);
            /**
             * tabSize 页签/内容数量(页签有可能不存在或者隐藏)
             * @type {Number}
             */
            _this.tabSize = _this.tabContentTags.size();
        };
        // 调用
        checkOptions();

        /**
         * extraInit 额外初始化
         */
        var extraInit = function () {
            // 克隆
            var _first = _this.tabContentTags.eq(0).clone(true, true);
            var _last = _this.tabContentTags.eq(_this.tabSize - 1).clone(true, true);

            // 不循环了
            if (!_this.isLoop) {
                _first.hide();
            }

            // 插入
            _last.prependTo(_this.tabContentContainer);
            _this.tabContentContainer.append(_first);
            _this.tabContentContainer.css({width: (_this.tabSize + 2) * parseInt(_this.tabContentTags.eq(0).outerWidth(true))});
        };
        // 当为滚动类型的焦点图时需要额外初始化
        if ( this.type === 'slide' ) {
            extraInit();
        }

    };

    /**
     * bindDOM 事件绑定
     */
    Focus.prototype.bindDOM = function () {
        var _this = this;
        /*************************************************************私有函数声明**************************************************************/
        /**
         * toggleClass 切换样式
         * @param  {DOM Element} param1 被选中的DOM元素 / {Number/String} param1 数字或者字符串数字(数字代表索引)
         * @return {Number}             返回被选中的Tab索引值
         */
        var toggleClass = function (param1) {
            var _index;

            if ( $.type(param1) === 'object' ) {//如果传进来的是DOM元素
                // 去掉选中样式记载被选元素索引
                $.each(_this.tabTags, function (idx, ele) {
                    $(ele).removeClass(_this.currentStyle);
                    if ( ele === param1 ) {
                        _index = idx;
                    }
                });
                $(param1).addClass(_this.currentStyle);
                return _index;
            } else if ( $.type(param1) === 'string' && !isNaN(parseInt(param1)) ) {//传进来是字符串数字
                // 去掉选中样式
                $.each(_this.tabTags, function (idx, ele) {
                    $(ele).removeClass(_this.currentStyle);
                });
                $(_this.tabTags.get(param1 / 1)).addClass(_this.currentStyle);
                return param1;
            } else if ( $.type(param1) === 'number' ) {//传进来是数字
                // 去掉选中样式
                $.each(_this.tabTags, function (idx, ele) {
                    $(ele).removeClass(_this.currentStyle);
                });
                $(_this.tabTags.get(param1)).addClass(_this.currentStyle);
                return param1;
            }
        };
        /**
         * displayContentTab 展示页卡
         * @param  {Number}  index 展示的索引值
         * @param  {Boolean} flag  来源 true-事件触发 / false-goIndex底层接口(滑动的时候有)
         */
        var displayContentTab = function (index, flag) {
            flag = flag || false;
            if ( _this.type === 'tab' ) {
                // tab 页卡切换时的展示逻辑
                displayContentTab = function (index, flag) {
                    // 切换前
                    $.proxy(_this.switchBefore, _this.tabContentTags.get(_this.defShowTabIdx))(_this.defShowTabIdx);
                    if (_this.defShowTabIdx - index === 0) {
                        return;// 不做改变
                    }
                    $.each(_this.tabContentTags, function (idx, ele) {
                        if ( index === idx ) {
                            $(ele).css('display', 'block');
                        } else {
                            $(ele).css('display', 'none');
                        }
                    });
                    _this.defShowTabIdx = index;

                    // 切换后
                    $.proxy(_this.switchAfter, _this.tabContentTags.get(_this.defShowTabIdx))(_this.defShowTabIdx);
                };
            } else if ( _this.type === 'slide' ) {
                // 滑动页卡切换时的展示逻辑
                displayContentTab = function (index, flag) {
                    // 切换前
                    $.proxy(_this.switchBefore, _this.tabContentTags.get(_this.defShowTabIdx))(_this.defShowTabIdx);

                    var step = _this.step || _this.tabContentTags.eq(0).outerWidth(true);
                    var distance = -1 * (index + 1) * step;
                    var adjustPosition = function () {
                        _this.tabContentContainer.css({'marginLeft': distance});
                        _this.defShowTabIdx = index;
                    };
                    // 默认展示
                    if ( index - _this.defShowTabIdx === 0 ) {
                        _this.tabContentContainer.css('marginLeft', distance);// 初始化定位
                        return;// 不作展示渲染
                    } else if ( !flag && index - _this.defShowTabIdx ===  1 - _this.tabSize ) {// 由尾切换到头
                        _this.tabContentContainer.stop(true, true).animate({marginLeft: -1 * (_this.defShowTabIdx + 2) * step}, 300, function () { adjustPosition(index); });
                        return;
                    } else if ( !flag && index - _this.defShowTabIdx === _this.tabSize - 1 ) {// 由头切换到尾
                        _this.tabContentContainer.stop(true, true).animate({marginLeft: _this.defShowTabIdx * step}, 300, function () { adjustPosition(index); });
                        return;
                    }
                    // 动画渲染主函数
                    _this.tabContentContainer.stop(true, true).animate({marginLeft: distance}, 300);
                    _this.defShowTabIdx = index;

                    // 切换后
                    $.proxy(_this.switchAfter, _this.tabContentTags.get(_this.defShowTabIdx))(_this.defShowTabIdx);
                };
            }
            return displayContentTab(index, flag);
        };
        /**
         * goIndex 切换到制定的页卡
         * @param  {Number} index 索引值
         */
        var goIndex = function (index) {
            displayContentTab(index);
            toggleClass(index);
        };
        /**
         * looping 使得index在区间循环
         * @param  {Number} idx 索引值
         * @return {Number}     经过边界校验的索引值
         */
        var looping = (function () {
            var max = _this.tabSize - 1;
            if ( _this.isLoop ) {// 循环
                return function (idx) {
                    return idx > max ? 0 : idx < 0 ? max : idx;
                };
            } else {// 不循环
                return function (idx) {
                    return idx > max ? max : idx < 0 ? 0 : idx;
                };
            }
        })();
        /**
         * autoToggle 页卡自动切换
         */
        var autoToggle = function () {
            setTimeout(function () {
                if ( _this.direction === 'next' ) {
                    forward();
                    //重定义
                    autoToggle = function () {
                        setTimeout(function () {
                            forward();
                            autoToggle();
                        }, _this.timing);
                    };
                } else if ( _this.direction === 'pre' ) {
                    backward();
                    // 重定义
                    autoToggle = function () {
                        setTimeout(function () {
                            backward();
                            autoToggle();
                        }, _this.timing);
                    };
                }
                return autoToggle();
            }, _this.timing);
        };

        /*************************************************************回调事件句柄&&事件绑定**************************************************************/

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

        /**
         * tabToggle 切换事件回调
         * @param  {Object}  e      jq封装的事件
         * @param  {DOM}     ele    DOM元素
         */
        var tabToggle = function (e, ele) {
            var index;
                index = toggleClass(ele);
                displayContentTab(index, true);
        };
        /**
         * backward 回退事件回调
         */
        var backward = function () {
            goIndex(looping(_this.defShowTabIdx - 1));
        };
        /**
         * forward 前进事件回调
         */
        var forward = function () {
            goIndex(looping(_this.defShowTabIdx + 1));
        };

        // tab页签事件注册
        this.tabContainer.on(this.eventType, this.tabTag, function (e) {
            e = getEvent();
            preventEvent(e);
            tabToggle(e, this);
        });

        // 加绑定条件限制
        if ( this.preBtnId && this.nextBtnId ) {

            // 左侧按钮
            $('#' + this.preBtnId).on('click', function (e) {
                e = getEvent();
                preventEvent(e);
                backward();
            });

            // 右侧按钮
            $('#' + this.nextBtnId).on('click', function (e) {
                e = getEvent();
                preventEvent(e);
                forward();
            });

        }

        /*************************************************************暴露事件上层接口**************************************************************/
        // 对外暴露的接口
        // 后退
        this.ctrl.backward = function () {
            backward.apply(_this, arguments);
        };
        // 前进
        this.ctrl.forward = function () {
            forward.apply(_this, arguments);
        };
        // 定位
        this.ctrl.goIndex = function () {
            goIndex.apply(_this, arguments);
        };

        // 处理默认展示
        if ( $.type(_this.defShowTabIdx) === 'number' ) {
            goIndex(_this.defShowTabIdx);
        }
        // 判断是否需要自动轮播
        if ( _this.isAuto && _this.timing ) {
            autoToggle();
        }
    };

    /**
     * unbindDOM 解绑
     * @param  {String} type tab-解绑页签 | btn-解绑按钮 | 默认全部解绑
     */
    Focus.prototype.unbindDOM = function (type) {
        var _this = this;

        // 取消tab事件
        var delTab = function () {
            _this.tabContainer.off(_this.eventType);
        };
        // 取消btn事件
        var delBtn = function () {
            $('#' + _this.preBtnId).off('click');
            $('#' + _this.nextBtnId).off('click');
        };

        if (type === 'tab') {
            delTab();
        } else if (type === 'btn') {
            delBtn();
        } else {
            delTab();
            delBtn();
        }
    };

    return Focus;
});