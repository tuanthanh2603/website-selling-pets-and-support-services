import mongoose from "mongoose";
const { Schema } = mongoose;

const orderServiceModel = new Schema({
    userId: {
        type: String,
        required: true,
    },
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
        required: true,
    },
    date_created: {
        type: String,
    },
    total_price: {
        type: Number,
    },
    payment: {
        type: String,
        default: 'Chưa thanh toán',
    },
});

export const OrderService = mongoose.model("OrderService", orderServiceModel, "OrderService");