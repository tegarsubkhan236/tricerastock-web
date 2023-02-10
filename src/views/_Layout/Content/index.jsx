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
            return x.charAt(0).toUpperCase() + x.slice(1)
        }
    }
    return (
        <DocumentTitle title={`${subTitle()} - ${title}`}>
            <Content
                style={{height: "calc(100% - 100px)"}}
                // style={{ margin: "24px 16px 0", overflow: "initial" }}
            >
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