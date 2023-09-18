import {Button, Dropdown, Input, Popconfirm, Space} from "antd";
import {DeleteOutlined, DownloadOutlined, EditOutlined, ImportOutlined, PlusOutlined} from "@ant-design/icons";
import {deleteSupplier, fetchTemplateSupplier, setSupplierModalType, setSupplierModalVisible} from "../supplierSlice";
import {useDispatch} from "react-redux";
import {useContext} from "react";
import {SupplierTableContext} from "./index";
import {exportExcel} from "../../../../config/exportExcel";
import {Debounce} from "../../../../config";

const SupplierToolkit = () => {
    const dispatch = useDispatch()
    const {
        setCurrentPage,
        selectedRow,
        setSelectedRow,
        setFilter,
        filter,
        setErrorMessage,
        setSuccessMessage,
    } = useContext(SupplierTableContext);

    const openModal = (modalType) => {
        dispatch(setSupplierModalType(modalType));
        dispatch(setSupplierModalVisible(true));
    };

    const handleDelete = async () => {
        try {
            await dispatch(deleteSupplier({id: selectedRow})).unwrap()
            await setSelectedRow([])
            await setCurrentPage(1)
            await setSuccessMessage(["Data has been deleted"])
        } catch (e) {
            await setCurrentPage(1)
            await setErrorMessage([e?.response?.data?.message ?? e.message])
        }
    }

    const handleSearch = (value) => {
        setFilter({
            ...filter,
            "name": value?.target?.value ?? value
        })
    };

    const addMenuProps = {
        items: [
            {label: "Download Template", key: "download_add_template", icon: <DownloadOutlined/>},
            {label: "Add Batch Data", key: "add_batch_data", icon: <ImportOutlined/>},
        ],
        onClick: async ({key}) => {
            if (key === "download_add_template"){
                const columnTemplate = ["No", "Supplier", "Address", "Contact Person", "Contact Number"]
                const dataTemplate = [[1, "CV Abadi Jaya", "Jl", "Mike", "089000000000"]]
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
                if (key === "download_edit_template" && selectedRow.length <= 1) {
                    return  setErrorMessage(["Select at least 2 rows to download template"])
                }
                if (key === "download_edit_template") {
                    const selectedData = await dispatch(fetchTemplateSupplier({ ids: selectedRow })).unwrap();
                    const dataTemplate = selectedData.data.results.map((item) => [
                        item.id,
                        item.name,
                        item.address,
                        item.contact_person,
                        item.contact_number,
                        item.status,
                    ]);
                    const columnTemplate = [
                        "ID",
                        "Supplier",
                        "Address",
                        "Contact Person",
                        "Contact Number",
                        "Status",
                    ];
                    await exportExcel(columnTemplate, dataTemplate, "Edit Batch Supplier", "Edit Batch Supplier");
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
            <Input.Search
                placeholder="Cari..."
                allowClear
                size="middle"
                onSearch={handleSearch}
                onChange={Debounce(handleSearch,1000)}
            />
            <Popconfirm
                title="Delete data"
                description="Are you sure to delete this data?"
                onConfirm={() => handleDelete()}
                okText="Do it"
                cancelText="No"
            >
                <Button
                    icon={<DeleteOutlined/>}
                    danger
                    loading={selectedRow.length <= 0}
                >
                    Delete {selectedRow.length > 0 ? `${selectedRow.length} items` : ''}
                </Button>
            </Popconfirm>
            <Dropdown.Button
                icon={<EditOutlined/>}
                loading={selectedRow.length !== 1}
                menu={editMenuProps}
                onClick={() => openModal("EDIT_FORM")}
            >
                Update Single Data
            </Dropdown.Button>
            <Dropdown.Button
                icon={<PlusOutlined/>}
                menu={addMenuProps}
                onClick={() => openModal("ADD_FORM")}
            >
                Add Single Data
            </Dropdown.Button>
        </Space>
    );
};

export default SupplierToolkit;