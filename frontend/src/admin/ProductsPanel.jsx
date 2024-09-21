import "../styles/utils.css";
import "../styles/common.css";

import React, { useState, useEffect } from "react";
import { TbFileExport } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoSearchOutline } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
// Custom Button Component
const Button = ({ onClick, children, className = "" }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 button  rounded ${className}`}
    >
        {children}
    </button>
);

// Custom Input Component (Updated)
const Input = ({ type = "text", value, onChange, placeholder, name }) => (
    <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        name={name}
        className="border rounded px-2 py-1 w-full"
    />
);

// Custom Modal Component
const Modal = ({ isOpen, onClose, title, children, onSave }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0     flex justify-center items-center">
            <div className="bg-white shadow-lg border p-20 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                {children}
                <div className="flex justify-end mt-4">
                    <Button
                        onClick={onClose}
                        className="mr-2 bg-gray-500 hover:bg-gray-600"
                    >
                        Cancel
                    </Button>
                    <Button onClick={onSave}>Save</Button>
                </div>
            </div>
        </div>
    );
};

const ProductsPanel = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        stock: "",
    });

    useEffect(() => {
        // Fetch products from your API
        // For now, we'll use dummy data
        setProducts([
            { id: 1, name: "Electric Guitar", price: 799.99, stock: 10 },
            { id: 2, name: "Acoustic Drum Set", price: 1299.99, stock: 5 },
            { id: 3, name: "Digital Piano", price: 599.99, stock: 8 },
        ]);
    }, []);

    const handleAdd = () => {
        setCurrentProduct(null);
        setFormData({ name: "", price: "", stock: "" });
        setIsModalOpen(true);
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setFormData({
            name: product.name,
            price: product.price.toString(),
            stock: product.stock.toString(),
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setProducts(products.filter((product) => product.id !== id));
        // In a real app, you'd also make an API call to delete the product
    };

    // Updated handleInputChange function
    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        const newProduct = {
            id: currentProduct
                ? currentProduct.id
                : Math.max(...products.map((p) => p.id), 0) + 1,
            name: formData.name,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
        };

        if (currentProduct) {
            setProducts(
                products.map((p) =>
                    p.id === currentProduct.id ? newProduct : p
                )
            );
        } else {
            setProducts([...products, newProduct]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className=" mx-auto p-4 bg-gray-100">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between">
                    <div></div>
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <div className="absolute p-3 flex pointer-events-none items-center left-4">
                                <IoSearchOutline class />
                                <span className="ml-2">Search..</span>
                            </div>
                            
                            <input className="px-10 rounded-lg py-1" type="text" />{" "}
                        </div>
                        <CgProfile className="ml-4" color="gray" size={32} />
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <div></div>
                    <div className="flex items-center ">
                        <div className="ml-3">
                            <Button className="button-secondary flex items-center">
                                <IoFilterOutline  className="mr-4"/>
                                Filter
                            </Button>
                        </div>
                        <div className="ml-3">
                            <Button className="button-secondary flex items-center">
                                <TbFileExport  className="mr-4"/>
                                Export
                            </Button>
                        </div>
                        <div className="ml-3">
                            <Button onClick={handleAdd} className="button-primary flex items-center">
                                <IoIosAddCircleOutline  className="mr-4"/>
                                Add Product
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-5 mt-4 rounded-lg border">
                    <div>
                        <h1 className="text-2xl font-bold mb-1 ">
                            Music Products Admin Panel
                        </h1>
                        <p className="text-gray-500">Manage your products and update their stocks</p>
                    </div>
                    <div className="w-full mt-10">
                        <div>
                            <div className="font-bold flex justify-between">
                                <span className="w-1/4  p-2">Name</span>
                                <span className="w-1/4  p-2">Price</span>
                                <span className="w-1/4  p-2">Stock</span>
                                <span className="w-1/4  p-2 text-right">Actions</span>
                            </div>
                        </div>
                        <div className="w-full  mt-4">
                            {products.map((product) => (
                                <div className="flex border-t justify-between" key={product.id}>
                                    <span className=" w-1/4 block p-2">{product.name}</span>
                                    <span className=" w-1/4 block p-2">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    <span className=" w-1/4 block p-2">{product.stock}</span>
                                    <span className=" flex items-center justify-end w-1/4 block p-2">
                                        <Button
                                            onClick={() => handleEdit(product)}
                                            className="button-secondary"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(product.id)}
                                            className="button-primary ml-3"
                                        >
                                            Delete
                                        </Button>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                title={currentProduct ? "Edit Product" : "Add New Product"}
            >
                <div className="mb-4">
                    <label className="block mb-1">Name</label>
                    <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Product Name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Price</label>
                    <Input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Product Price"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Stock</label>
                    <Input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        placeholder="Product Stock"
                    />
                </div>
            </Modal>
        </div>
    );
};

export default ProductsPanel;
