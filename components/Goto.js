define(['jquery'], function ($) {

    var Goto = {
        util: {
            // 获取当前浏览器x,y轴的坐标
            getXYScroll: function () {
                var xs = [], ys = [];
                // 检测源码
                // x = window.pageXOffset || (((t = document.documentElement) || (t = document.body.parentNode)) && typeof t.scrollLeft === 'number' ? t : document.body).scrollLeft || null;
                // y = window.pageYOffset || (((t = document.documentElement) || (t = document.body.parentNode)) && typeof t.scrollTop === 'number' ? t : document.body).scrollTop || null;
                $.each(Goto.scrollTarget, function (idx, ele) {
                    var t;
                        t = $(ele).scrollLeft() === void 0 ? 0 : $(ele).scrollLeft();
                        xs.push(t);
                        t = $(ele).scrollTop() === void 0 ? 0 : $(ele).scrollTop();
                        ys.push(t);
                });

                return {
                    x: xs[0] === xs[1] ? xs[0] : xs[0] > xs[1] ? xs[0] : xs[1],
                    y: ys[0] === ys[1] ? ys[0] : ys[0] > ys[1] ? ys[0] : ys[1]
                };

            },
            // 获取DOM元素的可视区布局
            getViewPosition: function (id) {
                if ( id === null || id === void 0 ) { return null; }
                var dom = document.getElementById(id);
                var DOMRect = dom.getBoundingClientRect();
                var rect = {};
                    rect.left = DOMRect.left || 0;
                    rect.top = DOMRect.top || 0;
                    rect.right = DOMRect.right || 0;
                    rect.bottom = DOMRect.bottom || 0;
                    rect.width = DOMRect.width || DOMRect.right - DOMRect.left;
                    rect.height = DOMRect.height || DOMRect.bottom - DOMRect.top;
                return rect;
            }
        },
        ctrl: {
            init: function (options) {
                Goto.scrollTarget = $('html, body');

                Goto.timing = options.timing || 1000;
                Goto.offsetTop = options.offsetTop || 0;
                Goto.offsetLeft = options.offsetLeft || 0;
            },
            goto: function (id, fn) {
                Goto.containerId = id || null;
                var distant, target, y = Goto.util.getXYScroll().y;
                if (id) {
                    distant = Goto.util.getViewPosition(id).top - Goto.offsetTop;// 返回窗口fixed位置
                    target = y + distant;
                } else {
                    distant = y - Goto.offsetTop;// 返回顶部
                    target = 0;
                }
                if (fn) {
                    var dtd = $.Deferred();
                        dtd.done(fn);
                        Goto.scrollTarget.animate({scrollTop: target}, Goto.timing, function () { dtd.resolve(); });
                } else {
                    Goto.scrollTarget.animate({scrollTop: target}, Goto.timing);
                }
            }
        }
    };

    return Goto;
});