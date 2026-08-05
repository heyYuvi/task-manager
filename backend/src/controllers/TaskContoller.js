import Task from "../models/Task.js";
import taskSchema from "../validators/taskValidations.js"

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

    if(status){
        query.status = status
    }

    if(priority){
        query.priority = priority
    }

    if(dueDate){
        query.dueDate = dueDate
    }

    const tasks = await Task.find(query).populate("user", "name email").sort({ createdAt: -1 }).skip(skip).limit(limitNumber);

    if(tasks.length === 0){
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
                email: task.user.email
            },
            createdAt: task.createdAt,
            updatedAt: task.updatedAt
        })
        )
    });
}