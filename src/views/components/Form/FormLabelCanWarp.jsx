import {Button, Form, Input} from 'antd';

const FormLabelCanWarp = () => (
    <Form
        name="wrap"
        labelCol={{
            flex: '110px',
        }}
        labelAlign="left"
        labelWrap
        wrapperCol={{
            flex: 1,
        }}
        colon={false}
        style={{
            maxWidth: 600,
        }}
    >
        <Form.Item
            label="Username"
            name="username"
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <Input/>
        </Form.Item>

        <Form.Item
            label="Password Ku Ini Rahasia"
            name="password"
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <Input/>
        </Form.Item>

        <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
);
export default FormLabelCanWarp;