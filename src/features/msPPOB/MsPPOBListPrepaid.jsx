import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {hitPriceList} from "./msPPOBSlice";
import {Badge, Button, Card, DatePicker, Form, Input, Select, Space, Table} from "antd";

const MsPPOBListPrepaid = () => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState("pulsa")
    const searchInput = useRef()
    const {priceList, isLoading, error} = useSelector((state) => state.ppob);
    useEffect(() => {
        dispatch(hitPriceList({priceType: "prepaid", groupBy: "category"}));
    }, [dispatch, category]);

    let dataSource = [];
    if (isLoading === false && error === null) {
        priceList?.data?.[category].map((item) => (
            dataSource = [...dataSource, {
                key: item.buyer_sku_code,
                brand: item.brand,
                buyer_sku_code: item.buyer_sku_code,
                product_name: item.product_name,
                seller_name: item.seller_name,
                actual_price: item.price,
                sell_price: item.price - (item.price % 1000) + 1000,
                buyer_product_status: item.buyer_product_status,
            }]
        ))
    }
    const columns = [
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'SKU Code',
            dataIndex: 'buyer_sku_code',
            key: 'buyer_sku_code',
        },
        {
            title: 'Product Name',
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: 'Seller Name',
            dataIndex: 'seller_name',
            key: 'seller_name',
        },
        {
            title: 'Actual Price',
            dataIndex: 'actual_price',
            key: 'actual_price',
        },
        {
            title: 'Sell Price',
            dataIndex: 'sell_price',
            key: 'sell_price',
        },
        {
            title: 'Product Status',
            dataIndex: 'buyer_product_status',
            key: 'buyer_product_status',
            render: (record) => {
                return (
                    record ? <Badge status={"processing"} text={"Active"}/> :
                        <Badge status={"error"} text={"InActive"}/>
                )
            }
        },
    ];

    return (
        <Card type={"inner"}>
            <Table
                loading={isLoading}
                dataSource={dataSource}
                columns={columns}
                scroll={{x: true}}
                bordered
            />
        </Card>
    );
};

export default MsPPOBListPrepaid;