import React, { useState } from "react";

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
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

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
    setEmail(e.target.value);
  };
  const handleRetailReg = (e) => {
    setRetailReg(e.target.value);
  };

  return (
    <>
      <div>
        <h3>CURRENT VALUES</h3>
        <p>username: {usrNme}</p> <p>email: {email}</p>
        <p>password: {pwrd}</p>
        <p>retail region: {retailReg}</p>
      </div>
      <label for="usrNme">Username</label>
      <input
        type="text"
        placeholder="Username"
        value={usrNme}
        onChange={handleUsername}
        id="usrNme"
      />
      <label for="email">Email Address</label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmail}
        id="email"
      />
      <label for="pwrd">Password</label>
      <input
        type="password"
        placeholder="Password"
        value={pwrd}
        onChange={handlePassword}
        id="pwrd"
      />
      <label for="retailReg">Retail Region</label>
      <select id="retailReg" onChange={handleRetailReg}>
        {RetailRegion.map((e, i) => {
          return (
            <option key={i} value={RetailRegion[i]}>
              {RetailRegion[i]}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default UserTest;
