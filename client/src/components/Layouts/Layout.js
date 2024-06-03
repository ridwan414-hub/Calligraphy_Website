import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import TopBanner from '../TopBanner';

// import Sidebar from '../Sidebar';


const Layout = ({
    children,
    title = 'Welcome to the ecommerce website',
    description = 'We sell the best products for cheap',
    keywords = 'electronics, buy electronics, cheap electronics',
    author = 'Ridwan Mahmoud' }) => {
    return (
        <div>
            <Helmet>
                <meta charSet='utf-8' />
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
                <meta name='author' content={author} />
                <title>{title}</title>
            </Helmet>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <TopBanner/>
            <Header />
            <main
                className='mx-auto px-4 my-4 max-w-screen-lg flex flex-col min-h-screen bg-blue-50'>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
