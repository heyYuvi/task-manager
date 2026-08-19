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

    for (let i = 1; i <= pageNumber; i++) {
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
        };

        fetchTasks();
    }, [search, status, priority, page, dueDate]);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/task/${id}`);

            toast.success("Task Deleted");

            setTasks((prev) =>
                prev.filter((task) => task.id !== id)
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something Went Wrong"
            );
        }
    };
if (loading) {
    return (
        <div className="min-h-screen bg-[#F7F9FB] p-6 lg:p-8">

            {/* Header skeleton */}
            <div className="flex flex-col gap-4 mb-8">

                <div className="h-8 w-40 bg-[#E6E8EA] rounded-md animate-pulse"></div>

                <div className="flex flex-col sm:flex-row gap-3">

                    {/* Search */}
                    <div className="h-10 w-full sm:w-80 bg-[#E6E8EA] rounded-lg animate-pulse"></div>

                    {/* Status */}
                    <div className="h-10 w-32 bg-[#E6E8EA] rounded-lg animate-pulse"></div>

                    {/* Priority */}
                    <div className="h-10 w-32 bg-[#E6E8EA] rounded-lg animate-pulse"></div>

                </div>
            </div>

            {/* Cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                        key={item}
                        className="bg-white rounded-xl border border-[#E0E3E5] p-5 shadow-sm animate-pulse"
                    >
                        {/* Title */}
                        <div className="h-5 w-3/4 bg-[#E6E8EA] rounded-md mb-4"></div>

                        {/* Description */}
                        <div className="space-y-2 mb-6">
                            <div className="h-3 w-full bg-[#E6E8EA] rounded"></div>
                            <div className="h-3 w-5/6 bg-[#E6E8EA] rounded"></div>
                            <div className="h-3 w-2/3 bg-[#E6E8EA] rounded"></div>
                        </div>

                        {/* Status / priority */}
                        <div className="flex gap-2 mb-5">
                            <div className="h-6 w-20 bg-[#E6E8EA] rounded-full"></div>
                            <div className="h-6 w-16 bg-[#E6E8EA] rounded-full"></div>
                        </div>

                        {/* Bottom row */}
                        <div className="flex items-center justify-between pt-3 border-t border-[#E6E8EA]">
                            <div className="h-3 w-24 bg-[#E6E8EA] rounded"></div>

                            <div className="flex gap-2">
                                <div className="h-7 w-7 bg-[#E6E8EA] rounded-md"></div>
                                <div className="h-7 w-7 bg-[#E6E8EA] rounded-md"></div>
                            </div>
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
};
    

    return (
        <div className="w-full max-w-6xl mx-auto px-3 sm:px-4">

            {/* Top Icons */}
            <div className="flex justify-end gap-3 sm:gap-4 mt-2">
                <CiSettings
                    size={28}
                    className="cursor-pointer sm:w-7.5 sm:h-7.5"
                />
                <CgProfile
                    size={28}
                    className="cursor-pointer sm:w-7.5 sm:h-7.5"
                />
            </div>

            <div className="p-2 sm:p-4">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                    <div className="flex flex-col gap-1">
                        <h1 className="font-semibold text-3xl sm:text-4xl">
                            All Tasks
                        </h1>

                        <p className="text-base sm:text-xl text-gray-500">
                            Manage and track your ongoing work.
                        </p>
                    </div>

                    <div>
                        <button
                            onClick={() => {
                                navigate("/create");
                            }}
                            className="flex items-center justify-center gap-1 border px-4 py-2 rounded-md bg-blue-700 font-semibold text-white cursor-pointer hover:bg-blue-600 transition w-full sm:w-auto"
                        >
                            <IoAddCircleOutline size={20} />
                            New Task
                        </button>
                    </div>

                </div>

                {/* Search + Filters */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-2 sm:p-6 mt-4">

                    {/* Search */}
                    <label className="flex items-center gap-2 bg-blue-100 rounded-md p-2 w-full lg:w-175 cursor-text">

                        <FaSearch className="shrink-0" />

                        <input
                            type="text"
                            value={search}
                            placeholder="Search tasks by name or description..."
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            className="focus:outline-none w-full bg-transparent text-sm sm:text-base"
                        />

                    </label>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-2">

                        {/* Status */}
                        <div className="bg-blue-100 p-2 rounded-md flex-1 sm:flex-none">

                            <select
                                value={status}
                                onChange={(e) => {
                                    setStatus(e.target.value);
                                }}
                                className="focus:outline-none cursor-pointer text-sm bg-blue-100 w-full"
                            >
                                <option value="">Status</option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>

                        </div>

                        {/* Priority */}
                        <div className="bg-blue-100 p-2 rounded-md flex-1 sm:flex-none">

                            <select
                                value={priority}
                                onChange={(e) => {
                                    setPriority(e.target.value);
                                }}
                                className="focus:outline-none cursor-pointer text-sm bg-blue-100 w-full"
                            >
                                <option value="">Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">high</option>
                            </select>

                        </div>

                        {/* Date */}
                        <div className="p-2 rounded-md bg-blue-100 flex-1 sm:flex-none">

                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => {
                                    setDueDate(e.target.value);
                                }}
                                className="focus:outline-none cursor-pointer text-sm w-full"
                            />

                        </div>

                    </div>

                </div>

                {/* Task Table */}
                <div className="overflow-x-auto">

                    <div className="min-w-187.5">

                        {/* Table Header */}
                        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_70px] items-center p-4 bg-blue-100 rounded-md mb-6 text-sm text-gray-600">

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

                        {/* Tasks */}
                        {
                            tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="grid grid-cols-[2fr_1fr_1fr_1fr_70px] items-center mb-2 p-3 rounded-md bg-white hover:bg-blue-100 transition cursor-pointer"
                                >

                                    <div
                                        onClick={() => {
                                            navigate(`/edit/${task.id}`);
                                        }}
                                        className="flex flex-col min-w-0 pr-3"
                                    >
                                        <h1 className="font-semibold truncate">
                                            {task.title}
                                        </h1>

                                        <p className="text-sm text-gray-600 truncate">
                                            {task.description}
                                        </p>
                                    </div>

                                    {/* Status */}
                                    <div
                                        className={`flex items-center gap-1 w-fit px-1 py-1 rounded-lg text-xs ${
                                            task.status === "pending"
                                                ? "bg-gray-300"
                                                : task.status === "in-progress"
                                                ? "bg-blue-200 font-semibold"
                                                : "bg-gray-200 text-gray-400"
                                        }`}
                                    >

                                        <span
                                            className={`w-1.5 h-1.5 rounded-full ${
                                                task.status === "pending"
                                                    ? "bg-gray-600"
                                                    : task.status === "in-progress"
                                                    ? "bg-blue-500"
                                                    : "bg-gray-400"
                                            }`}
                                        />

                                        <p>
                                            {
                                                task.status === "pending"
                                                    ? "Pending"
                                                    : task.status === "in-progress"
                                                    ? "In-Progress"
                                                    : "Completed"
                                            }
                                        </p>

                                    </div>

                                    {/* Priority */}
                                    <div
                                        className={`flex items-center gap-1 text-sm rounded-full w-fit px-1 py-1 ${
                                            task.priority === "low"
                                                ? "text-gray-600 bg-blue-50"
                                                : task.priority === "high"
                                                ? "bg-red-100 text-red-500"
                                                : "bg-orange-100 text-orange-600"
                                        }`}
                                    >

                                        {
                                            task.priority === "high" ? (
                                                <FaArrowUp size={10} />
                                            ) : task.priority === "medium" ? (
                                                <FiMinus size={10} />
                                            ) : (
                                                <FaArrowDown size={10} />
                                            )
                                        }

                                        <p>
                                            {
                                                task.priority === "low"
                                                    ? "Low"
                                                    : task.priority === "high"
                                                    ? "High"
                                                    : "Medium"
                                            }
                                        </p>

                                    </div>

                                    {/* Due Date */}
                                    <div>
                                        {
                                            task.dueDate && (
                                                <p className="text-sm text-gray-500">
                                                    {
                                                        new Date(task.dueDate).toLocaleDateString(
                                                            "en-Us",
                                                            {
                                                                day: "numeric",
                                                                month: "short",
                                                                year: "numeric"
                                                            }
                                                        )
                                                    }
                                                </p>
                                            )
                                        }
                                    </div>

                                    {/* Delete */}
                                    <div>
                                        <button
                                            onClick={() => {
                                                handleDelete(task.id);
                                            }}
                                        >
                                            <FaTrash className="hover:text-red-600 cursor-pointer transition" />
                                        </button>
                                    </div>

                                </div>
                            ))
                        }

                    </div>

                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-8 sm:mt-10">

                    <div className="flex items-center">

                        <button
                            className={`mr-3 sm:mr-4 cursor-pointer transition ${
                                page === 1
                                    ? "text-gray-400"
                                    : "text-black hover:text-blue-400"
                            }`}
                            onClick={() => {
                                setPage(page - 1);
                            }}
                            disabled={page === 1}
                        >
                            <FaAngleLeft />
                        </button>

                        {
                            pages.map((p) => (
                                <button
                                    className={`font-bold cursor-pointer px-2 rounded-md mr-1 sm:mr-2 transition ${
                                        page === p
                                            ? "bg-blue-400 text-white"
                                            : "hover:bg-blue-400"
                                    }`}
                                    key={p}
                                    onClick={() => {
                                        setPage(p);
                                    }}
                                >
                                    {p}
                                </button>
                            ))
                        }

                        <button
                            className={`mr-2 sm:mr-4 cursor-pointer transition ${
                                page === pageNumber
                                    ? "text-gray-400"
                                    : "text-black hover:text-blue-400"
                            }`}
                            onClick={() => {
                                setPage(page + 1);
                            }}
                            disabled={page === pageNumber}
                        >
                            <FaAngleRight />
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Home;