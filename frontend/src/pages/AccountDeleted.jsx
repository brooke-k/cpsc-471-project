import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.scss";

const AccountDeleted = () => {
  return (
    <>
      <h2>Account Successfully Deleted</h2>
      <div id="homeLink">
        <Link
          to="/"
          style={{
            fontSize: "18pt",
            alignSelf: "center",
            justifySelf: "center",
            justifyContent: "center",
            alignContent: "center",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          Return to Start
        </Link>
      </div>
    </>
  );
};

export default AccountDeleted;
