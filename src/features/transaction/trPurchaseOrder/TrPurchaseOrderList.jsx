import React, {useEffect, useState} from 'react';
import {Badge, Button, Modal, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {PaginationConfig} from "../../../config/helper/tableConfig";
import {fetchPo, setPoCurrentPage, setPoPerPage} from "./trPurchaseOrderSlice";
import {currencyFormatter} from "../../../config/helper/currency";
import {EyeOutlined} from "@ant-design/icons";
import {generateTransactionStatus} from "../../../config/helper/transactionStatus";

const TrPurchaseOrderList = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const {poData, poTotalData, poStatus, poCurrentPage, poPerPage} = useSelector((state) => state.purchaseOrders);

    useEffect(() => {
        try {
            if (poStatus === "idle") {
                dispatch(fetchPo({
                    page: poCurrentPage,
                    perPage: poPerPage,
                })).unwrap();
            }
        } catch (e) {
            return console.log(e)
        }
    }, [poStatus]);

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

    const po_columns = [
        {
            title: 'PO Code',
            key: 'po_code',
            dataIndex: 'po_code',
        }, {
            title: 'Supplier',
            key: 'supplier_name',
            dataIndex: 'supplier_name',
        }, {
            title: 'Prices',
            children: [
                {
                    title: 'Discount',
                    key: 'disc',
                    render: (_, {disc}) => `${disc} %`
                }, {
                    title: 'Tax',
                    key: 'tax',
                    render: (_, {tax}) => `${tax} %`
                }, {
                    title: 'Total Amount',
                    key: 'amount',
                    render: (_, {amount}) => `Rp. ${currencyFormatter(amount)}`
                }
            ]
        }, {
            title: 'PO Products',
            key: 'po_product',
            align: 'center',
            render: (_, {purchase_order_products, po_code}) => (
                <Button type="primary"
                        shape="circle"
                        icon={<EyeOutlined/>}
                        onClick={() => showModal(purchase_order_products, po_code)}/>
            )
        }, {
            title: 'Status',
            key: 'status',
            render: (_, {status}) => generateTransactionStatus(status),
        }
    ];

    const bo_columns = [
        {
            title: 'BO Code',
            key: 'bo_code',
            dataIndex: 'bo_code',
        }, {
            title: 'Total Amount',
            key: 'amount',
            render: (_, {amount}) => `Rp. ${currencyFormatter(amount)}`
        }, {
            title: 'BO Products',
            key: 'bo_product',
            align: 'center',
            render: (_, {back_order_products, bo_code}) => (
                <Button type="primary"
                        shape="circle"
                        icon={<EyeOutlined/>}
                        onClick={() => showModal(back_order_products, bo_code)}/>
            )
        }, {
            title: 'Status',
            key: 'status',
            render: (_, {status}) => generateTransactionStatus(status)
        }
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
        if (record.back_orders != null) {
            return <Table columns={bo_columns} dataSource={record.back_orders} pagination={false} size={"small"}/>;
        }
    };

    return (
        <>
            <Table
                loading={poStatus === "loading"}
                bordered={true}
                size={"small"}
                dataSource={poData}
                columns={po_columns}
                pagination={pagination}
                scroll={{x: true}}
                expandable={{
                    expandedRowRender,
                    defaultExpandedRowKeys: ['0'],
                }}
                rowKey={(record) => record.key}
            />
            <Modal title={`Products from ${modalData.code}`}
                   open={isModalOpen}
                   onCancel={() => setIsModalOpen(false)}
                   key={modalData.code}
                   footer={null}
            >
                <Table dataSource={modalData.products} columns={product_columns} pagination={false} rowKey={modalData.code}/>
            </Modal>
        </>
    );
};

export default TrPurchaseOrderList;