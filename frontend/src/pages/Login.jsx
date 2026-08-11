import { useState } from "react";
import api from "../components/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () =>{

    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) =>{
        setForm((prev) =>({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            await api.post("/auth/login", form);
        toast.success("User Logged In Successfully");
        setForm({
            email: "",
            password: ""
        });
        navigate("/");
        }catch(error){
            toast.error(error.response?.data?.message || "Something Went Wrong");
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            Email: <input type="email" name="email" value={form.email} onChange={handleChange} />
            Password: <input type="password" name="password" value={form.password} onChange={handleChange} />
            <button>Login</button>
        </form>
        </>
    )
}

export default Login;