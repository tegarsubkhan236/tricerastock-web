import React from 'react';
import {Col, Form, Row} from "antd";
import InvProductFilter from "../../../../features/invProduct/InvProductFilter";
import InvProductList from "../../../../features/invProduct/InvProductList";
import InvProductToolkit from "../../../../features/invProduct/InvProductToolkit";
import InvProductForm from "../../../../features/invProduct/InvProductForm";

const InvProduct = () => {
    const [form] = Form.useForm();

    return (
        <Row>
            <Col span={5} style={{paddingRight: '10px', marginTop: '47px'}}>
                <InvProductFilter/>
            </Col>

            <Col span={19}>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={{span: 10, offset: 14}} style={{paddingBottom: '15px'}}>
                        <InvProductToolkit form={form}/>
                    </Col>
                    <Col span={24}>
                        <InvProductList form={form}/>
                        <InvProductForm form={form}/>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default InvProduct;