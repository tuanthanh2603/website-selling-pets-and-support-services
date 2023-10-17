import { CategoryCat } from "../../models/admin/categoryCatModel.js";
import { CategoryDog } from "../../models/admin/categoryDogModel.js";
import { Pet } from "../../models/admin/petModel.js";
import { ImagesPet } from "../../models/admin/imagesPetModel.js";
import multer from "multer";


export const getCategoryDog = async (req, res) => {
    try{
        const categoriesDog = await CategoryDog.find();
        res.status(200).json(categoriesDog);

    } catch {
        console.error("Lỗi khi lấy danh mục:", error);
        res.status(500).json({ error: "Lỗi khi lấy danh mục" });
    }
}; 
export const getCategoryCat = async (req, res) => {
    try{
        const categoriesCat = await CategoryCat.find();
        res.status(200).json(categoriesCat);

    } catch {
        console.error("Lỗi khi lấy danh mục:", error);
        res.status(500).json({ error: "Lỗi khi lấy danh mục" });
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

        })
        const petId = newPet._id;
        console.log(petId);
        for (const file of req.files) {
            console.log(file.filename);
            if(petId){
                await ImagesPet.create({
                    name: file.filename,
                    petid: petId,
                })
            }
        }
        console.log("Thêm dữ liệu thành công")
        

        
        res.status(200).json({ message: 'Dữ liệu đã được xử lý thành công.' });
    } catch (error) {
        console.error('Lỗi khi xử lý dữ liệu:', error);
        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý dữ liệu.' });
    }
};