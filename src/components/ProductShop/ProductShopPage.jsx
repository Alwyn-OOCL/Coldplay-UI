import React, { useState } from "react";
import { FaArrowDown, FaArrowUp, FaShoppingCart } from "react-icons/fa";
import products from "../../data/products";
import ExchangePopUp from "./ExchangePopUp/ExchangePopUp";
import Pagination from "./Pagination/Pagination";
import ProductList from "./ProductList/ProductList";
import "./ProductShopPage.css";

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
      prevSortOrder === "desc" ? "asc" : "desc"
    );
  };

  const handleAddToCart = (product) => {
    setSelectedProducts((prevSelectedProducts) => [
      ...prevSelectedProducts,
      product,
    ]);
  };

  const handleRemoveFromCart = (product) => {
    setSelectedProducts((prevProducts) => {
      const index = prevProducts.findIndex((item) => item.productId === product.productId);
      if (index !== -1) {
        const newProducts = [...prevProducts];
        newProducts.splice(index, 1);
        return newProducts;
      }
      return prevProducts;
    });
  };

  const handleSearchChange = (e) => {
    setCurrentPage(1);
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCurrentPage(1);
    setSelectedCategory(e.target.value);
  };

  const handleCartIconClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    window.location.reload();
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
    if (sortOrder === "desc") {
      return b.points - a.points;
    } else {
      return a.points - b.points;
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
        <div className="concert-poster">
          <img
            src={require("../../assets/images/homeposter.png")}
            alt="shop poster"
            className="poster-image"
          />
        </div>
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
            <option value="Apparel">Apparel</option>
            <option value="Accessories">Accessories</option>
            <option value="Decor">Decor</option>
            <option value="Stationery">Stationery</option>
          </select>
        </div>

        <button className="sort-button" onClick={toggleSortOrder}>
          <span>Sort by Points </span>
          {sortOrder === "desc" ? <FaArrowDown /> : <FaArrowUp />}
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
      {isPopupOpen && (
        <ExchangePopUp
          onClose={handleClosePopup}
          selectedProducts={selectedProducts}
          updateSelectedProducts={setSelectedProducts}
        />
      )}
    </div>
  );
}
