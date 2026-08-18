import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import api from "../services/api";
import toast from "react-hot-toast";
import { FaFileSignature } from "react-icons/fa";


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
    console.log(form);

    useEffect(() => {
        const fetchTask = async () => {
            const response = await api.get(`/task/${id}`);
            setForm({
                title: response.data.data.title,
                description: response.data.data.description,
                status: response.data.data.status,
                priority: response.data.data.priority,
                dueDate: response.data.data.dueDate ? response.data.data.dueDate.slice(0, 10) : "",
                createdAt: response.data.data.createdAt,
                updatedAt: response.data.data.updatedAt
            });
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

        try {
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
        } catch (error) {
            toast.error(error.response?.data?.message || "Somthing Went Wrong");
        }
    }

    return (
        <div className="w-full max-w-4xl h-screen m-auto mt-10">
            <div className="flex items-center justify-between">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-1">Update Task</h1>
                    <h2 className="text-gray-500">Modify the details of your existing task or remove it entirely.</h2>
                </div>
                <div className="text-gray-500">Last Updated At {new Date(form.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric"
                })}</div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-3xl m-auto p-4 bg-blue-100 rounded-2xl">
                <div className="flex flex-col gap-1">
                    <label htmlFor="title" className="font-semibold">Task Title</label>
                    <input type="text" id="title" name="title" value={form.title} onChange={handleChange} className="bg-white rounded-md px-4 py-2 focus:outline-none" />

                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="description" className="font-semibold">Description (Optional)</label>
                    <textarea id="description" name="description" value={form.description} onChange={handleChange} className="bg-white w-full h-32 px-4 py-2 rounded-2xl" />

                </div>
                <div className="grid grid-cols-[auto_auto_auto] gap-4 p-1">
                    <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="bg-white p-1 rounded-md" />
                    <select name="status" value={form.status} onChange={handleChange} className="bg-white p-1 rounded-md">
                        <option value="pending">Pending</option>
                        <option value="in-progress">In-Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <select name="priority" value={form.priority} onChange={handleChange} className="bg-white p-1 rounded-md">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="flex gap-5 self-end mt-4">
                    <button type="button" onClick={() => { navigate("/") }} className="font-semibold cursor-pointer">Cancel</button>
                    <button className="flex items-center gap-1 font-semibold p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 cursor-pointer transition"><FaFileSignature />Update Task</button>
                </div>
            </form>
        </div>
    )
}

export default EditTask