import React, {useContext} from 'react';
import {Alert, Col, Form, Input, List, Row, Typography} from "antd";
import {Debounce} from "../../../../config/helper/debounce";
import {ReceivingOrderFormContext} from "./index";
import {FooterCartList, ItemCartInput, ItemCartList} from "../../../../views/components/ProductCart";

const Step2 = () => {
    const {postData, postError, setPostError, cartItems, setCartItems, orderPrice, next} = useContext(ReceivingOrderFormContext);
    const onSearch = async (value) => {
        console.log(value)
    }

    const onFinish = () => {
        if (cartItems.length !== 0) {
            next()
        } else {
            setPostError({message: "Product carts cannot be empty"});
        }
    }

    return (
        <>
            {postError.message && <Alert
                message={postError.message}
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
                        <List grid={{gutter: 10, column: 3}}
                              dataSource={postData.receiving_order_products}
                              renderItem={(item) => <ItemCartInput
                                  item={item}
                                  cartItems={cartItems}
                                  setCartItems={setCartItems}
                                  inputPriceReadOnly={true}
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
                                discPercentage={postData.disc}
                                tax={orderPrice.tax}
                                disc={orderPrice.discount}
                                subTotal={orderPrice.subTotal}
                                total={orderPrice.total}
                            />}
                        />
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default Step2;