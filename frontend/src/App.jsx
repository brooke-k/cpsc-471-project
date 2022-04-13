import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestPage from "./pages/TestPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./styles/base.scss";
import Home from "./pages/Home";
import ProductSearch from "./pages/ProductSearch";

const App = () => {
  return (
    <Router>
      <div id="AppBase">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/test" element={<TestPage />}></Route>
          <Route path="/product_search" element={<ProductSearch />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
