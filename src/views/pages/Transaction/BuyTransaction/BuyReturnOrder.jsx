import React from 'react';
import {Card, Typography} from "antd";
import BuyReturnOrderForm from "../../../../features/transaction/returnOrder/BuyReturnOrderForm";

const BuyReturnOrder = () => {
    const page_title = "Buy Return Order"
    return (
        <div className="app-container">
            <Card title={<Typography.Title level={4}>{page_title}</Typography.Title>}>
                <BuyReturnOrderForm/>
            </Card>
        </div>
    );
};

export default BuyReturnOrder;