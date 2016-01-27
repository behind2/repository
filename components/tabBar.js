/**
 * NBA TabBar.js
 *
 * @author <a href="mailto:behindli@tencent.com">behindli</a>
 * Copyright (C) 1998-2015 Tencent. All Rights Reserved
 *
 */
define(function (require, exports, module) {

    var
        $           = require('jquery'),
        Tpl         = require('./lib/micro-templating'),
        Focus       = require('focus'),
        viewLength  = 5,// 赛程表可视区
        done        = true,// 连续点击左右按钮
        tabC, tabTags, tabSize, bBtnC, nBtnC, initIdx, tmpIdx;

    // 默认配置项
    var conf = {
        offsetDay: 2,

        columnId: 100000,
        from: 'videoWeb',
        source: {
            calendar: 'http://sportswebapi.qq.com/kbs/calendar',//
            cast: 'http://sportswebapi.qq.com/kbs/list',
            more: 'http://sportswebapi.qq.com/kbs/matchVideo',
            fill: 'http://sportswebapi.qq.com/sportWeb/nbaTeamInfo'
        },
        action: {
            scan: 'http://sportswebapi.qq.com/kbs/attendMids',// 查看已经关注的比赛
            submit: 'http://sportswebapi.qq.com/kbs/attend'//mid-比赛id, type-attend关注/cancel取消
        }
    }, _conf_;

    var util = {
        /**
         * 对日期进行格式化，
         * @param date 要格式化的日期
         * @param format 进行格式化的模式字符串
         *     支持的模式字母有：
         *     y:年,
         *     M:年中的月份(1-12),
         *     d:月份中的天(1-31),
         *     H:小时(0-23),
         *     m:分(0-59),
         *     s:秒(0-59),
         *     S:毫秒(0-999),
         *     q:季度(1-4)
         * @return String
         */
        dateFormat: function (date, format) {
            if (format === void 0) {
                format = date;
                date = new Date();
            }
            var map = {
                "M": date.getMonth() + 1, //月份
                "d": date.getDate(), //天
                "H": date.getHours(), //小时
                "m": date.getMinutes(), //分
                "s": date.getSeconds(), //秒
                "q": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            format = format.replace(/([yMdHmsqS])+/g, function (all, t) {
                var v = map[t];
                if (v !== void 0) {
                    if (all.length > 1) {
                        v = '0' + v;
                        v = v.substring(v.length-2);
                    }
                    return v;
                } else if (t === 'y') {
                    return (date.getFullYear() + '').substring(4 - all.length);
                }
                return all;//返回错误提示
            });
            return format;
        },
        /**
         * dayToNumber 日期转数字
         * @param  {Date}   today 类日期格式
         * @return {Number}       转成数字
         */
        dayToNumber: function (today) {
            return parseInt(today.replace(/[\|\:\-\/\\\D]*/g, ''));
        },
        /**
         * abbrDate 日期简写
         * @param  {Date}   date      类日期
         * @param  {String} separator 分隔符
         * @return {Date}             MM+separator+dd
         */
        abbrDate: function (date, separator) {
            separator = separator || '/';
            return (date + '').replace(/(\d{4})\-(\d{2})\-(\d{2})/g, '$2' + separator + '$3');
        },
        /**
         * emitFunc 包装一个函数并触发
         * @param  {Function}          fn      函数
         * @param  {Number}            wait    等待触发时长
         * @param  {Object}            ontext  上下文
         * @param  {Array/ArrayLike}   args    参数
         * @return {Number}            定时器Id
         */
        emitFunc: function (fn, wait, context, args) {
            wait = wait || 0;
            context = context || window;
            args = args || [];
            return setTimeout(function () {
                fn.apply(context, args);
            }, wait);
        },
        /**
         * addCallback 添加回调
         * @param {String}   name     函数名
         * @param {Function} callback 回调函数
         * @param {Object}   context  上下文
         */
        addCallback: function (name, callback, context) {
            context = context || window;
            window[name] = function () {
                return callback.apply(context, arguments);
            };
        },
        /**
         * delCallback 删除回调
         * @param  {String} name 回调名称
         */
        delCallback: function (name) {
            window[name] = null;
        },
        // 格式化时间
        formatDuration: function (seconds) {
            var integer = function (count, unit) {
                var _int = Math.floor(count / unit);
                seconds -= _int * unit;
                return _int;
            };
            var format = function (num) {
                return num > 10 ? num : '0' + num;
            };
            var HH = format(integer(seconds, 3600));
            var mm = format(integer(seconds, 60));
            var ss = format(seconds);

            return (HH === '00' ? '' : HH + ':') + mm + ':' + ss;
        },
        // cookie的相关操作
        cookie: {
            getItem: function (sKey) {
                return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
            }
        }
    };

    /******************************** business logic begin ********************************/
    var
        _today, focus,
        /**
         * @type {Array}
         * [{
         *     date: "2015-10-13",
         *     number: "6",
         *     weekday: "星期二",
         *     index: 0,
         *     alias: "10/13"
         * }]
         */
        rangeDays = [], // 日期数据
        castData  = [],// 赛程数据
        initDtd   = $.Deferred();// 等待DOM加载完成&&拼装模板

    var
        castC                               = $('.area-schedule-lite'),// 赛程通栏

        calendarC                           = castC.find('.calendar'),// 日期容器
        dateC                               = calendarC.find('.date'),// 年月容器
        countC                              = calendarC.find('.count'),// 场次容器

        matchC                              = castC.find('.match-list');// 赛程容器
        matchListC                          = matchC.find('>ol');// 赛程表容器

        vListC                              = castC.find('~');// 相关视频

    var Template = {
        mLiUnit: '<% for ( var i = 0, iLen = data.length; i < iLen; i ++ ) { %> <% var record = data[i]; %> <% if ( record.matchPeriod === "直播中" ) { %> <% var color = "red"; %> <% } else { %> <% var color = "blue"; %> <% } %> <li class="type-video hover-<%= color %>" data-mid="<%= record.mid %>" data-date="<%= record.startDate %>" data-tid="<%= record.leftId %>,<%= record.rightId %>"> <div class="inner"> <div class="default"> <div class="banner"> <% if ( record.matchPeriod === "直播中" ) { %> <span class="right color-<%= color %>"><%= record.quarter %></span> <% if ( record.isPay === "1" ) { %> <span class="right vip">会员</span> <% } %> <% if ( record.liveType === "1" ) { %> <span class="color-<%= color %>">文字直播</span> <% } else if ( record.liveType === "3" ) { %> <span class="color-<%= color %> live-icon-video">视频直播</span> <% } else { %> <span class="color-<%= color %>">直播中</span> <% } %> <% } else if ( record.matchPeriod === "已结束" ) { %> <span class="right color-<%= color %>"><%= record.startDate %></span> <span class="color-<%= color %>"><%= record.matchPeriod %></span> <% } else if ( record.matchPeriod === "未开始" ) { %> <% if ( record.liveType === "1" ) { %> <span class="right color-<%= color %>">文字直播</span> <% } else if ( record.liveType === "3" ) { %> <span class="right color-<%= color %>">视频直播</span> <% } %> <% if ( record.isPay === "1" ) { %> <span class="right vip">会员</span> <% } %> <span class="color-<%= color %>"><%= record.matchPeriod %></span> <% } %> </div> <div class="score"> <div class="team"> <span class="right <%= record.leftGoal / 1 > record.rightGoal / 1 ? "color-red" : "" %>"><%= record.leftGoal == 0 ? record.startDate : record.leftGoal %></span> <span><%= record.leftName %></span> </div> <div class="team"> <span class="right <%= record.rightGoal / 1 > record.leftGoal / 1 ? "color-red" : "" %>"><%= record.rightGoal == 0 ? record.startTime : record.rightGoal %></span> <span><%= record.rightName %></span> </div> </div> </div> <div class="flip"> <% if ( record.matchPeriod === "未开始" ) { %> <a href="javascript: ;" data-mid="<%= record.mid %>" class="attention" target="_self" bosszone="<%= pageType %>_match_yy">预约</a> <% if ( record.latestNews && record.latestNews.articleType === "7" ) { %>| <a href="<%= record.latestNews.url %>" target="_blank" bosszone="<%= pageType %>_match_qz">前瞻</a><% } %> <% } else if ( record.matchPeriod === "直播中" ) { %> <a href="http://sports.qq.com/kbsweb/game.htm?mid=100000:<%= record.mid %>" target="_blank" bosszone="<%= pageType %>_match_live">直播</a> <% if ( record.coverPlayback ) { %>| <a href="<%= record.coverPlayback.playUrl %>" target="_blank" bosszone="<%= pageType %>_match_hf">回放</a><% } %> <% if ( record.coverCollection ) { %>| <a href="<%= record.coverCollection.playUrl %>" target="_blank" bosszone="<%= pageType %>_match_jj">集锦</a><% } %>| <a href="http://sports.qq.com/nbascore/?mid=<%= record.mid %>" target="_blank" bosszone="<%= pageType %>_match_sj">数据</a> <% } else if ( record.matchPeriod === "已结束" ) { %> <% if ( record.coverPlayback ) { %><a href="<%= record.coverPlayback.playUrl %>" target="_blank" bosszone="<%= pageType %>_match_hf">回放</a> |<% } %> <% if ( record.coverCollection ) { %><a href="<%= record.coverCollection.playUrl %>" target="_blank" bosszone="<%= pageType %>_match_jj">集锦</a><% } %>| <a href="http://sports.qq.com/nbascore/?mid=<%= record.mid %>" target="_blank" bosszone="<%= pageType %>_match_sj">数据</a> <% if ( record.latestNews && record.latestNews.articleType === "1" ) { %>| <a href="<%= record.latestNews.url %>" target="_blank" bosszone="<%= pageType %>_match_zb">战报</a><% } %> <% } %> </div> </div> </li> <% } %>',
        vLiUnit: '<% for ( var i = 0; i < data.length; i ++ ) { %> <li class="list-item"> <a href="<%= data[i].url %>"> <img src="<%= data[i].poster %>" alt="<%= data[i].title %>"> <span class="mask"> <em class="time"><%= data[i].duration %></em> <% if ( data[i].view ) { %> <em class="play"><div class="icon-video"><s></s></div><%= data[i].view %></em> <% } %> </span> </a> <p><a href="<%= data[i].url %>"><%= data[i].title %></a></p> </li> <% } %>'
    };



    // 设置当日比赛数量
    var setMatchNum = function (num) {
        countC.html('共' + num + '场比赛');
    };
    // 获取当日比赛数量
    var getMatchNum = function (day) {
        var num = 0;
        var field = /\//g.test(day) ? 'alias' : 'date';
        for ( var i = 0, iLen = rangeDays.length; i < iLen; i ++ ) {
            if (rangeDays[i][field] === day) {
                num = rangeDays[i].number ? rangeDays[i].number : 0;
                break;
            }
        }
        return num;
    };
    // 设置日期
    var setDay = function (day, fn) {
        var fullDate, abbrDate;

        if (/\-/g.test(day)) {
            fullDate = day;
            abbrDate = util.abbrDate(day);
        } else if (/\//g.test(day)) {
            abbrDate = day;
            fullDate = '';
        }

        if (fn) {
            util.emitFunc(fn, 0, window, [fullDate]);
        }

        // 设置日期
        dateC.html(abbrDate);
        // 联动修改比赛场次
        if (rangeDays.length > 0) {
            setMatchNum(getMatchNum(day));
        }
    };
    // 增加日期别名
    var addRangeDaysAlias = function () {
        for ( var i = 0, iLen = rangeDays.length; i < iLen; i ++ ) {
            var item = rangeDays[i];
            if ( item.date ) {
                var dates = item.date.split('-');
                item.alias = dates[1] + '/' + dates[2];
            }
        }
    };

    var getRangeDaysDate = function () {

    };
    // 获得日期数据
    var getCalendarData = function (data) {
        /**
         * [getRangeDays description]
         * @param  {Array} data 数据源
         * @return {Array}      处理后的连续日期
         */
        var getRangeDays = function (data) {
            var _arr = [];
            /**
             * getRangeDaysArr 获取日期范围
             * @param  {Number}  idx  索引值
             * @param  {Boolean} flag true-有比赛/false-无比赛
             * @return {Array}        筛选后的数组
             */
            var getRangeDaysArr = function (idx, flag) {
                var arr = [];

                for ( var i = idx - conf.offsetDay, iLen = flag ? idx + conf.offsetDay : idx + conf.offsetDay - 1 ; i <= iLen; i ++ ) {

                    if (data[i]) {
                        arr.push(data[i]);
                    }

                    if (!flag) {
                        if (i === idx - 1) {
                            arr.push({date: _today, number: 0});
                        }
                    }

                }
                return arr;
            };

            for ( var i = 0, iLen = data.length; i < iLen; i ++ ) {
                if (data[i].date === _today) {
                    _arr = getRangeDaysArr(i, true);
                    break;
                } else if (util.dayToNumber(data[i].date) > util.dayToNumber(_today)) {
                    _arr = getRangeDaysArr(i, false);
                    break;
                } else if (i === iLen - 1) {
                    i = iLen;
                    _arr = getRangeDaysArr(i, false);
                }
            }
            return _arr;
        };

        if (data.code === 0) {
            data = data.data;

            _today = data.today;// 取服务器时间
            data = data.data;

            rangeDays = getRangeDays(data);
                        addRangeDaysAlias();

            setDay(_today, requestCast);
        } else {
            throw new Error('calendar interface exception.');
        }
    };
    // 请求日历
    var reqCalendar = function () {
        util.addCallback('getCalendarData', getCalendarData);
        $.ajax({
            url: conf.source.calendar,
            type: 'get',
            dataType: 'jsonp',
            cache: true,
            data: {
                columnId: conf.columnId,
                ref: conf.from
            },
            jsonp: 'callback',
            jsonpCallback: 'getCalendarData'
        })
        .always(function (data) {
            // getCalendarData(data);
            // util.delCallback('getCalendarData');
        });
    };




    // 获取赛程数据
    var getCastData = function (data) {

        var processCastData = function (data) {
            var _arr = [], values;
            var fields = ['mid', 'leftId', 'leftName', 'leftGoal', 'rightId', 'rightName', 'rightGoal', 'startTime', 'quarter', 'matchPeriod', 'latestNews', 'statsURL', 'liveType', 'VURL', 'isPay', 'coverCollection', 'coverPlayback'];
            //matchPeriod 0-未开始, 1-进行中, 2-已结束
            //liveType 0什么也没有，1图文直播，2音频直播，3视频直播，4视频集锦
            //coverCollection-集锦        coverPlayback-回放
            for ( var k in data ) {
                if ( Object.hasOwnProperty.call(data, k) ) {
                    values = data[k];

                    for ( var j = 0, jLen = values.length; j < jLen; j ++ ) {
                        var item = values[j], _obj = {};
                        for ( var z = 0, zLen = fields.length; z < zLen; z ++ ) {
                            if ( item[ fields[z] ] ) {
                                if (fields[z] === 'startTime') {
                                    var groups = item[fields[z]].match(/(\d{4})\-(\d{2})\-(\d{2})[\s ]+(\d{2})\:(\d{2})\:(\d{2})/);
                                        _obj.startDate = groups[2] + '-' + groups[3];// 开始日期
                                        _obj.startTime = groups[4] + ':' + groups[5];// 开始时间
                                } else if (fields[z] === 'matchPeriod') {
                                    _obj[fields[z]] = item[fields[z]] == '0' ? '未开始' : item[fields[z]] == '1' ? '直播中' : item[fields[z]] == '2' ? '已结束' : '';
                                } else if ( fields[z] === 'mid' ) {
                                    _obj[fields[z]] = item[fields[z]].replace(/100000:/g, '');
                                } else {
                                    _obj[fields[z]] = item[fields[z]];
                                }
                            }
                        }
                        _arr.push(_obj);
                    }

                }
            }

            return _arr;
        };
        // 将今日未开始的比赛前置
        var sortData = function () {
            addRangeDaysIdx();
            var index = 0, count = 0, data = [], coming = [], living = [], completed = [], last = [], cut = [];

            $.each(rangeDays, function (idx, item) {
                 if ( item.date === _today ) {
                    index = item.index;
                    count = item.number;
                    return false;
                 }
            });

            data = castData.splice(index, count);

            $.each(data, function (idx, item) {
                 if ( item.matchPeriod === '直播中' ) {
                    living.push(item);
                 } else if ( item.matchPeriod === '未开始' ) {
                    coming.push(item);
                 } else if ( item.matchPeriod === '已结束' ) {
                    completed.push(item);
                 }
            });
            // 直播中 + 未开始 + 已结束
            last = living.concat(coming, completed);

            // 再次从从原来的位置切割
            cut = castData.splice(index, castData.length);// castData.length - index
            // 再次拼接
            castData = castData.concat(last, cut);

        };

        if (data.code === 0) {
            data = data.data;
            castData = processCastData(data);
            // 在走一遍直播排序吧
            sortData();

        } else {
            throw new Error('server interface exception.');
        }
    };
    // 请求赛程
    var requestCast = function () {
        util.addCallback('getCastData', getCastData);
        /**
         * 动态接口扛不住, 专用
         */
        // $.ajax({
        //     url: conf.source.cast,
        //     type: 'get',
        //     dataType: 'jsonp',
        //     cache: true,
        //     data: {
        //         columnId: conf.columnId,
        //         startTime: util.dayToNumber( rangeDays[0].date ),
        //         endTime: util.dayToNumber( rangeDays[rangeDays.length - 1].date ),
        //         ref: conf.from
        //     },
        //     jsonp: 'callback',
        //     jsonpCallback: 'getCastData'
        // })
        $.ajax({
            url: 'http://mat1.gtimg.com/apps/hpage2/web_recent_5_day_match.json',
            type: 'get',
            dataType: 'jsonp',
            // cache: true,
            jsonp: 'callback',
            jsonpCallback: 'getCastData'
        })
        .done(function(data) {
            // getCastData(data);
        })
        .done(function () {

            // matchListC.html( Tpl('tplli', {data: castData, pageType: _conf_.pageType}) );
            matchListC.html( Tpl(Template.mLiUnit, {data: castData, pageType: _conf_.pageType}) );

            // 模板装载完成
            initDtd.resolve();
        })
        .done(function () {
            // 替换关注按钮
            checkSubscribe();
        })
        .done(function () {
            if ( _conf_.pageType === 'VSH' ) {
                var str = '';
                for ( var i = 0, iLen = castData.length; i < iLen; i ++ ) {
                    str += '<ul class="figures-list" style="display:none;"></ul>';
                }
                vListC.html(str);

                focus = new Focus({
                    type: 'tab',
                    tabId: 'match',
                    tabTag: 'li',
                    tabContentId: 'matchList',
                    tabContentTag: 'ul',
                    currentStyle: _conf_.currentStyle,
                    defShowTabIdx: getTodayMatchIdx(_today),
                    switchBefore: function (index, elem) {
                        return getVideoData( this.tabTags.eq(index).attr('data-mid'), elem, this.tabTags.eq(index).attr('data-tid') );
                    },
                    switchAfter: function (index, elem) {
                        getVideoData( this.tabTags.eq(index).attr('data-mid'), elem, this.tabTags.eq(index).attr('data-tid') );
                    }
                });
            }
        })
        .always(function () {
            // util.delCallback('getCastData');
        });
    };

    // 给日期rangeDays数据增加索引
    var addRangeDaysIdx = function () {
        for ( var i = 0, iLen = rangeDays.length; i < iLen; i ++ ) {
            var item = rangeDays[i];
            if ( typeof item.index !== 'undefined' ) return;
            if ( item.number !== 'undefined' ) {
                if ( i === 0 ) {
                    item.index = 0;
                } else {
                    item.index = rangeDays[i - 1].index / 1 + rangeDays[i - 1].number / 1;
                }
            }
        }
    };
    // 获取今日比赛索引值
    var getTodayMatchIdx = function (day) {
        for ( var i = 0, iLen = rangeDays.length; i < iLen; i ++ ) {
            var item = rangeDays[i];
            if ( item.date && item.date === day ) {
                return item.index;
            }
        }
    };




    // 是否登录
    var isLogin = function (key) {// skey
        return util.cookie.getItem(key) ? true : false;
    };
    // 检查用户的关注态
    var checkAttention = function (data) {
        if ( data.code === 0 ) {
            data = data.data;
            if ( tabC ) {// 报错是由于登录组件直接调用
                $.each(tabC.find('a.attention'), function(index, item) {
                     for ( var i = 0, iLen = data.length; i < iLen; i ++ ) {
                        if ( data[i].replace(/100000:/g, '') === $(item).attr('data-mid') ) {
                            $(item).text('取消预约');
                            var prefix = $(item).attr('bosszone').split('_')[0];
                            $(item).attr('bosszone', prefix + '_match_qxyy');
                            // 增加logo
                            $(item).parent().prev().append('<i class="reserved"></i>');
                        }
                     }
                });
            }
        } else {
            throw new Error("attention's scan interface exception.");
        }
    };
    // 检查校验那些比赛已经关注, 替换展示形式.
    var checkSubscribe = function () {

        if ( isLogin('skey') ) {// 登录的时候校验

            util.addCallback('checkAttention', checkAttention);

            $.ajax({
                url: conf.action.scan,
                type: 'get',
                dataType: 'jsonp',
                cache: true,
                data: {
                    ref: conf.from
                },
                jsonp: 'callback',
                jsonpCallback: 'checkAttention'
            })
            .done(function () {
                // util.delCallback('checkAttention');
            });
        }

    };
    // 订阅/退订 比赛
    var attendMids = function (id, elem, pageType) {

        if ( $(elem).text() === '预约' ) {
            // 订阅(成功)回调
            var subscribe = function (data) {
                if ( data.code === 0 ) {
                    $(elem).text('取消预约');
                    $(elem).attr('bosszone', pageType + '_match_qxyy');
                    // 增加预约标识
                    $(elem).parent().prev().append('<i class="reserved"></i>');
                } else {
                    throw new Error("attention's interface exception.");
                }
            };
            util.addCallback('subscribe', subscribe);

            $.ajax({
                url: conf.action.submit,
                type: 'get',
                dataType: 'jsonp',
                cache: true,
                data: {
                    type: 'attend',
                    mid: conf.columnId + ':' + id,
                    ref: conf.from
                },
                jsonp: 'callback',
                jsonpCallback: 'subscribe'
            })
            .done(function () {
                // util.delCallback('subscribe');
            });

        } else if ( $(elem).text() === '取消预约' ) {
            // 取消订阅
            var unsubscribe = function (data) {
                if ( data.code === 0 ) {
                    $(elem).text('预约');
                    $(elem).attr('bosszone', pageType + '_match_yy');
                    // 去掉预约标识
                    $(elem).parent().prev().find('i.reserved').remove();
                } else {
                    throw new Error("attention's interface exception.");
                }
            };
            util.addCallback('unsubscribe', unsubscribe);

            $.ajax({
                url: conf.action.submit,
                type: 'get',
                dataType: 'jsonp',
                cache: true,
                data: {
                    type: 'cancel',
                    mid: conf.columnId + ':' + id,
                    ref: conf.from
                },
                jsonp: 'callback',
                jsonpCallback: 'unsubscribe'
            })
            .done(function () {
                // util.delCallback('unsubscribe');
            });

        }

    };
    util.addCallback('checkSubscribe', checkSubscribe);// 暴露在全局为登录组件调用



    // 处理球队的相关视频
    var processTeamVideoData = function (data) {
        var _arr = [];
        for ( var i = 0, limit = 6; i < limit; i ++ ) {
            if ( data[i] ) {
                var _obj = {}, record = data[i];

                    _obj.poster = record.pic;
                    _obj.title = record.title;
                    // 时间处理
                    _obj.duration = util.formatDuration(record.duration);
                    // 浏览量处理
                    _obj.view = Math.round(parseInt(record.view) / 1000) / 10 < 1 ? record.view : (Math.round(parseInt(record.view) / 1000) / 10 + '').indexOf('.') === -1 ? Math.round(parseInt(record.view) / 1000) / 10 + '.0' + '万' : Math.round(parseInt(record.view) / 1000) / 10 + '万';
                    // 链接处理
                    _obj.url = record.playUrl;

                    _arr.push(_obj);
            }
        }
        return _arr;
    };
    // 请求球队的相关视频
    var reqTeamData = function (tid, idx) {
        var callbackName = 'processTeamVideoData' + idx;
        // jsonp回调
        util.addCallback(callbackName, function (data) {
            if ( data.code === 0 ) {
                data = data.data;
                dtd.resolve( processTeamVideoData(data.videos) );
            } else {
                throw new Error('Team video interface exception.');
            }
        });
        var dtd = $.Deferred();
        $.ajax({
            url: conf.source.fill,
            type: 'get',
            dataType: 'jsonp',
            cache: true,
            data: {
                teamId: tid,
                needVideo: 1,
                ref: conf.from
            },
            jsonp: 'callback',
            jsonpCallback: callbackName
        })
        // .done(function(data) {
        //     if ( data.code === 0 ) {
        //         data = data.data;
        //         dtd.resolve( processTeamVideoData(data.videos) );
        //     } else {
        //         throw new Error('Team video interface exception.');
        //     }
        // })
        .always(function () {
            // util.delCallback(callbackName);
        });
        return dtd;
    };
    // 如果视频数据不足6条则补齐
    var fillVideoData = function (data, tid, dtd) {
        // 返回去重后, 符合条数的视频
        var deWeightVideo = function (data, arr1, arr2) {
            var _arr = [], _count = 1;

            // 交错拼接数据
            for ( var i = 0, iLen = arr1.length; i < iLen; i ++ ) {
                data.push( arr1[i], arr2[i] );
            }

            // 排重
            for ( var j = 0, jLen = data.length; j < jLen; j ++ ) {
                if ( j === 0 ) {
                    _arr.push( data[j] );// 直接塞入
                } else {
                    // 先判断在塞入
                    for ( var z = 0, zLen = _arr.length; z < zLen; z ++ ) {

                        if ( _arr[z].url === data[j].url ) {
                            break;
                        }

                        if ( z === zLen - 1 ) {
                            _arr.push( data[j] );
                        }

                        if ( zLen === 6 ) return _arr;

                    }
                }

            }
        };

        if ( data.length < 6 ) {
            var dtds = [];
            var tids = tid.split(',');
                for ( var i = 0, iLen = tids.length; i < iLen; i ++ ) {
                    dtds.push( reqTeamData(tids[i], i) );
                }
            $.when.apply($, dtds).done(function (arr1, arr2) {
                // 此处这么处理不妥当, 没法去重, 现在重构下, 转换思路
                dtd.resolve( deWeightVideo(data, arr1, arr2) );
            });
        } else {
            dtd.resolve(data);
        }
    };
    // 处理加工视频数据
    var processVideoData = function (data) {
        var _arr = [], limit = 6;
        for ( var i = 0; i < limit; i ++ ) {
            var record = data[i], _obj = {};

            if (record) {

                _obj.poster = record.pic;
                _obj.title = record.title;
                // 时间处理
                var sectionDate = record.duration.split(':');
                var hh = parseInt(sectionDate[0]) > 0 ? _obj.duration = record.duration : _obj.duration = sectionDate[1] + ':' + sectionDate[2];
                // 浏览量处理
                _obj.view = Math.round(parseInt(record.view) / 1000) / 10 < 1 ? record.view : (Math.round(parseInt(record.view) / 1000) / 10 + '').indexOf('.') === -1 ? Math.round(parseInt(record.view) / 1000) / 10 + '.0' + '万' : Math.round(parseInt(record.view) / 1000) / 10 + '万';
                // 链接处理
                _obj.url = 'http://v.qq.com/cover/' + record.covers.substring(0, 1) + '/' + record.covers.split('+')[0] + '.html?vid=' + record.vid;

                _arr.push(_obj);
            }

        }
        return _arr;
    };
    // 获取相关视频
    var getVideoData = function (id, elem, tid) {

        if ( $(elem).attr('data-loaded') !== 'true' ) {
            var v_dtd = $.Deferred();
            util.addCallback('processVideoData', function (data) {
                if ( data.code === 0 ) {
                    data = data.data;
                    var dtd = $.Deferred();
                        fillVideoData( processVideoData(data.totalList), tid, dtd );// 不足6条视频补齐
                        dtd.done(function (data) {
                            $(elem).html( Tpl(Template.vLiUnit, {data: data}) );
                            $(elem).attr('data-loaded', 'true');
                            // 视频加载完成
                            v_dtd.resolve();
                        });

                } else {
                    throw new Error('Relevant video interface exception.');
                }
            });

            $.ajax({
                url: conf.source.more,
                type: 'get',
                dataType: 'jsonp',
                cache: true,
                data: {
                    mid: conf.columnId + ':' + id,
                    ref: conf.from
                },
                jsonp: 'callback',
                jsonpCallback: 'processVideoData'
            })
            // .done(function(data) {
            //     if ( data.code === 0 ) {
            //         data = data.data;
            //         var dtd = $.Deferred();
            //             fillVideoData( processVideoData(data.totalList), tid, dtd );// 不足6条视频补齐
            //             dtd.done(function (data) {
            //                 $(elem).html( Tpl(Template.vLiUnit, {data: data}) );
            //                 $(elem).attr('data-loaded', 'true');
            //             });

            //     } else {
            //         throw new Error('Relevant video interface exception.');
            //     }
            // })
            .always(function () {
                // util.delCallback('processVideoData');
            });
            return v_dtd;
        } else {
            var v_dtd = $.Deferred();
                setTimeout(function () {
                    v_dtd.resolve();
                }, 300);// 延迟300毫秒, 等待回调注册完, 在触发
            return v_dtd;
        }

    };


    /******************************** business logic end ********************************/



    /******************************** TabBar begin ********************************/

    // 页面结构
    var defOpts = {
        version: '1.4.0',
        tabId: 'match',
        tabTag: 'li',
        backBtnId: 'castLBtn',
        nextBtnId: 'castRBtn',
        currentStyle: 'current',
        btnDisabledStyle: 'disabled',
        defShowTabIdx: 1,
        switchBefore: $.noop,
        switchAfter: $.noop//加载相关数据吧
    };

    var TabBar = function (options) {
        var _this = this;
            _conf_ = $.extend(true, {}, defOpts, options);// 因为模板提前渲染了, 但是得不到聚合后的字段信息(页面类型), 故用此中转下

        // 请求日历
        reqCalendar();

        initDtd
        .done(function () {
            _this.init(options);
        })
        .done(function () {
            addRangeDaysIdx();

            // 默认 初始化展示用
            _this.ctrl.goIdx( getTodayMatchIdx(_today) );
        });
    };

    TabBar.prototype.init = function (options) {
        this.conf       = _conf_;

        tabC            = $('#' + this.conf.tabId);
        tabTags         = tabC.find('>' + this.conf.tabTag);
        tabSize         = tabTags ? tabTags.size() : 0;
        if ( tabSize <= 0 ) throw new Error('init failed!');

        initIdx         = this.conf.defShowTabIdx; this.conf.defShowTabIdx = 0;
        // 自动设置容器宽度
        tabC.css('width', tabTags.eq(tabSize - 1).outerWidth(true) * tabSize);

        bBtnC           = $('#' + this.conf.backBtnId);
        nBtnC           = $('#' + this.conf.nextBtnId);

        if ( this.conf.pageType === 'VSH' ) {// 如果页面类型是视频首页
            vListC.css('display', 'block');
        }

        this.bindDOM();
    };

    TabBar.prototype.bindDOM = function () {
        var _this = this;

        // 获取索引显示范围&&动态处理效果
        var getIdxs = function (num) {
            // 数量小于可视数量
            if ( tabSize <= viewLength ) {
                bBtnC.addClass(_this.conf.btnDisabledStyle);
                nBtnC.addClass(_this.conf.btnDisabledStyle);
                return num;
            }

            var max = tabSize - viewLength, min = 0;

            if ( num >= max ) {
                num = max;
                // nBtnC.hide();
                // bBtnC.show();
                nBtnC.addClass(_this.conf.btnDisabledStyle);
                bBtnC.removeClass(_this.conf.btnDisabledStyle);
            } else if ( num <= min ) {
                num = min;
                // bBtnC.hide();
                // nBtnC.show();
                bBtnC.addClass(_this.conf.btnDisabledStyle);
                nBtnC.removeClass(_this.conf.btnDisabledStyle);
            } else {
                // bBtnC.show();
                // nBtnC.show();
                bBtnC.removeClass(_this.conf.btnDisabledStyle);
                nBtnC.removeClass(_this.conf.btnDisabledStyle);
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
            getIdxs(idx);// 变化按钮的样式
        };
        // 前进
        var forward = function () {
            var idx = getIdxs(_this.conf.defShowTabIdx + viewLength);
                move( idx );
            return idx;
        };
        // 后退
        var backward = function () {
            var idx = getIdxs(_this.conf.defShowTabIdx - viewLength);
                move( idx );
            return idx;
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

        // 日期点击
        calendarC.on('click', function (e) {
            e = getEvent(e);
                preventEvent(e);

                var idx = getTodayMatchIdx(_today);
                    goIdx(idx);
                    if (focus) {
                        focus.ctrl.goIndex(idx);
                    }

        });
        // 向后按钮
        bBtnC.on('click', function (e) {
            if (done) {
                done = false;
                e = getEvent(e);
                    preventEvent(e);

                var idx = backward();

                // 变换日期与比赛场次
                // var _date = tabTags.eq(idx).attr('data-date').replace(/-/g, '/');
                //     setDay(_date);

                    if (focus) {
                        focus.ctrl.goIndex(idx);
                    }
            }
        });
        // 向前按钮
        nBtnC.on('click', function (e) {
            if (done) {
                done = false;
                e = getEvent(e);
                    preventEvent(e);

                var idx = forward();

                // 变换日期与比赛场次
                // var _date = tabTags.eq(idx).attr('data-date').replace(/-/g, '/');
                //     setDay(_date);

                    if (focus) {
                        focus.ctrl.goIndex(idx);
                    }
            }
        });
        // 页签
        tabC.on('click', '>' + _this.conf.tabTag, function (e) {
            e = getEvent(e);
                // preventEvent(e);

                // 切换前
                $.proxy(_this.conf.switchBefore, _this)(tmpIdx, tabTags.get(tmpIdx));

                tabToggle(this);

                // 切换后
                $.proxy(_this.conf.switchAfter, _this)(tmpIdx, tabTags.get(tmpIdx));
        });
        // 移入
        tabC.on('mouseenter', '>' + _this.conf.tabTag, function (e) {
            e = getEvent(e);
                // 变换日期与比赛场次
                // var _date = $(this).attr('data-date').replace(/-/g, '/');
                //     setDay(_date);
                ExposureBoss(null, _this.conf.pageType + '_focus_expo');
        });
        // 点击关注
        tabC.on('click', 'a.attention', function (e) {
            e = getEvent(e);

            if ( isLogin('skey') ) {// 已经登录
                attendMids( $(this).attr('data-mid'), this,  _this.conf.pageType);
            } else {// 没有登录
                window.login.openLogin();
            }
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
            },
            getIdxs: function () {
                getIdxs.apply(_this, arguments);
            }
        };

    };

    /******************************** TabBar end ********************************/

    return TabBar;
});
