import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ( ) =>{

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() =>{
        const checkUser = async () =>{
        try{
            await api.get("/auth/me");
            setUser(true);
        
        }catch(error){
            toast.error(error.response?.data?.message || "Something Went Wrong");
            setUser(false);
        }finally{
            setLoading(false);
        }    
        }

        checkUser();

    }, []);

    if(loading){
        return (
            <div>
                ...loading
            </div>
        )
    }

    if(!user){
        return <Navigate to="/login" replace/>
    }

    return <Outlet />;

}

export default ProtectedRoute;