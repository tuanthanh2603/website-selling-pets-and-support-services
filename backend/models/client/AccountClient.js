import mongoose from "mongoose";
const { Schema } = mongoose;

const accountClientSchema = new Schema({
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
    }
    
});

export const AccountClient = mongoose.model("AccountClient", accountClientSchema, "AccountClient");