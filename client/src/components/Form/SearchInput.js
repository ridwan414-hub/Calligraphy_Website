import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(
                `/api/v1/product/search/${values.keyword}`
            );
            setValues({ ...values, results: data });
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form className="flex search-form" role="search" onSubmit={handleSubmit}>
                <input
                    className="border border-gray-300 rounded-md p-2 mr-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded-md" type="submit">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchInput;
