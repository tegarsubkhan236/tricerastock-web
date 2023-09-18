import React, {useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Switch, Table} from "antd";
import DynamicAlert from "../../../../views/components/Alert/DynamicAlert";
import {fetchSupplier} from "../supplierSlice";
import {SupplierTableContext} from "./index";
import {PaginationConfig} from "../../../../config";

const SupplierTable = () => {
    const dispatch = useDispatch();
    const {supplierData, supplierTotalData, supplierStatus} = useSelector((state) => state.suppliers);
    const {
        perPage,
        currentPage,
        handlePageChange,
        handlePageSizeChange,
        selectedRow,
        setSelectedRow,
        filter,
        errorMessage,
        handleErrorMessage,
        successMessage,
        handleSuccessMessage,
    } = useContext(SupplierTableContext);

    useEffect(() => {
        try {
            if (supplierStatus === "idle") {
                dispatch(fetchSupplier({
                    page: currentPage,
                    perPage: perPage,
                    column: {...filter},
                })).unwrap();
            }
        } catch (e) {
            console.log(e)
        }
    }, [supplierStatus]);

    const pagination = PaginationConfig(
        currentPage,
        perPage,
        supplierTotalData,
        handlePageSizeChange,
        handlePageChange,
    );

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Contact',
            children: [
                {
                    title: 'Contact Person',
                    dataIndex: 'contact_person',
                    key: 'contact_person',
                },
                {
                    title: 'Contact Number',
                    dataIndex: 'contact_number',
                    key: 'contact_number',
                },
            ],
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => (
                <Switch checkedChildren="Active" unCheckedChildren="InActive" defaultChecked={record.status === 1} />
            ),
        },
    ];

    return (
        <>
            {errorMessage.length > 0 && <DynamicAlert
                alertMessage={errorMessage}
                alertType={"error"}
                alertOnClose={() => handleErrorMessage([])}
            />}
            {successMessage.length > 0 && <DynamicAlert
                alertMessage={successMessage}
                alertType={"success"}
                alertOnClose={() => handleSuccessMessage([])}
            />}
            <Table
                loading={supplierStatus === "loading"}
                dataSource={supplierData}
                columns={columns}
                pagination={pagination}
                scroll={{ x: true }}
                bordered
                rowKey={record => record.key}
                rowSelection={{
                    preserveSelectedRowKeys: true,
                    selectedRowKeys: selectedRow,
                    onChange: (selectedRowKeys) => {
                        setSelectedRow(selectedRowKeys)
                    },
                }}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            const selectedKeys = [...selectedRow];
                            const index = selectedKeys.indexOf(record.key);
                            if (index > -1) {
                                selectedKeys.splice(index, 1);
                            } else {
                                selectedKeys.push(record.key);
                            }
                            setSelectedRow(selectedKeys)
                        },
                    };
                }}
            />
        </>
    );
};

export default SupplierTable;