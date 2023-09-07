import React from 'react';
import {Form} from "antd";
import UsersTable from "../../../../features/core/user/UsersTable";
import UsersForm from "../../../../features/core/user/UsersForm";

const CoreUsers = () => {
    const [form] = Form.useForm();

    return (
        <>
            <UsersTable form={form}/>
            <UsersForm form={form}/>
        </>
    );
};

export default CoreUsers;