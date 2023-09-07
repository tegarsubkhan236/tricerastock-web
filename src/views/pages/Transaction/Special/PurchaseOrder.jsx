import React from 'react';
import {Col, Row} from "antd";
import PurchaseOrderTable from "../../../../features/transaction/purchaseOrder/PurchaseOrderTable";

const TrPurchaseOrder = () => {
    return (
        <Row>
            <Col span={24}>
                <PurchaseOrderTable/>
            </Col>
        </Row>
    );
};

export default TrPurchaseOrder;