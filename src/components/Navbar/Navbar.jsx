import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import "../../assets/styles/global.css";
import baseApi from "../../api/baseApi";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/images/logo.svg";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const { userId, clearToken } = useAuth();

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

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogoClick = () => {
    navigate("/"); // Navigate to homepage
  };

  const handleLogout = () => {
    baseApi
      .post("/logout")
      .then(() => {
        clearToken();
        setUser(null);
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <img
          src={logo}
          alt="Logo"
          onClick={handleLogoClick}
          style={{ height: "auto", width: "70px" }}
        />
        <div className="navbar-logo" onClick={handleLogoClick}>
          Coldplay World Tour{" "}
          <span className="logo-break">Ticketing System</span>
        </div>
        <div className="navbar-links">
          <a href="/" className="nav-link">
            Homepage
          </a>
          <a href="/concerts" className="nav-link">
            Concerts
          </a>
          <a href="/my-orders" className="nav-link">
            My Orders
          </a>
          <a href="/shop" className="nav-link">
            Shop
          </a>
        </div>
        <div className="navbar-auth">
          {user ? (
            <div className="user-info">
              <div>
                <div className="user-level">{user.level}</div>
                <div className="user-name">{user.name}</div>
              </div>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <button className="button button-secondary" onClick={handleLogin}>
                Log In
              </button>
              <button className="button button-primary" onClick={handleSignup}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
