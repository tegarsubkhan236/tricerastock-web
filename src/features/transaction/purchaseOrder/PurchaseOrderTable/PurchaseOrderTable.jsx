import React, {useEffect, useState} from 'react';
import {Button, Modal, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {fetchPo, setPoCurrentPage, setPoPerPage} from "../purchaseOrderSlice";
import {EyeOutlined} from "@ant-design/icons";
import {PaginationConfig} from "../../../../config";
import {currencyFormatter} from "../../../../helper/currency";
import {transformTransactionStatus} from "../../../../helper/constants";

const PurchaseOrderTable = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const {
        poData,
        poTotalData,
        poStatus,
        poCurrentPage,
        poPerPage,
    } = useSelector((state) => state.purchaseOrders);

    useEffect(() => {
        try {
            dispatch(fetchPo({page: poCurrentPage, perPage: poPerPage,})).unwrap();
        } catch (e) {
            return console.log(e)
        }
    }, []);

    const handlePageChange = (page) => {
        console.log("page", page)
        dispatch(setPoCurrentPage(page));
    };

    const handlePageSizeChange = (current, size) => {
        console.log("size", size)
        dispatch(setPoPerPage(size));
    };

    const pagination = PaginationConfig(
        poCurrentPage,
        poPerPage,
        poTotalData,
        handlePageSizeChange,
        handlePageChange
    );

    const showModal = (products, code) => {
        setIsModalOpen(true);
        setModalData({code, products})
    };

    const columns = [
        {
            title: 'PO Code',
            dataIndex: 'po_code',
        },
        {
            title: 'Supplier',
            dataIndex: 'supplier_name',
        },
        {
            title: 'Prices',
            children: [
                {
                    title: 'Discount',
                    render: (_, { disc }) => `${disc} %`,
                },
                {
                    title: 'Tax',
                    render: (_, { tax }) => `${tax} %`,
                },
                {
                    title: 'Total Amount',
                    render: (_, { amount }) => `Rp. ${currencyFormatter(amount)}`,
                },
            ],
        },
        {
            title: 'PO Products',
            align: 'center',
            render: (_, { purchase_order_products, po_code }) => (
                <Button
                    type="primary"
                    shape="circle"
                    icon={<EyeOutlined />}
                    onClick={() => showModal(purchase_order_products, po_code)}
                />
            ),
        },
        {
            title: 'Status',
            render: (_, { status }) => transformTransactionStatus(status),
        },
    ];

    const product_columns = [
        {
            title: 'Product',
            key: 'product_name',
            dataIndex: 'product_name',
        }, {
            title: 'Quantity',
            key: 'quantity',
            render: (_, {quantity}) => currencyFormatter(quantity)
        }, {
            title: 'Buy Price',
            key: 'buy_price',
            render: (_, {price}) => `Rp. ${currencyFormatter(price)}`
        }
    ];

    const expandedRowRender = (record) => {
        if (record.back_orders) {
            const bo_columns = [
                {
                    title: 'BO Code',
                    dataIndex: 'bo_code',
                },
                {
                    title: 'Total Amount',
                    render: (_, { amount }) => `Rp. ${currencyFormatter(amount)}`,
                },
                {
                    title: 'BO Products',
                    align: 'center',
                    render: (_, { back_order_products, bo_code }) => (
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EyeOutlined />}
                            onClick={() => showModal(back_order_products, bo_code)}
                        />
                    ),
                },
                {
                    title: 'Status',
                    render: (_, { status }) => transformTransactionStatus(status),
                },
            ];

            return (
                <Table
                    columns={bo_columns}
                    dataSource={record.back_orders}
                    pagination={false}
                    size="small"
                />
            );
        }
    };

    return (
        <>
            <Table
                loading={poStatus === 'loading'}
                bordered
                size="small"
                dataSource={poData}
                columns={columns}
                pagination={pagination}
                scroll={{ x: true }}
                expandable={{
                    expandedRowRender,
                    defaultExpandedRowKeys: ['0'],
                }}
                rowKey={(record) => record.key}
            />
            <Modal
                title={`Products from ${modalData.code}`}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Table
                    dataSource={modalData.products}
                    columns={product_columns}
                    pagination={false}
                    rowKey={(item) => item.key}
                />
            </Modal>
        </>
    );
};

export default PurchaseOrderTable;