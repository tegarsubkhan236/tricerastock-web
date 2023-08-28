import React, {useContext} from 'react';
import {ReceivingOrderFormContext} from "./index";
import {Alert, Button, Col, Descriptions, Form, Input, Row} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {fetchDetailPo} from "../../trPurchaseOrder/trPurchaseOrderSlice";
import {currencyFormatter} from "../../../../config/helper/currency";
import {generateTransactionStatus} from "../../../../config/helper/transactionStatus";
import {setRoErrors, setRoPayload} from "../trReceivingOrderSlice";

const Step1 = () => {
    const dispatch = useDispatch()
    const {next} = useContext(ReceivingOrderFormContext);
    const {roPayload, roErrors} = useSelector(state => state.receivingOrders)

    const getPurchaseOrderDetail = (val) => {
        dispatch(fetchDetailPo({po_code: val.po_code, bo_code: val.bo_code,})).unwrap()
            .then((res) => {
                const item = res.data
                const receivingOrBackOrderProducts = item.purchase_order_products.map((trx) => ({
                    id: trx.id,
                    product_id: trx.product_id,
                    product_name: trx.product_name,
                    price: trx.price,
                    quantity: trx.quantity,
                })) ?? item.back_order_products.map((trx) => ({
                    id: trx.id,
                    product_id: trx.product_id,
                    product_name: trx.product_name,
                    price: trx.price,
                    quantity: trx.quantity,
                }));

                dispatch(setRoPayload({
                    po_code: val.po_code,
                    bo_code: val.bo_code,
                    disc: item.disc,
                    tax: item.tax,
                    amount: item.amount,
                    remarks: item.remarks,
                    supplier_name: item.supplier_name,
                    status: item.status,
                    receiving_order_products: receivingOrBackOrderProducts
                }));
                dispatch(setRoErrors({}));
            })
            .catch(e => {
                if (e.status === 500) {
                    e.message = "internal server error"
                }
                dispatch(setRoPayload({}));
                dispatch(setRoErrors(e));
            })
    }

    const handleNextStep = () => {
        if (Object.keys(roPayload).length === 0) {
            dispatch(setRoErrors({message: "purchase order not found"}));
        } else {
            next()
        }
    }

    return (
        <>
            {roErrors.message && <Alert message={roErrors.message} type="error" banner closable style={{marginBottom: "20px"}}/>}
            <Form autoComplete="off" onFinish={getPurchaseOrderDetail}>
                <Row gutter={20}>
                    <Col span={10}>
                        <Form.Item name="po_code" label="Purchase Order Code" requiredMark>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item name="bo_code" label="Back Order Code">
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Button htmlType="submit" icon={<SearchOutlined/>}
                                style={{width: "100%"}}>
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Form id='myForm' layout={"vertical"} onFinish={handleNextStep}>
                <Descriptions title="Purchase Order Info" bordered column={4}>
                    <Descriptions.Item label="Supplier">{roPayload.supplier_name || ""}</Descriptions.Item>
                    <Descriptions.Item label="Tax">{currencyFormatter(roPayload.tax || 0)} %</Descriptions.Item>
                    <Descriptions.Item label="Discount">{currencyFormatter(roPayload.disc || 0)} %</Descriptions.Item>
                    <Descriptions.Item label="Status">{generateTransactionStatus(roPayload.status || 0)}</Descriptions.Item>
                    <Descriptions.Item label="Total Amount">Rp. {currencyFormatter(roPayload.amount || 0)}</Descriptions.Item>
                    <Descriptions.Item label="Remarks">{roPayload.remarks || ""}</Descriptions.Item>
                </Descriptions>
            </Form>
        </>
    );
};

export default Step1;