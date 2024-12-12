import React, { useState, useEffect } from "react";
import "./Promotion.css";
import baseApi from "../../../api/baseApi";
import { charity } from "../../../data/charity";
import PromotionConfirm from "./PromotionConfirm";

const Promotion = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [code, setCode] = useState("");
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isError, setIsError] = useState(false);

  console.log(alertMessage);
  console.log(isError);


  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
      }, 6000); // Change image every 6 seconds

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const handleMouseEnter = (index) => {
    setIsHovered(true);
    setCurrentIndex(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleRedeem = () => {
    setShowAlert(true);
  };

  // eslint-disable-next-line no-unused-vars
  const handleConfirmRedeem = async () => {
    try {
      const response = await baseApi.post("/code/validation", { code });
      if (response.data.success) {
        setAlertMessage("Redemption successful!");
        setIsRedeemed(true);
        setIsError(false);
      } else {
        setAlertMessage(response.data.errorMsg);
        setIsError(true);
      }
    } catch (error) {
      setAlertMessage("Failed to redeem promotion.");
      setIsError(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="promotion">
      <h2 className="promotion-main-title">
        Recent organized charity activities
      </h2>
      <div className="promotion-images">
        {charity.map((item, index) => (
          <div
            key={item}
            className={`promotion-image-item ${
              currentIndex === index ? "active" : ""
            }`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={require(`../../../assets/images/promotion/${item.img}`)}
              className="promotion-image"
              alt="Promotion"
            />
            <p className="promotion-description">{item.charity_description}</p>
          </div>
        ))}
      </div>
      <div className="promotion-lower-container">
        <div className="promotion-lower">
          <div className="promo-message">
            <p>
              Every bit of love can be transformed into a journey of Coldplay's
              music. Participate in charity activities and let love and music
              coexist
            </p>
          </div>
          <div className="redemption-box">
            <input
              type="text"
              placeholder="Enter Redemption code"
              className="redemption-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              className="redeem-button"
              onClick={handleRedeem}
              disabled={!code || code === ""}
            >
              Redeem Now!
            </button>
          </div>
        </div>
      </div>

      {showAlert && (
        <PromotionConfirm
          isRedeemed={isRedeemed}
          code={code}
          onCloseAlert={handleCloseAlert}
          setCode={setCode}
        />
      )}
    </div>
  );
};

export default Promotion;
