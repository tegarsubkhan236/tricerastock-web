import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import UsersFormSingle from "./UsersFormSingle";
import UsersFormBatch from "./UsersFormBatch";
import {Button, Modal, Space} from "antd";
import {setUserModalVisible} from "../usersSlice";

const Index = ({form}) => {
    const dispatch = useDispatch();
    const {userStatus, userModalType, userModalVisible} = useSelector((state) => state.users);

    const getModalTitle = () => {
        if (userModalType === "EDIT_FORM") {
            return "Edit User"
        } else if (userModalType === "ADD_FORM") {
            return "Add User"
        } else if (userModalType === "ADD_BATCH_FORM") {
            return "Add Batch User"
        } else if (userModalType === "EDIT_BATCH_FORM") {
            return "Edit Batch User"
        } else {
            return "Undefined"
        }
    }

    const RenderForm = () => {
        if (userModalType === "ADD_FORM" || userModalType === "EDIT_FORM") {
            return <UsersFormSingle form={form}/>
        } else if (userModalType === "ADD_BATCH_FORM" || userModalType === "EDIT_BATCH_FORM") {
            return <UsersFormBatch form={form}/>
        } else {
            return null
        }
    }

    const modalProps = {
        destroyOnClose: true,
        centered: true,
        onCancel: () => dispatch(setUserModalVisible(false)),
        open: userModalVisible,
        confirmLoading: userStatus === 'loading',
        title: getModalTitle(),
        footer: [
            <Space key="button-group">
                <Button type="primary" key="cancel" onClick={() => dispatch(setUserModalVisible(false))}>
                    Cancel
                </Button>
                <Button form="myForm" key="submit" htmlType="submit">
                    Submit
                </Button>
            </Space>
        ]
    }

    return (
        <Modal {...modalProps}>
            <RenderForm/>
        </Modal>
    );
};

export default Index;