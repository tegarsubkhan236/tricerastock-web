import React from 'react';
import './index.css'
import DocumentTitle from "react-document-title";
import AuthForm from "../../../../features/core/auth/AuthForm";
import {Col, Row} from "antd";
import {AppAuthBackground, AppTitle} from "../../../../config/app";

const Index = () => {
    return (
        <DocumentTitle title={`Login - ${AppTitle}`}>
            <div className="login-container">
                <Row style={{ backgroundImage: `url(${AppAuthBackground})`, backgroundSize: 'cover', height: '100vh' }}>
                    <Col span={24}>
                        <AuthForm/>
                    </Col>
                </Row>
            </div>
        </DocumentTitle>
    );
};

export default Index;