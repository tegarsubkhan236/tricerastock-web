import React, {useContext, useState} from 'react';
import {ReceivingOrderFormContext} from "./index";
import {Alert, Button, Col, Descriptions, Form, Input, Row} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {fetchDetailPo} from "../../trPurchaseOrder/trPurchaseOrderSlice";
import {currencyFormatter} from "../../../../config/helper/currency";
import {generateTransactionStatus} from "../../../../config/helper/transactionStatus";

const Step1 = () => {
    const dispatch = useDispatch()
    const {postData, setPostData, postError, setPostError, initLoading, setInitLoading, isExecuted, setIsExecuted, next} = useContext(ReceivingOrderFormContext);
    const [poDefaultValue] = useState(postData.po_code || null)
    const [boDefaultValue] = useState(postData.bo_code || null)

    const getPurchaseOrderDetail = async (val) => {
        setIsExecuted(false);
        setInitLoading(true)
        let errorMessage = null;
        try {
            const res = await dispatch(fetchDetailPo({po_code: val.po_code, bo_code: val.bo_code,})).unwrap()
            const item = res.data

            if (item.status !== 0) {
                errorMessage = "purchase order has been process, cannot make receiving order again";
            }

            const receivingOrBackOrderProducts = (item.purchase_order_products || item.back_order_products)?.map((trx) => ({
                id: trx.id,
                product_id: trx.product_id,
                product_name: trx.product_name,
                buy_price: trx.price,
                sell_price: 0,
                quantity: trx.quantity,
            })) || [];

            setPostData({
                po_code: val.po_code,
                bo_code: val.bo_code,
                disc: item.disc,
                tax: item.tax,
                amount: item.amount,
                remarks: item.remarks,
                supplier_name: item.supplier_name,
                status: item.status,
                receiving_order_products: receivingOrBackOrderProducts
            });
            setPostError({});
        } catch (e) {
            if (e.status === 500) {
                errorMessage = "internal server error";
            } else {
                setPostError(e);
            }
        }
        if (errorMessage) {
            setPostError({ message: errorMessage });
        }
        setInitLoading(false)
        setIsExecuted(true);
    }

    const handleNextStep = () => {
        if (Object.keys(postData).length === 0) {
            setPostError({message: "purchase order not found"});
        } else {
            next()
        }
    }

    return (
        <>
            <Form autoComplete="off" onFinish={getPurchaseOrderDetail}>
                <Row gutter={20}>
                    <Col span={10}>
                        <Form.Item name="po_code" label="Purchase Order Code" initialValue={poDefaultValue} rules={[
                            {
                                required: true,
                                message: "Please input PO Code"
                            },
                        ]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item name="bo_code" label="Back Order Code" initialValue={boDefaultValue}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Button htmlType="submit" loading={initLoading} icon={<SearchOutlined/>} style={{width: "100%"}}>
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>
            {isExecuted && (postError.message ? (
                <Alert
                    message={postError.message}
                    type="error"
                    banner
                    closable
                    style={{marginBottom: "20px"}}
                />
            ) : (
                <>
                    <Alert
                        message="Purchase Order found and ready to make receiving order"
                        type="success"
                        banner
                        closable
                        style={{marginBottom: "20px"}}
                    />
                    <Form id='myForm' layout={"vertical"} onFinish={handleNextStep}>
                        <Descriptions title="Purchase Order Info" bordered column={4}>
                            <Descriptions.Item label="Supplier">{postData.supplier_name || ""}</Descriptions.Item>
                            <Descriptions.Item label="Tax">{currencyFormatter(postData.tax || 0)} %</Descriptions.Item>
                            <Descriptions.Item label="Discount">{currencyFormatter(postData.disc || 0)} %</Descriptions.Item>
                            <Descriptions.Item label="Status">{generateTransactionStatus(postData.status || 0)}</Descriptions.Item>
                            <Descriptions.Item label="Total Amount">Rp. {currencyFormatter(postData.amount || 0)}</Descriptions.Item>
                            <Descriptions.Item label="Remarks">{postData.remarks || ""}</Descriptions.Item>
                        </Descriptions>
                    </Form>
                </>
            ))}
        </>
    );
};

export default Step1;