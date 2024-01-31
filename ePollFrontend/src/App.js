import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Dasnav from "./Dashnav";
import Tabledefinition from "./Tabledefinition";
import Datamapping from "./Datamapping";
import Loaddata from "./Loaddata";

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
        <Route
          path="/Tabledefinition/*"
          element={
            <>
              <Dasnav />
              <Tabledefinition />
            </>
          }
        />
        <Route
          path="/Datamapping/*"
          element={
            <>
              <Dasnav />
              <Datamapping />
            </>
          }
        />
          <Route
          path="/Loaddata/*"
          element={
            <>
              <Dasnav />
              <Loaddata />
            </>
          }
        />


      </Routes>
    </Router>
  );
};

export default App;
