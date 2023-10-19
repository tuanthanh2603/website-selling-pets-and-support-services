import mongoose from "mongoose";
const { Schema } = mongoose;

const categoryPetSchema = new Schema({
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
    classify: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now, 
    }
    
});

export const CategoryPet = mongoose.model("CategoryPet", categoryPetSchema, "CategoryPet");