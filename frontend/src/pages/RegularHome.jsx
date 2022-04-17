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
  }, []);
  return (
    <>
      <RegularNavBar />
      <div>
        <h1>Regular Home</h1>
      </div>
    </>
  );
};

export default RegularHome;
