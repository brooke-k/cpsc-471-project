import React from "react";
import { useState, useEffect } from "react";
import { getCookie, banishCookie } from "../Cookies";
import RegularNavBar from "../components/RegularNavBar";
import ManufacturerNavBar from "../components/ManufacturerNavBar";
import AdminNavBar from "../components/AdminNavBar";
import { useNavigate } from "react-router-dom";
import axiosJSONInst from "../axios";

const ManufacturerProfile = () => {
  const [currNav, setCurrNav] = useState(<></>);
  useEffect(() => {
    checkNavbar();
    getProfileInfo();
  }, []);
  const navigate = useNavigate();
  function checkNavbar() {
    return getCookie("access_level") === "regular"
      ? setCurrNav(<RegularNavBar />)
      : getCookie("access_level") === "manufacturer"
      ? setCurrNav(<ManufacturerNavBar />)
      : getCookie("access_level") === "admin"
      ? setCurrNav(<AdminNavBar />)
      : setCurrNav(<></>);
  }

  const [usrname, setUsrname] = useState("");
  const [emailAddr, setEmailAddr] = useState("");
  const [passwrd, setPasswrd] = useState("");
  const [retailReg, setRetailReg] = useState("");
  const [infoDisplay, setInfoDisplay] = useState(<></>);
  const [deleteNotif, setDeleteNotif] = useState("");

  const [confirmUsrnme, setConfirmUsrnme] = useState("");
  const [confirmPasswrd, setComfirmPasswrd] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [currentlyDeleting, setCurrentlyDeleting] = useState(false);

  const handleConfirmUsername = (e) => {
    setConfirmUsrnme(e.target.value);
  };

  const handleConfirmPasswrd = (e) => {
    setComfirmPasswrd(e.target.value);
  };

  const handleConfirmEmail = (e) => {
    setConfirmEmail(e.target.value);
  };

  function getProfileInfo() {
    const user_mail = getCookie("username_email").split("_");
    setEmailAddr(user_mail[1]);
    console.log(user_mail[0]);
    axiosJSONInst
      .get(
        "/user/getInfo/manufacturer?username=" +
          user_mail[0] +
          "&email=" +
          user_mail[1]
      )
      .then((res) => {
        setUsrname(res.data.username);
        setEmailAddr(res.data.email);
        setRetailReg(res.data.retail_region);
        setInfoDisplay(
          <div
            style={{
              width: "minContent",
              margin: "0.25rem",
              justifySelf: "center",
              alignSelf: "center",
              padding: "0",
            }}
          >
            <p>Name: {res.data.name}</p>
            <p>Username: {res.data.username}</p>
            <p>Email Address: {res.data.email}</p>
            <p>Phone Number: {res.data.phone_no}</p>
            <p>
              Address: {res.data.street}, {res.data.city}, {res.data.province},
              Canada
            </p>
            <p>Zip Code: {res.data.zip_code}</p>
          </div>
        );
      })
      .catch((err) => {
        setUsrname("N/A");
        setEmailAddr("N/A");
        setRetailReg("N/A");
        console.log(err);
        setInfoDisplay(
          <div
            style={{
              width: "minContent",
              margin: "0.25rem",
              justifySelf: "center",
              alignSelf: "center",
              padding: "0",
            }}
          >
            <p>Name: {"N/A"}</p>
            <p>Username: {"N/A"}</p>
            <p>Email Address: {"N/A"}</p>
            <p>Phone Number: {"N/A"}</p>
            <p>Address: {"N/A"}</p>
            <p>Zip Code: {"N/A"}</p>
          </div>
        );
      });
  }

  function deleteAccount() {
    if (confirmEmail === "" || confirmPasswrd === "" || confirmUsrnme === "") {
      setDeleteNotif("Some information is missing. Account was not deleted.");
      return;
    }
    axiosJSONInst
      .get(
        "/user/verify/manufacturer?username=" +
          encodeURIComponent(confirmUsrnme) +
          "&email=" +
          encodeURIComponent(confirmEmail) +
          "&password=" +
          encodeURIComponent(confirmPasswrd)
      )
      .then((res) => {
        if (res.status !== 200) {
          setDeleteNotif(
            "An error occurred during the verification process. Account not deleted."
          );
          return;
        } else {
          console.log("Account verified. Continuing deletion.");
          axiosJSONInst
            .delete(
              "/user/remove?username=" +
                encodeURIComponent(confirmUsrnme) +
                "&email=" +
                encodeURIComponent(confirmEmail) +
                "&password=" +
                encodeURIComponent(confirmPasswrd)
            )
            .then((res) => {
              setDeleteNotif("Account successfully deleted.");
              banishCookie();
              navigate("/post_delete");
            })
            .catch((err) => {
              console.log(err);
              setDeleteNotif(
                "Something went wrong during the deletion process. Please contact an Allergy Manager administrator."
              );
              banishCookie();
              navigate("/");
            });
        }
      })
      .catch((err) => {
        console.log(err);
        setDeleteNotif("Username, password, or email is incorrect.");
        return;
      });
  }
  return (
    <>
      {currNav}
      <div id="pagePanel">
        <div id="pageContent" style={{ width: "minContent" }}>
          <h1>Manufacturer Profile</h1>
        </div>
        <div
          id="pageContent"
          style={{
            justifyContent: "center",
            justifyItems: "center",
            rowGap: "0rem",
          }}
        >
          <h3 style={{ margin: "0" }}>Account Information:</h3>
          <div>{infoDisplay}</div>
        </div>
        <div
          id="pageContent"
          style={{
            width: "minContent",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <button
            hidden={currentlyDeleting}
            onClick={() => setCurrentlyDeleting(true)}
          >
            Delete Account
          </button>
          <div hidden={!currentlyDeleting}>
            <div id="inputRow" style={{ margin: "1rem 0rem" }}>
              <input
                type="text"
                value={confirmUsrnme}
                placeholder="Confirm Username"
                onInput={handleConfirmUsername}
              ></input>
            </div>
            <div id="inputRow" style={{ margin: "1rem 0rem" }}>
              <input
                type="email"
                value={confirmEmail}
                placeholder="Confirm Email"
                onInput={handleConfirmEmail}
              ></input>{" "}
            </div>
            <div id="inputRow" style={{ margin: "1rem 0rem" }}>
              <input
                type="password"
                value={confirmPasswrd}
                placeholder="Confirm Password"
                onInput={handleConfirmPasswrd}
              ></input>
            </div>
            <div id="inputRow" style={{ margin: "1rem 0rem" }}>
              <button
                onClick={() => setCurrentlyDeleting(false)}
                style={{ margin: "0" }}
              >
                Cancel
              </button>
              <button onClick={deleteAccount}>
                Permanently Delete Account
              </button>
            </div>
            <div id="inputRow" style={{ margin: "1rem 0rem" }}>
              <h4>{deleteNotif}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManufacturerProfile;
