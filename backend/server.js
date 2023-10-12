import express from "express";
import cors from "cors";
// import { json as _json, urlencoded } from 'body-parser';

// const mongoose = require('mongoose');

// app.use(json());
// app.use(express.urlencoded({ extended: true }));

// app.use(urlencoded({ extended: false }));

import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

// console.log('dotenv', process.env.URI_MONGODB)
mongoose.connect(process.env.URI_MONGODB)
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

// const { MongoClient, ServerApiVersion  } = require('mongodb');
// import { MongoClient } from 'mongodb';

// const uri = "mongodb+srv://tuanthanh:CVbn12345@ooad.14cdlg8.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri); 


// async function connectToDatabase() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// }
// connectToDatabase();


// const client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
// });
// async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
// run().catch(console.dir); 

// async function insertData() {
//     try {
//       // Tạo một đối tượng để chèn vào cơ sở dữ liệu
//       const dataToInsert2 = {
//         name: "Example Category",
//         status: 2,
//         images: "image2.jpg",
//       };
  
//       // Lựa chọn bảng (collection) bạn muốn chèn dữ liệu vào
//       const collection = client.db("project-ooad").collection("CategoryDog");
  
//       // Thực hiện việc chèn dữ liệu bằng insertOne()
//       const result = await collection.insertOne(dataToInsert2);
  
//       console.log(`Inserted ${result.insertedCount} document into the database`);
//     } catch (error) {
//       console.error("Error inserting data:", error);
//     }
//   }
// insertData().catch(console.dir);
  







// MongoDB Atlas
// const dbUrl = "mongodb+srv://tuanthanh:CVbn12345@ooad.14cdlg8.mongodb.net/"
// const connectionParams = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// };
// mongoose.connect(dbUrl, connectionParams)
// .then(() => {
//     console.info("Connected to MongoDB Atlas");
// })
// .catch((e) => {
//     console.log("Error connecting to MongoDB Atlas:", e);
// });


