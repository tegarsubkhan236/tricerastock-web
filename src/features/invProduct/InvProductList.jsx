import React, {useEffect, useState} from 'react';
import {Avatar, Button, message, Space, Table, Tag} from "antd";
import {setCurrentPage, setPerPage, fetchProductByFilter, setSelectedRow} from "./invProductSlice";
import {useDispatch, useSelector} from "react-redux";
import {PaginationConfig} from "../../config/utils/tableConfig";

const InvProductList = () => {
    const dispatch = useDispatch()
    const {data, totalData, status, filter, currentPage, perPage} = useSelector(state => state.products)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        try {
            dispatch(fetchProductByFilter({
                page: currentPage,
                perPage: perPage,
                supplier_id: filter.suppliers?.key,
                category_id: filter.categories?.map(({key}) => `${key}`).join(','),
                search_text: filter.search_text
            })).unwrap()
        } catch (e) {
            console.log(e)
            return message.error(e)
        }
    }, [dispatch, currentPage, perPage, filter])

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
                    render: (_, {name}) => (
                        <Button onClick={() => console.log('cek')}>
                            23.000
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
    const pagination = PaginationConfig(currentPage, perPage, totalData, setPerPage, setCurrentPage)

    return (
        <Table
            loading={status === 'loading'}
            scroll={{x: true, y: 350}}
            bordered
            rowKey={record => record.key}
            rowSelection={{
                preserveSelectedRowKeys: true,
                selectedRowKeys,
                onChange: (selectedRowKeys) => {
                    setSelectedRowKeys(selectedRowKeys);
                    dispatch(setSelectedRow(selectedRowKeys))
                }
            }}
            columns={columns}
            dataSource={data}
            pagination={pagination}
            onRow={(record) => {
                return {
                    onClick: () => {
                        const selectedKeys = [...selectedRowKeys];
                        const index = selectedKeys.indexOf(record.key);
                        if (index > -1) {
                            selectedKeys.splice(index, 1);
                        } else {
                            selectedKeys.push(record.key);
                        }
                        setSelectedRowKeys(selectedKeys)
                        dispatch(setSelectedRow(selectedKeys))
                    },
                };
            }}
        />
    );
};

export default InvProductList;