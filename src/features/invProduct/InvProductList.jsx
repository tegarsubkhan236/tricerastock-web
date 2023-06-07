import React, {useEffect} from 'react';
import {Avatar, message, Space, Table, Tag} from "antd";
import {deleteProduct, setModalType, setModalVisible, setCurrentPage, setPerPage, fetchProductByFilter} from "./invProductSlice";
import {useDispatch, useSelector} from "react-redux";
import {ColumnConfig, PaginationConfig} from "../../config/utils/tableConfig";

const InvProductList = ({form}) => {
    const dispatch = useDispatch()
    const {data, status, filter, currentPage, perPage} = useSelector(state => state.products)

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
            return message.error(e)
        }
    }, [dispatch, currentPage, perPage, filter])

    const columnData = [
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
    const columns = ColumnConfig(columnData, form, setModalType, setModalVisible, deleteProduct, setCurrentPage)
    const pagination = PaginationConfig(currentPage, perPage, data?.total, setPerPage, setCurrentPage)

    let dataSource = [];
    if (status === 'succeeded') {
        data?.results.map((item) => (
            dataSource = [...dataSource, {
                key: item.id,
                id: item.id,
                name: item.name,
                supplier: item.inv_supplier,
                categories: item.inv_product_category
            }]
        ))
    }
    
    return (
        <Table
            loading={status === 'loading'}
            dataSource={dataSource}
            pagination={pagination}
            columns={columns}
            scroll={{x: true, y: 350}}
            bordered
        />
    );
};

export default InvProductList;