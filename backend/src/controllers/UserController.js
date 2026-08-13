import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import registerSchema from "../validators/registerValidations.js"
import loginSchema from "../validators/loginValidations.js";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";
import updateProfileSchema from "../validators/updateProfileValidations.js";


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

export const login = async (req, res) => {
    try {

        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: result.error.issues
            });
        }

        const data = result.data;

        const user = await User.findOne({ email: data.email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const isMatch = await bcryptjs.compare(data.password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
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
    } catch (error) {
        console.error("Login Error ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// Logout 

export const logout = (req, res) => {

    return res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    }).status(200).json({
        success: true,
        message: "Logout Successful"
    });
}

export const uploadAvatar = async (req, res) => {
    try{
        
    if(!req.file){
        return res.status(400).json({
            success: false,
            message: "Please upload an image"
        });
    }

    const user = await User.findById(req.user._id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        });
    }

    if(user.avatar.public_id){
        await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    const result = await new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream({ folder: "avatars" }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result)
            }
        });

        streamifier.createReadStream(req.file.buffer)
        .pipe(uploadStream);
    });

    if(!result){
        return res.status(400).json({
            success: false,
            message: "Image Upload failed"
        });
    }


    user.avatar.url = result.secure_url;
    user.avatar.public_id = result.public_id;

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Avatar Updated Successfully",
        data: {
            avatar: user.avatar.url,
            public_id: user.avatar.public_id
        }
    });
    
    }catch(error){
        console.error("Update Avatar error: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const updateProfile = async (req, res) =>{
    try{
        const result = updateProfileSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            success: false,
            error: result.error.issues
        });
    }

    const data = result.data;

    if(!data.name && !req.file){
        return res.status(400).json({
            success: false,
            message: "Please upload an image or update the name"
        });
    }

    const user = await User.findById(req.user._id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        });
    }


    if(req.file){
        
    if(user.avatar.public_id){
        await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    const result1 = await new Promise((resolve, reject) =>{

        const uploadStream =  cloudinary.uploader.upload_stream({ folder: "TaskManagerAvatar" }, (error, result) =>{
            if(error){
                reject(error);
            }else{
                resolve(result);
            }
        });

        streamifier.createReadStream(req.file.buffer)
        .pipe(uploadStream);
    });

    
    user.avatar.url = result1.secure_url;
    user.avatar.public_id = result1.public_id;

    }

    user.name = data.name || user.name;

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: {
                url: user.avatar.url,
                public_id: user.avatar.public_id
            },
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    });
    }catch(error){
        console.error("Update Profile error: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// Get Me


export const getMe = (req, res) =>{
    res.json({
        success: true,
        user: req.user
    });
}