import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, message, Tree} from "antd";
import DebounceSelect from "../../views/components/DebounceSelect";
import {fetchSupplierByColumn} from "../invSupplier/invSupplierSlice";
import {fetchProductCategory} from "../invProductCategory/invProductCategorySlice";
import {setFilter} from "./invProductSlice";

const InvProductFilter = () => {
    const dispatch = useDispatch()
    const {data, status, currentPage, perPage} = useSelector((state) => state.productCategories);
    const {filter} = useSelector((state) => state.products);
    const [checkedNodes, setCheckedNodes] = useState([]);
    const [value, setValue] = useState([]);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProductCategory({page: currentPage, perPage}));
        }
    }, [currentPage, dispatch, perPage, status]);

    let dataSource = [];

    if (status === 'succeeded') {
        data.map((item) => (
            dataSource = [...dataSource, {
                key: item.id,
                title: item.name,
                children: item.children?.length && item.children?.map((firstChild) => ({
                    key: firstChild.id,
                    title: firstChild.name,
                    children: firstChild.children?.length && firstChild.children?.map((secondChild) => ({
                        key: secondChild.id,
                        title: secondChild.name,
                    }))
                }))
            }]
        ))
    }

    const onCheck = (_, info) => {
        const newArray = info.checkedNodes.map(({children, ...keepAttrs}) => keepAttrs)
        setCheckedNodes(newArray)
    };

    const onFinish = async (values) => {
        try {
            if (checkedNodes.length === 0) {
                return message.error("Category cannot be null")
            }
            await dispatch(setFilter({
                ...filter,
                suppliers : values.supplier !== undefined ? values.supplier : null,
                categories : checkedNodes,
                search_text : null
            }))
            await console.log(filter)
        } catch (e) {
            return console.log("error ",e)
        }
    };

    const fetchSupplierList = async (name) => {
        try {
            return await dispatch(fetchSupplierByColumn({page: 1, perPage: 5, column: {name: name}})).unwrap()
                .then((body) => body.data.results.map((item) => ({
                    label: `${item.name}`,
                    value: item.id,
                })))
        } catch (e) {
            return message.error(e.message)
        }
    }

    return (
        <Form
            name="basic"
            layout={"vertical"}
            onFinish={onFinish}
            onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
            autoComplete="off"
        >
            <Form.Item label="Supplier" name="supplier">
                <DebounceSelect
                    showSearch
                    allowClear
                    value={value}
                    placeholder="Select supplier"
                    fetchOptions={fetchSupplierList}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                />
            </Form.Item>
            <Form.Item label="Product Category">
                <Tree
                    showLine
                    checkable
                    height={233}
                    selectable={false}
                    onCheck={onCheck}
                    onSelect={onCheck}
                    treeData={dataSource}
                />
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default InvProductFilter;