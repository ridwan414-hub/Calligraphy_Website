import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='footer max-w-[128px]'>
            <h4 className='text-center'>All right Reserved &copy; Ridwan Mahmoud </h4>
            <p className='text-center mt-3'>
                <Link to='/about' className='mr-2'>About</Link>|
                <Link to='/contact' className='mx-2'>Contact</Link>|
                <Link to='/policy' className='ml-2'>Privacy Policy</Link>
            </p>
        </div>
    );
};

export default Footer;
