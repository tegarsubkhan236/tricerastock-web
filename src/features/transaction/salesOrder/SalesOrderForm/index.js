import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, List, Row, Space, Typography} from "antd";
import {Debounce} from "../../../../config";
import {FooterCartList, ItemCartInput, ItemCartList} from "../../../../views/components/ProductCart";
import {fetchProductsWithoutExtraReducers} from "../../../master/product/productSlice";
import {useDispatch} from "react-redux";
import {CountOrderPrice} from "../../../../helper/countOrderPrice";
import {ShopOutlined} from "@ant-design/icons";

const Index = () => {
    const dispatch = useDispatch()
    const [initLoading, setInitLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [orderPrice, setOrderPrice] = useState({
        subTotal: 0,
        tax: 0,
        discount: 0,
        total: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    const fetchProducts = async (searchText = '') => {
        setInitLoading(true);
        try {
            const data = await dispatch(
                fetchProductsWithoutExtraReducers({
                    page: currentPage,
                    perPage: perPage,
                    search_text: searchText,
                })
            ).unwrap();

            const results = data?.data?.results ?? [];

            const mappedProducts = results.map((item) => ({
                id: item.id,
                product_id: item.id,
                product_name: item.name,
                sell_price: item.product_prices[0]?.sell_price ?? 0,
                buy_price: 0,
                quantity: 0,
            }));

            setProducts(mappedProducts);
        } catch (error) {
            console.error(error);
        } finally {
            setInitLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        const calculatedOrderPrice = CountOrderPrice(cartItems, orderPrice.tax, orderPrice.discount);
        setOrderPrice(calculatedOrderPrice);
    }, [cartItems, orderPrice.tax, orderPrice.discount]);

    const handleSearch = Debounce((value) => {
        fetchProducts(value);
    }, 1000);

    const onFinish = () => {
        if (cartItems.length > 0){
            console.log(cartItems)
        } else {
            console.log("ERROR")
        }
    }

    return (
        <Form id='myForm' onFinish={onFinish}>
            <Row gutter={10}>
                <Col span={16}>
                    <Input.Search
                        placeholder="Search Product"
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{paddingBottom: "10px"}}
                    />
                    <List grid={{gutter: 10, column: 3}}
                          loading={initLoading}
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
                                    taxPercentage={orderPrice.tax}
                                    discPercentage={orderPrice.discount}
                                    tax={orderPrice.tax}
                                    disc={orderPrice.discount}
                                    subTotal={orderPrice.subTotal}
                                    total={orderPrice.total}
                                />
                                <Button type="primary" block htmlType="submit" icon={<ShopOutlined/>}>Checkout</Button>
                            </Space>
                        }
                    />
                </Col>
            </Row>
        </Form>
    );
};

export default Index;