;(function () {
        /**
         * 对日期进行格式化，
         * @param date 要格式化的日期/毫秒数
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
         * @author kohbehind2@gmail.com
         */
        function dateFormat(date, format) {
            // 毫秒数
            if (typeof date === 'number') {
                date = new Date(date);
            }

            if(format === undefined){
                format = date;
                date = new Date();
            }
            var map = {
                "M": date.getMonth() + 1, //月份
                "d": date.getDate(), //
                "H": date.getHours(), //小时
                "m": date.getMinutes(), //分
                "s": date.getSeconds(), //秒
                "q": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            format = format.replace(/([yMdHmsqS])+/g, function(all, t){
                var v = map[t];
                if(v !== void 0){
                    if(all.length > 1){
                        v = '0' + v;
                        v = v.substring(v.length-2);
                    }
                    return v;
                } else if (t === 'y'){
                    return (date.getFullYear() + '').substring(4 - all.length);
                }
                return all;//返回错误提示
            });
            return format;
        }

        dateFormat('yy-MM-dd HH:mm:ss');
        dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');

        /***************************************************************************************************************************/
        // 增强版
        /**
         * 对日期进行格式化，
         * @param date 要格式化的日期/毫秒数/字符串
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
            // 时间对象
            if (format === void 0) {
                format = date;
                date = new Date();
            }
            // 毫秒数
            if (typeof date === 'number') {
                date = new Date(date);
            }
            // 类日期的字符串
            if (typeof date === 'string') {
                var result = /(\d{2,4})\D?(\d{2})\D?(\d{2})\D?(\d{2})\D?(\d{2})\D?(\d{2})\D?(\d{0,3})/g.exec(date);// 字符串类日期格式需要补全
                // 不是日期格式
            }

            var map = {
                position: {
                    "yyyy": 1,
                    "yy": 1,
                    "MM": 2,
                    "dd": 3,
                    "HH": 4,
                    "mm": 5,
                    "ss": 6,
                    "S": 7
                },
                format: {
                    "M": typeof date === 'object' ? date.getMonth() + 1 : '', //月份
                    "d": typeof date === 'object' ? date.getDate() : '', //天
                    "H": typeof date === 'object' ? date.getHours() : '', //小时
                    "m": typeof date === 'object' ? date.getMinutes() : '', //分
                    "s": typeof date === 'object' ? date.getSeconds() : '', //秒
                    "q": Math.floor((typeof date === 'object' ? date.getMonth() : '' + 3) / 3), //季度
                    "S": typeof date === 'object' ? date.getMilliseconds() : '' //毫秒
                }
            };

            // 日期格式转化
            var DateFormat = function (combo, cell) {
                var v = map['format'][cell];
                if (v !== void 0) {
                    if (combo.length > 1) {
                        v = '0' + v;
                        v = v.substring(v.length-2);
                    }
                    return v;
                } else if (cell === 'y') {
                    return (date.getFullYear() + '').substring(4 - combo.length);
                }
                return combo;//返回错误提示
            };
            // 类日期格式转化
            var likeDateFormat = function (combo, cell) {
                return result[map['position'][combo]];
            };


            format = format.replace(/([yMdHmsqS])+/g, function (combo, cell) {
                if (typeof date === 'string') {
                    return likeDateFormat(combo, cell);
                } else {
                    return DateFormat(combo, cell);
                }
            });

            return format;
        }
})();