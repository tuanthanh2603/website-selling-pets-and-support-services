import { Double } from "mongodb";
import mongoose from "mongoose";
const { Schema } = mongoose;

const categoryDogSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    images: {
        type: String,
        required: true,
    }
});

export const CategoryDog = mongoose.model("CategoryDog", categoryDogSchema);