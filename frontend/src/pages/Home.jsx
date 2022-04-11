import React from "react";
import { Link } from "react-router-dom";
import ReportForm from "../components/ReportForm.jsx";
import RetailerInfo from "../components/RetailerInfo.jsx";
import "../styles/base.scss";
const Home = () => {
  return (
    <>
      <div>
        <h1>Allergy Manager</h1>
      </div>
      <div>
        <Link to="/login">Login In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default Home;
