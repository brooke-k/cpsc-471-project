import React from "react";
import { getCookie } from "../Cookies";
import { useState, useEffect } from "react";
import RegularNavBar from "../components/RegularNavBar";
import ManufacturerNavBar from "../components/ManufacturerNavBar";
import AdminNavBar from "../components/AdminNavBar";
import DisplayUser from "../components/DisplayUser";

const ManageUsers = () => {
  const [currentUsername, setCurrentUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [currentEmail, setcurrentEmail] = useState("");
  const [newEmail, setnewEmail] = useState("");
  const [updateOption, setupdateOption] = useState("updateUsername");
  const [actionNotif, setactionNotif] = useState("");
  const [currNav, setCurrNav] = useState(<></>);
  useEffect(() => {
    checkNavbar();
  }, []);
  function checkNavbar() {
    return getCookie("access_level") === "regular"
      ? setCurrNav(<RegularNavBar />)
      : getCookie("access_level") === "manufacturer"
      ? setCurrNav(<ManufacturerNavBar />)
      : getCookie("access_level") === "admin"
      ? setCurrNav(<AdminNavBar />)
      : setCurrNav(<></>);
  }
  const handleUpdateOption = (e) => {
    setupdateOption(e.target.value);
  };

  const handleActionNotif = (e) => {
    setactionNotif(e);
  };

  return (
    <>
      <AdminNavBar />
      <div
        id="AppBase"
        style={{
          flexDirection: "row",
          width: "auto",
          left: "0",
          right: "auto",
          padding: "4rem",
          height: "fitContent",
          top: "0",
          bottom: "auto",
        }}
      >
        <div
          id="pagePanel"
          style={{
            margin: "1rem",
            flexGrow: "1",
            flexShrink: "2",
            height: "auto",
          }}
        >
          <div
            id="pageContent"
            style={{
              height: "inherit",
              justifyContent: "start",
              justifyItems: "center",
              alignContent: "center",
              gap: "0.5rem",
            }}
          >
            <h1
              style={{
                fontSize: "18pt",
                height: "minContent",
                margin: "0rem",
                padding: "0",
                width: "minContent",
              }}
            >
              Update User <br></br>Information
            </h1>
            <div id="inputRow" style={{ justifyContent: "center" }}>
              <label htmlFor="updateOption">Data to Update</label>
              <select name="updateOption" onChange={handleUpdateOption}>
                <option value="updateUsername">Update Username</option>
                <option value="updateEmail">Update Email</option>
              </select>
            </div>
            <div style={{ margin: "1rem", padding: "0" }}>
              <div
                id="inputRow"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  justifyItems: "center",
                }}
              >
                <label htmlFor="currentUsername">User's Current Username</label>
                <input
                  style={{
                    width: "70%",
                    alignSelf: "center",
                    justifySelf: "center",
                  }}
                  type="text"
                  value={currentUsername}
                  placeholder="Username"
                  name="currentUsername"
                  onChange={(e) => setCurrentUsername(e.target.value)}
                ></input>
              </div>
            </div>
            <div style={{ margin: "1rem", padding: "0" }}>
              <div
                id="inputRow"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  justifyItems: "center",
                }}
              >
                <label
                  htmlFor="currentEmail"
                  style={{ padding: "0", margin: "0" }}
                >
                  User's Current Email
                </label>
                <input
                  style={{
                    width: "70%",
                    alignSelf: "center",
                    justifySelf: "center",
                  }}
                  type="text"
                  value={currentEmail}
                  placeholder="Email"
                  name="currentEmail"
                  onChange={(e) => setcurrentEmail(e.target.value)}
                ></input>
              </div>
            </div>
            <div
              style={{ margin: "1rem", padding: "0" }}
              hidden={updateOption === "updateEmail"}
            >
              <div
                id="inputRow"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  justifyItems: "center",
                }}
              >
                <label htmlFor="currentUsername">User's New Username</label>
                <input
                  style={{
                    width: "70%",
                    alignSelf: "center",
                    justifySelf: "center",
                  }}
                  type="text"
                  value={newUsername}
                  placeholder="Username"
                  name="currentUsername"
                  onChange={(e) => setNewUsername(e.target.value)}
                ></input>
              </div>
            </div>
            <div
              hidden={updateOption === "updateUsername" ? true : false}
              style={{ margin: "1rem", padding: "0" }}
            >
              <div
                id="inputRow"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  justifyItems: "center",
                }}
              >
                <label htmlFor="newEmail">User's New Email</label>
                <input
                  style={{
                    width: "70%",
                    alignSelf: "center",
                    justifySelf: "center",
                  }}
                  type="text"
                  value={newEmail}
                  placeholder="Email"
                  name="newEmail"
                ></input>
              </div>
            </div>
            <div
              id="inputRow"
              style={{
                width: "100%",
                justifyContent: "center",
                justifyItems: "center",
              }}
            >
              <button>Update User Information</button>
              <h2>{actionNotif}</h2>
            </div>
          </div>
        </div>
        <DisplayUser displayAll={true} type={"regular"} />
      </div>
    </>
  );
};

export default ManageUsers;
