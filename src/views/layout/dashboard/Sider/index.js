import React, {useContext} from 'react';
import {LayoutContext} from "../index";
import {Layout, theme } from "antd";
import SiderLogo from "./Logo";
import SiderMenu from "./Menu";

const {Sider} = Layout

const LayoutSider = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const {setSidebarCollapsed, sidebarCollapsed} = useContext(LayoutContext)
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
            style={{
                background: colorBgContainer,
            }}
        >
            {/*<SiderLogo/>*/}
            <SiderMenu/>
        </Sider>
    );
};

export default LayoutSider;