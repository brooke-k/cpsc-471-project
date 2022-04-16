import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestPage from "./pages/TestPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./styles/base.scss";
import Home from "./pages/Home";
import ProductSearch from "./pages/ProductSearch";
import NavButtons from "./components/navButtons";
import AddProduct from "./pages/AddProduct";
import ManufactHome from "./pages/ManufactHome";

const App = () => {
  return (
    <Router>
      <div id="AppBase">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/test" element={<TestPage />}></Route>
          <Route path="/search_product" element={<ProductSearch />}></Route>
          <Route path="/add_product" element={<AddProduct />}></Route>
          <Route path="/manufacturer_home" element={<ManufactHome />}></Route>
        </Routes>
      </div>
      <NavButtons />
    </Router>
  );
};

export default App;
