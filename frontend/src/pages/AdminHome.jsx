import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleNav } from "../Auth";
import "../styles/homepage.scss";
import { getCookie } from "../Cookies";
import AdminNavBar from "../components/AdminNavBar";
import { useState } from "react";

const AdminHome = () => {
  const navigation = useNavigate();

  function verifyPageAccess() {
    if (window.location.pathname !== handleNav(window.location.pathname)) {
      navigation(handleNav(window.location.pathname));
    }
  }
  useEffect(() => {
    verifyPageAccess();
    getAdminName();
  }, []);

  function getAdminName() {
    const aName = getCookie("username_email").split("_");
    if (aName[0] === "") {
      return "Administrator";
    }
    return aName[0];
  }
  return (
    <>
      <AdminNavBar />
      <div id="pageContent">
        <h1>Welcome, {getAdminName()}</h1>
        <h2>Admin Home</h2>
      </div>
    </>
  );
};

export default AdminHome;
