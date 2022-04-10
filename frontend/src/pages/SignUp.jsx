import React, { useEffect, useState, Dispatch } from "react";
import axiosJSONInst from "../axios";
import { ProvTer } from "../components/constant/Provinces-Territories";
import { RetailRegion } from "../components/constant/RetailRegions";

const SignUp = () => {
  const userType = ["Individual", "Manufacturer", "Administrator"];

  const [usrNme, setUsrNme] = useState(""); // Username
  const [nme, setNme] = useState(""); // Name (Actual first name, not username)
  const [pwrd, setPwrd] = useState(""); // Password
  const [retailReg, setRetailReg] = useState(""); // Retail region
  const [errNotif, setErrNotif] = useState("");
  const [emailAddr, setEmailAddr] = useState(""); // User's password
  const [selectedType, setSelectedType] = useState(userType[0]);
  const [admID, setAdmID] = useState("");
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
        <div>
          <div>
            <div>
              <label htmlFor="usrNme">Username</label>
              <input
                type="text"
                placeholder="Username"
                value={usrNme}
                onChange={handleUsername}
                id="usrNme"
              />
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                placeholder="Email"
                value={emailAddr}
                onChange={handleEmail}
                id="email"
              />
            </div>
            <div>
              <label htmlFor="pwrd">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={pwrd}
                onChange={handlePassword}
                id="pwrd"
              />
            </div>
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
          </div>
          <button onClick={createRegularUser}>Sign Up</button>
        </div>
      );
    } else if (selectedType === userType[1]) {
      return (
        <div>
          <div>
            <label htmlFor="nme">Manufacturer Name</label>
            <input
              type="text"
              placeholder="Name"
              value={nme}
              onChange={handleName}
              id="nme"
            />
            <div>
              <label htmlFor="usrNme">Username</label>
              <input
                type="text"
                placeholder="Username"
                value={usrNme}
                onChange={handleUsername}
                id="usrNme"
              />
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                placeholder="Email"
                value={emailAddr}
                onChange={handleEmail}
                id="email"
              />
            </div>
            <div>
              <label htmlFor="phoneNo">Phone Number</label>
              <input
                type="phoneNo"
                placeholder="Phone Number"
                value={phoneNo}
                onChange={handlePhone}
                id="phoneNo"
              />
            </div>
            <div>
              <label htmlFor="pwrd">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={pwrd}
                onChange={handlePassword}
                id="pwrd"
              />
            </div>
          </div>
          <div>
            <label htmlFor="street">Headquarters Address</label>
            <input
              id="street"
              value={strt}
              placeholder="Street Number"
              onChange={handleStreet}
              type="text"
            />
          </div>
          <div>
            <input
              id="city"
              value={cty}
              placeholder="City"
              onChange={handleCity}
              type="text"
            />
          </div>
          <div>
            <select id="province" onChange={handleProvince}>
              {ProvTer.map((e, i) => {
                return (
                  <option key={i} value={ProvTer[i]}>
                    {ProvTer[i]}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <input
              id="zipCode"
              value={zipCode}
              placeholder="Zip Code"
              onChange={handleZip}
              type="text"
            />
          </div>
          <button onClick={createManufacturer}>Sign Up</button>
        </div>
      );
    } else if (selectedType === userType[2]) {
      return (
        <div>
          <div>
            <label htmlFor="usrNme">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={usrNme}
              onChange={handleUsername}
              id="usrNme"
            />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              placeholder="Email"
              value={emailAddr}
              onChange={handleEmail}
              id="email"
            />
          </div>
          <div>
            <label htmlFor="pwrd">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={pwrd}
              onChange={handlePassword}
              id="pwrd"
            />
          </div>
          <button onClick={handleUserCreation}>Sign Up</button>
        </div>
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

  return (
    <div>
      <h1>Sign Up</h1>
      <p>{strt}</p>
      <div>
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
      </div>
      {accountOptions()}
      {errNotif}
    </div>
  );
};

export default SignUp;
