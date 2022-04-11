import React, { useState } from "react";
import axiosJSONInst from "../axios";
import { Link } from "react-router-dom";

const Login = () => {
  const userType = ["Non-Admin", "Administrator"];

  const [pwrd, setPwrd] = useState(""); // Password
  const [errNotif, setErrNotif] = useState("");
  const [emailAddr, setEmailAddr] = useState(""); // User's password
  const [admID, setAdmID] = useState("");
  const [selectedType, setSelectedType] = useState(userType[0]);

  const handlePassword = (e) => {
    setPwrd(e.target.value);
  };
  const handleEmail = (e) => {
    setEmailAddr(e.target.value);
  };
  const handleAdmID = (e) => {
    setAdmID(e.target.value);
  };
  const handleAccountType = (e) => {
    setSelectedType(e.target.value);
    setErrNotif("");
  };

  const verifyNonAdmin = () => {
    if (pwrd === "" || emailAddr === "") {
      setErrNotif("Please ensure all fields are filled in.");
      return;
    }
    const verifString =
      "/user/verify/non_admin?" + "email=" + emailAddr + "&password=" + pwrd;
    axiosJSONInst
      .get(verifString)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
        setErrNotif("Username or password is incorrect.");
      });
  };

  const verifyAdmin = () => {
    if (pwrd === "" || admID === "" || emailAddr === "") {
      setErrNotif("Please ensure all fields are filled in.");
      return;
    }
    const verifString =
      "/user/verify/admin?email=" +
      emailAddr +
      "&password=" +
      pwrd +
      "&admin_id=" +
      admID;
    axiosJSONInst
      .get(verifString)
      .then((res) => console.log(res))
      .catch((err) => {
        setErrNotif("Username, password, or adminsitrator ID is incorrect.");
        console.log(err);
      });
  };

  function accountOptions() {
    if (selectedType === userType[0]) {
      return (
        <>
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

          <button onClick={verifyNonAdmin}>Log In</button>
        </>
      );
    } else if (selectedType === userType[1]) {
      return (
        <>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            placeholder="Email"
            value={emailAddr}
            onChange={handleEmail}
            id="email"
          />

          <label htmlFor="admID">Administrator ID Number</label>
          <input
            type="text"
            placeholder="Administrator ID"
            value={admID}
            onChange={handleAdmID}
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

          <button onClick={verifyAdmin}>Log In</button>
        </>
      );
    }
  }

  return (
    <div id="contentPanel">
      <div className="authPanel">
        <h1>Log In</h1>
        <label htmlFor="accountTypeSelect">Select Account Type</label>
        <select id="accountTypeSelect" onChange={handleAccountType}>
          {userType.map((e, i) => {
            return (
              <option key={i} value={userType[i]}>
                {userType[i]}
              </option>
            );
          })}
        </select>
        {accountOptions()}
        <p>{errNotif}</p>
        <Link to="/signup">Go to Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
