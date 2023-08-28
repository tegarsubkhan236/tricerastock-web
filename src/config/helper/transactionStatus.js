import {Badge} from "antd";
import React from "react";

export const generateTransactionStatus = (status) => {
    let statusText = 'Pending Order';
    let statusIcon = 'processing';

    if (status === 2) {
        statusText = 'Partial Receive';
        statusIcon = 'warning';
    } else if (status === 3) {
        statusText = 'Fully Receive';
        statusIcon = 'success';
    }

    return <Badge status={statusIcon} text={statusText}/>;
}