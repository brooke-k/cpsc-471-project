import React from "react";

const RetailerInfo = () => {
  const retName = "Retailer's name";
  const retSpecialty = "Retailer's specialty";
  const retRegions = "Retailer's regions";

  return (
    <>
      <h1>Retailer Information</h1>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td>Name: {retName}</td>
          </tr>
          <tr>
            <td>Specialty: {retSpecialty}</td>
          </tr>
          <tr>
            <td>Regions: {retRegions}</td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    </>
  );
};

export default RetailerInfo;
