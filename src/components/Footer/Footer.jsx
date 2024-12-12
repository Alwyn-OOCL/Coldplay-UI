import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-links">
            <h3>Coldplay World Tour</h3>
          </div>
          <div className="footer-links">
            <h3>Social</h3>
            <div className="social-icons">
              <img
                src={require("../../assets/images/icon/ins.png")}
                alt="Ins"
                className="social-icon"
              />
              <img
                src={require("../../assets/images/icon/Twitter.png")}
                alt="Twitter"
                className="social-icon"
              />
              <img
                src={require("../../assets/images/icon/Youtube.png")}
                alt="Youtube"
                className="social-icon"
              />
              <img
                src={require("../../assets/images/icon/facebook.png")}
                alt="Facebook"
                className="social-icon"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
