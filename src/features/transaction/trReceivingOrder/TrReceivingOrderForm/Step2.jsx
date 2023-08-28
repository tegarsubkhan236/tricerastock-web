import React, {useContext, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Alert, Button, Card, Col, Form, Input, InputNumber, List, Row, Space, Typography} from "antd";
import {AppstoreAddOutlined, DeleteOutlined} from "@ant-design/icons";
import {currencyFormatter, currencyParser} from "../../../../config/helper/currency";
import {Debounce} from "../../../../config/helper/debounce";
import {ReceivingOrderFormContext} from "./index";
import {setRoErrors} from "../trReceivingOrderSlice";
import {FooterCartList, ItemCartList} from "../../../../views/components/ProductCart";

const {Title} = Typography

const Step2 = () => {
    const dispatch = useDispatch()
    const {cartItems, setCartItems, orderPrice, next} = useContext(ReceivingOrderFormContext);
    const [cartQuantity, setCartQuantity] = useState({});
    const {roPayload, roErrors} = useSelector(state => state.receivingOrders)

    const handleAddToCart = (product_id, product_name, price) => {
        const quantity = cartQuantity[product_id] || 0;
        if (quantity === 0 || price === 0) return
        const existingItem = cartItems.find((cartItem) => cartItem.product_id === product_id);
        if (existingItem) {
            const updatedCartItem = {
                product_id: product_id,
                product_name: product_name,
                quantity: quantity,
                price: price,
            };
            setCartItems(cartItems.map((cartItem) => (cartItem.product_id === product_id ? updatedCartItem : cartItem)));
        } else {
            const newItem = {
                product_id: product_id,
                product_name: product_name,
                quantity: quantity,
                price: price,
            };
            setCartItems([...cartItems, newItem]);
        }
        setCartQuantity({ ...cartQuantity, [product_id]: 0 });
    };

    const handleRemoveFromCart = (product_id) => {
        const updatedCartItems = cartItems.filter((cartItem) => cartItem.product_id !== product_id);
        setCartItems(updatedCartItems);
    };

    const defaultValueQuantity = (product_id) => {
        const existingItem = cartItems.find((cartItem) => cartItem.product_id === product_id);
        if (existingItem) {
            return existingItem.quantity
        }
        return 0
    }

    const onSearch = async (value) => {
        console.log(value)
    }

    const onFinish = () => {
        if (cartItems.length !== 0) {
            dispatch(setRoErrors({message: "Product carts cannot be empty"}));
        }
        next()
    }

    return (
        <>
            {roErrors.message && <Alert
                message={roErrors.message}
                type="error"
                banner
                closable
                style={{marginBottom: "20px"}}
            />}
            <Form id='myForm' onFinish={onFinish}>
                <Row gutter={10}>
                    <Col span={16}>
                        <Input.Search
                            placeholder="Search Product"
                            onChange={Debounce(onSearch,1000)}
                            style={{paddingBottom: "10px"}}
                        />
                        <List
                            grid={{gutter: 10, column: 3}}
                            dataSource={roPayload.receiving_order_products}
                            renderItem={(item) => (
                                <List.Item key={item.id}>
                                    <Card actions={[
                                        <Space direction="vertical" style={{width: "200px"}}>
                                            <InputNumber addonBefore={"Quantity"}
                                                         formatter={(value) => currencyFormatter(value)}
                                                         parser={(value) => currencyParser(value)}
                                                         defaultValue={defaultValueQuantity(item.product_id)}
                                                         min={0}
                                                         size={"small"}
                                                         onChange={(value) => setCartQuantity({ ...cartQuantity, [item.product_id]: value })}
                                            />
                                            <InputNumber addonBefore={"Buy Price"}
                                                         formatter={(value) => currencyFormatter(value)}
                                                         prefix={"Rp"}
                                                         defaultValue={item.price}
                                                         size={"small"}
                                                         disabled
                                            />
                                            <Space>
                                                <Button size={"small"}
                                                        icon={<AppstoreAddOutlined/>}
                                                        onClick={() => handleAddToCart(item.product_id, item.product_name, item.price)}>
                                                    Add
                                                </Button>
                                                <Button danger
                                                        size={"small"}
                                                        icon={<DeleteOutlined/>}
                                                        onClick={() => handleRemoveFromCart(item.product_id)}>
                                                    Remove
                                                </Button>
                                            </Space>
                                        </Space>
                                    ]}>
                                        <Card.Meta title={item.product_name}/>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col span={8}>
                        <List
                            bordered
                            dataSource={cartItems}
                            header={<Title level={5}>Product Cart</Title>}
                            renderItem={(item) => <ItemCartList item={item}/>}
                            footer={<FooterCartList taxPercentage={roPayload.tax}
                                                    discPercentage={roPayload.disc}
                                                    tax={orderPrice.disc}
                                                    disc={orderPrice.tax}
                                                    subTotal={orderPrice.subTotal}
                                                    total={orderPrice.total}/>}
                        />
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default Step2;