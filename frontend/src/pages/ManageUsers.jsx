import React from "react";
import { getCookie } from "../Cookies";
import { useState, useEffect } from "react";
import RegularNavBar from "../components/RegularNavBar";
import ManufacturerNavBar from "../components/ManufacturerNavBar";
import AdminNavBar from "../components/AdminNavBar";
import DisplayUser from "../components/DisplayUser";

const ManageUsers = () => {
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
      <AdminNavBar />
      <div id="pageContent">
        <DisplayUser displayAll={true} type={"regular"} />
      </div>
    </>
  );
};

export default ManageUsers;
