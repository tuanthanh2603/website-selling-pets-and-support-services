// const addCategoryDog = async (req, res) => {
//     try {
//         const requestData = req.body;



//         console.log(requestData);

//         // Tạo một đối tượng để chèn vào cơ sở dữ liệu
//         const dataToInsert2 = {
//           name: req.body.name,
//           status: req.body.status,
//           images: req.body.images
//         };

//         // Lựa chọn bảng (collection)
//         const collection = client.db("project-ooad").collection("CategoryDog");

//         // Chèn dữ liệu bằng insertOne()
//         const result = await collection.insertOne(dataToInsert2);

//         console.log(`Inserted ${result.insertedCount} document into the database`);
//         res.status(200).send({ "msg": "Inserted to DB" });
//       } catch (error) {
//         console.error("Error inserting data:", error);
//         res.status(500).send({ "msg": "Error inserting to DB" })
//       }
// }

import { CategoryDog } from "../../models/admin/categoryDogModel.js";
import { google } from "googleapis";
import fs  from "fs";
import axios from "axios";

import * as dotenv from "dotenv";
dotenv.config()

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
const drive = google.drive({
  version: 'v3',
  auth: oauth2Client
})


export const createCategoryDogController = async (req, res) => {
  const requestData = req.body;
  const { name, status } = requestData;
  const { images } = req.body;
  const response = await axios.get(images, { responseType: 'stream' });

  try {
    const createFile = await drive.files.create({
      requestBody: {
        name: "love3.jpg",
        mimeType: 'image/jpg'
      },
      media: {
        mimeType: 'image/jpg',
        body: response.data,
      }
    })
    console.log(createFile.data)
    // const newCategoryDog = await CategoryDog.create({
    //   name, 
    //   status, 
    //   images : createFile.data.webViewLink 
    // });

    // console.log(newCategoryDog);
    // res.status(201).json(newCategoryDog); 
  } catch (error) { 
    console.error("Error inserting data:", error);
    res.status(500).json({ msg: "Error inserting to DB" }); 
  }
}
export const getCategoryDog = async (req, res) => {
  try{
    const categoryDogs = await CategoryDog.find();
    res.status(200).json(categoryDogs);
  } catch {
    console.error("Error retrieving data:", error);
    res.status(500).json({ msg: "Error retrieving data from DB" });
  }
}


