import React from 'react';
import PurchaseOrderForm from "../../../../features/transaction/purchaseOrder/PurchaseOrderForm";
import {Card, Typography} from "antd";

const PurchaseOrder = () => {
    const page_title = "Purchase Order"
    return (
        <div className="app-container">
            <Card title={<Typography.Title level={4}>{page_title}</Typography.Title>}>
                <PurchaseOrderForm/>
            </Card>
        </div>
    );
};

export default PurchaseOrder;