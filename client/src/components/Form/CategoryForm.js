import React from 'react';

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" className="border border-gray-300 rounded-md p-2" placeholder='Enter new category' value={value} onChange={(e) => { setValue(e.target.value) }} />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            </form>
        </>
    );
};

export default CategoryForm;
