import React, {useRef} from 'react';
import {CSSTransition, SwitchTransition} from "react-transition-group";
import DocumentTitle from "react-document-title";
import {useLocation, useOutlet} from "react-router-dom";
import {Layout} from "antd";
import {GetTitle} from "../../../config/helper";

const {Content} = Layout

const Index = () => {
    const location = useLocation()
    const currentOutlet = useOutlet()
    const nodeRef = useRef(null);
    const {title, subTitle} = GetTitle(location)
    return (
        <DocumentTitle title={`${subTitle()} - ${title}`}>
            <Content style={{height: "calc(100% - 100px)"}}>
                <SwitchTransition>
                    <CSSTransition
                        timeout={500}
                        classNames="fade"
                        exit={false}
                        nodeRef={nodeRef}
                        key={location.pathname}
                    >
                        {() => (
                            <div ref={nodeRef}>
                                {currentOutlet}
                            </div>
                        )}
                    </CSSTransition>
                </SwitchTransition>
            </Content>
        </DocumentTitle>
    );
};

export default Index;