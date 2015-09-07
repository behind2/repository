// to depend on a bower installed component:
// define(['bower_components/componentName/file'])
//
//这里是主函数了, 完全可以实现模块之间的通信与交互了(虽然不是定义，将就看吧)
define(function (require, exports, module) {
    // debugger;
    var $ = require('jquery');
    $('body')
        .append('jQuery ' + $.fn.jquery + ' loaded!')
        .append('<br>')
        .append('Hello requirejs');

    var Mod1 = require('./mod1');
        console.log(Mod1.getName());

    var Mod2 = require('./mod2');
        console.log(Mod2.getName());

    var Mod3 = require('./mod3');
    console.log('<---done--->');

});
