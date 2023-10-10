const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors());
const port = 3000;

app.post('/addCategory', (req, res) => {
    const requestData = req.body;
    console.log('Dữ liệu nhận được từ frontend:', requestData);
});

app.listen(port, () => {
    console.log("Server running on port: ", port);
})

