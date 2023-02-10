import React from 'react';
import {Menu} from "antd";
import {useNavigate} from "react-router-dom";
import menuList from "../../../../router/menuList";

const SiderMenu = () => {
    const navigate = useNavigate()
    return (
        <div className="sidebar-menu-container">
            <Menu
                mode="inline"
                theme="dark"
                onClick={({key}) => navigate(key)}
                defaultSelectedKeys={[window.location.pathname]}
                items={menuList}
            />
        </div>
    );
};

export default SiderMenu;