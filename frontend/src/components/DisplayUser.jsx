import React from "react";
import axiosJSONInst from "../axios";

const DisplayAllUsersOneType = (props) => {
  const userTypeExp = /^(admin|regular|manufacturer)$/;
  function getType() {
    if (props.type.match(userTypeExp) === null) {
      return "regular";
    } else {
      return props.type;
    }
  }
  function getUsername() {
    if (!displayAll && typeof props.username !== "undefined") {
      return props.username;
    } else {
      return "N/A";
    }
  }

  function getEmail() {
    if (!displayAll && typeof props.email !== "undefined") {
      return props.email;
    } else {
      return "N/A";
    }
  }

  function displayAllTrue() {
    if (typeof props.displayAll === "undefined") {
      return false;
    } else if (props.displayAll === true) {
      return true;
    } else return false;
  }

  function isPropNull() {
    if (typeof props.range === "undefined") {
      return "yes";
    } else {
      return "no";
    }
  }

  const isNull = isPropNull();
  const userType = getType();
  const displayAll = displayAllTrue();
  const username = getUsername();
  const email = getEmail();

  function getAllUsersOfType() {
    let requestString = "/user/get/all";
    if (userType === "admin") {
      requestString += "Administrator";
    } else if (userType === "manufacturer") {
      requestString += "Manufacturer";
    } else requestString += "Regular";

    axiosJSONInst
      .get(requestString)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <h1>Type = {userType}</h1>
      <h2>DisplayAll = {displayAll ? "yes" : "no"}</h2>
      <h4>Username: {username}</h4>
      <h4>Email: {email}</h4>
      <button onClick={getAllUsersOfType}>Get All</button>
    </>
  );
};

export default DisplayAllUsersOneType;
