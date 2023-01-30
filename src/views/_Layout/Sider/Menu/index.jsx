import React from 'react';
import './index.css'
import {Menu} from "antd";
import {BulbOutlined, FundOutlined, HomeOutlined, MoneyCollectOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const SiderMenu = () => {
    return (
        <Menu theme={"dark"}>
            <Menu.Item icon={<HomeOutlined/>}>
                <Link to={"/"}>Home</Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined/>}>
                <Link to={"/cryptocurrencies"}>Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<MoneyCollectOutlined/>}>
                <Link to={"/exchanges"}>Exchanges</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined/>}>
                <Link to={"/news"}>News</Link>
            </Menu.Item>
        </Menu>
    );
};

export default SiderMenu;