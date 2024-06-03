import React from 'react';
import Layout from '../../components/Layouts/Layout';
import AdminMenu from '../../components/Layouts/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
    const [auth]=useAuth()
    return (
        <Layout title={'Admin Dashboard - Ecommerce App'}>
            <div className='container mx-auto my-3 px-3'>
                <div className='flex'>
                    <div className='w-1/4'>
                        <AdminMenu />
                    </div>
                    <div className='w-3/4'>
                        <div className='card w-3/4 p-3'>
                            <h3>Admin Name:{auth?.user?.name }</h3>
                            <h3>Admin Email:{auth?.user?.email }</h3>
                            <h3>Admin Phone:{auth?.user?.phone }</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;