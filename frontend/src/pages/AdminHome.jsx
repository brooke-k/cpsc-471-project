import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleNav } from "../Auth";
import "../styles/pages.scss";
import { getCookie } from "../Cookies";
import AdminNavBar from "../components/AdminNavBar";

const AdminHome = () => {
  const navigation = useNavigate();
  function verifyPageAccess() {
    if (window.location.pathname !== handleNav(window.location.pathname)) {
      navigation(handleNav(window.location.pathname));
    }
  }
  useEffect(() => {
    verifyPageAccess();
  }, []);
  return (
    <>
      <AdminNavBar />
      <div id="pageContent">
        <h1>Admin Home</h1>
      </div>
    </>
  );
};

export default AdminHome;
