import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import "../styles/utils.css";
import { FaStar } from "react-icons/fa6";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("name");

    const baseUrl = "http://localhost:8070";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/products`);
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
                
                // Extract unique categories
                const uniqueCategories = ["All", ...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        // Apply filtering and sorting
        let result = [...products];
        
        // Filter by category
        if (selectedCategory !== "All") {
            result = result.filter(product => product.category === selectedCategory);
        }
        
        // Sort products
        result.sort((a, b) => {
            if (sortBy === "id") return a._id.localeCompare(b._id);
            if (sortBy === "name") return a.name.localeCompare(b.name);
            if (sortBy === "price") return a.Mprice - b.Mprice;
            return 0;
        });

        setFilteredProducts(result);
    }, [products, selectedCategory, sortBy]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    return (
        <div className="container">
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">LOGO</div>
                <input className="search" type="text" placeholder="Search" />
                <div className="nav-links">
                    <a href="/cart">
                        <i className="fas fa-shopping-cart"></i>
                    </a>
                    <a href="/profile">
                        <i className="fas fa-user"></i>
                    </a>
                    <button className="logout-btn">Log out</button>
                </div>
            </nav>

            {/* Breadcrumb */}
            <div className="breadcrumb">
                <a href="/">Home</a> /{" "}
                <a href="/music-streaming">Music Streaming</a> /{" "}
                <a href="/artists">Artists</a> /{" "}
                <a href="/contact-us">Contact Us</a>
            </div>

            {/* Sorting & Category */}
            <div className="filter-section">
                <select className="sort-by w-40  relative border rounded-full " onChange={handleSortChange} value={sortBy}>
                    <option value="name">Sort by Name</option>
                    <option value="_id">Sort by Newest</option>
                    <option value="price">Sort by Price</option>
                </select>
                <select className="categories sort-by w-40  relative border rounded-full" onChange={handleCategoryChange} value={selectedCategory}>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            {/* Product Grid */}
            <div className="product-grid">
                {filteredProducts.map((product, index) => (
                    <div className="product-card" key={index}>
                        <div className="product-image">
                            <img
                                style={{ height: "300px" }}
                                className="w-48 h-48 rounded-lg object-cover"
                                src={product.imageUrl}
                                alt={product.name}
                            />
                        </div>
                        <div className="m-2">
                            <div className="flex justify-between">
                                <h3 className="text-lg font-bold">
                                    {product.name}
                                </h3>
                                <p className="font-bold text-lg">
                                    ${product.Mprice}
                                </p>
                            </div>
                            <p className="font-medium text-gray-600 line-clamp-2">
                                {product.Mdescription}
                            </p>
                            <div className=" flex items-center">
                                <div className="flex">
                                    <FaStar size={12} color="#8bcc0c" />
                                    <FaStar size={12} color="#8bcc0c" />
                                    <FaStar size={12} color="#8bcc0c" />
                                    <FaStar size={12} color="#8bcc0c" />
                                    <FaStar size={12} color="#8bcc0c" />
                                </div>
                                <span className="ml-3 text-sm text-gray-800">({Math.round(Math.random()*100)})</span>
                            </div>
                            <button className="button-primary px-4 rounded-full mt-4 py-2">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer>
                <div className="contact-info">
                    <p>
                        <i className="fas fa-phone"></i> Phone: +94590008578
                    </p>
                    <p>
                        <i className="fas fa-envelope"></i> Gmail:
                        musicNexus@gmail.com
                    </p>
                </div>
                <div className="social-icons">
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-linkedin"></i>
                    <i className="fab fa-youtube"></i>
                </div>
            </footer>
        </div>
    );
};

export default ProductPage;