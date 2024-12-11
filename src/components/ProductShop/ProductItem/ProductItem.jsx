import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductItem.css';

export default function ProductItem({ product, handleAddToCart }) {
  const [quantity, setQuantity] = useState(0);

  const handleAddClick = () => {
    setQuantity(1);
    handleAddToCart(product);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0));
  };

  return (
    <div className="product-item">
      <Link to={`/product/${product.productId}`} className="product-link">
        <img src={product.productImage} alt={product.productName} className="product-image" />
        <div className="product-details">
          <h2>{product.productName}</h2>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Description:</strong> {product.description}</p>
        </div>
      </Link>
      {quantity === 0 ? (
        <button className="add-to-cart-button" onClick={handleAddClick}>
          Add to Cart
        </button>
      ) : (
        <div className="quantity-controls">
          <button className="decrease-button" onClick={handleDecreaseQuantity}>-</button>
          <span className="quantity">{quantity}</span>
          <button className="increase-button" onClick={handleIncreaseQuantity}>+</button>
        </div>
      )}
    </div>
  );
}