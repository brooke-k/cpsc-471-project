import React, { useEffect, useMemo, useState, useCallback } from "react";
import "../styles/pages.scss";

class Ingredient {
  isAllergen;
  value;
}

const AddProduct = () => {
  const [manuName, setManuName] = useState("");
  const [prodName, setProdName] = useState("");
  const [infoNotif, setInfoNotif] = useState("");
  const [currIngred, setCurrIngred] = useState("");
  const [isAllergen, setIsAllergen] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  //var ingredients = [];

  const allergens = [];
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

  const handleIngredient = () => {
    console.log("Handling ingredient " + currIngred);
    const notLetterAlphaDash = /[^A-Z1-9-]+/;
    const newIngred = currIngred.toUpperCase();
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

    if (isAllergen) {
      allergens.push(newIngred);
      setInfoNotif(newIngred + " added (included in allergens)");
      return;
    } else {
      for (let i = 0; i < topAllergens.length; i++) {
        if (newIngred.match(topAllergens[i]) !== null) {
          addIngredient(newIngred);
          setInfoNotif(newIngred + " added (included in allergens)");
          setIsAllergen(false);

          return;
        }
      }
    }
    addIngredient(newIngred);
    setInfoNotif(newIngred + " added (not included in allergens)");
  };

  const handleIsAllergen = (e) => {
    setIsAllergen(e.target.value);
    console.log("Checked allergen is an ingredient");
  };

  return (
    <>
      <h1>Add Product</h1>
      <p>{infoNotif}</p>
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
      ></input>
      <button onClick={handleIngredient}>+</button>
      <p>Current Ingredients:</p>
      <ul>
        {ingredients.map((e, i) => {
          return <li key={i}>{ingredients[i]}</li>;
        })}
      </ul>
    </>
  );
};

export default AddProduct;
