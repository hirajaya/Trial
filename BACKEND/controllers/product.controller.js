const productService = require('../services/product.service');

const getProduct = async (req, res) => {

    
    
    try {
        const product = await productService.getProducts(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Handle creating a product
const createProduct = async (req, res) => {
    console.log("It hit");
    console.log(req.body);
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Handle updating a product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await productService.updateProduct(id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
         await productService.deleteProduct(id);
        
        res.json({ message: "Product Successfully Deleted!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    getProduct,
    deleteProduct
};
