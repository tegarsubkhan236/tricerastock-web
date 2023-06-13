import React, {useCallback, useMemo} from 'react';
import {Button, Dropdown, Input, message, Space} from "antd";
import {DeleteOutlined, DownloadOutlined, EditOutlined, ImportOutlined, PlusOutlined,} from "@ant-design/icons";
import {deleteProduct, fetchProductByFilter, setCurrentPage, setFilter, setModalType, setModalVisible} from "./invProductSlice";
import {useDispatch, useSelector} from "react-redux";
import {Debounce} from "../../config/helper/debounce";

const InvProductToolkit = ({form}) => {
    const dispatch = useDispatch()

    const {filter, perPage, selectedRow} = useSelector(state => state.products)

    const openAddModal = useCallback(() => {
        form.resetFields();
        dispatch(setModalType("ADD_FORM"))
        dispatch(setModalVisible(true))
    }, [dispatch, form]);

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

    const handleSearch = useCallback(async (value) => {
        try {
            await dispatch(setFilter({...filter, "search_text": value?.target?.value ?? value}))
            await dispatch(fetchProductByFilter({
                page: 1,
                perPage: perPage,
                supplier_id: filter.suppliers?.key,
                category_id: filter.categories?.map(({key}) => `${key}`).join(','),
                search_text: value?.target?.value ?? value
            })).unwrap()
        } catch (e) {
            return message.error(e)
        }
    }, [dispatch, filter, perPage])

    const addMenuProps = {
        items: useMemo(() => [
            {
                label: "Download Template", key: "download_add_template", icon: <DownloadOutlined/>,
            }, {
                label: "Add Batch Data", key: "add_batch_data", icon: <ImportOutlined/>,
            },
        ], []),
        onClick: (e) => console.log(e),
    };

    const editMenuProps = {
        items: useMemo(() => [
            {
                label: "Download Template", key: "download_edit_template", icon: <DownloadOutlined/>,
            }, {
                label: "Edit Batch Data", key: "edit_batch_data", icon: <ImportOutlined/>,
            },
        ], []),
        onClick: (e) => console.log(e),
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
            <Button icon={<DeleteOutlined/>}
                    danger
                    disabled={selectedRow.length <= 0}
                    onClick={handleDelete}
            >
                Delete {selectedRow.length > 0 ? `${selectedRow.length} items` : ''}
            </Button>
            <Dropdown.Button disabled={selectedRow.length !== 1 || filter.suppliers === null}
                             menu={editMenuProps}
                             onClick={openEditModal}
            >
                <EditOutlined/> Update Single Data
            </Dropdown.Button>
            <Dropdown.Button menu={addMenuProps}
                             onClick={openAddModal}
            >
                <PlusOutlined/> Add Single Data
            </Dropdown.Button>
        </Space>
    );
};

export default InvProductToolkit;