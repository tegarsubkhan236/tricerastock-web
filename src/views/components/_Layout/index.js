import React, {useState} from 'react';
import {Layout} from "antd";
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import LayoutSider from "./Sider";
import LayoutHeader from "./Header";
import LayoutContent from "./Content";

const MainLayout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    return (
        <Layout style={{ minHeight: "100vh" }} hasSider>
            <LayoutSider
                sidebarCollapsed={sidebarCollapsed}
                setSidebarCollapsed={setSidebarCollapsed}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
            />
            <Layout style={{overflow: 'auto'}}>
                <LayoutHeader
                    setSidebarCollapsed={setSidebarCollapsed}
                    sidebarCollapsed={sidebarCollapsed}
                />
                <LayoutContent/>
            </Layout>
            <FloatButton.Group
                trigger="click"
                type="primary"
                style={{right: 24,}}
                icon={<CustomerServiceOutlined />}
            >
                <FloatButton />
                <FloatButton icon={<CommentOutlined />} />
            </FloatButton.Group>
        </Layout>
    );
};

export default MainLayout;