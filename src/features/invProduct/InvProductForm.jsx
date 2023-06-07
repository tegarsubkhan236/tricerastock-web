import React, {useCallback} from 'react';
import {Col, Form, Input, InputNumber, message, Modal, Row, Space, Tag} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {postProduct, setModalVisible} from "./invProductSlice";
import {currencyFormatter, currencyParser} from "../../config/utils/currency";

const InvProductForm = ({form}) => {
    const dispatch = useDispatch();
    const {status, modalVisible, modalType, filter} = useSelector((state) => state.products);

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        form.validateFields().then(async (values) => {
            try {
                if (modalType === "ADD_FORM") {
                    await dispatch(postProduct({
                        name: values.name,
                        cost: values.initial_cost,
                        description: values.description,
                        inv_supplier_id: filter.suppliers.key,
                        inv_product_category: filter.categories.map(({key}) => ({id: key}))
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
    }, [dispatch, filter, form, modalType]);

    const handleClose = useCallback((e) => {
        e.preventDefault()
        dispatch(setModalVisible(false))
    }, [dispatch])

    return (<Modal
        destroyOnClose
        centered
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={handleClose}
        confirmLoading={status === 'loading'}
        okButtonProps={{form: 'editor-form', key: 'submit', htmlType: 'submit'}}
        title={modalType === "EDIT_FORM" ? "Edit Product" : "Add Product"}
    >
        <Form id='editor-form' form={form} layout={"vertical"}>
            <Form.Item name="id" hidden>
                <Input/>
            </Form.Item>
            <Row gutter={24}>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <Form.Item name="supplier_name" label="Supplier" initialValue={filter.suppliers?.label}>
                        <Input disabled/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <Form.Item label="Product Category">
                        <Space size={[0, 8]} wrap>
                            {filter.categories && filter.categories.map((v) => (
                                <Tag key={v.key} color="#108ee9">{v.title}</Tag>))}
                        </Space>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <Form.Item name="name"
                               rules={[{
                                   required: true, message: 'Please input your Product Name',
                               }]}
                               label="Product Name"
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <Form.Item name="description"
                               rules={[{
                                   required: true, message: 'Please input your Product Description',
                               }]}
                               label="Product Description"
                    >
                        <Input.TextArea autoSize
                                        showCount
                                        maxLength={100}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <Form.Item name="initial_cost"
                               rules={[{
                                   required: true, message: 'Please input your initial Sell Price',
                               }]}
                               label="Sell Price"
                    >
                        <InputNumber formatter={(value) => currencyFormatter(value)}
                                     parser={(value) => currencyParser(value)}
                                     prefix={"Rp"}
                                     style={{
                                         width: '100%',
                                     }}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Modal>);
};

export default InvProductForm;