import React, {useEffect} from 'react';
import {Avatar, Button, message, Space, Table, Tag} from "antd";
import {fetchProducts, setProductCurrentPage, setProductPerPage, setProductSelectedRow} from "./invProductSlice";
import {useDispatch, useSelector} from "react-redux";
import {PaginationConfig} from "../../config/helper/tableConfig";
import {currencyFormatter} from "../../config/helper/currency";

const InvProductList = () => {
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
                    title: 'Image',
                    key: 'img',
                    render: (_, {name}) => (
                        <Avatar
                            style={{
                                backgroundColor: '#f56a00',
                                verticalAlign: 'middle',
                            }}
                            size="large"
                        >
                            {name}
                        </Avatar>
                    )
                },
                {
                    title: 'Name',
                    key: 'name',
                    dataIndex: 'name',
                    width: "35%"
                },
                {
                    title: 'Price',
                    key: 'price',
                    render: (_, {cost}) => (
                        <Button onClick={() => console.log('cek')}>
                            {currencyFormatter(cost)}
                        </Button>
                    )
                },
            ]
        },
        {
            title: 'Category',
            key: 'categories',
            render: (_, {categories}) => (
                <Space size={[0, 8]} wrap>
                    {categories.map((category) => {
                        return (
                            <Tag color={"geekblue"} key={category.id}>
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
            render: (_, {supplier}) => (
                supplier.name
            )
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
                selectedRowKeys : productSelectedRow,
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
        />
    );
};

export default InvProductList;