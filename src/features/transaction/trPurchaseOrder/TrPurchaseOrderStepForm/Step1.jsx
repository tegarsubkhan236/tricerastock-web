import React, {useContext, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Col, Form, Input, InputNumber, message, Row} from "antd";
import {PurchaseOrderStepFormContext} from "./index";
import {fetchSupplier} from "../../../master/msSupplier/msSupplierSlice";
import DebounceSelect from "../../../../views/components/DebounceSelect";

const Step1 = () => {
    const {
        next,
        postData,
        setPostData,
    } = useContext(PurchaseOrderStepFormContext);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth)
    const [supplier, setSupplier] = useState(postData.supplier || []);
    const formattedDate = new Date().toLocaleDateString('en-GB')
    const purchaseOrderDefaultRemarks = `Purchase Order created by ${user.username} at ${formattedDate}`

    const supplierDropdown = async (name) => {
        try {
            const suppliers = await dispatch(fetchSupplier({
                page: 1,
                perPage: 5,
                column: {name: name}
            })).unwrap();
            return suppliers.data.results.map((item) => ({
                label: `${item.name}`,
                value: item.id,
            }))
        } catch (e) {
            return message.error(e.message)
        }
    }

    const onFinish = (val) => {
        setPostData({
            supplier: val.supplier,
            remarks: val.remarks,
            tax: val.tax,
            discount: val.discount,
        })
        next()
    }

    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo)
    }

    return (
        <Form id='myForm'
              layout={"vertical"}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
        >
            <Row gutter={20}>
                <Col span={12}>
                    <Form.Item name="po_code" label="Purchase Order Code">
                        <Input disabled placeholder="Auto Generated"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="supplier" label="Supplier" initialValue={supplier} rules={[
                        {
                            required: true,
                            message: "Please select supplier"
                        },
                    ]}>
                        <DebounceSelect
                            showSearch
                            allowClear
                            value={supplier}
                            placeholder="Select supplier"
                            fetchOptions={supplierDropdown}
                            onChange={(newValue) => {
                                setSupplier(newValue);
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="tax" label="Tax" initialValue={postData.tax || 0}>
                        <InputNumber addonAfter={'%'} style={{width: '100%'}}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="discount" label="Discount" initialValue={postData.discount || 0}>
                        <InputNumber addonAfter={'%'} style={{width: '100%'}}/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="remarks"
                               label="Remarks"
                               initialValue={postData.remarks || purchaseOrderDefaultRemarks}
                               rules={[
                                   {
                                       required: true,
                                       message: "Please fill remarks"
                                   },
                               ]}
                    >
                        <Input.TextArea/>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default Step1;