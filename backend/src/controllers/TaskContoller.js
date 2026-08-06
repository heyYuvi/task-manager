import mongoose from "mongoose";
import Task from "../models/Task.js";
import taskSchema from "../validators/taskValidations.js"
import updateTaskSchema from "../validators/updateTaskValidations.js";

// Create Task 

export const createTask = async (req, res) => {
    try {
        const result = taskSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: result.error.issues
            });
        }
        const data = result.data;

        const task = await Task.create({
            title: data.title,
            description: data.description,
            user: req.user._id,
            status: data.status,
            priority: data.priority,
            dueDate: data.dueDate
        });

        await task.populate("user", "name email");

        return res.status(201).json({
            success: true,
            message: "Task Created",
            data: {
                id: task._id,
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                dueDate: task.dueDate,
                user: {
                    id: task.user._id,
                    name: task.user.name,
                    email: task.user.email
                }
            }
        });
    } catch (error) {
        console.error("Create Task error: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// Get All Task

export const getAllTask = async (req, res) => {

    const query = { user: req.user._id };

    const { search, status, priority, dueDate, page, limit } = req.query;
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 6;
    const skip = (pageNumber - 1) * limitNumber;

    if (search) {
        query.$or = [
            {
                title: { $regex: search, $options: "i" }
            },
            {
                description: { $regex: search, $options: "i" }
            }
        ]
    }

    if (status) {
        query.status = status
    }

    if (priority) {
        query.priority = priority
    }

    if (dueDate) {
        query.dueDate = dueDate
    }

    const tasks = await Task.find(query).populate("user", "name email avatar").sort({ createdAt: -1 }).skip(skip).limit(limitNumber);

    if (tasks.length === 0) {
        return res.json({
            success: false,
            message: "No task Found",
            totalDocuments: 0,
            totalPage: 0,
            data: []
        });
    }

    const totalDocuments = await Task.countDocuments(query);
    const totalPage = Math.ceil(totalDocuments / limitNumber);

    return res.json({
        success: true,
        message: "Task fetched",
        page: pageNumber,
        limit: limitNumber,
        totalDocuments: totalDocuments,
        totalPage: totalPage,
        hasNextPage: pageNumber < totalPage,
        hasPreviousPage: pageNumber > 1,
        data: tasks.map((task) => ({
            id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate,
            user: {
                id: task.user._id,
                name: task.user.name,
                email: task.user.email,
                avatar: task.user.avatar
            },
            createdAt: task.createdAt,
            updatedAt: task.updatedAt
        })
        )
    });
}

// Get Single Task

export const getSingleTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Id"
            });
        }

        const task = await Task.findOne({ _id: id, user: req.user._id }).populate("user", "name email avatar");
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task Not Found"
            });
        }

        return res.json({
            success: true,
            message: "Task Fetched",
            data: {
                id: task._id,
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                dueDate: task.dueDate,
                user: {
                    id: task.user._id,
                    name: task.user.name,
                    email: task.user.email,
                    avatar: task.user.avatar
                },
                createdAt: task.createdAt,
                updatedAt: task.updatedAt
            }
        });
    } catch (error) {
        console.error("Get Single Task error: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// Update task

export const updateTask = async (req, res) =>{
    try{
        const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false,
            message: "Invalid Id"
        });
    }

    const result = updateTaskSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            success: false,
            error: result.error.issues
        });
    }

    const data = result.data;

    const task = await Task.findOne({ _id: id, user: req.user._id }).populate("user", "name email avatar");
    if(!task){
        return res.status(404).json({
            success: false,
            message: "Task Not Found"
        });
    }

    if(!data.title && !data.description && !data.status && !data.priority && !data.dueDate){
        return res.status(400).json({
            success: false,
            message: "Please provide at least one field"
        });
    }

    task.title = data.title || task.title;
    task.description = data.description || task.description;
    task.status = data.status || task.status
    task.priority = data.priority || task.priority
    task.dueDate = data.dueDate || task.dueDate

    await task.save();

    return res.status(200).json({
        success: true,
        message: "Task Updated",
        data: {
            id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate,
            user: {
                id: task.user._id,
                name: task.user.name,
                email: task.user.email,
                avatar: task.user.avatar
            },
            createdAt: task.createdAt,
            updatedAt: task.updatedAt
        }
    });
    }catch(error){
        console.error("Update Task error: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// Delete Task

export const deleteTask = async (req, res) =>{
    try{
        
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false,
            message: "Invalid Id"
        });
    }

    const task = await Task.findOne({ _id: id, user: req.user._id });
    if(!task){
        return res.status(404).json({
            success: false,
            message: "Task Not Found"
        });
    }

    await task.deleteOne();
    
    return res.json({
        success: true,
        message: "Task Deleted"
    });
    }catch(error){
        console.error("Delete Task error: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}