import express from "express";
import cors from "cors";
import bodyParser from "body-parser";


import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;

// console.log('dotenv', process.env.REFRESH_TOKEN)
mongoose.connect(process.env.URI_MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to MongoDB success');
})
.catch((err) => {
  console.log('Error connecting to MongoDB:', err)
})



import routes from "./routes/index.js";
routes(app);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
