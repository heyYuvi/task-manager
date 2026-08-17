import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";



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
            <div className="">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_70px] items-center p-4 bg-blue-100 rounded-md mb-6 text-sm text-gray-600 ">
                    <div>
                        <p>TASK DETAILS</p>
                    </div>
                    <div>
                        <p>STATUS</p>
                    </div>
                    <div>
                        <p>PRIORITY</p>
                    </div>
                    <div>
                        <p>DUE DATE</p>
                    </div>
                    <div>
                        <p>ACTIONS</p>
                    </div>
                </div>
                {
                    tasks.map((task) =>(
                        <div key={task.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_70px] items-center mb-2 p-3 rounded-md bg-white hover:bg-blue-100 transition cursor-pointer">
                            <div  onClick={() =>{navigate(`/edit/${task.id}`)}} className="flex flex-col min-w-0">
                            <h1 className="font-semibold">{task.title}</h1>
                            <p className="text-sm text-gray-600 truncate">{task.description}</p>
                            </div>
                            <div className={`flex items-center gap-1 w-fit px-1 py-1 rounded-lg text-xs ${
                                task.status === "pending"? "bg-gray-300" : task.status === "in-progress"? "bg-blue-200 font-semibold" : "bg-gray-200 text-gray-400"
                            }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                    task.status === "pending"? "bg-gray-600": task.status === "in-progress"? "bg-blue-500": "bg-gray-400"
                                } `}/>
                                <p>{
                                task.status === "pending" ? "Pending": task.status === "in-progress"? "In-Progress": "Completed"
                                }</p>
                            </div>
                            <div className={`flex items-center  gap-1 text-sm rounded-full w-fit px-1 py-1 ${
                                task.priority === "low"? "text-gray-600 bg-blue-50": task.priority === "high"? "bg-red-100 text-red-500": "bg-orange-100 text-orange-600"
                            }`}>
                                {
                                    task.priority === "high"? (
                                        <FaArrowUp size={10}/>
                                    ) : task.priority === "medium"? (
                                        <FiMinus size={10}/>
                                    ) : (
                                        <FaArrowDown size={10}/>
                                    )
                                }
                                <p>{
                                task.priority === "low"? (
                                    "Low"
                                ): task.priority === "high"? (
                                    "High" 
                                ): (
                                    "Medium"
                                )
                                }</p>
                            </div>
                            <div>{
                                task.dueDate&&(
                                     <p className="text-sm text-gray-500">{new Date(task.dueDate).toLocaleDateString("en-Us", {
                                    day: "numeric",
                                    month: "short",
                                    year:"numeric"
                                })}</p>
                                )
                                }
                            </div>
                            <div className="">
                                <button onClick={() =>{handleDelete(task.id)}}><FaTrash className="hover:text-red-600 cursor-pointer transition"/> </button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex justify-center mt-10">
                <div>
                <button className={`mr-4 cursor-pointer transition ${
                    page === 1 ? "text-gray-400" : "text-black hover:text-blue-400"
                }`} onClick={() =>{setPage(page - 1)}} disabled={page === 1}><FaAngleLeft /></button>
                {
                    pages.map((p) =>(
                        <button className={`font-bold cursor-pointer px-2 rounded-md mr-2 transition ${
                            page === p ? "bg-blue-400 text-white" : "hover:bg-blue-400"
                        }`} key={p} onClick={() =>{setPage(p)}}>{p}</button>
                    ))
                }
                <button className={`mr-4 cursor-pointer transition ${
                    page === pageNumber ? "text-gray-400" : "text-black hover:text-blue-400"
                }`} onClick={() =>{setPage(page + 1)}} disabled={page === pageNumber}><FaAngleRight /></button>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Home;