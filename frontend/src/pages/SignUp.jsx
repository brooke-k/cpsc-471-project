import React, { useEffect, useState, Dispatch } from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
import axiosJSONInst from "../axios";
import { ProvTer } from "../components/constant/Provinces-Territories";
import { RetailRegion } from "../components/constant/RetailRegions";
import "../styles/auth.scss";

const SignUp = () => {
  const userType = ["Individual", "Manufacturer", "Administrator"];

  const [usrNme, setUsrNme] = useState(""); // Username
  const [nme, setNme] = useState(""); // Name (Actual first name, not username)
  const [pwrd, setPwrd] = useState(""); // Password
  const [retailReg, setRetailReg] = useState(""); // Retail region
  const [errNotif, setErrNotif] = useState("");
  const [emailAddr, setEmailAddr] = useState(""); // User's password
  const [selectedType, setSelectedType] = useState(userType[0]);
  const [strt, setStrt] = useState("");
  const [cty, setCty] = useState("");
  const [provTer, setProvTer] = useState("");
  const [zipCode, setZipCode] = useState("");
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
    setEmailAddr(e.target.value);
  };
  const handleRetailReg = (e) => {
    setRetailReg(e.target.value);
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
    setPhoneNo(e.target.value);
  };

  const handleAccountType = (e) => {
    setSelectedType(e.target.value);
    setErrNotif("");
  };

  function accountOptions() {
    if (selectedType === userType[0]) {
      return (
        <>
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

          <button onClick={createRegularUser}>Sign Up</button>
        </>
      );
    } else if (selectedType === userType[1]) {
      return (
        <>
          <label htmlFor="nme">Manufacturer Name</label>
          <input
            type="text"
            placeholder="Name"
            value={nme}
            onChange={handleName}
            id="nme"
          />

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

          <label htmlFor="phoneNo">Phone Number</label>
          <input
            type="phoneNo"
            placeholder="Phone Number"
            value={phoneNo}
            onChange={handlePhone}
            id="phoneNo"
          />

          <label htmlFor="pwrd">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={pwrd}
            onChange={handlePassword}
            id="pwrd"
          />

          <label htmlFor="street">Headquarters Address</label>
          <input
            id="street"
            value={strt}
            placeholder="Street Number"
            onChange={handleStreet}
            type="text"
          />

          <input
            id="city"
            value={cty}
            placeholder="City"
            onChange={handleCity}
            type="text"
          />

          <select id="province" onChange={handleProvince}>
            {ProvTer.map((e, i) => {
              return (
                <option key={i} value={ProvTer[i]}>
                  {ProvTer[i]}
                </option>
              );
            })}
          </select>

          <input
            id="zipCode"
            value={zipCode}
            placeholder="Zip Code"
            onChange={handleZip}
            type="text"
          />

          <button onClick={createManufacturer}>Sign Up</button>
        </>
      );
    } else if (selectedType === userType[2]) {
      return (
        <>
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

          <button onClick={createAdmin}>Sign Up</button>
        </>
      );
    } else {
      return (
        <>
          <p>Please Select Your Account Type</p>
        </>
      );
    }
  }

  useEffect(() => {
    accountOptions();
  }, []);

  const handleUserCreation = () => {
    switch (selectedType) {
      case userType[0]:
        createRegularUser();
        break;
      case userType[1]:
        setErrNotif("Sorry, this account type is not available yet.");
        break;
      case userType[2]:
        setErrNotif("Sorry, this account type is not available yet.");
        break;
      default:
        setErrNotif("Please select an account type.");
        break;
    }
  };

  const createRegularUser = () => {
    if (usrNme === "" || pwrd === "" || retailReg === "" || emailAddr === "") {
      setErrNotif(
        "Some information is missing. Please ensure all fields are filled in."
      );
      return;
    }
    axiosJSONInst
      .post("/user/create/regular", {
        username: usrNme,
        email: emailAddr,
        password: pwrd,
        retail_region: retailReg,
      })
      .then((res) => {
        console.log(res);
        setErrNotif("Account Created");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setErrNotif(
            "An account with that username and email already exists. Please pick a different username or email and try again."
          );
        } else {
          setErrNotif(
            "Sorry, something went wrong.  Your account could not be made."
          );
        }

        setPwrd("");
      });
  };

  const createManufacturer = () => {
    axiosJSONInst.post("/user/create/manufacturer", {
      username: usrNme,
      email: emailAddr,
      password: pwrd,
      phone_no: phoneNo,
      name: nme,
      street: strt,
      city: cty,
      province: provTer,
      zip_code: zipCode,
    });
  };

  const createAdmin = () => {
    if (usrNme === "" || pwrd === "" || emailAddr === "") {
      setErrNotif(
        "Some information is missing. Please ensure all fields are filled in."
      );
      return;
    }
    axiosJSONInst
      .post("/user/create/administrator", {
        username: usrNme,
        email: emailAddr,
        password: pwrd,
        retail_region: "NA",
      })
      .then((res) => {
        console.log(res);
        setErrNotif("Account Created. Your unique ID is " + res.data.admin_id);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setErrNotif(
            "An account with that username and email already exists. Please pick a different username or email and try again."
          );
        } else {
          setErrNotif(
            "Sorry, something went wrong.  Your account could not be made."
          );
        }
        setPwrd("");
      });
  };

  return (
    <div id="contentPanel">
      <div className="authPanel">
        <h1>Sign Up</h1>
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
        {errNotif}
        <Link to="/login">Log in instead</Link>
      </div>
    </div>
  );
};

export default SignUp;
