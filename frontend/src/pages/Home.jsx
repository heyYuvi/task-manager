import { useEffect, useState } from "react";
import api from "../components/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const Home = () => {

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await api.get(`/tasks`, {
                params: {
                    search,
                    status,
                    priority
                }
            });
            setTasks(res.data.data);
            setLoading(false);
        }

        fetchTasks();
    }, [search, status, priority]);

    const handleDelete = async (id) =>{
        try{
        await api.delete(`/task/${id}`);
        toast.success("Task Deleted");
        setTasks((prev) =>
            prev.filter((task) => task.id !== id)
        )
        }catch(error){
            toast.error(error.response?.data?.message || "Something Went Wrong");
        }
    }

    if(loading){
        return <div>...Loading</div>
    } 

    return (
        <div>
            Search: <input type="text" value={search} onChange={(e) =>{setSearch(e.target.value)}} />
            Status
            <select value={status} onChange={(e) =>{setStatus(e.target.value)}}>
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
            Priority
            <select value={priority} onChange={(e) =>{setPriority(e.target.value)}}>
                <option value="">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">high</option>
            </select>
            <div>
                {
                    tasks.map((task) =>(
                        <div key={task.id}>
                            <h1>{task.title}</h1>
                            <p>{task.description}</p>
                            <p>{task.status}</p>
                            <p>{task.priority}</p>
                            <p>{task.dueDate}</p>
                            <p>{new Date(task.createdAt).toLocaleDateString("en-UN", {
                                month: "long",
                                day: "numeric",
                                year: "numeric"
                            })}</p>
                            <div>
                                <button onClick={() =>{navigate(`/edit/${task.id}`)}}>Edit</button>
                                <button onClick={() =>{handleDelete(task.id)}}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home;