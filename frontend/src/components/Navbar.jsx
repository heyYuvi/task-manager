import { NavLink } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import logo from "../assets/logo.png";



const Navbar = () => {

    return (
        <div className="w-64 h-screen bg-blue-50 flex flex-col items-start pl-2 pr-2">
            <div className="flex items-center pt-4">
                <img src={logo} alt="TaskFlow Logo" className="w-15 rounded-md"></img>
                <h1 className="font-semibold text-2xl w-full">TaskFlow</h1>
            </div>
            <div className="pt-8 w-full">
                <ul className="flex flex-col font-semibold">
                    <li className="w-full p-2 cursor-pointer">
                            <NavLink to="/" className={({ isActive }) => `flex items-center gap-2 ${isActive ? "bg-blue-300 rounded-md p-2" : "hover:bg-blue-300 rounded-md transition p-2"}`}><IoIosHome /> Home</NavLink>
                    </li>
                    <li className="w-full p-2 cursor-pointer">
                        <NavLink to="/create" className={({ isActive }) => `flex items-center gap-2 ${isActive ? "bg-blue-300 rounded-md p-2" : "hover:bg-blue-300 transition p-2 rounded-md"}`}><IoCreateOutline />Create Task</NavLink>
                     </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;