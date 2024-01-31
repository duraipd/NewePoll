import "bootstrap/dist/css/bootstrap.min.css";
import myImage from "./epoll img.png";
import "./App.css";

import React, { useState } from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg demo sticky-top">
      <div className="container">
        <img src={myImage} className="a" />
    
      </div>
    </nav>
  );
};

export default Navbar;
