import mongoose from "mongoose";
const { Schema } = mongoose;

const processService = new Schema({
    status: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    employee_id: {
        type: String,
        require: true,
    }
});

export const ProcessService = mongoose.model("ProcessService", processService, "ProcessService");