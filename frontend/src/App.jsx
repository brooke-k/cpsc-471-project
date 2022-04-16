import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Re,
  useNavigate,
} from "react-router-dom";
import TestPage from "./pages/TestPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./styles/base.scss";
import Home from "./pages/Home";
import ProductSearch from "./pages/ProductSearch";
import NavButtons from "./components/navButtons";
import AddProduct from "./pages/AddProduct";
import ManufactHome from "./pages/ManufactHome";
import AdminHome from "./pages/AdminHome";
import RegularHome from "./pages/RegularHome";
import { handleNav } from "./Auth";

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
          <Route path="/admin_home" element={<AdminHome />}></Route>
          <Route path="/regular_home" element={<RegularHome />}></Route>
        </Routes>
      </div>
      <NavButtons />
    </Router>
  );
};

export default App;
