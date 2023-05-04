import React, {useState, useRef} from 'react';
import {Button,Tag,Avatar, Col, Select, Tree, Input, Popconfirm, Row, Space, Switch, Table, Form} from "antd";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";

const treeData = [
    {
        title: '0-0',
        key: '0-0',
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    {
                        title: '0-0-0-0',
                        key: '0-0-0-0',
                    },
                    {
                        title: '0-0-0-1',
                        key: '0-0-0-1',
                    },
                    {
                        title: '0-0-0-2',
                        key: '0-0-0-2',
                    },
                ],
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                    {
                        title: '0-0-1-0',
                        key: '0-0-1-0',
                    },
                    {
                        title: '0-0-1-1',
                        key: '0-0-1-1',
                    },
                    {
                        title: '0-0-1-2',
                        key: '0-0-1-2',
                    },
                ],
            },
            {
                title: '0-0-2',
                key: '0-0-2',
            },
        ],
    },
    {
        title: '0-1',
        key: '0-1',
        children: [
            {
                title: '0-1-0-0',
                key: '0-1-0-0',
            },
            {
                title: '0-1-0-1',
                key: '0-1-0-1',
            },
            {
                title: '0-1-0-2',
                key: '0-1-0-2',
            },
        ],
    },
    {
        title: '0-2',
        key: '0-2',
    },
];

const openAddModal = () => {
    console.log("ADD_FORM_PRODUCT")
};

const openEditModal = (record) => {
    console.log("EDIT_FORM_PRODUCT")
};

const handleDelete = async (id) => {
    console.log("DELETE_FORM_PRODUCT", id)
}

const columns = [
    {
        title: 'Product',
        children: [
            {
                title: 'Image',
                key: 'img',
                render: (_, {name}) => (
                    <Avatar
                        style={{
                            backgroundColor: '#f56a00',
                            verticalAlign: 'middle',
                        }}
                        size="large"
                    >
                        {name}
                    </Avatar>
                )
            },
            {
                title: 'Name',
                key: 'name',
                dataIndex: 'name',
            },
        ]
    },
    {
        title: 'Category',
        key: 'categories',
        render: (_, { categories }) => (
            <>
                {categories.map((category) => {
                    return (
                        <Tag color={"geekblue"} key={category}>
                            {category.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Status',
        key: 'status',
        render: (_, { status }) => (
            <Switch checkedChildren="Active" unCheckedChildren="InActive" defaultChecked={status === 1}/>
        )
    },
    {
        title: 'Supplier',
        key: 'supplier',
        dataIndex: 'supplier',
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
        name: "Lifeboy Cair 200ml",
        img : null,
        categories : ["alat mandi","sabun"],
        supplier : "CV Sumber makmur",
        status : 1
    },
    {
        id: 1,
        name: "Lifeboy Cair 200ml",
        img : null,
        categories : ["alat mandi","sabun"],
        supplier : "CV Sumber makmur",
        status : 1
    },
    {
        id: 1,
        name: "Lifeboy Cair 200ml",
        img : null,
        categories : ["alat mandi","sabun"],
        supplier : "CV Sumber makmur",
        status : 1
    },
    {
        id: 1,
        name: "Lifeboy Cair 200ml",
        img : null,
        categories : ["alat mandi","sabun"],
        supplier : "CV Sumber makmur",
        status : 1
    },
    {
        id: 1,
        name: "Lifeboy Cair 200ml",
        img : null,
        categories : ["alat mandi","sabun"],
        supplier : "CV Sumber makmur",
        status : 1
    },
]

const InvProduct = () => {
    const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);

    const onCheck = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };

    const onChange = (value) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const searchInput = useRef(null);

    return (
        <Row>
            <Col span={5} style={{paddingRight: '10px', marginTop: '47px'}}>
                <Form
                    name="basic"
                    layout={"vertical"}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item label="Supplier" name="supplier">
                        <Select
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Jack',
                                },
                                {
                                    value: 'lucy',
                                    label: 'Lucy',
                                },
                                {
                                    value: 'tom',
                                    label: 'Tom',
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label="Product Category">
                        <Tree
                            showLine={true}
                            height={233}
                            checkable
                            onCheck={onCheck}
                            checkedKeys={checkedKeys}
                            treeData={treeData}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>

            <Col span={19}>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={{span: 10, offset: 14}} style={{paddingBottom: '15px'}}>
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
            </Col>
        </Row>
    );
};

export default InvProduct;