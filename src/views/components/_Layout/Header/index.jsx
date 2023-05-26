import React from 'react';
import './index.css'
import {Layout, Avatar, Dropdown, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import Hamburger from "./Hamburger";
import Fullscreen from "./Fullscreen";
import {useDispatch} from "react-redux";
import {logout} from "../../../../features/coreAuth/coreAuthSlice";

const {Header} = Layout

const LayoutHeader = (props) => {
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
                <p onClick={()=>dispatch(logout())} rel={"logout"}>
                    Logout
                </p>
            ),
            key: '2',
        },
    ];

    const {setSidebarCollapsed, sidebarCollapsed} = props
    return (
        <Header style={{width: "100%"}}>
            <Hamburger setSidebarCollapsed={setSidebarCollapsed} sidebarCollapsed={sidebarCollapsed}/>
            <div className="right-menu">
                <Fullscreen/>
                <div className="dropdown-wrap">
                    <Dropdown menu={{items}} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
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