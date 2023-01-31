import React from 'react';
import './index.css'
import { Form, Input, Button } from "antd";
import {Link} from "react-router-dom";

const Index = () => {
    return (
        <div className="login-container">
            <Form className="content">
                <div className="title">
                    <h2>RUNGKAD</h2>
                </div>
                <Form.Item>
                    <Input placeholder="Username"/>
                </Form.Item>
                <Form.Item>
                    <Input type="password" placeholder="Password"/>
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
    );
};

export default Index;