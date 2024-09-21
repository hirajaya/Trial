const Product = require('../models/product.model'); // Adjust path as necessary



const getProducts = async() => {
    return await Product.find()
}


// Create a new product
const createProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

// Update an existing product
const updateProduct = async (id, productData) => {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};



module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts
};
