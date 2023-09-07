import React, {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Dropdown, Input, message, Popconfirm, Space} from "antd";
import {DeleteOutlined, DownloadOutlined, EditOutlined, ImportOutlined, PlusOutlined} from "@ant-design/icons";
import {deleteUser, fetchDetailUsers, setUserFilter, setUserModalType, setUserModalVisible} from "../usersSlice";
import {Debounce} from "../../../../config/helper/debounce";
import {exportExcel} from "../../../../config/lib/exportExcel";

const UsersToolkit = ({form}) => {
    const dispatch = useDispatch();
    const {userSelectedRow, userFilter} = useSelector(state => state.users)

    const openModal = (modalType) => {
        if (modalType === "ADD_FORM") {
            form.resetFields();
            dispatch(setUserModalType("ADD_FORM"))
        }
        if (modalType === "EDIT_FORM") {
            dispatch(fetchDetailUsers({id: userSelectedRow[0]})).unwrap().then((item) => {
                form.setFieldsValue(item.data);
            })
            dispatch(setUserModalType("EDIT_FORM"))
        }
        if (modalType === "ADD_BATCH_FORM") {
            dispatch(setUserModalType("ADD_BATCH_FORM"))
        }
        if (modalType === "EDIT_BATCH_FORM") {
            dispatch(setUserModalType("EDIT_BATCH_FORM"))
        }
        dispatch(setUserModalVisible(true))
    };

    const handleDelete = async () => {
        try {
            await dispatch(deleteUser({id: userSelectedRow})).unwrap();
            return message.success('Data deleted successfully')
        } catch (e){
            console.log(e)
            return message.error(e)
        }
    }

    const handleSearch = async (value) => {
        try {
            console.log(value)
            await dispatch(setUserFilter({...userFilter, "username": value?.target?.value ?? value}))
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
                const columnTemplate = ["No"]
                const dataTemplate = [[1]]
                await exportExcel(columnTemplate, dataTemplate,  "Add Batch Product", "Add Batch Product")
            }
            if (key === "add_batch_data"){
                openModal("ADD_BATCH_FORM")
            }
        }, []),
    };

    return (
        <Space>
            <Input.Search placeholder="Cari..." allowClear size="middle" onSearch={handleSearch} onChange={Debounce(handleSearch,1000)}/>
            <Popconfirm title="Delete data" description="Are you sure to delete this data?" onConfirm={() => handleDelete()} okText="Do it" cancelText="No">
                <Button icon={<DeleteOutlined/>} danger loading={userSelectedRow.length <= 0}>
                    Delete {userSelectedRow.length > 0 ? `${userSelectedRow.length} items` : ''}
                </Button>
            </Popconfirm>
            <Button loading={userSelectedRow.length !== 1} onClick={() =>  openModal("EDIT_FORM")}>
                <EditOutlined/> Update Single Data
            </Button>
            <Dropdown.Button menu={addMenuProps} onClick={() => openModal("ADD_FORM")}>
                <PlusOutlined/> Add Single Data
            </Dropdown.Button>
        </Space>
    );
};

export default UsersToolkit;