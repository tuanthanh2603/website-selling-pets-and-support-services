import mongoose from "mongoose";
const { Schema } = mongoose;

const petSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    classify: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now, 
    }
    
});

export const Pet = mongoose.model("Pet", petSchema, "Pet");