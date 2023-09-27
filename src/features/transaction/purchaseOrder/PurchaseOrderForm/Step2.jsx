import React, {useContext, useEffect} from 'react';
import {Col, Form, Input, List, message, Row, Typography} from "antd";
import {PurchaseOrderStepFormContext} from "./index";
import {fetchProducts} from "../../../master/product/productSlice";
import {useDispatch} from "react-redux";
import {FooterCartList, ItemCartInput, ItemCartList} from "../../../../views/components/ProductCart";
import {Debounce} from "../../../../helper/debounce";

const Step2 = () => {
    const dispatch = useDispatch();
    const {
        postData,
        cartItems,
        setCartItems,
        products,
        setProducts,
        orderPrice,
        initLoading,
        setInitLoading,
        prevSupplierValue,
        setPrevSupplierValue,
        next
    } = useContext(PurchaseOrderStepFormContext);

    const getProducts = async ({supplier_id, search_text = ""}) => {
        try {
            setInitLoading(true);
            const data = await dispatch(fetchProducts({
                page: 1, perPage: 999,
                supplier_id: supplier_id,
                search_text: search_text,
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
        const currentSupplierValue = postData.supplier.value;
        if (currentSupplierValue !== prevSupplierValue) {
            getProducts({
                supplier_id: currentSupplierValue
            });
            setCartItems([]);
        }
        setPrevSupplierValue(currentSupplierValue);
    }, [postData])

    const onSearch = async (value) => {
        await getProducts({
            supplier_id: postData.supplier.value,
            search_text: value.target.value
        })
    }

    const onFinish = () => {
        if (cartItems.length !== 0) {
            next()
        } else {
            return message.error("Product carts cannot be empty")
        }
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
                              type={"BUY_TRANSACTION"}
                              item={item}
                              cartItems={cartItems}
                              setCartItems={setCartItems}
                              inputPriceReadOnly={false}
                          />}
                    />
                </Col>
                <Col span={8}>
                    <List
                        bordered
                        dataSource={cartItems}
                        header={<Typography.Title level={5}>Product Cart</Typography.Title>}
                        renderItem={(item) => <ItemCartList item={item}/>}
                        footer={<FooterCartList
                            taxPercentage={postData.tax}
                            discPercentage={postData.discount}
                            tax={orderPrice.tax}
                            disc={orderPrice.discount}
                            subTotal={orderPrice.subTotal}
                            total={orderPrice.total}
                        />}
                    />
                </Col>
            </Row>
        </Form>
    );
};

export default Step2;