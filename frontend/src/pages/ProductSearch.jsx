import React, { useState } from "react";
import "../styles/prodSearch.scss";
import axiosJSONInst from "../axios";

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
  const [ingredList, setIngredList] = useState([]);
  const [allergList, setAllergList] = useState([]);

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

  const topAllergens = [
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

  function addIngredient() {
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
    for (let i = 0; i < ingredList.length; i++) {
      setErrNotif('"' + newIngred + '" has already been added.');
      if (newIngred.match(new RegExp("^" + ingredList[i] + "$")) !== null) {
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

    const comboList = ingredList.concat([newIngred]);
    setIngredList(comboList);
    setErrNotif('Added "' + newIngred + '"');
    setCurrIngredIn("");
  }

  function addAllergen() {
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
    for (let i = 0; i < allergList.length; i++) {
      if (newIngred.match(new RegExp("^" + allergList[i] + "$")) !== null) {
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
    const comboList = allergList.concat([newIngred]);
    setAllergList(comboList);
    setErrNotif('Added "' + newIngred + '"');
    setCurrAllergIn("");
  }

  function handleSearchAllergensOnly() {
    var returnString = "allergenList=";
    returnString += allergList[0];
    for (let i = 1; i < allergList.length; i++) {
      returnString += "&allergenList=" + allergList[i];
    }
    for (let i = 0; i < topAllergens.length; i++) {
      if (topAllergens[i][1]) {
        returnString += "&allergenList=" + topAllergens[i][0];
      }
    }
    returnString += "&ingredientList=";
    return returnString;
  }

  function handleSearchIngredientsOnly() {
    var returnString = "ingredientList=";
    returnString += ingredList[0];
    for (let i = 1; i < ingredList.length; i++) {
      returnString += "&ingredientList=" + ingredList[i];
    }
    var found = false;
    for (let i = 0; i < topAllergens.length; i++) {
      if (topAllergens[i][1]) {
        returnString += "&allergenList=" + topAllergens[i][0];
        found = true;
      }
    }
    returnString += "&allergenList=";

    return returnString;
  }

  function handleSearchIngredAndAllerg() {
    var returnString = "ingredientList=";
    returnString += ingredList[0];
    for (let i = 1; i < ingredList.length; i++) {
      returnString += "&ingredientList=" + ingredList[i];
    }
    for (let i = 0; i < allergList.length; i++) {
      returnString += "&allergenList=" + allergList[i];
    }

    for (let i = 0; i < topAllergens.length; i++) {
      if (topAllergens[i][1]) {
        returnString += "&allergenList=" + topAllergens[i][0];
      }
    }
    return returnString;
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

  const handleRes = (e) => {
    console.log(e);
    const oy = JSON.parse(e);
    const newDispInf = new productDispInfo(
      oy["name"],
      oy["manufacturer_name"],
      oy["id_number"],
      oy["allergens"],
      oy["ingredients"]
    );
    const comboList = searchResult.concat([newDispInf]);
    setSearchResult(comboList);
    if (searchResult.length > 0)
      console.log("handled" + searchResult[searchResult.length - 1].name);
  };

  const handleSearch = () => {
    var searchString = isInclude
      ? "/product/search/allergens_ingredients/contains?"
      : "/product/search/allergens_ingredients/notContains?";
    if (ingredList.length > 0 || allergList.length > 0) {
      if (ingredList.length > 0) {
        searchString += handleSearchIngredientsOnly();
      } else if (allergList.length > 0) {
        searchString += handleSearchAllergensOnly();
      } else {
        searchString += handleSearchIngredAndAllerg();
      }
    } else {
      searchString += handleSearchNoCriteria();
    }

    axiosJSONInst
      .get(searchString)
      .then((res) => {
        setSearchResult([res.data.length]);
        for (let i = 0; i < res.data.length; i++) {
          let temp = res.data[i];
          let tempStr = JSON.stringify(temp);
          let tempObj = JSON.parse(tempStr);
          let tempArr = searchResult;
          tempArr[i] = tempObj;
          setSearchResult(tempArr);
          handleRes(JSON.stringify(res.data[i]));
        }
      })
      .catch((err) => console.log(err));
    setHideResults(false);
  };

  return (
    <>
      <div id="pagePanel" styles={{ margin: "0rem" }}>
        <div id="pageContent" style={{ rowGap: "0" }}>
          <h1 style={{ fontSize: "32pt" }}>Product Search</h1>{" "}
          <div
            id="inputRow"
            style={{ justifyContent: "center", flexWrap: "wrap" }}
          >
            {topAllergens.map((e, i) => {
              return (
                <div style={{ margin: "0", padding: "0" }} key={i}>
                  <label htmlFor={topAllergens[i][2]}>
                    {topAllergens[i][2]}
                  </label>
                  <input
                    type="checkbox"
                    name={topAllergens[i][2]}
                    value={topAllergens[i][1]}
                    onChange={topAllergens[i][3]}
                  />
                </div>
              );
            })}
          </div>
          <div id="inputRow" style={{ justifyContent: "center" }}>
            <p>Search products that</p>
            <select value={isInclude} onChange={handleIsInclude}>
              <option value={true}>contain</option>{" "}
              <option value={false}>do not contain</option>
            </select>
            <p>the selected allergens and ingredients</p>
          </div>
          <div id="inputRow" style={{ justifyContent: "space-between" }}>
            <input
              id="prodName"
              value={currIngred}
              type="text"
              placeholder="Ingredient"
              onInput={handleCurrIngred}
              style={{ width: "25rem" }}
            ></input>
            <label htmlFor="prodName">
              Add Ingredient to {isInclude ? "Include" : "Exclude"}
            </label>
            <button className="plus" onClick={addIngredient}>
              +
            </button>
          </div>
          <div id="inputRow" style={{ justifyContent: "space-between" }}>
            <input
              id="prodName"
              value={currAllerg}
              type="text"
              placeholder="Allergen"
              onInput={handleCurrAllerg}
              style={{ width: "25rem" }}
            ></input>
            <label htmlFor="prodName">
              Add Allergen to {isInclude ? "Include" : "Exclude"}
            </label>
            <button className="plus" onClick={addAllergen}>
              +
            </button>
          </div>
          <p>{errNotif}</p>
        </div>
        <div id="pageContent" style={{ flexFlow: "column" }}>
          <div id="inputGrid">
            <div
              style={{
                gridColumn: "1",
                gridRow: "1",
              }}
            >
              <p>
                Additional Ingredients to {isInclude ? "Include" : "Exclude"}
              </p>
              <ul>
                {ingredList.map((e, i) => {
                  return <li key={i}>{ingredList[i]}</li>;
                })}
              </ul>
            </div>
            <div
              style={{
                gridColumn: "2",
                gridRow: "1",
              }}
            >
              <p>Additional Allergens to {isInclude ? "Include" : "Exclude"}</p>
              <ul>
                {allergList.map((e, i) => {
                  return <li key={i}>{allergList[i]}</li>;
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
          <button onClick={handleSearch} style={{ alignSelf: "center" }}>
            t Search
          </button>
        </div>
      </div>
      <div hidden={hideResults} style={{ margin: "3rem 0 0 0", padding: "0" }}>
        <div id="pagePanel" style={{ margin: "0 0 0 0" }} hidden={hideResults}>
          <div id="pageContent" style={{ gap: "0", textAlign: "left" }}>
            <table>
              <thead></thead>
              <tbody>
                <tr style={{ fontWeight: "600", background: "gainsboro" }}>
                  <td>Name</td>
                  <td>Allergens</td>
                  <td>Ingredients</td>
                  <td>Manufacturer</td>
                </tr>
                {searchResult.map((e, i) => {
                  return (
                    <tr>
                      <td key={i * 4 + 0}>{searchResult[i].name}</td>
                      <td key={i * 4 + 1}>{listAllergens(i)}</td>
                      <td key={i * 4 + 2}>{listIngredients(i)}</td>
                      <td key={i * 4 + 3}>{searchResult[i].manufacturer}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSearch;
