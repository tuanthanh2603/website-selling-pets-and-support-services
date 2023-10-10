const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// MongoDB Atlas
const dbUrl = "mongodb+srv://tuanthanh:CVbn12345@ooad.14cdlg8.mongodb.net/?retryWrites=true&w=majority"
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.connect(dbUrl, connectionParams)
.then(() => {
    console.info("Connected to MongoDB Atlas");
})
.catch((e) => {
    console.log("Error connecting to MongoDB Atlas:", e);
});

app.post('/addCategoryDog', (req, res) => {
    const requestData = req.body;
    console.log('Dữ liệu nhận được từ frontend:', requestData);
});
const port = 3000;
app.listen(port, () => {
    console.log("Server running on port: ", port);
})

