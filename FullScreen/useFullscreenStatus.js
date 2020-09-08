
import React from "react";

export default function useFullscreenStatus(elRef) {
  // 获取当前浏览器fullScreen的初始状态
  const [isFullscreen, setIsFullscreen] = React.useState(
    // 如果为null，则该事件表示已退出全屏模式； 否则，指定的元素将接管屏幕
    document[getBrowserFullscreenElementProp()] != null
  );

  const setFullscreen = () => {
    if (elRef.current == null) return;

    elRef.current
      .requestFullscreen()
      .then(() => {
        setIsFullscreen(document[getBrowserFullscreenElementProp()] != null);
      })
      .catch(() => {
        setIsFullscreen(false);
      });
  };

  React.useLayoutEffect(() => {
    document.onfullscreenchange = () =>
      setIsFullscreen(document[getBrowserFullscreenElementProp()] != null);

    return () => (document.onfullscreenchange = undefined);
  });

  return [isFullscreen, setFullscreen];
}

function getBrowserFullscreenElementProp() {
  if (typeof document.fullscreenElement !== 'undefined') {
    return 'fullscreenElement';
  } else if (typeof document.mozFullScreenElement !== 'undefined') {
    return 'mozFullScreenElement';
  } else if (typeof document.msFullscreenElement !== 'undefined') {
    return 'msFullscreenElement';
  } else if (typeof document.webkitFullscreenElement !== 'undefined') {
    return 'webkitFullscreenElement';
  } else {
    throw new Error('此浏览器不支持全屏API！');
  }
}
