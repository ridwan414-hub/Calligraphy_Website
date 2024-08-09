import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function ActivateUser() {
    const [ok, setOk] = useState(false)
    const param = useParams();
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const res = await axios.get(`/api/v1/auth/activate/${param.token}`)
                if (res && res.data.success) {
                    setOk(true)
                } else {
                    setOk(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
        verifyEmail()
    }, [param?.token])
    return ok ? <Spinner successMessage={"Account Activated Successfully"} path="" /> : <Spinner errorMessage={'Account Activation failed.Try again after some times'} path="register" />
}


