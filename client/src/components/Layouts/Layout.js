import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import TopBanner from '../TopBanner';
import Skeleton from '../Skeleton';

// import Sidebar from '../Sidebar';


const Layout = ({
    children,
    title = 'Welcome to the ecommerce website',
    description = 'We sell the best products for cheap',
    keywords = 'electronics, buy electronics, cheap electronics',
    author = 'Ridwan Mahmoud' }) => {
    return (
        <div className="area">
			<ul className="circles z-[-1]">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
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
                className='mx-auto  px-4 my-0 max-w-screen-lg flex flex-col min-h-screen'>
                {children ? children : <Skeleton />}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
