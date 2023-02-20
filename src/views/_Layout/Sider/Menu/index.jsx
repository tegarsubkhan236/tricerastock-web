import React from 'react';
import {Menu} from "antd";
import {useNavigate, useLocation} from "react-router-dom";
import menuList from "../../../../router/menuList";

const SiderMenu = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const items = menuList.map((item) => ({
        label : item.label,
        key : item.key,
        icon : item.icon,
        children : item.children,
        type : item.type
    }));
    return (
        <div className="sidebar-menu-container">
            <Menu
                mode="inline"
                theme="dark"
                onClick={({key}) => navigate(key)}
                defaultSelectedKeys={[location.pathname]}
                selectedKeys={[location.pathname]}
                items={items}
            />
        </div>
    );
};
export default SiderMenu;