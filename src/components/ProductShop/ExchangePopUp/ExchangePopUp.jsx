import React, { useState } from "react";
import "./ExchangePopUp.css";

export default function ExchangePopUp({ selectedProducts, onClose }) {
  const [products, setProducts] = useState(selectedProducts);

  // Function to group products by their ID and calculate the quantity
  const groupProducts = (products) => {
    const grouped = products.reduce((acc, product) => {
      if (!acc[product.productId]) {
        acc[product.productId] = { ...product, quantity: 0 };
      }
      acc[product.productId].quantity += 1;
      return acc;
    }, {});
    return Object.values(grouped);
  };

  const groupedProducts = groupProducts(products);
  const totalPoints = groupedProducts.reduce((sum, product) => sum + product.points * product.quantity, 0);

  const handleIncrease = (productId) => {
    const updatedProducts = [...products, products.find(product => product.productId === productId)];
    setProducts(updatedProducts);
  };

  const handleDecrease = (productId) => {
    const productIndex = products.findIndex(product => product.productId === productId);
    if (productIndex !== -1) {
      const updatedProducts = [...products];
      updatedProducts.splice(productIndex, 1);
      setProducts(updatedProducts);
    }
  };

  return (
    <>
      <div className="exchange-popup-overlay" onClick={onClose}></div>
      <div className="exchange-popup">
        <div className="exchange-popup-header">
          <h2>Selected Products</h2>
          <button className="exchange-popup-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="exchange-popup-content">
          {groupedProducts.length > 0 ? (
            <>
              {groupedProducts.map((product) => (
                <div key={product.productId} className="exchange-product-item">
                  <span className="exchange-product-name">
                    {product.productName} (x{product.quantity}) {product.points} pt each
                  </span>
                  <span className="exchange-product-total-points">
                    {product.points * product.quantity} points total
                  </span>
                  <div className="exchange-item-btn-toggle-group">
                  <button className="exchange-item-toggle-btn" onClick={() => handleDecrease(product.productId)}>-</button>
                  <button className="exchange-item-toggle-btn" onClick={() => handleIncrease(product.productId)}>+</button>
                  </div>
                </div>
              ))}
              <div className="exchange-product-total">
                <span>Total Points:</span>
                <span>{totalPoints} points</span>
              </div>
            </>
          ) : (
            <p>No products selected.</p>
          )}
        </div>
        <div className="exchange-popup-footer">
          <button className="exchange-popup-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}