import React, {useCallback, useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {Button, Col, Form, Input, message, Popconfirm, Row, Space, Switch} from "antd";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import InvSupplierList from "../../../../features/invSupplier/InvSupplierList";
import {deleteSupplier} from "../../../../features/invSupplier/invSupplierSlice";
import InvSupplierForm from "../../../../features/invSupplier/InvSupplierForm";

const InvSupplier = () => {
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

    const handleDelete = useCallback( async (id) => {
        await dispatch(deleteSupplier({id: id})).unwrap()
            .then(() => {
                return message.success('Operation executed')
            }).catch((error) => {
                return message.error(error.message)
            })
    },[dispatch])

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
                  dataIndex: 'contact_person',
                  key: 'contact_person'
              },
              {
                  title: 'Contact Number',
                  dataIndex: 'contact_number',
                  key: 'contact_number'
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
                <InvSupplierList columns={columns}/>
            </Col>
            <InvSupplierForm form={form} formType={formType} setVisible={setVisible} visible={visible} />
        </Row>
    );
};

export default InvSupplier;