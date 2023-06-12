import React from 'react';
import {Col, Form, Row} from "antd";
import InvSupplierList from "../../../../features/invSupplier/InvSupplierList";
import InvSupplierForm from "../../../../features/invSupplier/InvSupplierForm";
import InvSupplierToolkit from "../../../../features/invSupplier/InvSupplierToolkit";

const InvSupplier = () => {
    const [form] = Form.useForm();

    return (
        <Row>
            <Col xs={24} sm={24} md={24} lg={{span: 8, offset: 16}} style={{paddingBottom: '15px'}}>
                <InvSupplierToolkit form={form}/>
            </Col>
            <Col span={24}>
                <InvSupplierList/>
            </Col>
            <InvSupplierForm form={form}/>
        </Row>
    );
};

export default InvSupplier;