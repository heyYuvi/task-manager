import { useState } from "react";
import api from "../services/api.js";
import toast from "react-hot-toast";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/auth/register", form);
            toast.success("User Registered Successfully");
            setForm({
                name: "",
                email: "",
                password: ""
            });
        } catch (error) {
            toast.error(error.response?.data?.message || "Something Went Wrong");
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                Name: <input type="text" name="name" value={form.name} onChange={handleChange} />
                Email: <input type="email" name="email" value={form.email} onChange={handleChange} />
                Password: <input type="password" name="password" value={form.password} onChange={handleChange}></input>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Register; 