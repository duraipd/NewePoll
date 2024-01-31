import "bootstrap/dist/css/bootstrap.min.css";
import myImage from "./epoll img.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import "./Dashnav.css";
const Dasnav = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handledLogout = () => {
    console.log("User logged out");
    setDropdownOpen(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg demo">
      <div className="container">
        <img src={myImage} className="a" />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="navbar">
        <div className="navbar-items"></div>

        <div className="profile-dropdown">
          <button className="profile-button" onClick={toggleDropdown}>
            <PersonIcon />
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <button onClick={handledLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Dasnav;
