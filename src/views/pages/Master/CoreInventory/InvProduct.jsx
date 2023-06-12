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
                    <Col span={24} style={{display: 'flex', justifyContent: 'flex-end', paddingBottom: '15px'}}>
                        <InvProductToolkit form={form}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <InvProductList/>
                        <InvProductForm form={form}/>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default InvProduct;