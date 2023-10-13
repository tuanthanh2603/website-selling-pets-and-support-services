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
import fs from "fs";
import path from "path";

import * as dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

export const createCategoryDogController = async (req, res) => {
  console.log(req.files[0].filename);
  const { name, status } = req.body;
  try {
    const uploadedFiles = req.files[0].filename;
    const imageFile = req.body.images;
    const imagePath = path.join(process.cwd(), "public/uploads", uploadedFiles);
    const imageData = fs.createReadStream(imagePath);
    console.log(imageFile);
    const createFile = await drive.files.create({
      requestBody: {
        name: uploadedFiles,
        mimeType: ["image/png", "image/jpeg", "image/jpg"],
        visibility: "public",
      },
      media: {
        mimeType: ["image/png", "image/jpeg", "image/jpg"],
        body: imageData,
      },
    });
    console.log(createFile.data);
    const fileId = createFile.data.id;
    drive.permissions.create(
      {
        fileId: fileId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      },
      (err, response) => {
        if (err) {
          console.error("Lỗi khi thiết lập quyền truy cập:", err);
        } else {
          console.log("Quyền truy cập ảnh đã được thiết lập.");
        }
      }
    );
    drive.files.get(
      {
        fileId: fileId,
        fields: "webViewLink", 
      },
      (err, response) => {
        if (err) {
          console.error("Lỗi khi tải thông tin tệp ảnh:", err);
        } else {
          const webViewLink = response.data.webViewLink;
         
        }
      }
    );
    const linkImages = `https://drive.google.com/uc?id=${fileId}`;
    console.log(linkImages);
    const newCategoryDog = await CategoryDog.create({
      name: name,
      status: status,
      images: linkImages,
    });
    console.log(newCategoryDog);
    res.status(201).json(newCategoryDog);

    if(linkImages){
      const imagePathToDelete = path.join(process.cwd(), 'public/uploads', uploadedFiles);
      console.log(imagePathToDelete)
      fs.unlink(imagePathToDelete, (err) => {
        if(err){
          console.log('Lỗi khi xóa tệp ảnh: ', err)
        } else {
          console.log('Tệp ảnh đã xóa khỏi thư mục public.')
        }
      })
    } else{
      console.log('linkImages chưa được tạo.')
    }
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ msg: "Error inserting to DB" });
  }
};

export const getCategoryDog = async (req, res) => {
  try {
    const categoryDogs = await CategoryDog.find();
    res.status(200).json(categoryDogs);
  } catch {
    console.error("Error retrieving data:", error);
    res.status(500).json({ msg: "Error retrieving data from DB" });
  }
};
