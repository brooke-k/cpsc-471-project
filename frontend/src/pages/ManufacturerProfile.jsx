import React from "react";
import { useState, useEffect } from "react";
import { getCookie } from "../Cookies";
import RegularNavBar from "../components/RegularNavBar";
import ManufacturerNavBar from "../components/ManufacturerNavBar";
import AdminNavBar from "../components/AdminNavBar";

const ManufacturerProfile = () => {
  const [currNav, setCurrNav] = useState(<></>);
  useEffect(() => {
    checkNavbar();
  }, []);
  function checkNavbar() {
    return getCookie("access_level") === "regular"
      ? setCurrNav(<RegularNavBar />)
      : getCookie("access_level") === "manufacturer"
      ? setCurrNav(<ManufacturerNavBar />)
      : getCookie("access_level") === "admin"
      ? setCurrNav(<AdminNavBar />)
      : setCurrNav(<></>);
  }
  return (
    <>
      {currNav}
      <div id="pageContent">
        <h1>Manufacturer Profile</h1>
      </div>
    </>
  );
};

export default ManufacturerProfile;
