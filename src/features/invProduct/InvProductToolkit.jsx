import React, {useCallback, useMemo} from 'react';
import {Dropdown, Input, message, Space} from "antd";
import {PlusOutlined, UserOutlined} from "@ant-design/icons";
import {fetchProductByFilter, setFilter, setModalType, setModalVisible} from "./invProductSlice";
import {useDispatch, useSelector} from "react-redux";
import {Debounce} from "../../config/helper";

const InvProductToolkit = ({form}) => {
    const dispatch = useDispatch()
    const {filter, perPage} = useSelector(state => state.products)

    const openAddModal = useCallback(() => {
        form.resetFields();
        dispatch(setModalType("ADD_FORM"))
        dispatch(setModalVisible(true))
    }, [dispatch, form]);

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
                onChange={Debounce(handleSearch,1000)}
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