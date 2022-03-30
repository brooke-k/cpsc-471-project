import React from "react";

const ProductSearch = () => {
  const topAllergens = [
    "Eggs",
    "Milk",
    "Mustard",
    "Peanuts",
    "Crustaceans",
    "Molluscs",
    "Fish",
    "Seasame Seeds",
    "Soy",
    "Sulphites",
    "Tree Nuts",
    "Wheat",
    "Triticale",
  ];

  const productTypes = [
    "Food",
    "Cosmetics",
    "Household",
    "Medication",
    "Utility",
  ];

  return (
    <>
      <h1>Product Search</h1>
      <div>
        {topAllergens.map((e, i) => {
          return (
            <div key={i}>
              <input type="checkbox" key={i} value={topAllergens[i]}></input>
              <label for={topAllergens[i]}>{topAllergens[i]}</label>
            </div>
          );
        })}
      </div>
      <div>
        <input type="radio" name="containsOpt" value="contains"></input>
        <label for="contains">Contains</label>
        <input
          type="radio"
          name="containsOpt"
          value="not_contains"
          checked
        ></input>
        <label for="not_contains">Does not contain</label>
      </div>
      <p>'Ctrl+click' to select multiple options</p>
      <label for="prodTypes" />
      <select name="prodTypes" id="prodTypes" multiple required>
        {productTypes.map((e, i) => {
          return (
            <option value={productTypes[i]} key={i}>
              {productTypes[i]}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default ProductSearch;
