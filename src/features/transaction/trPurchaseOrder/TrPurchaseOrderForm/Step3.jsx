import React, { useContext, useState } from 'react';
import { Button, Col, Descriptions, Form, Modal, Result, Row, Table, Typography } from 'antd';
import { PurchaseOrderStepFormContext } from "./index";
import { currencyFormatter } from "../../../../config/helper/currency";
import { useDispatch } from "react-redux";
import { postPo } from "../trPurchaseOrderSlice";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { Text } = Typography;

const Step3 = () => {
    const {postData, cartItems, setIsSaved, resetStep, price} = useContext(PurchaseOrderStepFormContext);
    const [saveData, setSaveData] = useState(null);
    const dispatch = useDispatch();

    const productColumns = [
        {
            title: 'Product',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Quantity',
            key: 'quantity',
            render: (_, { quantity }) => currencyFormatter(quantity)
        },
        {
            title: 'Buy Price',
            key: 'buy_price',
            render: (_, { buy_price }) => `Rp. ${currencyFormatter(buy_price)}`
        }
    ];

    const handleConfirm = () => {
        try {
            Modal.confirm({
                title: 'Do you want to save these items?',
                icon: <ExclamationCircleFilled/>,
                content: 'Double-check that the information you are saving is accurate.',
                onOk() {
                    const postPayload = {
                        supplier_id: postData.supplier.value,
                        disc: postData.discount,
                        tax: postData.tax,
                        remarks: postData.remarks,
                        purchase_order_products: cartItems.map(val => ({
                            product_id: val.key,
                            price: val.buy_price,
                            quantity: val.quantity
                        }))
                    };
                    dispatch(postPo({postData: postPayload})).unwrap().then(res => {
                        setSaveData(res.data)
                        setIsSaved(true)
                    });
                },
                onCancel() {
                },
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Form
            id='myForm'
            onFinish={handleConfirm}
        >
            {saveData == null ? (
                <>
                    <Descriptions title="Purchase Order Invoice" bordered={true} column={4} size="small">
                        <Descriptions.Item label="PO Code">Auto Generated</Descriptions.Item>
                        <Descriptions.Item label="Supplier">{postData.supplier.label}</Descriptions.Item>
                        <Descriptions.Item label="Tax">{postData.tax}%</Descriptions.Item>
                        <Descriptions.Item label="Discount">{postData.discount}%</Descriptions.Item>
                        <Descriptions.Item label="Total Amount">Rp. {currencyFormatter(price.total)}</Descriptions.Item>
                        <Descriptions.Item label="Remark" span={3}>{postData.remarks}</Descriptions.Item>
                    </Descriptions>
                    <Table
                        dataSource={cartItems}
                        columns={productColumns}
                        pagination={false}
                        footer={() => (
                            <Row>
                                <Col span={4} offset={16}>
                                    <Text strong>Sub Total</Text>
                                </Col>
                                <Col span={4}>
                                    <Text strong>Rp. {currencyFormatter(price.subTotal)}</Text>
                                </Col>
                                <Col span={4} offset={16}>
                                    <Text strong>Tax ({postData.tax}%)</Text>
                                </Col>
                                <Col span={4}>
                                    <Text strong>Rp. {currencyFormatter(price.tax)}</Text>
                                </Col>
                                <Col span={4} offset={16}>
                                    <Text strong>Discount ({postData.discount}%)</Text>
                                </Col>
                                <Col span={4}>
                                    <Text strong>Rp. {currencyFormatter(price.discount)}</Text>
                                </Col>
                                <Col span={4} offset={16}>
                                    <Text strong>Total</Text>
                                </Col>
                                <Col span={4}>
                                    <Text strong>Rp. {currencyFormatter(price.total)}</Text>
                                </Col>
                            </Row>
                        )}
                    />
                </>
            ) : (
                <Result
                    status="success"
                    title="Successfully Create Purchase Order!"
                    subTitle={
                        <>
                            Order number: <Text strong>{saveData.po_code}</Text> please do receiving order after it
                        </>
                    }
                    extra={[
                        <Button type="primary" key="print_invoice">Print Invoice</Button>,
                        <Button key="buy" onClick={resetStep}>Buy Again</Button>,
                    ]}
                />
            )}
        </Form>
    );
};

export default Step3;