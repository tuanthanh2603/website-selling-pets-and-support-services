
import { CategoryPet } from "../../models/admin/categoryPetModel.js";

import fs from "fs";
import path from "path";
import { Pet } from "../../models/admin/petModel.js";
import { ImagesPet } from "../../models/admin/imagesPetModel.js";



export const createCategoryCatController = async (req, res) => {
  console.log(req.files[0].filename);
  
  const { name, status, classify } = req.body;
  console.log(req.body)
  const existingCategoryCat = await CategoryPet.findOne({ name });
  if (existingCategoryCat) {
    console.log("Tên danh mục đã tồn tại");
    return res.status(400).json({ message: "Tên danh mục đã tồn tại" });
  }
  try {
    const baseImagePath = 'http://localhost:3000/public/uploads/';
    const images2 = baseImagePath + req.files[0].filename;
    console.log(images2);
    const images = req.files[0].filename
    const newCategoryCat = await CategoryPet.create({
      name: name,
      status: status,
      images: images,
      classify: classify,
      
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
    const categoryCats = await CategoryPet.find({ classify: "Mèo" });
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
    const categoryCat = await CategoryPet.findById(itemId);
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

    await CategoryPet.findByIdAndRemove(itemId);
    console.log("Xóa danh mục thành công");
    res.status(200).json({ message: "Xóa thành công" });
    
  } catch {
    console.error("Lỗi khi xóa dữ liệu:", error);
    res.status(500).json({ message: "Lỗi khi xóa dữ liệu." });
  }
};

export const getCat = async (req, res) => {
  try {
    const cats = await Pet.find({ classify: "Mèo cảnh" })
      .populate('category') // Sử dụng populate để join CategoryCat
      .exec();

    // Lấy tên danh mục từ bảng CategoryDog
    const catsWithCategoryNames = await Promise.all(cats.map(async (cat) => {
      const images = await ImagesPet.find({ petid: cat.id }).exec();
      return {
        id: cat.id,
        name: cat.name,
        status: cat.status,
        classify: cat.classify,
        category: cat.category.name, // Lấy tên danh mục từ bảng CategoryDog
        sex: cat.sex,
        created_at: cat.created_at,
        images, // Include images associated with the pet
      };
    }));

    console.log(catsWithCategoryNames);

    res.json(catsWithCategoryNames);
  } catch (error) {
    console.error('Lỗi lấy dữ liệu:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi tải dữ liệu' });
  }
};
export const getCategoryCatToSelect = async (req, res) => {
  try{
      const categoriesCat = await CategoryPet.find({ classify: "Mèo" });
      res.status(200).json(categoriesCat);

  } catch {
      console.error("Lỗi khi lấy danh mục:", error);
      res.status(500).json({ error: "Lỗi khi lấy danh mục" });
  }
}; 
