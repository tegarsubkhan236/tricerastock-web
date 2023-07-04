import React from 'react';
import {useDispatch} from "react-redux";
import {Button, Col, Form, Row} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import MsInvProductCategoriesList from "../../../../features/invProductCategory/InvProductCategoryList";
import MsInvProductCategoriesForm from "../../../../features/invProductCategory/InvProductCategoryForm";
import {
    setProductCategoryModalType,
    setProductCategoryModalVisible
} from "../../../../features/invProductCategory/invProductCategorySlice";

const InvProductCategory = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();

    const openAddParentModal = () => {
        form.resetFields();
        dispatch(setProductCategoryModalType("ADD_FORM"))
        dispatch(setProductCategoryModalVisible(true))
    }

    return (
        <Row>
            <Col span={24} style={{display: 'flex', justifyContent: 'flex-end', paddingBottom: '15px'}}>
                <Button icon={<PlusOutlined/>} type={"primary"} onClick={() => openAddParentModal()}>Add Data</Button>
            </Col>
            <Col span={24}>
                <MsInvProductCategoriesList form={form}/>
            </Col>
            <MsInvProductCategoriesForm form={form}/>
        </Row>
    );
};

export default InvProductCategory;