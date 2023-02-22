import React from 'react';
import './index.css'
import {Layout, Avatar, Dropdown, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import Hamburger from "./Hamburger";
import BreadCrumb from "./BreadCrumb";
import Fullscreen from "./Fullscreen";

const {Header} = Layout

const items = [
    {
        key: 1,
        label: (
            <Link to={"/"}>
                My Profile
            </Link>
        )
    }, {
        key: 2,
        label: (
            <Link to={"/login"}>
                Logout
            </Link>
        )
    },
];

const LayoutHeader = (props) => {
    const {setSidebarCollapsed, sidebarCollapsed} = props
    return (
        <Header style={{width: "100%"}}>
            <Hamburger setSidebarCollapsed={setSidebarCollapsed} sidebarCollapsed={sidebarCollapsed}/>
            <BreadCrumb/>
            <div className="right-menu">
                <Fullscreen/>
                <div className="dropdown-wrap">
                    <Dropdown menu={{items}} trigger={['click']}>
                        <Space>
                            <Avatar shape="square" size="medium" icon={<UserOutlined/>}
                                    style={{backgroundColor: '#87d068'}}/>
                        </Space>
                    </Dropdown>
                </div>
            </div>
        </Header>
    );
};

export default LayoutHeader;