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

  const manus = [
    "BeansForU",
    "Unidentified Flying Omlets",
    "CutePooch Canine Cosmetics",
    "The Girl Guides",
    "Your Roomate",
    "Your Roommate's Friend",
    "Apple",
  ];

  const retailers = [
    "GoGo Shopping",
    "Many Names",
    "Top Shelf Grocers",
    "Sparkd Cosmetics",
    "Citizen Clean",
  ];

  const retailReg = [
    "Western Canada",
    "Central Canada",
    "Eastern Canada",
    "Atlantic Canada",
    "Quebec",
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
      <div>
        <p>'Ctrl+click' to select multiple options</p>
        <label for="prodTypes">Product Type</label>
        <select name="prodTypes" id="prodTypes" multiple required>
          {productTypes.map((e, i) => {
            return (
              <option value={productTypes[i]} key={i}>
                {productTypes[i]}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label for="manufacts">Manufacturer</label>
        <select name="manufacts" id="manufacts" multiple>
          {manus.map((e, i) => {
            return (
              <option value={manus[i]} key={i}>
                {manus[i]}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label for="retailers">Retailers</label>
        <select name="retailers" id="retailers" multiple>
          {manus.map((e, i) => {
            return (
              <option value={retailers[i]} key={i}>
                {retailers[i]}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label for="prodTypes">Retail Region</label>
        <select name="retailReg" id="retailReg">
          {retailReg.map((e, i) => {
            return (
              <option value={retailReg[i]} key={i}>
                {retailReg[i]}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label for="textName">Search by name</label>
        <input name="textName" placeholder="Product name"></input>
      </div>
    </>
  );
};

export default ProductSearch;
