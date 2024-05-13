import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
    const [categories, setCategories] = useState([]);

    //get all catogories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-categories')
            setCategories(data?.categories)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllCategories()
    }, [])

    return categories;
}
