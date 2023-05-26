import React, {useCallback} from 'react';
import {Col, Form, Input, message, Modal, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {postProductCategory, setCurrentPage, updateProductCategory} from "./msInvProductCategorySlice";

const InvProductForm = ({formType, form, visible, setVisible}) => {
    const dispatch = useDispatch();
    const {status} = useSelector((state) => state.products());

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        form.validateFields().then(async (values) => {
            try {
                if (formType === "ADD_FORM") {
                    await dispatch(postProductCategory({parent_id: values.id ?? null, name: values.children_name,})).unwrap()
                }
                if (formType === "EDIT_FORM") {
                    await dispatch(updateProductCategory({id: values.id, updatedData: {name: values.children_name}})).unwrap()
                }
                setVisible(false)
                dispatch(setCurrentPage(1))
                return message.success('Operation executed')
            } catch (e) {
                setVisible(false)
                dispatch(setCurrentPage(1))
                return message.error(e.message)
            }
        })
    },[dispatch, form, formType, setVisible]);

    return (
        <Modal
            title={formType === "EDIT_FORM" ? "Edit Product" : "Add Product"}
            open={visible}
            centered
            onCancel={() => setVisible(false)}
            onOk={handleSubmit}
            okButtonProps={{form:'editor-form', key: 'submit', htmlType: 'submit'}}
            confirmLoading={status === 'loading'}
            destroyOnClose={true}
        >
            <Form id='editor-form' form={form} layout={"vertical"}>
                <Form.Item name="id" hidden>
                    <Input/>
                </Form.Item>
                <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item name="name" label="Parent Category">
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item name="children_name"
                                   rules={[{
                                       required: true, message: 'Please input your category name',
                                   },]}
                                   label="Category Name"
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default InvProductForm;