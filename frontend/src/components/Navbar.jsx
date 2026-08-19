import { NavLink } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import logo from "../assets/logo.png";

const Navbar = () => {

    return (
        <div className="w-full h-auto md:w-64 md:h-screen bg-blue-50 flex flex-col md:items-start px-3 md:px-2">

            {/* Logo */}
            <div className="flex items-center pt-3 md:pt-4">
                <img
                    src={logo}
                    alt="TaskFlow Logo"
                    className="w-12 md:w-15 rounded-md"
                />

                <h1 className="font-semibold text-xl md:text-2xl ml-1">
                    TaskFlow
                </h1>
            </div>

            {/* Navigation */}
            <div className="pt-4 md:pt-8 w-full">

                <ul className="flex flex-row md:flex-col gap-2 md:gap-0 font-semibold">

                    {/* Home */}
                    <li className="flex-1 md:w-full md:p-2 cursor-pointer">

                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `flex items-center justify-center md:justify-start gap-2 p-2 rounded-md transition ${
                                    isActive
                                        ? "bg-blue-300"
                                        : "hover:bg-blue-300"
                                }`
                            }
                        >
                            <IoIosHome />
                            <span>Home</span>
                        </NavLink>

                    </li>

                    {/* Create Task */}
                    <li className="flex-1 md:w-full md:p-2 cursor-pointer">

                        <NavLink
                            to="/create"
                            className={({ isActive }) =>
                                `flex items-center justify-center md:justify-start gap-2 p-2 rounded-md transition ${
                                    isActive
                                        ? "bg-blue-300"
                                        : "hover:bg-blue-300"
                                }`
                            }
                        >
                            <IoCreateOutline />
                            <span>Create Task</span>
                        </NavLink>

                    </li>

                </ul>

            </div>

        </div>
    );
};

export default Navbar;