import {Badge} from "antd";
import React from "react";

export const TRANSACTION_TYPE = {
    BUY_TRANSACTION: "BUY_TRANSACTION",
    SELL_TRANSACTION: "SELL_TRANSACTION",
};

export const TRANSACTION_STATUS = {
    PENDING_ORDER: 0,
    PARTIAL_RECEIVE: 2,
    FULLY_RECEIVE: 3,
}

export const transformTransactionStatus = (status) => {
    let statusText;
    let statusIcon;

    switch (status) {
        case TRANSACTION_STATUS.PENDING_ORDER :
            statusText = 'Pending Order';
            statusIcon = 'processing';
            break
        case TRANSACTION_STATUS.PARTIAL_RECEIVE :
            statusText = 'Partial Receive';
            statusIcon = 'warning';
            break
        case TRANSACTION_STATUS.FULLY_RECEIVE :
            statusText = 'Fully Receive';
            statusIcon = 'success';
            break
        default:
            statusText = 'Unknown Status';
            statusIcon = 'default';
            break;
    }

    return <Badge status={statusIcon} text={statusText}/>;
}