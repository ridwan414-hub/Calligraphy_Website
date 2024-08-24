import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import { Select, Table, Card, Image, Spin } from "antd";
import { useAuth } from "../../context/auth";

const { Option } = Select;

const AdminOrders = () => {
    const statusOptions = [
        "Not Processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
    ];
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [auth] = useAuth();

    const getOrders = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("/api/v1/auth/all-orders");
            setOrders(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token, getOrders]);

    const handleChange = useCallback(async (orderId, value) => {
        setLoading(true);
        try {
            await axios.put(`/api/v1/auth/order-status/${orderId}`, {
                status: value,
            });
            getOrders();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [getOrders]);

    const columns = [
        {
            title: 'Order ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <Select
                    defaultValue={status}
                    onChange={(value) => handleChange(record._id, value)}
                    style={{ width: 120 }}
                >
                    {statusOptions.map((s, i) => (
                        <Option key={i} value={s}>
                            {s}
                        </Option>
                    ))}
                </Select>
            ),
        },
        {
            title: 'Buyer',
            dataIndex: ['buyer', 'name'],
            key: 'buyer',
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'date',
            render: (date) => moment(date).format('MMMM Do YYYY, h:mm:ss a'),
        },
        {
            title: 'Payment',
            dataIndex: ['payment', 'success'],
            key: 'payment',
            render: (success) => success ? "Success" : "Failed",
        },
        {
            title: 'Quantity',
            dataIndex: 'products',
            key: 'quantity',
            render: (products) => products.length,
        },
    ];

    const expandedRowRender = (record) => (
        <Card title="Products">
            {record.products.map((p) => (
                <Card.Grid style={{ width: '33.33%' }} key={p._id}>
                    <Image
                        src={`/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        width={100}
                    />
                    <p><strong>{p.name}</strong></p>
                    <p>{p.description.substring(0, 30)}...</p>
                    <p>Price: ${p.price}</p>
                </Card.Grid>
            ))}
        </Card>
    );

    return (
        <Spin spinning={loading}>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">All Orders</h1>
                <Table
                    columns={columns}
                    dataSource={orders}
                    rowKey="_id"
                    expandable={{
                        expandedRowRender,
                    }}
                />
            </div>
        </Spin>
    );
};

export default AdminOrders;