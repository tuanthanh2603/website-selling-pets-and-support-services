import mongoose from "mongoose";
const { Schema } = mongoose;

const accountSchema = new Schema({
    name: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: true,
    },
    pass: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    sex: {
        type: String,
        required: false,
    },
    created_at: {
        type: Date,
        default: Date.now, 
    },
    classify: {
        type: String,
    }
    
});

export const Account = mongoose.model("Account", accountSchema, "Account");