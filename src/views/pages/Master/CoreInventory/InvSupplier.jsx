import React, {useRef} from 'react';
import {Button, Col, DatePicker, Input, Popconfirm, Row, Space, Switch, Table} from "antd";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";

const InvSupplier = () => {
    const searchInput = useRef(null);

    const openAddModal = () => {
        console.log("ADD_FORM")
    };

    const openEditModal = (record) => {
        console.log("EDIT_FORM")
    };

    const handleDelete = async (id) => {
        console.log(id)
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
          title: 'Contact',
          children: [
              {
                  title: 'Contact Person',
                  dataIndex: 'cperson',
                  key: 'cperson'
              },
              {
                  title: 'Contact Number',
                  dataIndex: 'contact',
                  key: 'contact'
              }
          ]
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => (
                <Switch checkedChildren="Active" unCheckedChildren="InActive" defaultChecked={record.status === 1}/>
            )
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined/>} shape={"circle"} onClick={() => openEditModal(record)}/>
                    <Popconfirm
                        title="Delete data"
                        description="Are you sure to delete this data?"
                        onConfirm={() => handleDelete(record.id)}
                        onCancel={() => console.log("canceled")}
                        okText="Do it"
                        cancelText="Nah"
                    >
                        <Button icon={<DeleteOutlined/>} shape={"circle"} danger/>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const data = [
        {
            id: 1,
            name: "tegar subkhan fauzi",
            cperson: "fauzi",
            address : "Jl Klayar rt 05 rw 06",
            contact : "08966288087",
            status : 1
        }
    ]

    return (
        <Row>
            <Col xs={24} sm={24} md={24} lg={{span: 8, offset: 16}} style={{paddingBottom: '15px'}}>
                <Space>
                    <Input.Search
                        placeholder="Cari..."
                        allowClear
                        ref={searchInput}
                        size="middle"
                        onSearch={(value) => console.log(value)}
                    />
                    <Button icon={<PlusOutlined/>} type={"primary"} onClick={() => openAddModal()}>Add Data</Button>
                </Space>
            </Col>
            <Col span={24}>
                <Table
                    dataSource={data}
                    columns={columns}
                    scroll={{ x: true }}
                    bordered
                />
            </Col>
        </Row>
    );
};

export default InvSupplier;