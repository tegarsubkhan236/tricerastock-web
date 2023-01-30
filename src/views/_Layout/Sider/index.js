import React from 'react';
import {Layout} from "antd";
import SiderLogo from "./Logo";
import SiderMenu from "./Menu";

const {Sider} = Layout

const LayoutSider = () => {
    return (
        <Sider style={{ zIndex: 10 }}>
            <SiderLogo/>
            <SiderMenu/>
        </Sider>
    );
};

export default LayoutSider;