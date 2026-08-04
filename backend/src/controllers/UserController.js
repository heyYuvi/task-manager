import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"; 
import User from "../models/User.js";
import registerSchema from "../validators/registerValidations.js"
import loginSchema from "../validators/loginValidations.js";


// Register

export const register = async (req, res) => {
    try {

        const result = registerSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: result.error.issues
            });
        }

        const data = result.data;

        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            });
        }

        const hashedPassword = await bcryptjs.hash(data.password, 10);

        const user = await User.create({
            name: data.name.trim(),
            email: data.email.trim(),
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "User Registered"
        });

    } catch (error) {
        console.error("Register Error ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


// Login 

export const login = async (req, res) =>{
    try{
        
    const result = loginSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            success: false,
            error: result.error.issues
        });
    }

    const data = result.data;

    const user = await User.findOne({ email: data.email });
    if(!user){
        return res.status(401).json({
            success: false,
            message: "Invalid Email or Password"
        });
    }

    const isMatch = await bcryptjs.compare(data.password, user.password);
    if(!isMatch){
        return res.status(401).json({
            success: false,
            message: "Invalid Email or Password"
        });
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d"}
    );

    return res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    }).status(200).json({
        success: true,
        message: "Login Successful",
        data: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
    }catch(error){
        console.error("Login Error ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// Logout 

export const logout = (req, res) =>{

    return res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    }).status(200).json({
        success: true,
        message: "Logout Successful"
    });
}