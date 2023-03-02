import React from 'react';
import {Button, Form, Input, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {postAdded} from "./postSlice";

const PostForm = () => {
    const [form] = Form.useForm();
    const users = useSelector((state) => state.users.data);
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
                    options={users?.data?.results.map(v => {
                        return {
                            value: v.ID,
                            label: v.username
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