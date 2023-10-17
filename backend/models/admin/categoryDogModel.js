import mongoose from "mongoose";
const { Schema } = mongoose;

const categoryDogSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    images: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now, 
    }
    
});

export const CategoryDog = mongoose.model("CategoryDog", categoryDogSchema, "CategoryDog");