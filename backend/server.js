const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
// const mongoose = require('mongoose');

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// const { MongoClient, ServerApiVersion  } = require('mongodb');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://tuanthanh:CVbn12345@ooad.14cdlg8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri); // Xóa tùy chọn useNewUrlParser


async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
connectToDatabase();

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
  

app.post('/addCategoryDog', async (req, res) => {
    try {
      const requestData = req.body;
      
      console.log(requestData);
  
      // Tạo một đối tượng để chèn vào cơ sở dữ liệu
      const dataToInsert2 = {
        name: req.body.name,
        status: req.body.status,
        images: req.body.images
      };
  
      // Lựa chọn bảng (collection) bạn muốn chèn dữ liệu vào
      const collection = client.db("project-ooad").collection("CategoryDog");
  
      // Thực hiện việc chèn dữ liệu bằng insertOne()
      const result = await collection.insertOne(dataToInsert2);
  
      console.log(`Inserted ${result.insertedCount} document into the database`);
      res.status(200).send({ "msg": "Inserted to DB" });
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).send({ "msg": "Error inserting to DB" })
    }
  });



const port = 3000;
app.listen(port, () => {
    console.log("Server running on port: ", port);
})

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


