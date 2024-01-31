import "bootstrap/dist/css/bootstrap.min.css";
import myImage from "./epoll img.png";
import "./App.css";

import React, { useState } from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg demo sticky-top">
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
    </nav>
  );
};

export default Navbar;
