import React, {useCallback, useState} from 'react';
import {Button, Col, Form, message, Popconfirm, Row, Space} from "antd";
import {DeleteOutlined, EditOutlined, EnterOutlined, PlusOutlined} from "@ant-design/icons";
import MsInvProductCategoriesList from "../../../../features/msInvProductCategory/MsInvProductCategoriesList";
import {useDispatch} from "react-redux";
import MsInvProductCategoriesForm from "../../../../features/msInvProductCategory/MsInvProductCategoriesForm";
import {deleteProductCategory, setCurrentPage} from "../../../../features/msInvProductCategory/msInvProductCategorySlice";

const InvProductCategory = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [formType, setFormType] = useState("");
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    const openAddParentModal = useCallback(() => {
        form.resetFields();
        setFormType("ADD_FORM")
        setVisible(true);
    }, [form]);

    const openAddChildrenModal = useCallback((record) => {
        setExpandedRowKeys(new Set([...expandedRowKeys, record.key]))
        form.setFieldsValue(record);
        setFormType("ADD_FORM")
        setVisible(true);
    },[expandedRowKeys, form]);

    const openEditModal = useCallback((record) => {
        form.setFieldsValue(record);
        setFormType("EDIT_FORM")
        setVisible(true);
    },[form]);

    const handleDelete = useCallback(async (id) => {
        await dispatch(deleteProductCategory({id: id})).then(() => {
            dispatch(setCurrentPage(1))
        });
        return message.success('Data deleted successfully')
    },[dispatch])

    const columns = [
        {
            title: 'Category',
            dataIndex: 'name',
            key: 'name',
            render: (value, record) => (
                <>
                    {record.parent_id !== null && <EnterOutlined />}
                    <div>{value}</div>
                </>
            ),
            onCell: (record, rowIndex) => {
                return {
                    onClick: () => {
                        console.log(record, rowIndex);
                    }
                };
            }
        },
        {
            title: 'Add a Child',
            key: 'add',
            render: (record) => typeof record.children !== "undefined" &&
                <Button icon={<PlusOutlined/>} shape={"circle"} onClick={() => openAddChildrenModal(record)}/>,
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
            <Col xs={24} sm={24} md={24} lg={{span: 3, offset: 21}} style={{paddingBottom: '15px'}}>
                <Button icon={<PlusOutlined/>} type={"primary"} onClick={() => openAddParentModal()}>Add Data</Button>
            </Col>
            <Col span={24}>
                <MsInvProductCategoriesList
                    columns={columns}
                    setExpandedRowKeys={setExpandedRowKeys}
                    expandedRowKeys={expandedRowKeys}
                />
            </Col>
            <MsInvProductCategoriesForm
                form={form}
                formType={formType}
                setVisible={setVisible}
                visible={visible}
            />
        </Row>
    );
};

export default InvProductCategory;