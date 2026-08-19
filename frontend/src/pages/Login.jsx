import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import logo from "../assets/logo.png";

const Login = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/auth/login", form);

            toast.success("User Logged In Successfully");

            setForm({
                email: "",
                password: ""
            });

            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something Went Wrong"
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFF] flex items-center justify-center px-4 py-8 relative overflow-hidden">

            {/* Background blur circles */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl"></div>

            <div className="absolute -bottom-24 -right-20 w-72 h-72 bg-indigo-200/40 rounded-full blur-3xl"></div>

            {/* Login Card */}
            <div className="relative w-full max-w-110 bg-white rounded-2xl shadow-xl border border-gray-100 px-6 py-8 sm:px-10 sm:py-10">

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img
                        src={logo}
                        alt="TaskFlow"
                        className="w-14 h-14 rounded-xl object-cover"
                    />
                </div>

                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        Welcome Back
                    </h1>

                    <p className="text-sm text-gray-500 mt-2">
                        Login to continue managing your tasks
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email
                        </label>

                        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                            <MdEmail className="text-gray-400 text-xl shrink-0" />

                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Password
                        </label>

                        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                            <MdLock className="text-gray-400 text-xl shrink-0" />

                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent"
                                required
                            />
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-xl py-3 transition duration-200 cursor-pointer"
                    >
                        Login
                        <FaArrowRight className="text-sm" />
                    </button>

                </form>

                {/* Register */}
                <p className="text-center text-sm text-gray-500 mt-7">
                    Don't have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                    >
                        Create an account
                    </button>
                </p>

            </div>
        </div>
    );
};

export default Login;