import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CiCircleCheck } from "react-icons/ci";


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
        <div className="w-full max-w-4xl m-auto p-4 mt-10 border border-gray-300 rounded-md">
            <div className="mb-4">
                <h1 className="font-semibold text-2xl">Create New Task</h1>
                <h2 className="text-gray-600">Fill in the details below to add a new task to your workflow.</h2>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-2">
                <div className="flex flex-col gap-1">
                <label htmlFor="title">TASK TITLE</label>
                <input type="text" id="title" name="title" value={form.title} onChange={handleChange} className="border rounded-md border-gray-500 focus:outline-none px-2 focus:ring-0"/>
                </div>
                <div className="flex flex-col gap-1">
                <label htmlFor="description">DESCRIPTION</label>
                <textarea id="description" name="description" value={form.description} onChange={handleChange} className="border rounded-md border-gray-500 w-full h-32"/>
                </div>
                <div className="grid grid-cols-[auto_auto] gap-8">
                    
                <select name="status" value={form.status} onChange={handleChange} className="border p-2 rounded-md border-gray-300">
                    <option value="pending">Pending</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <select name="priority" value={form.priority} onChange={handleChange}  className="border p-2 rounded-md border-gray-300">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                </div>
                <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="border w-55 p-2 rounded-md border-gray-300"/> 
                <div className="flex gap-4 self-end mt-6">
                    <button type="button" onClick={() =>{navigate("/")}} className="border p-2 rounded-md border-gray-400 bg-gray-100 hover:bg-gray-400 cursor-pointer transition">Cancel</button>
                    <button className="flex items-center gap-1 border font-bold text-white p-2 rounded-md bg-blue-600 hover:bg-blue-400"><CiCircleCheck size={20}/>Create Task</button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask;