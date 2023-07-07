import React from 'react';
import {Col, Form, Row} from "antd";
import UsersList from "../../../../features/coreUser/CoreUsersList";
import UsersForm from "../../../../features/coreUser/CoreUsersForm";
import CoreUsersToolkit from "../../../../features/coreUser/CoreUsersToolkit";

const CoreUsers = () => {
    const [form] = Form.useForm();

    return (
        <Row>
            <Col span={24} style={{display: 'flex', justifyContent: 'flex-end', paddingBottom: '15px'}}>
                <CoreUsersToolkit form={form}/>
            </Col>
            <Col span={24}>
                <UsersList/>
            </Col>
            <UsersForm form={form}/>
        </Row>
    );
};

export default CoreUsers;