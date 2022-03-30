import ProductRow from "./productDisplay";
import React from "react";

const ProductTable = () => {
  const n = 10;
  let franticScreaming = new Array(10);

  return (
    <table>
      <thead>
        <tr>
          <td>Product Name</td>
          <td>Product ID</td>
          <td>Ingrdients</td>
          <td>Notable Allegens</td>
          <td>Sold At</td>
          <td>Made By</td>
          <td>Available Varieties</td>
          <td>Current Alerts</td>
        </tr>
      </thead>
      <tbody>
        {new Array(10).fill(null).map((e, i) => {
          return <ProductRow key={i} />;
        })}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};

export default ProductTable;
