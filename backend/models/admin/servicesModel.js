import mongoose from "mongoose";
const { Schema } = mongoose;

const serviceCategory = new Schema({
    service_name: {
        type: String,
        required: true,
    },
    service_price: {
        type: Number,
        default: Date.now,
    },
    service_status: {
        type: String,
        default: true,
    }
});

export const ServiceCategory = mongoose.model("ServiceCategory", serviceCategory, "ServiceCategory");