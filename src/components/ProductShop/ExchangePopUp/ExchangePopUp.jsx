import React from "react";
import "./ExchangePopUp.css";

export default function ExchangePopUp({ selectedProducts, onClose }) {
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
          {selectedProducts.length > 0 ? (
            selectedProducts.map((product) => (
              <div key={product.productId+Math.random()} className="exchange-product-item">
                <span className="exchange-product-name">{product.productName}</span>
                <span className="exchange-product-points">{product.points} points</span>
              </div>
            ))
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