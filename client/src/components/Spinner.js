import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const Spinner = ({ path = 'login', errorMessage = '', successMessage = '' }) => {
    const [count, setCount] = useState(3)
    const navigate = useNavigate()
    const location = useLocation()
    const notifyError = () => toast.error(errorMessage)
    const notifySuccess = () => toast.success(successMessage)


    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)
        count === 0 && navigate(`/${path}`, {
            state: location.pathname
        })
        return () => clearInterval(interval)
    }, [count, navigate, location, path])

    return (
        <>
            {successMessage ? notifySuccess() : notifyError()}
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className='text-center'>redirecting to you in {count} second</h1>
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        </>
    );
};

export default Spinner;