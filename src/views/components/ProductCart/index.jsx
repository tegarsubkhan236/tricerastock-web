import React from 'react';
import {Button, Card, Col, InputNumber, List, Row, Space, Typography} from "antd";
import {currencyFormatter, currencyParser} from "../../../config/helper/currency";
import {AppstoreAddOutlined, DeleteOutlined} from "@ant-design/icons";
const {Text} = Typography

export const ItemCartInput = ({item, defaultValueQuantity, defaultValueBuyPrice, onAddToCart, onRemoveFromCart}) => {
    return (
        <List.Item key={item.id}>
            <Card actions={[
                <Space direction="vertical" style={{width: "200px"}}>
                    <InputNumber addonBefore={"Quantity"}
                                 formatter={(value) => currencyFormatter(value)}
                                 parser={(value) => currencyParser(value)}
                                 defaultValue={defaultValueQuantity(item.product_id)}
                                 min={0}
                                 size={"small"}
                                 onChange={(value) => item.quantity = value}
                    />
                    <InputNumber addonBefore={"Buy Price"}
                                 formatter={(value) => currencyFormatter(value)}
                                 parser={(value) => currencyParser(value)}
                                 prefix={"Rp"}
                                 defaultValue={defaultValueBuyPrice(item.product_id)}
                                 max={item.sell_price}
                                 size={"small"}
                                 onChange={(value) => item.buy_price = value}
                    />
                    <Space>
                        <Button size={"small"}
                                icon={<AppstoreAddOutlined/>}
                                onClick={() => onAddToCart(item.product_id, item.product_name, item.buy_price, item.quantity)}
                        >
                            Add
                        </Button>
                        <Button danger
                                size={"small"}
                                icon={<DeleteOutlined/>}
                                onClick={() => onRemoveFromCart(item.product_id)}>
                            Remove
                        </Button>
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
                <Text strong>Rp.{currencyFormatter(item.buy_price)}</Text>
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
            <Col span={16} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Text strong>Rp. {currencyFormatter(subTotal)}</Text>
            </Col>
            <Col span={8}>
                <Text strong>Tax ({taxPercentage}%)</Text>
            </Col>
            <Col span={16} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Text strong>Rp. {currencyFormatter(tax)}</Text>
            </Col>
            <Col span={8}>
                <Text strong>Discount ({discPercentage}%)</Text>
            </Col>
            <Col span={16} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Text strong>Rp. {currencyFormatter(disc)}</Text>
            </Col>
            <Col span={8}>
                <Text strong>Total</Text>
            </Col>
            <Col span={16} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Text strong>Rp. {currencyFormatter(total)}</Text>
            </Col>
        </Row>
    )
}