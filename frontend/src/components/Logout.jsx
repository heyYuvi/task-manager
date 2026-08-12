import { useNavigate } from "react-router-dom";
import api from "../components/api.js"
import toast from "react-hot-toast";

const Logout = () =>{

    const navigate = useNavigate(); 

    const handleConformation = () =>{
        toast((t) =>(
            <div>
                <button onClick={() =>{toast.dismiss(t.id); handleLogout()}}>Proceed</button>
                <button onClick={() =>{toast.dismiss(t.id)}}>Cancle</button>
            </div>
        ))
    }

    const handleLogout = async () =>{
        try{
            
        await api.get("/auth/logout");
        navigate("/login");
        toast.success("Logot Successful");
        }catch(error){
            toast.error(error.response?.data?.message || "Something Went Wrong");
        }
    }

    return (
        <div>
            <button onClick={() =>{handleConformation()}}>Logout</button> 
        </div>
    )
}

export default Logout;