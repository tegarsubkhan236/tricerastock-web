import React, {useState} from 'react';
import './index.css'
import {Form, Input, Button} from "antd";
import {Link} from "react-router-dom";
import DocumentTitle from "react-document-title";

const Index = () => {
    const [loading, setLoading] = useState(false);

    return (
        <DocumentTitle title={"Login - RungkadApp"}>
            <div className="login-container">
                <Form onFinish={(values) => console.log('Success:', values)}
                      onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
                      autoComplete="off"
                      className="content"
                >
                    <div className="title">
                        <h2>RUNGKAD</h2>
                    </div>
                    <Form.Item name="username"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Please input your username!',
                                   },
                               ]}>
                        <Input placeholder="Username"/>
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
                        <Link to={"/"}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                Login
                            </Button>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </DocumentTitle>
    );
};

export default Index;