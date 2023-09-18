import React, {createContext, useState} from 'react';
import {Layout} from "antd";
import LayoutSider from "./Sider";
import LayoutHeader from "./Header";
import LayoutContent from "./Content";

export const LayoutContext = createContext()

const MainLayout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    return (
        <LayoutContext.Provider value={{
            sidebarCollapsed,
            setSidebarCollapsed
        }}>
            <Layout style={{ minHeight: "100vh" }} hasSider>
                <LayoutSider/>
                <Layout style={{overflow: 'auto'}}>
                    <LayoutHeader/>
                    <LayoutContent/>
                </Layout>
            </Layout>
        </LayoutContext.Provider>
    );
};

export default MainLayout;