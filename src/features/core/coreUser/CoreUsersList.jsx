import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {message, Switch, Table} from "antd";
import {fetchUsers, setUserCurrentPage, setUserPerPage, setUserSelectedRow} from './coreUsersSlice';

const CoreUsersList = () => {
    const dispatch = useDispatch();
    const {
        userData,
        userTotalData,
        userSelectedRow,
        userFilter,
        userStatus,
        userCurrentPage,
        userPerPage,
    } = useSelector((state) => state.users);

    useEffect(() => {
        try {
            if (userStatus === "idle") {
                dispatch(fetchUsers({
                    page: userCurrentPage,
                    perPage: userPerPage,
                    column: {...userFilter},
                })).unwrap();
            }
        } catch (e) {
            console.log(e)
            return message.error(e)
        }
    }, [userStatus]);

    const pagination = {
        current: userCurrentPage,
        pageSize: userPerPage,
        total: userTotalData,
        onShowSizeChange: (current, size) => dispatch(setUserPerPage(size)),
        onChange: (page) => dispatch(setUserCurrentPage(page)),
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ["sm"],
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => (
                <Switch checkedChildren="Active" unCheckedChildren="InActive" defaultChecked={record.id !== 3}/>
            )
        }
    ];

    return (
        <Table
            loading={userStatus}
            dataSource={userData}
            columns={columns}
            pagination={pagination}
            scroll={{x: true, y: 350}}
            bordered
            rowKey={record => record.key}
            rowSelection={{
                preserveSelectedRowKeys: true,
                selectedRowKeys: userSelectedRow,
                onChange: (selectedRowKeys) => {
                    dispatch(setUserSelectedRow(selectedRowKeys))
                }
            }}
            onRow={(record) => {
                return {
                    onClick: () => {
                        const selectedKeys = [...userSelectedRow];
                        const index = selectedKeys.indexOf(record.key);
                        if (index > -1) {
                            selectedKeys.splice(index, 1);
                        } else {
                            selectedKeys.push(record.key);
                        }
                        dispatch(setUserSelectedRow(selectedKeys))
                    },
                };
            }}
        />
    );
};

export default CoreUsersList;