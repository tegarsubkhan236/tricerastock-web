import React from 'react';
import {Button, Space} from "antd";
import {DeleteOutlined} from "@ant-design/icons";

const TrPurchaseOrderToolkit = () => {
    return (
        <Space>
            <Button icon={<DeleteOutlined/>} danger>
                Delete
            </Button>
            <Button icon={<DeleteOutlined/>} danger>
                Delete
            </Button>
            <Button icon={<DeleteOutlined/>} danger>
                Delete
            </Button>
            <Button icon={<DeleteOutlined/>} danger>
                Delete
            </Button>
        </Space>
    );
};

export default TrPurchaseOrderToolkit;