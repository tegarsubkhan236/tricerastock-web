import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Col, Form, Input, message, Row} from "antd";
import {postUser, setUserModalVisible, updateUser} from "../usersSlice";

const UsersFormSingle = ({form}) => {
    const dispatch = useDispatch();
    const {userModalType} = useSelector((state) => state.users);

    const handleSubmit = () =>  {
        form.validateFields().then(async (values) => {
            try {
                if (userModalType === "ADD_FORM") {
                    await dispatch(postUser(values)).unwrap()
                }
                if (userModalType === "EDIT_FORM") {
                    await dispatch(updateUser({id: values.id, updatedData: values})).unwrap()
                }
                dispatch(setUserModalVisible(false))
                return message.success('Operation executed')
            } catch (e) {
                dispatch(setUserModalVisible(false))
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
                {userModalType === "ADD_FORM" &&
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
                }
            </Row>
        </Form>
    );
};

export default UsersFormSingle;