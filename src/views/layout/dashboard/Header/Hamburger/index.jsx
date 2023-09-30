import React from 'react';
import './index.css'
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";

const Hamburger = (props) => {
    const {setSidebarCollapsed, sidebarCollapsed} = props
    return (
        <div className="hamburger-container">
            {sidebarCollapsed
                ? <MenuUnfoldOutlined onClick={() => setSidebarCollapsed(!sidebarCollapsed)}/>
                : <MenuFoldOutlined onClick={() => setSidebarCollapsed(!sidebarCollapsed)}/>
            }
        </div>
    );
};

export default Hamburger;