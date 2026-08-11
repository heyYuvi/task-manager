import { Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import EditTask from "./pages/EditTask";
import CreateTask from "./pages/CreateTask";

function App() {

  return (
    <>
    <Toaster />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />}/>
      <Route path="/edit/:id" element={<EditTask />} />
      <Route path="/create" element={<CreateTask />} />
    </Routes>
    </>
  )
}

export default App
