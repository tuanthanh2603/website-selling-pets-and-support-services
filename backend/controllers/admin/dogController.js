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



export const createCategoryDogController = async (req, res) => {
  const requestData = req.body;
  const { name, status, images } = requestData; 

  try {
    const newCategoryDog = await CategoryDog.create({
      name, 
      status, 
      images, 
    });

    console.log(newCategoryDog);
    res.status(201).json(newCategoryDog); // Trả về kết quả mới tạo
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


