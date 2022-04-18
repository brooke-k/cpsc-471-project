import React from "react";
import { useState, useEffect } from "react";
import axiosJSONInst from "../axios";
import AdminNavBar from "../components/AdminNavBar";
import DisplayAllProducts from "../components/DisplayAllProducts";
import "../styles/prodSearch.scss";
import { getCookie } from "../Cookies";
import RegularNavBar from "../components/RegularNavBar";
import ManufacturerNavBar from "../components/ManufacturerNavBar";

const ManageProducts = () => {
  const [currNav, setCurrNav] = useState(<></>);
  const [newName, setNewName] = useState("");
  const [newManufact, setNewManufact] = useState("");
  const [ingredients, setNewIngredients] = useState("");
  const [allergens, setNewAllergens] = useState("");
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

  const [actionNotif, setactionNotif] = useState("");
  const [productId, setProductID] = useState("");

  const handleProductID = (e) => {
    setProductID(e.target.value);
    setactionNotif("");
  };

  const handleNewName = (e) => {
    setNewName(e.target.value);
    setactionNotif("");
  };

  const handleNewManufact = (e) => {
    setNewManufact(e.target.value);
    setactionNotif("");
  };
  const handleIngredients = (e) => {
    setNewIngredients(e.target.value);
    setactionNotif("");
  };
  const handleAllergens = (e) => {
    setNewAllergens(e.target.value);
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

  function updateProduct() {
    if (productId === "") {
      setactionNotif("Please enter a product ID");
      return;
    }
    let updateString = "/product/update?product_id=" + productId;

    if (newName !== "") {
      updateString += "&name=";
      updateString += encodeURIComponent(newName);
    }
    if (newManufact !== "") {
      updateString += "&manufactName=";
      updateString += encodeURIComponent(newManufact);
    }
    if (ingredients !== "") {
      const allingreds = ingredients.split(";");
      for (let i = 0; i < allingreds.length; i++) {
        updateString += "&ingredients=";
        updateString += allingreds[i];
      }
    }
    if (allergens !== "") {
      const allAllerg = allergens.split(";");
      for (let i = 0; i < allAllerg.length; i++) {
        updateString += "&allergens=";
        updateString += allAllerg[i];
      }
    }

    axiosJSONInst
      .put(updateString)
      .then((res) => {
        console.log(res);
        setactionNotif("Successfully updated product.");
      })
      .catch((err) => {
        console.log(err);
        setactionNotif("Product was not successfully updated.");
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
            <div style={{ margin: "1rem", padding: "0" }}>
              <div id="inputRow">
                <label htmlFor="newName">New Product Name</label>
                <input
                  type="text"
                  placeholder="New Name"
                  name="newName"
                  value={newName}
                  onInput={handleNewName}
                ></input>
              </div>
            </div>
            <div style={{ margin: "1rem", padding: "0" }}>
              <div id="inputRow">
                <label htmlFor="newName">New Manufacturer Name</label>
                <input
                  type="text"
                  placeholder="New Name"
                  name="newManufact"
                  value={newManufact}
                  onInput={handleNewManufact}
                ></input>
              </div>
            </div>
            <div style={{ margin: "1rem", padding: "0" }}>
              <div id="inputRow">
                <label htmlFor="ingredients">New Product Ingredients</label>
                <input
                  type="text"
                  placeholder="Ingredients, separated with a semicolon (;)"
                  name="ingredients"
                  value={ingredients}
                  onInput={handleIngredients}
                ></input>
              </div>
            </div>
            <div style={{ margin: "1rem", padding: "0" }}>
              <div id="inputRow">
                <label htmlFor="allergens">New Product Allergens</label>
                <input
                  type="text"
                  placeholder="Allergens, separated with a semicolon (;)"
                  name="allergens"
                  value={allergens}
                  onInput={handleAllergens}
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
                <button onClick={updateProduct}>Update Product By ID</button>
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
