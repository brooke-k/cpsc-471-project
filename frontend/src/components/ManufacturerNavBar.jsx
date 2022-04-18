import React from "react";
import { useNavigate } from "react-router-dom";
import { banishCookie } from "../Cookies";
import { Link } from "react-router-dom";
import "../styles/nav.scss";

const ManufacturerNavBar = () => {
  const goNav = useNavigate();
  function logUserOut() {
    banishCookie();
    goNav("/");
  }

  const navLinks = [
    { path: "/manufacturer_home", title: "Home" },
    { path: "/search_product", title: "Search Products" },
    { path: "/search_manufacturer", title: "Search by Manufacturer" },
    { path: "/add_product", title: "AddProduct" },
    { path: "/manage_products", title: "Manage Products" },
    { path: "/manufacturer_profile", title: "Manage Profile" },
  ];

  return (
    <>
      <div className="navBarBase">
        {navLinks.map((e, i) => {
          return (
            <Link to={navLinks[i].path} key={i}>
              {navLinks[i].title}
            </Link>
          );
        })}
        <button onClick={logUserOut}>Log Out</button>
      </div>
    </>
  );
};

export default ManufacturerNavBar;
