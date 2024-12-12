import React from "react";
import ProductItem from "../ProductItem/ProductItem";
import "./ProductList.css";

export default function ProductList({
  products,
  handleAddToCart,
  handleRemoveFromCart,
}) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductItem
          key={product.productId}
          product={product}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      ))}
    </div>
  );
}
