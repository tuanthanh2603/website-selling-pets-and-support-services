import mongoose from "mongoose";
const { Scheme } = mongoose;

const processService = new Scheme({
    status: {
        type: String,
        required: true,
    }
})