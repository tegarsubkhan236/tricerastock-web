import React from 'react';
import {Button, Result} from "antd";

const ResultSuccess = () => {
    return (
        <Result
            status="success"
            title="Successfully Create Purchase Order!"
            subTitle={
                <>
                    Order number: <Text strong>{result.po_code}</Text> please do receiving order after it
                </>
            }
            extra={[
                <Button type="primary" key="print_invoice">Print Invoice</Button>,
                <Button key="buy" onClick={resetStep}>Buy Again</Button>,
            ]}
        />
    );
};

export default ResultSuccess;