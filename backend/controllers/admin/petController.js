import { CategoryPet } from "../../models/admin/categoryPetModel.js";
import { Pet } from "../../models/admin/petModel.js";
import { ImagesPet } from "../../models/admin/imagesPetModel.js";
import multer from "multer";
import fs from "fs";
import path from "path";



// export const addCategoryPet = async (req, res) => {
//   console.log(req.body.name);
//   console.log(req.body.status);
//   console.log(req.body.classify);
//   // console.log(req.files[0].filename);
//   // const { name, classify, status } = req.body;
//   // const existingCategory = await CategoryPet.findOne({ name });
//   // if(existingCategory){
//   //   return res.status(400).json({ message: "Tên danh mục đã tồn tại." });
//   // }
//   // try {
//   //   const images = req.files[0].name
//   //   const newCategoryPet = await CategoryPet.create({
//   //     name: name,
//   //     status: status,
//   //     images: images,
//   //     classify: classify,
      
//   //   })
//   //   console.log("newCategoryPet: ", newCategoryPet);
//   //   res.status(201).json(newCategoryPet);
//   // } catch {
//   //   console.error("Lỗi trong quá trình xử lý request:", error);
//   //   res.status(500).json({ msg: "Lỗi nội bộ của máy chủ" });
//   // }
// };
export const addCategoryPet = async (req, res) => {
  try {
     console.log(req.body.name);
     console.log(req.body.status);
     console.log(req.body.classify)
     
     // Rest of your code

     res.status(200).json({ success: true });
  } catch (error) {
     console.error("Error processing request:", error);
     res.status(500).json({ msg: "Internal Server Error" });
  }
};


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
