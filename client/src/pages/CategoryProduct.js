import React, { useState, useEffect } from "react";
import { FaBoxOpen } from 'react-icons/fa';
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layouts/Layout";
import Loader from "../components/Loader";
import Card from "../components/Card";
const CategoryProduct = () => {
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (params.slug) getPrductsByCat();
        // eslint-disable-next-line
    }, [params?.slug]);
    const getPrductsByCat = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(
                `/api/v1/product/product-category/${params.slug}`
            );
            setLoading(false)
            setProducts(data.products);
            setCategory(data.category);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout title={`${category?.name} Category`}>
            <div className="glass rounded-lg shadow-lg my-8 p-6">
                <div className="text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 rounded-lg shadow-lg">
                    <FaBoxOpen className="text-6xl text-white mx-auto mb-4" />
                    <h4 className="text-4xl font-bold text-white mb-2">Category - {category?.name}</h4>
                    <h6 className="text-lg text-white">{products?.length} product(s) found</h6>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="flex justify-center items-center">
                        <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products?.map((p) => (
                                <Card key={p._id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default CategoryProduct;