import React, {useEffect} from 'react';
import {Button, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {postLogin} from './msAuthSlice';
import {useNavigate} from "react-router-dom";

const MsAuthForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {isLoading, user} = useSelector((state) => state.auth);

    useEffect(() => {
        if (user !== null && user.exp > new Date().getTime() / 1000){
            navigate("/")
        }
    }, [navigate, user])

    const handleLogin = async (values) => {
        await dispatch(postLogin(values))
        navigate("/")
    }

    return (
        <Form onFinish={(values) => handleLogin(values)}
              onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
              autoComplete="off"
              className="content"
        >
            <div className="title">
                <h2>RUNGKAD</h2>
            </div>
            <Form.Item name="identity"
                       rules={[
                           {
                               required: true,
                               message: 'Please input your username or email!',
                           },
                       ]}>
                <Input placeholder="Email / Username"/>
            </Form.Item>
            <Form.Item name="password"
                       rules={[
                           {
                               required: true,
                               message: 'Please input your password!',
                           },
                       ]}>
                <Input.Password placeholder="Password"/>
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    className="login-form-button"
                >
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default MsAuthForm;