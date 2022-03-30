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
  return (
    <>
      <h1>Product Search</h1>
      <div>
        {topAllergens.map((e, i) => {
          return (
            <div key={i}>
              <input type="checkbox" key={i} name={topAllergens[i]}></input>
              <label for={topAllergens[i]}>{topAllergens[i]}</label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductSearch;
