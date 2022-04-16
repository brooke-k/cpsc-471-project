import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { banishCookie } from "../Cookies";
import "../styles/nav.scss";
import { handleNav } from "../Auth";

const NavButtons = () => {
  const goNav = useNavigate();
  function logUserOut() {
    banishCookie();
    goNav("/");
  }

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
      <button onClick={logUserOut}>Log Out</button>
    </div>
  );
};

export default NavButtons;
