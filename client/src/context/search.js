import { createContext, useContext, useState, } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [data, setData] = useState({
        keyword: '',
        results: [],
    })


    return (
        <SearchContext.Provider value={[data, setData]}>
            {children}
        </SearchContext.Provider>
    )
}

const useSearch = () => useContext(SearchContext);

export { SearchProvider, useSearch };