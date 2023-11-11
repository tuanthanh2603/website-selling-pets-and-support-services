import { CategoryPet } from "../../models/admin/categoryPetModel.js";
import { Pet } from "../../models/admin/petModel.js";
import { ImagesPet } from "../../models/admin/imagesPetModel.js";
import multer from "multer";
import fs from "fs";
import path from "path";



export const addCategoryPet = async (req, res) => {

}

export const createPetController = async (req, res) => {
  try {
    const petData = req.body;
    // console.log(petData)
    for (const file of req.files) {
      console.log(file.filename);
    }

    const newPet = await Pet.create({
      name: petData.name,
      status: petData.status,
      classify: petData.classify,
      category: petData.category,
      sex: petData.sex,
    });
    const petId = newPet._id;
    console.log(petId);
    for (const file of req.files) {
      console.log(file.filename);
      if (petId) {
        await ImagesPet.create({
          name: file.filename,
          petid: petId,
        });
      }
    }
    console.log("Thêm dữ liệu thành công");
    res.status(200).json({ message: "Dữ liệu đã được xử lý thành công." });
  } catch (error) {
    console.error("Lỗi khi xử lý dữ liệu:", error);
    res.status(500).json({ error: "Có lỗi xảy ra khi xử lý dữ liệu." });
  }
};

export const deletePet = async (req, res) => {
  const itemId = req.params.id;
  console.log("id: " + itemId);
  try {
    const petToImages = await ImagesPet.find({ petid: itemId });
    console.log(petToImages);
    if (petToImages.length > 0) {
      const imagePathsToDelete = petToImages.map((image) =>
        path.join(process.cwd(), "public/uploads", image.name)
      );
      imagePathsToDelete.forEach((imagePath) => {
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.log("Lỗi khi xóa tệp ảnh: ", err);
            res.status(500).json({ message: "Lỗi khi xóa tệp ảnh." });
          } else {
            console.log("Tệp ảnh đã xóa khỏi thư mục public.");
          }
        });
      });
      await ImagesPet.deleteMany({ petid: itemId });
    } else {
      console.log("Không tìm thấy hình ảnh liên quan.");
    }
    await Pet.findByIdAndRemove(itemId);
    console.log("Xóa thành công");
    res.status(200).json({ message: "Xóa thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa dữ liệu:", error);
    res.status(500).json({ error: "Có lỗi xảy ra khi xóa dữ liệu." });
  }
};
