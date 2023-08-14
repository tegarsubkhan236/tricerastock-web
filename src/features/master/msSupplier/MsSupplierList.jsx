import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Switch, Table} from "antd";
import {PaginationConfig} from "../../../config/helper/tableConfig";
import {fetchSupplier, setSupplierCurrentPage, setSupplierPerPage, setSupplierSelectedRow} from './msSupplierSlice';

const MsSupplierList = () => {
    const dispatch = useDispatch();
    const {
        supplierData,
        supplierTotalData,
        supplierSelectedRow,
        supplierFilter,
        supplierStatus,
        supplierCurrentPage,
        supplierPerPage
    } = useSelector((state) => state.suppliers);

    useEffect(() => {
        try {
            if (supplierStatus === "idle") {
                dispatch(fetchSupplier({
                    page: supplierCurrentPage,
                    perPage: supplierPerPage,
                    column: {...supplierFilter},
                })).unwrap();
            }
        } catch (e) {
            return console.log(e)
        }
    }, [supplierStatus]);

    const pagination = PaginationConfig(
        supplierCurrentPage,
        supplierPerPage,
        supplierTotalData,
        (current, size) => dispatch(setSupplierPerPage(size)),
        (page) => dispatch(setSupplierCurrentPage(page))
    );

    const columns = [{
        title: 'ID', dataIndex: 'id', key: 'id',
    }, {
        title: 'Name', key: 'name', dataIndex: 'name',
    }, {
        title: 'Address', dataIndex: 'address', key: 'address',
    }, {
        title: 'Contact', children: [{
            title: 'Contact Person', dataIndex: 'contact_person', key: 'contact_person'
        }, {
            title: 'Contact Number', dataIndex: 'contact_number', key: 'contact_number'
        }]
    }, {
        title: 'Status',
        key: 'status',
        render: (_, record) => (
            <Switch checkedChildren="Active" unCheckedChildren="InActive" defaultChecked={record.status === 1}/>)
    }];

    return (<Table
        loading={supplierStatus === "loading"}
        dataSource={supplierData}
        columns={columns}
        pagination={pagination}
        scroll={{x: true}}
        bordered
        rowKey={record => record.key}
        rowSelection={{
            preserveSelectedRowKeys: true,
            selectedRowKeys : supplierSelectedRow,
            onChange: (selectedRowKeys) => {
                dispatch(setSupplierSelectedRow(selectedRowKeys))
            }
        }}
        onRow={(record) => {
            return {
                onClick: () => {
                    const selectedKeys = [...supplierSelectedRow];
                    const index = selectedKeys.indexOf(record.key);
                    if (index > -1) {
                        selectedKeys.splice(index, 1);
                    } else {
                        selectedKeys.push(record.key);
                    }
                    dispatch(setSupplierSelectedRow(selectedKeys))
                },
            };
        }}
    />);
};

export default MsSupplierList;