import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import DocumentTitle from "react-document-title";
import {Outlet, useLocation} from "react-router-dom";
import {Layout} from "antd";

const {Content} = Layout

const Index = () => {
    const location = useLocation()
    const title = "Rungkad";
    const subTitle = () => {
        if (location.pathname === '/'){
            return "Dashboard"
        } else {
            let x = location.pathname.substring(1)
            let x1 = x.split('/')[0].replace(/-/g, " ")
            return x1.charAt(0).toUpperCase() + x1.slice(1)
        }
    }
    return (
        <DocumentTitle title={`${subTitle()} - ${title}`}>
            <Content style={{height: "calc(100% - 100px)"}}>
                <TransitionGroup>
                    <CSSTransition
                        timeout={500}
                        classNames="fade"
                        exit={false}
                        key={location.pathname}
                    >
                        <Outlet/>
                    </CSSTransition>
                </TransitionGroup>
            </Content>
        </DocumentTitle>
    );
};

export default Index;