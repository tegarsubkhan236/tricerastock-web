import React, {useCallback} from 'react';
import {Avatar, Button, message, Popconfirm, Space, Switch, Table, Tag} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {deleteProduct, setModalType, setModalVisible} from "./invProductSlice";
import {setCurrentPage} from "../invProductCategory/invProductCategorySlice";
import {useDispatch, useSelector} from "react-redux";

const InvProductList = ({form}) => {
    const dispatch = useDispatch()
    const {data} = useSelector(state => state.products)

    const openEditModal = useCallback((record) => {
        form.setFieldsValue(record);
        dispatch(setModalType("EDIT_FORM"))
        dispatch(setModalVisible(true))
    },[dispatch, form]);

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
                <Space size={[0, 8]} wrap>
                    {categories.map((category) => {
                        return (
                            <Tag color={"geekblue"} key={category}>
                                {category.toUpperCase()}
                            </Tag>
                        );
                    })}
                </Space>
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
        <Table
            dataSource={data}
            columns={columns}
            scroll={{x: true}}
            bordered
        />
    );
};

export default InvProductList;