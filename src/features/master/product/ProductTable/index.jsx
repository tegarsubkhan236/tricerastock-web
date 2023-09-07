import React from 'react';
import {Col, Row} from "antd";
import ProductToolkit from "./ProductToolkit";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";

const Index = ({form}) => {
    return (
        <>
            <Row>
                <Col span={24} style={{display: 'flex', justifyContent: 'flex-end', paddingBottom: '15px'}}>
                    <ProductToolkit form={form}/>
                </Col>
            </Row>
            <Row>
                <Col span={4} style={{paddingRight: '10px'}}>
                    <ProductFilter/>
                </Col>

                <Col span={20}>
                    <Row>
                        <Col span={24}>
                            <ProductList/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default Index;