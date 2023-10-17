import mongoose from "mongoose";
const { Schema } = mongoose;

const imagesPetSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    petid: {
        type: String,
        required: true,
    }, 
});

export const ImagesPet = mongoose.model("ImagesPet", imagesPetSchema, "ImagesPet");