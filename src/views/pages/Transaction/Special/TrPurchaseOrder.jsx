import React from 'react';
import {Col, Row} from "antd";
import TrPurchaseOrderList from "../../../../features/transaction/trPurchaseOrder/TrPurchaseOrderList";

const TrPurchaseOrder = () => {
    return (
        <Row>
            <Col span={24}>
                <TrPurchaseOrderList/>
            </Col>
        </Row>
    );
};

export default TrPurchaseOrder;