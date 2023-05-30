import React, {useCallback, useMemo} from 'react';
import {Dropdown, Input, Space} from "antd";
import {PlusOutlined, UserOutlined} from "@ant-design/icons";
import {setFilter, setModalType, setModalVisible} from "./invProductSlice";
import {useDispatch, useSelector} from "react-redux";

const InvProductToolkit = ({form}) => {
    const dispatch = useDispatch()
    const {filter} = useSelector(state => state.products)

    const openAddModal = useCallback(() => {
        form.resetFields();
        dispatch(setModalType("ADD_FORM"))
        dispatch(setModalVisible(true))
    }, [dispatch, form]);

    const handleSearch = useCallback(async (value) => {
        try {
            await dispatch(setFilter({...filter, "search_text": value}))
        } catch (e) {
            return console.log("error ", e)
        }
    }, [dispatch, filter])

    const items = useMemo(() => [
        {
            label: "Download Template", key: "download_template", icon: <UserOutlined/>,
        }, {
            label: "Import Data", key: "import_data", icon: <UserOutlined/>,
        },
    ], []);

    const menuProps = {
        items, onClick: (e) => console.log(e),
    };

    return (
        <Space>
            <Input.Search
                placeholder="Cari..."
                allowClear
                size="middle"
                onSearch={handleSearch}
            />
            <Dropdown.Button disabled={filter.suppliers === null && (filter.categories == null || true)}
                             menu={menuProps}
                             icon={<PlusOutlined/>}
                             type={"primary"}
                             onClick={openAddModal}
            >
                Add Data
            </Dropdown.Button>
        </Space>
    );
};

export default InvProductToolkit;