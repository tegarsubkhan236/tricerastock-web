import React from 'react';
import {Col, Form, Input, message, Modal, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {postUser, updateUser} from "./usersSlice";

const UsersForm = ({formType, form, visible, setVisible}) => {
    const dispatch = useDispatch();
    const {isLoading} = useSelector((state) => state.users);

    const handleSubmit = (e) => {
        e.preventDefault()
        form.validateFields().then(async (values) => {
            if (formType === "ADD_FORM") {
                await dispatch(postUser(values)).then(() => {
                    setVisible(false)
                    return message.success("done")
                })
            }
            if (formType === "EDIT_FORM") {
                await dispatch(updateUser({id: values.ID, updatedData: values})).then(() => {
                    setVisible(false)
                    return message.success("done")
                })
            }
        })
    }

    return (
        <Modal
            title={formType === "EDIT_FORM" ? "Edit Form" : "Add Form"}
            open={visible}
            centered
            onCancel={() => setVisible(false)}
            onOk={handleSubmit}
            confirmLoading={isLoading}
        >
            <Form form={form}>
                <Form.Item name="ID" hidden>
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
                        <Form.Item name="username"
                                   rules={[{
                                       required: true, message: 'Please input your username',
                                   },]}
                                   label="Username"
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item name="email"
                                   rules={[{
                                       required: true, message: 'Please input your email!',
                                   },]}
                                   label="Email"
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item name="password"
                                   rules={[{
                                       required: true, message: 'Please input your password',
                                   },]}
                                   label="Password"
                        >
                            <Input.Password/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default UsersForm;