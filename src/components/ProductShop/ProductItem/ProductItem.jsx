import React from 'react';
import { Link } from 'react-router-dom';
import './ProductItem.css';

export default function ProductItem({ product }) {
  return (
    <div className="product-item">
      <Link to={`/product/${product.productId}`} className="product-link">
        <img src={product.productImage} alt={product.productName} className="product-image" />
        <div className="product-details">
          <h2>{product.productName}</h2>
          <p><strong>Points:</strong> {product.price}pt</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Description:</strong> {product.description}</p>
        </div>
      </Link>
      <button className="add-to-cart-button">Add to Cart</button>
    </div>
  );
}