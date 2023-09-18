import React from 'react';
import SalesOrderForm from "../../../../features/transaction/salesOrder/SalesOrderForm";
import {Card, Typography} from "antd";

const SalesOrder = () => {
    const page_title = "Sales Order"

    return (
        <div className="app-container">
            <Card title={<Typography.Title level={4}>{page_title}</Typography.Title>}>
                <SalesOrderForm/>
            </Card>
        </div>
    );
};

export default SalesOrder;