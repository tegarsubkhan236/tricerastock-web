import React from 'react';
import './index.css'
import {MenuUnfoldOutlined} from "@ant-design/icons";

const Hamburger = (props) => {
    const {setSidebarCollapsed, sidebarCollapsed} = props
    return (
        <div className="hamburger-container">
            <MenuUnfoldOutlined onClick={() => setSidebarCollapsed(!sidebarCollapsed)}/>
        </div>
    );
};

export default Hamburger;