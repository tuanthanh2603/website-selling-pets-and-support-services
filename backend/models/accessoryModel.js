import mongoose from "mongoose";
const { Schema } = mongoose;

const categoryAccessory = new Schema({
    name: {
        type: String,
        required: true,
    }, 
    status: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
    
});

export const CategoryAccessory = mongoose.model("CategoryAccessory", categoryAccessory, "CategoryAccessory");