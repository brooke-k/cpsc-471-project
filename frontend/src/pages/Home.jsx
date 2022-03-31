import React from "react";
import { Link } from "react-router-dom";
import ReportForm from "../components/ReportForm.jsx";
import RetailerInfo from "../components/RetailerInfo.jsx";
import "../styles/base.scss";
const Home = () => {
  return (
    <div>
      <h1>This is the Home</h1>
      <nav>
        <Link style={{ margin: "0 0.5ch" }} to="/">
          Home
        </Link>
        <Link to="/login" style={{ margin: "0 0.5ch" }}>
          Login
        </Link>
        <Link style={{ margin: "0 0.5ch" }} to="/signup">
          Signup
        </Link>
        <Link style={{ margin: "0 0.5ch" }} to="/manufacturer_home">
          Manufacturer Home
        </Link>
        <Link style={{ margin: "0 0.5ch" }} to="/admin_home">
          Administrator Home
        </Link>
        <Link style={{ margin: "0 0.5ch" }} to="/user_profile">
          User Login
        </Link>
      </nav>
    </div>
  );
};

export default Home;
