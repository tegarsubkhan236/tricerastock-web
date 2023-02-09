import React, {useState} from 'react';
import {Layout} from "antd";
import LayoutSider from "./Sider";
import LayoutHeader from "./Header";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Outlet, useLocation} from "react-router-dom";
const {Content} = Layout

const MainLayout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const location = useLocation()
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <LayoutSider sidebarCollapsed={sidebarCollapsed}/>
            <Layout>
                <LayoutHeader setSidebarCollapsed={setSidebarCollapsed} sidebarCollapsed={sidebarCollapsed}/>
                <Content style={{height: "calc(100% - 100px)"}}>
                    <TransitionGroup>
                        <CSSTransition timeout={500} classNames="fade" exit={false} key={location.pathname}>
                            <Outlet/>
                        </CSSTransition>
                    </TransitionGroup>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;