import React from 'react';
import {Button, Modal, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setUserModalVisible} from "./coreUsersSlice";
import CoreUsersFormSingle from "./CoreUsersFormSingle";
import CoreUsersFormBatch from "./CoreUsersFormBatch";

const CoreUsersForm = ({form}) => {
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
            return <CoreUsersFormSingle form={form}/>
        } else if (userModalType === "ADD_BATCH_FORM" || userModalType === "EDIT_BATCH_FORM") {
            return <CoreUsersFormBatch form={form}/>
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

export default CoreUsersForm;