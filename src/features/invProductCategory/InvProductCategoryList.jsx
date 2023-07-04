import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, message, Popconfirm, Space, Table} from "antd";
import {PaginationConfig} from "../../config/helper/tableConfig";
import {
    deleteProductCategory,
    fetchProductCategory,
    setProductCategoryCurrentPage,
    setProductCategoryModalType,
    setProductCategoryModalVisible,
    setProductCategoryPerPage,
    setProductCategorySelectedRow
} from './invProductCategorySlice';
import {DeleteOutlined, EditOutlined, EnterOutlined, PlusOutlined} from "@ant-design/icons";

const MsInvProductCategories = ({form}) => {
    const dispatch = useDispatch();
    const {
        productCategoryData,
        productCategoryTotalData,
        productCategoryStatus,
        productCategorySelectedRow,
        productCategoryCurrentPage,
        productCategoryPerPage
    } = useSelector((state) => state.productCategories);

    useEffect(() => {
        try {
            if (productCategoryStatus === "idle") {
                dispatch(fetchProductCategory({
                    page: productCategoryCurrentPage,
                    perPage: productCategoryPerPage
                })).unwrap();
            }
        } catch (e) {
            return message.error(e)
        }
    }, [productCategoryStatus]);

    const openAddChildrenModal = (record) => {
        form.setFieldsValue(record);
        dispatch(setProductCategorySelectedRow(new Set([...productCategorySelectedRow, record.key])));
        dispatch(setProductCategoryModalType("ADD_FORM"))
        dispatch(setProductCategoryModalVisible(true))
    }

    const openEditModal = (record) => {
        form.setFieldsValue(record);
        dispatch(setProductCategoryModalType("EDIT_FORM"))
        dispatch(setProductCategoryModalVisible(true))
    }

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteProductCategory({id: id})).unwrap()
            await dispatch(setProductCategoryCurrentPage(1))
            return message.success('Operation executed')
        } catch (e) {
            await dispatch(setProductCategoryCurrentPage(1))
            return message.error(e.message)
        }
    }

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

    const pagination = PaginationConfig(
        productCategoryCurrentPage,
        productCategoryPerPage,
        productCategoryTotalData,
        (current, size) => dispatch(setProductCategoryPerPage(size)),
        (page) => dispatch(setProductCategoryCurrentPage(page))
    )

    return (
        <Table
            loading={productCategoryStatus === 'loading'}
            dataSource={productCategoryData}
            columns={columns}
            pagination={pagination}
            scroll={{ x: true }}
            bordered
            expandable={{
                productCategorySelectedRow,
                onExpandedRowsChange: (expandedRows) => {
                    dispatch(setProductCategorySelectedRow(expandedRows));
                },
            }}
        />
    );
};

export default MsInvProductCategories;