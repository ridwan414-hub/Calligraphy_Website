import React from 'react';

const Skeleton = () => {
  return (
    <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg w-72 mx-2 my-4 animate-pulse">
      <div className="h-72 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="flex justify-between">
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;