import React, { useState } from "react";
import Pagination from "./Pagination/Pagination";
import ProductList from "./ProductList/ProductList";
import products from "../../data/products";
import ExchangePopUp from "./ExchangePopUp/ExchangePopUp";
import "./ProductShopPage.css";
import { FaShoppingCart } from "react-icons/fa";

export default function ProductShopPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("points");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const itemsPerPage = 6;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) =>
      prevSortOrder === "points" ? "name" : "points"
    );
  };

  const handleAddToCart = (product) => {
    setSelectedProducts((prevSelectedProducts) => [
      ...prevSelectedProducts,
      product,
    ]);
  };

  const handleRemoveFromCart = (product) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((item) => item.productId !== product.productId)
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleCartIconClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "points") {
      return b.points - a.points;
    } else {
      return a.productName.localeCompare(b.productName);
    }
  });

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="product-list-page">
      <main className="container">
        <div className="header">
          <h1>Coldplay Exclusive Products</h1>
          <div className="cart-icon" onClick={handleCartIconClick}>
            <FaShoppingCart />
            <span className="cart-count">{selectedProducts.length}</span>
          </div>
        </div>

        <div className="filters">
          <input
            type="text"
            className="search-bar"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <select
            className="category-filter"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="all">All Categories</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <button className="sort-button" onClick={toggleSortOrder}>
          Sort by {sortOrder === "points" ? "Name" : "Points"}
        </button>
        <ProductList
          products={currentProducts}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
        />
        <Pagination
          itemsPerpage={itemsPerPage}
          totalItems={filteredProducts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </main>
      {isPopupOpen && <ExchangePopUp onClose={handleClosePopup} selectedProducts={selectedProducts} />}
    </div>
  );
}