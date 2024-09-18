import React from "react";
import { useSearch } from "../context/search";
import Layout from "../components/Layouts/Layout";
import Card from "../components/Card"; // Import Card component

const Search = () => {
    const [values] = useSearch();

    return (
        <Layout title={"Search results"}>
            <div className="bg-gradient-to-r from-indigo-300 to-purple-400 min-h-screen py-10">
                <div className="container mx-auto">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-extrabold mb-4">Search Results</h1>
                        <h6 className="text-lg mb-8 font-medium">
                            {values?.results.length < 1
                                ? "No Products Found"
                                : `Found ${values?.results.length} Products`}
                        </h6>
                        <div className="flex flex-wrap justify-center gap-8">
                            {values?.results.map((p) => (
                                <Card key={p._id} product={p} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Search;
