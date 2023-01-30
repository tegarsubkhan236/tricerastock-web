import React from 'react';
import './index.css'
import { Layout, Avatar } from "antd";
import {Fullscreen, Hamburger} from "../../../components";
import {UserOutlined} from "@ant-design/icons";

const {Header} = Layout

const LayoutHeader = () => {
    return (
        <Header style={{ width: "100%" }}>
            <Hamburger/>
            <div className="right-menu">
                <Fullscreen/>
                <div className="dropdown-wrap">
                    <Avatar shape="square" size="medium" icon={<UserOutlined/>} />
                </div>
            </div>
        </Header>
    );
};

export default LayoutHeader;