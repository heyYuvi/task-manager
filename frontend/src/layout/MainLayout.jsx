import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar";

const MainLayout = () =>{

    return(
        <div className="w-full h-screen flex scroll-smooth">
            <Navbar />
            <main className="flex-1 bg-blue-50">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout;