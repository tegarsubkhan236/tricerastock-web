import React, {useEffect} from 'react';
import {Descriptions, message, Space, Table, Tag} from "antd";
import {fetchProducts, setProductCurrentPage, setProductPerPage, setProductSelectedRow} from "../productSlice";
import {useDispatch, useSelector} from "react-redux";
import {PaginationConfig} from "../../../../config/tableConfig";
import {currencyFormatter} from "../../../../helper/currency";

const ProductList = () => {
    const dispatch = useDispatch()
    const {
        productData,
        productTotalData,
        productStatus,
        productFilter,
        productCurrentPage,
        productPerPage,
        productSelectedRow
    } = useSelector(state => state.products)

    useEffect(() => {
        try {
            if (productStatus === "idle") {
                dispatch(fetchProducts({
                    page: productCurrentPage,
                    perPage: productPerPage,
                    supplier_id: productFilter.suppliers?.key,
                    category_id: productFilter.categories?.map(({key}) => `${key}`).join(','),
                    search_text: productFilter.search_text
                })).unwrap()
            }
        } catch (e) {
            console.log(e)
            return message.error(e)
        }
    }, [productStatus])

    const columns = [
        {
            title: 'Product',
            children: [
                {
                    title: 'Code',
                    key: 'code',
                    width: '10%',
                    render: (_, {code}) => (
                        <Tag color={"geekblue-inverse"} key={code}>
                            {code}120230
                        </Tag>
                    ),
                },
                {
                    title: 'Name',
                    key: 'name',
                    width: '30%',
                    dataIndex: 'name',
                },
            ]
        },
        Table.EXPAND_COLUMN,
        {
            title: 'Category',
            key: 'categories',
            render: (_, {categories}) => (
                <Space size={[0, 8]} wrap>
                    {categories.map((category) => {
                        return (
                            <Tag color={"green-inverse"} key={category.id}>
                                {category.name.toUpperCase()}
                            </Tag>
                        );
                    })}
                </Space>
            ),
        },
        {
            title: 'Supplier',
            key: 'supplier',
            width: "15%",
            dataIndex: "supplier"
        },
    ];

    const pagination = PaginationConfig(
        productCurrentPage,
        productPerPage,
        productTotalData,
        (current, size) => dispatch(setProductPerPage(size)),
        (page) => dispatch(setProductCurrentPage(page))
    )

    return (
        <Table
            loading={productStatus === 'loading'}
            scroll={{x: true, y: 350}}
            bordered
            rowKey={record => record.key}
            rowSelection={{
                preserveSelectedRowKeys: true,
                selectedRowKeys: productSelectedRow,
                onChange: (selectedRowKeys) => {
                    dispatch(setProductSelectedRow(selectedRowKeys))
                }
            }}
            columns={columns}
            dataSource={productData}
            pagination={pagination}
            onRow={(record) => {
                return {
                    onClick: () => {
                        const selectedKeys = [...productSelectedRow];
                        const index = selectedKeys.indexOf(record.key);
                        if (index > -1) {
                            selectedKeys.splice(index, 1);
                        } else {
                            selectedKeys.push(record.key);
                        }
                        dispatch(setProductSelectedRow(selectedKeys))
                    },
                };
            }}
            expandable={{
                expandedRowRender: ({sell_price, buy_price, current_stock, description}) => (
                    <Descriptions bordered>
                        <Descriptions.Item label="Sell Price">Rp. {currencyFormatter(sell_price)}</Descriptions.Item>
                        <Descriptions.Item label="Buy Price">Rp. {currencyFormatter(buy_price)}</Descriptions.Item>
                        <Descriptions.Item label="Current Stock">{currencyFormatter(current_stock)}</Descriptions.Item>
                        <Descriptions.Item label="Product Description" span={3}>
                            {description}
                        </Descriptions.Item>
                    </Descriptions>
                ),
            }}
        />
    );
};

export default ProductList;