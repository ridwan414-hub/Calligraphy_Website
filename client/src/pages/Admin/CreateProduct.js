import React, { useEffect, useState } from 'react';
// import Layout from '../../components/Layouts/Layout';
// import AdminMenu from '../../components/Layouts/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd'
import { useNavigate } from 'react-router-dom';
const { Option } = Select

const CreateProduct = () => {
    const navigate = useNavigate()

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    const [photo, setPhoto] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [shipping, setShipping] = useState('')
    //handle create product form
    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append('name', name)
            productData.append('description', description)
            productData.append('price', price)
            productData.append('quantity', quantity)
            productData.append('photo', photo)
            productData.append('category', category)

            const { data } = await axios.post('/api/v1/product/create-product', productData)
            if (data?.success) {
                toast.success('Product created successfully')
                navigate('/dashboard/admin/products')
            } else {
                toast.error(data?.message)
            }

        } catch (error) {
            console.log(error)
            toast.error('Error happens while creating product')
        }
    }

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

    return (
        <div>
            <h1 className="text-3xl font-bold">Create Product</h1>
            <div className='flex flex-col mx-auto bg-slate-50 w-1/2'>
                <Select
                    variant={false}
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className=" mb-3"
                    onChange={(value) => {
                        setCategory(value);
                    }}
                >
                    {categories?.map((c) => (
                        <Option key={c._id} value={c._id}>
                            {c.name}
                        </Option>
                    ))}
                </Select>
                <div className="mb-3">
                    <label className="btn btn-outline-secondary">
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
                    {photo && (
                        <div className="text-center">
                            <img
                                src={URL.createObjectURL(photo)}
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
                        className="w-full border-red-200"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        type="text"
                        value={description}
                        placeholder="write a description"
                        className="w-full border-red-200"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="number"
                        value={price}
                        placeholder="write a Price"
                        className="w-full border-red-200"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        value={quantity}
                        placeholder="write a quantity"
                        className="w-full border-red-200"
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
                    >
                        <Option value="0">No</Option>
                        <Option value="1">Yes</Option>
                    </Select>
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" onClick={handleCreate}>
                        CREATE PRODUCT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;