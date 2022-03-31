import React from "react";
import ReportRow from "../components/ReportRow";

const AdminHome = () => {
  const demoReports = [
    {
      reportNo: "37424522",
      subject: "Misleading mascara label",
      status: "Unresolved",
    },
    {
      reportNo: "23784572",
      subject: "SUSPECTED FISH REACTION",
      status: "In progress",
    },
    {
      reportNo: "342167637",
      subject: "Incorrect labelling on online posting",
      status: "Resolved",
    },
    {
      reportNo: "85754837",
      subject: "missing notable allergen on ingredient list",
      status: "Suspended",
    },
  ];

  const demoEntry = [
    {
      name: "Bologna Bitez",
      productID: "AKJHF747298",
    },
    {
      name: "Extra-Fancy Cocktail Crabs",
      productID: "UWYGQEG473",
    },
    {
      name: "5th Dimension Delivery Pizza (Cheese Flavour)",
      productID: "Q2HHF74798",
    },
    {
      name: "Midnight Slayer Glitter Eyeshadow",
      productID: "TH543GI7298",
    },
    {
      name: "Dancing Duke Concealer No. 35",
      productID: "BWIRWW7878",
    },
    {
      name: "Whispy Crispy Crinkle Wave Chips",
      productID: "LSHF654B849",
    },
  ];

  return (
    <>
      <div>
        <h1>Admininstration Home</h1>
      </div>
      <div>
        <h2>Reports</h2>
        <table>
          <thead>
            <tr>
              <td>Report No.</td>
              <td>Subject</td>
              <td>Status</td>
              <td> </td>
            </tr>
          </thead>
          <tbody>
            {demoReports.map((e, i) => {
              return (
                <tr>
                  <ReportRow
                    reportNo={demoReports[i].reportNo}
                    subject={demoReports[i].subject}
                    status={demoReports[i].status}
                  />
                </tr>
              );
            })}
          </tbody>
          <tfoot />
        </table>
      </div>
      <div>
        <h2>New Entries</h2>
        <table>
          <thead>
            <tr>
              <td>Product Name</td>
              <td>ProductID</td>
            </tr>
          </thead>
          <tbody>
            {demoEntry.map((e, i) => {
              return (
                <tr>
                  <td>{demoEntry[i].name}</td>
                  <td>{demoEntry[i].productID}</td>
                  <button>Details</button>
                  <button>Approve</button>
                  <button>Deny</button>
                </tr>
              );
            })}
          </tbody>
          <tfoot />
        </table>
        <button>See More</button>
      </div>
      <div>
        <label for="user">Search Users</label>
        <input type="text" name="user" placeholder="Username"></input>
        <button>Search</button>
      </div>
      <div>
        <label for="manufact">Search Manufacturers</label>
        <input
          type="text"
          name="manufact"
          placeholder="Manufacturer name"
        ></input>
        <button>Search</button>
      </div>
    </>
  );
};

export default AdminHome;
