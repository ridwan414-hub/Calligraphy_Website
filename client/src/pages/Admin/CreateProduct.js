import React, { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select, Input, Button, Upload, Form, InputNumber, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

const CreateProduct = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCreate = useCallback(async (values) => {
        setLoading(true);
        try {
            const productData = new FormData();
            Object.keys(values).forEach(key => {
                if (key === 'photo') {
                    productData.append('photo', values.photo.file);
                } else {
                    productData.append(key, values[key]);
                }
            });

            const { data } = await axios.post('/api/v1/product/create-product', productData);
            if (data?.success) {
                toast.success('Product created successfully');
                navigate('/dashboard/admin/products');
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Error occurred while creating product');
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    const getAllCategories = useCallback(async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-categories');
            if (data?.success) {
                setCategories(data?.categories);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch categories");
        }
    }, []);

    useEffect(() => {
        getAllCategories();
    }, [getAllCategories]);

    return (
        <Spin spinning={loading}>
            <div className="p-4">
                <h1 className="text-3xl font-bold mb-4">Create Product</h1>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleCreate}
                    className="max-w-2xl mx-auto"
                >
                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: 'Please select a category' }]}
                    >
                        <Select placeholder="Select a category">
                            {categories.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="photo"
                        label="Product Photo"
                        rules={[{ required: true, message: 'Please upload a photo' }]}
                    >
                        <Upload beforeUpload={() => false} listType="picture" maxCount={1}>
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="Product Name"
                        rules={[{ required: true, message: 'Please enter product name' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter product description' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please enter product price' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="quantity"
                        label="Quantity"
                        rules={[{ required: true, message: 'Please enter product quantity' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="shipping"
                        label="Shipping"
                        rules={[{ required: true, message: 'Please select shipping option' }]}
                    >
                        <Select>
                            <Option value="0">No</Option>
                            <Option value="1">Yes</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Create Product
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Spin>
    );
};

export default CreateProduct;