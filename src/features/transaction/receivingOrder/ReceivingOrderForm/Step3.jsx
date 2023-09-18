import React, {useContext, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ReceivingOrderFormContext} from "./index";
import {Button, Descriptions, Form, Modal, Result, Table, Typography} from "antd";
import {CloseCircleOutlined, ExclamationCircleFilled} from "@ant-design/icons";
import {postRo} from "../receivingOrderSlice";
import {FooterCartList} from "../../../../views/components/ProductCart";
import {currencyFormatter} from "../../../../helper/currency";

const { Text, Paragraph } = Typography;

const Step3 = () => {
    const {postData, cartItems, setIsSaved, resetStep, orderPrice} = useContext(ReceivingOrderFormContext);
    const {user} = useSelector((state) => state.auth);
    const [result, setResult] = useState(null);
    const dispatch = useDispatch();

    const productColumns = [
        {
            title: 'Product',
            dataIndex: 'product_name',
            key: 'product_name',
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
        Modal.confirm({
            title: 'Do you want to save these items?',
            icon: <ExclamationCircleFilled/>,
            content: 'Double-check that the information you are saving is accurate.',
            onOk() {
                const postPayload = {
                    po_code: postData.po_code,
                    bo_code: postData.bo_code,
                    user_id: user.user_id,
                    receiving_order_products: cartItems.map(val => ({
                        product_id: val.product_id,
                        quantity: val.quantity
                    }))
                };
                dispatch(postRo({postData: postPayload})).unwrap()
                    .then(res => {
                        setResult(res)
                        setIsSaved(true)
                    })
                    .catch(e => {
                        setResult(e)
                    });
            },
            onCancel() {},
        });
    };

    const renderFormDescription = () => {
        return (
            <Form id='myForm' onFinish={handleConfirm}>
                <Descriptions title="Purchase Order Invoice" bordered={true} column={4} size="small">
                    <Descriptions.Item label="PO Code">{postData.po_code}</Descriptions.Item>
                    <Descriptions.Item label="BO Code">{postData.bo_code}</Descriptions.Item>
                    {postData.supplier_name && <Descriptions.Item label="Supplier">{postData.supplier_name}</Descriptions.Item>}
                    <Descriptions.Item label="Tax">{postData.tax}%</Descriptions.Item>
                    <Descriptions.Item label="Discount">{postData.disc}%</Descriptions.Item>
                    <Descriptions.Item label="Total Amount">Rp. {currencyFormatter(orderPrice.total)}</Descriptions.Item>
                    <Descriptions.Item label="Remark" span={3}>{postData.remarks}</Descriptions.Item>
                </Descriptions>
                <Table
                    dataSource={cartItems}
                    columns={productColumns}
                    pagination={false}
                    rowKey={(val) => val.product_id}
                    footer={() => (
                        <FooterCartList
                            taxPercentage={postData.tax}
                            discPercentage={postData.disc}
                            tax={orderPrice.tax}
                            disc={orderPrice.discount}
                            subTotal={orderPrice.subTotal}
                            total={orderPrice.total}
                        />
                    )}
                />
            </Form>
        )
    }

    const renderResultComponent = (result) => {
        if (result.status === 200) {
            return (
                <Result
                    status="success"
                    title="Successfully Create Purchase Order!"
                    subTitle={
                        <>
                            Order number: <Text strong>{result.data.po_code}</Text> please do receiving order after it
                        </>
                    }
                    extra={[
                        <Button type="primary" key="print_invoice">
                            Print Invoice
                        </Button>,
                        <Button key="buy" onClick={resetStep}>
                            Buy Again
                        </Button>,
                    ]}
                />
            );
        }
        else if (result.status === 400) {
            return (
                <Result
                    status="error"
                    title="Bad Request"
                    subTitle={result.message.charAt(0).toUpperCase() + result.message.slice(1).toLowerCase()}
                >
                    <div className="desc">
                        <Paragraph>
                            <Text strong style={{fontSize: 16}}>
                                The content you submitted has the following error:
                            </Text>
                        </Paragraph>
                        {result.data.map(val => (
                            <Paragraph>
                                <CloseCircleOutlined style={{color: "red"}} /> {val}
                            </Paragraph>
                        ))}
                    </div>
                </Result>
            );
        }
        else {
            return (
                <Result
                    status="error"
                    title="Internal Service Error"
                    subTitle={
                        <>
                            Error Internal Service Error
                        </>
                    }
                />
            );
        }
    };

    return (
        <>
            {result === null ? (
                renderFormDescription()
            ) : (
                renderResultComponent(result)
            )}
        </>
    );
};

export default Step3;