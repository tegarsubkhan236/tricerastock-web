import React, {useEffect, useState} from 'react';
import './index.css'
import screenfull from "screenfull";
import {message, Tooltip} from "antd";
import {FullscreenExitOutlined, FullscreenOutlined} from "@ant-design/icons";

const Fullscreen = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const [isFullscreen, setIsFullscreen] = useState(false);
    const click = () => {
        if (!screenfull.isEnabled) {
            messageApi.warning("you browser can not work");
            return false;
        }
        screenfull.toggle();
    }
    const change = () => {
        setIsFullscreen(screenfull.isFullscreen)
    }
    useEffect(() => {
        screenfull.isEnabled && screenfull.on("change", change);
        return () => {
            screenfull.isEnabled && screenfull.off("change", change);
        }
    }, [])

    const title = isFullscreen ? "Exit FullScreen" : "Open FullScreen";

    return (
        <>
            {contextHolder}
            <div className="fullScreen-container">
                <Tooltip placement="bottom" title={title}>
                    {isFullscreen ? <FullscreenExitOutlined onClick={click}/> : <FullscreenOutlined onClick={click}/>}
                </Tooltip>
            </div>
        </>
    );
};

export default Fullscreen;