import React, { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal, Button, Table, Spin } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post('/api/v1/category/create-category', { name });
            if (data?.success) {
                toast.success(data.message);
                setName('');
                getAllCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to create category");
        } finally {
            setLoading(false);
        }
    }, [name]);

    const handleUpdate = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedName });
            if (data?.success) {
                toast.success(data.message);
                setSelected(null);
                setUpdatedName('');
                setVisible(false);
                getAllCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update category");
        } finally {
            setLoading(false);
        }
    }, [selected, updatedName]);

    const handleDelete = useCallback(async (id) => {
        setLoading(true);
        try {
            const { data } = await axios.delete(`/api/v1/category/delete-category/${id}`);
            if (data?.success) {
                toast.success(`Category deleted successfully`);
                getAllCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete category");
        } finally {
            setLoading(false);
        }
    }, []);

    const getAllCategories = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/v1/category/get-categories');
            if (data?.success) {
                setCategories(data?.categories);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch categories");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getAllCategories();
    }, [getAllCategories]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setVisible(true);
                            setUpdatedName(record.name);
                            setSelected(record);
                        }}
                        className="mr-2"
                    >
                        Edit
                    </Button>
                    <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record._id)}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>
            <div className="mb-6">
                <CategoryForm
                    handleSubmit={handleSubmit}
                    value={name}
                    setValue={setName}
                    buttonText="Create Category"
                    loading={loading}
                />
            </div>
            <Spin spinning={loading}>
                <Table columns={columns} dataSource={categories} rowKey="_id" />
            </Spin>
            <Modal
                title="Edit Category"
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <CategoryForm
                    handleSubmit={handleUpdate}
                    value={updatedName}
                    setValue={setUpdatedName}
                    buttonText="Update Category"
                    loading={loading}
                />
            </Modal>
        </div>
    );
};

export default CreateCategory;