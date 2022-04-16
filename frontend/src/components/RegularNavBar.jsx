import React from "react";
import { useNavigate } from "react-router-dom";
import { banishCookie } from "../Cookies";

const RegularNavBar = () => {
  const goNav = useNavigate();
  function logUserOut() {
    banishCookie();
    goNav("/");
  }
  return <></>;
};

export default RegularNavBar;
