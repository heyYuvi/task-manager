import { useState } from "react";
import api from "../services/api.js";
import toast from "react-hot-toast";
import Profile from "../components/Profile.jsx";

const UpdateProfile = () =>{
    const [preview, setPreview] = useState("");
    const [form, setForm] = useState({
        name: "",
        avatar: null
    });

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const formData = new FormData();

        if(form.avatar){
            formData.append("image", form.avatar);
        }
        if(form.name){
            formData.append("name", form.name);
        }

        try{  
        await api.put("/profile", formData);
        toast.success("Profile Updated Successfully");
        setForm({
            name: "",
            avatar: ""
        });
        }catch(error){
            toast.error(error.response?.data?.message || "Something Went Wrong");
        }
    }

    return (
        <div>

            {
                preview && (
                    <img src={preview} alt="Profile Preview"/>
                )
            }

            <form onSubmit={handleSubmit}>
                
            <input type="file" accept="image/*" onChange={(e) =>{
                const file = e.target.files[0]
                setForm((prev) =>({
                ...prev, avatar: file
            }));
            if(file){
                setPreview(URL.createObjectURL(file));
            }
        }} />


            <input type="text" value={form.name} onChange={(e) =>{setForm((prev) =>({
                    ...prev, name: e.target.value
                }))}} />
                <button>Change</button>
            </form>

            <Profile />
        </div>
    )
}

export default UpdateProfile;