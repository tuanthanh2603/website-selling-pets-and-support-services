import mongoose from "mongoose";
const { Schema } = mongoose;

const categoryCatSchema = new Schema({
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
    
});

export const CategoryCat = mongoose.model("CategoryCat", categoryCatSchema, "CategoryCat");