import React from 'react';
import Layout from '../components/Layouts/Layout';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';

const Categories = () => {
const categories = useCategory()



    return (
        <Layout title='All categoris'>
            <div className="container">
                <div className="grid grid-cols-2 gap-3 mt-5 mb-3">
                    {categories.map((c) => (
                        <div className="col-span-6 mt-5 mb-3" key={c._id}>
                            <Link to={`/category/${c.slug}`} className="bg-blue-500 text-white py-2 px-4 rounded">
                                {c.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Categories;