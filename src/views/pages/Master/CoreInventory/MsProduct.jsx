import React from 'react';
import {Col, Form, Row} from "antd";
import InvProductFilter from "../../../../features/master/msProduct/MsProductFilter";
import InvProductList from "../../../../features/master/msProduct/MsProductList";
import InvProductToolkit from "../../../../features/master/msProduct/MsProductToolkit";
import InvProductForm from "../../../../features/master/msProduct/MsProductForm";

const MsProduct = () => {
    const [form] = Form.useForm();

    return (
        <>
            <Row>
                <Col span={24} style={{display: 'flex', justifyContent: 'flex-end', paddingBottom: '15px'}}>
                    <InvProductToolkit form={form}/>
                </Col>
            </Row>
            <Row>
                <Col span={4} style={{paddingRight: '10px'}}>
                    <InvProductFilter/>
                </Col>

                <Col span={20}>
                    <Row>
                        <Col span={24}>
                            <InvProductList/>
                            <InvProductForm form={form}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default MsProduct;