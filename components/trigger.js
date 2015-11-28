/**
 * trigger 事件触发
 * @param  {DOM Element} ele  DOM元素
 * @param  {String} type 类型
 */
trigger: function (ele, type) {
    if (ele.dispatchEvent) {//非IE浏览器
      var event = document.createEvent('Event');
          event.initEvent(type, true, true);
          ele.dispatchEvent(event);
    } else if (ele.fireEvent) {//IE浏览器
      ele.fireEvent('on' + type);
    }
}