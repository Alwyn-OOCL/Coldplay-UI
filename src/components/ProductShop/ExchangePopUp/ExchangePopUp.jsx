import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import "./ExchangePopUp.css";
import { exchange } from "../../../api/pages/exchangeApi";
import baseApi from "../../../api/baseApi";

export default function ExchangePopUp({
  selectedProducts,
  onClose,
  updateSelectedProducts,
}) {
  const [products, setProducts] = useState(selectedProducts);
  const [success, setSuccess] = useState(false);

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const { userId } = useAuth();

  useEffect(() => {
    if (userId) {
      baseApi
        .get(`/user/${userId}`)
        .then((response) => {
          setUser(response.data.data);
        })
        .finally(() => {});
    }
  }, [userId]);

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
  const totalPoints = groupedProducts.reduce(
    (sum, product) => sum + product.points * product.quantity,
    0
  );

  const handleIncrease = (productId) => {
    const updatedProducts = [
      ...products,
      products.find((product) => product.productId === productId),
    ];
    setProducts(updatedProducts);
    updateSelectedProducts(updatedProducts);
  };

  const handleDecrease = (productId) => {
    const productIndex = products.findIndex(
      (product) => product.productId === productId
    );
    if (productIndex !== -1) {
      const updatedProducts = [...products];
      updatedProducts.splice(productIndex, 1);
      setProducts(updatedProducts);
      updateSelectedProducts(updatedProducts);
    }
  };

  const handleExchange = async () => {
    const storedUserId = localStorage.getItem("userId");

    if (storedUserId) {
      exchange(storedUserId, totalPoints).then((response) => {
        setUser({ ...user, point: response.data });
        setProducts([]);
        updateSelectedProducts([]);
        setSuccess(true);
      });
    } else {
      navigate(`/login`);
    }
  };

  return (
    <>
      <div className="exchange-popup-overlay"></div>
      <div className="exchange-popup">
        <div className="exchange-popup-header">
          <h2>Selected Products</h2>
          <button className="exchange-popup-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="exchange-popup-content">
          {success ? (
            <div className="exchange-success">
              <FaCheck size={50} color="green" />
              <p>Exchange Successful!</p>
            </div>
          ) : groupedProducts.length > 0 ? (
            <>
              {groupedProducts.map((product) => (
                <div key={product.productId} className="exchange-product-item">
                  <span className="exchange-product-name">
                    {product.productName} (x{product.quantity}) {product.points}{" "}
                    pt each
                  </span>
                  <span className="exchange-product-total-points">
                    {product.points * product.quantity} points total
                  </span>
                  <div className="exchange-item-btn-toggle-group">
                    <button
                      className="exchange-item-toggle-btn"
                      onClick={() => handleDecrease(product.productId)}
                    >
                      -
                    </button>
                    <button
                      className="exchange-item-toggle-btn"
                      onClick={() => handleIncrease(product.productId)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <div className="exchange-product-total">
                <span>Total Cold Point:</span>
                <span>{totalPoints} points</span>
              </div>
              <div className="exchange-product-total">
                <span>Your Cold Point:</span>
                <span>{user?.point}</span>
              </div>
              <div className="exchange-product-total">
                <span>Charity</span>
                <span>${parseInt(totalPoints) * 1}</span>
              </div>
              <span className="exchange-charity-msg">
                ** 1pt = $1 to charity
              </span>
            </>
          ) : (
            <p>No products selected.</p>
          )}
        </div>
        <div className="exchange-popup-footer">
          {totalPoints > user?.point && (
            <div className="exchange-error-message">
              You do not have enough points to complete this exchange. (Only{" "}
              {user?.point} points available)
            </div>
          )}
          {!success ? (
            <button
              className="exchange-popup-button"
              onClick={handleExchange}
              disabled={totalPoints > user?.point}
            >
              Exchange
            </button>
          ) : (
            <></>
          )}
          <button className="exchange-popup-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}
