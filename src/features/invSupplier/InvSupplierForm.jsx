import React from 'react';
import {Button, Modal, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setSupplierModalVisible} from "./invSupplierSlice";
import InvSupplierFormSingle from "./InvSupplierFormSingle";
import InvSupplierFormBatch from "./InvSupplierFormBatch";

const InvSupplierForm = ({form}) => {
    const dispatch = useDispatch();
    const {supplierStatus, supplierModalType, supplierModalVisible} = useSelector((state) => state.suppliers);

    const getModalTitle = () => {
        if (supplierModalType === "EDIT_FORM") {
            return "Edit Supplier"
        } else if (supplierModalType === "ADD_FORM") {
            return "Add Supplier"
        } else if (supplierModalType === "ADD_BATCH_FORM") {
            return "Add Batch Supplier"
        } else if (supplierModalType === "EDIT_BATCH_FORM") {
            return "Edit Batch Supplier"
        } else {
            return "Undefined"
        }
    }

    const RenderForm = () => {
        if (supplierModalType === "ADD_FORM" || supplierModalType === "EDIT_FORM") {
            return <InvSupplierFormSingle form={form}/>
        } else if (supplierModalType === "ADD_BATCH_FORM" || supplierModalType === "EDIT_BATCH_FORM") {
            return <InvSupplierFormBatch form={form}/>
        } else {
            return null
        }
    }

    const modalProps = {
        destroyOnClose: true,
        centered: true,
        onCancel: () => dispatch(setSupplierModalVisible(false)),
        open: supplierModalVisible,
        confirmLoading: supplierStatus === 'loading',
        title: getModalTitle(),
        footer: [
            <Space key="button-group">
                <Button type="primary" key="cancel" onClick={() => dispatch(setSupplierModalVisible(false))}>
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

export default InvSupplierForm;