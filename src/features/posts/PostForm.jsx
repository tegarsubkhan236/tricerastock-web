import React from 'react';
import {Button, Form, Input, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {postAdded} from "./postSlice";
import {getAllUser} from "../users/userSlice";
const PostForm = () => {
    const [form] = Form.useForm();
    const user = useSelector(getAllUser)
    const dispatch = useDispatch()
    const onFinish = ({title, author, content}) => {
        dispatch(postAdded(title, author, content));
        form.resetFields();
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }
    return (
        <Form
            form={form}
            name="post"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[
                    {
                        required: true,
                        message: 'Please input your title!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Author"
                name="author"
                rules={[
                    {
                        required: true,
                        message: 'Please input your author!',
                    },
                ]}
            >
                <Select
                    showSearch
                    allowClear
                    placeholder="Select an author"
                    optionFilterProp="children"
                    onSelect={(v)=> console.log(v)}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={user.map(v => {
                        return {
                            value: v.id,
                            label: v.value
                        }
                    })}
                />
            </Form.Item>

            <Form.Item
                label="Content"
                name="content"
                rules={[
                    {
                        required: true,
                        message: 'Please input your content!',
                    },
                ]}
            >
                <Input.TextArea rows={8}/>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default PostForm;