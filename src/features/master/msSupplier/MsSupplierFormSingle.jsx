import React, {useEffect} from 'react';
import {Col, Form, Input, message, Row} from "antd";
import {fetchDetailSupplier, postSupplier, setSupplierModalVisible, updateSupplier} from "./msSupplierSlice";
import {useDispatch, useSelector} from "react-redux";

const MsSupplierFormSingle = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const {supplierModalType, supplierSelectedRow} = useSelector((state) => state.suppliers);

    useEffect(() => {
        if (supplierModalType === "ADD_FORM") {
            form.resetFields();
        }
        if (supplierModalType === "EDIT_FORM") {
            dispatch(fetchDetailSupplier({id: supplierSelectedRow[0]})).unwrap().then((item) => {
                form.setFieldsValue(item.data);
            })
        }
    }, [])

    const handleSubmit = () =>  {
        form.validateFields().then(async (values) => {
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
        }).catch (e => {
            dispatch(setSupplierModalVisible(false))
            return message.error(e?.response?.data?.message ?? e.message)
        })
    }

    const handleError = (errorInfo) => {
        console.log(errorInfo)
    }

    return (
        <Form id='myForm'
              form={form}
              layout={"vertical"}
              onFinish={handleSubmit}
              onFinishFailed={handleError}
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

export default MsSupplierFormSingle;