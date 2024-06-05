import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layouts/Layout';
import AdminMenu from '../../components/Layouts/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom';
const { Option } = Select

const UpdateProduct = () => {
    const navigate = useNavigate()
    const params = useParams()

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    const [photo, setPhoto] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [shipping, setShipping] = useState('')
    const [id, setId] = useState('')

    //get Single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)

            setName(data?.product?.name)
            setId(data?.product?._id)
            setDescription(data?.product?.description)
            setPrice(data?.product?.price)
            setQuantity(data?.product?.quantity)
            setShipping(data?.product?.shipping)
            setCategory(data?.product?.category?._id)
        }
        catch (error) {
            console.log(error)
            toast.error("Failed to fetch product")
        }
    }
    useEffect(() => {
        getSingleProduct()
        // eslint-disable-next-line
    }, [])


    //get all catogories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-categories')
            if (data?.success) { setCategories(data?.categories) }
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch categories")
        }
    }
    useEffect(() => {
        getAllCategories()
    }, [])

    //handle update product form
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append('name', name)
            productData.append('description', description)
            productData.append('price', price)
            productData.append('quantity', quantity)
            photo && productData.append('photo', photo)
            productData.append('category', category)

            const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productData)
            if (data?.success) {
                toast.success('Product updated successfully')
                navigate('/dashboard/admin/products')
            } else {
                toast.error(data?.message)
            }

        } catch (error) {
            console.log(error)
            toast.error('Error happens while updating product')
        }
    }
    //handle delete product
    const handleDelete = async () => {
        try {
            let confirm = window.confirm('Are you sure to delete this product?')
            if (!confirm) return
            await axios.delete(`/api/v1/product/delete-product/${id}`)
            toast.success('Product deleted successfully')
            navigate('/dashboard/admin/products')

        } catch (error) {
            console.log(error)
            toast.error('Error happens while deleting product')
        }
    }


    return (
        <div className="">
            <h1 className="text-2xl font-bold">Update Product</h1>
            <div className="m-1 w-3/4">
                <Select
                    variant={false}
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                        setCategory(value);
                    }}
                    value={category}
                >
                    {categories?.map((c) => (
                        <Option key={c._id} value={c._id}>
                            {c.name}
                        </Option>
                    ))}
                </Select>
                <div className="mb-3">
                    <label className="btn btn-outline-secondary col-span-12">
                        {photo ? photo.name : "Upload Photo"}
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            hidden
                        />
                    </label>
                </div>
                <div className="mb-3">
                    {photo ? (
                        <div className="text-center">
                            <img
                                src={URL.createObjectURL(photo)}
                                alt="product_photo"
                                height={"200px"}
                                className="img img-responsive"
                            />
                        </div>
                    ) : (
                        <div className="text-center">
                            <img
                                src={`/api/v1/product/product-photo/${id}`}
                                alt="product_photo"
                                height={"200px"}
                                className="img img-responsive"
                            />
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        value={name}
                        placeholder="write a name"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        type="text"
                        value={description}
                        placeholder="write a description"
                        className="form-control"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="number"
                        value={price}
                        placeholder="write a Price"
                        className="form-control"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        value={quantity}
                        placeholder="write a quantity"
                        className="form-control"
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <Select
                        variant={false}
                        placeholder="Select Shipping "
                        size="large"
                        showSearch
                        className="form-select mb-3"
                        onChange={(value) => {
                            setShipping(value);
                        }}
                        value={shipping ? "Yes" : "No"}
                    >
                        <Option value="0">No</Option>
                        <Option value="1">Yes</Option>
                    </Select>
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" onClick={handleUpdate}>
                        UPDATE PRODUCT
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        DELETE PRODUCT
                    </button>
                </div>
            </div>
        </div>

    );
};

export default UpdateProduct;