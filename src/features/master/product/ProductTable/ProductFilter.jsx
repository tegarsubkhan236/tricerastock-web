import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Input, message, Tree} from "antd";
import DebounceSelect from "../../../../views/components/DebounceSelect";
import {fetchSupplier} from "../../supplier/supplierSlice";
import {fetchProductCategory} from "../../productCategory/productCategorySlice";
import {setProductFilter} from "../productSlice";
import {Debounce} from "../../../../config";

const ProductFilter = () => {
    const dispatch = useDispatch()
    const {productCategoryData} = useSelector((state) => state.productCategories);
    const {productFilter} = useSelector((state) => state.products);
    const [checkedNodes, setCheckedNodes] = useState([]);
    const [value, setValue] = useState([]);

    useEffect(() => {
        try {
            dispatch(fetchProductCategory({ page: 1, perPage: 999 })).unwrap();
        } catch (e) {
            return message.error(e)
        }
    }, [dispatch]);

    const onCheck = (_, info) => {
        const newArray = info.checkedNodes.map(({children, ...keepAttrs}) => keepAttrs)
        setCheckedNodes(newArray)
    };

    const onFinish = async (values) => {
        try {
            if (checkedNodes.length === 0) {
                return message.error("Category cannot be null")
            }
            await dispatch(setProductFilter({
                ...productFilter,
                suppliers : values.supplier !== undefined ? values.supplier : null,
                search_text: values.search_text,
                categories : checkedNodes,
            }))
        } catch (e) {
            console.log(e)
        }
    };

    const handleSearch = async (value) => {
        try {
            await dispatch(setProductFilter({...productFilter, search_text: value?.target?.value ?? value}))
        } catch (e) {
            return message.error(e)
        }
    };

    const fetchSupplierList = async (name) => {
        try {
            return await dispatch(fetchSupplier({page: 1, perPage: 5, column: {name: name}})).unwrap()
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
            <Form.Item label="Search Product" name="search_text">
                <Input.Search
                    placeholder="Cari..."
                    allowClear
                    size="middle"
                    onSearch={onFinish}
                    onChange={Debounce(handleSearch,1000)}
                />
            </Form.Item>
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
                    treeData={productCategoryData}
                    defaultCheckedKeys={productFilter.categories?.map(value => value.key)}
                    defaultExpandedKeys={productFilter.categories?.map(value => value.key)}
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

export default ProductFilter;