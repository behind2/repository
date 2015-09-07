/**
 * Mod2 comment...
 */
define(['jquery', 'mod1'], function ($, Mod1) {

  console.log($.type('abc'));

  return {
    name: 'mod2',
    getName: function () {// 获取名字的方法
      //console.log(Mod1.getName());
        return Mod1.getName();
    }
  };
});
