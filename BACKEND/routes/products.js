const router = require("express").Router();
const { response } = require("express");
let Product = require("../models/product");


//add product
http://localhost:8070/product/add

router.route("/add").post((req,res)=>{
    const name = req.body.name;
    const artist = req.body.artist;

    const newProduct = new Product({
        name,
        artist
    })

    newProduct.save().then(()=>{
        res.json("Product added")
    }).catch((err)=>{
        console.log(err);
    })

})


//get product
http://localhost:8070/product

router.route("/").get((req,res)=>{

    Product.find().then((product)=>{
        res.json(product)
    }).catch((err)=>{
        console.log(err)
    })
})


//update product
http://localhost:8070/product/update

router.route("/update/:id").put(async(req,res)=>{
    let productID = req.params.id;
    const {name, artist} = req.body;

    const updateProduct = {
        name,
        artist
    }

    const update = await Product.findByIdAndUpdate(productID, updateProduct)
    .then(()=>{
        res.status(200).send({status: "Product updated", product: update})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error in updating data", error:err.message});
    })
})

router.route("/delete/:id").delete(async (req,res) =>{
    let productID = req.params.id;

    await Product.findByIdAndDelete(productID)
    .then(() => {
        res.status(200).send({status: "Product deleted"});
    }).catch((err)=> {
        console.log(err.message);
        res.status(500).send({status: "Error with delete product", error: err.message});
    })
})

router.route("/get/:id").get(async (req,res) =>{
    let productID = req.params.id;
    const merchandise = await Product.findById(productID)
    .then(() => {
        res.status(200).send({status: "Product fetched", merchandise: merchandise })
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get product", error: err.message});
    })
})


module.exports = router;