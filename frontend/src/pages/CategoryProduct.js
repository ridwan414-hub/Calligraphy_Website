import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
            <div className="bg-transparent glass my-4 p-4">
                <h4 className="text-4xl text-center">Category - {category?.name}</h4>
                <h6 className="text-center">{products?.length} product found </h6>
                {loading ? <Loader /> :
                    <div className="flex justify-center items-center flex-wrap gap-2">
                        {products?.map((p) => (
                            <Card key={p._id} product={p} />
                        ))}
                    </div>
                }
            </div>
        </Layout>
    );
};

export default CategoryProduct;