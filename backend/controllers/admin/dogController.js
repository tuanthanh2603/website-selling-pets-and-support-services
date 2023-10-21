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


import { CategoryPet } from "../../models/admin/categoryPetModel.js"
import { google } from "googleapis";
import fs from "fs";
import path from "path";

import * as dotenv from "dotenv";
import multer from "multer";
import upload from "./uploadController.js";
import { Pet } from "../../models/admin/petModel.js";
import { ImagesPet } from "../../models/admin/imagesPetModel.js";

dotenv.config();

// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = process.env.REDIRECT_URI;
// const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
// const oauth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );
// oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
// const drive = google.drive({
//   version: "v3",
//   auth: oauth2Client,
// });

export const createCategoryDogController = async (req, res) => {
  console.log(req.files[0].filename);

  const { name, status, classify } = req.body;
  const existingCategoryDog = await CategoryPet.findOne({ name });
  if (existingCategoryDog) {
    console.log("Tên danh mục đã tồn tại.");
    return res.status(400).json({ message: "Tên danh mục đã tồn tại." });
  }
  try {
    const baseImagePath = "http://localhost:3000/public/uploads/";
    const images2 = baseImagePath + req.files[0].filename;
    console.log(images2);
    const images = req.files[0].filename;
    const newCategoryDog = await CategoryPet.create({
      name: name,
      status: status,
      images: images,
      classify: classify,
    });
    console.log(newCategoryDog);
    res.status(201).json(newCategoryDog);
  } catch {
    console.error("Error inserting data:", error);
    res.status(500).json({ msg: "Error inserting to DB" });
  }
};
// export const createCategoryDogController = async (req, res) => {
//   console.log(req.files[0].filename);
//   const { name, status } = req.body;
//   const existingCategoryDog = await CategoryDog.findOne({ name });
//   if(existingCategoryDog) {
//     console.log('Tên danh mục đã tồn tại')
//     return res.status(400).json({ message: 'Tên danh mục đã tồn tại' });

//   }

//   try {
//     const uploadedFiles = req.files[0].filename;
//     const imageFile = req.body.images;
//     const imagePath = path.join(process.cwd(), "public/uploads", uploadedFiles);
//     const imageData = fs.createReadStream(imagePath);
//     console.log(imageFile);
//     const createFile = await drive.files.create({
//       requestBody: {
//         name: uploadedFiles,
//         mimeType: ["image/png", "image/jpeg", "image/jpg"],
//         visibility: "public",
//       },
//       media: {
//         mimeType: ["image/png", "image/jpeg", "image/jpg"],
//         body: imageData,
//       },
//     });
//     console.log(createFile.data);
//     const fileId = createFile.data.id;
//     drive.permissions.create(
//       {
//         fileId: fileId,
//         requestBody: {
//           role: "reader",
//           type: "anyone",
//         },
//       },
//       (err, response) => {
//         if (err) {
//           console.error("Lỗi khi thiết lập quyền truy cập:", err);
//         } else {
//           console.log("Quyền truy cập ảnh đã được thiết lập.");
//         }
//       }
//     );
//     drive.files.get(
//       {
//         fileId: fileId,
//         fields: "webViewLink",
//       },
//       (err, response) => {
//         if (err) {
//           console.error("Lỗi khi tải thông tin tệp ảnh:", err);
//         } else {
//           const webViewLink = response.data.webViewLink;
//         }
//       }
//     );
//     const linkImages = `https://drive.google.com/uc?id=${fileId}`;
//     console.log(linkImages);

//     const newCategoryDog = await CategoryDog.create({
//       name: name,
//       status: status,
//       images: linkImages,
//       fileId: fileId,
//     });
//     console.log(newCategoryDog);
//     res.status(201).json(newCategoryDog);

//     if (linkImages) {
//       const imagePathToDelete = path.join(
//         process.cwd(),
//         "public/uploads",
//         uploadedFiles
//       );

//       fs.unlink(imagePathToDelete, (err) => {
//         if (err) {
//           console.log("Lỗi khi xóa tệp ảnh: ", err);
//         } else {
//           console.log("Tệp ảnh đã xóa khỏi thư mục public.");
//         }
//       });
//     } else {
//       console.log("linkImages chưa được tạo.");
//     }
//   } catch (error) {
//     console.error("Error inserting data:", error);
//     res.status(500).json({ msg: "Error inserting to DB" });
//   }
// };

export const getCategoryDog = async (req, res) => {
  try {
    const categoryDogs = await CategoryPet.find({ classify: "Chó" });
    res.status(200).json(categoryDogs);
  } catch {
    console.error("Error retrieving data:", error);
    res.status(500).json({ msg: "Error retrieving data from DB" });
  }
};

export const deleteCategoryDog = async (req, res) => {
  const itemId = req.params.id;
  console.log("id: " + itemId);

  try {
    const categoryDog = await CategoryPet.findById(itemId);
    console.log(categoryDog.images);
    if (categoryDog) {
      const imagePathToDelete = path.join(
        process.cwd(),
        "public/uploads",
        categoryDog.images
      );
      fs.unlink(imagePathToDelete, (err) => {
        if (err) {
          console.log("Lỗi khi xóa tệp ảnh: ", err);
          res.status(500).json({ message: "Lỗi khi xóa tệp ảnh." });
        } else {
          console.log("Tệp ảnh đã xóa khỏi thư mục public.");
        }
      });
    } else {
      console.log("Chưa truy xuất được ảnh");
    }

    await CategoryPet.findByIdAndRemove(itemId);
    console.log("Xóa danh mục thành công");
    res.status(200).json({ message: "Xóa thành công" });
  } catch {
    console.error("Lỗi khi xóa dữ liệu:", error);
    res.status(500).json({ message: "Lỗi khi xóa dữ liệu." });
  }
};


export const updateCategoryDogController = async (req, res) => {
  const updateCategoryDog = req.body;
  const { id, name, status } = updateCategoryDog;

  try {
    const categoryDog = await CategoryPet.findById(id);
    if (!categoryDog) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục.' });
    } else {
      categoryDog.name = name;
      categoryDog.status = status;
      if (req.files && req.files[0]) {
        const newImages = req.files[0].filename;
        categoryDog.images = newImages;
      }
      await categoryDog.save();
      return res.status(200).json({ message: 'Cập nhật danh mục thành công.' });
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật danh mục:', error);
    return res.status(500).json({ error: 'Có lỗi xảy ra khi cập nhật danh mục.' });
  }
};



export const getDog = async (req, res) => {
  try {
    const dogs = await Pet.find({ classify: "Chó cảnh" })
      .populate('category') // Sử dụng populate để join CategoryDog
      .exec();

    // Lấy tên danh mục từ bảng CategoryDog
    const dogsWithCategoryNames = await Promise.all(dogs.map(async (dog) => {
      const images = await ImagesPet.find({ petid: dog.id }).exec();
      return {
        id: dog.id,
        name: dog.name,
        status: dog.status,
        classify: dog.classify,
        category: dog.category.name, // Lấy tên danh mục từ bảng CategoryDog
        sex: dog.sex,
        created_at: dog.created_at,
        images, // Include images associated with the pet
      };
    }));

    console.log(dogsWithCategoryNames);

    res.json(dogsWithCategoryNames);
  } catch (error) {
    console.error('Lỗi lấy dữ liệu:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi tải dữ liệu' });
  }
};


export const getCategoryDogToSelect = async (req, res) => {
  try{
      const categoriesDog = await CategoryPet.find({ classify: "Chó" });
      res.status(200).json(categoriesDog);

  } catch {
      console.error("Lỗi khi lấy danh mục:", error);
      res.status(500).json({ error: "Lỗi khi lấy danh mục" });
  }
}; 




// export const deleteCategoryDog = async (req, res) => {
//   const itemId = req.params.id;
//   console.log("id: " + itemId);
//   try {
//     const result = await CategoryDog.findById(itemId);
//     console.log(result);
//     if (!result) {
//       console.log("Không tìm thấy bản ghi để xóa.");
//       return res
//         .status(404)
//         .json({ message: "Không tìm thấy bản ghi để xóa." });
//     }
//     const fileId = result.fileId;
//     await drive.files.delete({ fileId });
//     await CategoryDog.findByIdAndRemove(itemId);

//     console.log("Xóa thành công");
//     return res.status(200).json({ message: "Đã xóa thành công." });
//   } catch {
//     console.error("Lỗi khi xóa dữ liệu:", error);
//     res.status(500).json({ message: "Lỗi khi xóa dữ liệu." });
//   }
// };
