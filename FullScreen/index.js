
import React from "react";
import {
  message,
} from 'antd'
import useFullscreenStatus from "./useFullscreenStatus";

const FullScreen = function ({
  children,
  style,
  onExitFullscreen,
  onEnterFullscreen,
  getFullScreenStatus,
}) {
  const maximizableElement = React.useRef(null);
  let isFullscreen, setIsFullscreen;
  let errorMessage;

  try {
    [isFullscreen, setIsFullscreen] = useFullscreenStatus(maximizableElement);
  } catch (e) {
    errorMessage = "全屏API不支持！";
    isFullscreen = false;
    setIsFullscreen = undefined;
    message.error(errorMessage);
  }

  const handleExitFullscreen = () => document.exitFullscreen();

  return (
    <div
      ref={maximizableElement}
      style={style}
    // className={`maximizable-container ${
    //   isFullscreen ? "fullscreen" : "default"
    //   }`}
    // style={{ backgroundColor: isFullscreen ? backgroundColor : null }}
    >
      {children}
      <div className="maximizable-actions">
        {isFullscreen ?
          <button onClick={handleExitFullscreen}>退出全屏</button>
          :
          <button onClick={setIsFullscreen}>进入全屏</button>
        }
      </div>
    </div>
  );
};

export default FullScreen;
