import React from 'react';
import {Col, Row, Space, Card} from 'antd';
import TypingCard from "../../components/TypingCard";
import FormBasic from "../../components/Form/FormBasic";
import FormMethod from "../../components/Form/FormMethod";
import FormLayout from "../../components/Form/FormLayout";
import FormRequiredMark from "../../components/Form/FormRequiredMark";
import FormDisabled from "../../components/Form/FormDisabled";
import FormSize from "../../components/Form/FormSize";
import FormLabelCanWarp from "../../components/Form/FormLabelCanWarp";
import FormNoBlockRule from "../../components/Form/FormNoBlockRule";

const BasicForm = () => {
    return (
        <div className="app-container">
            <Space direction="vertical" size="middle" style={{display: 'flex'}}>
                <TypingCard title='Basic Form' source={`Berikut adalah contoh <strong>BASIC FORM</strong>...`}/>
                <Row gutter={32}>
                    <Col xs={24} sm={24} lg={12}>
                        <Card title="Basic Usage" extra={"Extra"}>
                            <FormBasic/>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} lg={12}>
                        <Card title="Form Method" extra={"Extra"} style={{minHeight: "330px"}}>
                            <FormMethod/>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col xs={24} sm={24} lg={12}>
                        <Space direction="vertical" size="middle" style={{display: 'flex'}}>
                            <Card title="Form Layout" extra={"Extra"}>
                                <FormLayout/>
                            </Card>
                            <Card title="Form Required Mark" extra={"Extra"} style={{minHeight: "655px"}}>
                                <FormRequiredMark/>
                            </Card>
                        </Space>
                    </Col>
                    <Col xs={24} sm={24} lg={12}>
                        <Card title="Form Disabled" extra={"Extra"}>
                            <FormDisabled/>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col xs={24} sm={24} lg={12}>
                        <Card title="Form Size" extra={"Extra"} style={{minHeight: "650px"}}>
                            <FormSize/>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} lg={12}>
                        <Space direction="vertical" size="middle" style={{display: 'flex'}}>
                            <Card title="Form Label Can Warp" extra={"Extra"}>
                                <FormLabelCanWarp/>
                            </Card>
                            <Card title="Form No Block Rule" extra={"Extra"} style={{minHeight: "360px"}}>
                                <FormNoBlockRule/>
                            </Card>
                        </Space>
                    </Col>
                </Row>
            </Space>
        </div>
    );
};

export default BasicForm;