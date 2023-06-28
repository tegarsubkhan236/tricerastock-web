import React from 'react';
import {Col, Form, Input, message, Row} from "antd";
import {postSupplier, setSupplierModalVisible, updateSupplier} from "./invSupplierSlice";
import {useDispatch, useSelector} from "react-redux";

const InvSupplierFormSingle = ({form}) => {
    const dispatch = useDispatch();
    const {supplierModalType} = useSelector((state) => state.suppliers);

    const handleSubmit = () =>  {
        form.validateFields().then(async (values) => {
            try {
                if (supplierModalType === "ADD_FORM") {
                    const payload = [{
                        name: values.name,
                        address: values.address,
                        contact_person: values.contact_person,
                        contact_number: values.contact_number,
                    }]
                    await dispatch(postSupplier({postData: payload})).unwrap()
                }
                if (supplierModalType === "EDIT_FORM") {
                    await dispatch(updateSupplier({id: values.id, updatedData: values})).unwrap()
                }
                dispatch(setSupplierModalVisible(false))
                return message.success('Operation executed')
            } catch (e) {
                dispatch(setSupplierModalVisible(false))
                return message.error(e?.response?.data?.message ?? e.message)
            }
        })
    }

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
    );
};

export default InvSupplierFormSingle;