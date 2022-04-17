import React from "react";
import { useState, useEffect } from "react";
import AdminNavBar from "../components/AdminNavBar";
import DisplayAllProducts from "../components/DisplayAllProducts";

const ManageProducts = () => {
  const [actionNotif, setactionNotif] = useState("");
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
            <div id="inputRow" style={{ justifyContent: "center" }}></div>
          </div>
          <div style={{ margin: "1rem", padding: "0" }}></div>
          <div
            style={{ margin: "1rem", padding: "0" }}
            // hidden={updateOption === "updateEmail"}
          >
            <div
              id="inputRow"
              style={{
                width: "100%",
                justifyContent: "center",
                justifyItems: "center",
              }}
            ></div>
            <div
              // hidden={updateOption === "updateUsername" ? true : false}
              style={{ margin: "1rem", padding: "0" }}
            ></div>
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
        <DisplayAllProducts />
      </div>
    </>
  );
};

export default ManageProducts;
