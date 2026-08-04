import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) =>{
    try{
        
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            success: false,
            message: "Token Not Provided"
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        });
    }

    req.user = user;
    next();
    }catch(error){
        console.error("Auth middleware error ", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
}

 