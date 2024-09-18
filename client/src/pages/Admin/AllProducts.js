import React, { useEffect, useState, useCallback } from 'react';
import { Card, Button, Row, Col, Spin, message } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const { Meta } = Card;

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getAllProducts = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/v1/product/get-products');
            setProducts(data.products);
        } catch (error) {
            console.error(error);
            message.error('Failed to load all products');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getAllProducts();
    }, [getAllProducts]);

    const handleEdit = (slug) => {
        navigate(`/dashboard/admin/product/${slug}`);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">All Products</h1>
            <Spin spinning={loading}>
                <Row gutter={[16, 16]}>
                    {products.map((product) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
                            <Card
                                hoverable
                                cover={
                                    <img
                                        alt={product.name}
                                        src={`/api/v1/product/product-photo/${product._id}`}
                                        style={{ height: 200, objectFit: 'cover' }}
                                    />
                                }
                                actions={[
                                    <Link to={`/dashboard/admin/product/${product.slug}`}>
                                        <EyeOutlined key="view" />
                                    </Link>,
                                    <Button
                                        type="link"
                                        icon={<EditOutlined />}
                                        onClick={() => handleEdit(product.slug)}
                                    >
                                        Edit
                                    </Button>,
                                ]}
                            >
                                <Meta
                                    title={product.name}
                                    description={
                                        <>
                                            <p>{product.description.substring(0, 60)}...</p>
                                            <p className="font-bold mt-2">Price: Tk {product.price}</p>
                                        </>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Spin>
        </div>
    );
};

export default AllProducts;