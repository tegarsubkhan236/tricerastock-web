import React from 'react';
import {Button, Col, Form, Input, message, Modal, Row, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {
    postProductCategory,
    updateProductCategory,
    setProductCategoryModalVisible,
} from "./msProductCategorySlice";

const MsInvProductCategoryForm = ({form}) => {
    const dispatch = useDispatch();
    const {
        productCategoryStatus,
        productCategoryModalVisible,
        productCategoryModalType,
    } = useSelector((state) => state.productCategories);

    const getModalTitle = () => {
        if (productCategoryModalType === "EDIT_FORM") {
            return "Edit ProductCategory"
        } else if (productCategoryModalType === "ADD_FORM") {
            return "Add ProductCategory"
        }else {
            return "Undefined"
        }
    }

    const handleSubmit = () => {
        form.validateFields().then(async (values) => {
            try {
                if (productCategoryModalType === "ADD_FORM") {
                    await dispatch(postProductCategory({parent_id: values.id ?? null, name: values.children_name,})).unwrap()
                }
                if (productCategoryModalType === "EDIT_FORM") {
                    await dispatch(updateProductCategory({id: values.id, name: values.children_name})).unwrap()
                }
                await dispatch(setProductCategoryModalVisible(false))
                return message.success('Operation executed')
            } catch (e) {
                await dispatch(setProductCategoryModalVisible(false))
                return message.error(e.message)
            }
        })
    };

    const modalProps = {
        destroyOnClose: true,
        centered : true,
        onCancel: () => dispatch(setProductCategoryModalVisible(false)),
        open : productCategoryModalVisible,
        confirmLoading : productCategoryStatus === 'loading',
        title : getModalTitle(),
        footer : [
            <Space key="button-group">
                <Button type="primary" key="cancel" onClick={() => dispatch(setProductCategoryModalVisible(false))}>
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
            <Form id="myForm" form={form} layout={"vertical"} onFinish={handleSubmit}>
                <Form.Item name="id" hidden>
                    <Input/>
                </Form.Item>
                <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item name="name" label="Parent Category">
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Form.Item name="children_name"
                                   rules={[{
                                       required: true, message: 'Please input your category name',
                                   },]}
                                   label="Category Name"
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default MsInvProductCategoryForm;