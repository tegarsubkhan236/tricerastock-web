import React from 'react';
import {Button, Modal, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setProductModalVisible} from "./invProductSlice";
import InvProductFormSingle from "./InvProductFormSingle";
import InvProductFormBatch from "./InvProductFormBatch";

const InvProductForm = ({form}) => {
    const dispatch = useDispatch();
    const {productStatus, productModalVisible, productModalType} = useSelector((state) => state.products);

    const getModalTitle = () => {
        if (productModalType === "EDIT_FORM") {
            return "Edit Product"
        } else if (productModalType === "ADD_FORM") {
            return "Add Product"
        } else if (productModalType === "ADD_BATCH_FORM") {
            return "Add Batch Product"
        } else if (productModalType === "EDIT_BATCH_FORM") {
            return "Edit Batch Product"
        } else {
            return "Undefined"
        }
    }

    const RenderForm = () => {
        if (productModalType === "ADD_FORM" || productModalType === "EDIT_FORM") {
            return <InvProductFormSingle form={form}/>
        } else if (productModalType === "ADD_BATCH_FORM" || productModalType === "EDIT_BATCH_FORM") {
            return <InvProductFormBatch form={form}/>
        } else {
            return null
        }
    }

    const modalProps = {
        destroyOnClose: true,
        centered : true,
        onCancel: () => dispatch(setProductModalVisible(false)),
        open : productModalVisible,
        confirmLoading : productStatus === 'loading',
        title : getModalTitle(),
        footer : [
            <Space key="button-group">
                <Button type="primary" key="cancel" onClick={() => dispatch(setProductModalVisible(false))}>
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