import React, { useState } from "react";
import axiosJSONInst from "../axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.scss";
import { bakeCookie } from "../Cookies";

const Login = () => {
  const goNav = useNavigate();
  const userType = ["Non-Admin", "Administrator"];
  const [usrnme, setUsrnme] = useState("");
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
  const handleUsername = (e) => {
    setUsrnme(e.target.value);
  };

  const verifyNonAdmin = () => {
    if (pwrd === "" || emailAddr === "" || usrnme === "") {
      setErrNotif("Please ensure all fields are filled in.");
      return;
    }
    let loggedIn = false;
    const verifString =
      encodeURIComponent(usrnme) +
      "&email=" +
      encodeURIComponent(emailAddr) +
      "&password=" +
      encodeURIComponent(pwrd);
    axiosJSONInst
      .get("/user/verify/regular?username=" + verifString)
      .then((res) => {
        console.log(res);
        bakeCookie("access_level", "regular");
        bakeCookie("username_email", usrnme + "_" + emailAddr);
        setErrNotif("Logged in");
        setErrNotif("Login Success");
        loggedIn = true;
        goNav("/regular_home");
        return;
      })
      .catch((err) => console.log(err));

    axiosJSONInst
      .get("/user/verify/manufacturer?username=" + verifString)
      .then((res) => {
        bakeCookie("access_level", "manufacturer");
        bakeCookie("username_email", usrnme + "_" + emailAddr);
        setErrNotif("Logged in");
        goNav("/manufacturer_home");
        loggedIn = true;
        return;
      })
      .catch((err) => {
        setErrNotif("Incorrect username or password.");
        setPwrd("");
      });
  };

  const verifyAdmin = () => {
    if (pwrd === "" || admID === "" || emailAddr === "" || usrnme === "") {
      setErrNotif("Please ensure all fields are filled in.");
      return;
    }

    const verifString =
      "/user/verify/admin?username=" +
      encodeURIComponent(usrnme) +
      "&email=" +
      encodeURIComponent(emailAddr) +
      "&password=" +
      encodeURIComponent(pwrd) +
      "&admin_id=" +
      encodeURIComponent(admID);
    axiosJSONInst
      .get(verifString)
      .then((res) => {
        bakeCookie("access_level", "admin");
        bakeCookie(
          "username_email",
          encodeURIComponent(usrnme + "_" + emailAddr)
        );
        setErrNotif("Logged In");
        goNav("/admin_home");
      })
      .catch((err) => {
        setErrNotif("Username, password, or adminsitrator ID is incorrect.");
        console.log(err);
      });
  };

  function accountOptions() {
    if (selectedType === userType[0]) {
      return (
        <>
          <label htmlFor="username">Username</label>
          <input
            type="username"
            placeholder="Username"
            value={usrnme}
            onChange={handleUsername}
            id="username"
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

          <button onClick={verifyNonAdmin}>Log In</button>
        </>
      );
    } else if (selectedType === userType[1]) {
      return (
        <>
          <label htmlFor="username">Username</label>
          <input
            type="username"
            placeholder="Username"
            value={usrnme}
            onChange={handleUsername}
            id="username"
          />
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
            id="admID"
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
