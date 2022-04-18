import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleNav } from "../Auth";
import RegularNavBar from "../components/RegularNavBar";
import { getCookie } from "../Cookies";

const RegularHome = () => {
  const navigation = useNavigate();

  function verifyPageAccess() {
    if (window.location.pathname !== handleNav(window.location.pathname)) {
      navigation(handleNav(window.location.pathname));
    }
  }
  useEffect(() => {
    verifyPageAccess();
    getUserName();
  }, []);

  function getUserName() {
    const aName = getCookie("username_email").split("_");
    if (aName[0] === "") {
      return "Administrator";
    }
    return aName[0];
  }
  return (
    <>
      <RegularNavBar />
      <div id="pageContent">
        <h1>Welcome, {getUserName()}</h1>
        <h2>User Home</h2>
      </div>
    </>
  );
};

export default RegularHome;
