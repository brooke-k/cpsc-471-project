import React, { useState } from "react";
import axiosJSONInst from "../axios";

import Address from "../components/Address";
import { RetailRegion } from "../components/constant/RetailRegions";

const UserTest = () => {
  const [usrNme, setUsrNme] = useState(""); // Username
  const [nme, setNme] = useState(""); // Name (Actual first name, not username)
  const [pwrd, setPwrd] = useState(""); // Password
  const [retailReg, setRetailReg] = useState(""); // Retail region
  const [admID, setAdmID] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [emailAddr, setEmailAddr] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [errNotif, setErrNotif] = useState("");

  const handleUsername = (e) => {
    setUsrNme(e.target.value);
  };
  const handleName = (e) => {
    setNme(e.target.value);
  };
  const handlePassword = (e) => {
    setPwrd(e.target.value);
  };
  const handleEmail = (e) => {
    setEmailAddr(e.target.value);
  };
  const handleRetailReg = (e) => {
    setRetailReg(e.target.value);
  };

  const createUser = () => {
    if (
      usrNme === "" ||
      nme === "" ||
      pwrd === "" ||
      retailReg === "" ||
      emailAddr === ""
    ) {
      setErrNotif(
        "Some information is missing. Please ensure all fields are filled in."
      );
      return;
    }
    axiosJSONInst
      .post("/user/create/regular", {
        username: usrNme,
        name: nme,
        email: emailAddr,
        password: pwrd,
        retail_region: retailReg,
      })
      .then((res) => {
        console.log(res);
        setErrNotif(" ");
      })
      .catch((err) => console.log(err));
  };

  const verifyUser = () => {
    if (usrNme === "" || pwrd === "" || emailAddr === "") {
      setErrNotif(
        "Some information is missing. Please ensure username, email, and password are filled in."
      );
      return;
    }

    const getString =
      "/user/verify/regular?username=" +
      usrNme +
      "&email=" +
      emailAddr +
      "&password=" +
      pwrd;
    axiosJSONInst
      .get(getString)
      .then((res) => {
        setUsrNme(res.data.username);
        setPwrd(res.data.password);
        setNme(res.data.name);
        setEmailAddr(res.data.email);
        setRetailReg(res.data.retailReg);
        setErrNotif("User Verified");
      })
      .catch((err) => {
        console.log(err);
        setErrNotif(
          "A username matching that email and password could not be found."
        );
      });
  };
  return (
    <>
      <div>
        <h3>CURRENT VALUES</h3>
        <p>username: {usrNme}</p> <p>email: {emailAddr}</p>
        <p>password: {pwrd}</p>
        <p>retail region: {retailReg}</p>
      </div>
      <label htmlFor="usrNme">Username</label>
      <input
        type="text"
        placeholder="Username"
        value={usrNme}
        onChange={handleUsername}
        id="usrNme"
      />
      <label htmlFor="email">Email Address</label>
      <input
        type="email"
        placeholder="Email"
        value={emailAddr}
        onChange={handleEmail}
        id="email"
      />
      <label htmlFor="pwrd">Password</label>
      <input
        type="password"
        placeholder="Password"
        value={pwrd}
        onChange={handlePassword}
        id="pwrd"
      />
      <label htmlFor="nme">First Name</label>
      <input
        type="text"
        placeholder="First Name"
        value={nme}
        onChange={handleName}
        id="nme"
      />
      <label htmlFor="retailReg">Retail Region</label>
      <select id="retailReg" onChange={handleRetailReg}>
        {RetailRegion.map((e, i) => {
          return (
            <option key={i} value={RetailRegion[i]}>
              {RetailRegion[i]}
            </option>
          );
        })}
      </select>
      <button onClick={createUser}>Create New User</button>
      <button onClick={verifyUser}>VerifyUser</button>
      <div>{errNotif}</div>
    </>
  );
};

export default UserTest;
