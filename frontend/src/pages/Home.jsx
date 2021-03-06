import React from "react";
import { Link } from "react-router-dom";

import "../styles/home.scss";
const Home = () => {
  return (
    <div id="AppBase">
      <h1>Allergy Manager</h1>
      <div
        id="homeLink"
        style={{
          display: "flex",
          flexFlow: "row",
          alignSelf: "center",
          justifySelf: "center",
          columnGap: "15rem",
        }}
      >
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;
