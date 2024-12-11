import React, { useState, useEffect } from "react";
import Pagination from "./Pagination/Pagination";
import ProductList from "./ProductList/ProductList";
import products from "../../data/products";
import "./ProductShopPage.css";

export default function ProductShopPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("points");
  const itemsPerPage = 6;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "points" ? "name" : "points"));
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "points") {
      return b.points - a.points;
    } else {
      return a.productName.localeCompare(b.productName);
    }
  });

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="concert-list-page">
      <main className="container">
        <h1>Cold Play Exclusive Products</h1>

        <button className="sort-button" onClick={toggleSortOrder}>
          Sort by {sortOrder === "points" ? "Name" : "Points"}
        </button>
        <ProductList products={currentProducts} />
        <Pagination
          itemsPerpage={itemsPerPage}
          totalItems={products.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </main>
    </div>
  );
}