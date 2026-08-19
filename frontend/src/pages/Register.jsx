import { useState } from "react";
import api from "../services/api.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdPerson, MdEmail, MdLock } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import logo from "../assets/logo.png";

const Register = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
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
            await api.post("/auth/register", form);

            toast.success("User Registered Successfully");

            setForm({
                name: "",
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

            {/* Register Card */}
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
                        Create your account
                    </h1>

                    <p className="text-sm text-gray-500 mt-2">
                        Start managing your tasks with TaskFlow
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Name
                        </label>

                        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                            <MdPerson className="text-gray-400 text-xl shrink-0" />

                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent"
                                required
                            />
                        </div>
                    </div>

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
                                placeholder="Create a password"
                                className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-xl py-3 transition duration-200 cursor-pointer"
                    >
                        Create Account
                        <FaArrowRight className="text-sm" />
                    </button>

                </form>

                {/* Login */}
                <div className="mt-7 pt-5 border-t border-[#E0E3E5] flex justify-center">
                    <p className="text-sm text-[#434655]">
                        Already have an account?

                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="text-blue-600 font-medium hover:underline ml-1 cursor-pointer"
                        >
                            Login here
                        </button>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Register;