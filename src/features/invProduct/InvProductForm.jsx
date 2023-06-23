import React from 'react';
import {Button, Modal, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setModalVisible} from "./invProductSlice";
import InvProductFormSingle from "./InvProductFormSingle";
import InvProductFormBatch from "./InvProductFormBatch";

const InvProductForm = ({form}) => {
    const dispatch = useDispatch();
    const {status, modalVisible, modalType} = useSelector((state) => state.products);

    const getModalTitle = () => {
        if (modalType === "EDIT_FORM") {
            return "Edit Product"
        } else if (modalType === "ADD_FORM") {
            return "Add Product"
        } else if (modalType === "ADD_BATCH_FORM") {
            return "Add Batch Product"
        } else if (modalType === "EDIT_BATCH_FORM") {
            return "Edit Batch Product"
        } else {
            return "Undefined"
        }
    }

    const RenderForm = () => {
        if (modalType === "ADD_FORM" || modalType === "EDIT_FORM") {
            return <InvProductFormSingle form={form}/>
        } else if (modalType === "ADD_BATCH_FORM" || modalType === "EDIT_BATCH_FORM") {
            return <InvProductFormBatch form={form}/>
        } else {
            return null
        }
    }

    const modalProps = {
        destroyOnClose: true,
        centered : true,
        onCancel: () => dispatch(setModalVisible(false)),
        open : modalVisible,
        confirmLoading : status === 'loading',
        title : getModalTitle(),
        footer : [
            <Space key="button-group">
                <Button type="primary" key="cancel" onClick={() => dispatch(setModalVisible(false))}>
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

export default InvProductForm;