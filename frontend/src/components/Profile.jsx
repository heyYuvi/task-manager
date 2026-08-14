import { useEffect, useState } from "react";
import api from "../services/api";

const Profile = () =>{
    const [profile, setProfile] = useState(null);
    console.log(profile);

    useEffect(() =>{
        const getProfileInfo = async () =>{
            const response = await api.get("/auth/me");
            setProfile(response.data.user)
        }

        getProfileInfo();
    }, [])

    return (
        <div>
            <h2>{profile?.name}</h2>
            <h2>{profile?.email}</h2>
            <img src={profile?.avatar?.url} />
            <p>Created: {new Date(profile?.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric"
            })}</p>
            <p>Updated: {new Date(profile?.updatedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric"
            })}</p>
        </div>
    )
}

export default Profile;