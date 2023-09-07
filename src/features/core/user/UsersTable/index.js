import React from 'react';
import {Col, Row} from "antd";
import UsersTable from "./UsersTable";
import UsersToolkit from "./UsersToolkit";

const Index = ({form}) => {
    return (
        <Row>
            <Col span={24} style={{display: 'flex', justifyContent: 'flex-end', paddingBottom: '15px'}}>
                <UsersToolkit form={form}/>
            </Col>
            <Col span={24}>
                <UsersTable/>
            </Col>
        </Row>
    );
};

export default Index;