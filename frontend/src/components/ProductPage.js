import React from "react";
import "./ProductPage.css"; // Add styling in an external file

const ProductPage = () => {
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
                <select className="sort-by">
                    <option>Sort By</option>
                    {/* Add other sorting options */}
                </select>
                <select className="categories">
                    <option>Categories</option>
                    {/* Add category options */}
                </select>
            </div>

            {/* Product Grid */}
            <div className="product-grid">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div className="product-card" key={index}>
                        <div className="product-image">
                            <img
                                src="placeholder.png"
                                alt={`Merchandise ${index + 1}`}
                            />
                        </div>
                        <div className="product-details">
                            <h3>Merchandise {index + 1}</h3>
                            <p>Details</p>
                            <p>Price</p>
                            <button className="add-to-cart">Add to Cart</button>
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
