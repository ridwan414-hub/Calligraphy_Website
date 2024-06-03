import React from 'react';

const Loader = ({message}) => {
    return (
        <div className="flex justify-center items-center h-screen">
            <h1 className='text-center p-4'>{message}</h1>{' '}
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    );
};

export default Loader;