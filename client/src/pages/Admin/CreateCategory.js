import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/Layouts/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import { Modal } from 'antd'

const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState('')
    //handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/v1/category/create-category', { name })
            if (data?.success) {
                toast.success(data.message)
                getAllCategories()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to create category")
        }
    }
    //handle update category
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedName })
            if (data?.success) {
                toast.success(data.message)
                setSelected(null)
                setUpdatedName('')
                setVisible(false)
                getAllCategories()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to update category")
        }
    }
    //handle delete category
    const handleDelete = async (pid) => {
        try {
            const { data } = await axios.delete(`/api/v1/category/delete-category/${pid}`)
            if (data?.success) {
                toast.success(`Category is deleted successfully`)
                getAllCategories()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to delete category")
        }
    }
    //get all categories
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
        <>
            <Layout title={'Admin Dashboard - Create Category'}>
                <div className='container-fluid m-3 p-3'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <AdminMenu />
                        </div>
                        <div className='col-md-9'>
                            <div className='card w-75 p-3'>
                                <h1>Manage Category</h1>
                                <div className='p-3 w-50'>
                                    <CategoryForm
                                        handleSubmit={handleSubmit}
                                        value={name}
                                        setValue={setName}
                                    />
                                </div>
                                <div className='w-75'>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories?.map((c) => (

                                                <tr key={c._id}>
                                                    <td>{c.name}</td>
                                                    <td >
                                                        <button className='btn btn-primary ms-2' onClick={() => {
                                                            setVisible(true)
                                                            setUpdatedName(c.name)
                                                            setSelected(c)
                                                        }}>Edit</button>
                                                        <button className='btn btn-danger ms-2' onClick={() => handleDelete(c._id)}>Delete</button>
                                                    </td>
                                                </tr>

                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
                                    <CategoryForm handleSubmit={handleUpdate} value={updatedName} setValue={setUpdatedName} />
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default CreateCategory
