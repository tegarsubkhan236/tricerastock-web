import React from 'react';
import {Button, Modal, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setProductModalVisible} from "./msProductSlice";
import MsProductFormSingle from "./MsProductFormSingle";
import MsProductFormBatch from "./MsProductFormBatch";
import MsProductFormDetailPrice from "./MsProductFormDetailPrice";
import MsProductFormDetailStock from "./MsProductFormDetailStock";

const MsProductForm = ({form}) => {
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
        } else if (productModalType === "PRICE_HISTORY_FORM") {
            return "Product Price History"
        } else if (productModalType === "STOCK_HISTORY_FORM") {
            return "Product Stock History"
        } else {
            return "Undefined"
        }
    }

    const RenderForm = () => {
        if (productModalType === "ADD_FORM" || productModalType === "EDIT_FORM") {
            return <MsProductFormSingle form={form}/>
        } else if (productModalType === "ADD_BATCH_FORM" || productModalType === "EDIT_BATCH_FORM") {
            return <MsProductFormBatch/>
        } else if (productModalType === "PRICE_HISTORY_FORM") {
            return <MsProductFormDetailPrice/>
        } else if (productModalType === "STOCK_HISTORY_FORM") {
            return <MsProductFormDetailStock/>
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

export default MsProductForm;