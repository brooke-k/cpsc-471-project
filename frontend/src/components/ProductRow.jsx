import React from "react";
const ProductRow = () => {
  const prodName = "Example name";
  const prodID = "ASHDKJF5345";
  const ingred = "Food, more food, another food, pasta";
  const notableAllerg = "pasta";
  const soldAt = "Example retailer name";
  const madeBy = "Example manufacturer name";
  const variants = "Example variant names";
  const currAlerts = "No current alerts";
  const dateAdded = "January 1, 1970";

  return (
    <tr>
      <td>{prodName}</td>
      <td>{prodID}</td>
      <td>{ingred}</td>
      <td>{notableAllerg}</td>
      <td>{soldAt}</td>
      <td>{madeBy}</td>
      <td>{variants}</td>
      <td>{currAlerts}</td>
      <td>{dateAdded}</td>
    </tr>
  );
};

export default ProductRow;
