import React, {useCallback, useState} from 'react';
import {Col, Form, Input, InputNumber, message, Modal, Row, Space, Tag, TreeSelect} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {postProduct, setModalVisible} from "./invProductSlice";
import {currencyFormatter, currencyParser} from "../../config/utils/currency";
import DebounceSelect from "../../views/components/DebounceSelect";
import {fetchSupplierByColumn} from "../invSupplier/invSupplierSlice";

const InvProductForm = ({form}) => {
    const dispatch = useDispatch();
    const {status, modalVisible, modalType} = useSelector((state) => state.products);
    const {treeData} = useSelector((state) => state.productCategories);
    const [supplierID, setSupplierID] = useState([]);
    const [categoryID, setCategoryID] = useState([]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        form.validateFields().then(async (values) => {
            try {
                if (modalType === "ADD_FORM") {
                    await dispatch(postProduct({
                        name: values.name,
                        cost: values.initial_cost,
                        description: values.description,
                        inv_supplier_id: values.supplierID.key,
                        inv_product_category: values.productCategoryID.map(val => ({id: val}))
                    })).unwrap()
                }
                if (modalType === "EDIT_FORM") {
                    console.log("EDIT_FORM", values)
                }

                dispatch(setModalVisible(false))
                return message.success('Operation executed')
            } catch (e) {
                dispatch(setModalVisible(false))
                return message.error(e?.response?.data?.message ?? e.message)
            }
        })
    }, [dispatch, form, modalType]);

    const handleClose = useCallback((e) => {
        e.preventDefault()
        dispatch(setModalVisible(false))
    }, [dispatch])

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

    return (<Modal
        destroyOnClose
        centered
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={handleClose}
        confirmLoading={status === 'loading'}
        okButtonProps={{form: 'editor-form', htmlType: 'submit'}}
        title={modalType === "EDIT_FORM" ? "Edit Product" : "Add Product"}
    >
        <Form id='editor-form' form={form} layout={"vertical"}>
            <Form.Item name="id" hidden>
                <Input/>
            </Form.Item>
            <Row gutter={24}>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <Form.Item name="supplierID"
                               rules={[{required: true, message: 'Please input your Supplier'}]}
                               label="Supplier"
                    >
                        <DebounceSelect
                            showSearch
                            allowClear
                            value={supplierID}
                            placeholder="Please Select supplier"
                            fetchOptions={fetchSupplierList}
                            onChange={(newValue) => setSupplierID(newValue)}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <Form.Item name="productCategoryID"
                               rules={[{required: true, message: 'Please input your Product Category'}]}
                               label="Product Category"
                    >
                        <TreeSelect
                            value={categoryID}
                            dropdownStyle={{
                                maxHeight: 400,
                                overflow: 'auto',
                            }}
                            multiple
                            treeData={treeData}
                            placeholder="Please select Category"
                            treeDefaultExpandAll
                            onChange={(newValue) => setCategoryID(newValue)}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <Form.Item name="name"
                               rules={[{required: true, message: 'Please input your Product Name'}]}
                               label="Product Name"
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <Form.Item name="description"
                               rules={[{required: true, message: 'Please input your Product Description',}]}
                               label="Product Description"
                    >
                        <Input.TextArea autoSize showCount maxLength={100}/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <Form.Item name="initial_cost"
                               rules={[{required: true, message: 'Please input your initial Sell Price',}]}
                               label="Sell Price"
                    >
                        <InputNumber formatter={(value) => currencyFormatter(value)}
                                     parser={(value) => currencyParser(value)}
                                     prefix={"Rp"}
                                     style={{width: '100%'}}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Modal>);
};

export default InvProductForm;