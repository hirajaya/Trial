const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({

    Mname: {
        type: String,
        required: true
    },
    artistName: {
        type: String,
        required: true
    },
    Mprice: {
        type: Number,
        required: true
    },
    Mdescription: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
