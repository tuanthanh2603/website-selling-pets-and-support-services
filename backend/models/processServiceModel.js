import mongoose from "mongoose";
const { Schema } = mongoose;

const processService = new Schema({
    status: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

export const ProcessService = mongoose.model("ProcessService", processService, "ProcessService");