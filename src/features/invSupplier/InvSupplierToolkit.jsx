import React, {useCallback} from 'react';
import {Button, Input, message, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {setModalType, setModalVisible} from "../invProduct/invProductSlice";
import {Debounce} from "../../config/helper";

const InvSupplierToolkit = ({form}) => {
    const dispatch = useDispatch()
    const {perPage} = useSelector(state => state.suppliers)

    const openAddModal = useCallback(() => {
        form.resetFields();
        dispatch(setModalType("ADD_FORM"))
        dispatch(setModalVisible(true))
    }, [dispatch, form]);

    const handleSearch = useCallback(async (value) => {
        try {
            console.log(value)
        } catch (e) {
            return message.error(e)
        }
    }, [])

    return (
        <Space>
            <Input.Search
                placeholder="Cari..."
                allowClear
                size="middle"
                onSearch={handleSearch}
                onChange={Debounce(handleSearch,1000)}
            />
            <Button icon={<PlusOutlined/>} type={"primary"} onClick={() => openAddModal()}>Add Data</Button>
        </Space>
    );
};

export default InvSupplierToolkit;