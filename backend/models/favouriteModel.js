import mongoose from "mongoose";
const { Schema } = mongoose;

const favourite = new Schema({
    userId: {
        type: String,
    },
    productId: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

export const Favourite = mongoose.model("Favourite", favourite, "Favourite");