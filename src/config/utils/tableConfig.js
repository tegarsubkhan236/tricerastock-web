import {useDispatch} from "react-redux";
import React, {useCallback} from "react";
import {Button, message, Popconfirm, Space} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {currencyFormatter} from "./currency";

export const PaginationConfig = (current, pageSize, total, onShowSizeChange, onChange) => {
    const dispatch = useDispatch()

    return {
        current: current,
        pageSize: pageSize,
        total: total - pageSize,
        showSizeChanger: true,
        hideOnSinglePage: true,
        showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${currencyFormatter(total)} entries`,
        onShowSizeChange: (current, size) => dispatch(onShowSizeChange(size)),
        onChange: (page) => dispatch(onChange(page)),
    }
}

export const ColumnConfig = (column, form, setModalType, setModalVisible, deleteProduct, setCurrentPage) => {
    const dispatch = useDispatch()

    const openEditModal = useCallback((record) => {
        form.setFieldsValue(record);
        dispatch(setModalType("EDIT_FORM"))
        dispatch(setModalVisible(true))
    },[dispatch, form, setModalType, setModalVisible]);

    const handleDelete = useCallback( async (id) => {
        try {
            await dispatch(deleteProduct({id: id})).unwrap()
            await dispatch(setCurrentPage(1))
            return message.success('Operation executed')
        } catch (e) {
            await dispatch(setCurrentPage(1))
            return message.error(e?.response?.data?.message ?? e.message)
        }
    },[deleteProduct, dispatch, setCurrentPage])

    column.push({
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
    })

    return column
}