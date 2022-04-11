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

  var ingredients = useMemo(() => {
    return [];
  }, []);

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

  function handleIngredient() {
    console.log("Handling ingredient " + currIngred);
    const notLetterAlphaDash = /[^A-Z1-9-]+/;
    const newIngred = String(currIngred).toUpperCase();
    if (newIngred.match(notLetterAlphaDash) !== null) {
      setInfoNotif(
        "Ingredients can only contain letters, numbers, hyphens, or spaces."
      );
      return;
    }

    var isAdded = false;
    for (let i = 0; i < ingredients.length; i++) {
      if (
        newIngred.match(RegExp(ingredients[i])) !== null &&
        newIngred.length === ingredients[i].length
      ) {
        isAdded = true;
        setInfoNotif(
          newIngred + " has already been added to the ingredients list."
        );
        setIsAllergen(false);
        return;
      }
    }

    if (!isAdded) {
      ingredients.push(newIngred);
    }
    console.log(ingredients.length);
    if (isAllergen) {
      allergens.push(newIngred);
      setInfoNotif(newIngred + " added (included in allergens)");
    } else {
      if (ingredients.length > 0) {
        for (let i = 0; i < topAllergens.length; i++) {
          if (ingredients[ingredients.length - 1].match(topAllergens[i])) {
            allergens.push(newIngred);
            setInfoNotif(newIngred + " added (included in allergens)");
            setIsAllergen(false);
            return;
          }
        }
      }
    }
    setInfoNotif(newIngred + " added (not included in allergens)");
    setIsAllergen(false);
    return;
  }

  const listIngredients = useCallback(
    (new_ingredient) => {
      ingredients.push(new_ingredient);
      return (
        <>
          {ingredients.map((e, i) => {
            return (
              <li key={i} value={ingredients[i]}>
                {ingredients[i]}
              </li>
            );
          })}
        </>
      );
    },
    [ingredients]
  );

  const handleIsAllergen = (e) => {
    setIsAllergen(e.target.value);
    console.log("Checked allergen is an ingredient");
  };

  return (
    <>
      <h1>Current Ingredients:</h1>
      <h1>{infoNotif}</h1>
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
      {ingredients}
    </>
  );
};

export default AddProduct;