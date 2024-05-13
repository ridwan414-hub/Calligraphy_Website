import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const Spinner = ({ path = 'login', errorMessage = '', successMessage = '' }) => {
    const [count, setCount] = useState(5)
    const navigate = useNavigate()
    const location = useLocation()
    const notifyError = () => toast.error(`${errorMessage}`)
    const notifySuccess = () => toast.success(`${successMessage}`)


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
            <div className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: "100vh" }}>
                <h1 className='text-center'>redirecting to you in {count} second</h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    );
};

export default Spinner;