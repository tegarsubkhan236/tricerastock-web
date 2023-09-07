import React from 'react';
import SupplierFormSingle from "./SupplierFormSingle";
import SupplierFormBatch from "./SupplierFormBatch";
import {Button, Modal, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setSupplierModalVisible} from "../supplierSlice";
import DynamicAlert from "../../../../views/components/Alert/DynamicAlert";

const Index = ({form}) => {
    const dispatch = useDispatch();
    const {
        supplierStatus,
        supplierModalType,
        supplierModalVisible,
    } = useSelector((state) => state.suppliers);

    const getModalTitle = () => {
        const modalTitles = {
            "EDIT_FORM": "Edit Supplier",
            "ADD_FORM": "Add Supplier",
            "ADD_BATCH_FORM": "Add Batch Supplier",
            "EDIT_BATCH_FORM": "Edit Batch Supplier",
        };
        return modalTitles[supplierModalType] || "Undefined";
    };

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
                <Button form="myForm" key="submit" htmlType="submit" loading={supplierStatus === 'loading'}>
                    Submit
                </Button>
            </Space>
        ]
    }

    return (
        <Modal {...modalProps}>
            {/*{supplierErrorMessage.length > 0 && <DynamicAlert*/}
            {/*    alertMessage={supplierErrorMessage}*/}
            {/*    alertType={"error"}*/}
            {/*    alertOnClose={() => dispatch(setSupplierErrorMessage([]))}*/}
            {/*/>}*/}
            {/*{supplierSuccessMessage.length > 0 && <DynamicAlert*/}
            {/*    alertMessage={supplierSuccessMessage}*/}
            {/*    alertType={"success"}*/}
            {/*    alertOnClose={() => dispatch(setSupplierSuccessMessage([]))}*/}
            {/*/>}*/}
            {(supplierModalType === "ADD_FORM" || supplierModalType === "EDIT_FORM") ? <SupplierFormSingle form={form} /> : null}
            {(supplierModalType === "ADD_BATCH_FORM" || supplierModalType === "EDIT_BATCH_FORM") ? <SupplierFormBatch /> : null}
        </Modal>
    );
};

export default Index;