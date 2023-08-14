import React, {useContext} from 'react';
import {Button, Card, Col, Form, Input, InputNumber, List, message, Row, Space, Typography} from "antd";
import {AppstoreAddOutlined, DeleteOutlined} from "@ant-design/icons";
import {PurchaseOrderStepFormContext} from "./index";
import {currencyFormatter, currencyParser} from "../../../../config/helper/currency";
import {Debounce} from "../../../../config/helper/debounce";

const {Title, Text} = Typography

const Step2 = () => {
    const {
        postData,
        products,
        fetchProducts,
        initLoading,
        setInitLoading,
        cartItems,
        setCartItems,
        price,
        next
    } = useContext(PurchaseOrderStepFormContext);

    const handleAddToCart = (item, quantity, buy_price) => {
        if (quantity === 0 || buy_price === 0) return
        const existingItem = cartItems.find((cartItem) => cartItem.key === item.key);
        if (existingItem) {
            const updatedCartItem = {
                ...existingItem,
                quantity: quantity,
                buy_price: buy_price,
            };
            setCartItems(cartItems.map((cartItem) => (cartItem.key === item.key ? updatedCartItem : cartItem)));
        } else {
            const newItem = {
                ...item,
                quantity: quantity,
                buy_price: buy_price,
            };
            setCartItems([...cartItems, newItem]);
        }
    };

    const handleRemoveFromCart = (itemKey) => {
        const updatedCartItems = cartItems.filter((item) => item.key !== itemKey);
        setCartItems(updatedCartItems);
    };

    const defaultValueQuantity = (item) => {
        const existingItem = cartItems.find((cartItem) => cartItem.key === item.key);
        if (existingItem) {
            return existingItem.quantity
        } else {
            return 0
        }
    }

    const defaultValueBuyPrice = (item) => {
        const existingItem = cartItems.find((cartItem) => cartItem.key === item.key);
        if (existingItem) {
            return existingItem.buy_price
        } else {
            return 0
        }
    }

    const onSearch = async (value) => {
        await setInitLoading(true)
        await fetchProducts({
            supplier_id: postData.supplier.value,
            search_text: value.target.value
        })
    }

    const onFinish = () => {
        if (cartItems.length !== 0) {
            next()
        } else {
            message.error("Product carts cannot be empty")
        }
    }

    return (
        <Form id='myForm'
              onFinish={onFinish}
        >
            <Row gutter={10}>
                <Col span={16}>
                    <Input.Search placeholder="Search Product"
                                  onChange={Debounce(onSearch,1000)}
                                  style={{paddingBottom: "10px"}}
                    />
                    <List grid={{
                        gutter: 10,
                        column: 3,
                    }}
                          loading={initLoading}
                          dataSource={products}
                          renderItem={(item) => (
                              <List.Item key={item.key}>
                                  <Card actions={[
                                      <Space direction="vertical" style={{width: "200px"}}>
                                          <InputNumber addonBefore={"Quantity"}
                                                       formatter={(value) => currencyFormatter(value)}
                                                       parser={(value) => currencyParser(value)}
                                                       defaultValue={defaultValueQuantity(item)}
                                                       min={0}
                                                       size={"small"}
                                                       onChange={(value) => item.quantity = value}
                                          />
                                          <InputNumber addonBefore={"Buy Price"}
                                                       formatter={(value) => currencyFormatter(value)}
                                                       parser={(value) => currencyParser(value)}
                                                       prefix={"Rp"}
                                                       defaultValue={defaultValueBuyPrice(item)}
                                                       max={item.sell_price}
                                                       size={"small"}
                                                       onChange={(value) => item.buy_price = value}
                                          />
                                          <Space>
                                              <Button size={"small"}
                                                      icon={<AppstoreAddOutlined/>}
                                                      onClick={() => handleAddToCart(item, item.quantity, item.buy_price)}
                                              >
                                                  Add
                                              </Button>
                                              <Button danger
                                                      size={"small"}
                                                      icon={<DeleteOutlined/>}
                                                      onClick={() => handleRemoveFromCart(item.key)}>
                                                  Remove
                                              </Button>
                                          </Space>
                                      </Space>
                                  ]}>
                                      <Card.Meta
                                          title={item.name}
                                          description={item.description}
                                      />
                                  </Card>
                              </List.Item>
                          )}
                    />
                </Col>
                <Col span={8}>
                    <List
                        bordered
                        dataSource={cartItems}
                        header={
                            <Title level={5}>Product Chart</Title>
                        }
                        footer={
                            <Row>
                                <Col span={8}>
                                    <Text strong>Sub Total</Text>
                                </Col>
                                <Col span={16} style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Text strong>Rp. {currencyFormatter(price.subTotal)}</Text>
                                </Col>
                                <Col span={8}>
                                    <Text strong>Tax ({postData.tax}%)</Text>
                                </Col>
                                <Col span={16} style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Text strong>Rp. {currencyFormatter(price.tax)}</Text>
                                </Col>
                                <Col span={8}>
                                    <Text strong>Discount ({postData.discount}%)</Text>
                                </Col>
                                <Col span={16} style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Text strong>Rp. {currencyFormatter(price.discount)}</Text>
                                </Col>
                                <Col span={8}>
                                    <Text strong>Total</Text>
                                </Col>
                                <Col span={16} style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Text strong>Rp. {currencyFormatter(price.total)}</Text>
                                </Col>
                            </Row>
                        }
                        renderItem={(item) => (
                            <List.Item actions={[
                                <Space direction="vertical" size={0}>
                                    <Space direction={"horizontal"}>
                                        <Text>X</Text>
                                        <Text strong>{item.quantity}</Text>
                                    </Space>
                                    <Text strong>Rp.{currencyFormatter(item.buy_price)}</Text>
                                </Space>
                            ]}>
                                <List.Item.Meta title={item.name}/>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </Form>
    );
};

export default Step2;