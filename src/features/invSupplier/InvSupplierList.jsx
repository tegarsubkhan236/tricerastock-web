import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {message, Switch, Table} from "antd";
import {PaginationConfig} from "../../config/utils/tableConfig";
import {fetchSupplier, setCurrentPage, setPerPage} from './invSupplierSlice';

const InvSupplierList = () => {
    const dispatch = useDispatch();
    const {data, status, currentPage, perPage} = useSelector((state) => state.suppliers);

    useEffect(() => {
        try {
            dispatch(fetchSupplier({
                page: currentPage,
                perPage: perPage
            })).unwrap();
        } catch (e) {
            return message.error(e)
        }
    }, [dispatch, currentPage, perPage]);

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
                    key: 'contact_person'
                },
                {
                    title: 'Contact Number',
                    dataIndex: 'contact_number',
                    key: 'contact_number'
                }
            ]
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => (
                <Switch checkedChildren="Active" unCheckedChildren="InActive" defaultChecked={record.status === 1}/>
            )
        }
    ];
    const pagination = PaginationConfig(currentPage, perPage, data?.data?.total, setPerPage, setCurrentPage);

    let dataSource = [];
    if (status === 'succeeded') {
        data?.data?.results.map((item) => (
            dataSource = [...dataSource, {
                key: item.id,
                id: item.id,
                name: item.name,
                address: item.address,
                contact_person: item.contact_person,
                contact_number: item.contact_number,
                status: item.status,
            }]
        ))
    }

    return (
        <Table
            loading={status === "loading"}
            dataSource={dataSource}
            columns={columns}
            pagination={pagination}
            scroll={{ x: true }}
            bordered
        />
    );
};

export default InvSupplierList;