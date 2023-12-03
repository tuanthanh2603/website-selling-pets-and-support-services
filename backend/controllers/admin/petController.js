import { CategoryPet } from "../../models/admin/categoryPetModel.js";
import { Pet } from "../../models/admin/petModel.js";
import { ImagesPet } from "../../models/admin/imagesPetModel.js";
import multer from "multer";
import fs from "fs";
import path from "path";


export const addCategoryPet = async (req, res) => {
  try {
    const { name, status, classify } = req.body;
    const existingCategory = await CategoryPet.findOne({ name });
    if (existingCategory) {
      console.log("Tên danh mục đã tồn tại.");
      return res.status(400).json({ message: "Tên danh mục đã tồn tại." });
    }
    const images = req.files[0].filename;
    const newCategoryPet = await CategoryPet.create({
      name,
      status,
      images,
      classify,
    });
    
    console.log("Danh mục đã được thêm thành công:", newCategoryPet);
  
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const getCategoryPet = async (req, res) => {
  try {
    const categories = await CategoryPet.find();
    res.status(200).json(categories);
  } catch {
    console.error("Lỗi khi truy vấn dữ liệu:", error);
    res.status(500).json({ msg: "Lỗi khi truy vấn dữ liệu từ cơ sở dữ liệu" });
  }
};

export const deleteCategoryPet = async (req, res) => {
  const categoryId = req.params.id;
  console.log("Delete id: "+ categoryId);
  try {
    
    const categoryPet = await Pet.findById(categoryId);
    if(categoryPet) {
      const imagePathToDelete = path.join(process.cwd(), "public/uploads", categoryPet.images);
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
    await CategoryPet.findByIdAndRemove(categoryId);
    console.log("Xóa danh mục thành công");
    res.status(200).json({ message: "Xóa thành công" });
  } catch(error) {
    console.error("Lỗi khi xóa dữ liệu:", error);
    res.status(500).json({ message: "Lỗi khi xóa dữ liệu." });
  }
};

export const updateCategoryPet = async (req, res) => {
  const updateCategoryPet = req.body;
  const { id, name, status, classify } = updateCategoryPet;
  console.log(updateCategoryPet)
  try {
    const categories = await CategoryPet.findById(id);
    if(!categories) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục.' });
    } else {
      categories.name = name;
      categories.status = status;
      categories.classify = classify;
      if(req.files && req.files[0]){
        const newImage = req.files[0].filename;
        console.log(newImage)
        categories.images = newImage;
      }
      await categories.save();
      return res.status(200).json({ message: 'Cập nhật danh mục thành công.' });
    }
  } catch(error) {
    console.error('Lỗi khi cập nhật danh mục:', error);
    return res.status(500).json({ error: 'Có lỗi xảy ra khi cập nhật danh mục.' });
  }
};

export const getCategoryDogToSelect = async (req, res) => {
  try {
    const categoriesDog = await CategoryPet.find({ classify: "Chó cảnh" })
    res.status(200).json(categoriesDog);
  } catch(error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
  }
};

export const getCategoryCatToSelect = async (req, res) => {
  try {
    const categoriesCat = await CategoryPet.find({ classify: "Mèo cảnh" })
    res.status(200).json(categoriesCat);
  } catch(error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
  }
};


export const addPet = async (req, res) => {
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
      price: petData.price,
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

export const getAllDog = async (req, res) => {
  try {
    console.log('list dogs');
    const dogs = await Pet.find({ classify: "Chó cảnh" })
      .populate('category') // Sử dụng populate để join CategoryDog
      .exec();

      console.log(dogs);

    // // Lấy tên danh mục từ bảng CategoryDog
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
        price: dog.price,
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

export const getAllCat = async (req, res) => {
  try {
    const cats = await Pet.find({ classify: "Mèo cảnh" })
      .populate('category') // Sử dụng populate để join CategoryCat
      .exec();


    const catsWithCategoryNames = await Promise.all(cats.map(async (cat) => {
      const images = await ImagesPet.find({ petid: cat.id }).exec();
      return {
        id: cat.id,
        name: cat.name,
        status: cat.status,
        classify: cat.classify,
        category: cat.category.name, 
        sex: cat.sex,
        created_at: cat.created_at,
        price: cat.price,
        images, // Include images associated with the pet
      };
    }));

    // console.log(catsWithCategoryNames);

    res.json(catsWithCategoryNames);
  } catch (error) {
    console.error('Lỗi lấy dữ liệu:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi tải dữ liệu' });
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
