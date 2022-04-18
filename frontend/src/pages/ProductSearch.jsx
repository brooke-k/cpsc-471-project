import React, { useEffect, useState } from "react";
import "../styles/prodSearch.scss";
import axiosJSONInst from "../axios";
import { getCookie } from "../Cookies";
import RegularNavBar from "../components/RegularNavBar";
import ManufacturerNavBar from "../components/ManufacturerNavBar";
import AdminNavBar from "../components/AdminNavBar";

class regexAndStr {
  constructor(reg, str) {
    this.reg = reg;
    this.str = str;
  }
}

class productDispInfo {
  constructor(name, manufacturer, idNumber, allergens, ingredients) {
    this.name = name;
    this.manufacturer = manufacturer;
    this.idNumber = idNumber;
    this.allergens = allergens;
    this.ingredients = ingredients;
  }
}

const ProductSearch = () => {
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
  const notAllowedChars = /[^A-Z0-9- ]/;

  const [egg, setEgg] = useState(false);
  const [milk, setMilk] = useState(false);
  const [mustard, setMustard] = useState(false);
  const [peanut, setPeanut] = useState(false);
  const [crustacean, setCrustacean] = useState(false);
  const [mollusc, setMollusc] = useState(false);
  const [fish, setFish] = useState(false);
  const [sesame, setSesame] = useState(false);
  const [soy, setSoy] = useState(false);
  const [sulphite, setSulphite] = useState(false);
  const [nut, setNut] = useState(false);
  const [wheat, setWheat] = useState(false);
  const [triticale, setTriticale] = useState(false);
  const [gluten, setGluten] = useState(false);
  const [currIngred, setCurrIngredIn] = useState("");
  const [currAllerg, setCurrAllergIn] = useState("");
  const [errNotif, setErrNotif] = useState("");
  const [hideResults, setHideResults] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [isInclude, setIsInclude] = useState(false);
  const [ingredContains, setIngredContains] = useState([]);
  const [allergContains, setAllergContains] = useState([]);
  const [ingredNotContains, setIngredNotContains] = useState([]);
  const [allergNotContains, setAllergNotContains] = useState([]);
  const [productID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [productManufact, setProductManufact] = useState("");

  const handleEgg = (e) => {
    setEgg(!egg);
  };
  const handleMilk = (e) => {
    setMilk(!milk);
  };
  const handleMustard = (e) => {
    setMustard(!mustard);
  };
  const handlePeanut = (e) => {
    setPeanut(!peanut);
  };
  const handleCrustacean = (e) => {
    setCrustacean(!crustacean);
  };
  const handleMollusc = (e) => {
    setMollusc(!mollusc);
  };
  const handleFish = (e) => {
    setFish(!fish);
  };
  const handleSesame = (e) => {
    setSesame(!sesame);
  };
  const handleSoy = (e) => {
    setSoy(!soy);
  };
  const handleSulphite = (e) => {
    setSulphite(!sulphite);
  };
  const handleNut = (e) => {
    setNut(!nut);
  };
  const handleWheat = (e) => {
    setWheat(!wheat);
  };
  const handleTriticale = (e) => {
    setTriticale(!triticale);
  };
  const handleGluten = (e) => {
    setGluten(!gluten);
  };

  let topAllergens = [
    [encodeURIComponent("^EGG$"), egg, "Egg", handleEgg],
    [encodeURIComponent("^MILK$"), milk, "Milk", handleMilk],
    [encodeURIComponent("^MUSTARD$"), mustard, "Mustard", handleMustard],
    [encodeURIComponent("^PEANUT$"), peanut, "Peanut", handlePeanut],
    [
      encodeURIComponent("^CRUSTACEAN$"),
      crustacean,
      "Crustacean",
      handleCrustacean,
    ],
    [encodeURIComponent("^MOLLUSC$"), mollusc, "Mollusc", handleMollusc],
    [encodeURIComponent("^FISH$"), fish, "Fish", handleFish],
    [encodeURIComponent("^SESAME$"), sesame, "Sesame", handleSesame],
    [encodeURIComponent("^SOY$"), soy, "Soy", handleSoy],
    [encodeURIComponent("^SULPHITE$"), sulphite, "Sulphite", handleSulphite],
    [encodeURIComponent("^NUT$"), nut, "Nut", handleNut],
    [encodeURIComponent("^WHEAT$"), wheat, "Wheat", handleWheat],
    [
      encodeURIComponent("^TRITICALE$"),
      triticale,
      "Triticale",
      handleTriticale,
    ],
    [encodeURIComponent("^GLUTEN$"), gluten, "Gluten", handleGluten],
  ];

  const handleIsInclude = (e) => {
    setIsInclude(e.target.value);
  };

  const handleCurrIngred = (e) => {
    setCurrIngredIn(e.target.value);
  };

  const handleCurrAllerg = (e) => {
    setCurrAllergIn(e.target.value);
  };

  function resetInputs() {
    setCurrAllergIn("");
    setCurrIngredIn("");
    setProductID("");
    setProductManufact("");
    setProductName("");
    setIngredContains([]);
    setIngredNotContains([]);
    setAllergContains([]);
    setAllergNotContains([]);
    setEgg(false);
    setMilk(false);
    setMustard(false);
    setPeanut(false);
    setCrustacean(false);
    setMollusc(false);
    setFish(false);
    setSesame(false);
    setSoy(false);
    setSulphite(false);
    setNut(false);
    setWheat(false);
    setTriticale(false);
    setGluten(false);
    for (let i = 0; i < topAllergens.length; i++) {
      topAllergens[i][1] = false;
    }
  }

  function addContainsIngred() {
    if (currIngred === "") {
      return;
    }
    const newIngred = currIngred.toUpperCase();

    if (newIngred.match(notAllowedChars) !== null) {
      setErrNotif(
        "Ingredient name cannot contain characters other than letters, numbers, spaces, or hyphens."
      );
      return;
    }
    for (let i = 0; i < ingredContains.length; i++) {
      setErrNotif('"' + newIngred + '" has already been added.');
      if (newIngred.match(new RegExp("^" + ingredContains[i] + "$")) !== null) {
        return;
      }
    }
    for (let i = 0; i < topAllergens.length; i++) {
      if (
        topAllergens[i][1] &&
        newIngred.match(
          new RegExp("^" + topAllergens[i][2].toUpperCase() + "$")
        ) !== null
      ) {
        setErrNotif('"' + newIngred + '" has already been added.');
        return;
      }
    }

    const comboList = ingredContains.concat([newIngred]);
    setIngredContains(comboList);
    setErrNotif('Added "' + newIngred + '"');
    setCurrIngredIn("");
  }

  function addNotContainsIngred() {
    if (currIngred === "") {
      return;
    }
    const newIngred = currIngred.toUpperCase();

    if (newIngred.match(notAllowedChars) !== null) {
      setErrNotif(
        "Ingredient name cannot contain characters other than letters, numbers, spaces, or hyphens."
      );
      return;
    }
    for (let i = 0; i < ingredNotContains.length; i++) {
      setErrNotif('"' + newIngred + '" has already been added.');
      if (
        newIngred.match(new RegExp("^" + ingredNotContains[i] + "$")) !== null
      ) {
        return;
      }
    }
    for (let i = 0; i < topAllergens.length; i++) {
      if (
        topAllergens[i][1] &&
        newIngred.match(
          new RegExp("^" + topAllergens[i][2].toUpperCase() + "$")
        ) !== null
      ) {
        setErrNotif('"' + newIngred + '" has already been added.');
        return;
      }
    }

    const comboList = ingredNotContains.concat([newIngred]);
    setIngredNotContains(comboList);
    setErrNotif('Added "' + newIngred + '"');
    setCurrIngredIn("");
  }

  function addContainsAllergen() {
    if (currAllerg === "") {
      return;
    }
    const newIngred = currAllerg.toUpperCase();

    if (newIngred.match(notAllowedChars) !== null) {
      setErrNotif(
        "Allergen name cannot contain characters other than letters, numbers, spaces, or hyphens."
      );
      return;
    }
    for (let i = 0; i < allergContains.length; i++) {
      if (newIngred.match(new RegExp("^" + allergContains[i] + "$")) !== null) {
        setErrNotif('"' + newIngred + '" has already been added.');
        return;
      }
    }

    const comboList = allergContains.concat([newIngred]);
    setAllergContains(comboList);
    setErrNotif('Added "' + newIngred + '"');
    setCurrAllergIn("");
  }

  function addNotContainsAllergen() {
    if (currAllerg === "") {
      return;
    }
    const newIngred = currAllerg.toUpperCase();

    if (newIngred.match(notAllowedChars) !== null) {
      setErrNotif(
        "Allergen name cannot contain characters other than letters, numbers, spaces, or hyphens."
      );
      return;
    }
    for (let i = 0; i < allergNotContains.length; i++) {
      if (
        newIngred.match(new RegExp("^" + allergNotContains[i] + "$")) !== null
      ) {
        setErrNotif('"' + newIngred + '" has already been added.');
        return;
      }
    }
    for (let i = 0; i < topAllergens.length; i++) {
      if (
        topAllergens[i][1] &&
        newIngred.match(
          new RegExp("^" + topAllergens[i][2].toUpperCase() + "$")
        ) !== null
      ) {
        setErrNotif('"' + newIngred + '" has already been added.');
        return;
      }
    }
    const comboList = allergNotContains.concat([newIngred]);
    setAllergNotContains(comboList);
    setErrNotif('Added "' + newIngred + '"');
    setCurrAllergIn("");
  }

  function listIngredients(i) {
    if (typeof searchResult[i].ingredients === "undefined") {
      return "";
    }
    console.log(i);
    const displayString = JSON.stringify(searchResult[i].ingredients).replace(
      /\[|\]|"/g,
      ""
    );
    return displayString;
  }

  function listAllergens(i) {
    if (typeof searchResult[i].allergens === "undefined") {
      return "";
    }
    console.log(i);
    const displayString = JSON.stringify(searchResult[i].allergens).replace(
      /\[|\]|"/g,
      ""
    );
    return displayString;
  }

  function handleSearchNoCriteria() {
    var returnString = "ingredientList=";
    returnString += isInclude
      ? encodeURIComponent("^.*$")
      : encodeURIComponent("^[.]*$");
    let found = false;
    for (let i = 0; i < topAllergens.length; i++) {
      console.log(topAllergens[i][0]);
      if (topAllergens[i][1]) {
        returnString += "&allergenList=" + topAllergens[i][0];
        found = true;
      }
    }
    if (!found) {
      returnString += "&allergenList=";
      returnString += isInclude
        ? encodeURIComponent("^.*$")
        : encodeURIComponent("^[.]*$");
    }
    return returnString;
  }

  function handleSearch() {
    const matchAllArray = [encodeURIComponent("^.*$")];
    const matchNoneArray = [encodeURIComponent("^$")];
    const matchAllString = encodeURIComponent("^.*$");

    let searchString = "/product/search?product_id=";

    let isEmpty = true;

    if (productID === "") {
      searchString += matchAllString;
    } else {
      searchString += productID;
      isEmpty = false;
    }
    if (productName === "") {
      searchString += "&name=";
      searchString += matchAllString;
    } else {
      searchString += "&name=";
      searchString += productName;
      isEmpty = false;
    }
    if (productManufact === "") {
      searchString += "&manufacturer=";
      searchString += matchAllString;
    } else {
      searchString += "&manufacturer=";
      searchString += productManufact;
      isEmpty = false;
    }

    if (ingredContains.length === 0) {
      searchString += "&ingredientContains=";
      searchString += matchAllArray;
    } else {
      ingredContains.forEach((e) => {
        searchString += "&ingredientContains=";
        searchString += e;
        isEmpty = false;
      });
    }
    if (ingredNotContains.length === 0) {
      searchString += "&ingredientNotContains=";
      searchString += matchNoneArray;
    } else {
      ingredNotContains.forEach((e) => {
        searchString += "&ingredientNotContains=";
        searchString += e;
        isEmpty = false;
      });
    }
    let topAdded = false;
    topAllergens.forEach((e) => {
      if (e[1]) {
        topAdded = true;
        searchString += "&allergenNotContains=";
        searchString += e[0];
        isEmpty = false;
      }
    });

    if (allergNotContains.length === 0 && !topAdded) {
      searchString += "&allergenNotContains=";
      searchString += matchNoneArray;
    } else {
      allergNotContains.forEach((e) => {
        searchString += "&allergNotContains=";
        searchString += e;
        isEmpty = false;
      });
    }
    if (allergContains.length === 0) {
      searchString += "&allergenContains=";
      searchString += matchAllArray;
    } else {
      allergContains.forEach((e) => {
        searchString += "&allergenContains=";
        searchString += e;
        isEmpty = false;
      });
    }

    if (isEmpty) {
      setErrNotif("Please at least one search criteria");
      return;
    } else {
      setErrNotif("");
    }

    axiosJSONInst
      .get(searchString)
      .then((res) => {
        setSearchResult(JSON.parse(JSON.stringify(res.data)));
        setHideResults(false);
      })
      .catch((err) => console.log(err));
  }

  function handleSearchAll() {
    const matchAllArray = [encodeURIComponent("^.*$")];
    const matchNoneArray = [encodeURIComponent("^$")];
    const matchAllString = encodeURIComponent("^.*$");

    let searchString = "/product/search?product_id=";

    if (productID === "") {
      searchString += matchAllString;
    } else {
      searchString += productID;
    }
    if (productName === "") {
      searchString += "&name=";
      searchString += matchAllString;
    } else {
      searchString += "&name=";
      searchString += productName;
    }
    if (productManufact === "") {
      searchString += "&manufacturer=";
      searchString += matchAllString;
    } else {
      searchString += "&manufacturer=";
      searchString += productManufact;
    }

    if (ingredContains.length === 0) {
      searchString += "&ingredientContains=";
      searchString += matchAllArray;
    } else {
      ingredContains.forEach((e) => {
        searchString += "&ingredientContains=";
        searchString += e;
      });
    }
    if (ingredNotContains.length === 0) {
      searchString += "&ingredientNotContains=";
      searchString += matchNoneArray;
    } else {
      ingredNotContains.forEach((e) => {
        searchString += "&ingredientNotContains=";
        searchString += e;
      });
    }
    let topAdded = false;
    topAllergens.forEach((e) => {
      if (e[1]) {
        topAdded = true;
        searchString += "&allergenNotContains=";
        searchString += e[0];
      }
    });

    if (allergNotContains.length === 0 && !topAdded) {
      searchString += "&allergenNotContains=";
      searchString += matchNoneArray;
    } else {
      allergNotContains.forEach((e) => {
        searchString += "&allergNotContains=";
        searchString += e;
      });
    }
    if (allergContains.length === 0) {
      searchString += "&allergenContains=";
      searchString += matchAllArray;
    } else {
      allergContains.forEach((e) => {
        searchString += "&allergenContains=";
        searchString += e;
      });
    }

    axiosJSONInst
      .get(searchString)
      .then((res) => {
        setSearchResult(JSON.parse(JSON.stringify(res.data)));
        setHideResults(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div id="AppBase" style={{ padding: "2rem" }}>
      {currNav}
      <div id="pagePanel" styles={{ margin: "2rem" }}>
        <div
          id="pageContent"
          style={{ rowGap: "0", flexWrap: "nowrap", width: "inherit" }}
        >
          <h1 style={{ fontSize: "28pt", padding: "0", margin: "0" }}>
            Product Search
          </h1>
          <div
            id="inputRow"
            style={{
              justifyContent: "center",
              flexWrap: "nowrap",
            }}
          >
            <h3 style={{ flexShrink: 0, width: "minContent" }}>
              Exclude the
              <br />
              Selected Allergens:
            </h3>
            <div
              style={{
                margin: "0",
                padding: "0",
                display: "flex",
                height: "3rem",
                width: "inherit",
                flexFlow: "row",
                flexWrap: "wrap",
              }}
            >
              {topAllergens.map((e, i) => {
                return (
                  <div style={{ margin: "0 1.5ch 0 0", padding: "0" }} key={i}>
                    <label htmlFor={topAllergens[i][2]}>
                      {topAllergens[i][2]}
                    </label>
                    <input
                      type="checkbox"
                      name={topAllergens[i][2]}
                      value={topAllergens[i][1]}
                      onChange={topAllergens[i][3]}
                      checked={topAllergens[i][1]}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div
            id="inputRow"
            style={{
              borderStyle: "solid none none none",
              borderColor: "gainsboro",
            }}
          ></div>
          <div id="inputRow">
            <input
              id="prodName"
              value={currIngred}
              type="text"
              placeholder="Ingredient"
              onInput={handleCurrIngred}
              style={{ width: "25rem" }}
            ></input>
            <label htmlFor="prodName">Add Ingredient</label>
            <button onClick={addContainsIngred}>Add to "Contain"</button>
            <button onClick={addNotContainsIngred}>Add to "Exclude"</button>
          </div>
          <div id="inputRow">
            <input
              id="prodName"
              value={currAllerg}
              type="text"
              placeholder="Allergen"
              onInput={handleCurrAllerg}
              style={{ width: "25rem" }}
            ></input>
            <label htmlFor="prodName">Add Allergen</label>
            <button onClick={addContainsAllergen}>Add to "Include"</button>
            <button onClick={addNotContainsAllergen}>Add to "Exclude"</button>
          </div>
          <div id="inputRow">
            <input
              type="text"
              value={productName}
              placeholder="(Optional) Product Name"
              onChange={(e) => setProductName(e.target.value)}
            ></input>
          </div>
          <div id="inputRow">
            <input
              type="text"
              value={productManufact}
              placeholder="(Optional) Product Manufacturer"
              onChange={(e) => setProductManufact(e.target.value)}
            ></input>
          </div>
          <div id="inputRow" style={{ flexFlow: "row", display: "flex" }}>
            <input
              type="text"
              value={productID}
              placeholder="(Optional) Product ID"
              onChange={(e) => setProductID(e.target.value)}
            ></input>
          </div>
          <p style={{ fontSize: "16pt", color: "firebrick" }}>{errNotif}</p>
        </div>
        <div id="pageContent" style={{ flexFlow: "column" }}>
          <div id="inputGrid">
            <div
              style={{
                gridColumn: "1",
                gridRow: "1",
              }}
            >
              <p>Ingredients to Include</p>
              <ul>
                {ingredContains.map((e, i) => {
                  return <li key={i}>{ingredContains[i]}</li>;
                })}
              </ul>
            </div>
            <div
              style={{
                gridColumn: "1",
                gridRow: "2",
              }}
            >
              <p>Allergens to Include</p>
              <ul>
                {allergContains.map((e, i) => {
                  return <li key={i}>{allergContains[i]}</li>;
                })}
              </ul>
            </div>
            <div
              style={{
                gridColumn: "2",
                gridRow: "1",
              }}
            >
              <p>Ingredients to Exclude</p>
              <ul>
                {ingredNotContains.map((e, i) => {
                  return <li key={i}>{ingredNotContains[i]}</li>;
                })}
              </ul>
            </div>
            <div
              style={{
                gridColumn: "2",
                gridRow: "2",
              }}
            >
              <p>Allergens to Exclude</p>
              <ul>
                {allergNotContains.map((e, i) => {
                  return <li key={i}>{allergNotContains[i]}</li>;
                })}
                {topAllergens.map((e, i) => {
                  return topAllergens[i][1] ? (
                    <li
                      key={topAllergens[i][2]}
                      style={{ textTransform: "uppercase" }}
                    >
                      {topAllergens[i][2]}
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          </div>
          <div id="inputRow">
            <button
              style={{
                alignSelf: "center",
                width: "10rem",
                margin: "0 6rem 0 1rem",
              }}
              onClick={resetInputs}
            >
              Reset Inputs
            </button>
            <button
              onClick={handleSearchAll}
              style={{ alignSelf: "center", width: "15rem" }}
            >
              View All Products
            </button>
            <button
              onClick={handleSearch}
              style={{ alignSelf: "center", width: "15rem" }}
            >
              Search Matching Products
            </button>
          </div>
        </div>
      </div>
      <div hidden={hideResults} style={{ margin: "3rem 0 0 0", padding: "0" }}>
        <div
          id="pagePanel"
          style={{ margin: "0 0 0 0", height: "auto", minHeight: "30rem" }}
          hidden={hideResults}
        >
          <div
            id="pageContent"
            style={{
              gap: "0",
              textAlign: "left",
              justifyContent: "start",
              height: "auto",
            }}
          >
            <h1
              style={{ fontSize: "28pt", padding: "0", margin: "1rem 0 1rem" }}
            >
              Search Results
            </h1>{" "}
            <p style={{ fontStyle: "italic" }}>
              {searchResult.length} matching products were found
            </p>
            <table>
              <thead></thead>
              <tbody>
                <tr style={{ fontWeight: "600", background: "gainsboro" }}>
                  <td>Name</td>
                  <td>Allergens</td>
                  <td>Ingredients</td>
                  <td>Manufacturer</td>
                  <td>Product ID Number</td>
                </tr>
                {searchResult.map((e, i) => {
                  return (
                    <tr>
                      <td key={i * 4 + 0}>{searchResult[i].name}</td>
                      <td key={i * 4 + 1}>
                        {searchResult[i].allergens.map((f, j) => {
                          if (j === 0) {
                            return searchResult[i].allergens[j];
                          } else {
                            return ", " + searchResult[i].allergens[j];
                          }
                        })}
                      </td>
                      <td key={i * 4 + 2}>
                        {searchResult[i].ingredients.map((f, j) => {
                          if (j === 0) {
                            return searchResult[i].ingredients[j];
                          } else {
                            return ", " + searchResult[i].ingredients[j];
                          }
                        })}
                      </td>
                      <td key={i * 4 + 3}>
                        {searchResult[i].manufacturer_name}
                      </td>
                      <td key={i * 5 + 4}> {searchResult[i].id_number}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot></tfoot>
            </table>
            <p style={{ fontWeight: "600" }}>End of Results</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
