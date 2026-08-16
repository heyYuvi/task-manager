import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";


const Home = () => {

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(0);
    const [loading, setLoading] = useState(true);
    const pages = [];

    for (let i=1; i<=pageNumber; i++){
        pages.push(i);
    }
    console.log(pages);
    console.log(dueDate);

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await api.get(`/tasks`, {
                params: {
                    search,
                    status,
                    priority,
                    page,
                    dueDate
                }
            });
            setTasks(res.data.data);
            setPageNumber(res.data.totalPage);
            setLoading(false);
        }

        fetchTasks();
    }, [search, status, priority, page, dueDate]);

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
        <div className="w-full max-w-6xl m-auto">
            <div className="flex justify-end-safe gap-4 mt-2">
                <CiSettings size={30}/>
                <CgProfile size={30}/>
            </div>
        <div className="p-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                <h1 className="font-semibold text-4xl">All Tasks</h1>
                <p className="text-xl text-gray-500">Manage and track your ongoing work.</p>
                </div>
                <div>
                    <button onClick={() =>{navigate("/create")}} className="flex items-center gap-1 border px-4 py-1 rounded-md bg-blue-700 font-semibold text-white cursor-pointer hover:bg-blue-600"><IoAddCircleOutline size={20} />New Task</button>
                </div>
            </div>
            <div className="flex items-center justify-between p-6 mt-4"> 
            <label className="flex items-center gap-2 bg-blue-100 rounded-md p-2 w-175 cursor-text">
                <FaSearch />
                <input type="text" value={search} placeholder="Search tasks by name or description..." onChange={(e) =>{setSearch(e.target.value)}} className="focus:outline-none w-full bg-transparent"/>
            </label>
            <div className="flex items-center gap-2 ">
                <div className="bg-blue-100 p-2 rounded-md">  
            <select value={status} onChange={(e) =>{setStatus(e.target.value)}} className="focus:outline-none cursor-pointer text-sm bg-blue-100">
                <option value="">Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
            </div>
            <div>
            </div>
                <div className="bg-blue-100 p-2 rounded-md">     
            <select value={priority} onChange={(e) =>{setPriority(e.target.value)}} className="focus:outline-none cursor-pointer text-sm bg-blue-100">
                <option value="">Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">high</option>
            </select>
                </div>
                <div className="p-2 rounded-md bg-blue-100">
                    <input type="date" value={dueDate} onChange={(e) =>{setDueDate(e.target.value)}} className="focus:outline-none cursor-pointer text-sm"/>
                </div>
            </div>
            </div>
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
            <div>
                <button onClick={() =>{setPage(page - 1)}} disabled={page === 1}>Previous</button>
                {
                    pages.map((p) =>(
                        <button key={p} onClick={() =>{setPage(p)}}>{p}</button>
                    ))
                }
                <button onClick={() =>{setPage(pages + 1)}} disabled={page === pageNumber}>next</button>
            </div>
            
        </div>
        </div>
    )
}

export default Home;