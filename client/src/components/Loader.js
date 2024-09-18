import React from 'react';

const Loader = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-pulse"></div>
                <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-blue-500 rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-lg font-semibold text-gray-700 animate-pulse">
                {message}
            </p>
        </div>
    );
};

export default Loader;