import {Button, Dropdown, Input, message, Popconfirm, Space} from "antd";
import {DeleteOutlined, DownloadOutlined, EditOutlined, ImportOutlined, PlusOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {Debounce} from "../../../config/helper/debounce";
import {exportExcel} from "../../../config/lib/exportExcel";
import {
    deleteSupplier,
    fetchTemplateSupplier,
    setSupplierCurrentPage,
    setSupplierFilter,
    setSupplierModalType,
    setSupplierModalVisible
} from "./msSupplierSlice";

const MsSupplierToolkit = () => {
    const dispatch = useDispatch()
    const {supplierSelectedRow, supplierFilter} = useSelector((state) => state.suppliers)

    const openModal = async (modalType) => {
        try {
            if (modalType === "ADD_FORM") {
                dispatch(setSupplierModalType("ADD_FORM"))
            }
            if (modalType === "EDIT_FORM") {
                dispatch(setSupplierModalType("EDIT_FORM"))
            }
            if (modalType === "ADD_BATCH_FORM") {
                dispatch(setSupplierModalType("ADD_BATCH_FORM"))
            }
            if (modalType === "EDIT_BATCH_FORM") {
                dispatch(setSupplierModalType("EDIT_BATCH_FORM"))
            }
            dispatch(setSupplierModalVisible(true))
        } catch (e) {
            console.error(e)
        }
    };

    const handleDelete = async () => {
        try {
            await dispatch(deleteSupplier({id: supplierSelectedRow})).unwrap()
            return message.success('Operation executed')
        } catch (e) {
            await dispatch(setSupplierCurrentPage(1))
            return message.error(e?.response?.data?.message ?? e.message)
        }
    }

    const handleSearch = async (value) => {
        try {
            await dispatch(setSupplierFilter({
                ...supplierFilter,
                "name": value?.target?.value ?? value
            }))
        } catch (e) {
            return message.error(e)
        }
    };

    const addMenuProps = {
        items: [
            {label: "Download Template", key: "download_add_template", icon: <DownloadOutlined/>},
            {label: "Add Batch Data", key: "add_batch_data", icon: <ImportOutlined/>},
        ],
        onClick: async ({key}) => {
            if (key === "download_add_template"){
                const columnTemplate = ["No", "Supplier", "Address", "Contact Person", "Contact Number"]
                const dataTemplate = [[1, "CV Abadi Jaya Sentosa", "Jl Kenangan", "Suyanto", "089000000000"]]
                await exportExcel(columnTemplate, dataTemplate,  "Add Batch Supplier", "Add Batch Supplier")
            }
            if (key === "add_batch_data"){
                await openModal("ADD_BATCH_FORM")
            }
        }
    };

    const editMenuProps = {
        items: [
            {label: "Download Template", key: "download_edit_template", icon: <DownloadOutlined/>},
            {label: "Edit Batch Data", key: "edit_batch_data", icon: <ImportOutlined/>},
        ],
        onClick:  async ({key}) => {
            try {
                if (key === "download_edit_template"){
                    if (supplierSelectedRow.length <= 1){
                        return message.error("Select at least 2 rows to download template")
                    } else {
                        const selectedData = await dispatch(fetchTemplateSupplier({ids: supplierSelectedRow})).unwrap()
                        const dataTemplate = selectedData.data.results.map(item => [
                            item.id,
                            item.name,
                            item.address,
                            item.contact_person,
                            item.contact_number,
                            item.status
                        ])
                        const columnTemplate = ["ID", "Supplier", "Address", "Contact Person", "Contact Number", "Status"]
                        await exportExcel(columnTemplate, dataTemplate,  "Edit Batch Supplier", "Edit Batch Supplier")
                    }
                }
                if (key === "edit_batch_data"){
                    await openModal("EDIT_BATCH_FORM")
                }
            } catch (e) {
                console.log(e)
            }
        },
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
                <Button icon={<DeleteOutlined/>} danger loading={supplierSelectedRow.length <= 0}>
                    Delete {supplierSelectedRow.length > 0 ? `${supplierSelectedRow.length} items` : ''}
                </Button>
            </Popconfirm>
            <Dropdown.Button icon={<EditOutlined/>} loading={supplierSelectedRow.length !== 1} menu={editMenuProps} onClick={() => openModal("EDIT_FORM")}>
                Update Single Data
            </Dropdown.Button>
            <Dropdown.Button icon={<PlusOutlined/>} menu={addMenuProps} onClick={() => openModal("ADD_FORM")}>
                Add Single Data
            </Dropdown.Button>
        </Space>
    );
};

export default MsSupplierToolkit;