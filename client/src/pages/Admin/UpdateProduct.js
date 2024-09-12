import React, { useEffect, useState, useCallback } from 'react';
import { Form, Input, InputNumber, Select, Button, message, Spin, Upload, Typography, Row, Col, Divider } from 'antd';
import { LoadingOutlined, PlusOutlined, SaveOutlined, DeleteOutlined, RollbackOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const UpdateProduct = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { slug } = useParams();

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [categories, setCategories] = useState([]);
    const [productId, setProductId] = useState(''); // State to store product._id

    const fetchProductDetails = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${slug}`);
            const product = data.product;
            form.setFieldsValue({
                name: product.name,
                description: product.description,
                price: product.price,
                quantity: product.quantity,
                shipping: product.shipping ? "1" : "0",
                category: product.category._id
            });
            setImageUrl(`/api/v1/product/product-photo/${product._id}`);
            setProductId(product._id); // Store the product._id
        } catch (error) {
            console.error(error);
            message.error("Failed to fetch product details");
        } finally {
            setLoading(false);
        }
    }, [slug, form]);

    const fetchCategories = useCallback(async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-categories');
            setCategories(data.categories);
        } catch (error) {
            console.error(error);
            message.error("Failed to fetch categories");
        }
    }, []);

    useEffect(() => {
        fetchProductDetails();
        fetchCategories();
    }, [fetchProductDetails, fetchCategories]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const formData = new FormData();
            Object.keys(values).forEach(key => {
                if (key === 'photo' && values.photo) {
                    formData.append('photo', values.photo.file);
                } else {
                    formData.append(key, values[key]);
                }
            });

            await axios.put(`/api/v1/product/update-product/${productId}`, formData); // Use productId
            message.success('Product updated successfully');
            navigate('/dashboard/admin/products');
        } catch (error) {
            console.error(error);
            message.error('Failed to update product');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`/api/v1/product/delete-product/${productId}`); // Use productId
            message.success('Product deleted successfully');
            navigate('/dashboard/admin/products');
        } catch (error) {
            console.error(error);
            message.error('Failed to delete product');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = ({ file }) => {
        setImageUrl(URL.createObjectURL(file));
        form.setFieldsValue({ photo: file });
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Spin spinning={loading}>
            <Row gutter={24}>
                <Col span={12}>
                    <div style={{ padding: '20px', background: '#f0f2f5', borderRadius: '8px', height: '100%' }}>
                        <Title level={2}>
                            <SaveOutlined /> Update Product
                        </Title>
                        <Divider />
                        <Upload
                            name="photo"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={handleImageChange}
                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="product"
                                    style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover' }}
                                />
                            ) : uploadButton}
                        </Upload>
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ padding: '20px' }}>
                        <Form form={form} layout="vertical" onFinish={onFinish}>
                            <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
                                <Input prefix={<i className="fas fa-box" />} />
                            </Form.Item>
                            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                                <TextArea rows={4} prefix={<i className="fas fa-info-circle" />} />
                            </Form.Item>
                            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                                <InputNumber
                                    style={{ width: '100%' }}
                                    formatter={value => `Tk ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            </Form.Item>
                            <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                                <Select>
                                    {categories.map(c => (
                                        <Option key={c._id} value={c._id}>{c.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="shipping" label="Shipping" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                                    Update Product
                                </Button>
                                <Button type="danger" onClick={handleDelete} icon={<DeleteOutlined />} style={{ marginLeft: '10px' }}>
                                    Delete Product
                                </Button>
                                <Button onClick={() => navigate('/dashboard/admin/products')} icon={<RollbackOutlined />} style={{ marginLeft: '10px' }}>
                                    Go Back
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Spin>
    );
};

export default UpdateProduct;
