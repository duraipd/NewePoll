import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Tabledefinition from "./Tabledefinition";
import Datamapping from "./Datamapping";
import Loaddata from "./Loaddata";

const App = () => {
  return (

    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Tabledefinition" element={<Tabledefinition></Tabledefinition>}></Route>
          <Route path="/Datamapping" element={<Datamapping/>}></Route>
          <Route path="/Loaddata" element={<Loaddata/>}></Route>
        </Routes>
      </div>
    </Router>

  );
}


export default App;
