import React, { useEffect, useMemo, useState, useCallback } from "react";
import axiosJSONInst from "../axios";
import "../styles/pages.scss";
import { getCookie } from "../Cookies";
import RegularNavBar from "../components/RegularNavBar";
import ManufacturerNavBar from "../components/ManufacturerNavBar";
import AdminNavBar from "../components/AdminNavBar";

class Ingredient {
  isAllergen;
  value;
}

const AddProduct = () => {
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
  const [manuName, setManuName] = useState("");
  const [prodVar, setProdVar] = useState("");
  const [prodName, setProdName] = useState("");
  const [infoNotif, setInfoNotif] = useState("");
  const [currIngred, setCurrIngred] = useState("");
  const [isAllergen, setIsAllergen] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [allergens, setAllergens] = useState([]);

  const topAllergens = [
    /EGG/,
    /MILK/,
    /MUSTARD/,
    /PEANUT/,
    /CRUSTACEAN/,
    /MOLLUSC/,
    /FISH/,
    /SEASAME/,
    /SOY/,
    /SULPHITE/,
    /NUT/,
    /WHEAT/,
    /TRITICALE/,
    /GLUTEN/,
  ]; // Saved as RegEx's

  const handleCurrIngred = (e) => {
    setCurrIngred(e.target.value);
    console.log("Current ingredient is " + currIngred);
  };

  function addIngredient(ing) {
    const newIngList = ingredients.concat([ing]);
    setIngredients(newIngList);
    console.log(ingredients.length);
    return;
  }

  function addAllergens(aller) {
    const newAllergyList = allergens.concat([aller]);
    setAllergens(newAllergyList);
    return;
  }

  const handleIngredient = () => {
    console.log("Handling ingredient " + currIngred);
    const notLetterAlphaDash = /[^A-Z1-9- ]+/;
    const newIngred = currIngred.toUpperCase();
    setCurrIngred("");
    setIsAllergen("");
    if (newIngred.match(notLetterAlphaDash) !== null) {
      setInfoNotif(
        "Ingredients can only contain letters, numbers, hyphens, or spaces."
      );
      return;
    }
    for (let i = 0; i < ingredients.length; i++) {
      if (
        newIngred.match(RegExp(ingredients[i])) !== null &&
        newIngred.length === ingredients[i].length
      ) {
        setInfoNotif(
          newIngred + " has already been added to the ingredients list."
        );
        return;
      }
    }
    addIngredient(newIngred);
    if (isAllergen) {
      addAllergens(newIngred);
      setInfoNotif(newIngred + " added (included in allergens)");
      return;
    } else {
      for (let i = 0; i < topAllergens.length; i++) {
        if (newIngred.match(topAllergens[i]) !== null) {
          addAllergens(newIngred);
          setInfoNotif(newIngred + " added (included in allergens)");
          setIsAllergen(false);
          return;
        }
      }
    }
    setInfoNotif(newIngred + " added (not included in allergens)");
  };

  const handleIsAllergen = (e) => {
    setIsAllergen(e.target.value);
    console.log("Checked allergen is an ingredient");
  };

  const handleProdName = (e) => {
    setProdName(e.target.value);
  };

  const handleProdVar = (e) => {
    setProdVar(e.target.value);
  };
  const handleReset = () => {
    setAllergens([]);
    setIngredients([]);
    setCurrIngred("");
    setIsAllergen("");
  };
  const handleManuName = (e) => {
    setManuName(e.target.value);
  };

  const handleAddProduct = () => {
    let prodID;
    axiosJSONInst
      .post("/product/create", {
        name: prodName,
        manufacturer_name: manuName,
        ingredients: ingredients,
        allergens: allergens,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      {currNav}
      <div id="pagePanel">
        <h1>Add Product</h1>
        <div id="pageContent">
          <div id="inputRow" style={{ justifyContent: "start" }}>
            <input
              id="prodName"
              value={prodName}
              type="text"
              placeholder="Name"
              onInput={handleProdName}
            ></input>
            <label htmlFor="prodName">Product Name</label>
          </div>
          <div id="inputRow" style={{ justifyContent: "start" }}>
            <input
              id="manuName"
              value={manuName}
              type="text"
              placeholder="manuName"
              onInput={handleManuName}
            ></input>
            <label htmlFor="prodName">Manufacturer Name</label>
          </div>
          <div id="inputRow" style={{ justifyContent: "start" }}>
            <input
              type="text"
              value={prodVar}
              placeholder="Variant Name"
              onInput={handleProdVar}
            ></input>
            <label htmlFor="prodVar">Product Variant (Optional)</label>
          </div>
          <div id="inputRow">
            <input
              type="text"
              value={currIngred}
              id="ingredientInput"
              onInput={handleCurrIngred}
              placeholder="Add New Ingredient"
            ></input>
            <label htmlFor="allergenCheck">Ingredient is an allergen</label>
            <input
              type="checkbox"
              value={isAllergen}
              id="allergenCheck"
              onChange={handleIsAllergen}
              style={{ width: "min-content" }}
            ></input>
          </div>
          <div id="inputRow">
            <button onClick={handleIngredient} className="plus">
              +
            </button>
            <button onClick={handleReset}>Reset Ingredients</button>
          </div>
          <p>{infoNotif}</p>
        </div>
        <div id="pageContent">
          <p
            style={{
              fontSize: "14pt",
              fontWeight: "500",
              textAlign: "left",
              alignSelf: "stretch",
              paddingInline: "1rem",
            }}
          >
            Current Ingredients:
          </p>
          <ul>
            {ingredients.map((e, i) => {
              return <li key={i}>{ingredients[i]}</li>;
            })}
          </ul>
          <p
            style={{
              fontSize: "14pt",
              fontWeight: "500",
              textAlign: "left",
              alignSelf: "stretch",
              paddingInline: "1rem",
            }}
          >
            Current Allergens:
          </p>
          <ul>
            {allergens.map((e, i) => {
              return <li key={i}>{allergens[i]}</li>;
            })}
          </ul>
          <button
            style={{
              alignSelf: "center",
            }}
            onClick={handleAddProduct}
          >
            Add Product To Database
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
