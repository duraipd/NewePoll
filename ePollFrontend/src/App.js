import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Login from "./Login";

const App = () => {
  return (

    <div>
      <Navbar />
    

    <Router>
      <div>
       
        

    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>

    </div>
    

  );
};

export default App;
