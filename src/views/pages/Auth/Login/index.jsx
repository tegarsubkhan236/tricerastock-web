import React from 'react';
import './index.css'
import DocumentTitle from "react-document-title";
import AuthForm from "../../../../features/coreAuth/CoreAuthForm";
import LoginBackground from "../../../../assets/images/login_background.jpeg"
import {Col, Row} from "antd";

const Index = () => {
    return (
        <DocumentTitle title={"Login - RungkadApp"}>
            <div className="login-container">
                <Row style={{ backgroundImage: `url(${LoginBackground})`, backgroundSize: 'cover', height: '100vh' }}>
                    <Col span={24}>
                        <AuthForm/>
                    </Col>
                </Row>
            </div>
        </DocumentTitle>
    );
};

export default Index;