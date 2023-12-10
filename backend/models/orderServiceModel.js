import mongoose from "mongoose";
const { Schema } = mongoose;

const orderServiceModel = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        default: Date.now,
    },
    petName: {
        type: String,
        required: true,
    },
    service_selected: {
        type: String,
        required: true
    },
    date: {
        type: Date,
    }
});

export const OrderService = mongoose.model("OrderService", orderServiceModel, "OrderService");