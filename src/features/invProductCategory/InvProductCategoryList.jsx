import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductCategory, setCurrentPage, setPerPage} from './invProductCategorySlice';
import {PaginationConfig} from "../../config/utils/tableConfig";
import {message, Table} from "antd";

const MsInvProductCategories = ({columns, expandedRowKeys, setExpandedRowKeys}) => {
    const dispatch = useDispatch();
    const {treeData, totalData, status, currentPage, perPage} = useSelector((state) => state.productCategories);

    useEffect(() => {
        try {
            dispatch(fetchProductCategory({ page: currentPage, perPage: perPage })).unwrap();
        } catch (e) {
            return message.error(e)
        }
    }, [dispatch, currentPage, perPage]);

    const pagination = PaginationConfig(currentPage, perPage, totalData, setPerPage, setCurrentPage)

    return (
        <Table
            loading={status === 'loading'}
            dataSource={treeData}
            columns={columns}
            pagination={pagination}
            scroll={{ x: true }}
            bordered
            expandable={{
                expandedRowKeys,
                onExpandedRowsChange: (expandedRows) => {
                    setExpandedRowKeys(expandedRows);
                },
            }}
        />
    );
};

export default MsInvProductCategories;