import React from 'react';
import {Layout} from "antd";
import SiderLogo from "./Logo";
import SiderMenu from "./Menu";

const {Sider} = Layout

const LayoutSider = (props) => {
    const { sidebarCollapsed } = props
    return (
        <Sider
            collapsible
            collapsed={sidebarCollapsed}
            trigger={null}
            style={{ zIndex: 10 }}
        >
            <SiderLogo/>
            <SiderMenu/>
        </Sider>
    );
};

export default LayoutSider;