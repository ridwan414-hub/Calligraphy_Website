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
                {/* <input
                    className="border border-gray-300 rounded-md p-2 mr-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                /> */}
            <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>
                {/* <button className="bg-green-500 text-white px-4 py-2 rounded-md" type="submit">
                    Search
                </button> */}
            </form>
        </div>
    );
};

export default SearchInput;
