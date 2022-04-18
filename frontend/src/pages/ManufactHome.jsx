import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleNav } from "../Auth";
import axiosJSONInst from "../axios";
import "../styles/prodSearch.scss";
import { getCookie } from "../Cookies";
import ManufacturerNavBar from "../components/ManufacturerNavBar";

class manufacturerInfo {
  constructor(
    name,
    email,
    username,
    phone_no,
    street,
    city,
    province,
    zip_code
  ) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.phone_no = phone_no;
    this.street = street;
    this.province = province;
    this.zip_code = zip_code;
    this.city = city;
  }
}

const ManufactHome = () => {
  const navigation = useNavigate();

  function verifyPageAccess() {
    if (window.location.pathname !== handleNav(window.location.pathname)) {
      navigation(handleNav(window.location.pathname));
    }
  }
  useEffect(() => {
    verifyPageAccess();
    getManufacturerName();
  }, []);

  function getManufacturerName() {
    const aName = getCookie("username_email").split("_");
    if (aName[0] === "") {
      return "Administrator";
    }
    return aName[0];
  }
  return (
    <>
      <ManufacturerNavBar />
      <div id="pageContent">
        <h1>Welcome, {getManufacturerName()}</h1>
        <h2>Manufacturer Home</h2>
      </div>
    </>
  );
};

export default ManufactHome;
