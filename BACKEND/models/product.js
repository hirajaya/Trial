const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({

    name : {
        type : String,
        required: true
    },
    artist:{
        type : String,
        reqired: true
    }
})

const Product = mongoose.model("Product",productSchema);

module.exports = Product;

