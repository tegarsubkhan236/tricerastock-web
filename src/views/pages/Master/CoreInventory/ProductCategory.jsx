import React from 'react';
import {useDispatch} from "react-redux";
import {Button, Col, Form, Row} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import ProductCategoriesTable from "../../../../features/master/productCategory/ProductCategoriesTable";
import ProductCategoriesForm from "../../../../features/master/productCategory/ProductCategoriesForm";
import {
    setProductCategoryModalType,
    setProductCategoryModalVisible
} from "../../../../features/master/productCategory/productCategorySlice";

const ProductCategory = () => {
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
                <ProductCategoriesTable form={form}/>
            </Col>
            <ProductCategoriesForm form={form}/>
        </Row>
    );
};

export default ProductCategory;