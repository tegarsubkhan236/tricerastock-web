import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUsers, setCurrentPage} from './usersSlice';
import {Table} from "antd";

const UsersList = ({columns}) => {
    const dispatch = useDispatch();
    const {data, isLoading, error, currentPage, perPage} = useSelector((state) => state.users);
    useEffect(() => {
        dispatch(fetchUsers({page: currentPage, perPage}));
    }, [dispatch, currentPage, perPage, data?.data?.total]);

    const pagination = {
        current: currentPage,
        pageSize: perPage,
        total: data?.data?.total,
        onChange: (page) => dispatch(setCurrentPage(page)),
    };
    let dataSource = [];
    if (isLoading === false && error === null) {
        data?.data?.results.map((user) => (
            dataSource = [...dataSource, {
                key: user.ID,
                ID: user.ID,
                name: user.username,
                username: user.username,
                email: user.username,
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

export default UsersList;