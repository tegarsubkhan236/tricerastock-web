import React, {useContext, useEffect, useState} from 'react';
import {Col, Form, Input, List, message, Row, Typography} from "antd";
import {PurchaseOrderStepFormContext} from "./index";
import {Debounce} from "../../../../config/helper/debounce";
import {fetchProductsWithoutExtraReducers} from "../../../master/msProduct/msProductSlice";
import {useDispatch} from "react-redux";
import {FooterCartList, ItemCartInput, ItemCartList} from "../../../../views/components/ProductCart";

const {Title} = Typography

const Step2 = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const {
        postData, initLoading, setInitLoading, cartItems, setCartItems, orderPrice, next
    } = useContext(PurchaseOrderStepFormContext);

    const fetchProducts = async ({supplier_id, search_text = ""}) => {
        try {
            const data = await dispatch(fetchProductsWithoutExtraReducers({
                page: 1, perPage: 999, supplier_id: supplier_id, search_text: search_text,
            })).unwrap()
            setProducts(data.data.results.map((item) => ({
                id: item.id,
                product_id: item.id,
                product_name: item.name,
                sell_price: item.product_prices[0].sell_price,
                buy_price: 0,
                quantity: 0,
            })))
            setInitLoading(false);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (typeof postData?.supplier?.value !== "undefined") {
            fetchProducts({
                supplier_id: postData.supplier.value
            })
            setCartItems([])
        }
    }, [postData?.supplier?.value])

    const handleAddToCart = (product_id, product_name, buy_price, quantity) => {
        if (quantity === 0 || buy_price === 0) return
        const existingItem = cartItems.find((cartItem) => cartItem.product_id === product_id);
        if (existingItem) {
            const updatedCartItem = {
                product_id: product_id, product_name: product_name, buy_price: buy_price, quantity: quantity,
            };
            setCartItems(cartItems.map((cartItem) => (cartItem.product_id === product_id ? updatedCartItem : cartItem)));
        } else {
            const newItem = {
                product_id: product_id, product_name: product_name, buy_price: buy_price, quantity: quantity,
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
        }
        return 0
    }

    const defaultValueBuyPrice = (product_id) => {
        const existingItem = cartItems.find((cartItem) => cartItem.product_id === product_id);
        if (existingItem) {
            return existingItem.buy_price
        }
        return 0
    }

    const onSearch = async (value) => {
        await setInitLoading(true)
        await fetchProducts({
            supplier_id: postData.supplier.value, search_text: value.target.value
        })
    }

    const onFinish = () => {
        if (cartItems.length !== 0) {
            next()
        }
        return message.error("Product carts cannot be empty")
    }

    return (
        <Form id='myForm' onFinish={onFinish}>
            <Row gutter={10}>
                <Col span={16}>
                    <Input.Search
                        placeholder="Search Product"
                        onChange={Debounce(onSearch, 1000)}
                        style={{paddingBottom: "10px"}}
                    />
                    <List grid={{gutter: 10, column: 3}}
                          loading={initLoading}
                          dataSource={products}
                          renderItem={(item) => <ItemCartInput
                              item={item}
                              defaultValueQuantity={defaultValueQuantity}
                              defaultValueBuyPrice={defaultValueBuyPrice}
                              onAddToCart={handleAddToCart}
                              onRemoveFromCart={handleRemoveFromCart}
                          />}
                    />
                </Col>
                <Col span={8}>
                    <List
                        bordered
                        dataSource={cartItems}
                        header={<Title level={5}>Product Cart</Title>}
                        renderItem={(item) => <ItemCartList item={item}/>}
                        footer={<FooterCartList taxPercentage={postData.tax}
                                                discPercentage={postData.discount}
                                                tax={orderPrice.discount}
                                                disc={orderPrice.tax}
                                                subTotal={orderPrice.subTotal}
                                                total={orderPrice.total}/>}
                    />
                </Col>
            </Row>
        </Form>
    );
};

export default Step2;