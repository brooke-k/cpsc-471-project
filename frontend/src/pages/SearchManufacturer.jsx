import React from "react";
import { useState, useEffect } from "react";
import { getCookie } from "../Cookies";
import RegularNavBar from "../components/RegularNavBar";
import ManufacturerNavBar from "../components/ManufacturerNavBar";
import AdminNavBar from "../components/AdminNavBar";
import axiosJSONInst from "../axios";
import axios from "axios";

const SearchManufacturer = () => {
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
  const [searchName, setSearchName] = useState("");
  const [searchUsrnme, setSearchUsrnme] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchManuResult, setSearchManuresult] = useState([]);
  const [searchProdResult, setSearchProdResult] = useState([]);
  const [fullResult, setFullResult] = useState([]);
  const [errNotif, setErrNotif] = useState("");
  const [searchAll, setSearchAll] = useState(false);

  function searchManufacturerName() {
    setSearchAll(false);

    if (searchName === "") {
      setErrNotif("Please provide a manufacturer name to search.");
      return;
    }
    axiosJSONInst
      .get("/user/manufacturer/search?name=" + searchName)
      .then((res) => {
        setSearchManuresult(JSON.parse(JSON.stringify(res.data)));
        if (JSON.parse(JSON.stringify(res.data)).length === 0) {
          setErrNotif("A manufacturer with that name couldn't be found.");
          return;
        }
        axiosJSONInst
          .get("/product/search/byManufacturerName?name=" + searchName)
          .then((secres) => {
            setFullResult([
              {
                manufacturer: JSON.parse(JSON.stringify(res.data)),
                products: JSON.parse(JSON.stringify(secres.data)),
              },
            ]);
          })
          .catch((err) => {
            console.log(err);
            setFullResult([
              {
                manufacturer: searchManuResult,
                products: [],
              },
            ]);
          });
      })
      .catch((err) => {
        setErrNotif("A manufacturer with that name couldn't be found.");
        console.log(err);
      });
    setErrNotif("");
  }
  function searchManufacturerUsername() {
    setSearchAll(false);
    if (searchUsrnme === "") {
      setErrNotif("Please provide a manufacturer username to search.");
      return;
    }
    axiosJSONInst
      .get("/user/manufacturer/search?username=" + searchUsrnme)
      .then((res) => {
        setSearchManuresult(JSON.parse(JSON.stringify(res.data)));
        if (JSON.parse(JSON.stringify(res.data)).length === 0) {
          setErrNotif("A manufacturer with that name couldn't be found.");
          return;
        }
        axiosJSONInst
          .get(
            "/product/search/byManufacturerName?name=" +
              JSON.parse(JSON.stringify(res.data))[0].name
          )
          .then((secres) => {
            setFullResult([
              {
                manufacturer: JSON.parse(JSON.stringify(res.data)),
                products: JSON.parse(JSON.stringify(secres.data)),
              },
            ]);
          })
          .catch((err) => {
            console.log(err);
            setFullResult([
              {
                manufacturer: searchManuResult,
                products: [],
              },
            ]);
          });
      })
      .catch((err) => {
        setErrNotif("A manufacturer with that username couldn't be found.");
        console.log(err);
      });
  }
  function searchManufacturerEmail() {
    setSearchAll(false);

    if (searchEmail === "") {
      setErrNotif("Please provide a manufacturer email to search.");
      return;
    }
    axiosJSONInst
      .get("/user/manufacturer/search?email=" + searchEmail)
      .then((res) => {
        setSearchManuresult(JSON.parse(JSON.stringify(res.data)));
        if (JSON.parse(JSON.stringify(res.data)).length === 0) {
          setErrNotif("A manufacturer with that name couldn't be found.");
          return;
        }
        axiosJSONInst
          .get(
            "/product/search/byManufacturerName?name=" +
              JSON.parse(JSON.stringify(res.data))[0].name
          )
          .then((secres) => {
            setFullResult([
              {
                manufacturer: JSON.parse(JSON.stringify(res.data)),
                products: JSON.parse(JSON.stringify(secres.data)),
              },
            ]);
          })
          .catch((err) => {
            console.log(err);
            setFullResult([
              {
                manufacturer: searchManuResult,
                products: [],
              },
            ]);
          });
      })
      .catch((err) => {
        setErrNotif("A manufacturer with that email couldn't be found.");
        console.log(err);
      });
  }
  function searchAllManufacturers() {
    setSearchAll(true);
    let tempFull = [];
    axiosJSONInst.get("/user/get/allManufacturer").then((res) => {
      const tempData = JSON.parse(JSON.stringify(res.data));
      tempData.forEach((e) => {
        axiosJSONInst
          .get("/product/search/byManufacturerName?name=" + e.name)
          .then((secres) => {
            let tempAppend = tempFull.concat([
              {
                manufacturer: e,
                products: JSON.parse(JSON.stringify(secres.data)),
              },
            ]);
            tempFull = tempAppend;
            setFullResult(tempFull);
          });
      });
    });
  }
  return (
    <>
      {currNav}
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
                fontSize: "32pt",
                margin: "0",
                padding: "0",
              }}
            >
              Search manufacturers
            </h1>
            <div id="inputRow">
              <h4
                style={{
                  minHeight: "2rem",
                  color: "firebrick",
                  alignItems: "center",
                  verticalAlign: "center",
                  padding: "0",
                  margin: "0.5rem 0 0 0",
                }}
              >
                {errNotif}
              </h4>
            </div>
            <div id="inputRow" style={{ justifyContent: "start" }}>
              <label
                htmlFor="searchName"
                style={{ width: "20rem", textAlign: "left" }}
              >
                Search for manufacturer by name
              </label>
              <input
                type="text"
                value={searchName}
                onInput={(e) => setSearchName(e.target.value)}
                name="searchName"
                placeholder="Manufacturer Name"
                style={{ width: "15rem" }}
              ></input>
              <button onClick={searchManufacturerName}>Search</button>
            </div>
            <div id="inputRow" style={{ justifyContent: "start" }}>
              <label
                htmlFor="searchUsrnme"
                style={{ width: "20rem", textAlign: "left" }}
              >
                Search for manufacturer by username
              </label>
              <input
                type="text"
                value={searchUsrnme}
                onInput={(e) => setSearchUsrnme(e.target.value)}
                name="searchUsrnme"
                placeholder="Manufacturer Username"
                style={{ width: "15rem" }}
              ></input>
              <button onClick={searchManufacturerUsername}>Search</button>
            </div>
            <div id="inputRow" style={{ justifyContent: "start" }}>
              <label
                htmlFor="searchEmail"
                style={{ width: "20rem", textAlign: "left" }}
              >
                Search for manufacturer by email address
              </label>
              <input
                type="text"
                value={searchEmail}
                onInput={(e) => setSearchEmail(e.target.value)}
                name="searchEmail"
                placeholder="Manufacturer Email"
                style={{ width: "15rem" }}
              ></input>
              <button onClick={searchManufacturerEmail}>Search</button>
            </div>
            <div id="inputRow">
              <button onClick={searchAllManufacturers}>
                View All Manufacturers
              </button>
            </div>
          </div>
        </div>
        <div style={{}} hidden={fullResult.length < 1}>
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
                  margin: "0",
                  padding: "0",
                  fontWeight: "500",
                }}
              >
                Search Results
              </h1>
              <div style={{ margin: "0", padding: "0" }} hidden={searchAll}>
                <table>
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>Username</td>
                      <td>Email</td>
                      <td>Address</td>
                      <td>Phone Number</td>
                      <td>Listed Products</td>
                    </tr>
                    {fullResult.map((e, i) => {
                      if (
                        typeof fullResult[i].manufacturer[0] === "undefined"
                      ) {
                        return <></>;
                      }
                      return (
                        <tr key={i}>
                          <td>{fullResult[i].manufacturer[0].name}</td>{" "}
                          <td>{fullResult[i].manufacturer[0].username}</td>{" "}
                          <td>{fullResult[i].manufacturer[0].email}</td>{" "}
                          <td>
                            {fullResult[i].manufacturer[0].street},{" "}
                            {fullResult[i].manufacturer[0].city},{" "}
                            {fullResult[i].manufacturer[0].province}, Canada{" "}
                            {"  "} {fullResult[i].manufacturer[0].zip_code}
                          </td>{" "}
                          <td>{fullResult[i].manufacturer[0].phone_no}</td>
                          <td>
                            {fullResult[i].products.map((f, j) => {
                              if (j === 0) {
                                return (
                                  '"' + fullResult[i].products[j].name + '"'
                                );
                              } else {
                                return (
                                  ', "' + fullResult[i].products[j].name + '"'
                                );
                              }
                            })}
                          </td>
                        </tr>
                      );
                    })}
                    <tr></tr>
                  </tbody>
                  <tfoot></tfoot>
                </table>
              </div>
              <div style={{ margin: "0", padding: "0" }} hidden={!searchAll}>
                <table>
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td>NAME</td>
                      <td>Username</td>
                      <td>Email</td>
                      <td>Address</td>
                      <td>Phone Number</td>
                      <td>Listed Products</td>
                    </tr>
                    {fullResult.map((e, b) => {
                      return (
                        <tr key={b}>
                          <td>{fullResult[b].manufacturer.name}</td>
                          <td>{fullResult[b].manufacturer.username}</td>
                          <td>{fullResult[b].manufacturer.email}</td>
                          <td>
                            {fullResult[b].manufacturer.street},
                            {fullResult[b].manufacturer.city},
                            {fullResult[b].manufacturer.province}, Canada
                            {fullResult[b].manufacturer.zip_code}
                          </td>
                          <td>{fullResult[b].manufacturer.phone_no}</td>
                          <td>
                            {fullResult[b].products.map((f, h) => {
                              if (h === 0) {
                                return (
                                  '"' + fullResult[b].products[h].name + '"'
                                );
                              } else {
                                return (
                                  ', "' + fullResult[b].products[h].name + '"'
                                );
                              }
                            })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot></tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchManufacturer;
