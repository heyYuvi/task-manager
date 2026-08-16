import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar";

const MainLayout = () =>{

    return(
        <div className="w-full h-screen flex ">
            <Navbar />
            <main className="flex-1 bg-[#FFFEF7]">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout;