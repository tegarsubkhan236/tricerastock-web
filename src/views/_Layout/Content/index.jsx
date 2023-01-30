import React from 'react';
import {Layout} from "antd";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Homepage} from "../../index";

const {Content} = Layout

const LayoutContent = () => {
    return (
        <Content style={{height: "calc(100% - 100px)"}}>
            <TransitionGroup>
                <CSSTransition timeout={500} classNames="fade" exit={false}>
                    <Homepage/>
                </CSSTransition>
            </TransitionGroup>
        </Content>
    );
};

export default LayoutContent;