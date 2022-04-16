import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleNav } from "../Auth";
import "../styles/pages.scss";

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
    <div id="pageContent">
      <h1>Admin Home</h1>
    </div>
  );
};

export default AdminHome;
