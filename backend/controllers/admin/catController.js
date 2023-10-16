import { CategoryCat } from "../../models/admin/categoryCatModel.js";

import fs from "fs";
import path from "path";



export const createCategoryCatController = async (req, res) => {
  console.log(req.files[0].filename);
  
  const { name, status } = req.body;
  console.log(req.body)
  const existingCategoryCat = await CategoryCat.findOne({ name });
  if (existingCategoryCat) {
    console.log("Tên danh mục đã tồn tại");
    return res.status(400).json({ message: "Tên danh mục đã tồn tại" });
  }
  try {
    const baseImagePath = 'http://localhost:3000/public/uploads/';
    const images2 = baseImagePath + req.files[0].filename;
    console.log(images2);
    const images = req.files[0].filename
    const newCategoryCat = await CategoryCat.create({
      name: name,
      status: status,
      images: images,
      
    });
    console.log(newCategoryCat);
    res.status(201).json(newCategoryCat);
  } catch {
    console.error("Error inserting data:", error);
    res.status(500).json({ msg: "Error inserting to DB" });
  }
};

export const getCategoryCat = async (req, res) => {
  try {
    const categoryCats = await CategoryCat.find();
    res.status(200).json(categoryCats);

  } catch {
    console.error("Error retrieving data:", error);
    res.status(500).json({ msg: "Error retrieving data from DB" });
  }
};

export const deleteCategoryCat = async (req, res) => {
  const itemId = req.params.id;
  console.log("id: " + itemId);
  
  try{
    const categoryCat = await CategoryCat.findById(itemId);
    console.log(categoryCat.images)
    if(categoryCat){
      const imagePathToDelete = path.join(process.cwd(), "public/uploads", categoryCat.images)
      fs.unlink(imagePathToDelete, (err) => {
        if(err) {
          console.log("Lỗi khi xóa tệp ảnh: ", err);
          res.status(500).json({ message: "Lỗi khi xóa tệp ảnh." });
        } else {
          console.log("Tệp ảnh đã xóa khỏi thư mục public.");
        }
      })
    } else {
      console.log("Chưa truy xuất được ảnh");
    }

    await CategoryCat.findByIdAndRemove(itemId);
    console.log("Xóa danh mục thành công");
    res.status(200).json({ message: "Xóa thành công" });
    
  } catch {
    console.error("Lỗi khi xóa dữ liệu:", error);
    res.status(500).json({ message: "Lỗi khi xóa dữ liệu." });
  }
};
