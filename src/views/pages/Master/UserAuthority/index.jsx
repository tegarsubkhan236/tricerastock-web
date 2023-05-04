import React, {useRef, useState} from 'react';
import UsersList from "../../../../features/msUser/MsUsersList";
import {Button, Card, Col, DatePicker, Form, Input, message, Popconfirm, Row, Space, Switch, Typography} from "antd";
import UsersForm from "../../../../features/msUser/MsUsersForm";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {deleteUser} from "../../../../features/msUser/msUsersSlice";

const Index = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const searchInput = useRef(null);
    const [visible, setVisible] = useState(false);
    const [formType, setFormType] = useState("");

    const openAddModal = () => {
        form.resetFields();
        setFormType("ADD_FORM")
        setVisible(true);
    };

    const openEditModal = (record) => {
        form.setFieldsValue(record);
        setFormType("EDIT_FORM")
        setVisible(true);
    };

    const handleDelete = async (id) => {
      await dispatch(deleteUser({id: id}));
      return message.success('Data deleted successfully')
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            responsive: ["sm"],
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ["sm"],
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => (
                <Switch checkedChildren="Active" unCheckedChildren="InActive" defaultChecked={record.id !== 3} />
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

    return (
        <div className="app-container">
            <Card
                type={"inner"}
                title={<Typography.Title level={4}>User Authority</Typography.Title>}
                style={{ marginBottom: '16px' }}
            >
                <Row>
                    <Col xs={24} sm={24} md={24} lg={12}>
                        <Button>Clear all</Button>
                        <DatePicker.RangePicker bordered={false}/>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={{ span: 8, offset: 4}}>
                        <Space>
                            <Input.Search
                                placeholder="Cari..."
                                allowClear
                                ref={searchInput}
                                size="middle"
                                onSearch={(value) => console.log(value)}
                            />
                            <Button icon={<PlusOutlined />} type={"primary"} onClick={()=>openAddModal()}>Add Data</Button>
                        </Space>
                    </Col>
                </Row>
            </Card>
            <Card>
                <UsersList columns={columns}/>
            </Card>
            <UsersForm formType={formType} form={form} setVisible={setVisible} visible={visible}/>
        </div>
    );
};

export default Index;