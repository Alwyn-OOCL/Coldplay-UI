import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseApi from "../../api/baseApi";
import logo from "../../assets/images/logo.svg";
import "../../assets/styles/global.css";
import { useAuth } from "../../contexts/AuthContext";
import "./Navbar.css";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const showDropdown = () => {
    setDropdownVisible(true);
  };

  const hideDropdown = () => {
    setDropdownVisible(false);
  };

  const { userId, clearToken } = useAuth();

  const handleMouseMove = () => {
    if (userId) {
      baseApi
      .get(`/user/${userId}`)
      .then((response) => {
        setUser(response.data.data);
      })
      .finally(() => {});
    }
  }

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
          ColdplayGlobal
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
            <div className="user-info" onMouseOver={handleMouseMove} onClick={toggleDropdown} onMouseEnter={showDropdown}
            onMouseLeave={hideDropdown}>
              <div className="user-tab">
                <FaUserCircle size={24} />
                <span>{user.name}</span>
              </div>
              {dropdownVisible && (
              <div className='user-dropdown'>
                <div className='user-level'>
                  <span>Cold Rank: </span>
                  <span>{user.level}</span>
                </div>
                <div className='user-point'>
                  <span>Cold Point: </span>
                  <span>{user.point ? user.point : 0}</span>
                </div>
                <button className='logout-button' onClick={handleLogout}>Logout</button>
              </div>
            )}
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
