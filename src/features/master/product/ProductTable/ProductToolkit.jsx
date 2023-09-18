import React from "react"
import {Button, Dropdown, message, Popconfirm, Space} from "antd";
import {
    DeleteOutlined,
    DownloadOutlined,
    EditOutlined,
    EyeOutlined,
    ImportOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import {deleteProduct, setProductCurrentPage, setProductModalType, setProductModalVisible,} from "../productSlice";
import {useDispatch, useSelector} from "react-redux";
import {exportExcel} from "../../../../config/exportExcel";

const ProductToolkit = ({form}) => {
    const dispatch = useDispatch()

    const {productSelectedRow} = useSelector(state => state.products)

    const handleDelete = async () => {
        try {
            await dispatch(deleteProduct({id: productSelectedRow})).unwrap()
            return message.success('Operation executed')
        } catch (e) {
            await dispatch(setProductCurrentPage(1))
            return message.error(e?.response?.data?.message ?? e.message)
        }
    }

    const detailMenuProps = {
        items: [
            {label: "Price History", key: "price_history", icon: <DownloadOutlined/>},
            {label: "Stock History", key: "stock_history", icon: <ImportOutlined/>},
        ],
        onClick: async ({key}) => {
            if (key === "price_history") {
                openModal("PRICE_HISTORY_FORM")
            }
            if (key === "stock_history") {
                openModal("STOCK_HISTORY_FORM")
            }
        },
    };

    const addMenuProps = {
        items: [
            {label: "Download Template", key: "download_add_template", icon: <DownloadOutlined/>},
            {label: "Add Batch Data", key: "add_batch_data", icon: <ImportOutlined/>},
        ],
        onClick: async ({key}) => {
            if (key === "download_add_template") {
                const columnTemplate = ["No", "Product Name", "Product Price", "Product Category ID", "Supplier ID"]
                const dataTemplate = [[1, "Ale-ale", 1000, 1, 1]]
                await exportExcel(columnTemplate, dataTemplate, "Add Batch Product", "Add Batch Product")
            }
            if (key === "add_batch_data") {
                openModal("ADD_BATCH_FORM")
            }
        },
    };

    const editMenuProps = {
        items: [
            {label: "Download Template", key: "download_edit_template", icon: <DownloadOutlined/>},
            {label: "Edit Batch Data", key: "edit_batch_data", icon: <ImportOutlined/>},
        ],
        onClick: async ({key}) => {
            if (key === "download_edit_template") {
                const columnTemplate = ["No", "Product Name", "Product Price", "Product Category", "Supplier Name"]
                const dataTemplate = [[1, "Ale-ale", 1000, "drink", "Michael"]]
                await exportExcel(columnTemplate, dataTemplate, "Add Batch Product", "Add Batch Product")
            }
            if (key === "edit_batch_data") {
                openModal("EDIT_BATCH_FORM")
            }
        },
    };

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
        if (modalType === "PRICE_HISTORY_FORM") {
            dispatch(setProductModalType("PRICE_HISTORY_FORM"))
        }
        if (modalType === "STOCK_HISTORY_FORM") {
            dispatch(setProductModalType("STOCK_HISTORY_FORM"))
        }
        dispatch(setProductModalVisible(true))
    };

    return (
        <Space>
            <Popconfirm title="Delete data"
                        description="Are you sure to delete this data?"
                        onConfirm={() => handleDelete()}
                        okText="Do it"
                        cancelText="No"
            >
                <Button icon={<DeleteOutlined/>} disabled={productSelectedRow.length <= 0} danger>
                    Delete {productSelectedRow.length > 0 ? `${productSelectedRow.length} items` : ''}
                </Button>
            </Popconfirm>
            <Dropdown menu={detailMenuProps} disabled={productSelectedRow.length !== 1}>
                <Button icon={<EyeOutlined/>} size={"middle"}>Get Detail Product</Button>
            </Dropdown>
            <Dropdown.Button icon={<EditOutlined/>}
                             loading={productSelectedRow.length !== 1}
                             menu={editMenuProps}
                             onClick={() => openModal("EDIT_FORM")}
            >
                Update Single Data
            </Dropdown.Button>
            <Dropdown.Button icon={<PlusOutlined/>}
                             menu={addMenuProps}
                             onClick={() => openModal("ADD_FORM")}
            >
                Add Single Data
            </Dropdown.Button>
        </Space>
    );
};

export default ProductToolkit;