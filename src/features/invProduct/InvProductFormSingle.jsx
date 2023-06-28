import React, {useCallback, useState} from 'react';
import {Col, Form, Input, InputNumber, message, Row, TreeSelect} from "antd";
import {fetchSupplier} from "../invSupplier/invSupplierSlice";
import {useDispatch, useSelector} from "react-redux";
import DebounceSelect from "../../views/components/DebounceSelect";
import {currencyFormatter, currencyParser} from "../../config/helper/currency";
import {postProduct, setModalVisible} from "./invProductSlice";

const InvProductFormSingle = ({form}) => {
    const dispatch = useDispatch();
    const {treeData} = useSelector((state) => state.productCategories);
    const {modalType} = useSelector((state) => state.products);
    const [supplierID, setSupplierID] = useState([]);
    const [categoryID, setCategoryID] = useState([]);

    const fetchSupplierList = async (name) => {
        try {
            return await dispatch(fetchSupplier({page: 1, perPage: 5, column: {name: name}})).unwrap()
                .then((body) => body.data.results.map((item) => ({
                    label: `${item.name}`, value: item.id,
                })))
        } catch (e) {
            return message.error(e.message)
        }
    }

    const handleSubmit = useCallback(() => {
        form.validateFields().then(async (values) => {
            try {
                if (modalType === "ADD_FORM") {
                    const payload = [{
                        name: values.name,
                        cost: values.initial_cost,
                        description: values.description,
                        inv_supplier_id: values.supplierID.key,
                        inv_product_category: values.productCategoryID.map(val => ({id: val}))
                    }]
                    await dispatch(postProduct(payload)).unwrap()
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
    }, [dispatch, form, modalType])

    return (
        <Form id='myForm'
              form={form}
              layout={"vertical"}
              onFinish={handleSubmit}
              onFinishFailed={(errorInfo) => console.log(errorInfo)}
        >
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
                                maxHeight: 400, overflow: 'auto',
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
    );
};

export default InvProductFormSingle;