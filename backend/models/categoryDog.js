const mongoose = require('mongoose');

const categoryDogSchema = new mongoose.Schema({
    name: String,
    images: String,
    status: Boolean,
});

const CategoryDog = mongoose.model('CategoryDog', categoryDogSchema);
module.exports = CategoryDog