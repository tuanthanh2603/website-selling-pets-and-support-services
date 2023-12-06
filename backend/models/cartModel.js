import mongoose from "mongoose";
const { Schema } = mongoose;

const cart = new Schema({
    userId: {
        type: String,
    },
    ten: {
        type: String,
    },
    sdt: {
        type: String,
    },

    thanhTien: {
        type: Number,
    },
    trangThai: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

export const Cart = mongoose.model("Cart", cart, "Cart");