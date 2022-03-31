import React from "react";
const ProductRow = () => {
  const prodName = "Exmaple name";
  const prodID = "ASHDKJFLSHL9384094AJ3HKJAWE";
  const ingred =
    "Food, more food, another food, someone thinking about pasta 2 feet away from you";
  const notableAllerg = "pasta";
  const soldAt = "Example retailer name";
  const madeBy = "Example manufacturer name";
  const variants = "Example variant names";
  const currAlerts = "No current alerts";

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
    </tr>
  );
};

export default ProductRow;
