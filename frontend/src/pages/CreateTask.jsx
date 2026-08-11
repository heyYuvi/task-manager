import { useState } from "react";
import api from "../components/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateTask = () =>{

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "pending",
        priority: "low",
        dueDate: ""
    });

    const handleChange = (e) =>{
        setForm((prev) =>({
            ...prev, [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
         await api.post("/task", form);
         toast.success("Task Created Successfully");
         navigate("/");
        }catch(error){
            console.error(error.response.data)
            toast.error(error.response?.data?.message || "Something Went Wrong");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                Title <input type="text" name="title" value={form.title} onChange={handleChange} />
                Description <input type="text" name="description" value={form.description} onChange={handleChange} />
                Due Date <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} /> 
                Status:
                <select name="status" value={form.status} onChange={handleChange}>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="completed">Completed</option>
                </select>
                Priority:
                <select name="priority" value={form.priority} onChange={handleChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button>Create Task</button>
            </form>
        </div>
    )
}

export default CreateTask;