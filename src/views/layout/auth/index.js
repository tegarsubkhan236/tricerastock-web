import React, {useRef} from 'react';
import DocumentTitle from "react-document-title";
import {AppTitle} from "../../../config/app";
import {Button, Carousel, Col, Row} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import loginBack from "../../../assets/images/secure-login-animate.svg";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import {useLocation, useOutlet} from "react-router-dom";

const AuthLayout = () => {
    const carouselRef = useRef(null);
    const location = useLocation()
    const currentOutlet = useOutlet()

    const cssTransitionProps = {
        timeout:500,
        classNames:"fade",
        exit:false,
        key:location.pathname,
    }

    const next = () => {
        carouselRef.current.next();
    };

    const previous = () => {
        carouselRef.current.prev();
    };

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <DocumentTitle title={`Login - ${AppTitle}`}>
            <Row justify="center" align="middle" style={{height: '100vh'}}>
                <Col span={14}>
                    <Row justify={"space-between"} align={"middle"}>
                        <Col span={2} style={{textAlign: 'right'}}>
                            <Button icon={<LeftOutlined/>} onClick={previous}/>
                        </Col>
                        <Col span={20}>
                            <Carousel ref={carouselRef} {...settings}>
                                <div>
                                    <img key={1} src={loginBack} alt={"loginBack"} height={650}/>
                                </div>
                                <div>
                                    <img key={2} src={loginBack} alt={"loginBack"} height={650}/>
                                </div>
                                <div>
                                    <img key={3} src={loginBack} alt={"loginBack"} height={650}/>
                                </div>
                            </Carousel>
                        </Col>
                        <Col span={2} style={{textAlign: 'left'}}>
                            <Button icon={<RightOutlined/>} onClick={next}/>
                        </Col>
                    </Row>
                </Col>
                <Col span={8} push={1} style={{paddingRight: 80}}>
                    <SwitchTransition>
                        <CSSTransition {...cssTransitionProps}>
                            {currentOutlet}
                        </CSSTransition>
                    </SwitchTransition>
                </Col>
            </Row>
        </DocumentTitle>
    );
};

export default AuthLayout;