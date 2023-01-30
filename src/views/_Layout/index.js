import React from 'react';
import {Layout} from "antd";
import LayoutSider from "./Sider";
import LayoutHeader from "./Header";
import LayoutContent from "./Content";

const MainLayout = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <LayoutSider />
            <Layout>
                <LayoutHeader/>
                <LayoutContent/>
            </Layout>
        </Layout>
    );
};

export default MainLayout;