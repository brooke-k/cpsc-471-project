import React from "react";
import { useState, useEffect } from "react";
import axiosJSONInst from "../axios";
import AdminNavBar from "../components/AdminNavBar";
import DisplayAllProducts from "../components/DisplayAllProducts";
import "../styles/prodSearch.scss";

const ManageProducts = () => {
  const [actionNotif, setactionNotif] = useState("");
  const [productId, setProductID] = useState("");

  const handleProductID = (e) => {
    setProductID(e.target.value);
    setactionNotif("");
  };

  function deleteProduct() {
    if (productId === "") {
      setactionNotif("Please enter a product ID");
      return;
    }
    const delString = "/product/remove?product_id=" + productId;
    axiosJSONInst
      .delete(delString)
      .then((res) => {
        console.log(res);
        setactionNotif("Successfully deleted product");
      })
      .catch((err) => {
        console.log(err);
        setactionNotif(
          'Error: Product with ID "' + productId + '" could not be deleted.'
        );
      });
  }

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
              Update Product <br></br>Information
            </h1>
            <div style={{ margin: "1rem", padding: "0" }}>
              <div id="inputRow">
                <label htmlFor="productID">Product ID</label>
                <input
                  type="text"
                  placeholder="ID Number"
                  name="productID"
                  value={productId}
                  onInput={handleProductID}
                ></input>
              </div>
            </div>
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
                <button onClick={deleteProduct}>Delete Product By ID</button>
              </div>
              <div id="inputRow">
                <h3>{actionNotif}</h3>
              </div>
            </div>
          </div>
        </div>
        <DisplayAllProducts />
      </div>
    </>
  );
};

export default ManageProducts;
