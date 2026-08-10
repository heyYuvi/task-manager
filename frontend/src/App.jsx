import { Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
    <Toaster />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />}/>
    </Routes>
    </>
  )
}

export default App
