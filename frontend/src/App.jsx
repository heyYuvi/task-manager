import { Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import EditTask from "./pages/EditTask";
import CreateTask from "./pages/CreateTask";
import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateProfile from "./pages/UpdateProfile";

function App() {

  return (
    <>
    <Toaster />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />}/>
      
      <Route element={<ProtectedRoute />}>
      <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/edit/:id" element={<EditTask />} />
      <Route path="/create" element={<CreateTask />} />
      <Route path="/updateProfile" element={<UpdateProfile />} />
      </Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
