import { CategoryAccessory } from "../../models/accessoryModel.js";

export const addCategoryAccessory = async (req, res) => { 
    const categoryAccessoryData = req.body;
    console.log(categoryAccessoryData)
    try{
        const existingCategory = await CategoryAccessory.findOne({ name: categoryAccessoryData.name });
        if(existingCategory){
            console.log("Tên danh mục đã tồn tại")
            res.status(401).json({ error: 'Tên danh mục đã tồn tại.' });
        } else {
            const newCategoryAccessory = await CategoryAccessory.create(categoryAccessoryData)
            res.status(201).json(newCategoryAccessory);
        }
        
    } catch (error){
        console.log(error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm danh mục phụ kiện.' });
    }
};
