import React from 'react';
import Layout from '../../components/Layouts/Layout';
import UserMenu from '../../components/Layouts/UserMenu';
import { useAuth } from '../../context/auth';
// import Album from '../../components/Album';

const Dashboard = () => {
    const [auth]=useAuth()
    return (
        <>
            <Layout title={'User Dashboard - Orders'}>
                <div className='glass mx-auto my-3 px-3'>
                    <div className='flex'>
                        <div className='w-1/4'>
                            <UserMenu />
                        </div>
                        <div className='w-3/4'>
                            <div className='card w-3/4 p-3'>
                                <h3>User Name :{auth?.user?.name }</h3>
                                <h3>User Email :{auth?.user?.email }</h3>
                                <h3>User Address :{auth?.user?.address }</h3>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Album/> */}
            </Layout>
        </>
    )
};

export default Dashboard;