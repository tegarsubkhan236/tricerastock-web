import React from 'react';
import { Row, Col } from "antd";
import {BulbOutlined} from "@ant-design/icons";
import './index.css';

const Index = () => {
    return (
        <div className="app-container">
            <div className="panel-group-container">
                <Row gutter={40} className="panel-group">
                    <Col className="card-panel-col">
                        <div className="card-panel">
                            <div className="card-panel-icon-wrapper">
                                <BulbOutlined
                                    className={"Messages"}
                                    style={{ fontSize: 55, color: "#36a3f7" }}
                                />
                            </div>
                            <div className="card-panel-description">
                                <p className="card-panel-text">Messages</p>
                            </div>
                        </div>
                    </Col>
                    <Col className="card-panel-col">
                        <div className="card-panel">
                            <div className="card-panel-icon-wrapper">
                                <BulbOutlined
                                    className={"Messages"}
                                    style={{ fontSize: 55, color: "#36a3f7" }}
                                />
                            </div>
                            <div className="card-panel-description">
                                <p className="card-panel-text">Messages</p>
                            </div>
                        </div>
                    </Col>
                    <Col className="card-panel-col">
                        <div className="card-panel">
                            <div className="card-panel-icon-wrapper">
                                <BulbOutlined
                                    className={"Messages"}
                                    style={{ fontSize: 55, color: "#36a3f7" }}
                                />
                            </div>
                            <div className="card-panel-description">
                                <p className="card-panel-text">Messages</p>
                            </div>
                        </div>
                    </Col>
                    <Col className="card-panel-col">
                        <div className="card-panel">
                            <div className="card-panel-icon-wrapper">
                                <BulbOutlined
                                    className={"Messages"}
                                    style={{ fontSize: 55, color: "#36a3f7" }}
                                />
                            </div>
                            <div className="card-panel-description">
                                <p className="card-panel-text">Messages</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Index;