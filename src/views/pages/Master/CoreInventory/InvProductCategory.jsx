import React, {useMemo, useState} from 'react';
import {Button, Col, Input, Popconfirm, Row, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined, EnterOutlined, PlusOutlined} from "@ant-design/icons";

const InvProductCategory = () => {
    const [tableData, setTableData] = useState([
        {
            key: Math.random(),
            name: "test",
            children: [
                {
                    key: Math.random(),
                    name: "Test Children"
                }
            ]
        }
    ])
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    const openAddModal = () => {
        console.log("ADD_FORM")
    };

    const createNewRow = () => {
        return {
            key: Math.random(),
            name: "test 2",
        };
    };
    const addChild = (record) => {
        if (!Array.isArray(record.children)) {
            record.children = [];
        }
        const newRow = createNewRow();
        record.children = [...record.children, newRow];
        setTableData([...tableData]);
        setExpandedRowKeys(new Set([...expandedRowKeys, record.key]));
    }

    const columns = useMemo(() => [
        {
            title: 'Category',
            dataIndex: 'name',
            key: 'name',
            render: (value, record) => (
                <>
                    {record.parent && <EnterOutlined />}
                    <div>{value}</div>
                </>
            ),
        },
        {
            title: 'Add a Child',
            key: 'add',
            render: (record) => <Button icon={<PlusOutlined/>} shape={"circle"} onClick={() => addChild(record)}/>,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined/>} shape={"circle"} onClick={() => console.log("open edit modal", record)}/>
                    <Popconfirm
                        title="Delete data"
                        description="Are you sure to delete this data?"
                        onConfirm={() => console.log("confirm", record)}
                        onCancel={() => console.log("canceled")}
                        okText="Do it"
                        cancelText="Nah"
                    >
                        <Button icon={<DeleteOutlined/>} shape={"circle"} danger/>
                    </Popconfirm>
                </Space>
            ),
        },
    ],[addChild]);

    return (
        <Row>
            <Col xs={24} sm={24} md={24} lg={{span: 3, offset: 21}} style={{paddingBottom: '15px'}}>
                <Button icon={<PlusOutlined/>} type={"primary"} onClick={() => openAddModal()}>Add Data</Button>
            </Col>
            <Col span={24}>
                <Table
                    dataSource={tableData}
                    columns={columns}
                    pagination={{ position: [] }}
                    expandable={{
                        expandedRowKeys,
                        onExpandedRowsChange: (expandedRows) => {
                            setExpandedRowKeys(expandedRows);
                        },
                    }}
                />
            </Col>
        </Row>
    );
};

export default InvProductCategory;