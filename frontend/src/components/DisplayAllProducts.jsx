import React from "react";
import { useState, useEffect } from "react";
import axiosJSONInst from "../axios";

const DisplayAllProducts = () => {
  const [manufacturerUsers, setManufacturerUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    if (!productsLoaded) {
      getAllProducts();
      setProductsLoaded(true);
    }
  }, []);

  function getAllProducts() {
    let requestString =
      "/product/search/productName?name=" + encodeURIComponent("^.*$");
    axiosJSONInst
      .get(requestString)
      .then((res) => {
        console.log(res);
        const returnString = JSON.stringify(res.data);
        console.log(returnString);
        setProductsList(JSON.parse(JSON.stringify(res.data)));
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div
        id="pagePanel"
        style={{
          margin: "1rem",
          height: "auto",
          flexGrow: "2",
          flexShrink: "1",
        }}
      >
        <div
          id="pageContent"
          style={{ flexFlow: "column nowrap", height: "inherit" }}
        >
          {/* <frameElement> */}
          <h2>All Products</h2>
          <button
            style={{ padding: "0.25rem" }}
            onClick={() => {
              getAllProducts();
              setProductsLoaded(true);
            }}
          >
            Refresh Product Information
          </button>
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td>Name</td>
                <td>Manufacturer Name</td>
                <td>ID Number</td>
                <td>Ingredients</td>
                <td>Allergens</td>
              </tr>
              {productsList.map((e, i) => {
                return (
                  <tr key={i}>
                    <td>{productsList[i].name}</td>
                    <td>{productsList[i].manufacturer_name}</td>
                    <td>{productsList[i].id_number}</td>
                    <td>
                      {productsList[i].ingredients.map((f, j) => {
                        if (j === 0) {
                          return productsList[i].ingredients[j];
                        } else {
                          return ", " + productsList[i].ingredients[j];
                        }
                      })}
                    </td>{" "}
                    <td>
                      {productsList[i].allergens.map((f, j) => {
                        if (j === 0) {
                          return productsList[i].allergens[j];
                        } else {
                          return ", " + productsList[i].allergens[j];
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
    </>
  );
};

export default DisplayAllProducts;
