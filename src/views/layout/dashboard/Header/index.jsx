import React, {useContext} from 'react';
import './index.css'
import {Layout, Avatar, Dropdown, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import Hamburger from "./Hamburger";
import Fullscreen from "./Fullscreen";
import {useDispatch} from "react-redux";
import {logout} from "../../../../features/core/auth/authSlice";
import {LayoutContext} from "../index";

const {Header} = Layout

const LayoutHeader = () => {
    const {setSidebarCollapsed, sidebarCollapsed} = useContext(LayoutContext)
    const dispatch = useDispatch()
    const items = [
        {
            label: (
                <Link to={"/"} rel={"profile"}>
                    My Profile
                </Link>
            ),
            key: '1',
        }, {
            label: (
                // eslint-disable-next-line
                <a onClick={()=>dispatch(logout())} rel={"logout"}>
                    Logout
                </a>
            ),
            key: '2',
        },
    ];

    return (
        <Header style={{width: "100%", height: "50px", alignItems: 'center'}}>
            <Hamburger setSidebarCollapsed={setSidebarCollapsed} sidebarCollapsed={sidebarCollapsed}/>
            <div className="right-menu">
                <Fullscreen/>
                <div className="dropdown-wrap">
                    <Dropdown menu={{items}} trigger={['click']}>
                        <a href="/#" onClick={(e) => e.preventDefault()}>
                            <Space>
                                <Avatar shape="square"
                                        size="medium"
                                        icon={<UserOutlined/>}
                                        style={{backgroundColor: '#87d068'}}
                                />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </div>
        </Header>
    );
};

export default LayoutHeader;