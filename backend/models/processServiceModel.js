import mongoose from "mongoose";
const { Scheme } = mongoose;

const processService = new Scheme({
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