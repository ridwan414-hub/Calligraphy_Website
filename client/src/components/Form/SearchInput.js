import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-products');
            setProducts(data?.products || []);  // Ensure we handle undefined data
        } catch (error) {
            console.log("Error fetching products:", error);
        }
    };

    const handleInputChange = (e) => {
        const keyword = e.target.value;
        setValues({ ...values, keyword });

        if (keyword.length > 0) {
            console.log(products)
            const filteredSuggestions = products
                .filter(product =>
                    product?.name && product.name.toLowerCase().includes(keyword.toLowerCase())
                )
                .map(product => product.name)
                .slice(0, 5); // Limit to 5 suggestions

            setSuggestions(filteredSuggestions);
            setShowDropdown(filteredSuggestions.length > 0); // Show dropdown only if there are suggestions
        } else {
            setSuggestions([]);
            setShowDropdown(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setValues({ ...values, keyword: suggestion });
        setShowDropdown(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(
                `/api/v1/product/search/${values.keyword}`
            );
            setValues({ ...values, results: data });
            navigate("/search");
        } catch (error) {
            console.log("Error fetching search results:", error);
        }
    };

    return (
        <div className="my-auto mx-4 relative">
            <form className="flex search-form" role="search" onSubmit={handleSubmit}>
                <label className="input input-bordered flex input-info input-sm w-full max-w-xs items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70">
                        <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                    </svg>
                    <input
                        type="text"
                        className="grow"
                        placeholder="Search By Product Name"
                        value={values.keyword}
                        onChange={handleInputChange}
                    />
                </label>
            </form>
            {showDropdown && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchInput;
