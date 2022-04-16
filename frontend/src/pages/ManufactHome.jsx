import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleNav } from "../Auth";
import axiosJSONInst from "../axios";
import "../styles/prodSearch.scss";

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
  }, []);

  const [usrNme, setUsrNme] = useState(""); // Username
  const [nme, setNme] = useState(""); // Name (Actual first name, not username)
  const [pwrd, setPwrd] = useState(""); // Password
  const [errNotif, setErrNotif] = useState("");
  const [strt, setStrt] = useState("");
  const [cty, setCty] = useState("");
  const [provTer, setProvTer] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [searchEmail, setSearchEmail] = useState(false);
  const [emailAddr, setEmailAddr] = useState(""); // User's password
  const [foundResult, setFoundResult] = useState(false);
  const [searchResult, setSearchResult] = useState(
    new manufacturerInfo("", "", "", "", "", "", "", "")
  );

  const handleSearchEmail = (e) => {
    setSearchEmail(e.target.value);
  };

  const handleFoundResult = (e) => {
    setFoundResult(e.target.value);
  };
  const handleUsername = (e) => {
    setUsrNme(e);
  };
  const handleName = (e) => {
    setNme(e);
  };
  const handlePassword = (e) => {
    setPwrd(e.target.value);
  };
  const handleEmail = (e) => {
    setEmailAddr(e);
  };
  const handleStreet = (e) => {
    setStrt(e.target.value);
  };
  const handleCity = (e) => {
    setCty(e.target.value);
  };
  const handleProvince = (e) => {
    setProvTer(e.target.value);
  };
  const handleZip = (e) => {
    setZipCode(e.target.value);
  };
  const handlePhone = (e) => {
    setPhoneNo(e);
  };

  const handleRes = (e) => {
    console.log(e);
    const oy = JSON.parse(e);
    const newDispInf = new manufacturerInfo(
      oy["name"],
      oy["email"],
      oy["username"],
      oy["phone_no"],
      oy["street"],
      oy["city"],
      oy["province"],
      oy["zip_code"]
    );
    const comboList = searchResult.concat([newDispInf]);
    setSearchResult(comboList);
    if (searchResult.length > 0)
      console.log("handled" + searchResult[searchResult.length - 1].name);
  };

  function searchManufacturer() {
    axiosJSONInst
      .get("/user/manufacturer/searchByName?name=" + nme)
      .then((res) => {
        if (res.status.valueOf !== 200) {
          setErrNotif("A manufacturer with that name could not be found.");
        } else {
          handleName(res.data.name);
          handleUsername(res.data.username);
          handleEmail(res.data.email);
          handlePhone(res.data.phone_no);
        }
        console.log(nme);
      })
      .catch((err) =>
        setErrNotif("A manufacturer with that name could not be found.")
      );
  }

  return (
    <>
      <div id="pagePanel">
        <div id="pageContent">
          <h1 style={{ fontSize: "32pt" }}>Manufacturer Search</h1>
          <div id="inputRow" style={{ justifyContent: "center" }}>
            <p>Search by</p>
            <select value={searchEmail} onChange={handleSearchEmail}>
              <option value={false}>Name</option>
              <option value={true}>Email</option>
            </select>
          </div>
          <div id="inputRow" style={{ justifyContent: "center" }}>
            <label htmlFor="nme">Name</label>
            <input
              type="text"
              placeholder="Name"
              value={nme}
              onChange={handleName}
              id="nme"
            />
          </div>
          <div id="inputRow" style={{ justifyContent: "center" }}>
            <button onClick={searchManufacturer}>Search</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManufactHome;
