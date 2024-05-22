import mongoose, { Schema } from "mongoose";
import { type } from "os";

const userSchema = new Schema({
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true, 

    },
    name: {
        type: String,
        required: true, 

    },
    avatar: {
        type: String,
    },
    otp: {
        type: Number,
        default: 0,
    },
})

export const User = mongoose.model("user", userSchema)
