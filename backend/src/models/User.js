import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    avatar: {
        url: {
        type: String,
        default: "https://i.pinimg.com/736x/13/74/20/137420f5b9c39bc911e472f5d20f053e.jpg"
        },
        public_id: {
            type: String,
            default: ""
        }
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;