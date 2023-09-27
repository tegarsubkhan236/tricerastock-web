import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Form, Input, List, Modal, Row, Space, Typography} from "antd";
import {Debounce} from "../../../../helper/debounce";
import {FooterCartList, ItemCartInput, ItemCartList} from "../../../../views/components/ProductCart";
import {fetchProducts} from "../../../master/product/productSlice";
import {useDispatch, useSelector} from "react-redux";
import {CountOrderPrice} from "../../../../helper/countOrderPrice";
import {ExclamationCircleFilled, ShopOutlined} from "@ant-design/icons";
import {postSalesOrder, setSalesOrderResult, setSalesOrderStatus} from "../salesOrderSlice";

const {Paragraph, Text} = Typography;

const Index = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const {salesOrderStatus, salesOrderResult} = useSelector(state => state.salesOrders)

    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [orderPrice, setOrderPrice] = useState({
        subTotal: 0,
        total: 0,
    });

    const formattedDate = new Date().toLocaleDateString('en-GB')
    const salesOrderDefaultRemarks = `Sales Order created by ${user.username} at ${formattedDate}`

    const getProducts = async (searchText = '') => {
        dispatch(setSalesOrderStatus('pending'));
        dispatch(setSalesOrderResult(null))
        try {
            const data = await dispatch(fetchProducts({
                page: 1,
                perPage: 999,
                search_text: searchText,
            })).unwrap();

            const results = data?.data?.results ?? [];
            const mappedProducts = results.map((item) => ({
                id: item.id,
                product_id: item.id,
                product_name: item.name,
                sell_price: item.product_prices[0].sell_price,
                buy_price: 0,
                quantity: 0,
            }));

            setProducts(mappedProducts);
            dispatch(setSalesOrderStatus('succeeded'));
        } catch (e) {
            dispatch(setSalesOrderStatus('failed'));
            dispatch(setSalesOrderResult(e.message))
        }
    };

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        const calculatedOrderPrice = CountOrderPrice(cartItems, 0, 0);
        setOrderPrice(calculatedOrderPrice);
    }, [cartItems]);

    const handleSearch = Debounce((value) => {
        getProducts(value);
    }, 1000);

    const onFinish = () => {
        if (cartItems.length <= 0) {
            dispatch(setSalesOrderStatus('failed'))
            dispatch(setSalesOrderResult("Cart items empty"))
            return
        }
        Modal.confirm({
            title: 'Do you want to make this order?',
            icon: <ExclamationCircleFilled/>,
            content: salesOrderStatus === "pending" ? 'Loading...' : 'Double-check that the information you are saving is accurate.',
            okButtonProps: {disabled: salesOrderStatus === "pending"},
            async onOk() {
                dispatch(setSalesOrderStatus('pending'))
                try {
                    const postData = {
                        user_id: user.user_id,
                        disc: 0,
                        tax: 0,
                        amount: orderPrice.total,
                        remarks: salesOrderDefaultRemarks,
                        sales_order_products: cartItems.map(val => ({
                            product_id: val.product_id,
                            quantity: val.quantity,
                        })),
                    }
                    const data = await dispatch(postSalesOrder({postData})).unwrap()
                    dispatch(setSalesOrderStatus('succeeded'))
                    dispatch(setSalesOrderResult(data?.data))
                } catch (e) {
                    dispatch(setSalesOrderStatus('failed'))
                    dispatch(setSalesOrderResult(e.message))
                }
            },
            onCancel() {
            },
        });
    }

    const resetStep = () => {
        dispatch(setSalesOrderStatus('idle'))
        dispatch(setSalesOrderResult(null))
        setCartItems([])
    }

    const renderAlert = () => {
        let alertConfig;
        if (salesOrderStatus === 'failed' && salesOrderResult !== null) {
            alertConfig = {
                type: 'error',
                message: 'sales order failed to create',
                description: salesOrderResult
            }
        }
        if (salesOrderStatus === 'succeeded' && salesOrderResult !== null) {
            alertConfig = {
                type: 'success',
                message: 'sales order success to create',
                description: salesOrderResult,
                action: <Button size="small" type="primary" onClick={resetStep}>Print Invoice</Button>
            }
        }

        return alertConfig ?
            <Alert {...alertConfig}
                   showIcon
                   closable
                   onClose={resetStep}
                   style={{marginBottom: "10px"}}
            /> : null;
    }

    return (
        <>
            {renderAlert()}
            <Form id='myForm' onFinish={onFinish}>
                <Row gutter={10}>
                    <Col span={16}>
                        <Input.Search
                            placeholder="Search Product"
                            onChange={(e) => handleSearch(e.target.value)}
                            style={{paddingBottom: "10px"}}
                        />
                        <List grid={{gutter: 10, column: 3}}
                              loading={salesOrderStatus === "pending"}
                              dataSource={products}
                              renderItem={(item) => (
                                  <ItemCartInput
                                      type={"SELL_TRANSACTION"}
                                      item={item}
                                      cartItems={cartItems}
                                      setCartItems={setCartItems}
                                  />
                              )}
                        />
                    </Col>
                    <Col span={8}>
                        <List
                            bordered
                            dataSource={cartItems}
                            header={<Typography.Title level={5}>Product Cart</Typography.Title>}
                            renderItem={(item) => <ItemCartList item={item}/>}
                            footer={
                                <Space direction="vertical" style={{width: '100%'}}>
                                    <FooterCartList
                                        taxPercentage={0}
                                        discPercentage={0}
                                        tax={0}
                                        disc={0}
                                        subTotal={orderPrice.subTotal}
                                        total={orderPrice.total}
                                    />
                                    <Button type="primary" block htmlType="submit"
                                            icon={<ShopOutlined/>}>Checkout</Button>
                                </Space>
                            }
                        />
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default Index;