import React from "react";
import AlertRow from "./AlertRow";
import ProductTable from "./ProductTable";
const UserCollection = () => {
  const collectionName = "Favourite Desserts";
  const demoAlerts = [
    {
      name: "Example name",
      prodID: "ASHDKJF5345",
      status: "Active",
      dateIssued: "July 7, 2022",
      alertInfo: "Product allergen labelling may be misleading",
    },
    {
      name: "Example name",
      prodID: "ASHDKJF5345",
      status: "Active",
      dateIssued: "August 14, 2022",
      alertInfo: "Product allergen labelling may be misleading",
    },
  ];

  return (
    <>
      <h1>User Collection</h1>
      <h2>{collectionName}</h2>
      <ProductTable />
      <button>Share This Collection</button>
      <button>Remove a Product</button>
      <button>Add a Product</button>
      <h2>Current Alerts</h2>
      <table>
        <thead>
          <tr>
            <td>Product Name</td>
            <td>Product ID</td>
            <td>Alert Status</td>
            <td>Date Issued</td>
          </tr>
        </thead>
        <tbody>
          {demoAlerts.map((e, i) => {
            return (
              <tr>
                <AlertRow
                  name={demoAlerts[i].name}
                  prodID={demoAlerts[i].prodID}
                  status={demoAlerts[i].status}
                  dateIssued={demoAlerts[i].dateIssued}
                />
                <td>{demoAlerts[i].alertInfo}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </>
  );
};

export default UserCollection;
