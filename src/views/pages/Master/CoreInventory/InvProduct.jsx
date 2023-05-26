import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, Col, Form, Input, message, Popconfirm, Row, Space, Switch, Tag} from "antd";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import InvProductFilter from "../../../../features/invProduct/InvProductFilter";
import MsInvProductList from "../../../../features/invProduct/InvProductList";
import {setCurrentPage} from "../../../../features/invProductCategory/invProductCategorySlice";
import {deleteProduct, setFilter} from "../../../../features/invProduct/invProductSlice";

const InvProduct = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [formType, setFormType] = useState("");
    const {filter} = useSelector(state => state.products)
    
    const openAddModal = useCallback(() => {
        form.resetFields();
        setFormType("ADD_FORM")
        setVisible(true);
    }, [form]);
    
    const openEditModal = useCallback((record) => {
        form.setFieldsValue(record);
        setFormType("EDIT_FORM")
        setVisible(true);
    },[form]);

    const handleDelete = useCallback( async (id) => {
        try {
            await dispatch(deleteProduct({id: id})).unwrap()
            await dispatch(setCurrentPage(1))
            return message.success('Operation executed')
        } catch (e) {
            await dispatch(setCurrentPage(1))
            return message.error(e.message)
        }
    },[dispatch])

    const handleSearch = useCallback(async (value) => {
        try {
            await dispatch(setFilter({...filter, "search_text": value}))
            await console.log(filter)
        } catch (e) {
            return console.log("error ", e)
        }
    },[dispatch, filter])
    
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
            render: (_, {categories}) => (
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
            render: (_, {status}) => (
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
    
    return (
        <Row>
            <Col span={5} style={{paddingRight: '10px', marginTop: '47px'}}>
                <InvProductFilter/>
            </Col>

            <Col span={19}>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={{span: 10, offset: 14}} style={{paddingBottom: '15px'}}>
                        <Space>
                            <Input.Search
                                placeholder="Cari..."
                                allowClear
                                size="middle"
                                onSearch={handleSearch}
                            />
                            <Button icon={<PlusOutlined/>} type={"primary"} onClick={() => openAddModal()}>Add Data</Button>
                        </Space>
                    </Col>
                    <Col span={24}>
                        <MsInvProductList columns={columns}/>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default InvProduct;