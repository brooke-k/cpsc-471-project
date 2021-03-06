import ProductRow from "./ProductRow";
import React from "react";

const ProductTable = () => {
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
          <td>Date Added</td>
        </tr>
      </thead>
      <tbody>
        {new Array(4).fill(null).map((e, i) => {
          return <ProductRow key={i} />;
        })}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};

export default ProductTable;
