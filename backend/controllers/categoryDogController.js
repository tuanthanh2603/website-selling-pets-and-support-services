const express = require('express');
const router = express.Router();

app.post('/addCategoryDog', async (req, res) => {
    try {
      const requestData = req.body;
      
      console.log(requestData);
  
      // Tạo một đối tượng để chèn vào cơ sở dữ liệu
      const dataToInsert2 = {
        name: req.body.name,
        status: req.body.status,
        images: req.body.images
      };
  
      // Lựa chọn bảng (collection) 
      const collection = client.db("project-ooad").collection("CategoryDog");
  
      // Chèn dữ liệu bằng insertOne()
      const result = await collection.insertOne(dataToInsert2);
  
      console.log(`Inserted ${result.insertedCount} document into the database`);
      res.status(200).send({ "msg": "Inserted to DB" });
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).send({ "msg": "Error inserting to DB" })
    }
});

module.exports = router;