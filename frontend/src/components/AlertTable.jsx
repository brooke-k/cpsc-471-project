import React from "react";
import AlertRow from "./AlertRow";

const AlertTable = () => {
  const demoAlerts = [
    {
      name: "Bean Fried Fish",
      prodID: "ASHFR484",
      status: "Response Mandatory",
      dateIssued: "July 7, 2022",
    },
    {
      name: "Fish Fried Beans",
      prodID: "ASHFR443",
      status: "Response Mandatory",
      dateIssued: "August 14, 2022",
    },
  ];
  return (
    <>
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
                <button>Resolve</button>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </>
  );
};

export default AlertTable;
