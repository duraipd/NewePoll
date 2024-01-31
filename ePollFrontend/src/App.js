import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Dasnav from "./Dashnav";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <>
              <Dasnav />
              <Dashboard />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
