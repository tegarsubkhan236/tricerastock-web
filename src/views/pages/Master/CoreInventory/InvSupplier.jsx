import React from 'react';
import {Col, Form, Row} from "antd";
import InvSupplierList from "../../../../features/invSupplier/InvSupplierList";
import InvSupplierForm from "../../../../features/invSupplier/InvSupplierForm";
import InvSupplierToolkit from "../../../../features/invSupplier/InvSupplierToolkit";

const InvSupplier = () => {
    const [form] = Form.useForm();

    return (
        <Row>
            <Col span={24} style={{display: 'flex', justifyContent: 'flex-end', paddingBottom: '15px'}}>
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