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
})();