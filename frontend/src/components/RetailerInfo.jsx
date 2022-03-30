import React from "react";

const RetailerInfo = () => {
  const retName = "Retailer's name";
  const retSpecialty = "Retailer's specialty";
  const retRegions = "Retailer's regions";

  return (
    <>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td>{retName}</td>
            <td>{retSpecialty}</td>
            <td>{retRegions}</td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </>
  );
};

export default RetailerInfo;
