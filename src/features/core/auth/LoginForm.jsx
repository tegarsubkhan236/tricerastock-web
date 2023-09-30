import React, {useCallback, useEffect} from 'react';
import ziromartLogo from "../../../assets/images/ziromart_logo.svg";
import {Button, Card, Form, Input, message, Typography} from "antd";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {postLogin} from "./authSlice";
import Icon from "@ant-design/icons";
import GoogleSVG from "../../../assets/images/google.svg";
const {Text, Title} = Typography

const GoogleIcon = () => <Icon
    component={() => (<img src={GoogleSVG} alt={"googleIcon"} height={24} width={24} style={{marginBottom: 5}}/>)}/>

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isLoading, user} = useSelector((state) => state.auth);

    useEffect(() => {
        if (user !== null && user.exp > new Date().getTime() / 1000) {
            navigate("/")
        }
    }, [navigate, user])

    const handleLogin = useCallback(async (values) => {
        try {
            await dispatch(postLogin(values)).unwrap()
            navigate("/")
        } catch (e) {
            return message.error(e?.response?.data?.message ?? e.message)
        }
    }, [dispatch, navigate])

    const handleLoginFailed = useCallback((errorInfo) => {
        errorInfo.errorFields.map((v) => (
            message.error(v.errors)
        ))
    }, [])

    return (
        <Card>
            <img src={ziromartLogo} alt="logo" height={60} width={60}/>
            <Title level={3}>Login to your Account</Title>
            <Text>See what is going on with your business</Text>
            <Form
                onFinish={(values) => handleLogin(values)}
                onFinishFailed={(errorInfo) => handleLoginFailed(errorInfo)}
                autoComplete="off"
                style={{paddingTop: "20px"}}
            >
                <Form.Item>
                    <Button
                        htmlType="submit"
                        loading={isLoading}
                        block
                        size="large"
                        icon={<GoogleIcon/>}
                    >
                        Continue with Google
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Text
                        type="secondary"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        Or continue with
                    </Text>
                </Form.Item>
                <Form.Item
                    name="identity"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username or email!",
                        },
                    ]}
                >
                    <Input size="large" placeholder="Email / Username"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password size="large" placeholder="Password"/>
                </Form.Item>
                <Form.Item>
                    <Text
                        type="secondary"
                        style={{
                            display: "flex",
                            justifyContent: "end",
                        }}
                    >
                        Forgot Password ?
                    </Text>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                        block
                        size="large"
                        style={{
                            boxShadow: "0 4px 20px 0px rgba(77,71,195,0.75)",
                        }}
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default LoginForm;