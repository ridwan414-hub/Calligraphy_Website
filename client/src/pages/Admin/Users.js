import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Table, Button, Spin, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllUsers = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("/api/v1/auth/all-users");
            console.log(data)
            if (data) {
                setUsers(data);
            }
        } catch (error) {
            console.error(error);
            message.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

    const toggleBan = async (userId, isBanned) => {
        try {
            await axios.put(`/api/v1/auth/toggle-ban/${userId}`, { isBanned: !isBanned });
            message.success(`User ${isBanned ? 'unbanned' : 'banned'} successfully`);
            getAllUsers();
        } catch (error) {
            console.error(error);
            message.error('Failed to update user status');
        }
    };

    const deleteUser = (userId) => {
        confirm({
            title: 'Are you sure you want to delete this user?',
            icon: <ExclamationCircleOutlined />,
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await axios.delete(`/api/v1/auth/delete-user/${userId}`);
                    message.success('User deleted successfully');
                    getAllUsers();
                } catch (error) {
                    console.error(error);
                    message.error('Failed to delete user');
                }
            },
        });
    };
    console.log(users)
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button
                        type={record.isBanned ? 'primary' : 'default'}
                        onClick={() => toggleBan(record._id, record.isBanned)}
                        className="mr-2"
                    >
                        {record.isBanned ? 'Unban' : 'Ban'}
                    </Button>
                    <Button danger onClick={() => deleteUser(record._id)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <Spin spinning={loading}>
                <Table
                    columns={columns}
                    dataSource={users}
                    rowKey="_id"
                    pagination={{ pageSize: 10 }}
                />
            </Spin>
        </div>
    );
};

export default Users;