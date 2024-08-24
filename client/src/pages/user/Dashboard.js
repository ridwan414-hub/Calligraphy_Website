import React from 'react';
import Layout from '../../components/Layouts/Layout';
import UserMenu from '../../components/Layouts/UserMenu';
import { useAuth } from '../../context/auth';
import UserInfo from '../../components/page-components/dashboard/UserInfo';
// import Album from '../../components/Album';

const Dashboard = () => {
    const [auth] = useAuth();

    return (
        <Layout title={'User Dashboard'}>
            <div className='container mx-auto py-8'>
                <div className='flex flex-col md:flex-row gap-8'>
                    <div className='md:w-1/4'>
                        <UserMenu />
                    </div>
                    <div className='md:w-3/4'>
                        <UserInfo user={auth?.user} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;