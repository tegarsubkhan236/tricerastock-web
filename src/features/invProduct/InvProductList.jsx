import React from 'react';
import {Table} from "antd";

const InvProductList = ({columns}) => {
    const data = []

    return (
        <Table
            dataSource={data}
            columns={columns}
            scroll={{x: true}}
            bordered
        />
    );
};

export default InvProductList;