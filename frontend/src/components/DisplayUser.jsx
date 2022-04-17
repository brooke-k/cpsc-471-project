import React, { useEffect } from "react";
import axiosJSONInst from "../axios";
import { useState } from "react";

const DisplayUser = (props) => {
  const [regularUsers, setRegularUsers] = useState([]);
  const [manufacturerUsers, setManufacturerUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [usersLoaded, setUsersLoaded] = useState(false);

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
    let requestBase = "/user/get/all";
    let requestString;
    let requestRegular = requestBase + "Regular";
    let requestManufacturer = requestBase + "Manufacturer";
    let requestAdmin = requestBase + "Administrator";
    if (userType === "admin") {
      requestString = requestBase + "Administrator";
    } else if (userType === "manufacturer") {
      requestString += "Manufacturer";
    } else requestString += "Regular";

    axiosJSONInst
      .get(requestRegular)
      .then((res) => {
        console.log(res);
        const returnString = JSON.stringify(res.data);
        console.log(returnString);
        setRegularUsers(JSON.parse(JSON.stringify(res.data)));
      })
      .catch((err) => console.log(err));
    axiosJSONInst
      .get(requestManufacturer)
      .then((res) => {
        console.log(res);
        const returnString = JSON.stringify(res.data);
        console.log(returnString);
        setManufacturerUsers(JSON.parse(JSON.stringify(res.data)));
      })
      .catch((err) => console.log(err));
    axiosJSONInst
      .get(requestAdmin)
      .then((res) => {
        console.log(res);
        const returnString = JSON.stringify(res.data);
        console.log(returnString);
        setAdminUsers(JSON.parse(JSON.stringify(res.data)));
      })
      .catch((err) => console.log(err));
    setUsersLoaded(true);
  }

  if (!usersLoaded) {
    getAllUsersOfType();
    setUsersLoaded(true);
  }

  return (
    <>
      <h2>All Allergy Manager Users</h2>
      <h4>Regular Users</h4>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td>Username</td>
            <td>Email</td>
          </tr>
          {regularUsers.map((e, i) => {
            return (
              <tr key={i}>
                <td>{regularUsers[i].username}</td>
                <td>{regularUsers[i].email}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
      <h4>Manufacturer Users</h4>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td>Username</td>
            <td>Email</td>
            <td>Name</td>
            <td>Phone Number</td>
            <td>Address</td>
          </tr>
          {manufacturerUsers.map((e, i) => {
            return (
              <tr key={i}>
                <td>{manufacturerUsers[i].username}</td>
                <td>{manufacturerUsers[i].email}</td>
                <td>{manufacturerUsers[i].name}</td>
                <td>{manufacturerUsers[i].phone_no}</td>
                <td>
                  {manufacturerUsers[i].street}, {manufacturerUsers[i].city},{" "}
                  {manufacturerUsers[i].province}{" "}
                  {manufacturerUsers[i].zip_code}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
      <h4>Admin Users</h4>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td>Username</td>
            <td>Email</td>
          </tr>
          {adminUsers.map((e, i) => {
            return (
              <tr key={i}>
                <td>{adminUsers[i].username}</td>
                <td>{adminUsers[i].email}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </>
  );
};

export default DisplayUser;
