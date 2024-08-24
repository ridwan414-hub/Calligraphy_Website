import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/auth";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false)
    const [auth] = useAuth();
    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get('/api/v1/auth/user-auth')
            if (res && res.data.ok) {
                setOk(true)
            } else {
                setOk(false)
            }
        }
        if (auth?.token) authCheck()
    }, [auth?.token])
    return ok ? <Outlet /> : <Spinner />
}