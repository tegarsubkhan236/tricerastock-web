import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductCategory, setCurrentPage, setPerPage} from './msInvProductCategorySlice';
import {Table} from "antd";

const MsInvProductCategories = ({columns, expandedRowKeys, setExpandedRowKeys}) => {
    const dispatch = useDispatch();
    const {data, status, currentPage, perPage} = useSelector((state) => state.productCategories);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProductCategory({page: currentPage, perPage}));
        }
    }, [currentPage, dispatch, perPage, status]);

    const pagination = {
        current: currentPage,
        pageSize: perPage,
        total: data?.data?.total,
        showSizeChanger: true,
        onShowSizeChange: (current, size) => dispatch(setPerPage(size)),
        onChange: (page) => dispatch(setCurrentPage(page)),
    };
    let dataSource = [];
    if (status === 'succeeded') {
        data.map((item) => (
            dataSource = [...dataSource, {
                key: item.id,
                id: item.id,
                name: item.name,
                parent_id: item.parent_id,
                children: item.children?.length && item.children?.map((firstChild) => ({
                    key: firstChild.id,
                    id: firstChild.id,
                    name: firstChild.name,
                    parent_id: firstChild.parent_id,
                    children: firstChild.children?.length && firstChild.children?.map((secondChild) => ({
                        key: secondChild.id,
                        id: secondChild.id,
                        name: secondChild.name,
                        parent_id: secondChild.parent_id,
                    }))
                }))
            }]
        ))
    }

    return (
        <Table
            loading={status === 'loading'}
            dataSource={dataSource}
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