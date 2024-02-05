import "bootstrap/dist/css/bootstrap.min.css";
import myImage from "./epoll img.png";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import "./Dashnav.css";

const Dasnav = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handledLogout = () => {
    console.log("User logged out");
    setDropdownOpen(false);
    localStorage.clear();
    navigate("/");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg demo1 sticky-top">
      <div className="container">
        <img src={myImage} className="b" />
      </div>
      <div className="navbar">
        <div className="navbar-items"></div>

        <div className="profile-dropdown" ref={dropdownRef}>
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
