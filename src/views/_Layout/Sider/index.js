import React from 'react';
import {Layout} from "antd";
import SiderLogo from "./Logo";
import SiderMenu from "./Menu";

const {Sider} = Layout

const LayoutSider = (props) => {
    const {setSidebarCollapsed, sidebarCollapsed} = props
    return (
        <Sider
            collapsible
            collapsed={sidebarCollapsed}
            breakpoint={"sm"}
            onBreakpoint={(broken) => {
                if (broken) {
                    setSidebarCollapsed(true)
                } else {
                    setSidebarCollapsed(false)
                }
            }}
            trigger={null}
            style={{ zIndex: "10" }}
        >
            <SiderLogo/>
            <SiderMenu/>
        </Sider>
    );
};

export default LayoutSider;