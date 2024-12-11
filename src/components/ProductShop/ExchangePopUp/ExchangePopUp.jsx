import React from "react";
import "./ExchangePopUp.css";

export default function ExchangePopUp({ selectedProducts, onClose }) {
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

  const groupedProducts = groupProducts(selectedProducts);
  const totalPoints = groupedProducts.reduce((sum, product) => sum + product.points * product.quantity, 0);

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
                    {product.productName} (x{product.quantity})
                  </span>
                  <span className="exchange-product-price">
                    {product.points}pt each
                  </span>
                  <span className="exchange-product-total-points">
                    {product.points * product.quantity} pt total
                  </span>
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