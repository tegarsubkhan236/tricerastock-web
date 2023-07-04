import React, {useCallback, useMemo} from 'react';
import {Button, Dropdown, Input, message, Popconfirm, Space} from "antd";
import {DeleteOutlined, DownloadOutlined, EditOutlined, ImportOutlined, PlusOutlined,} from "@ant-design/icons";
import {
    deleteProduct,
    setProductCurrentPage,
    setProductFilter,
    setProductModalType,
    setProductModalVisible,
} from "./invProductSlice";
import {useDispatch, useSelector} from "react-redux";
import {Debounce} from "../../config/helper/debounce";
import {exportExcel} from "../../config/lib/exportExcel";

const InvProductToolkit = ({form}) => {
    const dispatch = useDispatch()

    const {productFilter, productSelectedRow} = useSelector(state => state.products)

    const openModal = (modalType, record = null) => {
        if (modalType === "ADD_FORM") {
            form.resetFields();
            dispatch(setProductModalType("ADD_FORM"))
        }
        if (modalType === "EDIT_FORM") {
            form.setFieldsValue(record);
            dispatch(setProductModalType("EDIT_FORM"))
        }
        if (modalType === "ADD_BATCH_FORM") {
            dispatch(setProductModalType("ADD_BATCH_FORM"))
        }
        if (modalType === "EDIT_BATCH_FORM") {
            dispatch(setProductModalType("EDIT_BATCH_FORM"))
        }
        dispatch(setProductModalVisible(true))
    };

    const handleDelete = async () => {
        try {
            await dispatch(deleteProduct({id: productSelectedRow})).unwrap()
            return message.success('Operation executed')
        } catch (e) {
            await dispatch(setProductCurrentPage(1))
            return message.error(e?.response?.data?.message ?? e.message)
        }
    }

    const handleSearch = async (value) => {
        try {
            await dispatch(setProductFilter({...productFilter, "search_text": value?.target?.value ?? value}))
        } catch (e) {
            return message.error(e)
        }
    };

    const addMenuProps = {
        items: useMemo(() => [
            {label: "Download Template", key: "download_add_template", icon: <DownloadOutlined/>},
            {label: "Add Batch Data", key: "add_batch_data", icon: <ImportOutlined/>},
        ], []),
        onClick: useCallback(async ({key}) => {
            if (key === "download_add_template"){
                const columnTemplate = ["No", "Product Name", "Product Price", "Product Category ID", "Supplier ID"]
                const dataTemplate = [[1, "Ale-ale", 1000, 1, 1]]
                await exportExcel(columnTemplate, dataTemplate,  "Add Batch Product", "Add Batch Product")
            }
            if (key === "add_batch_data"){
                openModal("ADD_BATCH_FORM")
            }
        }, []),
    };

    const editMenuProps = {
        items: useMemo(() => [
            {label: "Download Template", key: "download_edit_template", icon: <DownloadOutlined/>},
            {label: "Edit Batch Data", key: "edit_batch_data", icon: <ImportOutlined/>},
        ], []),
        onClick:  useCallback(async ({key}) => {
            if (key === "download_edit_template"){
                const columnTemplate = ["No", "Product Name", "Product Price", "Product Category", "Supplier Name"]
                const dataTemplate = [[1, "Ale-ale", 1000, "drink", "Michael"]]
                await exportExcel(columnTemplate, dataTemplate,  "Add Batch Product", "Add Batch Product")
            }
            if (key === "edit_batch_data"){
                openModal("EDIT_BATCH_FORM")
            }
        }, []),
    };

    return (
        <Space>
            <Input.Search placeholder="Cari..." allowClear size="middle" onSearch={handleSearch} onChange={Debounce(handleSearch,1000)}/>
            <Popconfirm title="Delete data"
                        description="Are you sure to delete this data?"
                        onConfirm={() => handleDelete()}
                        okText="Do it"
                        cancelText="No"
            >
                <Button icon={<DeleteOutlined/>} danger loading={productSelectedRow.length <= 0}>
                    Delete {productSelectedRow.length > 0 ? `${productSelectedRow.length} items` : ''}
                </Button>
            </Popconfirm>
            <Dropdown.Button loading={productSelectedRow.length !== 1} menu={editMenuProps} onClick={() => openModal("EDIT_FORM")}>
                <EditOutlined/> Update Single Data
            </Dropdown.Button>
            <Dropdown.Button menu={addMenuProps} onClick={() => openModal("ADD_FORM")}>
                <PlusOutlined/> Add Single Data
            </Dropdown.Button>
        </Space>
    );
};

export default InvProductToolkit;