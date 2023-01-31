import React from 'react';
import {Layout} from "antd";
import LayoutSider from "./Sider";
import LayoutHeader from "./Header";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Outlet} from "react-router-dom";
const {Content} = Layout

const MainLayout = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <LayoutSider />
            <Layout>
                <LayoutHeader/>
                <Content style={{height: "calc(100% - 100px)"}}>
                    <TransitionGroup>
                        <CSSTransition timeout={500} classNames="fade" exit={false}>
                            <Outlet/>
                        </CSSTransition>
                    </TransitionGroup>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;