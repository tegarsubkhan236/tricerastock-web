import React from 'react';
import {Col, Form, Input, message, Modal, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {postSupplier, updateSupplier} from "./msInvSupplierSlice";

const MsInvSupplierForm = ({formType, form, visible, setVisible}) => {
    const dispatch = useDispatch();
    const {isLoading} = useSelector((state) => state.suppliers);

    const handleSubmit = (e) => {
        e.preventDefault()
        form.validateFields().then(async (values) => {
            if (formType === "ADD_FORM") {
                await dispatch(postSupplier(values)).then(() => {
                    setVisible(false)
                    return message.success("done")
                })
            }
            if (formType === "EDIT_FORM") {
                await dispatch(updateSupplier({id: values.id, updatedData: values})).then(() => {
                    setVisible(false)
                    return message.success("done")
                })
            }
        })
    }

    return (
        <Modal
            title={formType === "EDIT_FORM" ? "Edit Supplier" : "Add Supplier"}
            open={visible}
            centered
            onCancel={() => setVisible(false)}
            onOk={handleSubmit}
            confirmLoading={isLoading}
        >
            <Form form={form}>
                <Form.Item name="id" hidden>
                    <Input/>
                </Form.Item>
                <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item name="name"
                                   rules={[{
                                       required: true, message: 'Please input your names',
                                   },]}
                                   label="Name"
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item name="address"
                                   rules={[{
                                       required: true, message: 'Please input your address',
                                   },]}
                                   label="Address"
                        >
                            <Input.TextArea/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item name="contact_person"
                                   rules={[{
                                       required: true, message: 'Please input your contact person',
                                   },]}
                                   label="Contact Person"
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item name="contact_number"
                                   rules={[{
                                       required: true, message: 'Please input your contact number',
                                   },]}
                                   label="Contact Number"
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default MsInvSupplierForm;