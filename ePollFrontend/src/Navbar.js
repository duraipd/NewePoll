import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import myImage from './epoll img.png';
import './App.css';
 
 
 
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container">
       <img src={myImage} className='a'/> 
          
       
      </div>
    </nav>
  );
};
 
export default Navbar;
 
 