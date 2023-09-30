import React, {createContext, useState} from 'react';
import {Layout} from "antd";
import LayoutSider from "./Sider";
import LayoutHeader from "./Header";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import {AppTitle, getAppSubTitle} from "../../../config/app";
import DocumentTitle from "react-document-title";
import {useLocation, useOutlet} from "react-router-dom";
const {Content} = Layout

export const LayoutContext = createContext()

const MainLayout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const location = useLocation()
    const currentOutlet = useOutlet()
    const cssTransitionProps = {
        timeout:500,
        classNames:"fade",
        exit:false,
        key:location.pathname,
    }

    return (
        <LayoutContext.Provider value={{sidebarCollapsed, setSidebarCollapsed}}>
            <DocumentTitle title={`${AppTitle} - ${getAppSubTitle(location)}`}>
                <Layout style={{ minHeight: "100vh" }}>
                    <LayoutHeader/>
                    <Layout style={{overflow: 'auto'}}>
                        <LayoutSider/>
                        <Content style={{height: "calc(100% - 100px)"}}>
                            <SwitchTransition>
                                <CSSTransition {...cssTransitionProps}>
                                    {currentOutlet}
                                </CSSTransition>
                            </SwitchTransition>
                        </Content>
                    </Layout>
                </Layout>
            </DocumentTitle>
        </LayoutContext.Provider>
    );
};

export default MainLayout;