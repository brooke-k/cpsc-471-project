import React from "react";

import { Link } from "react-router-dom";
import "../styles/nav.scss";

const NavButtons = () => {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "fitContent",
        display: "flex",
        top: "0",
        left: "0",
        flexFlow: "row nowrap",
        justifyContent: "start",
        justifyItems: "center",
        alignItems: "center",
        alignContent: "center",
        justifySelf: "stretch",
        margin: "0",
        padding: "0.25rem",
      }}
      id="navThing"
    >
      {" "}
      <Link to="/login">Log In</Link> <Link to="/signup">Sign Up</Link>
      <Link to="/search_product">Search Products</Link>
      <Link to="/add_product">Add a Product</Link>
      <Link to="/manufacturer_home">Search Manufacturer</Link>
    </div>
  );
};

export default NavButtons;
