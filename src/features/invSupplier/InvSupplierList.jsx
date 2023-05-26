import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSupplier, setCurrentPage, setPerPage} from './invSupplierSlice';
import {Table} from "antd";

const InvSupplierList = ({columns}) => {
    const dispatch = useDispatch();
    const {data, isLoading, error, currentPage, perPage} = useSelector((state) => state.suppliers);
    useEffect(() => {
        dispatch(fetchSupplier({page: currentPage, perPage}));
    }, [dispatch, currentPage, perPage, data?.data?.total]);

    const pagination = {
        current: currentPage,
        pageSize: perPage,
        total: data?.data?.total,
        showSizeChanger: true,
        onShowSizeChange: (current, size) => dispatch(setPerPage(size)),
        onChange: (page) => dispatch(setCurrentPage(page)),
    };
    let dataSource = [];
    if (isLoading === false && error === null) {
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
            loading={isLoading}
            dataSource={dataSource}
            columns={columns}
            pagination={pagination}
            scroll={{ x: true }}
            bordered
        />
    );
};

export default InvSupplierList;