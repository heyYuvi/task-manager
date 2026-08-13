import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import api from "../services/api";
import toast from "react-hot-toast";

const EditTask = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "",
        priority: "",
        dueDate: "",
        createdAt: "",
        updatedAt: ""
    });

    useEffect(() => {
        const fetchTask = async () => {
            const response = await api.get(`/task/${id}`);
            setForm(response.data.data)
        }

        fetchTask();
    }, [id]);

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await api.put(`/task/${id}`, form);
        toast.success("Updated Successfully");
        setForm({
            title: "",
            description: "",
            status: "",
            priority: "",
            dueDate: "",
            createdAt: "",
            updatedAt: ""
        });
        
        navigate("/");
        }catch(error){
            toast.error(error.response?.data?.message || "Somthing Went Wrong");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                title: <input type="text" name="title" value={form.title} onChange={handleChange} />
                description: <input type="text" name="description" value={form.description} onChange={handleChange} />
                <select name="status" value={form.status} onChange={handleChange}>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <select name="priority" value={form.priority} onChange={handleChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button>Update</button>
            </form>
        </div>
    )
}

export default EditTask