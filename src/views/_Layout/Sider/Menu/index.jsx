import React from 'react';
import {Menu} from "antd";
import {useNavigate} from "react-router-dom";
import menuList from "../../../../router/menuList";
import './index.css'

const SiderMenu = () => {
    const navigate = useNavigate()
    const onClick = ({key}) => {
      navigate(key)
    }

    return (
        <div className="sidebar-menu-container">
            <Menu
                mode="inline"
                theme="dark"
                onClick={onClick}
                defaultSelectedKeys={[window.location.pathname]}
                items={menuList}
            />
        </div>
    );
};

export default SiderMenu;