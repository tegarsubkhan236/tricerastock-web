import React from 'react';
import {Button, Card, Col, InputNumber, List, Row, Space, Typography} from "antd";
import {AppstoreAddOutlined, DeleteOutlined} from "@ant-design/icons";
import {currencyFormatter, currencyParser} from "../../../helper/currency";
import {TRANSACTION_TYPE} from "../../../helper/constants";
const {Text} = Typography

export const ItemCartInput = ({type, item, cartItems, setCartItems, inputPriceReadOnly}) => {
    const handleAddToCart = (product_id, product_name, price, quantity) => {
        console.log(cartItems)
        if (quantity === 0 || price === 0) return
        const existingItem = cartItems.find((cartItem) => cartItem.product_id === product_id);
        if (existingItem) {
            const updatedCartItem = {
                product_id: product_id,
                product_name: product_name,
                price: price,
                quantity: quantity,
            };
            setCartItems(cartItems.map((cartItem) => (cartItem.product_id === product_id ? updatedCartItem : cartItem)));
        } else {
            const newItem = {
                product_id: product_id,
                product_name: product_name,
                price: price,
                quantity: quantity,
            };
            setCartItems([...cartItems, newItem]);
        }
    };

    const handleRemoveFromCart = (product_id) => {
        const updatedCartItems = cartItems.filter((item) => item.product_id !== product_id);
        setCartItems(updatedCartItems);
    };

    const defaultValueQuantity = (product_id) => {
        const existingItem = cartItems.find((cartItem) => cartItem.product_id === product_id);
        if (existingItem) {
            return existingItem.quantity
        } else {
            return item.quantity
        }
    }

    const defaultValueBuyPrice = (product_id) => {
        const existingItem = cartItems.find((cartItem) => cartItem.product_id === product_id);
        if (existingItem) {
            return existingItem.price
        } else {
            return item.buy_price
        }
    }

    const inputQuantityConfig = {
        addonBefore: "Quantity",
        formatter: (value) => currencyFormatter(value),
        parser: (value) => currencyParser(value),
        defaultValue: defaultValueQuantity(item.product_id),
        min: 0,
        size: "small",
        onChange: (value) => item.quantity = value
    }

    const inputBuyPriceConfig = {
        addonBefore: "Buy Price",
        formatter: (value) => currencyFormatter(value),
        parser: (value) => currencyParser(value),
        prefix: "Rp",
        defaultValue: defaultValueBuyPrice(item.product_id),
        min: 0,
        max: item.sell_price,
        size: "small",
        onChange: (value) => item.buy_price = value,
        readOnly: inputPriceReadOnly
    }

    const inputSellPriceConfig = {
        addonBefore: "Sell Price",
        formatter: (value) => currencyFormatter(value),
        parser: (value) => currencyParser(value),
        prefix: "Rp",
        defaultValue: item.sell_price,
        size: "small",
        readOnly: true
    }

    const buttonAddConfig = {
        size: "small",
        icon : <AppstoreAddOutlined/>,
        onClick: () => {
            if (type === TRANSACTION_TYPE.BUY_TRANSACTION) {
                handleAddToCart(item.product_id, item.product_name, item.buy_price, item.quantity)
            }
            if (type === TRANSACTION_TYPE.SELL_TRANSACTION) {
                handleAddToCart(item.product_id, item.product_name, item.sell_price, item.quantity)
            }
        }
    }

    const buttonRemoveConfig = {
        danger: true,
        size: "small",
        icon : <DeleteOutlined/>,
        onClick: () => handleRemoveFromCart(item.product_id)
    }
    
    return (
        <List.Item key={item.id}>
            <Card actions={[
                <Space direction="vertical" style={{width: "200px"}}>
                    <InputNumber {...inputQuantityConfig}/>
                    {type === TRANSACTION_TYPE.BUY_TRANSACTION && <InputNumber {...inputBuyPriceConfig}/>}
                    {type === TRANSACTION_TYPE.SELL_TRANSACTION && <InputNumber {...inputSellPriceConfig}/>}
                    <Space>
                        <Button {...buttonAddConfig}>Add</Button>
                        <Button {...buttonRemoveConfig}>Remove</Button>
                    </Space>
                </Space>
            ]}>
                <Card.Meta title={item.product_name}/>
            </Card>
        </List.Item>
    );
}

export const ItemCartList = ({item}) => {
    return (
        <List.Item actions={[
            <Space direction="vertical" size={0}>
                <Space direction={"horizontal"}>
                    <Text>X</Text>
                    <Text strong>{item.quantity}</Text>
                </Space>
                <Text strong>Rp.{currencyFormatter(item.price)}</Text>
            </Space>
        ]}>
            <List.Item.Meta title={item.product_name}/>
        </List.Item>
    );
};

export const FooterCartList = ({taxPercentage, discPercentage, subTotal, tax, disc, total}) => {
    return (
        <Row>
            <Col span={8}>
                <Text strong>Sub Total</Text>
            </Col>
            <Col span={16} align="right">
                <Text strong>Rp. {currencyFormatter(subTotal)}</Text>
            </Col>
            {taxPercentage !== 0 &&
                <>
                    <Col span={8}>
                        <Text strong>Tax ({taxPercentage}%)</Text>
                    </Col>
                    <Col span={16} align="right">
                        <Text strong>Rp. {currencyFormatter(tax)}</Text>
                    </Col>
                </>
            }
            {discPercentage !== 0 &&
                <>
                    <Col span={8}>
                        <Text strong>Discount ({discPercentage}%)</Text>
                    </Col>
                    <Col span={16} align="right">
                        <Text strong>Rp. {currencyFormatter(disc)}</Text>
                    </Col>
                </>
            }
            <Col span={8}>
                <Text strong>Total</Text>
            </Col>
            <Col span={16} align="right">
                <Text strong>Rp. {currencyFormatter(total)}</Text>
            </Col>
        </Row>
    )
}